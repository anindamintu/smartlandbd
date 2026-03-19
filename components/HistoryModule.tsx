
import React from 'react';
import { History, FileText, CheckCircle2, Clock, AlertCircle, Search, Download, ArrowRight, Filter, Calendar } from 'lucide-react';

const historyItems = [
  { id: 1, type: 'নামজারি আবেদন', ref: '#MUT-2024-8842', date: '১২ জানুয়ারি, ২০২৪', status: 'In Progress', statusText: 'শুনানি পর্যায়ে' },
  { id: 2, type: 'খতিয়ান অনুসন্ধান', ref: '#KH-9912', date: '০৫ জানুয়ারি, ২০২৪', status: 'Completed', statusText: 'সফল' },
  { id: 3, type: 'ভূমি কর পরিশোধ', ref: '#TAX-4421', date: '২০ ডিসেম্বর, ২০২৩', status: 'Completed', statusText: 'পরিশোধিত' },
  { id: 4, type: 'অভিযোগ দাখিল', ref: '#CMP-7712', date: '১৫ ডিসেম্বর, ২০২৩', status: 'Rejected', statusText: 'বাতিল' },
  { id: 5, type: 'দলীল ভেরিফিকেশন', ref: '#VER-3321', date: '১০ ডিসেম্বর, ২০২৩', status: 'Completed', statusText: 'ভেরিফাইড' },
];

const HistoryModule: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Header */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
            <History size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">আপনার আবেদনের ইতিহাস</h2>
          <p className="text-gray-500 max-w-lg font-medium">আপনার করা সকল আবেদন, অনুসন্ধান ও লেনদেনের বিস্তারিত ইতিহাস এখানে পাবেন।</p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input 
              type="text" 
              placeholder="আইডি বা ধরণ দিয়ে খুঁজুন..."
              className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          </div>
          <button className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-600 rounded-2xl font-black flex items-center gap-2 hover:bg-gray-50 transition-all">
            <Filter size={20} /> ফিল্টার
          </button>
          <button className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-600 rounded-2xl font-black flex items-center gap-2 hover:bg-gray-50 transition-all">
            <Calendar size={20} /> তারিখ
          </button>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-gray-100">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">আবেদনের ধরণ</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">রেফারেন্স আইডি</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">তারিখ</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400">অবস্থা</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-gray-400 text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {historyItems.map((item) => (
                <tr key={item.id} className="hover:bg-emerald-50/30 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <FileText size={20} />
                      </div>
                      <span className="font-black text-gray-800">{item.type}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-bold text-gray-500">{item.ref}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className="font-bold text-gray-500">{item.date}</span>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 w-fit ${
                      item.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      item.status === 'In Progress' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {item.status === 'Completed' ? <CheckCircle2 size={12} /> : 
                       item.status === 'In Progress' ? <Clock size={12} /> : <AlertCircle size={12} />}
                      {item.statusText}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                        <Download size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                        <ArrowRight size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'মোট আবেদন', value: '১২ টি', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'সফল আবেদন', value: '০৯ টি', icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'প্রক্রিয়াধীন', value: '০২ টি', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex items-center gap-6">
            <div className={`w-16 h-16 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center shadow-inner`}>
              <stat.icon size={32} />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-3xl font-black text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryModule;
