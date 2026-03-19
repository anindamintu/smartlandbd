
import React, { useState, useMemo } from 'react';
import { Search, MapPin, Globe, Landmark, ChevronDown, ArrowRight, FileText, User, Hash, Filter, CheckCircle2, AlertCircle, Clock, ShieldCheck, Download, Share2, Eye, Map as MapIcon, Layers, Scale, Users, Plus, X, Calendar, RefreshCw, Info, History, Activity, Shield, ScrollText } from 'lucide-react';
import { motion } from 'motion/react';
import { LandRecord, LandHistoryEntry } from '../types';
import { locationData } from '../src/data/locations';
import { landRecords } from '../src/data/landRecords';

const khatianTypes = [
  'ধারাবাহিক পাট্টা খতিয়ান',
  'সিএস খতিয়ান',
  'পেটি খতিয়ান',
  'দিয়ারা খতিয়ান',
  'এসএ খতিয়ান',
  'আর এস খতিয়ান',
  'বিআরএস খতিয়ান',
  'বিএস খতিয়ান',
  'সিটি খতিয়ান',
  'বিডিএস খতিয়ান'
];

interface LandRecordSearchProps {
  initialQuery?: string;
}

const LandRecordSearch: React.FC<LandRecordSearchProps> = ({ initialQuery = '' }) => {
  const [view, setView] = useState<'search' | 'results' | 'details'>('search');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const [records, setRecords] = useState<LandRecord[]>(landRecords);
  const [selectedRecord, setSelectedRecord] = useState<LandRecord | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeDetailTab, setActiveDetailTab] = useState<'info' | 'history' | 'status'>('info');
  const [newRecord, setNewRecord] = useState<Partial<LandRecord>>({
    status: 'Pending',
    khatianType: 'আর এস খতিয়ান',
    district: 'ঢাকা',
    class: 'নাল'
  });

  const [selectedDivision, setSelectedDivision] = useState('ঢাকা');
  const [selectedDistrict, setSelectedDistrict] = useState('ঢাকা');
  const [selectedUpazila, setSelectedUpazila] = useState('তেজগাঁও');
  const [selectedUnion, setSelectedUnion] = useState('তেজগাঁও সদর');
  const [selectedMouza, setSelectedMouza] = useState('তেজগাঁও শিল্প এলাকা');
  const [selectedKhatianType, setSelectedKhatianType] = useState('আর এস খতিয়ান');
  const [searchType, setSearchType] = useState<'khatian' | 'plot' | 'owner' | 'multi'>('multi');
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [khatianQuery, setKhatianQuery] = useState(initialQuery);
  const [ownerQuery, setOwnerQuery] = useState('');
  const [fatherSpouseQuery, setFatherSpouseQuery] = useState('');
  const [dagQuery, setDagQuery] = useState('');
  const [classQuery, setClassQuery] = useState('');
  const [areaQuery, setAreaQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<LandRecord[] | null>(null);

  React.useEffect(() => {
    if (initialQuery) {
      if (initialQuery.startsWith('খতিয়ান:')) {
        const val = initialQuery.replace('খতিয়ান:', '').trim();
        setSearchType('khatian');
        setSearchQuery(val);
        setKhatianQuery(val);
      } else if (initialQuery.startsWith('দাগ:')) {
        const val = initialQuery.replace('দাগ:', '').trim();
        setSearchType('plot');
        setSearchQuery(val);
        setDagQuery(val);
      } else {
        setSearchQuery(initialQuery);
        setKhatianQuery(initialQuery);
      }
      
      // We need to wait for state updates to settle or just use the parsed values directly in handleSearch
      // But handleSearch uses state. Let's trigger it after a short delay or modify it to accept params.
      setTimeout(() => {
        handleSearch();
      }, 100);
    }
  }, [initialQuery]);

  const resetMultiFilters = () => {
    setKhatianQuery('');
    setDagQuery('');
    setOwnerQuery('');
    setFatherSpouseQuery('');
    setClassQuery('');
    setAreaQuery('');
  };

  const divisions = useMemo(() => Object.keys(locationData), []);
  const districts = useMemo(() => Object.keys(locationData[selectedDivision] || {}), [selectedDivision]);
  const upazilas = useMemo(() => Object.keys(locationData[selectedDivision]?.[selectedDistrict] || {}), [selectedDivision, selectedDistrict]);
  const unions = useMemo(() => Object.keys(locationData[selectedDivision]?.[selectedDistrict]?.[selectedUpazila] || {}), [selectedDivision, selectedDistrict, selectedUpazila]);
  const mouzas = useMemo(() => locationData[selectedDivision]?.[selectedDistrict]?.[selectedUpazila]?.[selectedUnion] || [], [selectedDivision, selectedDistrict, selectedUpazila, selectedUnion]);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      const filtered = records.filter(record => {
        // Location filters
        const matchesDivision = !selectedDivision || !record.division || record.division === selectedDivision;
        const matchesDistrict = !selectedDistrict || record.district === selectedDistrict;
        const matchesUpazila = !selectedUpazila || !record.upazila || record.upazila === selectedUpazila;
        const matchesUnion = !selectedUnion || !record.union || record.union === selectedUnion;
        const matchesMouza = !selectedMouza || record.mouza === selectedMouza || record.mouza.includes(selectedMouza);
        
        if (!matchesDistrict || !matchesMouza) return false;

        if (searchType === 'multi') {
          const matchesKhatian = !khatianQuery || record.khatianNo.includes(khatianQuery);
          const matchesDag = !dagQuery || record.dagNo.includes(dagQuery);
          const matchesOwner = !ownerQuery || record.ownerName.includes(ownerQuery);
          const matchesFather = !fatherSpouseQuery || (record.fatherSpouseName?.includes(fatherSpouseQuery) || false);
          const matchesClass = !classQuery || record.class.includes(classQuery);
          const matchesType = record.khatianType === selectedKhatianType;
          return matchesKhatian && matchesDag && matchesOwner && matchesFather && matchesClass && matchesType;
        }

        if (searchType === 'khatian') {
          const matchesNo = record.khatianNo.includes(searchQuery);
          const matchesType = record.khatianType === selectedKhatianType;
          return matchesNo && matchesType;
        }
        if (searchType === 'plot') return record.dagNo.includes(searchQuery);
        if (searchType === 'owner') {
          const matchesName = record.ownerName.includes(searchQuery);
          const matchesFather = fatherSpouseQuery === '' || (record.fatherSpouseName?.includes(fatherSpouseQuery) || false);
          return matchesName && matchesFather;
        }
        return true;
      });
      setResults(filtered);
      setIsSearching(false);
      setView('results');
    }, 800);
  };

  const handleViewDetails = (record: LandRecord) => {
    setSelectedRecord(record);
    setView('details');
  };

  const handleBack = () => {
    if (view === 'details') setView('results');
    else if (view === 'results') setView('search');
  };

  const handleAddRecord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecord.khatianNo || !newRecord.dagNo || !newRecord.ownerName || !newRecord.mouza) {
      alert('অনুগ্রহ করে সব প্রয়োজনীয় তথ্য প্রদান করুন।');
      return;
    }

    const recordToAdd: LandRecord = {
      id: (records.length + 1).toString(),
      khatianNo: newRecord.khatianNo || '',
      dagNo: newRecord.dagNo || '',
      mouza: newRecord.mouza || '',
      district: newRecord.district || 'ঢাকা',
      ownerName: newRecord.ownerName || '',
      fatherSpouseName: newRecord.fatherSpouseName || '',
      area: Number(newRecord.area) || 0,
      status: (newRecord.status as any) || 'Pending',
      class: newRecord.class || 'নাল',
      land_class: (newRecord.land_class as any) || 'Agricultural',
      khatianType: newRecord.khatianType || 'আর এস খতিয়ান',
      registrationDate: newRecord.registrationDate || new Date().toISOString().split('T')[0],
      mutationStatus: (newRecord.mutationStatus as any) || 'Not Started',
      currentStatus: {
        isMortgaged: newRecord.currentStatus?.isMortgaged || false,
        isDisputed: newRecord.currentStatus?.isDisputed || newRecord.status === 'Disputed',
        isGovernmentOwned: newRecord.currentStatus?.isGovernmentOwned || false,
        isWaqf: newRecord.currentStatus?.isWaqf || false,
        lastTaxPaidDate: new Date().toISOString().split('T')[0]
      },
      history: [
        {
          id: `h-${Date.now()}`,
          date: newRecord.registrationDate || new Date().toISOString().split('T')[0],
          ownerName: newRecord.ownerName || '',
          transactionType: 'Purchase',
          area: Number(newRecord.area) || 0
        }
      ]
    };

    setRecords([recordToAdd, ...records]);
    setShowAddModal(false);
    setNewRecord({
      status: 'Pending',
      khatianType: 'আর এস খতিয়ান',
      district: 'ঢাকা',
      class: 'নাল'
    });
    alert('নতুন খতিয়ান রেকর্ড সফলভাবে যোগ করা হয়েছে!');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Navigation Breadcrumb */}
      {view !== 'search' && (
        <div className="flex items-center gap-2 px-4">
          <button 
            onClick={() => setView('search')}
            className="text-xs font-bold text-gray-400 hover:text-emerald-600 transition-colors"
          >
            অনুসন্ধান
          </button>
          <ArrowRight size={12} className="text-gray-300" />
          <button 
            disabled={view === 'results'}
            onClick={() => setView('results')}
            className={`text-xs font-bold transition-colors ${view === 'results' ? 'text-emerald-600' : 'text-gray-400 hover:text-emerald-600'}`}
          >
            ফলাফল
          </button>
          {view === 'details' && (
            <>
              <ArrowRight size={12} className="text-gray-300" />
              <span className="text-xs font-bold text-emerald-600">বিস্তারিত</span>
            </>
          )}
        </div>
      )}

      {/* Search Header */}
      {view === 'search' && (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
            <Search size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">খতিয়ান ও রেকর্ড অনুসন্ধান</h2>
          <p className="text-gray-500 max-w-lg font-medium">খতিয়ান, দাগ নম্বর অথবা মালিকের নাম দিয়ে আপনার জমির তথ্য খুঁজে বের করুন।</p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="mt-6 flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
          >
            <Plus size={20} /> নতুন রেকর্ড যোগ করুন
          </button>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
            <div className="space-y-2 group">
              <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                <Globe size={14}/> বিভাগ
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
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-emerald-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                >
                  {divisions.map(div => <option key={div} value={div}>{div}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                <MapPin size={14}/> জেলা
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
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-emerald-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                >
                  {districts.map(dist => <option key={dist} value={dist}>{dist}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                <Landmark size={14}/> উপজেলা
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
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-emerald-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                >
                  {upazilas.map(up => <option key={up} value={up}>{up}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                <Users size={14}/> ইউনিয়ন
              </label>
              <div className="relative">
                <select 
                  value={selectedUnion}
                  onChange={(e) => {
                    const un = e.target.value;
                    setSelectedUnion(un);
                    setSelectedMouza(locationData[selectedDivision][selectedDistrict][selectedUpazila][un][0]);
                  }}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-emerald-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                >
                  {unions.map(un => <option key={un} value={un}>{un}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                <MapIcon size={14}/> মৌজা
              </label>
              <div className="relative">
                <select 
                  value={selectedMouza}
                  onChange={(e) => setSelectedMouza(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-emerald-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                >
                  {mouzas.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="space-y-2 group">
              <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                <FileText size={14}/> খতিয়ানের ধরন
              </label>
              <div className="relative">
                <select 
                  value={selectedKhatianType}
                  onChange={(e) => setSelectedKhatianType(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-emerald-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                >
                  {khatianTypes.map(type => <option key={type} value={type}>{type}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
              </div>
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                <Hash size={14}/> দাগ নম্বর
              </label>
              <input 
                type="text" 
                value={dagQuery}
                onChange={(e) => setDagQuery(e.target.value)}
                placeholder="দাগ নম্বর লিখুন"
                className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                <Layers size={14}/> শ্রেণী
              </label>
              <input 
                type="text" 
                value={classQuery}
                onChange={(e) => setClassQuery(e.target.value)}
                placeholder="জমির শ্রেণী (যেমন: নাল)"
                className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                <Scale size={14}/> পরিমাণ (শতাংশ)
              </label>
              <input 
                type="text" 
                value={areaQuery}
                onChange={(e) => setAreaQuery(e.target.value)}
                placeholder="জমির পরিমাণ"
                className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
              />
            </div>
          </div>

        <div className="bg-emerald-50/50 p-8 rounded-[2rem] border border-emerald-100/50">
          <div className="flex flex-wrap gap-4 mb-6">
            {[
              { id: 'multi', label: 'মাল্টি-ক্রাইটেরিয়া', icon: Filter },
              { id: 'khatian', label: 'খতিয়ান নম্বর', icon: FileText },
              { id: 'plot', label: 'দাগ নম্বর', icon: Hash },
              { id: 'owner', label: 'মালিকের নাম', icon: User }
            ].map(type => (
              <button
                key={type.id}
                onClick={() => setSearchType(type.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black text-sm transition-all ${
                  searchType === type.id 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 border-b-2 border-dashed border-red-500' 
                    : 'bg-white text-gray-500 hover:bg-emerald-50 border border-gray-100'
                }`}
              >
                <type.icon size={18} /> {type.label}
              </button>
            ))}
          </div>

          {searchType === 'multi' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              <div className="space-y-2 group">
                <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                  <FileText size={14}/> খতিয়ান নম্বর
                </label>
                <input 
                  type="text" 
                  value={khatianQuery}
                  onChange={(e) => setKhatianQuery(e.target.value)}
                  placeholder="খতিয়ান নম্বর লিখুন"
                  className="w-full px-5 py-4 bg-white border-2 border-transparent rounded-[1.25rem] focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                  <Hash size={14}/> দাগ নম্বর
                </label>
                <input 
                  type="text" 
                  value={dagQuery}
                  onChange={(e) => setDagQuery(e.target.value)}
                  placeholder="দাগ নম্বর লিখুন"
                  className="w-full px-5 py-4 bg-white border-2 border-transparent rounded-[1.25rem] focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                  <User size={14}/> মালিকের নাম
                </label>
                <input 
                  type="text" 
                  value={ownerQuery}
                  onChange={(e) => setOwnerQuery(e.target.value)}
                  placeholder="মালিকের নাম লিখুন"
                  className="w-full px-5 py-4 bg-white border-2 border-transparent rounded-[1.25rem] focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                  <Users size={14}/> পিতা/স্বামীর নাম
                </label>
                <input 
                  type="text" 
                  value={fatherSpouseQuery}
                  onChange={(e) => setFatherSpouseQuery(e.target.value)}
                  placeholder="পিতা বা স্বামীর নাম লিখুন"
                  className="w-full px-5 py-4 bg-white border-2 border-transparent rounded-[1.25rem] focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                  <Layers size={14}/> শ্রেণী
                </label>
                <input 
                  type="text" 
                  value={classQuery}
                  onChange={(e) => setClassQuery(e.target.value)}
                  placeholder="জমির শ্রেণী"
                  className="w-full px-5 py-4 bg-white border-2 border-transparent rounded-[1.25rem] focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                />
              </div>
              <div className="flex items-end gap-2">
                <button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="flex-1 py-4 bg-emerald-600 text-white font-black rounded-[1.25rem] hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSearching ? 'খোঁজা হচ্ছে...' : 'অনুসন্ধান করুন'}
                  {!isSearching && <Search size={20} />}
                </button>
                <button 
                  onClick={resetMultiFilters}
                  className="p-4 bg-gray-100 text-gray-500 rounded-[1.25rem] hover:bg-gray-200 transition-all"
                  title="ফিল্টার মুছুন"
                >
                  <RefreshCw size={20} />
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                    <User size={14}/> {searchType === 'owner' ? 'মালিকের নাম' : 'অনুসন্ধান শব্দ'}
                  </label>
                  <div className="relative">
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={
                        searchType === 'khatian' ? 'খতিয়ান নম্বর লিখুন (যেমন: ১২৩৪)' :
                        searchType === 'plot' ? 'দাগ নম্বর লিখুন (যেমন: ৫৬৭)' : 'মালিকের নাম লিখুন'
                      }
                      className="w-full px-8 py-5 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm pr-28"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery('')}
                          className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-all"
                        >
                          <X size={20} />
                        </button>
                      )}
                      <button 
                        onClick={handleSearch}
                        className="p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-2"
                        title={searchType === 'owner' ? "মালিকের নামে অনুসন্ধান করুন" : "অনুসন্ধান করুন"}
                      >
                        <Search size={20} />
                      </button>
                    </div>
                  </div>
                </div>

                {searchType === 'owner' && (
                  <div className="space-y-2 group animate-in slide-in-from-right-4 duration-300">
                    <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                      <Users size={14}/> পিতা/স্বামীর নাম (ঐচ্ছিক)
                    </label>
                    <input 
                      type="text" 
                      value={fatherSpouseQuery}
                      onChange={(e) => setFatherSpouseQuery(e.target.value)}
                      placeholder="পিতা বা স্বামীর নাম লিখুন"
                      className="w-full px-8 py-5 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                    />
                    <button 
                      onClick={handleSearch}
                      disabled={isSearching}
                      className="w-full py-5 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 disabled:opacity-50 text-lg mt-4"
                    >
                      {isSearching ? 'খোঁজা হচ্ছে...' : 'মালিকের নামে অনুসন্ধান করুন'}
                      {!isSearching && <Search size={24} />}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex justify-center mt-8">
                <button 
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-12 py-5 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 flex items-center gap-3 disabled:opacity-50 text-lg"
                >
                  {isSearching ? 'খোঁজা হচ্ছে...' : 'অনুসন্ধান শুরু করুন'}
                  {!isSearching && <ArrowRight size={24} />}
                </button>
              </div>
            </>
          )}

          {searchType === 'owner' && (
            <div className="mt-10 pt-10 border-t border-emerald-100/50">
              <h5 className="text-xs font-black text-emerald-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Users size={14}/> জনপ্রিয় অনুসন্ধান
              </h5>
              <div className="flex flex-wrap gap-3">
                {['মজিবুর রহমান', 'রহিমা বেগম', 'করিম উদ্দিন', 'জহিরুল হক'].map(name => (
                  <button 
                    key={name}
                    onClick={() => {
                      setSearchQuery(name);
                      setSearchType('owner');
                    }}
                    className="px-4 py-2 bg-white border border-emerald-100 rounded-xl text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition-all"
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchType === 'khatian' && (
            <div className="mt-10 pt-10 border-t border-emerald-100/50">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h5 className="text-xs font-black text-emerald-800 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FileText size={14}/> জনপ্রিয় খতিয়ান অনুসন্ধান
                  </h5>
                  <div className="flex flex-wrap gap-3">
                    {['১২৩৪', '৫৬৭৮', '৯১০১', '৪৩২১'].map(no => (
                      <button 
                        key={no}
                        onClick={() => {
                          setSearchQuery(no);
                          setSearchType('khatian');
                        }}
                        className="px-4 py-2 bg-white border border-emerald-100 rounded-xl text-sm font-bold text-emerald-700 hover:bg-emerald-50 transition-all"
                      >
                        খতিয়ান নং: {no}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-emerald-100 flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                    <Filter size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">নির্বাচিত ধরন</p>
                    <p className="text-sm font-black text-emerald-700">{selectedKhatianType}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex items-start gap-4">
                <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                  <AlertCircle size={20} />
                </div>
                <div>
                  <h6 className="text-sm font-black text-blue-900 mb-1">অনুসন্ধান টিপস</h6>
                  <p className="text-xs text-blue-700 font-medium leading-relaxed">
                    সঠিক ফলাফল পেতে প্রথমে সঠিক **বিভাগ, জেলা ও উপজেলা** নির্বাচন করুন। এরপর **খতিয়ানের ধরন** (যেমন: আর এস, বিএস) নিশ্চিত হয়ে খতিয়ান নম্বরটি লিখুন।
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      )}

      {/* Results Section */}
      {view === 'results' && results && (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <button 
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-all"
              >
                <ChevronDown className="rotate-90" size={24} />
              </button>
              <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
                <div className="w-1.5 h-6 bg-emerald-500 rounded-full"/> অনুসন্ধান ফলাফল ({results.length})
              </h3>
            </div>
            <button className="text-emerald-600 font-black text-sm flex items-center gap-2 hover:underline">
              <Filter size={16} /> ফিল্টার করুন
            </button>
          </div>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {results.map((record) => (
                <div key={record.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                        record.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' :
                        record.status === 'Pending' ? 'bg-amber-50 text-amber-600' : 'bg-rose-50 text-rose-600'
                      }`}>
                        <FileText size={28} />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="text-lg font-black text-gray-800">খতিয়ান নং: {record.khatianNo}</h4>
                          <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100">
                            {record.khatianType}
                          </span>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            record.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                            record.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {record.status === 'Verified' ? 'ভেরিফাইড' : record.status === 'Pending' ? 'পেন্ডিং' : 'বিতর্কিত'}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-gray-500 font-bold">
                          <span className="flex items-center gap-1.5"><Hash size={14} className="text-gray-400"/> দাগ নং: {record.dagNo}</span>
                          <span className="flex items-center gap-1.5"><User size={14} className="text-gray-400"/> মালিক: {record.ownerName}</span>
                          {record.fatherSpouseName && (
                            <span className="flex items-center gap-1.5"><Users size={14} className="text-gray-400"/> {record.fatherSpouseName}</span>
                          )}
                          <span className="flex items-center gap-1.5"><MapPin size={14} className="text-gray-400"/> মৌজা: {record.mouza}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => handleViewDetails(record)}
                        className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                      >
                        <Eye size={18} /> বিস্তারিত দেখুন
                      </button>
                    </div>
                  </div>
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
              <button 
                onClick={() => setView('search')}
                className="mt-4 text-emerald-600 font-black hover:underline"
              >
                আবার অনুসন্ধান করুন
              </button>
            </div>
          )}
        </div>
      )}

      {/* Detailed View Section */}
      {view === 'details' && selectedRecord && (
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="flex items-center gap-4 px-4">
            <button 
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-400 transition-all"
            >
              <ChevronDown className="rotate-90" size={24} />
            </button>
            <h3 className="text-xl font-black text-gray-800">খতিয়ানের বিস্তারিত তথ্য</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                      <FileText size={32} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-gray-800">খতিয়ান নং: {selectedRecord.khatianNo}</h4>
                      <p className="text-sm text-gray-500 font-bold">মৌজা: {selectedRecord.mouza}, জেলা: {selectedRecord.district}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
                    selectedRecord.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' :
                    selectedRecord.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                  }`}>
                    {selectedRecord.status === 'Verified' ? 'ভেরিফাইড' : selectedRecord.status === 'Pending' ? 'পেন্ডিং' : 'বিতর্কিত'}
                  </div>
                </div>

                {/* Detail Tabs */}
                <div className="flex border-b border-gray-100 mb-8">
                  {[
                    { id: 'info', label: 'সাধারণ তথ্য', icon: Info },
                    { id: 'history', label: 'মালিকানা ইতিহাস', icon: History },
                    { id: 'status', label: 'বর্তমান অবস্থা', icon: Activity }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveDetailTab(tab.id as any)}
                      className={`flex items-center gap-2 px-6 py-4 font-black text-sm transition-all relative ${
                        activeDetailTab === tab.id ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'
                      }`}
                    >
                      <tab.icon size={18} />
                      {tab.label}
                      {activeDetailTab === tab.id && (
                        <motion.div 
                          layoutId="activeDetailTab"
                          className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600 rounded-full"
                        />
                      )}
                    </button>
                  ))}
                </div>

                {activeDetailTab === 'info' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-300">
                    {[
                      { label: 'দাগ নম্বর', value: selectedRecord.dagNo, icon: Hash },
                      { label: 'মালিকের নাম', value: selectedRecord.ownerName, icon: User },
                      { label: 'পিতা/স্বামীর নাম', value: selectedRecord.fatherSpouseName || 'প্রদান করা হয়নি', icon: Users },
                      { label: 'জমির শ্রেণী', value: selectedRecord.class, icon: Layers },
                      { label: 'জমির পরিমাণ', value: `${selectedRecord.area} শতাংশ`, icon: Scale },
                      { label: 'খতিয়ানের ধরন', value: selectedRecord.khatianType, icon: FileText },
                      { label: 'রেজিস্ট্রেশন তারিখ', value: selectedRecord.registrationDate, icon: Calendar },
                      { label: 'নামজারি অবস্থা', value: selectedRecord.mutationStatus === 'Completed' ? 'সম্পন্ন' : selectedRecord.mutationStatus === 'In Progress' ? 'চলমান' : 'শুরু হয়নি', icon: ShieldCheck },
                      { label: 'আধুনিক শ্রেণীকরণ', value: selectedRecord.land_class === 'Agricultural' ? 'কৃষি' : selectedRecord.land_class === 'Residential' ? 'আবাসিক' : 'অন্যান্য', icon: Landmark }
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-4 p-4 rounded-2xl bg-gray-50/50 border border-gray-100">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
                          <item.icon size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-0.5">{item.label}</p>
                          <p className="text-sm font-black text-gray-700">{item.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeDetailTab === 'history' && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="relative pl-8 space-y-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-100">
                      {selectedRecord.history.map((entry, idx) => (
                        <div key={entry.id} className="relative">
                          <div className="absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-white border-4 border-emerald-500 z-10" />
                          <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                                {entry.date}
                              </span>
                              <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                                {entry.transactionType === 'Inheritance' ? 'উত্তরাধিকার' : 
                                 entry.transactionType === 'Purchase' ? 'ক্রয়' : 
                                 entry.transactionType === 'Gift' ? 'দান' : 'অন্যান্য'}
                              </span>
                            </div>
                            <h5 className="text-lg font-black text-gray-800 mb-1">{entry.ownerName}</h5>
                            <p className="text-sm text-gray-500 font-bold mb-4">জমির পরিমাণ: {entry.area} শতাংশ</p>
                            {entry.deedNo && (
                              <div className="flex items-center gap-2 text-xs font-black text-gray-400">
                                <FileText size={14} /> দলিল নং: {entry.deedNo}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeDetailTab === 'status' && (
                  <div className="space-y-6 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: 'বন্ধক (Mortgage)', value: selectedRecord.currentStatus.isMortgaged ? 'হ্যাঁ' : 'না', icon: Landmark, status: selectedRecord.currentStatus.isMortgaged ? 'danger' : 'success' },
                        { label: 'বিরোধ (Dispute)', value: selectedRecord.currentStatus.isDisputed ? 'হ্যাঁ' : 'না', icon: AlertCircle, status: selectedRecord.currentStatus.isDisputed ? 'danger' : 'success' },
                        { label: 'সরকারি সম্পত্তি', value: selectedRecord.currentStatus.isGovernmentOwned ? 'হ্যাঁ' : 'না', icon: Shield, status: selectedRecord.currentStatus.isGovernmentOwned ? 'info' : 'neutral' },
                        { label: 'ওয়াকফ সম্পত্তি', value: selectedRecord.currentStatus.isWaqf ? 'হ্যাঁ' : 'না', icon: ScrollText, status: selectedRecord.currentStatus.isWaqf ? 'info' : 'neutral' },
                        { label: 'সর্বশেষ খাজনা প্রদান', value: selectedRecord.currentStatus.lastTaxPaidDate || 'তথ্য নেই', icon: Calendar, status: 'neutral' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between p-5 rounded-2xl bg-gray-50 border border-gray-100">
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${
                              item.status === 'danger' ? 'bg-rose-50 text-rose-600' :
                              item.status === 'success' ? 'bg-emerald-50 text-emerald-600' :
                              item.status === 'info' ? 'bg-blue-50 text-blue-600' : 'bg-white text-gray-400'
                            }`}>
                              <item.icon size={20} />
                            </div>
                            <span className="text-sm font-black text-gray-600">{item.label}</span>
                          </div>
                          <span className={`text-sm font-black ${
                            item.status === 'danger' ? 'text-rose-600' :
                            item.status === 'success' ? 'text-emerald-600' :
                            item.status === 'info' ? 'text-blue-600' : 'text-gray-800'
                          }`}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
                      <div className="p-2 bg-white rounded-lg text-blue-600 shadow-sm">
                        <Info size={20} />
                      </div>
                      <div>
                        <h6 className="text-sm font-black text-blue-900 mb-1">অবস্থা যাচাইকরণ</h6>
                        <p className="text-xs text-blue-700 font-medium leading-relaxed">
                          জমির বর্তমান অবস্থা নিয়মিত হালনাগাদ করা হয়। কোনো অসংগতি দেখা দিলে স্থানীয় ভূমি অফিসে যোগাযোগ করুন।
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-emerald-600 p-10 rounded-[2.5rem] text-white shadow-xl shadow-emerald-100 relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-2xl font-black mb-4">সার্টিফাইড কপির জন্য আবেদন করুন</h4>
                  <p className="text-emerald-50 font-medium mb-8 max-w-md">
                    আপনি এই খতিয়ানের একটি সার্টিফাইড কপির জন্য অনলাইনে আবেদন করতে পারেন। ডাকযোগে বা সরাসরি অফিস থেকে সংগ্রহ করার সুযোগ রয়েছে।
                  </p>
                  <button className="px-8 py-4 bg-white text-emerald-600 rounded-2xl font-black hover:bg-emerald-50 transition-all shadow-lg flex items-center gap-3">
                    আবেদন শুরু করুন <ArrowRight size={20} />
                  </button>
                </div>
                <FileText className="absolute -right-10 -bottom-10 text-white/10 w-64 h-64 rotate-12" />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                <h4 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
                  <Share2 size={20} className="text-emerald-600" /> শেয়ার ও ডাউনলোড
                </h4>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-all group">
                    <span className="text-sm font-bold text-gray-600 group-hover:text-emerald-600">পিডিএফ ডাউনলোড</span>
                    <Download size={18} className="text-gray-400 group-hover:text-emerald-600" />
                  </button>
                  <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-emerald-50 transition-all group">
                    <span className="text-sm font-bold text-gray-600 group-hover:text-emerald-600">লিঙ্ক কপি করুন</span>
                    <Share2 size={18} className="text-gray-400 group-hover:text-emerald-600" />
                  </button>
                </div>
              </div>

              <div className="bg-amber-50 p-8 rounded-[2rem] border border-amber-100">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-amber-600 shadow-sm mb-4">
                  <AlertCircle size={24} />
                </div>
                <h4 className="text-sm font-black text-amber-900 mb-2">সতর্কতা</h4>
                <p className="text-xs text-amber-700 font-medium leading-relaxed">
                  এই তথ্যটি শুধুমাত্র আপনার অবগতির জন্য। এটি কোনো আইনি দলিল হিসেবে ব্যবহার করা যাবে না। আইনি প্রয়োজনে অবশ্যই সার্টিফাইড কপির জন্য আবেদন করুন।
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Info Cards */}
      {view === 'search' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'সঠিক তথ্য', desc: 'আমাদের ডাটাবেজ সরাসরি ভূমি মন্ত্রণালয়ের সার্ভারের সাথে সংযুক্ত।', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { title: 'দ্রুত সেবা', desc: 'অত্যাধুনিক সার্চ অ্যালগরিদম ব্যবহার করে তাৎক্ষণিক ফলাফল প্রদান।', icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
          { title: 'সহজ নেভিগেশন', desc: 'মালিকের নাম বা দাগ নম্বর দিয়েও এখন খুঁজে পাওয়া সম্ভব।', icon: CheckCircle2, color: 'text-amber-600', bg: 'bg-amber-50' }
        ].map((info, idx) => (
          <div key={idx} className="bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col items-center text-center gap-4 shadow-sm">
            <div className={`p-4 rounded-2xl ${info.bg} ${info.color}`}>
              <info.icon size={32} />
            </div>
            <div>
              <h4 className="text-lg font-black text-gray-800 mb-2">{info.title}</h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{info.desc}</p>
            </div>
          </div>
        ))}
      </div>
      )}

      {/* Add Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-emerald-50/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                  <Plus size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-800">নতুন খতিয়ান রেকর্ড যোগ করুন</h3>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">খতিয়ান ডাটাবেজ আপডেট</p>
                </div>
              </div>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-3 hover:bg-white rounded-2xl text-gray-400 hover:text-gray-600 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleAddRecord} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">খতিয়ান নম্বর *</label>
                  <input 
                    required
                    type="text" 
                    value={newRecord.khatianNo || ''}
                    onChange={(e) => setNewRecord({...newRecord, khatianNo: e.target.value})}
                    placeholder="যেমন: ১২৩৪"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">দাগ নম্বর *</label>
                  <input 
                    required
                    type="text" 
                    value={newRecord.dagNo || ''}
                    onChange={(e) => setNewRecord({...newRecord, dagNo: e.target.value})}
                    placeholder="যেমন: ৫৬৭"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">মৌজা *</label>
                  <input 
                    required
                    type="text" 
                    value={newRecord.mouza || ''}
                    onChange={(e) => setNewRecord({...newRecord, mouza: e.target.value})}
                    placeholder="যেমন: তেজগাঁও"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">জেলা</label>
                  <input 
                    type="text" 
                    value={newRecord.district || ''}
                    onChange={(e) => setNewRecord({...newRecord, district: e.target.value})}
                    placeholder="যেমন: ঢাকা"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">মালিকের নাম *</label>
                  <input 
                    required
                    type="text" 
                    value={newRecord.ownerName || ''}
                    onChange={(e) => setNewRecord({...newRecord, ownerName: e.target.value})}
                    placeholder="যেমন: মজিবুর রহমান"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">পিতা/স্বামীর নাম</label>
                  <input 
                    type="text" 
                    value={newRecord.fatherSpouseName || ''}
                    onChange={(e) => setNewRecord({...newRecord, fatherSpouseName: e.target.value})}
                    placeholder="যেমন: মৃত আব্দুল জব্বার"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">জমির পরিমাণ (শতাংশ)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={newRecord.area || ''}
                    onChange={(e) => setNewRecord({...newRecord, area: Number(e.target.value)})}
                    placeholder="যেমন: ১০.৫"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">জমির শ্রেণী</label>
                  <input 
                    type="text" 
                    value={newRecord.class || ''}
                    onChange={(e) => setNewRecord({...newRecord, class: e.target.value})}
                    placeholder="যেমন: নাল"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">খতিয়ানের ধরন</label>
                  <select 
                    value={newRecord.khatianType}
                    onChange={(e) => setNewRecord({...newRecord, khatianType: e.target.value})}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  >
                    {khatianTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">জমির শ্রেণী (শ্রেণীকরণ)</label>
                  <select 
                    value={newRecord.land_class || 'Agricultural'}
                    onChange={(e) => setNewRecord({...newRecord, land_class: e.target.value as any})}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  >
                    <option value="Agricultural">কৃষি (Agricultural)</option>
                    <option value="Residential">আবাসিক (Residential)</option>
                    <option value="Commercial">বাণিজ্যিক (Commercial)</option>
                    <option value="Industrial">শিল্প (Industrial)</option>
                    <option value="Waterbody">জলাশয় (Waterbody)</option>
                    <option value="Forest">বনভূমি (Forest)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">অবস্থা (Status)</label>
                  <select 
                    value={newRecord.status}
                    onChange={(e) => setNewRecord({...newRecord, status: e.target.value as any})}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  >
                    <option value="Verified">ভেরিফাইড (Verified)</option>
                    <option value="Pending">পেন্ডিং (Pending)</option>
                    <option value="Disputed">বিতর্কিত (Disputed)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">রেজিস্ট্রেশন তারিখ</label>
                  <input 
                    type="date" 
                    value={newRecord.registrationDate || ''}
                    onChange={(e) => setNewRecord({...newRecord, registrationDate: e.target.value})}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-500 uppercase tracking-widest ml-1">নামজারি অবস্থা</label>
                  <select 
                    value={newRecord.mutationStatus || 'Not Started'}
                    onChange={(e) => setNewRecord({...newRecord, mutationStatus: e.target.value as any})}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  >
                    <option value="Not Started">শুরু হয়নি</option>
                    <option value="In Progress">চলমান</option>
                    <option value="Completed">সম্পন্ন</option>
                  </select>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-3xl space-y-4">
                <h4 className="text-sm font-black text-gray-700 uppercase tracking-widest mb-2">জমির বর্তমান অবস্থা</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { id: 'isMortgaged', label: 'বন্ধককৃত' },
                    { id: 'isDisputed', label: 'বিতর্কিত' },
                    { id: 'isGovernmentOwned', label: 'সরকারি' },
                    { id: 'isWaqf', label: 'ওয়াকফ' }
                  ].map(item => (
                    <label key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 cursor-pointer hover:bg-emerald-50 transition-all">
                      <input 
                        type="checkbox"
                        checked={(newRecord.currentStatus as any)?.[item.id] || false}
                        onChange={(e) => setNewRecord({
                          ...newRecord, 
                          currentStatus: {
                            ...(newRecord.currentStatus || { isMortgaged: false, isDisputed: false, isGovernmentOwned: false, isWaqf: false }),
                            [item.id]: e.target.checked
                          }
                        })}
                        className="w-5 h-5 rounded text-emerald-600 focus:ring-emerald-500"
                      />
                      <span className="text-xs font-bold text-gray-600">{item.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-6 flex gap-4">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black hover:bg-gray-200 transition-all"
                >
                  বাতিল করুন
                </button>
                <button 
                  type="submit"
                  className="flex-2 py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                >
                  রেকর্ড সংরক্ষণ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandRecordSearch;
