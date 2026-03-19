
import React, { useState } from 'react';
import { 
  Layers, 
  CreditCard, 
  FileSearch, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  Search, 
  User, 
  MapPin, 
  Phone, 
  Mail, 
  Building2, 
  ChevronRight, 
  Download, 
  Bell, 
  ShieldCheck, 
  Zap,
  Smartphone,
  Globe,
  Wallet
} from 'lucide-react';

interface Service {
  id: string;
  title: string;
  desc: string;
  icon: any;
  color: string;
  bg: string;
}

const services: Service[] = [
  { id: 'mutation', title: 'ই-নামজারি আবেদন', desc: 'অনলাইনে নামজারি ও জমাভাগ আবেদনের জন্য।', icon: Layers, color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'ldtax', title: 'ভূমি উন্নয়ন কর', desc: 'বকেয়া ও হাল কর অনলাইনে পরিশোধ করুন।', icon: CreditCard, color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'certified', title: 'সার্টিফাইড কপি', desc: 'খতিয়ান বা দলীলের সার্টিফাইড কপির আবেদন।', icon: FileSearch, color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'tracking', title: 'আবেদন ট্র্যাকিং', desc: 'আপনার আবেদনের বর্তমান অবস্থা জানুন।', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const ServicePortal: React.FC = () => {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success'>('idle');
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'নামজারি আবেদন গৃহীত', desc: 'আপনার আবেদন নং ১২৩৪৫ সফলভাবে গৃহীত হয়েছে।', time: '২ মিনিট আগে', unread: true },
    { id: 2, title: 'কর পরিশোধ সফল', desc: 'সাভার মৌজার কর পরিশোধ সফল হয়েছে।', time: '১ ঘণ্টা আগে', unread: false },
  ]);

  const handleServiceClick = (id: string) => {
    setActiveService(id);
    setStep(1);
  };

  const simulatePayment = () => {
    setPaymentStatus('processing');
    setTimeout(() => {
      setPaymentStatus('success');
      setStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-72 rounded-[3.5rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop" 
          alt="Land Services" 
          className="w-full h-full object-cover brightness-[0.3]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-emerald-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
            <Globe size={16} className="text-emerald-300" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">ডিজিটাল ভূমি সেবা প্ল্যাটফর্ম</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">স্মার্ট ভূমি সেবা, এখন আপনার হাতের মুঠোয়</h2>
          <p className="text-emerald-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90">
            নামজারি, কর প্রদান এবং খতিয়ান অনুসন্ধান করুন অনলাইনে। দ্রুত, স্বচ্ছ এবং নিরাপদ।
          </p>
        </div>
      </div>

      {/* Main Services Grid */}
      {!activeService ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <button 
              key={service.id}
              onClick={() => handleServiceClick(service.id)}
              className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all group text-left"
            >
              <div className={`w-16 h-16 ${service.bg} ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
                <service.icon size={32} />
              </div>
              <h3 className="text-xl font-black text-gray-800 mb-2 leading-tight">{service.title}</h3>
              <p className="text-gray-500 text-sm font-medium leading-relaxed mb-6">{service.desc}</p>
              <div className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest">
                শুরু করুন <ArrowRight size={16} />
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden animate-in zoom-in duration-500">
          {/* Service Header */}
          <div className="bg-gray-900 p-8 text-white flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setActiveService(null)}
                className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all"
              >
                <ArrowRight className="rotate-180" size={24} />
              </button>
              <div>
                <h3 className="text-2xl font-black">{services.find(s => s.id === activeService)?.title}</h3>
                <p className="text-gray-400 text-sm font-bold">ধাপ {step} এর ৩</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${step >= s ? 'bg-emerald-600 text-white' : 'bg-white/10 text-gray-500'}`}>
                    {s}
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest ${step >= s ? 'text-white' : 'text-gray-500'}`}>
                    {s === 1 ? 'তথ্য প্রদান' : s === 2 ? 'পেমেন্ট' : 'সম্পন্ন'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-10">
            {/* Step 1: Form */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="text-lg font-black text-gray-800 flex items-center gap-2">
                      <User size={20} className="text-emerald-600" /> আবেদনকারীর তথ্য
                    </h4>
                    <div className="space-y-4">
                      <input type="text" placeholder="পূর্ণ নাম" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none font-bold" />
                      <input type="text" placeholder="এনআইডি নম্বর" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none font-bold" />
                      <input type="tel" placeholder="মোবাইল নম্বর" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none font-bold" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="text-lg font-black text-gray-800 flex items-center gap-2">
                      <MapPin size={20} className="text-emerald-600" /> জমির তথ্য
                    </h4>
                    <div className="space-y-4">
                      <select className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none font-bold appearance-none">
                        <option>জেলা নির্বাচন করুন</option>
                        <option>ঢাকা</option>
                        <option>চট্টগ্রাম</option>
                      </select>
                      <input type="text" placeholder="মৌজা ও খতিয়ান নম্বর" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none font-bold" />
                      <input type="text" placeholder="দাগ নম্বর" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none font-bold" />
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3"
                >
                  পরবর্তী ধাপে যান <ArrowRight size={24} />
                </button>
              </div>
            )}

            {/* Step 2: Payment */}
            {step === 2 && (
              <div className="space-y-8 animate-in zoom-in duration-500 max-w-2xl mx-auto">
                <div className="text-center space-y-2">
                  <h4 className="text-2xl font-black text-gray-800">পেমেন্ট গেটওয়ে</h4>
                  <p className="text-gray-500 font-bold">নিরাপদ ডিজিটাল পেমেন্ট সম্পন্ন করুন</p>
                </div>

                <div className="bg-emerald-50 p-8 rounded-[2.5rem] border border-emerald-100 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">মোট প্রদেয় টাকা</p>
                    <p className="text-3xl font-black text-emerald-900">৳ ১,১৫০.০০</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">আবেদন ফি</p>
                    <p className="font-bold text-emerald-800">ই-নামজারি</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {[
                    { id: 'nagad', name: 'নগদ', color: 'bg-[#ed1c24]', textColor: 'text-white' },
                    { id: 'bkash', name: 'বিকাশ', color: 'bg-[#e2136e]', textColor: 'text-white' },
                    { id: 'rocket', name: 'রকেট', color: 'bg-[#8c3494]', textColor: 'text-white' },
                    { id: 'upay', name: 'উপায়', color: 'bg-[#ffc40c]', textColor: 'text-gray-900' },
                    { id: 'others', name: 'অন্যান্য', color: 'bg-gray-100', textColor: 'text-gray-600' }
                  ].map((method) => (
                    <button key={method.id} className="p-6 bg-white border-2 border-gray-100 rounded-2xl hover:border-emerald-500 transition-all flex flex-col items-center gap-3 group">
                      <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                        <Wallet className={method.textColor} size={24} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 group-hover:text-emerald-600">{method.name}</span>
                    </button>
                  ))}
                </div>

                <button 
                  onClick={simulatePayment}
                  disabled={paymentStatus === 'processing'}
                  className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3"
                >
                  {paymentStatus === 'processing' ? (
                    <>
                      <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                      প্রসেসিং হচ্ছে...
                    </>
                  ) : (
                    <>
                      <ShieldCheck size={24} /> পেমেন্ট নিশ্চিত করুন
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
              <div className="text-center space-y-8 py-10 animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 size={48} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-3xl font-black text-gray-800">আবেদন সফলভাবে সম্পন্ন হয়েছে!</h3>
                  <p className="text-gray-500 font-bold">আপনার আবেদন নম্বর: <span className="text-emerald-600 font-mono">APP-2024-99821</span></p>
                </div>
                <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 max-w-md mx-auto">
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    আপনার মোবাইলে একটি নিশ্চিতকরণ এসএমএস পাঠানো হয়েছে। আপনি "আবেদন ট্র্যাকিং" অপশন থেকে যেকোনো সময় আপডেট জানতে পারবেন।
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                  <button className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2">
                    <Download size={20} /> রসিদ ডাউনলোড করুন
                  </button>
                  <button 
                    onClick={() => setActiveService(null)}
                    className="px-10 py-4 bg-white border-2 border-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-50 transition-all"
                  >
                    ড্যাশবোর্ডে ফিরে যান
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Notifications & Tracking Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
              <Bell size={24} className="text-emerald-600" /> নোটিফিকেশন সেন্টার
            </h3>
            <button className="text-xs font-black text-emerald-600 uppercase tracking-widest hover:underline">সবগুলো দেখুন</button>
          </div>
          <div className="space-y-4">
            {notifications.map((note) => (
              <div key={note.id} className={`p-6 rounded-3xl border transition-all flex items-start gap-4 ${note.unread ? 'bg-emerald-50 border-emerald-100' : 'bg-gray-50 border-gray-100 opacity-70'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${note.unread ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-400'}`}>
                  {note.unread ? <Zap size={18} /> : <CheckCircle2 size={18} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-black text-gray-800">{note.title}</h4>
                    <span className="text-[10px] font-bold text-gray-400">{note.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium">{note.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 space-y-8">
            <h3 className="text-xl font-black flex items-center gap-3">
              <Smartphone size={24} className="text-emerald-400" /> মোবাইল অ্যাপ
            </h3>
            <p className="text-gray-400 text-sm font-medium leading-relaxed">
              এখনই ডাউনলোড করুন "স্মার্ট ভূমি সেবা" অ্যাপ এবং যেকোনো স্থান থেকে ভূমি সেবা গ্রহণ করুন।
            </p>
            <div className="space-y-4">
              <button className="w-full py-4 bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/20 transition-all">
                <div className="text-left">
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Get it on</p>
                  <p className="text-sm font-black">Google Play</p>
                </div>
              </button>
              <button className="w-full py-4 bg-white/10 border border-white/10 rounded-2xl flex items-center justify-center gap-3 hover:bg-white/20 transition-all">
                <div className="text-left">
                  <p className="text-[8px] font-black uppercase tracking-widest opacity-60">Download on the</p>
                  <p className="text-sm font-black">App Store</p>
                </div>
              </button>
            </div>
            <div className="pt-6 border-t border-white/10 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-800 flex items-center justify-center text-[10px] font-black">
                    U{i}
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-bold text-emerald-400">৫ মিলিয়নেরও বেশি ডাউনলোড</p>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        </div>
      </div>
    </div>
  );
};

export default ServicePortal;
