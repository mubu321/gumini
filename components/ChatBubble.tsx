import React from 'react'
import clsx from 'clsx'

export default function ChatBubble({
  role,
  content,
}: {
  role: 'user' | 'assistant'
  content: string
}) {
  return (
    <div
      className={clsx(
        'flex mb-4',
        role === 'user' ? 'justify-end' : 'justify-start'
      )}
    >
      <div
        className={clsx(
          'max-w-[70%] px-4 py-3 rounded-lg shadow',
          role === 'user'
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-white text-gray-900 rounded-bl-none border'
        )}
      >
        {content}
      </div>
    </div>
  )
}