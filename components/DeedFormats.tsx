
import React, { useState, useRef } from 'react';
import { ScrollText, Download, FileText, Search, Info, CheckCircle2, ArrowRight, FilePlus, ShieldCheck, User, MapPin, CreditCard, Calendar, AlertCircle, X, Save, Printer, FileEdit, FileDown, Scale } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const formats = [
  { id: 1, title: 'সাফ-কবলা দলীল', desc: 'জমি বিক্রির জন্য ব্যবহৃত আদর্শ ফরমেট।', type: 'DOCX', size: '৪৫ কেবি' },
  { id: 2, title: 'হেবা-বিল-এওয়াজ', desc: 'রক্তের সম্পর্কের আত্মীয়দের দানপত্র দলীল।', type: 'PDF', size: '১২০ কেবি' },
  { id: 3, title: 'বণ্টননামা দলীল', desc: 'উত্তরাধিকারীদের মধ্যে সম্পত্তি বণ্টনের ফরমেট।', type: 'DOCX', size: '৫৮ কেবি' },
  { id: 4, title: 'বায়নাপত্র দলীল (বায়নানামা)', desc: 'জমি ক্রয়ের প্রাথমিক চুক্তিনামা বা বায়নানামা।', type: 'PDF', size: '৯২ কেবি' },
  { id: 5, title: 'আম-মোক্তারনামা', desc: 'পাওয়ার অফ অ্যাটর্নি বা প্রতিনিধি নিয়োগ।', type: 'DOCX', size: '৪০ কেবি' },
  { id: 6, title: 'অসিয়তনামা', desc: 'মৃত ব্যক্তির শেষ ইচ্ছাপত্র বা উইল।', type: 'PDF', size: '৭৫ কেবি' },
  { id: 7, title: 'দানপত্র দলীল', desc: 'নিঃস্বার্থভাবে জমি দান করার ফরমেট।', type: 'DOCX', size: '৪৮ কেবি' },
  { id: 8, title: 'বিনিময় দলীল', desc: 'পরস্পরের মধ্যে জমি বিনিময়ের চুক্তিনামা।', type: 'PDF', size: '৬৪ কেবি' },
  { id: 9, title: 'বন্ধকী দলীল', desc: 'জমি বন্ধক রেখে ঋণ গ্রহণের চুক্তিনামা।', type: 'DOCX', size: '৫২ কেবি' },
  { id: 10, title: 'ইজারা দলীল', desc: 'জমি বা স্থাপনা ইজারা দেওয়ার ফরমেট।', type: 'PDF', size: '৮৮ কেবি' },
  { id: 11, title: 'না-দাবী দলীল', desc: 'সম্পত্তির ওপর দাবি ত্যাগের ঘোষণাপত্র।', type: 'DOCX', size: '৩৬ কেবি' },
  { id: 12, title: 'ভুল সংশোধন দলীল', desc: 'পূর্ববর্তী দলীলের ভুল সংশোধনের ফরমেট।', type: 'PDF', size: '৫৬ কেবি' },
];

const DeedFormats: React.FC = () => {
  const [selectedForDraft, setSelectedForDraft] = useState<typeof formats[0] | null>(null);
  const [formData, setFormData] = useState({
    sellerName: '',
    sellerFather: '',
    sellerAddress: '',
    buyerName: '',
    buyerFather: '',
    buyerAddress: '',
    propertyDetails: '',
    price: '',
    date: ''
  });
  const [showPreview, setShowPreview] = useState(false);
  const [editableDraft, setEditableDraft] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Area Calculator State
  const [areaInput, setAreaInput] = useState('');
  const [areaUnit, setAreaUnit] = useState<'sqft' | 'decimal'>('sqft');
  const [calculatedArea, setCalculatedArea] = useState<{
    decimal: string;
    katha: string;
    bigha: string;
    acre: string;
    sqft: string;
  } | null>(null);

  const calculateArea = (val: string, unit: 'sqft' | 'decimal') => {
    const num = parseFloat(val);
    if (isNaN(num)) {
      setCalculatedArea(null);
      return;
    }

    let sqft = 0;
    let decimal = 0;

    if (unit === 'sqft') {
      sqft = num;
      decimal = num / 435.6;
    } else {
      decimal = num;
      sqft = num * 435.6;
    }

    setCalculatedArea({
      sqft: sqft.toFixed(2),
      decimal: decimal.toFixed(2),
      katha: (sqft / 720).toFixed(2),
      bigha: (decimal / 33).toFixed(2),
      acre: (decimal / 100).toFixed(2),
    });
  };

  const previewRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateDraftText = (format: typeof formats[0], data: typeof formData) => {
    const dateStr = data.date ? new Date(data.date).toLocaleDateString('bn-BD') : '...........';
    const priceInWords = data.price ? '....................' : '....................'; // Placeholder for words conversion if needed
    
    // Specific templates based on format ID
    if (format.id === 1) { // সাফ-কবলা দলীল
      return `
------------------------------------------------------------
                    ${format.title}
------------------------------------------------------------

অদ্য ${dateStr} ইং তারিখে, আমি ${data.sellerName || '...........'}, পিতা: ${data.sellerFather || '...........'}, সাং: ${data.sellerAddress || '...........'}, অত্র দলীলের প্রথম পক্ষ বা বিক্রেতা হিসেবে ঘোষণা করিতেছি যে-

আমি আমার নিজ নামীয় নিম্ন তফসিল বর্ণিত সম্পত্তি বিক্রয়ের প্রস্তাব করিলে আপনি ${data.buyerName || '...........'}, পিতা: ${data.buyerFather || '...........'}, সাং: ${data.buyerAddress || '...........'}, অত্র দলীলের দ্বিতীয় পক্ষ বা ক্রেতা হিসেবে উক্ত সম্পত্তি মোট ${data.price || '...........'} (কথায়: ${priceInWords}) টাকা মূল্যে ক্রয় করিতে সম্মত হইয়াছেন।

তফসিল বর্ণনা:
------------------------------------------------------------
${data.propertyDetails || 'মৌজা: ..., খতিয়ান: ..., দাগ: ..., পরিমাণ: ...'}
------------------------------------------------------------

শর্তাবলী:
১. অদ্য অত্র দলীলের মাধ্যমে উক্ত সম্পত্তির দখল ও স্বত্ব আপনার বরাবর হস্তান্তর করিলাম। 
২. উক্ত সম্পত্তি সকল প্রকার দায়-মুক্ত বলিয়া ঘোষণা করিতেছি।
৩. ভবিষ্যতে কোনো আইনি জটিলতা দেখা দিলে আমি বা আমার উত্তরাধিকারীগণ দায়ী থাকিব।

অত্র দলীলের বয়ান পাঠ করিয়া ও বুঝিয়া আমি সুস্থ মস্তিষ্কে ও স্বেচ্ছায় স্বাক্ষর করিলাম।

বিক্রেতার স্বাক্ষর: ____________________

ক্রেতার স্বাক্ষর: ____________________

সাক্ষীগণের স্বাক্ষর:
১. ____________________
২. ____________________
৩. ____________________

মুসাবিদাকারী: ...........................
`.trim();
    }

    if (format.id === 2 || format.id === 7) { // হেবা বা দানপত্র
      return `
------------------------------------------------------------
                    ${format.title}
------------------------------------------------------------

অদ্য ${dateStr} ইং তারিখে, আমি ${data.sellerName || '...........'}, পিতা: ${data.sellerFather || '...........'}, সাং: ${data.sellerAddress || '...........'}, অত্র দলীলের দাতা হিসেবে ঘোষণা করিতেছি যে-

গ্রহীতা ${data.buyerName || '...........'}, পিতা: ${data.buyerFather || '...........'}, সাং: ${data.buyerAddress || '...........'}, আমার অত্যন্ত নিকটাত্মীয় এবং আপনার প্রতি আমার গভীর স্নেহ ও মমতা রহিয়াছে। তজ্জন্য আমি আমার নিম্ন তফসিল বর্ণিত সম্পত্তি আপনার বরাবর হেবা বা দান করিবার ইচ্ছা পোষণ করিলাম।

তফসিল বর্ণনা:
------------------------------------------------------------
${data.propertyDetails || 'মৌজা: ..., খতিয়ান: ..., দাগ: ..., পরিমাণ: ...'}
------------------------------------------------------------

শর্তাবলী:
১. অদ্য হইতে উক্ত সম্পত্তির যাবতীয় স্বত্ব ও দখল আপনি প্রাপ্ত হইলেন।
২. এই দান নিঃস্বার্থ এবং ভবিষ্যতে আমি বা আমার কোনো ওয়ারিশ এই সম্পত্তির ওপর কোনো দাবি করিতে পারিব না।

অত্র দলীলের বয়ান পাঠ করিয়া ও বুঝিয়া আমি সুস্থ মস্তিষ্কে ও স্বেচ্ছায় স্বাক্ষর করিলাম।

দাতার স্বাক্ষর: ____________________

গ্রহীতার স্বাক্ষর: ____________________

সাক্ষীগণের স্বাক্ষর:
১. ____________________
২. ____________________

মুসাবিদাকারী: ...........................
`.trim();
    }

    if (format.id === 4) { // বায়ানানামা
      return `
------------------------------------------------------------
                    ${format.title}
------------------------------------------------------------

অদ্য ${dateStr} ইং তারিখে, প্রথম পক্ষ (বিক্রেতা) ${data.sellerName || '...........'} এবং দ্বিতীয় পক্ষ (ক্রেতা) ${data.buyerName || '...........'} এর মধ্যে নিম্নবর্ণিত শর্তসাপেক্ষে এই বায়ানানামা সম্পাদিত হইল।

১. জমির মোট বিক্রয় মূল্য ধার্য করা হইল ${data.price || '...........'} টাকা।
২. অদ্য বায়না বাবদ ${data.price ? (parseInt(data.price.replace(/,/g, '')) * 0.1).toLocaleString('bn-BD') : '...........'} টাকা প্রদান করা হইল।
৩. অবশিষ্ট টাকা আগামী ........... মাসের মধ্যে পরিশোধ করিয়া মূল দলীল রেজিস্ট্রি করিয়া দিতে হইবে।

তফসিল বর্ণনা:
------------------------------------------------------------
${data.propertyDetails || 'মৌজা: ..., খতিয়ান: ..., দাগ: ..., পরিমাণ: ...'}
------------------------------------------------------------

প্রথম পক্ষের স্বাক্ষর: ____________________

দ্বিতীয় পক্ষের স্বাক্ষর: ____________________

সাক্ষীগণের স্বাক্ষর:
১. ____________________
২. ____________________

মুসাবিদাকারী: ...........................
`.trim();
    }

    // Default template for others
    return `
------------------------------------------------------------
                    ${format.title}
------------------------------------------------------------

অদ্য ${dateStr} ইং তারিখে, প্রথম পক্ষ ${data.sellerName || '...........'} এবং দ্বিতীয় পক্ষ ${data.buyerName || '...........'} এর মধ্যে নিম্ন তফসিল বর্ণিত সম্পত্তি সংক্রান্ত এই ${format.title} সম্পাদিত হইল।

তফসিল বর্ণনা:
------------------------------------------------------------
${data.propertyDetails || 'মৌজা: ..., খতিয়ান: ..., দাগ: ..., পরিমাণ: ...'}
------------------------------------------------------------

বিবরণ:
................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................................

প্রথম পক্ষের স্বাক্ষর: ____________________

দ্বিতীয় পক্ষের স্বাক্ষর: ____________________

সাক্ষীগণের স্বাক্ষর:
১. ____________________
২. ____________________

মুসাবিদাকারী: ...........................
`.trim();
  };

  const handleDraftGenerate = () => {
    if (!formData.sellerName || !formData.buyerName) {
      alert('অনুগ্রহ করে বিক্রেতা ও ক্রেতার নাম প্রদান করুন।');
      return;
    }
    const text = generateDraftText(selectedForDraft!, formData);
    setEditableDraft(text);
    setShowPreview(true);
  };

  const downloadAsPDF = async () => {
    if (!previewRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`${selectedForDraft?.title || 'deed'}_draft.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('পিডিএফ তৈরিতে সমস্যা হয়েছে। অনুগ্রহ করে প্রিন্ট অপশন ব্যবহার করুন।');
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadAsDOCX = () => {
    // Basic DOCX simulation using a Blob with application/msword type
    const header = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>${selectedForDraft?.title}</title></head>
      <body style="font-family: 'SolaimanLipi', Arial, sans-serif;">
        <div style="white-space: pre-wrap;">${editableDraft.replace(/\n/g, '<br>')}</div>
      </body>
      </html>
    `;
    const blob = new Blob(['\ufeff', header], {
      type: 'application/msword'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedForDraft?.title || 'deed'}_draft.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([editableDraft], {type: 'text/plain;charset=utf-8'});
    element.href = URL.createObjectURL(file);
    element.download = `${selectedForDraft?.title || 'deed'}_draft.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const Tooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block ml-2">
      <Info size={14} className="text-gray-400 cursor-help hover:text-emerald-500 transition-colors" />
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none w-48 text-center z-50 shadow-xl">
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in slide-in-from-bottom-6 duration-500 pb-20">
      {/* Header */}
      <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100">
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-20 h-20 bg-emerald-50 rounded-[2rem] flex items-center justify-center mb-6 text-emerald-600 shadow-inner">
            <ScrollText size={40} />
          </div>
          <h2 className="text-3xl font-black text-gray-800 mb-3 tracking-tight">আদর্শ দলীল ফরমেট লাইব্রেরি</h2>
          <p className="text-gray-500 max-w-lg font-medium">ভূমি সংক্রান্ত বিভিন্ন কাজের জন্য প্রয়োজনীয় দলীলের নমুনা ফরমেট ডাউনলোড করুন।</p>
        </div>

        {selectedForDraft ? (
          <div className="bg-gray-50 p-8 rounded-[2.5rem] border border-emerald-100 animate-in zoom-in duration-300 relative">
            <button 
              onClick={() => { setSelectedForDraft(null); setShowPreview(false); }}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-rose-500 transition-colors"
            >
              <X size={24} />
            </button>
            
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center">
                <FilePlus size={24} />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-800">খসড়া দলীল তৈরি করুন: {selectedForDraft.title}</h3>
                <p className="text-xs text-gray-500 font-medium">নিচের তথ্যগুলো পূরণ করে একটি প্রাথমিক খসড়া তৈরি করুন।</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Seller Info */}
              <div className="space-y-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-sm font-black text-emerald-800 uppercase tracking-widest flex items-center gap-2">
                  <User size={16} /> বিক্রেতার তথ্য (Seller Info)
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">নাম</label>
                    <input 
                      type="text" 
                      name="sellerName"
                      value={formData.sellerName}
                      onChange={handleInputChange}
                      placeholder="উদা: আব্দুল করিম"
                      className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">পিতার নাম</label>
                    <input 
                      type="text" 
                      name="sellerFather"
                      value={formData.sellerFather}
                      onChange={handleInputChange}
                      placeholder="পিতার নাম লিখুন"
                      className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">ঠিকানা</label>
                    <input 
                      type="text" 
                      name="sellerAddress"
                      value={formData.sellerAddress}
                      onChange={handleInputChange}
                      placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা"
                      className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700"
                    />
                  </div>
                </div>
              </div>

              {/* Buyer Info */}
              <div className="space-y-4 p-6 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <h4 className="text-sm font-black text-blue-800 uppercase tracking-widest flex items-center gap-2">
                  <User size={16} /> ক্রেতার তথ্য (Buyer Info)
                </h4>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">নাম</label>
                    <input 
                      type="text" 
                      name="buyerName"
                      value={formData.buyerName}
                      onChange={handleInputChange}
                      placeholder="উদা: রহিম উদ্দিন"
                      className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-blue-500 outline-none transition-all font-bold text-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">পিতার নাম</label>
                    <input 
                      type="text" 
                      name="buyerFather"
                      value={formData.buyerFather}
                      onChange={handleInputChange}
                      placeholder="পিতার নাম লিখুন"
                      className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-blue-500 outline-none transition-all font-bold text-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">ঠিকানা</label>
                    <input 
                      type="text" 
                      name="buyerAddress"
                      value={formData.buyerAddress}
                      onChange={handleInputChange}
                      placeholder="গ্রাম, ডাকঘর, উপজেলা, জেলা"
                      className="w-full px-5 py-3 bg-gray-50 border-2 border-transparent rounded-xl focus:border-blue-500 outline-none transition-all font-bold text-gray-700"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center">
                  জমির বিবরণ (Property Details)
                  <Tooltip text="মৌজা, খতিয়ান নম্বর, দাগ নম্বর এবং জমির পরিমাণ বিস্তারিত লিখুন।" />
                </label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-5 text-gray-400" size={18} />
                  <textarea 
                    name="propertyDetails"
                    value={formData.propertyDetails}
                    onChange={handleInputChange}
                    placeholder="মৌজা: ..., খতিয়ান: ..., দাগ: ..., পরিমাণ: ..."
                    className="w-full pl-12 pr-5 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm min-h-[100px]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center">
                  বিক্রয় মূল্য (Sale Price)
                  <Tooltip text="জমির মোট বিক্রয় মূল্য অংকে লিখুন।" />
                </label>
                <div className="relative">
                  <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="text" 
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="উদা: ৫,০০,০০০"
                    className="w-full pl-12 pr-5 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center">
                  সম্পাদনের তারিখ (Execution Date)
                  <Tooltip text="দলীলটি যেদিন রেজিস্ট্রি বা সম্পাদন করা হবে সেই তারিখ।" />
                </label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                  <input 
                    type="date" 
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full pl-12 pr-5 py-4 bg-white border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none transition-all font-bold text-gray-700 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-4">
              <button 
                onClick={handleDraftGenerate}
                className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black shadow-lg hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
              >
                খসড়া তৈরি করুন <FilePlus size={20} />
              </button>
              <button 
                onClick={() => { setSelectedForDraft(null); setShowPreview(false); }}
                className="px-8 py-4 bg-white border-2 border-gray-100 text-gray-500 rounded-2xl font-black hover:bg-gray-50 transition-all"
              >
                বাতিল
              </button>
            </div>

            {showPreview && (
              <div className="mt-12 p-10 bg-white rounded-[3rem] border-2 border-emerald-200 shadow-xl animate-in slide-in-from-top-4 duration-500">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                      <FileEdit size={20} />
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-gray-800">দলীলের খসড়া এডিটর</h4>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">আপনি সরাসরি এখানে এডিট করতে পারেন</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <div className="relative group/download">
                      <button 
                        className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all font-black text-xs uppercase shadow-lg shadow-emerald-100"
                      >
                        <Download size={18} /> ডাউনলোড করুন
                      </button>
                      <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden opacity-0 invisible group-hover/download:opacity-100 group-hover/download:visible transition-all z-50">
                        <button onClick={downloadAsPDF} disabled={isDownloading} className="w-full px-4 py-3 text-left text-xs font-bold text-gray-700 hover:bg-emerald-50 flex items-center gap-3">
                          <FileDown size={16} className="text-rose-500" /> {isDownloading ? 'তৈরি হচ্ছে...' : 'PDF হিসেবে ডাউনলোড'}
                        </button>
                        <button onClick={downloadAsDOCX} className="w-full px-4 py-3 text-left text-xs font-bold text-gray-700 hover:bg-emerald-50 flex items-center gap-3">
                          <FileText size={16} className="text-blue-500" /> DOCX হিসেবে ডাউনলোড
                        </button>
                        <button onClick={handleDownload} className="w-full px-4 py-3 text-left text-xs font-bold text-gray-700 hover:bg-emerald-50 flex items-center gap-3 border-t border-gray-50">
                          <ScrollText size={16} className="text-gray-400" /> টেক্সট ফাইল হিসেবে
                        </button>
                      </div>
                    </div>
                    <button 
                      onClick={() => window.print()}
                      className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-200 transition-all"
                      title="প্রিন্ট করুন"
                    >
                      <Printer size={20} />
                    </button>
                    <button 
                      onClick={() => setShowPreview(false)}
                      className="p-3 bg-rose-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>

                <div className="relative group">
                  <div 
                    ref={previewRef}
                    className="w-full min-h-[800px] p-16 font-serif text-gray-800 leading-relaxed text-lg bg-white border-2 border-gray-100 rounded-[2rem] outline-none focus:border-emerald-500 focus:bg-white transition-all shadow-inner relative overflow-hidden"
                  >
                    {/* Stamp Paper Effect Overlay */}
                    <div className="absolute top-0 left-0 w-full h-32 bg-amber-50/30 border-b border-amber-100 flex items-center justify-center opacity-50 pointer-events-none">
                      <div className="text-amber-800/20 font-black text-6xl uppercase tracking-[1em] rotate-12 select-none">
                        STAMP
                      </div>
                    </div>
                    
                    <textarea 
                      value={editableDraft}
                      onChange={(e) => setEditableDraft(e.target.value)}
                      className="w-full h-full min-h-[700px] bg-transparent border-none outline-none resize-none overflow-hidden relative z-10"
                      spellCheck={false}
                    />
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">এডিটেবল মোড</span>
                  </div>
                </div>
                
                <div className="mt-6 flex items-center justify-between px-4">
                  <p className="text-[11px] font-medium text-gray-400 italic">
                    * ডাউনলোড করার আগে আপনার প্রয়োজনীয় পরিবর্তনগুলো সম্পন্ন করুন।
                  </p>
                  <div className="flex items-center gap-2 text-emerald-600 font-black text-[11px] uppercase tracking-widest">
                    <Save size={14} /> অটো-সেভ সক্রিয়
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Land Area Calculator */}
            <div className="mb-12 bg-white p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                  <Scale size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-800">ভূমি পরিমাপ ক্যালকুলেটর</h3>
                  <p className="text-xs text-gray-500 font-medium">জমির পরিমাণ বিভিন্ন এককে রূপান্তর করুন।</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex gap-2 p-1 bg-gray-100 rounded-xl w-fit">
                    <button 
                      onClick={() => { setAreaUnit('sqft'); calculateArea(areaInput, 'sqft'); }}
                      className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${areaUnit === 'sqft' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      বর্গফুট (Sq. Ft)
                    </button>
                    <button 
                      onClick={() => { setAreaUnit('decimal'); calculateArea(areaInput, 'decimal'); }}
                      className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${areaUnit === 'decimal' ? 'bg-white text-emerald-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                      শতাংশ (Decimal)
                    </button>
                  </div>
                  <div className="relative">
                    <input 
                      type="number" 
                      value={areaInput}
                      onChange={(e) => { setAreaInput(e.target.value); calculateArea(e.target.value, areaUnit); }}
                      placeholder={areaUnit === 'sqft' ? "বর্গফুট লিখুন (উদা: ৭২০)" : "শতাংশ লিখুন (উদা: ১.৬৫)"}
                      className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-black text-xs uppercase">
                      {areaUnit === 'sqft' ? 'SQFT' : 'DEC'}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { label: 'শতাংশ', value: calculatedArea?.decimal || '০.০০', unit: 'শতাংশ' },
                    { label: 'কাঠা', value: calculatedArea?.katha || '০.০০', unit: 'কাঠা' },
                    { label: 'বিঘা', value: calculatedArea?.bigha || '০.০০', unit: 'বিঘা' },
                    { label: 'একর', value: calculatedArea?.acre || '০.০০', unit: 'একর' }
                  ].map((res, i) => (
                    <div key={i} className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex flex-col items-center justify-center text-center">
                      <p className="text-[10px] font-black text-emerald-800 uppercase tracking-widest mb-1">{res.label}</p>
                      <p className="text-lg font-black text-gray-800">{res.value}</p>
                      <p className="text-[8px] font-bold text-gray-400 uppercase">{res.unit}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {calculatedArea && (
                <div className="mt-6 flex justify-end">
                  <button 
                    onClick={() => {
                      const text = `${calculatedArea.decimal} শতাংশ (${calculatedArea.sqft} বর্গফুট), যা প্রায় ${calculatedArea.katha} কাঠা।`;
                      setFormData(prev => ({ ...prev, propertyDetails: prev.propertyDetails ? prev.propertyDetails + '\n' + text : text }));
                      alert('পরিমাপ দলীলের বিবরণে যোগ করা হয়েছে।');
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
                  >
                    <FilePlus size={14} /> দলীলে যোগ করুন
                  </button>
                </div>
              )}
            </div>

            <div className="relative max-w-xl mx-auto mb-12">
              <input 
                type="text" 
                placeholder="দলীল বা ফরমেট খুঁজুন..."
                className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-emerald-500 outline-none transition-all font-black text-lg text-gray-700 shadow-sm pr-32"
              />
              <button className="absolute right-2 top-2 bottom-2 px-8 bg-emerald-600 text-white font-black rounded-xl hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-2">
                খুঁজুন <Search size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {formats.map((format) => (
                <div key={format.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <FileText size={28} />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${format.type === 'PDF' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'}`}>
                      {format.type}
                    </span>
                  </div>
                  <h4 className="text-lg font-black text-gray-800 mb-2">{format.title}</h4>
                  <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">{format.desc}</p>
                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-50">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{format.size}</span>
                      <button className="flex items-center gap-2 text-emerald-600 font-black text-xs hover:underline">
                        ডাউনলোড <Download size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => setSelectedForDraft(format)}
                      className="w-full py-2 bg-emerald-50 text-emerald-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      খসড়া তৈরি করুন
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-emerald-900 rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
              <ShieldCheck size={28} className="text-emerald-400" /> আইনি বৈধতা
            </h3>
            <p className="text-sm font-medium text-emerald-100/80 leading-relaxed mb-6">
              এখানে দেওয়া সকল ফরমেট ভূমি মন্ত্রণালয়ের সর্বশেষ পরিপত্র ও আইন অনুযায়ী তৈরি করা হয়েছে। তবে বিশেষ ক্ষেত্রে আইনজীবীর পরামর্শ নেওয়া বাঞ্ছনীয়।
            </p>
            <button className="flex items-center gap-2 text-emerald-300 font-black text-xs hover:underline">
              আইনি নির্দেশিকা দেখুন <ArrowRight size={14} />
            </button>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
        </div>

        <div className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-sm flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
              <FilePlus size={24} />
            </div>
            <div>
              <h4 className="font-black text-gray-800">কাস্টম ফরমেট প্রয়োজন?</h4>
              <p className="text-xs text-gray-500 font-medium">আমাদের এআই সহকারীকে বলুন আপনার কী ধরনের দলীল প্রয়োজন।</p>
            </div>
          </div>
          <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg">
            এআই সহকারীকে জিজ্ঞাসা করুন
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeedFormats;
