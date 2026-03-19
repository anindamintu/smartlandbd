import React from 'react';
import { LayoutDashboard, FileText, Calculator, MessageSquare, History, Settings, Info, LogOut, ShieldCheck, HelpCircle, Palette, BookOpen, Scale, Book, TrendingUp, ExternalLink, ScrollText, Landmark, Layers, Briefcase, Gavel, Droplets, Trees, Building2, FileCheck, Globe, User, FileSearch, Map, Megaphone, FileEdit, Activity, Waves, Mountain, ShieldAlert, Handshake, LayoutGrid } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const topItems = [
    { id: 'profile', label: 'প্রোফাইল', icon: User },
    { id: 'laws', label: 'আইন ও বিধিমালা', icon: Gavel },
    { id: 'legal-assistance', label: 'আইনি সহায়তা', icon: Scale },
  ];

  const menuSections = [
    {
      title: 'প্রধান মেনু',
      items: [
        { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: LayoutDashboard },
      ]
    },
    {
      title: 'ভূমি রেকর্ড ও জরিপ অধিদপ্তর',
      items: [
        { id: 'khatian-automation', label: 'স্মার্ট রেকর্ড ও খতিয়ান', icon: FileText },
        { id: 'map', label: 'মৌজা ম্যাপ', icon: Map },
        { id: 'survey-history', label: 'বিভিন্ন জরীপ', icon: History },
        { id: 'mutation-correction', label: 'রেকর্ড সংশোধন', icon: FileEdit },
      ]
    },
    {
      title: 'ভূমি ব্যবস্থাপনা ও সেবা',
      items: [
        { id: 'mutation-menu', label: 'ই-নামজারি সেবা কেন্দ্র', icon: LayoutGrid },
        { id: 'mutation', label: 'নামজারি আবেদন', icon: FileEdit },
        { id: 'tracker', label: 'নামজারি ট্র্যাকার', icon: Activity },
        { id: 'services', label: 'অনলাইন সেবা পোর্টাল', icon: Globe },
        { id: 'registration', label: 'ভূমি রেজিস্ট্রেশন', icon: ScrollText },
        { id: 'deed-workflow', label: 'দলীল প্রসেসিং', icon: FileCheck },
        { id: 'verification', label: 'দলীল ভেরিফিকেশন', icon: FileCheck },
      ]
    },
    {
      title: 'বিশেষায়িত মডিউল',
      items: [
        { id: 'adr', label: 'বিকল্প বিরোধ নিষ্পত্তি', icon: Handshake },
        { id: 'master-calc', label: 'ভূমি ক্যালকুলেটর', icon: Calculator },
        { id: 'faraiz', label: 'উত্তরাধিকার হিসাব', icon: Scale },
      ]
    },
    {
      title: 'সরকারী সম্পত্তি ব্যবস্থাপনা',
      items: [
        { id: 'government', label: 'সরকারি সম্পত্তি', icon: Landmark },
        { id: 'forest', label: 'বনভূমি তথ্য', icon: Trees },
        { id: 'sairat-mahal', label: 'সায়রাত মহাল', icon: Droplets },
        { id: 'water', label: 'জলাভূমি রক্ষা', icon: Waves },
        { id: 'char', label: 'চর জমি ব্যবস্থাপনা', icon: Mountain },
        { id: 'waqf', label: 'ওয়াকফ এস্টেট', icon: Building2 },
        { id: 'land-bank', label: 'ল্যান্ডব্যাংক', icon: Building2 },
      ]
    },
    {
      title: 'অন্যান্য',
      items: [
        { id: 'valuation', label: 'জমি মূল্যায়ন', icon: TrendingUp },
        { id: 'classification', label: 'ভূমি শ্রেণীবিভাগ', icon: Landmark },
        { id: 'acquisition', label: 'ভূমি অধিগ্রহণ', icon: Briefcase },
        { id: 'acquisition-act', label: 'অধিগ্রহণ আইন ২০২৩', icon: Book },
        { id: 'misc-case', label: 'মিসকেস গাইড', icon: Gavel },
        { id: 'dispute', label: 'বিরোধ নিষ্পত্তি', icon: Scale },
        { id: 'dispute-complaint', label: 'বিরোধ অভিযোগ', icon: Gavel },
        { id: 'circulars', label: 'ভূমি তথ্য বাতায়ন', icon: ExternalLink },
        { id: 'haat-market-act', label: 'হাট-বাজার আইন ২০২৩', icon: Building2 },
        { id: 'ai-help', label: 'এআই ভূমি পরামর্শক', icon: MessageSquare },
        { id: 'doc-analyzer', label: 'এআই নথি বিশ্লেষক', icon: FileSearch },
        { id: 'pedia', label: 'ভূমি পিডিয়া', icon: BookOpen },
        { id: 'dictionary', label: 'ভূমি অভিধান', icon: Book },
        { id: 'history', label: 'আবেদনের ইতিহাস', icon: History },
        { id: 'awareness', label: 'সচেতনতা ও প্রচারণা', icon: Megaphone },
        { id: 'land-police', label: 'ল্যান্ড পুলিশ', icon: ShieldAlert },
        { id: 'about', label: 'আমাদের সম্পর্কে', icon: Info },
      ]
    }
  ];

  return (
    <div className="w-64 bg-emerald-900 text-white min-h-screen p-4 flex flex-col fixed left-0 top-0 hidden md:flex z-40 shadow-2xl print:hidden overflow-y-auto custom-scrollbar">
      <div className="flex items-center gap-3 mb-6 px-2 mt-4">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg shrink-0 ring-4 ring-emerald-800/30">
          <ShieldCheck className="text-emerald-900" size={24} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xs font-black leading-tight tracking-tight uppercase">বাংলাদেশ ডিজিটাল <br/> ভূমিসেবা</h1>
          <p className="text-[8px] text-emerald-300 font-bold mt-0.5 leading-tight">সবার আগে বাংলাদেশ - <br/>সবার জন্য ভূমি সেবা</p>
        </div>
      </div>

      {/* Top Quick Access Tabs */}
      <div className="grid grid-cols-3 gap-2 mb-6 px-1">
        {topItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all border border-emerald-800/50 group ${
              activeTab === item.id 
                ? 'bg-emerald-600 text-white shadow-lg border-emerald-500' 
                : 'bg-emerald-900/50 text-emerald-100 hover:bg-emerald-800'
            }`}
          >
            <item.icon size={18} className={`${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform mb-1`} />
            <span className="text-[9px] font-black text-center leading-tight">{item.label}</span>
          </button>
        ))}
      </div>

      <nav className="flex-1 space-y-6 pb-8">
        {menuSections.map((section, sIdx) => (
          <div key={sIdx} className="space-y-1">
            <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] px-4 mb-3 opacity-60">{section.title}</p>
            {section.items.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all relative group ${
                  activeTab === item.id 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-black/20 translate-x-1 border-b-2 border-dashed border-red-500' 
                    : 'text-emerald-100 hover:bg-emerald-800/50 hover:translate-x-1'
                }`}
              >
                <item.icon size={18} className={`${activeTab === item.id ? 'scale-110' : 'group-hover:scale-110'} transition-transform`} />
                <span className="text-sm font-bold tracking-wide">{item.label}</span>
                {activeTab === item.id && (
                  <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_8px_white]" />
                )}
              </button>
            ))}
          </div>
        ))}
      </nav>

      <div className="pt-4 border-t border-emerald-800/50 space-y-1 mb-4">
        <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] px-4 mb-3 opacity-60">অন্যান্য</p>
        <button className="w-full flex items-center gap-3 px-4 py-3 text-emerald-100 hover:bg-emerald-800 rounded-xl transition-all group">
          <Settings size={20} className="group-hover:rotate-45 transition-transform" />
          <span className="text-sm font-bold">সেটিংস</span>
        </button>
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-rose-300 hover:bg-rose-900/30 rounded-xl transition-all mt-2 group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">লগআউট</span>
        </button>
      </div>
      
      <div className="px-4 py-3 bg-emerald-950/50 rounded-2xl border border-emerald-800/50 mt-auto">
        <div className="flex items-center gap-3 mb-2">
           <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400">
             <HelpCircle size={16} />
           </div>
           <p className="text-[10px] font-black uppercase text-emerald-400">সহায়তা প্রয়োজন?</p>
        </div>
        <p className="text-[10px] text-emerald-100/60 font-medium leading-relaxed">যেকোনো সমস্যায় আমাদের হটলাইন ১৬১২২ এ কল করুন।</p>
      </div>
    </div>
  );
};

export default Sidebar;