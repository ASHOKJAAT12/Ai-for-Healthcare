'use client'
import { useState, useRef, useEffect } from 'react'
import { X, Send, Bot } from 'lucide-react'
import { Button } from '@/components/Common/Button'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(scrollToBottom, [messages])

  const sendMessage = async () => {
    if (!input.trim() || loading) return
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Great question! For your habit tracking, try setting specific times for each habit and using the progress charts to stay motivated. Need help with anything specific? 💪",
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, aiResponse])
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-card border border-border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden">
      {/* Header */}
      <div className="bg-primary/10 border-b border-border/50 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">HealthAI Assistant</h3>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map(message => (
          <div key={message.id} className={cn(
            'flex space-x-3',
            message.isUser ? 'justify-end' : 'justify-start'
          )}>
            <div className={cn(
              'max-w-xs lg:max-w-md px-4 py-2 rounded-2xl shadow',
              message.isUser 
                ? 'bg-primary text-primary-foreground rounded-br-sm' 
                : 'bg-muted text-foreground rounded-bl-sm'
            )}>
              <p>{message.text}</p>
              <p className="text-xs opacity-75 mt-1">
                {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-muted px-4 py-2 rounded-2xl rounded-bl-sm animate-pulse">
              HealthAI is typing...
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border/50 p-4">
        <div className="flex space-x-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Ask me about your goals, habits, or health..."
            className="flex-1 px-4 py-2 border border-input rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
          <Button size="sm" onClick={sendMessage} disabled={!input.trim() || loading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
