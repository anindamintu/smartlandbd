
import React from 'react';
import { Gavel, Users, ShieldAlert, Scale, Info, ArrowRight, CheckCircle2, Landmark, MessageSquare, FileText, AlertCircle, HelpCircle, Building2, ClipboardList, PlusCircle, Bot, Sparkles } from 'lucide-react';

interface LandDisputeModuleProps {
  onTabChange?: (tab: string) => void;
}

const LandDisputeModule: React.FC<LandDisputeModuleProps> = ({ onTabChange }) => {
  const disputeTypes = [
    { title: 'সীমানা বিরোধ', desc: 'জমির আইল বা সীমানা নিয়ে প্রতিবেশীর সাথে বিরোধ।', icon: ShieldAlert, color: 'text-amber-600', bg: 'bg-amber-50' },
    { title: 'মালিকানা দাবি', desc: 'ভুয়া দলীল বা রেকর্ডের মাধ্যমে মালিকানা দাবি সংক্রান্ত বিরোধ।', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'উত্তরাধিকার বণ্টন', desc: 'পৈত্রিক সম্পত্তির হিস্যা বা বণ্টন নিয়ে ওয়ারিশদের মধ্যে বিরোধ।', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'অবৈধ দখল', desc: 'জোরপূর্বক জমি দখল বা উচ্ছেদ সংক্রান্ত বিরোধ।', icon: Gavel, color: 'text-rose-600', bg: 'bg-rose-50' }
  ];

  const legalProcedures = [
    {
      step: '০১',
      title: 'দেওয়ানি মামলা (Civil Suit)',
      desc: 'মালিকানা সাব্যস্ত বা স্বত্ব ঘোষণার জন্য দেওয়ানি আদালতে মামলা করা যায়। এটি দীর্ঘমেয়াদী হলেও স্থায়ী সমাধান দেয়।',
      icon: Scale
    },
    {
      step: '০২',
      title: 'ফৌজদারি প্রতিকার (১৪৪/১৪৫ ধারা)',
      desc: 'শান্তি ভঙ্গের আশঙ্কা থাকলে নির্বাহী ম্যাজিস্ট্রেট আদালতে ১৪৪ বা ১৪৫ ধারায় মামলা করে তাৎক্ষণিক স্থিতাবস্থা বজায় রাখা যায়।',
      icon: Gavel
    },
    {
      step: '০৩',
      title: 'ল্যান্ড সার্ভে ট্রাইব্যুনাল',
      desc: 'জরিপ বা রেকর্ডের ভুল সংশোধনের জন্য নির্দিষ্ট সময়ের মধ্যে ল্যান্ড সার্ভে ট্রাইব্যুনালে মামলা করতে হয়।',
      icon: Landmark
    }
  ];

  const mediationServices = [
    {
      title: 'বিকল্প বিরোধ নিষ্পত্তি (ADR)',
      desc: 'আদালতের বাইরে মধ্যস্থতাকারীর মাধ্যমে আপোষ-মীমাংসা। এটি সময় ও অর্থ সাশ্রয় করে।',
      icon: MessageSquare,
      details: 'জেলা জজ আদালতে এডিআর (ADR) সেল রয়েছে যেখানে অভিজ্ঞ মধ্যস্থতাকারীদের মাধ্যমে বিরোধ নিষ্পত্তি করা হয়।'
    },
    {
      title: 'গ্রাম আদালত',
      desc: 'ছোটখাটো বিরোধের ক্ষেত্রে ইউনিয়ন পরিষদের গ্রাম আদালতে স্বল্প খরচে বিচার পাওয়া সম্ভব।',
      icon: Landmark,
      details: 'ইউনিয়ন পরিষদ চেয়ারম্যানের নেতৃত্বে ৫ সদস্যের প্যানেল এই আদালত পরিচালনা করেন।'
    },
    {
      title: 'সরকারি লিগ্যাল এইড',
      desc: 'অসহায় ও দরিদ্র বিচারপ্রার্থীদের জন্য সরকার বিনামূল্যে আইনি সহায়তা ও পরামর্শ প্রদান করে।',
      icon: ShieldAlert,
      details: 'জাতীয় আইনগত সহায়তা প্রদান সংস্থা (NLASO) জেলা পর্যায়ে এই সেবা প্রদান করে।'
    }
  ];

  const expertContacts = [
    { name: 'জাতীয় আইনগত সহায়তা (হটলাইন)', contact: '১৬৪৩০', type: 'সরকারি সেবা', icon: ShieldAlert },
    { name: 'বাংলাদেশ বার কাউন্সিল', contact: '০২-৯৫৬৯৮০৭', type: 'আইনি সংস্থা', icon: Scale },
    { name: 'ভূমি সেবা হটলাইন', contact: '১৬১২২', type: 'সরকারি তথ্য', icon: HelpCircle }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-64 rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2000&auto=format&fit=crop" 
          alt="Justice" 
          className="w-full h-full object-cover brightness-[0.3]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-rose-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
            <Scale size={16} className="text-rose-300" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">বিরোধ নিষ্পত্তি গাইড</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">ভূমি বিরোধ নিষ্পত্তি ও আইনি প্রতিকার</h2>
          <p className="text-rose-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90 mb-8">
            জমির মালিকানা, সীমানা বা উত্তরাধিকার সংক্রান্ত বিরোধ নিষ্পত্তির সঠিক পদ্ধতি ও আইনি পরামর্শ।
          </p>
          <button 
            onClick={() => onTabChange?.('dispute-complaint')}
            className="px-10 py-4 bg-rose-600 text-white rounded-2xl font-black shadow-xl hover:bg-rose-700 transition-all flex items-center gap-3 group"
          >
            বিরোধ অভিযোগ দাখিল করুন <PlusCircle size={24} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>
      </div>

      <div className="bg-gradient-to-br from-rose-600 to-rose-800 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group mb-12">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner group-hover:scale-110 transition-transform">
              <Bot size={32} />
            </div>
            <div className="space-y-1">
              <h4 className="text-2xl font-black tracking-tight">এআই বিরোধ নিষ্পত্তি সহকারী</h4>
              <p className="text-rose-50 text-sm font-medium opacity-90">বিরোধ নিষ্পত্তি ও আইনি প্রতিকার নিয়ে তাৎক্ষণিক পরামর্শ নিন।</p>
            </div>
          </div>
          <button 
            className="px-8 py-4 bg-white text-rose-700 rounded-2xl font-black shadow-xl hover:bg-rose-50 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            এআই পরামর্শ নিন <Sparkles size={18} />
          </button>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />
      </div>

      {/* Dispute Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {disputeTypes.map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
              <item.icon size={28} />
            </div>
            <h4 className="text-xl font-black text-gray-800 mb-3 leading-tight">{item.title}</h4>
            <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Legal Procedures */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-8 bg-rose-600 rounded-full" />
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">আইনি প্রতিকারের ধাপসমূহ</h3>
          </div>
          <div className="space-y-4">
            {legalProcedures.map((item, idx) => (
              <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-start gap-6 group hover:border-rose-200 transition-all">
                <div className="text-4xl font-black text-rose-100 group-hover:text-rose-200 transition-colors shrink-0">
                  {item.step}
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-gray-800 flex items-center gap-2">
                    <item.icon size={20} className="text-rose-600" /> {item.title}
                  </h4>
                  <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mediation Section */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 px-2">
            <div className="w-2 h-8 bg-emerald-600 rounded-full" />
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">সালিশি ও মধ্যস্থতা</h3>
          </div>
          <div className="bg-emerald-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              {mediationServices.map((service, idx) => (
                <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group cursor-pointer">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-emerald-500/20 text-emerald-300 rounded-xl flex items-center justify-center">
                      <service.icon size={20} />
                    </div>
                    <h4 className="text-emerald-300 font-black group-hover:text-white transition-colors">{service.title}</h4>
                  </div>
                  <p className="text-emerald-100/60 text-xs font-medium leading-relaxed mb-2">{service.desc}</p>
                  <p className="text-[10px] text-emerald-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">{service.details}</p>
                </div>
              ))}
              
              <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                <h4 className="text-sm font-black text-emerald-300 uppercase tracking-widest">জরুরি যোগাযোগ</h4>
                {expertContacts.map((contact, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:bg-white/10 transition-all">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-emerald-500/20 text-emerald-300 rounded-lg flex items-center justify-center">
                        <contact.icon size={16} />
                      </div>
                      <div>
                        <p className="text-xs font-black">{contact.name}</p>
                        <p className="text-[10px] text-emerald-100/40">{contact.type}</p>
                      </div>
                    </div>
                    <span className="text-sm font-black text-emerald-300">{contact.contact}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* Action Plan Section */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
            <ClipboardList size={24} />
          </div>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">বিরোধ নিষ্পত্তির কর্মপরিকল্পনা (Action Plan)</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {[
            { step: '১', title: 'নথিপত্র যাচাই', desc: 'দলীলের সার্টিফাইড কপি, খতিয়ান ও ম্যাপ সংগ্রহ করুন।' },
            { step: '২', title: 'স্থানীয় সালিশ', desc: 'আমিন বা স্থানীয় গণ্যমান্য ব্যক্তিদের মাধ্যমে সমাধানের চেষ্টা।' },
            { step: '৩', title: 'আইনি নোটিশ', desc: 'সমাধান না হলে আইনজীবীর মাধ্যমে লিগ্যাল নোটিশ পাঠান।' },
            { step: '৪', title: 'মামলা দায়ের', desc: 'প্রয়োজন অনুযায়ী দেওয়ানি বা ফৌজদারি আদালতে মামলা।' }
          ].map((plan, idx) => (
            <div key={idx} className="relative group">
              <div className="p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-blue-200 transition-all h-full">
                <div className="w-10 h-10 bg-white text-blue-600 rounded-xl flex items-center justify-center font-black text-lg shadow-sm mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {plan.step}
                </div>
                <h4 className="font-black text-gray-800 mb-2">{plan.title}</h4>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{plan.desc}</p>
              </div>
              {idx !== 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10">
                  <ArrowRight size={20} className="text-gray-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Authorities Section */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex items-center gap-3 mb-10 justify-center">
          <Landmark size={32} className="text-blue-600" />
          <h3 className="text-3xl font-black text-gray-800 tracking-tight">সংশ্লিষ্ট কর্তৃপক্ষ</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'উপজেলা ভূমি অফিস', role: 'নামজারি সংশোধন, রেকর্ড সংশোধন ও মিসকেস শুনানি।', icon: Building2 },
            { title: 'জেলা প্রশাসকের কার্যালয়', role: 'অধিগ্রহণ বিরোধ ও উচ্চতর প্রশাসনিক আপিল শুনানি।', icon: Landmark },
            { title: 'দেওয়ানি আদালত', role: 'মালিকানা সাব্যস্ত, বণ্টন ও স্থায়ী নিষেধাজ্ঞার চূড়ান্ত বিচার।', icon: Scale }
          ].map((auth, idx) => (
            <div key={idx} className="flex flex-col items-center text-center space-y-4 p-6 bg-gray-50 rounded-[2rem] border border-transparent hover:border-blue-200 transition-all">
              <div className="w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                <auth.icon size={32} />
              </div>
              <h4 className="text-lg font-black text-gray-800">{auth.title}</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{auth.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-gray-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h3 className="text-2xl font-black mb-10 text-center flex items-center justify-center gap-3">
            <HelpCircle size={28} className="text-rose-400" /> সাধারণ জিজ্ঞাসা (FAQ)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { q: 'জমির সীমানা নিয়ে বিরোধ হলে প্রথম করণীয় কী?', a: 'প্রথমে স্থানীয়ভাবে আমিন দ্বারা জমি মেপে সীমানা নির্ধারণের চেষ্টা করুন। সমাধান না হলে এসি ল্যান্ড অফিসে আবেদন বা গ্রাম আদালতে যেতে পারেন।' },
              { q: 'ভুয়া দলীল দিয়ে কেউ জমি দখল করলে কী করব?', a: 'দেওয়ানি আদালতে দলীলের বাতিলের মামলা (Cancellation of Deed) এবং স্বত্ব সাব্যস্তের মামলা করতে হবে।' },
              { q: 'উত্তরাধিকার সূত্রে পাওয়া জমি বণ্টন না করলে উপায় কী?', a: 'বণ্টন মামলা বা বাটোয়ারা মামলা (Partition Suit) দায়ের করতে হবে।' },
              { q: 'আদালতের বাইরে বিরোধ নিষ্পত্তির সুবিধা কী?', a: 'এটি দ্রুত হয়, খরচ কম এবং উভয় পক্ষের মধ্যে সুসম্পর্ক বজায় থাকে।' }
            ].map((faq, idx) => (
              <div key={idx} className="p-8 bg-white/5 rounded-[2rem] border border-white/10 space-y-3">
                <h4 className="text-rose-300 font-black flex items-center gap-2">
                  <CheckCircle2 size={18} /> {faq.q}
                </h4>
                <p className="text-gray-400 text-sm font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 left-0 w-64 h-64 bg-rose-600/10 rounded-full blur-[100px] -ml-32 -mt-32" />
      </div>
    </div>
  );
};

export default LandDisputeModule;
