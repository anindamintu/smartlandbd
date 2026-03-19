
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  History, 
  Search, 
  Calendar, 
  FileText, 
  Map, 
  Info, 
  ChevronRight, 
  ArrowLeft,
  Clock,
  ShieldCheck,
  BookOpen,
  Layers,
  ExternalLink,
  Download
} from 'lucide-react';

const surveyHistoryData = [
  {
    id: 'cs',
    title: 'সিএস জরিপ (Cadastral Survey)',
    period: '১৮৮৮ - ১৯৪০',
    desc: 'এটিই প্রথম বৈজ্ঞানিক পদ্ধতিতে পরিচালিত জরিপ। ভারত শাসন আমলে ব্রিটিশ সরকার কর্তৃক পরিচালিত হয়।',
    significance: 'মালিকানা প্রমাণের আদি দলিল হিসেবে গণ্য হয়।',
    color: 'bg-blue-600',
    details: [
      '১৮৮৫ সালের বঙ্গীয় প্রজাস্বত্ব আইনের ভিত্তিতে পরিচালিত।',
      'কক্সবাজারের রামু থেকে শুরু হয়ে সারা দেশে পরিচালিত হয়।',
      'মৌজা ম্যাপ ও খতিয়ান উভয়ই প্রস্তুত করা হয়।'
    ]
  },
  {
    id: 'sa',
    title: 'এসএ জরিপ (State Acquisition Survey)',
    period: '১৯৫৬ - ১৯৬৩',
    desc: 'জমিদারি প্রথা বিলুপ্তির পর জরুরি ভিত্তিতে পরিচালিত জরিপ।',
    significance: 'জমিদারি প্রথা বিলুপ্তির পর মালিকানা নির্ধারণের মূল ভিত্তি।',
    color: 'bg-emerald-600',
    details: [
      '১৯৫০ সালের জমিদারি দখল ও প্রজাস্বত্ব আইনের ভিত্তিতে পরিচালিত।',
      'এটি কোনো মাঠ জরিপ ছিল না, বরং সিএস জরিপের ভিত্তিতে প্রস্তুত।',
      'অনেক ক্ষেত্রে ভুলভ্রান্তি থাকার সম্ভাবনা থাকে।'
    ]
  },
  {
    id: 'rs',
    title: 'আরএস জরিপ (Revisional Survey)',
    period: '১৯৬৫ - চলমান',
    desc: 'সিএস ও এসএ জরিপের ভুল সংশোধন এবং আধুনিকায়নের জন্য পরিচালিত।',
    significance: 'বর্তমানে মালিকানা প্রমাণের সবচেয়ে শক্তিশালী দলিল।',
    color: 'bg-amber-600',
    details: [
      'মাঠ পর্যায়ে গিয়ে সরেজমিনে তদন্ত করে প্রস্তুত করা হয়।',
      'সিএস জরিপের ম্যাপের উপর ভিত্তি করে নতুন ম্যাপ তৈরি করা হয়।',
      'অধিকাংশ এলাকায় এটিই সর্বশেষ চূড়ান্ত জরিপ।'
    ]
  },
  {
    id: 'bs',
    title: 'বিএস/বিআরএস জরিপ (Bangladesh Survey)',
    period: '১৯৯০ - চলমান',
    desc: 'বাংলাদেশ স্বাধীন হওয়ার পর আধুনিক পদ্ধতিতে পরিচালিত জরিপ।',
    significance: 'সর্বাধুনিক রেকর্ড যা বর্তমানে অনেক এলাকায় চূড়ান্ত হয়েছে।',
    color: 'bg-rose-600',
    details: [
      'ঢাকা সিটি জরিপ (City Survey) এর অন্তর্ভুক্ত।',
      'আধুনিক থিওডোলাইট ও ইডিএম মেশিন ব্যবহার করা হয়েছে।',
      'মৌজা ম্যাপগুলো অনেক বেশি নির্ভুল।'
    ]
  },
  {
    id: 'diara',
    title: 'দিয়ারা জরিপ (Diara Survey)',
    period: 'সময় সময়',
    desc: 'নদী সিকস্তি ও পয়স্তি এলাকার জন্য পরিচালিত বিশেষ জরিপ।',
    significance: 'নদীর চরাঞ্চল বা জেগে ওঠা জমির মালিকানা নির্ধারণ।',
    color: 'bg-indigo-600',
    details: [
      'নদীর গতিপথ পরিবর্তনের ফলে জেগে ওঠা জমির জন্য।',
      'এটি নিয়মিত কোনো জরিপ নয়, প্রয়োজন অনুযায়ী হয়।',
      'চরাঞ্চলের মানুষের জন্য অত্যন্ত গুরুত্বপূর্ণ।'
    ]
  }
];

const LandSurveyHistory: React.FC = () => {
  const [selectedSurvey, setSelectedSurvey] = useState<typeof surveyHistoryData[0] | null>(null);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [selectedSurvey]);

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header Section */}
      <div className="relative h-80 rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?q=80&w=2070&auto=format&fit=crop" 
          alt="Ancient Maps" 
          className="w-full h-full object-cover brightness-[0.3]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-amber-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
            <History size={16} className="text-amber-300" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">ভূমি জরিপের ইতিহাস</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">বাংলার ভূমি জরিপ পরিক্রমা</h2>
          <p className="text-amber-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90">
            সিএস থেকে বিএস - বাংলাদেশের ভূমি জরিপের বিবর্তন এবং এর আইনি গুরুত্ব সম্পর্কে বিস্তারিত জানুন।
          </p>
        </div>
      </div>

      {!selectedSurvey ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {surveyHistoryData.map((survey, idx) => (
            <motion.div
              key={survey.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedSurvey(survey)}
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all group cursor-pointer relative overflow-hidden"
            >
              <div className={`w-16 h-16 ${survey.color} text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <FileText size={32} />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-amber-600 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest">
                    {survey.period}
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-800 group-hover:text-blue-600 transition-colors">{survey.title}</h3>
                <p className="text-gray-500 text-sm font-medium leading-relaxed line-clamp-2">
                  {survey.desc}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">
                বিস্তারিত দেখুন <ChevronRight size={16} />
              </div>
              {/* Decorative background element */}
              <div className={`absolute -bottom-6 -right-6 w-24 h-24 ${survey.color} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden"
        >
          <div className={`${selectedSurvey.color} p-12 text-white relative overflow-hidden`}>
            <button 
              onClick={() => setSelectedSurvey(null)}
              className="absolute top-8 left-8 flex items-center gap-2 bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl backdrop-blur-md border border-white/10 transition-all font-black text-xs uppercase tracking-widest"
            >
              <ArrowLeft size={16} /> ফিরে যান
            </button>
            
            <div className="relative z-10 mt-8 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/20">
                  <BookOpen size={32} />
                </div>
                <div>
                  <h3 className="text-4xl font-black tracking-tight border-b-2 border-dashed border-red-500 inline-block">{selectedSurvey.title}</h3>
                  <p className="text-white/80 font-bold flex items-center gap-2 mt-2">
                    <Calendar size={16} /> সময়কাল: {selectedSurvey.period}
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-[100px]" />
          </div>

          <div className="p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <section className="space-y-4">
                <h4 className="text-xl font-black text-gray-800 flex items-center gap-3">
                  <Info className="text-blue-600" size={24} /> জরিপের বিবরণ
                </h4>
                <p className="text-gray-600 font-medium leading-relaxed text-lg">
                  {selectedSurvey.desc}
                </p>
              </section>

              <section className="space-y-4">
                <h4 className="text-xl font-black text-gray-800 flex items-center gap-3">
                  <ShieldCheck className="text-emerald-600" size={24} /> আইনি গুরুত্ব
                </h4>
                <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
                  <p className="text-emerald-900 font-bold leading-relaxed">
                    {selectedSurvey.significance}
                  </p>
                </div>
              </section>
            </div>

            <div className="space-y-8">
              <section className="space-y-4">
                <h4 className="text-xl font-black text-gray-800 flex items-center gap-3">
                  <Layers className="text-amber-600" size={24} /> মূল বৈশিষ্ট্যসমূহ
                </h4>
                <ul className="space-y-4">
                  {selectedSurvey.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-blue-200 transition-all">
                      <div className="w-6 h-6 bg-white text-blue-600 rounded-full flex items-center justify-center shrink-0 shadow-sm font-black text-xs">
                        {i + 1}
                      </div>
                      <span className="text-gray-700 font-medium">{detail}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <div className="pt-8 flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-xl flex items-center gap-3">
                  <Download size={20} /> নমুনা খতিয়ান ডাউনলোড
                </button>
                <button className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-2xl font-black hover:bg-gray-50 transition-all flex items-center gap-3">
                  <Map size={20} /> নমুনা ম্যাপ দেখুন
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Comparison Table Section */}
      <div className="bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-blue-600 rounded-full" />
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">একনজরে জরিপসমূহ</h3>
          </div>
          <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
            তুলনামূলক চিত্র
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-100">
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase tracking-widest">জরিপের নাম</th>
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase tracking-widest">সময়কাল</th>
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase tracking-widest">ভিত্তি</th>
                <th className="py-6 px-4 text-sm font-black text-gray-400 uppercase tracking-widest">বর্তমান অবস্থা</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {[
                { name: 'সিএস', time: '১৮৮৮-১৯৪০', base: 'বঙ্গীয় প্রজাস্বত্ব আইন', status: 'আদি রেকর্ড' },
                { name: 'এসএ', time: '১৯৫৬-১৯৬৩', base: 'জমিদারি বিলুপ্তি', status: 'সংশোধিত' },
                { name: 'আরএস', time: '১৯৬৫-চলমান', base: 'সরেজমিন তদন্ত', status: 'সর্বাধিক প্রচলিত' },
                { name: 'বিএস/বিআরএস', time: '১৯৯০-চলমান', base: 'আধুনিক প্রযুক্তি', status: 'সর্বাধুনিক' }
              ].map((row, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="py-6 px-4 font-black text-gray-800">{row.name}</td>
                  <td className="py-6 px-4 font-bold text-gray-500">{row.time}</td>
                  <td className="py-6 px-4 font-medium text-gray-600">{row.base}</td>
                  <td className="py-6 px-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-black">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* FAQ / Guidance Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-black tracking-tight">কোন জরিপটি সঠিক?</h3>
            <p className="text-emerald-100/80 font-medium leading-relaxed">
              সাধারণত সর্বশেষ চূড়ান্ত হওয়া জরিপটিই (যেমন: আরএস বা বিএস) মালিকানা প্রমাণের জন্য সবচেয়ে গুরুত্বপূর্ণ। তবে কোনো বিরোধ দেখা দিলে সিএস জরিপকে আদি ভিত্তি হিসেবে ধরা হয়।
            </p>
            <button className="flex items-center gap-2 text-emerald-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors">
              আইনি পরামর্শ নিন <ChevronRight size={16} />
            </button>
          </div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl" />
        </div>

        <div className="bg-blue-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-6">
            <h3 className="text-2xl font-black tracking-tight">জরিপে ভুল থাকলে কী করবেন?</h3>
            <p className="text-blue-100/80 font-medium leading-relaxed">
              জরিপ চলাকালীন সময়ে আপত্তি (Objection) বা আপিল করা যায়। জরিপ চূড়ান্ত হয়ে গেজেট হয়ে গেলে ল্যান্ড সার্ভে ট্রাইব্যুনালে মামলা করে সংশোধন করতে হয়।
            </p>
            <button className="flex items-center gap-2 text-blue-400 font-black text-xs uppercase tracking-widest hover:text-white transition-colors">
              সংশোধন প্রক্রিয়া দেখুন <ChevronRight size={16} />
            </button>
          </div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl" />
        </div>
      </div>
    </div>
  );
};

export default LandSurveyHistory;
