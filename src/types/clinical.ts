export type UserRole = 
  | 'Principal Investigator' 
  | 'Study Coordinator' 
  | 'Institutional Ethics Committee' 
  | 'Ethics Committee Member'
  | 'Pharmacovigilance (NPvCC / DSMB)'
  | 'Pharmacovigilance Officer (NPvCC)'
  | 'Institutional Leadership (Director / Dean)';

export interface UserAccount {
  id: string;
  name: string;
  title: string;
  email: string;
  role: UserRole;
  department: string;
  institution: string;
  avatarInitials: string;
}

export interface InformedConsentRecord {
  id: string;
  subjectId: string;
  siteId: string;
  version: string;
  language: 'English' | 'Hindi' | 'Gujarati' | 'Marathi';
  consentDate: string;
  avRecordingDone: boolean;
  avStorageHash?: string;
  isVulnerablePopulation: boolean;
  impartialWitnessPresent: boolean;
  dpdpConsentGranted: boolean;
  withdrawalStatus: 'Active' | 'Withdrawn';
  withdrawalDate?: string;
  investigatorSignatureDate: string;
}

export interface PharmacovigilanceSignal {
  signalId: string;
  suspectAsuDrug: string;
  adverseEventTerm: string;
  meddraPt: string;
  meddraSoc: string;
  casesReported: number;
  prrScore: number; // Proportional Reporting Ratio (> 2 indicates signal)
  rorScore: number; // Reporting Odds Ratio
  chiSquare: number;
  signalStatus: 'Potential Signal - Monitoring' | 'Confirmed Signal - Action Required' | 'Refuted / Expected';
  dsmbActionRequired: string;
  dateFlagged: string;
}

export interface SiteInfo {
  siteId: string;
  siteName: string;
  institution: string;
  city: string;
  piName: string;
  status: 'Initiated' | 'Active - Enrolling' | 'Pending SIV' | 'Close-out';
  targetEnrolment: number;
  actualEnrolled: number;
  lastMonitoringVisit: string;
  nextMonitoringVisit: string;
  openQueries: number;
  isfCompleteness: number; // %
  drugBatchLot: string;
  drugVialsRemaining: number;
}

export interface ScreenFailureReason {
  reason: string;
  count: number;
  category: 'Inclusion Criteria' | 'Exclusion Criteria' | 'Consent Withdrawn' | 'Prakriti Mismatch';
}

export interface ProtocolDeviation {
  id: string;
  subjectId: string;
  siteId: string;
  deviationType: 'Major' | 'Minor';
  category: 'Visit Window' | 'Informed Consent' | 'Study Drug Non-Compliance' | 'Concomitant Medication' | 'Ineligible Enrolment';
  description: string;
  dateIdentified: string;
  iecReportedDate?: string;
  iecReportedWithin7Days: boolean;
  status: 'Under Investigation' | 'CAPA Implemented' | 'Closed by IEC' | 'Pending Review';
  rootCause: string;
  correctiveAction: string;
  preventiveAction: string;
}

export interface DataQuery {
  id: string;
  subjectId: string;
  siteId: string;
  formName: string;
  fieldName: string;
  queryText: string;
  raisedBy: string;
  dateRaised: string;
  status: 'Open' | 'Under Review' | 'Answered' | 'Closed';
  agingDays: number;
  responseHistory?: {
    respondedBy: string;
    date: string;
    text: string;
  }[];
}

export interface AeSaeRecord {
  id: string;
  subjectId: string;
  siteId: string;
  eventType: 'Adverse Event (AE)' | 'Serious Adverse Event (SAE)';
  term: string;
  meddraSoc: string; // System Organ Class
  meddraPt: string;  // Preferred Term
  severity: 'Mild' | 'Moderate' | 'Severe' | 'Life-Threatening';
  onsetDate: string;
  dateReported: string;
  isSae: boolean;
  saeCriteria?: 'Hospitalization' | 'Disability' | 'Congenital Anomaly' | 'Life Threatening' | 'Death';
  reportedToIecWithin24h: boolean;
  reportedToCdscoWithin24h: boolean;
  hoursElapsedSinceOnset: number;
  regulatoryClockHoursLeft: number; // 24h clock
  whoUmcCausality: 'Certain' | 'Probable' | 'Possible' | 'Unlikely' | 'Conditional' | 'Unassessable';
  naranjoScore: number; // 0-13
  concomitantMedicationWhodrug: string;
  dsmbReviewStatus: 'Pending Review' | 'Signal Evaluated - No Action' | 'Safety Alert Issued';
  outcome: 'Recovered' | 'Recovering' | 'Persistent' | 'Resolved with Sequelae';
}

export interface StudyMilestone {
  id: string;
  title: string;
  targetDate: string;
  actualDate?: string;
  status: 'Completed' | 'In Progress' | 'Upcoming' | 'Delayed';
  phase: string;
  description: string;
}

export interface SubjectVisit {
  visitName: string;
  plannedDay: number;
  targetCount: number;
  completedCount: number;
  windowViolationCount: number;
  missedCount: number;
  complianceRate: number; // %
}

export interface ClinicalStudy {
  id: string;
  protocolNumber: string;
  title: string;
  shortTitle: string;
  phase: 'Phase I' | 'Phase IIa' | 'Phase IIb' | 'Phase III' | 'Phase IV / Post-Marketing';
  indication: string;
  investigationalProduct: string;
  comparatorArm: string;
  studyType: 'Interventional RCT' | 'Observational Safety Surveillance' | 'Adaptive Multi-Arm';
  designDetails: string;
  
  // Leadership
  principalInvestigator: string;
  piAffiliation: string;
  leadCoordinator: string;
  safetyOfficer: string;
  
  // Governance & Reg
  protocolVersion: string;
  protocolApprovalDate: string;
  iecRegistrationNumber: string;
  iecApprovalDate: string;
  iecAnnualRenewalDue: string;
  iecDaysUntilRenewal: number;
  iecStatus: 'Approved' | 'Renewal Pending' | 'Under Review';
  
  ctriNumber: string;
  ctriRegistrationDate: string;
  ctriRegistrationType: 'Prospective' | 'Retrospective';
  ctriNext6MonthUpdateDue: string;
  ctriDaysUntilUpdate: number;
  ctriSyncStatus: 'Verified Prospectively' | 'Update Due' | 'Synced';
  
  // Recruitment & Funnel
  screeningTarget: number;
  totalScreened: number;
  totalEligible: number;
  screenFailuresCount: number;
  screenFailureReasons: ScreenFailureReason[];
  
  targetEnrollment: number;
  currentEnrolled: number;
  runInCompleted: number;
  dropoutCount: number;
  dropoutRatePercent: number;
  
  randomizationTarget: number;
  randomizedActiveArm: number;
  randomizedComparatorArm: number;
  randomizationRatio: string;
  blockRandomizationStatus: 'Balanced & Validated' | 'Variance Detected';
  
  // Compliance & Quality
  visitComplianceOverall: number; // %
  visits: SubjectVisit[];
  
  protocolDeviations: ProtocolDeviation[];
  dataQueries: DataQuery[];
  aeSaeList: AeSaeRecord[];
  
  alcoaScore: {
    attributable: number; // 0-100
    legible: number;
    contemporaneous: number;
    original: number;
    accurate: number;
    complete: number;
    consistent: number;
    enduring: number;
    available: number;
    overall: number;
  };
  
  sites: SiteInfo[];
  milestones: StudyMilestone[];
  
  // Close-out checklist
  closeoutStatus: {
    overallReadiness: number; // %
    tmfAudited: boolean;
    ipReconciliationDone: boolean;
    sampleBiobankArchived: boolean;
    iecFinalReportSubmitted: boolean;
    ctriResultsUploaded: boolean;
    csrDrafted: boolean;
  };
}

export interface SystemAlert {
  id: string;
  studyId: string;
  severity: 'critical' | 'warning' | 'info';
  category: 'Safety (SAE)' | 'Recruitment Lag' | 'IEC Renewal' | 'CTRI Update' | 'Monitoring Overdue';
  title: string;
  message: string;
  timestamp: string;
  actionRequired: string;
  isRead: boolean;
}

export interface AuditTrailEntry {
  id: string;
  timestamp: string;
  actionType: 'CREATE' | 'UPDATE' | 'DELETE' | 'VERIFY' | 'EXPORT' | 'SIGN';
  entity: string;
  entityId: string;
  userRole: UserRole;
  userName: string;
  ipAddress: string;
  alcoaCompliant: boolean;
  sha256Hash: string;
  details: string;
}
