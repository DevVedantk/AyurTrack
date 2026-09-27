import React, { useState } from 'react';
import { 
  INITIAL_STUDIES, 
  INITIAL_ALERTS, 
  INITIAL_AUDIT_TRAIL,
  DEFAULT_USERS
} from './data/mockStudies';
import { 
  ClinicalStudy, 
  UserRole, 
  SystemAlert, 
  AuditTrailEntry, 
  ProtocolDeviation, 
  AeSaeRecord,
  DataQuery,
  UserAccount
} from './types/clinical';


// Landing Page Components
import { LandingNavbar } from './components/LandingPage/LandingNavbar';
import { HeroSection } from './components/LandingPage/HeroSection';
import { FeaturesBento } from './components/LandingPage/FeaturesBento';
import { ArchitectureFlow } from './components/LandingPage/ArchitectureFlow';
import { ComplianceBanner } from './components/LandingPage/ComplianceBanner';
import { LandingFooter } from './components/LandingPage/LandingFooter';

// Dashboard Components
import { DashboardHeader } from './components/InvestigatorDashboard/DashboardHeader';
import { DashboardKpiGrid } from './components/InvestigatorDashboard/DashboardKpiGrid';
import { DashboardTabs, DashboardTabId } from './components/InvestigatorDashboard/DashboardTabs';
import { ProtocolIecCtriView } from './components/InvestigatorDashboard/ProtocolIecCtriView';
import { RecruitmentFunnelView } from './components/InvestigatorDashboard/RecruitmentFunnelView';
import { VisitsDeviationsView } from './components/InvestigatorDashboard/VisitsDeviationsView';
import { PharmacovigilanceView } from './components/InvestigatorDashboard/PharmacovigilanceView';
import { DataQueriesAlcoaView } from './components/InvestigatorDashboard/DataQueriesAlcoaView';
import { MultiCentreSitesView } from './components/InvestigatorDashboard/MultiCentreSitesView';
import { CloseOutView } from './components/InvestigatorDashboard/CloseOutView';

// Dedicated Dashboards for Ethics, PV (NPvCC), and Leadership
import { EthicsDashboard } from './components/EthicsDashboard/EthicsDashboard';
import { PharmacovigilanceDashboard } from './components/PharmacovigilanceDashboard/PharmacovigilanceDashboard';
import { LeadershipDashboard } from './components/LeadershipDashboard/LeadershipDashboard';

// Modals
import { AlertConfigDrawer } from './components/Modals/AlertConfigDrawer';
import { LogDeviationModal } from './components/Modals/LogDeviationModal';
import { LogAeSaeModal } from './components/Modals/LogAeSaeModal';
import { CdiscFhirModal } from './components/Modals/CdiscFhirModal';
import { AuditTrailModal } from './components/Modals/AuditTrailModal';
import { AuthModal } from './components/Auth/AuthModal';

export const App: React.FC = () => {
  // App Navigation Mode
  const [viewMode, setViewMode] = useState<'landing' | 'dashboard'>('dashboard');
  const [activeDashboard, setActiveDashboard] = useState<'investigator' | 'ethics' | 'pv' | 'leadership'>('investigator');

  // Active User Account
  const [currentUser, setCurrentUser] = useState<UserAccount>(DEFAULT_USERS[0]);

  // Core Data States
  const [studies, setStudies] = useState<ClinicalStudy[]>(INITIAL_STUDIES);
  const [currentStudyId, setCurrentStudyId] = useState<string>('AYUR-ONCO-01');
  const [activeTab, setActiveTab] = useState<DashboardTabId>('overview');

  // Modals & Drawers
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [isLogDeviationOpen, setIsLogDeviationOpen] = useState(false);
  const [isLogAeSaeOpen, setIsLogAeSaeOpen] = useState(false);
  const [isCdiscModalOpen, setIsCdiscModalOpen] = useState(false);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Alerts & Audit Ledger
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_ALERTS);
  const [auditEntries, setAuditEntries] = useState<AuditTrailEntry[]>(INITIAL_AUDIT_TRAIL);


  // Derived current study
  const currentStudy = studies.find(s => s.id === currentStudyId) || studies[0];

  // Authentication & Role Routing Handler
  const handleAuthenticate = (user: UserAccount, targetDashboard: string) => {
    setCurrentUser(user);
    if (targetDashboard === 'ethics') {
      setActiveDashboard('ethics');
    } else if (targetDashboard === 'pv') {
      setActiveDashboard('pv');
    } else if (targetDashboard === 'leadership') {
      setActiveDashboard('leadership');
    } else {
      setActiveDashboard('investigator');
    }
    setViewMode('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };



  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.map(a => a.id === alertId ? { ...a, isRead: true } : a));
  };

  const handleTriggerTestAlert = () => {
    const newAlert: SystemAlert = {
      id: `ALT-TEST-${Date.now()}`,
      studyId: currentStudy.id,
      severity: 'warning',
      category: 'Recruitment Lag',
      title: 'Real-Time Telemetry: Screening Acceleration Suggested',
      message: 'Automated CDASH forecasting indicates 8 more subjects required by Q4 to maintain statistical power.',
      timestamp: new Date().toLocaleTimeString() + ' IST',
      actionRequired: 'Review OPD triage logs with study coordinator.',
      isRead: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  const handleSubmitDeviation = (newDev: ProtocolDeviation) => {
    // 1. Update current study
    setStudies(prev => prev.map(s => {
      if (s.id === currentStudy.id) {
        return {
          ...s,
          protocolDeviations: [newDev, ...s.protocolDeviations]
        };
      }
      return s;
    }));

    // 2. Append to immutable ALCOA+ audit trail
    const audit: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toLocaleString() + ' IST',
      actionType: 'CREATE',
      entity: 'Protocol Deviation',
      entityId: newDev.id,
      userRole: currentUser.role,
      userName: currentUser.name,
      ipAddress: '10.14.88.21 (AIIA Secure LAN)',
      alcoaCompliant: true,
      sha256Hash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      details: `Logged ${newDev.deviationType} deviation [${newDev.category}] for ${newDev.subjectId}. Initiated 7-day IEC transmission draft.`
    };
    setAuditEntries(prev => [audit, ...prev]);

    // 3. Switch to compliance tab so user immediately sees their change
    setActiveTab('compliance');
  };

  const handleSubmitAeSae = (newRecord: AeSaeRecord) => {
    // 1. Update current study
    setStudies(prev => prev.map(s => {
      if (s.id === currentStudy.id) {
        return {
          ...s,
          aeSaeList: [newRecord, ...s.aeSaeList]
        };
      }
      return s;
    }));

    // 2. If SAE, inject high-priority alert
    if (newRecord.isSae) {
      const saeAlert: SystemAlert = {
        id: `ALT-SAE-${Date.now()}`,
        studyId: currentStudy.id,
        severity: 'critical',
        category: 'Safety (SAE)',
        title: `URGENT 24-HR SAE CLOCK: ${newRecord.term}`,
        message: `Mandatory initial transmission to CDSCO/Licensing Authority and IEC active for Subject ${newRecord.subjectId}.`,
        timestamp: new Date().toLocaleTimeString() + ' IST',
        actionRequired: 'Transmit expedited Form 11 narrative immediately.',
        isRead: false
      };
      setAlerts(prev => [saeAlert, ...prev]);
    }

    // 3. Append to audit trail
    const audit: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toLocaleString() + ' IST',
      actionType: 'CREATE',
      entity: newRecord.isSae ? 'Serious Adverse Event (SAE)' : 'Adverse Event (AE)',
      entityId: newRecord.id,
      userRole: currentUser.role,
      userName: currentUser.name,
      ipAddress: '10.14.88.21 (AIIA Secure LAN)',
      alcoaCompliant: true,
      sha256Hash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      details: `Logged ${newRecord.eventType} [${newRecord.term}], MedDRA PT: ${newRecord.meddraPt}, WHO-UMC: ${newRecord.whoUmcCausality}.`
    };
    setAuditEntries(prev => [audit, ...prev]);

    // 4. Switch to safety tab
    setActiveTab('safety');
  };

  const handleUpdateQueries = (updatedQueries: DataQuery[]) => {
    setStudies(prev => prev.map(s => {
      if (s.id === currentStudy.id) {
        return { ...s, dataQueries: updatedQueries };
      }
      return s;
    }));

    // Append to audit trail
    const audit: AuditTrailEntry = {
      id: `AUD-${Date.now().toString().slice(-5)}`,
      timestamp: new Date().toLocaleString() + ' IST',
      actionType: 'UPDATE',
      entity: 'EDC Query Resolution',
      entityId: `QRY-BATCH`,
      userRole: currentUser.role,
      userName: currentUser.name,
      ipAddress: '10.14.88.21 (AIIA Secure LAN)',
      alcoaCompliant: true,
      sha256Hash: Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      details: `Updated EDC query status and appended clinical investigation response notes.`
    };
    setAuditEntries(prev => [audit, ...prev]);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {viewMode === 'landing' ? (
        /* --- AWWWARDS-STYLE LANDING PAGE --- */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <LandingNavbar 
            onLaunchDashboard={() => {
              setViewMode('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenAuth={() => setIsAuthOpen(true)}
          />

          <main style={{ flex: 1 }}>
            <HeroSection 
              onLaunchDashboard={() => {
                setViewMode('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenCdiscModal={() => setIsCdiscModalOpen(true)}
            />

            <FeaturesBento 
              onLaunchDashboard={() => {
                setViewMode('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onOpenAuditModal={() => setIsAuditModalOpen(true)}
              onOpenCdiscModal={() => setIsCdiscModalOpen(true)}
            />

            <ArchitectureFlow />
            <ComplianceBanner />
          </main>

          <LandingFooter 
            onLaunchDashboard={() => {
              setViewMode('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>
      ) : (
        /* --- UNIFIED CTMS DASHBOARD PORTAL --- */
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <DashboardHeader 
            studies={studies}
            currentStudy={currentStudy}
            onSelectStudy={(id) => setCurrentStudyId(id)}
            currentUser={currentUser}
            activeDashboard={activeDashboard}
            onSwitchDashboard={(d) => setActiveDashboard(d)}
            onOpenAuth={() => setIsAuthOpen(true)}
            alerts={alerts}
            onOpenAlerts={() => setIsAlertsOpen(true)}
            onOpenLogDeviation={() => setIsLogDeviationOpen(true)}
            onOpenLogAeSae={() => setIsLogAeSaeOpen(true)}
            onOpenCdiscModal={() => setIsCdiscModalOpen(true)}
            onOpenAuditModal={() => setIsAuditModalOpen(true)}
            onBackToLanding={() => {
              setViewMode('landing');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />

          <main style={{ maxWidth: '1600px', width: '100%', margin: '0 auto', padding: '24px', flex: 1 }}>
            {/* 1. INVESTIGATOR DASHBOARD */}
            {activeDashboard === 'investigator' && (
              <>
                {/* Top KPI Grid */}
                <DashboardKpiGrid 
                  study={currentStudy}
                  onNavigateTab={(tab) => setActiveTab(tab as DashboardTabId)}
                />

                {/* Tab navigation */}
                <DashboardTabs 
                  activeTab={activeTab}
                  onChangeTab={(tab) => setActiveTab(tab)}
                  openQueriesCount={currentStudy.dataQueries.filter(q => q.status === 'Open').length}
                  openDeviationsCount={currentStudy.protocolDeviations.filter(d => d.status !== 'Closed by IEC').length}
                  saeCount={currentStudy.aeSaeList.filter(e => e.isSae).length}
                />

                {/* Tab Content Panels */}
                {activeTab === 'overview' && (
                  <ProtocolIecCtriView 
                    study={currentStudy}
                    onNavigateTab={(tab) => setActiveTab(tab as DashboardTabId)}
                  />
                )}

                {activeTab === 'recruitment' && (
                  <RecruitmentFunnelView 
                    study={currentStudy}
                  />
                )}

                {activeTab === 'compliance' && (
                  <VisitsDeviationsView 
                    study={currentStudy}
                    onOpenLogDeviation={() => setIsLogDeviationOpen(true)}
                  />
                )}

                {activeTab === 'safety' && (
                  <PharmacovigilanceView 
                    study={currentStudy}
                    onOpenLogAeSae={() => setIsLogAeSaeOpen(true)}
                  />
                )}

                {activeTab === 'queries' && (
                  <DataQueriesAlcoaView 
                    study={currentStudy}
                    onUpdateQueries={handleUpdateQueries}
                  />
                )}

                {activeTab === 'sites' && (
                  <MultiCentreSitesView 
                    study={currentStudy}
                  />
                )}

                {activeTab === 'closeout' && (
                  <CloseOutView 
                    study={currentStudy}
                  />
                )}
              </>
            )}

            {/* 2. ETHICS COMMITTEE DASHBOARD */}
            {activeDashboard === 'ethics' && (
              <EthicsDashboard 
                studies={studies}
                currentStudy={currentStudy}
                onSelectStudy={(id) => setCurrentStudyId(id)}
                onOpenAuditTrail={() => setIsAuditModalOpen(true)}
                alerts={alerts}
              />
            )}

            {/* 3. PHARMACOVIGILANCE DASHBOARD (NPvCC) */}
            {activeDashboard === 'pv' && (
              <PharmacovigilanceDashboard 
                studies={studies}
                currentStudy={currentStudy}
                onSelectStudy={(id) => setCurrentStudyId(id)}
                onOpenLogAeSae={() => setIsLogAeSaeOpen(true)}
                onOpenAuditTrail={() => setIsAuditModalOpen(true)}
              />
            )}

            {/* 4. INSTITUTIONAL LEADERSHIP DASHBOARD */}
            {activeDashboard === 'leadership' && (
              <LeadershipDashboard 
                studies={studies}
                onSelectStudy={(id) => setCurrentStudyId(id)}
                alerts={alerts}
                onOpenAlertConfig={() => setIsAlertsOpen(true)}
                onOpenAuditTrail={() => setIsAuditModalOpen(true)}
              />
            )}
          </main>
        </div>
      )}

      {/* Global Modals & Drawers */}
      <AuthModal 
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onAuthenticate={handleAuthenticate}
      />

      <AlertConfigDrawer 
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
        alerts={alerts}
        onDismissAlert={handleDismissAlert}
        onTriggerTestAlert={handleTriggerTestAlert}
      />

      <LogDeviationModal 
        isOpen={isLogDeviationOpen}
        onClose={() => setIsLogDeviationOpen(false)}
        sites={currentStudy.sites}
        onSubmitDeviation={handleSubmitDeviation}
      />

      <LogAeSaeModal 
        isOpen={isLogAeSaeOpen}
        onClose={() => setIsLogAeSaeOpen(false)}
        sites={currentStudy.sites}
        onSubmitAeSae={handleSubmitAeSae}
      />

      <CdiscFhirModal 
        isOpen={isCdiscModalOpen}
        onClose={() => setIsCdiscModalOpen(false)}
      />

      <AuditTrailModal 
        isOpen={isAuditModalOpen}
        onClose={() => setIsAuditModalOpen(false)}
        auditEntries={auditEntries}
      />
    </div>
  );
};

export default App;
