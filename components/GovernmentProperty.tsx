
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Globe, Landmark, ChevronDown, ArrowRight, ArrowLeft, FileText, ShieldAlert, History, Building2, Trees, Droplets, Info, Download, Share2, Eye, Filter, CheckCircle2, ScrollText, Gavel, X, Scale, AlertCircle, ClipboardList, Mountain, Waves } from 'lucide-react';

import { locationData } from '../src/data/locations';

type PropertyType = 'vested' | 'abandoned' | 'khas' | 'institutional' | 'forest' | 'water' | 'char' | 'sairat';

interface GovProperty {
  id: string;
  type: PropertyType;
  caseNo: string;
  district: string;
  upazila: string;
  mouza: string;
  dagNo: string;
  khatianNo: string;
  area: string;
  status: string;
  remarks: string;
  schedule?: 'ক' | 'খ' | 'খ ১/১';
  gazetteNo?: string;
  caseStatus?: string;
}

const mockGovProperties: GovProperty[] = [
  { 
    id: '1', 
    type: 'vested', 
    caseNo: 'ভিপি-১২৩/২০২৪', 
    district: 'ঢাকা', 
    upazila: 'তেজগাঁও', 
    mouza: 'তেজগাঁও', 
    dagNo: '৪৫৬', 
    khatianNo: '৭৮৯', 
    area: '১০.৫ শতাংশ', 
    status: 'তালিকাভুক্ত', 
    remarks: 'ক-তফসিল',
    schedule: 'ক',
    gazetteNo: 'গেজেট-২০২৪/১১২',
    caseStatus: 'নিষ্পত্তি'
  },
  { 
    id: '2', 
    type: 'abandoned', 
    caseNo: 'পি-৪৫৬/২০২৩', 
    district: 'ঢাকা', 
    upazila: 'গুলশান', 
    mouza: 'গুলশান', 
    dagNo: '১২৩', 
    khatianNo: '৩২১', 
    area: '৫.২ শতাংশ', 
    status: 'সরকার নিয়ন্ত্রিত', 
    remarks: 'বাণিজ্যিক প্লট' 
  },
  { 
    id: '3', 
    type: 'khas', 
    caseNo: 'খাস-৭৮৯/২০২২', 
    district: 'ঢাকা', 
    upazila: 'সাভার', 
    mouza: 'বিরুলিয়া', 
    dagNo: '৮৯০', 
    khatianNo: '৫৬৭', 
    area: '১৫.০ শতাংশ', 
    status: 'বন্দোবস্তযোগ্য', 
    remarks: 'কৃষি জমি' 
  },
  { 
    id: '4', 
    type: 'institutional', 
    caseNo: 'ইনস্ট-১০১/২০২৪', 
    district: 'ঢাকা', 
    upazila: 'ধানমণ্ডি', 
    mouza: 'ধানমণ্ডি', 
    dagNo: '৯১০', 
    khatianNo: '১১২', 
    area: '৮.০ শতাংশ', 
    status: 'দখলভুক্ত', 
    remarks: 'শিক্ষা প্রতিষ্ঠান' 
  },
  { 
    id: '5', 
    type: 'vested', 
    caseNo: 'ভিপি-৭৮৯/২০২৩', 
    district: 'ময়মনসিংহ', 
    upazila: 'মুক্তাগাছা', 
    mouza: 'মুক্তাগাছা সদর', 
    dagNo: '৫৬৭', 
    khatianNo: '৮৯০', 
    area: '১২.৩ শতাংশ', 
    status: 'তালিকাভুক্ত', 
    remarks: 'খ-তফসিল',
    schedule: 'খ',
    gazetteNo: 'গেজেট-২০২৩/৪৫',
    caseStatus: 'চলমান'
  },
  { 
    id: '6', 
    type: 'khas', 
    caseNo: 'খাস-৫৬৭/২০২৪', 
    district: 'চট্টগ্রাম', 
    upazila: 'পতেঙ্গা', 
    mouza: 'পতেঙ্গা', 
    dagNo: '১১২', 
    khatianNo: '৩৪৫', 
    area: '২০.৫ শতাংশ', 
    status: 'বন্দোবস্তযোগ্য', 
    remarks: 'লবণ চাষের জমি' 
  },
  { 
    id: '7', 
    type: 'vested', 
    caseNo: 'ভিপি-৮৯০/২০২৪', 
    district: 'সিলেট', 
    upazila: 'গোলাপগঞ্জ', 
    mouza: 'গোলাপগঞ্জ', 
    dagNo: '২৩৪', 
    khatianNo: '৫৬৭', 
    area: '৭.৮ শতাংশ', 
    status: 'তালিকাভুক্ত', 
    remarks: 'ক-তফসিল',
    schedule: 'ক'
  },
  { 
    id: '8', 
    type: 'khas', 
    caseNo: 'খাস-১১২/২০২৩', 
    district: 'রাজশাহী', 
    upazila: 'পবা', 
    mouza: 'পবা', 
    dagNo: '৩৪৫', 
    khatianNo: '৬৭৮', 
    area: '২৫.০ শতাংশ', 
    status: 'অ-বন্দোবস্তযোগ্য', 
    remarks: 'জলাশয়' 
  },
  { 
    id: '9', 
    type: 'forest', 
    caseNo: 'বন-৪৫৬/২০২৪', 
    district: 'ঢাকা', 
    upazila: 'তেজগাঁও', 
    mouza: 'তেজগাঁও সদর', 
    dagNo: '১২৩', 
    khatianNo: '৪৫৬', 
    area: '৫০.০ একর', 
    status: 'সংরক্ষিত বনভূমি', 
    remarks: 'সংরক্ষিত ও গেজেটভুক্ত বনভূমি',
    gazetteNo: 'গেজেট-২০২৪/০৯'
  },
  { 
    id: '10', 
    type: 'water', 
    caseNo: 'জল-৭৮৯/২০২৪', 
    district: 'ঢাকা', 
    upazila: 'তেজগাঁও', 
    mouza: 'হাতিরঝিল এলাকা', 
    dagNo: '৫৬৭', 
    khatianNo: '৮৯০', 
    area: '১০০.০ একর', 
    status: 'সরকারি জলাশয়', 
    remarks: 'হাতিরঝিল ও সংলগ্ন জলাশয়' 
  },
  { 
    id: '11', 
    type: 'char', 
    caseNo: 'চর-১০১/২০২৪', 
    district: 'ঢাকা', 
    upazila: 'তেজগাঁও', 
    mouza: 'বুড়িগঙ্গা চর', 
    dagNo: '৯১০', 
    khatianNo: '১১২', 
    area: '৩০.৫ একর', 
    status: 'বন্দোবস্তযোগ্য চর', 
    remarks: 'নদী সিকস্তি ও পয়স্তি জনিত চর' 
  },
  { 
    id: '12', 
    type: 'sairat', 
    caseNo: 'সায়রাত-২০২/২০২৪', 
    district: 'ঢাকা', 
    upazila: 'তেজগাঁও', 
    mouza: 'তেজগাঁও এলাকা', 
    dagNo: '২৩৪', 
    khatianNo: '৫৬৭', 
    area: '১৫.০ একর', 
    status: 'সায়রাত মহাল', 
    remarks: 'বালুমহাল ও জলমহাল ব্যবস্থাপনা' 
  }
];

interface GovernmentPropertyProps {
  initialType?: PropertyType;
  onBack?: () => void;
}

const GovernmentProperty: React.FC<GovernmentPropertyProps> = ({ initialType, onBack }) => {
  const [activeType, setActiveType] = useState<PropertyType>(initialType || 'vested');
  const [properties, setProperties] = useState<GovProperty[]>(mockGovProperties);
  const [editingProperty, setEditingProperty] = useState<GovProperty | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [updateStatus, setUpdateStatus] = useState('');
  const [updateRemarks, setUpdateRemarks] = useState('');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeType]);

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showLegalModal, setShowLegalModal] = useState(false);
  const [showSettlementModal, setShowSettlementModal] = useState(false);

  const [selectedDivision, setSelectedDivision] = useState('ঢাকা');
  const [selectedDistrict, setSelectedDistrict] = useState('ঢাকা');
  const [selectedUpazila, setSelectedUpazila] = useState('তেজগাঁও');

  const divisions = useMemo(() => Object.keys(locationData), []);
  const districts = useMemo(() => Object.keys(locationData[selectedDivision] || {}), [selectedDivision]);
  const upazilas = useMemo(() => Object.keys(locationData[selectedDivision]?.[selectedDistrict] || {}), [selectedDivision, selectedDistrict]);

  const propertyTypes = [
    { id: 'khas', label: 'খাস সম্পত্তি', icon: Landmark, color: 'text-emerald-600', bg: 'bg-emerald-50', desc: 'সরকারের মালিকানাধীন বন্দোবস্তযোগ্য বা অ-বন্দোবস্তযোগ্য ভূমি।' },
    { id: 'vested', label: 'অর্পিত সম্পত্তি', icon: ShieldAlert, color: 'text-rose-600', bg: 'bg-rose-50', desc: 'শত্রু সম্পত্তি বা অর্পিত সম্পত্তি আইন অনুযায়ী তালিকাভুক্ত।' },
    { id: 'institutional', label: 'প্রাতিষ্ঠানিক সম্পত্তি', icon: Building2, color: 'text-blue-600', bg: 'bg-blue-50', desc: 'সরকারি বিভিন্ন প্রতিষ্ঠানের অনুকূলে বরাদ্দকৃত বা ব্যবহৃত ভূমি।' },
    { id: 'forest', label: 'বনভূমি', icon: Trees, color: 'text-green-600', bg: 'bg-green-50', desc: 'সংরক্ষিত ও গেজেটভুক্ত সরকারি বনভূমি ও বনাঞ্চল।' },
    { id: 'water', label: 'জলাভূমি রক্ষা', icon: Droplets, color: 'text-cyan-600', bg: 'bg-cyan-50', desc: 'সরকারি নদী, খাল, বিল ও জলাশয় সংরক্ষণ ও ব্যবস্থাপনা।' },
    { id: 'char', label: 'চর ব্যবস্থাপনা', icon: Mountain, color: 'text-amber-600', bg: 'bg-amber-50', desc: 'নদী সিকস্তি ও পয়স্তি জনিত চর জমি ও বন্দোবস্ত ব্যবস্থাপনা।' },
    { id: 'sairat', label: 'সায়রাত মহাল', icon: Waves, color: 'text-indigo-600', bg: 'bg-indigo-50', desc: 'জলমহাল, বালুমহাল, পাথর মহাল ও অন্যান্য সায়রাত মহাল।' },
    { id: 'abandoned', label: 'পরিত্যক্ত সম্পত্তি', icon: History, color: 'text-stone-600', bg: 'bg-stone-50', desc: 'মালিকহীন বা পরিত্যক্ত হিসেবে সরকার কর্তৃক নিয়ন্ত্রিত সম্পত্তি।' },
  ];

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const matchesType = p.type === activeType;
      const matchesLocation = p.district === selectedDistrict && p.upazila === selectedUpazila;
      const matchesSearch = searchQuery === '' || 
        p.caseNo.includes(searchQuery) || 
        p.mouza.includes(searchQuery) || 
        p.dagNo.includes(searchQuery);
      
      return matchesType && matchesLocation && matchesSearch;
    });
  }, [activeType, searchQuery, selectedDistrict, selectedUpazila]);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 600);
  };

  const handleEditClick = (prop: GovProperty) => {
    setEditingProperty(prop);
    setUpdateStatus(prop.status);
    setUpdateRemarks(prop.remarks);
    setShowEditModal(true);
  };

  const handleUpdateProperty = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProperty) return;

    const updatedProperties = properties.map(p => 
      p.id === editingProperty.id 
        ? { ...p, status: updateStatus, remarks: updateRemarks } 
        : p
    );

    setProperties(updatedProperties);
    setShowEditModal(false);
    setEditingProperty(null);
    alert('সম্পত্তির তথ্য সফলভাবে আপডেট করা হয়েছে।');
  };

  const statusOptions = [
    'তালিকাভুক্ত',
    'সরকার নিয়ন্ত্রিত',
    'বন্দোবস্তযোগ্য',
    'অ-বন্দোবস্তযোগ্য',
    'দখলভুক্ত',
    'মামলাধীন (Under Litigation)',
    'জরিপাধীন (Under Survey)'
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Header */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex items-center gap-6">
            {onBack && (
              <button 
                onClick={onBack}
                className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all group"
                title="পেছনে ফিরে যান"
              >
                <ArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            )}
            <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center text-rose-600 shadow-inner">
              <Landmark size={40} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-gray-800 mb-1 tracking-tight text-left">সরকারি সম্পত্তি ব্যবস্থাপনা</h2>
              <p className="text-gray-500 font-medium text-left">অর্পিত, পরিত্যক্ত, খাস এবং সরকারি প্রাতিষ্ঠানিক সম্পত্তির তথ্য</p>
            </div>
          </div>
        </div>

        {/* Type Selector - Side by Side Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {propertyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type.id as PropertyType)}
              className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-start text-left group relative overflow-hidden ${
                activeType === type.id 
                  ? `border-gray-900 bg-gray-900 text-white shadow-2xl scale-[1.02]` 
                  : `border-gray-100 bg-white text-gray-500 hover:border-gray-200 hover:shadow-lg`
              }`}
            >
              <div className={`p-4 rounded-2xl mb-4 ${activeType === type.id ? 'bg-white/20 text-white' : `${type.bg} ${type.color}`} transition-colors`}>
                <type.icon size={32} />
              </div>
              <h3 className={`text-xl font-black mb-2 ${activeType === type.id ? 'text-white' : 'text-gray-800'}`}>{type.label}</h3>
              <p className={`text-xs font-medium leading-relaxed ${activeType === type.id ? 'text-gray-300' : 'text-gray-500'}`}>
                {type.desc}
              </p>
              {activeType === type.id && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 size={24} className="text-emerald-400" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">বিভাগ</label>
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
                  }}
                  className="w-full px-5 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-gray-800 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                >
                  {divisions.map(div => <option key={div} value={div}>{div}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">জেলা</label>
              <div className="relative">
                <select 
                  value={selectedDistrict}
                  onChange={(e) => {
                    const dist = e.target.value;
                    setSelectedDistrict(dist);
                    const firstUp = Object.keys(locationData[selectedDivision][dist])[0];
                    setSelectedUpazila(firstUp);
                  }}
                  className="w-full px-5 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-gray-800 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                >
                  {districts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">উপজেলা</label>
              <div className="relative">
                <select 
                  value={selectedUpazila}
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  className="w-full px-5 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-gray-800 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                >
                  {upazilas.map(up => <option key={up} value={up}>{up}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="কেস নম্বর, মৌজা অথবা দাগ নম্বর দিয়ে খুঁজুন..."
              className="w-full px-8 py-5 bg-white border-2 border-transparent rounded-2xl focus:border-gray-800 outline-none transition-all font-black text-lg text-gray-700 shadow-sm pr-32"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-2 top-2 bottom-2 px-8 bg-gray-800 text-white font-black rounded-xl hover:bg-black transition-all shadow-lg flex items-center gap-2"
            >
              {isSearching ? 'খোঁজা হচ্ছে...' : 'অনুসন্ধান'} <Search size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-6">
        <div className="flex items-center justify-between px-4">
          <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-rose-500 rounded-full"/> তালিকাভুক্ত সম্পত্তি ({filteredProperties.length})
          </h3>
          <button className="text-gray-500 font-black text-sm flex items-center gap-2 hover:text-gray-800 transition-colors">
            <Filter size={16} /> ফিল্টার
          </button>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {filteredProperties.map((prop) => (
              <div key={prop.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                      prop.type === 'vested' ? 'bg-rose-50 text-rose-600' :
                      prop.type === 'abandoned' ? 'bg-stone-50 text-stone-600' :
                      prop.type === 'khas' ? 'bg-emerald-50 text-emerald-600' :
                      prop.type === 'forest' ? 'bg-green-50 text-green-600' :
                      prop.type === 'water' ? 'bg-cyan-50 text-cyan-600' :
                      prop.type === 'char' ? 'bg-amber-50 text-amber-600' :
                      prop.type === 'sairat' ? 'bg-indigo-50 text-indigo-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      <FileText size={28} />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-lg font-black text-gray-800">কেস নম্বর: {prop.caseNo}</h4>
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                          {prop.status}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 font-bold">
                        <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400"/> {prop.district}, {prop.upazila}</span>
                        <span className="flex items-center gap-1.5"><Globe size={14} className="text-gray-400"/> মৌজা: {prop.mouza}</span>
                        <span className="flex items-center gap-1.5"><Building2 size={14} className="text-gray-400"/> দাগ: {prop.dagNo}</span>
                        <span className="flex items-center gap-1.5"><FileText size={14} className="text-gray-400"/> খতিয়ান: {prop.khatianNo}</span>
                        <span className="flex items-center gap-1.5"><Landmark size={14} className="text-gray-400"/> পরিমাণ: {prop.area}</span>
                        {(prop.type === 'vested' || prop.type === 'forest') && (
                          <>
                            {prop.type === 'vested' && <span className="flex items-center gap-1.5 text-rose-600"><ShieldAlert size={14}/> তফসিল: {prop.schedule}</span>}
                            {prop.gazetteNo && <span className="flex items-center gap-1.5"><ScrollText size={14} className="text-gray-400"/> গেজেট: {prop.gazetteNo}</span>}
                            {prop.caseStatus && <span className="flex items-center gap-1.5"><Gavel size={14} className="text-gray-400"/> মামলার অবস্থা: {prop.caseStatus}</span>}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => handleEditClick(prop)}
                      className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all"
                      title="আপডেট করুন"
                    >
                      <ClipboardList size={20} />
                    </button>
                    <button className="p-3 bg-gray-50 text-gray-500 rounded-xl hover:bg-gray-100 transition-all">
                      <Download size={20} />
                    </button>
                    <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl font-black text-sm hover:bg-black transition-all shadow-lg">
                      <Eye size={18} /> বিস্তারিত
                    </button>
                  </div>
                </div>
                {prop.remarks && (
                  <div className="mt-4 pt-4 border-t border-gray-50 flex items-center gap-2 text-xs font-bold text-gray-400">
                    <Info size={14} /> মন্তব্য: {prop.remarks}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-20 rounded-[3rem] border border-gray-100 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <Search size={40} />
            </div>
            <h4 className="text-xl font-black text-gray-800">কোনো তথ্য পাওয়া যায়নি</h4>
            <p className="text-gray-500 font-medium max-w-xs mx-auto">আপনার দেওয়া তথ্যগুলো পুনরায় যাচাই করে আবার চেষ্টা করুন।</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
              <ShieldAlert size={28} className="text-rose-400" /> গুরুত্বপূর্ণ তথ্য
            </h3>
            <p className="text-sm font-medium text-gray-300 leading-relaxed mb-6">
              অর্পিত ও পরিত্যক্ত সম্পত্তির তালিকা নিয়মিত হালনাগাদ করা হয়। কোনো সম্পত্তির মালিকানা নিয়ে দাবি থাকলে সংশ্লিষ্ট জেলা প্রশাসক কার্যালয়ে যোগাযোগ করুন।
            </p>
            <button 
              onClick={() => setShowLegalModal(true)}
              className="flex items-center gap-2 text-rose-400 font-black text-xs hover:underline"
            >
              আইনি নির্দেশিকা দেখুন <ArrowRight size={14} />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-rose-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h4 className="font-black text-gray-800">খাস জমি বন্দোবস্ত</h4>
              <p className="text-xs text-gray-500 font-medium">ভূমিহীনদের জন্য সরকারি খাস জমি বন্দোবস্তের আবেদন প্রক্রিয়া জানুন।</p>
            </div>
          </div>
          <button 
            onClick={() => setShowSettlementModal(true)}
            className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg"
          >
            বন্দোবস্ত আবেদন নির্দেশিকা
          </button>
        </div>
      </div>

      {/* Edit Property Modal */}
      {showEditModal && editingProperty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-blue-50/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <ClipboardList size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-800">অবস্থা ও মন্তব্য আপডেট</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">কেস নম্বর: {editingProperty.caseNo}</p>
                </div>
              </div>
              <button onClick={() => setShowEditModal(false)} className="p-3 hover:bg-blue-100 text-gray-400 hover:text-blue-600 rounded-2xl transition-all">
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleUpdateProperty} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">বর্তমান অবস্থা</label>
                <div className="relative">
                  <select 
                    value={updateStatus}
                    onChange={(e) => setUpdateStatus(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-600 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                  >
                    {statusOptions.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মন্তব্য</label>
                <textarea 
                  value={updateRemarks}
                  onChange={(e) => setUpdateRemarks(e.target.value)}
                  placeholder="সম্পত্তি সম্পর্কে কোনো মন্তব্য লিখুন..."
                  rows={4}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-blue-600 outline-none transition-all font-bold text-gray-700 shadow-sm resize-none"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-2xl font-black hover:bg-gray-200 transition-all"
                >
                  বাতিল
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
                >
                  আপডেট করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Legal Guidelines Modal */}
      {showLegalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-rose-50/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-rose-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-200">
                  <Gavel size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight">অর্পিত ও পরিত্যক্ত সম্পত্তি আইনি নির্দেশিকা</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">আইনি কাঠামো ও প্রতিকার ব্যবস্থা</p>
                </div>
              </div>
              <button onClick={() => setShowLegalModal(false)} className="p-3 hover:bg-rose-100 text-gray-400 hover:text-rose-600 rounded-2xl transition-all">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-rose-600 rounded-full" />
                  <h4 className="text-xl font-black text-gray-800">অর্পিত সম্পত্তি (Vested Property) আইন</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
                    <h5 className="font-black text-rose-700 flex items-center gap-2"><Scale size={18}/> ক-তফসিল ভুক্ত সম্পত্তি</h5>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      যে সকল অর্পিত সম্পত্তি সরকারের সরাসরি নিয়ন্ত্রণে ও দখলে আছে এবং যার গেজেট প্রকাশিত হয়েছে। এই সম্পত্তি প্রত্যর্পণের জন্য অর্পিত সম্পত্তি প্রত্যর্পণ ট্রাইব্যুনালে মামলা করতে হয়।
                    </p>
                  </div>
                  <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
                    <h5 className="font-black text-rose-700 flex items-center gap-2"><Scale size={18}/> খ-তফসিল ভুক্ত সম্পত্তি</h5>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      ২০১৩ সালের সংশোধনী অনুযায়ী 'খ' তফসিল বাতিল করা হয়েছে। এই তালিকার সম্পত্তি এখন সাধারণ জমির মতো কেনা-বেচা ও নামজারি করা সম্ভব, যদি না তা 'ক' তফসিলে অন্তর্ভুক্ত থাকে।
                    </p>
                  </div>
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-amber-600 rounded-full" />
                  <h4 className="text-xl font-black text-gray-800">পরিত্যক্ত সম্পত্তি (Abandoned Property) আইন</h4>
                </div>
                <div className="p-8 bg-amber-50/50 rounded-[2.5rem] border border-amber-100 space-y-6">
                  <p className="text-sm text-gray-700 font-bold leading-relaxed">
                    বাংলাদেশ পরিত্যক্ত সম্পত্তি (নিয়ন্ত্রণ, ব্যবস্থাপনা ও বিলি) অধ্যাদেশ, ১৯৭২ অনুযায়ী যে সকল মালিক বাংলাদেশ ত্যাগ করেছেন এবং যাদের সম্পত্তির কোনো বৈধ উত্তরাধিকারী নেই, তা পরিত্যক্ত সম্পত্তি হিসেবে গণ্য হয়।
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100">
                      <p className="text-[10px] font-black text-amber-600 uppercase mb-1">দাবি উত্থাপন</p>
                      <p className="text-xs font-bold text-gray-600">গৃহায়ন ও গণপূর্ত মন্ত্রণালয়ে আবেদন করতে হয়।</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100">
                      <p className="text-[10px] font-black text-amber-600 uppercase mb-1">আদালত</p>
                      <p className="text-xs font-bold text-gray-600">পরিত্যক্ত সম্পত্তি আদালত (Court of Settlement) এ মামলা করা যায়।</p>
                    </div>
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-amber-100">
                      <p className="text-[10px] font-black text-amber-600 uppercase mb-1">নিষ্পত্তি</p>
                      <p className="text-xs font-bold text-gray-600">আদালতের রায়ের ভিত্তিতে গেজেট থেকে নাম কর্তন করা হয়।</p>
                    </div>
                  </div>
                </div>
              </section>

              <div className="p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4">
                <AlertCircle className="text-blue-600 shrink-0" size={24} />
                <p className="text-xs font-bold text-blue-800 leading-relaxed">
                  সতর্কতা: অর্পিত বা পরিত্যক্ত সম্পত্তি ক্রয়ের পূর্বে অবশ্যই সংশ্লিষ্ট জেলা প্রশাসক কার্যালয় (অর্পিত শাখা) বা গণপূর্ত বিভাগ থেকে অনাপত্তি সনদ যাচাই করে নিন।
                </p>
              </div>
            </div>
            
            <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
              <button className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-black text-sm border border-gray-200 hover:bg-gray-100 transition-all flex items-center gap-2">
                <Download size={18} /> পিডিএফ ডাউনলোড
              </button>
              <button onClick={() => setShowLegalModal(false)} className="px-10 py-4 bg-rose-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-rose-200 hover:bg-rose-700 transition-all">
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Khas Land Settlement Modal */}
      {showSettlementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-[3rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-emerald-50/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-200">
                  <ClipboardList size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-800 tracking-tight">খাস জমি বন্দোবস্ত আবেদন নির্দেশিকা</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mt-1">ভূমিহীনদের জন্য সরকারি সহায়তা</p>
                </div>
              </div>
              <button onClick={() => setShowSettlementModal(false)} className="p-3 hover:bg-emerald-100 text-gray-400 hover:text-emerald-600 rounded-2xl transition-all">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-emerald-600 rounded-full" />
                  <h4 className="text-xl font-black text-gray-800">আবেদনের যোগ্যতা</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'আবেদনকারীকে অবশ্যই প্রকৃত ভূমিহীন হতে হবে।',
                    'পরিবারের মোট জমির পরিমাণ ১০ শতাংশের কম হতে হবে।',
                    'আবেদনকারী ওই এলাকার স্থায়ী বাসিন্দা হতে হবে।',
                    'কৃষি কাজই প্রধান পেশা হতে হবে (কৃষি খাস জমির ক্ষেত্রে)।',
                    'মুক্তিযোদ্ধা পরিবার বা নদী ভাঙন কবলিত পরিবার অগ্রাধিকার পাবে।'
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-emerald-50/30 rounded-2xl border border-emerald-100/50">
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                      <span className="text-xs font-bold text-gray-700">{text}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-blue-600 rounded-full" />
                  <h4 className="text-xl font-black text-gray-800">আবেদন প্রক্রিয়া (ধাপসমূহ)</h4>
                </div>
                <div className="space-y-4">
                  {[
                    { step: '১', title: 'নির্ধারিত ফরমে আবেদন', desc: 'উপজেলা নির্বাহী অফিসার (UNO) বা সহকারী কমিশনার (ভূমি) বরাবর আবেদন করতে হয়।' },
                    { step: '২', title: 'তদন্ত ও যাচাই', desc: 'ইউনিয়ন ভূমি সহকারী কর্মকর্তা আবেদনকারীর ভূমিহীনতা যাচাই করেন।' },
                    { step: '৩', title: 'উপজেলা কমিটির অনুমোদন', desc: 'উপজেলা কৃষি খাস জমি ব্যবস্থাপনা ও বন্দোবস্ত কমিটি আবেদনটি পর্যালোচনা করে।' },
                    { step: '৪', title: 'জেলা কমিটির চূড়ান্ত অনুমোদন', desc: 'জেলা প্রশাসক (DC) এর সভাপতিত্বে জেলা কমিটি চূড়ান্ত অনুমোদন দেয়।' },
                    { step: '৫', title: 'কবুলিয়ত ও দখল প্রদান', desc: 'অনুমোদনের পর কবুলিয়ত রেজিস্ট্রি করে জমির দখল বুঝিয়ে দেওয়া হয়।' }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6 p-6 bg-gray-50 rounded-3xl border border-gray-100 hover:bg-white hover:shadow-md transition-all group">
                      <div className="w-12 h-12 bg-white text-emerald-600 rounded-2xl flex items-center justify-center font-black text-xl shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-all">
                        {item.step}
                      </div>
                      <div>
                        <h5 className="font-black text-gray-800 mb-1">{item.title}</h5>
                        <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-8 bg-amber-600 rounded-full" />
                  <h4 className="text-xl font-black text-gray-800">প্রয়োজনীয় কাগজপত্র</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-amber-50/30 rounded-2xl border border-amber-100">
                    <FileText size={18} className="text-amber-600" />
                    <span className="text-xs font-bold text-gray-700">জাতীয় পরিচয়পত্রের কপি</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-amber-50/30 rounded-2xl border border-amber-100">
                    <FileText size={18} className="text-amber-600" />
                    <span className="text-xs font-bold text-gray-700">স্থায়ী বাসিন্দার সনদপত্র</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-amber-50/30 rounded-2xl border border-amber-100">
                    <FileText size={18} className="text-amber-600" />
                    <span className="text-xs font-bold text-gray-700">ভূমিহীনতার সনদ (চেয়ারম্যান কর্তৃক)</span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-amber-50/30 rounded-2xl border border-amber-100">
                    <FileText size={18} className="text-amber-600" />
                    <span className="text-xs font-bold text-gray-700">পাসপোর্ট সাইজ ছবি (৩ কপি)</span>
                  </div>
                </div>
              </section>
            </div>
            
            <div className="p-8 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
              <button className="px-8 py-4 bg-white text-gray-700 rounded-2xl font-black text-sm border border-gray-200 hover:bg-gray-100 transition-all flex items-center gap-2">
                <Download size={18} /> ফরম ডাউনলোড
              </button>
              <button onClick={() => setShowSettlementModal(false)} className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition-all">
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GovernmentProperty;
