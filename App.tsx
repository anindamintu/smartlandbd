
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Sidebar from './components/Sidebar';
import LandCalculator from './components/LandCalculator';
import AIChat from './components/AIChat';
import MutationTracker from './components/MutationTracker';
import Auth from './components/Auth';
import DesignGuide from './components/DesignGuide';
import LandRecordSearch from './components/LandRecordSearch';
import FaraizCalculator from './components/FaraizCalculator';
import LandMeasurement from './components/LandMeasurement';
import LandMasterCalculator from './components/LandMasterCalculator';
import ComplainModule from './components/ComplainModule';
import DeedFormats from './components/DeedFormats';
import CircularsModule from './components/CircularsModule';
import SupportModule from './components/SupportModule';
import GuideModule from './components/GuideModule';
import HistoryModule from './components/HistoryModule';
import MouzaMap from './components/MouzaMap';
import LandAcquisition from './components/LandAcquisition';
import LandMutation from './components/LandMutation';
import WaqfEstate from './components/WaqfEstate';
import LawsModule from './components/LawsModule';
import BhumiPedia from './components/BhumiPedia';
import LandDictionary from './components/LandDictionary';
import GovernmentProperty from './components/GovernmentProperty';
import LandValuation from './components/LandValuation';
import LandRegistration from './components/LandRegistration';
import LandClassification from './components/LandClassification';
import LandBankModule from './components/LandBankModule';
import LandPoliceModule from './components/LandPoliceModule';
import ADRModule from './components/ADRModule';
import LandAcquisitionData from './components/LandAcquisitionData';
import MiscCaseModule from './components/MiscCaseModule';
import SairatMahal from './components/SairatMahal';
import UserProfile from './components/UserProfile';
import ForestLandModule from './components/ForestLandModule';
import DocumentAnalyzer from './components/DocumentAnalyzer';
import HaatMarketAct from './components/HaatMarketAct';
import LandDisputeModule from './components/LandDisputeModule';
import DisputeComplaintModule from './components/DisputeComplaintModule';
import DeedVerification from './components/DeedVerification';
import ServicePortal from './components/ServicePortal';
import DeedModule from './components/DeedModule';
import LegalAssistance from './components/LegalAssistance';
import LandSurveyHistory from './components/LandSurveyHistory';
import WaterBodyProtection from './components/WaterBodyProtection';
import CharLandManagement from './components/CharLandManagement';
import { KhatianAutomation } from './components/KhatianAutomation';
import { AwarenessProgram } from './components/AwarenessProgram';
import LandAcquisitionAct2023 from './components/LandAcquisitionAct2023';
import { Search, MapPin, CheckCircle2, AlertCircle, Clock, FileCheck, ArrowRight, ArrowLeft, UserCircle, Bell, Menu, FileText, Globe, Landmark, ChevronDown, ShieldCheck, Calculator, Bot, Info, Sparkles, Target, Zap, Shield, Mail, Phone, ExternalLink, Palette, Layers, ScrollText, History, Settings, FileSearch, Scale, Gavel, Map as MapIcon, Trees, Droplets, Mountain, Waves, BookOpen, UserPlus, HelpCircle, FilePlus, Share2, ShieldAlert, MessageSquareText, Download, SearchCheck, Users, MessageSquare, ClipboardList, TrendingUp, Building2, Megaphone, Truck, Tent, Loader2, FileEdit, Activity, LayoutGrid, Printer } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const App: React.FC = () => {
  const [user, setUser] = useState<{ name: string; photo: string | null } | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [khatianSearchQuery, setKhatianSearchQuery] = useState('');
  const [quickKhatianNo, setQuickKhatianNo] = useState('');
  const [quickDagNo, setQuickDagNo] = useState('');
  const [dashboardSearchQuery, setDashboardSearchQuery] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);
  const [isStarting, setIsStarting] = useState(true);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeTab]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsStarting(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isStarting && user) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isStarting, user]);

  const searchMapping: Record<string, string> = {
    'খতিয়ান': 'khatian',
    'রেকর্ড': 'khatian',
    'পর্চা': 'khatian',
    'খতিয়ান অনুসন্ধান': 'khatian',
    'দাগ অনুসন্ধান': 'khatian',
    'মালিক অনুসন্ধান': 'khatian',
    'নামজারি': 'mutation-menu',
    'মিউটেশন': 'mutation-menu',
    'ই-নামজারি': 'mutation-menu',
    'নামজারি আবেদন': 'mutation',
    'নামজারি ট্র্যাকার': 'tracker',
    'দলীল': 'deed-services',
    'রেজিস্ট্রেশন': 'registration',
    'ফারায়েজ': 'faraiz',
    'উত্তরাধিকার': 'faraiz',
    'ক্যালকুলেটর': 'master-calc',
    'পরিমাপ': 'master-calc',
    'মৌজা': 'map',
    'ম্যাপ': 'map',
    'আইন': 'laws',
    'বিধি': 'laws',
    'অভিযোগ': 'complain',
    'প্রোফাইল': 'profile',
    'এআই': 'ai-help',
    'পরামর্শ': 'ai-help',
    'ভেরিফিকেশন': 'verification',
    'খরচ': 'registration',
    'অধিগ্রহণ': 'acquisition',
    'বনভূমি': 'forest',
    'ওয়াকফ': 'waqf',
    'সার্ভে': 'survey-history',
    'জরিপ': 'survey-history',
    'ইতিহাস': 'survey-history',
    'ল্যান্ডব্যাংক': 'land-bank',
    'ল্যান্ড পুলিশ': 'land-police',
    'বিকল্প বিরোধ নিষ্পত্তি': 'adr',
    'এডিআর': 'adr',
    'রেকর্ড সংশোধন': 'mutation-correction',
    'জলাভূমি': 'water',
    'নদী': 'water',
    'খাল': 'water',
    'বিল': 'water',
    'চর': 'char',
    'পয়স্তি': 'char',
    'সিকস্তি': 'char',
    'সচেতনতা': 'awareness',
    'প্রচারণা': 'awareness',
    'মেলা': 'awareness',
    'হটলাইন': 'awareness',
    'মূল্যায়ন': 'valuation',
    'দাম': 'valuation',
    'বাজার দর': 'valuation',
    'শ্রেণী': 'classification',
    'জমি ধরণ': 'classification',
    'শ্রেণীবিভাগ': 'classification',
    'সায়রাত': 'sairat-mahal',
    'মহাল': 'sairat-mahal',
    'জলমহাল': 'sairat-mahal',
    'হাট': 'sairat-mahal',
    'বাজার': 'sairat-mahal',
    'বালুমহাল': 'sairat-mahal',
    'অধিগ্রহণ আইন': 'acquisition-act',
    'অধিগ্রহণ ডাটা': 'acquisition-data',
    'বিরোধ': 'dispute',
    'ঝগড়া': 'dispute',
    'মামলা': 'dispute',
    'মিসকেস': 'misc-case',
    'বিনিয়োগ': 'land-bank',
    'সরকারি জমি': 'land-bank',
    'দখলদার': 'land-police',
    'উচ্ছেদ': 'land-police',
    'অপরাধ': 'land-police',
    'আপোষ': 'adr',
    'মীমাংসা': 'adr',
    'বিকল্প বিরোধ': 'adr',
    'দলীল প্রসেসিং': 'deed-workflow',
    'ওয়ার্কফ্লো': 'deed-workflow',
    'দলীল খসড়া': 'deed-workflow',
    'বিরোধ অভিযোগ': 'dispute-complaint',
    'বিরোধ ফরম': 'dispute-complaint',
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const handleDashboardSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = dashboardSearchQuery.trim().toLowerCase();
    if (!query) return;

    // Check for exact or partial matches in mapping
    for (const [key, tab] of Object.entries(searchMapping)) {
      if (query.includes(key.toLowerCase()) || key.toLowerCase().includes(query)) {
        setActiveTab(tab);
        setDashboardSearchQuery('');
        return;
      }
    }

    // Default to AI help if no match found
    setActiveTab('ai-help');
    setDashboardSearchQuery('');
  };

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab');
    if (tab) {
      setActiveTab(tab);
      // If a tab is specified in URL, we assume some level of direct access or deep link
      // For this demo, we can auto-authenticate if needed, but let's stick to state
    }
  }, []);
  
  const handleTabChange = (tab: string, query?: string) => {
    setActiveTab(tab);
    if (query !== undefined) {
      setKhatianSearchQuery(query);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
  };

  if (isStarting) {
    return (
      <div className="min-h-screen bg-emerald-900 flex flex-col items-center justify-center p-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl space-y-8"
        >
          <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl mx-auto mb-8">
            <ShieldCheck size={48} className="text-emerald-700" />
          </div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight"
          >
            বাংলাদেশের ডিজিটাল ভূমিসবায় <br />
            <span className="text-emerald-400">আপনাকে স্বাগতম</span>
          </motion.h1>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-emerald-100 text-lg md:text-xl font-medium opacity-90">
              এখন থেকে সকল ভূমিসেবা একসাথে। ভূমিসেবা নিন, নিজের ভূমি সুরক্ষিত রাখুন।
            </p>
            <div className="pt-4">
              <span className="px-6 py-2 bg-emerald-500/20 rounded-full border border-emerald-500/30 text-emerald-300 text-sm font-black uppercase tracking-[0.3em]">
                সবার আগে বাংলাদেশ
              </span>
            </div>
          </motion.div>
        </motion.div>
        
        <div className="absolute bottom-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3 text-emerald-400/60 font-bold text-xs uppercase tracking-widest">
            <Loader2 className="animate-spin" size={16} /> লোড হচ্ছে...
          </div>
          <p className="text-[10px] text-black font-black uppercase tracking-[0.2em]">
            Copyright © ANINDABANGLA • 2026 • Bangladesh Digital Bhumi Seva
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onLoginSuccess={(userData) => setUser(userData)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        const dashboardRows = [
          {
            sectionTitle: 'ভূমি রেকর্ড ও জরিপ',
            theme: 'emerald',
            bg: 'bg-emerald-50',
            border: 'border-emerald-100',
            text: 'text-emerald-700',
            iconBg: 'bg-emerald-600',
            items: [
              { title: 'খতিয়ান ও রেকর্ড অনুসন্ধান', desc: 'অনলাইনে খতিয়ান বা পর্চা খুঁজুন', icon: FileSearch, targetTab: 'khatian' },
              { title: 'খতিয়ান আবেদন (অটোমেশন)', desc: 'খতিয়ান আবেদন ও সংগ্রহের সমন্বিত সিস্টেম', icon: FileText, targetTab: 'khatian-automation' },
              { title: 'ই-নামজারি সেবা কেন্দ্র', desc: 'নামজারি সংক্রান্ত সকল ডিজিটাল সেবা', icon: LayoutGrid, targetTab: 'mutation-menu' },
              { title: 'নামজারি ট্র্যাকার', desc: 'আবেদনের অবস্থা ট্র্যাক করুন', icon: Activity, targetTab: 'tracker' },
              { title: 'মৌজা ম্যাপ', desc: 'ডিজিটাল মৌজা ম্যাপ দেখুন', icon: MapIcon, targetTab: 'map' },
            ]
          },
          {
            sectionTitle: 'আইনি ও অনলাইন সেবা',
            theme: 'blue',
            bg: 'bg-blue-50',
            border: 'border-blue-100',
            text: 'text-blue-700',
            iconBg: 'bg-blue-600',
            items: [
              { title: 'আইনি সহায়তা', desc: 'এআই বিশেষজ্ঞের আইনি পরামর্শ', icon: Scale, targetTab: 'legal-assistance' },
              { title: 'অনলাইন সেবা পোর্টাল', desc: 'নামজারি ও কর পরিশোধ করুন', icon: Globe, targetTab: 'services' },
              { title: 'দলীল ভেরিফিকেশন', desc: 'মূল দলীল সঠিক কিনা যাচাই', icon: FileCheck, targetTab: 'verification' },
            ]
          },
          {
            sectionTitle: 'রেজিস্ট্রেশন ও মূল্যায়ন',
            theme: 'amber',
            bg: 'bg-amber-50',
            border: 'border-amber-100',
            text: 'text-amber-700',
            iconBg: 'bg-amber-600',
            items: [
              { title: 'ভূমি রেজিস্ট্রেশন', desc: 'রেজিস্ট্রেশন ফি ও অন্যান্য খরচ', icon: ScrollText, targetTab: 'registration' },
              { title: 'দলীল ফরমেট', desc: 'আদর্শ দলীলের নমুনা ডাউনলোড', icon: ScrollText, targetTab: 'formats' },
              { title: 'জমি মূল্যায়ন', desc: 'জমির বাজার মূল্য যাচাই', icon: TrendingUp, targetTab: 'valuation' },
            ]
          },
          {
            sectionTitle: 'পরিমাপ ও উত্তরাধিকার',
            theme: 'indigo',
            bg: 'bg-indigo-50',
            border: 'border-indigo-100',
            text: 'text-indigo-700',
            iconBg: 'bg-indigo-600',
            items: [
              { title: 'ভূমি ক্যালকুলেটর', desc: 'ডিজিটাল ভূমি পরিমাপ টুল', icon: Calculator, targetTab: 'master-calc' },
              { title: 'উত্তরাধিকার হিসাব', desc: 'ফারায়েজ বা সম্পত্তির ভাগ', icon: Scale, targetTab: 'faraiz' },
              { title: 'ভূমি পরিমাপ', desc: 'জমির ক্ষেত্রফল ও সীমানা নির্ধারণ', icon: Target, targetTab: 'measurement' }
            ]
          },
          {
            sectionTitle: 'সরকারী সম্পত্তি ব্যবস্থাপনা',
            theme: 'rose',
            bg: 'bg-rose-50',
            border: 'border-rose-100',
            text: 'text-rose-700',
            iconBg: 'bg-rose-600',
            items: [
              { title: 'খাস জমি তথ্য', desc: 'সরকারি খাস জমির ডাটাবেজ', icon: Landmark, targetTab: 'government' },
              { title: 'ওয়াকফ এস্টেট', desc: 'ওয়াকফ সম্পত্তি ও এস্টেট অনুসন্ধান', icon: Building2, targetTab: 'waqf' },
              { title: 'ল্যান্ড ব্যাংক', desc: 'সরকারি ভূমি ব্যাংক ও বিনিয়োগ', icon: Building2, targetTab: 'land-bank' },
              { title: 'ল্যান্ড পুলিশ', desc: 'ভূমি অপরাধ ও সুরক্ষা সেবা', icon: ShieldAlert, targetTab: 'land-police' }
            ]
          },
          {
            sectionTitle: 'অধিগ্রহণ ও মামলা',
            theme: 'violet',
            bg: 'bg-violet-50',
            border: 'border-violet-100',
            text: 'text-violet-700',
            iconBg: 'bg-violet-600',
            items: [
              { title: 'ভূমি অধিগ্রহণ', desc: 'অধিগ্রহণ প্রক্রিয়া ও নিয়মাবলী', icon: ClipboardList, targetTab: 'acquisition' },
              { title: 'মিসকেস গাইড', desc: 'বিবিধ মামলার আইনি সমাধান', icon: Gavel, targetTab: 'misc-case' },
              { title: 'বিরোধ নিষ্পত্তি', desc: 'ভূমি সংক্রান্ত বিরোধের সমাধান', icon: Scale, targetTab: 'dispute' }
            ]
          },
          {
            sectionTitle: 'বনভূমি, জলাভূমি ও চর ব্যবস্থাপনা',
            theme: 'teal',
            bg: 'bg-teal-50',
            border: 'border-teal-100',
            text: 'text-teal-700',
            iconBg: 'bg-teal-600',
            items: [
              { title: 'সরকারি বনভূমি', desc: 'সংরক্ষিত ও গেজেটভুক্ত বনভূমি', icon: Trees, targetTab: 'forest' },
              { title: 'সায়রাত মহাল', desc: 'জলমহাল ও বালুমহাল ব্যবস্থাপনা', icon: Droplets, targetTab: 'sairat-mahal' },
              { title: 'জলাভূমি রক্ষা', desc: 'সরকারি নদী ও জলাশয় সংরক্ষণ', icon: Waves, targetTab: 'water' },
              { title: 'চর জমি ব্যবস্থাপনা', desc: 'চর জমি ও বন্দোবস্ত তথ্য', icon: Mountain, targetTab: 'char' }
            ]
          },
          {
            theme: 'sky',
            bg: 'bg-sky-50',
            border: 'border-sky-100',
            text: 'text-sky-700',
            iconBg: 'bg-sky-600',
            items: [
              { title: 'সচেতনতা ও প্রচারণা', desc: 'ভূমি সেবা সচেতনতা ও প্রচার কার্যক্রম', icon: Megaphone, targetTab: 'awareness' },
              { title: 'ভ্রাম্যমাণ ভূমি সেবা', desc: 'আপনার এলাকায় ভ্রাম্যমাণ সেবা যান', icon: Truck, targetTab: 'awareness' },
              { title: 'ভূমি মেলা ও বৈঠক', desc: 'মেলা ও উঠান বৈঠকের সময়সূচী', icon: Tent, targetTab: 'awareness' }
            ]
          },
          {
            theme: 'orange',
            bg: 'bg-orange-50',
            border: 'border-orange-100',
            text: 'text-orange-700',
            iconBg: 'bg-orange-600',
            items: [
              { title: 'আবেদনের ইতিহাস', desc: 'আপনার সকল আবেদনের অবস্থা', icon: History, targetTab: 'history' },
              { title: 'ব্যবহারকারী প্রোফাইল', desc: 'আপনার ব্যক্তিগত তথ্য ও সেটিংস', icon: UserCircle, targetTab: 'profile' },
              { title: 'দলীল ভেরিফিকেশন', desc: 'মূল দলীল সঠিক কিনা যাচাই', icon: FileCheck, targetTab: 'verification' },
            ]
          },
          {
            theme: 'cyan',
            bg: 'bg-cyan-50',
            border: 'border-cyan-100',
            text: 'text-cyan-700',
            iconBg: 'bg-cyan-600',
            items: [
              { title: 'আইন ও বিধিমালা', desc: 'ভূমি সংক্রান্ত সকল আইন ও বিধি', icon: Scale, targetTab: 'laws' },
              { title: 'ভূমি তথ্য বাতায়ন', desc: 'সরকারি সর্বশেষ পরিপত্র', icon: ExternalLink, targetTab: 'circulars' },
              { title: 'আইনি সহায়তা', desc: 'এআই বিশেষজ্ঞের আইনি পরামর্শ', icon: Scale, targetTab: 'legal-assistance' },
            ]
          },
          {
            theme: 'lime',
            bg: 'bg-lime-50',
            border: 'border-lime-100',
            text: 'text-lime-700',
            iconBg: 'bg-lime-600',
            items: [
              { title: 'হাট-বাজার আইন ২০২৩', desc: 'নতুন হাট-বাজার আইন ও বিধিমালা', icon: Building2, targetTab: 'haat-market-act' },
              { title: 'এআই ভূমি পরামর্শক', desc: 'এআই বিশেষজ্ঞের তাৎক্ষণিক সহায়তা', icon: Bot, targetTab: 'ai-help' },
              { title: 'এআই নথি বিশ্লেষক', desc: 'ভূমি দলীল ও খতিয়ান বিশ্লেষণ', icon: FileSearch, targetTab: 'doc-analyzer' },
            ]
          },
          {
            theme: 'violet',
            bg: 'bg-violet-50',
            border: 'border-violet-100',
            text: 'text-violet-700',
            iconBg: 'bg-violet-600',
            items: [
              { title: 'ভূমি পিডিয়া', desc: 'ভূমি বিষয়ক এনসাইক্লোপিডিয়া', icon: BookOpen, targetTab: 'pedia' },
              { title: 'অনলাইন সেবা পোর্টাল', desc: 'নামজারি ও কর পরিশোধ করুন', icon: Globe, targetTab: 'services' },
              { title: 'সহায়তা কেন্দ্র', desc: 'সরাসরি বিশেষজ্ঞের সাথে কথা', icon: Phone, targetTab: 'support' }
            ]
          }
        ];

        return (
          <div className="space-y-12 animate-in fade-in duration-700 pb-20">
            {/* Dashboard Search Bar */}
            <form onSubmit={handleDashboardSearch} className="relative max-w-4xl mx-auto mb-16">
              <div className="bg-white p-2 rounded-[2.5rem] shadow-2xl border border-emerald-100 flex items-center gap-2 group focus-within:ring-4 focus-within:ring-emerald-100 transition-all">
                <div className="pl-6 text-emerald-600 group-focus-within:scale-110 transition-transform">
                  <Search size={28} />
                </div>
                <input 
                  type="text" 
                  value={dashboardSearchQuery}
                  onChange={(e) => setDashboardSearchQuery(e.target.value)}
                  placeholder="যেকোনো ভূমি সেবা বা তথ্য খুঁজুন (যেমন: খতিয়ান, নামজারি, মাপজোখ...)" 
                  className="flex-1 py-5 bg-transparent outline-none font-bold text-lg text-gray-700 placeholder:text-gray-400"
                />
                <button 
                  type="button"
                  onClick={() => setActiveTab('ai-help')}
                  className="p-4 text-gray-400 hover:text-emerald-600 transition-colors"
                >
                  <Bot size={24} />
                </button>
                <button 
                  type="submit"
                  className="bg-emerald-600 text-white px-10 py-5 rounded-[2rem] font-black hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-2 group/btn"
                >
                  অনুসন্ধান <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="absolute -bottom-10 left-8 flex items-center gap-4">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">জনপ্রিয় অনুসন্ধান:</span>
                <div className="flex items-center gap-2">
                  {['খতিয়ান ও রেকর্ড', 'নামজারি', 'মৌজা ম্যাপ', 'দলীল ফরমেট'].map(tag => (
                    <button 
                      key={tag} 
                      type="button"
                      onClick={() => {
                        setDashboardSearchQuery(tag);
                        // We can't call handleDashboardSearch directly with the new state due to closure/async state
                        // So we find the tab manually or use a timeout (not ideal) or just call a helper
                        const tab = Object.entries(searchMapping).find(([key]) => tag.includes(key))?.[1];
                        if (tab) setActiveTab(tab);
                      }}
                      className="text-[10px] font-black text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100 hover:bg-emerald-100 transition-all hover:scale-105"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </form>

            {/* Logout / Go Back Section */}
            <div className="max-w-4xl mx-auto -mt-8 mb-12">
              <button 
                onClick={handleLogout}
                className="w-full bg-rose-50 p-6 rounded-[2rem] shadow-sm border border-rose-100 hover:shadow-md transition-all flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-6">
                  <div className="w-12 h-12 bg-rose-600 text-white rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <ArrowRight className="rotate-180" size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-black text-rose-400 uppercase tracking-widest group-hover:text-rose-600 transition-colors">লগআউট / পেছনে যান</h3>
                    <p className="text-xl font-black text-rose-800">লগইন প্যানেল</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-rose-600 font-black uppercase bg-white px-4 py-2 rounded-full border border-rose-100">
                  ফিরে যান <ArrowRight className="rotate-180" size={14} />
                </div>
              </button>
            </div>

            {/* Top Overview Section */}
            <div className="flex flex-col md:flex-row gap-6 mb-10">
              <div 
                onClick={() => setActiveTab('khatian-automation')}
                className="flex-1 bg-emerald-700 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden group cursor-pointer hover:bg-emerald-800 transition-colors"
              >
                <div className="relative z-10">
                  <h3 className="text-xl font-medium opacity-80 mb-2">আপনার মোট জমি</h3>
                  <p className="text-5xl font-black tracking-tight">৫৬.৫ শতাংশ</p>
                  <div className="mt-6 flex items-center gap-2 text-sm bg-white/20 w-fit px-4 py-2 rounded-2xl backdrop-blur-md border border-white/10">
                    <CheckCircle2 size={18} /> ৩টি খতিয়ানে অন্তর্ভুক্ত
                  </div>
                </div>
                <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                  <Globe size={240} />
                </div>
              </div>
              <div className="flex-1">
                <div 
                  onClick={() => setActiveTab('tracker')}
                  className="h-full bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer"
                >
                  <div>
                    <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest">পেন্ডিং নামজারি</h3>
                    <p className="text-4xl font-black text-gray-800 mt-2">০২ টি</p>
                  </div>
                  <div className="mt-6 flex items-center gap-2 text-[11px] text-amber-600 font-black uppercase bg-amber-50 w-fit px-4 py-2 rounded-full">
                    <Clock size={16} /> শুনানি: ২০ মে, ২০২৪
                  </div>
                </div>
              </div>
            </div>

            {/* Main 10 Row x 3 Column Service Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between px-2 mb-4">
                <h3 className="text-2xl font-black text-gray-800 tracking-tight flex items-center gap-3">
                  <div className="w-2 h-8 bg-emerald-600 rounded-full" />
                  সকল ভূমিসেবা একসাথে
                </h3>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-xs font-black uppercase tracking-widest border border-emerald-100 shadow-sm">
                  <Sparkles size={14} /> সবার আগে ভূমি সেবা
                </div>
              </div>

              <div className="space-y-12">
                {dashboardRows.map((row, rowIdx) => (
                  <div key={rowIdx} className="space-y-4">
                    <div className="flex items-center gap-3 px-2">
                       <div className={`w-1 h-6 ${row.iconBg} rounded-full`} />
                       <h4 className="text-lg font-black text-gray-700 tracking-tight">{row.sectionTitle}</h4>
                    </div>
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-500`} style={{ animationDelay: `${rowIdx * 100}ms` }}>
                      {row.items.map((item, itemIdx) => (
                        <button 
                          key={itemIdx} 
                          onClick={() => setActiveTab(item.targetTab)}
                          className={`group p-6 ${row.bg} ${row.border} border-2 rounded-[2.25rem] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col items-start gap-4 text-left w-full outline-none focus:ring-4 focus:ring-emerald-200`}
                        >
                          <div className={`w-14 h-14 ${row.iconBg} text-white rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                            <item.icon size={28} />
                          </div>
                          <div>
                            <h4 className={`text-lg font-black ${row.text} tracking-tight mb-1`}>{item.title}</h4>
                            <p className="text-xs text-gray-500 font-bold leading-relaxed">{item.desc}</p>
                          </div>
                          <div className="mt-auto pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 group-hover:text-emerald-600 transition-colors">
                            এগিয়ে যান <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                          </div>
                          {/* Decorative background circle */}
                          <div className={`absolute -bottom-6 -right-6 w-20 h-20 ${row.iconBg} opacity-[0.03] rounded-full group-hover:scale-150 transition-transform duration-700`} />
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Links Footer Widget */}
            <div className="bg-emerald-900 rounded-[3rem] p-12 text-white shadow-2xl relative overflow-hidden mt-12">
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-black mb-6 tracking-tight">আপনার স্মার্ট ভূমি সহকারী</h3>
                    <p className="text-emerald-100/80 font-medium text-lg leading-relaxed mb-8">
                      যেকোনো জটিল আইনি সমস্যার তাৎক্ষণিক সমাধানের জন্য আমাদের এআই বিশেষজ্ঞের সাথে কথা বলুন অথবা হেল্পলাইনে সরাসরি কল দিন।
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => setActiveTab('ai-help')} className="px-8 py-4 bg-white text-emerald-900 rounded-2xl font-black hover:bg-emerald-50 transition-all shadow-lg flex items-center gap-3">
                        <Bot size={20} /> এআই পরামর্শ নিন
                      </button>
                      <a href="tel:16122" className="px-8 py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all border border-emerald-500 shadow-lg flex items-center gap-3">
                        <Phone size={20} /> ১৬১২২ কল দিন
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { icon: ShieldCheck, label: 'নিরাপদ ডাটা' },
                      { icon: Zap, label: 'তাৎক্ষণিক সেবা' },
                      { icon: FileCheck, label: 'নির্ভুল তথ্য' },
                      { icon: Users, label: 'সবার জন্য উন্মুক্ত' }
                    ].map((feat, i) => (
                      <div key={i} className="bg-white/10 backdrop-blur-md p-6 rounded-[2rem] border border-white/10 flex flex-col items-center gap-3 text-center">
                        <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl">
                          <feat.icon size={24} />
                        </div>
                        <span className="text-xs font-black uppercase tracking-widest">{feat.label}</span>
                      </div>
                    ))}
                  </div>
               </div>
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-[100px] -mr-32 -mt-32" />
            </div>
          </div>
        );
      case 'ai-help':
        return <AIChat onTabChange={handleTabChange} />;
      case 'khatian-automation':
        return <KhatianAutomation />;
      case 'awareness':
        return <AwarenessProgram />;
      case 'khatian':
        return <LandRecordSearch initialQuery={khatianSearchQuery} />;
      case 'mutation-menu':
        return <LandMutation initialView="menu" />;
      case 'mutation':
        return <LandMutation initialView="apply" />;
      case 'tracker':
        return <LandMutation initialView="tracker" />;
      case 'verification':
        return <DeedModule initialView="verification" />;
      case 'formats':
        return <DeedModule initialView="formats" />;
      case 'registration':
        return <DeedModule initialView="costs" />;
      case 'deed-services':
        return <DeedModule initialView="menu" />;
      case 'deed-workflow':
        return <DeedModule initialView="workflow" />;
      case 'services':
        return <ServicePortal />;
      case 'legal-assistance':
        return <LegalAssistance onTabChange={handleTabChange} />;
      case 'vested':
        return <GovernmentProperty initialType="vested" />;
      case 'khas':
        return <GovernmentProperty initialType="khas" onBack={() => setActiveTab('dashboard')} />;
      case 'government':
        return <GovernmentProperty onBack={() => setActiveTab('dashboard')} />;
      case 'forest':
        return <GovernmentProperty initialType="forest" onBack={() => setActiveTab('dashboard')} />;
      case 'water':
        return <GovernmentProperty initialType="water" onBack={() => setActiveTab('dashboard')} />;
      case 'char':
        return <GovernmentProperty initialType="char" onBack={() => setActiveTab('dashboard')} />;
      case 'sairat-mahal':
        return <GovernmentProperty initialType="sairat" onBack={() => setActiveTab('dashboard')} />;
      case 'haat-market-act':
        return <HaatMarketAct />;
      case 'waqf':
        return <WaqfEstate onBack={() => setActiveTab('dashboard')} />;
      case 'survey':
      case 'survey-history':
        return <LandSurveyHistory />;
      case 'mutation-correction':
        return <LandMutation initialView="correction" />;
      case 'notices':
      case 'circulars':
        return <CircularsModule />;
      case 'certified':
        return <LandRecordSearch initialQuery="" />;
      case 'khatian-gen':
        return <LandMutation initialView="khatian" />;
      case 'ownership':
        return <DeedModule initialView="formats" />;
      case 'rectify':
        return <GuideModule />;
      case 'lawsuit':
      case 'reports':
        return <HistoryModule />;
      case 'design-guide':
        return <DesignGuide />;
      case 'about':
        return (
          <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="relative h-80 rounded-[3rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2070&auto=format&fit=crop" 
                alt="Digital Bangladesh" 
                className="w-full h-full object-cover brightness-[0.4]" 
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <div className="bg-emerald-500/20 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 mb-6 flex items-center gap-2">
                  <Sparkles size={16} className="text-emerald-300" />
                  <span className="text-white text-xs font-black uppercase tracking-[0.2em]">সবার আগে ভূমি সেবা</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">আমাদের লক্ষ্য ও উদ্দেশ্য</h2>
                <p className="text-emerald-100 max-w-2xl text-lg font-medium leading-relaxed opacity-90">
                  বাংলাদেশের ভূমি ব্যবস্থাপনাকে আধুনিক, স্বচ্ছ এবং নাগরিক-বান্ধব করতে আমরা নিরলসভাবে কাজ করে যাচ্ছি।
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'ভিশন (Vision)', desc: 'একটি স্মার্ট ও স্বচ্ছ ভূমি সেবা ব্যবস্থা নিশ্চিত করা যেখানে দুর্নীতির কোনো স্থান নেই।', icon: Target, color: 'bg-emerald-600' },
                { title: 'মিশন (Mission)', desc: 'আধুনিক প্রযুক্তির মাধ্যমে নাগরিকের কাছে দ্রুততম সময়ে ভূমি সংক্রান্ত আইনি সহায়তা পৌঁছে দেওয়া।', icon: Zap, color: 'bg-blue-600' },
                { title: 'নিরাপত্তা (Security)', desc: 'ব্যবহারকারীর ব্যক্তিগত তথ্য ও ভূমির স্পর্শকাতর নথির সর্বোচ্চ নিরাপত্তা নিশ্চিত করা।', icon: Shield, color: 'bg-indigo-600' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group">
                  <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg transform group-hover:rotate-6 transition-transform`}>
                    <item.icon size={28} />
                  </div>
                  <h3 className="text-xl font-black text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed font-medium">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-white p-10 md:p-14 rounded-[3rem] shadow-sm border border-gray-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-[100px] -mr-32 -mt-32 opacity-60" />
               <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-black text-gray-800 mb-6 tracking-tight leading-tight">কেন আমরা আলাদা?</h3>
                    <ul className="space-y-6">
                      {[
                        'এআই চালিত স্মার্ট আইনি পরামর্শক',
                        'খতিয়ান ও দলীল বিশ্লেষণের আধুনিক প্রযুক্তি',
                        'ভয়েস কমান্ড ও বাংলা ভাষা সাপোর্ট',
                        'সহ সহজ ইন্টারফেস ও দ্রুত নেভিগেশন',
                        'ভূমি কর ও পরিমাপের নির্ভুল হিসাব'
                      ].map((text, idx) => (
                        <li key={idx} className="flex items-center gap-4 text-gray-700 font-bold group">
                          <div className="w-6 h-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                            <CheckCircle2 size={14} />
                          </div>
                          {text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-emerald-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
                    <div className="relative z-10">
                      <h4 className="text-2xl font-black mb-6 flex items-center gap-3">
                        <Mail size={24} className="text-emerald-400" /> যোগাযোগ করুন
                      </h4>
                      <div className="space-y-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                            <Phone size={20} className="text-emerald-300" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-black tracking-widest text-emerald-300">হটলাইন</p>
                            <p className="text-lg font-bold">১৬১২২ (land.gov.bd)</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                            <Globe size={20} className="text-emerald-300" />
                          </div>
                          <div>
                            <p className="text-[10px] uppercase font-black tracking-widest text-emerald-300">অফিসিয়াল পোর্টাল</p>
                            <a href="https://land.gov.bd" target="_blank" className="text-lg font-bold hover:underline flex items-center gap-2">
                              www.land.gov.bd <ExternalLink size={14} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-600/20 rounded-full blur-3xl" />
                  </div>
               </div>
            </div>
          </div>
        );
      case 'tax':
        return <LandMasterCalculator />;
      case 'faraiz':
        return <FaraizCalculator />;
      case 'measure':
        return <LandMasterCalculator />;
      case 'master-calc':
        return <LandMasterCalculator />;
      case 'complain':
        return <ComplainModule onTabChange={handleTabChange} />;
      case 'support':
        return <SupportModule />;
      case 'guide':
        return <GuideModule />;
      case 'history':
        return <HistoryModule />;
      case 'map':
        return <MouzaMap />;
      case 'laws':
        return <LawsModule />;
      case 'pedia':
        return <BhumiPedia />;
      case 'dictionary':
        return <LandDictionary />;
      case 'acquisition':
        return <LandAcquisition onTabChange={setActiveTab} />;
      case 'acquisition-act':
        return <LandAcquisitionAct2023 />;
      case 'acquisition-data':
        return <LandAcquisitionData />;
      case 'misc-case':
        return <MiscCaseModule />;
      case 'dispute':
        return <LandDisputeModule onTabChange={handleTabChange} />;
      case 'dispute-complaint':
        return <DisputeComplaintModule />;
      case 'land-bank':
        return <LandBankModule />;
      case 'land-police':
        return <LandPoliceModule />;
      case 'adr':
        return <ADRModule />;
      case 'valuation':
        return <LandValuation />;
      case 'classification':
        return <LandClassification />;
      case 'mutation-guide':
        return <LandMutation initialView="guide" />;
      case 'profile':
        return <UserProfile user={user} onLogout={handleLogout} />;
      case 'doc-analyzer':
        return <DocumentAnalyzer />;
      default:
        return (
          <div className="flex flex-col items-center justify-center p-20 text-center animate-in zoom-in duration-500">
             <div className="w-24 h-24 bg-emerald-50 rounded-[2rem] flex items-center justify-center text-emerald-600 mb-6 shadow-inner">
               <Layers size={48} className="animate-pulse" />
             </div>
             <h3 className="text-2xl font-black text-gray-800 mb-2">এই মডিউলটি এখনো প্রক্রিয়াধীন...</h3>
             <p className="text-gray-500 font-medium max-w-sm">স্মার্ট ভূমি সেবার এই অংশটি বর্তমানে ডেভেলপমেন্ট পর্যায়ে রয়েছে। খুব শীঘ্রই এটি ব্যবহারকারীদের জন্য উন্মুক্ত করা হবে।</p>
             <button onClick={() => setActiveTab('dashboard')} className="mt-8 px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-sm shadow-lg hover:bg-emerald-700 transition-all">ড্যাশবোর্ডে ফিরে যান</button>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AnimatePresence>
        {showWelcome && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="fixed inset-0 z-[100] bg-emerald-900 flex flex-col items-center justify-center p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl space-y-8"
            >
              <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center shadow-2xl mx-auto mb-8">
                <ShieldCheck size={48} className="text-emerald-700" />
              </div>
              
              <motion.h1 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight"
              >
                বাংলাদেশের ডিজিটাল ভূমিসবায় <br />
                <span className="text-emerald-400">আপনাকে স্বাগতম</span>
              </motion.h1>
              
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="space-y-4"
              >
                <p className="text-emerald-100 text-lg md:text-xl font-medium opacity-90">
                  এখন থেকে সকল ভূমিসেবা একসাথে। ভূমিসেবা নিন, নিজের ভূমি সুরক্ষিত রাখুন।
                </p>
                <div className="pt-4">
                  <span className="px-6 py-2 bg-emerald-500/20 rounded-full border border-emerald-500/30 text-emerald-300 text-sm font-black uppercase tracking-[0.3em]">
                    সবার আগে বাংলাদেশ
                  </span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
              className="absolute bottom-8 flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-3 text-emerald-400/60 font-bold text-xs uppercase tracking-widest">
                <Loader2 className="animate-spin" size={16} /> লোড হচ্ছে...
              </div>
              <p className="text-[10px] text-black font-black uppercase tracking-[0.2em]">
                Copyright © ANINDABANGLA • 2026 • Bangladesh Digital Bhumi Seva
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />

      {/* Quick Actions Floating Menu */}
      <div className="fixed bottom-8 right-6 z-50 flex flex-col items-end gap-4 print:hidden">
        <button 
          onClick={() => scrollContainerRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-white/80 backdrop-blur-sm text-gray-400 p-3 rounded-2xl shadow-lg hover:text-emerald-600 hover:bg-white transition-all border border-gray-100 opacity-60 hover:opacity-100"
        >
          <ArrowLeft className="rotate-90" size={20} />
        </button>
      </div>

      <div ref={scrollContainerRef} className="flex-1 md:ml-64 print:ml-0 flex flex-col min-w-0 h-screen overflow-y-auto custom-scrollbar">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-30 print:hidden">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-colors"
            >
              <Menu size={28} />
            </button>
            {activeTab !== 'dashboard' && (
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-black hover:bg-gray-200 transition-all border border-gray-200 shadow-sm mr-2 group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="hidden sm:inline">পেছনে ফিরুন</span>
              </button>
            )}
            <h2 className="text-2xl font-black text-gray-800 hidden md:block tracking-tight">
              {activeTab === 'dashboard' ? 'ড্যাশবোর্ড' : 
               activeTab === 'khatian' || activeTab === 'khatian-automation' ? 'খতিয়ান ও রেকর্ড অনুসন্ধান' : 
               activeTab === 'awareness' ? 'সচেতনতা ও প্রচারণা কার্যক্রম' : 
               activeTab === 'verification' ? 'দলীল ভেরিফিকেশন ও সত্যতা যাচাই' :
               activeTab === 'ai-help' ? 'এআই আইনি সহায়তা' : 
               activeTab === 'waqf' ? 'ওয়াকফ এস্টেট অনুসন্ধান' :
               activeTab === 'water' ? 'জলাভূমি রক্ষা ও ব্যবস্থাপনা' :
               activeTab === 'char' ? 'চর জমি ব্যবস্থাপনা ও বন্দোবস্ত' :
               activeTab === 'forest' ? 'বনভূমি তথ্য ও রেকর্ড' :
               activeTab === 'haat-market-act' ? 'হাট ও বাজার (স্থাপন ও ব্যবস্থাপনা) আইন, ২০২৩' :
               activeTab === 'laws' ? 'সংশ্লিষ্ট আইন ও বিধিমালা' :
               activeTab === 'circulars' ? 'ভূমি তথ্য বাতায়ন' :
               activeTab === 'sairat-mahal' ? 'সায়রাত মহাল ব্যবস্থাপনা' :
               activeTab === 'acquisition-act' ? 'স্থাবর সম্পত্তি অধিগ্রহণ ও হুকুমদখল আইন, ২০২৩' :
               activeTab === 'acquisition-data' ? 'ভূমি অধিগ্রহণ তথ্য অনুসন্ধান' :
               activeTab === 'misc-case' ? 'মিসকেস আবেদন গাইড' :
               activeTab === 'dispute' ? 'ভূমি বিরোধ নিষ্পত্তি ও প্রতিকার' :
               activeTab === 'pedia' ? 'ভূমি পিডিয়া' :
               activeTab === 'dictionary' ? 'ভূমি অভিধান' :
               activeTab === 'government' || activeTab === 'vested' || activeTab === 'khas' ? 'সরকারি সম্পত্তি অনুসন্ধান' :
               activeTab === 'valuation' ? 'জমি মূল্যায়ন টুল' :
               activeTab === 'classification' ? 'ভূমি শ্রেণীবিভাগ ও বৈশিষ্ট্য' :
               activeTab === 'registration' ? 'ভূমি রেজিস্ট্রেশন নির্দেশিকা' :
               activeTab === 'mutation' ? 'ই-নামজারি আবেদন' :
               activeTab === 'profile' ? 'ব্যবহারকারীর প্রোফাইল' :
               activeTab === 'doc-analyzer' ? 'এআই নথি বিশ্লেষক' :
               activeTab === 'design-guide' ? 'ডিজাইন গাইড' :
               activeTab === 'tax' || activeTab === 'master-calc' || activeTab === 'measure' ? 'মাস্টার ভূমি ক্যালকুলেটর' :
               activeTab === 'about' ? 'আমাদের সম্পর্কে' : 'বাংলাদেশ ডিজিটাল ভূমিসেবা'}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-xl font-black hover:bg-emerald-100 transition-all border border-emerald-100 shadow-sm"
              title="পিডিএফ বা প্রিন্ট করুন"
            >
              <Printer size={18} /> <span className="hidden sm:inline">প্রিন্ট / পিডিএফ</span>
            </button>
            <div className="h-10 w-px bg-gray-100 mx-2"></div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-rose-50 text-rose-600 rounded-xl font-black hover:bg-rose-100 transition-all border border-rose-100 shadow-sm"
            >
              <ArrowRight className="rotate-180" size={18} /> লগআউট
            </button>
            <div className="h-10 w-px bg-gray-100 mx-2"></div>
            <button className="p-3 text-gray-500 hover:bg-gray-100 rounded-2xl relative transition-all group">
              <Bell size={22} />
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
            </button>
            <div className="h-10 w-px bg-gray-100 mx-2"></div>
            <div 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-3 p-1.5 pr-4 rounded-2xl border cursor-pointer transition-all shadow-sm ${activeTab === 'profile' ? 'bg-emerald-50 border-emerald-200' : 'bg-white border-gray-100 hover:border-emerald-200'}`}
            >
              <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 overflow-hidden">
                {user.photo ? (
                  <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <UserCircle size={28} />
                )}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-bold text-gray-800 leading-none">{user.name}</p>
              </div>
            </div>
          </div>
        </header>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-gray-900/60 z-50 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}>
            <div className="bg-emerald-900 w-72 h-full p-6 shadow-2xl animate-in slide-in-from-left duration-300" onClick={(e) => e.stopPropagation()}>
               <div className="flex justify-between items-center mb-10">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-emerald-900 shadow-md shrink-0">ভ</div>
                      <h1 className="text-white font-black text-sm uppercase">বাংলাদেশ ডিজিটাল ভূমিসেবা</h1>
                    </div>
                    <p className="text-[8px] text-emerald-300 font-bold ml-10">সবার আগে বাংলাদেশ - সবার জন্য ভূমি সেবা</p>
                  </div>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="text-white/70 hover:text-white p-2">✕</button>
               </div>
               <nav className="space-y-2">
                  {[
                    {id: 'dashboard', label: 'ড্যাশবোর্ড', icon: Globe},
                    {id: 'khatian', label: 'খতিয়ান অনুসন্ধান', icon: FileSearch},
                    {id: 'mutation-menu', label: 'ই-নামজারি', icon: LayoutGrid},
                    {id: 'land-bank', label: 'ল্যান্ডব্যাংক', icon: Building2},
                    {id: 'master-calc', label: 'ভূমি ক্যালকুলেটর', icon: Calculator},
                    {id: 'ai-help', label: 'এআই ভূমি পরামর্শক', icon: Bot},
                    {id: 'awareness', label: 'সচেতনতা ও প্রচারণা', icon: Megaphone},
                    {id: 'about', label: 'আমাদের সম্পর্কে', icon: Info}
                  ].map(t => (
                    <button 
                      key={t.id}
                      onClick={() => { setActiveTab(t.id); setIsMobileMenuOpen(false); }}
                      className={`flex items-center gap-3 w-full text-left px-5 py-4 rounded-2xl transition-all font-bold ${activeTab === t.id ? 'bg-emerald-700 text-white shadow-lg' : 'text-emerald-100 hover:bg-emerald-800'}`}
                    >
                      <t.icon size={20}/> {t.label}
                    </button>
                  ))}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-3 w-full text-left px-5 py-4 rounded-2xl transition-all font-bold text-rose-200 hover:bg-rose-900/40 mt-4 border-t border-emerald-800 pt-8"
                  >
                    <ArrowRight className="rotate-180" size={20}/> লগআউট
                  </button>
               </nav>
            </div>
          </div>
        )}

        <main className="p-8 max-w-7xl mx-auto w-full flex-1 print:p-0 print:m-0 print:max-w-none">
          {activeTab !== 'dashboard' && (
            <div className="flex items-center justify-between mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className="flex items-center gap-2 text-emerald-700 font-black hover:bg-emerald-50 px-5 py-2.5 rounded-2xl transition-all border border-emerald-100 shadow-sm bg-white group"
              >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> ড্যাশবোর্ডে ফিরুন
              </button>
              <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-widest border border-gray-200">
                <Clock size={12} /> শেষ আপডেট: {new Date().toLocaleDateString('bn-BD')}
              </div>
            </div>
          )}
          {renderContent()}
        </main>

        <footer className="mt-auto p-8 text-center text-sm text-gray-400 font-medium border-t border-gray-100 print:hidden">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center justify-center gap-6 mb-2">
              <a href="#" className="hover:text-emerald-600 transition-colors font-bold">সহায়তা</a>
              <a href="#" className="hover:text-emerald-600 transition-colors font-bold">গোপনীয়তা নীতি</a>
              <a href="#" className="hover:text-emerald-600 transition-colors font-bold">যোগাযোগ</a>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="text-black font-black">©Copyright : AnindaBangla • 2026 • Bangladesh Digital Bhumi Seva System</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
