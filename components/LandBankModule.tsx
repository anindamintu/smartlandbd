
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { 
  Building2, 
  Search, 
  MapPin, 
  TrendingUp, 
  ShieldCheck, 
  Info, 
  Download, 
  Filter,
  ChevronDown,
  Landmark,
  PieChart,
  ArrowRight,
  Briefcase,
  Globe,
  CheckCircle2,
  BarChart3,
  LayoutGrid,
  FileText,
  Activity,
  PlusCircle,
  Clock,
  Zap,
  ShieldAlert,
  Map as MapIcon,
  Layers,
  MousePointer2,
  Handshake,
  Database,
  Users,
  Sprout,
  Home,
  Wallet,
  Lock,
  Eye,
  FileSearch,
  History,
  Printer,
  RefreshCw,
  Droplets,
  Upload,
  Video,
  Bot,
  FilePlus,
  User,
  MapPin as MapPinIcon,
  FileCheck,
  Gavel,
  Scale,
  Coins,
  Hammer
} from 'lucide-react';

type LandType = 'Khas' | 'Vested' | 'Waqf' | 'Sairat' | 'Chandina Viti' | 'Fallow' | 'Expatriate' | 'Government';
type LandStatus = 'Idle' | 'Registered' | 'Leased' | 'In Dispute' | 'Productive';

interface LandParcel {
  id: string;
  parcelId: string;
  dagNo: string;
  khatianNo: string;
  mouza: string;
  upazila: string;
  district: string;
  area: string;
  type: LandType;
  status: LandStatus;
  owner: string;
  valuation: string;
  coordinates: string;
}

const mockLandBankData: LandParcel[] = [
  { id: '1', parcelId: 'LB-KH-001', dagNo: '১০১', khatianNo: '৫৬', mouza: 'তেঁতুলঝোড়া', upazila: 'সাভার', district: 'ঢাকা', area: '৫.৫০ একর', type: 'Khas', status: 'Idle', owner: 'গণপ্রজাতন্ত্রী বাংলাদেশ সরকার', valuation: '৫০ কোটি', coordinates: '23.8583° N, 90.2667° E' },
  { id: '2', parcelId: 'LB-EX-045', dagNo: '৫৬৭', khatianNo: '১২৩', mouza: 'ইছাখালী', upazila: 'মিরসরাই', district: 'চট্টগ্রাম', area: '২.০০ একর', type: 'Expatriate', status: 'Registered', owner: 'আব্দুর রহিম (প্রবাসী)', valuation: '১০ কোটি', coordinates: '22.7711° N, 91.5753° E' },
  { id: '3', parcelId: 'LB-VQ-012', dagNo: '৮৯০', khatianNo: '৪৫', mouza: 'মাইজগাঁও', upazila: 'ফেঞ্চুগঞ্জ', district: 'সিলেট', area: '১০.৫০ একর', type: 'Waqf', status: 'Leased', owner: 'মাইজগাঁও ওয়াকফ এস্টেট', valuation: '১৫ কোটি', coordinates: '24.7083° N, 91.9417° E' },
  { id: '4', parcelId: 'LB-FL-089', dagNo: '৪৫৬', khatianNo: '৭৮', mouza: 'চন্দ্রা', upazila: 'কালিয়াকৈর', district: 'গাজীপুর', area: '২০.০০ একর', type: 'Fallow', status: 'Productive', owner: 'স্থানীয় সমবায় সমিতি', valuation: '৫ কোটি', coordinates: '24.0722° N, 90.2333° E' },
  { id: '5', parcelId: 'LB-GV-023', dagNo: '১২৩', khatianNo: '৯০', mouza: 'দিগরাজ', upazila: 'মোংলা', district: 'খুলনা', area: '৫০.০০ একর', type: 'Government', status: 'Idle', owner: 'বাংলাদেশ রেলওয়ে', valuation: '১০০ কোটি', coordinates: '22.4833° N, 89.6000° E' },
];

const valuationData = [
  { month: 'Jan', value: 400 },
  { month: 'Feb', value: 450 },
  { month: 'Mar', value: 420 },
  { month: 'Apr', value: 500 },
  { month: 'May', value: 580 },
  { month: 'Jun', value: 620 },
  { month: 'Jul', value: 700 },
];

const productionData = [
  { category: 'ধান', value: 45, color: '#10b981' },
  { category: 'সবজি', value: 25, color: '#3b82f6' },
  { category: 'মৎস্য', value: 20, color: '#f59e0b' },
  { category: 'অন্যান্য', value: 10, color: '#6366f1' },
];

const LandBankModule: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inventory' | 'map' | 'deposit' | 'lease' | 'revenue' | 'expat' | 'registration' | 'verification' | 'acquisition'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<LandType | 'All'>('All');
  const [isExporting, setIsExporting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'error'>('idle');
  const [mapMode, setMapMode] = useState<'standard' | 'satellite' | 'heatmap'>('standard');
  const [zoomLevel, setZoomLevel] = useState(100);
  const [regStep, setRegStep] = useState(1);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');

  const handleSync = () => {
    setIsSyncing(true);
    setSyncStatus('syncing');
    
    // Simulate API call to central database
    setTimeout(() => {
      setSyncStatus('success');
      setIsSyncing(false);
      
      // Reset status after 3 seconds
      setTimeout(() => setSyncStatus('idle'), 3000);
    }, 2500);
  };

  const handleExportPDF = () => {
    setIsExporting(true);
    setTimeout(() => {
      window.print();
      setIsExporting(false);
    }, 100);
  };

  const filteredData = useMemo(() => {
    return mockLandBankData.filter(item => {
      const matchesSearch = !searchQuery || 
        item.parcelId.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.mouza.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.dagNo.includes(searchQuery);
      const matchesType = selectedType === 'All' || item.type === selectedType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, selectedType]);

  const renderMap = () => (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        <div className="flex-1 relative w-full">
          <input 
            type="text" 
            placeholder="মৌজা বা দাগ নম্বর দিয়ে ম্যাপে খুঁজুন..."
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setMapMode('standard')}
            className={`px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all ${mapMode === 'standard' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-600'}`}
          >
            <Layers size={16} /> স্ট্যান্ডার্ড
          </button>
          <button 
            onClick={() => setMapMode('satellite')}
            className={`px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all ${mapMode === 'satellite' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-600'}`}
          >
            <Globe size={16} /> স্যাটেলাইট
          </button>
          <button 
            onClick={() => setMapMode('heatmap')}
            className={`px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all ${mapMode === 'heatmap' ? 'bg-emerald-600 text-white shadow-lg' : 'bg-white border border-gray-200 text-gray-600'}`}
          >
            <Activity size={16} /> হিটম্যাপ
          </button>
        </div>
      </div>

      <div className="relative h-[600px] bg-emerald-50 rounded-[3.5rem] overflow-hidden border-4 border-white shadow-2xl group">
        {/* Simulated Map Background */}
        {mapMode === 'satellite' ? (
          <img 
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2000&auto=format&fit=crop" 
            alt="Satellite View" 
            className="absolute inset-0 w-full h-full object-cover brightness-[0.6] contrast-[1.2]"
            referrerPolicy="no-referrer"
          />
        ) : mapMode === 'heatmap' ? (
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950">
            <div className="absolute inset-0 opacity-40 blur-[100px]" style={{ background: 'radial-gradient(circle at 30% 40%, #fbbf24 0%, transparent 50%), radial-gradient(circle at 70% 60%, #ef4444 0%, transparent 50%)' }} />
          </div>
        ) : (
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        )}
        
        {/* Simulated Parcels */}
        <div className="absolute inset-0 p-12 transition-transform duration-500" style={{ transform: `scale(${zoomLevel/100})` }}>
          <div className="relative w-full h-full">
            {mockLandBankData.map((parcel, i) => (
              <div 
                key={parcel.id}
                className="absolute cursor-pointer group/parcel"
                style={{ 
                  left: `${20 + (i * 15)}%`, 
                  top: `${30 + (i * 10)}%`,
                  width: '120px',
                  height: '100px',
                  transform: `rotate(${i * 15}deg)`
                }}
              >
                <div className={`w-full h-full border-2 transition-all duration-500 ${
                  mapMode === 'heatmap' ? 'bg-amber-500/40 border-amber-400 animate-pulse' :
                  parcel.status === 'Idle' ? 'bg-gray-200/40 border-gray-400' :
                  parcel.status === 'Leased' ? 'bg-emerald-200/40 border-emerald-500' :
                  'bg-blue-200/40 border-blue-500'
                } hover:bg-opacity-80 hover:scale-110 rounded-lg flex items-center justify-center shadow-lg backdrop-blur-sm`}>
                  <span className={`text-[8px] font-black rotate-[-15deg] ${mapMode === 'satellite' ? 'text-white' : 'text-gray-700'}`}>{parcel.dagNo}</span>
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 w-56 bg-white p-5 rounded-[2rem] shadow-2xl opacity-0 group-hover/parcel:opacity-100 transition-all pointer-events-none z-50 border border-gray-100 scale-95 group-hover/parcel:scale-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[8px] font-black uppercase tracking-widest">{parcel.type}</span>
                    <span className="text-[8px] font-black text-gray-400">ID: {parcel.parcelId}</span>
                  </div>
                  <p className="text-sm font-black text-gray-800 mb-1">{parcel.mouza}</p>
                  <p className="text-[10px] text-gray-500 font-bold mb-4">{parcel.upazila}, {parcel.district}</p>
                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-gray-50">
                    <div className="text-center">
                      <p className="text-[8px] font-black text-gray-400 uppercase">দাগ</p>
                      <p className="text-[10px] font-black text-gray-800">{parcel.dagNo}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[8px] font-black text-gray-400 uppercase">আয়তন</p>
                      <p className="text-[10px] font-black text-emerald-600">{parcel.area}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-2">
          <button onClick={() => setZoomLevel(prev => Math.min(prev + 20, 200))} className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-all font-black text-xl">+</button>
          <button onClick={() => setZoomLevel(prev => Math.max(prev - 20, 50))} className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-800 hover:bg-gray-50 transition-all font-black text-xl">-</button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md p-6 rounded-[2.5rem] shadow-2xl border border-white/20 space-y-3">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ম্যাপ লেজেন্ড</p>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-gray-400 rounded-full" />
            <span className="text-[10px] font-bold text-gray-700">অব্যবহৃত (Idle)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full" />
            <span className="text-[10px] font-bold text-gray-700">লিজকৃত (Leased)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-blue-500 rounded-full" />
            <span className="text-[10px] font-bold text-gray-700">উৎপাদনমুখী (Productive)</span>
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-2">
          <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-all">+</button>
          <button className="w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-gray-600 hover:text-emerald-600 transition-all">-</button>
          <button className="w-12 h-12 bg-emerald-600 rounded-2xl shadow-xl flex items-center justify-center text-white hover:bg-emerald-700 transition-all">
            <MapPin size={20} />
          </button>
        </div>

        {/* Legend */}
        <div className="absolute top-8 left-8 bg-white/80 backdrop-blur-md p-6 rounded-[2rem] border border-white/20 shadow-xl space-y-3">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">ম্যাপ লিজেন্ড</p>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-gray-200 border border-gray-400 rounded" />
            <span className="text-[10px] font-bold text-gray-700">অব্যবহৃত (Idle)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-emerald-200 border border-emerald-500 rounded" />
            <span className="text-[10px] font-bold text-gray-700">লিজকৃত (Leased)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-blue-200 border border-blue-500 rounded" />
            <span className="text-[10px] font-bold text-gray-700">উৎপাদনমুখী (Productive)</span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      {/* Sync Status Bar */}
      <div className="bg-white px-8 py-4 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between print:hidden">
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${syncStatus === 'success' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
          <p className="text-xs font-black text-gray-500 uppercase tracking-widest">
            সেন্ট্রাল ডাটাবেজ স্ট্যাটাস: <span className={syncStatus === 'success' ? 'text-emerald-600' : 'text-amber-600'}>
              {syncStatus === 'success' ? 'সংযুক্ত ও আপ-টু-ডেট' : 'সিঙ্ক্রোনাইজেশন প্রয়োজন'}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-6">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">সর্বশেষ সিঙ্ক: ৫ মার্চ, ২০২৬ | ০৭:০৯ AM</p>
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest hover:text-blue-700 transition-all disabled:opacity-50"
          >
            <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
            এখনই সিঙ্ক করুন
          </button>
        </div>
      </div>

      {/* Hero Section & Stats Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Hero Card */}
        <div className="lg:col-span-2 relative h-[450px] rounded-[3.5rem] overflow-hidden shadow-2xl group">
          <img 
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" 
            alt="Land Bank" 
            className="w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-transform duration-1000" 
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 flex flex-col items-start justify-end p-12 text-left">
            <div className="bg-emerald-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
              <Zap size={16} className="text-emerald-300 animate-pulse" />
              <span className="text-white text-[10px] font-black uppercase tracking-[0.2em]">AI-Powered Insights Active</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-[0.9]">পতিত জমিকে <br/>সম্পদে রূপান্তর</h2>
            <p className="text-emerald-100 max-w-xl text-lg font-medium leading-relaxed opacity-90 mb-8">
              দেশের অব্যবহৃত, খাস এবং প্রবাসীদের পরিত্যক্ত জমি শনাক্ত করে উৎপাদনমুখী ব্যবহারের ডিজিটাল প্ল্যাটফর্ম।
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setActiveTab('deposit')} className="px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-emerald-600 transition-all shadow-xl flex items-center gap-2">
                জমি জমা দিন <PlusCircle size={18} />
              </button>
              <button onClick={() => setActiveTab('inventory')} className="px-8 py-4 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2">
                ইনভেন্টরি দেখুন <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Bento Column */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Database size={24} />
              </div>
              <span className="text-[10px] font-black text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">+১২% বৃদ্ধি</span>
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">মোট নিবন্ধিত জমি</p>
              <p className="text-4xl font-black text-gray-800 tracking-tighter">১২,৪৫০ <span className="text-lg text-gray-400">একর</span></p>
            </div>
          </div>

          <div className="bg-gray-900 p-8 rounded-[3rem] shadow-2xl group flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/10 text-emerald-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp size={24} />
                </div>
              </div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">বর্তমান বাজার মূল্য</p>
              <p className="text-4xl font-black text-white tracking-tighter">৳ ২,৪৫০ <span className="text-lg text-gray-500">কোটি</span></p>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-24 opacity-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={valuationData}>
                  <Area type="monotone" dataKey="value" stroke="#10b981" fill="#10b981" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-emerald-600 p-8 rounded-[3rem] shadow-xl group flex flex-col justify-between text-white">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                <Sprout size={24} />
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest mb-1">উৎপাদনমুখী জমি</p>
              <p className="text-4xl font-black tracking-tighter">৪,২০০ <span className="text-lg text-emerald-200">একর</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Smart AI Insights & Market Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Recommendations */}
        <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-indigo-600 rounded-full" />
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">স্মার্ট এআই ইনসাইটস</h3>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black text-indigo-600 uppercase tracking-widest">
              <Activity size={14} /> রিয়েল-টাইম এনালাইসিস
            </div>
          </div>
          <div className="space-y-4">
            {[
              { title: 'সৌর বিদ্যুৎ প্রকল্পের সম্ভাবনা', desc: 'সাভার এলাকার ২৩০ একর পতিত জমি সৌর বিদ্যুৎ উৎপাদনের জন্য ৯২% উপযুক্ত।', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
              { title: 'মৎস্য চাষের সুযোগ', desc: 'সিলেট অঞ্চলের জলাভূমিগুলোতে আধুনিক মৎস্য চাষের মাধ্যমে উৎপাদন ২০% বৃদ্ধি করা সম্ভব।', icon: Droplets, color: 'text-blue-600', bg: 'bg-blue-50' },
              { title: 'অর্গানিক ফার্মিং হাব', desc: 'গাজীপুর চন্দ্রা মৌজার জমিগুলো অর্গানিক সবজি চাষের জন্য আদর্শ হিসেবে চিহ্নিত হয়েছে।', icon: Sprout, color: 'text-emerald-600', bg: 'bg-emerald-50' }
            ].map((insight, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-indigo-100 transition-all flex items-start gap-5 group cursor-pointer">
                <div className={`w-12 h-12 ${insight.bg} ${insight.color} rounded-2xl flex items-center justify-center shrink-0 shadow-sm group-hover:scale-110 transition-transform`}>
                  <insight.icon size={24} />
                </div>
                <div className="space-y-1">
                  <h4 className="font-black text-gray-800">{insight.title}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{insight.desc}</p>
                </div>
                <ArrowRight size={18} className="text-gray-300 ml-auto group-hover:text-indigo-600 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Market Trends Chart */}
        <div className="bg-gray-900 p-10 rounded-[3.5rem] shadow-2xl text-white space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-emerald-500 rounded-full" />
              <h3 className="text-2xl font-black tracking-tight">ভূমি মূল্য ও বিনিয়োগ প্রবণতা</h3>
            </div>
            <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase tracking-widest outline-none">
              <option>গত ৬ মাস</option>
              <option>গত ১ বছর</option>
            </select>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={valuationData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="month" stroke="#ffffff40" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                <YAxis stroke="#ffffff40" fontSize={10} fontWeight="bold" axisLine={false} tickLine={false} />
                <RechartsTooltip 
                  contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '1rem' }}
                  itemStyle={{ color: '#10b981', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
            <div className="text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">বিনিয়োগ বৃদ্ধি</p>
              <p className="text-xl font-black text-emerald-400">+২৪%</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">নতুন প্রকল্প</p>
              <p className="text-xl font-black text-blue-400">৪৫ টি</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">সফলতা হার</p>
              <p className="text-xl font-black text-amber-400">৯৮%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Production Distribution Bento */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-emerald-600 rounded-full" />
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">উৎপাদন বণ্টন</h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={productionData} layout="vertical">
                <XAxis type="number" hide />
                <YAxis dataKey="category" type="category" stroke="#6b7280" fontSize={12} fontWeight="bold" axisLine={false} tickLine={false} width={60} />
                <RechartsTooltip cursor={{fill: 'transparent'}} />
                <Bar dataKey="value" radius={[0, 10, 10, 0]} barSize={20}>
                  {productionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-3">
            {productionData.map((item, i) => (
              <div key={i} className="flex items-center justify-between text-xs font-bold">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.category}</span>
                </div>
                <span className="text-gray-800">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-gray-900 rounded-[3.5rem] p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl font-black tracking-tight">ভূমি ব্যবহার ও উৎপাদন পর্যবেক্ষণ</h3>
              <p className="text-gray-400 font-medium leading-relaxed">
                ল্যান্ড ব্যাংকের মাধ্যমে বরাদ্দকৃত জমির ব্যবহার রিয়েল-টাইমে পর্যবেক্ষণ করা হয়। এতে কৃষি উৎপাদন বৃদ্ধি এবং ভূমির সুষম ব্যবহার নিশ্চিত হয়।
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">কৃষি উৎপাদন</p>
                  <p className="text-2xl font-black">৬৫%</p>
                </div>
                <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">আবাসন/শিল্প</p>
                  <p className="text-2xl font-black">২৫%</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-64 h-64 rounded-full border-[20px] border-emerald-500/20 border-t-emerald-500 flex items-center justify-center relative">
                <div className="text-center">
                  <p className="text-4xl font-black">৯০%</p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">সফল ব্যবহার</p>
                </div>
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center">
                  <Activity size={16} className="text-emerald-600" />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-600/10 rounded-full blur-[120px] -mr-48 -mb-48" />
        </div>
      </div>

      {/* Quick Inventory Access */}
      <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-emerald-600 rounded-full" />
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">সাম্প্রতিক ভূমি ইনভেন্টরি</h3>
          </div>
          <button onClick={() => setActiveTab('inventory')} className="text-emerald-600 font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
            সবগুলো দেখুন <ArrowRight size={16} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockLandBankData.slice(0, 3).map((parcel) => (
            <div key={parcel.id} className="p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-emerald-200 transition-all group cursor-pointer" onClick={() => setActiveTab('inventory')}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <MapPin size={24} className="text-emerald-600" />
                </div>
                <div>
                  <h4 className="font-black text-gray-800">{parcel.mouza}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{parcel.parcelId}</p>
                </div>
              </div>
              <div className="flex justify-between text-xs font-bold text-gray-500">
                <span>দাগ: {parcel.dagNo}</span>
                <span>আয়তন: {parcel.area}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderInventory = () => (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
      <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex flex-col md:flex-row gap-6 items-center">
        <div className="flex-1 relative w-full">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="দাগ, খতিয়ান বা মৌজা দিয়ে খুঁজুন..."
            className="w-full pl-14 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700"
          />
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
          {['All', 'Khas', 'Vested', 'Waqf', 'Expatriate', 'Fallow'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type as any)}
              className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all ${
                selectedType === type ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {type === 'All' ? 'সবগুলো' : type}
            </button>
          ))}
          <button 
            onClick={handleSync}
            disabled={isSyncing}
            className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap transition-all flex items-center gap-2 border print:hidden ${
              syncStatus === 'success' ? 'bg-emerald-500 text-white border-emerald-500' :
              syncStatus === 'syncing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
              'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100'
            }`}
          >
            <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
            {syncStatus === 'syncing' ? 'সিঙ্ক্রোনাইজ হচ্ছে...' : 
             syncStatus === 'success' ? 'সফলভাবে সিঙ্ক হয়েছে' : 
             'সেন্ট্রাল ডাটাবেজ সিঙ্ক'}
          </button>
          <button 
            onClick={handleExportPDF}
            className="px-6 py-3 bg-emerald-50 text-emerald-600 rounded-xl font-black text-[10px] uppercase tracking-widest whitespace-nowrap hover:bg-emerald-100 transition-all flex items-center gap-2 border border-emerald-100 print:hidden"
          >
            <Download size={14} /> পিডিএফ এক্সপোর্ট
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {filteredData.map((parcel) => (
          <div key={parcel.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-48 h-36 bg-gray-100 rounded-2xl overflow-hidden relative shrink-0">
                <img 
                  src={`https://picsum.photos/seed/${parcel.parcelId}/300/200`} 
                  alt="Land" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg text-[8px] font-black text-blue-600">
                  {parcel.parcelId}
                </div>
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-black text-gray-800">{parcel.mouza}, {parcel.upazila}</h3>
                    <p className="text-xs text-gray-500 font-bold">{parcel.district} | {parcel.area}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                    parcel.status === 'Idle' ? 'bg-gray-100 text-gray-600' : 
                    parcel.status === 'Leased' ? 'bg-emerald-100 text-emerald-700' : 
                    parcel.status === 'Productive' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                  }`}>
                    {parcel.status}
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-gray-50">
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">দাগ নম্বর</p>
                    <p className="text-sm font-black text-gray-800">{parcel.dagNo}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">খতিয়ান</p>
                    <p className="text-sm font-black text-gray-800">{parcel.khatianNo}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">জমির ধরণ</p>
                    <p className="text-sm font-black text-blue-600">{parcel.type}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">মালিকানা</p>
                    <p className="text-[10px] font-bold text-gray-600 truncate">{parcel.owner}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all">বিস্তারিত দেখুন</button>
                  <button className="flex-1 py-3 bg-gray-50 text-gray-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">ম্যাপে দেখুন</button>
                  <button 
                    onClick={handleSync}
                    disabled={isSyncing}
                    className="p-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-all border border-amber-100 print:hidden"
                    title="রেকর্ড সিঙ্ক করুন"
                  >
                    <RefreshCw size={18} className={isSyncing ? 'animate-spin' : ''} />
                  </button>
                  <button 
                    onClick={handleExportPDF}
                    className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all border border-emerald-100 print:hidden"
                    title="পিডিএফ ডাউনলোড"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderDeposit = () => (
    <div className="max-w-4xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner mb-6">
          <PlusCircle size={40} />
        </div>
        <h2 className="text-4xl font-black text-gray-800 tracking-tight">জমি ডিপোজিট করুন</h2>
        <p className="text-gray-500 font-medium text-lg">আপনার অব্যবহৃত জমি ল্যান্ড ব্যাংকে জমা দিয়ে নিরাপত্তা ও আয় নিশ্চিত করুন।</p>
      </div>

      <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মালিকের নাম</label>
            <input type="text" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="আপনার নাম লিখুন" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মোবাইল নম্বর</label>
            <input type="tel" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="০১৮XXXXXXXX" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">দাগ নম্বর</label>
            <input type="text" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="জমির দাগ নম্বর" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">খতিয়ান নম্বর</label>
            <input type="text" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="জমির খতিয়ান নম্বর" />
          </div>
        </div>
        
        {/* Smart Document Upload */}
        <div className="space-y-4">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">দলিল বা পর্চা আপলোড (AI স্ক্যানিং)</label>
          <div className="border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center hover:border-emerald-500 transition-all group cursor-pointer bg-gray-50/50">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="text-emerald-600" size={32} />
            </div>
            <p className="text-sm font-black text-gray-700 mb-1">দলিল বা পর্চার ছবি এখানে ড্র্যাগ করুন</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">সর্বোচ্চ ১০ মেগাবাইট (PDF, JPG, PNG)</p>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">জমির বিবরণ ও বর্তমান অবস্থা</label>
          <textarea rows={4} className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 resize-none" placeholder="জমিটি বর্তমানে কী অবস্থায় আছে তা লিখুন..." />
        </div>
        <button className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-3">
          আবেদন দাখিল করুন <ArrowRight size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'নিরাপত্তা', desc: 'জমির ডিজিটাল রেকর্ড ও সীমানা সুরক্ষা।', icon: Lock },
          { title: 'ব্যবস্থাপনা', desc: 'চুক্তিভিত্তিক লিজ ও তদারকি।', icon: Briefcase },
          { title: 'আয় বণ্টন', desc: 'উৎপাদন থেকে লভ্যাংশ প্রাপ্তি।', icon: Wallet }
        ].map((item, i) => (
          <div key={i} className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <item.icon size={24} />
            </div>
            <h4 className="font-black text-gray-800">{item.title}</h4>
            <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVerification = () => (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner mb-6">
          <ShieldCheck size={40} />
        </div>
        <h2 className="text-4xl font-black text-gray-800 tracking-tight">দলিল যাচাইকরণ</h2>
        <p className="text-gray-500 font-medium text-lg">আপনার দলিলের সত্যতা ও বৈধতা অনলাইনে যাচাই করুন।</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Manual Entry */}
        <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <FileSearch size={20} />
            </div>
            <h3 className="text-xl font-black text-gray-800">তথ্য দিয়ে যাচাই</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">দলিল নম্বর</label>
              <input type="text" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="দলিল নম্বর লিখুন" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">সাব-রেজিস্ট্রি অফিস</label>
              <select className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700">
                <option>সাভার সাব-রেজিস্ট্রি অফিস</option>
                <option>গুলশান সাব-রেজিস্ট্রি অফিস</option>
                <option>উত্তরা সাব-রেজিস্ট্রি অফিস</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">রেজিস্ট্রেশনের বছর</label>
              <input type="number" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="যেমন: ২০২৪" />
            </div>
          </div>
          <button 
            onClick={() => {
              setVerificationStatus('verifying');
              setTimeout(() => setVerificationStatus('verified'), 2000);
            }}
            className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-3"
          >
            যাচাই করুন <ArrowRight size={20} />
          </button>
        </div>

        {/* Document Upload */}
        <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl space-y-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
              <Upload size={20} />
            </div>
            <h3 className="text-xl font-black text-gray-800">দলিল আপলোড</h3>
          </div>
          <div className="border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center hover:border-emerald-500 transition-all group cursor-pointer bg-gray-50/50 h-[280px] flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
              <Upload className="text-emerald-600" size={32} />
            </div>
            <p className="text-sm font-black text-gray-700 mb-1">দলিলের স্ক্যান কপি এখানে ড্র্যাগ করুন</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">AI স্বয়ংক্রিয়ভাবে তথ্য সংগ্রহ করবে</p>
          </div>
          <button 
            onClick={() => {
              setVerificationStatus('verifying');
              setTimeout(() => setVerificationStatus('verified'), 2000);
            }}
            className="w-full py-5 bg-gray-800 text-white rounded-2xl font-black hover:bg-gray-900 transition-all shadow-xl flex items-center justify-center gap-3"
          >
            স্ক্যান ও যাচাই <RefreshCw size={20} />
          </button>
        </div>
      </div>

      {/* Verification Result */}
      {verificationStatus !== 'idle' && (
        <div className={`p-10 rounded-[3.5rem] border-4 animate-in zoom-in duration-500 ${
          verificationStatus === 'verifying' ? 'bg-gray-50 border-gray-200' :
          verificationStatus === 'verified' ? 'bg-emerald-50 border-emerald-200' :
          'bg-red-50 border-red-200'
        }`}>
          {verificationStatus === 'verifying' ? (
            <div className="flex flex-col items-center text-center space-y-4">
              <RefreshCw size={48} className="text-emerald-600 animate-spin" />
              <h3 className="text-2xl font-black text-gray-800">যাচাই করা হচ্ছে...</h3>
              <p className="text-gray-500 font-medium">সেন্ট্রাল ডাটাবেজের সাথে তথ্য মিলিয়ে দেখা হচ্ছে। অনুগ্রহ করে অপেক্ষা করুন।</p>
            </div>
          ) : verificationStatus === 'verified' ? (
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0 shadow-lg">
                <CheckCircle2 size={48} />
              </div>
              <div className="space-y-4 flex-1">
                <div>
                  <h3 className="text-2xl font-black text-gray-800 mb-1">দলিলটি বৈধ ও সঠিক!</h3>
                  <p className="text-emerald-700 font-bold">এই দলিলের সকল তথ্য সরকারি রেকর্ড রুমের সাথে মিলেছে।</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-white rounded-2xl border border-emerald-100">
                    <p className="text-[8px] font-black text-gray-400 uppercase">মালিক</p>
                    <p className="text-xs font-black text-gray-800">আব্দুর রহমান</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-emerald-100">
                    <p className="text-[8px] font-black text-gray-400 uppercase">ভলিউম</p>
                    <p className="text-xs font-black text-gray-800">১২-এ</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-emerald-100">
                    <p className="text-[8px] font-black text-gray-400 uppercase">পৃষ্ঠা</p>
                    <p className="text-xs font-black text-gray-800">৪৫-৪৮</p>
                  </div>
                  <div className="p-4 bg-white rounded-2xl border border-emerald-100">
                    <p className="text-[8px] font-black text-gray-400 uppercase">তারিখ</p>
                    <p className="text-xs font-black text-gray-800">১০/০৫/২০২৪</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="w-24 h-24 bg-red-100 text-red-600 rounded-full flex items-center justify-center shrink-0 shadow-lg">
                <ShieldAlert size={48} />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-black text-gray-800">তথ্য পাওয়া যায়নি!</h3>
                <p className="text-red-700 font-bold">প্রদত্ত তথ্যের সাথে কোনো দলিলের মিল পাওয়া যায়নি। অনুগ্রহ করে সঠিক তথ্য প্রদান করুন।</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="bg-indigo-50 p-8 rounded-[2.5rem] border border-indigo-100 flex items-start gap-4">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center shrink-0">
          <Info size={24} />
        </div>
        <div>
          <h4 className="font-black text-indigo-800 mb-1">দলিল জাল কি না বুঝবেন কীভাবে?</h4>
          <p className="text-sm text-indigo-700 font-medium leading-relaxed">
            দলিলের স্বাক্ষর, স্ট্যাম্প ডিউটি, এবং বায়া দলিল যাচাই করা অত্যন্ত জরুরি। আমাদের এই সিস্টেমটি সরাসরি সাব-রেজিস্ট্রি অফিসের ডিজিটাল রেকর্ডের সাথে সংযুক্ত।
          </p>
        </div>
      </div>
    </div>
  );

  const renderRegistration = () => (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner mb-6">
          <FilePlus size={40} />
        </div>
        <h2 className="text-4xl font-black text-gray-800 tracking-tight">অনলাইন ভূমি নিবন্ধন</h2>
        <p className="text-gray-500 font-medium text-lg">আপনার জমির মালিকানা ডিজিটাল পদ্ধতিতে নিবন্ধন করুন।</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-4 mb-12">
        {[
          { step: 1, label: 'মালিকের তথ্য', icon: User },
          { step: 2, label: 'জমির বিবরণ', icon: MapPinIcon },
          { step: 3, label: 'দলিল আপলোড', icon: Upload }
        ].map((s) => (
          <React.Fragment key={s.step}>
            <div className="flex flex-col items-center gap-2">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${regStep >= s.step ? 'bg-emerald-600 text-white shadow-lg' : 'bg-gray-100 text-gray-400'}`}>
                <s.icon size={20} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${regStep >= s.step ? 'text-emerald-600' : 'text-gray-400'}`}>{s.label}</span>
            </div>
            {s.step < 3 && <div className={`w-20 h-1 rounded-full ${regStep > s.step ? 'bg-emerald-600' : 'bg-gray-100'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl">
        {regStep === 1 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মালিকের পূর্ণ নাম</label>
                <input type="text" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="যেমন: মোঃ আব্দুর রহমান" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">পিতা/স্বামীর নাম</label>
                <input type="text" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="পিতা বা স্বামীর নাম লিখুন" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">জাতীয় পরিচয়পত্র (NID)</label>
                <input type="text" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="১০ বা ১৭ ডিজিটের নম্বর" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মোবাইল নম্বর</label>
                <input type="tel" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="০১৮XXXXXXXX" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">স্থায়ী ঠিকানা</label>
              <textarea rows={3} className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 resize-none" placeholder="আপনার পূর্ণ ঠিকানা লিখুন..." />
            </div>
            <button onClick={() => setRegStep(2)} className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-3">
              পরবর্তী ধাপ <ArrowRight size={20} />
            </button>
          </div>
        )}

        {regStep === 2 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">জেলা</label>
                <select className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700">
                  <option>ঢাকা</option>
                  <option>চট্টগ্রাম</option>
                  <option>রাজশাহী</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">উপজেলা</label>
                <input type="text" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="উপজেলার নাম" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মৌজা</label>
                <input type="text" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="মৌজার নাম" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">খতিয়ান নম্বর</label>
                <input type="text" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="খতিয়ান নম্বর" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">দাগ নম্বর</label>
                <input type="text" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="দাগ নম্বর" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">জমির আয়তন (শতাংশ)</label>
                <input type="number" className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700" placeholder="আয়তন লিখুন" />
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setRegStep(1)} className="flex-1 py-5 bg-gray-100 text-gray-600 rounded-2xl font-black hover:bg-gray-200 transition-all">পূর্ববর্তী ধাপ</button>
              <button onClick={() => setRegStep(3)} className="flex-[2] py-5 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-3">
                পরবর্তী ধাপ <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {regStep === 3 && (
          <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মূল দলিল (স্ক্যান কপি)</label>
                <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center hover:border-emerald-500 transition-all group cursor-pointer bg-gray-50/50">
                  <Upload className="text-emerald-600 mx-auto mb-2" size={24} />
                  <p className="text-[10px] font-black text-gray-700">দলিল আপলোড করুন</p>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">খতিয়ান/পর্চা</label>
                <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center hover:border-emerald-500 transition-all group cursor-pointer bg-gray-50/50">
                  <Upload className="text-emerald-600 mx-auto mb-2" size={24} />
                  <p className="text-[10px] font-black text-gray-700">পর্চা আপলোড করুন</p>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মালিকের NID কপি</label>
                <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center hover:border-emerald-500 transition-all group cursor-pointer bg-gray-50/50">
                  <Upload className="text-emerald-600 mx-auto mb-2" size={24} />
                  <p className="text-[10px] font-black text-gray-700">NID আপলোড করুন</p>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">পাসপোর্ট সাইজ ছবি</label>
                <div className="border-2 border-dashed border-gray-200 rounded-3xl p-8 text-center hover:border-emerald-500 transition-all group cursor-pointer bg-gray-50/50">
                  <Upload className="text-emerald-600 mx-auto mb-2" size={24} />
                  <p className="text-[10px] font-black text-gray-700">ছবি আপলোড করুন</p>
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setRegStep(2)} className="flex-1 py-5 bg-gray-100 text-gray-600 rounded-2xl font-black hover:bg-gray-200 transition-all">পূর্ববর্তী ধাপ</button>
              <button onClick={() => {
                alert('আপনার ভূমি নিবন্ধনের আবেদনটি সফলভাবে গৃহীত হয়েছে। ট্র্যাকিং আইডি: REG-2026-X92');
                setActiveTab('dashboard');
                setRegStep(1);
              }} className="flex-[2] py-5 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-3">
                নিবন্ধন সম্পন্ন করুন <FileCheck size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-amber-50 p-8 rounded-[2.5rem] border border-amber-100 flex items-start gap-4">
        <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
          <Info size={24} />
        </div>
        <div>
          <h4 className="font-black text-amber-800 mb-1">গুরুত্বপূর্ণ তথ্য</h4>
          <p className="text-sm text-amber-700 font-medium leading-relaxed">
            নিবন্ধন প্রক্রিয়া সম্পন্ন হওয়ার পর আপনার আবেদনটি সংশ্লিষ্ট ভূমি অফিস কর্তৃক যাচাই করা হবে। যাচাই শেষে আপনি একটি ডিজিটাল নিবন্ধন সনদ (e-Certificate) পাবেন।
          </p>
        </div>
      </div>
    </div>
  );

  const renderAcquisition = () => (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-[2.5rem] flex items-center justify-center mx-auto shadow-inner mb-6">
          <Gavel size={40} />
        </div>
        <h2 className="text-4xl font-black text-gray-800 tracking-tight">ভূমি অধিগ্রহণ আইন, ২০২৩</h2>
        <p className="text-gray-500 font-medium text-lg">অধিগ্রহণ প্রক্রিয়া, ক্ষতিপূরণ এবং আপিল সংক্রান্ত বিস্তারিত তথ্য।</p>
      </div>

      {/* Key Provisions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'অধিগ্রহণের উদ্দেশ্য', desc: 'জনস্বার্থে বা সরকারি প্রয়োজনে ভূমি অধিগ্রহণ করা হয়।', icon: ShieldCheck, color: 'emerald' },
          { title: 'নোটিশ জারি', desc: 'অধিগ্রহণের পূর্বে ধারা ৪ অনুযায়ী নোটিশ প্রদান বাধ্যতামূলক।', icon: FileText, color: 'blue' },
          { title: 'যৌথ তদন্ত', desc: 'জমির বর্তমান অবস্থা ও অবকাঠামো যাচাইয়ের জন্য যৌথ তদন্ত।', icon: Search, color: 'indigo' }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
            <div className={`w-12 h-12 bg-${item.color}-50 text-${item.color}-600 rounded-2xl flex items-center justify-center mb-6`}>
              <item.icon size={24} />
            </div>
            <h4 className="text-lg font-black text-gray-800 mb-2">{item.title}</h4>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Compensation Calculation */}
      <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
            <Coins size={24} />
          </div>
          <h3 className="text-2xl font-black text-gray-800 tracking-tight">ক্ষতিপূরণ নির্ধারণ পদ্ধতি</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="p-6 bg-emerald-50/50 rounded-3xl border border-emerald-100">
              <h5 className="font-black text-emerald-800 mb-2">স্থাবর সম্পত্তির মূল্য</h5>
              <p className="text-sm text-emerald-700 font-medium">বাজার মূল্যের ওপর অতিরিক্ত ২০০% (৩ গুণ) ক্ষতিপূরণ প্রদান করা হয়।</p>
            </div>
            <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
              <h5 className="font-black text-blue-800 mb-2">অবকাঠামো ও গাছপালা</h5>
              <p className="text-sm text-blue-700 font-medium">ঘরবাড়ি, গাছপালা বা ফসলের জন্য বাজার মূল্যের ওপর অতিরিক্ত ১০০% (২ গুণ) ক্ষতিপূরণ।</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-3xl space-y-4">
            <h5 className="font-black text-gray-800">উদাহরণ (অধিগ্রহণকৃত জমি):</h5>
            <div className="space-y-2 text-sm font-medium">
              <div className="flex justify-between">
                <span className="text-gray-500">জমির বাজার মূল্য:</span>
                <span className="text-gray-800">১০,০০,০০০ টাকা</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">অতিরিক্ত ২০০% (৩ গুণ):</span>
                <span className="text-emerald-600">+ ২০,০০,০০০ টাকা</span>
              </div>
              <div className="h-px bg-gray-200 my-2" />
              <div className="flex justify-between text-lg font-black">
                <span className="text-gray-800">মোট ক্ষতিপূরণ:</span>
                <span className="text-emerald-600">৩০,০০,০০০ টাকা</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Appeal Process */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
              <Scale size={24} />
            </div>
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">আপিল প্রক্রিয়া</h3>
          </div>
          <div className="space-y-4">
            {[
              { step: '১', text: 'জেলা প্রশাসকের আদেশের বিরুদ্ধে বিভাগীয় কমিশনারের নিকট আপিল।' },
              { step: '২', text: 'ক্ষতিপূরণের পরিমাণ নিয়ে আপত্তি থাকলে আর্বিট্রেশন আদালতে আবেদন।' },
              { step: '৩', text: 'আর্বিট্রেশন আদালতের রায়ের বিরুদ্ধে আর্বিট্রেশন এপিলেট ট্রাইব্যুনালে আপিল।' }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-4 items-start">
                <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center shrink-0 text-xs font-black text-gray-500">{item.step}</div>
                <p className="text-sm text-gray-600 font-medium leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-10 rounded-[3.5rem] text-white shadow-xl space-y-6 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-4">জরুরি পরামর্শ</h3>
            <p className="text-amber-50 font-medium leading-relaxed mb-6">
              অধিগ্রহণ সংক্রান্ত কোনো নোটিশ পেলে আতঙ্কিত না হয়ে প্রয়োজনীয় কাগজপত্র (দলিল, খতিয়ান, দাখিলা) প্রস্তুত রাখুন এবং নির্ধারিত সময়ের মধ্যে আপত্তি বা দাবি দাখিল করুন।
            </p>
            <button className="px-6 py-3 bg-white text-orange-600 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-amber-50 transition-all flex items-center gap-2">
              আইনি সহায়তা নিন <ArrowRight size={16} />
            </button>
          </div>
          <Hammer size={120} className="absolute -bottom-8 -right-8 text-white/10 -rotate-12" />
        </div>
      </div>
    </div>
  );

  const renderExpat = () => (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
        <button 
          onClick={handleExportPDF}
          className="absolute top-8 right-8 px-4 py-2 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white/20 transition-all flex items-center gap-2 print:hidden"
        >
          <Printer size={14} /> রিপোর্ট ডাউনলোড (PDF)
        </button>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center border border-white/20">
              <Globe size={40} className="text-indigo-300 animate-pulse" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">প্রবাসী ভূমি <br/>নিরাপত্তা ড্যাশবোর্ড</h2>
            <p className="text-indigo-100 max-w-md text-lg font-medium opacity-90 leading-relaxed">
              আপনার অনুপস্থিতিতে আপনার জমির ডিজিটাল নিরাপত্তা নিশ্চিত করুন। যেকোনো অবৈধ দখল বা পরিবর্তনের চেষ্টা হলে তাৎক্ষণিক নোটিফিকেশন পান।
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-8 rounded-[3rem] border border-white/10 space-y-6">
            <div className="flex items-center justify-between">
              <h4 className="font-black text-sm uppercase tracking-widest">লাইভ মনিটরিং স্ট্যাটাস</h4>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                <span className="text-[10px] font-black text-emerald-400">সক্রিয়</span>
              </div>
            </div>
            <div className="space-y-4">
              {[
                { label: 'সর্বশেষ চেক', value: '৫ মিনিট আগে', icon: Clock },
                { label: 'নিরাপত্তা লেভেল', value: 'মিলিটারি গ্রেড', icon: ShieldCheck },
                { label: 'অ্যালার্ট স্ট্যাটাস', value: 'কোনো ঝুঁকি নেই', icon: CheckCircle2 }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3">
                    <item.icon size={16} className="text-indigo-400" />
                    <span className="text-xs font-bold text-indigo-100">{item.label}</span>
                  </div>
                  <span className="text-xs font-black text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] -mr-48 -mt-48" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-indigo-600 rounded-full" />
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">আমার নিবন্ধিত জমি</h3>
            </div>
            <button className="text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
              নতুন জমি যোগ করুন <PlusCircle size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockLandBankData.filter(d => d.type === 'Expatriate').map(parcel => (
              <div key={parcel.id} className="p-8 bg-gray-50 rounded-[2.5rem] border border-transparent hover:border-indigo-200 transition-all group relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                      <ShieldCheck size={28} className="text-emerald-600" />
                    </div>
                    <span className="px-4 py-1.5 bg-emerald-100 text-emerald-700 rounded-xl text-[10px] font-black uppercase tracking-widest">সুরক্ষিত</span>
                  </div>
                  <h4 className="text-xl font-black text-gray-800 mb-1">{parcel.mouza}</h4>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6">{parcel.parcelId}</p>
                  <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                    <div className="p-4 bg-white rounded-2xl border border-gray-100">
                      <p className="text-gray-400 font-bold mb-1 uppercase text-[8px] tracking-widest">দাগ নম্বর</p>
                      <p className="font-black text-gray-700">{parcel.dagNo}</p>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-gray-100">
                      <p className="text-gray-400 font-bold mb-1 uppercase text-[8px] tracking-widest">আয়তন</p>
                      <p className="font-black text-gray-700">{parcel.area}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => alert('লাইভ ক্যামেরা ফিড লোড হচ্ছে...')}
                      className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg flex items-center justify-center gap-2"
                    >
                      <Video size={14} /> লাইভ ক্যামেরা
                    </button>
                    <button className="flex-1 py-3 bg-white border border-gray-200 text-gray-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-50 transition-all">রেকর্ড দেখুন</button>
                  </div>
                </div>
                <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-all" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">স্মার্ট নিরাপত্তা অ্যালার্ট</h3>
            <div className="space-y-4">
              {[
                { title: 'রেকর্ড ভেরিফিকেশন', time: '১০ মিনিট আগে', desc: 'আপনার জমির রেকর্ড সফলভাবে ভেরিফাই করা হয়েছে।', status: 'success' },
                { title: 'সীমানা পর্যবেক্ষণ', time: '২ ঘণ্টা আগে', desc: 'স্যাটেলাইট ইমেজের মাধ্যমে সীমানা পরীক্ষা করা হয়েছে।', status: 'info' },
                { title: 'লগইন অ্যালার্ট', time: '৫ ঘণ্টা আগে', desc: 'লন্ডন, ইউকে থেকে আপনার অ্যাকাউন্টে লগইন করা হয়েছে।', status: 'warning' }
              ].map((alert, i) => (
                <div key={i} className="p-5 bg-gray-50 rounded-3xl border border-transparent hover:border-indigo-100 transition-all space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-gray-800 text-sm">{alert.title}</h4>
                    <span className="text-[8px] font-bold text-gray-400">{alert.time}</span>
                  </div>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">{alert.desc}</p>
                </div>
              ))}
            </div>
            <button className="w-full py-4 bg-gray-50 text-gray-500 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-gray-100 transition-all">সকল অ্যালার্ট দেখুন</button>
          </div>
          
          <div className="bg-indigo-900 p-10 rounded-[3.5rem] text-white shadow-xl relative overflow-hidden group">
            <div className="relative z-10 space-y-6">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                <ShieldAlert size={28} className="text-indigo-300" />
              </div>
              <div className="space-y-2">
                <h4 className="text-xl font-black">জরুরী আইনি সহায়তা</h4>
                <p className="text-indigo-200/70 text-xs font-medium leading-relaxed">আপনার জমি নিয়ে কোনো বিরোধ বা দখল সংক্রান্ত সমস্যায় সরাসরি এআই আইনি সহায়কের পরামর্শ নিন।</p>
              </div>
              <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all shadow-xl">এআই সহায়তা নিন</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrintReport = () => (
    <div className="hidden print:block space-y-8 p-8 bg-white">
      <div className="flex justify-between items-center border-b-4 border-emerald-600 pb-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 tracking-tighter">স্মার্ট ল্যান্ড ব্যাংক রিপোর্ট</h1>
          <p className="text-emerald-600 font-bold uppercase tracking-widest text-sm">গণপ্রজাতন্ত্রী বাংলাদেশ সরকার</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">রিপোর্ট জেনারেশন তারিখ</p>
          <p className="text-gray-900 font-black text-lg">৫ মার্চ, ২০২৬</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">মোট নিবন্ধিত জমি</p>
          <p className="text-2xl font-black text-gray-800">১২,৪৫০ একর</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">উৎপাদনমুখী জমি</p>
          <p className="text-2xl font-black text-gray-800">৪,২০০ একর</p>
        </div>
        <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">লিজকৃত প্রকল্প</p>
          <p className="text-2xl font-black text-gray-800">১৫৬ টি</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-black text-gray-800 border-l-4 border-emerald-500 pl-4">জমির বিস্তারিত তালিকা</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-emerald-600 text-white">
              <th className="p-4 text-left font-black text-xs uppercase tracking-widest border border-emerald-700">পার্সেল আইডি</th>
              <th className="p-4 text-left font-black text-xs uppercase tracking-widest border border-emerald-700">মৌজা ও উপজেলা</th>
              <th className="p-4 text-left font-black text-xs uppercase tracking-widest border border-emerald-700">দাগ ও খতিয়ান</th>
              <th className="p-4 text-left font-black text-xs uppercase tracking-widest border border-emerald-700">আয়তন</th>
              <th className="p-4 text-left font-black text-xs uppercase tracking-widest border border-emerald-700">ধরণ</th>
              <th className="p-4 text-left font-black text-xs uppercase tracking-widest border border-emerald-700">অবস্থা</th>
            </tr>
          </thead>
          <tbody>
            {mockLandBankData.map((parcel) => (
              <tr key={parcel.id} className="border-b border-gray-100">
                <td className="p-4 font-bold text-gray-800 border border-gray-100">{parcel.parcelId}</td>
                <td className="p-4 font-medium text-gray-600 border border-gray-100">{parcel.mouza}, {parcel.upazila}</td>
                <td className="p-4 font-medium text-gray-600 border border-gray-100">দাগ: {parcel.dagNo}, খতিয়ান: {parcel.khatianNo}</td>
                <td className="p-4 font-black text-emerald-600 border border-gray-100">{parcel.area}</td>
                <td className="p-4 font-bold text-gray-700 border border-gray-100">{parcel.type}</td>
                <td className="p-4 font-bold text-gray-700 border border-gray-100">{parcel.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pt-20 flex justify-between">
        <div className="text-center w-48 border-t border-gray-300 pt-2">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">প্রস্তুতকারী</p>
        </div>
        <div className="text-center w-48 border-t border-gray-300 pt-2">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">অনুমোদনকারী কর্মকর্তা</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto pb-20">
      {renderPrintReport()}
      
      <div className="print:hidden">
      {/* Navigation Tabs */}
      <div className="flex items-center gap-3 mb-12 sticky top-24 z-20 bg-gray-50/80 backdrop-blur-md p-4 rounded-[2.5rem] border border-gray-200/50 shadow-sm print:hidden overflow-x-auto custom-scrollbar no-scrollbar">
        <div className="flex items-center gap-3 min-w-max mx-auto">
          {[
            { id: 'dashboard', label: 'ড্যাশবোর্ড', icon: LayoutGrid },
            { id: 'inventory', label: 'ইনভেন্টরি', icon: Database },
            { id: 'map', label: 'জিআইএস ম্যাপ', icon: MapIcon },
            { id: 'deposit', label: 'জমি জমা দিন', icon: PlusCircle },
            { id: 'registration', label: 'ভূমি নিবন্ধন', icon: FilePlus },
            { id: 'verification', label: 'দলিল যাচাই', icon: ShieldCheck },
            { id: 'acquisition', label: 'ভূমি অধিগ্রহণ', icon: Gavel },
            { id: 'lease', label: 'লিজ ও সমবায়', icon: Handshake },
            { id: 'revenue', label: 'আয় বণ্টন', icon: Wallet },
            { id: 'expat', label: 'প্রবাসী নিরাপত্তা', icon: Globe },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 -translate-y-1' 
                  : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
              }`}
            >
              <tab.icon size={16} />
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'dashboard' && renderDashboard()}
      {activeTab === 'inventory' && renderInventory()}
      {activeTab === 'map' && renderMap()}
      {activeTab === 'deposit' && renderDeposit()}
      {activeTab === 'registration' && renderRegistration()}
      {activeTab === 'verification' && renderVerification()}
      {activeTab === 'acquisition' && renderAcquisition()}
      {activeTab === 'expat' && renderExpat()}
      
      {/* Fallback for other tabs */}
      {(activeTab === 'lease' || activeTab === 'revenue') && (
        <div className="py-20 text-center space-y-6 bg-white rounded-[4rem] border border-gray-100 shadow-sm">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto animate-pulse">
            <Zap size={48} />
          </div>
          <div className="space-y-2">
            <h3 className="text-3xl font-black text-gray-800">মডিউলটি প্রক্রিয়াধীন আছে</h3>
            <p className="text-gray-500 font-medium">খুব শীঘ্রই এই ফিচারের আপডেট আসছে। আমাদের সাথেই থাকুন।</p>
          </div>
          <button 
            onClick={() => setActiveTab('dashboard')}
            className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg"
          >
            ড্যাশবোর্ডে ফিরুন
          </button>
        </div>
      )}

      {/* Floating AI Assistant Button */}
      <button 
        onClick={() => alert('স্মার্ট ভূমি সহকারী আপনার সেবায় প্রস্তুত। কী জানতে চান?')}
        className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-[100] group animate-bounce"
      >
        <Bot size={32} />
        <span className="absolute right-full mr-4 px-4 py-2 bg-gray-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap pointer-events-none">
          স্মার্ট ভূমি সহকারী
        </span>
      </button>
    </div>
  </div>
);
};

export default LandBankModule;
