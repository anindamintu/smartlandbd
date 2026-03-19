
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Waves, 
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
  Building2
} from 'lucide-react';

const waterBodyData = [
  {
    id: '1',
    name: 'হাতিরঝিল লেক',
    type: 'লেক',
    location: 'ঢাকা',
    status: 'Protected',
    area: '৩০২ একর',
    threat: 'Low',
    lastSurvey: '২০২৩-১০-১৫'
  },
  {
    id: '2',
    name: 'তুরাগ নদী (তীরবর্তী এলাকা)',
    type: 'নদী',
    location: 'গাজীপুর-ঢাকা',
    status: 'Under Litigation',
    area: '৫০০+ একর',
    threat: 'High',
    lastSurvey: '২০২৪-০১-২০'
  },
  {
    id: '3',
    name: 'বেলাই বিল',
    type: 'বিল',
    location: 'গাজীপুর',
    status: 'Encroached',
    area: '১২০০ একর',
    threat: 'Critical',
    lastSurvey: '২০২৩-০৫-১২'
  }
];

const WaterBodyProtection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');

  const filteredWaterBodies = waterBodyData.filter(item => 
    (selectedType === 'All' || item.type === selectedType) &&
    (item.name.includes(searchQuery) || item.location.includes(searchQuery))
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-64 rounded-[2.5rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop" 
          alt="Water Body" 
          className="w-full h-full object-cover brightness-[0.4]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <div className="bg-blue-500/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-4 flex items-center gap-2">
            <Waves size={14} className="text-blue-300" />
            <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">জলাভূমি রক্ষা ও ব্যবস্থাপনা</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tight">সরকারি জলাভূমি সংরক্ষণ মডিউল</h2>
          <p className="text-blue-100 max-w-xl text-sm font-medium opacity-90">
            নদী, খাল, বিল ও লেক দখলমুক্ত রাখা এবং পরিবেশগত ভারসাম্য বজায় রাখতে সরকারি পদক্ষেপসমূহ।
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'মোট জলাভূমি', value: '১২,৪৫০+', icon: Waves, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'দখলমুক্ত এলাকা', value: '৩,২০০ একর', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'মামলাধীন', value: '৪৫০টি', icon: Gavel, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'পুনরুদ্ধারকৃত', value: '৮৫০ একর', icon: Droplets, color: 'text-cyan-600', bg: 'bg-cyan-50' },
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
                  placeholder="জলাভূমির নাম বা অবস্থান দিয়ে খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-3 bg-gray-50 border-none rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 transition-all appearance-none"
              >
                <option value="All">সব ধরনের</option>
                <option value="নদী">নদী</option>
                <option value="খাল">খাল</option>
                <option value="বিল">বিল</option>
                <option value="লেক">লেক</option>
              </select>
            </div>

            <div className="space-y-4">
              {filteredWaterBodies.map(item => (
                <div key={item.id} className="p-5 bg-white border border-gray-100 rounded-2xl hover:border-blue-200 hover:shadow-md transition-all group">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Waves size={24} />
                      </div>
                      <div>
                        <h4 className="font-black text-gray-800">{item.name}</h4>
                        <p className="text-xs text-gray-500 font-medium flex items-center gap-1">
                          <MapPin size={12} /> {item.location} • <span className="text-blue-600">{item.type}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        item.status === 'Protected' ? 'bg-emerald-50 text-emerald-600' :
                        item.status === 'Encroached' ? 'bg-rose-50 text-rose-600' : 'bg-amber-50 text-amber-600'
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
          <div className="bg-blue-900 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-xl">
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-black tracking-tight">জলাভূমি রক্ষা আইন</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <Scale size={16} />
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed font-medium">
                    ২০০০ সালের জলাভূমি সংরক্ষণ আইন অনুযায়ী কোনো জলাভূমি ভরাট করা দণ্ডনীয় অপরাধ।
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center shrink-0">
                    <AlertTriangle size={16} />
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed font-medium">
                    অবৈধ দখলদারদের বিরুদ্ধে উচ্ছেদ অভিযান ও জেল-জরিমানার বিধান রয়েছে।
                  </p>
                </div>
              </div>
              <button className="w-full py-3 bg-white text-blue-900 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-50 transition-all">
                বিস্তারিত আইন দেখুন
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />
          </div>

          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 space-y-4">
            <h4 className="text-sm font-black text-gray-800 uppercase tracking-widest flex items-center gap-2">
              <Info size={16} className="text-blue-500" /> গুরুত্বপূর্ণ লিংক
            </h4>
            <div className="space-y-2">
              {[
                'দখল সংক্রান্ত অভিযোগ',
                'জলাভূমি ম্যাপ (GIS)',
                'উচ্ছেদ অভিযানের নোটিশ',
                'পরিবেশ অধিদপ্তরের ছাড়পত্র'
              ].map((link, i) => (
                <button key={i} className="w-full p-3 text-left text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl flex items-center justify-between group">
                  {link}
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-blue-500 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterBodyProtection;
