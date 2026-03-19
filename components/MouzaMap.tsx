
import React, { useState, useRef } from 'react';
import { Map as MapIcon, Search, MapPin, Globe, Landmark, ChevronDown, ArrowRight, Layers, Maximize2, ZoomIn, ZoomOut, Download, Share2, Info, X, User, Hash, Ruler, ExternalLink, Users } from 'lucide-react';
import { locationData } from '../src/data/locations';

interface Plot {
  id: string;
  dagNo: string;
  owner: string;
  area: string;
  path: string;
  color: string;
}

const mockPlots: Plot[] = [
  { id: '1', dagNo: '১০১', owner: 'মজিবুর রহমান মিন্টু', area: '১২.৫ শতাংশ', path: 'M 50 50 L 150 50 L 150 150 L 50 150 Z', color: 'fill-emerald-50/50' },
  { id: '2', dagNo: '১০২', owner: 'মোসাম্মাৎ রহিমা', area: '৮.২ শতাংশ', path: 'M 150 50 L 250 50 L 280 120 L 150 150 Z', color: 'fill-emerald-50/50' },
  { id: '3', dagNo: '১০৩', owner: 'করিম উদ্দিন', area: '১৫.০ শতাংশ', path: 'M 250 50 L 400 50 L 400 180 L 280 120 Z', color: 'fill-emerald-50/50' },
  { id: '4', dagNo: '১০৪', owner: 'জহিরুল হক', area: '৫.৭ শতাংশ', path: 'M 50 150 L 150 150 L 120 250 L 50 250 Z', color: 'fill-emerald-50/50' },
  { id: '5', dagNo: '১০৫', owner: 'সরকারি খাস জমি', area: '২০.১ শতাংশ', path: 'M 150 150 L 280 120 L 350 250 L 120 250 Z', color: 'fill-amber-50/50' },
  { id: '6', dagNo: '১০৬', owner: 'নদী/জলাশয়', area: '১০.৫ শতাংশ', path: 'M 400 50 L 550 50 L 550 300 L 400 180 Z', color: 'fill-blue-50/50' },
];

const mapTypes = [
  'সিএস (CS)',
  'এসএ (SA)',
  'পেটি (PETI)',
  'আরএস (RS)',
  'বিআরএস (BRS)',
  'সিটি জরিপ (City Survey)'
];

const sheetNos = [
  'শীট ১',
  'শীট ২',
  'শীট ৩',
  'শীট ৪',
  'শীট ৫'
];

const MouzaMap: React.FC = () => {
  const [selectedDivision, setSelectedDivision] = useState('ঢাকা');
  const [selectedDistrict, setSelectedDistrict] = useState('ঢাকা');
  const [selectedUpazila, setSelectedUpazila] = useState('তেজগাঁও');
  const [selectedUnion, setSelectedUnion] = useState('তেজগাঁও');
  const [selectedMouza, setSelectedMouza] = useState('তেজগাঁও শিল্প এলাকা');
  const [selectedMapType, setSelectedMapType] = useState('আরএস (RS)');
  const [selectedSheet, setSelectedSheet] = useState('শীট ১');
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [selectedPlot, setSelectedPlot] = useState<Plot | null>(null);
  const [zoom, setZoom] = useState(1);
  const [searchDag, setSearchDag] = useState('');

  const divisions = React.useMemo(() => Object.keys(locationData), []);
  const districts = React.useMemo(() => Object.keys(locationData[selectedDivision] || {}), [selectedDivision]);
  const upazilas = React.useMemo(() => Object.keys(locationData[selectedDivision]?.[selectedDistrict] || {}), [selectedDivision, selectedDistrict]);
  const unions = React.useMemo(() => Object.keys(locationData[selectedDivision]?.[selectedDistrict]?.[selectedUpazila] || {}), [selectedDivision, selectedDistrict, selectedUpazila]);
  const mouzas = React.useMemo(() => locationData[selectedDivision]?.[selectedDistrict]?.[selectedUpazila]?.[selectedUnion] || [], [selectedDivision, selectedDistrict, selectedUpazila, selectedUnion]);
  
  const mapRef = useRef<SVGSVGElement>(null);

  const handleSearch = () => {
    setIsMapLoaded(true);
    setSelectedPlot(null);
  };

  const handlePlotClick = (plot: Plot) => {
    setSelectedPlot(plot);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));

  const handleOpenInNewTab = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', 'map');
    window.open(url.toString(), '_blank');
  };

  const filteredPlots = searchDag 
    ? mockPlots.filter(p => p.dagNo.includes(searchDag))
    : mockPlots;

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Search Header */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
            <MapIcon size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">ডিজিটাল মৌজা ম্যাপ অনুসন্ধান</h2>
          <p className="text-gray-500 max-w-lg font-medium">আপনার এলাকার ডিজিটাল মৌজা ম্যাপ (RS/BRS) অনলাইনে দেখুন ও ডাউনলোড করুন।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                  const firstUni = Object.keys(locationData[div][firstDist][firstUp])[0];
                  setSelectedUnion(firstUni);
                  setSelectedMouza(locationData[div][firstDist][firstUp][firstUni][0]);
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
                  const firstUni = Object.keys(locationData[selectedDivision][dist][firstUp])[0];
                  setSelectedUnion(firstUni);
                  setSelectedMouza(locationData[selectedDivision][dist][firstUp][firstUni][0]);
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
                  const firstUni = Object.keys(locationData[selectedDivision][selectedDistrict][up])[0];
                  setSelectedUnion(firstUni);
                  setSelectedMouza(locationData[selectedDivision][selectedDistrict][up][firstUni][0]);
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
                  const uni = e.target.value;
                  setSelectedUnion(uni);
                  setSelectedMouza(locationData[selectedDivision][selectedDistrict][selectedUpazila][uni][0]);
                }}
                className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-emerald-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
              >
                {unions.map(uni => <option key={uni} value={uni}>{uni}</option>)}
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

          <div className="space-y-2 group">
            <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
              <Layers size={14}/> নকশার ধরণ
            </label>
            <div className="relative">
              <select 
                value={selectedMapType}
                onChange={(e) => setSelectedMapType(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-emerald-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
              >
                {mapTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
              <Hash size={14}/> শীট নং
            </label>
            <div className="relative">
              <select 
                value={selectedSheet}
                onChange={(e) => setSelectedSheet(e.target.value)}
                className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-emerald-500 outline-none transition-all appearance-none font-bold text-gray-700 shadow-sm"
              >
                {sheetNos.map(sheet => <option key={sheet} value={sheet}>{sheet}</option>)}
              </select>
              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={handleSearch}
            className="px-16 py-4 bg-emerald-600 text-white font-black rounded-[1.5rem] hover:bg-emerald-700 hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-emerald-200/50 flex items-center gap-3 text-lg"
          >
            ম্যাপ দেখুন <ArrowRight size={24} />
          </button>
          <button 
            onClick={handleOpenInNewTab}
            className="px-8 py-4 bg-white border-2 border-emerald-600 text-emerald-600 font-black rounded-[1.5rem] hover:bg-emerald-50 hover:-translate-y-1 active:scale-95 transition-all shadow-lg flex items-center gap-3 text-lg"
          >
            <ExternalLink size={24} /> নতুন ট্যাবে খুলুন
          </button>
        </div>
      </div>

      {/* Map Display Area */}
      {isMapLoaded ? (
        <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Interactive SVG Map */}
            <div className="flex-1 bg-white p-6 rounded-[3rem] border border-gray-100 shadow-lg relative overflow-hidden min-h-[500px] flex flex-col">
              <div className="flex items-center justify-between mb-6 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <MapIcon size={20} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-800 leading-none">মৌজা: {selectedMouza}</h4>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">JL No: ১২ | {selectedMapType} | {selectedSheet}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={searchDag}
                      onChange={(e) => setSearchDag(e.target.value)}
                      placeholder="দাগ নং খুঁজুন..."
                      className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-xs font-bold focus:bg-white focus:border-emerald-500 outline-none transition-all"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                  </div>
                </div>
              </div>

              <div className="flex-1 relative bg-slate-50 rounded-[2rem] border border-gray-100 overflow-hidden cursor-move">
                <svg 
                  ref={mapRef}
                  viewBox="0 0 600 400" 
                  className="w-full h-full transition-transform duration-300 ease-out"
                  style={{ transform: `scale(${zoom})` }}
                >
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  
                  {mockPlots.map((plot) => (
                    <g 
                      key={plot.id} 
                      onClick={() => handlePlotClick(plot)}
                      className="cursor-pointer group"
                    >
                      <path 
                        d={plot.path} 
                        className={`${plot.color} stroke-gray-400 stroke-1 group-hover:stroke-emerald-500 group-hover:stroke-2 transition-all ${selectedPlot?.id === plot.id ? 'stroke-emerald-600 stroke-2 fill-emerald-200' : ''}`}
                      />
                      <text 
                        x={parseInt(plot.path.split(' ')[1]) + 20} 
                        y={parseInt(plot.path.split(' ')[2]) + 30} 
                        className="text-[10px] font-black fill-gray-500 pointer-events-none select-none"
                      >
                        {plot.dagNo}
                      </text>
                    </g>
                  ))}
                </svg>

                {/* Map Controls Overlay */}
                <div className="absolute bottom-6 right-6 flex flex-col gap-2">
                  <button onClick={handleZoomIn} className="p-3 bg-white rounded-xl shadow-lg text-gray-800 hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-gray-100">
                    <ZoomIn size={20} />
                  </button>
                  <button onClick={handleZoomOut} className="p-3 bg-white rounded-xl shadow-lg text-gray-800 hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-gray-100">
                    <ZoomOut size={20} />
                  </button>
                  <button className="p-3 bg-white rounded-xl shadow-lg text-gray-800 hover:bg-emerald-50 hover:text-emerald-600 transition-all border border-gray-100">
                    <Maximize2 size={20} />
                  </button>
                </div>
              </div>
            </div>

            {/* Plot Details Panel */}
            <div className="w-full lg:w-80 space-y-6">
              {selectedPlot ? (
                <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-lg animate-in slide-in-from-right duration-500 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xl font-black text-gray-800">দাগের তথ্য</h3>
                    <button 
                      onClick={() => setSelectedPlot(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="space-y-6 flex-1">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                        <Hash size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">দাগ নম্বর</p>
                        <p className="text-lg font-black text-gray-800">{selectedPlot.dagNo}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                        <User size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">মালিকের নাম</p>
                        <p className="text-lg font-black text-gray-800">{selectedPlot.owner}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner">
                        <Ruler size={24} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">জমির পরিমাণ</p>
                        <p className="text-lg font-black text-gray-800">{selectedPlot.area}</p>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 mt-8">
                      <div className="flex items-center gap-2 text-emerald-600 mb-2">
                        <Info size={16} />
                        <span className="text-xs font-black uppercase tracking-widest">স্ট্যাটাস</span>
                      </div>
                      <p className="text-xs font-bold text-gray-500 leading-relaxed">
                        এই দাগটি বর্তমানে আরএস (RS) রেকর্ড অনুযায়ী ভেরিফাইড অবস্থায় আছে। কোনো বিরোধ নেই।
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mt-8">
                    <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                      <Download size={18} /> পর্চা ডাউনলোড
                    </button>
                    <button className="w-full py-4 bg-white border-2 border-emerald-600 text-emerald-600 rounded-2xl font-black hover:bg-emerald-50 transition-all">
                      নামজারি আবেদন
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-lg h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 shadow-inner">
                    <Info size={40} />
                  </div>
                  <h4 className="text-lg font-black text-gray-800">দাগ নির্বাচন করুন</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed">
                    ম্যাপের উপর যেকোনো দাগে ক্লিক করে সেই দাগের মালিকানা ও পরিমাপ সংক্রান্ত তথ্য বিস্তারিত দেখুন।
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'লেয়ার পরিবর্তন', desc: 'RS, BRS, CS এবং স্যাটেলাইট ভিউ এর মধ্যে পরিবর্তন করুন।', icon: Layers },
              { title: 'সীমানা পরিমাপ', desc: 'ডিজিটাল স্কেল ব্যবহার করে জমির সীমানা মেপে দেখুন।', icon: Ruler },
              { title: 'শেয়ার ম্যাপ', desc: 'ম্যাপের নির্দিষ্ট অংশ অন্যদের সাথে শেয়ার করুন।', icon: Share2 }
            ].map((feat, i) => (
              <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-4 hover:shadow-md transition-all">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <feat.icon size={28} />
                </div>
                <h4 className="text-lg font-black text-gray-800">{feat.title}</h4>
                <p className="text-xs text-gray-500 font-medium leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-white p-20 rounded-[3rem] border border-gray-100 text-center space-y-6">
          <div className="w-24 h-24 bg-gray-50 rounded-[2rem] flex items-center justify-center mx-auto text-gray-300 shadow-inner">
            <MapIcon size={48} />
          </div>
          <div className="space-y-2">
            <h4 className="text-2xl font-black text-gray-800">ম্যাপ লোড করতে অনুসন্ধান করুন</h4>
            <p className="text-gray-500 font-medium max-w-sm mx-auto">বিভাগ, জেলা ও মৌজা নির্বাচন করে "ম্যাপ দেখুন" বাটনে ক্লিক করুন।</p>
          </div>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-400 font-bold uppercase tracking-widest">
            <div className="flex items-center gap-2"><Info size={14}/> RS Map</div>
            <div className="flex items-center gap-2"><Info size={14}/> BRS Map</div>
            <div className="flex items-center gap-2"><Info size={14}/> CS Map</div>
            <div className="flex items-center gap-2"><Info size={14}/> SA Map</div>
            <div className="flex items-center gap-2"><Info size={14}/> City Survey</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MouzaMap;
