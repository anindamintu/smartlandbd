
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bot, 
  X, 
  Send, 
  Scale, 
  Sparkles, 
  MessageSquare, 
  ChevronDown, 
  Maximize2, 
  Minimize2,
  Loader2,
  ShieldCheck,
  ArrowRight,
  User
} from 'lucide-react';
import { getLandAdvice } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const LegalAIWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'আসসালামু আলাইকুম! আমি আপনার **এআই আইনি বিশেষজ্ঞ**। ভূমি সংক্রান্ত যেকোনো আইনি জটিলতা বা প্রশ্ন থাকলে আমাকে জিজ্ঞাসা করতে পারেন।' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isOpen, isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      const response = await getLandAdvice(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: response || 'দুঃখিত, কোনো ত্রুটি হয়েছে।' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'সার্ভারে সংযোগ বিচ্ছিন্ন হয়েছে।' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-6 md:left-72 z-40 flex flex-col items-start pointer-events-none print:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? '64px' : '500px',
              width: isMinimized ? '300px' : '380px'
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden mb-4 pointer-events-auto flex flex-col origin-bottom-left"
          >
            {/* Header */}
            <div className="bg-emerald-600 p-4 flex items-center justify-between text-white shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center border border-white/20">
                  <Bot size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-black tracking-tight">এআই আইনি বিশেষজ্ঞ</h4>
                  {!isMinimized && <p className="text-[10px] text-emerald-100 font-bold opacity-80">অনলাইন সহায়তা</p>}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-all"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/10 rounded-lg transition-all"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50 custom-scrollbar">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm font-medium shadow-sm ${
                        msg.role === 'user' 
                          ? 'bg-emerald-600 text-white rounded-tr-none' 
                          : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                      }`}>
                        {msg.text.split('\n').map((line, idx) => (
                          <p key={idx} className={idx > 0 ? 'mt-1' : ''}>
                            {line.startsWith('### ') ? (
                              <span className="font-black text-emerald-800 block mt-2 mb-1">{line.replace('### ', '')}</span>
                            ) : line.startsWith('- ') || line.startsWith('* ') ? (
                              <span className="flex gap-2 pl-2">
                                <span className="text-emerald-500">•</span>
                                <span>{line.replace(/^[-*]\s+/, '')}</span>
                              </span>
                            ) : (
                              <span>{line.replace(/\*\*(.*?)\*\*/g, '$1')}</span>
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white p-3 rounded-2xl border border-gray-100 flex items-center gap-2">
                        <Loader2 size={16} className="animate-spin text-emerald-600" />
                        <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">এআই ভাবছে...</span>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="আপনার আইনি প্রশ্ন লিখুন..."
                      className="w-full pl-4 pr-12 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-sm text-gray-700 shadow-inner"
                    />
                    <button 
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-all ${
                        input.trim() ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-300'
                      }`}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      <ShieldCheck size={12} className="text-emerald-500" /> সুরক্ষিত পরামর্শ
                    </div>
                    <p className="text-[9px] text-gray-300 font-medium italic">Gemini AI দ্বারা চালিত</p>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`pointer-events-auto p-3 md:p-4 rounded-2xl shadow-2xl flex items-center gap-3 transition-all group opacity-80 hover:opacity-100 ${
          isOpen ? 'bg-white text-emerald-600 border border-emerald-100' : 'bg-emerald-600 text-white'
        }`}
      >
        <div className="relative">
          <Scale size={20} className="md:w-6 md:h-6" />
          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 border-2 border-emerald-600 rounded-full animate-pulse" />
          )}
        </div>
        <span className="font-black text-[10px] md:text-xs uppercase tracking-widest hidden sm:block">আইনি সহায়তা</span>
      </motion.button>
    </div>
  );
};

export default LegalAIWidget;
