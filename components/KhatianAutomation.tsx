import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { locationData } from '../src/data/locations';
import { 
  Search, 
  FileText, 
  User, 
  Truck, 
  Download, 
  CreditCard, 
  CheckCircle2, 
  ChevronRight, 
  MapPin, 
  Smartphone, 
  Clock, 
  ShieldCheck,
  ArrowLeft,
  Printer,
  Mail,
  Building2,
  Wallet,
  Globe,
  Landmark,
  Users,
  Map as MapIcon,
  ChevronDown
} from 'lucide-react';

type Step = 'search' | 'results' | 'details' | 'delivery' | 'payment' | 'success';
type DeliveryType = 'online' | 'sentry' | 'post';

export const KhatianAutomation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>('search');
  const [deliveryType, setDeliveryType] = useState<DeliveryType>('online');
  const [isLoading, setIsLoading] = useState(false);

  // Search Results State
  const [selectedKhatianId, setSelectedKhatianId] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const mockResults = [
    { id: '1', khatianNo: '১২৩৪', dagNo: '৫৬৭', owner: 'মো: আব্দুল করিম', father: 'মরহুম রহিম উদ্দিন' },
    { id: '2', khatianNo: '১২৩৫', dagNo: '৫৬৮', owner: 'মোসা: রহিমা বেগম', father: 'আব্দুস সাত্তার' },
    { id: '3', khatianNo: '১২৩৬', dagNo: '৫৬৯', owner: 'মো: জসিম উদ্দিন', father: 'আব্দুল হাই' },
    { id: '4', khatianNo: '৪৫৬', dagNo: '১০১', owner: 'মো: আব্দুল করিম', father: 'মৃত রহমত উল্লাহ' },
    { id: '5', khatianNo: '৪৫৭', dagNo: '১০২', owner: 'মো: আব্দুল করিম', father: 'মৃত রহমত উল্লাহ' },
  ];

  // Location State
  const [selectedDivision, setSelectedDivision] = useState('ঢাকা');
  const [selectedDistrict, setSelectedDistrict] = useState('ঢাকা');
  const [selectedUpazila, setSelectedUpazila] = useState('তেজগাঁও');
  const [selectedUnion, setSelectedUnion] = useState('তেজগাঁও সদর');
  const [selectedMouza, setSelectedMouza] = useState('তেজগাঁও শিল্প এলাকা');
  const [selectedKhatianType, setSelectedKhatianType] = useState('আরএস');
  const [searchType, setSearchType] = useState<'khatian' | 'dag' | 'owner'>('khatian');
  const [khatianNo, setKhatianNo] = useState('');
  const [dagNo, setDagNo] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [fatherSpouseName, setFatherSpouseName] = useState('');
  const [captcha, setCaptcha] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [isNidVerified, setIsNidVerified] = useState(false);
  const [nidNumber, setNidNumber] = useState('');
  const [dob, setDob] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const divisions = useMemo(() => Object.keys(locationData), []);
  const districts = useMemo(() => Object.keys(locationData[selectedDivision] || {}), [selectedDivision]);
  const upazilas = useMemo(() => Object.keys(locationData[selectedDivision]?.[selectedDistrict] || {}), [selectedDivision, selectedDistrict]);
  const unions = useMemo(() => Object.keys(locationData[selectedDivision]?.[selectedDistrict]?.[selectedUpazila] || {}), [selectedDivision, selectedDistrict, selectedUpazila]);
  const mouzas = useMemo(() => locationData[selectedDivision]?.[selectedDistrict]?.[selectedUpazila]?.[selectedUnion] || [], [selectedDivision, selectedDistrict, selectedUpazila, selectedUnion]);

  const steps = [
    { id: 'search', label: 'খতিয়ান খুঁজুন', icon: Search },
    { id: 'results', label: 'ফলাফল', icon: FileText },
    { id: 'details', label: 'আবেদনকারীর তথ্য', icon: User },
    { id: 'delivery', label: 'প্রেরণ পদ্ধতি', icon: Truck },
    { id: 'payment', label: 'পেমেন্ট', icon: CreditCard },
    { id: 'success', label: 'সম্পন্ন', icon: CheckCircle2 },
  ];

  const generateCaptcha = () => {
    const num = Math.floor(1000 + Math.random() * 9000);
    setCaptcha(num.toString());
  };

  React.useEffect(() => {
    generateCaptcha();
  }, []);

  const handleNext = () => {
    if (currentStep === 'search') {
      const isKhatianSearch = searchType === 'khatian' && khatianNo;
      const isDagSearch = searchType === 'dag' && dagNo;
      const isOwnerSearch = searchType === 'owner' && ownerName;

      if (!isKhatianSearch && !isDagSearch && !isOwnerSearch) {
        alert('অনুগ্রহ করে প্রয়োজনীয় তথ্য প্রদান করুন');
        return;
      }
      if (userCaptcha !== captcha) {
        alert('ক্যাপচা সঠিক নয়');
        generateCaptcha();
        return;
      }
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        
        // Filter results based on search criteria
        const filtered = mockResults.filter(item => {
          if (searchType === 'khatian') return item.khatianNo.includes(khatianNo);
          if (searchType === 'dag') return item.dagNo.includes(dagNo);
          if (searchType === 'owner') {
            const nameMatch = item.owner.includes(ownerName);
            const fatherMatch = fatherSpouseName ? item.father.includes(fatherSpouseName) : true;
            return nameMatch && fatherMatch;
          }
          return true;
        });
        
        setSearchResults(filtered);
        setCurrentStep('results');
      }, 1000);
    }
    else if (currentStep === 'results') {
      if (!selectedKhatianId) {
        alert('অনুগ্রহ করে একটি খতিয়ান নির্বাচন করুন');
        return;
      }
      setCurrentStep('details');
    }
    else if (currentStep === 'details') {
      if (!isNidVerified) {
        alert('অনুগ্রহ করে এনআইডি ভেরিফাই করুন');
        return;
      }
      if (!agreedToTerms) {
        alert('অনুগ্রহ করে শর্তাবলীতে সম্মতি প্রদান করুন');
        return;
      }
      setCurrentStep('delivery');
    }
    else if (currentStep === 'delivery') {
      if (deliveryType === 'post' && !address) {
        alert('অনুগ্রহ করে ডেলিভারি ঠিকানা প্রদান করুন');
        return;
      }
      setCurrentStep('payment');
    }
    else if (currentStep === 'payment') {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setCurrentStep('success');
      }, 2000);
    }
  };

  const handleBack = () => {
    if (currentStep === 'results') setCurrentStep('search');
    else if (currentStep === 'details') setCurrentStep('results');
    else if (currentStep === 'delivery') setCurrentStep('details');
    else if (currentStep === 'payment') setCurrentStep('delivery');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <div className="w-12 h-12 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                <FileText size={28} />
              </div>
              স্মার্ট খতিয়ান অটোমেশন
            </h1>
            <p className="text-slate-500 mt-2 font-medium">খতিয়ান আবেদন, পেমেন্ট এবং তাৎক্ষণিক সংগ্রহের সমন্বিত সিস্টেম</p>
          </div>
          
          <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100 flex items-center justify-center text-[10px] font-bold text-emerald-700">
                  {i}
                </div>
              ))}
            </div>
            <span className="text-xs font-bold text-slate-400 px-2">সক্রিয় আবেদনকারী</span>
          </div>
        </div>

        {/* Stepper */}
        <div className="mb-12 overflow-x-auto pb-4">
          <div className="flex items-center justify-between min-w-[600px]">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isPast = steps.findIndex(s => s.id === currentStep) > idx;
              
              return (
                <React.Fragment key={step.id}>
                  <div className="flex flex-col items-center gap-3 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      isActive ? 'bg-emerald-600 text-white shadow-xl shadow-emerald-200 scale-110' : 
                      isPast ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-slate-300 border border-slate-100'
                    }`}>
                      <Icon size={24} />
                    </div>
                    <span className={`text-[11px] font-black uppercase tracking-wider ${
                      isActive ? 'text-emerald-700' : 'text-slate-400'
                    }`}>{step.label}</span>
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="flex-1 h-[2px] mx-4 bg-slate-100 relative">
                      <div className={`absolute inset-0 bg-emerald-500 transition-all duration-700 ${
                        isPast ? 'w-full' : 'w-0'
                      }`} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
          <AnimatePresence mode="wait">
            {currentStep === 'search' && (
              <motion.div 
                key="search"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-8 md:p-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-8">
                    <div>
                      <h2 className="text-2xl font-black text-slate-900 mb-2">খতিয়ান নির্বাচন করুন</h2>
                      <p className="text-slate-500 text-sm font-medium">আপনার কাঙ্ক্ষিত খতিয়ানটি খুঁজে পেতে নিচের তথ্যগুলো প্রদান করুন</p>
                    </div>

                    {/* Search Type Tabs */}
                    <div className="flex p-1 bg-slate-100 rounded-2xl">
                      {[
                        { id: 'khatian', label: 'খতিয়ান নং', icon: FileText },
                        { id: 'dag', label: 'দাগ নং', icon: MapIcon },
                        { id: 'owner', label: 'মালিকের নাম', icon: User }
                      ].map(type => (
                        <button
                          key={type.id}
                          onClick={() => setSearchType(type.id as any)}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black transition-all ${
                            searchType === type.id 
                              ? 'bg-white text-emerald-600 shadow-sm' 
                              : 'text-slate-500 hover:text-slate-700'
                          }`}
                        >
                          <type.icon size={14} />
                          {type.label}
                        </button>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1">
                            <Globe size={10} /> বিভাগ
                          </label>
                          <div className="relative">
                            <select 
                              value={selectedDivision}
                              onChange={(e) => {
                                const div = e.target.value;
                                setSelectedDivision(div);
                                const firstDist = Object.keys(locationData[div])[0];
                                setSelectedDistrict(firstDist);
                                const firstUp = Object.keys(locationData[div][firstDist])[0];
                                setSelectedUpazila(firstUp);
                                const firstUn = Object.keys(locationData[div][firstDist][firstUp])[0];
                                setSelectedUnion(firstUn);
                                setSelectedMouza(locationData[div][firstDist][firstUp][firstUn][0]);
                              }}
                              className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
                            >
                              {divisions.map(div => <option key={div} value={div}>{div}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1">
                            <MapPin size={10} /> জেলা
                          </label>
                          <div className="relative">
                            <select 
                              value={selectedDistrict}
                              onChange={(e) => {
                                const dist = e.target.value;
                                setSelectedDistrict(dist);
                                const firstUp = Object.keys(locationData[selectedDivision][dist])[0];
                                setSelectedUpazila(firstUp);
                                const firstUn = Object.keys(locationData[selectedDivision][dist][firstUp])[0];
                                setSelectedUnion(firstUn);
                                setSelectedMouza(locationData[selectedDivision][dist][firstUp][firstUn][0]);
                              }}
                              className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
                            >
                              {districts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1">
                            <Landmark size={10} /> উপজেলা
                          </label>
                          <div className="relative">
                            <select 
                              value={selectedUpazila}
                              onChange={(e) => {
                                const up = e.target.value;
                                setSelectedUpazila(up);
                                const firstUn = Object.keys(locationData[selectedDivision][selectedDistrict][up])[0];
                                setSelectedUnion(firstUn);
                                setSelectedMouza(locationData[selectedDivision][selectedDistrict][up][firstUn][0]);
                              }}
                              className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
                            >
                              {upazilas.map(up => <option key={up} value={up}>{up}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1">
                            <Users size={10} /> ইউনিয়ন
                          </label>
                          <div className="relative">
                            <select 
                              value={selectedUnion}
                              onChange={(e) => {
                                const un = e.target.value;
                                setSelectedUnion(un);
                                setSelectedMouza(locationData[selectedDivision][selectedDistrict][selectedUpazila][un][0]);
                              }}
                              className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
                            >
                              {unions.map(un => <option key={un} value={un}>{un}</option>)}
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1 flex items-center gap-1">
                          <MapIcon size={10} /> মৌজা
                        </label>
                        <div className="relative">
                          <select 
                            value={selectedMouza}
                            onChange={(e) => setSelectedMouza(e.target.value)}
                            className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all appearance-none"
                          >
                            {mouzas.map(m => <option key={m} value={m}>{m}</option>)}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">খতিয়ানের ধরন</label>
                        <div className="grid grid-cols-4 gap-2">
                          {['সিএস', 'এসএ', 'পেটি', 'আরএস', 'বিআরএস', 'দিয়ারা', 'অন্যান্য'].map(type => (
                            <button 
                              key={type} 
                              onClick={() => setSelectedKhatianType(type)}
                              className={`p-3 border-2 rounded-xl text-[10px] font-black transition-all ${
                                selectedKhatianType === type ? 'border-emerald-500 bg-emerald-50 text-emerald-600' : 'bg-white border-slate-100 hover:border-emerald-500 hover:text-emerald-600'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {searchType === 'khatian' && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">খতিয়ান নং</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              value={khatianNo}
                              onChange={(e) => setKhatianNo(e.target.value)}
                              placeholder="যেমন: ১২৩৪" 
                              className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all pl-12" 
                            />
                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          </div>
                        </div>
                      )}

                      {searchType === 'dag' && (
                        <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">দাগ নং</label>
                          <div className="relative">
                            <input 
                              type="text" 
                              value={dagNo}
                              onChange={(e) => setDagNo(e.target.value)}
                              placeholder="যেমন: ৫৬৭" 
                              className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all pl-12" 
                            />
                            <MapIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                          </div>
                        </div>
                      )}

                      {searchType === 'owner' && (
                        <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">মালিকের নাম</label>
                            <div className="relative">
                              <input 
                                type="text" 
                                value={ownerName}
                                onChange={(e) => setOwnerName(e.target.value)}
                                placeholder="মালিকের নাম লিখুন" 
                                className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all pl-12 pr-14" 
                                id="owner-name-input"
                              />
                              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                              <button 
                                onClick={handleNext}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-sm"
                                title={searchType === 'owner' ? "মালিকের নামে অনুসন্ধান করুন" : "অনুসন্ধান করুন"}
                              >
                                <Search size={16} />
                              </button>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">পিতা/স্বামীর নাম (ঐচ্ছিক)</label>
                            <div className="relative">
                              <input 
                                type="text" 
                                value={fatherSpouseName}
                                onChange={(e) => setFatherSpouseName(e.target.value)}
                                placeholder="পিতা বা স্বামীর নাম লিখুন" 
                                className="w-full p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all pl-12" 
                              />
                              <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            </div>
                          </div>
                          <button 
                            onClick={handleNext}
                            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2 mt-4"
                          >
                            <Search size={18} />
                            মালিকের নামে অনুসন্ধান করুন
                          </button>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">ক্যাপচা (Captcha)</label>
                        <div className="flex gap-4">
                          <div className="bg-slate-200 px-6 py-4 rounded-2xl font-mono font-black text-xl tracking-[0.5em] text-slate-600 select-none flex items-center justify-center border-2 border-dashed border-slate-300">
                            {captcha}
                          </div>
                          <input 
                            type="text" 
                            value={userCaptcha}
                            onChange={(e) => setUserCaptcha(e.target.value)}
                            placeholder="কোডটি লিখুন" 
                            className="flex-1 p-4 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all" 
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-[2rem] p-8 flex flex-col justify-center items-center text-center border border-slate-100">
                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-emerald-500 shadow-sm mb-6">
                      <ShieldCheck size={40} />
                    </div>
                    <h3 className="text-lg font-black text-slate-900 mb-3">নিরাপদ ও যাচাইকৃত</h3>
                    <p className="text-slate-500 text-sm leading-relaxed font-medium">
                      ই-খতিয়ান সিস্টেমের মাধ্যমে সরাসরি ভূমি মন্ত্রণালয় থেকে আপনার তথ্য যাচাই করা হবে। কোনো মধ্যস্বত্বভোগী ছাড়াই সরাসরি আবেদন করুন।
                    </p>
                    <div className="mt-8 w-full space-y-3">
                      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                        <span className="text-xs font-bold text-slate-500">সার্ভিস চার্জ</span>
                        <span className="text-xs font-black text-emerald-600">৳ ২০.০০</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                        <span className="text-xs font-bold text-slate-500">প্রসেসিং টাইম</span>
                        <span className="text-xs font-black text-emerald-600">তাৎক্ষণিক</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'results' && (
              <motion.div 
                key="results"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12"
              >
                <div className="max-w-4xl mx-auto space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-black text-slate-900 mb-2">অনুসন্ধানের ফলাফল</h2>
                    <p className="text-slate-500 text-sm font-medium">নিচের তালিকা থেকে আপনার কাঙ্ক্ষিত খতিয়ানটি নির্বাচন করুন</p>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <button
                          key={result.id}
                          onClick={() => setSelectedKhatianId(result.id)}
                          className={`p-6 rounded-3xl border-2 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 text-left ${
                            selectedKhatianId === result.id ? 'border-emerald-500 bg-emerald-50' : 'border-slate-100 bg-white hover:border-slate-200'
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                              selectedKhatianId === result.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
                            }`}>
                              <FileText size={24} />
                            </div>
                            <div>
                              <h4 className="font-black text-slate-900">খতিয়ান নং: {result.khatianNo}</h4>
                              <p className="text-xs text-slate-500 font-bold">দাগ নং: {result.dagNo}</p>
                            </div>
                          </div>
                          <div className="md:text-right">
                            <p className="text-sm font-black text-slate-700">{result.owner}</p>
                            <p className="text-[10px] text-slate-400 font-bold">পিতা/স্বামী: {result.father}</p>
                          </div>
                          {selectedKhatianId === result.id && (
                            <div className="text-emerald-600">
                              <CheckCircle2 size={24} />
                            </div>
                          )}
                        </button>
                      ))
                    ) : (
                      <div className="p-12 text-center bg-white rounded-3xl border-2 border-dashed border-slate-100">
                        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Search size={32} />
                        </div>
                        <h4 className="text-lg font-black text-slate-400">কোনো খতিয়ান পাওয়া যায়নি</h4>
                        <p className="text-sm text-slate-400 font-medium">অনুগ্রহ করে সঠিক তথ্য দিয়ে পুনরায় চেষ্টা করুন</p>
                      </div>
                    )}
                  </div>

                  <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shrink-0 shadow-sm">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-blue-900 mb-1">খতিয়ান খুঁজে পাচ্ছেন না?</h4>
                      <p className="text-xs text-blue-700 font-medium leading-relaxed">
                        যদি আপনার খতিয়ানটি অনলাইনে না থাকে, তবে আপনার নিকটস্থ ভূমি অফিসে যোগাযোগ করুন অথবা অনলাইনে আবেদনের মাধ্যমে ডিজিটাইজ করার অনুরোধ জানান।
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'details' && (
              <motion.div 
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-8 md:p-12"
              >
                <div className="max-w-2xl mx-auto space-y-8">
                  <div className="text-center">
                    <h2 className="text-2xl font-black text-slate-900 mb-2">আবেদনকারীর তথ্য</h2>
                    <p className="text-slate-500 text-sm font-medium">সঠিক তথ্য প্রদান করুন, এটি খতিয়ানের সাথে সংরক্ষিত থাকবে</p>
                  </div>

                  {/* Selected Khatian Preview */}
                  {selectedKhatianId && (
                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                          <FileText size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">নির্বাচিত খতিয়ান</p>
                          <p className="text-sm font-black text-slate-700">
                            নং: {mockResults.find(r => r.id === selectedKhatianId)?.khatianNo} (মৌজা: {selectedMouza})
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setCurrentStep('results')}
                        className="text-xs font-black text-emerald-600 hover:underline"
                      >
                        পরিবর্তন করুন
                      </button>
                    </div>
                  )}

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">জাতীয় পরিচয়পত্র নম্বর</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          value={nidNumber}
                          onChange={(e) => setNidNumber(e.target.value)}
                          placeholder="NID Number" 
                          className="w-full p-5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all pl-14" 
                        />
                        <ShieldCheck className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">জন্ম তারিখ</label>
                        <input 
                          type="date" 
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="w-full p-5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">মোবাইল নম্বর</label>
                        <div className="relative">
                          <input 
                            type="text" 
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                            placeholder="01XXXXXXXXX" 
                            className="w-full p-5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all pl-14" 
                          />
                          <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">ইমেইল (ঐচ্ছিক)</label>
                      <div className="relative">
                        <input 
                          type="email" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="example@mail.com" 
                          className="w-full p-5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all pl-14" 
                        />
                        <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={24} />
                      </div>
                    </div>

                    {!isNidVerified ? (
                      <button 
                        onClick={() => {
                          if (nidNumber && dob && mobile) {
                            setIsLoading(true);
                            setTimeout(() => {
                              setIsLoading(false);
                              setIsNidVerified(true);
                            }, 1500);
                          } else {
                            alert('সবগুলো তথ্য প্রদান করুন');
                          }
                        }}
                        className="w-full p-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
                      >
                        {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'এনআইডি যাচাই করুন'}
                      </button>
                    ) : (
                      <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-4">
                        <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm">
                          <CheckCircle2 size={20} />
                        </div>
                        <div>
                          <h4 className="text-sm font-black text-emerald-900 mb-1">ভেরিফিকেশন সফল</h4>
                          <p className="text-xs text-emerald-700 font-medium leading-relaxed">
                            আপনার এনআইডি তথ্য সফলভাবে যাচাই করা হয়েছে। (নাম: মো: আব্দুল করিম)
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-3 pt-4">
                      <input 
                        type="checkbox" 
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500"
                      />
                      <label htmlFor="terms" className="text-xs text-slate-500 font-medium leading-relaxed">
                        আমি ঘোষণা করছি যে, আমার প্রদানকৃত সকল তথ্য সঠিক। কোনো ভুল তথ্য প্রদানের জন্য কর্তৃপক্ষ দায়ী থাকবে না। আমি <span className="text-emerald-600 font-bold cursor-pointer hover:underline">শর্তাবলী ও গোপনীয়তা নীতি</span> মেনে নিচ্ছি।
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'delivery' && (
              <motion.div 
                key="delivery"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                className="p-8 md:p-12"
              >
                <div className="text-center mb-12">
                  <h2 className="text-2xl font-black text-slate-900 mb-2">প্রেরণ পদ্ধতি নির্বাচন করুন</h2>
                  <p className="text-slate-500 text-sm font-medium">আপনি কিভাবে খতিয়ানটি সংগ্রহ করতে চান?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { 
                      id: 'online', 
                      title: 'অনলাইন কপি', 
                      desc: 'তাৎক্ষণিক ডাউনলোড ও প্রিন্ট', 
                      price: '১০০', 
                      icon: Download,
                      color: 'emerald'
                    },
                    { 
                      id: 'sentry', 
                      title: 'ই-সেন্টরি সংগ্রহ', 
                      desc: 'ভূমি অফিস থেকে সার্টিফাইড কপি', 
                      price: '১৪০', 
                      icon: Building2,
                      color: 'blue'
                    },
                    { 
                      id: 'post', 
                      title: 'ডাক মারফতে', 
                      desc: 'সরাসরি আপনার ঠিকানায় হোম ডেলিভারি', 
                      price: '১৯০', 
                      icon: Mail,
                      color: 'amber'
                    },
                  ].map((item) => {
                    const Icon = item.icon;
                    const isSelected = deliveryType === item.id;
                    
                    return (
                      <button 
                        key={item.id}
                        onClick={() => setDeliveryType(item.id as DeliveryType)}
                        className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center text-center group relative overflow-hidden ${
                          isSelected ? 'border-emerald-500 bg-emerald-50/30' : 'border-slate-100 bg-white hover:border-slate-200'
                        }`}
                      >
                        {isSelected && (
                          <div className="absolute top-4 right-4 text-emerald-600">
                            <CheckCircle2 size={24} />
                          </div>
                        )}
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${
                          isSelected ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : 'bg-slate-50 text-slate-400'
                        }`}>
                          <Icon size={32} />
                        </div>
                        <h3 className={`text-lg font-black mb-2 ${isSelected ? 'text-emerald-900' : 'text-slate-700'}`}>{item.title}</h3>
                        <p className="text-xs text-slate-400 font-bold mb-6 leading-relaxed">{item.desc}</p>
                        <div className={`mt-auto px-6 py-2 rounded-full text-sm font-black ${
                          isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-500'
                        }`}>
                          ৳ {item.price}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {deliveryType === 'post' && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-8 max-w-2xl mx-auto space-y-4"
                  >
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">ডেলিভারি ঠিকানা</label>
                    <textarea 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="আপনার পূর্ণ ঠিকানা লিখুন (গ্রাম/রাস্তা, ডাকঘর, উপজেলা, জেলা)"
                      className="w-full p-5 bg-slate-50 border-none rounded-2xl text-sm font-bold text-slate-700 focus:ring-2 focus:ring-emerald-500 transition-all min-h-[120px]"
                    />
                  </motion.div>
                )}
              </motion.div>
            )}

            {currentStep === 'payment' && (
              <motion.div 
                key="payment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 md:p-12"
              >
                <div className="max-w-xl mx-auto">
                  <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-12">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">মোট পরিশোধযোগ্য</p>
                          <h3 className="text-4xl font-black">৳ {deliveryType === 'online' ? '১০০' : deliveryType === 'sentry' ? '১৪০' : '১৯০'}.০০</h3>
                        </div>
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                          <Wallet size={24} />
                        </div>
                      </div>
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">আবেদন আইডি</p>
                          <p className="text-sm font-mono font-bold">KH-2024-8892</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">তারিখ</p>
                          <p className="text-sm font-bold">২৮ ফেব, ২০২৪</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">পেমেন্ট মেথড নির্বাচন করুন</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { id: 'nagad', name: 'নগদ', color: 'bg-[#ed1c24]', textColor: 'text-white' },
                        { id: 'bkash', name: 'বিকাশ', color: 'bg-[#e2136e]', textColor: 'text-white' },
                        { id: 'rocket', name: 'রকেট', color: 'bg-[#8c3494]', textColor: 'text-white' },
                        { id: 'upay', name: 'উপায়', color: 'bg-[#ffc40c]', textColor: 'text-gray-900' }
                      ].map((method) => (
                        <button key={method.id} className="p-6 bg-white border-2 border-slate-100 rounded-3xl hover:border-emerald-500 transition-all flex flex-col items-center gap-3 group">
                          <div className={`w-12 h-12 ${method.color} rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
                            <Wallet className={method.textColor} size={24} />
                          </div>
                          <span className="text-xs font-black text-slate-600">{method.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 'success' && (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-12 md:p-20 text-center"
              >
                <div className="w-24 h-24 bg-emerald-100 rounded-[2rem] flex items-center justify-center text-emerald-600 mx-auto mb-8 shadow-xl shadow-emerald-100">
                  <CheckCircle2 size={48} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 mb-4">আবেদন সফল হয়েছে!</h2>
                <p className="text-slate-500 font-medium max-w-md mx-auto mb-12">
                  আপনার খতিয়ান আবেদনটি গৃহীত হয়েছে। নিচের বাটন থেকে আপনার ডিজিটাল কপিটি সংগ্রহ করুন।
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto">
                  <button className="flex items-center justify-center gap-3 p-5 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">
                    <Download size={20} />
                    খতিয়ান ডাউনলোড
                  </button>
                  <button className="flex items-center justify-center gap-3 p-5 bg-white border-2 border-slate-100 text-slate-700 rounded-2xl font-black hover:border-slate-200 transition-all">
                    <Printer size={20} />
                    রশিদ প্রিন্ট
                  </button>
                </div>

                <div className="mt-12 p-6 bg-slate-50 rounded-3xl border border-slate-100 inline-flex items-center gap-4">
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">ট্র্যাকিং আইডি</p>
                    <p className="text-sm font-mono font-bold text-slate-700">TRK-9902-X881</p>
                  </div>
                  <div className="w-[1px] h-8 bg-slate-200" />
                  <div className="text-left">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">ডেলিভারি স্ট্যাটাস</p>
                    <p className="text-sm font-bold text-emerald-600">প্রস্তুত</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Navigation */}
          {currentStep !== 'success' && (
            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
              <button 
                onClick={handleBack}
                disabled={currentStep === 'search'}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all ${
                  currentStep === 'search' ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:bg-white hover:shadow-sm'
                }`}
              >
                <ArrowLeft size={18} />
                পিছনে
              </button>

              <button 
                onClick={handleNext}
                disabled={isLoading}
                className="flex items-center gap-2 px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {currentStep === 'payment' ? 'পেমেন্ট সম্পন্ন করুন' : 'পরবর্তী ধাপ'}
                    <ChevronRight size={18} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Support Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100">
            <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <Smartphone size={24} />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">হেল্পলাইন ১৬১২২</h4>
              <p className="text-[10px] text-slate-400 font-bold">২৪/৭ কাস্টমার সাপোর্ট</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100">
            <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
              <Clock size={24} />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">তাৎক্ষণিক সেবা</h4>
              <p className="text-[10px] text-slate-400 font-bold">ডিজিটাল কপি ৫ মিনিটে</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-6 bg-white rounded-3xl border border-slate-100">
            <div className="w-12 h-12 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-600">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900">সুরক্ষিত পেমেন্ট</h4>
              <p className="text-[10px] text-slate-400 font-bold">SSL এনক্রিপ্টেড গেটওয়ে</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
