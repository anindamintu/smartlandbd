
import React, { useState } from 'react';
import { 
  Gavel, 
  MapPin, 
  FileText, 
  Upload, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  Phone, 
  ShieldAlert,
  ChevronRight,
  Info,
  ArrowLeft
} from 'lucide-react';

const DisputeComplaintModule: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    disputeType: '',
    district: '',
    upazila: '',
    mouza: '',
    khatian: '',
    dag: '',
    description: '',
    complainantName: '',
    complainantNid: '',
    complainantMobile: '',
    evidence: null as File | null
  });

  const [trackingId, setTrackingId] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `DISP-2024-${Math.floor(1000 + Math.random() * 9000)}`;
    setTrackingId(newId);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-emerald-100">
          <CheckCircle2 size={48} />
        </div>
        <div className="space-y-4">
          <h2 className="text-4xl font-black text-gray-800 tracking-tight">বিরোধ অভিযোগ জমা হয়েছে!</h2>
          <p className="text-gray-500 font-medium max-w-md mx-auto text-lg">
            আপনার অভিযোগ আইডি: <span className="text-emerald-600 font-black">#{trackingId}</span>। সংশ্লিষ্ট কর্তৃপক্ষ আপনার অভিযোগটি পর্যালোচনা করে দ্রুত ব্যবস্থা গ্রহণ করবেন।
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setIsSubmitted(false)}
            className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg"
          >
            নতুন অভিযোগ করুন
          </button>
          <button 
            className="px-10 py-4 bg-white border-2 border-emerald-600 text-emerald-600 rounded-2xl font-black hover:bg-emerald-50 transition-all"
          >
            ট্র্যাকিং করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Header */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center mb-6 text-rose-600 shadow-inner">
            <Gavel size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">ভূমি বিরোধ অভিযোগ ফরম</h2>
          <p className="text-gray-500 max-w-lg font-medium">আপনার জমির বিরোধ সংক্রান্ত তথ্য প্রদান করে অনলাইনে অভিযোগ দাখিল করুন।</p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-12 gap-4">
          {[1, 2, 3].map((s) => (
            <React.Fragment key={s}>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black transition-all ${
                step >= s ? 'bg-rose-600 text-white shadow-lg shadow-rose-100' : 'bg-gray-100 text-gray-400'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-12 h-1 rounded-full ${step > s ? 'bg-rose-600' : 'bg-gray-100'}`} />}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Step 1: Dispute Type & Location */}
          {step === 1 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">বিরোধের ধরণ</label>
                  <select 
                    name="disputeType"
                    value={formData.disputeType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  >
                    <option value="">নির্বাচন করুন</option>
                    <option value="boundary">সীমানা বিরোধ</option>
                    <option value="ownership">মালিকানা দাবি</option>
                    <option value="inheritance">উত্তরাধিকার বণ্টন</option>
                    <option value="possession">অবৈধ দখল</option>
                    <option value="other">অন্যান্য</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">জেলা</label>
                  <input 
                    type="text" 
                    name="district"
                    value={formData.district}
                    onChange={handleInputChange}
                    required
                    placeholder="জেলার নাম"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">উপজেলা</label>
                  <input 
                    type="text" 
                    name="upazila"
                    value={formData.upazila}
                    onChange={handleInputChange}
                    required
                    placeholder="উপজেলার নাম"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">মৌজা</label>
                  <input 
                    type="text" 
                    name="mouza"
                    value={formData.mouza}
                    onChange={handleInputChange}
                    required
                    placeholder="মৌজার নাম"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">খতিয়ান নম্বর</label>
                  <input 
                    type="text" 
                    name="khatian"
                    value={formData.khatian}
                    onChange={handleInputChange}
                    placeholder="খতিয়ান নম্বর"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">দাগ নম্বর</label>
                  <input 
                    type="text" 
                    name="dag"
                    value={formData.dag}
                    onChange={handleInputChange}
                    placeholder="দাগ নম্বর"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-12 py-4 bg-rose-600 text-white rounded-2xl font-black shadow-xl hover:bg-rose-700 transition-all flex items-center gap-2"
                >
                  পরবর্তী ধাপ <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Description & Evidence */}
          {step === 2 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">বিরোধের বিস্তারিত বিবরণ</label>
                <textarea 
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="বিরোধের কারণ ও বর্তমান অবস্থা বিস্তারিত লিখুন..."
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-500 outline-none transition-all font-bold text-gray-700 shadow-sm resize-none"
                ></textarea>
              </div>
              <div className="p-10 border-4 border-dashed border-gray-100 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-4 hover:border-rose-200 transition-all cursor-pointer bg-gray-50/50">
                <div className="w-16 h-16 bg-white text-rose-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <Upload size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-black text-gray-800">প্রমাণক বা নথিপত্র আপলোড করুন</h4>
                  <p className="text-sm text-gray-400 font-medium">দলীলের কপি, খতিয়ান বা ম্যাপের ছবি (PDF, JPG, PNG)</p>
                </div>
                <input type="file" className="hidden" id="evidence-upload" />
                <label htmlFor="evidence-upload" className="px-8 py-3 bg-white border-2 border-rose-600 text-rose-600 rounded-xl font-black text-sm cursor-pointer hover:bg-rose-50 transition-all">
                  ফাইল নির্বাচন করুন
                </label>
              </div>
              <div className="flex justify-between">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-10 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  <ArrowLeft size={20} /> পূর্ববর্তী
                </button>
                <button 
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-12 py-4 bg-rose-600 text-white rounded-2xl font-black shadow-xl hover:bg-rose-700 transition-all flex items-center gap-2"
                >
                  পরবর্তী ধাপ <ChevronRight size={20} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Complainant Info */}
          {step === 3 && (
            <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">অভিযোগকারীর নাম</label>
                  <div className="relative">
                    <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      name="complainantName"
                      value={formData.complainantName}
                      onChange={handleInputChange}
                      required
                      placeholder="আপনার পূর্ণ নাম"
                      className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">এনআইডি নম্বর</label>
                  <div className="relative">
                    <ShieldAlert className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="text" 
                      name="complainantNid"
                      value={formData.complainantNid}
                      onChange={handleInputChange}
                      required
                      placeholder="NID নম্বর"
                      className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">মোবাইল নম্বর</label>
                  <div className="relative">
                    <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input 
                      type="tel" 
                      name="complainantMobile"
                      value={formData.complainantMobile}
                      onChange={handleInputChange}
                      required
                      placeholder="০১XXXXXXXXX"
                      className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="p-8 bg-amber-50 border border-amber-100 rounded-[2.5rem] flex items-start gap-4">
                <AlertCircle className="text-amber-600 shrink-0" size={24} />
                <p className="text-sm font-medium text-amber-800 leading-relaxed">
                  আমি ঘোষণা করছি যে উপরে বর্ণিত সকল তথ্য সত্য এবং সঠিক। কোনো মিথ্যা তথ্য প্রদানের জন্য আমি আইনত দায়ী থাকব।
                </p>
              </div>

              <div className="flex justify-between">
                <button 
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-10 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-all flex items-center gap-2"
                >
                  <ArrowLeft size={20} /> পূর্ববর্তী
                </button>
                <button 
                  type="submit"
                  className="px-12 py-5 bg-rose-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-rose-200 hover:bg-rose-700 transition-all flex items-center gap-3"
                >
                  অভিযোগ জমা দিন <Send size={24} />
                </button>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'গোপনীয়তা', desc: 'আপনার পরিচয় সম্পূর্ণ গোপন রাখা হবে।', icon: ShieldAlert, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'দ্রুত ব্যবস্থা', desc: 'অভিযোগ পাওয়ার ৭২ ঘণ্টার মধ্যে প্রাথমিক তদন্ত শুরু হবে।', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { title: 'সরাসরি যোগাযোগ', desc: 'প্রয়োজনে আমাদের হটলাইন ১৬১২২ এ কল করুন।', icon: Info, color: 'text-amber-600', bg: 'bg-amber-50' }
        ].map((info, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-4">
            <div className={`w-14 h-14 ${info.bg} ${info.color} rounded-2xl flex items-center justify-center`}>
              <info.icon size={28} />
            </div>
            <h4 className="text-lg font-black text-gray-800">{info.title}</h4>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">{info.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisputeComplaintModule;
