
import React, { useState, useRef, useEffect } from 'react';
import { 
  FileSearch, 
  Upload, 
  Bot, 
  Loader2, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Info, 
  Search, 
  History, 
  Landmark, 
  Waves, 
  FileQuestion, 
  Trees, 
  Building2, 
  MapPin, 
  Droplets, 
  Mountain, 
  ScrollText, 
  Scale, 
  Sparkles, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  X, 
  Maximize2, 
  Copy, 
  Check, 
  MessageSquare, 
  Send,
  FileCheck,
  Layers,
  Scroll
} from 'lucide-react';
import { analyzeDocument, analyzeLegalClauses, detectInconsistencies, getLandAdvice, DocType } from '../services/geminiService';

// Reusable RichText component (simplified version for now, or we can import it if we move it)
const RichText: React.FC<{ text: string }> = ({ text }) => {
  const parseInline = (line: string) => {
    const parts = [];
    let lastIndex = 0;
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
            {match[6]}
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

const DocumentAnalyzer: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<{ url: string, type: string, name: string }[]>([]);
  const [docType, setDocType] = useState<DocType>('Deed');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [clauseAnalysis, setClauseAnalysis] = useState<string | null>(null);
  const [inconsistencyAnalysis, setInconsistencyAnalysis] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'clauses' | 'inconsistencies' | 'chat'>('summary');
  const [chatMessages, setChatMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files) as File[];
      fileList.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedFiles(prev => [...prev, { 
            url: reader.result as string, 
            type: file.type, 
            name: file.name 
          }]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const startAnalysis = async () => {
    if (selectedFiles.length === 0) return;
    
    setIsAnalyzing(true);
    setAnalysisResult(null);
    setClauseAnalysis(null);
    setInconsistencyAnalysis(null);
    setChatMessages([]);

    try {
      const parts = selectedFiles.map(f => ({
        data: f.url.split(',')[1],
        mimeType: f.type
      }));

      // Perform basic analysis
      const basicResult = await analyzeDocument(parts, docType);
      setAnalysisResult(basicResult);

      // If it's a deed, also perform clause and inconsistency analysis
      if (docType === 'Deed' || docType === 'NewDeed') {
        const [clauses, inconsistencies] = await Promise.all([
          analyzeLegalClauses(parts),
          detectInconsistencies(parts)
        ]);
        setClauseAnalysis(clauses);
        setInconsistencyAnalysis(inconsistencies);
      }
    } catch (error) {
      console.error("Analysis failed", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleChatSend = async () => {
    if (!chatInput.trim() || isChatLoading) return;

    const userMsg = chatInput;
    setChatInput('');
    setChatMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsChatLoading(true);

    try {
      const history = chatMessages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
      // Add context about the document
      const context = `ব্যবহারকারী একটি ${docType} আপলোড করেছেন। 
      নথির প্রাথমিক বিশ্লেষণ: ${analysisResult}
      ${clauseAnalysis ? `আইনি ধারা বিশ্লেষণ: ${clauseAnalysis}` : ''}
      ${inconsistencyAnalysis ? `অসঙ্গতি বিশ্লেষণ: ${inconsistencyAnalysis}` : ''}
      
      এখন ব্যবহারকারীর প্রশ্নের উত্তর দিন।`;
      
      const response = await getLandAdvice(userMsg, [
        { role: 'model', parts: [{ text: context }] },
        ...history
      ]);
      
      setChatMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      setChatMessages(prev => [...prev, { role: 'model', text: 'দুঃখিত, উত্তর দিতে সমস্যা হচ্ছে।' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleCopy = () => {
    let text = '';
    if (activeTab === 'summary') text = analysisResult || '';
    else if (activeTab === 'clauses') text = clauseAnalysis || '';
    else if (activeTab === 'inconsistencies') text = inconsistencyAnalysis || '';
    
    if (text) {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const docTypes: { value: DocType, label: string, icon: any }[] = [
    { value: 'Deed', label: 'দলীল (Deed)', icon: FileCheck },
    { value: 'RS', label: 'আরএস খতিয়ান', icon: FileText },
    { value: 'SA', label: 'এসএ খতিয়ান', icon: Landmark },
    { value: 'CS', label: 'সিএস খতিয়ান', icon: History },
    { value: 'BRS', label: 'বিআরএস খতিয়ান', icon: Layers },
    { value: 'PlotMap', label: 'নকশা/ম্যাপ', icon: MapPin },
    { value: 'Other', label: 'অন্যান্য নথি', icon: FileQuestion },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] shadow-sm border border-emerald-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50/50 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
              <FileSearch size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">এআই নথি বিশ্লেষক</h1>
              <p className="text-emerald-600 font-bold flex items-center gap-2">
                <Sparkles size={16} /> দলীলের ধারা ও খতিয়ান বিশ্লেষণ
              </p>
            </div>
          </div>
          <p className="text-gray-600 max-w-xl font-medium leading-relaxed">
            আপনার দলীল বা খতিয়ানের ছবি আপলোড করুন। আমাদের এআই সিস্টেম স্বয়ংক্রিয়ভাবে নথির গুরুত্বপূর্ণ তথ্য, আইনি ধারা এবং সম্ভাব্য ঝুঁকিগুলো বিশ্লেষণ করে আপনাকে জানাবে।
          </p>
        </div>
        
        <div className="flex gap-3 relative z-10">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">নিরাপত্তা</p>
              <p className="text-xs font-bold text-emerald-700">১০০% গোপনীয়তা রক্ষা</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload & Config */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-6">
            <div>
              <label className="block text-sm font-black text-gray-700 mb-4 uppercase tracking-widest flex items-center gap-2">
                <Layers size={16} className="text-emerald-500" /> নথির ধরন নির্বাচন করুন
              </label>
              <div className="grid grid-cols-1 gap-2">
                {docTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setDocType(type.value)}
                    className={`flex items-center gap-3 p-4 rounded-2xl border-2 transition-all text-left group ${
                      docType === type.value
                        ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-100'
                        : 'bg-gray-50 border-transparent text-gray-600 hover:bg-white hover:border-emerald-200'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                      docType === type.value ? 'bg-white/20' : 'bg-white text-emerald-600 shadow-sm'
                    }`}>
                      <type.icon size={20} />
                    </div>
                    <span className="font-bold">{type.label}</span>
                    {docType === type.value && <CheckCircle2 size={18} className="ml-auto" />}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100" />

            <div>
              <label className="block text-sm font-black text-gray-700 mb-4 uppercase tracking-widest flex items-center gap-2">
                <Upload size={16} className="text-emerald-500" /> নথি আপলোড করুন
              </label>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-emerald-200 rounded-[2rem] p-8 text-center cursor-pointer hover:bg-emerald-50/50 hover:border-emerald-400 transition-all group relative overflow-hidden"
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  multiple 
                  accept="image/*"
                />
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-inner">
                    <Upload size={32} />
                  </div>
                  <p className="text-sm font-black text-emerald-900 mb-1">ছবি নির্বাচন করুন</p>
                  <p className="text-[11px] text-gray-500 font-medium">PNG, JPG (সর্বোচ্চ ১০ মেগাবাইট)</p>
                </div>
              </div>

              {selectedFiles.length > 0 && (
                <div className="mt-6 space-y-3">
                  {selectedFiles.map((file, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-2xl border border-gray-100 group">
                      <div className="w-12 h-12 rounded-xl overflow-hidden border border-gray-200 shrink-0">
                        <img src={file.url} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-gray-800 truncate">{file.name}</p>
                        <p className="text-[10px] text-gray-400 font-medium uppercase tracking-tighter">আপলোড সম্পন্ন</p>
                      </div>
                      <button 
                        onClick={() => removeFile(idx)}
                        className="p-2 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={startAnalysis}
              disabled={selectedFiles.length === 0 || isAnalyzing}
              className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg ${
                selectedFiles.length === 0 || isAnalyzing
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200 active:scale-95'
              }`}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  বিশ্লেষণ করা হচ্ছে...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  বিশ্লেষণ শুরু করুন
                </>
              )}
            </button>
          </div>

          <div className="bg-amber-50 p-6 rounded-[2rem] border border-amber-100 flex gap-4">
            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
              <AlertTriangle size={20} />
            </div>
            <div>
              <h4 className="text-xs font-black text-amber-800 uppercase tracking-widest mb-1">সতর্কতা</h4>
              <p className="text-[13px] text-amber-700 font-medium leading-relaxed">
                এআই-এর বিশ্লেষণ শুধুমাত্র তথ্যের জন্য। আইনি বিষয়ে চূড়ান্ত সিদ্ধান্তের জন্য আইনজীবীর পরামর্শ নিন।
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-8">
          {!analysisResult && !isAnalyzing ? (
            <div className="h-full min-h-[500px] bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-300 mb-6">
                <FileSearch size={48} />
              </div>
              <h3 className="text-xl font-black text-gray-400 mb-2">কোনো বিশ্লেষণ নেই</h3>
              <p className="text-gray-400 max-w-xs font-medium">
                বাম পাশের প্যানেল থেকে আপনার নথি আপলোড করে বিশ্লেষণ শুরু করুন।
              </p>
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full min-h-[600px]">
              {/* Tabs */}
              <div className="flex border-b border-gray-100 bg-gray-50/50 p-2">
                <button
                  onClick={() => setActiveTab('summary')}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm transition-all ${
                    activeTab === 'summary'
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-gray-500 hover:text-emerald-600'
                  }`}
                >
                  <FileText size={18} />
                  মূল তথ্য
                </button>
                {(docType === 'Deed' || docType === 'NewDeed') && (
                  <button
                    onClick={() => setActiveTab('clauses')}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm transition-all ${
                      activeTab === 'clauses'
                        ? 'bg-white text-emerald-700 shadow-sm'
                        : 'text-gray-500 hover:text-emerald-600'
                    }`}
                  >
                    <Scale size={18} />
                    আইনি ধারা বিশ্লেষণ
                  </button>
                )}
                {(docType === 'Deed' || docType === 'NewDeed') && (
                  <button
                    onClick={() => setActiveTab('inconsistencies')}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm transition-all ${
                      activeTab === 'inconsistencies'
                        ? 'bg-white text-emerald-700 shadow-sm'
                        : 'text-gray-500 hover:text-emerald-600'
                    }`}
                  >
                    <AlertTriangle size={18} />
                    অসঙ্গতি সনাক্তকরণ
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('chat')}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl font-black text-sm transition-all ${
                    activeTab === 'chat'
                      ? 'bg-white text-emerald-700 shadow-sm'
                      : 'text-gray-500 hover:text-emerald-600'
                  }`}
                >
                  <MessageSquare size={18} />
                  এআই পরামর্শ
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
                {activeTab === 'summary' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center">
                          <CheckCircle2 size={24} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900">নথির সারসংক্ষেপ</h3>
                      </div>
                      <button 
                        onClick={handleCopy}
                        className="p-2.5 bg-gray-50 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'কপি হয়েছে' : 'কপি করুন'}
                      </button>
                    </div>
                    
                    {isAnalyzing ? (
                      <div className="space-y-4">
                        <div className="h-4 bg-gray-100 rounded-full w-3/4 animate-pulse" />
                        <div className="h-4 bg-gray-100 rounded-full w-full animate-pulse" />
                        <div className="h-4 bg-gray-100 rounded-full w-5/6 animate-pulse" />
                        <div className="h-4 bg-gray-100 rounded-full w-2/3 animate-pulse" />
                      </div>
                    ) : (
                      <div className="prose prose-emerald max-w-none">
                        <RichText text={analysisResult || ''} />
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'clauses' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                          <Scale size={24} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900">আইনি ধারা ও শর্তাবলী</h3>
                      </div>
                      <button 
                        onClick={handleCopy}
                        className="p-2.5 bg-gray-50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'কপি হয়েছে' : 'কপি করুন'}
                      </button>
                    </div>

                    {isAnalyzing ? (
                      <div className="space-y-4">
                        <div className="h-4 bg-gray-100 rounded-full w-full animate-pulse" />
                        <div className="h-4 bg-gray-100 rounded-full w-3/4 animate-pulse" />
                        <div className="h-4 bg-gray-100 rounded-full w-5/6 animate-pulse" />
                      </div>
                    ) : (
                      <div className="prose prose-blue max-w-none">
                        <RichText text={clauseAnalysis || 'আইনি ধারা বিশ্লেষণ পাওয়া যায়নি।'} />
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'inconsistencies' && (
                  <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center">
                          <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-xl font-black text-gray-900">অসঙ্গতি ও ঝুঁকি বিশ্লেষণ</h3>
                      </div>
                      <button 
                        onClick={handleCopy}
                        className="p-2.5 bg-gray-50 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                        {copied ? 'কপি হয়েছে' : 'কপি করুন'}
                      </button>
                    </div>

                    {isAnalyzing ? (
                      <div className="space-y-4">
                        <div className="h-4 bg-gray-100 rounded-full w-full animate-pulse" />
                        <div className="h-4 bg-gray-100 rounded-full w-2/3 animate-pulse" />
                        <div className="h-4 bg-gray-100 rounded-full w-5/6 animate-pulse" />
                      </div>
                    ) : (
                      <div className="prose prose-rose max-w-none">
                        <RichText text={inconsistencyAnalysis || 'অসঙ্গতি বিশ্লেষণ পাওয়া যায়নি।'} />
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'chat' && (
                  <div className="h-full flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="flex-1 space-y-6 mb-6">
                      {chatMessages.length === 0 && (
                        <div className="text-center py-12">
                          <div className="w-16 h-16 bg-emerald-50 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <MessageSquare size={32} />
                          </div>
                          <h4 className="text-lg font-black text-gray-700 mb-2">এআই সহকারীর সাথে কথা বলুন</h4>
                          <p className="text-sm text-gray-500 max-w-xs mx-auto font-medium">
                            এই নথি সম্পর্কে আপনার কোনো প্রশ্ন থাকলে নিচে লিখে পাঠান।
                          </p>
                        </div>
                      )}
                      
                      {chatMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-4 rounded-[1.5rem] ${
                            msg.role === 'user' 
                              ? 'bg-emerald-600 text-white rounded-tr-none shadow-md' 
                              : 'bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200'
                          }`}>
                            <div className="text-[14.5px] leading-relaxed font-medium">
                              {msg.role === 'model' ? <RichText text={msg.text} /> : msg.text}
                            </div>
                          </div>
                        </div>
                      ))}
                      {isChatLoading && (
                        <div className="flex justify-start">
                          <div className="bg-gray-100 p-4 rounded-[1.5rem] rounded-tl-none border border-gray-200 flex items-center gap-2">
                            <Loader2 size={16} className="animate-spin text-emerald-600" />
                            <span className="text-xs font-bold text-gray-500">এআই ভাবছে...</span>
                          </div>
                        </div>
                      )}
                      <div ref={chatEndRef} />
                    </div>

                    <div className="relative mt-auto">
                      <input 
                        type="text" 
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleChatSend()}
                        placeholder="নথি সম্পর্কে প্রশ্ন করুন..."
                        className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-inner pr-14"
                      />
                      <button 
                        onClick={handleChatSend}
                        disabled={!chatInput.trim() || isChatLoading}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocumentAnalyzer;
