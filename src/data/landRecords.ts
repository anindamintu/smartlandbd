import { LandRecord } from '../../types';

export const landRecords: LandRecord[] = [
  {
    id: '1',
    khatianNo: '১২৩৪',
    dagNo: '৫৬৭',
    mouza: 'তেজগাঁও',
    union: 'তেজগাঁও সদর',
    upazila: 'তেজগাঁও',
    district: 'ঢাকা',
    division: 'ঢাকা',
    ownerName: 'মজিবুর রহমান মিন্টু',
    fatherSpouseName: 'মৃত আব্দুল জব্বার',
    area: 12.5,
    status: 'Verified',
    class: 'নাল',
    land_class: 'Agricultural',
    khatianType: 'আর এস খতিয়ান',
    registrationDate: '২০২৩-০৫-১২',
    mutationStatus: 'Completed',
    currentStatus: {
      isMortgaged: false,
      isDisputed: false,
      isGovernmentOwned: false,
      isWaqf: false,
      lastTaxPaidDate: '২০২৪-০১-১০'
    },
    history: [
      {
        id: 'h1',
        date: '২০২৩-০৫-১২',
        ownerName: 'মজিবুর রহমান মিন্টু',
        transactionType: 'Purchase',
        deedNo: 'ডি-৪৫৬৭',
        area: 12.5
      },
      {
        id: 'h2',
        date: '১৯৯৮-০৩-১৫',
        ownerName: 'আব্দুল জব্বার',
        transactionType: 'Inheritance',
        area: 12.5
      }
    ]
  },
  {
    id: '2',
    khatianNo: '৫৬৭৮',
    dagNo: '৮৯০',
    mouza: 'গুলশান',
    union: 'গুলশান',
    upazila: 'গুলশান',
    district: 'ঢাকা',
    division: 'ঢাকা',
    ownerName: 'মোসাম্মাৎ রহিমা বেগম',
    fatherSpouseName: 'স্বামী: মোঃ আব্দুল খালেক',
    area: 5.2,
    status: 'Verified',
    class: 'ভিটি',
    land_class: 'Residential',
    khatianType: 'বিএস খতিয়ান',
    registrationDate: '২০২২-১১-২০',
    mutationStatus: 'Completed',
    currentStatus: {
      isMortgaged: true,
      isDisputed: false,
      isGovernmentOwned: false,
      isWaqf: false,
      lastTaxPaidDate: '২০২৩-১২-০৫'
    },
    history: [
      {
        id: 'h3',
        date: '২০২২-১১-২০',
        ownerName: 'মোসাম্মাৎ রহিমা বেগম',
        transactionType: 'Gift',
        deedNo: 'জি-৮৯০',
        area: 5.2
      }
    ]
  },
  {
    id: '3',
    khatianNo: '৯১০১',
    dagNo: '১২৩',
    mouza: 'ধানমণ্ডি',
    union: 'ধানমণ্ডি',
    upazila: 'ধানমণ্ডি',
    district: 'ঢাকা',
    division: 'ঢাকা',
    ownerName: 'করিম উদ্দিন',
    fatherSpouseName: 'পিতা: মৃত রহিম উদ্দিন',
    area: 8.0,
    status: 'Pending',
    class: 'বাগান',
    land_class: 'Residential',
    khatianType: 'সিএস খতিয়ান',
    registrationDate: '২০২৪-০১-১৫',
    mutationStatus: 'In Progress',
    currentStatus: {
      isMortgaged: false,
      isDisputed: true,
      isGovernmentOwned: false,
      isWaqf: false,
      lastTaxPaidDate: '২০২৩-০৬-২০'
    },
    history: [
      {
        id: 'h4',
        date: '২০২৪-০১-১৫',
        ownerName: 'করিম উদ্দিন',
        transactionType: 'Purchase',
        deedNo: 'ডি-১২৩',
        area: 8.0
      }
    ]
  }
];
