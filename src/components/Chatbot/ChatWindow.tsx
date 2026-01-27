'use client'
import { useState, useRef, useEffect } from 'react'
import { X, Send, Bot, Paperclip } from 'lucide-react'
import { Button } from '@/components/Common/Button'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/Common/Avatar'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatWindow({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hello! I'm your personal health assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
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
    <div className="fixed bottom-24 right-6 w-[380px] h-[600px] max-h-[calc(100vh-120px)] flex flex-col z-50 animate-in slide-in-from-bottom-5 duration-300">
      {/* Glassmorphism Container */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col" />

      {/* Header */}
      <div className="relative z-10 bg-primary/5 border-b border-border/50 p-4 flex items-center justify-between backdrop-blur-sm">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 border-2 border-primary/20">
            <AvatarImage src="/bot-avatar.png" />
            <AvatarFallback className="bg-gradient-to-br from-primary to-purple-600 text-white">
              <Bot className="w-5 h-5" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              HealthAI
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </h3>
            <p className="text-xs text-muted-foreground">Always here to help</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 hover:bg-destructive/10 hover:text-destructive transition-colors">
          <X className="w-5 h-5" />
        </Button>
      </div>

      {/* Messages */}
      <div className="relative z-10 flex-1 p-4 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
        {messages.map((message, index) => (
          <div key={message.id} className={cn(
            'flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300',
            message.isUser ? 'justify-end' : 'justify-start'
          )}>
            {!message.isUser && (
              <Avatar className="h-8 w-8 mt-1 border border-border">
                <AvatarFallback className="bg-primary/5 text-primary">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}

            <div className={cn(
              'max-w-[80%] px-4 py-3 shadow-sm',
              message.isUser
                ? 'bg-gradient-to-br from-primary to-purple-600 text-white rounded-2xl rounded-tr-sm'
                : 'bg-card border border-border/50 text-card-foreground rounded-2xl rounded-tl-sm'
            )}>
              <p className="leading-relaxed text-sm">{message.text}</p>
              <p className={cn(
                "text-[10px] mt-1.5",
                message.isUser ? "text-primary-foreground/70" : "text-muted-foreground"
              )}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-3 animate-in fade-in duration-300">
            <Avatar className="h-8 w-8 mt-1 border border-border">
              <AvatarFallback className="bg-primary/5 text-primary">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-card border border-border/50 px-4 py-3 rounded-2xl rounded-tl-sm">
              <div className="flex space-x-1.5">
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="relative z-10 p-4 bg-background/50 backdrop-blur-md border-t border-border/50">
        <div className="flex items-end gap-2 bg-card border border-input rounded-2xl p-2 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all shadow-sm">
          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary shrink-0">
            <Paperclip className="w-5 h-5" />
          </Button>

          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                sendMessage()
              }
            }}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-0 focus:ring-0 p-2 min-h-[40px] max-h-[120px] resize-none text-sm placeholder:text-muted-foreground"
            rows={1}
          />

          <Button
            size="icon"
            onClick={sendMessage}
            disabled={!input.trim() || loading}
            className={cn(
              "h-9 w-9 rounded-xl shrink-0 transition-all",
              input.trim() ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "bg-muted text-muted-foreground"
            )}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
