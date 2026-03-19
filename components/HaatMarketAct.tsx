
import React from 'react';
import { Book, Info, CheckCircle2, AlertCircle, ArrowRight, Download, Landmark, Gavel, Users, Building2, Scale } from 'lucide-react';

const HaatMarketAct: React.FC = () => {
  const provisions = [
    {
      title: 'হাট-বাজার স্থাপন ও বিলুপ্তি',
      desc: 'সরকারি গেজেট বিজ্ঞপ্তির মাধ্যমে যেকোনো স্থানে হাট-বাজার স্থাপন, বিলুপ্ত বা সীমানা পরিবর্তন করার ক্ষমতা সরকারের হাতে ন্যস্ত।',
      icon: Building2,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      title: 'ব্যবস্থাপনা ও নিয়ন্ত্রণ',
      desc: 'জেলা প্রশাসক বা তার মনোনীত কর্মকর্তা হাট-বাজারের সার্বিক ব্যবস্থাপনা ও নিয়ন্ত্রণ করবেন। স্থানীয় সরকার প্রতিষ্ঠানের ভূমিকাও এতে স্পষ্ট করা হয়েছে।',
      icon: Users,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      title: 'ই-ইজারা ও স্বচ্ছতা',
      desc: 'উন্মুক্ত ই-দরপত্রের মাধ্যমে সর্বোচ্চ দরদাতাকে নির্দিষ্ট মেয়াদের জন্য হাট-বাজার ইজারা প্রদান করা হবে। এতে সিন্ডিকেট প্রথা বন্ধ হবে।',
      icon: Scale,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      title: 'অবৈধ দখল উচ্ছেদ',
      desc: 'হাট-বাজারের জমি অবৈধভাবে দখল করলে বা স্থায়ী স্থাপনা নির্মাণ করলে বিনা নোটিশে তা উচ্ছেদ করার কঠোর বিধান রয়েছে।',
      icon: Gavel,
      color: 'bg-rose-50 text-rose-600'
    }
  ];

  const leasingSteps = [
    { title: 'দরপত্র বিজ্ঞপ্তি', desc: 'সংবাদপত্র ও ওয়েবসাইটে ইজারা বিজ্ঞপ্তি প্রকাশ।' },
    { title: 'ই-টেন্ডার দাখিল', desc: 'অনলাইনে দরপত্র ও প্রয়োজনীয় কাগজপত্র জমা।' },
    { title: 'দরপত্র মূল্যায়ন', desc: 'কমিটি কর্তৃক সর্বোচ্চ দরদাতা নির্বাচন।' },
    { title: 'ইজারা মূল্য জমা', desc: 'নির্ধারিত সময়ের মধ্যে ইজারা মূল্য সরকারি কোষাগারে জমা।' },
    { title: 'চুক্তি ও দখল হস্তান্তর', desc: 'চুক্তি সম্পাদন ও হাট-বাজারের দায়িত্ব বুঝিয়ে দেওয়া।' }
  ];

  const keyPoints = [
    'হাট-বাজারের জমি অন্য কোনো উদ্দেশ্যে ব্যবহার করা সম্পূর্ণ নিষিদ্ধ।',
    'ইজারাদারকে অবশ্যই নির্ধারিত টোল চার্ট দৃশ্যমান স্থানে প্রদর্শন করতে হবে।',
    'হাট-বাজারে পর্যাপ্ত স্যানিটেশন, ড্রেনেজ ও বিশুদ্ধ পানির ব্যবস্থা নিশ্চিতকরণ।',
    'মহিলাদের জন্য পৃথক বসার স্থান বা "মহিলা কর্ণার" নিশ্চিত করতে হবে।',
    'পরিবেশ রক্ষায় আধুনিক বর্জ্য ব্যবস্থাপনা ও প্লাস্টিক মুক্ত বাজার গড়ার উদ্যোগ।',
    'স্থায়ী অবকাঠামো নির্মাণের ক্ষেত্রে সরকারের পূর্বানুমতি বাধ্যতামূলক।'
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-64 rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1533900298318-6b8da08a523e?q=80&w=2000&auto=format&fit=crop" 
          alt="Haat Market" 
          className="w-full h-full object-cover brightness-[0.4]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-amber-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
            <Book size={16} className="text-amber-300" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">আইন ও বিধিমালা</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">হাট ও বাজার (স্থাপন ও ব্যবস্থাপনা) আইন, ২০২৩</h2>
          <p className="text-amber-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90">
            হাট-বাজার স্থাপন, ব্যবস্থাপনা এবং ইজারা সংক্রান্ত আধুনিক ও যুগোপযোগী বিধানসমূহ।
          </p>
        </div>
      </div>

      {/* Modern Provisions */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 px-2">
          <div className="w-2 h-8 bg-emerald-600 rounded-full" />
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">আধুনিক বিধানসমূহ</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {provisions.map((item, idx) => (
            <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
              <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-sm`}>
                <item.icon size={28} />
              </div>
              <h4 className="text-xl font-black text-gray-800 mb-3 leading-tight">{item.title}</h4>
              <p className="text-gray-500 text-sm font-medium leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Key Features */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">আইনের গুরুত্বপূর্ণ বৈশিষ্ট্য</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-amber-200 transition-all group">
                  <div className="w-8 h-8 bg-white text-amber-600 rounded-full flex items-center justify-center shadow-sm group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <CheckCircle2 size={16} />
                  </div>
                  <span className="text-gray-700 font-bold text-sm">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <Scale size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">ইজারা প্রক্রিয়া (Leasing Process)</h3>
            </div>
            <div className="relative space-y-6">
              {leasingSteps.map((step, idx) => (
                <div key={idx} className="flex gap-6 relative group">
                  {idx !== leasingSteps.length - 1 && (
                    <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-100 group-hover:bg-blue-200 transition-colors" />
                  )}
                  <div className="w-12 h-12 bg-gray-50 text-blue-600 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0 z-10">
                    {idx + 1}
                  </div>
                  <div className="pt-1">
                    <h4 className="text-lg font-black text-gray-800 mb-1">{step.title}</h4>
                    <p className="text-gray-500 text-sm font-medium">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="p-8 bg-emerald-900 rounded-[2.5rem] text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-xl font-black mb-4">ই-ইজারা ও ডিজিটাল ব্যবস্থাপনা</h4>
              <p className="text-emerald-100/80 text-sm font-medium leading-relaxed mb-6">
                ২০২৩ সালের আইন অনুযায়ী, ইজারা প্রক্রিয়ায় স্বচ্ছতা নিশ্চিত করতে ই-টেন্ডারিং পদ্ধতি বাধ্যতামূলক করা হয়েছে। ইজারাদার টোল চার্টের অতিরিক্ত টাকা আদায় করলে ইজারা বাতিলসহ কঠোর অর্থদণ্ডের বিধান রয়েছে।
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-white text-emerald-900 rounded-xl font-black text-sm hover:bg-emerald-50 transition-all flex items-center gap-2">
                  <Download size={18} /> পূর্ণাঙ্গ আইন ডাউনলোড
                </button>
                <button className="px-6 py-3 bg-emerald-800 text-white border border-emerald-700 rounded-xl font-black text-sm hover:bg-emerald-700 transition-all">
                  ই-ইজারা পোর্টাল
                </button>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl -mr-32 -mt-32" />
          </div>
        </div>

        {/* Penalties */}
        <div className="bg-rose-50 p-10 rounded-[3rem] border border-rose-100 flex flex-col">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-rose-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <AlertCircle size={24} />
            </div>
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">দণ্ড ও অপরাধ</h3>
          </div>
          <div className="space-y-6 flex-1">
            <div className="p-6 bg-white rounded-2xl border border-rose-100 shadow-sm">
              <h4 className="text-rose-900 font-black mb-2">অবৈধ দখল</h4>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">অনূর্ধ্ব ৫ লক্ষ টাকা অর্থদণ্ড বা ১ বছর পর্যন্ত কারাদণ্ড অথবা উভয় দণ্ড।</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-rose-100 shadow-sm">
              <h4 className="text-rose-900 font-black mb-2">অতিরিক্ত টোল আদায়</h4>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">আদায়কৃত অতিরিক্ত টাকার ১০ গুণ পর্যন্ত অর্থদণ্ড এবং ইজারা বাতিল।</p>
            </div>
            <div className="p-6 bg-white rounded-2xl border border-rose-100 shadow-sm">
              <h4 className="text-rose-900 font-black mb-2">শর্ত ভঙ্গ</h4>
              <p className="text-gray-600 text-sm font-medium leading-relaxed">ইজারা চুক্তির যেকোনো শর্ত ভঙ্গ করলে তাৎক্ষণিক ইজারা বাতিল ও জামানত বাজেয়াপ্ত।</p>
            </div>
          </div>
          <div className="mt-10 p-6 bg-white/50 rounded-2xl border border-rose-200">
            <p className="text-[10px] text-rose-800 font-black uppercase tracking-widest leading-relaxed">
              * হাট-বাজারের শৃঙ্খলা রক্ষায় ভ্রাম্যমাণ আদালত পরিচালনার ক্ষমতা জেলা ম্যাজিস্ট্রেটকে প্রদান করা হয়েছে।
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HaatMarketAct;
