
import React, { useState, useMemo } from 'react';
import { Calculator, MapPin, Globe, Landmark, ChevronDown, ArrowRight, Info, ShieldCheck, TrendingUp, DollarSign, FileText, PieChart, Sparkles, CheckCircle2 } from 'lucide-react';
import { locationData } from '../src/data/locations';

const landTypes = [
  { id: 'agricultural', label: 'কৃষি জমি', baseRate: 50000, subTypes: ['নাল', 'ডাঙ্গা', 'চালা', 'বাইদ'] },
  { id: 'residential', label: 'আবাসিক জমি', baseRate: 150000, subTypes: ['ভিটা', 'বাস্তু', 'উঁচু জমি'] },
  { id: 'commercial', label: 'বাণিজ্যিক জমি', baseRate: 500000, subTypes: ['দোকান', 'মার্কেট', 'অফিস স্পেস'] },
  { id: 'industrial', label: 'শিল্প জমি', baseRate: 300000, subTypes: ['কারখানা', 'গুদাম', 'ইন্ডাস্ট্রিয়াল প্লট'] },
];

const roadAccessTypes = [
  { id: 'highway', label: 'মহাসড়ক সংলগ্ন', multiplier: 1.8 },
  { id: 'main_road', label: 'প্রধান সড়ক সংলগ্ন', multiplier: 1.5 },
  { id: 'sub_road', label: 'শাখা সড়ক সংলগ্ন', multiplier: 1.2 },
  { id: 'no_road', label: 'সড়ক সংযোগ বিহীন', multiplier: 0.8 },
];

const LandValuation: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState('ঢাকা');
  const [selectedDistrict, setSelectedDistrict] = useState('ঢাকা');
  const [selectedUpazila, setSelectedUpazila] = useState('তেজগাঁও');
  const [selectedUnion, setSelectedUnion] = useState('তেজগাঁও');
  const [selectedMouza, setSelectedMouza] = useState('তেজগাঁও শিল্প এলাকা');
  const [landSize, setLandSize] = useState<string>('');
  const [selectedType, setSelectedType] = useState('agricultural');
  const [selectedSubType, setSelectedSubType] = useState('');
  const [selectedRoad, setSelectedRoad] = useState('main_road');
  const [valuationResult, setValuationResult] = useState<{ 
    total: number; 
    perDecimal: number;
    factors: { label: string; value: string }[];
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const divisions = useMemo(() => Object.keys(locationData), []);
  const districts = useMemo(() => Object.keys(locationData[selectedDivision] || {}), [selectedDivision]);
  const upazilas = useMemo(() => Object.keys(locationData[selectedDivision]?.[selectedDistrict] || {}), [selectedDivision, selectedDistrict]);
  const unions = useMemo(() => Object.keys(locationData[selectedDivision]?.[selectedDistrict]?.[selectedUpazila] || {}), [selectedDivision, selectedDistrict, selectedUpazila]);
  const mouzas = useMemo(() => locationData[selectedDivision]?.[selectedDistrict]?.[selectedUpazila]?.[selectedUnion] || [], [selectedDivision, selectedDistrict, selectedUpazila, selectedUnion]);

  const currentType = useMemo(() => landTypes.find(t => t.id === selectedType), [selectedType]);

  const calculateValuation = () => {
    if (!landSize || isNaN(Number(landSize))) return;
    
    setIsCalculating(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      const type = landTypes.find(t => t.id === selectedType);
      const baseRate = type ? type.baseRate : 50000;
      
      // Location multiplier (mock logic)
      let multiplier = 1.0;
      if (selectedDivision === 'ঢাকা') multiplier = 2.5;
      else if (selectedDivision === 'চট্টগ্রাম') multiplier = 2.0;
      else if (selectedDivision === 'সিলেট') multiplier = 1.5;
      
      if (selectedDistrict === 'ঢাকা') multiplier *= 1.5;

      // Road multiplier
      const road = roadAccessTypes.find(r => r.id === selectedRoad);
      const roadMultiplier = road ? road.multiplier : 1.0;
      
      const perDecimal = baseRate * multiplier * roadMultiplier;
      const total = perDecimal * Number(landSize);
      
      setValuationResult({ 
        total, 
        perDecimal,
        factors: [
          { label: 'অবস্থান', value: `${selectedDistrict}, ${selectedUpazila}` },
          { label: 'জমির ধরণ', value: type?.label || '' },
          { label: 'উপ-ধরণ', value: selectedSubType || 'সাধারণ' },
          { label: 'যাতায়াত', value: road?.label || '' },
          { label: 'আয়তন', value: `${landSize} শতাংশ` }
        ]
      });
      setIsCalculating(false);
    }, 800);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Header Section */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-indigo-50 rounded-[2rem] flex items-center justify-center mb-6 text-indigo-600 shadow-inner">
            <TrendingUp size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">জমি মূল্যায়ন টুল (Land Valuation Tool)</h2>
          <p className="text-gray-500 max-w-lg font-medium">আপনার জমির অবস্থান, ধরণ এবং আয়তন অনুযায়ী বর্তমান বাজার মূল্যের একটি আনুমানিক ধারণা নিন।</p>
        </div>

        {/* Form Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-2 mb-4">
              <MapPin size={20} className="text-indigo-600" /> অবস্থানের বিবরণ
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
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
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
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
                    onChange={(e) => {
                      const up = e.target.value;
                      setSelectedUpazila(up);
                      const firstUni = Object.keys(locationData[selectedDivision][selectedDistrict][up])[0];
                      setSelectedUnion(firstUni);
                    }}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                  >
                    {upazilas.map(up => <option key={up} value={up}>{up}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">ইউনিয়ন</label>
                <div className="relative">
                  <select 
                    value={selectedUnion}
                    onChange={(e) => setSelectedUnion(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                  >
                    {unions.map(uni => <option key={uni} value={uni}>{uni}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মৌজা</label>
              <div className="relative">
                <select 
                  value={selectedMouza}
                  onChange={(e) => setSelectedMouza(e.target.value)}
                  className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                >
                  {mouzas.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-2 mb-4">
              <Calculator size={20} className="text-indigo-600" /> জমির ধরণ ও আয়তন
            </h3>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">জমির ধরণ</label>
                <div className="grid grid-cols-2 gap-3">
                  {landTypes.map((type) => (
                    <button
                      key={type.id}
                      onClick={() => {
                        setSelectedType(type.id);
                        setSelectedSubType(type.subTypes[0]);
                      }}
                      className={`px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                        selectedType === type.id 
                          ? 'border-indigo-600 bg-indigo-50 text-indigo-700 shadow-sm' 
                          : 'border-gray-100 bg-white text-gray-500 hover:border-gray-200'
                      }`}
                    >
                      {type.label}
                    </button>
                  ))}
                </div>
              </div>

              {currentType && (
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">উপ-ধরণ (শ্রেণী)</label>
                  <div className="relative">
                    <select 
                      value={selectedSubType}
                      onChange={(e) => setSelectedSubType(e.target.value)}
                      className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                    >
                      {currentType.subTypes.map(st => <option key={st} value={st}>{st}</option>)}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">যাতায়াত ব্যবস্থা</label>
                <div className="relative">
                  <select 
                    value={selectedRoad}
                    onChange={(e) => setSelectedRoad(e.target.value)}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
                  >
                    {roadAccessTypes.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">জমির আয়তন (শতাংশ/Decimal)</label>
                <div className="relative">
                  <input 
                    type="number" 
                    value={landSize}
                    onChange={(e) => setLandSize(e.target.value)}
                    placeholder="উদা: ১০"
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xs uppercase tracking-widest">শতাংশ</div>
                </div>
              </div>

              <button 
                onClick={calculateValuation}
                disabled={!landSize || isCalculating}
                className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-lg shadow-xl hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
              >
                {isCalculating ? (
                  <>হিসাব করা হচ্ছে... <Calculator className="animate-spin" size={24} /></>
                ) : (
                  <>মূল্য যাচাই করুন <ArrowRight size={24} /></>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Result Section */}
      {valuationResult && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in zoom-in-95 duration-500">
          <div className="md:col-span-2 bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400">
                  <DollarSign size={28} />
                </div>
                <h3 className="text-2xl font-black tracking-tight">আনুমানিক বাজার মূল্য</h3>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mb-2">মোট মূল্য (আনুমানিক)</p>
                  <p className="text-5xl font-black tracking-tighter">৳ {valuationResult.total.toLocaleString('bn-BD')}</p>
                </div>
                <div>
                  <p className="text-indigo-300 text-[10px] font-black uppercase tracking-[0.2em] mb-2">প্রতি শতাংশের মূল্য</p>
                  <p className="text-3xl font-black tracking-tighter">৳ {valuationResult.perDecimal.toLocaleString('bn-BD')}</p>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-4">
                <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-400">
                  <ShieldCheck size={20} />
                </div>
                <p className="text-xs font-medium text-gray-400 leading-relaxed">
                  এই মূল্যটি একটি আনুমানিক ধারণা মাত্র। প্রকৃত বাজার মূল্য জমির অবস্থান, যাতায়াত ব্যবস্থা এবং অন্যান্য পারিপার্শ্বিক অবস্থার ওপর নির্ভর করে পরিবর্তিত হতে পারে।
                </p>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                  <PieChart size={20} />
                </div>
                <h4 className="font-black text-gray-800">মূল্যায়ন সারসংক্ষেপ</h4>
              </div>
              
              <div className="space-y-4">
                {valuationResult.factors.map((f, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-xs font-bold text-gray-400 uppercase">{f.label}</span>
                    <span className="text-sm font-black text-gray-700">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full py-4 bg-gray-50 text-gray-500 rounded-2xl font-black text-xs hover:bg-gray-100 transition-all flex items-center justify-center gap-2 mt-8">
              রিপোর্ট ডাউনলোড করুন <FileText size={16} />
            </button>
          </div>
        </div>
      )}

      {/* Tips Section */}
      <div className="bg-emerald-50 p-10 rounded-[3rem] border border-emerald-100 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center text-emerald-600 shadow-sm shrink-0">
            <Sparkles size={40} />
          </div>
          <div>
            <h4 className="text-2xl font-black text-emerald-900 mb-2">সঠিক মূল্য নির্ধারণের টিপস</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {[
                'রাস্তার পাশের জমির মূল্য সাধারণত বেশি হয়।',
                'জমির কাগজপত্রের নির্ভুলতা মূল্যের ওপর প্রভাব ফেলে।',
                'আশেপাশে বড় কোনো প্রকল্প থাকলে মূল্য বৃদ্ধি পায়।',
                'জমির আকার ও ব্যবহারের উপযোগিতা যাচাই করুন।'
              ].map((tip, idx) => (
                <div key={idx} className="flex items-center gap-3 text-emerald-800 font-bold text-sm">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandValuation;
