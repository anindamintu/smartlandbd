
import React, { useState, useMemo } from 'react';
import { MessageSquareText, Send, Paperclip, Info, CheckCircle2, AlertCircle, ArrowRight, User, Phone, Mail, MapPin, Gavel, Search, Clock, ShieldCheck, ClipboardList, History, ChevronRight, Loader2, Printer } from 'lucide-react';
import { Complaint } from '../types';
import { motion, AnimatePresence } from 'motion/react';

const mockComplaints: Complaint[] = [
  {
    id: '1',
    trackingId: 'CMP-2024-1024',
    name: 'আব্দুর রহিম',
    phone: '০১৭১১২২৩৩৪৪',
    location: 'সাভার, ঢাকা',
    description: 'জমির নামজারি করতে গিয়ে ঘুষ দাবি করা হয়েছে।',
    status: 'Processing',
    date: '২০২৪-০৩-০১',
    deadline: '২০২৪-০৩-১৫',
    updates: [
      { date: '২০২৪-০৩-০১', message: 'অভিযোগ গ্রহণ করা হয়েছে।', status: 'Submitted' },
      { date: '২০২৪-০৩-০৩', message: 'তদন্তকারী কর্মকর্তা নিয়োগ করা হয়েছে।', status: 'Under Review' },
      { date: '২০২৪-০৩-০৫', message: 'তদন্ত চলমান রয়েছে।', status: 'Processing' }
    ]
  },
  {
    id: '2',
    trackingId: 'CMP-2024-5567',
    name: 'করিম উদ্দিন',
    phone: '০১৮২২৩৩৪৪৫৫',
    location: 'মিরপুর, ঢাকা',
    description: 'আমার জমির সীমানা নিয়ে পাশের বাড়ির মালিকের সাথে বিরোধ।',
    status: 'Resolved',
    date: '২০২৪-০২-১৫',
    deadline: '২০২৪-০৩-০১',
    updates: [
      { date: '২০২৪-০২-১৫', message: 'অভিযোগ গ্রহণ করা হয়েছে।', status: 'Submitted' },
      { date: '২০২৪-০২-২০', message: 'উভয় পক্ষকে শুনানির জন্য ডাকা হয়েছে।', status: 'Processing' },
      { date: '২০২৪-০২-২৮', message: 'বিরোধ মীমাংসা করা হয়েছে এবং সীমানা নির্ধারণ করা হয়েছে।', status: 'Resolved' }
    ]
  }
];

interface ComplainModuleProps {
  onTabChange?: (tab: string) => void;
}

const ComplainModule: React.FC<ComplainModuleProps> = ({ onTabChange }) => {
  const [activeView, setActiveView] = useState<'form' | 'track' | 'success' | 'official'>('form');
  const [trackingId, setTrackingId] = useState('');
  const [searchResult, setSearchResult] = useState<Complaint | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [lastSubmittedId, setLastSubmittedId] = useState('');
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleUpdateStatus = (id: string, newStatus: string, message: string) => {
    setComplaints(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: newStatus as any,
          updates: [
            ...c.updates,
            { date: new Date().toISOString().split('T')[0], message, status: newStatus }
          ]
        };
      }
      return c;
    }));
  };

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `CMP-2024-${Math.floor(1000 + Math.random() * 9000)}`;
    const newComplaint: Complaint = {
      id: Date.now().toString(),
      trackingId: newId,
      name: formData.name,
      phone: formData.phone,
      location: formData.location,
      description: formData.description,
      status: 'Submitted',
      date: new Date().toISOString().split('T')[0],
      deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      updates: [
        { date: new Date().toISOString().split('T')[0], message: 'অভিযোগ সফলভাবে জমা হয়েছে।', status: 'Submitted' }
      ]
    };
    
    setComplaints([newComplaint, ...complaints]);
    setLastSubmittedId(newId);
    setActiveView('success');
    setFormData({ name: '', phone: '', location: '', description: '' });
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      const found = complaints.find(c => c.trackingId === trackingId);
      setSearchResult(found || null);
      setIsSearching(false);
      if (!found) {
        alert('দুঃখিত, এই ট্র্যাকিং আইডি দিয়ে কোনো অভিযোগ পাওয়া যায়নি।');
      }
    }, 1000);
  };

  if (activeView === 'success') {
    return (
      <div className="max-w-3xl mx-auto py-20 text-center space-y-8 animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl shadow-emerald-100">
          <CheckCircle2 size={48} />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-gray-800">অভিযোগ সফলভাবে জমা হয়েছে!</h2>
          <div className="bg-white p-8 rounded-3xl border border-emerald-100 shadow-sm inline-block">
            <p className="text-gray-500 font-medium mb-2">আপনার অভিযোগ ট্র্যাকিং আইডি:</p>
            <p className="text-4xl font-black text-emerald-600 tracking-tighter">{lastSubmittedId}</p>
          </div>
          <p className="text-gray-500 font-medium max-w-md mx-auto">
            আগামী ৭ কার্যদিবসের মধ্যে আপনার অভিযোগটি পর্যালোচনা করা হবে। আপনি এই আইডি দিয়ে যেকোনো সময় অভিযোগের অগ্রগতি চেক করতে পারবেন।
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => {
              setTrackingId(lastSubmittedId);
              setActiveView('track');
              handleTrack({ preventDefault: () => {} } as any);
            }}
            className="px-10 py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-2"
          >
            অবস্থা চেক করুন <Search size={20} />
          </button>
          <button 
            onClick={() => window.print()}
            className="px-10 py-4 bg-white border-2 border-emerald-600 text-emerald-600 rounded-2xl font-black hover:bg-emerald-50 transition-all flex items-center gap-2"
          >
            রিসিট প্রিন্ট করুন <Printer size={20} />
          </button>
          <button 
            onClick={() => setActiveView('form')}
            className="px-10 py-4 bg-gray-100 text-gray-600 rounded-2xl font-black hover:bg-gray-200 transition-all"
          >
            নতুন অভিযোগ করুন
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* View Switcher / Admin Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="bg-white p-2 rounded-2xl shadow-sm border border-gray-100 flex gap-2">
          <button 
            onClick={() => setActiveView('form')}
            className={`px-8 py-3 rounded-xl font-black text-sm transition-all flex items-center gap-2 ${activeView === 'form' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <ClipboardList size={18} /> অভিযোগ জমা দিন
          </button>
          <button 
            onClick={() => setActiveView('track')}
            className={`px-8 py-3 rounded-xl font-black text-sm transition-all flex items-center gap-2 ${activeView === 'track' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-500 hover:bg-gray-50'}`}
          >
            <Search size={18} /> অভিযোগ ট্র্যাক করুন
          </button>
        </div>

        <button 
          onClick={() => {
            setIsAdmin(!isAdmin);
            if (!isAdmin) setActiveView('official');
            else setActiveView('form');
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all border ${
            isAdmin ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-gray-50 text-gray-400 border-gray-100 hover:bg-gray-100'
          }`}
        >
          <ShieldCheck size={16} /> {isAdmin ? 'অফিসিয়াল প্যানেল বন্ধ করুন' : 'অফিসিয়াল প্যানেল (ডেমো)'}
        </button>
      </div>

      {activeView === 'official' && (
        <div className="space-y-8 animate-in fade-in duration-500">
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-gray-800 tracking-tight">অভিযোগ নিষ্পত্তি ড্যাশবোর্ড</h2>
                <p className="text-gray-500 font-medium">ভূমি অফিসের কর্মকর্তাদের জন্য অভিযোগ ব্যবস্থাপনা প্যানেল।</p>
              </div>
              <div className="px-6 py-3 bg-emerald-50 text-emerald-700 rounded-2xl text-xs font-black uppercase tracking-widest border border-emerald-100">
                মোট অভিযোগ: {complaints.length}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">আইডি</th>
                    <th className="text-left py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">অভিযোগকারী</th>
                    <th className="text-left py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">অবস্থা</th>
                    <th className="text-left py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">সময়সীমা</th>
                    <th className="text-right py-4 px-4 text-xs font-black text-gray-400 uppercase tracking-widest">অ্যাকশন</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {complaints.map(complaint => (
                    <tr key={complaint.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 px-4 font-black text-gray-800">{complaint.trackingId}</td>
                      <td className="py-4 px-4">
                        <p className="font-bold text-gray-700">{complaint.name}</p>
                        <p className="text-xs text-gray-400">{complaint.phone}</p>
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border ${
                          complaint.status === 'Resolved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          complaint.status === 'Processing' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                          'bg-amber-50 text-amber-600 border-amber-100'
                        }`}>
                          {complaint.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <p className={`text-xs font-bold ${
                          new Date(complaint.deadline) < new Date() ? 'text-rose-600' : 'text-gray-500'
                        }`}>
                          {complaint.deadline}
                        </p>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          {complaint.status !== 'Resolved' && (
                            <>
                              <button 
                                onClick={() => handleUpdateStatus(complaint.id, 'Processing', 'তদন্ত শুরু হয়েছে।')}
                                className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all"
                                title="তদন্ত শুরু করুন"
                              >
                                <Clock size={16} />
                              </button>
                              <button 
                                onClick={() => handleUpdateStatus(complaint.id, 'Resolved', 'অভিযোগটি নিষ্পত্তি করা হয়েছে।')}
                                className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all"
                                title="নিষ্পত্তি করুন"
                              >
                                <CheckCircle2 size={16} />
                              </button>
                            </>
                          )}
                          <button className="p-2 bg-gray-50 text-gray-400 rounded-lg hover:bg-gray-100 transition-all">
                            <ChevronRight size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeView === 'form' && (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
              <MessageSquareText size={40} />
            </div>
            <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">ভূমি সেবা অভিযোগ কেন্দ্র</h2>
            <p className="text-gray-500 max-w-lg font-medium mb-6">ভূমি সংক্রান্ত যেকোনো অনিয়ম, দুর্নীতি বা হয়রানির অভিযোগ সরাসরি কর্তৃপক্ষের কাছে জানান।</p>
            
            <button 
              onClick={() => onTabChange?.('dispute-complaint')}
              className="flex items-center gap-3 px-6 py-3 bg-rose-50 text-rose-600 rounded-2xl font-black text-sm hover:bg-rose-100 transition-all border border-rose-100"
            >
              <Gavel size={18} /> ভূমি বিরোধ অভিযোগ ফরম
            </button>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Side - Form */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 group">
                  <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                    <User size={14}/> আপনার নাম
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                    placeholder="নাম লিখুন"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                    <Phone size={14}/> মোবাইল নম্বর
                  </label>
                  <input 
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                    placeholder="০১XXXXXXXXX"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                  <MapPin size={14}/> সংশ্লিষ্ট এলাকা (মৌজা/উপজেলা)
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({...formData, location: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  placeholder="এলাকার নাম লিখুন"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-xs font-black text-gray-500 ml-1 uppercase tracking-widest flex items-center gap-2 group-focus-within:text-emerald-600 transition-colors">
                  <MessageSquareText size={14}/> অভিযোগের বিবরণ
                </label>
                <textarea 
                  required
                  rows={5}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm resize-none"
                  placeholder="বিস্তারিত বিবরণ লিখুন..."
                ></textarea>
              </div>

              <div className="flex items-center gap-4">
                <button type="button" className="flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-600 rounded-xl font-black text-sm hover:bg-gray-200 transition-all">
                  <Paperclip size={18} /> ফাইল যুক্ত করুন
                </button>
                <p className="text-[10px] text-gray-400 font-bold">সর্বোচ্চ ৫ মেগাবাইট (PDF, JPG, PNG)</p>
              </div>

              <button 
                type="submit"
                className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-200 hover:bg-emerald-700 transition-all flex items-center justify-center gap-3"
              >
                অভিযোগ জমা দিন <Send size={24} />
              </button>
            </div>

            {/* Right Side - Info */}
            <div className="space-y-8">
              <div className="bg-emerald-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                <div className="relative z-10">
                  <h3 className="text-2xl font-black mb-6">জরুরি তথ্য</h3>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-300 shrink-0">
                        <Phone size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-emerald-300">হটলাইন</p>
                        <p className="text-lg font-bold">১৬১২২ (২৪/৭ খোলা)</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-emerald-300 shrink-0">
                        <Mail size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-black tracking-widest text-emerald-300">ইমেইল</p>
                        <p className="text-lg font-bold">complain@land.gov.bd</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
              </div>

              <div className="p-8 bg-amber-50 border border-amber-100 rounded-[2.5rem] space-y-4">
                <div className="flex items-center gap-3 text-amber-600">
                  <AlertCircle size={24} />
                  <h4 className="font-black">সতর্কতা</h4>
                </div>
                <p className="text-sm font-medium text-amber-800 leading-relaxed">
                  মিথ্যা বা বানোয়াট অভিযোগ করা আইনত দণ্ডনীয় অপরাধ। আপনার অভিযোগটি সঠিক ও তথ্যবহুল হওয়া জরুরি। অভিযোগকারীর পরিচয় গোপন রাখা হবে।
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'গোপনীয়তা', desc: '১০০% পরিচয় গোপন' },
                  { label: 'দ্রুত সমাধান', desc: '৭ কার্যদিবসে ব্যবস্থা' }
                ].map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 text-center">
                    <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-[10px] text-gray-400 font-bold">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </form>
        </div>
      )}

      {activeView === 'track' && (
        <div className="space-y-8">
          {/* Track Search Box */}
          <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
            <div className="max-w-2xl mx-auto text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto text-emerald-600">
                <Search size={32} />
              </div>
              <h3 className="text-2xl font-black text-gray-800">অভিযোগের অবস্থা যাচাই করুন</h3>
              <p className="text-gray-500 font-medium">আপনার অভিযোগের ট্র্যাকিং আইডি প্রদান করে বর্তমান অবস্থা এবং অগ্রগতি দেখুন।</p>
              
              <form onSubmit={handleTrack} className="flex gap-4">
                <input 
                  type="text" 
                  required
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="যেমন: CMP-2024-1234"
                  className="flex-1 px-8 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                />
                <button 
                  type="submit"
                  disabled={isSearching}
                  className="px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center gap-3 disabled:opacity-50"
                >
                  {isSearching ? <Loader2 className="animate-spin" size={24} /> : <Search size={24} />}
                  ট্র্যাক করুন
                </button>
              </form>
            </div>
          </div>

          {/* Search Result */}
          <AnimatePresence mode="wait">
            {searchResult && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Status Summary */}
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                          <ClipboardList size={32} />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black text-gray-800">{searchResult.trackingId}</h4>
                          <p className="text-sm text-gray-500 font-bold">জমা দেওয়ার তারিখ: {searchResult.date}</p>
                        </div>
                      </div>
                      <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest ${
                        searchResult.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' :
                        searchResult.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {searchResult.status === 'Resolved' ? 'নিষ্পত্তি হয়েছে' : 
                         searchResult.status === 'Rejected' ? 'বাতিল' : 
                         searchResult.status === 'Processing' ? 'তদন্তাধীন' : 
                         searchResult.status === 'Under Review' ? 'পর্যালোচনায়' : 'জমা হয়েছে'}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                      {[
                        { label: 'অভিযোগকারী', value: searchResult.name, icon: User },
                        { label: 'মোবাইল', value: searchResult.phone, icon: Phone },
                        { label: 'এলাকা', value: searchResult.location, icon: MapPin },
                        { label: 'নিষ্পত্তির সময়সীমা', value: searchResult.deadline, icon: Clock }
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

                    <div className="space-y-4">
                      <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                        <MessageSquareText size={14} /> অভিযোগের বিবরণ
                      </h5>
                      <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 text-gray-700 font-medium leading-relaxed">
                        {searchResult.description}
                      </div>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
                    <h4 className="text-xl font-black text-gray-800 mb-8 flex items-center gap-3">
                      <History size={24} className="text-emerald-600" /> অভিযোগের অগ্রগতি
                    </h4>
                    <div className="relative pl-8 space-y-8 before:absolute before:left-[15px] before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-100">
                      {searchResult.updates.map((update, idx) => (
                        <div key={idx} className="relative">
                          <div className={`absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-white border-4 z-10 ${
                            idx === 0 ? 'border-emerald-500' : 'border-emerald-200'
                          }`} />
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                            <div>
                              <p className="text-sm font-black text-gray-800">{update.message}</p>
                              <p className="text-xs text-gray-400 font-bold">{update.date}</p>
                            </div>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-[10px] font-black uppercase tracking-widest border border-emerald-100 self-start md:self-center">
                              {update.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar Info */}
                <div className="space-y-6">
                  <div className="bg-emerald-600 p-8 rounded-[2rem] text-white shadow-xl shadow-emerald-100">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                      <ShieldCheck size={24} />
                    </div>
                    <h4 className="text-lg font-black mb-2">আপনার অধিকার</h4>
                    <p className="text-sm text-emerald-50 font-medium leading-relaxed mb-6">
                      ভূমি অফিসের কর্মকর্তারা আপনার অভিযোগ নির্দিষ্ট সময়সীমার মধ্যে নিষ্পত্তি করতে দায়বদ্ধ। কোনো অবহেলা পরিলক্ষিত হলে আপনি ঊর্ধ্বতন কর্তৃপক্ষের কাছে আপিল করতে পারেন।
                    </p>
                    <button className="w-full py-4 bg-white text-emerald-600 rounded-xl font-black text-sm hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
                      আপিল করুন <ChevronRight size={18} />
                    </button>
                  </div>

                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <h4 className="text-sm font-black text-gray-800 mb-4 uppercase tracking-widest">সরাসরি অভিযোগ</h4>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">
                      আপনি চাইলে সরাসরি আপনার নিকটস্থ উপজেলা ভূমি অফিসে গিয়ে লিখিত অভিযোগ জমা দিতে পারেন। সেখানে অভিযোগ গ্রহণকারী কর্মকর্তা আপনাকে একটি রিসিট প্রদান করবেন।
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-emerald-600">
                          <MapPin size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase">অফিস সময়</p>
                          <p className="text-sm font-bold text-gray-700">সকাল ৯টা - বিকাল ৪টা</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
                    <h4 className="text-sm font-black text-gray-800 mb-4 uppercase tracking-widest">সহায়তা প্রয়োজন?</h4>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-emerald-600">
                          <Phone size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase">সরাসরি কথা বলুন</p>
                          <p className="text-sm font-bold text-gray-700">১৬১২২</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-emerald-600">
                          <Mail size={18} />
                        </div>
                        <div>
                          <p className="text-[10px] font-black text-gray-400 uppercase">ইমেইল করুন</p>
                          <p className="text-sm font-bold text-gray-700">support@land.gov.bd</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent History (Optional) */}
          {!searchResult && (
            <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
              <h4 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
                <History size={20} className="text-emerald-600" /> আপনার সাম্প্রতিক অভিযোগসমূহ
              </h4>
              <div className="space-y-4">
                {complaints.map(c => (
                  <button 
                    key={c.id}
                    onClick={() => {
                      setTrackingId(c.trackingId);
                      setSearchResult(c);
                    }}
                    className="w-full flex items-center justify-between p-6 bg-gray-50 rounded-2xl border border-transparent hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-gray-400 group-hover:text-emerald-600 shadow-sm">
                        <ClipboardList size={24} />
                      </div>
                      <div className="text-left">
                        <p className="text-sm font-black text-gray-800">{c.trackingId}</p>
                        <p className="text-xs text-gray-400 font-bold">{c.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                        c.status === 'Resolved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {c.status === 'Resolved' ? 'নিষ্পত্তি' : 'চলমান'}
                      </span>
                      <ChevronRight size={20} className="text-gray-300 group-hover:text-emerald-600" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ComplainModule;
