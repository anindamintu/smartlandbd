
import React, { useState, useCallback } from 'react';
import { 
  FileCheck, 
  Upload, 
  ShieldCheck, 
  AlertCircle, 
  Search, 
  FileText, 
  Building2, 
  Calendar, 
  Hash, 
  User, 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  Info,
  X,
  Scan,
  ShieldAlert,
  ChevronDown,
  Download
} from 'lucide-react';

interface DeedDetails {
  deedNumber: string;
  deedDate: string;
  officeName: string;
  district: string;
  subRegistrarOffice: string;
  buyerName: string;
  sellerName: string;
}

const DeedVerification: React.FC = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [activeMethod, setActiveMethod] = useState<'upload' | 'details'>('upload');
  
  const [details, setDetails] = useState<DeedDetails>({
    deedNumber: '',
    deedDate: '',
    officeName: '',
    district: '',
    subRegistrarOffice: '',
    buyerName: '',
    sellerName: ''
  });

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      simulateUpload();
    }
  }, []);

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleVerify = () => {
    setVerificationStatus('verifying');
    // Simulate API call
    setTimeout(() => {
      setVerificationStatus('success');
    }, 3000);
  };

  const reset = () => {
    setUploadedFile(null);
    setVerificationStatus('idle');
    setUploadProgress(0);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-64 rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=2070&auto=format&fit=crop" 
          alt="Deed Verification" 
          className="w-full h-full object-cover brightness-[0.3]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-emerald-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
            <ShieldCheck size={16} className="text-emerald-300" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">নিরাপদ ভূমি সেবা</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">দলীল ভেরিফিকেশন ও সত্যতা যাচাই</h2>
          <p className="text-emerald-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90">
            আপনার দলীলের তথ্য প্রদান করুন অথবা দলীলের কপি আপলোড করে এর সত্যতা নিশ্চিত করুন।
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Verification Methods */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex border-b border-gray-100">
              <button 
                onClick={() => setActiveMethod('upload')}
                className={`flex-1 py-6 font-black text-sm transition-all relative ${activeMethod === 'upload' ? 'text-emerald-600 bg-white' : 'text-gray-400 bg-gray-50/50 hover:text-gray-600'}`}
              >
                <div className="flex items-center justify-center gap-3">
                  <Upload size={18} />
                  দলীল আপলোড করুন
                </div>
                {activeMethod === 'upload' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600" />}
              </button>
              <button 
                onClick={() => setActiveMethod('details')}
                className={`flex-1 py-6 font-black text-sm transition-all relative ${activeMethod === 'details' ? 'text-emerald-600 bg-white' : 'text-gray-400 bg-gray-50/50 hover:text-gray-600'}`}
              >
                <div className="flex items-center justify-center gap-3">
                  <FileText size={18} />
                  তথ্য প্রদান করুন
                </div>
                {activeMethod === 'details' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-emerald-600" />}
              </button>
            </div>

            <div className="p-10">
              {activeMethod === 'upload' ? (
                <div className="space-y-8">
                  {!uploadedFile ? (
                    <div className="border-4 border-dashed border-gray-100 rounded-[2.5rem] p-16 text-center hover:border-emerald-200 transition-all group relative cursor-pointer">
                      <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        onChange={handleFileUpload}
                        accept="image/*,.pdf"
                      />
                      <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-inner">
                        <Upload size={32} />
                      </div>
                      <h4 className="text-xl font-black text-gray-800 mb-2">দলীল বা নথির ছবি এখানে রাখুন</h4>
                      <p className="text-gray-400 font-bold text-sm">JPG, PNG অথবা PDF ফরম্যাটে আপলোড করুন (সর্বোচ্চ ১০ এমবি)</p>
                    </div>
                  ) : (
                    <div className="bg-gray-50 rounded-[2.5rem] p-8 border border-gray-100">
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                            <FileText size={24} />
                          </div>
                          <div>
                            <p className="font-black text-gray-800">{uploadedFile.name}</p>
                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                        </div>
                        <button onClick={reset} className="p-2 text-gray-400 hover:text-rose-500 transition-colors">
                          <X size={24} />
                        </button>
                      </div>
                      
                      {isUploading ? (
                        <div className="space-y-3">
                          <div className="flex justify-between text-xs font-black text-emerald-600 uppercase tracking-widest">
                            <span>আপলোড হচ্ছে...</span>
                            <span>{uploadProgress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-emerald-600 transition-all duration-300" 
                              style={{ width: `${uploadProgress}%` }}
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 text-emerald-600 font-black text-sm">
                          <CheckCircle2 size={18} /> ফাইল সফলভাবে আপলোড হয়েছে
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-4 p-6 bg-amber-50 rounded-2xl border border-amber-100">
                    <Info className="text-amber-600 shrink-0" size={24} />
                    <p className="text-xs font-bold text-amber-800 leading-relaxed">
                      দ্রষ্টব্য: আপলোডকৃত দলীলের তথ্য এআই প্রযুক্তির মাধ্যমে স্বয়ংক্রিয়ভাবে বিশ্লেষণ করা হবে। সঠিক ফলাফলের জন্য দলীলের স্পষ্ট ছবি বা স্ক্যান কপি ব্যবহার করুন।
                    </p>
                  </div>

                  <button 
                    disabled={!uploadedFile || isUploading || verificationStatus === 'verifying'}
                    onClick={handleVerify}
                    className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {verificationStatus === 'verifying' ? (
                      <>
                        <Loader2 className="animate-spin" size={24} /> যাচাই করা হচ্ছে...
                      </>
                    ) : (
                      <>
                        <Scan size={24} /> ভেরিফিকেশন শুরু করুন
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">দলীল নম্বর</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="উদা: ১২৩৪৫/২৪"
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                          value={details.deedNumber}
                          onChange={(e) => setDetails({...details, deedNumber: e.target.value})}
                        />
                        <Hash className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">রেজিস্ট্রেশন তারিখ</label>
                      <div className="relative">
                        <input 
                          type="date" 
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                          value={details.deedDate}
                          onChange={(e) => setDetails({...details, deedDate: e.target.value})}
                        />
                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">জেলা</label>
                      <div className="relative">
                        <select 
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm appearance-none"
                          value={details.district}
                          onChange={(e) => setDetails({...details, district: e.target.value})}
                        >
                          <option value="">জেলা নির্বাচন করুন</option>
                          <option value="Dhaka">ঢাকা</option>
                          <option value="Chattogram">চট্টগ্রাম</option>
                          <option value="Rajshahi">রাজশাহী</option>
                        </select>
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">সাব-রেজিস্ট্রি অফিস</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="অফিসের নাম লিখুন"
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                          value={details.subRegistrarOffice}
                          onChange={(e) => setDetails({...details, subRegistrarOffice: e.target.value})}
                        />
                        <Building2 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">দাতার নাম (Seller)</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="দাতার নাম"
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                          value={details.sellerName}
                          onChange={(e) => setDetails({...details, sellerName: e.target.value})}
                        />
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">গ্রহীতার নাম (Buyer)</label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="গ্রহীতার নাম"
                          className="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                          value={details.buyerName}
                          onChange={(e) => setDetails({...details, buyerName: e.target.value})}
                        />
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleVerify}
                    disabled={verificationStatus === 'verifying'}
                    className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3"
                  >
                    {verificationStatus === 'verifying' ? (
                      <>
                        <Loader2 className="animate-spin" size={24} /> যাচাই করা হচ্ছে...
                      </>
                    ) : (
                      <>
                        <Search size={24} /> তথ্য যাচাই করুন
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Verification Result */}
          {verificationStatus === 'success' && (
            <div className="bg-white rounded-[3rem] shadow-xl border border-emerald-100 overflow-hidden animate-in zoom-in duration-500">
              <div className="bg-emerald-600 p-8 text-white flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-[1.5rem] flex items-center justify-center">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black">দলীলটি বৈধ ও সঠিক</h3>
                    <p className="text-emerald-100 font-bold opacity-80">সরকারি ডাটাবেজের সাথে তথ্যের মিল পাওয়া গেছে।</p>
                  </div>
                </div>
                <div className="text-right hidden md:block">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-60">ভেরিফিকেশন আইডি</p>
                  <p className="font-mono font-black text-lg">DV-2024-88921</p>
                </div>
              </div>
              <div className="p-10 grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-6">
                  <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-2">দলীলের তথ্য</h4>
                  <div className="grid grid-cols-2 gap-y-4">
                    <p className="text-xs font-black text-gray-500 uppercase">দলীল নম্বর</p>
                    <p className="text-sm font-bold text-gray-800">১২৩৪৫/২৪</p>
                    <p className="text-xs font-black text-gray-500 uppercase">রেজিস্ট্রেশন তারিখ</p>
                    <p className="text-sm font-bold text-gray-800">১৫ মার্চ, ২০২৪</p>
                    <p className="text-xs font-black text-gray-500 uppercase">সাব-রেজিস্ট্রি অফিস</p>
                    <p className="text-sm font-bold text-gray-800">সাভার, ঢাকা</p>
                    <p className="text-xs font-black text-gray-500 uppercase">জমির পরিমাণ</p>
                    <p className="text-sm font-bold text-gray-800">১০.৫০ শতাংশ</p>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="text-sm font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-100 pb-2">মালিকানা তথ্য</h4>
                  <div className="grid grid-cols-2 gap-y-4">
                    <p className="text-xs font-black text-gray-500 uppercase">দাতার নাম</p>
                    <p className="text-sm font-bold text-gray-800">আব্দুর রহিম</p>
                    <p className="text-xs font-black text-gray-500 uppercase">গ্রহীতার নাম</p>
                    <p className="text-sm font-bold text-gray-800">মজিবুর রহমান</p>
                    <p className="text-xs font-black text-gray-500 uppercase">দাগ নম্বর</p>
                    <p className="text-sm font-bold text-gray-800">১০১, ১০২ (সাভার মৌজা)</p>
                    <p className="text-xs font-black text-gray-500 uppercase">খতিয়ান নম্বর</p>
                    <p className="text-sm font-bold text-gray-800">এসএ-৪৫৬</p>
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3 text-xs font-bold text-gray-500">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  এই রিপোর্টটি ডিজিটালভাবে স্বাক্ষরিত এবং আইনগতভাবে গ্রহণযোগ্য।
                </div>
                <button className="px-8 py-3 bg-white text-emerald-600 border border-emerald-100 rounded-xl font-black text-sm shadow-sm hover:bg-emerald-50 transition-all flex items-center gap-2">
                  <Download size={18} /> রিপোর্ট ডাউনলোড করুন
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Info & Tips */}
        <div className="space-y-8">
          <div className="bg-gray-900 rounded-[3rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <h3 className="text-xl font-black flex items-center gap-3">
                <ShieldAlert size={24} className="text-amber-400" /> কেন যাচাই করবেন?
              </h3>
              <p className="text-gray-400 text-sm font-medium leading-relaxed">
                জমি কেনার আগে দলীলের সত্যতা যাচাই করা অত্যন্ত জরুরি। জাল দলীল বা ভুল তথ্য আপনার বড় ধরনের আর্থিক ক্ষতির কারণ হতে পারে।
              </p>
              <ul className="space-y-4">
                {[
                  'জাল দলীল শনাক্তকরণ',
                  'মালিকানার সঠিকতা নিশ্চিতকরণ',
                  'জমির দাগ ও খতিয়ান যাচাই',
                  'আইনি জটিলতা এড়ানো'
                ].map((tip, i) => (
                  <li key={i} className="flex items-center gap-3 text-xs font-bold text-emerald-100/80">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-600/20 rounded-full blur-3xl -mr-16 -mt-16" />
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm space-y-6">
            <h3 className="text-lg font-black text-gray-800 flex items-center gap-3">
              <Info size={20} className="text-emerald-600" /> সচরাচর জিজ্ঞাসা
            </h3>
            <div className="space-y-4">
              {[
                { q: 'ভেরিফিকেশন কতক্ষণ সময় নেয়?', a: 'সাধারণত ৩-৫ মিনিটের মধ্যে ফলাফল পাওয়া যায়।' },
                { q: 'সব দলীল কি যাচাই করা সম্ভব?', a: 'ডিজিটাল রেকর্ডভুক্ত সকল দলীল যাচাই করা সম্ভব।' },
                { q: 'ভেরিফিকেশন কি ফ্রি?', a: 'হ্যাঁ, এটি একটি সরকারি নাগরিক সেবা।' }
              ].map((faq, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-xs font-black text-gray-800">{faq.q}</p>
                  <p className="text-[11px] font-medium text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 bg-emerald-50 rounded-[2.5rem] border border-emerald-100 text-center space-y-4">
            <div className="w-12 h-12 bg-white text-emerald-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm">
              <Scan size={24} />
            </div>
            <h4 className="font-black text-emerald-900">কিউআর কোড স্ক্যান</h4>
            <p className="text-[11px] font-bold text-emerald-700/70 leading-relaxed">
              আপনার দলীলে কিউআর কোড থাকলে সরাসরি স্ক্যান করে ভেরিফিকেশন করতে পারেন।
            </p>
            <button className="w-full py-3 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-md">
              ক্যামেরা ওপেন করুন
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeedVerification;
