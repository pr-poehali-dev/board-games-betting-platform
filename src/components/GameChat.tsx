
import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SendIcon } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "opponent" | "system";
  timestamp: Date;
}

interface GameChatProps {
  opponentName: string;
}

const GameChat = ({ opponentName }: GameChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: 1, 
      text: "Игра началась! Удачи обоим игрокам.", 
      sender: "system", 
      timestamp: new Date() 
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Прокрутка вниз при добавлении новых сообщений
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);
  
  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    const userMessage: Message = {
      id: Date.now(),
      text: newMessage,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage("");
    
    // Симуляция ответа соперника (в реальном приложении здесь был бы веб-сокет)
    setTimeout(() => {
      const responses = [
        "Хороший ход!",
        "Хм, интересно...",
        "Надо подумать...",
        "Не ожидал такого хода.",
        "👍",
        "Удачи!"
      ];
      
      const opponentMessage: Message = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: "opponent",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, opponentMessage]);
    }, 2000 + Math.random() * 2000);
  };
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  return (
    <div className="flex flex-col h-full border rounded-md overflow-hidden">
      <div className="bg-muted px-4 py-2 font-medium border-b">
        Чат с {opponentName}
      </div>
      
      <ScrollArea className="flex-1 p-3" ref={scrollAreaRef}>
        <div className="space-y-3">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] px-3 py-2 rounded-lg ${
                  message.sender === "system" 
                    ? "bg-muted text-center w-full text-sm text-muted-foreground" 
                    : message.sender === "user" 
                      ? "bg-primary text-primary-foreground" 
                      : "bg-secondary/20"
                }`}
              >
                <div className="mb-1">{message.text}</div>
                <div className="text-xs opacity-70 text-right">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      
      <div className="p-3 border-t flex gap-2">
        <Input 
          placeholder="Сообщение..." 
          value={newMessage} 
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleSendMessage();
          }}
        />
        <Button size="icon" onClick={handleSendMessage}>
          <SendIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default GameChat;
