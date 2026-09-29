// Adapted from the Labs implementation. Load the browser model only on demand.
import type { LanguageModel } from "ai";
import type { InitProgressReport } from "@mlc-ai/web-llm";

let cachedModel: Promise<LanguageModel> | null = null;
export const isWebLLMSupported = () =>
  typeof navigator !== "undefined" && "gpu" in navigator;

export async function getEngine(
  onProgress?: (progress: InitProgressReport) => void,
): Promise<LanguageModel> {
  if (!cachedModel) {
    cachedModel = import("@browser-ai/web-llm")
      .then(({ webLLM }) =>
        webLLM("Hermes-2-Pro-Mistral-7B-q4f16_1-MLC", {
          initProgressCallback: onProgress,
        }),
      )
      .catch((error) => {
        cachedModel = null;
        throw error;
      });
  }
  return cachedModel;
}
