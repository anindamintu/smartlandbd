
import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Wallet, 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  ArrowRight, 
  Lock,
  AlertCircle,
  Loader2,
  ChevronRight
} from 'lucide-react';

interface PaymentGatewayProps {
  amount: number;
  serviceName: string;
  onSuccess: (transactionId: string) => void;
  onCancel: () => void;
}

const PaymentGateway: React.FC<PaymentGatewayProps> = ({ amount, serviceName, onSuccess, onCancel }) => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [paymentStep, setPaymentStep] = useState<'method' | 'details' | 'processing' | 'success'>('method');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [pin, setPin] = useState('');

  const paymentMethods = [
    { id: 'bkash', name: 'bKash', color: 'bg-[#e2136e]', logo: 'https://www.logo.wine/a/logo/BKash/BKash-bKash-Logo.wine.svg' },
    { id: 'nagad', name: 'Nagad', color: 'bg-[#ed1c24]', logo: 'https://www.logo.wine/a/logo/Nagad/Nagad-Logo.wine.svg' },
    { id: 'rocket', name: 'Rocket', color: 'bg-[#8c3494]', logo: 'https://www.logo.wine/a/logo/Dutch_Bangla_Bank/Dutch_Bangla_Bank-Logo.wine.svg' },
    { id: 'upay', name: 'Upay', color: 'bg-[#ffc40c]', logo: 'https://www.logo.wine/a/logo/Upay/Upay-Logo.wine.svg' },
    { id: 'card', name: 'Card', color: 'bg-indigo-600', icon: CreditCard },
  ];

  const handlePayment = () => {
    setPaymentStep('processing');
    setTimeout(() => {
      const txId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
      setPaymentStep('success');
      setTimeout(() => onSuccess(txId), 2000);
    }, 3000);
  };

  return (
    <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden max-w-2xl mx-auto animate-in zoom-in duration-500">
      {/* Header */}
      <div className="bg-gray-900 p-8 text-white relative overflow-hidden">
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-2xl font-black tracking-tight">নিরাপদ পেমেন্ট গেটওয়ে</h3>
            <p className="text-gray-400 text-xs font-bold flex items-center gap-2">
              <Lock size={12} /> SSL এনক্রিপ্টেড পেমেন্ট সিস্টেম
            </p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-1">প্রদেয় টাকা</p>
            <p className="text-3xl font-black text-white">৳ {amount.toLocaleString('bn-BD')}</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] -mr-32 -mt-32" />
      </div>

      <div className="p-10">
        {paymentStep === 'method' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-black text-gray-800">পেমেন্ট পদ্ধতি নির্বাচন করুন</h4>
              <span className="text-xs font-bold text-gray-400">{serviceName}</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-3 group relative ${
                    selectedMethod === method.id 
                      ? 'border-indigo-600 bg-indigo-50/30' 
                      : 'border-gray-100 bg-white hover:border-gray-200'
                  }`}
                >
                  <div className={`w-14 h-14 ${method.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform overflow-hidden`}>
                    {method.logo ? (
                      <img src={method.logo} alt={method.name} className="w-full h-full object-contain p-2" />
                    ) : (
                      <method.icon className="text-white" size={28} />
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{method.name}</span>
                  {selectedMethod === method.id && (
                    <div className="absolute top-2 right-2 text-indigo-600">
                      <CheckCircle2 size={16} />
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="pt-4 flex gap-4">
              <button 
                onClick={onCancel}
                className="flex-1 py-4 bg-white text-gray-500 border-2 border-gray-100 rounded-2xl font-black hover:bg-gray-50 transition-all"
              >
                বাতিল করুন
              </button>
              <button 
                disabled={!selectedMethod}
                onClick={() => setPaymentStep('details')}
                className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl hover:bg-indigo-700 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-2"
              >
                পরবর্তী ধাপ <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}

        {paymentStep === 'details' && (
          <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
            <button 
              onClick={() => setPaymentStep('method')}
              className="text-xs font-black text-gray-400 uppercase tracking-widest flex items-center gap-2 hover:text-indigo-600 transition-colors"
            >
              <ChevronRight className="rotate-180" size={16} /> পদ্ধতি পরিবর্তন করুন
            </button>

            <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-3xl border border-gray-100">
              <div className={`w-12 h-12 ${paymentMethods.find(m => m.id === selectedMethod)?.color} rounded-xl flex items-center justify-center shadow-sm`}>
                {selectedMethod === 'card' ? <CreditCard className="text-white" size={24} /> : <Smartphone className="text-white" size={24} />}
              </div>
              <div>
                <h4 className="font-black text-gray-800">{paymentMethods.find(m => m.id === selectedMethod)?.name} পেমেন্ট</h4>
                <p className="text-xs font-bold text-gray-400">আপনার একাউন্ট তথ্য প্রদান করুন</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">মোবাইল নম্বর</label>
                <input 
                  type="tel" 
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-black text-lg tracking-wider"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">OTP (ওয়ান টাইম পাসওয়ার্ড)</label>
                  <input 
                    type="password" 
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="XXXXXX"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-black text-lg tracking-widest"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">পিন (PIN)</label>
                  <input 
                    type="password" 
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="XXXX"
                    className="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-indigo-500 outline-none font-black text-lg tracking-widest"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex gap-3 items-start">
              <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[10px] font-bold text-amber-800 leading-relaxed">
                আপনার পিন বা ওটিপি কারো সাথে শেয়ার করবেন না। পেমেন্ট নিশ্চিত করার মাধ্যমে আপনি আমাদের শর্তাবলীতে সম্মতি প্রদান করছেন।
              </p>
            </div>

            <button 
              onClick={handlePayment}
              disabled={!phoneNumber || !otp || !pin}
              className="w-full py-5 bg-emerald-600 text-white rounded-2xl font-black text-lg shadow-xl hover:bg-emerald-700 disabled:opacity-50 disabled:pointer-events-none transition-all flex items-center justify-center gap-3"
            >
              <ShieldCheck size={24} /> পেমেন্ট নিশ্চিত করুন
            </button>
          </div>
        )}

        {paymentStep === 'processing' && (
          <div className="py-20 flex flex-col items-center justify-center space-y-6 animate-in zoom-in duration-500">
            <div className="relative">
              <div className="w-24 h-24 border-8 border-indigo-100 rounded-full" />
              <div className="w-24 h-24 border-8 border-indigo-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0" />
              <div className="absolute inset-0 flex items-center justify-center text-indigo-600">
                <ShieldCheck size={32} />
              </div>
            </div>
            <div className="text-center space-y-2">
              <h4 className="text-2xl font-black text-gray-800">পেমেন্ট প্রসেসিং হচ্ছে...</h4>
              <p className="text-gray-500 font-bold">অনুগ্রহ করে অপেক্ষা করুন এবং উইন্ডোটি বন্ধ করবেন না।</p>
            </div>
          </div>
        )}

        {paymentStep === 'success' && (
          <div className="py-10 flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-[2rem] flex items-center justify-center shadow-inner">
              <CheckCircle2 size={48} />
            </div>
            <div className="text-center space-y-2">
              <h4 className="text-3xl font-black text-gray-800">পেমেন্ট সফল হয়েছে!</h4>
              <p className="text-gray-500 font-bold">আপনার লেনদেনটি সফলভাবে সম্পন্ন হয়েছে।</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 w-full max-w-xs text-center">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">ট্রানজেকশন আইডি</p>
              <p className="text-lg font-black text-indigo-600 tracking-wider">TXN-882199301</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 p-6 border-t border-gray-100 flex items-center justify-center gap-8">
        <div className="flex items-center gap-2 opacity-40 grayscale">
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
        </div>
        <div className="flex items-center gap-2 opacity-40 grayscale">
          <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
        </div>
        <div className="flex items-center gap-2 opacity-40 grayscale">
          <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;
