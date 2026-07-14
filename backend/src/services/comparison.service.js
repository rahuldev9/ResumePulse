import fs from "fs";
import path from "path";

const normalize = (value = "") =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

const extractSection = (text, heading) => {
  const pattern = new RegExp(
    `${heading}\\s*[:\-]\\s*([\\s\\S]*?)(?=(\\n[A-Z][^\n]*:|$))`,
    "i",
  );
  const match = text.match(pattern);
  return match ? match[1].trim() : "";
};

const parseSkills = (text) => {
  const section = extractSection(text, "skills");
  if (!section) return [];
  return section
    .split(/[;,]/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseExperience = (text) => {
  const section = extractSection(text, "experience");
  if (!section) return [];
  return section
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const parseEmployers = (text) => {
  const entries = parseExperience(text);
  const employers = [];

  entries.forEach((entry) => {
    const atMatch = entry.match(/(?:at|@)\s+([A-Za-z0-9&.\- ]{2,})/i);
    const dashMatch = entry.match(/^([A-Z][A-Za-z0-9&.\- ]{2,})\s*(?:-|–|·|:)/);

    if (atMatch) {
      employers.push(atMatch[1].trim());
    } else if (dashMatch) {
      employers.push(dashMatch[1].trim());
    }
  });

  return employers.filter((item) => item && !/experience/i.test(item));
};

const parseDateRanges = (text) => {
  const matches = [
    ...text.matchAll(/\b(\d{4})\s*(?:-|–|to)\s*(present|\d{4})\b/gi),
  ];

  return matches.map((match) => ({
    start: Number(match[1]),
    end:
      match[2].toLowerCase() === "present"
        ? new Date().getFullYear()
        : Number(match[2]),
  }));
};

const parseEducation = (text) => {
  const section = extractSection(text, "education");
  if (!section) return [];
  return section
    .split(/\n+/)
    .map((item) => item.trim())
    .filter(Boolean);
};

const buildCategoryHighlight = (
  category,
  title,
  detail,
  severity,
  items = [],
) => ({
  category,
  title,
  detail,
  severity,
  items,
});

const buildResumeSnapshot = (text = "", fallbackTitle = "") => {
  const title = (
    extractSection(text, "job title") ||
    extractSection(text, "title") ||
    fallbackTitle ||
    text.split(/\n/).find((line) => line.trim()) ||
    ""
  )
    .replace(/^[:\-\s]+/, "")
    .trim();

  return {
    title,
    skills: parseSkills(text),
    employer: parseEmployers(text)[0] || "",
    experience:
      extractSection(text, "experience") || parseExperience(text).join(" | "),
    education:
      extractSection(text, "education") || parseEducation(text).join(" | "),
    location: extractSection(text, "location") || "",
  };
};

const buildStats = (highlights = []) => ({
  totalChanges: highlights.length,
  importantChanges: highlights.filter((item) => item.severity === "Important")
    .length,
  minorChanges: highlights.filter((item) => item.severity === "Minor").length,
  reviewChanges: highlights.filter((item) => item.severity === "Needs Review")
    .length,
});

const buildOverallStatus = (highlights = [], stats = {}) => {
  if (!highlights.length) return "No meaningful changes detected";
  if ((stats.importantChanges || 0) >= 2 || (stats.reviewChanges || 0) >= 2) {
    return "Significant Profile Update";
  }
  if ((stats.importantChanges || 0) > 0) {
    return "Moderate Profile Update";
  }
  return "Minor Profile Update";
};

export const normalizeComparisonPayload = (payload = {}) => {
  const changes = Array.isArray(payload?.changes) ? payload.changes : [];

  const highlights = changes.map((change) => ({
    category: change?.type || "General",
    title: change?.type || "Profile update",
    detail:
      change?.reason ||
      `Updated from ${change?.oldValue || "previous value"} to ${change?.newValue || "new value"}.`,
    severity: change?.severity || "Minor",
    items: [change?.oldValue, change?.newValue, change?.reason].filter(Boolean),
  }));

  const stats = buildStats(highlights);
  const summary =
    payload?.overallStatus ||
    payload?.summary ||
    (highlights.length
      ? `${highlights.length} change${highlights.length > 1 ? "s" : ""} identified.`
      : "Comparison completed successfully.");

  const resumes = {
    previous: {
      title: "",
      skills: [],
      employer: "",
      experience: "",
      education: "",
      location: "",
      ...(payload?.resumes?.previous || payload?.previousResume || {}),
    },
    updated: {
      title: "",
      skills: [],
      employer: "",
      experience: "",
      education: "",
      location: "",
      ...(payload?.resumes?.updated || payload?.updatedResume || {}),
    },
  };

  return {
    overallStatus:
      payload?.overallStatus || buildOverallStatus(highlights, stats),
    summary,
    resumes,
    highlights,
    stats,
  };
};

export const buildComparisonReport = (
  oldText,
  newText,
  oldFileName,
  newFileName,
) => {
  const oldSkills = parseSkills(oldText);
  const newSkills = parseSkills(newText);
  const oldExperience = parseExperience(oldText);
  const newExperience = parseExperience(newText);
  const oldEmployers = parseEmployers(oldText);
  const newEmployers = parseEmployers(newText);
  const oldEducation = parseEducation(oldText);
  const newEducation = parseEducation(newText);
  const oldDateRanges = parseDateRanges(oldText);
  const newDateRanges = parseDateRanges(newText);

  const removedSkills = oldSkills.filter((skill) => !newSkills.includes(skill));
  const addedSkills = newSkills.filter((skill) => !oldSkills.includes(skill));

  const oldTitle = oldText.split(/\n/)[1] || "";
  const newTitle = newText.split(/\n/)[1] || "";
  const titleChanged = normalize(oldTitle) !== normalize(newTitle);

  const oldLocation = extractSection(oldText, "location");
  const newLocation = extractSection(newText, "location");
  const locationChanged = normalize(oldLocation) !== normalize(newLocation);

  const educationChanged =
    JSON.stringify(oldEducation) !== JSON.stringify(newEducation);
  const experienceChanged =
    JSON.stringify(oldExperience) !== JSON.stringify(newExperience);
  const employersChanged =
    JSON.stringify(oldEmployers) !== JSON.stringify(newEmployers);
  const inconsistentDates =
    oldDateRanges.some((range) => range.start > range.end) ||
    newDateRanges.some((range) => range.start > range.end);

  const highlights = [];

  if (addedSkills.length || removedSkills.length) {
    highlights.push(
      buildCategoryHighlight(
        "skills",
        "Skill changes detected",
        "The candidate added or removed targeted technical capabilities.",
        addedSkills.length > 0 ? "Important" : "Minor",
        [...addedSkills, ...removedSkills],
      ),
    );
  }

  if (titleChanged) {
    highlights.push(
      buildCategoryHighlight(
        "titles",
        "Job title changed",
        `The role changed from ${oldTitle || "unknown"} to ${newTitle || "unknown"}.`,
        "Important",
        [oldTitle, newTitle].filter(Boolean),
      ),
    );
  }

  if (educationChanged) {
    highlights.push(
      buildCategoryHighlight(
        "education",
        "Education updated",
        "The education section suggests a meaningful change in academic background.",
        "Minor",
        [...oldEducation, ...newEducation].filter(Boolean),
      ),
    );
  }

  if (experienceChanged) {
    highlights.push(
      buildCategoryHighlight(
        "experience",
        "Experience profile updated",
        "The work experience content appears to have changed.",
        "Needs Review",
        [...oldExperience, ...newExperience].filter(Boolean),
      ),
    );
  }

  if (employersChanged) {
    highlights.push(
      buildCategoryHighlight(
        "employers",
        "Employer changes detected",
        "The candidate appears to have changed employers or the associated experience entries.",
        "Important",
        [...oldEmployers, ...newEmployers].filter(Boolean),
      ),
    );
  }

  if (inconsistentDates) {
    highlights.push(
      buildCategoryHighlight(
        "dates",
        "Employment dates need review",
        "One or both resumes contain date ranges that look inconsistent or out of order.",
        "Needs Review",
        [
          ...oldDateRanges.map((range) => `${range.start}-${range.end}`),
          ...newDateRanges.map((range) => `${range.start}-${range.end}`),
        ].filter(Boolean),
      ),
    );
  }

  if (locationChanged) {
    highlights.push(
      buildCategoryHighlight(
        "location",
        "Location changed",
        "The candidate listed a different location in the updated resume.",
        "Minor",
        [oldLocation, newLocation].filter(Boolean),
      ),
    );
  }

  const summary = [
    `${highlights.length} meaningful changes identified between ${oldFileName} and ${newFileName}.`,
    oldTitle && newTitle
      ? `The role shifted from ${oldTitle} to ${newTitle}.`
      : "",
  ]
    .filter(Boolean)
    .join(" ");

  return {
    summary,
    highlights,
    stats: {
      totalChanges: highlights.length,
      importantChanges: highlights.filter(
        (item) => item.severity === "Important",
      ).length,
      minorChanges: highlights.filter((item) => item.severity === "Minor")
        .length,
      reviewChanges: highlights.filter(
        (item) => item.severity === "Needs Review",
      ).length,
    },
  };
};
