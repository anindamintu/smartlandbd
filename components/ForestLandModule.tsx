
import React, { useState, useMemo } from 'react';
import { 
  Trees, 
  Search, 
  MapPin, 
  FileText, 
  ShieldCheck, 
  AlertTriangle, 
  Info, 
  Download, 
  Filter,
  ChevronDown,
  Map as MapIcon,
  Layers,
  Calendar,
  Eye,
  Hash
} from 'lucide-react';
import { locationData } from '../src/data/locations';

interface ForestLand {
  id: string;
  forestName: string;
  range: string;
  beat: string;
  mouza: string;
  khatianNo: string;
  dagNo: string; // Survey Number
  area: string; // Total Area
  type: 'Reserved' | 'Protected' | 'Social' | 'Unclassed';
  division: string;
  district: string;
  upazila: string;
  status: 'Encroachment Free' | 'Encroached' | 'Litigation';
  demarcationStatus: 'Completed' | 'In Progress' | 'Pending';
  boundaryPillars?: number;
  encroachmentDetails?: string;
  gpsCoordinates?: string;
  gazetteDate?: string;
}

const mockForestData: ForestLand[] = [
  // Khulna Division
  {
    id: '1',
    forestName: 'সুন্দরবন পূর্ব বন বিভাগ',
    range: 'শরণখোলা',
    beat: 'দুবলা',
    mouza: 'সুন্দরবন-১',
    khatianNo: '১ (গেজেটভুক্ত)',
    dagNo: '১০১, ১০২, ১০৫, ১১০',
    area: '৫০০.৫০ একর',
    type: 'Reserved',
    division: 'খুলনা',
    district: 'বাগেরহাট',
    upazila: 'শরণখোলা',
    status: 'Encroachment Free',
    demarcationStatus: 'Completed',
    boundaryPillars: 45,
    gpsCoordinates: '22.3344° N, 89.8765° E'
  },
  {
    id: '8',
    forestName: 'খুলনা বন বিভাগ',
    range: 'দাকোপ',
    beat: 'বানিয়াখালী',
    mouza: 'বানিয়াখালী-০৪',
    khatianNo: '৮৯',
    dagNo: '৩৪৪, ৩৪৫, ৩৫০',
    area: '১৫০.২৫ একর',
    type: 'Reserved',
    division: 'খুলনা',
    district: 'খুলনা',
    upazila: 'দাকোপ',
    status: 'Encroachment Free',
    demarcationStatus: 'In Progress',
    boundaryPillars: 12
  },
  // Dhaka Division
  {
    id: '2',
    forestName: 'ভাওয়াল জাতীয় উদ্যান',
    range: 'রাজেন্দ্রপুর',
    beat: 'ভাওয়াল',
    mouza: 'গাজীপুর-১০',
    khatianNo: '৫৬৭',
    dagNo: '১২৩৪, ১২৩৫, ১২৪০',
    area: '২৫.২০ একর',
    type: 'Protected',
    division: 'ঢাকা',
    district: 'গাজীপুর',
    upazila: 'গাজীপুর সদর',
    status: 'Encroached',
    demarcationStatus: 'Completed',
    boundaryPillars: 20,
    encroachmentDetails: '২.৫০ একর জমিতে অবৈধ স্থাপনা রয়েছে।'
  },
  {
    id: '5',
    forestName: 'টাঙ্গাইল বন বিভাগ',
    range: 'সখিপুর',
    beat: 'বড়চওনা',
    mouza: 'বড়চওনা-১২',
    khatianNo: '৪৫',
    dagNo: '৯০১, ৯০২, ৯০৫',
    area: '১০.৫০ একর',
    type: 'Social',
    division: 'ঢাকা',
    district: 'টাঙ্গাইল',
    upazila: 'সখিপুর',
    status: 'Encroachment Free',
    demarcationStatus: 'Completed',
    boundaryPillars: 15
  },
  // Chattogram Division
  {
    id: '3',
    forestName: 'চট্টগ্রাম উত্তর বন বিভাগ',
    range: 'ফটিকছড়ি',
    beat: 'নারায়ণহাট',
    mouza: 'নারায়ণহাট-০৫',
    khatianNo: '৮৯০',
    dagNo: '৪৫৬, ৪৫৭, ৪৬০',
    area: '১২০.০০ একর',
    type: 'Reserved',
    division: 'চট্টগ্রাম',
    district: 'চট্টগ্রাম',
    upazila: 'ফটিকছড়ি',
    status: 'Encroached',
    demarcationStatus: 'Completed',
    boundaryPillars: 30,
    encroachmentDetails: '১০.০০ একর জমিতে অবৈধ রাবার বাগান ও বসতি রয়েছে।'
  },
  {
    id: '6',
    forestName: 'কক্সবাজার দক্ষিণ বন বিভাগ',
    range: 'উখিয়া',
    beat: 'ইনানী',
    mouza: 'ইনানী-০৩',
    khatianNo: '৬৭৮',
    dagNo: '২১০, ২১১, ২১৫',
    area: '৮৫.৩০ একর',
    type: 'Reserved',
    division: 'চট্টগ্রাম',
    district: 'কক্সবাজার',
    upazila: 'উখিয়া',
    status: 'Encroached',
    demarcationStatus: 'In Progress',
    boundaryPillars: 18,
    encroachmentDetails: 'রোহিঙ্গা ক্যাম্প সংলগ্ন এলাকায় বনভূমি দখল ও গাছ কাটার ঘটনা ঘটেছে।'
  },
  {
    id: '7',
    forestName: 'রাঙ্গামাটি বন বিভাগ',
    range: 'কাপ্তাই',
    beat: 'জেটঘাট',
    mouza: 'কাপ্তাই-০১',
    khatianNo: '৩৪৫',
    dagNo: '৫৬, ৫৭, ৬০',
    area: '৩০০.০০ একর',
    type: 'Reserved',
    division: 'চট্টগ্রাম',
    district: 'রাঙ্গামাটি',
    upazila: 'কাপ্তাই',
    status: 'Encroachment Free',
    demarcationStatus: 'Completed',
    boundaryPillars: 50
  },
  // Sylhet Division
  {
    id: '4',
    forestName: 'সিলেট বন বিভাগ',
    range: 'লাউয়াছড়া',
    beat: 'কমলগঞ্জ',
    mouza: 'লাউয়াছড়া-০২',
    khatianNo: '১২৩',
    dagNo: '৭৮৯, ৭৯০, ৭৯৫',
    area: '৪৫.৭৫ একর',
    type: 'Protected',
    division: 'সিলেট',
    district: 'মৌলভীবাজার',
    upazila: 'কমলগঞ্জ',
    status: 'Encroachment Free',
    demarcationStatus: 'Completed',
    boundaryPillars: 25
  },
  {
    id: '11',
    forestName: 'রেমা-কালেঙ্গা বন্যপ্রাণী অভয়ারণ্য',
    range: 'চুনারুঘাট',
    beat: 'কালেঙ্গা',
    mouza: 'কালেঙ্গা-০৩',
    khatianNo: '৪৫৬',
    dagNo: '১২, ১৩, ১৪',
    area: '১৭৯৫.০০ একর',
    type: 'Reserved',
    division: 'সিলেট',
    district: 'হবিগঞ্জ',
    upazila: 'চুনারুঘাট',
    status: 'Encroachment Free',
    demarcationStatus: 'Completed',
    boundaryPillars: 120
  },
  // Mymensingh Division
  {
    id: '9',
    forestName: 'ময়মনসিংহ বন বিভাগ',
    range: 'মধুপুর',
    beat: 'দোখলা',
    mouza: 'দোখলা-০৭',
    khatianNo: '৫১২',
    dagNo: '৮৮, ৮৯, ৯০',
    area: '৬০.৪৫ একর',
    type: 'Protected',
    division: 'ময়মনসিংহ',
    district: 'টাঙ্গাইল',
    upazila: 'মধুপুর',
    status: 'Litigation',
    demarcationStatus: 'Pending',
    encroachmentDetails: 'সীমানা নিয়ে স্থানীয়দের সাথে মামলা চলমান।'
  },
  {
    id: '12',
    forestName: 'শেরপুর বন বিভাগ',
    range: 'ঝিনাইগাতী',
    beat: 'রাঙাজানি',
    mouza: 'রাঙাজানি-০৫',
    khatianNo: '৭৮',
    dagNo: '৪৫, ৪৬, ৪৭',
    area: '২৫.০০ একর',
    type: 'Social',
    division: 'ময়মনসিংহ',
    district: 'শেরপুর',
    upazila: 'ঝিনাইগাতী',
    status: 'Encroachment Free',
    demarcationStatus: 'Completed',
    boundaryPillars: 10
  },
  // Rajshahi Division
  {
    id: '13',
    forestName: 'রাজশাহী বন বিভাগ',
    range: 'গোদাগাড়ী',
    beat: 'গোদাগাড়ী',
    mouza: 'গোদাগাড়ী-০১',
    khatianNo: '১২',
    dagNo: '৫৬৭, ৫৬৮',
    area: '৫.০০ একর',
    type: 'Social',
    division: 'রাজশাহী',
    district: 'রাজশাহী',
    upazila: 'গোদাগাড়ী',
    status: 'Encroachment Free',
    demarcationStatus: 'Completed',
    boundaryPillars: 5
  },
  // Rangpur Division
  {
    id: '10',
    forestName: 'দিনাজপুর বন বিভাগ',
    range: 'বীরগঞ্জ',
    beat: 'সিংড়া',
    mouza: 'সিংড়া-০৯',
    khatianNo: '২৩৪',
    dagNo: '১১, ১২, ১৫',
    area: '৩০.২০ একর',
    type: 'Social',
    division: 'রংপুর',
    district: 'দিনাজপুর',
    upazila: 'বীরগঞ্জ',
    status: 'Encroachment Free',
    demarcationStatus: 'Completed',
    boundaryPillars: 12
  },
  // Barishal Division
  {
    id: '14',
    forestName: 'বরিশাল উপকূলীয় বন বিভাগ',
    range: 'পাথরঘাটা',
    beat: 'হরিণঘাটা',
    mouza: 'হরিণঘাটা-০২',
    khatianNo: '৯৯',
    dagNo: '৮৮, ৮৯',
    area: '৫০.০০ একর',
    type: 'Protected',
    division: 'বরিশাল',
    district: 'বরগুনা',
    upazila: 'পাথরঘাটা',
    status: 'Encroachment Free',
    demarcationStatus: 'Completed',
    boundaryPillars: 20
  },
  // Chattogram Hill Tracts
  {
    id: '15',
    forestName: 'বান্দরবান বন বিভাগ',
    range: 'রুমা',
    beat: 'রুমা',
    mouza: 'রুমা-০৫',
    khatianNo: '৫৬',
    dagNo: '৪৫৬, ৪৫৮',
    area: '১২০০.০০ একর',
    type: 'Reserved',
    division: 'চট্টগ্রাম',
    district: 'বান্দরবান',
    upazila: 'রুমা',
    status: 'Encroachment Free',
    demarcationStatus: 'Completed',
    boundaryPillars: 150
  },
  {
    id: '16',
    forestName: 'খাগড়াছড়ি বন বিভাগ',
    range: 'দীঘিনালা',
    beat: 'দীঘিনালা',
    mouza: 'দীঘিনালা-০২',
    khatianNo: '৭৮',
    dagNo: '৯০, ৯১, ৯২',
    area: '৮৫০.০০ একর',
    type: 'Reserved',
    division: 'চট্টগ্রাম',
    district: 'খাগড়াছড়ি',
    upazila: 'দীঘিনালা',
    status: 'Encroachment Free',
    demarcationStatus: 'Completed',
    boundaryPillars: 110
  },
  {
    id: '17',
    forestName: 'রাঙ্গামাটি বন বিভাগ',
    range: 'বাঘাইছড়ি',
    beat: 'বাঘাইছড়ি',
    mouza: 'বাঘাইছড়ি-১০',
    khatianNo: '১২৩',
    dagNo: '৫৬৭, ৫৬৮',
    area: '১৫০০.০০ একর',
    type: 'Reserved',
    division: 'চট্টগ্রাম',
    district: 'রাঙ্গামাটি',
    upazila: 'বাঘাইছড়ি',
    status: 'Encroachment Free',
    demarcationStatus: 'Completed',
    boundaryPillars: 180
  }
];

const ForestLandModule: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All');
  const [selectedUpazila, setSelectedUpazila] = useState('All');
  const [selectedType, setSelectedType] = useState<'All' | 'Reserved' | 'Protected' | 'Social' | 'Unclassed'>('All');

  const filteredData = useMemo(() => {
    return mockForestData.filter(item => {
      const matchesSearch = 
        item.forestName.includes(searchQuery) || 
        item.mouza.includes(searchQuery) || 
        item.dagNo.includes(searchQuery) ||
        item.khatianNo.includes(searchQuery);
      
      const matchesDivision = selectedDivision === 'All' || item.division === selectedDivision;
      const matchesDistrict = selectedDistrict === 'All' || item.district === selectedDistrict;
      const matchesUpazila = selectedUpazila === 'All' || item.upazila === selectedUpazila;
      const matchesType = selectedType === 'All' || item.type === selectedType;

      return matchesSearch && matchesDivision && matchesDistrict && matchesUpazila && matchesType;
    });
  }, [searchQuery, selectedDivision, selectedDistrict, selectedUpazila, selectedType]);

  const divisions = Object.keys(locationData);
  
  const districts = useMemo(() => {
    if (selectedDivision === 'All') return [];
    return Object.keys(locationData[selectedDivision] || {});
  }, [selectedDivision]);

  const upazilas = useMemo(() => {
    if (selectedDivision === 'All' || selectedDistrict === 'All') return [];
    return Object.keys(locationData[selectedDivision]?.[selectedDistrict] || {});
  }, [selectedDivision, selectedDistrict]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-64 rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop" 
          alt="Forest Land" 
          className="w-full h-full object-cover brightness-[0.4]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-emerald-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-4 flex items-center gap-2">
            <Trees size={16} className="text-emerald-300" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">বনভূমি ব্যবস্থাপনা</span>
          </div>
          <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">বনভূমি তথ্য ও রেকর্ড অনুসন্ধান</h2>
          <p className="text-emerald-100 max-w-xl text-sm font-medium leading-relaxed opacity-90">
            দেশের গেজেটভুক্ত সংরক্ষিত, রক্ষিত এবং সামাজিক বনায়নের দাগ ও খতিয়ান ভিত্তিক তথ্য।
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">বিভাগ নির্বাচন</label>
            <div className="relative">
              <select 
                value={selectedDivision}
                onChange={(e) => {
                  setSelectedDivision(e.target.value);
                  setSelectedDistrict('All');
                  setSelectedUpazila('All');
                }}
                className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
              >
                <option value="All">সকল বিভাগ</option>
                {divisions.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">জেলা নির্বাচন</label>
            <div className="relative">
              <select 
                value={selectedDistrict}
                onChange={(e) => {
                  setSelectedDistrict(e.target.value);
                  setSelectedUpazila('All');
                }}
                className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
              >
                <option value="All">সকল জেলা</option>
                {districts.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">উপজেলা নির্বাচন</label>
            <div className="relative">
              <select 
                value={selectedUpazila}
                onChange={(e) => setSelectedUpazila(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
              >
                <option value="All">সকল উপজেলা</option>
                {upazilas.map(u => <option key={u} value={u}>{u}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">বনভূমির ধরণ</label>
            <div className="relative">
              <select 
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
              >
                <option value="All">সকল ধরণ</option>
                <option value="Reserved">সংরক্ষিত বন (Reserved)</option>
                <option value="Protected">রক্ষিত বন (Protected)</option>
                <option value="Social">সামাজিক বন (Social)</option>
                <option value="Unclassed">অশ্রেণীভুক্ত বন (Unclassed)</option>
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">দ্রুত অনুসন্ধান</label>
          <div className="relative">
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="দাগ, খতিয়ান বা মৌজা..."
              className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-xl font-black text-gray-800 flex items-center gap-3">
            <Layers size={24} className="text-emerald-600" /> তালিকাভুক্ত বনভূমি ({filteredData.length})
          </h3>
          <button className="flex items-center gap-2 px-6 py-2 bg-white text-emerald-600 rounded-xl font-black text-xs border border-emerald-100 shadow-sm hover:bg-emerald-50 transition-all">
            <Download size={14} /> রিপোর্ট ডাউনলোড
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                <th className="px-8 py-4">বন/রেঞ্জ/বিট</th>
                <th className="px-8 py-4">মৌজা ও খতিয়ান নম্বর</th>
                <th className="px-8 py-4">দাগ নম্বর (Survey No) ও মোট পরিমাণ</th>
                <th className="px-8 py-4">সীমানা ও পিলার (Demarcation)</th>
                <th className="px-8 py-4">ধরণ ও অবস্থান</th>
                <th className="px-8 py-4">অবস্থা</th>
                <th className="px-8 py-4 text-center">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="font-black text-gray-800 text-sm">{item.forestName}</p>
                      <p className="text-[10px] font-bold text-gray-400 uppercase">{item.range} রেঞ্জ | {item.beat} বিট</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="font-bold text-gray-700 text-sm">{item.mouza}</p>
                      <p className="text-xs text-emerald-600 font-black flex items-center gap-1">
                        <FileText size={12} /> খতিয়ান: {item.khatianNo}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="font-bold text-gray-700 text-sm flex items-center gap-1">
                        <Hash size={14} className="text-emerald-500" /> দাগ নং: {item.dagNo}
                      </p>
                      <p className="text-xs text-gray-500 font-black">মোট পরিমাণ: {item.area}</p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className={`text-xs font-black flex items-center gap-1 ${
                        item.demarcationStatus === 'Completed' ? 'text-emerald-600' : 
                        item.demarcationStatus === 'In Progress' ? 'text-amber-600' : 'text-rose-600'
                      }`}>
                        <MapIcon size={12} /> সীমানা: {
                          item.demarcationStatus === 'Completed' ? 'চিহ্নিত' : 
                          item.demarcationStatus === 'In Progress' ? 'চলমান' : 'অচিহ্নিত'
                        }
                      </p>
                      {item.boundaryPillars && (
                        <p className="text-[10px] font-bold text-gray-500">পিলার সংখ্যা: {item.boundaryPillars} টি</p>
                      )}
                      {item.gpsCoordinates && (
                        <p className="text-[9px] font-medium text-gray-400 font-mono">{item.gpsCoordinates}</p>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                        item.type === 'Reserved' ? 'bg-rose-50 text-rose-600' :
                        item.type === 'Protected' ? 'bg-blue-50 text-blue-600' :
                        'bg-emerald-50 text-emerald-600'
                      }`}>
                        {item.type === 'Reserved' ? 'সংরক্ষিত' : 
                         item.type === 'Protected' ? 'রক্ষিত' : 'সামাজিক'}
                      </span>
                      <p className="text-[10px] font-bold text-gray-400 mt-1">
                        {item.division}, {item.district}, {item.upazila}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      {item.status === 'Encroachment Free' ? (
                        <ShieldCheck size={16} className="text-emerald-500" />
                      ) : (
                        <AlertTriangle size={16} className="text-amber-500" />
                      )}
                      <span className={`text-[10px] font-black uppercase ${
                        item.status === 'Encroachment Free' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {item.status === 'Encroachment Free' ? 'দখলমুক্ত' : 
                         item.status === 'Encroached' ? 'দখলকৃত' : 'মামলাধীন'}
                      </span>
                      {item.encroachmentDetails && (
                        <p className="text-[9px] font-medium text-rose-500 mt-1 max-w-[150px] leading-tight">
                          {item.encroachmentDetails}
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <button className="p-2 bg-gray-100 text-gray-400 rounded-xl hover:bg-emerald-600 hover:text-white transition-all">
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredData.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
              <Trees size={40} />
            </div>
            <h4 className="text-xl font-black text-gray-800">কোনো তথ্য পাওয়া যায়নি</h4>
            <p className="text-gray-500 font-medium max-w-xs mx-auto">অনুগ্রহ করে সঠিক দাগ বা খতিয়ান নম্বর দিয়ে পুনরায় চেষ্টা করুন।</p>
          </div>
        )}
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
              <ShieldCheck size={28} className="text-emerald-400" /> বনভূমি সুরক্ষা আইন
            </h3>
            <p className="text-sm font-medium text-emerald-100 leading-relaxed mb-6 opacity-80">
              বন আইন, ১৯২৭ এবং বন্যপ্রাণী (সংরক্ষণ ও নিরাপত্তা) আইন, ২০১২ অনুযায়ী বনভূমি দখল বা ক্ষতিসাধন দণ্ডনীয় অপরাধ। গেজেটভুক্ত বনভূমির সীমানা পরিবর্তনের কোনো সুযোগ নেই।
            </p>
            <div className="flex gap-4">
              <button className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all">
                আইন দেখুন
              </button>
              <button className="px-6 py-3 bg-white/10 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10">
                অভিযোগ জানান
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <MapIcon size={24} />
            </div>
            <div>
              <h4 className="font-black text-gray-800">ডিজিটাল বন ম্যাপ</h4>
              <p className="text-xs text-gray-500 font-medium">উপগ্রহ চিত্রের মাধ্যমে বনভূমির সীমানা ও বর্তমান অবস্থা দেখুন।</p>
            </div>
          </div>
          <button className="w-full py-4 bg-gray-900 text-white rounded-2xl font-black hover:bg-black transition-all shadow-lg flex items-center justify-center gap-2">
            ম্যাপ ওপেন করুন <MapIcon size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ForestLandModule;
