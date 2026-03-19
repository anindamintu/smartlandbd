
import React, { useState, useMemo } from 'react';
import { ExternalLink, FileText, Calendar, Search, Bell, Info, ArrowRight, Download, Globe, ShieldCheck, Filter, ChevronDown } from 'lucide-react';

const circularsData = [
  { id: 1, title: 'ভূমি উন্নয়ন কর (সংশোধনী) বিধিমালা ২০২৪', date: '২০২৪-০২-১৫', displayDate: '১৫ ফেব্রুয়ারি, ২০২৪', category: 'পরিপত্র', memoNo: '৩১.০০.০০০০.০৪২.০৫.০১১.২৩-৪৫' },
  { id: 2, title: 'অনলাইনে নামজারি আবেদন ফি সংক্রান্ত নির্দেশনা', date: '২০২৪-০১-১০', displayDate: '১০ জানুয়ারি, ২০২৪', category: 'নোটিশ', memoNo: '৩১.০০.০০০০.০৪২.০৫.০০১.২৪-১২' },
  { id: 3, title: 'অর্পিত সম্পত্তি অবমুক্তকরণ প্রক্রিয়া সহজীকরণ', date: '২০২৪-০১-০৫', displayDate: '০৫ জানুয়ারি, ২০২৪', category: 'গেজেট', memoNo: 'এস.আর.ও নং-০৫-আইন/২০২৪' },
  { id: 4, title: 'ডিজিটাল মৌজা ম্যাপ ব্যবহারের নীতিমালা', date: '২০২৩-১২-২২', displayDate: '২২ ডিসেম্বর, ২০২৩', category: 'পরিপত্র', memoNo: '৩১.০০.০০০০.০৪২.০৫.০১০.২৩-১৫৬' },
  { id: 5, title: 'স্মার্ট ভূমি সেবা সপ্তাহ ২০২৪ উদযাপন', date: '২০২৩-১২-১৫', displayDate: '১৫ ডিসেম্বর, ২০২৩', category: 'ইভেন্ট', memoNo: '৩১.০০.০০০০.০৪২.০৫.০০৯.২৩-৮৯' },
  { id: 6, title: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ প্রয়োগ বিধিমালা', date: '২০২৩-১১-২০', displayDate: '২০ নভেম্বর, ২০২৩', category: 'গেজেট', memoNo: 'এস.আর.ও নং-৩২০-আইন/২০২৩' },
  { id: 7, title: 'হাট ও বাজার (স্থাপন ও ব্যবস্থাপনা) আইন ২০২৩', date: '২০২৩-১০-০৫', displayDate: '০৫ অক্টোবর, ২০২৩', category: 'নোটিশ', memoNo: '৩১.০০.০০০০.০৪২.০৫.০০৮.২৩-৩৪' },
  { id: 8, title: 'ভূমি অধিগ্রহণ ও হুকুমদখল (সংশোধনী) আইন ২০২৩', date: '২০২৩-০৯-১২', displayDate: '১২ সেপ্টেম্বর, ২০২৩', category: 'পরিপত্র', memoNo: '৩১.০০.০০০০.০৪২.০৫.০০৭.২৩-১২' },
  { id: 9, title: 'অনলাইনে ভূমি উন্নয়ন কর পরিশোধের সুবিধা বৃদ্ধি', date: '২০২৩-০৮-৩০', displayDate: '৩০ আগস্ট, ২০২৩', category: 'নোটিশ', memoNo: '৩১.০০.০০০০.০৪২.০৫.০০৬.২৩-৫৬' },
  { id: 10, title: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তরের নতুন সিটিজেন চার্টার', date: '২০২৩-০৭-১৫', displayDate: '১৫ জুলাই, ২০২৩', category: 'পরিপত্র', memoNo: '৩১.০০.০০০০.০৪২.০৫.০০৫.২৩-৭৮' },
];

const categories = ['সবগুলো', 'পরিপত্র', 'নোটিশ', 'গেজেট', 'ইভেন্ট'];

const CircularsModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('সবগুলো');
  const [selectedYear, setSelectedYear] = useState('সবগুলো');

  const years = useMemo(() => {
    const yearsSet = new Set(circularsData.map(c => c.date.split('-')[0]));
    return ['সবগুলো', ...Array.from(yearsSet).sort((a, b) => b.localeCompare(a))];
  }, []);

  const filteredCirculars = useMemo(() => {
    return circularsData.filter(item => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        item.title.toLowerCase().includes(searchLower) || 
        item.memoNo.toLowerCase().includes(searchLower);
      const matchesCategory = activeCategory === 'সবগুলো' || item.category === activeCategory;
      const matchesYear = selectedYear === 'সবগুলো' || item.date.startsWith(selectedYear);
      return matchesSearch && matchesCategory && matchesYear;
    });
  }, [searchQuery, activeCategory, selectedYear]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Header */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
            <ExternalLink size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">ভূমি তথ্য বাতায়ন ও পরিপত্র</h2>
          <p className="text-gray-500 max-w-lg font-medium">ভূমি মন্ত্রণালয় কর্তৃক জারিকৃত সর্বশেষ পরিপত্র, গেজেট ও গুরুত্বপূর্ণ নোটিশসমূহ এখানে পাবেন।</p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-10">
          <div className="relative max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="পরিপত্র বা নোটিশ খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm pr-14"
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
              <Filter size={16} className="text-gray-400" />
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">ক্যাটাগরি:</span>
              <div className="flex gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-black transition-all ${
                      activeCategory === cat 
                        ? 'bg-emerald-600 text-white shadow-md border-b-2 border-dashed border-red-500' 
                        : 'bg-white text-gray-500 border border-gray-100 hover:border-emerald-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-2xl border border-gray-100">
              <Calendar size={16} className="text-gray-400" />
              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">বছর:</span>
              <div className="relative">
                <select 
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="bg-transparent font-black text-xs text-gray-700 outline-none appearance-none pr-6 cursor-pointer"
                >
                  {years.map(year => <option key={year} value={year}>{year}</option>)}
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* Results List */}
        <div className="space-y-4">
          {filteredCirculars.length > 0 ? (
            filteredCirculars.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <FileText size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-800 mb-1">{item.title}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 font-bold">
                      <span className="flex items-center gap-1.5"><Calendar size={14}/> {item.displayDate}</span>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded-md uppercase tracking-widest">{item.category}</span>
                      <span className="text-emerald-600/60 font-mono">স্মারক: {item.memoNo}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-3 bg-gray-50 text-gray-500 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all">
                    <Download size={20} />
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 bg-white border-2 border-emerald-600 text-emerald-600 rounded-xl font-black text-sm hover:bg-emerald-50 transition-all">
                    বিস্তারিত <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-20 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                <Search size={32} />
              </div>
              <h4 className="text-xl font-black text-gray-800">কোনো তথ্য পাওয়া যায়নি</h4>
              <p className="text-gray-500 font-medium">আপনার অনুসন্ধান শব্দ বা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'ভূমি মন্ত্রণালয়', icon: Globe, url: 'https://minland.gov.bd' },
          { title: 'ভূমি সেবা পোর্টাল', icon: ShieldCheck, url: 'https://land.gov.bd' },
          { title: 'ডিজিটাল গেজেট', icon: Bell, url: 'https://bgpress.gov.bd' }
        ].map((link, i) => (
          <a 
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all group"
          >
            <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <link.icon size={28} />
            </div>
            <div>
              <h4 className="text-lg font-black text-gray-800 mb-1">{link.title}</h4>
              <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">ভিজিট করুন <ExternalLink size={10} className="inline ml-1"/></p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default CircularsModule;
