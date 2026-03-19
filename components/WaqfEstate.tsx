
import React, { useState } from 'react';
import { Search, MapPin, FileText, User, Hash, Filter, CheckCircle2, AlertCircle, Clock, ShieldCheck, Download, Share2, Eye, BookOpen, Calendar, Landmark, Layers, Info, ArrowRight, ArrowLeft } from 'lucide-react';

interface WaqfRecord {
  id: string;
  estateName: string;
  waqifName: string;
  address: string;
  deedNo: string;
  deedDate: string;
  landAmount: string;
  khatianNo: string;
  dagNo: string;
  landClass: string;
  possession: string;
  currentStatus: string;
  waqfType: string;
}

const mockWaqfRecords: WaqfRecord[] = [
  {
    id: '1',
    estateName: 'হাজী মুহাম্মদ মহসিন ওয়াকফ এস্টেট',
    waqifName: 'হাজী মুহাম্মদ মহসিন',
    address: 'দানবীর রোড, হুগলি (সদর দপ্তর), ঢাকা শাখা',
    deedNo: '১০২৫/১৮০৬',
    deedDate: '২০ এপ্রিল, ১৮০৬',
    landAmount: '৫০০.৫০ শতাংশ',
    khatianNo: '৫৬৭',
    dagNo: '১২৩৪',
    landClass: 'ভিটি',
    possession: 'ওয়াকফ প্রশাসন',
    currentStatus: 'সচল',
    waqfType: 'ওয়াকফ আল-আওলাদ'
  },
  {
    id: '2',
    estateName: 'খান বাহাদুর আহসানউল্লাহ ওয়াকফ এস্টেট',
    waqifName: 'খান বাহাদুর আহসানউল্লাহ',
    address: 'নলতা, সাতক্ষীরা (সদর দপ্তর), ঢাকা অফিস',
    deedNo: '৪৫৬/১৯৩৫',
    deedDate: '১৫ জুন, ১৯৩৫',
    landAmount: '২৫০.২৫ শতাংশ',
    khatianNo: '৮৯০',
    dagNo: '৫৬৭৮',
    landClass: 'নাল',
    possession: 'মোতাওয়াল্লী',
    currentStatus: 'সচল',
    waqfType: 'ওয়াকফ লিল্লাহ'
  },
  {
    id: '3',
    estateName: 'বায়তুল মোকাররম জাতীয় মসজিদ ওয়াকফ এস্টেট',
    waqifName: 'ইসলামিক ফাউন্ডেশন',
    address: 'পল্টন, ঢাকা',
    deedNo: '৭৮৯/১৯৬০',
    deedDate: '১০ মে, ১৯৬০',
    landAmount: '১২০.০০ শতাংশ',
    khatianNo: '১১২',
    dagNo: '৯১০১',
    landClass: 'বাণিজ্যিক',
    possession: 'ইসলামিক ফাউন্ডেশন',
    currentStatus: 'সচল',
    waqfType: 'ওয়াকফ লিল্লাহ'
  },
  {
    id: '4',
    estateName: 'শাহ আমানত (রঃ) ওয়াকফ এস্টেট',
    waqifName: 'শাহ আমানত বংশধর',
    address: 'আন্দরকিল্লা, চট্টগ্রাম',
    deedNo: '২৩৪/১৮৫০',
    deedDate: '০৫ আগস্ট, ১৮৫০',
    landAmount: '৩০০.৭৫ শতাংশ',
    khatianNo: '৪৫৬',
    dagNo: '৭৮৯০',
    landClass: 'ভিটি',
    possession: 'মোতাওয়াল্লী কমিটি',
    currentStatus: 'সচল',
    waqfType: 'ওয়াকফ আল-আওলাদ'
  }
];

interface WaqfEstateProps {
  onBack?: () => void;
}

const WaqfEstate: React.FC<WaqfEstateProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<WaqfRecord[]>(mockWaqfRecords);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      const filtered = mockWaqfRecords.filter(record => 
        record.estateName.includes(searchQuery) || 
        record.waqifName.includes(searchQuery) ||
        record.deedNo.includes(searchQuery) ||
        record.dagNo.includes(searchQuery) ||
        record.khatianNo.includes(searchQuery)
      );
      setResults(filtered);
      setIsSearching(false);
    }, 500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Header */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex items-center gap-6">
            {onBack && (
              <button 
                onClick={onBack}
                className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-indigo-50 hover:text-indigo-600 transition-all group"
                title="পেছনে ফিরে যান"
              >
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            )}
            <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center text-indigo-600 shadow-inner">
              <BookOpen size={40} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800 mb-1 tracking-tight">ওয়াকফ এস্টেট ব্যবস্থাপনা</h2>
              <p className="text-gray-500 font-medium">ওয়াকফ সম্পত্তি অনুসন্ধান ও তালিকা ব্যবস্থাপনা সিস্টেম</p>
            </div>
          </div>
          <div className="flex bg-gray-100 p-1.5 rounded-2xl">
            <button 
              onClick={() => setViewMode('grid')}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${viewMode === 'grid' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              গ্রিড ভিউ
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`px-6 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${viewMode === 'list' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              তালিকা ভিউ
            </button>
          </div>
        </div>

        <div className="bg-indigo-50/50 p-8 rounded-[2rem] border border-indigo-100/50">
          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="এস্টেটের নাম, দলিল, দাগ অথবা খতিয়ান নম্বর লিখুন..."
              className="w-full px-8 py-5 bg-white border-2 border-transparent rounded-2xl focus:border-indigo-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm pr-32"
            />
            <button 
              onClick={handleSearch}
              disabled={isSearching}
              className="absolute right-2 top-2 bottom-2 px-8 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
            >
              {isSearching ? 'খোঁজা হচ্ছে...' : 'অনুসন্ধান'}
              {!isSearching && <ArrowRight size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-center justify-between px-4">
          <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-indigo-500 rounded-full"/> ওয়াকফ তালিকা ({results.length})
          </h3>
        </div>

        {results.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 gap-6">
              {results.map((record) => (
                <div key={record.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex flex-col gap-8">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                          <Landmark size={32} />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black text-gray-800 mb-1">{record.estateName}</h4>
                          <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                            <span className="px-3 py-1 bg-indigo-100 rounded-full uppercase tracking-widest text-[10px]">{record.waqfType}</span>
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full uppercase tracking-widest text-[10px]">{record.currentStatus}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="p-3 bg-gray-50 text-gray-500 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                          <Share2 size={20} />
                        </button>
                        <button className="p-3 bg-gray-50 text-gray-500 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                          <Download size={20} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-6 gap-x-12 p-8 bg-gray-50/50 rounded-[2rem] border border-gray-100">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <User size={12}/> ওয়াকিবের নাম
                        </p>
                        <p className="font-bold text-gray-700">{record.waqifName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <MapPin size={12}/> ঠিকানা
                        </p>
                        <p className="font-bold text-gray-700">{record.address}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <FileText size={12}/> দলিল নম্বর
                        </p>
                        <p className="font-bold text-gray-700">{record.deedNo}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Calendar size={12}/> দলিল সম্পাদনের তারিখ
                        </p>
                        <p className="font-bold text-gray-700">{record.deedDate}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Layers size={12}/> জমির পরিমাণ
                        </p>
                        <p className="font-bold text-gray-700">{record.landAmount}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <FileText size={12}/> খতিয়ান নম্বর
                        </p>
                        <p className="font-bold text-gray-700">{record.khatianNo}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Hash size={12}/> দাগ নম্বর
                        </p>
                        <p className="font-bold text-gray-700">{record.dagNo}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <Layers size={12}/> শ্রেণী
                        </p>
                        <p className="font-bold text-gray-700">{record.landClass}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                          <ShieldCheck size={12}/> দখল
                        </p>
                        <p className="font-bold text-gray-700">{record.possession}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-gray-400 text-xs font-medium">
                        <Info size={14} /> ওয়াকফ এস্টেট সংক্রান্ত যেকোনো তথ্যের জন্য ওয়াকফ প্রশাসনের সাথে যোগাযোগ করুন।
                      </div>
                      <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-black text-sm hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                        <Eye size={18} /> বিস্তারিত দেখুন
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">এস্টেটের নাম</th>
                      <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">দাগ নম্বর</th>
                      <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">খতিয়ান</th>
                      <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">জমির পরিমাণ</th>
                      <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">বর্তমান অবস্থা</th>
                      <th className="px-6 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {results.map((record) => (
                      <tr key={record.id} className="hover:bg-indigo-50/30 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="font-bold text-gray-800">{record.estateName}</div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{record.waqfType}</div>
                        </td>
                        <td className="px-6 py-5 font-bold text-gray-600">{record.dagNo}</td>
                        <td className="px-6 py-5 font-bold text-gray-600">{record.khatianNo}</td>
                        <td className="px-6 py-5 font-bold text-gray-600">{record.landAmount}</td>
                        <td className="px-6 py-5">
                          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {record.currentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-2">
                            <button className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-lg transition-all">
                              <Eye size={18} />
                            </button>
                            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition-all">
                              <Download size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )
        ) : (
          <div className="bg-white p-20 rounded-[3rem] border border-gray-100 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <Search size={40} />
            </div>
            <h4 className="text-xl font-black text-gray-800">কোনো তথ্য পাওয়া যায়নি</h4>
            <p className="text-gray-500 font-medium max-w-xs mx-auto">আপনার দেওয়া তথ্যগুলো পুনরায় যাচাই করে আবার চেষ্টা করুন।</p>
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'ওয়াকফ প্রশাসন', desc: 'ওয়াকফ এস্টেট সমূহের সঠিক তদারকি ও ব্যবস্থাপনা নিশ্চিত করা হয়।', icon: ShieldCheck, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { title: 'ডিজিটাল ডাটাবেজ', desc: 'সকল ওয়াকফ এস্টেটের তথ্য এখন অনলাইনে সহজলভ্য।', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'স্বচ্ছতা ও জবাবদিহিতা', desc: 'ওয়াকফ সম্পত্তির সঠিক ব্যবহার ও উন্নয়ন নিশ্চিত করা আমাদের লক্ষ্য।', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' }
        ].map((info, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center gap-4 shadow-sm">
            <div className={`p-4 rounded-2xl ${info.bg} ${info.color}`}>
              <info.icon size={32} />
            </div>
            <div>
              <h4 className="text-lg font-black text-gray-800 mb-2">{info.title}</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{info.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WaqfEstate;
