import { getGeminiAnswer } from '../services/geminiService.js';

export const askGemini = async (req, res) => {
  try {
    const { message, grade, language } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Message is required',
      });
    }

    const answer = await getGeminiAnswer(message, { grade, language });

    res.json({
      success: true,
      data: { answer },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
