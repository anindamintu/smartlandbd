
import React, { useState, useRef, useEffect, useMemo } from 'react';
/* Added UserCircle and LogOut for the profile dropdown */
import { Send, Bot, User, Loader2, Paperclip, X, FileText, ImageIcon, Search, ShieldCheck, Trash2, Sparkles, Check, FileCheck, Layers, AlertTriangle, Mic, MicOff, XCircle, Wand2, SearchCheck, FilePlus, ExternalLink, ShieldAlert, History, Landmark, Waves, FileQuestion, Trees, Building2, MapPin, ShieldMinus, Eye, Hash, Copy, ListFilter, Maximize2, Pencil, Quote, Plus, Droplets, Mountain, ChevronDown, ChevronUp, FileSearch, BookOpen, ScrollText, UserCircle, LogOut, Map as MapIcon, Scroll, Scale } from 'lucide-react';
import { getLandAdvice, analyzeDocument, summarizeKhatian, analyzeLegalClauses, DocType } from '../services/geminiService';
import { dictionaryData } from './LandDictionary';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isDocument?: boolean;
  imageUrls?: string[];
  docType?: DocType;
  isError?: boolean;
  isSummary?: boolean;
  isClauseAnalysis?: boolean;
  canSummarize?: boolean;
  canAnalyzeClauses?: boolean;
  canVerifyDeed?: boolean;
  canInitiateMutation?: boolean;
}

interface UploadingFile {
  id: string;
  name: string;
  size: number;
  progress: number;
}

interface AIChatProps {
  onTabChange?: (tab: string, query?: string) => void;
}

/**
 * Helper component to render rich text (enhanced Markdown support)
 */
const RichText: React.FC<{ text: string }> = ({ text }) => {
  const parseInline = (line: string) => {
    const parts = [];
    let lastIndex = 0;
    
    // Enhanced regex to include dictionary term detection (simple version)
    // We'll look for terms that are in our dictionary and wrap them in a special style
    const combinedRegex = /(\*\*\*(.*?)\*\*\*|\*\*(.*?)\*\*|\*(.*?)\*|`(.*?)`|\[(.*?)\]\((.*?)\))/g;
    let match;

    while ((match = combinedRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        parts.push(line.substring(lastIndex, match.index));
      }

      if (match[2]) {
        parts.push(<strong key={match.index} className="font-bold italic text-emerald-900">{match[2]}</strong>);
      } else if (match[3]) {
        parts.push(<strong key={match.index} className="font-black text-emerald-900">{match[3]}</strong>);
      } else if (match[4]) {
        parts.push(<em key={match.index} className="italic text-emerald-800">{match[4]}</em>);
      } else if (match[5]) {
        parts.push(<code key={match.index} className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 rounded-md font-mono text-[13px] border border-emerald-100/50">{match[5]}</code>);
      } else if (match[6] && match[7]) {
        parts.push(
          <a
            key={match.index}
            href={match[7]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:text-emerald-700 hover:underline inline-flex items-center gap-0.5 font-bold transition-all"
          >
            {match[6]} <ExternalLink size={10} className="mb-0.5" />
          </a>
        );
      }
      lastIndex = combinedRegex.lastIndex;
    }

    if (lastIndex < line.length) {
      parts.push(line.substring(lastIndex));
    }

    return parts.length > 0 ? parts : line;
  };

  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: string[] } | null = null;

  const flushList = (key: number) => {
    if (!currentList) return null;
    const ListTag = currentList.type;
    const listElement = (
      <ListTag key={`list-${key}`} className={`space-y-3 pl-1 my-4 ${currentList.type === 'ol' ? 'list-decimal' : ''}`}>
        {currentList.items.map((item, idx) => (
          <li key={idx} className="flex gap-3 text-[14.5px] leading-[1.75] text-gray-700 items-start group">
            {currentList?.type === 'ul' && (
              <span className="text-emerald-500 font-bold shrink-0 mt-[7px] text-[10px] group-hover:scale-125 transition-transform">●</span>
            )}
            <span className="flex-1 font-medium">{parseInline(item)}</span>
          </li>
        ))}
      </ListTag>
    );
    currentList = null;
    return listElement;
  };

  lines.forEach((line, i) => {
    const trimmedLine = line.trim();

    if (trimmedLine.startsWith('### ')) {
      elements.push(flushList(i));
      elements.push(
        <h3 key={i} className="text-[17px] font-black text-emerald-800 mt-8 mb-4 border-b-2 border-emerald-50 pb-2 flex items-center gap-2">
          <div className="w-1.5 h-6 bg-emerald-500 rounded-full" />
          {parseInline(trimmedLine.replace('### ', ''))}
        </h3>
      );
      return;
    }

    if (trimmedLine.startsWith('> ')) {
      elements.push(flushList(i));
      elements.push(
        <div key={i} className="my-5 p-4 bg-emerald-50/50 border-l-4 border-emerald-500 rounded-r-2xl italic text-gray-700 flex gap-3">
          <Quote size={18} className="text-emerald-300 shrink-0" />
          <p className="text-[14px] leading-relaxed">{parseInline(trimmedLine.replace('> ', ''))}</p>
        </div>
      );
      return;
    }

    if (trimmedLine.startsWith('- ') || trimmedLine.startsWith('* ')) {
      const content = trimmedLine.replace(/^[-*]\s+/, '');
      if (currentList && currentList.type === 'ul') {
        currentList.items.push(content);
      } else {
        elements.push(flushList(i));
        currentList = { type: 'ul', items: [content] };
      }
      return;
    }

    const olMatch = trimmedLine.match(/^([০-৯\d]+\.)\s+(.*)/);
    if (olMatch) {
      const content = olMatch[2];
      if (currentList && currentList.type === 'ol') {
        currentList.items.push(content);
      } else {
        elements.push(flushList(i));
        currentList = { type: 'ol', items: [content] };
      }
      return;
    }

    if (trimmedLine === '') {
      elements.push(flushList(i));
      elements.push(<div key={i} className="h-3" />);
    } else {
      elements.push(flushList(i));
      elements.push(
        <p key={i} className="text-[14.5px] leading-[1.8] font-medium text-gray-800 mb-2.5">
          {parseInline(line)}
        </p>
      );
    }
  });

  elements.push(flushList(lines.length));

  return <div className="w-full">{elements.filter(Boolean)}</div>;
};

const AIChat: React.FC<AIChatProps> = ({ onTabChange }) => {
  const [input, setInput] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      role: 'model', 
      text: '### স্বাগতম!\nআসসালামু আলাইকুম! আমি আপনার **ডিজিটাল ভূমি এআই সহকারী**।\n\nযেকোনো ভূমির নথি (খতিয়ান, দলীল ইত্যাদি) বিশ্লেষণ করতে নিচের তালিকা থেকে নথির ধরন নির্বাচন করে ছবি আপলোড করুন অথবা আপনার জিজ্ঞাসা লিখে পাঠান।' 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<{ url: string, type: string, name: string }[]>([]);
  const [selectedDocType, setSelectedDocType] = useState<DocType>('RS');
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [activeFilter, setActiveFilter] = useState<DocType | 'All'>('All');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [expandedDetails, setExpandedDetails] = useState<Record<number, boolean>>({});
  const [showUserMenu, setShowUserMenu] = useState(false); // User Menu State
  
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingText, setEditingText] = useState('');
  const [showDictionary, setShowDictionary] = useState(false);
  const [dictSearch, setDictSearch] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const readersRef = useRef<Map<string, FileReader>>(new Map());

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const nextHeight = Math.min(textareaRef.current.scrollHeight, 120);
      textareaRef.current.style.height = `${nextHeight}px`;
    }
  }, [input, editingText]);

  useEffect(() => {
    // Correcting webkitRecognition to webkitSpeechRecognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      // Fix: Instantiating SpeechRecognition by using a typed constructor to avoid "Only a void function can be called with the 'new' keyword" and argument errors
      const RecognitionConstructor: any = SpeechRecognition;
      recognitionRef.current = new RecognitionConstructor();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'bn-BD';

      recognitionRef.current.onresult = (event: any) => {
        let interim = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            setInput(prev => {
              const baseText = prev.trim();
              return baseText ? `${baseText} ${event.results[i][0].transcript}` : event.results[i][0].transcript;
            });
            setInterimTranscript('');
          } else {
            interim += event.results[i][0].transcript;
          }
        }
        setInterimTranscript(interim);
      };

      recognitionRef.current.onstart = () => setIsListening(true);
      recognitionRef.current.onend = () => {
        setIsListening(false);
        setInterimTranscript('');
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files) as File[];
      
      fileList.forEach((file) => {
        const isSupported = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf', 'text/plain'].includes(file.type);
        if (!isSupported) {
          alert(`"${file.name}" ফাইলটি সাপোর্ট করে না। শুধুমাত্র ছবি (PNG, JPG), PDF বা টেক্সট ফাইল আপলোড করুন।`);
          return;
        }
        if (file.size > 10 * 1024 * 1024) {
          alert(`"${file.name}" ১০ মেগাবাইটের চেয়ে বড়।`);
          return;
        }

        const uploadId = Math.random().toString(36).substring(2, 9);
        const newUploadingFile: UploadingFile = {
          id: uploadId,
          name: file.name,
          size: file.size,
          progress: 0
        };
        
        setUploadingFiles(prev => [...prev, newUploadingFile]);

        const reader = new FileReader();
        readersRef.current.set(uploadId, reader);

        reader.onprogress = (event) => {
          if (event.lengthComputable) {
            const currentProgress = Math.round((event.loaded / event.total) * 100);
            setUploadingFiles(prev => prev.map(f => f.id === uploadId ? { ...f, progress: currentProgress } : f));
          }
        };

        reader.onloadend = () => {
          if (reader.result) {
            setSelectedFiles(prev => [...prev, { url: reader.result as string, type: file.type, name: file.name }]);
          }
          setUploadingFiles(prev => prev.filter(f => f.id !== uploadId));
          readersRef.current.delete(uploadId);
        };

        reader.readAsDataURL(file);
      });
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFreshUpload = () => {
    setSelectedFiles([]);
    setUploadingFiles([]);
    fileInputRef.current?.click();
  };

  const cancelUpload = (id: string) => {
    const reader = readersRef.current.get(id);
    if (reader) {
      reader.abort();
    }
    setUploadingFiles(prev => prev.filter(f => f.id !== id));
    readersRef.current.delete(id);
  };

  const toggleListening = () => {
    if (!recognitionRef.current) return alert("ব্রাউজার ভয়েস ইনপুট সাপোর্ট করে না।");
    if (isListening) recognitionRef.current.stop();
    else try { recognitionRef.current.start(); } catch (e) { console.error(e); }
  };

  const toggleDetails = (index: number) => {
    setExpandedDetails(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const getDocLabel = (type: DocType) => {
    switch(type) {
      case 'Deed': return 'দলীল';
      case 'NewDeed': return 'নতুন দলীল';
      case 'CS': return 'সিএস খতিয়ান (CS)';
      case 'SA': return 'এসএ খতিয়ান (SA)';
      case 'RS': return 'আরএস খতিয়ান (RS)';
      case 'BRS': return 'বিআরএস খতিয়ান (BRS)';
      case 'OldKhatian': return 'পুরাতন খতিয়ান';
      case 'NewKhatian': return 'নতুন খতিয়ান';
      case 'Peti': return 'পেটি খতিয়ান (Peti)';
      case 'Diara': return 'দিয়ারা খতিয়ান (Diara)';
      case 'PlotMap': return 'নকশা/ম্যাপ';
      case 'Khas': return 'খাস জমি (Khas Land)';
      case 'Vested': return 'অর্পিত সম্পত্তি';
      case 'Abandoned': return 'পরিত্যক্ত সম্পত্তি';
      case 'Reserved': return 'সংরক্ষিত বন';
      case 'GovtDept': return 'সরকারি প্রতিষ্ঠান';
      case 'WaterBody': return 'নদী ও জলাভূমি';
      case 'Char': return 'চর জমি';
      case 'Waqf': return 'ওয়াকফ/দেবোত্তর';
      default: return 'অন্যান্য';
    }
  };

  const getDocColorClass = (type: DocType) => {
    switch(type) {
      case 'Deed': return 'bg-blue-600 border-blue-200 text-white shadow-blue-200/50';
      case 'NewDeed': return 'bg-cyan-500 border-cyan-200 text-white shadow-cyan-200/50';
      case 'CS': return 'bg-stone-800 border-stone-200 text-white shadow-stone-200/50';
      case 'SA': return 'bg-indigo-700 border-indigo-200 text-white shadow-indigo-200/50';
      case 'RS': return 'bg-emerald-600 border-emerald-200 text-white shadow-emerald-200/50';
      case 'BRS': return 'bg-green-700 border-green-200 text-white shadow-green-200/50';
      case 'OldKhatian': return 'bg-amber-800 border-amber-300 text-white shadow-amber-300/50';
      case 'NewKhatian': return 'bg-lime-500 border-lime-200 text-white shadow-lime-200/50';
      case 'Peti': return 'bg-violet-700 border-violet-200 text-white shadow-violet-200/50';
      case 'Diara': return 'bg-cyan-600 border-cyan-200 text-white shadow-cyan-200/50';
      case 'PlotMap': return 'bg-rose-500 border-rose-200 text-white shadow-rose-200/50';
      case 'Khas': return 'bg-orange-600 border-orange-200 text-white shadow-orange-300/40 ring-2 ring-orange-500/20';
      case 'Vested': return 'bg-red-700 border-red-200 text-white shadow-red-200/50';
      case 'Abandoned': return 'bg-gray-600 border-gray-200 text-white shadow-gray-200/50';
      case 'Reserved': return 'bg-emerald-800 border-emerald-300 text-white shadow-emerald-300/50';
      case 'GovtDept': return 'bg-blue-800 border-blue-300 text-white shadow-blue-300/50';
      case 'WaterBody': return 'bg-sky-600 border-sky-300 text-white shadow-sky-300/50';
      case 'Char': return 'bg-yellow-700 border-yellow-300 text-white shadow-yellow-300/50';
      case 'Waqf': return 'bg-violet-600 border-violet-200 text-white shadow-violet-200/50';
      default: return 'bg-slate-600 border-slate-200 text-white shadow-slate-200/50';
    }
  };

  const getDocIcon = (type: DocType, size = 14) => {
    switch(type) {
      case 'Deed': return <FileCheck size={size}/>;
      case 'NewDeed': return <Sparkles size={size}/>;
      case 'CS': return <History size={size}/>;
      case 'SA': return <Landmark size={size}/>;
      case 'RS': return <FileText size={size}/>;
      case 'BRS': return <Layers size={size}/>;
      case 'OldKhatian': return <Scroll size={size}/>;
      case 'NewKhatian': return <FilePlus size={size}/>;
      case 'Peti': return <BookOpen size={size}/>;
      case 'Diara': return <Waves size={size}/>;
      case 'PlotMap': return <MapIcon size={size}/>;
      case 'Khas': return <MapPin size={size} />;
      case 'Vested': return <ShieldAlert size={size}/>;
      case 'Abandoned': return <ShieldMinus size={size}/>;
      case 'Reserved': return <Trees size={size}/>;
      case 'GovtDept': return <Building2 size={size}/>;
      case 'WaterBody': return <Droplets size={size}/>;
      case 'Char': return <Mountain size={size}/>;
      case 'Waqf': return <ScrollText size={size}/>;
      default: return <FileQuestion size={size}/>;
    }
  };

  const extractAnalyzedFields = (text: string) => {
    const khatian = text.match(/(?:খতিয়ান\s*(?:নম্বর|নং|নম্বরঃ|নংঃ)|Khatian\s*(?:No|Number|#))\s*[-:ঃ=]?\s*([০-৯0-9/]+)/i)?.[1] || '';
    const dag = text.match(/(?:দাগ\s*(?:নম্বর|নং|নম্বরঃ|নংঃ)|Dag\s*(?:No|Number|#))\s*[-:ঃ=]?\s*([০-৯0-9/,\s]+)/i)?.[1] || '';
    const mouza = text.match(/(?:মৌজা|Mouza)\s*[-:ঃ=]?\s*([^\n\r,]+)/i)?.[1] || '';
    const owner = text.match(/(?:মালিকের\s*নাম|Owner\s*Name)\s*[-:ঃ=]?\s*([^\n\r,]+)/i)?.[1] || '';
    const area = text.match(/(?:জমির\s*পরিমাণ|Land\s*Area)\s*[-:ঃ=]?\s*([০-৯0-9.\s]+(?:শতাংশ|একর|Decimal|Acre|কাঠা|বিঘা)?)/i)?.[1] || '';
    
    return { khatian, dag, mouza, owner, area };
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };

  const handleAnalyzeClauses = async (index: number) => {
    const msg = messages[index];
    if (!msg.imageUrls || msg.imageUrls.length === 0) return;
    
    setIsLoading(true);
    try {
      const parts = msg.imageUrls.map(url => {
        const mimeType = url.split(';')[0].split(':')[1];
        return {
          data: url.split(',')[1],
          mimeType: mimeType
        };
      });
      const analysis = await analyzeLegalClauses(parts);
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: analysis, 
        isClauseAnalysis: true, 
        docType: msg.docType 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'আইনি ধারা বিশ্লেষণ করতে সমস্যা হয়েছে।', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && selectedFiles.length === 0) || isLoading) return;
    if (isListening) recognitionRef.current?.stop();

    setIsLoading(true);
    const userMsg = input;
    const fileDataList = [...selectedFiles];
    const docType = selectedDocType;
    
    setInput('');
    setSelectedFiles([]);

    setMessages(prev => [...prev, { 
      role: 'user', 
      text: userMsg || `${getDocLabel(docType)} বিশ্লেষণ করুন`, 
      isDocument: fileDataList.length > 0,
      imageUrls: fileDataList.length > 0 ? fileDataList.map(f => f.url) : undefined,
      docType: fileDataList.length > 0 ? docType : undefined
    }]);

    try {
      if (fileDataList.length > 0) {
        const parts = fileDataList.map(f => ({
          data: f.url.split(',')[1],
          mimeType: f.type
        }));
        const analysis = await analyzeDocument(parts, docType);
        const isKhatianType = ['CS','SA','RS','BRS','Peti','Diara', 'NewKhatian', 'OldKhatian'].includes(docType as string);
        const isDeed = docType === 'Deed' || docType === 'NewDeed';
        
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: analysis,
          docType: docType,
          isError: analysis.includes('দুঃখিত'),
          canSummarize: !analysis.includes('দুঃখিত') && isKhatianType,
          canAnalyzeClauses: !analysis.includes('দুঃখিত') && isDeed,
          canVerifyDeed: !analysis.includes('দুঃখিত') && isDeed,
          canInitiateMutation: !analysis.includes('দুঃখিত') && (isKhatianType || isDeed)
        }]);
      } else {
        const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
        const response = await getLandAdvice(userMsg, history);
        setMessages(prev => [...prev, { role: 'model', text: response || 'দুঃখিত, কোনো ত্রুটি হয়েছে।' }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'সার্ভারে সংযোগ বিচ্ছিন্ন হয়েছে।', isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartEdit = (index: number, text: string) => {
    setEditingIndex(index);
    setEditingText(text);
  };

  const handleSaveEdit = (index: number) => {
    if (!editingText.trim()) return;
    const updatedMessages = [...messages];
    updatedMessages[index] = { ...updatedMessages[index], text: editingText };
    setMessages(updatedMessages);
    setEditingIndex(null);
    setEditingText('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditingText('');
  };

  const allTypes: DocType[] = ['Deed', 'NewDeed', 'CS', 'SA', 'RS', 'BRS', 'OldKhatian', 'NewKhatian', 'Peti', 'Diara', 'PlotMap', 'Khas', 'Vested', 'Abandoned', 'Reserved', 'GovtDept', 'WaterBody', 'Char', 'Waqf', 'Other'];
  const khatianTypes = ['CS', 'SA', 'RS', 'BRS', 'Peti', 'Diara', 'NewKhatian', 'OldKhatian'];

  const filteredMessages = useMemo(() => {
    if (activeFilter === 'All') return messages;
    return messages.filter((msg, idx) => {
      // Always show the welcome message
      if (idx === 0) return true;
      return msg.docType === activeFilter;
    });
  }, [messages, activeFilter]);

  const filteredDict = useMemo(() => {
    if (!dictSearch.trim()) return [];
    return dictionaryData.filter(entry => 
      entry.term.includes(dictSearch) || entry.definition.includes(dictSearch)
    ).slice(0, 5);
  }, [dictSearch]);

  return (
    <div className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 flex flex-col h-[800px] overflow-hidden transition-all duration-300">
      {/* Header */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-lg z-20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30 shadow-inner">
            <Bot size={28} className="text-white drop-shadow-md" />
          </div>
          <div>
            <h3 className="font-extrabold text-lg tracking-tight flex items-center gap-2">
              স্মার্ট ভূমি এআই <Sparkles size={16} className="text-emerald-300" />
            </h3>
            <p className="text-[11px] text-emerald-100 font-medium opacity-90">ভূমি আইন ও নথি বিশেষজ্ঞ</p>
          </div>
        </div>
        <div className="flex items-center gap-2 relative">
          <button 
            onClick={() => setShowDictionary(!showDictionary)}
            className={`p-2.5 rounded-xl transition-all flex items-center gap-2 font-bold text-xs ${
              showDictionary ? 'bg-white text-emerald-700 shadow-inner' : 'hover:bg-white/10 text-emerald-100 hover:text-white'
            }`}
            title="ভূমি অভিধান"
          >
            <BookOpen size={20} />
            <span className="hidden sm:inline">অভিধান</span>
          </button>
          <button onClick={() => {setMessages([messages[0]]); setActiveFilter('All');}} className="p-2.5 hover:bg-white/10 rounded-xl transition-all text-emerald-100 hover:text-white" title="চ্যাট মুছুন">
            <Trash2 size={20} />
          </button>
          
          {/* User Profile Dropdown Section (Requested Update) */}
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-xl transition-all border border-white/20 shadow-inner flex items-center justify-center active:scale-95"
              title="প্রোফাইল"
            >
              <UserCircle size={24} className="text-white" />
            </button>

            {showUserMenu && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-[2rem] shadow-2xl border border-gray-100 overflow-hidden z-20 animate-in fade-in zoom-in-95 duration-200">
                  <div className="bg-emerald-600 p-6 flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-emerald-600 mb-3 shadow-lg ring-4 ring-emerald-50/30 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=150&auto=format&fit=crop" 
                        alt="User Profile" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h4 className="text-white font-black text-lg tracking-tight">মজিবুর রহমান মিন্টু</h4>
                  </div>
                  <div className="p-3 space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 rounded-2xl transition-all group">
                      <User size={18} className="text-emerald-600 group-hover:scale-110 transition-transform" /> প্রোফাইল সেটিংস
                    </button>
                    <div className="h-px bg-gray-100 mx-4 my-1" />
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-2xl transition-all group">
                      <LogOut size={18} className="text-rose-500 group-hover:-translate-x-1 transition-transform" /> লগআউট করুন
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Message Filtering Bar */}
      <div className="bg-white/95 backdrop-blur-md border-b border-gray-100 px-6 py-3.5 flex items-center gap-3 overflow-x-auto scrollbar-hide z-10 sticky top-0 shadow-sm shadow-black/5">
        <div className="flex items-center gap-2 text-[10px] font-black text-emerald-900/40 uppercase tracking-[0.15em] shrink-0 border-r border-gray-100 pr-4 mr-1">
          <ListFilter size={16} className="text-emerald-600" /> ফিল্টার
        </div>
        <div className="flex items-center gap-2.5">
          <button 
            onClick={() => setActiveFilter('All')}
            className={`px-4 py-2 rounded-2xl text-[11px] font-black transition-all border flex items-center gap-2 shrink-0 ${
              activeFilter === 'All' 
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-200' 
                : 'bg-gray-50 text-gray-500 border-gray-100 hover:border-emerald-200 hover:bg-white'
            }`}
          >
            সব মেসেজ
            <span className={`px-2 py-0.5 rounded-full text-[9px] ${activeFilter === 'All' ? 'bg-white/20 text-white' : 'bg-gray-200 text-gray-600'}`}>
              {messages.length}
            </span>
          </button>
          
          {allTypes.map(type => {
            const count = messages.filter(m => m.docType === type).length;
            if (count === 0) return null;
            const isActive = activeFilter === type;
            const colorClass = getDocColorClass(type);
            
            return (
              <button 
                key={type}
                onClick={() => setActiveFilter(type)}
                className={`px-4 py-2 rounded-2xl text-[11px] font-black transition-all border flex items-center gap-2.5 shrink-0 shadow-sm ${
                  isActive 
                    ? `${colorClass} border-transparent shadow-emerald-100`
                    : 'bg-white text-gray-500 border-gray-100 hover:border-emerald-300'
                }`}
              >
                {getDocIcon(type, 14)}
                {getDocLabel(type)}
                <span className={`px-2 py-0.5 rounded-full text-[9px] ${isActive ? 'bg-black/10 text-white' : 'bg-emerald-50 text-emerald-700'}`}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-8 bg-[#fcfdfd] custom-scrollbar scroll-smooth relative">
        {/* Dictionary Quick Lookup Overlay */}
        {showDictionary && (
          <div className="absolute top-4 right-6 left-6 z-30 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-white rounded-[2rem] shadow-2xl border-2 border-emerald-100 overflow-hidden">
              <div className="p-4 bg-emerald-50 border-b border-emerald-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center">
                    <BookOpen size={18} />
                  </div>
                  <span className="text-sm font-black text-emerald-900 uppercase tracking-widest">ভূমি অভিধান সার্চ</span>
                </div>
                <button onClick={() => setShowDictionary(false)} className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6">
                <div className="relative mb-6">
                  <input 
                    type="text" 
                    placeholder="শব্দ বা পরিভাষা লিখুন (উদা: খতিয়ান, মৌজা)..."
                    value={dictSearch}
                    onChange={(e) => setDictSearch(e.target.value)}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm pr-12"
                    autoFocus
                  />
                  <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                
                <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {filteredDict.length > 0 ? (
                    filteredDict.map((entry, i) => (
                      <div key={i} className="p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:bg-white transition-all group cursor-pointer" onClick={() => {
                        setInput(prev => prev ? `${prev} ${entry.term}` : entry.term);
                        setShowDictionary(false);
                        setDictSearch('');
                      }}>
                        <div className="flex items-center justify-between mb-1">
                          <h5 className="font-black text-emerald-800 group-hover:text-emerald-600 transition-colors">{entry.term}</h5>
                          <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">{entry.category}</span>
                        </div>
                        <p className="text-xs text-gray-600 font-medium leading-relaxed">{entry.definition}</p>
                      </div>
                    ))
                  ) : dictSearch ? (
                    <div className="text-center py-8 text-gray-400 font-bold italic">
                      কোনো ফলাফল পাওয়া যায়নি
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-400 font-bold italic">
                      ভূমি সংক্রান্ত যেকোনো শব্দ লিখে সার্চ করুন
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Legal Disclaimer Banner */}
        {activeFilter === 'All' && (
          <div className="mb-8 p-5 bg-amber-50/70 backdrop-blur-sm border border-amber-100/50 rounded-[2rem] flex gap-4 items-start animate-in fade-in slide-in-from-top-4 duration-700 shadow-sm">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-2xl shrink-0 shadow-inner">
              <ShieldAlert size={22} />
            </div>
            <div>
              <h4 className="text-[11px] font-black text-amber-800 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                সতর্কবার্তা ও ডিসক্লেমার <div className="h-1.5 w-1.5 bg-amber-300 rounded-full" />
              </h4>
              <p className="text-[13px] font-medium text-amber-700 leading-relaxed">
                এই এআই সহকারীর পরামর্শ শুধুমাত্র সাধারণ তথ্যের উদ্দেশ্যে। এটি কোনো পেশাদার আইনি পরামর্শ (Legal Advice) হিসেবে গণ্য হবে না। ভূমির গুরুত্বপূর্ণ লেনদেন বা আইনি বিষয়ে চূড়ান্ত সিদ্ধান্তের পূর্বে অবশ্যই বিশেষজ্ঞ আইনজীবীর পরামর্শ নিন।
              </p>
            </div>
          </div>
        )}

        {filteredMessages.map((msg, idx) => {
          const isEditing = editingIndex === idx;
          const fields = msg.role === 'model' && msg.docType ? extractAnalyzedFields(msg.text) : null;
          const hasAnyData = fields && (fields.khatian || fields.dag || fields.mouza || fields.owner || fields.area);
          const isExpanded = expandedDetails[idx];
          const isKhatianRel = msg.docType && khatianTypes.includes(msg.docType);
          
          return (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-4 duration-500`}>
              <div className={`max-w-[85%] flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                <div className={`group relative p-6 rounded-[2.5rem] shadow-sm transition-all duration-300 ${
                  msg.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 
                  msg.isError ? 'bg-red-50 text-red-800 border-red-100 rounded-tl-none' : 
                  msg.isSummary ? 'bg-gradient-to-br from-emerald-50 to-white border-emerald-300 border-2 rounded-tl-none shadow-md' :
                  'bg-white text-gray-800 border-gray-100 rounded-tl-none border hover:shadow-md'
                }`}>
                  {msg.role === 'model' && (
                    <button 
                      onClick={() => handleCopy(msg.text, idx)}
                      className="absolute top-4 right-4 p-2 bg-gray-50 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all opacity-0 group-hover:opacity-100 shadow-sm border border-gray-100 z-10"
                      title="মেসেজ কপি করুন"
                    >
                      {copiedIndex === idx ? <Check size={16} className="text-emerald-600" /> : <Copy size={16} />}
                    </button>
                  )}

                  {msg.role === 'user' && !isEditing && (
                    <button 
                      onClick={() => handleStartEdit(idx, msg.text)}
                      className="absolute top-4 right-4 p-2 bg-white/10 text-white/70 hover:text-white hover:bg-white/20 rounded-xl transition-all opacity-0 group-hover:opacity-100 shadow-sm z-10"
                      title="মেসেজ এডিট করুন"
                    >
                      <Pencil size={14} />
                    </button>
                  )}

                  {msg.imageUrls && msg.imageUrls.length > 0 && (
                    <div className={`mb-5 rounded-3xl overflow-hidden border border-black/5 shadow-md relative ${
                      msg.imageUrls.length > 1 ? 'flex gap-3 overflow-x-auto scrollbar-hide p-3 bg-gray-50/50 snap-x' : ''
                    }`}>
                      {msg.imageUrls.map((url, i) => {
                        const isImage = url.startsWith('data:image/');
                        return (
                          <div key={i} className={`relative group/img overflow-hidden rounded-2xl bg-gray-100 shrink-0 snap-start ${
                            msg.imageUrls!.length > 1 ? 'w-48 h-48' : 'w-full'
                          }`}>
                            {isImage ? (
                              <img 
                                src={url} 
                                alt={`Doc ${i}`} 
                                className={`w-full h-full transition-transform hover:scale-105 object-cover ${
                                  msg.imageUrls!.length === 1 ? 'max-h-[500px] object-contain block mx-auto h-auto' : ''
                                }`} 
                              />
                            ) : (
                              <div className="w-full h-full flex flex-col items-center justify-center bg-gray-50 gap-2 p-4">
                                <FileText size={48} className={url.includes('pdf') ? 'text-red-500' : 'text-blue-500'} />
                                <span className="text-[10px] font-bold text-gray-500 text-center truncate w-full">
                                  {url.includes('pdf') ? 'PDF Document' : 'Text Document'}
                                </span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                              <Eye size={20} className="text-white drop-shadow-md" />
                            </div>
                          </div>
                        );
                      })}
                      <div className={`absolute top-2 right-2 backdrop-blur-sm text-white text-[10px] px-3 py-1.5 rounded-full font-bold shadow-lg flex items-center gap-1.5 z-10 border border-white/20 ${getDocColorClass(msg.docType || 'Other')}`}>
                        {getDocIcon(msg.docType || 'Other', 12)} {getDocLabel(msg.docType || 'Other')} {msg.imageUrls.length > 1 ? `(${msg.imageUrls.length})` : ''}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    {isEditing ? (
                      <div className="min-w-[200px] sm:min-w-[300px] flex flex-col gap-3">
                        <textarea
                          value={editingText}
                          onChange={(e) => setEditingText(e.target.value)}
                          className="w-full p-4 bg-emerald-700/30 text-white border border-emerald-400/50 rounded-2xl outline-none focus:border-white transition-all font-medium text-[15px] resize-none min-h-[100px]"
                          autoFocus
                        />
                        <div className="flex items-center justify-end gap-3">
                          <button 
                            onClick={handleCancelEdit}
                            className="px-4 py-2 text-[12px] font-black uppercase text-emerald-100 hover:text-white transition-colors"
                          >
                            বাতিল
                          </button>
                          <button 
                            onClick={() => handleSaveEdit(idx)}
                            className="px-5 py-2 bg-white text-emerald-700 rounded-xl text-[12px] font-black uppercase hover:bg-emerald-50 transition-all shadow-md"
                          >
                            সেভ করুন
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-4">
                        {msg.role === 'model' && (
                          <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border bg-emerald-50 border-emerald-100 shadow-sm">
                            {msg.isError ? <AlertTriangle size={20} className="text-red-600" /> : <Bot size={20} className="text-emerald-600" />}
                          </div>
                        )}
                        <div className="w-full">
                          <RichText text={msg.text} />
                        </div>
                      </div>
                    )}

                    {/* Extracted Khatian Display */}
                    {msg.role === 'model' && isKhatianRel && fields?.khatian && !msg.isError && (
                      <div className="mt-5 p-5 bg-emerald-50/50 border border-emerald-200/50 rounded-3xl flex items-center justify-between shadow-sm animate-in slide-in-from-left-4 duration-500">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                            <Hash size={24} />
                          </div>
                          <div>
                            <p className="text-[10px] font-black text-emerald-800/60 uppercase tracking-widest mb-0.5">সনাক্তকৃত খতিয়ান নম্বর</p>
                            <p className="text-xl font-black text-emerald-900 tracking-tight">{fields.khatian}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => {
                              navigator.clipboard.writeText(fields.khatian);
                              setCopiedIndex(5000 + idx);
                              setTimeout(() => setCopiedIndex(null), 2000);
                            }}
                            className={`p-3 rounded-xl transition-all shadow-sm border ${
                              copiedIndex === 5000 + idx ? 'bg-emerald-100 border-emerald-300 text-emerald-700' : 'bg-white border-gray-100 text-gray-500 hover:text-emerald-600 hover:border-emerald-200'
                            }`}
                            title="কপি করুন"
                          >
                            {copiedIndex === 5000 + idx ? <Check size={18}/> : <Copy size={18}/>}
                          </button>
                        </div>
                      </div>
                    )}

                    {hasAnyData && (
                      <div className="mt-5 flex flex-col gap-3">
                        <button 
                          onClick={() => toggleDetails(idx)}
                          className={`flex items-center self-start gap-2.5 px-5 py-2.5 bg-emerald-50 text-emerald-700 rounded-2xl text-[11px] font-black uppercase hover:bg-emerald-100 transition-all border border-emerald-100 shadow-sm ${isExpanded ? 'bg-emerald-100' : ''}`}
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          {isExpanded ? 'তথ্য সংক্ষেপ করুন' : 'বিস্তারিত তথ্য দেখুন (View Details)'}
                        </button>

                        {isExpanded && (
                          <div className="overflow-hidden bg-white border border-emerald-100 rounded-[2rem] shadow-xl shadow-emerald-900/5 transition-all animate-in slide-in-from-top-4 duration-500 khatian-field">
                            <div className="px-6 py-4 bg-gradient-to-r from-emerald-50 to-white border-b border-emerald-100 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-9 h-9 bg-emerald-600 text-white rounded-xl flex items-center justify-center shadow-md shadow-emerald-600/20">
                                  <FileSearch size={18} />
                                </div>
                                <span className="text-[12px] font-black text-emerald-900 uppercase tracking-widest">নথি বিশ্লেষণ বিস্তারিত</span>
                              </div>
                            </div>

                            <div className="p-3 space-y-1">
                              {[
                                { label: 'মালিকের নাম', val: fields.owner, icon: User, en: 'Owner Name' },
                                { label: 'খতিয়ান নম্বর', val: fields.khatian, icon: Hash, en: 'Khatian No' },
                                { label: 'দাগ নম্বর', val: fields.dag, icon: Layers, en: 'Dag No' },
                                { label: 'মৌজা', val: fields.mouza, icon: MapPin, en: 'Mouza' },
                                { label: 'জমির পরিমাণ', val: fields.area, icon: Maximize2, en: 'Land Area' }
                              ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors group/item">
                                  <div className="w-11 h-11 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0 group-hover/item:scale-110 transition-transform">
                                    <item.icon size={22} />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{item.label}</p>
                                      <p className="text-[9px] font-bold text-gray-300 italic group-hover/item:text-emerald-300 transition-colors uppercase">{item.en}</p>
                                    </div>
                                    <p className="text-[15px] font-black text-emerald-900 mt-1 truncate">{item.val || 'N/A'}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {(msg.canSummarize || msg.canAnalyzeClauses || msg.canVerifyDeed || msg.canInitiateMutation) && !msg.isSummary && !msg.isClauseAnalysis && (
                      <div className="mt-5 flex flex-col gap-2">
                        <div className="grid grid-cols-2 gap-3">
                          {msg.canSummarize && (
                            <button onClick={async () => {
                              setIsLoading(true);
                              const summary = await summarizeKhatian(msg.text);
                              setMessages(prev => [...prev, { role: 'model', text: summary, isSummary: true, docType: msg.docType }]);
                              setIsLoading(false);
                            }} className="flex items-center justify-center gap-2.5 px-4 py-3 bg-emerald-600 text-white rounded-2xl hover:bg-emerald-700 transition-all text-[11px] font-black uppercase shadow-lg shadow-emerald-100">
                              <Wand2 size={16} /> সারাংশ তৈরি
                            </button>
                          )}
                          {msg.canAnalyzeClauses && (
                            <button onClick={() => handleAnalyzeClauses(idx)} className="flex items-center justify-center gap-2.5 px-4 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all text-[11px] font-black uppercase shadow-lg shadow-blue-100">
                              <Scale size={16} /> ধারা বিশ্লেষণ
                            </button>
                          )}
                          {(msg.canSummarize || msg.canVerifyDeed || msg.canAnalyzeClauses) && (
                            <button 
                              onClick={() => {
                                const khatianNumber = extractAnalyzedFields(msg.text).khatian;
                                onTabChange?.('khatian', khatianNumber);
                              }} 
                              className="flex items-center justify-center gap-2.5 px-4 py-3 bg-white text-emerald-700 border-emerald-600 border-2 rounded-2xl hover:bg-emerald-50 transition-all text-[11px] font-black uppercase shadow-sm"
                            >
                              <SearchCheck size={16} /> খতিয়ান যাচাই
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        {isLoading && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="bg-white border border-emerald-100 p-6 rounded-[2.5rem] rounded-tl-none shadow-md flex items-center gap-4">
              <div className="relative">
                <Loader2 className="animate-spin text-emerald-600" size={28} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-ping" />
                </div>
              </div>
              <span className="text-sm font-black text-gray-800 tracking-tight">ভূমি এআই নথি বিশ্লেষণ করছে...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} className="h-0 w-0" />
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-gray-100 shadow-[0_-15px_40px_rgba(0,0,0,0.03)] z-30">
        
        {/* Selected Files Thumbnail Preview Area */}
        {(selectedFiles.length > 0 || uploadingFiles.length > 0) && (
          <div className="mb-6 animate-in slide-in-from-bottom-2 duration-300">
            <div className="flex items-center justify-between mb-3 px-2">
              <p className="text-[10px] font-black text-emerald-800/60 uppercase tracking-widest flex items-center gap-1.5">
                <Paperclip size={12} /> সংযুক্ত ফাইলসমূহ ({selectedFiles.length + uploadingFiles.length})
              </p>
              <button 
                onClick={() => { setSelectedFiles([]); setUploadingFiles([]); }} 
                className="text-[10px] font-bold text-red-500 hover:bg-red-50 px-2 py-1 rounded-lg transition-colors"
              >
                সব মুছে ফেলুন
              </button>
            </div>
            
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide px-1">
              {/* Uploading Progress Items */}
              {uploadingFiles.map((file) => (
                <div key={file.id} className="relative flex-shrink-0 w-20 h-20 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col items-center justify-center overflow-hidden">
                  <Loader2 size={16} className="text-emerald-500 animate-spin mb-1" />
                  <span className="text-[8px] font-bold text-gray-400">{file.progress}%</span>
                  <div className="absolute bottom-0 left-0 h-1 bg-emerald-500 transition-all duration-300" style={{ width: `${file.progress}%` }} />
                  <button 
                    onClick={() => cancelUpload(file.id)}
                    className="absolute top-1 right-1 p-0.5 bg-white/80 rounded-full text-gray-400 hover:text-red-500 shadow-sm"
                  >
                    <X size={10} />
                  </button>
                </div>
              ))}

              {/* Success Uploaded Thumbnails */}
              {selectedFiles.map((file, i) => (
                <div key={i} className="relative flex-shrink-0 group animate-in zoom-in duration-300">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-100 shadow-sm hover:border-emerald-500 transition-all cursor-zoom-in flex items-center justify-center bg-gray-50">
                    {file.type.startsWith('image/') ? (
                      <img src={file.url} alt={`Attached ${i}`} className="w-full h-full object-cover" />
                    ) : file.type === 'application/pdf' ? (
                      <div className="flex flex-col items-center gap-1">
                        <FileText size={24} className="text-red-500" />
                        <span className="text-[8px] font-bold text-gray-500 truncate max-w-[60px]">{file.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <FileText size={24} className="text-blue-500" />
                        <span className="text-[8px] font-bold text-gray-500 truncate max-w-[60px]">{file.name}</span>
                      </div>
                    )}
                  </div>
                  <button 
                    onClick={() => setSelectedFiles(prev => prev.filter((_, idx) => idx !== i))}
                    className="absolute -top-1.5 -right-1.5 p-1 bg-red-500 text-white rounded-full shadow-md opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
                    title="মুছে ফেলুন"
                  >
                    <XCircle size={14} />
                  </button>
                </div>
              ))}

              {/* Inline Add Button */}
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex-shrink-0 w-20 h-20 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 hover:border-emerald-300 hover:text-emerald-500 hover:bg-emerald-50/50 transition-all flex flex-col items-center justify-center gap-1"
              >
                <Plus size={20} />
                <span className="text-[9px] font-black uppercase">যুক্ত করুন</span>
              </button>
            </div>
          </div>
        )}

        {/* Action Buttons Bar - Document Type Selection */}
        <div className="mb-4 flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mr-3 shrink-0">নথি নির্বাচন:</p>
          {allTypes.map((type) => {
            const isActive = selectedDocType === type;
            const colorClass = getDocColorClass(type);
            return (
              <button
                key={type}
                onClick={() => setSelectedDocType(type)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-xl border text-[11px] font-bold transition-all flex items-center gap-1.5 ${
                  isActive 
                    ? `${colorClass} border-transparent shadow-sm scale-105` 
                    : 'bg-white text-gray-500 border-gray-100 hover:border-emerald-200'
                }`}
              >
                {getDocIcon(type, 12)}
                {getDocLabel(type)}
              </button>
            );
          })}
        </div>

        {/* Input Controls Container */}
        <div className="flex flex-col gap-2">
          {isListening && interimTranscript && (
            <div className="px-4 py-2 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-600 italic animate-pulse">{interimTranscript}...</div>
          )}
          <div className="flex items-end gap-3">
            <div className={`flex-1 bg-gray-50/80 border rounded-[2rem] p-4 transition-all relative ${isListening ? 'ring-2 ring-red-500 border-red-500 bg-white shadow-lg' : 'border-gray-200 shadow-inner'}`}>
              <textarea 
                ref={textareaRef} 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())} 
                placeholder="আপনার জিজ্ঞাসা লিখুন অথবা নথি বিশ্লেষণ করতে উপরে ফাইল যুক্ত করুন..." 
                className="w-full px-3 py-1 bg-transparent outline-none resize-none text-[15px] text-gray-700 font-medium min-h-[44px] max-h-[160px] custom-scrollbar" 
              />
              
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100/50">
                <div className="flex items-center gap-3">
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".png, .jpg, .jpeg, .pdf, .txt" multiple className="hidden" />
                  
                  <button 
                    onClick={() => fileInputRef.current?.click()} 
                    className="flex items-center gap-2.5 px-5 py-2.5 bg-emerald-600 text-white hover:bg-emerald-700 rounded-2xl transition-all font-black text-xs shadow-lg shadow-emerald-200/50 border border-emerald-500/50 group active:scale-95"
                    title="নথি সংযুক্ত করুন"
                  >
                    <Paperclip size={18} className="group-hover:rotate-12 transition-transform" /> 
                    <span className="tracking-tight">Attach Document</span>
                  </button>

                  <button 
                    onClick={handleFreshUpload} 
                    className="flex items-center gap-2 px-4 py-2.5 bg-white text-emerald-700 border border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 rounded-2xl transition-all font-black text-xs shadow-sm group active:scale-95"
                    title="নতুন নথি সংযুক্ত করুন (আগেরগুলো মুছে যাবে)"
                  >
                    <FilePlus size={16} className="group-hover:scale-110 transition-transform" /> 
                    <span>Attach New</span>
                  </button>

                  <button 
                    onClick={toggleListening} 
                    className={`p-2.5 rounded-2xl transition-all shadow-sm ${
                      isListening 
                        ? 'text-red-600 bg-red-50 ring-4 ring-red-100 mic-active scale-110' 
                        : 'text-gray-400 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    {isListening ? <MicOff size={22} /> : <Mic size={22} />}
                  </button>
                </div>

                <button 
                  onClick={handleSend} 
                  disabled={isLoading || (!input.trim() && selectedFiles.length === 0) || uploadingFiles.length > 0} 
                  className="p-4 bg-emerald-600 text-white rounded-[1.25rem] hover:bg-emerald-700 disabled:opacity-40 shadow-xl shadow-emerald-200 transition-all flex items-center justify-center group active:scale-95"
                >
                  <Send size={22} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <p className="mt-3 text-[10px] text-center text-gray-400 font-medium">
          ভূমি এআই ভুল তথ্য দিতে পারে। গুরুত্বপূর্ণ প্রয়োজনে নথিপত্র সরাসরি যাচাই করুন।
        </p>
      </div>
    </div>
  );
};

export default AIChat;
