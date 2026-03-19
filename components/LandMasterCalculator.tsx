
import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Ruler, 
  Landmark, 
  MapPin, 
  Layers, 
  Info, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  Download, 
  CreditCard, 
  Calendar, 
  AlertCircle,
  FileText,
  Maximize2,
  Minimize2,
  ArrowLeftRight
} from 'lucide-react';

type Tab = 'area' | 'revenue' | 'converter' | 'summation';
type LandCategory = 'Agricultural' | 'Residential' | 'Commercial' | 'Industrial';
type DetailedLocation = 'DhakaChittagongCity' | 'OtherCityCorp' | 'DistrictMunicipality' | 'OtherMunicipality' | 'Union';

const LandMasterCalculator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('area');

  // Area State
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [areaUnit, setAreaUnit] = useState<'feet' | 'meter' | 'link' | 'yard'>('feet');

  // Summation State
  const [sumAcres, setSumAcres] = useState<string>('');
  const [sumBigha, setSumBigha] = useState<string>('');
  const [sumKatha, setSumKatha] = useState<string>('');
  const [sumDecimal, setSumDecimal] = useState<string>('');
  const [sumSqFt, setSumSqFt] = useState<string>('');

  // Revenue State
  const [revArea, setRevArea] = useState<string>('');
  const [revUnit, setRevUnit] = useState<'decimal' | 'katha' | 'bigha'>('decimal');
  const [category, setCategory] = useState<LandCategory>('Agricultural');
  const [location, setLocation] = useState<DetailedLocation>('Union');
  const [arrearsYears, setArrearsYears] = useState<number>(0);
  const [taxResult, setTaxResult] = useState<{ 
    primary: number; 
    totalArrears: number;
    penalty: number;
    total: number;
  } | null>(null);

  // Converter State
  const [convValue, setConvValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<string>('decimal');
  const [toUnit, setToUnit] = useState<string>('katha');

  const units = {
    decimal: { label: 'শতাংশ (Decimal)', factor: 435.6 },
    katha: { label: 'কাঠা (Katha)', factor: 720 },
    bigha: { label: 'বিঘা (Bigha)', factor: 14400 },
    acre: { label: 'একর (Acre)', factor: 43560 },
    hectare: { label: 'হেক্টর (Hectare)', factor: 107639 },
    sqft: { label: 'বর্গফুট (Sq. Ft)', factor: 1 },
    sqm: { label: 'বর্গমিটার (Sq. Meter)', factor: 10.7639 },
  };

  const calculateArea = useMemo(() => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    let sqFt = 0;

    if (areaUnit === 'feet') sqFt = l * w;
    else if (areaUnit === 'meter') sqFt = (l * 3.28084) * (w * 3.28084);
    else if (areaUnit === 'link') sqFt = (l * 0.66) * (w * 0.66);
    else if (areaUnit === 'yard') sqFt = (l * 3) * (w * 3);

    return {
      sqft: sqFt.toFixed(2),
      decimal: (sqFt / 435.6).toFixed(2),
      katha: (sqFt / 720).toFixed(2),
      bigha: (sqFt / 14400).toFixed(2),
      acre: (sqFt / 43560).toFixed(2),
      sqm: (sqFt / 10.7639).toFixed(2)
    };
  }, [length, width, areaUnit]);

  const calculateTax = () => {
    let areaInDecimal = parseFloat(revArea) || 0;
    if (revUnit === 'katha') areaInDecimal *= 1.65;
    else if (revUnit === 'bigha') areaInDecimal *= 33;

    if (areaInDecimal <= 0) return;

    let annualRate = 0;
    if (category === 'Agricultural') {
      if (areaInDecimal <= 825) annualRate = 0.012; // Nominal
      else annualRate = 2.0;
    } else {
      switch(location) {
        case 'DhakaChittagongCity':
          annualRate = category === 'Commercial' ? 250 : category === 'Industrial' ? 150 : 100;
          break;
        case 'OtherCityCorp':
          annualRate = category === 'Commercial' ? 150 : category === 'Industrial' ? 100 : 60;
          break;
        case 'DistrictMunicipality':
          annualRate = category === 'Commercial' ? 100 : category === 'Industrial' ? 60 : 40;
          break;
        case 'OtherMunicipality':
          annualRate = category === 'Commercial' ? 60 : category === 'Industrial' ? 40 : 20;
          break;
        case 'Union':
          annualRate = category === 'Commercial' ? 30 : category === 'Industrial' ? 20 : 10;
          break;
      }
    }

    const primaryAnnualTax = category === 'Agricultural' && areaInDecimal <= 825 ? 10 : areaInDecimal * annualRate;
    const totalArrears = primaryAnnualTax * Math.max(1, arrearsYears + 1);
    const penalty = arrearsYears > 0 ? (totalArrears * 0.0625 * arrearsYears) : 0;
    
    setTaxResult({
      primary: Math.round(primaryAnnualTax),
      totalArrears: Math.round(totalArrears),
      penalty: Math.round(penalty),
      total: Math.round(totalArrears + penalty)
    });
  };

  const convertValue = useMemo(() => {
    const val = parseFloat(convValue) || 0;
    const fromFactor = (units as any)[fromUnit].factor;
    const toFactor = (units as any)[toUnit].factor;
    return ((val * fromFactor) / toFactor).toFixed(4);
  }, [convValue, fromUnit, toUnit]);

  const calculateSummation = useMemo(() => {
    const acres = parseFloat(sumAcres) || 0;
    const bigha = parseFloat(sumBigha) || 0;
    const katha = parseFloat(sumKatha) || 0;
    const decimal = parseFloat(sumDecimal) || 0;
    const sqft = parseFloat(sumSqFt) || 0;

    const totalSqFt = (acres * 43560) + (bigha * 14400) + (katha * 720) + (decimal * 435.6) + sqft;

    return {
      sqft: totalSqFt.toFixed(2),
      decimal: (totalSqFt / 435.6).toFixed(2),
      katha: (totalSqFt / 720).toFixed(2),
      bigha: (totalSqFt / 14400).toFixed(2),
      acre: (totalSqFt / 43560).toFixed(2),
      sqm: (totalSqFt / 10.7639).toFixed(2)
    };
  }, [sumAcres, sumBigha, sumKatha, sumDecimal, sumSqFt]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Header */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
            <Calculator size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">মাস্টার ভূমি ক্যালকুলেটর</h2>
          <p className="text-gray-500 max-w-lg font-medium">একই জায়গায় জমির পরিমাপ, কর হিসাব এবং একক রূপান্তর করুন।</p>
        </div>

        {/* Tabs */}
        <div className="flex p-2 bg-gray-100 rounded-[2rem] max-w-4xl mx-auto mb-12 overflow-x-auto">
          {[
            { id: 'area', label: 'জমি পরিমাপ', icon: Ruler },
            { id: 'summation', label: 'মাল্টি-ইউনিট যোগফল', icon: Layers },
            { id: 'revenue', label: 'ভূমি কর হিসাব', icon: Landmark },
            { id: 'converter', label: 'একক রূপান্তর', icon: ArrowLeftRight }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-4 rounded-[1.5rem] font-black text-sm transition-all whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'bg-white text-emerald-600 shadow-lg scale-105' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="animate-in fade-in duration-300">
          {activeTab === 'area' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex gap-4 p-2 bg-gray-50 rounded-2xl border border-gray-100">
                  {['feet', 'meter', 'link', 'yard'].map(u => (
                    <button 
                      key={u}
                      onClick={() => setAreaUnit(u as any)}
                      className={`flex-1 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${areaUnit === u ? 'bg-emerald-600 text-white shadow-md' : 'text-gray-400 hover:bg-gray-200'}`}
                    >
                      {u}
                    </button>
                  ))}
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">দৈর্ঘ্য (Length)</label>
                    <input 
                      type="number" 
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                      placeholder="০.০০"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">প্রস্থ (Width)</label>
                    <input 
                      type="number" 
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                      placeholder="০.০০"
                    />
                  </div>
                </div>

                <div className="p-6 bg-blue-50 border border-blue-100 rounded-[2rem] flex items-start gap-4">
                  <Info className="text-blue-600 shrink-0" size={24} />
                  <p className="text-xs font-bold leading-relaxed text-blue-800">
                    আয়তাকার জমির ক্ষেত্রে দৈর্ঘ্য ও প্রস্থ গুণ করে ক্ষেত্রফল বের করা হয়। অনিয়মিত জমির ক্ষেত্রে গড় পদ্ধতি ব্যবহার করুন।
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'শতাংশ', val: calculateArea.decimal, unit: 'Decimal', color: 'bg-emerald-50 text-emerald-700' },
                  { label: 'কাঠা', val: calculateArea.katha, unit: 'Katha', color: 'bg-white' },
                  { label: 'বিঘা', val: calculateArea.bigha, unit: 'Bigha', color: 'bg-white' },
                  { label: 'একর', val: calculateArea.acre, unit: 'Acre', color: 'bg-white' },
                  { label: 'বর্গফুট', val: calculateArea.sqft, unit: 'Sq. Ft', color: 'bg-white' },
                  { label: 'বর্গমিটার', val: calculateArea.sqm, unit: 'Sq. Meter', color: 'bg-white' }
                ].map((res, i) => (
                  <div key={i} className={`p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${res.color}`}>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">{res.label}</p>
                      <p className="text-2xl font-black tracking-tight">{res.val}</p>
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600 mt-4">{res.unit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'summation' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">একর (Acre)</label>
                    <input 
                      type="number" 
                      value={sumAcres}
                      onChange={(e) => setSumAcres(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                      placeholder="০"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">বিঘা (Bigha)</label>
                    <input 
                      type="number" 
                      value={sumBigha}
                      onChange={(e) => setSumBigha(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                      placeholder="০"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">কাঠা (Katha)</label>
                    <input 
                      type="number" 
                      value={sumKatha}
                      onChange={(e) => setSumKatha(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                      placeholder="০"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">শতাংশ (Decimal)</label>
                    <input 
                      type="number" 
                      value={sumDecimal}
                      onChange={(e) => setSumDecimal(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                      placeholder="০"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">বর্গফুট (Sq. Ft)</label>
                    <input 
                      type="number" 
                      value={sumSqFt}
                      onChange={(e) => setSumSqFt(e.target.value)}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                      placeholder="০"
                    />
                  </div>
                </div>

                <div className="p-6 bg-emerald-50 border border-emerald-100 rounded-[2rem] flex items-start gap-4">
                  <RefreshCw className="text-emerald-600 shrink-0" size={24} />
                  <p className="text-xs font-bold leading-relaxed text-emerald-800">
                    বিভিন্ন এককে থাকা জমির পরিমাণগুলো এখানে লিখুন। স্বয়ংক্রিয়ভাবে সবগুলোর যোগফল নিচে প্রদর্শিত হবে।
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'মোট শতাংশ', val: calculateSummation.decimal, unit: 'Total Decimal', color: 'bg-emerald-50 text-emerald-700' },
                  { label: 'মোট একর', val: calculateSummation.acre, unit: 'Total Acre', color: 'bg-white' },
                  { label: 'মোট বিঘা', val: calculateSummation.bigha, unit: 'Total Bigha', color: 'bg-white' },
                  { label: 'মোট কাঠা', val: calculateSummation.katha, unit: 'Total Katha', color: 'bg-white' },
                  { label: 'মোট বর্গফুট', val: calculateSummation.sqft, unit: 'Total Sq. Ft', color: 'bg-white' },
                  { label: 'মোট বর্গমিটার', val: calculateSummation.sqm, unit: 'Total Sq. Meter', color: 'bg-white' }
                ].map((res, i) => (
                  <div key={i} className={`p-6 rounded-[2rem] border border-gray-100 shadow-sm flex flex-col justify-between transition-all hover:shadow-md ${res.color}`}>
                    <div>
                      <p className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-1">{res.label}</p>
                      <p className="text-2xl font-black tracking-tight">{res.val}</p>
                    </div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-emerald-600 mt-4">{res.unit}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'revenue' && (
            <div className="max-w-2xl mx-auto space-y-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">জমির ধরন</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value as LandCategory)}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  >
                    <option value="Agricultural">কৃষি জমি</option>
                    <option value="Residential">আবাসিক</option>
                    <option value="Commercial">বাণিজ্যিক</option>
                    <option value="Industrial">শিল্প জমি</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">অবস্থান</label>
                  <select 
                    value={location}
                    onChange={(e) => setLocation(e.target.value as DetailedLocation)}
                    className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  >
                    <option value="Union">ইউনিয়ন/পল্লী</option>
                    <option value="OtherMunicipality">অন্যান্য পৌরসভা</option>
                    <option value="DistrictMunicipality">জেলা পৌরসভা</option>
                    <option value="OtherCityCorp">সিটি কর্পোরেশন</option>
                    <option value="DhakaChittagongCity">ঢাকা/চট্টগ্রাম সিটি</option>
                  </select>
                </div>
              </div>

              <div className="p-8 bg-emerald-50/50 border border-emerald-100 rounded-[2.5rem] space-y-6">
                <div className="flex gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest ml-1">জমির পরিমাণ</label>
                    <input 
                      type="number" 
                      value={revArea}
                      onChange={(e) => setRevArea(e.target.value)}
                      className="w-full px-6 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-black text-lg text-emerald-900 shadow-sm"
                      placeholder="০.০০"
                    />
                  </div>
                  <div className="w-32 space-y-2">
                    <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest ml-1">একক</label>
                    <select 
                      value={revUnit}
                      onChange={(e) => setRevUnit(e.target.value as any)}
                      className="w-full px-4 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-emerald-700 shadow-sm"
                    >
                      <option value="decimal">শতাংশ</option>
                      <option value="katha">কাঠা</option>
                      <option value="bigha">বিঘা</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <label className="text-[10px] font-black text-emerald-800 uppercase tracking-widest ml-1">বকেয়া বছর: {arrearsYears}</label>
                    <span className="px-3 py-1 bg-emerald-600 text-white rounded-full text-[10px] font-black">{arrearsYears === 0 ? 'চলতি' : `${arrearsYears} বছর`}</span>
                  </div>
                  <input 
                    type="range" min="0" max="10" step="1" 
                    value={arrearsYears} 
                    onChange={(e) => setArrearsYears(parseInt(e.target.value))}
                    className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer accent-emerald-600" 
                  />
                </div>

                <button 
                  onClick={calculateTax}
                  className="w-full py-5 bg-emerald-600 text-white font-black rounded-[1.5rem] hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 text-lg"
                >
                  কর হিসাব করুন <ArrowRight size={22} />
                </button>
              </div>

              {taxResult && (
                <div className="bg-white p-10 rounded-[3rem] border-2 border-emerald-500 shadow-2xl animate-in zoom-in-95 duration-500">
                  <div className="grid grid-cols-2 gap-y-6">
                    <div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">বার্ষিক মূল কর</p>
                      <p className="text-2xl font-black text-emerald-900">৳ {taxResult.primary}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">মোট বকেয়া</p>
                      <p className="text-2xl font-black text-emerald-900">৳ {taxResult.totalArrears}</p>
                    </div>
                    <div className="col-span-2 pt-6 border-t border-dashed border-gray-100 flex justify-between items-center">
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">মোট প্রদেয় (জরিমানাসহ)</p>
                        <p className="text-4xl font-black text-emerald-600">৳ {taxResult.total}</p>
                      </div>
                      <button className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2">
                        পেমেন্ট করুন <CreditCard size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'converter' && (
            <div className="max-w-xl mx-auto space-y-10">
              <div className="p-10 bg-gray-50 rounded-[3rem] border border-gray-100 space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">পরিমাণ লিখুন</label>
                  <input 
                    type="number" 
                    value={convValue}
                    onChange={(e) => setConvValue(e.target.value)}
                    className="w-full px-10 py-6 bg-white border-2 border-transparent rounded-[2rem] focus:border-emerald-500 outline-none transition-all font-black text-3xl text-gray-800 shadow-sm text-center"
                    placeholder="০.০০"
                  />
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">থেকে (From)</label>
                    <select 
                      value={fromUnit}
                      onChange={(e) => setFromUnit(e.target.value)}
                      className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700"
                    >
                      {Object.entries(units).map(([id, u]) => <option key={id} value={id}>{u.label}</option>)}
                    </select>
                  </div>
                  <div className="mt-6 p-3 bg-white rounded-full text-emerald-600 shadow-md border border-gray-100">
                    <ArrowLeftRight size={24} />
                  </div>
                  <div className="flex-1 space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">পর্যন্ত (To)</label>
                    <select 
                      value={toUnit}
                      onChange={(e) => setToUnit(e.target.value)}
                      className="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700"
                    >
                      {Object.entries(units).map(([id, u]) => <option key={id} value={id}>{u.label}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-900 p-12 rounded-[4rem] text-white text-center relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <p className="text-emerald-400 text-xs font-black uppercase tracking-[0.3em] mb-4">রূপান্তরিত ফলাফল</p>
                  <h3 className="text-6xl font-black tracking-tighter mb-4">{convertValue}</h3>
                  <p className="text-emerald-200 font-bold text-lg">{(units as any)[toUnit].label}</p>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-emerald-600/20 to-transparent pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'সঠিক পরিমাপ', desc: 'জরিপ ম্যাপের সাথে মিলিয়ে জমির সীমানা নির্ধারণ করুন।', icon: Target },
          { title: 'ডিজিটাল পেমেন্ট', desc: 'নগদ, বিকাশ বা রকেটের মাধ্যমে সরাসরি ভূমি কর পরিশোধ করুন।', icon: CreditCard },
          { title: 'আইনি সহায়তা', desc: 'পরিমাপ সংক্রান্ত বিরোধে এআই আইনি সহায়কের পরামর্শ নিন।', icon: Info }
        ].map((item, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <item.icon size={24} />
            </div>
            <h4 className="text-lg font-black text-gray-800 mb-2">{item.title}</h4>
            <p className="text-xs text-gray-500 font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const Target = Ruler; // Alias for icon

export default LandMasterCalculator;
