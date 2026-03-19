
import React, { useState } from 'react';
import { 
  Gavel, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Download, 
  BookOpen, 
  Landmark, 
  UserCheck, 
  Scale, 
  MousePointer2, 
  Clock, 
  ShieldCheck, 
  HelpCircle, 
  Share2, 
  MessageSquareText, 
  FileText,
  ChevronDown,
  ExternalLink,
  ClipboardList,
  MapPin,
  Phone
} from 'lucide-react';

const MiscCaseModule: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number | null>(1);
  const [caseType, setCaseType] = useState<'correction' | 'dispute'>('correction');

  const steps = [
    {
      id: 1,
      title: 'আবেদন প্রস্তুতি ও দাখিল (Preparation & Filing)',
      desc: 'সঠিক ফরম্যাটে আবেদনপত্র প্রস্তুত করা এবং প্রয়োজনীয় কোর্ট ফি সংযুক্ত করে এসি ল্যান্ড অফিসে জমা দেওয়া।',
      details: [
        'সাদা কাগজে বা নির্ধারিত ফরমে আবেদন।',
        '২০ টাকার কোর্ট ফি সংযুক্তকরণ।',
        'আবেদনকারীর এনআইডি ও মোবাইল নম্বর প্রদান।',
        'বিবাদী (যদি থাকে) এর সঠিক নাম ও ঠিকানা।'
      ],
      icon: FileText,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: 2,
      title: 'শুনানি ও সাক্ষ্য গ্রহণ (Hearing)',
      desc: 'এসি ল্যান্ড উভয় পক্ষকে নোটিশের মাধ্যমে তলব করেন এবং তাদের বক্তব্য ও দলিলাদি পর্যালোচনা করেন।',
      details: [
        'উভয় পক্ষের উপস্থিতিতে শুনানি।',
        'মূল দলিলাদি (Original Documents) প্রদর্শন।',
        'প্রয়োজনে সাক্ষীদের জবানবন্দি গ্রহণ।'
      ],
      icon: UserCheck,
      color: 'text-amber-600',
      bg: 'bg-amber-50'
    },
    {
      id: 3,
      title: 'তদন্ত ও প্রতিবেদন (Investigation)',
      desc: 'প্রয়োজনীয় ক্ষেত্রে কানুনগো বা ইউনিয়ন ভূমি সহকারী কর্মকর্তা সরেজমিনে তদন্ত করে প্রতিবেদন দাখিল করেন।',
      details: [
        'জমির বাস্তব দখল ও সীমানা যাচাই।',
        'মৌজা ম্যাপের সাথে মিলকরণ।',
        'তদন্ত প্রতিবেদন এসি ল্যান্ডের নিকট দাখিল।'
      ],
      icon: MapPin,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      id: 4,
      title: 'চূড়ান্ত আদেশ ও বাস্তবায়ন (Final Order)',
      desc: 'সকল তথ্য ও প্রতিবেদন পর্যালোচনার পর এসি ল্যান্ড চূড়ান্ত রায় প্রদান করেন এবং রেকর্ড সংশোধনের আদেশ দেন।',
      details: [
        'রায়ের কপি সংগ্রহ।',
        'রেকর্ড সংশোধনের জন্য তহশিল অফিসে প্রেরণ।',
        'সংশোধিত খতিয়ান বা পর্চা সংগ্রহ।'
      ],
      icon: Landmark,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ];

  const faqs = [
    {
      q: 'নামজারী খতিয়ানের ভুল কিভাবে সংশোধন করবো?',
      a: 'মিসকেস আবেদনের মাধ্যমে আপনি নামজারী খতিয়ানের যেকোনো করণিক বা গাণিতিক ভুল সংশোধন করতে পারবেন।'
    },
    {
      q: 'খতিয়ানে জমির পরিমাণ কিভাবে ঠিক করবো?',
      a: 'সহকারী কমিশনার (ভূমি) বরাবর মিসকেস আবেদন করে উপযুক্ত প্রমাণ দাখিল করলে জমির পরিমাণ সংশোধন করা সম্ভব।'
    },
    {
      q: 'মালিকের নাম কিভাবে ঠিক করবো?',
      a: 'মালিকানার স্বপক্ষে প্রয়োজনীয় দলিলপত্রসহ এসি ল্যান্ড অফিসে মিসকেস আবেদন করলে শুনানি শেষে নাম সংশোধন করা হয়।'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-80 rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop" 
          alt="Legal Gavel" 
          className="w-full h-full object-cover brightness-[0.3]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-rose-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
            <Gavel size={16} className="text-rose-300" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">আইনি সহায়তা মডিউল</span>
          </div>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">মিসকেস (Misc Case) আবেদন গাইড</h2>
          <p className="text-rose-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90">
            জমি সংক্রান্ত বিরোধ নিষ্পত্তি ও খতিয়ানের ভুল সংশোধনের সবচেয়ে সহজ ও কার্যকর আইনি প্রক্রিয়া।
          </p>
        </div>
      </div>

      {/* Intro Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-6">
          {/* Case Type Selector */}
          <div className="flex gap-4 p-2 bg-gray-100 rounded-3xl w-fit">
            <button 
              onClick={() => setCaseType('correction')}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase transition-all ${caseType === 'correction' ? 'bg-white text-blue-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              রেকর্ড সংশোধন (Correction)
            </button>
            <button 
              onClick={() => setCaseType('dispute')}
              className={`px-6 py-3 rounded-2xl text-xs font-black uppercase transition-all ${caseType === 'dispute' ? 'bg-white text-rose-600 shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
            >
              ভূমি বিরোধ (Dispute)
            </button>
          </div>

          <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
            <Info size={28} className="text-blue-500" /> {caseType === 'correction' ? 'রেকর্ড সংশোধনের মিসকেস কী?' : 'ভূমি বিরোধ নিষ্পত্তির মিসকেস কী?'}
          </h3>
          <div className="space-y-4 text-gray-600 font-medium leading-relaxed text-lg">
            {caseType === 'correction' ? (
              <p>
                খতিয়ানে নামের বানান ভুল, জমির পরিমাণ কম-বেশি হওয়া, বা দাগ নম্বর ভুল হলে তা সংশোধনের জন্য এসি ল্যান্ড বরাবর যে আবেদন করা হয় তাকেই রেকর্ড সংশোধনের মিসকেস বলে। এটি সাধারণত কোনো বিবাদ ছাড়াই সমাধান করা সম্ভব।
              </p>
            ) : (
              <p>
                জমির মালিকানা নিয়ে দাবি-পাল্টা দাবি, সীমানা নিয়ে বিরোধ বা জালিয়াতির মাধ্যমে রেকর্ড তৈরি হলে তা বাতিলের জন্য যে মামলা করা হয় তাকে ভূমি বিরোধের মিসকেস বলে। এক্ষেত্রে বিবাদী পক্ষকে নোটিশ পাঠিয়ে শুনানি করা হয়।
              </p>
            )}
          </div>
          
          {/* Required Documents Section */}
          <div className="pt-6 space-y-4 border-t border-gray-50">
            <h4 className="text-xl font-black text-gray-800 flex items-center gap-2">
              <ClipboardList size={24} className="text-emerald-600" /> প্রয়োজনীয় নথিপত্র (Checklist)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(caseType === 'correction' ? [
                'মূল খতিয়ানের কপি (সার্টিফাইড)',
                'মালিকানার স্বপক্ষে দলিলপত্র',
                'আবেদনকারীর জাতীয় পরিচয়পত্র',
                'জমির হালনাগাদ খাজনা দাখিলা',
                'ভুল প্রমাণের জন্য সাপোর্টিং পেপারস'
              ] : [
                'বিরোধপূর্ণ জমির মূল দলীল',
                'সিএস/এসএ/আরএস খতিয়ানের কপি',
                'বিবাদীর নাম ও সঠিক ঠিকানা',
                'মৌজা ম্যাপ বা নকশা',
                'ওয়ারিশ সনদ (প্রয়োজন সাপেক্ষে)',
                'আদালতের কোনো পূর্ববর্তী রায় (যদি থাকে)'
              ]).map((doc, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm font-black text-xs">
                    {i + 1}
                  </div>
                  <span className="text-sm font-bold text-gray-700">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-900 rounded-[3rem] p-10 text-white flex flex-col justify-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-6">
              <h4 className="text-xl font-black text-rose-400">আবেদন খরচ ও সময়</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-gray-400 font-bold">কোর্ট ফি</span>
                  <span className="text-2xl font-black">২০/-</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-gray-400 font-bold">সময়সীমা</span>
                  <span className="text-xl font-black">৪৫ - ৯০ দিন</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-bold">পরিচালনাকারী</span>
                  <span className="text-xs font-black bg-rose-500/20 px-3 py-1 rounded-lg">এসি ল্যান্ড</span>
                </div>
              </div>
              <button className="w-full py-4 bg-rose-600 text-white rounded-2xl font-black hover:bg-rose-700 transition-all shadow-lg shadow-rose-900/20 flex items-center justify-center gap-2">
                আবেদন ফরম ডাউনলোড <Download size={18} />
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-600/20 rounded-full blur-3xl" />
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <div>
              <h4 className="text-lg font-black text-gray-800 mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-blue-500" /> যোগাযোগের ঠিকানা
              </h4>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-xs font-black text-blue-800 uppercase tracking-widest mb-1">প্রাথমিক যোগাযোগ</p>
                  <p className="text-sm font-bold text-blue-900">সহকারী কমিশনার (ভূমি) এর কার্যালয়</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-xs font-black text-gray-500 uppercase tracking-widest mb-1">অবস্থান</p>
                  <p className="text-sm font-bold text-gray-700">সংশ্লিষ্ট উপজেলা ভূমি অফিস</p>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-gray-50">
              <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3">সহায়তা লাইন</h4>
              <div className="flex items-center gap-3 text-emerald-600 font-black">
                <Phone size={18} /> ১৬১২২
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-4">
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">আবেদন প্রক্রিয়ার ধাপসমূহ</h3>
          <span className="text-xs font-black text-gray-400 uppercase tracking-widest">ধাপে ধাপে সমাধান</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div 
              key={step.id}
              onClick={() => setActiveStep(step.id)}
              className={`p-8 rounded-[2.5rem] border-2 transition-all cursor-pointer group relative ${
                activeStep === step.id 
                  ? 'bg-white border-emerald-500 shadow-xl scale-105' 
                  : 'bg-gray-50 border-transparent hover:border-gray-200'
              }`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${step.bg} ${step.color}`}>
                <step.icon size={28} />
              </div>
              <h4 className="text-lg font-black text-gray-800 mb-3">{step.title}</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed mb-6">
                {step.desc}
              </p>
              
              {activeStep === step.id && (
                <ul className="space-y-3 animate-in fade-in slide-in-from-top-2 duration-300">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs font-bold text-gray-700">
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              )}
              
              <div className="absolute top-6 right-8 text-4xl font-black text-gray-100 group-hover:text-gray-200 transition-colors">
                0{step.id}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center mb-4">
            <HelpCircle size={32} />
          </div>
          <h3 className="text-3xl font-black text-gray-800 tracking-tight">সাধারণ জিজ্ঞাসা (FAQ)</h3>
          <p className="text-gray-500 font-medium mt-2">মিসকেস সংক্রান্ত আপনার মনে থাকা প্রশ্নের উত্তরসমূহ</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, i) => (
            <div key={i} className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-amber-100 hover:bg-white hover:shadow-md transition-all group">
              <h4 className="text-lg font-black text-gray-800 mb-4 flex items-start gap-3">
                <span className="text-amber-500">Q.</span> {faq.q}
              </h4>
              <p className="text-sm text-gray-500 font-bold leading-relaxed pl-8 border-l-2 border-amber-100">
                <span className="text-emerald-600 mr-2">Ans:</span> {faq.a}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
          <h4 className="text-xl font-black text-blue-800 mb-4 flex items-center gap-2">
            <ClipboardList size={24} /> আবেদনপত্র ড্রাফটিং টিপস
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <p className="text-sm font-bold text-blue-900 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" /> বিষয়বস্তু স্পষ্ট রাখুন
              </p>
              <p className="text-xs text-blue-700 leading-relaxed">আবেদনের শুরুতে আপনার সমস্যার সারসংক্ষেপ (যেমন: খতিয়ান সংশোধন বা সীমানা বিরোধ) স্পষ্টভাবে উল্লেখ করুন।</p>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-bold text-blue-900 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" /> জমির তফসিল নির্ভুল দিন
              </p>
              <p className="text-xs text-blue-700 leading-relaxed">মৌজা, জেএল নম্বর, খতিয়ান ও দাগ নম্বর এবং জমির পরিমাণ যেন দলীলের সাথে হুবহু মিল থাকে।</p>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-bold text-blue-900 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" /> আইনি ভিত্তি উল্লেখ করুন
              </p>
              <p className="text-xs text-blue-700 leading-relaxed">প্রয়োজনে রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইনের সংশ্লিষ্ট ধারা (যেমন: ১৪৩ বা ১৫০ ধারা) উল্লেখ করতে পারেন।</p>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-bold text-blue-900 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" /> বিবাদীর তথ্য নিশ্চিত করুন
              </p>
              <p className="text-xs text-blue-700 leading-relaxed">বিবাদী পক্ষ থাকলে তাদের বর্তমান ও স্থায়ী ঠিকানা সঠিকভাবে দিন যাতে নোটিশ পৌঁছাতে দেরি না হয়।</p>
            </div>
          </div>
        </div>

        <div className="mt-12 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
          <h4 className="text-xl font-black text-gray-800 mb-4 flex items-center gap-2">
            <BookOpen size={24} /> উপসংহার
          </h4>
          <p className="text-blue-900 font-medium leading-relaxed">
            জমি নিয়ে সমস্যা হলে ভয় পাওয়ার কিছু নেই। সঠিক কাগজপত্র প্রস্তুত করে আদালতে মিসকেস আবেদন করলেই নির্ধারিত সময়ের মধ্যে সমস্যার সমাধান পাওয়া সম্ভব। এই প্রক্রিয়া স্বচ্ছ, নির্ভরযোগ্য এবং সাধারণ মানুষের জন্য উপযোগী। তাই জমি বিরোধে বছরের পর বছর ভোগান্তির বদলে, আইনানুগ উপায়ে মিসকেস আবেদন করুন এবং দ্রুত সমাধান পান।
          </p>
        </div>
      </div>

      {/* Footer CTA */}
      <div className="bg-emerald-600 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-emerald-900/20 relative overflow-hidden">
        <div className="relative z-10 space-y-4 text-center md:text-left">
          <h3 className="text-3xl font-black">আপনার কি কোনো পরামর্শ বা জিজ্ঞাসা আছে?</h3>
          <p className="text-emerald-100 font-medium opacity-80">আমাদের বিশেষজ্ঞ প্যানেলের সাথে সরাসরি কথা বলতে যুক্ত হোন।</p>
        </div>
        <div className="relative z-10 flex gap-4">
          <button className="px-8 py-4 bg-white text-emerald-700 rounded-2xl font-black hover:bg-emerald-50 transition-all flex items-center gap-2 shadow-xl">
            যোগাযোগ করুন <MessageSquareText size={20} />
          </button>
          <button className="px-8 py-4 bg-emerald-700 text-white rounded-2xl font-black hover:bg-emerald-800 transition-all flex items-center gap-2 border border-emerald-500">
            শেয়ার করুন <Share2 size={20} />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[100px] -mr-32 -mt-32" />
      </div>
    </div>
  );
};

export default MiscCaseModule;
