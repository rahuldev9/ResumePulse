import OpenAI from "openai";

export const getAIComparison = async (oldText, newText) => {
  try {
    const client = new OpenAI({
      apiKey: process.env.GROQ_API_KEY,
      baseURL: "https://api.groq.com/openai/v1",
    });

    const response = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0.2,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content: `
You are an expert HR Resume Comparison Assistant.

Compare two versions of a candidate's resume.

Analyze:

- Skills Added
- Skills Removed
- Job Title Changes
- Employer Changes
- Education Changes
- Experience Changes
- Location Changes
- Employment Date Inconsistencies

Classify every change into one of:

- Important
- Minor
- Needs Review

Return ONLY valid JSON.
`,
        },
        {
          role: "user",
          content: `
Previous Resume

${oldText}

--------------------------------

Updated Resume

${newText}

Return JSON exactly like this:

{
  "overallStatus":"Significant Profile Update",
  "changes":[
    {
      "type":"Job Title",
      "oldValue":"Python Developer",
      "newValue":"Full Stack Developer",
      "severity":"Important",
      "reason":"Candidate changed role."
    }
  ]
}
`,
        },
      ],
    });

    const content = response.choices[0].message.content;

    return JSON.parse(content);
  } catch (error) {
    console.error("Groq Error:", error.message);

    return null;
  }
};
