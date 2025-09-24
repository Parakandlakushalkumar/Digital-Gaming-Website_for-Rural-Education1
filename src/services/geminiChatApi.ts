// Google Gemini Chatbot API integration
// Usage: import { getGeminiAnswer } from './geminiChatApi';

const GEMINI_API_KEY = 'AIzaSyAF4-lLCQDbihy7Tsk2UCBSG-YF-mRuBv0';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

function buildPrompt(message: string, opts?: { grade?: number; language?: string }) {
	const grade = opts?.grade ?? 6;
	const language = opts?.language ?? 'en';
	const instructionsEn = `You are a helpful school tutor assistant for grades 6-12. Answer clearly and concisely at the student's level (Grade ${grade}). Prefer step-by-step reasoning for math and short, factual explanations for science. If formulas are needed, format them simply. Keep responses under 180 words unless more detail is explicitly requested.`;
	const instructionsHi = `आप 6-12 कक्षाओं के लिए एक सहायक ट्यूटर हैं। उत्तर स्पष्ट और संक्षिप्त दें (कक्षा ${grade} स्तर). गणित में चरण-दर-चरण और विज्ञान में संक्षिप्त, तथ्यात्मक स्पष्टीकरण दें। ज़रूरत हो तो सरल फ़ॉर्मूले दें। जब तक अधिक विवरण न मांगा जाए, उत्तर 180 शब्दों के भीतर रखें।`;
	const system = language === 'hi' ? instructionsHi : instructionsEn;
	return `${system}\n\nStudent question: ${message}`;
}

export async function getGeminiAnswer(message: string, opts?: { grade?: number; language?: string }): Promise<string> {
	const url = `${GEMINI_API_URL}?key=${encodeURIComponent(GEMINI_API_KEY)}`;
	const payload = {
		contents: [
			{
				role: 'user',
				parts: [{ text: buildPrompt(message, opts) }]
			}
		]
	};

	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	});

	if (!response.ok) {
		const errorText = await response.text();
		throw new Error('Failed to get response from Gemini API: ' + errorText);
	}

	const data = await response.json();
	const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
	return text || (opts?.language === 'hi' ? 'क्षमा करें, मैं उत्तर नहीं दे सका।' : 'Sorry, I could not answer your question.');
}


