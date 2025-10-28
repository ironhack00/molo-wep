"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IconSend, IconTrash, IconUser, IconChefHat, IconBuilding, IconPaint, IconBuildingStore } from "@tabler/icons-react";
import { Heading } from "../../atoms/Heading";
import { Paragraph } from "../../atoms/Paragraph";
import { cn, glassmorphism, glassBorder } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: string;
  isTyping?: boolean;
}

interface BotConfig {
  icon: React.ReactNode;
  color: string;
}

const botConfigs: Record<string, BotConfig> = {
  hotel: {
    icon: <IconBuilding className="w-full h-full" />,
    color: "#00d4aa",
  },
  restaurant: {
    icon: <IconChefHat className="w-full h-full" />,
    color: "#FF6B6B",
  },
  painting: {
    icon: <IconPaint className="w-full h-full" />,
    color: "#4CAF50",
  },
  flooring: {
    icon: <IconBuildingStore className="w-full h-full" />,
    color: "#8B5CF6",
  },
};

/**
 * Organism: ChatbotDemo
 * Demo interactivo de chatbot adaptado del proyecto anterior
 * Reutiliza UniversalButton, Heading, Paragraph y utilidades
 */
export function ChatbotDemo() {
  const t = useTranslations('automation');
  const [selectedBot, setSelectedBot] = useState<string>("hotel");
  const [messages, setMessages] = useState<Record<string, Message[]>>({
    hotel: [],
    restaurant: [],
    painting: [],
    flooring: [],
  });
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      setTimeout(() => {
        messagesContainerRef.current?.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }, 100);
    }
  };

  const switchBot = (botType: string) => {
    setSelectedBot(botType);
  };

  const sendMessageToApi = async (message: string, sessionId: string, botType: string) => {
    try {
      const payload = {
        message,
        sessionId,
        botType,
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("/api/bot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (!data.success) {
        throw new Error(data.error || "Unknown error occurred");
      }

      return data.response;
    } catch (error) {
      console.error("Error sending message to API:", error);
      throw error;
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => ({
      ...prev,
      [selectedBot]: [...prev[selectedBot], userMessage],
    }));

    const currentMessage = inputMessage;
    setInputMessage("");
    setIsLoading(true);
    scrollToBottom();

    // Agregar mensaje de "escribiendo"
    const typingMessage: Message = {
      id: `typing-${Date.now()}`,
      text: "",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isTyping: true,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedBot]: [...prev[selectedBot], typingMessage],
    }));

    try {
      // Generar sessionId si no existe
      const sessionId = `session_${selectedBot}_${Date.now()}`;
      
      const botResponse = await sendMessageToApi(currentMessage, sessionId, selectedBot);

      // Remover mensaje de "escribiendo" y agregar respuesta real
      setMessages((prev) => {
        const messagesWithoutTyping = prev[selectedBot].filter(msg => !msg.isTyping);
        const botMessage: Message = {
          id: `bot-${Date.now()}`,
          text: botResponse,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        
        return {
          ...prev,
          [selectedBot]: [...messagesWithoutTyping, botMessage],
        };
      });
      
      setIsLoading(false);
      scrollToBottom();
    } catch (error) {
      console.error("Error:", error);
      
      // Remover mensaje de "escribiendo" y agregar mensaje de error
      setMessages((prev) => {
        const messagesWithoutTyping = prev[selectedBot].filter(msg => !msg.isTyping);
        const errorMessage: Message = {
          id: `bot-${Date.now()}`,
          text: "Lo siento, hubo un error al procesar tu mensaje. Por favor intenta nuevamente.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        
        return {
          ...prev,
          [selectedBot]: [...messagesWithoutTyping, errorMessage],
        };
      });
      
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const clearChat = () => {
    setMessages((prev) => ({
      ...prev,
      [selectedBot]: [],
    }));
  };

  // Inicializar el chat cuando se monta el componente o cambia el bot seleccionado
  useEffect(() => {
    setMessages((prev) => {
      // Solo inicializar si no hay mensajes para este bot
      if (prev[selectedBot].length === 0) {
        const welcomeMessage: Message = {
          id: `bot-${Date.now()}`,
          text: String(t(`chatbot.${selectedBot}.greeting`)),
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };
        return {
          ...prev,
          [selectedBot]: [welcomeMessage],
        };
      }
      return prev;
    });
  }, [selectedBot, t]);

  useEffect(() => {
    const lastMessage = messages[selectedBot][messages[selectedBot].length - 1];
    if (lastMessage?.sender === "bot" && !lastMessage?.isTyping) {
      scrollToBottom();
    }
  }, [messages, selectedBot]);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Chat Container con todo incluido */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className={cn(
          "w-full max-w-6xl rounded-2xl sm:rounded-3xl flex flex-col transition-all duration-500 relative",
          "p-3 sm:p-5 md:p-6 lg:p-[25px]"
        )}
        style={{
          background: "transparent",
          backdropFilter: "blur(30px) brightness(1.1) saturate(120%)",
          WebkitBackdropFilter: "blur(30px) brightness(1.1) saturate(120%)",
          border: "2px solid rgba(255, 255, 255, 0.15)",
          boxShadow: `
            inset 0 0 40px rgba(255, 255, 255, 0.08),
            inset 0 0 20px rgba(255, 255, 255, 0.12),
            0 0 40px ${botConfigs[selectedBot].color}40, 
            0 0 70px ${botConfigs[selectedBot].color}30, 
            0 0 100px ${botConfigs[selectedBot].color}20
          `,
        }}
      >
        {/* Contenedor interno con fondo negro */}
        <div 
          className="rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 flex flex-col"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.85)",
          }}
        >
        {/* Header con título y botón de limpiar */}
        <div className="flex items-start justify-between mb-3 sm:mb-4 md:mb-6">
          <div className="flex-1 pr-2">
            <Heading level="h3" className="text-[#00d4aa] text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-2 sm:mb-3 md:mb-4 leading-tight">
              {String(t('assistant.title'))}
            </Heading>
            <Paragraph size="lg" className="text-white/70 text-lg sm:text-xl md:text-2xl">
              {String(t('assistant.description'))}
            </Paragraph>
          </div>
          <button
            onClick={clearChat}
            className="p-1.5 sm:p-2 md:p-2.5 rounded-lg hover:bg-white/10 transition-all flex-shrink-0 cursor-pointer ml-2 sm:ml-4"
            aria-label={String(t('chatbot.clearChat'))}
          >
            <IconTrash className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/70 hover:text-white" />
          </button>
        </div>

        {/* Botones de selección */}
        <div className="mb-4 sm:mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 md:gap-3">
            {Object.entries(botConfigs).map(([key, config]) => {
              const isActive = selectedBot === key;
              return (
                <button
                  key={key}
                  onClick={() => switchBot(key)}
                  className={cn(
                    "relative px-2.5 sm:px-3 md:px-4 py-4 sm:py-5 md:py-6 text-xs sm:text-sm font-medium transition-all duration-200",
                    "flex flex-col items-start justify-between rounded-xl sm:rounded-2xl cursor-pointer",
                    isActive ? "text-white border-2 shadow-lg" : "text-white/60 hover:text-white border-2 border-transparent hover:border-white/20"
                  )}
                  style={{
                    backgroundColor: isActive ? `${config.color}25` : "rgba(255, 255, 255, 0.05)",
                    borderColor: isActive ? `${config.color}60` : undefined,
                    minHeight: "85px",
                  }}
                >
                  <span className="text-left mb-1.5 sm:mb-2 text-[10px] sm:text-[11px] md:text-xs leading-tight">{String(t(`chatbot.${key}.name`))}</span>
                  <div className="self-end text-white w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5">
                    {config.icon}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mensajes */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto p-2 sm:p-3 md:p-4 space-y-2 sm:space-y-3 md:space-y-4 mb-3 sm:mb-4 rounded-lg"
          style={{ 
            minHeight: "200px", 
            maxHeight: "300px",
            backgroundColor: "rgba(255, 255, 255, 0.02)"
          }}
        >
          {messages[selectedBot].map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-2 sm:gap-3",
                message.sender === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.sender === "bot" && (
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center text-white flex-shrink-0">
                  {botConfigs[selectedBot].icon}
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] sm:max-w-[80%] p-2.5 sm:p-3 md:p-4 rounded-lg sm:rounded-xl md:rounded-2xl",
                  message.sender === "user"
                    ? "text-white rounded-br-none bg-white/15"
                    : "bg-white/10 text-white rounded-bl-none border border-white/10"
                )}
              >
                {message.isTyping ? (
                  <div className="flex items-center space-x-1 sm:space-x-1.5 md:space-x-2">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/50 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                ) : (
                  <>
                    <Paragraph size="sm" className="text-white break-words text-xs sm:text-sm md:text-base">
                      {message.text}
                    </Paragraph>
                    <Paragraph size="sm" className="text-white/50 text-[9px] sm:text-[10px] md:text-xs mt-1 sm:mt-1.5 md:mt-2">
                      {message.timestamp}
                    </Paragraph>
                  </>
                )}
              </div>
              {message.sender === "user" && (
                <div className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex items-center justify-center text-white flex-shrink-0">
                  <IconUser className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="relative">
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
              }
            }}
            placeholder={String(t('chatbot.placeholder'))}
            className={cn(
              "w-full p-2 sm:p-2.5 md:p-3 pr-10 sm:pr-12 md:pr-14 rounded-lg sm:rounded-xl resize-none max-h-[70px] sm:max-h-[80px] md:max-h-[100px] text-xs sm:text-sm md:text-base",
              "bg-white/5 border text-white placeholder-white/40",
              "focus:outline-none focus:ring-2 focus:ring-white/20",
              glassBorder.light
            )}
            rows={1}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className={cn(
              "absolute right-2 p-1.5 sm:p-2 transition-all disabled:opacity-50 cursor-pointer",
              "hover:scale-110 active:scale-95"
            )}
            style={{ color: '#ffffff', top: 'calc(50% - 2px)', transform: 'translateY(-50%)' }}
          >
            <IconSend className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rotate-45" style={{ color: '#ffffff', stroke: '#ffffff' }} />
          </button>
        </div>
        </div>
      </motion.div>
    </div>
  );
}

