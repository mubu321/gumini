import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { message, conversationHistory } = req.body;

  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [...conversationHistory, { role: 'user', parts: [{ text: message }] }],
          generationConfig: { temperature: 0.9, maxOutputTokens: 2048 }
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      return res.status(500).json({ error: errorData.error?.message || 'API Error' });
    }

    const data = await response.json();
    const assistantMessage = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    res.status(200).json({ assistantMessage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
