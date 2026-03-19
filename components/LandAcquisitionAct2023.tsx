
import React, { useState, useMemo } from 'react';
import { 
  Book, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Download, 
  Landmark, 
  Gavel, 
  Scale, 
  FileText, 
  Zap, 
  ShieldCheck, 
  Video, 
  Banknote,
  Search,
  ExternalLink,
  ChevronRight,
  History,
  Bell,
  FileDown,
  Globe
} from 'lucide-react';

interface ActSection {
  id: string;
  section: string;
  title: string;
  content?: string;
  desc?: string;
  tags: string[];
}

const actSections: ActSection[] = [
  { id: '1', section: 'ধারা ৪', title: 'অধিগ্রহণের প্রাথমিক নোটিশ', content: 'যখন কোনো স্থাবর সম্পত্তি জনস্বার্থে অধিগ্রহণের প্রয়োজন হয়, তখন জেলা প্রশাসক ধারা ৪ এর অধীনে নোটিশ জারি করবেন। এই নোটিশ জারির পূর্বে সংশ্লিষ্ট এলাকার ভিডিওগ্রাফি ও স্থিরচিত্র ধারণ বাধ্যতামূলক।', tags: ['নোটিশ', 'ভিডিওগ্রাফি', 'প্রাথমিক ধাপ'] },
  { id: '2', section: 'ধারা ৫', title: 'আপত্তি শুনানি', desc: 'নোটিশ জারির পর কোনো ব্যক্তি যদি মনে করেন তার জমি অধিগ্রহণ করা উচিত নয়, তবে তিনি ১৫ দিনের মধ্যে জেলা প্রশাসকের কাছে লিখিত আপত্তি দাখিল করতে পারেন।', tags: ['আপত্তি', 'শুনানি', 'অধিকার'] },
  { id: '3', section: 'ধারা ৭', title: 'যৌথ তদন্ত', desc: 'জেলা প্রশাসক বা তার মনোনীত প্রতিনিধি সরজমিনে তদন্ত করে জমির মালিকানা, স্থাপনা এবং ফসলের ক্ষয়ক্ষতি নির্ধারণ করবেন।', tags: ['তদন্ত', 'ক্ষয়ক্ষতি', 'মালিকানা'] },
  { id: '4', section: 'ধারা ৮', title: 'অধিগ্রহণের চূড়ান্ত সিদ্ধান্ত', desc: 'আপত্তি শুনানি ও তদন্ত শেষে সরকার বা বিভাগীয় কমিশনার অধিগ্রহণের চূড়ান্ত সিদ্ধান্ত গ্রহণ করবেন।', tags: ['চূড়ান্ত সিদ্ধান্ত', 'অনুমোদন'] },
  { id: '5', section: 'ধারা ৯', title: 'ক্ষতিপূরণ নির্ধারণ ও প্রদান', desc: 'বাজারমূল্যের ৩ গুণ (সরকারি প্রকল্প) বা ৪ গুণ (বেসরকারি প্রকল্প) হারে ক্ষতিপূরণ নির্ধারণ করা হবে এবং সরাসরি ব্যাংক একাউন্টে প্রদান করা হবে।', tags: ['ক্ষতিপূরণ', 'পেমেন্ট', 'বাজারমূল্য'] },
  { id: '6', section: 'ধারা ১০', title: 'দখল গ্রহণ', desc: 'ক্ষতিপূরণ প্রদানের পর জেলা প্রশাসক জমির দখল গ্রহণ করবেন এবং তা প্রত্যাশী সংস্থার কাছে হস্তান্তর করবেন।', tags: ['দখল', 'হস্তান্তর'] },
  { id: '7', section: 'ধারা ১১', title: 'জরুরি অধিগ্রহণ', desc: 'জাতীয় নিরাপত্তা বা জনগুরুত্বপূর্ণ জরুরি প্রয়োজনে বিশেষ পদ্ধতিতে দ্রুত অধিগ্রহণের বিধান।', tags: ['জরুরি', 'নিরাপত্তা'] },
  { id: '8', section: 'ধারা ১২', title: 'পুনর্বাসন', desc: 'বড় আকারের অধিগ্রহণের ফলে ভূমিহীন বা গৃহহীন ব্যক্তিদের পুনর্বাসনের ব্যবস্থা নিশ্চিত করা।', tags: ['পুনর্বাসন', 'আবাসন'] },
];

const LandAcquisitionAct2023: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'sections' | 'amendments' | 'resources'>('overview');

  const filteredSections = useMemo(() => {
    if (!searchQuery) return actSections;
    return actSections.filter(s => 
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      (s.content?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (s.desc?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      s.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [searchQuery]);

  const amendments = [
    {
      date: 'অক্টোবর ২০২৩',
      title: 'ক্ষতিপূরণ বৃদ্ধি ও সরাসরি পেমেন্ট',
      desc: 'সরকারি প্রকল্পের জন্য বাজারমূল্যের ৩ গুণ এবং বেসরকারি প্রকল্পের জন্য ৪ গুণ ক্ষতিপূরণ নিশ্চিত করা হয়েছে। মধ্যস্বত্বভোগীদের দৌরাত্ম্য রোধে সরাসরি ব্যাংক পেমেন্ট বাধ্যতামূলক।',
      icon: Banknote,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      date: 'সেপ্টেম্বর ২০২৩',
      title: 'ডিজিটাল রেকর্ড ও ভিডিওগ্রাফি',
      desc: 'অধিগ্রহণের পূর্বে সংশ্লিষ্ট এলাকার ড্রোন ভিডিওগ্রাফি ও স্থিরচিত্র ধারণ বাধ্যতামূলক করা হয়েছে যাতে পরবর্তীতে নতুন স্থাপনা দেখিয়ে অতিরিক্ত অর্থ দাবি করা না যায়।',
      icon: Video,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      date: 'আগস্ট ২০২৩',
      title: 'আপিল প্রক্রিয়া সহজীকরণ',
      desc: 'জেলা প্রশাসকের সিদ্ধান্তের বিরুদ্ধে বিভাগীয় কমিশনারের কাছে আপিলের সময়সীমা ও পদ্ধতি সুনির্দিষ্টকরণ করা হয়েছে।',
      icon: Gavel,
      color: 'bg-amber-50 text-amber-600'
    }
  ];

  const renderOverview = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="relative h-72 rounded-[3.5rem] overflow-hidden shadow-2xl group">
        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop" 
          alt="Law and Justice" 
          className="w-full h-full object-cover brightness-[0.3] group-hover:scale-105 transition-transform duration-1000" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-emerald-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
            <Landmark size={16} className="text-emerald-300" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">অধিগ্রহণ আইন ২০২৩</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল আইন, ২০২৩</h2>
          <p className="text-emerald-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90">
            জনস্বার্থে ভূমি অধিগ্রহণের আধুনিক, স্বচ্ছ এবং নাগরিক-বান্ধব আইনি কাঠামো।
          </p>
        </div>
      </div>

      {/* Quick Search Bar */}
      <div className="max-w-3xl mx-auto -mt-16 relative z-10">
        <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl border border-gray-100 flex items-center gap-4">
          <div className="flex-1 relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value) setActiveTab('sections');
              }}
              placeholder="আইনের ধারা বা বিষয়বস্তু দিয়ে খুঁজুন (উদা: ক্ষতিপূরণ, ধারা ৪)..."
              className="w-full px-8 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700"
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>
          <button className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg">
            খুঁজুন
          </button>
        </div>
      </div>

      {/* Key Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: '৩-৪ গুণ ক্ষতিপূরণ', desc: 'বাজারমূল্যের তুলনায় কয়েকগুণ বেশি আর্থিক সুবিধা নিশ্চিতকরণ।', icon: Banknote, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { title: 'ডিজিটাল স্বচ্ছতা', desc: 'ভিডিওগ্রাফি ও অনলাইন পেমেন্টের মাধ্যমে দুর্নীতি রোধ।', icon: ShieldCheck, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'দ্রুত আপিল', desc: 'বিভাগীয় পর্যায়ে দ্রুততম সময়ে অভিযোগ নিষ্পত্তির ব্যবস্থা।', icon: Scale, color: 'text-indigo-600', bg: 'bg-indigo-50' }
        ].map((feature, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
              <feature.icon size={28} />
            </div>
            <h4 className="text-xl font-black text-gray-800 mb-3">{feature.title}</h4>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>

      {/* Latest Updates Banner */}
      <div className="bg-indigo-900 rounded-[3.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <Bell size={20} className="text-indigo-300" />
              </div>
              <span className="text-indigo-300 font-black text-xs uppercase tracking-widest">সর্বশেষ আপডেট</span>
            </div>
            <h3 className="text-3xl font-black tracking-tight leading-tight">আইনের নতুন সংশোধনী ও গেজেট প্রকাশিত হয়েছে</h3>
            <p className="text-indigo-100/70 font-medium leading-relaxed">
              ২০২৩ সালের সংশোধিত আইনে ক্ষতিপূরণ নির্ধারণের পদ্ধতিতে আমূল পরিবর্তন আনা হয়েছে। এখন থেকে সরাসরি মালিকের একাউন্টে টাকা জমা হবে।
            </p>
            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => window.open('https://minland.portal.gov.bd/sites/default/files/files/minland.portal.gov.bd/page/7a7a7a7a_7a7a_7a7a_7a7a_7a7a7a7a7a7a/Acquisition%20Act%202023.pdf', '_blank')}
                className="px-8 py-4 bg-white text-indigo-900 rounded-2xl font-black hover:bg-indigo-50 transition-all flex items-center gap-2"
              >
                <Download size={20} /> গেজেট ডাউনলোড করুন
              </button>
              <button 
                onClick={() => setActiveTab('amendments')}
                className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black hover:bg-white/20 transition-all"
              >
                সংশোধনীসমূহ দেখুন
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/3 aspect-square bg-white/5 rounded-[3rem] border border-white/10 flex items-center justify-center p-8 group">
            <FileText size={120} className="text-indigo-300/30 group-hover:scale-110 transition-transform duration-700" />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -mr-48 -mt-48" />
      </div>
    </div>
  );

  const renderSections = () => (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-8 bg-emerald-600 rounded-full" />
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">আইনের ধারাসমূহ</h3>
        </div>
        <div className="text-emerald-600 font-black text-xs uppercase tracking-widest">
          {filteredSections.length} টি ধারা পাওয়া গেছে
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSections.map((section) => (
          <div key={section.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-black">
                {section.section}
              </div>
              <div className="flex gap-2">
                {section.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-gray-50 text-gray-400 rounded-lg text-[10px] font-bold">#{tag}</span>
                ))}
              </div>
            </div>
            <h4 className="text-xl font-black text-gray-800 mb-4 group-hover:text-emerald-600 transition-colors">{section.title}</h4>
            <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">
              {section.content || section.desc}
            </p>
            <button className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest hover:gap-4 transition-all">
              বিস্তারিত পড়ুন <ChevronRight size={16} />
            </button>
          </div>
        ))}
      </div>

      {filteredSections.length === 0 && (
        <div className="py-20 text-center space-y-4 bg-white rounded-[3rem] border border-gray-100">
          <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto">
            <Search size={40} />
          </div>
          <p className="text-gray-500 font-black">দুঃখিত, আপনার অনুসন্ধানের সাথে মিল আছে এমন কোনো ধারা পাওয়া যায়নি।</p>
          <button onClick={() => setSearchQuery('')} className="text-emerald-600 font-black hover:underline">অনুসন্ধান রিসেট করুন</button>
        </div>
      )}
    </div>
  );

  const renderAmendments = () => (
    <div className="space-y-8 animate-in slide-in-from-left-8 duration-500">
      <div className="flex items-center gap-3 px-4">
        <div className="w-2 h-8 bg-blue-600 rounded-full" />
        <h3 className="text-2xl font-black text-gray-800 tracking-tight">সাম্প্রতিক সংশোধনীসমূহ</h3>
      </div>
      <div className="space-y-6">
        {amendments.map((item, idx) => (
          <div key={idx} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-10 items-start">
            <div className={`w-20 h-20 ${item.color} rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner`}>
              <item.icon size={36} />
            </div>
            <div className="space-y-4 flex-1">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">{item.date}</span>
                <span className="w-1.5 h-1.5 bg-gray-200 rounded-full" />
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-widest">গেজেট নং: ২০২৩/৪৫</span>
              </div>
              <h4 className="text-2xl font-black text-gray-800">{item.title}</h4>
              <p className="text-gray-500 font-medium leading-relaxed text-lg">{item.desc}</p>
              <div className="pt-4 flex gap-4">
                <button 
                  onClick={() => window.open('https://minland.portal.gov.bd/sites/default/files/files/minland.portal.gov.bd/page/7a7a7a7a_7a7a_7a7a_7a7a_7a7a7a7a7a7a/Acquisition%20Act%202023.pdf', '_blank')}
                  className="px-6 py-3 bg-gray-50 text-gray-700 rounded-xl font-black text-xs hover:bg-gray-100 transition-all flex items-center gap-2"
                >
                  <FileDown size={16} /> গেজেট দেখুন
                </button>
                <button className="px-6 py-3 bg-white border border-gray-100 text-blue-600 rounded-xl font-black text-xs hover:bg-blue-50 transition-all">
                  সংশ্লিষ্ট ধারা দেখুন
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto pb-20">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12 sticky top-24 z-20 bg-gray-50/80 backdrop-blur-md p-4 rounded-[2.5rem] border border-gray-200/50 shadow-sm">
        {[
          { id: 'overview', label: 'সারসংক্ষেপ', icon: Info },
          { id: 'sections', label: 'আইনের ধারাসমূহ', icon: Book },
          { id: 'amendments', label: 'সংশোধনীসমূহ', icon: History },
          { id: 'resources', label: 'ডাউনলোড ও গেজেট', icon: Download },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-sm transition-all ${
              activeTab === tab.id 
                ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 -translate-y-1' 
                : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && renderOverview()}
      {activeTab === 'sections' && renderSections()}
      {activeTab === 'amendments' && renderAmendments()}
      
      {/* Download Section */}
      {activeTab === 'resources' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in zoom-in-95 duration-500">
          <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <FileDown size={32} />
            </div>
            <h3 className="text-2xl font-black text-gray-800">অফিসিয়াল গেজেট ও আইন</h3>
            <p className="text-gray-500 font-medium leading-relaxed">
              স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল আইন, ২০২৩ এর পূর্ণাঙ্গ গেজেট এবং সংশ্লিষ্ট বিধিমালা এখান থেকে ডাউনলোড করতে পারবেন।
            </p>
            <div className="space-y-4">
              {[
                { name: 'পূর্ণাঙ্গ আইন ২০২৩ (বাংলা)', size: '২.৫ মেগাবাইট' },
                { name: 'সংশোধিত বিধিমালা ২০২৩', size: '১.৮ মেগাবাইট' },
                { name: 'ক্ষতিপূরণ নির্ধারণ গাইডলাইন', size: '০.৫ মেগাবাইট' }
              ].map((file, i) => (
                <div key={i} className="flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-emerald-200 transition-all group">
                  <div className="flex items-center gap-4">
                    <FileText size={24} className="text-gray-400 group-hover:text-emerald-600" />
                    <div>
                      <h4 className="font-black text-gray-800 text-sm">{file.name}</h4>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">PDF | {file.size}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.open('https://minland.portal.gov.bd/sites/default/files/files/minland.portal.gov.bd/page/7a7a7a7a_7a7a_7a7a_7a7a_7a7a7a7a7a7a/Acquisition%20Act%202023.pdf', '_blank')}
                    className="p-3 bg-white text-emerald-600 rounded-xl shadow-sm hover:bg-emerald-600 hover:text-white transition-all"
                  >
                    <Download size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-900 rounded-[3.5rem] p-10 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                <Globe size={32} className="text-emerald-300" />
              </div>
              <h3 className="text-3xl font-black tracking-tight leading-tight">অনলাইন পোর্টাল ও সহায়তা</h3>
              <p className="text-emerald-100/70 font-medium leading-relaxed">
                অধিগ্রহণ সংক্রান্ত যেকোনো তথ্যের জন্য ভূমি মন্ত্রণালয়ের অফিসিয়াল পোর্টালে ভিজিট করুন অথবা আমাদের এআই সহকারীর সাহায্য নিন।
              </p>
              <div className="space-y-4">
                <button className="w-full py-5 bg-white text-emerald-900 rounded-2xl font-black hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
                  অফিসিয়াল পোর্টালে যান <ExternalLink size={20} />
                </button>
                <button className="w-full py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black hover:bg-white/20 transition-all">
                  এআই সহকারীর পরামর্শ নিন
                </button>
              </div>
            </div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default LandAcquisitionAct2023;
