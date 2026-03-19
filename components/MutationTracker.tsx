import React, { useState } from 'react';
import { CheckCircle2, Clock, MapPin, User, ChevronRight, Search, FileText, Calendar, AlertCircle, ArrowRight, Loader2 } from 'lucide-react';

const steps = [
  { id: 1, name: 'আবেদন দাখিল', status: 'completed', date: '১২ জানুয়ারি, ২০২৪', desc: 'অনলাইনে আবেদন সফলভাবে জমা দেওয়া হয়েছে।' },
  { id: 2, name: 'তহসিল রিপোর্ট', status: 'completed', date: '১৮ জানুয়ারি, ২০২৪', desc: 'ইউনিয়ন ভূমি অফিস থেকে সরজমিন প্রতিবেদন দাখিল।' },
  { id: 3, name: 'শুনানি ও যাচাই', status: 'current', date: '২০ মে, ২০২৪', desc: 'উপজেলা ভূমি অফিসে শুনানির জন্য অপেক্ষমান।' },
  { id: 4, name: 'খতিয়ান সৃজন', status: 'upcoming', date: '--', desc: 'চূড়ান্ত অনুমোদন ও নতুন খতিয়ান প্রিন্ট।' },
];

const MutationTracker: React.FC = () => {
  const [searchId, setSearchId] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [foundApplication, setFoundApplication] = useState<any>(null);
  const [error, setError] = useState('');

  const mockApplications: { [key: string]: any } = {
    'MUT-2024-8842': {
      id: 'MUT-2024-8842',
      applicant: 'মজিবুর রহমান মিন্টু',
      location: 'রামপুরা, ঢাকা',
      officer: 'জনাব ইকবাল হোসেন (এসিল্যান্ড)',
      status: 'শুনানি পর্যায়ে',
      updateTime: '২ ঘণ্টা আগে',
      steps: [
        { id: 1, name: 'আবেদন দাখিল', status: 'completed', date: '১২ জানুয়ারি, ২০২৪', desc: 'অনলাইনে আবেদন সফলভাবে জমা দেওয়া হয়েছে।' },
        { id: 2, name: 'তহসিল রিপোর্ট', status: 'completed', date: '১৮ জানুয়ারি, ২০২৪', desc: 'ইউনিয়ন ভূমি অফিস থেকে সরজমিন প্রতিবেদন দাখিল।' },
        { id: 3, name: 'শুনানি ও যাচাই', status: 'current', date: '২০ মে, ২০২৪', desc: 'উপজেলা ভূমি অফিসে শুনানির জন্য অপেক্ষমান।' },
        { id: 4, name: 'খতিয়ান সৃজন', status: 'upcoming', date: '--', desc: 'চূড়ান্ত অনুমোদন ও নতুন খতিয়ান প্রিন্ট।' },
      ]
    },
    'MUT-2024-1234': {
      id: 'MUT-2024-1234',
      applicant: 'মো: আব্দুল করিম',
      location: 'তেজগাঁও, ঢাকা',
      officer: 'মোসা: ফাতেমা বেগম (এসিল্যান্ড)',
      status: 'সম্পন্ন',
      updateTime: '১ দিন আগে',
      steps: [
        { id: 1, name: 'আবেদন দাখিল', status: 'completed', date: '০৫ জানুয়ারি, ২০২৪', desc: 'অনলাইনে আবেদন সফলভাবে জমা দেওয়া হয়েছে।' },
        { id: 2, name: 'তহসিল রিপোর্ট', status: 'completed', date: '১০ জানুয়ারি, ২০২৪', desc: 'ইউনিয়ন ভূমি অফিস থেকে সরজমিন প্রতিবেদন দাখিল।' },
        { id: 3, name: 'শুনানি ও যাচাই', status: 'completed', date: '১৫ জানুয়ারি, ২০২৪', desc: 'শুনানি সম্পন্ন এবং অনুমোদন প্রদান করা হয়েছে।' },
        { id: 4, name: 'খতিয়ান সৃজন', status: 'completed', date: '২০ জানুয়ারি, ২০২৪', desc: 'নতুন খতিয়ান সৃজন করা হয়েছে এবং ডিসিআর প্রদান করা হয়েছে।' },
      ]
    }
  };

  const handleSearch = () => {
    if (!searchId.trim()) return;
    setIsSearching(true);
    setError('');
    setFoundApplication(null);

    setTimeout(() => {
      const app = mockApplications[searchId.trim().toUpperCase()];
      if (app) {
        setFoundApplication(app);
      } else {
        setError('দুঃখিত, এই আবেদন আইডিটি পাওয়া যায়নি। অনুগ্রহ করে সঠিক আইডি প্রদান করুন।');
      }
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Search Header */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
            <Clock size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">নামজারি আবেদনের অবস্থা</h2>
          <p className="text-gray-500 max-w-lg font-medium">আপনার ই-মিউটেশন আবেদনের সর্বশেষ অগ্রগতি জানতে আবেদন আইডি ব্যবহার করুন।</p>
        </div>

        <div className="relative max-w-xl mx-auto">
          <input 
            type="text" 
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder="আবেদন আইডি লিখুন (যেমন: MUT-2024-8842)"
            className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm pr-32"
          />
          <button 
            onClick={handleSearch}
            disabled={isSearching}
            className="absolute right-2 top-2 bottom-2 px-8 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-2 disabled:opacity-50"
          >
            {isSearching ? <Loader2 size={20} className="animate-spin" /> : 'ট্র্যাক করুন'} <Search size={20} />
          </button>
        </div>

        {error && (
          <div className="mt-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-600 animate-in fade-in zoom-in">
            <AlertCircle size={20} />
            <p className="text-xs font-bold">{error}</p>
          </div>
        )}
      </div>

      {/* Application Details Card */}
      {foundApplication && (
        <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-8 duration-700">
          <div className="bg-emerald-900 p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10">
                <FileText size={32} className="text-emerald-300" />
              </div>
              <div>
                <h3 className="text-xl font-black tracking-tight">আবেদন আইডি: #{foundApplication.id}</h3>
                <p className="text-emerald-300/80 font-bold text-sm">আবেদনকারী: {foundApplication.applicant}</p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={`px-4 py-2 text-white text-xs font-black rounded-full uppercase tracking-widest shadow-lg mb-2 ${
                foundApplication.status === 'সম্পন্ন' ? 'bg-emerald-500 shadow-emerald-500/20' : 'bg-amber-500 shadow-amber-500/20'
              }`}>
                {foundApplication.status}
              </span>
              <p className="text-xs text-emerald-300/60 font-bold">সর্বশেষ আপডেট: {foundApplication.updateTime}</p>
            </div>
          </div>

          <div className="p-10">
            <div className="relative">
              <div className="absolute left-6 top-0 h-full w-1 bg-gray-100 rounded-full"></div>
              <div className="space-y-12 relative z-10">
                {foundApplication.steps.map((step: any, idx: number) => (
                  <div key={step.id} className="flex items-start gap-8 group">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-xl transition-all duration-500 ${
                      step.status === 'completed' ? 'bg-emerald-600 text-white scale-110' : 
                      step.status === 'current' ? 'bg-white border-4 border-emerald-600 text-emerald-600 animate-pulse scale-125' : 
                      'bg-gray-100 text-gray-400'
                    }`}>
                      {step.status === 'completed' ? <CheckCircle2 size={24} /> : <span className="text-lg font-black">{step.id}</span>}
                    </div>
                    <div className="flex-1 pt-1">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h4 className={`text-xl font-black ${step.status === 'upcoming' ? 'text-gray-300' : 'text-gray-800'}`}>{step.name}</h4>
                        <span className={`text-sm font-black flex items-center gap-2 ${step.status === 'upcoming' ? 'text-gray-300' : 'text-emerald-600'}`}>
                          <Calendar size={16} /> {step.date}
                        </span>
                      </div>
                      <p className={`text-sm font-medium leading-relaxed ${step.status === 'upcoming' ? 'text-gray-300' : 'text-gray-500'}`}>
                        {step.desc}
                      </p>
                      {step.status === 'current' && (
                        <div className="mt-6 p-6 bg-amber-50 border border-amber-100 rounded-3xl flex items-start gap-4">
                          <AlertCircle className="text-amber-600 shrink-0" size={24} />
                          <div>
                            <p className="text-amber-800 font-black text-sm mb-1">শুনানির নোটিশ</p>
                            <p className="text-amber-700/80 text-xs font-bold leading-relaxed">
                              আপনার শুনানি আগামী ২০ মে, ২০২৪ তারিখে উপজেলা ভূমি অফিসে অনুষ্ঠিত হবে। প্রয়োজনীয় মূল দলীল ও খতিয়ান সাথে রাখুন।
                            </p>
                            <button className="mt-4 text-amber-900 font-black text-xs flex items-center gap-2 hover:underline">
                              নোটিশ ডাউনলোড করুন <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-10 border-t border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 shadow-sm">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">মৌজা ও জেলা</p>
                <p className="text-sm font-black text-gray-700">{foundApplication.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gray-400 shadow-sm">
                <User size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">দায়িত্বপ্রাপ্ত কর্মকর্তা</p>
                <p className="text-sm font-black text-gray-700">{foundApplication.officer}</p>
              </div>
            </div>
            <button className="px-8 py-4 bg-white border-2 border-emerald-600 text-emerald-600 rounded-2xl font-black hover:bg-emerald-50 transition-all flex items-center justify-center gap-3">
              বিস্তারিত প্রতিবেদন <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MutationTracker;
