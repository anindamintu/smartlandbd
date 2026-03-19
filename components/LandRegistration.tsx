
import React, { useState } from 'react';
import { FileText, ClipboardList, Gavel, Info, CheckCircle2, AlertCircle, ArrowRight, Download, BookOpen, Landmark, UserCheck, Scale, MousePointer2, Clock, ShieldCheck, MapPin, Upload, ShieldAlert, Loader2, ChevronDown, Calendar, Globe, History, Building2, ScrollText } from 'lucide-react';

const LandRegistration: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'process' | 'documents' | 'fees' | 'forms'>('process');

  const registrationTypes = [
    { title: 'সাফ-কবলা (Sale Deed)', desc: 'জমির স্থায়ী মালিকানা হস্তান্তরের প্রধান দলিল।' },
    { title: 'হেবা (Gift Deed)', desc: 'রক্তের সম্পর্কের আত্মীয়দের মধ্যে বিনামূল্যে জমি হস্তান্তর।' },
    { title: 'বন্টননামা (Partition Deed)', desc: 'উত্তরাধিকার সূত্রে প্রাপ্ত জমি অংশীদারদের মধ্যে ভাগ করা।' },
    { title: 'দানপত্র (Donation Deed)', desc: 'কোনো ব্যক্তি বা প্রতিষ্ঠানকে নিঃস্বার্থভাবে জমি দান করা।' }
  ];

  const steps = [
    { step: '১', title: 'দলিল লিখন', desc: 'নির্ধারিত স্ট্যাম্পে দলীল মুসাবিদা বা লিখন সম্পন্ন করা।' },
    { step: '২', title: 'ই-ফি ও কর পরিশোধ', desc: 'রেজিস্ট্রেশন ফি, স্ট্যাম্প ডিউটি ও অন্যান্য কর ব্যাংকে জমা দেওয়া।' },
    { step: '৩', title: 'সাব-রেজিস্ট্রি অফিসে উপস্থাপন', desc: 'দাতা ও গ্রহীতা উভয়কে সশরীরে সাব-রেজিস্ট্রি অফিসে উপস্থিত হতে হয়।' },
    { step: '৪', title: 'শনাক্তকরণ ও টিপসই', desc: 'সাক্ষীর উপস্থিতিতে দাতা ও গ্রহীতার পরিচয় নিশ্চিতকরণ ও দলিলে স্বাক্ষর।' },
    { step: '৫', title: 'রেজিস্ট্রেশন সম্পন্ন', desc: 'সাব-রেজিস্ট্রার কর্তৃক দলীল পরীক্ষা ও চূড়ান্ত অনুমোদন।' }
  ];

  const documents = [
    'মূল দলীল ও বায়া দলীল (পিট দলীল)',
    'হালনাগাদ খতিয়ান (পর্চা)',
    'ভূমি উন্নয়ন কর (খাজনা) পরিশোধের দাখিলা',
    'দাতা ও গ্রহীতার জাতীয় পরিচয়পত্র (NID)',
    'পাসপোর্ট সাইজ ছবি (উভয় পক্ষের)',
    'ওয়ারিশ সনদ (প্রযোজ্য ক্ষেত্রে)',
    'অনাপত্তি সনদ (NOC) - যদি প্রয়োজন হয়'
  ];

  const fees = [
    { label: 'রেজিস্ট্রেশন ফি', amount: '১%' },
    { label: 'স্ট্যাম্প ডিউটি', amount: '১.৫%' },
    { label: 'স্থানীয় সরকার কর', amount: '৩%' },
    { label: 'উৎস কর (পৌরসভা/সিটি কর্পোরেশন)', amount: '২% - ৫%' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-72 rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2000&auto=format&fit=crop" 
          alt="Land Registration" 
          className="w-full h-full object-cover brightness-[0.3]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-emerald-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
            <ScrollText size={16} className="text-emerald-300" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">ভূমি রেজিস্ট্রেশন গাইড</span>
          </div>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">জমি রেজিস্ট্রেশন প্রক্রিয়া ও নিয়মাবলী</h2>
          <p className="text-emerald-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90">
            জমির মালিকানা আইনগতভাবে সুসংহত করতে সঠিক পদ্ধতিতে রেজিস্ট্রেশন সম্পন্ন করার বিস্তারিত নির্দেশিকা।
          </p>
        </div>
      </div>

      {/* Registration Types */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {registrationTypes.map((type, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="w-12 h-12 bg-gray-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
              <FileText size={24} />
            </div>
            <h4 className="text-lg font-black text-gray-800 mb-2">{type.title}</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">{type.desc}</p>
          </div>
        ))}
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-wrap border-b border-gray-100 bg-gray-50/50">
          {[
            { id: 'process', label: 'রেজিস্ট্রেশন ধাপ', icon: MousePointer2 },
            { id: 'documents', label: 'প্রয়োজনীয় কাগজ', icon: ClipboardList },
            { id: 'fees', label: 'খরচ ও ফি', icon: Scale },
            { id: 'forms', label: 'ফরম ডাউনলোড', icon: Download }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-6 font-black text-sm transition-all relative ${
                activeTab === tab.id ? 'text-emerald-600 bg-white' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-full" />
              )}
            </button>
          ))}
        </div>

        <div className="p-10">
          {activeTab === 'process' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 gap-6">
                {steps.map((item, idx) => (
                  <div key={idx} className="flex gap-8 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                    <div className="w-16 h-16 bg-white text-emerald-600 rounded-[1.5rem] flex items-center justify-center font-black text-2xl shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-gray-800 mb-2">{item.title}</h4>
                      <p className="text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-500">
              {documents.map((doc, idx) => (
                <div key={idx} className="flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-emerald-200 transition-all group">
                  <div className="w-10 h-10 bg-white text-emerald-600 rounded-full flex items-center justify-center shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-gray-700 font-black text-sm">{doc}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fees.map((fee, idx) => (
                  <div key={idx} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex justify-between items-center">
                    <span className="text-lg font-black text-gray-700">{fee.label}</span>
                    <span className="text-2xl font-black text-emerald-600">{fee.amount}</span>
                  </div>
                ))}
              </div>
              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-4">
                <AlertCircle className="text-amber-600 shrink-0" size={24} />
                <p className="text-sm font-bold text-amber-800 leading-relaxed">
                  দ্রষ্টব্য: এলাকাভেদে (সিটি কর্পোরেশন বনাম ইউনিয়ন) উৎস করের হার ভিন্ন হতে পারে। দলীল রেজিস্ট্রেশনের পূর্বে সংশ্লিষ্ট সাব-রেজিস্ট্রি অফিস থেকে সঠিক হার জেনে নিন।
                </p>
              </div>
            </div>
          )}

          {activeTab === 'forms' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
              {[
                'সাফ-কবলা দলীল ফরম',
                'হেবা ঘোষণা পত্র ফরম',
                'বন্টননামা দলীল ফরম',
                'পাওয়ার অফ অ্যাটর্নি ফরম'
              ].map((form, idx) => (
                <div key={idx} className="p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100 flex items-center justify-between group hover:bg-white hover:shadow-lg transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
                      <FileText size={24} />
                    </div>
                    <span className="font-black text-gray-800">{form}</span>
                  </div>
                  <button className="p-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg">
                    <Download size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Legal Info */}
      <div className="bg-gray-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-black flex items-center gap-3">
              <Gavel size={32} className="text-emerald-400" /> আইনি সতর্কতা ও পরামর্শ
            </h3>
            <p className="text-gray-400 font-medium leading-relaxed">
              জমি রেজিস্ট্রেশনের সময় দাতার মালিকানা ও দলীলের সঠিকতা যাচাই করা অত্যন্ত জরুরি। কোনো দালালের খপ্পরে না পড়ে সরাসরি সাব-রেজিস্ট্রি অফিসে যোগাযোগ করুন।
            </p>
            <ul className="space-y-4">
              {[
                'দলীল রেজিস্ট্রেশনের পর অবশ্যই মূল দলীল বা রিসিট সংগ্রহ করুন।',
                'রেজিস্ট্রেশনের পর দ্রুত নামজারি (Mutation) সম্পন্ন করুন।',
                'সকল ফি সরকারি ব্যাংকের মাধ্যমে জমা দিন এবং রসিদ সংরক্ষণ করুন।'
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm font-bold text-emerald-100/80">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-1.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur-sm p-8 rounded-[2.5rem] border border-white/10 space-y-6">
            <h4 className="text-xl font-black text-emerald-300">জরুরি যোগাযোগ</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
                  <Info size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase">হেল্পলাইন</p>
                  <p className="text-lg font-black">১৬১২২</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500/20 text-emerald-400 rounded-xl flex items-center justify-center">
                  <Globe size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-500 uppercase">ওয়েবসাইট</p>
                  <p className="text-lg font-black">www.minland.gov.bd</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] -mr-48 -mt-48" />
      </div>
    </div>
  );
};

export default LandRegistration;
