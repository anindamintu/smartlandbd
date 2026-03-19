
export interface Complaint {
  id: string;
  trackingId: string;
  name: string;
  phone: string;
  location: string;
  description: string;
  status: 'Submitted' | 'Under Review' | 'Processing' | 'Resolved' | 'Rejected';
  date: string;
  deadline: string;
  updates: {
    date: string;
    message: string;
    status: string;
  }[];
}

export interface LandHistoryEntry {
  id: string;
  date: string;
  ownerName: string;
  fatherSpouseName?: string;
  transactionType: 'Inheritance' | 'Purchase' | 'Gift' | 'Lease' | 'Exchange';
  deedNo?: string;
  area: number;
}

export interface LandRecord {
  id: string;
  khatianNo: string;
  dagNo: string;
  mouza: string;
  union?: string;
  upazila?: string;
  district: string;
  division?: string;
  ownerName: string;
  fatherSpouseName?: string;
  area: number; // in decimals
  class?: string; // Traditional class (e.g., নাল, ভিটি)
  land_class?: 'Agricultural' | 'Residential' | 'Commercial' | 'Industrial' | 'Waterbody' | 'Forest'; // Modern categorization
  registrationDate?: string;
  mutationStatus?: 'Completed' | 'In Progress' | 'Not Started';
  khatianType?: string;
  status: 'Verified' | 'Pending' | 'Disputed';
  currentStatus: {
    isMortgaged: boolean;
    isDisputed: boolean;
    isGovernmentOwned: boolean;
    isWaqf: boolean;
    lastTaxPaidDate?: string;
  };
  history: LandHistoryEntry[];
}

export interface MutationStatus {
  caseNo: string;
  currentStep: number;
  totalSteps: number;
  status: string;
  lastUpdated: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
