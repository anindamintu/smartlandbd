
import React, { useState, useMemo } from 'react';
import { FileText, ClipboardList, Gavel, Info, CheckCircle2, AlertCircle, ArrowRight, Download, BookOpen, Landmark, UserCheck, Scale, MousePointer2, Clock, ShieldCheck, MapPin, Upload, ShieldAlert, Loader2, ChevronDown, Calendar, Globe, Search, FileEdit, RefreshCw, LayoutGrid, ChevronLeft, FileSearch, Activity, Wallet, ExternalLink, Sparkles, Bot } from 'lucide-react';
import { locationData } from '../src/data/locations';
import LandRecordSearch from './LandRecordSearch';
import MutationTracker from './MutationTracker';
import PaymentGateway from './PaymentGateway';

interface LandMutationProps {
  initialView?: 'menu' | 'search' | 'guide' | 'apply' | 'tracker' | 'khatian' | 'correction';
}

const LandMutation: React.FC<LandMutationProps> = ({ initialView = 'menu' }) => {
  const [currentView, setCurrentView] = useState<'menu' | 'search' | 'guide' | 'apply' | 'tracker' | 'khatian' | 'correction'>(initialView);
  const [propertyDetails, setPropertyDetails] = React.useState({
    division: 'ঢাকা',
    district: 'ঢাকা',
    upazila: 'তেজগাঁও',
    union: 'তেজগাঁও',
    mouza: 'তেজগাঁও শিল্প এলাকা',
    khatianType: 'বিআরএস',
    khatianNumber: '',
    plotNumber: '',
    area: '',
    areaUnit: 'শতাংশ',
    landType: 'নাল',
    ownerName: '',
    mutationDate: ''
  });

  const divisions = useMemo(() => Object.keys(locationData), []);
  const districts = useMemo(() => Object.keys(locationData[propertyDetails.division] || {}), [propertyDetails.division]);
  const upazilas = useMemo(() => Object.keys(locationData[propertyDetails.division]?.[propertyDetails.district] || {}), [propertyDetails.division, propertyDetails.district]);
  const unions = useMemo(() => Object.keys(locationData[propertyDetails.division]?.[propertyDetails.district]?.[propertyDetails.upazila] || {}), [propertyDetails.division, propertyDetails.district, propertyDetails.upazila]);
  const mouzas = useMemo(() => locationData[propertyDetails.division]?.[propertyDetails.district]?.[propertyDetails.upazila]?.[propertyDetails.union] || [], [propertyDetails.division, propertyDetails.district, propertyDetails.upazila, propertyDetails.union]);

  const [nidData, setNidData] = React.useState({
    number: '',
    image: null as File | null,
    imagePreview: ''
  });

  const [verificationStatus, setVerificationStatus] = React.useState<'idle' | 'verifying' | 'verified' | 'failed'>('idle');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [applicationId, setApplicationId] = useState('');
  const [applyStep, setApplyStep] = useState(1);
  const [applicantInfo, setApplicantInfo] = useState({
    type: 'ব্যক্তিগত',
    name: '',
    fatherSpouseName: '',
    mobile: '',
    email: '',
    address: '',
    relationship: 'স্বয়ং'
  });
  const [uploadedDocs, setUploadedDocs] = useState<{ [key: string]: File | null }>({});

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView, applyStep]);

  const handleFileUpload = (docType: string, file: File | null) => {
    setUploadedDocs(prev => ({ ...prev, [docType]: file }));
  };

  const handleNidImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNidData({
        ...nidData,
        image: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const verifyNID = () => {
    if (!nidData.number || !nidData.image) {
      alert('অনুগ্রহ করে এনআইডি নম্বর এবং ছবি প্রদান করুন।');
      return;
    }
    setVerificationStatus('verifying');
    // Simulate API call
    setTimeout(() => {
      if (nidData.number.length >= 10) {
        setVerificationStatus('verified');
      } else {
        setVerificationStatus('failed');
      }
    }, 2000);
  };

  const procedures = [
    {
      step: '১',
      title: 'অনলাইন আবেদন',
      desc: 'land.gov.bd পোর্টালে গিয়ে প্রয়োজনীয় তথ্য ও স্ক্যান কপি আপলোড করে আবেদন করতে হয়।',
      icon: MousePointer2,
      color: 'bg-blue-50 text-blue-600'
    },
    {
      step: '২',
      title: 'সহকারী কমিশনার (ভূমি) কর্তৃক যাচাই',
      desc: 'আবেদনটি সংশ্লিষ্ট ইউনিয়ন ভূমি অফিস এবং এসি ল্যান্ড অফিসের কানুনগো/সার্ভেয়ার দ্বারা যাচাই করা হয়।',
      icon: UserCheck,
      color: 'bg-emerald-50 text-emerald-600'
    },
    {
      step: '৩',
      title: 'শুনানি ও সরজমিন তদন্ত',
      desc: 'উভয় পক্ষকে শুনানির জন্য ডাকা হয় এবং প্রয়োজনে সরজমিন তদন্ত করা হয়।',
      icon: Gavel,
      color: 'bg-amber-50 text-amber-600'
    },
    {
      step: '৪',
      title: 'নামজারি মঞ্জুর ও খতিয়ান সৃজন',
      desc: 'সবকিছু ঠিক থাকলে এসি ল্যান্ড নামজারি মঞ্জুর করেন এবং নতুন খতিয়ান নম্বর প্রদান করা হয়।',
      icon: Landmark,
      color: 'bg-indigo-50 text-indigo-600'
    },
    {
      step: '৫',
      title: 'ডিসিআর ও খতিয়ান সংগ্রহ',
      desc: 'নির্ধারিত ফি (DCR) পরিশোধ করে অনলাইন থেকে বা অফিস থেকে নতুন খতিয়ান সংগ্রহ করা যায়।',
      icon: Download,
      color: 'bg-rose-50 text-rose-600'
    }
  ];

  const documents = [
    'ক্রয়কৃত জমির মূল দলীল বা সার্টিফাইড কপি',
    'বিক্রেতার নামজারি খতিয়ান (প্রযোজ্য ক্ষেত্রে)',
    'পিট দলীল (যদি থাকে)',
    'হালনাগাদ ভূমি উন্নয়ন কর (খাজনা) পরিশোধের দাখিলা',
    'উত্তরাধিকার সনদ (ওয়ারিশ মূলে হলে)',
    'আবেদনকারীর জাতীয় পরিচয়পত্র (NID)',
    'জমির হাত নকশা (প্রয়োজন হতে পারে)'
  ];

  const fees = [
    { label: 'আবেদন ফি', amount: '৭০/-' },
    { label: 'নোটিশ জারি ফি', amount: '৫০/-' },
    { label: 'রেকর্ড সংশোধন ফি', amount: '১,০০০/-' },
    { label: 'খতিয়ান ফি', amount: '১০০/-' },
    { label: 'মোট (সরকারি ফি)', amount: '১,২২০/-' }
  ];

  const handleSubmit = () => {
    if (!propertyDetails.plotNumber || !propertyDetails.area || !propertyDetails.landType) {
      alert('অনুগ্রহ করে জমির সকল তথ্য প্রদান করুন।');
      return;
    }
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setApplicationId('MUT-' + Math.random().toString(36).substr(2, 9).toUpperCase());
    }, 2500);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto py-20 animate-in zoom-in duration-500">
        <div className="bg-white p-12 rounded-[4rem] shadow-2xl border border-gray-100 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500" />
          <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-gray-800 tracking-tight">আবেদন সফলভাবে জমা হয়েছে!</h2>
            <p className="text-gray-500 font-medium text-lg">আপনার ই-নামজারি আবেদনটি গ্রহণ করা হয়েছে এবং প্রক্রিয়াকরণ শুরু হয়েছে।</p>
          </div>
          
          <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-gray-100 max-w-md mx-auto">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">আবেদন আইডি (Application ID)</p>
            <p className="text-3xl font-black text-indigo-600 tracking-wider">{applicationId}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
            <button className="flex items-center justify-center gap-2 py-4 bg-gray-800 text-white rounded-2xl font-black hover:bg-black transition-all shadow-lg">
              <Download size={20} /> রিসিট ডাউনলোড
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="flex items-center justify-center gap-2 py-4 bg-white text-gray-700 border-2 border-gray-100 rounded-2xl font-black hover:bg-gray-50 transition-all"
            >
              মূল পাতায় ফিরুন
            </button>
          </div>

          <div className="pt-8 border-t border-gray-50 flex items-center justify-center gap-6">
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <Clock size={20} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase">২৮ দিন</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <span className="text-[10px] font-black text-gray-400 uppercase">নিরাপদ</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const mutationOptions = [
    { id: 'search', title: 'খতিয়ান অনুসন্ধান', desc: 'মৌজা ও খতিয়ান নম্বর দিয়ে অনুসন্ধান করুন।', icon: FileSearch, color: 'bg-blue-600' },
    { id: 'guide', title: 'নামজারি নির্দেশিকা', desc: 'নামজারি প্রক্রিয়ার নিয়ম ও ধাপসমূহ জানুন।', icon: BookOpen, color: 'bg-emerald-600' },
    { id: 'apply', title: 'নামজারি আবেদন', desc: 'নতুন নামজারির জন্য অনলাইন আবেদন করুন।', icon: FileEdit, color: 'bg-indigo-600' },
    { id: 'tracker', title: 'নামজারি ট্র্যাকার', desc: 'আবেদনের বর্তমান অবস্থা ট্র্যাক করুন।', icon: Activity, color: 'bg-amber-600' },
    { id: 'khatian', title: 'নামজারি খতিয়ান', desc: 'সৃজিত নামজারি খতিয়ান অনুসন্ধান ও ডাউনলোড।', icon: FileText, color: 'bg-rose-600' },
    { id: 'correction', title: 'রেকর্ড সংশোধন', desc: 'খতিয়ানের ভুল সংশোধনের জন্য আবেদন করুন।', icon: RefreshCw, color: 'bg-violet-600' },
  ];

  if (currentView === 'menu') {
    return (
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
        <div className="text-center space-y-4">
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner mb-6">
            <LayoutGrid size={40} />
          </div>
          <h2 className="text-4xl font-black text-gray-800 tracking-tight">ই-নামজারি সেবা কেন্দ্র</h2>
          <p className="text-gray-500 max-w-2xl mx-auto font-medium text-lg">
            নামজারি সংক্রান্ত সকল ডিজিটাল সেবা এখন এক জায়গায়। আপনার প্রয়োজনীয় সেবাটি নির্বাচন করুন।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mutationOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setCurrentView(option.id as any)}
              className="group bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all text-left flex flex-col gap-6"
            >
              <div className={`w-16 h-16 ${option.color} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform shrink-0`}>
                <option.icon size={28} />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-black text-gray-800 group-hover:text-indigo-600 transition-colors">{option.title}</h3>
                <p className="text-gray-500 font-medium text-xs leading-relaxed">{option.desc}</p>
                <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  প্রবেশ করুন <ArrowRight size={14} />
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Status Widget */}
        <div className="bg-white p-10 rounded-[3.5rem] border border-gray-100 shadow-sm space-y-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-2 h-8 bg-amber-500 rounded-full" />
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">আবেদনের সর্বশেষ অবস্থা</h3>
            </div>
            <button onClick={() => setCurrentView('tracker')} className="text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline flex items-center gap-2">
              বিস্তারিত ট্র্যাকার <ArrowRight size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'মোট আবেদন', value: '১২ টি', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
              { label: 'প্রক্রিয়াধীন', value: '০৪ টি', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
              { label: 'সম্পন্ন হয়েছে', value: '০৮ টি', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' }
            ].map((stat, i) => (
              <div key={i} className="p-6 bg-gray-50 rounded-3xl border border-transparent hover:border-indigo-100 transition-all flex items-center gap-4">
                <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                  <stat.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                  <p className="text-xl font-black text-gray-800">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-xl">
              <h3 className="text-3xl font-black tracking-tight">সরকারি ই-নামজারি পোর্টাল</h3>
              <p className="text-indigo-100/80 font-medium leading-relaxed">
                বাংলাদেশ সরকারের ভূমি মন্ত্রণালয়ের অফিসিয়াল ই-নামজারি পোর্টালে সরাসরি আবেদন করতে নিচের বাটনে ক্লিক করুন। এটি একটি নিরাপদ ও দ্রুততম মাধ্যম।
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="https://mutation.land.gov.bd" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-indigo-900 rounded-2xl font-black hover:bg-indigo-50 transition-all shadow-xl whitespace-nowrap flex items-center gap-2"
              >
                অফিসিয়াল পোর্টালে যান <ExternalLink size={20} />
              </a>
              <button 
                onClick={() => setCurrentView('guide')}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-black hover:bg-indigo-700 transition-all border border-indigo-500 shadow-xl whitespace-nowrap"
              >
                নির্দেশিকা দেখুন
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -mr-48 -mt-48" />
        </div>

        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden group">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-inner group-hover:scale-110 transition-transform">
                <Bot size={32} />
              </div>
              <div className="space-y-1">
                <h4 className="text-2xl font-black tracking-tight">এআই নামজারি সহকারী</h4>
                <p className="text-emerald-50 text-sm font-medium opacity-90">নামজারি সংক্রান্ত যেকোনো আইনি জটিলতায় পরামর্শ নিন।</p>
              </div>
            </div>
            <button 
              className="px-8 py-4 bg-white text-emerald-700 rounded-2xl font-black shadow-xl hover:bg-emerald-50 transition-all flex items-center gap-2 whitespace-nowrap"
            >
              এআই পরামর্শ নিন <Sparkles size={18} />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32" />
        </div>

        <div className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-2 h-8 bg-indigo-600 rounded-full" />
            <h3 className="text-2xl font-black text-gray-800 tracking-tight">নামজারি কেন প্রয়োজন?</h3>
          </div>
          <p className="text-gray-500 font-medium leading-relaxed text-lg">
            জমির মালিকানা পরিবর্তনের পর সরকারি রেকর্ডে নিজের নাম অন্তর্ভুক্ত না করলে ভবিষ্যতে জমি বিক্রয়, ঋণ গ্রহণ বা উত্তরাধিকার হস্তান্তরে জটিলতা সৃষ্টি হয়। ই-নামজারি প্রক্রিয়ায় এখন ঘরে বসেই দ্রুত এই সেবা পাওয়া সম্ভব।
          </p>
        </div>
      </div>
    );
  }

  const BackButton = () => (
    <button 
      onClick={() => setCurrentView('menu')}
      className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-black text-xs uppercase tracking-widest mb-8 transition-colors"
    >
      <ChevronLeft size={18} /> ফিরে যান
    </button>
  );

  if (currentView === 'search') {
    return (
      <div className="animate-in fade-in duration-500">
        <BackButton />
        <LandRecordSearch />
      </div>
    );
  }

  if (currentView === 'tracker') {
    return (
      <div className="animate-in fade-in duration-500">
        <BackButton />
        <MutationTracker />
      </div>
    );
  }

  if (currentView === 'khatian') {
    return (
      <div className="animate-in fade-in duration-500">
        <BackButton />
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 text-center space-y-6">
          <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-[2rem] flex items-center justify-center mx-auto">
            <FileText size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800">নামজারি খতিয়ান অনুসন্ধান</h2>
          <p className="text-gray-500 max-w-md mx-auto">সৃজিত নামজারি খতিয়ান নম্বর বা আবেদন আইডি দিয়ে আপনার খতিয়ানটি খুঁজে বের করুন।</p>
          <div className="max-w-xl mx-auto relative">
            <input 
              type="text" 
              placeholder="খতিয়ান নম্বর বা আবেদন আইডি লিখুন..."
              className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-rose-500 outline-none transition-all font-black text-lg"
            />
            <button className="absolute right-2 top-2 bottom-2 px-8 bg-rose-600 text-white font-black rounded-xl hover:bg-rose-700 transition-all">
              খুঁজুন
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'correction') {
    return (
      <div className="animate-in fade-in duration-500">
        <BackButton />
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 text-center space-y-6">
          <div className="w-20 h-20 bg-violet-50 text-violet-600 rounded-[2rem] flex items-center justify-center mx-auto">
            <RefreshCw size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800">রেকর্ড সংশোধন আবেদন</h2>
          <p className="text-gray-500 max-w-md mx-auto">খতিয়ানে নামের বানান, জমির পরিমাণ বা অন্য কোনো ভুল থাকলে সংশোধনের জন্য আবেদন করুন।</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <button className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-violet-500 transition-all text-left space-y-2">
              <h4 className="font-black text-gray-800">নাম সংশোধন</h4>
              <p className="text-xs text-gray-500">মালিকের নাম বা পিতার নাম সংশোধনের জন্য।</p>
            </button>
            <button className="p-8 bg-gray-50 rounded-[2rem] border border-gray-100 hover:border-violet-500 transition-all text-left space-y-2">
              <h4 className="font-black text-gray-800">জমির শ্রেণী সংশোধন</h4>
              <p className="text-xs text-gray-500">জমির ধরণ বা শ্রেণীগত ভুল সংশোধনের জন্য।</p>
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (currentView === 'guide') {
    return (
      <div className="animate-in fade-in duration-500">
        <BackButton />
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="relative h-64 rounded-[3rem] overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2000&auto=format&fit=crop" 
              alt="Land Mutation" 
              className="w-full h-full object-cover brightness-[0.4]" 
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
              <div className="bg-blue-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
                <ShieldCheck size={16} className="text-blue-300" />
                <span className="text-white text-xs font-black uppercase tracking-[0.2em]">ই-নামজারি নির্দেশিকা</span>
              </div>
              <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">নামজারি (Mutation) প্রক্রিয়া ও নিয়মাবলী</h2>
              <p className="text-blue-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90">
                জমির মালিকানা পরিবর্তনের পর সরকারি রেকর্ডে নিজের নাম অন্তর্ভুক্ত করার আইনি পদ্ধতি।
              </p>
            </div>
          </div>

          {/* Procedures Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 px-2">
              <div className="w-2 h-8 bg-blue-600 rounded-full" />
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">নামজারি প্রক্রিয়ার ধাপসমূহ</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {procedures.map((item, idx) => (
                <div key={idx} className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative">
                  <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm font-black text-xl`}>
                    <item.icon size={24} />
                  </div>
                  <div className="absolute top-6 right-6 text-4xl font-black text-gray-50 opacity-10 group-hover:opacity-20 transition-opacity">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-black text-gray-800 mb-3 leading-tight">{item.title}</h4>
                  <p className="text-gray-500 text-xs font-medium leading-relaxed">{item.desc}</p>
                  {idx < procedures.length - 1 && (
                    <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-gray-200">
                      <ArrowRight size={24} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Documents Section */}
            <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <ClipboardList size={24} />
                </div>
                <h3 className="text-2xl font-black text-gray-800 tracking-tight">প্রয়োজনীয় কাগজপত্র</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-emerald-200 transition-all group">
                    <div className="w-8 h-8 bg-white text-emerald-600 rounded-full flex items-center justify-center shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <CheckCircle2 size={16} />
                    </div>
                    <span className="text-gray-700 font-bold text-sm">{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fees Section */}
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden h-full">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-white/10 text-blue-300 rounded-2xl flex items-center justify-center">
                      <Scale size={24} />
                    </div>
                    <h3 className="text-xl font-black tracking-tight">নির্ধারিত সরকারি ফি</h3>
                  </div>
                  <div className="space-y-4">
                    {fees.map((fee, idx) => (
                      <div key={idx} className={`flex justify-between items-center p-4 rounded-2xl ${idx === fees.length - 1 ? 'bg-emerald-600/20 border border-emerald-500/30' : 'bg-white/5 border border-white/10'}`}>
                        <span className={`text-sm ${idx === fees.length - 1 ? 'font-black text-emerald-300' : 'font-bold text-gray-300'}`}>{fee.label}</span>
                        <span className={`text-lg ${idx === fees.length - 1 ? 'font-black text-white' : 'font-black text-blue-400'}`}>{fee.amount}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default view is 'apply'
  if (currentView === 'apply') {
    return (
      <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
        <BackButton />

        {/* Form Header */}
        <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 text-center space-y-4">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto">
            <FileEdit size={32} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 tracking-tight">ই-নামজারি আবেদন ফরম</h2>
          <p className="text-gray-500 font-medium">সঠিক তথ্য প্রদান করে আপনার নামজারি আবেদনটি সম্পন্ন করুন।</p>
        </div>

        {/* Multi-step Progress Bar */}
        <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100 flex items-center justify-between overflow-x-auto">
          {[
            { step: 1, label: 'এনআইডি যাচাই', icon: ShieldCheck },
            { step: 2, label: 'আবেদনকারী', icon: UserCheck },
            { step: 3, label: 'জমির বিবরণ', icon: MapPin },
            { step: 4, label: 'কাগজপত্র', icon: Upload },
            { step: 5, label: 'পেমেন্ট', icon: Wallet }
          ].map((s, idx) => (
            <React.Fragment key={s.step}>
              <div className="flex flex-col items-center gap-3 min-w-[100px]">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                  applyStep >= s.step ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-50 text-gray-400'
                }`}>
                  <s.icon size={24} />
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${
                  applyStep >= s.step ? 'text-indigo-600' : 'text-gray-400'
                }`}>{s.label}</span>
              </div>
              {idx < 4 && (
                <div className={`flex-1 h-1 mx-4 rounded-full transition-all duration-500 ${
                  applyStep > s.step ? 'bg-indigo-600' : 'bg-gray-100'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: NID Verification */}
        {applyStep === 1 && (
          <div className={`bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden transition-all duration-500 ${verificationStatus === 'verified' ? 'ring-4 ring-emerald-500/20' : ''}`}>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${verificationStatus === 'verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'}`}>
                  <ShieldCheck size={24} />
                </div>
                <h3 className="text-2xl font-black text-gray-800 tracking-tight">ধাপ ১: এনআইডি যাচাইকরণ</h3>
              </div>
              {verificationStatus === 'verified' && (
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 animate-in zoom-in">
                  <CheckCircle2 size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">যাচাইকৃত</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">এনআইডি নম্বর</label>
                  <input 
                    type="text" 
                    value={nidData.number}
                    onChange={(e) => setNidData({...nidData, number: e.target.value})}
                    placeholder="১০ বা ১৭ ডিজিটের নম্বর"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">এনআইডি ছবি আপলোড</label>
                  <div 
                    onClick={() => document.getElementById('nid-upload')?.click()}
                    className="w-full h-48 border-2 border-dashed border-gray-200 rounded-[2rem] flex flex-col items-center justify-center gap-3 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer group overflow-hidden relative"
                  >
                    {nidData.imagePreview ? (
                      <img src={nidData.imagePreview} alt="NID Preview" className="w-full h-full object-cover" />
                    ) : (
                      <>
                        <div className="w-12 h-12 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Upload size={24} />
                        </div>
                        <p className="text-xs font-bold text-gray-400">এনআইডি কার্ডের সামনের অংশ আপলোড করুন</p>
                      </>
                    )}
                    <input id="nid-upload" type="file" accept="image/*" onChange={handleNidImageChange} className="hidden" />
                  </div>
                </div>

                <button 
                  onClick={verifyNID}
                  disabled={verificationStatus === 'verifying' || verificationStatus === 'verified'}
                  className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-3 shadow-lg ${
                    verificationStatus === 'verified' 
                      ? 'bg-emerald-100 text-emerald-700 cursor-default' 
                      : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:-translate-y-1 active:scale-95'
                  }`}
                >
                  {verificationStatus === 'verifying' ? (
                    <>যাচাই করা হচ্ছে... <Loader2 size={20} className="animate-spin" /></>
                  ) : verificationStatus === 'verified' ? (
                    <>এনআইডি যাচাই সম্পন্ন <CheckCircle2 size={20} /></>
                  ) : (
                    <>এনআইডি যাচাই করুন <ShieldAlert size={20} /></>
                  )}
                </button>
              </div>

              <div className="bg-indigo-50/50 p-8 rounded-[2.5rem] border border-indigo-100 flex flex-col justify-center">
                <h4 className="text-indigo-900 font-black mb-4 flex items-center gap-2">
                  <Info size={18} /> কেন এনআইডি যাচাই প্রয়োজন?
                </h4>
                <ul className="space-y-4">
                  {[
                    'জমির মালিকানা নিশ্চিত করতে এনআইডি যাচাই বাধ্যতামূলক।',
                    'ভুল বা জাল এনআইডি ব্যবহার করলে আবেদন বাতিল হবে।',
                    'নির্বাচন কমিশনের সার্ভারের মাধ্যমে তথ্য যাচাই করা হয়।',
                    'আপনার তথ্য সম্পূর্ণ নিরাপদ ও এনক্রিপ্টেড থাকে।'
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs font-bold text-indigo-800/70 leading-relaxed">
                      <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full mt-1.5 shrink-0" />
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {verificationStatus === 'verified' && (
              <div className="mt-10 pt-10 border-t border-gray-100 flex justify-center animate-in slide-in-from-bottom-4 duration-500">
                <button 
                  onClick={() => setApplyStep(2)}
                  className="px-10 py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-xl hover:bg-indigo-700 hover:-translate-y-1 transition-all flex items-center gap-3"
                >
                  পরবর্তী ধাপে যান <ArrowRight size={24} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Applicant Information */}
        {applyStep === 2 && (
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 animate-in slide-in-from-right-8 duration-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                <UserCheck size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">ধাপ ২: আবেদনকারীর তথ্য</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">আবেদনকারীর ধরণ</label>
                  <div className="flex gap-4">
                    {['ব্যক্তিগত', 'প্রাতিষ্ঠানিক', 'উত্তরাধিকার'].map((t) => (
                      <button
                        key={t}
                        onClick={() => setApplicantInfo({...applicantInfo, type: t})}
                        className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm transition-all border-2 ${
                          applicantInfo.type === t 
                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-md' 
                            : 'bg-white border-gray-100 text-gray-500 hover:border-gray-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">আবেদনকারীর নাম</label>
                  <input 
                    type="text" 
                    value={applicantInfo.name}
                    onChange={(e) => setApplicantInfo({...applicantInfo, name: e.target.value})}
                    placeholder="এনআইডি অনুযায়ী নাম লিখুন"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">পিতা/স্বামীর নাম</label>
                  <input 
                    type="text" 
                    value={applicantInfo.fatherSpouseName}
                    onChange={(e) => setApplicantInfo({...applicantInfo, fatherSpouseName: e.target.value})}
                    placeholder="পিতা বা স্বামীর নাম লিখুন"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">মোবাইল নম্বর</label>
                  <input 
                    type="tel" 
                    value={applicantInfo.mobile}
                    onChange={(e) => setApplicantInfo({...applicantInfo, mobile: e.target.value})}
                    placeholder="01XXXXXXXXX"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">আবেদনকারীর সাথে সম্পর্ক</label>
                  <div className="relative">
                    <select 
                      value={applicantInfo.relationship}
                      onChange={(e) => setApplicantInfo({...applicantInfo, relationship: e.target.value})}
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none"
                    >
                      <option value="স্বয়ং">স্বয়ং</option>
                      <option value="প্রতিনিধি">প্রতিনিধি</option>
                      <option value="আইনজীবী">আইনজীবী</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">বর্তমান ঠিকানা</label>
                  <textarea 
                    rows={4}
                    value={applicantInfo.address}
                    onChange={(e) => setApplicantInfo({...applicantInfo, address: e.target.value})}
                    placeholder="বিস্তারিত ঠিকানা লিখুন..."
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-700 shadow-sm resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-gray-100 flex justify-between">
              <button 
                onClick={() => setApplyStep(1)}
                className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-all"
              >
                পূর্ববর্তী ধাপ
              </button>
              <button 
                onClick={() => setApplyStep(3)}
                disabled={!applicantInfo.name || !applicantInfo.mobile || !applicantInfo.address}
                className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center gap-3"
              >
                পরবর্তী ধাপে যান <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Property Details */}
        {applyStep === 3 && (
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 animate-in slide-in-from-right-8 duration-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">ধাপ ৩: জমির বিবরণ</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">বিভাগ</label>
                <div className="relative">
                  <select 
                    value={propertyDetails.division}
                    onChange={(e) => {
                      const div = e.target.value;
                      const firstDist = Object.keys(locationData[div])[0];
                      const firstUp = Object.keys(locationData[div][firstDist])[0];
                      const firstUni = Object.keys(locationData[div][firstDist][firstUp])[0];
                      const firstMouza = locationData[div][firstDist][firstUp][firstUni][0];
                      setPropertyDetails({
                        ...propertyDetails,
                        division: div,
                        district: firstDist,
                        upazila: firstUp,
                        union: firstUni,
                        mouza: firstMouza
                      });
                    }}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none"
                  >
                    {divisions.map(div => <option key={div} value={div}>{div}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">জেলা</label>
                <div className="relative">
                  <select 
                    value={propertyDetails.district}
                    onChange={(e) => {
                      const dist = e.target.value;
                      const firstUp = Object.keys(locationData[propertyDetails.division][dist])[0];
                      const firstUni = Object.keys(locationData[propertyDetails.division][dist][firstUp])[0];
                      const firstMouza = locationData[propertyDetails.division][dist][firstUp][firstUni][0];
                      setPropertyDetails({
                        ...propertyDetails,
                        district: dist,
                        upazila: firstUp,
                        union: firstUni,
                        mouza: firstMouza
                      });
                    }}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none"
                  >
                    {districts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">উপজেলা</label>
                <div className="relative">
                  <select 
                    value={propertyDetails.upazila}
                    onChange={(e) => {
                      const up = e.target.value;
                      const firstUni = Object.keys(locationData[propertyDetails.division][propertyDetails.district][up])[0];
                      const firstMouza = locationData[propertyDetails.division][propertyDetails.district][up][firstUni][0];
                      setPropertyDetails({
                        ...propertyDetails,
                        upazila: up,
                        union: firstUni,
                        mouza: firstMouza
                      });
                    }}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none"
                  >
                    {upazilas.map(up => <option key={up} value={up}>{up}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">ইউনিয়ন</label>
                <div className="relative">
                  <select 
                    value={propertyDetails.union}
                    onChange={(e) => {
                      const uni = e.target.value;
                      const firstMouza = locationData[propertyDetails.division][propertyDetails.district][propertyDetails.upazila][uni][0];
                      setPropertyDetails({
                        ...propertyDetails,
                        union: uni,
                        mouza: firstMouza
                      });
                    }}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none"
                  >
                    {unions.map(uni => <option key={uni} value={uni}>{uni}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">মৌজা</label>
                <div className="relative">
                  <select 
                    value={propertyDetails.mouza}
                    onChange={(e) => setPropertyDetails({...propertyDetails, mouza: e.target.value})}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none"
                  >
                    {mouzas.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">পূর্ববর্তী খতিয়ান বিবরণ</h4>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">খতিয়ানের ধরণ</label>
                  <div className="relative">
                    <select 
                      value={propertyDetails.khatianType}
                      onChange={(e) => setPropertyDetails({...propertyDetails, khatianType: e.target.value})}
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none"
                    >
                      {['সিএস', 'এসএ', 'পেটি', 'আরএস', 'বিআরএস', 'দিয়ারা', 'অন্যান্য'].map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">পূর্ববর্তী খতিয়ান নম্বর</label>
                <input 
                  type="text" 
                  value={propertyDetails.khatianNumber}
                  onChange={(e) => setPropertyDetails({...propertyDetails, khatianNumber: e.target.value})}
                  placeholder="উদা: ৫০১"
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-black text-blue-600 uppercase tracking-widest mb-4">জমির তথ্য (দাগ ও পরিমাণ)</h4>
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">দাগ নম্বর</label>
                  <input 
                    type="text" 
                    value={propertyDetails.plotNumber}
                    onChange={(e) => setPropertyDetails({...propertyDetails, plotNumber: e.target.value})}
                    placeholder="উদা: ১২৩৪"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">জমির পরিমাণ</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={propertyDetails.area}
                    onChange={(e) => setPropertyDetails({...propertyDetails, area: e.target.value})}
                    placeholder="উদা: ১০"
                    className="flex-1 px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                  <select 
                    value={propertyDetails.areaUnit}
                    onChange={(e) => setPropertyDetails({...propertyDetails, areaUnit: e.target.value})}
                    className="w-24 px-2 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none"
                  >
                    <option value="শতাংশ">শতাংশ</option>
                    <option value="একর">একর</option>
                    <option value="বিঘা">বিঘা</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">জমির ধরণ (শ্রেণী)</label>
                <input 
                  type="text" 
                  value={propertyDetails.landType}
                  onChange={(e) => setPropertyDetails({...propertyDetails, landType: e.target.value})}
                  placeholder="উদা: নাল, ভিটি, চালা"
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">মালিক বা দখলদারের নাম</label>
                <input 
                  type="text" 
                  value={propertyDetails.ownerName}
                  onChange={(e) => setPropertyDetails({...propertyDetails, ownerName: e.target.value})}
                  placeholder="মালিকের নাম লিখুন"
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                />
              </div>
            </div>

            <div className="mt-10 pt-10 border-t border-gray-100 flex justify-between">
              <button 
                onClick={() => setApplyStep(2)}
                className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-all"
              >
                পূর্ববর্তী ধাপ
              </button>
              <button 
                onClick={() => setApplyStep(4)}
                disabled={!propertyDetails.plotNumber}
                className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center gap-3"
              >
                পরবর্তী ধাপে যান <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Document Upload */}
        {applyStep === 4 && (
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 animate-in slide-in-from-right-8 duration-500">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                <Upload size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-800 tracking-tight">ধাপ ৪: প্রয়োজনীয় কাগজপত্র আপলোড</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { id: 'deed', label: 'জমির মূল দলীল/সার্টিফাইড কপি' },
                { id: 'khatian', label: 'বিক্রেতার নামজারি খতিয়ান' },
                { id: 'tax', label: 'হালনাগাদ দাখিলা (খাজনা রসিদ)' },
                { id: 'warish', label: 'ওয়ারিশ সনদ (প্রযোজ্য ক্ষেত্রে)' }
              ].map((doc) => (
                <div key={doc.id} className="p-6 bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/30 transition-all group">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-black text-gray-700 text-sm">{doc.label}</h4>
                    {uploadedDocs[doc.id] && <CheckCircle2 size={18} className="text-emerald-600" />}
                  </div>
                  <input 
                    type="file" 
                    id={`upload-${doc.id}`}
                    className="hidden" 
                    onChange={(e) => handleFileUpload(doc.id, e.target.files?.[0] || null)}
                  />
                  <button 
                    onClick={() => document.getElementById(`upload-${doc.id}`)?.click()}
                    className="w-full py-3 bg-white border border-gray-200 rounded-xl font-bold text-xs text-gray-500 hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                  >
                    {uploadedDocs[doc.id] ? uploadedDocs[doc.id]?.name : 'ফাইল নির্বাচন করুন'}
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-10 pt-10 border-t border-gray-100 flex justify-between">
              <button 
                onClick={() => setApplyStep(3)}
                className="px-8 py-4 bg-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-200 transition-all"
              >
                পূর্ববর্তী ধাপ
              </button>
              <button 
                onClick={() => setApplyStep(5)}
                className="px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-700 transition-all flex items-center gap-3"
              >
                পরবর্তী ধাপে যান <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Payment */}
        {applyStep === 5 && (
          <div className="animate-in slide-in-from-right-8 duration-500">
            <PaymentGateway 
              amount={1220}
              serviceName="ই-নামজারি আবেদন ফি"
              onSuccess={(txId) => {
                setApplicationId('MUT-' + txId);
                setIsSubmitted(true);
              }}
              onCancel={() => setApplyStep(4)}
            />
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default LandMutation;
