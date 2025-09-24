import React, { useState, useRef, useEffect } from 'react'
import ChatBubble from '../components/ChatBubble'

type Message = {
  role: 'user' | 'assistant'
  content: string
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'こんにちは！OTYA AIです。ご質問をどうぞ。' }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return
    const userMsg: Message = { role: 'user', content: input }
    setMessages((msgs) => [...msgs, userMsg])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] })
      })
      const data = await res.json()
      setMessages((msgs) => [
        ...msgs,
        { role: 'assistant', content: data.reply }
      ])
    } catch (e) {
      setMessages((msgs) => [
        ...msgs,
        { role: 'assistant', content: 'エラーが発生しました。' }
      ])
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-neutral-100">
      <header className="w-full py-6 bg-white shadow text-center text-2xl font-bold text-blue-600">
        OTYA AI
      </header>
      <main className="flex-1 w-full max-w-xl mx-auto px-2 py-6 flex flex-col">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.map((msg, i) => (
            <ChatBubble key={i} role={msg.role} content={msg.content} />
          ))}
          <div ref={chatBottomRef}></div>
        </div>
        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="メッセージを入力..."
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-lg disabled:opacity-50"
            disabled={loading || !input.trim()}
          >
            送信
          </button>
        </form>
        <footer className="mt-4 text-xs text-gray-400 text-center">
          Powered by Google Gemini API / ChatGPT風UI
        </footer>
      </main>
    </div>
  )
}