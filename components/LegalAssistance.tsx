
import React, { useState } from 'react';
import { 
  Scale, 
  MessageSquare, 
  ShieldCheck, 
  Gavel, 
  Users, 
  FileText, 
  AlertCircle, 
  ArrowRight, 
  Bot, 
  Sparkles, 
  Send, 
  User, 
  History, 
  PhoneCall, 
  Info,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import AIChat from './AIChat';

interface LegalAssistanceProps {
  onTabChange: (tab: string) => void;
}

const LegalAssistance: React.FC<LegalAssistanceProps> = ({ onTabChange }) => {
  const [showChat, setShowChat] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const commonDisputes = [
    { id: 'inheritance', title: 'উত্তরাধিকার বণ্টন', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50', query: 'পৈত্রিক সম্পত্তির হিস্যা বা উত্তরাধিকার বণ্টন নিয়ে আইনি পরামর্শ চাই।' },
    { id: 'possession', title: 'জমি দখল ও উচ্ছেদ', icon: Gavel, color: 'text-rose-600', bg: 'bg-rose-50', query: 'জোরপূর্বক জমি দখল বা উচ্ছেদ সংক্রান্ত বিরোধের আইনি প্রতিকার কী?' },
    { id: 'forgery', title: 'ভুয়া দলীল ও জালিয়াতি', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50', query: 'ভুয়া দলীল বা জালিয়াতির মাধ্যমে মালিকানা দাবি করলে করণীয় কী?' },
    { id: 'boundary', title: 'সীমানা বিরোধ', icon: ShieldAlert, color: 'text-amber-600', bg: 'bg-amber-50', query: 'জমির সীমানা বা আইল নিয়ে বিরোধ নিষ্পত্তির আইনি পদ্ধতি কী?' },
  ];

  const handleConsultation = (query: string) => {
    setSelectedTopic(query);
    setShowChat(true);
  };

  if (showChat) {
    return (
      <div className="space-y-6 animate-in fade-in duration-500">
        <div className="flex items-center justify-between bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowChat(false)}
              className="w-10 h-10 bg-gray-50 text-gray-400 hover:text-emerald-600 rounded-xl flex items-center justify-center transition-all"
            >
              <ArrowRight className="rotate-180" size={20} />
            </button>
            <div>
              <h3 className="text-xl font-black text-gray-800 tracking-tight">এআই আইনি বিশেষজ্ঞের সাথে পরামর্শ</h3>
              <p className="text-xs text-gray-500 font-bold">আপনার সমস্যার বিস্তারিত লিখে পাঠান</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">
            <Sparkles size={14} /> এআই বিশেষজ্ঞ অনলাইন
          </div>
        </div>
        <AIChat onTabChange={() => {}} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-72 rounded-[3.5rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1505664194779-8beaceb93744?q=80&w=2070&auto=format&fit=crop" 
          alt="Legal Advice" 
          className="w-full h-full object-cover brightness-[0.3]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-blue-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
            <Scale size={16} className="text-blue-300" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">আইনি সহায়তা কেন্দ্র</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">ভূমি সংক্রান্ত আইনি পরামর্শ ও সমাধান</h2>
          <p className="text-blue-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90">
            আমাদের এআই আইনি বিশেষজ্ঞের সাথে কথা বলুন এবং আপনার ভূমি বিরোধের সঠিক সমাধান জানুন।
          </p>
        </div>
      </div>

      {/* Consultation Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-8 bg-blue-600 rounded-full" />
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">দ্রুত পরামর্শ শুরু করুন</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {commonDisputes.map((item) => (
              <button 
                key={item.id}
                onClick={() => handleConsultation(item.query)}
                className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group text-left"
              >
                <div className={`w-12 h-12 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-inner`}>
                  <item.icon size={24} />
                </div>
                <h4 className="text-lg font-black text-gray-800 mb-2 leading-tight">{item.title}</h4>
                <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                  পরামর্শ নিন <ChevronRight size={12} />
                </p>
              </button>
            ))}
          </div>

          {/* New Misc Case Guide Card */}
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform">
                <Gavel size={40} />
              </div>
              <div className="text-center md:text-left space-y-2">
                <h4 className="text-2xl font-black text-gray-800 tracking-tight">মিসকেস (Misc Case) আবেদন গাইড</h4>
                <p className="text-gray-500 text-sm font-medium leading-relaxed">
                  রেকর্ড সংশোধন বা ভূমি বিরোধ নিষ্পত্তির জন্য ধাপে ধাপে নির্দেশিকা এবং প্রয়োজনীয় কাগজপত্রের তালিকা।
                </p>
                <button 
                  onClick={() => onTabChange('misc-case')}
                  className="mt-4 px-8 py-3 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-rose-700 transition-all flex items-center gap-2 shadow-lg shadow-rose-900/20"
                >
                  গাইড দেখুন <ArrowRight size={16} />
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-50 rounded-full blur-3xl -mr-16 -mt-16 opacity-50" />
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[3rem] shadow-xl text-white relative overflow-hidden group">
            <div className="relative z-10 space-y-4">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                <FileText size={28} />
              </div>
              <h4 className="text-2xl font-black tracking-tight">এআই নথি বিশ্লেষক (Document Analyzer)</h4>
              <p className="text-blue-100 text-sm font-medium leading-relaxed">
                আপনার দলীল বা খতিয়ানের ছবি আপলোড করুন। এআই প্রতিটি ধারা বিশ্লেষণ করে আপনাকে আইনি পরামর্শ প্রদান করবে।
              </p>
              <button 
                onClick={() => onTabChange('doc-analyzer')}
                className="px-8 py-3 bg-white text-blue-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all flex items-center gap-2 shadow-lg"
              >
                বিশ্লেষণ শুরু করুন <ArrowRight size={16} />
              </button>
            </div>
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-[60px] -mr-24 -mt-24 group-hover:bg-white/20 transition-all" />
          </div>
          
          <button 
            onClick={() => setShowChat(true)}
            className="w-full p-8 bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-[3rem] shadow-2xl flex items-center justify-between group overflow-hidden relative"
          >
            <div className="relative z-10 text-left">
              <h4 className="text-2xl font-black mb-2 flex items-center gap-3">
                <Bot size={32} className="text-emerald-400" /> এআই বিশেষজ্ঞের সাথে চ্যাট
              </h4>
              <p className="text-gray-400 font-medium">আপনার যেকোনো আইনি প্রশ্ন সরাসরি জিজ্ঞাসা করুন</p>
            </div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 transition-all relative z-10">
              <MessageSquare size={32} />
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          </button>
        </div>

        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-8 bg-emerald-600 rounded-full" />
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">সরকারি আইনি সহায়তা (Legal Aid)</h3>
          </div>
          <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                <ShieldCheck size={32} />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black text-gray-800">জাতীয় আইনগত সহায়তা সংস্থা</h4>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  অসহায় ও দরিদ্র বিচারপ্রার্থীদের জন্য সরকার জেলা পর্যায়ে বিনামূল্যে আইনি সহায়তা প্রদান করে।
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white text-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                    <PhoneCall size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">টোল ফ্রি হটলাইন</p>
                    <p className="text-2xl font-black text-emerald-900">১৬৪৩০</p>
                  </div>
                </div>
                <button className="w-12 h-12 bg-emerald-600 text-white rounded-xl flex items-center justify-center hover:bg-emerald-700 transition-all shadow-lg">
                  <ArrowRight size={20} />
                </button>
              </div>

              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white text-gray-400 rounded-xl flex items-center justify-center shadow-sm">
                    <Info size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">অনলাইন আবেদন</p>
                    <p className="text-lg font-black text-gray-800">www.nlaso.gov.bd</p>
                  </div>
                </div>
                <button className="w-12 h-12 bg-gray-200 text-gray-500 rounded-xl flex items-center justify-center hover:bg-gray-300 transition-all">
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4 items-start">
              <AlertCircle size={20} className="text-amber-600 shrink-0" />
              <p className="text-xs text-amber-800 font-medium leading-relaxed">
                <span className="font-black">মনে রাখবেন:</span> এআই পরামর্শ শুধুমাত্র তথ্যের জন্য। গুরুত্বপূর্ণ আইনি বিষয়ে চূড়ান্ত সিদ্ধান্তের পূর্বে অবশ্যই আইনজীবীর পরামর্শ নিন।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Resources Section */}
      <div className="bg-gray-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
            <div className="text-center md:text-left space-y-2">
              <h3 className="text-3xl font-black tracking-tight">আইনি সহায়তার প্রয়োজনীয় নথিপত্র</h3>
              <p className="text-gray-400 font-medium">পরামর্শের সময় এই নথিগুলো সাথে রাখুন</p>
            </div>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-12 h-12 rounded-full border-4 border-gray-900 bg-emerald-600 flex items-center justify-center text-xs font-black shadow-xl">
                  {i}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'মালিকানার দলীল', desc: 'মূল দলীল বা সার্টিফাইড কপি।', icon: FileText },
              { title: 'খতিয়ান/পর্চা', desc: 'সিএস, এসএ, আরএস বা বিআরএস খতিয়ান।', icon: History },
              { title: 'দখলীয় প্রমাণ', desc: 'ভূমি উন্নয়ন কর পরিশোধের দাখিলা ও রসিদ।', icon: ShieldCheck }
            ].map((resource, idx) => (
              <div key={idx} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/10 hover:bg-white/10 transition-all group">
                <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <resource.icon size={28} />
                </div>
                <h4 className="text-xl font-black mb-2">{resource.title}</h4>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{resource.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] -mr-48 -mb-48" />
      </div>
    </div>
  );
};

export default LegalAssistance;
