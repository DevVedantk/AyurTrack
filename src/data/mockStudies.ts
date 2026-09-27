import { 
  ClinicalStudy, 
  SystemAlert, 
  AuditTrailEntry,
  UserAccount,
  InformedConsentRecord,
  PharmacovigilanceSignal
} from '../types/clinical';

export const DEFAULT_USERS: UserAccount[] = [
  {
    id: 'USR-01',
    name: 'Prof. Dr. Rajesh Sharma',
    title: 'MD (Ayurveda), Ph.D. • Head of Kayachikitsa',
    email: 'rajesh.sharma@aiia.gov.in',
    role: 'Principal Investigator',
    department: 'Kayachikitsa & Oncology Research',
    institution: 'All India Institute of Ayurveda, New Delhi',
    avatarInitials: 'RS'
  },
  {
    id: 'USR-02',
    name: 'Dr. Priya Nair',
    title: 'BAMS, Senior Clinical Research Coordinator',
    email: 'priya.nair@aiia.gov.in',
    role: 'Study Coordinator',
    department: 'AIIA Clinical Research Unit (CRU)',
    institution: 'All India Institute of Ayurveda, New Delhi',
    avatarInitials: 'PN'
  },
  {
    id: 'USR-03',
    name: 'Prof. Dr. K. V. Raghuram',
    title: 'MD, Chairperson, Institutional Ethics Committee',
    email: 'iec.chair@aiia.gov.in',
    role: 'Institutional Ethics Committee',
    department: 'Institutional Ethics Committee (IEC-AIIA)',
    institution: 'All India Institute of Ayurveda',
    avatarInitials: 'KR'
  },
  {
    id: 'USR-04',
    name: 'Dr. Ananya Sen',
    title: 'MD (Ayur Pharmacology) • National Safety Officer',
    email: 'npvcc.safety@aiia.gov.in',
    role: 'Pharmacovigilance (NPvCC / DSMB)',
    department: 'National Pharmacovigilance Coordination Centre (NPvCC)',
    institution: 'Ministry of Ayush / AIIA Apex',
    avatarInitials: 'AS'
  },
  {
    id: 'USR-05',
    name: 'Prof. Dr. Tanuja Nesari',
    title: 'Director & Apex Research Dean, AIIA',
    email: 'director@aiia.gov.in',
    role: 'Institutional Leadership (Director / Dean)',
    department: 'Office of the Director & Institutional Leadership',
    institution: 'All India Institute of Ayurveda & Ministry of Ayush',
    avatarInitials: 'TN'
  }
];

export const MOCK_CONSENT_RECORDS: InformedConsentRecord[] = [
  {
    id: 'ICF-2024-001',
    subjectId: 'AIIA-01-001',
    siteId: 'SITE-01',
    version: 'ICF v2.1 (Approved 2024-03-28)',
    language: 'Hindi',
    consentDate: '2024-04-20',
    avRecordingDone: true,
    avStorageHash: 'd28a3f5b72e1... [Secure Cert-In Cloud Vault]',
    isVulnerablePopulation: false,
    impartialWitnessPresent: true,
    dpdpConsentGranted: true,
    withdrawalStatus: 'Active',
    investigatorSignatureDate: '2024-04-20'
  },
  {
    id: 'ICF-2024-042',
    subjectId: 'AIIA-01-042',
    siteId: 'SITE-01',
    version: 'ICF v2.3 (Amended)',
    language: 'English',
    consentDate: '2024-07-10',
    avRecordingDone: true,
    avStorageHash: 'e49b81ac421f... [Secure Cert-In Cloud Vault]',
    isVulnerablePopulation: false,
    impartialWitnessPresent: false,
    dpdpConsentGranted: true,
    withdrawalStatus: 'Active',
    investigatorSignatureDate: '2024-07-10'
  },
  {
    id: 'ICF-2024-057',
    subjectId: 'AIIA-01-057',
    siteId: 'SITE-01',
    version: 'ICF v2.3 (Amended)',
    language: 'Hindi',
    consentDate: '2024-07-28',
    avRecordingDone: true,
    avStorageHash: '8b22cf901a55... [Secure Cert-In Cloud Vault]',
    isVulnerablePopulation: true,
    impartialWitnessPresent: true,
    dpdpConsentGranted: true,
    withdrawalStatus: 'Active',
    investigatorSignatureDate: '2024-07-28'
  },
  {
    id: 'ICF-2024-099',
    subjectId: 'NIA-03-019',
    siteId: 'SITE-03',
    version: 'ICF v2.3 (Amended)',
    language: 'Hindi',
    consentDate: '2024-08-14',
    avRecordingDone: false,
    isVulnerablePopulation: false,
    impartialWitnessPresent: false,
    dpdpConsentGranted: true,
    withdrawalStatus: 'Active',
    investigatorSignatureDate: '2024-08-14'
  },
  {
    id: 'ICF-2024-104',
    subjectId: 'IPGTRA-02-031',
    siteId: 'SITE-02',
    version: 'ICF v2.1',
    language: 'Gujarati',
    consentDate: '2024-08-01',
    avRecordingDone: true,
    avStorageHash: '3f7a19bc8921... [Secure Cert-In Cloud Vault]',
    isVulnerablePopulation: false,
    impartialWitnessPresent: true,
    dpdpConsentGranted: true,
    withdrawalStatus: 'Active',
    investigatorSignatureDate: '2024-08-01'
  },
  {
    id: 'ICF-2024-118',
    subjectId: 'AIIA-01-088',
    siteId: 'SITE-01',
    version: 'ICF v2.3',
    language: 'English',
    consentDate: '2024-08-19',
    avRecordingDone: true,
    avStorageHash: '91bcfa34521a... [Secure Cert-In Cloud Vault]',
    isVulnerablePopulation: false,
    impartialWitnessPresent: false,
    dpdpConsentGranted: false,
    withdrawalStatus: 'Withdrawn',
    withdrawalDate: '2024-08-25',
    investigatorSignatureDate: '2024-08-19'
  }
];

export const MOCK_PV_SIGNALS: PharmacovigilanceSignal[] = [
  {
    signalId: 'SIG-NPVCC-2026-08',
    suspectAsuDrug: 'Withania somnifera (Ashwagandha standardized 500mg)',
    adverseEventTerm: 'Transient Mild Thyrotoxicosis / Subclinical TSH Suppression',
    meddraPt: 'Thyroxine free increased (10043818)',
    meddraSoc: 'Endocrine disorders',
    casesReported: 4,
    prrScore: 2.84,
    rorScore: 3.12,
    chiSquare: 6.42,
    signalStatus: 'Potential Signal - Monitoring',
    dsmbActionRequired: 'Routine monitoring of baseline and 12-week thyroid panels across all active Ashwagandha arms.',
    dateFlagged: '2026-09-15'
  },
  {
    signalId: 'SIG-NPVCC-2026-04',
    suspectAsuDrug: 'Tinospora cordifolia (Guduchi aqueous extract)',
    adverseEventTerm: 'Transient Hepatic Transaminase Elevation (Grade 1)',
    meddraPt: 'Alanine aminotransferase increased (10001551)',
    meddraSoc: 'Hepatobiliary disorders',
    casesReported: 3,
    prrScore: 1.45,
    rorScore: 1.52,
    chiSquare: 2.11,
    signalStatus: 'Refuted / Expected',
    dsmbActionRequired: 'Self-resolved within 7 days. Concomitant paclitaxel-carboplatin identified as primary confounding etiology.',
    dateFlagged: '2026-08-20'
  },
  {
    signalId: 'SIG-NPVCC-2026-11',
    suspectAsuDrug: 'Shodhit Shilajit (Purified Asphaltum punjabianum 500mg)',
    adverseEventTerm: 'Transient Epigastric Burning (Ushnatva)',
    meddraPt: 'Dyspepsia (10013946)',
    meddraSoc: 'Gastrointestinal disorders',
    casesReported: 7,
    prrScore: 3.25,
    rorScore: 3.68,
    chiSquare: 9.15,
    signalStatus: 'Confirmed Signal - Action Required',
    dsmbActionRequired: 'Protocol amendment recommended: mandate post-prandial administration with lukewarm milk or honey water (Anupana).',
    dateFlagged: '2026-09-22'
  }
];

export const INITIAL_STUDIES: ClinicalStudy[] = [
  {
    id: 'AYUR-ONCO-01',
    protocolNumber: 'AIIA/CTMS/2024/ONCO-08',
    title: 'Standardized Hydroethanolic Extract of Withania somnifera (Ashwagandha) and Tinospora cordifolia (Guduchi) as an Adjuvant to First-Line Paclitaxel-Carboplatin Chemotherapy in Advanced Epithelial Ovarian Cancer: A Multi-Centre, Double-Blind, Randomized Placebo-Controlled Phase IIb Trial',
    shortTitle: 'Ashwagandha & Guduchi in Ovarian Cancer (Phase IIb)',
    phase: 'Phase IIb',
    indication: 'Advanced Epithelial Ovarian Cancer (FIGO Stage III/IV)',
    investigationalProduct: 'AIIA-OncoHerbal Cap (Ashwagandha 500mg + Guduchi 300mg standardized extract)',
    comparatorArm: 'Identical Matching Placebo Capsule (Microcrystalline Cellulose + Natural Food Color)',
    studyType: 'Interventional RCT',
    designDetails: 'Prospective, randomized, double-blind, parallel-group, 1:1 allocation, multi-centre trial across 4 tertiary academic cancer centres.',
    
    // Leadership
    principalInvestigator: 'Prof. Dr. Rajesh Sharma, MD (Ayurveda), Ph.D.',
    piAffiliation: 'Department of Kayachikitsa & Oncology Research, All India Institute of Ayurveda (AIIA), New Delhi',
    leadCoordinator: 'Dr. Priya Nair, BAMS, Clinical Research Fellow',
    safetyOfficer: 'Dr. Ananya Sen, MD (Ayur Pharmacology), NPvCC Safety Liaison',
    
    // Governance & Reg
    protocolVersion: 'Version 2.3 (Amended & Approved)',
    protocolApprovalDate: '2024-03-15',
    iecRegistrationNumber: 'IEC-AIIA/2024/RES-089 (CDSCO Reg: ECR/124/Inst/DL/2013/RR-19)',
    iecApprovalDate: '2024-03-28',
    iecAnnualRenewalDue: '2027-03-27',
    iecDaysUntilRenewal: 181,
    iecStatus: 'Approved',
    
    ctriNumber: 'CTRI/2024/04/065120',
    ctriRegistrationDate: '2024-04-12',
    ctriRegistrationType: 'Prospective',
    ctriNext6MonthUpdateDue: '2026-10-12',
    ctriDaysUntilUpdate: 15,
    ctriSyncStatus: 'Verified Prospectively',
    
    // Recruitment & Funnel
    screeningTarget: 220,
    totalScreened: 184,
    totalEligible: 142,
    screenFailuresCount: 42,
    screenFailureReasons: [
      { reason: 'ECOG Performance Status > 2', count: 16, category: 'Exclusion Criteria' },
      { reason: 'Severe Hepatic/Renal Impairment (AST/ALT > 3x ULN)', count: 12, category: 'Exclusion Criteria' },
      { reason: 'Concomitant Unapproved Herbal / Homeopathic Meds', count: 8, category: 'Concomitant Medication' as any },
      { reason: 'Withdrew Consent Prior to Randomization', count: 4, category: 'Consent Withdrawn' },
      { reason: 'Prakriti Incompatibility per Safety Exclusion Sub-clause', count: 2, category: 'Prakriti Mismatch' }
    ],
    
    targetEnrollment: 120,
    currentEnrolled: 108,
    runInCompleted: 104,
    dropoutCount: 4,
    dropoutRatePercent: 3.7,
    
    randomizationTarget: 120,
    randomizedActiveArm: 53,
    randomizedComparatorArm: 51,
    randomizationRatio: '1:1 Balanced Block Randomization',
    blockRandomizationStatus: 'Balanced & Validated',
    
    // Visit compliance
    visitComplianceOverall: 96.4,
    visits: [
      { visitName: 'Screening (Day -14 to 0)', plannedDay: -7, targetCount: 184, completedCount: 184, windowViolationCount: 0, missedCount: 0, complianceRate: 100 },
      { visitName: 'Baseline / Cycle 1 (Day 1)', plannedDay: 1, targetCount: 108, completedCount: 108, windowViolationCount: 2, missedCount: 0, complianceRate: 98.1 },
      { visitName: 'Cycle 2 / Interim 1 (Day 21)', plannedDay: 21, targetCount: 104, completedCount: 102, windowViolationCount: 3, missedCount: 2, complianceRate: 96.2 },
      { visitName: 'Cycle 3 / Interim 2 (Day 42)', plannedDay: 42, targetCount: 98, completedCount: 95, windowViolationCount: 4, missedCount: 3, complianceRate: 94.9 },
      { visitName: 'Cycle 4 / Mid-Point (Day 63)', plannedDay: 63, targetCount: 88, completedCount: 85, windowViolationCount: 1, missedCount: 2, complianceRate: 96.6 },
      { visitName: 'Cycle 6 / End of Study (Day 126)', plannedDay: 126, targetCount: 64, completedCount: 62, windowViolationCount: 2, missedCount: 2, complianceRate: 96.9 }
    ],
    
    protocolDeviations: [
      {
        id: 'DEV-2026-003',
        subjectId: 'AIIA-01-042',
        siteId: 'SITE-01',
        deviationType: 'Minor',
        category: 'Visit Window',
        description: 'Subject Cycle 3 visit performed at Day 45 instead of Day 42 (window ±2 days elapsed by 24h due to inter-state regional rail disruption).',
        dateIdentified: '2026-09-18',
        iecReportedDate: '2026-09-22',
        iecReportedWithin7Days: true,
        status: 'Closed by IEC',
        rootCause: 'Patient travel delay beyond subject control; drug kit count confirmed adherent.',
        correctiveAction: 'Remote telemetry check completed by coordinator; visit assessments documented.',
        preventiveAction: 'Study coordinator initiated 3-day advance SMS transit confirmation protocol.'
      },
      {
        id: 'DEV-2026-004',
        subjectId: 'NIA-03-019',
        siteId: 'SITE-03',
        deviationType: 'Major',
        category: 'Concomitant Medication',
        description: 'Subject consumed unprescribed over-the-counter Ayurvedic Bhasma preparation for joint ache without prior intimation to study physician.',
        dateIdentified: '2026-09-21',
        iecReportedDate: '2026-09-25',
        iecReportedWithin7Days: true,
        status: 'Under Investigation',
        rootCause: 'Lack of subject recall regarding OTC Ayurvedic formulations exclusion during home visits.',
        correctiveAction: 'Bhasma discontinued immediately; liver/renal function panels re-assayed normal.',
        preventiveAction: 'Re-counselled subject and caregiver with visual medication-restriction booklet.'
      }
    ],
    
    dataQueries: [
      {
        id: 'QRY-8841',
        subjectId: 'AIIA-01-089',
        siteId: 'SITE-01',
        formName: 'eCRF Section 4: Concomitant Chemotherapy',
        fieldName: 'PACLITAXEL_INFUSION_RATE_MG_M2',
        queryText: 'Infusion rate recorded as 135 mg/m2, whereas clinical notes mention dose reduction to 110 mg/m2 due to Grade 2 neutropenia. Please clarify and provide signed amendment note.',
        raisedBy: 'Lead Data Monitor (DM-02)',
        dateRaised: '2026-09-24',
        status: 'Open',
        agingDays: 3,
        responseHistory: []
      },
      {
        id: 'QRY-8820',
        subjectId: 'IPGTRA-02-031',
        siteId: 'SITE-02',
        formName: 'eCRF Section 7: QoL EORTC QLQ-C30',
        fieldName: 'QUESTION_24_FATIGUE_SCORE',
        queryText: 'Question 24 response missing in primary eCRF scan. Kindly verify source record document.',
        raisedBy: 'Automated CDASH Validation Engine',
        dateRaised: '2026-09-22',
        status: 'Answered',
        agingDays: 5,
        responseHistory: [
          {
            respondedBy: 'Dr. V. Dave (Site Coordinator)',
            date: '2026-09-23',
            text: 'Source document re-verified. Patient recorded score 3 (Quite a bit). Form re-signed and uploaded to EDC.'
          }
        ]
      },
      {
        id: 'QRY-8794',
        subjectId: 'TMC-04-012',
        siteId: 'SITE-04',
        formName: 'eCRF Section 2: Laboratory Hematology',
        fieldName: 'PLATELET_COUNT_10E9_L',
        queryText: 'Platelet count 88 x 10^9/L matches CTCAE Grade 1 thrombocytopenia; confirm whether adverse event CRF 6.1 was triggered.',
        raisedBy: 'Safety Data Manager (SDM-01)',
        dateRaised: '2026-09-19',
        status: 'Closed',
        agingDays: 8,
        responseHistory: [
          {
            respondedBy: 'Dr. S. Kulkarni (Sub-I)',
            date: '2026-09-20',
            text: 'AE CRF 6.1 logged on 2026-09-19 under chemotherapy-induced transient thrombocytopenia. Attributed to carboplatin.'
          }
        ]
      }
    ],
    
    aeSaeList: [
      {
        id: 'SAE-2026-004',
        subjectId: 'AIIA-01-057',
        siteId: 'SITE-01',
        eventType: 'Serious Adverse Event (SAE)',
        term: 'Febrile Neutropenia with Dehydration',
        meddraSoc: 'Infections and infestations',
        meddraPt: 'Febrile neutropenia (10016288)',
        severity: 'Severe',
        onsetDate: '2026-09-25T14:30:00Z',
        dateReported: '2026-09-26T08:15:00Z',
        isSae: true,
        saeCriteria: 'Hospitalization',
        reportedToIecWithin24h: true,
        reportedToCdscoWithin24h: true,
        hoursElapsedSinceOnset: 22,
        regulatoryClockHoursLeft: 2,
        whoUmcCausality: 'Unlikely',
        naranjoScore: 2,
        concomitantMedicationWhodrug: 'Paclitaxel 175mg/m2 + Carboplatin AUC 5 (WHODrug DREC: 004128)',
        dsmbReviewStatus: 'Pending Review',
        outcome: 'Recovering'
      },
      {
        id: 'AE-2026-018',
        subjectId: 'NIA-03-044',
        siteId: 'SITE-03',
        eventType: 'Adverse Event (AE)',
        term: 'Transient Epigastric Burning (Ushnatva sensation)',
        meddraSoc: 'Gastrointestinal disorders',
        meddraPt: 'Dyspepsia (10013946)',
        severity: 'Mild',
        onsetDate: '2026-09-20T10:00:00Z',
        dateReported: '2026-09-21T11:00:00Z',
        isSae: false,
        reportedToIecWithin24h: true,
        reportedToCdscoWithin24h: true,
        hoursElapsedSinceOnset: 168,
        regulatoryClockHoursLeft: 0,
        whoUmcCausality: 'Probable',
        naranjoScore: 6,
        concomitantMedicationWhodrug: 'Ondansetron 8mg PO',
        dsmbReviewStatus: 'Signal Evaluated - No Action',
        outcome: 'Recovered'
      },
      {
        id: 'AE-2026-017',
        subjectId: 'IPGTRA-02-019',
        siteId: 'SITE-02',
        eventType: 'Adverse Event (AE)',
        term: 'Mild Constipation (Vibandha)',
        meddraSoc: 'Gastrointestinal disorders',
        meddraPt: 'Constipation (10010774)',
        severity: 'Mild',
        onsetDate: '2026-09-12T09:00:00Z',
        dateReported: '2026-09-13T10:00:00Z',
        isSae: false,
        reportedToIecWithin24h: true,
        reportedToCdscoWithin24h: true,
        hoursElapsedSinceOnset: 360,
        regulatoryClockHoursLeft: 0,
        whoUmcCausality: 'Possible',
        naranjoScore: 4,
        concomitantMedicationWhodrug: 'None reported',
        dsmbReviewStatus: 'Signal Evaluated - No Action',
        outcome: 'Recovered'
      }
    ],
    
    alcoaScore: {
      attributable: 99.2,
      legible: 98.8,
      contemporaneous: 97.4,
      original: 99.6,
      accurate: 98.1,
      complete: 97.9,
      consistent: 98.5,
      enduring: 100.0,
      available: 99.5,
      overall: 98.8
    },
    
    sites: [
      {
        siteId: 'SITE-01',
        siteName: 'All India Institute of Ayurveda (AIIA) - Apex Centre',
        institution: 'All India Institute of Ayurveda, Sarita Vihar, New Delhi',
        city: 'New Delhi',
        piName: 'Prof. Dr. Rajesh Sharma, MD (Ayur)',
        status: 'Active - Enrolling',
        targetEnrolment: 45,
        actualEnrolled: 42,
        lastMonitoringVisit: '2026-09-10',
        nextMonitoringVisit: '2026-10-08',
        openQueries: 1,
        isfCompleteness: 98.5,
        drugBatchLot: 'AIIA-LOT-2024-B1',
        drugVialsRemaining: 240
      },
      {
        siteId: 'SITE-02',
        siteName: 'Institute of Teaching & Research in Ayurveda (ITRA)',
        institution: 'ITRA / IPGTRA, Jamnagar, Gujarat',
        city: 'Jamnagar',
        piName: 'Prof. Dr. Hitesh Vyas, MD (Ayur)',
        status: 'Active - Enrolling',
        targetEnrolment: 30,
        actualEnrolled: 27,
        lastMonitoringVisit: '2026-08-28',
        nextMonitoringVisit: '2026-09-30',
        openQueries: 1,
        isfCompleteness: 94.0,
        drugBatchLot: 'AIIA-LOT-2024-B1',
        drugVialsRemaining: 180
      },
      {
        siteId: 'SITE-03',
        siteName: 'National Institute of Ayurveda (Deemed to be University)',
        institution: 'NIA, Jorawar Singh Gate, Amer Road, Jaipur, Rajasthan',
        city: 'Jaipur',
        piName: 'Prof. Dr. Sanjeev Sharma, Director NIA',
        status: 'Active - Enrolling',
        targetEnrolment: 25,
        actualEnrolled: 21,
        lastMonitoringVisit: '2026-09-02',
        nextMonitoringVisit: '2026-10-05',
        openQueries: 1,
        isfCompleteness: 91.5,
        drugBatchLot: 'AIIA-LOT-2024-B2',
        drugVialsRemaining: 120
      },
      {
        siteId: 'SITE-04',
        siteName: 'Tata Memorial Centre - Ayush Integrative Oncology Unit',
        institution: 'TMC Advanced Centre for Treatment, Research and Education (ACTREC), Navi Mumbai',
        city: 'Navi Mumbai',
        piName: 'Dr. Sharad Pawar, MD & Dr. M. Chitale, DM (Med Onco)',
        status: 'Active - Enrolling',
        targetEnrolment: 20,
        actualEnrolled: 18,
        lastMonitoringVisit: '2026-09-14',
        nextMonitoringVisit: '2026-10-14',
        openQueries: 0,
        isfCompleteness: 99.0,
        drugBatchLot: 'AIIA-LOT-2024-B2',
        drugVialsRemaining: 110
      }
    ],
    
    milestones: [
      { id: 'M-01', title: 'Protocol Scientific Committee Clearance', targetDate: '2024-02-15', actualDate: '2024-02-10', status: 'Completed', phase: 'Planning', description: 'Institutional scientific advisory board unanimous green light.' },
      { id: 'M-02', title: 'Institutional Ethics Committee (IEC) Clearance', targetDate: '2024-03-30', actualDate: '2024-03-28', status: 'Completed', phase: 'Approvals', description: 'Full board review with patient information sheets in Hindi, English, and Gujarati.' },
      { id: 'M-03', title: 'Prospective CTRI Registration', targetDate: '2024-04-15', actualDate: '2024-04-12', status: 'Completed', phase: 'Regulatory', description: 'Registered prospectively prior to enrollment of first patient.' },
      { id: 'M-04', title: 'First Patient In (FPI)', targetDate: '2024-05-01', actualDate: '2024-04-26', status: 'Completed', phase: 'Recruitment', description: 'First subject screened and enrolled at Apex Centre AIIA New Delhi.' },
      { id: 'M-05', title: '50% Enrolment Target (n=60)', targetDate: '2025-01-30', actualDate: '2025-01-20', status: 'Completed', phase: 'Recruitment', description: 'Interim safety review conducted by DSMB; no halting signals.' },
      { id: 'M-06', title: 'Last Patient In (LPI - n=120)', targetDate: '2026-11-30', status: 'In Progress', phase: 'Recruitment', description: 'Targeting remaining 12 subjects across AIIA and NIA Jaipur.' },
      { id: 'M-07', title: 'Last Patient Out (LPO)', targetDate: '2027-04-30', status: 'Upcoming', phase: 'Follow-up', description: 'Completion of 6 cycles of chemo-adjunct therapy and 30-day safety follow-up.' },
      { id: 'M-08', title: 'Database Lock & Clean File Certification', targetDate: '2027-06-15', status: 'Upcoming', phase: 'Data Management', description: 'Complete query closure, SDTM reconciliation, and blind break protocol.' },
      { id: 'M-09', title: 'Final Clinical Study Report (CSR) & CTRI Upload', targetDate: '2027-08-30', status: 'Upcoming', phase: 'Dissemination', description: 'Submission to Ministry of Ayush, CDSCO, and global high-impact peer-reviewed publication.' }
    ],
    
    closeoutStatus: {
      overallReadiness: 38,
      tmfAudited: true,
      ipReconciliationDone: false,
      sampleBiobankArchived: false,
      iecFinalReportSubmitted: false,
      ctriResultsUploaded: false,
      csrDrafted: false
    }
  },
  {
    id: 'AYUR-METAB-03',
    protocolNumber: 'AIIA/CTMS/2023/MET-14',
    title: 'Multi-Centric Randomized Double-Blind Controlled Trial Evaluating Nisha-Amalaki Granules and Shodhit Shilajit on Insulin Sensitivity, Beta-Cell Reserve, and Progression to Type 2 Diabetes in High-Risk Impaired Glucose Tolerance',
    shortTitle: 'Nisha-Amalaki & Shilajit in Pre-Diabetes (Phase III)',
    phase: 'Phase III',
    indication: 'Impaired Glucose Tolerance / Pre-Diabetes (ADA Criteria)',
    investigationalProduct: 'Nisha-Amalaki Choorna Granules (Curcuma longa + Emblica officinalis 3g BD) + Shodhit Shilajit Cap 500mg',
    comparatorArm: 'Identical Placebo Granules (Roasted Barley flour + Permitted Excipients) + Placebo Capsule',
    studyType: 'Interventional RCT',
    designDetails: 'Phase III superiority trial, 24-week intervention with 12-week washout, triple-blinded.',
    
    principalInvestigator: 'Prof. Dr. Tanuja Nesari, MD (Ayur), Director AIIA',
    piAffiliation: 'Director & Apex Investigator, All India Institute of Ayurveda',
    leadCoordinator: 'Dr. Vivek Garg, Research Associate',
    safetyOfficer: 'Dr. Sneha Joshi, NPvCC ASU Monitor',
    
    protocolVersion: 'Version 3.1',
    protocolApprovalDate: '2023-10-10',
    iecRegistrationNumber: 'IEC-AIIA/2023/RES-042',
    iecApprovalDate: '2023-10-24',
    iecAnnualRenewalDue: '2026-10-23',
    iecDaysUntilRenewal: 26,
    iecStatus: 'Approved',
    
    ctriNumber: 'CTRI/2023/11/059841',
    ctriRegistrationDate: '2023-11-18',
    ctriRegistrationType: 'Prospective',
    ctriNext6MonthUpdateDue: '2026-11-18',
    ctriDaysUntilUpdate: 52,
    ctriSyncStatus: 'Verified Prospectively',
    
    screeningTarget: 350,
    totalScreened: 310,
    totalEligible: 215,
    screenFailuresCount: 95,
    screenFailureReasons: [
      { reason: 'Fasting Plasma Glucose >= 126 mg/dL (Frank Diabetes)', count: 48, category: 'Exclusion Criteria' },
      { reason: 'HbA1c > 6.4% or < 5.7%', count: 24, category: 'Exclusion Criteria' },
      { reason: 'Refused Randomization Schedule', count: 14, category: 'Consent Withdrawn' },
      { reason: 'Prakriti Vata-dominant high anxiety score', count: 9, category: 'Prakriti Mismatch' }
    ],
    
    targetEnrollment: 200,
    currentEnrolled: 192,
    runInCompleted: 188,
    dropoutCount: 6,
    dropoutRatePercent: 3.1,
    
    randomizationTarget: 200,
    randomizedActiveArm: 96,
    randomizedComparatorArm: 92,
    randomizationRatio: '1:1 Computer-Generated Stratified Blocks',
    blockRandomizationStatus: 'Balanced & Validated',
    
    visitComplianceOverall: 97.8,
    visits: [
      { visitName: 'Screening (Day -21 to 0)', plannedDay: -14, targetCount: 310, completedCount: 310, windowViolationCount: 0, missedCount: 0, complianceRate: 100 },
      { visitName: 'Baseline Randomization (Day 1)', plannedDay: 1, targetCount: 192, completedCount: 192, windowViolationCount: 1, missedCount: 0, complianceRate: 99.4 },
      { visitName: 'Week 4 Visit (Day 28)', plannedDay: 28, targetCount: 190, completedCount: 188, windowViolationCount: 2, missedCount: 2, complianceRate: 98.9 },
      { visitName: 'Week 12 Interim (Day 84)', plannedDay: 84, targetCount: 184, completedCount: 180, windowViolationCount: 3, missedCount: 4, complianceRate: 97.8 },
      { visitName: 'Week 24 Primary Endpoint (Day 168)', plannedDay: 168, targetCount: 160, completedCount: 156, windowViolationCount: 2, missedCount: 4, complianceRate: 97.5 }
    ],
    
    protocolDeviations: [],
    dataQueries: [],
    aeSaeList: [],
    alcoaScore: {
      attributable: 99.5,
      legible: 99.1,
      contemporaneous: 98.8,
      original: 99.8,
      accurate: 99.2,
      complete: 98.9,
      consistent: 99.4,
      enduring: 100.0,
      available: 99.7,
      overall: 99.4
    },
    sites: [
      {
        siteId: 'SITE-01',
        siteName: 'All India Institute of Ayurveda - Diabetes Specialty Clinic',
        institution: 'All India Institute of Ayurveda, New Delhi',
        city: 'New Delhi',
        piName: 'Prof. Dr. Tanuja Nesari, MD (Ayur)',
        status: 'Active - Enrolling',
        targetEnrolment: 80,
        actualEnrolled: 78,
        lastMonitoringVisit: '2026-09-12',
        nextMonitoringVisit: '2026-10-12',
        openQueries: 0,
        isfCompleteness: 99.0,
        drugBatchLot: 'AIIA-MET-2023-A',
        drugVialsRemaining: 340
      },
      {
        siteId: 'SITE-05',
        siteName: 'Banaras Hindu University (BHU) - Faculty of Ayurveda',
        institution: 'IMS, Banaras Hindu University, Varanasi, UP',
        city: 'Varanasi',
        piName: 'Prof. Dr. K. N. Dwivedi, MD (Ayur)',
        status: 'Active - Enrolling',
        targetEnrolment: 60,
        actualEnrolled: 58,
        lastMonitoringVisit: '2026-08-30',
        nextMonitoringVisit: '2026-10-02',
        openQueries: 1,
        isfCompleteness: 96.0,
        drugBatchLot: 'AIIA-MET-2023-A',
        drugVialsRemaining: 210
      },
      {
        siteId: 'SITE-03',
        siteName: 'National Institute of Ayurveda',
        institution: 'NIA Jaipur',
        city: 'Jaipur',
        piName: 'Dr. C. P. Sharma, Associate Professor',
        status: 'Active - Enrolling',
        targetEnrolment: 60,
        actualEnrolled: 56,
        lastMonitoringVisit: '2026-09-08',
        nextMonitoringVisit: '2026-10-10',
        openQueries: 0,
        isfCompleteness: 97.5,
        drugBatchLot: 'AIIA-MET-2023-B',
        drugVialsRemaining: 190
      }
    ],
    milestones: [
      { id: 'M-101', title: 'Protocol Clearance', targetDate: '2023-09-30', actualDate: '2023-09-25', status: 'Completed', phase: 'Planning', description: 'Cleared with unanimous endorsement.' },
      { id: 'M-102', title: 'IEC Clearance', targetDate: '2023-10-30', actualDate: '2023-10-24', status: 'Completed', phase: 'Approvals', description: 'Ethics approval secured.' },
      { id: 'M-103', title: 'CTRI Registration (Prospective)', targetDate: '2023-11-20', actualDate: '2023-11-18', status: 'Completed', phase: 'Regulatory', description: 'Registered prospectively.' },
      { id: 'M-104', title: 'FPI First Patient Enrolled', targetDate: '2023-12-15', actualDate: '2023-12-08', status: 'Completed', phase: 'Recruitment', description: 'Enrolment initiated across all sites.' },
      { id: 'M-105', title: 'Full Enrolment Complete (n=200)', targetDate: '2026-10-30', status: 'In Progress', phase: 'Recruitment', description: '192 enrolled, final 8 patients in run-in.' }
    ],
    closeoutStatus: {
      overallReadiness: 52,
      tmfAudited: true,
      ipReconciliationDone: false,
      sampleBiobankArchived: true,
      iecFinalReportSubmitted: false,
      ctriResultsUploaded: false,
      csrDrafted: false
    }
  },
  {
    id: 'AYUR-NEURO-02',
    protocolNumber: 'AIIA/CTMS/2024/NEURO-05',
    title: 'A 24-Week Multi-Centric Randomized Double-Blind Active-Controlled Trial of Medhya Rasayana (Brahmi Ghrita & Shankhpushpi Kwatha) vs Donepezil in Mild Cognitive Impairment (MCI)',
    shortTitle: 'Brahmi & Shankhpushpi in MCI (Phase II)',
    phase: 'Phase IIa',
    indication: 'Amnestic Mild Cognitive Impairment (Petersen Criteria)',
    investigationalProduct: 'Medhya Rasayana Compound (Standardized Bacopa monnieri Ghrita 10g BD + Convolvulus pluricaulis decoction 30ml BD)',
    comparatorArm: 'Donepezil Hydrochloride 5mg OD + Matching Vehicle Ghrita',
    studyType: 'Interventional RCT',
    designDetails: 'Active-controlled non-inferiority RCT with comprehensive MoCA, ADAS-Cog and functional MRI neuro-imaging endpoints.',
    
    principalInvestigator: 'Dr. Anand Kumar, MD (Ayur), Ph.D., Department of Panchakarma',
    piAffiliation: 'All India Institute of Ayurveda, New Delhi',
    leadCoordinator: 'Dr. Meera Nambiar, Lead Clinical Research Associate',
    safetyOfficer: 'Dr. Ananya Sen, NPvCC ASU Monitor',
    
    protocolVersion: 'Version 1.4',
    protocolApprovalDate: '2024-07-20',
    iecRegistrationNumber: 'IEC-AIIA/2024/RES-112',
    iecApprovalDate: '2024-08-05',
    iecAnnualRenewalDue: '2027-08-04',
    iecDaysUntilRenewal: 310,
    iecStatus: 'Approved',
    
    ctriNumber: 'CTRI/2024/08/070915',
    ctriRegistrationDate: '2024-08-19',
    ctriRegistrationType: 'Prospective',
    ctriNext6MonthUpdateDue: '2027-02-19',
    ctriDaysUntilUpdate: 145,
    ctriSyncStatus: 'Verified Prospectively',
    
    screeningTarget: 140,
    totalScreened: 96,
    totalEligible: 64,
    screenFailuresCount: 32,
    screenFailureReasons: [
      { reason: 'MoCA Score < 18 or > 26 (Outside MCI Window)', count: 18, category: 'Exclusion Criteria' },
      { reason: 'Depression / GDS Score > 6', count: 8, category: 'Exclusion Criteria' },
      { reason: 'CT/MRI showing significant vascular stroke lesions', count: 4, category: 'Exclusion Criteria' },
      { reason: 'Withdrew Consent before baseline MRI', count: 2, category: 'Consent Withdrawn' }
    ],
    
    targetEnrollment: 60,
    currentEnrolled: 48,
    runInCompleted: 46,
    dropoutCount: 1,
    dropoutRatePercent: 2.1,
    
    randomizationTarget: 60,
    randomizedActiveArm: 24,
    randomizedComparatorArm: 23,
    randomizationRatio: '1:1 Permuted Block Randomization',
    blockRandomizationStatus: 'Balanced & Validated',
    
    visitComplianceOverall: 98.2,
    visits: [
      { visitName: 'Screening (Day -14 to 0)', plannedDay: -7, targetCount: 96, completedCount: 96, windowViolationCount: 0, missedCount: 0, complianceRate: 100 },
      { visitName: 'Baseline & MRI (Day 1)', plannedDay: 1, targetCount: 48, completedCount: 48, windowViolationCount: 0, missedCount: 0, complianceRate: 100 },
      { visitName: 'Week 8 Review (Day 56)', plannedDay: 56, targetCount: 44, completedCount: 43, windowViolationCount: 1, missedCount: 1, complianceRate: 97.7 },
      { visitName: 'Week 16 Review (Day 112)', plannedDay: 112, targetCount: 38, completedCount: 37, windowViolationCount: 1, missedCount: 1, complianceRate: 97.4 },
      { visitName: 'Week 24 Final & Post-MRI (Day 168)', plannedDay: 168, targetCount: 22, completedCount: 22, windowViolationCount: 0, missedCount: 0, complianceRate: 100 }
    ],
    
    protocolDeviations: [],
    dataQueries: [],
    aeSaeList: [],
    alcoaScore: {
      attributable: 99.8,
      legible: 99.4,
      contemporaneous: 98.9,
      original: 100.0,
      accurate: 99.1,
      complete: 98.7,
      consistent: 99.0,
      enduring: 100.0,
      available: 99.8,
      overall: 99.4
    },
    sites: [
      {
        siteId: 'SITE-01',
        siteName: 'AIIA Neuro-Ayurveda Unit',
        institution: 'All India Institute of Ayurveda, New Delhi',
        city: 'New Delhi',
        piName: 'Dr. Anand Kumar, MD (Ayur)',
        status: 'Active - Enrolling',
        targetEnrolment: 30,
        actualEnrolled: 26,
        lastMonitoringVisit: '2026-09-05',
        nextMonitoringVisit: '2026-10-06',
        openQueries: 0,
        isfCompleteness: 98.0,
        drugBatchLot: 'AIIA-BRH-2024-01',
        drugVialsRemaining: 180
      },
      {
        siteId: 'SITE-06',
        siteName: 'NIMHANS - Department of Integrative Medicine',
        institution: 'National Institute of Mental Health and Neurosciences, Bengaluru',
        city: 'Bengaluru',
        piName: 'Dr. R. Venkataraman, MD (Ayur) & Dr. G. Prasad, MD (Neuro)',
        status: 'Active - Enrolling',
        targetEnrolment: 30,
        actualEnrolled: 22,
        lastMonitoringVisit: '2026-08-25',
        nextMonitoringVisit: '2026-09-29',
        openQueries: 0,
        isfCompleteness: 95.0,
        drugBatchLot: 'AIIA-BRH-2024-01',
        drugVialsRemaining: 140
      }
    ],
    milestones: [
      { id: 'M-201', title: 'Ethics & Scientific Approvals', targetDate: '2024-08-10', actualDate: '2024-08-05', status: 'Completed', phase: 'Approvals', description: 'Approved.' },
      { id: 'M-202', title: 'CTRI Registration (Prospective)', targetDate: '2024-08-25', actualDate: '2024-08-19', status: 'Completed', phase: 'Regulatory', description: 'Verified.' },
      { id: 'M-203', title: 'Site Activation & SIV', targetDate: '2024-09-15', actualDate: '2024-09-10', status: 'Completed', phase: 'Initiation', description: 'Both centres active.' },
      { id: 'M-204', title: '50% Enrolment Target', targetDate: '2026-10-15', actualDate: '2026-08-30', status: 'Completed', phase: 'Recruitment', description: 'Achieved ahead of target.' }
    ],
    closeoutStatus: {
      overallReadiness: 25,
      tmfAudited: true,
      ipReconciliationDone: false,
      sampleBiobankArchived: false,
      iecFinalReportSubmitted: false,
      ctriResultsUploaded: false,
      csrDrafted: false
    }
  }
];

export const INITIAL_ALERTS: SystemAlert[] = [
  {
    id: 'ALT-01',
    studyId: 'AYUR-ONCO-01',
    severity: 'critical',
    category: 'Safety (SAE)',
    title: 'Urgent 24-Hour SAE Clock Active',
    message: 'SAE-2026-004 (Febrile Neutropenia with Dehydration) at AIIA Delhi: Regulatory clock indicates 2 hours remaining for CDSCO & IEC initial transmission.',
    timestamp: '2026-09-27 10:15 IST',
    actionRequired: 'Review expedited Form 11 narrative and e-sign CDSCO portal submission receipt.',
    isRead: false
  },
  {
    id: 'ALT-02',
    studyId: 'AYUR-ONCO-01',
    severity: 'warning',
    category: 'CTRI Update',
    title: 'CTRI Mandatory 6-Month Status Update Due',
    message: 'Mandatory prospective CTRI semi-annual recruitment milestone renewal is due in 15 days (Deadline: 12-Oct-2026).',
    timestamp: '2026-09-27 08:00 IST',
    actionRequired: 'Generate CDISC SDTM recruitment snapshot and submit CTRI amendment batch.',
    isRead: false
  },
  {
    id: 'ALT-03',
    studyId: 'AYUR-ONCO-01',
    severity: 'warning',
    category: 'Recruitment Lag',
    title: 'Site 03 (NIA Jaipur) Enrolment Lag Notice',
    message: 'NIA Jaipur recruitment pacing is 16% below projected quarterly target (21 enrolled vs 25 expected by Q3).',
    timestamp: '2026-09-26 14:20 IST',
    actionRequired: 'Coordinate with Site PI Prof. Sanjeev Sharma to review oncology outpatient referral triage.',
    isRead: false
  },
  {
    id: 'ALT-04',
    studyId: 'AYUR-METAB-03',
    severity: 'info',
    category: 'IEC Renewal',
    title: 'Institutional Ethics Committee Annual Renewal Due',
    message: 'IEC-AIIA/2023/RES-042 annual renewal submission window is open (26 days remaining).',
    timestamp: '2026-09-25 11:30 IST',
    actionRequired: 'Compile 12-month interim progress report and participant safety dossier.',
    isRead: true
  }
];

export const INITIAL_AUDIT_TRAIL: AuditTrailEntry[] = [
  {
    id: 'AUD-99120',
    timestamp: '2026-09-27 11:42:15 IST',
    actionType: 'VERIFY',
    entity: 'SAE-2026-004',
    entityId: 'SAE-2026-004',
    userRole: 'Principal Investigator',
    userName: 'Prof. Dr. Rajesh Sharma',
    ipAddress: '10.14.88.21 (AIIA Intranet)',
    alcoaCompliant: true,
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    details: 'Verified Naranjo causality score (2 - Unlikely) and signed initial 24-hr expedited report to CDSCO/Licensing Authority.'
  },
  {
    id: 'AUD-99119',
    timestamp: '2026-09-27 10:18:04 IST',
    actionType: 'CREATE',
    entity: 'Adverse Event',
    entityId: 'SAE-2026-004',
    userRole: 'Study Coordinator',
    userName: 'Dr. Priya Nair',
    ipAddress: '10.14.88.35 (AIIA Intranet)',
    alcoaCompliant: true,
    sha256Hash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    details: 'Logged SAE Febrile Neutropenia with Dehydration for Subject AIIA-01-057. Triggered 24-hr regulatory clock countdown.'
  },
  {
    id: 'AUD-99118',
    timestamp: '2026-09-26 16:45:22 IST',
    actionType: 'UPDATE',
    entity: 'Protocol Deviation',
    entityId: 'DEV-2026-004',
    userRole: 'Pharmacovigilance Officer (NPvCC)',
    userName: 'Dr. Ananya Sen',
    ipAddress: '10.14.92.12 (NPvCC Gateway)',
    alcoaCompliant: true,
    sha256Hash: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3',
    details: 'Initiated ASU Drug Interaction safety assessment for unprescribed Bhasma consumption at Site 03.'
  },
  {
    id: 'AUD-99117',
    timestamp: '2026-09-26 12:10:00 IST',
    actionType: 'EXPORT',
    entity: 'CDISC SDTM Dataset',
    entityId: 'SDTM-DM-AE-LB',
    userRole: 'Study Coordinator',
    userName: 'Dr. Priya Nair',
    ipAddress: '10.14.88.35 (AIIA Intranet)',
    alcoaCompliant: true,
    sha256Hash: 'b5d4045c3f466fa91fe2cc6abe79232a1a57cdf104f7a26e716e0a1e2789df78',
    details: 'Exported encrypted CDISC SDTM 3.3 synthetic clinical trial tabulation package for DSMB interim review.'
  },
  {
    id: 'AUD-99116',
    timestamp: '2026-09-25 15:30:11 IST',
    actionType: 'SIGN',
    entity: 'eCRF Screening Log',
    entityId: 'SCR-AIIA-01-184',
    userRole: 'Principal Investigator',
    userName: 'Prof. Dr. Rajesh Sharma',
    ipAddress: '10.14.88.21 (AIIA Intranet)',
    alcoaCompliant: true,
    sha256Hash: '7d793037a0760186574b0282f2f435e7b1e5077469057dac4cb3c0b0ad2e24cb',
    details: '21 CFR Part 11 / GCP-ASU compliant biometric e-signature affixed to screening dossier for Subject AIIA-01-184.'
  }
];

export const CDISC_SDTM_SAMPLE = {
  domainDM: [
    { STUDYID: 'AYUR-ONCO-01', USUBJID: 'AIIA-01-001', SUBJID: '001', RFSTDTC: '2024-04-26', AGE: 54, SEX: 'F', RACE: 'ASIAN - INDIAN', ARMCD: 'ACTIVE', ARM: 'Ashwagandha+Guduchi Adjunct', COUNTRY: 'IND', PRAKRITI: 'Pitta-Kapha' },
    { STUDYID: 'AYUR-ONCO-01', USUBJID: 'AIIA-01-002', SUBJID: '002', RFSTDTC: '2024-04-29', AGE: 61, SEX: 'F', RACE: 'ASIAN - INDIAN', ARMCD: 'PLACEBO', ARM: 'Matching Placebo Adjunct', COUNTRY: 'IND', PRAKRITI: 'Vata-Pitta' },
    { STUDYID: 'AYUR-ONCO-01', USUBJID: 'AIIA-01-042', SUBJID: '042', RFSTDTC: '2024-07-14', AGE: 49, SEX: 'F', RACE: 'ASIAN - INDIAN', ARMCD: 'ACTIVE', ARM: 'Ashwagandha+Guduchi Adjunct', COUNTRY: 'IND', PRAKRITI: 'Kapha-Vata' },
    { STUDYID: 'AYUR-ONCO-01', USUBJID: 'AIIA-01-057', SUBJID: '057', RFSTDTC: '2024-08-02', AGE: 58, SEX: 'F', RACE: 'ASIAN - INDIAN', ARMCD: 'PLACEBO', ARM: 'Matching Placebo Adjunct', COUNTRY: 'IND', PRAKRITI: 'Pitta-Vata' }
  ],
  domainAE: [
    { STUDYID: 'AYUR-ONCO-01', USUBJID: 'AIIA-01-057', AESEQ: 1, AETERM: 'Febrile Neutropenia with Dehydration', AEDECOD: 'Febrile neutropenia', AEBODSYS: 'Infections and infestations', AESEV: 'SEVERE', AESER: 'Y', AEREL: 'UNLIKELY', AEOUT: 'RECOVERING' },
    { STUDYID: 'AYUR-ONCO-01', USUBJID: 'NIA-03-044', AESEQ: 1, AETERM: 'Transient Epigastric Burning', AEDECOD: 'Dyspepsia', AEBODSYS: 'Gastrointestinal disorders', AESEV: 'MILD', AESER: 'N', AEREL: 'PROBABLE', AEOUT: 'RECOVERED' },
    { STUDYID: 'AYUR-ONCO-01', USUBJID: 'IPGTRA-02-019', AESEQ: 1, AETERM: 'Mild Constipation', AEDECOD: 'Constipation', AEBODSYS: 'Gastrointestinal disorders', AESEV: 'MILD', AESER: 'N', AEREL: 'POSSIBLE', AEOUT: 'RECOVERED' }
  ],
  domainVS: [
    { STUDYID: 'AYUR-ONCO-01', USUBJID: 'AIIA-01-001', VSTESTCD: 'SYSBP', VSTEST: 'Systolic Blood Pressure', VSORRES: '124', VSORRESU: 'mmHg', VISIT: 'Baseline', VSDTC: '2024-04-26' },
    { STUDYID: 'AYUR-ONCO-01', USUBJID: 'AIIA-01-001', VSTESTCD: 'DIABP', VSTEST: 'Diastolic Blood Pressure', VSORRES: '78', VSORRESU: 'mmHg', VISIT: 'Baseline', VSDTC: '2024-04-26' },
    { STUDYID: 'AYUR-ONCO-01', USUBJID: 'AIIA-01-001', VSTESTCD: 'PULSE', VSTEST: 'Pulse Rate', VSORRES: '72', VSORRESU: 'beats/min', VISIT: 'Baseline', VSDTC: '2024-04-26' }
  ]
};

export const HL7_FHIR_RESEARCH_STUDY = {
  resourceType: 'ResearchStudy',
  id: 'ayur-onco-01-fhir',
  identifier: [
    {
      use: 'official',
      system: 'https://ctri.nic.in',
      value: 'CTRI/2024/04/065120'
    },
    {
      use: 'secondary',
      system: 'https://aiia.gov.in/ctms/protocols',
      value: 'AIIA/CTMS/2024/ONCO-08'
    }
  ],
  title: 'Withania somnifera and Tinospora cordifolia in Epithelial Ovarian Cancer Adjuvant Chemotherapy',
  status: 'active',
  phase: {
    coding: [
      {
        system: 'http://terminology.hl7.org/CodeSystem/research-study-phase',
        code: 'phase-2-phase-3',
        display: 'Phase IIb'
      }
    ]
  },
  category: [
    {
      coding: [
        {
          system: 'http://ayush.gov.in/fhir/terminology/system',
          code: 'ASU-AYURVEDA',
          display: 'Ayurveda Interventional Clinical Trial'
        }
      ]
    }
  ],
  sponsor: {
    display: 'All India Institute of Ayurveda (AIIA) & Ministry of Ayush, Govt. of India'
  },
  principalInvestigator: {
    display: 'Prof. Dr. Rajesh Sharma, MD (Ayur)'
  },
  site: [
    { display: 'AIIA Apex Centre, New Delhi' },
    { display: 'ITRA / IPGTRA, Jamnagar' },
    { display: 'NIA, Jaipur' },
    { display: 'Tata Memorial Centre, Navi Mumbai' }
  ],
  abdmInterop: {
    gateway: 'ABDM Health Information Provider (HIP)',
    abhaIdLinkedEnrolment: true,
    consentManagerStandard: 'FHIR Consent Resource - DPDP 2023 Compliant'
  }
};
