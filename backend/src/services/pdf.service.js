import fs from "fs";
import path from "path";
import PDFParser from "pdf2json";
import mammoth from "mammoth";

const normalizeWhitespace = (value = "") =>
  value
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\u00a0/g, " ")
    .replace(/\u200b/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

export const normalizeExtractedText = (text = "") => {
  if (typeof text !== "string") return "";
  return normalizeWhitespace(text);
};

export const extractRawText = async (filePath) => {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case ".pdf":
      return await extractPdfText(filePath, { normalize: false });

    case ".docx": {
      const result = await mammoth.extractRawText({ path: filePath });
      return result.value || "";
    }

    case ".txt":
      return fs.readFileSync(filePath, "utf8");

    default:
      throw new Error("Unsupported file format");
  }
};

export const extractText = async (filePath) => {
  const raw = await extractRawText(filePath);
  return normalizeExtractedText(raw);
};

const extractDocxText = async (filePath) => {
  const result = await mammoth.extractRawText({ path: filePath });
  return result.value || "";
};

const extractPdfText = (filePath, opts = { normalize: true }) => {
  return new Promise((resolve, reject) => {
    // Suppress verbose warnings from pdf2json by providing a dummy workerPath
    // and avoiding console output from the library.
    const pdfParser = new PDFParser(null, 1);
    const origConsoleWarn = console.warn;
    console.warn = () => {};

    pdfParser.on("pdfParser_dataError", (err) => {
      reject(err.parserError);
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";

      pdfData.Pages.forEach((page) => {
        page.Texts.forEach((item) => {
          item.R.forEach((r) => {
            text += decodeURIComponent(r.T) + " ";
          });

          text += "\n";
        });

        text += "\n";
      });

      resolve(opts.normalize ? normalizeExtractedText(text) : text);
      // restore warning behavior
      console.warn = origConsoleWarn;
    });

    pdfParser.loadPDF(filePath);
  });
};
