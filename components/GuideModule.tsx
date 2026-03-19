
import React from 'react';
import { HelpCircle, Play, BookOpen, FileText, CheckCircle2, ArrowRight, Info, Sparkles, Smartphone, Globe, ShieldCheck } from 'lucide-react';

const GuideModule: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
            <HelpCircle size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">ভূমি সেবা প্রশিক্ষণ ও গাইড</h2>
          <p className="text-gray-500 max-w-lg font-medium">ডিজিটাল ভূমি সেবাগুলো কীভাবে ব্যবহার করবেন তার বিস্তারিত নির্দেশিকা ও ভিডিও টিউটোরিয়াল।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Video Guide */}
          <div className="bg-gray-900 rounded-[2.5rem] overflow-hidden relative group cursor-pointer shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" 
              alt="Video Tutorial" 
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform mb-6">
                <Play size={40} fill="currentColor" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2">ভিডিও টিউটোরিয়াল</h3>
              <p className="text-emerald-100/80 font-medium">অনলাইনে নামজারি আবেদনের সম্পূর্ণ প্রক্রিয়া (১০ মিনিট)</p>
            </div>
          </div>

          {/* Quick Guides */}
          <div className="space-y-4">
            {[
              { title: 'খতিয়ান অনুসন্ধান গাইড', icon: BookOpen, time: '৫ মিনিট পাঠ' },
              { title: 'ভূমি কর পরিশোধের নিয়ম', icon: FileText, time: '৩ মিনিট পাঠ' },
              { title: 'উত্তরাধিকার হিসাব পদ্ধতি', icon: Sparkles, time: '৪ মিনিট পাঠ' },
              { title: 'মোবাইল অ্যাপ ব্যবহার', icon: Smartphone, time: '৬ মিনিট পাঠ' }
            ].map((guide, i) => (
              <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <guide.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-800">{guide.title}</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{guide.time}</p>
                  </div>
                </div>
                <ArrowRight size={20} className="text-gray-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step by Step Section */}
      <div className="bg-emerald-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10">
          <h3 className="text-3xl font-black mb-12 text-center tracking-tight">কীভাবে শুরু করবেন? (৩টি সহজ ধাপ)</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { step: '০১', title: 'রেজিস্ট্রেশন', desc: 'আপনার জাতীয় পরিচয়পত্র ও মোবাইল নম্বর দিয়ে একাউন্ট তৈরি করুন।', icon: Globe },
              { step: '০২', title: 'সেবা নির্বাচন', desc: 'ড্যাশবোর্ড থেকে আপনার প্রয়োজনীয় ভূমি সেবাটি নির্বাচন করুন।', icon: ShieldCheck },
              { step: '০৩', title: 'আবেদন ও ট্র্যাকিং', desc: 'প্রয়োজনীয় তথ্য দিয়ে আবেদন করুন এবং আবেদনের অবস্থা ট্র্যাক করুন।', icon: CheckCircle2 }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-white/10 rounded-[2rem] flex items-center justify-center text-emerald-300 border border-white/10 relative">
                  <item.icon size={32} />
                  <span className="absolute -top-3 -right-3 w-10 h-10 bg-emerald-500 text-emerald-900 rounded-full flex items-center justify-center font-black text-sm border-4 border-emerald-900 shadow-lg">
                    {item.step}
                  </span>
                </div>
                <div>
                  <h4 className="text-xl font-black mb-3">{item.title}</h4>
                  <p className="text-emerald-100/70 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px] -ml-32 -mt-32" />
      </div>

      {/* Help Banner */}
      <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
            <Info size={32} />
          </div>
          <div>
            <h4 className="text-xl font-black text-gray-800">আরো বিস্তারিত জানতে চান?</h4>
            <p className="text-sm text-gray-500 font-medium">আমাদের বিস্তারিত ইউজার ম্যানুয়ালটি ডাউনলোড করে পড়তে পারেন।</p>
          </div>
        </div>
        <button className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-3">
          ম্যানুয়াল ডাউনলোড করুন <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default GuideModule;
