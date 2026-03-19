
import React from 'react';
import { Phone, Mail, MessageSquare, MapPin, Clock, Globe, ExternalLink, HelpCircle, ArrowRight, CheckCircle2, Users, ShieldCheck } from 'lucide-react';

const SupportModule: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Section */}
      <div className="bg-emerald-900 rounded-[3rem] p-12 text-white relative overflow-hidden shadow-2xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/20">
              <HelpCircle size={16} className="text-emerald-300" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-100">সহায়তা কেন্দ্র</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">আপনার যেকোনো প্রয়োজনে <br/> আমরা আছি পাশে</h2>
            <p className="text-emerald-100/80 text-lg font-medium leading-relaxed">
              ভূমি সংক্রান্ত যেকোনো প্রশ্ন বা সমস্যার সমাধানের জন্য আমাদের বিশেষজ্ঞ টিমের সাথে যোগাযোগ করুন। আমরা ২৪/৭ আপনার সেবায় নিয়োজিত।
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="tel:16122" className="px-8 py-4 bg-white text-emerald-900 rounded-2xl font-black hover:bg-emerald-50 transition-all shadow-lg flex items-center gap-3">
                <Phone size={20} /> ১৬১২২ কল দিন
              </a>
              <button className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all border border-emerald-500 shadow-lg flex items-center gap-3">
                <MessageSquare size={20} /> লাইভ চ্যাট
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Phone, label: 'হটলাইন', value: '১৬১২২' },
              { icon: Mail, label: 'ইমেইল', value: 'support@land.gov.bd' },
              { icon: Clock, label: 'সময়সীমা', value: '২৪/৭ খোলা' },
              { icon: MapPin, label: 'অফিস', value: 'সচিবালয়, ঢাকা' }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 flex flex-col items-center gap-3 text-center">
                <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl">
                  <item.icon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-300 mb-1">{item.label}</p>
                  <p className="text-sm font-black">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-600/20 rounded-full blur-[120px] -mr-48 -mt-48" />
      </div>

      {/* FAQ Section */}
      <div className="space-y-8">
        <div className="flex items-center justify-between px-4">
          <h3 className="text-2xl font-black text-gray-800 flex items-center gap-3">
            <div className="w-2 h-8 bg-emerald-600 rounded-full" /> সচরাচর জিজ্ঞাসিত প্রশ্নাবলী (FAQ)
          </h3>
          <button className="text-emerald-600 font-black text-sm flex items-center gap-2 hover:underline">
            সবগুলো দেখুন <ArrowRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { q: 'অনলাইনে নামজারি আবেদন কীভাবে করব?', a: 'আমাদের ড্যাশবোর্ড থেকে "নামজারি আবেদন" বাটনে ক্লিক করে প্রয়োজনীয় তথ্য ও দলীল আপলোড করে আবেদন করতে পারেন।' },
            { q: 'খতিয়ান বা পর্চা পেতে কতদিন সময় লাগে?', a: 'সাধারণত অনলাইনে অনুসন্ধানের ক্ষেত্রে তাৎক্ষণিক এবং সার্টিফাইড কপির ক্ষেত্রে ৫-৭ কার্যদিবস সময় লাগে।' },
            { q: 'ভূমি উন্নয়ন কর অনলাইনে কীভাবে দেব?', a: 'আমাদের "ভূমি কর হিসাব" মডিউল ব্যবহার করে বকেয়া কর দেখে সরাসরি বিকাশ বা নগদের মাধ্যমে পরিশোধ করা সম্ভব।' },
            { q: 'ভুল রেকর্ড সংশোধনের উপায় কী?', a: 'রেকর্ড সংশোধনের জন্য সংশ্লিষ্ট এসিল্যান্ড অফিসে মিস কেস (Miss Case) দাখিল করতে হয়। আমাদের এআই সহকারী আপনাকে বিস্তারিত জানাবে।' }
          ].map((faq, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <h4 className="text-lg font-black text-gray-800 mb-3 flex items-start gap-3">
                <span className="text-emerald-600">Q.</span> {faq.q}
              </h4>
              <p className="text-sm text-gray-500 font-medium leading-relaxed pl-8">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Social & Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { title: 'ফেসবুক পেজ', icon: Users, desc: 'সর্বশেষ আপডেট পেতে যুক্ত হোন আমাদের ফেসবুক কমিউনিটিতে।', color: 'bg-blue-600' },
          { title: 'ইউটিউব চ্যানেল', icon: ShieldCheck, desc: 'ভূমি সেবা ব্যবহারের ভিডিও টিউটোরিয়াল দেখতে সাবস্ক্রাইব করুন।', color: 'bg-rose-600' },
          { title: 'অফিসিয়াল পোর্টাল', icon: Globe, desc: 'ভূমি মন্ত্রণালয়ের মূল ওয়েবসাইট ভিজিট করুন বিস্তারিত তথ্যের জন্য।', color: 'bg-emerald-600' }
        ].map((link, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col items-center text-center gap-4 group cursor-pointer hover:shadow-xl transition-all">
            <div className={`w-14 h-14 ${link.color} text-white rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform`}>
              <link.icon size={28} />
            </div>
            <h4 className="text-xl font-black text-gray-800">{link.title}</h4>
            <p className="text-sm text-gray-500 font-medium leading-relaxed">{link.desc}</p>
            <div className="mt-2 text-emerald-600 font-black text-xs uppercase tracking-widest flex items-center gap-2">
              ভিজিট করুন <ExternalLink size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupportModule;
