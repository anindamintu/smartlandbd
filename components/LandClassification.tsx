
import React, { useState } from 'react';
import { 
  Trees, 
  Home, 
  Building2, 
  Factory, 
  Droplets, 
  Landmark, 
  Info, 
  Scale, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight, 
  Search, 
  BookOpen,
  Gavel,
  FileText
} from 'lucide-react';

type ClassificationType = 'agricultural' | 'residential' | 'commercial' | 'industrial' | 'waterbody' | 'forest';

interface LandTypeDetail {
  id: ClassificationType;
  title: string;
  titleEn: string;
  icon: any;
  color: string;
  bg: string;
  description: string;
  characteristics: string[];
  legalImplications: string[];
  taxNote: string;
  taxUpdate?: string;
}

const landTypes: LandTypeDetail[] = [
  {
    id: 'agricultural',
    title: 'কৃষি জমি',
    titleEn: 'Agricultural Land',
    icon: Trees,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    description: 'ফসল উৎপাদন, মৎস্য চাষ বা পশুপালনের জন্য ব্যবহৃত জমি। বাংলাদেশের অর্থনীতির মূল ভিত্তি এই জমি।',
    characteristics: [
      'উর্বর পলিমাটি সমৃদ্ধ সমতল ভূমি।',
      'সেচ সুবিধার প্রাপ্যতা।',
      'বসতবাড়ি বা বাণিজ্যিক স্থাপনা বিহীন এলাকা।',
      'উপ-শ্রেণী: নাল (ফসলি), ডাঙ্গা (উঁচু), চালা, বাইদ, পালান।'
    ],
    legalImplications: [
      'রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন ১৯৫০ এর ৯০ ধারা অনুযায়ী কৃষি জমি অকৃষি কাজে ব্যবহারের জন্য জেলা প্রশাসকের অনুমতি প্রয়োজন।',
      '২৫ বিঘা পর্যন্ত কৃষি জমির খাজনা মওকুফ (ভূমি উন্নয়ন কর অধ্যাদেশ অনুযায়ী)।',
      'ভূমি সংস্কার অধ্যাদেশ ১৯৮৪ অনুযায়ী সর্বোচ্চ ৬০ বিঘা পর্যন্ত কৃষি জমি রাখা সম্ভব।',
      'অকৃষি কাজে ব্যবহারের জন্য রূপান্তর ফি (Conversion Fee) প্রযোজ্য।'
    ],
    taxNote: '২৫ বিঘা পর্যন্ত মওকুফ, এর উপরে প্রতি শতাংশে ২ টাকা হারে (২০২৪ বিধি অনুযায়ী)।',
    taxUpdate: '২০২৪ সালের নতুন বিধিমালা অনুযায়ী, ২৫ বিঘা পর্যন্ত খাজনা মওকুফ থাকলেও অনলাইনে রিটার্ন দাখিল বাধ্যতামূলক করা হয়েছে।'
  },
  {
    id: 'residential',
    title: 'আবাসিক জমি',
    titleEn: 'Residential Land',
    icon: Home,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    description: 'বসবাসের জন্য নির্ধারিত বা বসতবাড়ি নির্মিত জমি। একে "ভিটা" বা "বাস্তু" জমিও বলা হয়।',
    characteristics: [
      'উঁচু ভূমি যা বন্যা মুক্ত।',
      'রাস্তা, বিদ্যুৎ ও পানি সরবরাহের সুবিধা।',
      'জনবসতিপূর্ণ এলাকা।',
      'উপ-শ্রেণী: ভিটা, বাড়ি, চালা, বাস্তু।'
    ],
    legalImplications: [
      'ইমারত নির্মাণ বিধিমালা ২০০৮ অনুযায়ী ভবন নির্মাণে সেট-ব্যাক ও এফএআর (FAR) মানা বাধ্যতামূলক।',
      'কৃষি জমি থেকে আবাসিক শ্রেণীতে রূপান্তরের জন্য নির্ধারিত রূপান্তর ফি প্রদান করতে হয়।',
      'রাজউক বা সংশ্লিষ্ট উন্নয়ন কর্তৃপক্ষের ভূমি ব্যবহার ছাড়পত্র (Land Use Clearance) প্রয়োজন।',
      'পৌরসভা বা সিটি কর্পোরেশনের প্ল্যান অনুমোদন ছাড়া নির্মাণ অবৈধ।'
    ],
    taxNote: 'অবস্থানভেদে শতাংশ প্রতি ১০ টাকা থেকে ১০০ টাকা পর্যন্ত।',
    taxUpdate: 'পৌরসভা ও সিটি কর্পোরেশন এলাকায় আবাসিক জমির কর হার ১৫% থেকে ২৫% পর্যন্ত বৃদ্ধি পেয়েছে (২০২৪-২৫ অর্থবছর)।'
  },
  {
    id: 'commercial',
    title: 'বাণিজ্যিক জমি',
    titleEn: 'Commercial Land',
    icon: Building2,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    description: 'ব্যবসা-প্রতিষ্ঠান, দোকানপাট, office বা শপিং মল নির্মাণের জন্য ব্যবহৃত জমি।',
    characteristics: [
      'প্রধান সড়কের পাশে বা বাণিজ্যিক এলাকায় অবস্থিত।',
      'উচ্চ বাজারমূল্য।',
      'সহজ যাতায়াত ব্যবস্থা।',
      'উপ-শ্রেণী: দোকান, বাজার, বাণিজ্যিক প্লট।'
    ],
    legalImplications: [
      'বাণিজ্যিক ব্যবহারের জন্য ট্রেড লাইসেন্স ও ফায়ার সার্ভিস ছাড়পত্র প্রয়োজন।',
      'এই শ্রেণীর জমির রেজিস্ট্রেশন ফি ও কর হার আবাসিক জমির তুলনায় অনেক বেশি।',
      'আবাসিক এলাকায় বাণিজ্যিক কার্যক্রম পরিচালনায় আইনি বিধিনিষেধ ও উচ্ছেদের ঝুঁকি থাকে।',
      'পরিবেশ অধিদপ্তরের ছাড়পত্র (প্রযোজ্য ক্ষেত্রে) প্রয়োজন।'
    ],
    taxNote: 'অবস্থানভেদে শতাংশ প্রতি ৩০ টাকা থেকে ২৫০ টাকা পর্যন্ত।',
    taxUpdate: 'ঢাকা ও চট্টগ্রাম সিটি কর্পোরেশন এলাকায় বাণিজ্যিক জমির কর হার সর্বোচ্চ পর্যায়ে (শতাংশ প্রতি ২৫০-৩০০ টাকা) পুনঃনির্ধারণ করা হয়েছে।'
  },
  {
    id: 'industrial',
    title: 'শিল্প জমি',
    titleEn: 'Industrial Land',
    icon: Factory,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    description: 'কলকারখানা, গুদামঘর বা শিল্প পার্ক নির্মাণের জন্য নির্ধারিত জমি।',
    characteristics: [
      'বিসিক (BSCIC) বা অর্থনৈতিক অঞ্চলের অন্তর্ভুক্ত এলাকা।',
      'ভারী যানবাহন চলাচলের উপযোগী রাস্তা।',
      'উচ্চ ক্ষমতাসম্পন্ন বিদ্যুৎ ও গ্যাস সংযোগের সুবিধা।'
    ],
    legalImplications: [
      'পরিবেশ সংরক্ষণ আইন ১৯৯৫ অনুযায়ী পরিবেশ ছাড়পত্র (ECC) গ্রহণ বাধ্যতামূলক।',
      'শিল্প জোনের বাইরে শিল্প স্থাপনে কঠোর আইনি বিধিনিষেধ ও জরিমানা রয়েছে।',
      'কারখানা আইন ১৯৬৫ অনুযায়ী শ্রমিকদের নিরাপত্তা ও কাজের পরিবেশ নিশ্চিত করার বাধ্যবাধকতা।'
    ],
    taxNote: 'অবস্থানভেদে শতাংশ প্রতি ২০ টাকা থেকে ১৫০ টাকা পর্যন্ত।',
    taxUpdate: 'রপ্তানিমুখী শিল্পের জন্য বিশেষ কর রেয়াত (Tax Rebate) সুবিধা থাকলেও সাধারণ শিল্প জমির কর হার ১০% বৃদ্ধি পেয়েছে।'
  },
  {
    id: 'waterbody',
    title: 'জলাভূমি',
    titleEn: 'Waterbody',
    icon: Droplets,
    color: 'text-cyan-600',
    bg: 'bg-cyan-50',
    description: 'পুকুর, ডোবা, খাল, নদী বা বিল। পরিবেশের ভারসাম্য রক্ষায় এই জমি অত্যন্ত গুরুত্বপূর্ণ।',
    characteristics: [
      'বছরের অধিকাংশ সময় বা সবসময় জলমগ্ন থাকে।',
      'মৎস্য সম্পদ ও জীববৈচিত্র্যের আধার।'
    ],
    legalImplications: [
      'খেলার মাঠ, উন্মুক্ত স্থান, উদ্যান এবং প্রাকৃতিক জলাধার সংরক্ষণ আইন ২০০০ অনুযায়ী জলাশয় ভরাট দণ্ডনীয় অপরাধ।',
      'শ্রেণী পরিবর্তন করে ভরাট করার ক্ষেত্রে পরিবেশ অধিদপ্তরের কঠোর নিষেধাজ্ঞা রয়েছে।',
      'নদী বা খালের সীমানা নির্ধারণ ও উচ্ছেদ সংক্রান্ত মহামান্য হাইকোর্টের নির্দেশনা প্রযোজ্য।'
    ],
    taxNote: 'সাধারণত কৃষি জমির অনুরূপ বা বিশেষ ক্ষেত্রে মওকুফ।',
    taxUpdate: 'জলাভূমি ভরাট করে শ্রেণী পরিবর্তনের ক্ষেত্রে এখন থেকে মূল্যের ১৫% হারে "পরিবেশ ক্ষতিপূরণ ফি" আরোপের প্রস্তাব করা হয়েছে।'
  },
  {
    id: 'forest',
    title: 'বনভূমি',
    titleEn: 'Forest Land',
    icon: Trees,
    color: 'text-green-600',
    bg: 'bg-green-50',
    description: 'সরকারি গেজেটভুক্ত বন এলাকা বা প্রাকৃতিকভাবে সৃষ্ট বনাঞ্চল।',
    characteristics: [
      'ঘন গাছপালা ও বন্যপ্রাণীর আবাসস্থল।',
      'পাহাড়ি বা উপকূলীয় এলাকায় অবস্থিত।'
    ],
    legalImplications: [
      'বন আইন ১৯২৭ (সংশোধিত ২০১৯) অনুযায়ী সংরক্ষিত বনাঞ্চলে প্রবেশ বা গাছ কাটা শাস্তিযোগ্য অপরাধ।',
      'বনভূমির মালিকানা হস্তান্তর বা ব্যক্তিগত কাজে ব্যবহার সম্পূর্ণ অবৈধ ও বাতিলযোগ্য।',
      'বন্যপ্রাণী (সংরক্ষণ ও নিরাপত্তা) আইন ২০১২ অনুযায়ী বনাঞ্চলে শিকার ও ক্ষতিসাধন নিষিদ্ধ।'
    ],
    taxNote: 'সরকারি সম্পত্তি হিসেবে করমুক্ত, তবে লিজের ক্ষেত্রে ফি প্রযোজ্য।',
    taxUpdate: 'সামাজিক বনায়নের ক্ষেত্রে লিজ গ্রহীতাদের লভ্যাংশের হার পুনঃনির্ধারণ করা হয়েছে (২০২৪ বন বিধিমালা)।'
  }
];

const LandClassification: React.FC = () => {
  const [selectedType, setSelectedType] = useState<LandTypeDetail>(landTypes[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTypes = landTypes.filter(t => 
    t.title.includes(searchQuery) || t.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header Section */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
            <Landmark size={40} />
          </div>
          <h2 className="text-4xl font-black text-gray-800 mb-3 tracking-tighter">ভূমি শ্রেণীবিভাগ ও বৈশিষ্ট্য</h2>
          <p className="text-gray-500 max-w-2xl font-medium leading-relaxed">
            বাংলাদেশের ভূমি রেকর্ড ও আইন অনুযায়ী জমির বিভিন্ন শ্রেণী, তাদের ব্যবহার বিধি এবং আইনি বাধ্যবাধকতা সম্পর্কে বিস্তারিত জানুন।
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative mb-10">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="জমির শ্রেণী খুঁজুন..."
            className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm pr-12"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>

        {/* Type Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {filteredTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type)}
              className={`p-4 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-3 text-center group ${
                selectedType.id === type.id 
                  ? 'border-emerald-500 bg-emerald-50 shadow-lg scale-105' 
                  : 'border-gray-50 bg-white hover:border-gray-200'
              }`}
            >
              <div className={`p-3 rounded-xl ${type.bg} ${type.color} transition-transform group-hover:scale-110`}>
                <type.icon size={24} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-tight ${selectedType.id === type.id ? 'text-emerald-700' : 'text-gray-500'}`}>
                {type.title}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Description & Characteristics */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center gap-5 mb-8">
              <div className={`w-16 h-16 ${selectedType.bg} ${selectedType.color} rounded-[1.5rem] flex items-center justify-center shadow-sm`}>
                <selectedType.icon size={32} />
              </div>
              <div>
                <h3 className="text-3xl font-black text-gray-800 tracking-tight">{selectedType.title}</h3>
                <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">{selectedType.titleEn}</p>
              </div>
            </div>

            <p className="text-gray-600 text-lg font-medium leading-relaxed mb-10">
              {selectedType.description}
            </p>

            <div className="space-y-6">
              <h4 className="text-xl font-black text-gray-800 flex items-center gap-3">
                <Info size={24} className="text-emerald-500" /> প্রধান বৈশিষ্ট্যসমূহ
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedType.characteristics.map((char, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-transparent hover:border-emerald-100 transition-all group">
                    <div className="w-8 h-8 bg-white text-emerald-600 rounded-full flex items-center justify-center shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors shrink-0">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-gray-700 font-bold text-sm leading-relaxed">{char}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legal Implications */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
            <h4 className="text-xl font-black text-gray-800 flex items-center gap-3">
              <Gavel size={24} className="text-rose-500" /> আইনি বাধ্যবাধকতা ও বিধিমালা
            </h4>
            <div className="space-y-4">
              {selectedType.legalImplications.map((legal, i) => (
                <div key={i} className="flex gap-6 p-6 bg-rose-50/30 rounded-3xl border border-rose-100/50 hover:bg-rose-50 transition-all group">
                  <div className="w-12 h-12 bg-white text-rose-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm group-hover:bg-rose-600 group-hover:text-white transition-all shrink-0">
                    {i + 1}
                  </div>
                  <p className="text-gray-700 font-bold text-sm leading-relaxed">{legal}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Tax & Quick Info */}
        <div className="space-y-8">
          <div className="bg-emerald-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden h-fit animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-white/10 text-emerald-300 rounded-2xl flex items-center justify-center">
                  <FileText size={24} />
                </div>
                <h3 className="text-xl font-black tracking-tight">ভূমি উন্নয়ন কর (খাজনা)</h3>
              </div>
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                <p className="text-emerald-100 font-bold leading-relaxed">
                  {selectedType.taxNote}
                </p>
                {selectedType.taxUpdate && (
                  <div className="p-4 bg-emerald-400/10 rounded-xl border border-emerald-400/20 animate-pulse">
                    <p className="text-[11px] font-black text-emerald-300 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <AlertCircle size={12} /> সাম্প্রতিক আপডেট
                    </p>
                    <p className="text-xs text-white font-medium leading-relaxed">
                      {selectedType.taxUpdate}
                    </p>
                  </div>
                )}
                <div className="pt-4 border-t border-white/10">
                  <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg">
                    কর ক্যালকুলেটর ব্যবহার করুন
                  </button>
                </div>
              </div>
              <div className="mt-8 flex items-start gap-3">
                <AlertCircle className="text-amber-400 shrink-0" size={18} />
                <p className="text-[10px] text-emerald-100/60 font-bold leading-relaxed">
                  ২০২৪ সালের নতুন ভূমি উন্নয়ন কর বিধিমালা অনুযায়ী কর হার নির্ধারিত হয়েছে। বাণিজ্যিক ও শিল্প জমির ক্ষেত্রে অবস্থানভেদে হার ভিন্ন হতে পারে।
                </p>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl" />
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <h4 className="text-lg font-black text-gray-800 flex items-center gap-2">
              <BookOpen size={20} className="text-blue-500" /> গুরুত্বপূর্ণ টিপস
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-xs font-bold text-blue-800 leading-relaxed">
                  জমির শ্রেণী পরিবর্তন (Conversion) করার আগে অবশ্যই এসি ল্যান্ড (AC Land) অফিস থেকে অনুমতি নিন।
                </p>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-xs font-bold text-amber-800 leading-relaxed">
                  খতিয়ানে (পর্চা) জমির শ্রেণী ভুল থাকলে তা সংশোধনের জন্য মিস কেস (Misc Case) দাখিল করুন।
                </p>
              </div>
            </div>
            <button className="w-full py-4 bg-gray-50 text-gray-700 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
              আইনি সহায়তা নিন <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Comparison Table Placeholder */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <h3 className="text-2xl font-black text-gray-800 mb-8 tracking-tight text-center">এক নজরে শ্রেণীবিভাগ তুলনা</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">জমির শ্রেণী</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">প্রধান ব্যবহার</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">কর হার (শতাংশ প্রতি)</th>
                <th className="py-4 px-6 text-[10px] font-black text-gray-400 uppercase tracking-widest">রেজিস্ট্রেশন ফি</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold text-gray-600">
              {landTypes.map((type, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className={`w-8 h-8 ${type.bg} ${type.color} rounded-lg flex items-center justify-center`}>
                      <type.icon size={16} />
                    </div>
                    {type.title}
                  </td>
                  <td className="py-4 px-6">{type.titleEn}</td>
                  <td className="py-4 px-6 text-emerald-600">
                    {type.id === 'agricultural' ? '২ টাকা (২৫ বিঘা উর্ধ্বে)' : 
                     type.id === 'residential' ? '১০ - ১০০ টাকা' :
                     type.id === 'commercial' ? '৩০ - ৩০০ টাকা' :
                     type.id === 'industrial' ? '২০ - ১৫০ টাকা' :
                     type.id === 'waterbody' ? 'কৃষি অনুরূপ' : 'করমুক্ত'}
                  </td>
                  <td className="py-4 px-6">{type.id === 'commercial' ? 'সর্বোচ্চ' : 'মাঝারি'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Updates Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-indigo-50 p-8 rounded-[3rem] border border-indigo-100">
          <h4 className="text-xl font-black text-indigo-900 mb-6 flex items-center gap-3">
            <AlertCircle size={24} /> সাম্প্রতিক গেজেট ও পরিবর্তন
          </h4>
          <div className="space-y-4">
            {[
              { date: '১৫ মে ২০২৪', text: 'কৃষি জমি সুরক্ষায় নতুন নীতিমালা জারি।' },
              { date: '০২ এপ্রিল ২০২৪', text: 'জলাভূমি ভরাট রোধে কঠোর জরিমানার বিধান।' },
              { date: '১০ মার্চ ২০২৪', text: 'বাণিজ্যিক জমির রূপান্তর ফি পুনঃনির্ধারণ।' }
            ].map((update, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white rounded-2xl shadow-sm border border-indigo-50">
                <span className="text-[10px] font-black text-indigo-400 uppercase shrink-0 mt-1">{update.date}</span>
                <p className="text-sm font-bold text-indigo-800">{update.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-emerald-50 p-8 rounded-[3rem] border border-emerald-100">
          <h4 className="text-xl font-black text-emerald-900 mb-6 flex items-center gap-3">
            <BookOpen size={24} /> প্রয়োজনীয় নির্দেশিকা
          </h4>
          <div className="space-y-4">
            {[
              'জমির ধরণ পরিবর্তনের সঠিক পদ্ধতি',
              'খতিয়ানে ভুল শ্রেণী সংশোধনের উপায়',
              'ভূমি উন্নয়ন কর পরিশোধের নিয়মাবলী'
            ].map((guide, i) => (
              <button key={i} className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm border border-emerald-50 hover:border-emerald-200 transition-all group">
                <span className="text-sm font-bold text-emerald-800">{guide}</span>
                <ArrowRight size={18} className="text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandClassification;
