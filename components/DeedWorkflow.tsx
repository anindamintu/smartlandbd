
import React, { useState } from 'react';
import { 
  ScrollText, 
  User, 
  MapPin, 
  Users, 
  Calculator, 
  CheckCircle2, 
  ArrowRight, 
  ChevronLeft, 
  ShieldCheck, 
  FileText, 
  Info, 
  AlertCircle,
  Download,
  Printer,
  Save,
  CreditCard,
  Building2,
  FileCheck,
  LayoutGrid,
  Landmark,
  Heart
} from 'lucide-react';

const DeedWorkflow: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    deedType: 'সাফ-কবলা',
    sellerName: '',
    sellerNid: '',
    sellerMobile: '',
    sellerFather: '',
    sellerAddress: '',
    buyerName: '',
    buyerNid: '',
    buyerMobile: '',
    buyerFather: '',
    buyerAddress: '',
    mouza: '',
    khatian: '',
    dag: '',
    area: '',
    boundaries: '',
    price: '',
    witness1: '',
    witness2: '',
    identifier: ''
  });

  const nextStep = () => setStep(prev => Math.min(prev + 1, 6));
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between max-w-4xl mx-auto mb-12">
      {[
        { id: 1, label: 'দলীল ধরণ', icon: ScrollText },
        { id: 2, label: 'পক্ষসমূহ', icon: Users },
        { id: 3, label: 'জমির বিবরণ', icon: MapPin },
        { id: 4, label: 'সাক্ষী', icon: User },
        { id: 5, label: 'খরচ ও সারসংক্ষেপ', icon: Calculator },
        { id: 6, label: 'সম্পন্ন', icon: CheckCircle2 }
      ].map((s, i) => (
        <React.Fragment key={s.id}>
          <div className="flex flex-col items-center gap-2 relative z-10">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
              step >= s.id ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-gray-100 text-gray-400'
            }`}>
              <s.icon size={24} />
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${
              step >= s.id ? 'text-emerald-700' : 'text-gray-400'
            }`}>{s.label}</span>
          </div>
          {i < 5 && (
            <div className={`flex-1 h-1 mx-2 rounded-full transition-all duration-500 ${
              step > s.id ? 'bg-emerald-600' : 'bg-gray-100'
            }`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Header */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
            <FileCheck size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">দলীল প্রসেসিং ওয়ার্কফ্লো</h2>
          <p className="text-gray-500 max-w-lg font-medium">আপনার দলীলের তথ্য ধাপে ধাপে প্রদান করে একটি পূর্ণাঙ্গ খসড়া ও খরচ হিসাব তৈরি করুন।</p>
        </div>

        {renderStepIndicator()}

        {/* Step 1: Deed Type */}
        {step === 1 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 'সাফ-কবলা', title: 'সাফ-কবলা দলীল', desc: 'জমি বিক্রির জন্য ব্যবহৃত আদর্শ ফরমেট।', icon: ScrollText },
                { id: 'হেবা', title: 'হেবা-বিল-এওয়াজ', desc: 'রক্তের সম্পর্কের আত্মীয়দের দানপত্র দলীল।', icon: Users },
                { id: 'বণ্টননামা', title: 'বণ্টননামা দলীল', desc: 'উত্তরাধিকারীদের মধ্যে সম্পত্তি বণ্টনের ফরমেট।', icon: LayoutGrid },
                { id: 'বায়নাপত্র', title: 'বায়নাপত্র দলীল', desc: 'জমি ক্রয়ের প্রাথমিক চুক্তিনামা।', icon: FileText },
                { id: 'দানপত্র', title: 'দানপত্র দলীল', desc: 'নিঃস্বার্থভাবে জমি দান করার ফরমেট।', icon: Heart },
                { id: 'বন্ধকী', title: 'বন্ধকী দলীল', desc: 'জমি বন্ধক রেখে ঋণ গ্রহণের চুক্তিনামা।', icon: Landmark }
              ].map((type) => (
                <button
                  key={type.id}
                  onClick={() => { setFormData(prev => ({ ...prev, deedType: type.id })); nextStep(); }}
                  className={`p-8 rounded-[2.5rem] border-2 text-left transition-all group ${
                    formData.deedType === type.id 
                      ? 'bg-emerald-50 border-emerald-500 shadow-xl' 
                      : 'bg-white border-gray-100 hover:border-emerald-200'
                  }`}
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                    formData.deedType === type.id ? 'bg-emerald-600 text-white' : 'bg-gray-50 text-emerald-600'
                  }`}>
                    {type.icon ? <type.icon size={28} /> : <ScrollText size={28} />}
                  </div>
                  <h4 className="text-lg font-black text-gray-800 mb-2">{type.title}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{type.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Parties Info */}
        {step === 2 && (
          <div className="space-y-10 animate-in slide-in-from-right-8 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              {/* Seller / Donor */}
              <div className="space-y-6 p-8 bg-gray-50 rounded-[2.5rem] border border-gray-100">
                <h3 className="text-xl font-black text-emerald-800 flex items-center gap-3">
                  <User size={24} /> প্রথম পক্ষ (বিক্রেতা/দাতা)
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">পূর্ণ নাম</label>
                    <input 
                      type="text" 
                      name="sellerName"
                      value={formData.sellerName}
                      onChange={handleInputChange}
                      placeholder="উদা: আব্দুল করিম"
                      className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">এনআইডি নম্বর</label>
                      <input 
                        type="text" 
                        name="sellerNid"
                        value={formData.sellerNid}
                        onChange={handleInputChange}
                        placeholder="NID Number"
                        className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মোবাইল নম্বর</label>
                      <input 
                        type="text" 
                        name="sellerMobile"
                        value={formData.sellerMobile}
                        onChange={handleInputChange}
                        placeholder="017XXXXXXXX"
                        className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">পিতার নাম</label>
                    <input 
                      type="text" 
                      name="sellerFather"
                      value={formData.sellerFather}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">বর্তমান ঠিকানা</label>
                    <textarea 
                      name="sellerAddress"
                      value={formData.sellerAddress}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* Buyer / Donee */}
              <div className="space-y-6 p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
                <h3 className="text-xl font-black text-blue-800 flex items-center gap-3">
                  <User size={24} /> দ্বিতীয় পক্ষ (ক্রেতা/গ্রহীতা)
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">পূর্ণ নাম</label>
                    <input 
                      type="text" 
                      name="buyerName"
                      value={formData.buyerName}
                      onChange={handleInputChange}
                      placeholder="উদা: রহিম উদ্দিন"
                      className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">এনআইডি নম্বর</label>
                      <input 
                        type="text" 
                        name="buyerNid"
                        value={formData.buyerNid}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মোবাইল নম্বর</label>
                      <input 
                        type="text" 
                        name="buyerMobile"
                        value={formData.buyerMobile}
                        onChange={handleInputChange}
                        className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">পিতার নাম</label>
                    <input 
                      type="text" 
                      name="buyerFather"
                      value={formData.buyerFather}
                      onChange={handleInputChange}
                      className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">বর্তমান ঠিকানা</label>
                    <textarea 
                      name="buyerAddress"
                      value={formData.buyerAddress}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm resize-none"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-10">
              <button onClick={prevStep} className="px-10 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-all flex items-center gap-2">
                <ChevronLeft size={20} /> পূর্ববর্তী
              </button>
              <button onClick={nextStep} className="px-12 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl hover:bg-emerald-700 transition-all flex items-center gap-2">
                পরবর্তী ধাপ <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Property Details */}
        {step === 3 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 space-y-8">
              <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                <MapPin size={28} className="text-emerald-600" /> জমির তফসিল ও বিবরণ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মৌজার নাম</label>
                  <input 
                    type="text" 
                    name="mouza"
                    value={formData.mouza}
                    onChange={handleInputChange}
                    placeholder="উদা: তেজগাঁও"
                    className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">খতিয়ান নম্বর (RS/SA)</label>
                  <input 
                    type="text" 
                    name="khatian"
                    value={formData.khatian}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">দাগ নম্বর</label>
                  <input 
                    type="text" 
                    name="dag"
                    value={formData.dag}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">জমির পরিমাণ (শতাংশ)</label>
                  <input 
                    type="text" 
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">বিক্রয় মূল্য (অংকে)</label>
                  <input 
                    type="text" 
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="উদা: ৫,০০,০০০"
                    className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">জমির চৌহদ্দি (সীমানা)</label>
                <textarea 
                  name="boundaries"
                  value={formData.boundaries}
                  onChange={handleInputChange}
                  placeholder="উত্তরে: ..., দক্ষিণে: ..., পূর্বে: ..., পশ্চিমে: ..."
                  rows={3}
                  className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm resize-none"
                />
              </div>
            </div>
            <div className="flex justify-between mt-10">
              <button onClick={prevStep} className="px-10 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-all flex items-center gap-2">
                <ChevronLeft size={20} /> পূর্ববর্তী
              </button>
              <button onClick={nextStep} className="px-12 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl hover:bg-emerald-700 transition-all flex items-center gap-2">
                পরবর্তী ধাপ <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Witnesses */}
        {step === 4 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <div className="bg-gray-50 p-10 rounded-[3rem] border border-gray-100 space-y-8">
              <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
                <Users size={28} className="text-emerald-600" /> সাক্ষী ও শনাক্তকারী
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">১ম সাক্ষীর নাম ও ঠিকানা</label>
                  <textarea 
                    name="witness1"
                    value={formData.witness1}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm resize-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">২য় সাক্ষীর নাম ও ঠিকানা</label>
                  <textarea 
                    name="witness2"
                    value={formData.witness2}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm resize-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">শনাক্তকারীর নাম ও ঠিকানা</label>
                  <textarea 
                    name="identifier"
                    value={formData.identifier}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm resize-none"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-10">
              <button onClick={prevStep} className="px-10 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-all flex items-center gap-2">
                <ChevronLeft size={20} /> পূর্ববর্তী
              </button>
              <button onClick={nextStep} className="px-12 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl hover:bg-emerald-700 transition-all flex items-center gap-2">
                পরবর্তী ধাপ <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Summary & Costs */}
        {step === 5 && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6">
                  <h3 className="text-xl font-black text-gray-800 flex items-center gap-2">
                    <FileText size={24} className="text-emerald-600" /> দলীলের সারসংক্ষেপ
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">দলীলের ধরণ</p>
                      <p className="font-bold text-gray-800">{formData.deedType}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">বিক্রয় মূল্য</p>
                      <p className="font-bold text-gray-800">{formData.price || '০'} টাকা</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">বিক্রেতা</p>
                      <p className="font-bold text-gray-800">{formData.sellerName || 'N/A'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ক্রেতা</p>
                      <p className="font-bold text-gray-800">{formData.buyerName || 'N/A'}</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-2xl md:col-span-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">জমির তফসিল</p>
                      <p className="font-bold text-gray-800">মৌজা: {formData.mouza}, খতিয়ান: {formData.khatian}, দাগ: {formData.dag}, পরিমাণ: {formData.area} শতাংশ</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-gray-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
                  <h4 className="text-lg font-black text-emerald-400 mb-6 flex items-center gap-2">
                    <Calculator size={20} /> আনুমানিক রেজিস্ট্রেশন খরচ
                  </h4>
                  <div className="space-y-4 text-sm font-medium">
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-gray-400">রেজিস্ট্রেশন ফি (২%)</span>
                      <span>১০,০০০/-</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-gray-400">স্ট্যাম্প শুল্ক (১.৫%)</span>
                      <span>৭,৫০০/-</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-gray-400">স্থানীয় সরকার কর (৩%)</span>
                      <span>১৫,০০০/-</span>
                    </div>
                    <div className="flex justify-between border-b border-white/10 pb-2">
                      <span className="text-gray-400">উৎস কর (এরিয়া ভিত্তিক)</span>
                      <span>৫,০০০/-</span>
                    </div>
                    <div className="flex justify-between pt-4 text-xl font-black text-emerald-400">
                      <span>মোট খরচ</span>
                      <span>৩৭,৫০০/-</span>
                    </div>
                  </div>
                  <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/10">
                    <p className="text-[10px] text-gray-400 leading-relaxed italic">
                      * এটি একটি আনুমানিক হিসাব। মৌজা রেট ও এরিয়া ভেদে খরচ পরিবর্তিত হতে পারে।
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between mt-10">
              <button onClick={prevStep} className="px-10 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-all flex items-center gap-2">
                <ChevronLeft size={20} /> পূর্ববর্তী
              </button>
              <button onClick={nextStep} className="px-12 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl hover:bg-emerald-700 transition-all flex items-center gap-2">
                ওয়ার্কফ্লো সম্পন্ন করুন <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Completion */}
        {step === 6 && (
          <div className="text-center space-y-8 py-12 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={48} />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-black text-gray-800 tracking-tight">অভিনন্দন!</h2>
              <p className="text-gray-500 max-w-lg mx-auto font-medium text-lg">
                আপনার দলীলের ওয়ার্কফ্লো সফলভাবে সম্পন্ন হয়েছে। এখন আপনি খসড়াটি ডাউনলোড করতে পারেন অথবা সরাসরি প্রিন্ট করতে পারেন।
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-xl hover:bg-emerald-700 transition-all flex items-center gap-2">
                <Download size={20} /> খসড়া ডাউনলোড (PDF)
              </button>
              <button className="px-10 py-4 bg-white border-2 border-emerald-600 text-emerald-600 rounded-2xl font-black hover:bg-emerald-50 transition-all flex items-center gap-2">
                <Printer size={20} /> প্রিন্ট করুন
              </button>
              <button className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-2">
                <Save size={20} /> সেভ করে রাখুন
              </button>
            </div>
            <div className="pt-12 border-t border-gray-50 max-w-2xl mx-auto">
              <div className="bg-amber-50 p-6 rounded-3xl border border-amber-100 flex items-start gap-4 text-left">
                <AlertCircle className="text-amber-600 shrink-0" size={24} />
                <div>
                  <h4 className="text-sm font-black text-amber-800 uppercase tracking-widest mb-1">পরবর্তী পদক্ষেপ</h4>
                  <p className="text-xs text-amber-700 font-medium leading-relaxed">
                    এই খসড়াটি নিয়ে আপনার নিকটস্থ সাব-রেজিস্ট্রি অফিসে যোগাযোগ করুন। সেখানে আপনার দলীলের মূল কপি প্রস্তুত করা হবে এবং এনআইডি ভেরিফিকেশন ও বায়োমেট্রিক সম্পন্ন করে রেজিস্ট্রেশন প্রক্রিয়া শেষ করা হবে।
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Helper Info */}
      {step < 6 && (
        <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
            <Info size={28} />
          </div>
          <div>
            <h4 className="font-black text-gray-800">সহায়তা প্রয়োজন?</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">
              ওয়ার্কফ্লো চলাকালীন কোনো তথ্য বুঝতে সমস্যা হলে আমাদের এআই সহকারীকে জিজ্ঞাসা করুন অথবা ১৬১২২ নম্বরে কল করুন।
            </p>
          </div>
          <button className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-100">
            এআই চ্যাট
          </button>
        </div>
      )}
    </div>
  );
};

export default DeedWorkflow;
