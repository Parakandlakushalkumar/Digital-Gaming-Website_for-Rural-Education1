import axiosInstance from "@/api/axiosConfig.js";

export async function getGeminiAnswer(
  message: string,
  opts?: { grade?: number; language?: string }
): Promise<string> {
  const fallback = opts?.language === "hi"
    ? "Sorry, I could not answer your question."
    : "Sorry, I could not answer your question.";

  const response = await axiosInstance.post("/chat/ask", {
    message,
    grade: opts?.grade,
    language: opts?.language,
  });

  return response?.data?.answer || fallback;
}
