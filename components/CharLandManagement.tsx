
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Map, 
  History, 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  Search, 
  MapPin, 
  FileText, 
  Scale, 
  Droplets,
  ChevronRight,
  ArrowRight,
  Gavel,
  Building2,
  Trees,
  Mountain
} from 'lucide-react';

const charLandData = [
  {
    id: '1',
    name: 'মনপুরা চর',
    river: 'মেঘনা',
    location: 'ভোলা',
    status: 'Settled',
    area: '৫০০০ একর',
    soilType: 'পলি মাটি',
    lastSurvey: '২০২৩-১১-০৫'
  },
  {
    id: '2',
    name: 'চর আলেকজান্ডার',
    river: 'মেঘনা',
    location: 'লক্ষ্মীপুর',
    status: 'Under Survey',
    area: '৩২০০ একর',
    soilType: 'বেলে পলি',
    lastSurvey: '২০২৪-০২-১০'
  },
  {
    id: '3',
    name: 'চর কুকরি-মুকরি',
    river: 'বঙ্গোপসাগর (তীরবর্তী)',
    location: 'ভোলা',
    status: 'Protected Forest',
    area: '৮০০০ একর',
    soilType: 'লবণাক্ত পলি',
    lastSurvey: '২০২৩-০৮-১৫'
  }
];

const CharLandManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredCharLands = charLandData.filter(item => 
    (selectedStatus === 'All' || item.status === selectedStatus) &&
    (item.name.includes(searchQuery) || item.location.includes(searchQuery))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-64 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop" 
          alt="Char Land" 
          className="w-full h-full object-cover brightness-[0.4]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="bg-amber-500/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-4 flex items-center gap-2">
            <Mountain size={14} className="text-amber-300" />
            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">চর জমি ব্যবস্থাপনা ও বন্দোবস্ত</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">সরকারি চর জমি ব্যবস্থাপনা মডিউল</h2>
          <p className="text-amber-100 max-w-xl text-sm font-medium opacity-90">
            নদী সিকস্তি ও পয়স্তি এলাকার চর জমি চিহ্নিতকরণ, রেকর্ড সংরক্ষণ এবং ভূমিহীনদের মাঝে বন্দোবস্ত প্রক্রিয়া।
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'মোট চর এলাকা', value: '২৫,০০০+ একর', icon: Map, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'বন্দোবস্তকৃত', value: '৮,৫০০ একর', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'বনায়ন এলাকা', value: '১২,০০০ একর', icon: Trees, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'জরিপাধীন', value: '৪,৫০০ একর', icon: History, color: 'text-blue-600', bg: 'bg-blue-50' },
        ].map((stat, i) => (
          <div key={i} className={`${stat.bg} p-6 rounded-3xl border border-white/50 shadow-sm flex items-center gap-4`}>
            <div className={`w-12 h-12 bg-white rounded-2xl flex items-center justify-center ${stat.color} shadow-sm`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
              <p className={`text-xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: List & Search */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <input 
                  type="text" 
                  placeholder="চরের নাম বা অবস্থান দিয়ে খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-500 transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-amber-500 transition-all appearance-none"
              >
                <option value="All">সব ধরনের</option>
                <option value="Settled">বন্দোবস্তকৃত</option>
                <option value="Under Survey">জরিপাধীন</option>
                <option value="Protected Forest">বনায়নকৃত</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredCharLands.map(item => (
                <div key={item.id} className="p-5 bg-white border border-gray-100 rounded-2xl hover:border-amber-200 hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Mountain size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-800">{item.name}</h4>
                        <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                          <MapPin size={12} /> {item.location} • <span className="text-amber-600">{item.river} নদী</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        item.status === 'Settled' ? 'bg-emerald-50 text-emerald-600' :
                        item.status === 'Protected Forest' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                        {item.status}
                      </span>
                      <p className="text-xs font-bold text-gray-400 mt-1">আয়তন: {item.area}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Guidelines & Actions */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-amber-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-black tracking-tight">চর জমি বন্দোবস্ত নীতিমালা</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Scale size={16} />
                  </div>
                  <p className="text-xs text-amber-100 leading-relaxed font-medium">
                    ১৯৫০ সালের প্রজাস্বত্ব আইন অনুযায়ী নদী পয়স্তি জমি সরকারি খাস জমি হিসেবে গণ্য হয়।
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <History size={16} />
                  </div>
                  <p className="text-xs text-amber-100 leading-relaxed font-medium">
                    ২০ বছর বা তার বেশি সময় আগে নদী সিকস্তি হওয়া জমি পয়স্তি হলে আগের মালিক অগ্রাধিকার পান।
                  </p>
                </div>
              </div>
              <button className="w-full py-3 bg-white text-amber-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-amber-50 transition-all">
                বন্দোবস্ত গাইড দেখুন
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl" />
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
            <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
              <Info size={16} className="text-amber-500" /> গুরুত্বপূর্ণ লিংক
            </h4>
            <div className="space-y-2">
              {[
                'চর জমি চিহ্নিতকরণ ম্যাপ',
                'বন্দোবস্তের আবেদন ফরম',
                'দিয়ারা জরিপের সময়সূচী',
                'বনায়ন প্রকল্পের তথ্য'
              ].map((link, i) => (
                <button key={i} className="w-full p-3 text-left text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl flex items-center justify-between group">
                  {link}
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-amber-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharLandManagement;
