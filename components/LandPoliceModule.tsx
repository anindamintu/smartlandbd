
import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Phone, 
  MapPin, 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  Search, 
  Filter, 
  ChevronDown, 
  ArrowRight,
  MessageSquare,
  FileText,
  Gavel,
  Scale,
  ShieldCheck,
  Zap,
  Users,
  Map as MapIcon
} from 'lucide-react';

const LandPoliceModule: React.FC = () => {
  const [reportType, setReportType] = useState('grabbing');
  const [isReporting, setIsReporting] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-80 rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1593115057322-e94b77572f20?q=80&w=2071&auto=format&fit=crop" 
          alt="Land Police" 
          className="w-full h-full object-cover brightness-[0.3]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-rose-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
            <ShieldAlert size={16} className="text-rose-300" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">ভূমি অপরাধ প্রতিরোধ ইউনিট</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">ল্যান্ড পুলিশ ও সুরক্ষা সেবা</h2>
          <p className="text-rose-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90">
            ভূমি দখলদারিত্ব রোধ, অবৈধ স্থাপনা উচ্ছেদ এবং ভূমি অপরাধ দমনে নিবেদিত বিশেষ পুলিশ ইউনিট।
          </p>
        </div>
      </div>

      {/* Emergency Contact Bar */}
      <div className="bg-rose-600 p-8 rounded-[3rem] text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        <div className="relative z-10 flex items-center gap-6">
          <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center text-rose-200 shadow-inner">
            <Phone size={40} className="animate-pulse" />
          </div>
          <div>
            <h3 className="text-2xl font-black mb-1">জরুরি অভিযোগ হটলাইন</h3>
            <p className="text-rose-100 font-bold opacity-80">ভূমি দখল বা অপরাধের তথ্য দিতে সরাসরি কল করুন</p>
          </div>
        </div>
        <div className="relative z-10 flex flex-wrap gap-4">
          <a href="tel:16122" className="px-10 py-5 bg-white text-rose-600 rounded-2xl font-black text-2xl shadow-lg hover:bg-rose-50 transition-all">১৬১২২</a>
          <a href="tel:999" className="px-10 py-5 bg-rose-500 text-white rounded-2xl font-black text-2xl shadow-lg hover:bg-rose-400 transition-all border border-rose-400">৯৯৯</a>
        </div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reporting Form */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
          <h3 className="text-2xl font-black text-gray-800 mb-8 flex items-center gap-3">
            <MessageSquare size={28} className="text-rose-600" /> অনলাইন অভিযোগ দাখিল
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">অভিযোগের ধরণ</label>
              <div className="relative">
                <select 
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                >
                  <option value="grabbing">ভূমি দখল (Land Grabbing)</option>
                  <option value="fake_doc">জাল দলিল (Fake Documents)</option>
                  <option value="illegal_structure">অবৈধ স্থাপনা (Illegal Structure)</option>
                  <option value="harassment">হয়রানি (Harassment)</option>
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">অবস্থান (জেলা/উপজেলা)</label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="উদা: ঢাকা, সাভার"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                />
                <MapPin className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-8">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">অভিযোগের বিস্তারিত বিবরণ</label>
            <textarea 
              rows={4}
              placeholder="ঘটনার তারিখ, স্থান এবং জড়িত ব্যক্তিদের তথ্য প্রদান করুন..."
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-500 outline-none transition-all font-bold text-gray-700 shadow-sm resize-none"
            />
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-center gap-3">
              <AlertCircle className="text-rose-500 shrink-0" size={20} />
              <p className="text-[10px] font-bold text-rose-800 leading-relaxed">
                মিথ্যা অভিযোগ দাখিল করা দণ্ডনীয় অপরাধ। আপনার তথ্য গোপন রাখা হবে।
              </p>
            </div>
            <button 
              onClick={() => {
                setIsReporting(true);
                setTimeout(() => {
                  setIsReporting(false);
                  alert('আপনার অভিযোগ সফলভাবে গ্রহণ করা হয়েছে। ট্র্যাকিং আইডি: LP-2024-8892');
                }, 1500);
              }}
              disabled={isReporting}
              className="px-10 py-5 bg-rose-600 text-white rounded-2xl font-black shadow-xl hover:bg-rose-700 transition-all flex items-center gap-3 disabled:opacity-50"
            >
              {isReporting ? 'দাখিল হচ্ছে...' : 'অভিযোগ জমা দিন'} <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="space-y-8">
          <div className="bg-gray-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="text-xl font-black mb-6 flex items-center gap-3">
                <Gavel size={24} className="text-rose-400" /> আইনি ক্ষমতা ও দায়িত্ব
              </h4>
              <div className="space-y-4">
                {[
                  'অবৈধ দখলদার উচ্ছেদ',
                  'ভূমি অপরাধে তাৎক্ষণিক গ্রেপ্তার',
                  'সীমানা বিরোধে পুলিশি সহায়তা',
                  'আদালতের রায় বাস্তবায়নে সহায়তা'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm font-bold">
                    <CheckCircle2 size={18} className="text-emerald-400" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-rose-600/10 rounded-full blur-3xl" />
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <h4 className="text-lg font-black text-gray-800 flex items-center gap-2">
              <ShieldCheck size={20} className="text-emerald-600" /> সুরক্ষা টিপস
            </h4>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-xs font-bold text-emerald-800 leading-relaxed">
                  জমির সীমানা নির্ধারণের সময় স্থানীয় ভূমি অফিস ও পুলিশকে অবহিত রাখুন।
                </p>
              </div>
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100">
                <p className="text-xs font-bold text-amber-800 leading-relaxed">
                  অচেনা কাউকে জমির মূল দলিল বা নথিপত্র দেখাবেন না।
                </p>
              </div>
            </div>
            <button className="w-full py-4 bg-gray-50 text-gray-700 rounded-2xl font-black text-sm hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
              নিকটস্থ থানা খুঁজুন <MapIcon size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Operational Units */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <h3 className="text-2xl font-black text-gray-800 mb-8 text-center">ল্যান্ড পুলিশ অপারেশনাল ইউনিট</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'উচ্ছেদ শাখা', icon: Zap, color: 'text-rose-600', bg: 'bg-rose-50' },
            { label: 'তদন্ত ইউনিট', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'লিগ্যাল সেল', icon: Scale, color: 'text-indigo-600', bg: 'bg-indigo-50' },
            { label: 'কমিউনিটি পুলিশ', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' }
          ].map((unit, i) => (
            <div key={i} className="flex flex-col items-center p-6 rounded-[2rem] border border-gray-50 hover:border-gray-200 transition-all text-center group">
              <div className={`w-16 h-16 ${unit.bg} ${unit.color} rounded-2xl flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform`}>
                <unit.icon size={32} />
              </div>
              <span className="text-sm font-black text-gray-800">{unit.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandPoliceModule;
