
import React, { useState } from 'react';
import { BookOpen, History, Gavel, FileText, MessageSquare, Send, Search, ChevronRight, Bookmark, Share2, Info, ScrollText, Landmark, ShieldAlert, Calculator } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  icon: any;
}

const articles: Article[] = [
  {
    id: '1',
    title: 'বাংলার ভূমির ইতিহাস (History of Land in Bengal)',
    category: 'ইতিহাস (History)',
    excerpt: 'প্রাচীনকাল থেকে বর্তমান সময় পর্যন্ত বাংলার ভূমি ব্যবস্থার বিবর্তন। Evolution of land systems in Bengal.',
    content: `বাংলার ভূমি ব্যবস্থা প্রাচীনকাল থেকেই অত্যন্ত সমৃদ্ধ। পাল, সেন, সুলতানি এবং মুঘল আমলে ভূমি ব্যবস্থাপনায় বিভিন্ন পরিবর্তন আসে। মুঘল আমলে শের শাহ শুরির প্রবর্তিত ভূমি ব্যবস্থা এবং পরবর্তীতে সম্রাট আকবরের 'আইন-ই-আকবরী' ভূমি ব্যবস্থাপনায় এক নতুন দিগন্ত উন্মোচন করে। ১৭৯৩ সালে লর্ড কর্নওয়ালিস প্রবর্তিত 'চিরস্থায়ী বন্দোবস্ত' বাংলার ভূমি ব্যবস্থায় আমূল পরিবর্তন আনে।

    The land system of Bengal has been rich since ancient times. Significant changes occurred during the Pala, Sena, Sultanate, and Mughal periods. Sher Shah Suri's reforms and later Emperor Akbar's 'Ain-i-Akbari' opened new horizons in land management. The 'Permanent Settlement' introduced by Lord Cornwallis in 1793 brought radical changes to the land system of Bengal.`,
    icon: History
  },
  {
    id: '2',
    title: 'ভূমি জরিপের ইতিহাস (History of Land Survey)',
    category: 'জরিপ (Survey)',
    excerpt: 'সিএস, এসএ, আরএস এবং বিএস জরিপের প্রেক্ষাপট ও গুরুত্ব। Context and importance of CS, SA, RS, and BS surveys.',
    content: `বাংলাদেশে ভূমি জরিপের ইতিহাস বেশ দীর্ঘ। ১৮৮৮ সালে শুরু হওয়া ক্যাডাস্ট্রাল সার্ভে (সিএস) ছিল প্রথম বৈজ্ঞানিক জরিপ। এরপর ১৯৫০ সালের জমিদারি উচ্ছেদ ও প্রজাস্বত্ব আইনের পর স্টেট একুইজিশন (এসএ) জরিপ পরিচালিত হয়। পরবর্তীতে রিভিশনাল সার্ভে (আরএস) এবং বর্তমানে বাংলাদেশ সার্ভে (বিএস) বা সিটি জরিপ চলমান রয়েছে। ডিজিটাল ভূমি জরিপ বা ই-জরিপ এখন ভূমি ব্যবস্থাপনায় স্বচ্ছতা আনছে।

    The history of land survey in Bangladesh is extensive. The Cadastral Survey (CS), started in 1888, was the first scientific survey. After the State Acquisition and Tenancy Act of 1950, the State Acquisition (SA) survey was conducted. Subsequently, the Revisional Survey (RS) and currently the Bangladesh Survey (BS) or City Survey are ongoing. Digital land survey or e-survey is now bringing transparency to land management.`,
    icon: ScrollText
  },
  {
    id: '3',
    title: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ (Land Crime Prevention and Remediation Act, 2023)',
    category: 'আইন (Law)',
    excerpt: 'ভূমি জালিয়াতি ও অবৈধ দখল দমনে নতুন আইনের বিস্তারিত। Details of the new law to curb land fraud and illegal occupation.',
    content: `ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন, ২০২৩ ভূমি ব্যবস্থাপনায় একটি যুগান্তকারী পদক্ষেপ। এই আইনের মাধ্যমে ভূমি জালিয়াতি, দলিলে তথ্য গোপন, অবৈধ দখল এবং সীমানা পরিবর্তনকে ফৌজদারি অপরাধ হিসেবে গণ্য করা হয়েছে। অপরাধের ধরণভেদে জেল ও জরিমানার বিধান রাখা হয়েছে। এই আইনটি সাধারণ মানুষের ভূমির অধিকার রক্ষায় শক্তিশালী ভূমিকা পালন করছে।

    The Land Crime Prevention and Remediation Act, 2023 is a landmark step in land management. Through this act, land fraud, concealment of information in deeds, illegal occupation, and boundary changes have been treated as criminal offenses. Provisions for imprisonment and fines have been made based on the nature of the crime. This act plays a strong role in protecting the land rights of common people.`,
    icon: ShieldAlert
  },
  {
    id: '4',
    title: 'গেজেট, প্রজ্ঞাপন ও অধ্যাদেশ (Gazettes, Notifications, and Ordinances)',
    category: 'গেজেট (Gazette)',
    excerpt: 'ভূমি মন্ত্রণালয় কর্তৃক জারিকৃত গুরুত্বপূর্ণ গেজেট ও প্রজ্ঞাপনসমূহ। Important gazettes and notifications issued by the Ministry of Land.',
    content: `ভূমি ব্যবস্থাপনায় গেজেট, প্রজ্ঞাপন এবং অধ্যাদেশ অত্যন্ত গুরুত্বপূর্ণ। সরকার বিভিন্ন সময়ে ভূমি সংক্রান্ত নতুন নিয়ম বা সংশোধন গেজেট আকারে প্রকাশ করে। প্রজ্ঞাপনের মাধ্যমে নির্দিষ্ট কোনো নির্দেশ জারি করা হয়। জরুরি প্রয়োজনে রাষ্ট্রপতির অধ্যাদেশ আইনের মতো কার্যকর হয়। এই নথিগুলো ভূমি সংক্রান্ত আইনি বিরোধ নিষ্পত্তিতে প্রধান ভিত্তি হিসেবে কাজ করে।

    Gazettes, notifications, and ordinances are crucial in land management. The government publishes new land-related rules or amendments in the form of gazettes. Specific instructions are issued through notifications. In case of emergency, presidential ordinances function like laws. These documents serve as the primary basis for resolving land-related legal disputes.`,
    icon: FileText
  },
  {
    id: '5',
    title: 'ভূমি সেবা ও নাগরিক অধিকার (Land Services and Citizen Rights)',
    category: 'সেবা (Service)',
    excerpt: 'নাগরিকদের জন্য সহজলভ্য সকল ভূমি সেবার তালিকা ও পদ্ধতি। List and methods of all land services available to citizens.',
    content: `ডিজিটাল বাংলাদেশ গড়ার লক্ষ্যে ভূমি মন্ত্রণালয় অধিকাংশ সেবা অনলাইনে নিয়ে এসেছে। ই-নামজারি, অনলাইন ভূমি উন্নয়ন কর প্রদান, ডিজিটাল খতিয়ান সংগ্রহ এবং মৌজা ম্যাপ এখন হাতের নাগালে। ১৬১২২ হটলাইনের মাধ্যমে নাগরিকরা সরাসরি অভিযোগ বা পরামর্শ দিতে পারেন। এই সেবাগুলো দালালমুক্ত ভূমি ব্যবস্থাপনা নিশ্চিত করছে।

    In line with building a Digital Bangladesh, the Ministry of Land has brought most services online. E-Mutation, online payment of land development tax, digital Khatian collection, and Mouza maps are now at your fingertips. Citizens can directly provide complaints or suggestions through the 16122 hotline. These services are ensuring a middleman-free land management system.`,
    icon: Landmark
  },
  {
    id: '7',
    title: 'ভূমি আইন ও বিধিমালা (Land Laws and Regulations)',
    category: 'আইন (Law)',
    excerpt: 'বাংলাদেশে প্রচলিত ভূমি সংক্রান্ত প্রধান আইন ও বিধিমালার সংকলন। Compilation of major land laws and regulations in Bangladesh.',
    content: `বাংলাদেশে ভূমি ব্যবস্থাপনার জন্য অসংখ্য আইন ও বিধিমালা রয়েছে। এর মধ্যে ১৮৮৫ সালের বঙ্গীয় প্রজাস্বত্ব আইন, ১৯৫০ সালের রাষ্ট্রীয় অধিগ্রহণ ও প্রজাস্বত্ব আইন এবং ২০১৭ সালের স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল আইন অন্যতম। এই আইনগুলোর অধীনে বিভিন্ন বিধিমালা (Rules) প্রণীত হয়েছে যা মাঠ পর্যায়ে আইন বাস্তবায়নে সহায়তা করে।

    There are numerous laws and regulations for land management in Bangladesh. Among them, the Bengal Tenancy Act of 1885, the State Acquisition and Tenancy Act of 1950, and the Acquisition and Requisition of Immovable Property Act of 2017 are prominent. Various rules have been formulated under these laws to assist in implementing the laws at the field level.`,
    icon: Gavel
  }
];

const BhumiPedia: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<{user: string, text: string, date: string}[]>([
    { user: 'আব্দুর রহিম', text: 'খুবই উপকারী তথ্য। ভূমি অপরাধ আইন সম্পর্কে আরও বিস্তারিত জানতে চাই।', date: '২০ মে, ২০২৪' },
    { user: 'সাদিয়া ইসলাম', text: 'জরিপের ইতিহাস অংশটি অনেক চমৎকার হয়েছে।', date: '২২ মে, ২০২৪' }
  ]);

  const filteredArticles = articles.filter(art => {
    const query = searchQuery.toLowerCase();
    return (
      art.title.toLowerCase().includes(query) || 
      art.category.toLowerCase().includes(query) ||
      art.content.toLowerCase().includes(query) ||
      art.excerpt.toLowerCase().includes(query)
    );
  });

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const newComment = {
      user: 'বর্তমান ব্যবহারকারী',
      text: comment,
      date: 'আজ'
    };
    setComments([newComment, ...comments]);
    setComment('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Header */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 shadow-inner">
              <BookOpen size={40} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-gray-800 tracking-tighter mb-2">ভূমি পিডিয়া</h2>
              <p className="text-gray-500 font-medium">ভূমির ইতিহাস, আইন ও সেবার এক বিশাল জ্ঞানভাণ্ডার।</p>
            </div>
          </div>
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="পিডিয়াতে অনুসন্ধান করুন..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 pr-14 shadow-sm"
            />
            <Search className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-32 -mt-32" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Article List */}
        <div className="lg:col-span-2 space-y-6">
          {selectedArticle ? (
            <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm animate-in zoom-in duration-300">
              <button 
                onClick={() => setSelectedArticle(null)}
                className="mb-8 flex items-center gap-2 text-emerald-600 font-black text-sm uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
              >
                ← ফিরে যান
              </button>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <selectedArticle.icon size={32} />
                </div>
                <div>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                    {selectedArticle.category}
                  </span>
                  <h3 className="text-3xl font-black text-gray-800 mt-2">{selectedArticle.title}</h3>
                </div>
              </div>
              <div className="prose prose-emerald max-w-none">
                <p className="text-gray-600 text-lg leading-relaxed font-medium">
                  {selectedArticle.content}
                </p>
                <div className="mt-10 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <h4 className="font-black text-gray-800 mb-4 flex items-center gap-2">
                    <Info size={20} className="text-emerald-600" /> সারসংক্ষেপ
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    এই নিবন্ধটি {selectedArticle.category} সংক্রান্ত মৌলিক তথ্য প্রদান করে। আরও বিস্তারিত তথ্যের জন্য সরকারি গেজেট বা সংশ্লিষ্ট আইনের মূল কপি অনুসরণ করুন।
                  </p>
                </div>
              </div>
              
              <div className="mt-12 flex items-center gap-4">
                <button className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                  <Bookmark size={20} /> বুকমার্ক করুন
                </button>
                <button className="flex-1 py-4 bg-white border-2 border-gray-100 text-gray-600 rounded-2xl font-black hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                  <Share2 size={20} /> শেয়ার করুন
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {filteredArticles.length > 0 ? (
                filteredArticles.map((art) => (
                  <div 
                    key={art.id} 
                    onClick={() => setSelectedArticle(art)}
                    className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer flex items-center gap-8"
                  >
                    <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-[1.5rem] flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-all shrink-0">
                      <art.icon size={36} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                          {art.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-black text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors">
                        {art.title}
                      </h3>
                      <p className="text-gray-500 text-sm font-medium line-clamp-2">
                        {art.excerpt}
                      </p>
                    </div>
                    <ChevronRight size={24} className="text-gray-200 group-hover:text-emerald-600 group-hover:translate-x-2 transition-all" />
                  </div>
                ))
              ) : (
                <div className="bg-white p-20 rounded-[3rem] border border-gray-100 text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                    <Search size={40} />
                  </div>
                  <h4 className="text-xl font-black text-gray-800">কোনো ফলাফল পাওয়া যায়নি</h4>
                  <p className="text-gray-500 font-medium max-w-xs mx-auto">আপনার অনুসন্ধানকৃত শব্দটির সাথে মিল আছে এমন কোনো নিবন্ধ পাওয়া যায়নি।</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar / Comments */}
        <div className="space-y-8">
          {/* Categories Card */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h4 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
              <Layers size={20} className="text-emerald-600" /> বিষয়সমূহ
            </h4>
            <div className="flex flex-wrap gap-2">
              {['ইতিহাস', 'জরিপ', 'আইন', 'বিধিমালা', 'গেজেট', 'প্রজ্ঞাপন', 'অধ্যাদেশ', 'ভূমিসেবা'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setSearchQuery(cat)}
                  className="px-4 py-2 bg-gray-50 text-gray-500 rounded-xl text-xs font-bold hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Comment Section */}
          <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col h-fit">
            <h4 className="text-lg font-black text-gray-800 mb-6 flex items-center gap-2">
              <MessageSquare size={20} className="text-emerald-600" /> পাঠকদের মন্তব্য
            </h4>
            
            <form onSubmit={handleAddComment} className="mb-8">
              <div className="relative">
                <textarea 
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="আপনার মন্তব্য লিখুন..."
                  className="w-full p-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-medium text-sm text-gray-700 min-h-[120px] resize-none"
                />
                <button 
                  type="submit"
                  className="absolute bottom-4 right-4 p-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all shadow-lg"
                >
                  <Send size={18} />
                </button>
              </div>
            </form>

            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              {comments.map((c, i) => (
                <div key={i} className="p-5 bg-gray-50 rounded-2xl border border-gray-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-700">{c.user}</span>
                    <span className="text-[10px] text-gray-400 font-bold">{c.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    {c.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components for icons not imported
const Layers = ({ size, className }: { size: number, className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

export default BhumiPedia;
