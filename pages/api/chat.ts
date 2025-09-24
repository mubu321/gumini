import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' })
    return
  }
  const { messages } = req.body
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

  if (!apiKey) {
    res.status(500).json({ error: 'Gemini API key not set' })
    return
  }

  try {
    const geminiMessages = messages.map((m: { role: string, content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }))
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${apiKey}`,
      {
        contents: geminiMessages
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const geminiResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || '（AIからの応答がありません）'
    res.status(200).json({ reply: geminiResponse })
  } catch (e: any) {
    res.status(500).json({ error: e.message || 'Error' })
  }
}