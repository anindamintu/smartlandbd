
import React, { useState } from 'react';
import { BookOpen, Scale, Gavel, FileText, Search, Download, ExternalLink, ChevronRight, Info, ShieldCheck, Landmark } from 'lucide-react';

interface LawItem {
  id: string;
  title: string;
  year: string;
  category: 'Act' | 'Rule' | 'Precedent' | 'Circular';
  desc: string;
}

const lawsData: LawItem[] = [
  {
    id: '1',
    title: 'The State Acquisition and Tenancy Act, 1950',
    year: '১৯৫০',
    category: 'Act',
    desc: 'বাংলাদেশের ভূমি ব্যবস্থাপনার মূল ভিত্তি। জমিদারি প্রথা বিলোপ এবং রায়তদের সরাসরি সরকারের অধীনে আনার আইন।'
  },
  {
    id: '2',
    title: 'The Transfer of Property Act, 1882',
    year: '১৮৮২',
    category: 'Act',
    desc: 'স্থাবর সম্পত্তি হস্তান্তর, বিক্রয়, বন্ধক ও দান সংক্রান্ত মৌলিক আইন।'
  },
  {
    id: '3',
    title: 'The Registration Act, 1908',
    year: '১৯০৮',
    category: 'Act',
    desc: 'দলীল রেজিস্ট্রেশন ও দলীলের আইনগত বৈধতা নিশ্চিতকরণের প্রধান আইন।'
  },
  {
    id: '4',
    title: 'ভূমি সংস্কার আইন, ২০২৩',
    year: '২০২৩',
    category: 'Act',
    desc: 'ভূমি সংস্কার ও ব্যবস্থাপনা আধুনিকীকরণের লক্ষ্যে প্রণীত নতুন আইন। ৬০ বিঘার বেশি কৃষি জমি রাখার ওপর নিষেধাজ্ঞা।'
  },
  {
    id: '5',
    title: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩',
    year: '২০২৩',
    category: 'Act',
    desc: 'ভূমি সংক্রান্ত জালিয়াতি, অবৈধ দখল ও অপরাধ দমনে নতুন কঠোর আইন। ৭ বছর পর্যন্ত কারাদণ্ডের বিধান।'
  },
  {
    id: '13',
    title: 'ভূমি উন্নয়ন কর আইন, ২০২৩',
    year: '২০২৩',
    category: 'Act',
    desc: 'ভূমি উন্নয়ন কর নির্ধারণ ও আদায়ের আধুনিক পদ্ধতি। ২৫ বিঘা পর্যন্ত কৃষি জমির কর মওকুফ।'
  },
  {
    id: '14',
    title: 'Case: Abdul Latif vs. State (2015)',
    year: '২০১৫',
    category: 'Precedent',
    desc: 'নামজারি (Mutation) সংক্রান্ত গুরুত্বপূর্ণ রায়। দখল ও বৈধ দলীল থাকলে নামজারি অস্বীকার করা যাবে না।'
  },
  {
    id: '15',
    title: 'Case: Govt. vs. S.M. Lutfor Rahman',
    year: '২০১২',
    category: 'Precedent',
    desc: 'অর্পিত সম্পত্তি (Vested Property) সংক্রান্ত নজীর। গেজেটে নাম না থাকলে সম্পত্তি অর্পিত হিসেবে গণ্য হবে না।'
  },
  {
    id: '16',
    title: 'Case: Arfan Ali vs. State',
    year: '২০১০',
    category: 'Precedent',
    desc: 'ভুয়া দলীল (Forged Deed) বাতিল সংক্রান্ত রায়। জাল দলীলের ভিত্তিতে কোনো স্বত্ব তৈরি হয় না।'
  },
  {
    id: '6',
    title: 'স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল আইন, ২০১৭',
    year: '২০১৭',
    category: 'Act',
    desc: 'সরকারি প্রয়োজনে ভূমি অধিগ্রহণ ও ক্ষতিপূরণ প্রদানের মূল আইন।'
  },
  {
    id: '7',
    title: 'অর্পিত সম্পত্তি প্রত্যর্পণ আইন, ২০০১',
    year: '২০০১',
    category: 'Act',
    desc: 'অর্পিত সম্পত্তি (Vested Property) প্রকৃত মালিকদের কাছে ফিরিয়ে দেওয়ার বিধান।'
  },
  {
    id: '17',
    title: 'ভূমি উন্নয়ন কর বিধিমালা, ২০২৪',
    year: '২০২৪',
    category: 'Rule',
    desc: 'অনলাইনে ভূমি উন্নয়ন কর পরিশোধ ও ডিজিটাল দাখিলা প্রদানের বিস্তারিত নিয়মাবলী।'
  }
];

const LawsModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Act' | 'Rule' | 'Precedent'>('All');

  const filteredLaws = lawsData.filter(law => {
    const matchesSearch = law.title.includes(searchQuery) || law.desc.includes(searchQuery);
    const matchesCategory = activeCategory === 'All' || law.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header Section */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 shadow-inner">
              <Scale size={40} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">সংশ্লিষ্ট আইন ও বিধিমালা</h2>
              <p className="text-gray-500 font-medium">ভূমি সংক্রান্ত সকল আইন, বিধিমালা এবং উচ্চ আদালতের নজীরসমূহ।</p>
            </div>
          </div>
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="আইন বা বিধি খুঁজুন..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 pr-12"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-10">
          {['All', 'Act', 'Rule', 'Precedent'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
                  : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {cat === 'All' ? 'সবগুলো' : cat === 'Act' ? 'আইন' : cat === 'Rule' ? 'বিধিমালা' : 'নজীর (Precedent)'}
            </button>
          ))}
        </div>
      </div>

      {/* Legal Framework Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-2 h-8 bg-emerald-600 rounded-full" />
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">আইনি কাঠামো (Legal Framework)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              title: 'আইন (Acts)',
              desc: 'জাতীয় সংসদ কর্তৃক পাসকৃত ভূমি সংক্রান্ত সকল মূল আইন।',
              icon: Gavel,
              color: 'bg-blue-50 text-blue-600',
              count: '১২+'
            },
            {
              title: 'বিধিমালা (Rules)',
              desc: 'আইন বাস্তবায়নের লক্ষ্যে সরকার কর্তৃক প্রণীত বিস্তারিত বিধি ও নিয়মাবলী।',
              icon: FileText,
              color: 'bg-amber-50 text-amber-600',
              count: '০৮+'
            },
            {
              title: 'নজীর (Precedents)',
              desc: 'উচ্চ আদালত কর্তৃক প্রদত্ত বিভিন্ন যুগান্তকারী রায় ও আইনি ব্যাখ্যা।',
              icon: Landmark,
              color: 'bg-purple-50 text-purple-600',
              count: '১৫+'
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                <item.icon size={28} />
              </div>
              <h4 className="text-xl font-black text-gray-800 mb-3">{item.title}</h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">{item.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">সংগ্রহে আছে: {item.count}</span>
                <ChevronRight size={20} className="text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Laws Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLaws.map((law) => (
          <div key={law.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl ${
                law.category === 'Act' ? 'bg-blue-50 text-blue-600' : 
                law.category === 'Rule' ? 'bg-amber-50 text-amber-600' : 
                'bg-purple-50 text-purple-600'
              }`}>
                {law.category === 'Act' ? <Gavel size={28} /> : 
                 law.category === 'Rule' ? <FileText size={28} /> : 
                 <Landmark size={28} />}
              </div>
              <span className="px-4 py-1.5 bg-gray-50 text-gray-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                {law.year}
              </span>
            </div>
            <h3 className="text-xl font-black text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors leading-tight">
              {law.title}
            </h3>
            <p className="text-gray-500 text-sm font-medium mb-8 leading-relaxed">
              {law.desc}
            </p>
            <div className="flex items-center justify-between pt-6 border-t border-gray-50">
              <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
                বিস্তারিত দেখুন <ChevronRight size={16} />
              </div>
              <button className="p-3 bg-gray-50 text-gray-400 rounded-xl hover:bg-emerald-600 hover:text-white transition-all shadow-sm">
                <Download size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Landmark Precedents Section */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center">
            <Landmark size={24} />
          </div>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">যুগান্তকারী আইনি নজীর (Landmark Precedents)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              case: 'Abdul Latif vs. State (2015)',
              subject: 'নামজারি (Mutation)',
              summary: 'উচ্চ আদালত পর্যবেক্ষণ করেছেন যে, যদি কোনো ব্যক্তির বৈধ দলীল এবং দখল থাকে, তবে শুধুমাত্র রেকর্ডে নাম নেই—এই অজুহাতে তার নামজারি আবেদন বাতিল করা যাবে না।',
              impact: 'এটি সাধারণ নাগরিকদের নামজারি প্রক্রিয়া সহজতর করেছে।'
            },
            {
              case: 'Govt. vs. S.M. Lutfor Rahman',
              subject: 'অর্পিত সম্পত্তি (Vested Property)',
              summary: 'এই রায়ে বলা হয়েছে, কোনো সম্পত্তি অর্পিত হিসেবে গেজেটভুক্ত না হলে সরকার তা দাবি করতে পারবে না। গেজেটই হলো অর্পিত সম্পত্তির চূড়ান্ত প্রমাণ।',
              impact: 'অর্পিত সম্পত্তি নিয়ে হয়রানি বন্ধে এটি বড় ভূমিকা রাখছে।'
            }
          ].map((item, idx) => (
            <div key={idx} className="p-8 bg-purple-50/30 rounded-[2.5rem] border border-purple-100 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-black text-purple-900">{item.case}</h4>
                <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-[10px] font-black uppercase tracking-widest">{item.subject}</span>
              </div>
              <p className="text-sm text-gray-600 font-medium leading-relaxed italic">"{item.summary}"</p>
              <div className="pt-4 border-t border-purple-100 flex items-center gap-2">
                <Info size={14} className="text-purple-400" />
                <p className="text-xs font-bold text-purple-700">প্রভাব: {item.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Law: Land Development Tax (Amendment) Rules 2024 */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <ShieldCheck size={24} />
          </div>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">ভূমি উন্নয়ন কর (সংশোধনী) বিধিমালা ২০২৪</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Bengali Version */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full w-fit">
              <span className="text-[10px] font-black uppercase tracking-widest">বাংলা সংস্করণ</span>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-black text-gray-800">প্রধান পরিবর্তনসমূহ:</h4>
              <ul className="space-y-3">
                {[
                  '১০০% অনলাইন পেমেন্ট: এখন থেকে ভূমি উন্নয়ন কর শুধুমাত্র অনলাইনে পরিশোধ করা যাবে।',
                  'ডিজিটাল দাখিলা: কর পরিশোধের পর তাৎক্ষণিকভাবে কিউআর কোড সম্বলিত ডিজিটাল দাখিলা পাওয়া যাবে।',
                  'কৃষি জমি ছাড়: ২৫ বিঘা পর্যন্ত কৃষি জমির কর মওকুফ সুবিধা অব্যাহত থাকবে।',
                  'নতুন কর হার: অকৃষি ও বাণিজ্যিক জমির ক্ষেত্রে এলাকাভেদে নতুন কর হার নির্ধারণ করা হয়েছে।',
                  'জরিমানা মওকুফ: নির্দিষ্ট সময়ের মধ্যে কর পরিশোধ করলে বকেয়া দাবির ওপর সুদ মওকুফের সুযোগ।'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-600 leading-relaxed">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* English Version */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full w-fit">
              <span className="text-[10px] font-black uppercase tracking-widest">English Version</span>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-black text-gray-800">Key Amendments:</h4>
              <ul className="space-y-3">
                {[
                  '100% Online Payment: Land development tax must now be paid exclusively through online portals.',
                  'Digital DCR/Receipt: Instant generation of QR-coded digital receipts upon successful payment.',
                  'Agricultural Exemption: Tax exemption for agricultural land up to 25 bighas remains in effect.',
                  'Revised Tax Rates: New tax rates introduced for non-agricultural and commercial lands based on location.',
                  'Interest Waiver: Opportunities for interest waivers on arrears if paid within the stipulated time.'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm font-bold text-gray-600 leading-relaxed">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <FileText className="text-emerald-600" size={24} />
            <p className="text-xs font-bold text-gray-500">সম্পূর্ণ গেজেটটি ডাউনলোড করতে পাশের বাটনে ক্লিক করুন।</p>
          </div>
          <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-xs hover:bg-emerald-700 transition-all flex items-center gap-2">
            <Download size={16} /> ডাউনলোড করুন
          </button>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-emerald-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-emerald-300">
              <Info size={32} />
            </div>
            <div>
              <h4 className="text-xl font-black mb-1">আইনি সহায়তা প্রয়োজন?</h4>
              <p className="text-emerald-100/60 font-medium">আমাদের এআই ভূমি পরামর্শক আপনাকে যেকোনো আইনি বিষয়ে সাহায্য করতে প্রস্তুত।</p>
            </div>
          </div>
          <button className="px-8 py-4 bg-white text-emerald-900 rounded-2xl font-black hover:bg-emerald-50 transition-all shadow-lg flex items-center gap-3">
            পরামর্শ নিন <ExternalLink size={20} />
          </button>
        </div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
};

export default LawsModule;
