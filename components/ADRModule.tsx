
import React, { useState } from 'react';
import { 
  Scale, 
  Users, 
  Handshake, 
  CheckCircle2, 
  Info, 
  ArrowRight, 
  MessageSquare, 
  FileText, 
  Gavel, 
  ShieldCheck, 
  Zap, 
  Clock, 
  DollarSign,
  Search,
  ChevronDown,
  AlertCircle,
  HelpCircle,
  BookOpen
} from 'lucide-react';

const ADRModule: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);

  const adrSteps = [
    { title: 'আবেদন দাখিল', desc: 'উভয় পক্ষ বা এক পক্ষ এসি ল্যান্ড বা ইউনিয়ন ভূমি অফিসে আবেদন করবেন।' },
    { title: 'প্রাথমিক শুনানি', desc: 'ভূমি কর্মকর্তা উভয় পক্ষকে ডেকে প্রাথমিক শুনানি গ্রহণ করবেন।' },
    { title: 'সালিশি বোর্ড গঠন', desc: 'স্থানীয় গণ্যমান্য ব্যক্তি ও কর্মকর্তাদের সমন্বয়ে বোর্ড গঠন।' },
    { title: 'মীমাংসা ও চুক্তি', desc: 'উভয় পক্ষের সম্মতিতে লিখিত আপোষনামা বা চুক্তি সম্পাদন।' },
    { title: 'রেকর্ড সংশোধন', desc: 'চুক্তির ভিত্তিতে প্রয়োজনীয় ভূমি রেকর্ড সংশোধন (যদি প্রয়োজন হয়)।' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-80 rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=2069&auto=format&fit=crop" 
          alt="ADR" 
          className="w-full h-full object-cover brightness-[0.4]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-emerald-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
            <Handshake size={16} className="text-emerald-300" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">বিকল্প বিরোধ নিষ্পত্তি (ADR)</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">আদালতের বাইরে ভূমি বিরোধ নিষ্পত্তি</h2>
          <p className="text-emerald-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90">
            দীর্ঘমেয়াদী মামলা এড়িয়ে আপোষ-মীমাংসার মাধ্যমে দ্রুত ও সাশ্রয়ী উপায়ে আপনার জমির সমস্যা সমাধান করুন।
          </p>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'সময় সাশ্রয়', desc: 'বছরের পর বছর মামলা না চালিয়ে কয়েক সপ্তাহের মধ্যেই সমাধান সম্ভব।', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'অর্থ সাশ্রয়', desc: 'আইনি লড়াইয়ের বিশাল খরচ ও উকিল ফি থেকে মুক্তি পান।', icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { title: 'সম্পর্ক উন্নয়ন', desc: 'শত্রুতা না বাড়িয়ে উভয় পক্ষের সম্মতিতে শান্তিপূর্ণ সমাধান।', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' }
        ].map((benefit, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className={`w-14 h-14 ${benefit.bg} ${benefit.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
              <benefit.icon size={28} />
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-3">{benefit.title}</h3>
            <p className="text-gray-500 text-sm leading-relaxed font-medium">{benefit.desc}</p>
          </div>
        ))}
      </div>

      {/* ADR Process Steps */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <h3 className="text-2xl font-black text-gray-800 mb-12 text-center">এডিআর (ADR) প্রক্রিয়ার ধাপসমূহ</h3>
        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 hidden md:block" />
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 relative z-10">
            {adrSteps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div 
                  onClick={() => setActiveStep(i)}
                  className={`w-16 h-16 rounded-full flex items-center justify-center font-black text-xl mb-6 cursor-pointer transition-all border-4 ${
                    activeStep === i 
                      ? 'bg-emerald-600 text-white border-emerald-100 shadow-xl scale-110' 
                      : 'bg-white text-gray-400 border-gray-50 hover:border-emerald-100'
                  }`}
                >
                  {i + 1}
                </div>
                <h4 className={`font-black text-sm mb-2 ${activeStep === i ? 'text-emerald-700' : 'text-gray-600'}`}>{step.title}</h4>
                <p className="text-[10px] text-gray-400 font-bold leading-relaxed max-w-[150px]">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Legal Basis */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
            <h3 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
              <Gavel size={28} className="text-indigo-600" /> আইনি ভিত্তি ও গ্রাম আদালত
            </h3>
            <div className="space-y-6">
              <p className="text-gray-600 font-medium leading-relaxed">
                বাংলাদেশের আইন অনুযায়ী নির্দিষ্ট সীমার মধ্যে ভূমি বিরোধ নিষ্পত্তিতে গ্রাম আদালত ও সালিশি ব্যবস্থার আইনি বৈধতা রয়েছে। বিশেষ করে সীমানা বিরোধ ও দখল সংক্রান্ত ছোটখাটো সমস্যা এডিআর-এর মাধ্যমে সমাধান করা বাধ্যতামূলক করা হচ্ছে।
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  'গ্রাম আদালত আইন, ২০০৬',
                  'দেওয়ানী কার্যবিধি (সংশোধিত), ২০০৩',
                  'পারিবারিক আদালত অধ্যাদেশ, ১৯৮৫',
                  'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩'
                ].map((law, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-indigo-100 transition-all">
                    <BookOpen size={18} className="text-indigo-500" />
                    <span className="text-sm font-bold text-gray-700">{law}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ/Guidance */}
          <div className="bg-emerald-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-black mb-8 flex items-center gap-3">
                <HelpCircle size={28} className="text-emerald-400" /> সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)
              </h3>
              <div className="space-y-6">
                {[
                  { q: 'এডিআর কি বাধ্যতামূলক?', a: 'অনেক ক্ষেত্রে আদালত মামলা গ্রহণের আগে এডিআর চেষ্টার নির্দেশ দেন। এটি বাধ্যতামূলক না হলেও অত্যন্ত সুপারিশকৃত।' },
                  { q: 'মীমাংসা না হলে কি হবে?', a: 'যদি এডিআর-এ সমাধান না হয়, তবে আপনি নিয়মিত আদালতে মামলা করার পূর্ণ অধিকার রাখেন।' },
                  { q: 'আপোষনামার আইনি মূল্য কি?', a: 'উভয় পক্ষের স্বাক্ষরিত ও রেজিস্ট্রিকৃত আপোষনামা আদালতে প্রমাণ হিসেবে গৃহীত হয় এবং এটি কার্যকর করা বাধ্যতামূলক।' }
                ].map((item, i) => (
                  <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                    <h4 className="font-black text-emerald-300 mb-2 flex items-center gap-2">
                      <Zap size={16} /> {item.q}
                    </h4>
                    <p className="text-sm text-emerald-100/80 font-medium leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          </div>
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
                <MessageSquare size={28} />
              </div>
              <div>
                <h4 className="text-xl font-black text-gray-800">পরামর্শ নিন</h4>
                <p className="text-sm text-gray-500 font-medium">এডিআর বিশেষজ্ঞের সাথে কথা বলুন।</p>
              </div>
            </div>
            <div className="space-y-4">
              <button className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-3">
                অনলাইন আবেদন করুন <ArrowRight size={20} />
              </button>
              <button className="w-full py-5 bg-gray-50 text-gray-700 rounded-2xl font-black hover:bg-gray-100 transition-all border border-gray-100">
                নিকটস্থ এডিআর সেল খুঁজুন
              </button>
            </div>
          </div>

          <div className="bg-indigo-50 p-8 rounded-[3rem] border border-indigo-100">
            <h4 className="text-lg font-black text-indigo-900 mb-4 flex items-center gap-2">
              <ShieldCheck size={20} /> সফলতার হার
            </h4>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-700">নিষ্পত্তি হার</span>
                <span className="text-xl font-black text-indigo-900">৮৫%</span>
              </div>
              <div className="w-full h-2 bg-indigo-200 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 w-[85%]" />
              </div>
              <p className="text-[10px] text-indigo-600 font-medium leading-relaxed">
                বিগত বছরে বিকল্প বিরোধ নিষ্পত্তির মাধ্যমে প্রায় ১০,০০০+ ভূমি বিরোধ সফলভাবে সমাধান করা হয়েছে।
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ADRModule;
