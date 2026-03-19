import React from 'react';
import { Palette, Type, Layout, ShieldCheck, Printer, Download, Sparkles, Box, CheckCircle2, Smartphone } from 'lucide-react';

const DesignGuide: React.FC = () => {
  const printDoc = () => window.print();

  return (
    <div className="space-y-12 pb-20 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 print:shadow-none print:border-none print:p-0">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-200 shrink-0">
            <Palette size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-gray-800 tracking-tight">ডিজাইন সিস্টেম গাইড</h2>
            <p className="text-gray-500 font-medium mt-1">বাংলাদেশ ডিজিটাল ভূমিসেবা ইন্টারফেস স্পেসিফিকেশন</p>
          </div>
        </div>
        <button 
          onClick={printDoc}
          className="flex items-center justify-center gap-3 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 print:hidden"
        >
          <Printer size={20} /> পিডিএফ সেভ/প্রিন্ট করুন
        </button>
      </div>

      {/* Color Palette */}
      <div className="space-y-6">
        <h3 className="text-xl font-black text-gray-800 flex items-center gap-3 ml-2">
          <div className="w-1.5 h-6 bg-emerald-500 rounded-full"/> কালার প্যালেট (Color Palette)
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Emerald Primary', hex: '#059669', tailwind: 'bg-emerald-600', text: 'text-white' },
            { name: 'Emerald Deep', hex: '#064e3b', tailwind: 'bg-emerald-900', text: 'text-white' },
            { name: 'Amber Warning', hex: '#d97706', tailwind: 'bg-amber-600', text: 'text-white' },
            { name: 'Rose Danger', hex: '#e11d48', tailwind: 'bg-rose-600', text: 'text-white' },
            { name: 'Surface Gray', hex: '#f8fafc', tailwind: 'bg-slate-50', text: 'text-gray-600' },
            { name: 'Border Light', hex: '#f1f5f9', tailwind: 'bg-slate-100', text: 'text-gray-600' },
            { name: 'Success Mint', hex: '#ecfdf5', tailwind: 'bg-emerald-50', text: 'text-emerald-700' },
            { name: 'Accent Blue', hex: '#2563eb', tailwind: 'bg-blue-600', text: 'text-white' },
          ].map((color, i) => (
            <div key={i} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
              <div className={`w-full aspect-square rounded-2xl ${color.tailwind} mb-4 shadow-inner flex items-center justify-center`}>
                <span className={`text-[10px] font-black uppercase tracking-widest ${color.text}`}>{color.hex}</span>
              </div>
              <p className="text-xs font-black text-gray-800">{color.name}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">{color.hex}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Typography */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
            <Type size={24} className="text-emerald-600"/> টাইপোগ্রাফি
          </h3>
          <div className="space-y-6">
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Primary Font Family</p>
              <p className="text-2xl font-black text-emerald-900">Hind Siliguri (হিন্দ শিলিগুড়ি)</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-end gap-4">
                <span className="text-4xl font-black">Aa</span>
                <div>
                  <p className="text-xs font-bold text-gray-400">Heading 1 - 36px Black</p>
                  <p className="text-xl font-black">আমাদের লক্ষ্য স্মার্ট বাংলাদেশ</p>
                </div>
              </div>
              <div className="flex items-end gap-4">
                <span className="text-2xl font-bold">Aa</span>
                <div>
                  <p className="text-xs font-bold text-gray-400">Body Text - 16px Medium</p>
                  <p className="text-base font-medium text-gray-600">ভূমি সেবা এখন আপনার হাতের মুঠোয়। ঘরে বসেই সকল সেবা গ্রহণ করুন।</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
            <Layout size={24} className="text-emerald-600"/> বাটন ও ইন্টারঅ্যাকশন
          </h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm shadow-lg shadow-emerald-100">Primary Button</button>
              <button className="px-6 py-3 bg-white text-emerald-600 border-2 border-emerald-600 rounded-xl font-black text-sm">Secondary</button>
              <button className="px-6 py-3 bg-red-50 text-red-600 rounded-xl font-black text-sm">Danger Style</button>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 text-center">ইনপুট ফিল্ড ডিজাইন</p>
              <input type="text" placeholder="নমুনা ইনপুট..." className="w-full px-4 py-3 bg-white border-2 border-transparent rounded-xl focus:border-emerald-500 outline-none shadow-sm font-bold"/>
            </div>
          </div>
        </div>
      </div>

      {/* App Structure */}
      <div className="bg-emerald-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full border border-white/20">
              <Sparkles size={14} className="text-emerald-300" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100">আর্কিটেকচার</span>
            </div>
            <h3 className="text-3xl font-black leading-tight">ডিজিটাল ভূমিসেবা ২০৩০<br/>ইউজার এক্সপেরিয়েন্স</h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'রেসপনসিভ', icon: Smartphone, desc: 'মোবাইল ও ওয়েব' },
                { label: 'নিরাপদ', icon: ShieldCheck, desc: 'অত্যাধুনিক এনক্রিপশন' },
                { label: 'সহজ', icon: Box, desc: 'মিনিমালিস্ট ইন্টারফেস' },
                { label: 'ভেরিফাইড', icon: CheckCircle2, desc: 'সরকারি ডাটাবেজ' }
              ].map((item, i) => (
                <div key={i} className="flex flex-col gap-2">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-300">
                    <item.icon size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-black">{item.label}</p>
                    <p className="text-[10px] text-emerald-300/60 font-medium">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full md:w-64 aspect-[9/16] bg-white rounded-[2rem] shadow-2xl border-8 border-emerald-800 p-4 relative">
             <div className="w-20 h-1 bg-gray-200 rounded-full mx-auto mb-6" />
             <div className="space-y-3">
               <div className="h-4 w-2/3 bg-gray-100 rounded-lg" />
               <div className="h-20 w-full bg-emerald-50 rounded-xl" />
               <div className="h-4 w-full bg-gray-50 rounded-lg" />
               <div className="h-4 w-full bg-gray-50 rounded-lg" />
               <div className="h-10 w-full bg-emerald-600 rounded-xl mt-6" />
             </div>
             <p className="absolute bottom-6 left-0 w-full text-center text-[8px] font-black text-emerald-800/30 uppercase tracking-widest">Digital Bhumi Seva v2.0</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px]" />
      </div>
      
      <div className="text-center print:hidden">
        <p className="text-xs text-gray-400 font-bold mb-4 uppercase tracking-widest">এই ডকুমেন্টটি সরাসরি আপনার ব্রাউজার থেকে প্রিন্ট করা যাবে</p>
        <div className="flex items-center justify-center gap-4">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"/>
          <span className="text-[11px] font-black text-emerald-600 uppercase tracking-widest">স্মার্ট ডিজাইন সিস্টেম ২০২৪</span>
        </div>
      </div>
    </div>
  );
};

export default DesignGuide;