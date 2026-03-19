
import React from 'react';
import { FileText, ClipboardList, Gavel, Info, CheckCircle2, AlertCircle, ArrowRight, Download, BookOpen, Landmark, UserCheck, Scale, Building2, Zap } from 'lucide-react';

interface LandAcquisitionProps {
  onTabChange?: (tab: string) => void;
}

const LandAcquisition: React.FC<LandAcquisitionProps> = ({ onTabChange }) => {
  const procedures = [
    {
      step: '১',
      title: 'প্রস্তাবনা ও প্রাথমিক নোটিশ',
      desc: 'অধিগ্রহণকারী সংস্থা (যেমন- সড়ক ও জনপথ বিভাগ) জেলা প্রশাসকের কাছে প্রস্তাব পাঠায়। এরপর ৪ ধারা অনুযায়ী নোটিশ জারি করা হয়।',
      icon: FileText,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      step: '২',
      title: 'যৌথ তদন্ত (Joint Verification)',
      desc: 'জেলা প্রশাসকের প্রতিনিধি এবং অধিগ্রহণকারী সংস্থার প্রতিনিধি সরজমিনে জমির সীমানা, স্থাপনা ও গাছপালার তালিকা তৈরি করেন।',
      icon: UserCheck,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      step: '৩',
      title: 'আপত্তি দাখিল ও শুনানি',
      desc: 'নোটিশ জারির ১৫ দিনের মধ্যে জমির মালিক বা স্বার্থসংশ্লিষ্ট ব্যক্তি অধিগ্রহণের বিরুদ্ধে জেলা প্রশাসকের কাছে আপত্তি জানাতে পারেন।',
      icon: Gavel,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      step: '৪',
      title: 'চূড়ান্ত অনুমোদন ও দখল গ্রহণ',
      desc: 'সরকারের চূড়ান্ত অনুমোদনের পর ৭ ধারা অনুযায়ী নোটিশ দেওয়া হয় এবং জমির দখল গ্রহণ করা হয়।',
      icon: Landmark,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      step: '৫',
      title: 'ক্ষতিপূরণ প্রদান (Award)',
      desc: 'জমির বাজারমূল্য এবং অন্যান্য ক্ষতি বিবেচনা করে ৮ ধারা অনুযায়ী ক্ষতিপূরণ নির্ধারণ ও প্রদান করা হয়।',
      icon: Scale,
      color: 'bg-rose-50 text-rose-600'
    }
  ];

  const documents = [
    'জমির মূল দলীল বা সার্টিফাইড কপি',
    'হালনাগাদ খতিয়ান (পর্চা)',
    'ভূমি উন্নয়ন কর পরিশোধের দাখিলা',
    'জাতীয় পরিচয়পত্র (NID) ও পাসপোর্ট সাইজ ছবি',
    'উত্তরাধিকার সনদ (প্রযোজ্য ক্ষেত্রে)',
    'স্থাপনা বা গাছপালার মালিকানার প্রমাণাদি'
  ];

  const compensationDetails = [
    {
      title: 'জমির বাজারমূল্য',
      desc: 'বিগত ১২ মাসের গড় বাজারমূল্যের ৩ গুণ (৩০০%) ক্ষতিপূরণ প্রদান করা হয়।',
      icon: Scale,
      color: 'text-rose-600'
    },
    {
      title: 'স্থাপনা ও গাছপালা',
      desc: 'স্থাপনা ও গাছপালার বর্তমান বাজারমূল্যের দ্বিগুণ (২০০%) ক্ষতিপূরণ দেওয়া হয়।',
      icon: Building2,
      color: 'text-amber-600'
    },
    {
      title: 'অন্যান্য ক্ষতি',
      desc: 'ব্যবসা বা ফসলের ক্ষতির জন্য উপযুক্ত ক্ষতিপূরণ নির্ধারণ করা হয়।',
      icon: AlertCircle,
      color: 'text-blue-600'
    }
  ];

  const laws = [
    {
      title: 'স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল আইন, ২০২৩',
      desc: '২০১৭ সালের আইনের ধারাবাহিকতায় জনস্বার্থে ভূমি অধিগ্রহণের আধুনিক ও যুগোপযোগী বিধানসমূহ।',
      id: 'acquisition-act'
    },
    {
      title: 'স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল (সংশোধন) আইন, ২০২৪',
      desc: 'ক্ষতিপূরণ নির্ধারণ এবং আপিল প্রক্রিয়ায় স্বচ্ছতা আনতে সর্বশেষ সংশোধনী।',
      link: '#'
    },
    {
      title: 'স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল বিধিমালা, ২০১৭ (হালনাগাদ)',
      desc: 'আইন বাস্তবায়নের বিস্তারিত পদ্ধতি ও ক্ষতিপূরণ প্রদানের নিয়মাবলী।',
      link: '#'
    },
    {
      title: 'ভূমি অধিগ্রহণ ম্যানুয়াল, ২০২২',
      desc: 'মাঠ পর্যায়ে অধিগ্রহণ কার্যক্রম পরিচালনার জন্য ভূমি মন্ত্রণালয়ের গাইডলাইন।',
      link: '#'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-64 rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" 
          alt="Land Acquisition" 
          className="w-full h-full object-cover brightness-[0.4]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-emerald-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
            <Info size={16} className="text-emerald-300" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">ভূমি অধিগ্রহণ নির্দেশিকা</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">ভূমি অধিগ্রহণ প্রক্রিয়া ও নিয়মাবলী</h2>
          <p className="text-emerald-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90">
            সরকারি প্রয়োজনে বা জনস্বার্থে ভূমি অধিগ্রহণের আইনি ধাপ এবং ক্ষতিপূরণ প্রাপ্তির বিস্তারিত তথ্য।
          </p>
        </div>
      </div>

      {/* Recent Amendments Section */}
      <div className="bg-indigo-50 p-10 rounded-[3rem] border border-indigo-100">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
            <Zap size={28} />
          </div>
          <div>
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">সাম্প্রতিক সংশোধনী ও বিশেষ বিধান (২০২৩-২৪)</h3>
            <p className="text-sm text-indigo-600 font-bold uppercase tracking-widest">নতুন আইনের গুরুত্বপূর্ণ দিকসমূহ</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { title: 'ক্ষতিপূরণ বৃদ্ধিকরণ', desc: 'সরকারি প্রকল্পের জন্য অধিগ্রহণে বাজারমূল্যের অতিরিক্ত ২০০% (মোট ৩ গুণ) এবং বেসরকারি প্রকল্পের জন্য ৩০০% (মোট ৪ গুণ) ক্ষতিপূরণের বিধান।' },
            { title: 'দ্রুত নিষ্পত্তি', desc: 'যৌথ তদন্ত ও ভিডিওগ্রাফির মাধ্যমে জমির প্রকৃত অবস্থা নির্ধারণ এবং দ্রুততম সময়ে ক্ষতিপূরণ প্রদানের বাধ্যবাধকতা।' },
            { title: 'স্বচ্ছতা নিশ্চিতকরণ', desc: 'ক্ষতিপূরণের টাকা সরাসরি ব্যাংক একাউন্টে প্রদান এবং দালাল চক্র রোধে ডিজিটাল ডাটাবেজ ব্যবহার।' },
            { title: 'আপিল প্রক্রিয়া সহজীকরণ', desc: 'অধিগ্রহণ সংক্রান্ত বিরোধ নিষ্পত্তিতে জেলা প্রশাসকের সিদ্ধান্তের বিরুদ্ধে বিভাগীয় কমিশনারের কাছে আপিলের সময়সীমা ও পদ্ধতি সহজীকরণ।' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-indigo-100 shadow-sm">
              <h4 className="text-indigo-900 font-black mb-2 flex items-center gap-2">
                <CheckCircle2 size={18} className="text-indigo-500" /> {item.title}
              </h4>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Procedures Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-2 h-8 bg-blue-600 rounded-full" />
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">অধিগ্রহণ প্রক্রিয়ার ধাপসমূহ</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {procedures.map((item, idx) => (
            <div key={idx} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative">
              <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm font-black text-xl`}>
                <item.icon size={24} />
              </div>
              <div className="absolute top-6 right-6 text-4xl font-black text-gray-50 opacity-10 group-hover:opacity-20 transition-opacity">
                {item.step}
              </div>
              <h4 className="text-lg font-black text-gray-800 mb-3 leading-tight">{item.title}</h4>
              <p className="text-gray-500 text-xs font-medium leading-relaxed">{item.desc}</p>
              {idx < procedures.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-gray-200">
                  <ArrowRight size={24} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Compensation Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-2 h-8 bg-rose-600 rounded-full" />
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">ক্ষতিপূরণ নির্ধারণ পদ্ধতি</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {compensationDetails.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col items-center text-center group">
              <div className={`w-16 h-16 bg-gray-50 ${item.color} rounded-[1.5rem] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <item.icon size={32} />
              </div>
              <h4 className="text-xl font-black text-gray-800 mb-3">{item.title}</h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Documents Section */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <ClipboardList size={24} />
            </div>
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">প্রয়োজনীয় কাগজপত্র</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documents.map((doc, idx) => (
              <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-emerald-200 transition-all group">
                <div className="w-8 h-8 bg-white text-emerald-600 rounded-full flex items-center justify-center shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <CheckCircle2 size={16} />
                </div>
                <span className="text-gray-700 font-bold text-sm">{doc}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start gap-4">
            <AlertCircle className="text-amber-600 shrink-0" size={24} />
            <div>
              <h4 className="text-amber-900 font-black mb-1">সতর্কতা</h4>
              <p className="text-amber-800/80 text-sm font-medium leading-relaxed">
                ক্ষতিপূরণের টাকা উত্তোলনের জন্য দাখিলকৃত সকল কাগজপত্র অবশ্যই সত্যায়িত হতে হবে। কোনো দলিলে ভুল থাকলে তা আগে সংশোধন করে নিন।
              </p>
            </div>
          </div>
        </div>

        {/* Laws Section */}
        <div className="space-y-6">
          <div className="bg-emerald-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden h-full">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/10 text-emerald-300 rounded-2xl flex items-center justify-center">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-xl font-black tracking-tight">সংশ্লিষ্ট আইন ও বিধিমালা</h3>
              </div>
              <div className="space-y-6">
                {laws.map((law, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => law.id && onTabChange?.(law.id)}
                    className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group cursor-pointer"
                  >
                    <h4 className="text-emerald-300 font-black mb-2 group-hover:text-white transition-colors">{law.title}</h4>
                    <p className="text-emerald-100/60 text-xs font-medium mb-4 leading-relaxed">{law.desc}</p>
                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 group-hover:text-emerald-200">
                      বিস্তারিত দেখুন <ArrowRight size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-white/10">
                <p className="text-xs text-emerald-100/40 font-bold leading-relaxed">
                  অধিগ্রহণ সংক্রান্ত যেকোনো আইনি সহায়তার জন্য আপনার নিকটস্থ জেলা প্রশাসকের কার্যালয়ের এল.এ (LA) শাখায় যোগাযোগ করুন।
                </p>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* FAQ Placeholder */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <h3 className="text-2xl font-black text-gray-800 mb-8 tracking-tight text-center">সাধারণ জিজ্ঞাসা (FAQ)</h3>
        <div className="space-y-4">
          {[
            'ক্ষতিপূরণের পরিমাণ কীভাবে নির্ধারণ করা হয়?',
            'অধিগ্রহণের বিরুদ্ধে আপিল করার নিয়ম কী?',
            'ক্ষতিপূরণের টাকা পেতে কত সময় লাগে?',
            'অধিগ্রহণকৃত জমিতে কোনো স্থাপনা থাকলে তার ক্ষতিপূরণ কীভাবে পাওয়া যায়?'
          ].map((q, i) => (
            <div key={i} className="p-6 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:bg-white hover:border-emerald-200 transition-all">
              <span className="text-gray-700 font-bold">{q}</span>
              <ArrowRight size={20} className="text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandAcquisition;
