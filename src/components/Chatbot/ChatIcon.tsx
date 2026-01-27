'use client'
import { MessageCircle, Send } from 'lucide-react'
import { useState } from 'react'
import ChatWindow from './ChatWindow'

export default function ChatIcon() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-primary to-purple-600 text-primary-foreground rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-200 flex items-center justify-center z-50"
      >
        <MessageCircle className="w-8 h-8" />
      </button>
      
      {isOpen && (
        <ChatWindow onClose={() => setIsOpen(false)} />
      )}
    </>
  )
}
