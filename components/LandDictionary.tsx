
import React, { useState, useMemo } from 'react';
import { Book, Search, ChevronRight, Info, Bookmark, Share2, History, Scale, Map, Briefcase, Filter } from 'lucide-react';

export interface DictionaryEntry {
  term: string;
  definition: string;
  category: 'history' | 'law' | 'survey' | 'practical';
}

export const dictionaryData: DictionaryEntry[] = [
  // ভূমি ইতিহাস (History)
  { term: 'শেরশাহের ভূমি সংস্কার', definition: 'মুঘল আমলের আগে শেরশাহ সূরী প্রথম বিজ্ঞানসম্মত ভূমি জরিপ ও কবুলিয়ত-পাট্টা প্রথা চালু করেন।', category: 'history' },
  { term: 'চিরস্থায়ী বন্দোবস্ত (১৭৯৩)', definition: 'লর্ড কর্নওয়ালিস প্রবর্তিত প্রথা যার মাধ্যমে জমিদারদের জমির স্থায়ী মালিকানা দেওয়া হয়।', category: 'history' },
  { term: 'সূর্যাস্ত আইন', definition: 'চিরস্থায়ী বন্দোবস্তের একটি কঠোর নিয়ম যেখানে নির্দিষ্ট দিনে সূর্যাস্তের আগে খাজনা না দিলে জমিদারি নিলাম হতো।', category: 'history' },
  { term: 'জমিদারি প্রথা বিলোপ (১৯৫০)', definition: 'স্টেট অ্যাকুইজিশন অ্যান্ড টেন্যান্সি অ্যাক্টের মাধ্যমে ১৯৫০ সালে জমিদারি প্রথা বিলুপ্ত করে প্রজাদের সরাসরি সরকারের অধীনে আনা হয়।', category: 'history' },
  
  // ভূমি আইন (Law)
  { term: 'রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন ১৯৫০', definition: 'পূর্ববঙ্গের ভূমি ব্যবস্থার মূল আইন যা জমিদারি প্রথা বিলোপ ও প্রজাদের অধিকার নিশ্চিত করে।', category: 'law' },
  { term: 'অর্পিত সম্পত্তি আইন', definition: '১৯৬৫ সালের পাক-ভারত যুদ্ধের পর দেশত্যাগীদের সম্পত্তি ব্যবস্থাপনার জন্য প্রণীত আইন (সাবেক শত্রু সম্পত্তি)।', category: 'law' },
  { term: 'ভূমি সংস্কার অধ্যাদেশ ১৯৮৪', definition: 'ভূমিহীনদের অধিকার ও বর্গাচাষীদের সুরক্ষা প্রদানের লক্ষ্যে প্রণীত আইন।', category: 'law' },
  { term: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩', definition: 'ভূমি দখল, জালিয়াতি ও প্রতারণা রোধে প্রণীত আধুনিক আইন যাতে কঠোর শাস্তির বিধান রয়েছে।', category: 'law' },
  { term: 'ভূমি জরিপ আইন (Land Survey Acts)', definition: 'ভূমি জরিপ সংক্রান্ত আইন যা জরিপ পরিচালনা, রেকর্ড প্রস্তুত এবং বিরোধ নিষ্পত্তির পদ্ধতি নির্ধারণ করে।', category: 'law' },
  
  // ভূমি জরীপ (Survey)
  { term: 'সিএস (CS) জরিপ', definition: 'ক্যাডাস্ট্রাল সার্ভে; ১৮৮৮-১৯৪০ সালের মধ্যে পরিচালিত প্রথম আধুনিক বৈজ্ঞানিক জরিপ।', category: 'survey' },
  { term: 'এসএ (SA) জরিপ', definition: 'স্টেট অ্যাকুইজিশন সার্ভে; ১৯৫৬-১৯৬২ সালে জমিদারি প্রথা বিলোপের পর পরিচালিত জরুরি জরিপ।', category: 'survey' },
  { term: 'আরএস (RS) জরিপ', definition: 'রিভিশনাল সার্ভে; সিএস জরিপের ভুল সংশোধন ও আধুনিকায়নের জন্য পরিচালিত জরিপ।', category: 'survey' },
  { term: 'বিআরএস (BRS) জরিপ', definition: 'বাংলাদেশ রিভিশনাল সার্ভে; বর্তমানে চলমান আধুনিক ডিজিটাল জরিপ পদ্ধতি।', category: 'survey' },
  { term: 'সিটি জরিপ', definition: 'ঢাকা মহানগরী ও বড় শহরগুলোর জন্য পরিচালিত বিশেষ জরীপ।', category: 'survey' },
  
  // ভূমি ব্যবহারিক (Practical)
  { term: 'খতিয়ান', definition: 'ভূমি জরিপকালে প্রস্তুতকৃত ভূমির মালিকানা ও স্বত্বের বিবরণ সম্বলিত রেকর্ড।', category: 'practical' },
  { term: 'নামজারি (Mutation)', definition: 'জমির মালিকানা পরিবর্তনের পর সরকারি রেকর্ডে নতুন মালিকের নাম অন্তর্ভুক্ত করার প্রক্রিয়া।', category: 'practical' },
  { term: 'সাফ-কবলা', definition: 'জমির মালিকানা চূড়ান্তভাবে হস্তান্তরের জন্য সম্পাদিত প্রধান দলীল।', category: 'practical' },
  { term: 'দাগ নম্বর', definition: 'জরিপ ম্যাপে প্রত্যেকটি ভূমি খণ্ডকে শনাক্ত করার জন্য দেওয়া নম্বর।', category: 'practical' },
  { term: 'মৌজা', definition: 'ভূমি রাজস্ব আদায়ের জন্য নির্ধারিত সর্বনিম্ন ভৌগোলিক এলাকা বা গ্রাম।', category: 'practical' },
  { term: 'খাস জমি', definition: 'সরকারের মালিকানাধীন জমি যা কোনো ব্যক্তি বা প্রতিষ্ঠানের নামে স্থায়ীভাবে বন্দোবস্ত দেওয়া হয়নি।', category: 'practical' },
  { term: 'বায়নানামা', definition: 'জমি বিক্রির প্রাথমিক চুক্তিনামা যেখানে অগ্রিম টাকা লেনদেনের উল্লেখ থাকে।', category: 'practical' },
  { term: 'হেবা', definition: 'বিনা মূল্যে বা নিঃস্বার্থভাবে জমি দান করার প্রক্রিয়া (সাধারণত নিকটাত্মীয়দের মধ্যে)।', category: 'practical' },
  { term: 'ওয়াকফ', definition: 'ধর্মীয় বা জনহিতকর কাজে উৎসর্গকৃত সম্পত্তি।', category: 'practical' },
  { term: 'চান্দিনা ভিটি', definition: 'হাটে বা বাজারে অবস্থিত অকৃষি জমি।', category: 'practical' },
  { term: 'নাল জমি', definition: 'চাষযোগ্য সমতল কৃষি জমি।', category: 'practical' },
  { term: 'পাওয়ার অফ অ্যাটর্নি', definition: 'নিজের পক্ষে কাজ করার জন্য অন্য কাউকে আইনি ক্ষমতা প্রদান করা।', category: 'practical' },
  { term: 'বাংলাদেশের মাটি (Soils of Bangladesh)', definition: 'বাংলাদেশের মাটিকে প্রধানত তিন ভাগে ভাগ করা হয়: পাহাড়ি মাটি, সোপান মাটি এবং প্লাবন সমভূমি মাটি। এর মধ্যে প্লাবন সমভূমি মাটি সবচেয়ে উর্বর।', category: 'practical' },
  { term: 'ই-নামজারি প্রক্রিয়া (E-Mutation Process)', definition: 'অনলাইনে জমির মালিকানা পরিবর্তনের আবেদন ও অনুমোদন প্রক্রিয়া, যা ডিজিটাল ভূমি সেবার একটি অবিচ্ছেদ্য অংশ।', category: 'practical' }
];

const LandDictionary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'history' | 'law' | 'survey' | 'practical'>('all');

  const categories = [
    { id: 'all', label: 'সবগুলো', icon: Book, color: 'text-gray-600', bg: 'bg-gray-50' },
    { id: 'history', label: 'ভূমি ইতিহাস', icon: History, color: 'text-amber-600', bg: 'bg-amber-50' },
    { id: 'law', label: 'ভূমি আইন', icon: Scale, color: 'text-rose-600', bg: 'bg-rose-50' },
    { id: 'survey', label: 'ভূমি জরীপ', icon: Map, color: 'text-blue-600', bg: 'bg-blue-50' },
    { id: 'practical', label: 'ভূমি ব্যবহারিক', icon: Briefcase, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  ];

  const filteredEntries = useMemo(() => {
    return dictionaryData.filter(entry => {
      const matchesSearch = entry.term.includes(searchQuery) || entry.definition.includes(searchQuery);
      const matchesCategory = activeCategory === 'all' || entry.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Header Card */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
            <Book size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">অধ্যায়ভিত্তিক ভূমি অভিধান</h2>
          <p className="text-gray-500 max-w-lg font-medium">ভূমি ইতিহাস, আইন, জরীপ ও ব্যবহারিক পরিভাষার বিস্তারিত ব্যাখ্যা।</p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-10">
          <input 
            type="text" 
            placeholder="শব্দ বা পরিভাষা খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-[2rem] focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm pr-14"
          />
          <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-sm transition-all ${
                activeCategory === cat.id 
                  ? 'bg-gray-800 text-white shadow-lg scale-105' 
                  : 'bg-white text-gray-500 border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30'
              }`}
            >
              <cat.icon size={18} className={activeCategory === cat.id ? 'text-white' : cat.color} />
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Dictionary List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredEntries.length > 0 ? (
          filteredEntries.map((entry, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    entry.category === 'history' ? 'bg-amber-50 text-amber-600' :
                    entry.category === 'law' ? 'bg-rose-50 text-rose-600' :
                    entry.category === 'survey' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'
                  }`}>
                    {categories.find(c => c.id === entry.category)?.label}
                  </span>
                  <div className="flex gap-1">
                    <button className="p-2 text-gray-300 hover:text-emerald-600 transition-colors">
                      <Bookmark size={16} />
                    </button>
                    <button className="p-2 text-gray-300 hover:text-emerald-600 transition-colors">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">
                  {entry.term}
                </h3>
                <p className="text-gray-600 font-medium leading-relaxed text-sm">
                  {entry.definition}
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-50 flex justify-end">
                <button className="text-emerald-600 font-black text-xs flex items-center gap-1 hover:gap-2 transition-all">
                  বিস্তারিত দেখুন <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white p-20 rounded-[3rem] border border-gray-100 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <Search size={40} />
            </div>
            <h4 className="text-xl font-black text-gray-800">কোনো শব্দ পাওয়া যায়নি</h4>
            <p className="text-gray-500 font-medium max-w-xs mx-auto">আপনার দেওয়া শব্দটি পুনরায় যাচাই করে অথবা অন্য ক্যাটাগরিতে চেষ্টা করুন।</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-gray-900 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-emerald-500/20 rounded-[2rem] flex items-center justify-center text-emerald-400 shrink-0">
            <Info size={40} />
          </div>
          <div>
            <h4 className="text-2xl font-black mb-2">ভূমি পরিভাষা ও বিধিমালা</h4>
            <p className="text-gray-400 font-medium leading-relaxed">
              ভূমি সংক্রান্ত অনেক শব্দই মুঘল ও ব্রিটিশ আমল থেকে প্রচলিত। ডিজিটাল ভূমি সেবার মাধ্যমে এই পরিভাষাগুলোকে আরও সহজবোধ্য করার চেষ্টা করা হচ্ছে। নিয়মিত নতুন শব্দ ও বিধিমালা এখানে সংযুক্ত করা হয়।
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
      </div>
    </div>
  );
};

export default LandDictionary;
