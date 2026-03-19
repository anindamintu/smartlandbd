
import React, { useState } from 'react';
import { 
  FileCheck, 
  ScrollText, 
  Calculator, 
  ArrowRight, 
  ChevronLeft, 
  ShieldCheck, 
  FileText, 
  LayoutGrid,
  SearchCheck,
  ClipboardList,
  Scale,
  Bot,
  Sparkles
} from 'lucide-react';
import DeedVerification from './DeedVerification';
import DeedFormats from './DeedFormats';
import LandRegistration from './LandRegistration';
import DocumentAnalyzer from './DocumentAnalyzer';

import DeedWorkflow from './DeedWorkflow';

interface DeedModuleProps {
  initialView?: 'menu' | 'verification' | 'formats' | 'costs' | 'analysis' | 'workflow';
}

const DeedModule: React.FC<DeedModuleProps> = ({ initialView = 'menu' }) => {
  const [currentView, setCurrentView] = useState<'menu' | 'verification' | 'formats' | 'costs' | 'analysis' | 'workflow'>(initialView);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const deedOptions = [
    { 
      id: 'verification', 
      title: 'দলিল ভেরিফিকেশন', 
      desc: 'আপনার দলীলের সত্যতা ও বৈধতা অনলাইনে যাচাই করুন।', 
      icon: SearchCheck, 
      color: 'bg-blue-600' 
    },
    { 
      id: 'formats', 
      title: 'দলিল ফরমেট', 
      desc: 'বিভিন্ন প্রকার দলীলের আদর্শ নমুনা ও খসড়া তৈরি করুন।', 
      icon: ScrollText, 
      color: 'bg-emerald-600' 
    },
    { 
      id: 'costs', 
      title: 'দলিল খরচ', 
      desc: 'দলিল রেজিস্ট্রেশনের সরকারি ফি ও অন্যান্য খরচ হিসাব করুন।', 
      icon: Calculator, 
      color: 'bg-amber-600' 
    },
    { 
      id: 'analysis', 
      title: 'এআই দলিল বিশ্লেষণ', 
      desc: 'দলীলের মালিকানা, জমির পরিমাণ ও অসঙ্গতি এআই দিয়ে যাচাই করুন।', 
      icon: SearchCheck, 
      color: 'bg-rose-600' 
    },
    { 
      id: 'workflow', 
      title: 'দলীল প্রসেসিং', 
      desc: 'ধাপে ধাপে দলীলের তথ্য প্রদান করে পূর্ণাঙ্গ খসড়া তৈরি করুন।', 
      icon: FileCheck, 
      color: 'bg-indigo-600' 
    },
  ];

  if (currentView === 'menu') {
    return (
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner mb-6">
            <LayoutGrid size={40} />
          </div>
          <h2 className="text-4xl font-black text-gray-800 tracking-tight">দলিল সেবা কেন্দ্র</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">
            দলিল সংক্রান্ত সকল ডিজিটাল সেবা এখন এক জায়গায়। আপনার প্রয়োজনীয় সেবাটি নির্বাচন করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {deedOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setCurrentView(option.id as any)}
              className="group bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all text-left flex flex-col items-start gap-6"
            >
              <div className={`w-16 h-16 ${option.color} text-white rounded-[1.25rem] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
                <option.icon size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-800 group-hover:text-emerald-600 transition-colors">{option.title}</h3>
                <p className="text-gray-500 font-medium text-sm leading-relaxed">{option.desc}</p>
                <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  প্রবেশ করুন <ArrowRight size={14} />
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="bg-emerald-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <h3 className="text-3xl font-black tracking-tight">দলিল রেজিস্ট্রেশন কেন জরুরি?</h3>
              <p className="text-emerald-100/80 font-medium leading-relaxed">
                জমির মালিকানা প্রমাণের প্রধান আইনি দলিল হলো রেজিস্ট্রেশনকৃত দলীল। সঠিক নিয়মে দলীল সম্পাদন ও রেজিস্ট্রেশন না করলে জমির মালিকানা নিয়ে আইনি জটিলতা সৃষ্টি হতে পারে। আমাদের এই মডিউল আপনাকে নির্ভুলভাবে দলীল প্রস্তুত ও যাচাই করতে সাহায্য করবে।
              </p>
            </div>
            <div className="flex flex-col gap-4">
               <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                  <ShieldCheck className="text-emerald-400" size={24} />
                  <span className="text-sm font-bold">১০০% নিরাপদ ও আইনি তথ্য</span>
               </div>
               <div className="flex items-center gap-3 bg-white/10 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
                  <ClipboardList className="text-emerald-400" size={24} />
                  <span className="text-sm font-bold">সহজ ও দ্রুত সেবা</span>
               </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] -mr-48 -mt-48" />
        </div>

        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner group-hover:scale-110 transition-transform">
                <Bot size={32} />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-black tracking-tight">এআই দলিল বিশেষজ্ঞ</h4>
                <p className="text-blue-50 text-sm font-medium opacity-90">দলিল সংক্রান্ত যেকোনো আইনি জটিলতায় বা শর্তাবলীতে পরামর্শ নিন।</p>
              </div>
            </div>
            <button 
              className="px-8 py-4 bg-white text-blue-700 rounded-2xl font-black shadow-xl hover:bg-blue-50 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              এআই পরামর্শ নিন <Sparkles size={18} />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />
        </div>
      </div>
    );
  }

  const BackButton = () => (
    <button 
      onClick={() => setCurrentView('menu')}
      className="flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-black text-xs uppercase tracking-widest mb-8 transition-colors"
    >
      <ChevronLeft size={18} /> ফিরে যান
    </button>
  );

  return (
    <div className="animate-in fade-in duration-500">
      <BackButton />
      {currentView === 'verification' && <DeedVerification />}
      {currentView === 'formats' && <DeedFormats />}
      {currentView === 'costs' && <LandRegistration />}
      {currentView === 'analysis' && <DocumentAnalyzer />}
      {currentView === 'workflow' && <DeedWorkflow />}
    </div>
  );
};

export default DeedModule;
