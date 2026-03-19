
import React, { useState } from 'react';
import { 
  Landmark, 
  Info, 
  CheckCircle2, 
  Download, 
  BookOpen, 
  FileText, 
  ChevronDown, 
  Search, 
  Droplets, 
  Store, 
  Waves, 
  Truck, 
  MapPin, 
  ClipboardList,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Trees,
  Building2,
  ScrollText,
  Zap,
  Scale,
  ExternalLink
} from 'lucide-react';

const SairatMahal: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'info' | 'forms' | 'checklist' | 'registers' | 'laws' | 'process' | 'search'>('info');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedMahalType, setSelectedMahalType] = useState('All');

  const mockMahals = [
    { id: 'SM-001', name: 'সাভার কাঁচাবাজার', type: 'হাট-বাজার', location: 'সাভার, ঢাকা', area: '২.৫ একর', status: 'ইজারাধীন', value: '৳ ৫,৫০,০০০' },
    { id: 'SM-002', name: 'তুরাগ নদী বালুমহাল', type: 'বালু মহাল', location: 'কালিয়াকৈর, গাজীপুর', area: '১৫ একর', status: 'উন্মুক্ত', value: '৳ ১২,০০,০০০' },
    { id: 'SM-003', name: 'চলন বিল জলমহাল', type: 'জলমহাল', location: 'সিংড়া, নাটোর', area: '৫০০ একর', status: 'ইজারাধীন', value: '৳ ২৫,০০,০০০' },
    { id: 'SM-004', name: 'জাফলং পাথর মহাল', type: 'পাথর মহাল', location: 'গোয়াইনঘাট, সিলেট', area: '৫০ একর', status: 'স্থগিত', value: 'N/A' },
    { id: 'SM-005', name: 'বগুড়া মহাস্থান হাট', type: 'হাট-বাজার', location: 'শিবগঞ্জ, বগুড়া', area: '৪.০ একর', status: 'ইজারাধীন', value: '৳ ৮,২০,০০০' },
    { id: 'SM-006', name: 'হাকালুকি হাওর জলমহাল', type: 'জলমহাল', location: 'কুলাউড়া, মৌলভীবাজার', area: '১২০০ একর', status: 'ইজারাধীন', value: '৳ ৪০,০০,০০০' },
  ];

  const filteredMahals = mockMahals.filter(mahal => {
    const matchesSearch = mahal.name.includes(searchQuery) || mahal.location.includes(searchQuery);
    const matchesType = selectedMahalType === 'All' || mahal.type === selectedMahalType;
    return matchesSearch && matchesType;
  });

  const typeDetails: Record<string, { title: string, content: string, points: string[], icon: any }> = {
    'জলমহাল': {
      title: 'জলমহাল ব্যবস্থাপনা',
      icon: Droplets,
      content: 'সরকারের মালিকানাধীন নদী, খাল, বিল, হাওর, বাওর এবং পুকুর যা থেকে মৎস্য আহরণ করা হয়।',
      points: [
        '২০ একরের ঊর্ধ্বের বদ্ধ জলমহাল এবং সকল উন্মুক্ত জলমহাল জেলা প্রশাসন নিয়ন্ত্রণ করে।',
        'ইজারা মেয়াদ সাধারণত ৩ বছর (বদ্ধ) বা ৬ বছর (উন্মুক্ত)।',
        'নিবন্ধিত মৎস্যজীবী সমবায় সমিতিকে অগ্রাধিকার প্রদান করা হয়।',
        'উন্নয়ন প্রকল্পের অধীনে জলমহাল থাকলে তার জন্য বিশেষ নীতিমালা প্রযোজ্য।'
      ]
    },
    'হাট-বাজার': {
      title: 'হাট-বাজার ব্যবস্থাপনা',
      icon: Store,
      content: 'গ্রামীণ ও শহর এলাকার নির্ধারিত স্থান যেখানে পণ্য ক্রয়-বিক্রয় হয়।',
      points: [
        'হাট-বাজারের পেরিফেরি (সীমানা) জেলা প্রশাসক কর্তৃক নির্ধারিত হয়।',
        'চান্দিনাভিটি (স্থায়ী দোকান) একসনা লিজ বা লাইসেন্স প্রদান করা হয়।',
        'বাৎসরিক ইজারা বাংলা সনের শুরুতে প্রদান করা হয়।',
        'তোল (ট্যাক্স) আদায়ের হার সরকার কর্তৃক নির্ধারিত তালিকার বাইরে নেওয়া দণ্ডনীয় অপরাধ।'
      ]
    },
    'বালু মহাল': {
      title: 'বালু মহাল ব্যবস্থাপনা',
      icon: Waves,
      content: 'নদী বা অন্য স্থান থেকে বালু উত্তোলনের জন্য নির্ধারিত এলাকা।',
      points: [
        'বালুমহাল ও মাটি ব্যবস্থাপনা আইন, ২০১০ অনুযায়ী পরিচালিত হয়।',
        'পরিবেশগত ছাড়পত্র এবং ভূতাত্ত্বিক জরিপ প্রতিবেদন বাধ্যতামূলক।',
        'সেতু, কালভার্ট বা গুরুত্বপূর্ণ স্থাপনার ১ কিলোমিটারের মধ্যে বালু উত্তোলন নিষিদ্ধ।',
        'নির্ধারিত গভীরতার বেশি বালু উত্তোলন করলে ইজারা বাতিলযোগ্য।'
      ]
    },
    'পাথর মহাল': {
      title: 'পাথর মহাল ব্যবস্থাপনা',
      icon: Landmark,
      content: 'নদী বা পাহাড়ী এলাকা থেকে পাথর সংগ্রহের নির্ধারিত মহাল।',
      points: [
        'খনিজ সম্পদ মন্ত্রণালয় এবং ভূমি মন্ত্রণালয়ের যৌথ নির্দেশনায় পরিচালিত হয়।',
        'পরিবেশের ভারসাম্য রক্ষা করে পাথর উত্তোলনের শর্ত থাকে।',
        'ইজারা গ্রহীতাকে নির্ধারিত রয়্যালটি সরকারি কোষাগারে জমা দিতে হয়।',
        'অবৈধ পাথর উত্তোলন রোধে টাস্কফোর্স নিয়মিত অভিযান পরিচালনা করে।'
      ]
    },
    'বাঁশ মহাল': {
      title: 'বাঁশ মহাল ব্যবস্থাপনা',
      icon: Trees,
      content: 'সরকারি ভূমিতে অবস্থিত প্রাকৃতিকভাবে জন্মানো বা সৃজিত বাঁশ বাগান।',
      points: [
        'সাধারণত বন বিভাগ বা জেলা প্রশাসন কর্তৃক ইজারা দেওয়া হয়।',
        'বাঁশ কাটার ক্ষেত্রে নির্দিষ্ট বয়স এবং সময়সীমা মেনে চলতে হয়।',
        'মহালের সীমানা রক্ষা এবং নতুন চারা রোপণের দায়িত্ব ইজারা গ্রহীতার।',
        'বন্যপ্রাণীর আবাসস্থল ক্ষতিগ্রস্ত হয় এমন স্থানে বাঁশ কাটা নিষিদ্ধ।'
      ]
    },
    'ফেরীঘাট': {
      title: 'ফেরীঘাট ব্যবস্থাপনা',
      icon: Truck,
      content: 'নদী পারাপারের জন্য নির্ধারিত ঘাট যেখানে নৌকা বা ফেরী চলাচল করে।',
      points: [
        'ইজারা গ্রহীতাকে "পাটনী" বলা হয় এবং তিনি যাত্রী পারাপারে টোল আদায় করেন।',
        'যাত্রীদের নিরাপত্তা নিশ্চিত করা এবং লাইফ জ্যাকেটের ব্যবস্থা রাখা বাধ্যতামূলক।',
        'নির্ধারিত ভাড়ার তালিকা ঘাটে দৃশ্যমান স্থানে টাঙিয়ে রাখতে হয়।',
        'প্রতিবন্ধী, মুক্তিযোদ্ধা এবং শিক্ষার্থীদের জন্য বিশেষ সুবিধা বা ছাড় থাকতে পারে।'
      ]
    },
    'রাস্তা সংলগ্ন': {
      title: 'রাস্তা সংলগ্ন ভূমি ব্যবস্থাপনা',
      icon: MapPin,
      content: 'সড়ক ও জনপথ বা জেলা পরিষদের রাস্তার পাশের সরকারি খালি জায়গা।',
      points: [
        'অস্থায়ী দোকান বা স্টল স্থাপনের জন্য একসনা লিজ প্রদান করা হয়।',
        'রাস্তার যান চলাচলে বিঘ্ন ঘটে এমন কোনো স্থাপনা তৈরি করা যাবে না।',
        'লিজ গ্রহীতা কোনো স্থায়ী পাকা স্থাপনা নির্মাণ করতে পারবেন না।',
        'সরকারের প্রয়োজনে যেকোনো সময় লিজ বাতিল করে জমি বুঝে নেওয়া যায়।'
      ]
    },
    'কাছারি প্রাঙ্গন': {
      title: 'কাছারি প্রাঙ্গন ব্যবস্থাপনা',
      icon: Building2,
      content: 'উপজেলা বা ইউনিয়ন ভূমি অফিসের চারপাশের সরকারি খালি জায়গা।',
      points: [
        'অফিসের স্বাভাবিক কাজ ব্যাহত না করে মেলা বা প্রদর্শনীতে ভাড়া দেওয়া যায়।',
        'অস্থায়ী ব্যবহারের জন্য দৈনিক বা সাপ্তাহিক ভিত্তিতে ফি নির্ধারণ করা হয়।',
        'প্রাঙ্গনের পরিষ্কার-পরিচ্ছন্নতা এবং নিরাপত্তা বজায় রাখা ব্যবহারকারীর দায়িত্ব।',
        'রাজনৈতিক বা বিতর্কিত কোনো কর্মসূচির জন্য কাছারি প্রাঙ্গন ব্যবহার নিষিদ্ধ।'
      ]
    }
  };

  const laws = [
    { 
      title: 'হাট ও বাজার (স্থাপন ও ব্যবস্থাপনা) আইন, ২০২৩', 
      desc: '১৯৫৯ সালের অধ্যাদেশ রহিত করে নতুন আইন প্রণয়ন করা হয়েছে। এতে হাট-বাজারের পেরিফেরি নির্ধারণ, অবৈধ দখল উচ্ছেদ এবং জেল-জরিমানার কঠোর বিধান রাখা হয়েছে।',
      points: [
        'জেলা প্রশাসক কর্তৃক হাট-বাজারের পেরিফেরি (সীমানা) নির্ধারণ।',
        'অবৈধ দখলদারদের ৫ লাখ টাকা পর্যন্ত জরিমানা বা ১ বছরের কারাদণ্ড।',
        'চান্দিনা ভিটি লিজ এবং স্থায়ী দোকান বরাদ্দের আধুনিক নিয়মাবলী।',
        'হাট-বাজারের আয় থেকে রক্ষণাবেক্ষণ ও উন্নয়নের জন্য নির্দিষ্ট অংশ বরাদ্দ।'
      ]
    },
    { 
      title: 'সরকারি জলমহাল ব্যবস্থাপনা নীতি, ২০০৯', 
      desc: 'জলমহাল ইজারা প্রদানের ক্ষেত্রে প্রকৃত মৎস্যজীবী সমবায় সমিতিকে অগ্রাধিকার প্রদানের মাধ্যমে তাদের জীবিকা সুরক্ষা নিশ্চিত করা হয়েছে।',
      points: [
        '২০ একরের কম জলমহাল উপজেলা এবং ২০ একরের বেশি জেলা প্রশাসন কর্তৃক ইজারা।',
        'বদ্ধ জলমহাল ৩ বছর এবং উন্মুক্ত জলমহাল ৬ বছরের জন্য ইজারা প্রদান।',
        'মৎস্যজীবীদের অধিকার রক্ষায় ইজারা মূল্যের কিস্তি নির্ধারণ।',
        'নিষিদ্ধ জাল ব্যবহার এবং প্রজনন মৌসুমে মাছ ধরা রোধে কঠোর নজরদারি।'
      ]
    },
    { 
      title: 'বালুমহাল ও মাটি ব্যবস্থাপনা আইন, ২০১০', 
      desc: 'পরিবেশ রক্ষায় এবং অবকাঠামোর ক্ষতি রোধে বালু উত্তোলন ও মাটি কাটার ক্ষেত্রে কঠোর বিধিনিষেধ আরোপ করা হয়েছে।',
      points: [
        'সেতু, কালভার্ট বা বাঁধের ১ কিলোমিটারের মধ্যে বালু উত্তোলন নিষিদ্ধ।',
        'বালু উত্তোলনের জন্য পরিবেশগত প্রভাব নিরূপণ (EIA) রিপোর্ট বাধ্যতামূলক।',
        'অবৈধ বালু উত্তোলনকারীর যন্ত্রপাতি জব্দ ও নিলাম করার ক্ষমতা।',
        'নির্ধারিত গভীরতার বেশি বালু উত্তোলন করলে ইজারা বাতিল ও জরিমানা।'
      ]
    },
    { 
      title: 'সরকারি পাওনা (আদায়) আইন, ১৯১৩', 
      desc: 'ইজারা মূল্য বা অন্য কোনো সরকারি বকেয়া আদায়ের জন্য সার্টিফিকেট মামলার মাধ্যমে আইনি প্রক্রিয়া পরিচালনার বিধান।',
      points: [
        'বকেয়া আদায়ের জন্য সার্টিফিকেট অফিসার কর্তৃক নোটিশ জারি।',
        'স্থাবর ও অস্থাবর সম্পত্তি ক্রোক ও বিক্রয়ের মাধ্যমে পাওনা আদায়।',
        'বকেয়া পরিশোধ না করলে দেওয়ানী কারাদণ্ডের বিধান।',
        'পাবলিক ডিমান্ড রিকভারি (PDR) অ্যাক্ট অনুযায়ী দ্রুত আদায়ের ব্যবস্থা।'
      ]
    },
    { 
      title: 'ভূমি ব্যবস্থাপনা ম্যানুয়াল, ১৯৯০', 
      desc: 'সায়রাত মহালসহ সকল সরকারি ভূমি ব্যবস্থাপনার বিস্তারিত নির্দেশিকা যা মাঠ পর্যায়ের কর্মকর্তাদের জন্য গাইডলাইন হিসেবে কাজ করে।',
      points: [
        'খাস জমি ও সায়রাত মহাল চিহ্নিতকরণের পদ্ধতি।',
        'ইজারা নথি সংরক্ষণ এবং রেজিষ্টার হালনাগাদ করার নিয়ম।',
        'তহশীলদার ও এসি ল্যান্ডের দায়িত্ব ও কর্তব্য নির্ধারণ।',
        'ভূমি কর ও বিবিধ কর আদায়ের প্রশাসনিক প্রক্রিয়া।'
      ]
    }
  ];

  const processes = [
    { step: '১. বিজ্ঞপ্তি প্রকাশ', desc: 'সংশ্লিষ্ট সায়রাত মহাল ইজারার জন্য বহুল প্রচারিত পত্রিকায় এবং নোটিশ বোর্ডে বিজ্ঞপ্তি প্রকাশ করা হয়।' },
    { step: '২. দরপত্র দাখিল', desc: 'আগ্রহী ব্যক্তি বা সমিতি নির্ধারিত ফরমে প্রয়োজনীয় জামানতসহ দরপত্র দাখিল করেন।' },
    { step: '৩. দরপত্র যাচাই', desc: 'উপজেলা বা জেলা দরপত্র কমিটি প্রাপ্ত দরপত্রসমূহ যাচাই-বাছাই করে সর্বোচ্চ দরদাতাকে নির্বাচন করেন।' },
    { step: '৪. অনুমোদন', desc: 'নির্বাচিত দরদাতার অনুকূলে যথাযথ কর্তৃপক্ষ (এসি ল্যান্ড/ইউএনও/ডিসি) ইজারা অনুমোদন করেন।' },
    { step: '৫. চুক্তিনামা ও দখল', desc: 'ইজারা মূল্য পরিশোধ সাপেক্ষে চুক্তিনামা সম্পাদিত হয় এবং মহালের দখল হস্তান্তর করা হয়।' }
  ];

  const forms = [
    { id: '5.1', title: 'হাটবাজারের চান্দিনাভিটি একসনা লিজ বা ব্যবহারের অনুমতি প্রদান', link: '#' },
    { id: '5.2', title: 'হাঠবাজারের চান্দিনাভিটি ব্যবহারের লাইসেন্স নবায়ন', link: '#' },
    { id: '5.3', title: 'হাটবাজারের চান্দিনাভিটি লিজ গ্রহীতা বা ব্যবহারের অনুমোদন গ্রহীতার নাম পরিবর্তনসহ নবায়ন', link: '#' },
    { id: '5.4', title: 'হাটবাজার বাৎসরিক ইজারা প্রদান (পৌরসভাসিটি কর্পোরেশন নিয়ন্ত্রিত হাটবাজার ব্যতিত)', link: '#' },
    { id: '5.5', title: 'সরকারি জলমহাল ইজারা প্রদান ব্যবস্থাপনা', link: '#' },
  ];

  const checklist = [
    'সায়রাত মহালটি রেজিষ্টার ভূক্ত কিনা।',
    'সায়রাত মহালের কোন অংশের কোন শ্রেনীর পরিবর্তন হয়েছে কিনা।',
    'শ্রেণী পরিবর্তনের প্রস্তাব উর্ধবতন কর্তৃপক্ষের বিবেচনাধীন আছে কিনা।',
    'মহালের উপর কোন স্বত্ব মামলা আছে কিনা।',
    'আদালতের নিষেধাজ্ঞা আছে কিনা।',
    'কমিশনারের কোন নিষেধাজ্ঞা আছে কিনা।',
    'মহালটি সংশ্লিষ্ট বাংলা সনের জন্য ইজারার উপযোগী কিনা।',
    'ইজারা বন্দোবস্তের কোন প্রস্তাব মন্ত্রনালয়ে বিবেচনাধীন আছে কিনা।',
    'ভূমি মন্ত্রণালয়, ভূমি আপীল বোর্ড, ভূমি সংস্কার বোর্ডের কোন আপত্তি/নিষেধাজ্ঞা আছে কিনা।',
    'জলমহাল হইলে উহা আবদ্ধ কিনা।',
    'জনগণের কোন প্রথাগত অধিকার আছে কিনা।',
    'সায়রাত মহাল ইজারা দেওয়া হইলে পরিবেশগত কোন বাধার সৃষ্টি হইবে কিনা।',
    'ভূমি মন্ত্রণালয় ব্যতীত অন্য কোন মন্ত্রণালয়ের উপর ন্যস্ত আছে কিনা।',
    'উপজেলা পরিষোদের নিয়ন্ত্রনাধীন কিনা।',
    'মহালের আওতাধীন কোন ব্যক্তিমালিকানাধীন ভূমি আছে কিনা।',
    'নিলাম ডাকের সময়সূচির যথাযথভাবে প্রচারিত হইয়াছে কিনা ও পরিবর্তিত হইলে তাহা প্রচারিত হইয়াছে কিনা।',
    'হাট-বাজার হইলে তার পেরীফেরী হালনাগাদ নির্ধারিত কিনা।',
    'ফেরীঘাট/অন্য কোন সায়রাত মহাল দুই বা ততোধিক জেলা সীমানার মধ্যে অবস্থিত কিনা।',
    'প্রাক্তন ইজারা গ্রহীতা ইজারা নেওয়ার প্রার্থী হইলে তাহার পূর্ববর্তী বৎসরের আচরণ যথাযথ ছিল কিনা।',
    'ফেরীঘাটের ইজারা বন্দোবস্তের ক্ষেত্রে পাটনীর প্রাধিকার বিবেচনায় আনয়ন করা হইয়াছে কিনা।',
    'বালু মহাল হইলে তাহা যথাযথ কর্তৃপক্ষের অনুমোদন আছে কিনা।',
    'ডাকমূল্য যথাযথ কিনা।',
    'টেন্ডার কমিটি কর্তৃক ডাকমূল্য গৃহীত কিনা।',
    'কমিশনারের অনুমোদন পাওয় গিয়াছে কিনা।',
    'বাজারের ক্ষেত্রে তোলার হার নির্ধারিত হইয়াছে কিনা।',
    'চুক্তিনামা সম্পাদিত হইয়াছে কিনা।',
    'জনসাধারণের বর্তস্বত্ব (পাবলিক ইজমেস্ট রাইট) খর্ব হয় কিনা দেখা।'
  ];

  const registers = [
    { id: 1, name: 'জমাবন্দী রেজিষ্টার', desc: 'এতে ভূমি মালিকের নাম, জমির পরিমান, জমির শ্রেণী ইত্যাদি বিবরণ লিপিবদ্ধ থাকে।' },
    { id: 2, name: 'তলববাকী রেজিষ্টার', desc: 'ভূমি মালিকদের রেজিষ্টার। বাংলাদেশ ফরম নং ১০৫৯- তে রেজিষ্টার মৌজা ওয়ারী সংরক্ষন করা হয়।' },
    { id: 3, name: 'দৈনন্দিন আদায় রেজিষ্টার', desc: 'ইউনিয়ন ভূমি সহকারী কর্মকর্তার (তহশীলদার) আদায় রেজিষ্টার। ফরম নং ১০৬২।' },
    { id: 4, name: 'ক্যাশ বই', desc: 'বাংলাদেশ ফরম নং ৩৭৬ এ সংরক্ষন করতে হবে। প্রত্যেক জমা ও খরচের বিবরণী এতে লিপিবদ্ধ করতে হয়।' },
    { id: 5, name: 'ট্রেজারী পাশ বই', desc: 'বাংলাদেশ ফরম নং ১০৭০ এ সংরক্ষন করতে হয়।' },
    { id: 6, name: 'বিবিধ দাবী রেজিষ্টার', desc: 'আবর্তক ধরনের বিবিধ দাবী যথা চারণ অধিকার, বনজদ্রব্য সামগ্রীর লীজ (বাঁশ মহাল), ফেরীঘাট ইজারা ইত্যাদির জন্য ব্যবহৃত হয়। ফরম নং ১০৭১।' },
    { id: 7, name: 'বিবিধ পাওনা রেজিষ্টার', desc: 'ভূমি উন্নয়ন কর ও সুদ ব্যতীত সরকারের অন্যান্য সকল প্রকার পাওনার জন্য ব্যবহৃত হয়। ফরম নং ১০৭১-ক।' },
    { id: 8, name: 'খাস জমি রেজিষ্টার', desc: 'বাংলাদেশ ফরম নং ১০৭২-এ তা সংরক্ষণ করা হয়।' },
    { id: 9, name: 'নামজারী রেজিস্টার', desc: 'বাংলাদেশ ফরম নং ১০৭৩ এ সংরক্ষণ করতে হয়। এটি দুটি অংশে সংরক্ষণ করা হয় (উত্তরাধিকার ও হস্তান্তর নোটিশ)।' },
    { id: 10, name: 'মেয়াদী লীজ রেজিষ্টার', desc: '১০৭৪ নং ফরমে এ রেজিষ্টার সংরক্ষণ করা হয়।' },
    { id: 11, name: 'মওকুফ রেজিষ্টার', desc: 'ভূমি উন্নয়ন কর মওকুফ বা কমানো সংক্রান্ত রেজিষ্টার।' },
    { id: 12, name: 'খাস জমি বন্দোবস্ত রেজিষ্টার', desc: 'বাংলাদেশ ফরম নং ১০৫৬ তে এ রেজিষ্টার সংরক্ষণ করা হয়।' },
    { id: 13, name: 'বিবিধ আবেদন রেজিষ্টার', desc: 'যে সকল দরখাস্তের জন্য কোনো রেজিষ্টার নির্দিষ্ট করা হয়নি। ফরম নং ১১৫২-ক।' },
    { id: 14, name: 'তদন্ত রেজিষ্টার', desc: 'স্থানীয় তদন্তের জন্য প্রেরিত আবেদন বা অন্য কাগজপত্র ট্র্যাকিংয়ের জন্য। ফরম নং ১১৫২-ক।' },
    { id: 17, name: 'চালান রেজিষ্টার', desc: 'কালেক্টরের অফিসে সংরক্ষণ করা হয়।' },
    { id: 26, name: 'পরিদর্শন রেজিষ্টার', desc: 'প্রত্যেক ইউনিয়ন বা উপজেলা ভূমি অফিসে সংরক্ষণ করা হয়।' },
    { id: 32, name: 'জামানত রেজিষ্টার', desc: 'জামানত সংক্রান্ত তথ্য সংরক্ষণের জন্য।' },
    { id: 71, name: 'ফরম সরবরাহ রেজিষ্টার', desc: 'মুদ্রিত ফরম সরবরাহ ও প্রাপ্তির বিবরণী লিপিবদ্ধ করার জন্য।' },
    { id: 94, name: 'চেক বই রেজিষ্টার', desc: 'সরবরাহকৃত চেক বই, আর আর ও ডিসি আর ইত্যাদি হিসাব সংরক্ষণের জন্য।' },
    { id: '৯ (সার্টিফিকেট)', name: 'সার্টিফিকেট কেস রেজিষ্টার', desc: 'বাংলাদেশ ফরম নং ১০২৩ এ সংরক্ষণ করা হয়।' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700 pb-20">
      {/* Hero Section */}
      <div className="relative h-80 rounded-[3rem] overflow-hidden shadow-2xl">
        <img 
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop" 
          alt="Sairat Mahal" 
          className="w-full h-full object-cover brightness-[0.3]" 
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
          <div className="bg-emerald-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
            <Landmark size={16} className="text-emerald-300" />
            <span className="text-white text-xs font-black uppercase tracking-[0.2em]">সরকারি সম্পত্তি ব্যবস্থাপনা</span>
          </div>
          <h2 className="text-5xl font-black text-white mb-4 tracking-tighter">সায়রাত মহাল (Sairat Mahal)</h2>
          <p className="text-emerald-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90">
            ভূমি কর ব্যতীত অন্যান্য বিবিধ কর আদায়যোগ্য সরকারি ভূ-সম্পত্তি ব্যবস্থাপনা।
          </p>
        </div>
      </div>

      {/* Definition Section */}
      <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-10 items-center">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center shrink-0 shadow-inner">
            <Info size={48} />
          </div>
          <div className="space-y-4">
            <h3 className="text-2xl font-black text-gray-800">সায়রাত মহাল বলতে কি বোঝায়?</h3>
            <p className="text-gray-600 font-medium leading-relaxed text-lg italic">
              "সায়রাত মহাল শব্দের অর্থ ভূমি কর ব্যতীত অন্যান্য বিবিধ কর এবং মহাল শব্দের অর্থ সম্পত্তি। সায়রাত মহাল শব্দের অর্থ দাঁড়ায় বিবিধ করভূক্ত সম্পত্তি। সরকারের যে সমস্ত ভূ-সম্পত্তি হইতে ভূমি কর ব্যতীত অন্যান্য বিবিধ কর আদায় করা হয় সেইগুলিকে সায়রাত মহাল বলা হয়।"
            </p>
          </div>
        </div>
      </div>

      {/* Examples Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {[
          { icon: Droplets, label: 'জলমহাল' },
          { icon: Store, label: 'হাট-বাজার' },
          { icon: Waves, label: 'বালু মহাল' },
          { icon: Landmark, label: 'পাথর মহাল' },
          { icon: Trees, label: 'বাঁশ মহাল' },
          { icon: Truck, label: 'ফেরীঘাট' },
          { icon: MapPin, label: 'রাস্তা সংলগ্ন' },
          { icon: Building2, label: 'কাছারি প্রাঙ্গন' }
        ].map((item, i) => (
          <button 
            key={i} 
            onClick={() => setSelectedType(item.label)}
            className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 text-center group ${
              selectedType === item.label 
                ? 'bg-emerald-600 border-emerald-600 shadow-lg scale-105' 
                : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
              selectedType === item.label ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'
            }`}>
              <item.icon size={20} />
            </div>
            <span className={`text-xs font-black ${selectedType === item.label ? 'text-white' : 'text-gray-700'}`}>
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Detailed View for Selected Type */}
      {selectedType && typeDetails[selectedType] && (
        <div className="bg-white p-10 rounded-[3rem] shadow-xl border border-emerald-100 animate-in zoom-in-95 duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 opacity-50" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                  {React.createElement(typeDetails[selectedType].icon, { size: 32 })}
                </div>
                <div>
                  <h3 className="text-3xl font-black text-gray-800 tracking-tight">{typeDetails[selectedType].title}</h3>
                  <p className="text-emerald-600 font-bold">{selectedType} সংক্রান্ত বিস্তারিত তথ্য</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedType(null)}
                className="p-3 bg-gray-100 text-gray-400 rounded-full hover:bg-rose-50 hover:text-rose-500 transition-all"
              >
                <AlertCircle size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="p-6 bg-gray-50 rounded-[2rem] border border-gray-100">
                  <h4 className="text-lg font-black text-gray-800 mb-3 flex items-center gap-2">
                    <Info size={20} className="text-emerald-600" /> পরিচিতি
                  </h4>
                  <p className="text-gray-600 font-medium leading-relaxed">
                    {typeDetails[selectedType].content}
                  </p>
                </div>
                
                <div className="flex gap-4">
                  <button className="flex-1 py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-900/20 flex items-center justify-center gap-2">
                    <Download size={18} /> নীতিমালা ডাউনলোড
                  </button>
                  <button className="flex-1 py-4 bg-white text-emerald-600 border-2 border-emerald-600 rounded-2xl font-black hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
                    <FileText size={18} /> আবেদন ফরম
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-lg font-black text-gray-800 flex items-center gap-2">
                  <CheckCircle2 size={20} className="text-emerald-600" /> প্রধান নির্দেশনাবলী
                </h4>
                <div className="space-y-3">
                  {typeDetails[selectedType].points.map((point, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                      <div className="w-6 h-6 bg-white text-emerald-600 rounded-full flex items-center justify-center shrink-0 mt-0.5 font-black text-xs shadow-sm">
                        {i + 1}
                      </div>
                      <p className="text-sm font-bold text-emerald-900 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tabs Navigation */}
      <div className="flex flex-wrap gap-4 p-2 bg-gray-100 rounded-[2rem] w-fit mx-auto">
        {[
          { id: 'info', label: 'সাধারণ তথ্য', icon: BookOpen },
          { id: 'search', label: 'মহাল অনুসন্ধান', icon: Search },
          { id: 'process', label: 'ইজারা প্রক্রিয়া', icon: Zap },
          { id: 'forms', label: 'ফরম ডাউনলোড', icon: Download },
          { id: 'checklist', label: 'ইজারা চেকলিস্ট', icon: ClipboardList },
          { id: 'registers', label: 'রেজিষ্টারসমূহ', icon: ScrollText },
          { id: 'laws', label: 'আইন ও বিধিমালা', icon: Scale }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-6 py-3 rounded-2xl font-black text-sm flex items-center gap-2 transition-all ${
              activeTab === tab.id 
                ? 'bg-white text-emerald-600 shadow-md scale-105' 
                : 'text-gray-500 hover:text-gray-800'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in slide-in-from-top-4 duration-500">
        {activeTab === 'info' && (
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                <HelpCircle size={24} />
              </div>
              <h3 className="text-2xl font-black text-gray-800">সায়রাত মহাল ব্যবস্থাপনা</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-black text-emerald-700 flex items-center gap-2">
                  <ShieldCheck size={20} /> ইজারা নীতি
                </h4>
                <p className="text-gray-600 font-medium leading-relaxed">
                  সায়রাত মহালসমূহ সাধারণত বাৎসরিক ইজারা বা বন্দোবস্তের মাধ্যমে ব্যবস্থাপনা করা হয়। জলমহাল, হাট-বাজার এবং বালু মহালের জন্য নির্দিষ্ট সরকারি নীতিমালা অনুসরণ করা হয়।
                </p>
              </div>
              <div className="space-y-4">
                <h4 className="font-black text-emerald-700 flex items-center gap-2">
                  <AlertCircle size={20} /> পরিবেশগত সুরক্ষা
                </h4>
                <p className="text-gray-600 font-medium leading-relaxed">
                  বালু মহাল বা পাথর মহাল ইজারা দেওয়ার ক্ষেত্রে পরিবেশগত প্রভাব নিরূপণ (EIA) এবং যথাযথ কর্তৃপক্ষের অনাপত্তি সনদ গ্রহণ বাধ্যতামূলক।
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'search' && (
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-2 relative">
                  <input 
                    type="text" 
                    placeholder="মহালের নাম বা অবস্থান দিয়ে খুঁজুন..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none font-bold"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                </div>
                <select 
                  value={selectedMahalType}
                  onChange={(e) => setSelectedMahalType(e.target.value)}
                  className="px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:border-emerald-500 outline-none font-bold appearance-none"
                >
                  <option value="All">সকল প্রকার মহাল</option>
                  <option value="হাট-বাজার">হাট-বাজার</option>
                  <option value="জলমহাল">জলমহাল</option>
                  <option value="বালু মহাল">বালু মহাল</option>
                  <option value="পাথর মহাল">পাথর মহাল</option>
                </select>
                <button className="bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all flex items-center justify-center gap-2">
                  <Search size={20} /> অনুসন্ধান
                </button>
              </div>
            </div>

            <div className="bg-white rounded-[3rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">আইডি ও নাম</th>
                      <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">ধরণ</th>
                      <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">অবস্থান</th>
                      <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">পরিমাণ</th>
                      <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">অবস্থা</th>
                      <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">ইজারা মূল্য</th>
                      <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">অ্যাকশন</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredMahals.map((mahal) => (
                      <tr key={mahal.id} className="hover:bg-emerald-50/30 transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex flex-col">
                            <span className="text-[10px] font-black text-emerald-600 mb-1">{mahal.id}</span>
                            <span className="text-sm font-black text-gray-800">{mahal.name}</span>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-black">{mahal.type}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-2 text-sm font-bold text-gray-500">
                            <MapPin size={14} className="text-emerald-500" /> {mahal.location}
                          </div>
                        </td>
                        <td className="px-8 py-6 text-sm font-bold text-gray-600">{mahal.area}</td>
                        <td className="px-8 py-6">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black ${
                            mahal.status === 'ইজারাধীন' ? 'bg-emerald-100 text-emerald-700' : 
                            mahal.status === 'উন্মুক্ত' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'
                          }`}>
                            {mahal.status}
                          </span>
                        </td>
                        <td className="px-8 py-6 text-sm font-black text-gray-800">{mahal.value}</td>
                        <td className="px-8 py-6">
                          <button className="p-2 bg-gray-50 text-gray-400 hover:bg-emerald-600 hover:text-white rounded-xl transition-all">
                            <ExternalLink size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {filteredMahals.length === 0 && (
                <div className="p-20 text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto text-gray-300">
                    <Search size={40} />
                  </div>
                  <p className="text-gray-400 font-bold italic">দুঃখিত, কোনো তথ্য পাওয়া যায়নি</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'process' && (
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-black text-gray-800 mb-8 flex items-center gap-3">
              <Zap size={24} className="text-amber-500" /> সায়রাত মহাল ইজারা প্রদানের সাধারণ প্রক্রিয়া
            </h3>
            <div className="space-y-6">
              {processes.map((p, i) => (
                <div key={i} className="flex gap-6 group">
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center font-black shrink-0 z-10">
                      {i + 1}
                    </div>
                    {i !== processes.length - 1 && <div className="w-0.5 h-full bg-emerald-100 -mt-2" />}
                  </div>
                  <div className="pb-8">
                    <h4 className="text-lg font-black text-gray-800 mb-1 group-hover:text-emerald-600 transition-colors">{p.step}</h4>
                    <p className="text-gray-500 font-medium leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'laws' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {laws.map((law, i) => (
              <div key={i} className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                    <Scale size={28} />
                  </div>
                  <h4 className="text-xl font-black text-gray-800 leading-tight tracking-tight">{law.title}</h4>
                </div>
                
                <div className="space-y-6 flex-1">
                  <p className="text-sm text-gray-600 font-medium leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    {law.desc}
                  </p>
                  
                  <div className="space-y-3">
                    <h5 className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500" /> প্রধান বিষয়সমূহ
                    </h5>
                    <div className="grid grid-cols-1 gap-2">
                      {law.points?.map((point, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs font-bold text-gray-500 leading-relaxed">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full mt-1.5 shrink-0" />
                          {point}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <button className="mt-8 w-full py-3 bg-gray-50 text-gray-600 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                  পূর্ণাঙ্গ আইন দেখুন <ExternalLink size={14} />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'forms' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {forms.map((form) => (
              <div key={form.id} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                    <FileText size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{form.id}</span>
                    <h4 className="text-sm font-black text-gray-800 leading-tight">{form.title}</h4>
                  </div>
                </div>
                <button className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all">
                  <Download size={20} />
                </button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
            <h3 className="text-xl font-black text-gray-800 mb-8 flex items-center gap-3">
              <ClipboardList size={24} className="text-emerald-600" /> ইজারা প্রদানের পূর্বে বিবেচ্য বিষয়সমূহ
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
              {checklist.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-emerald-100 transition-all">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5 font-black text-[10px]">
                    {i + 1}
                  </div>
                  <span className="text-sm font-bold text-gray-700 leading-snug">{item}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'registers' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {registers.map((reg) => (
              <div key={reg.id} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center font-black text-lg group-hover:bg-emerald-600 transition-colors">
                    {reg.id}
                  </div>
                  <h4 className="text-lg font-black text-gray-800 leading-tight">রেজিষ্টার {reg.id}: {reg.name}</h4>
                </div>
                <p className="text-sm text-gray-500 font-medium leading-relaxed">
                  {reg.desc}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div className="bg-gray-900 rounded-[3rem] p-12 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 space-y-4 text-center md:text-left">
          <h3 className="text-3xl font-black">সায়রাত মহাল সংক্রান্ত কোনো জিজ্ঞাসা?</h3>
          <p className="text-gray-400 font-medium opacity-80">আপনার উপজেলা ভূমি অফিসে সায়রাত মহাল শাখায় যোগাযোগ করুন।</p>
        </div>
        <button className="relative z-10 px-10 py-5 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-xl shadow-emerald-900/20">
          বিস্তারিত নির্দেশিকা ডাউনলোড <Download size={20} />
        </button>
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/10 rounded-full blur-[100px] -mr-32 -mt-32" />
      </div>
    </div>
  );
};

export default SairatMahal;
