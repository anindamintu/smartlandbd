
import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  Globe, 
  Landmark, 
  ChevronDown, 
  ArrowRight, 
  FileText, 
  ShieldAlert, 
  History, 
  Building2, 
  Info, 
  Download, 
  Eye, 
  Filter, 
  CheckCircle2, 
  ScrollText, 
  Gavel,
  Scale,
  AlertCircle,
  Clock,
  Briefcase
} from 'lucide-react';

import { locationData } from '../src/data/locations';

type AcquisitionType = 'Roads' | 'Railways' | 'Power' | 'Economic Zone' | 'Other';
type AcquisitionStatus = 'Notice 4' | 'Joint Verification' | 'Notice 7' | 'Awarded' | 'Paid' | 'Completed';

interface LACase {
  id: string;
  type: AcquisitionType;
  caseNo: string;
  project: string;
  district: string;
  upazila: string;
  mouza: string;
  dagNo: string;
  area: string;
  status: AcquisitionStatus;
  compensation: {
    total: string;
    paid: string;
    date?: string;
  };
  remarks: string;
}

const mockLACases: LACase[] = [
  {
    id: '1',
    type: 'Roads',
    caseNo: 'LA-০৫/২০২৩-২৪',
    project: 'ঢাকা-সিলেট মহাসড়ক প্রশস্তকরণ প্রকল্প',
    district: 'ঢাকা',
    upazila: 'সাভার',
    mouza: 'বিরুলিয়া',
    dagNo: '১২৩৪, ১২৩৫',
    area: '১৫.৫ শতাংশ',
    status: 'Paid',
    compensation: {
      total: '৪৫,৫০,০০০/-',
      paid: '৪৫,৫০,০০০/-',
      date: '২০২৪-০১-১৫'
    },
    remarks: 'ক্ষতিপূরণ সম্পূর্ণ পরিশোধিত'
  },
  {
    id: '2',
    type: 'Railways',
    caseNo: 'LA-১২/২০২২-২৩',
    project: 'পদ্মা সেতু রেল সংযোগ প্রকল্প',
    district: 'ঢাকা',
    upazila: 'কেরানীগঞ্জ',
    mouza: 'বাস্তা',
    dagNo: '৫৬৭, ৫৬৮',
    area: '৮.২ শতাংশ',
    status: 'Notice 7',
    compensation: {
      total: '২৫,০০,০০০/-',
      paid: '০/-'
    },
    remarks: '৭ ধারা নোটিশ জারি করা হয়েছে'
  },
  {
    id: '3',
    type: 'Power',
    caseNo: 'LA-০৩/২০২৪',
    project: 'রূপপুর পারমাণবিক বিদ্যুৎ কেন্দ্র গ্রিড লাইন',
    district: 'ঢাকা',
    upazila: 'ধামরাই',
    mouza: 'কুশুরা',
    dagNo: '৮৯০',
    area: '৫.০ শতাংশ',
    status: 'Joint Verification',
    compensation: {
      total: 'নির্ধারণাধীন',
      paid: '০/-'
    },
    remarks: 'যৌথ তদন্ত চলমান'
  },
  {
    id: '4',
    type: 'Economic Zone',
    caseNo: 'LA-২০/২০২৩',
    project: 'বঙ্গবন্ধু শেখ মুজিব শিল্প নগর (BEZA)',
    district: 'ঢাকা',
    upazila: 'সাভার',
    mouza: 'তেঁতুলঝোড়া',
    dagNo: '১০১, ১০২',
    area: '২০.০ শতাংশ',
    status: 'Awarded',
    compensation: {
      total: '৬০,০০,০০০/-',
      paid: '২০,০০,০০০/-',
      date: '২০২৪-০২-১০'
    },
    remarks: 'আংশিক ক্ষতিপূরণ প্রদান করা হয়েছে'
  }
];

const LandAcquisitionData: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [filterType, setFilterType] = useState<AcquisitionType | 'All'>('All');
  const [filterStatus, setFilterStatus] = useState<AcquisitionStatus | 'All'>('All');

  const [selectedDivision, setSelectedDivision] = useState('ঢাকা');
  const [selectedDistrict, setSelectedDistrict] = useState('ঢাকা');
  const [selectedUpazila, setSelectedUpazila] = useState('সাভার');

  const divisions = useMemo(() => Object.keys(locationData), []);
  const districts = useMemo(() => Object.keys(locationData[selectedDivision] || {}), [selectedDivision]);
  const upazilas = useMemo(() => Object.keys(locationData[selectedDivision]?.[selectedDistrict] || {}), [selectedDivision, selectedDistrict]);

  const filteredCases = useMemo(() => {
    return mockLACases.filter(c => {
      const matchesSearch = c.caseNo.includes(searchQuery) || c.project.includes(searchQuery) || c.mouza.includes(searchQuery);
      const matchesType = filterType === 'All' || c.type === filterType;
      const matchesStatus = filterStatus === 'All' || c.status === filterStatus;
      const matchesLocation = c.district === selectedDistrict && c.upazila === selectedUpazila;
      return matchesSearch && matchesType && matchesStatus && matchesLocation;
    });
  }, [searchQuery, filterType, filterStatus, selectedDistrict, selectedUpazila]);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => setIsSearching(false), 600);
  };

  const getStatusColor = (status: AcquisitionStatus) => {
    switch (status) {
      case 'Notice 4': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'Joint Verification': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Notice 7': return 'bg-indigo-50 text-indigo-600 border-indigo-100';
      case 'Awarded': return 'bg-purple-50 text-purple-600 border-purple-100';
      case 'Paid': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Completed': return 'bg-gray-50 text-gray-600 border-gray-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  };

  const getStatusLabel = (status: AcquisitionStatus) => {
    switch (status) {
      case 'Notice 4': return '৪ ধারা নোটিশ';
      case 'Joint Verification': return 'যৌথ তদন্ত';
      case 'Notice 7': return '৭ ধারা নোটিশ';
      case 'Awarded': return 'অ্যাওয়ার্ড নির্ধারিত';
      case 'Paid': return 'ক্ষতিপূরণ প্রদান';
      case 'Completed': return 'অধিগ্রহণ সম্পন্ন';
      default: return status;
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Header */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center mb-6 text-indigo-600 shadow-inner">
            <Briefcase size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">ভূমি অধিগ্রহণ কেস অনুসন্ধান</h2>
          <p className="text-gray-500 max-w-lg font-medium">সরকারি বিভিন্ন প্রকল্পের জন্য অধিগ্রহণকৃত ভূমির কেস নম্বর ও ক্ষতিপূরণের তথ্য এখানে খুঁজুন।</p>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-gray-50 p-8 rounded-[2rem] border border-gray-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                  className="w-full px-5 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-indigo-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
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
                  className="w-full px-5 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-indigo-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
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
                  className="w-full px-5 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-indigo-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                >
                  {upazilas.map(up => <option key={up} value={up}>{up}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">অধিগ্রহণের ধরণ</label>
              <div className="flex flex-wrap gap-2">
                {['All', 'Roads', 'Railways', 'Power', 'Economic Zone'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilterType(type as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-black transition-all border-2 ${
                      filterType === type 
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-md' 
                        : 'bg-white text-gray-500 border-gray-100 hover:border-indigo-200'
                    }`}
                  >
                    {type === 'All' ? 'সবগুলো' : 
                     type === 'Roads' ? 'সড়ক' : 
                     type === 'Railways' ? 'রেলপথ' : 
                     type === 'Power' ? 'বিদ্যুৎ' : 'অর্থনৈতিক অঞ্চল'}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">বর্তমান অবস্থা</label>
              <div className="relative">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="w-full px-5 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-indigo-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                >
                  <option value="All">সবগুলো অবস্থা</option>
                  <option value="Notice 4">৪ ধারা নোটিশ</option>
                  <option value="Joint Verification">যৌথ তদন্ত</option>
                  <option value="Notice 7">৭ ধারা নোটিশ</option>
                  <option value="Awarded">অ্যাওয়ার্ড নির্ধারিত</option>
                  <option value="Paid">ক্ষতিপূরণ প্রদান</option>
                  <option value="Completed">অধিগ্রহণ সম্পন্ন</option>
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
              placeholder="কেস নম্বর, প্রকল্পের নাম অথবা মৌজা দিয়ে খুঁজুন..."
              className="w-full px-8 py-5 bg-white border-2 border-transparent rounded-2xl focus:border-indigo-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm pr-32"
            />
            <button 
              onClick={handleSearch}
              className="absolute right-2 top-2 bottom-2 px-8 bg-indigo-600 text-white font-black rounded-xl hover:bg-indigo-700 transition-all shadow-lg flex items-center gap-2"
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
            <div className="w-1.5 h-6 bg-indigo-500 rounded-full"/> অনুসন্ধান ফলাফল ({filteredCases.length})
          </h3>
          <div className="flex items-center gap-2">
             <span className="text-[10px] font-black text-gray-400 uppercase">সর্টিং:</span>
             <select className="bg-transparent text-sm font-black text-gray-600 outline-none cursor-pointer">
               <option>সর্বশেষ</option>
               <option>কেস নম্বর</option>
             </select>
          </div>
        </div>

        {filteredCases.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredCases.map((laCase) => (
              <div key={laCase.id} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-110 transition-transform" />
                
                <div className="flex flex-col lg:flex-row gap-8 relative z-10">
                  <div className="flex-1 space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                      <div className={`px-4 py-1.5 rounded-full border text-[10px] font-black uppercase tracking-widest ${getStatusColor(laCase.status)}`}>
                        {getStatusLabel(laCase.status)}
                      </div>
                      <div className="px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        {laCase.type === 'Roads' ? 'সড়ক' : 
                         laCase.type === 'Railways' ? 'রেলপথ' : 
                         laCase.type === 'Power' ? 'বিদ্যুৎ' : 
                         laCase.type === 'Economic Zone' ? 'অর্থনৈতিক অঞ্চল' : 'অন্যান্য'}
                      </div>
                      <h4 className="text-2xl font-black text-gray-800 tracking-tight">{laCase.caseNo}</h4>
                    </div>

                    <div className="space-y-2">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">প্রকল্পের নাম</p>
                      <p className="text-lg font-bold text-gray-700 leading-tight">{laCase.project}</p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase">অবস্থান</p>
                        <p className="text-sm font-bold text-gray-700">{laCase.district}, {laCase.upazila}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase">মৌজা</p>
                        <p className="text-sm font-bold text-gray-700">{laCase.mouza}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase">দাগ নম্বর</p>
                        <p className="text-sm font-bold text-gray-700">{laCase.dagNo}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-black text-gray-400 uppercase">জমির পরিমাণ</p>
                        <p className="text-sm font-bold text-gray-700">{laCase.area}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:w-80 bg-gray-50 rounded-[2rem] p-6 border border-gray-100 space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-white text-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
                        <Scale size={20} />
                      </div>
                      <h5 className="font-black text-gray-800">ক্ষতিপূরণ তথ্য</h5>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-500">মোট বরাদ্দ:</span>
                        <span className="text-sm font-black text-gray-800">{laCase.compensation.total}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-500">পরিশোধিত:</span>
                        <span className="text-sm font-black text-emerald-600">{laCase.compensation.paid}</span>
                      </div>
                      {laCase.compensation.date && (
                        <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                          <span className="text-[10px] font-black text-gray-400 uppercase">সর্বশেষ পেমেন্ট:</span>
                          <span className="text-[10px] font-black text-gray-600">{laCase.compensation.date}</span>
                        </div>
                      )}
                    </div>

                    <button className="w-full py-3 bg-white text-indigo-600 border border-indigo-100 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-sm flex items-center justify-center gap-2">
                      <Download size={14} /> রিসিট ডাউনলোড
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                   <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                     <Info size={14} /> মন্তব্য: {laCase.remarks}
                   </div>
                   <div className="flex items-center gap-3">
                     <button className="flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-xl font-black text-sm hover:bg-black transition-all shadow-lg">
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
            <h4 className="text-xl font-black text-gray-800">কোনো অধিগ্রহণ কেস পাওয়া যায়নি</h4>
            <p className="text-gray-500 font-medium max-w-xs mx-auto">আপনার দেওয়া তথ্যগুলো পুনরায় যাচাই করে আবার চেষ্টা করুন।</p>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-indigo-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
              <ShieldAlert size={28} className="text-indigo-400" /> আইনি সহায়তা
            </h3>
            <p className="text-sm font-medium text-indigo-100 leading-relaxed mb-6">
              অধিগ্রহণকৃত জমির ক্ষতিপূরণ নিয়ে কোনো অভিযোগ বা আইনি সহায়তার প্রয়োজন হলে জেলা প্রশাসকের কার্যালয়ের এল.এ (LA) শাখায় যোগাযোগ করুন।
            </p>
            <button className="flex items-center gap-2 text-indigo-300 font-black text-xs hover:underline">
              অধিগ্রহণ বিধিমালা দেখুন <ArrowRight size={14} />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <CheckCircle2 size={24} />
            </div>
            <div>
              <h4 className="font-black text-gray-800">ক্ষতিপূরণ ট্র্যাকার</h4>
              <p className="text-xs text-gray-500 font-medium">আপনার ক্ষতিপূরণের আবেদনের সর্বশেষ অবস্থা জানতে ট্র্যাকার ব্যবহার করুন।</p>
            </div>
          </div>
          <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg">
            পেমেন্ট স্ট্যাটাস চেক করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandAcquisitionData;
