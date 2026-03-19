
import React, { useState, useEffect, useRef } from 'react';
import { Lock, User, Smartphone, Key, ArrowRight, ShieldCheck, Mail, CheckCircle2, ChevronLeft, Loader2, Sparkles, Fingerprint, AlertCircle, PhoneCall, HelpCircle, Clock, Eye, EyeOff, Contact, ImageIcon, FileDigit, Trash2, Mic, MicOff, MessageSquareText, Zap, ShieldAlert, RefreshCw } from 'lucide-react';
import { verifyNID } from '../services/geminiService';

interface UserData {
  name: string;
  photo: string | null;
}

interface AuthProps {
  onLoginSuccess: (userData: UserData) => void;
}

type AuthView = 'login' | 'signup' | 'otp' | 'forgot-password';

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [view, setView] = useState<AuthView>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [showTroubleshooting, setShowTroubleshooting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [nidFile, setNidFile] = useState<string | null>(null);
  const [userPhoto, setUserPhoto] = useState<string | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verifying' | 'success' | 'error'>('idle');
  const [verificationMessage, setVerificationMessage] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const recognitionRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const otpInputsRef = useRef<(HTMLInputElement | null)[]>([]);
  
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    phone: '',
    nidName: '',
    nidNumber: '',
    rememberMe: false,
  });

  // Voice Input Setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'bn-BD';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        const cleaned = transcript.replace(/[^0-9০-৯]/g, '');
        if (cleaned) {
          setFormData(prev => ({ ...prev, phone: cleaned }));
        }
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => setIsListening(false);
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert("আপনার ব্রাউজার ভয়েস ইনপুট সাপোর্ট করে না।");
      return;
    }
    if (isListening) recognitionRef.current.stop();
    else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) { console.error(e); }
    }
  };

  // OTP Countdown
  useEffect(() => {
    let timer: any;
    if (view === 'otp' && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [view, countdown]);

  const handleOtpChange = (value: string, index: number) => {
    if (value.length > 1) value = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpInputsRef.current[index - 1]?.focus();
    }
  };

  const performNidVerification = async () => {
    if (!nidFile) {
      setVerificationStatus('error');
      setVerificationMessage('এনআইডি কার্ডের ছবি আপলোড করা বাধ্যতামূলক।');
      return false;
    }
    
    setVerificationStatus('verifying');
    setVerificationMessage('আপনার এনআইডি তথ্য যাচাই করা হচ্ছে...');
    
    try {
      const result = await verifyNID(formData.nidName, formData.nidNumber, nidFile);
      
      if (result.verified) {
        setVerificationStatus('success');
        setVerificationMessage(result.message || 'এনআইডি সফলভাবে যাচাই করা হয়েছে।');
        return true;
      } else {
        setVerificationStatus('error');
        setVerificationMessage(result.message || 'এনআইডি যাচাইকরণ ব্যর্থ হয়েছে। সঠিক তথ্য প্রদান করুন।');
        return false;
      }
    } catch (error) {
      setVerificationStatus('error');
      setVerificationMessage('সার্ভারে সমস্যা হচ্ছে। আবার চেষ্টা করুন।');
      return false;
    }
  };

  const handleAction = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (view === 'signup') {
      const isVerified = await performNidVerification();
      if (!isVerified) return;
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    if (view === 'login' || view === 'signup' || view === 'forgot-password') {
      setView('otp');
      setOtpSent(true);
      setCountdown(60);
      setOtp(['', '', '', '', '', '']);
      setShowTroubleshooting(false);
      setVerificationStatus('idle');
    } else if (view === 'otp') {
      onLoginSuccess({
        name: formData.nidName || formData.userId || 'মজিবুর রহমান মিন্টু',
        photo: userPhoto
      });
    }
    setIsLoading(false);
  };

  const handleQuickDemo = () => {
    setIsLoading(true);
    setTimeout(() => {
      onLoginSuccess({
        name: 'মজিবুর রহমান মিন্টু',
        photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop'
      });
    }, 800);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setNidFile(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUserPhoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleResendOtp = () => {
    if (countdown === 0) {
      setCountdown(60);
      setOtp(['', '', '', '', '', '']);
    }
  };

  return (
    <div className="h-screen w-full bg-[#f8fafc] overflow-y-auto custom-scrollbar flex items-start justify-center p-4 md:p-8">
      <div className="max-w-[480px] w-full animate-in fade-in zoom-in duration-500 py-8">
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-emerald-600 rounded-[2rem] flex items-center justify-center shadow-xl shadow-emerald-200 mb-4 ring-8 ring-emerald-50">
            <ShieldCheck size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-black text-gray-800 tracking-tight text-center">বাংলাদেশ ডিজিটাল ভূমিসেবা</h1>
          <p className="text-emerald-600 font-bold text-sm mt-1 text-center">সবার আগে বাংলাদেশ - সবার জন্য ভূমি সেবা</p>
          <div className="flex items-center gap-2 mt-3 px-3 py-1 bg-emerald-100 rounded-full">
            <Sparkles size={12} className="text-emerald-600" />
            <span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">স্মার্ট বাংলাদেশ ২০৪১</span>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 border border-gray-100 p-8 md:p-10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-50 rounded-full blur-3xl opacity-50" />
          
          <div className="relative z-10">
            {view !== 'login' && view !== 'signup' && (
              <button 
                onClick={() => setView('login')}
                className="mb-6 flex items-center gap-2 text-emerald-600 font-bold text-sm hover:gap-3 transition-all"
              >
                <ChevronLeft size={18} /> ফিরে যান
              </button>
            )}

            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-800 mb-2">
                {view === 'login' ? 'লগইন করুন' : 
                 view === 'signup' ? 'নতুন অ্যাকাউন্ট তৈরি' : 
                 view === 'otp' ? 'মোবাইল ভেরিফিকেশন' : 'পাসওয়ার্ড পুনরুদ্ধার'}
              </h2>
              <p className="text-gray-500 font-medium text-sm">
                {view === 'login' ? 'আপনার ভূমি সেবা অ্যাকাউন্টে প্রবেশ করুন' : 
                 view === 'signup' ? 'স্মার্ট ভূমি সেবার সুবিধা পেতে নিবন্ধন করুন' : 
                 view === 'otp' ? 'যেকোনো ৬টি সংখ্যা দিন (যেমন: ১২৩৪৫৬)' : 
                 'পাসওয়ার্ড ভুলে গেছেন? মোবাইল নম্বর দিন এবং ওটিপি কোড সংগ্রহ করুন'}
              </p>
            </div>

            <form onSubmit={handleAction} className="space-y-5">
              {view === 'login' && (
                <>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Username / Mobile (ইউজার আইডি)</label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><User size={20} /></div>
                      <input 
                        type="text" required placeholder="Enter your username"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700"
                        value={formData.userId}
                        onChange={(e) => setFormData({...formData, userId: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Password (পাসওয়ার্ড)</label>
                      <button type="button" onClick={() => setView('forgot-password')} className="text-[11px] font-black text-emerald-600 hover:underline">Forgot Password?</button>
                    </div>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Lock size={20} /></div>
                      <input 
                        type={showPassword ? "text" : "password"} required placeholder="••••••••"
                        className="w-full pl-12 pr-12 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700"
                        value={formData.password}
                        onChange={(e) => setFormData({...formData, password: e.target.value})}
                      />
                      <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-emerald-600 transition-colors">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-1 py-1">
                    <div className="relative flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        id="rememberMe"
                        className="w-5 h-5 text-emerald-600 border-2 border-gray-200 rounded-lg focus:ring-emerald-500 cursor-pointer transition-all checked:bg-emerald-600"
                        checked={formData.rememberMe}
                        onChange={(e) => setFormData({...formData, rememberMe: e.target.checked})}
                      />
                    </div>
                    <label htmlFor="rememberMe" className="text-xs font-bold text-gray-600 cursor-pointer select-none hover:text-emerald-700 transition-colors">
                      লগইন তথ্য মনে রাখুন (Remember Me)
                    </label>
                  </div>
                </>
              )}

              {view === 'signup' && (
                <>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">আপনার ছবি (Profile Photo) <span className="text-red-500">*</span></label>
                    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-emerald-400 transition-all">
                      <div 
                        onClick={() => photoInputRef.current?.click()}
                        className="w-20 h-20 bg-white rounded-2xl border-2 border-gray-100 flex items-center justify-center overflow-hidden cursor-pointer group relative"
                      >
                        <input type="file" ref={photoInputRef} className="hidden" accept="image/*" onChange={handlePhotoChange} />
                        {userPhoto ? (
                          <img src={userPhoto} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={32} className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
                        )}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Zap size={16} className="text-white" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-700 mb-1">প্রোফাইল ছবি আপলোড করুন</p>
                        <p className="text-[10px] text-gray-400 font-medium">পাসপোর্ট সাইজ বা পরিষ্কার ছবি দিন</p>
                        <button 
                          type="button"
                          onClick={() => photoInputRef.current?.click()}
                          className="mt-2 text-[10px] font-black text-emerald-600 uppercase tracking-widest hover:underline"
                        >
                          ছবি সিলেক্ট করুন
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">জাতীয় পরিচয়পত্র অনুযায়ী নাম <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Contact size={20} /></div>
                      <input 
                        type="text" required placeholder="এনআইডি কার্ডের হুবুহু নাম"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700"
                        value={formData.nidName}
                        onChange={(e) => setFormData({...formData, nidName: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">এনআইডি নম্বর <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><FileDigit size={20} /></div>
                      <input 
                        type="text" required placeholder="১০ বা ১৭ ডিজিটের নম্বর"
                        className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700"
                        value={formData.nidNumber}
                        onChange={(e) => setFormData({...formData, nidNumber: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">মোবাইল নম্বর <span className="text-red-500">*</span></label>
                    <div className="relative flex gap-2">
                      <div className="relative flex-1">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"><Smartphone size={20} /></div>
                        <input 
                          type="tel" required placeholder="০১৮XXXXXXXX"
                          className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700"
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                      <button type="button" onClick={toggleVoiceInput} className={`p-4 rounded-2xl transition-all shadow-md flex items-center justify-center shrink-0 ${isListening ? 'bg-red-50 text-red-600 mic-active' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                        {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">জাতীয় পরিচয়পত্র (NID) সংযুক্ত করুন <span className="text-red-500">*</span></label>
                    <div onClick={() => fileInputRef.current?.click()} className={`relative w-full p-4 bg-gray-50 border-2 border-dashed rounded-2xl transition-all cursor-pointer flex flex-col items-center justify-center gap-2 group ${nidFile ? 'border-emerald-500 bg-emerald-50/30' : 'border-gray-200 hover:border-emerald-400 hover:bg-emerald-50/10'}`}>
                      <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
                      {nidFile ? (
                        <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-sm">
                          <img src={nidFile} alt="NID Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button type="button" onClick={(e) => { e.stopPropagation(); setNidFile(null); }} className="p-2 bg-red-500 text-white rounded-full shadow-lg"><Trash2 size={20} /></button>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="p-3 bg-white rounded-xl shadow-sm text-gray-400 group-hover:text-emerald-600 transition-colors"><ImageIcon size={32} /></div>
                          <p className="text-sm font-bold text-gray-500 group-hover:text-emerald-700">এনআইডি কার্ডের ছবি সিলেক্ট করুন</p>
                        </>
                      )}
                    </div>
                  </div>

                  {verificationStatus !== 'idle' && (
                    <div className={`p-4 rounded-2xl border flex flex-col gap-3 animate-in slide-in-from-top-2 duration-300 ${
                      verificationStatus === 'verifying' ? 'bg-blue-50 border-blue-100 text-blue-700' :
                      verificationStatus === 'success' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' :
                      'bg-red-50 border-red-100 text-red-700'
                    }`}>
                      <div className="flex items-start gap-3">
                        {verificationStatus === 'verifying' ? <Loader2 className="animate-spin shrink-0" size={20} /> :
                         verificationStatus === 'success' ? <CheckCircle2 className="shrink-0" size={20} /> :
                         <ShieldAlert className="shrink-0" size={20} />}
                        <p className="text-xs font-bold leading-relaxed">{verificationMessage}</p>
                      </div>
                      
                      {verificationStatus === 'error' && (
                        <div className="flex gap-2 mt-1">
                          <button 
                            type="button"
                            onClick={() => performNidVerification()}
                            className="flex-1 py-2 bg-white border border-red-200 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-all flex items-center justify-center gap-1"
                          >
                            <RefreshCw size={12} /> পুনরায় চেষ্টা করুন
                          </button>
                          <button 
                            type="button"
                            onClick={() => {
                              setNidFile(null);
                              setVerificationStatus('idle');
                              fileInputRef.current?.click();
                            }}
                            className="flex-1 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-700 transition-all flex items-center justify-center gap-1"
                          >
                            <RefreshCw size={12} /> নতুন ছবি দিন
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}

              {view === 'otp' && (
                <div className="space-y-6">
                  <div className="flex justify-center gap-2">
                    {otp.map((digit, i) => (
                      <input 
                        key={i}
                        ref={el => { otpInputsRef.current[i] = el; }}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, i)}
                        onKeyDown={(e) => handleOtpKeyDown(e, i)}
                        className="w-10 h-12 bg-gray-50 border-2 border-transparent rounded-xl focus:bg-white focus:border-emerald-500 outline-none transition-all text-center font-black text-xl text-emerald-700 shadow-sm"
                        required
                        autoFocus={i === 0}
                      />
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-full border border-emerald-100 mb-4 animate-pulse">
                      <HelpCircle size={14} className="text-emerald-600" />
                      <span className="text-[11px] font-bold text-emerald-700">
                        সরাসরি প্রবেশের জন্য যেকোনো ৬টি সংখ্যা লিখুন
                      </span>
                    </div>
                    
                    <div>
                      <button 
                        type="button" onClick={handleResendOtp} disabled={countdown > 0}
                        className={`text-xs font-black uppercase tracking-wider transition-all ${countdown > 0 ? 'text-gray-300 cursor-not-allowed' : 'text-emerald-600 hover:text-emerald-700 hover:underline'}`}
                      >
                        আবার পাঠান
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <button 
                type="submit" disabled={isLoading || (view === 'otp' && otp.join('').length < 6)}
                className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 hover:-translate-y-1 active:scale-95 transition-all shadow-xl shadow-emerald-200 flex items-center justify-center gap-3 disabled:opacity-70 disabled:translate-y-0"
              >
                {isLoading ? <Loader2 className="animate-spin" size={24} /> : (
                  <>
                    {view === 'otp' ? 'Verify & Login' : (view === 'forgot-password' ? 'Send OTP' : 'Login')}
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            {(view === 'login' || view === 'signup') && (
              <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col items-center gap-4">
                <button 
                  onClick={handleQuickDemo}
                  className="w-full py-3.5 bg-white border-2 border-emerald-600 text-emerald-700 font-black rounded-2xl hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 group shadow-sm active:scale-95"
                >
                  <Zap size={18} className="text-emerald-600 group-hover:scale-125 transition-transform" /> সরাসরি প্রবেশ করুন (Demo Login)
                </button>

                <p className="text-sm text-gray-500 font-medium text-center">
                  {view === 'login' ? 'অ্যাকাউন্ট নেই?' : 'ইতিমধ্যে অ্যাকাউন্ট আছে?'}
                  <button onClick={() => { setView(view === 'login' ? 'signup' : 'login'); setNidFile(null); }} className="ml-2 text-emerald-600 font-black hover:underline">{view === 'login' ? 'নিবন্ধন করুন' : 'লগইন করুন'}</button>
                </p>
                <div className="flex flex-wrap justify-center gap-4 mt-2">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-orange-500"><Fingerprint size={14} /> বায়োমেট্রিক সাপোর্ট</div>
                  <div className="h-4 w-px bg-gray-200"></div>
                  <a href="tel:16122" className="flex items-center gap-2 text-[10px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-full hover:bg-red-100 transition-all border border-red-100">
                    <PhoneCall size={12} /> ১৬১২২ (হেল্পলাইন)
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="mt-8 text-center flex flex-col items-center gap-4">
           <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest">
             <a href="#" className="text-emerald-600 hover:text-emerald-700 transition-colors">সহায়তা</a>
             <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
             <a href="#" className="text-blue-600 hover:text-blue-700 transition-colors">ব্যবহারবিধি</a>
             <span className="w-1.5 h-1.5 bg-gray-200 rounded-full"></span>
             <a href="#" className="text-red-500 hover:text-red-600 transition-colors">নীতিমালা</a>
           </div>
           <div className="flex flex-col items-center gap-1">
             <p className="text-[10px] text-black font-black uppercase tracking-[0.2em]">Copyright © ANINDABANGLA • 2026 • Bangladesh Digital Bhumi Seva</p>
           </div>
        </footer>
      </div>
    </div>
  );
};

export default Auth;
