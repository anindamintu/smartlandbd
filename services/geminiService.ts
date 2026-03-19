
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export type DocType = 'Deed' | 'NewDeed' | 'CS' | 'SA' | 'RS' | 'BRS' | 'OldKhatian' | 'Peti' | 'Diara' | 'Khas' | 'Vested' | 'Abandoned' | 'Reserved' | 'GovtDept' | 'WaterBody' | 'Char' | 'Waqf' | 'NewKhatian' | 'PlotMap' | 'Other';

export const getLandAdvice = async (query: string, history: { role: 'user' | 'model', parts: { text: string }[] }[]) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [...history, { role: 'user', parts: [{ text: query }] }],
      config: {
        systemInstruction: `আপনি একজন বাংলাদেশের ভূমি বিশেষজ্ঞ আইনজীবী। ব্যবহারকারীকে ভূমি সংক্রান্ত (খতিয়ান, নামজারি, খাজনা, দলীল, আইন) বিভিন্ন প্রশ্নের উত্তর বাংলা ভাষায় দিন। 
        আপনার জ্ঞানে State Acquisition and Tenancy Act 1950, খাস জমি ব্যবস্থাপনা নীতিমালা, অর্পিত সম্পত্তি (Vested Property) আইন এবং ওয়াকফ/দেবোত্তর সম্পত্তি সংক্রান্ত বিধিমালা অন্তর্ভুক্ত রয়েছে।
        আপনার উত্তরের ভিত্তি হিসেবে অ্যাপের "ভূমি অভিধান" (Land Dictionary) এর পরিভাষাগুলো ব্যবহার করুন। যেমন: খতিয়ান, নামজারি, সাফ-কবলা, মৌজা, খাস জমি ইত্যাদি।
        সর্বশেষ সরকারি নিয়মাবলী এবং পরিপত্র সম্পর্কে জানতে গুগল সার্চ ব্যবহার করুন। 
        
        উত্তরের গঠন ও ফরম্যাটিং নির্দেশাবলী:
        - গুরুত্বপূর্ণ শব্দ, নাম বা ধারা অবশ্যই **বোল্ড** (Double asterisks) করুন।
        - তথ্যগুলো পয়েন্ট আকারে (Unordered List) বা ক্রমানুসারে (Ordered List) সাজিয়ে লিখুন।
        - বড় উত্তরের ক্ষেত্রে অবশ্যই ### ব্যবহার করে যৌক্তিক শিরোনাম (Headers) দিন।
        - আইনি উদ্ধৃতি বা গুরুত্বপূর্ণ নোটের ক্ষেত্রে > (Blockquote) ব্যবহার করুন।
        - ছোট টেকনিক্যাল শব্দ বা আইনের ধারা হাইলাইট করতে \` (Inline code) ব্যবহার করুন।
        - আপনার উত্তরে অবশ্যই সহজ, সাবলীল এবং মার্জিত ভাষা ব্যবহার করবেন। 
        - যদি গুগল সার্চ ব্যবহার করেন, তবে উত্তরের শেষে রেফারেন্স হিসেবে ওয়েবসাইটের লিংকগুলো [ওয়েবসাইটের নাম](লিংক) ফরম্যাটে যুক্ত করুন।`,
        temperature: 0.7,
        tools: [{ googleSearch: {} }],
      },
    });
    
    let text = response.text || "";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks && chunks.length > 0) {
      text += "\n\n### তথ্যসূত্র\n";
      const seenUrls = new Set();
      chunks.forEach((chunk: any) => {
        if (chunk.web && chunk.web.uri && !seenUrls.has(chunk.web.uri)) {
          text += `- [${chunk.web.title || chunk.web.uri}](${chunk.web.uri})\n`;
          seenUrls.add(chunk.web.uri);
        }
      });
    }
    
    return text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "দুঃখিত, বর্তমানে এআই সেবাটি পাওয়া যাচ্ছে না। অনুগ্রহ করে আবার চেষ্টা করুন।";
  }
};

export const analyzeDocument = async (fileParts: { data: string, mimeType: string }[], docType: DocType = 'Other') => {
  try {
    const parts = fileParts.map(p => ({
      inlineData: { mimeType: p.mimeType, data: p.data }
    }));

    const promptText = docType === 'Other'
      ? `এই ফাইলটি একটি ভূমি সংক্রান্ত নথি। এই নথিটি গুরুত্ব সহকারে বিশ্লেষণ করুন এবং এর মূল বিষয়বস্তু ও সকল গুরুত্বপূর্ণ তথ্য বাংলায় স্পষ্টভাবে উপস্থাপন করুন। রিচ টেক্সট ফরম্যাটিং (বোল্ড, লিস্ট, হেডার) ব্যবহার করে তথ্যগুলো সাজান। যদি নথিতে খতিয়ান নম্বর, দাগ নম্বর, মৌজা, মালিকের নাম বা জমির পরিমাণ উল্লেখ থাকে, তবে সেগুলো স্পষ্টভাবে বোল্ড লেবেলসহ উল্লেখ করুন। কোনো অসামঞ্জস্য বা সন্দেহজনক তথ্য থাকলে তা বিশেষভাবে হাইলাইট করুন।`
      : `এই ফাইলটি একটি ${docType} সংক্রান্ত নথি। এখান থেকে শুধুমাত্র নিচের ৫টি তথ্য নিখুঁতভাবে খুঁজে বের করুন এবং বাংলায় তালিকাভুক্ত করুন:
          ১. খতিয়ান নম্বর (Khatian No)
          ২. দাগ নম্বর (Dag No)
          ৩. মৌজা (Mouza)
          ৪. মালিকের নাম (Owner Name)
          ৫. জমির পরিমাণ (Land Area)
          
          উত্তরে শুধুমাত্র এই তথ্যগুলো বোল্ড করে উপস্থাপন করুন এবং মালিকানা বা জমির পরিমাণে কোনো অসামঞ্জস্য থাকলে একটি সংক্ষিপ্ত ব্লককোট (> ) ব্যবহার করে সতর্কতা প্রদান করুন।`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          ...parts,
          { text: promptText }
        ]
      }
    });

    if (!response.text) {
      throw new Error("Empty response from AI");
    }

    return response.text;
  } catch (error) {
    console.error("Document Analysis Error:", error);
    return `দুঃখিত, নথিটি বিশ্লেষণ করা সম্ভব হয়নি। ছবিতে কোনো অস্পষ্টতা থাকলে পরিষ্কার করে পুনরায় আপলোড করুন।`;
  }
};

export const summarizeKhatian = async (analysisText: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [{ text: `নিচের খতিয়ান বিশ্লেষণ থেকে একটি সংক্ষিপ্ত এবং সাবলীল বাংলা অনুচ্ছেদ তৈরি করুন। গুরুত্বপূর্ণ অংশগুলো **বোল্ড** করুন।\n\nবিশ্লেষণ তথ্য:\n${analysisText}` }]
      },
      config: {
        temperature: 0.5,
      }
    });
    return response.text || "সারাংশ তৈরি করা সম্ভব হয়নি।";
  } catch (error) {
    console.error("Summarization Error:", error);
    return "দুঃখিত, সারাংশ তৈরি করতে সমস্যা হচ্ছে।";
  }
};

export const analyzeLegalClauses = async (fileParts: { data: string, mimeType: string }[]) => {
  try {
    const parts = fileParts.map(p => ({
      inlineData: { mimeType: p.mimeType, data: p.data }
    }));

    const promptText = `আপনি একজন বিশেষজ্ঞ ভূমি আইনজীবী। এই আইনি নথিটি (দলীল বা চুক্তি) অত্যন্ত গুরুত্ব সহকারে বিশ্লেষণ করুন। 
    বিশেষ করে নিচের বিষয়গুলো বিস্তারিতভাবে ব্যাখ্যা করুন:
    ১. দলীলের মূল শর্তাবলী (Core Clauses) এবং সেগুলোর আইনি প্রভাব।
    ২. কোনো ঝূঁকিপূর্ণ বা অস্পষ্ট ধারা (Ambiguous or Risky Clauses) আছে কিনা।
    ৩. দলীলের বৈধতা এবং ভবিষ্যতে কোনো আইনি জটিলতা হওয়ার সম্ভাবনা।
    ৪. দলীলের পক্ষগণের দায়-দায়িত্ব।
    
    আপনার উত্তরটি পয়েন্ট আকারে এবং সাবলীল বাংলায় লিখুন। গুরুত্বপূর্ণ আইনি শব্দগুলো **বোল্ড** করুন।`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          ...parts,
          { text: promptText }
        ]
      }
    });

    return response.text || "দুঃখিত, নথিটি বিশ্লেষণ করা সম্ভব হয়নি।";
  } catch (error) {
    console.error("Clause Analysis Error:", error);
    return "দুঃখিত, আইনি ধারা বিশ্লেষণ করতে সমস্যা হচ্ছে।";
  }
};

export const detectInconsistencies = async (fileParts: { data: string, mimeType: string }[]) => {
  try {
    const parts = fileParts.map(p => ({
      inlineData: { mimeType: p.mimeType, data: p.data }
    }));

    const promptText = `আপনি একজন বিশেষজ্ঞ ভূমি রেকর্ড বিশ্লেষক। এই দলীলের টেক্সট ডেটা থেকে নিচের বিষয়গুলো অত্যন্ত সূক্ষ্মভাবে পরীক্ষা করুন:
    ১. **মালিকানা সংক্রান্ত অসঙ্গতি:** দলীলের বিভিন্ন স্থানে মালিকের নামের বানান, পিতার নাম বা ঠিকানায় কোনো অমিল আছে কিনা।
    ২. **জমির পরিমাণ:** দলীলের বিভিন্ন তফসিলে বা বর্ণনায় জমির মোট পরিমাণে কোনো গাণিতিক ভুল বা অসামঞ্জস্য আছে কিনা।
    ৩. **দাগ ও খতিয়ান নম্বর:** উল্লিখিত দাগ নম্বর বা খতিয়ান নম্বরে কোনো টাইপো বা সন্দেহজনক ফরম্যাট আছে কিনা।
    ৪. **অন্যান্য অসামঞ্জস্য:** দলীলের তারিখ, স্ট্যাম্প ডিউটি বা সাক্ষীদের তথ্যে কোনো অস্বাভাবিকতা।
    
    আপনার বিশ্লেষণটি বাংলায় পয়েন্ট আকারে লিখুন। যদি কোনো সমস্যা পাওয়া যায় তবে তা **লাল রঙে বা বোল্ড** করে হাইলাইট করুন। যদি কোনো সমস্যা না থাকে তবে "কোনো উল্লেখযোগ্য অসঙ্গতি পাওয়া যায়নি" লিখুন।`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          ...parts,
          { text: promptText }
        ]
      }
    });

    return response.text || "অসঙ্গতি বিশ্লেষণ করা সম্ভব হয়নি।";
  } catch (error) {
    console.error("Inconsistency Detection Error:", error);
    return "দুঃখিত, অসঙ্গতি সনাক্তকরণে সমস্যা হচ্ছে।";
  }
};

export const verifyNID = async (nidName: string, nidNumber: string, base64Image?: string) => {
  try {
    const parts: any[] = [{ text: `আপনি একজন সরকারি কর্মকর্তা। নিচের তথ্যগুলো ব্যবহার করে জাতীয় পরিচয়পত্র (NID) ভেরিফিকেশন করুন।
    প্রদত্ত নাম: ${nidName}
    প্রদত্ত এনআইডি নম্বর: ${nidNumber}
    
    ${base64Image ? "আপলোডকৃত এনআইডি কার্ডের ছবির সাথে এই তথ্যগুলো মিলিয়ে দেখুন। ছবির টেক্সট রিড করুন এবং নামের বানান ও নম্বরের সাথে মিল আছে কিনা তা নিশ্চিত করুন।" : "ছবি না থাকায় শুধুমাত্র তথ্যের যৌক্তিকতা যাচাই করুন।"}
    
    ফলাফল হিসেবে শুধুমাত্র একটি JSON অবজেক্ট প্রদান করুন:
    {
      "verified": boolean,
      "confidence": number (0-100),
      "message": "বাংলায় একটি সংক্ষিপ্ত বার্তা",
      "extractedName": "ছবি থেকে পাওয়া নাম (যদি থাকে)",
      "extractedNid": "ছবি থেকে পাওয়া নম্বর (যদি থাকে)"
    }` }];

    if (base64Image) {
      // Remove base64 prefix if present
      const base64Data = base64Image.includes(',') ? base64Image.split(',')[1] : base64Image;
      parts.unshift({
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Data
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts },
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("NID Verification Error:", error);
    return { verified: false, message: "ভেরিফিকেশন সার্ভারে সমস্যা হচ্ছে। অনুগ্রহ করে আবার চেষ্টা করুন।" };
  }
};
