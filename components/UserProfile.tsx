
import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Shield, 
  Bell, 
  Globe, 
  Save, 
  Settings,
  CheckCircle2,
  Lock,
  CreditCard,
  History,
  ChevronRight,
  LogOut
} from 'lucide-react';

interface UserProfileProps {
  user: { name: string; photo: string | null };
  onLogout?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const [profile, setProfile] = useState({
    name: user.name,
    email: 'mujibur.mintu@example.com',
    phone: '০১৭০০-০০০০০০',
    nid: '১২৩৪৫৬৭৮৯০',
    address: 'বাড়ি নং-১২, রোড নং-৫, ধানমন্ডি, ঢাকা',
    language: 'বাংলা',
    notifications: true,
    twoFactor: false
  });

  const handleSave = () => {
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header Profile Card */}
      <div className="bg-white rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden relative">
        <div className="h-40 bg-gradient-to-r from-emerald-600 to-teal-700 relative">
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
        <div className="px-10 pb-10 relative">
          <div className="flex flex-col md:flex-row items-end gap-6 -mt-16">
            <div className="relative group">
              <div className="w-32 h-32 rounded-[2.5rem] bg-white p-2 shadow-2xl ring-4 ring-white">
                <div className="w-full h-full rounded-[2rem] bg-emerald-100 flex items-center justify-center text-emerald-700 overflow-hidden">
                  {user.photo ? (
                    <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={64} />
                  )}
                </div>
              </div>
              <button className="absolute bottom-2 right-2 p-2 bg-emerald-600 text-white rounded-xl shadow-lg hover:bg-emerald-700 transition-all group-hover:scale-110">
                <Camera size={16} />
              </button>
            </div>
            <div className="flex-1 text-center md:text-left pt-4">
              <h2 className="text-3xl font-black text-gray-800 tracking-tight">{profile.name}</h2>
              <p className="text-gray-500 font-bold flex items-center justify-center md:justify-start gap-2 mt-1">
                <Shield size={14} className="text-emerald-500" /> ভেরিফাইড নাগরিক
              </p>
            </div>
            <div className="flex gap-3">
              {isEditing ? (
                <button 
                  onClick={handleSave}
                  className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2"
                >
                  <Save size={18} /> সংরক্ষণ করুন
                </button>
              ) : (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-3 bg-white text-gray-700 border border-gray-200 rounded-2xl font-black text-sm shadow-sm hover:bg-gray-50 transition-all"
                >
                  প্রোফাইল এডিট করুন
                </button>
              )}
            </div>
          </div>
        </div>
        
        {showSuccess && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-500">
            <CheckCircle2 size={20} />
            <span className="font-black text-sm">প্রোফাইল সফলভাবে আপডেট করা হয়েছে!</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Personal Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-8">
            <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
              <User size={28} className="text-emerald-600" /> ব্যক্তিগত তথ্য
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">পূর্ণ নাম</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    disabled={!isEditing}
                    value={profile.name}
                    onChange={(e) => setProfile({...profile, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-700 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none disabled:opacity-70"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">ইমেইল ঠিকানা</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="email" 
                    disabled={!isEditing}
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-700 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none disabled:opacity-70"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মোবাইল নম্বর</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    disabled={!isEditing}
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-700 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none disabled:opacity-70"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">এনআইডি নম্বর (NID)</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    disabled
                    value={profile.nid}
                    className="w-full pl-12 pr-4 py-4 bg-gray-100 border border-gray-200 rounded-2xl font-bold text-gray-500 outline-none"
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">বর্তমান ঠিকানা</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 text-gray-400" size={18} />
                  <textarea 
                    disabled={!isEditing}
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    rows={3}
                    className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl font-bold text-gray-700 focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 transition-all outline-none disabled:opacity-70 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security & Preferences */}
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-8">
            <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
              <Settings size={28} className="text-blue-600" /> সেটিংস ও পছন্দসমূহ
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Bell size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-800">নোটিফিকেশন</h4>
                    <p className="text-xs text-gray-500 font-bold">এসএমএস ও ইমেইল নোটিফিকেশন চালু রাখুন</p>
                  </div>
                </div>
                <button 
                  onClick={() => setProfile({...profile, notifications: !profile.notifications})}
                  className={`w-14 h-8 rounded-full transition-all relative ${profile.notifications ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${profile.notifications ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                    <Globe size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-800">ভাষা (Language)</h4>
                    <p className="text-xs text-gray-500 font-bold">আপনার পছন্দের ভাষা নির্বাচন করুন</p>
                  </div>
                </div>
                <select 
                  value={profile.language}
                  onChange={(e) => setProfile({...profile, language: e.target.value})}
                  className="bg-white border border-gray-200 rounded-xl px-4 py-2 font-bold text-sm outline-none focus:ring-2 focus:ring-indigo-100"
                >
                  <option value="বাংলা">বাংলা</option>
                  <option value="English">English</option>
                </select>
              </div>

              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center">
                    <Lock size={24} />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-800">টু-ফ্যাক্টর অথেনটিকেশন</h4>
                    <p className="text-xs text-gray-500 font-bold">অ্যাকাউন্টের বাড়তি নিরাপত্তা নিশ্চিত করুন</p>
                  </div>
                </div>
                <button 
                  onClick={() => setProfile({...profile, twoFactor: !profile.twoFactor})}
                  className={`w-14 h-8 rounded-full transition-all relative ${profile.twoFactor ? 'bg-emerald-500' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${profile.twoFactor ? 'left-7' : 'left-1'}`} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Stats & Actions */}
        <div className="space-y-8">
          <div className="bg-gray-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10 space-y-6">
              <h4 className="text-xl font-black text-emerald-400">অ্যাক্টিভিটি সামারি</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-gray-400 font-bold text-sm">মোট আবেদন</span>
                  <span className="text-2xl font-black">১২ টি</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-gray-400 font-bold text-sm">সফল নামজারি</span>
                  <span className="text-2xl font-black text-emerald-400">০৫ টি</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-bold text-sm">পেন্ডিং মামলা</span>
                  <span className="text-2xl font-black text-amber-400">০২ টি</span>
                </div>
              </div>
              <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg flex items-center justify-center gap-2">
                বিস্তারিত ইতিহাস দেখুন <History size={18} />
              </button>
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-600/20 rounded-full blur-3xl" />
          </div>

          <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm space-y-6">
            <h4 className="text-lg font-black text-gray-800 flex items-center gap-2">
              <CreditCard size={20} className="text-blue-500" /> পেমেন্ট মেথড
            </h4>
            <div className="space-y-3">
              <div className="p-4 bg-rose-50 rounded-2xl border border-rose-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#ed1c24] rounded-xl flex items-center justify-center font-black text-white shadow-sm">
                    Ng
                  </div>
                  <span className="text-sm font-bold text-rose-900">নগদ (Nagad)</span>
                </div>
                <CheckCircle2 size={18} className="text-emerald-500" />
              </div>
              <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 font-bold text-sm hover:border-blue-300 hover:text-blue-500 transition-all">
                + নতুন মেথড যোগ করুন
              </button>
            </div>
          </div>

          <div className="bg-rose-50 p-8 rounded-[3rem] border border-rose-100 space-y-6">
            <h4 className="text-lg font-black text-rose-800 flex items-center gap-2">
              <Shield size={20} /> অ্যাকাউন্ট সিকিউরিটি
            </h4>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all group">
                <span className="text-sm font-bold text-gray-700">পাসওয়ার্ড পরিবর্তন করুন</span>
                <ChevronRight size={18} className="text-gray-300 group-hover:text-rose-500 transition-colors" />
              </button>
              <button 
                onClick={onLogout}
                className="w-full flex items-center justify-between p-4 bg-rose-600 text-white rounded-2xl shadow-lg hover:bg-rose-700 transition-all group"
              >
                <span className="text-sm font-black">লগআউট করুন</span>
                <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
