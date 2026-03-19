import React from 'react';
import { motion } from 'motion/react';
import { 
  PhoneCall, 
  MessageSquare, 
  FileText, 
  Truck, 
  Tent, 
  Users, 
  Map, 
  MapPin,
  Calendar, 
  Download, 
  ExternalLink,
  Info,
  ChevronRight,
  Megaphone,
  Globe,
  ShieldCheck
} from 'lucide-react';

export const AwarenessProgram: React.FC = () => {
  const initiatives = [
    {
      id: 'sms',
      title: 'মোবাইল মেসেজ অ্যালার্ট',
      desc: 'ভূমি সংক্রান্ত গুরুত্বপূর্ণ তথ্য ও আপডেট সরাসরি আপনার মোবাইলে।',
      icon: MessageSquare,
      color: 'bg-blue-500',
      action: 'নিবন্ধন করুন'
    },
    {
      id: 'leaflet',
      title: 'ডিজিটাল লিফলেট ও ম্যানুয়াল',
      desc: 'ভূমি আইন ও সেবা সংক্রান্ত সহজবোধ্য নির্দেশিকা ডাউনলোড করুন।',
      icon: FileText,
      color: 'bg-emerald-500',
      action: 'ডাউনলোড'
    },
    {
      id: 'mobile-van',
      title: 'ভ্রাম্যমাণ ভূমি সেবা',
      desc: 'আপনার দোরগোড়ায় আধুনিক প্রযুক্তিসম্পন্ন ভূমি সেবা যান।',
      icon: Truck,
      color: 'bg-amber-500',
      action: 'অবস্থান দেখুন'
    },
    {
      id: 'fair',
      title: 'ভূমি মেলা ও বৈঠক',
      desc: 'সরাসরি কর্মকর্তাদের সাথে কথা বলুন এবং সমস্যার সমাধান নিন।',
      icon: Tent,
      color: 'bg-purple-500',
      action: 'সূচি দেখুন'
    },
    {
      id: 'roadshow',
      title: 'রোড শো ও প্রচারণা',
      desc: 'দেশব্যাপী সচেতনতামূলক রোড শো এবং জনসভা।',
      icon: Megaphone,
      color: 'bg-rose-500',
      action: 'গ্যালারি'
    },
    {
      id: 'community',
      title: 'ভূমি বৈঠক',
      desc: 'স্থানীয় পর্যায়ে সচেতনতা বৃদ্ধির জন্য উঠান বৈঠক।',
      icon: Users,
      color: 'bg-indigo-500',
      action: 'অংশ নিন'
    }
  ];

  const upcomingEvents = [
    { date: '১০ মার্চ, ২০২৬', event: 'স্মার্ট ভূমি মেলা - ঢাকা বিভাগ', location: 'রমনা পার্ক, ঢাকা' },
    { date: '১৫ মার্চ, ২০২৬', event: 'ভ্রাম্যমাণ সেবা - চট্টগ্রাম', location: 'পতেঙ্গা এলাকা' },
    { date: '২২ মার্চ, ২০২৬', event: 'ভূমি বৈঠক ও সচেতনতা সভা', location: 'রাজশাহী জেলা পরিষদ' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      {/* Hero Section - International Standard Hotline */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <Globe size={400} className="translate-x-1/2 -translate-y-1/4" />
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/20 rounded-full border border-emerald-500/30 backdrop-blur-md"
              >
                <ShieldCheck size={16} className="text-emerald-400" />
                <span className="text-xs font-bold tracking-widest uppercase">স্মার্ট ভূমিসেবা সহায়তা</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl font-black leading-tight"
              >
                ভূমিসেবা এখন আপনার <br />
                <span className="text-emerald-400">এক ক্লিকেই হাতের মুঠোয়</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-emerald-100/80 max-w-xl font-medium"
              >
                জনগণকে সচেতন করতে এবং ভূমি সেবা সহজ করতে আমরা নিয়ে এসেছি আধুনিক প্রচারণা ও সহায়তা ব্যবস্থা।
              </motion.p>

              <div className="flex flex-wrap gap-4 pt-4">
                <button className="px-8 py-4 bg-white text-emerald-900 rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-50 transition-all flex items-center gap-3">
                  <Download size={20} />
                  সেবা ম্যানুয়াল ডাউনলোড
                </button>
                <button className="px-8 py-4 bg-emerald-600/30 border border-emerald-400/30 text-white rounded-2xl font-black text-lg backdrop-blur-md hover:bg-emerald-600/50 transition-all">
                  ভিডিও টিউটোরিয়াল
                </button>
              </div>
            </div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="w-full md:w-auto"
            >
              <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[40px] border border-white/20 shadow-2xl relative">
                <div className="absolute -top-6 -right-6 w-20 h-20 bg-rose-500 rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-rose-500/50">
                  <PhoneCall size={32} className="text-white" />
                </div>
                
                <div className="text-center space-y-4">
                  <p className="text-emerald-300 font-black tracking-[0.2em] uppercase text-xs">Land Service Hotline</p>
                  <h2 className="text-7xl font-black tracking-tighter text-white">১৬১২২</h2>
                  <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full"></div>
                  <p className="text-sm font-medium text-emerald-100/70">২৪/৭ সরাসরি কথা বলুন ভূমি বিশেষজ্ঞদের সাথে</p>
                  
                  <div className="pt-6 grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase">দেশ থেকে</p>
                      <p className="text-xl font-black">১৬১২২</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-[10px] font-bold text-emerald-400 uppercase">বিদেশ থেকে</p>
                      <p className="text-xl font-black">+৮৮০ ৯৬১২৩ ১৬১২২</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 -mt-10 relative z-20">
        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {initiatives.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * idx }}
              className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
            >
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                <item.icon size={30} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-3">{item.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6">
                {item.desc}
              </p>
              <button className="w-full py-4 bg-slate-50 text-slate-900 rounded-xl font-bold text-sm hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">
                {item.action}
                <ChevronRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Mobile Van Tracking & Events */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Mobile Van Section */}
          <div className="bg-slate-900 rounded-[40px] p-8 md:p-12 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                  <Truck size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black">ভ্রাম্যমাণ ভূমি সেবা যান</h2>
                  <p className="text-emerald-400/80 text-sm font-bold">সরাসরি আপনার এলাকায়</p>
                </div>
              </div>
              
              <div className="space-y-6 flex-1">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-emerald-400">বর্তমান অবস্থান</span>
                    <span className="px-3 py-1 bg-emerald-500 text-[10px] font-black rounded-full">সক্রিয়</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <MapPin className="text-rose-500" size={24} />
                    <div>
                      <p className="text-lg font-black">সাভার উপজেলা চত্বর</p>
                      <p className="text-xs text-slate-400">সকাল ১০:০০ - বিকাল ৪:০০</p>
                    </div>
                  </div>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed">
                  আমাদের ভ্রাম্যমাণ ভূমি সেবা যানে আপনি তাৎক্ষণিক খতিয়ান প্রিন্ট, মিউটেশন আবেদন এবং ভূমি উন্নয়ন কর পরিশোধ করতে পারবেন।
                </p>
              </div>

              <button className="mt-8 w-full py-5 bg-emerald-500 hover:bg-emerald-400 text-slate-900 rounded-2xl font-black text-lg transition-all shadow-lg shadow-emerald-500/20">
                লাইভ লোকেশন ট্র্যাক করুন
              </button>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-[40px] p-8 md:p-12 border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center">
                  <Calendar size={28} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900">আসন্ন ইভেন্টসমূহ</h2>
                  <p className="text-slate-400 text-sm font-bold">মেলা ও প্রচারণা সূচি</p>
                </div>
              </div>
              <button className="text-emerald-600 font-black text-sm flex items-center gap-1 hover:underline">
                সবগুলো দেখুন <ChevronRight size={16} />
              </button>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event, i) => (
                <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-transparent hover:border-emerald-200 hover:bg-emerald-50 transition-all group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <p className="text-xs font-black text-emerald-600 uppercase tracking-wider">{event.date}</p>
                      <h4 className="text-lg font-black text-slate-900 group-hover:text-emerald-900">{event.event}</h4>
                      <div className="flex items-center gap-2 text-slate-500 text-sm">
                        <MapPin size={14} />
                        {event.location}
                      </div>
                    </div>
                    <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 group-hover:text-emerald-600 shadow-sm border border-slate-100">
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-amber-50 rounded-3xl border border-amber-100 flex items-start gap-4">
              <Info className="text-amber-600 shrink-0" size={24} />
              <div>
                <h4 className="text-sm font-black text-amber-900 mb-1">আপনার এলাকায় ভূমি বৈঠক চান?</h4>
                <p className="text-xs text-amber-700 font-medium leading-relaxed">
                  আপনার ইউনিয়ন বা এলাকায় সচেতনতামূলক সভার জন্য আমাদের কাছে আবেদন করুন।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
