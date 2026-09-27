import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Globe2, 
  Users, 
  GitBranch, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  HelpCircle,
  Building2,
  TrendingUp,
  Activity
} from 'lucide-react';
import { ClinicalStudy } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface DashboardKpiGridProps {
  study: ClinicalStudy;
  onNavigateTab: (tabId: string) => void;
}

export const DashboardKpiGrid: React.FC<DashboardKpiGridProps> = ({ study, onNavigateTab }) => {
  const enrolmentPct = Math.round((study.currentEnrolled / study.targetEnrollment) * 100);
  const openQueriesCount = study.dataQueries.filter(q => q.status === 'Open').length;
  const activeSae = study.aeSaeList.find(e => e.isSae);

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
      gap: '14px',
      marginBottom: '24px'
    }}>
      {/* KPI 1: Protocol & IEC Approval */}
      <div 
        className="glass-panel"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('governance');
        }}
        style={{
          padding: '16px 18px',
          cursor: 'pointer',
          background: 'rgba(12, 22, 16, 0.75)',
          position: 'relative'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>
            Protocol & IEC Status
          </span>
          <ShieldCheck size={16} style={{ color: '#34d399' }} />
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '2px' }}>
          {study.protocolVersion.split(' ')[0]} {study.protocolVersion.split(' ')[1]}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>
          IEC Clearance Active
        </div>
        <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '6px' }}>
          Renewal Due: <strong style={{ color: '#facc15' }}>{study.iecDaysUntilRenewal} days</strong>
        </div>
      </div>

      {/* KPI 2: Prospective CTRI Registration */}
      <div 
        className="glass-panel"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('governance');
        }}
        style={{
          padding: '16px 18px',
          cursor: 'pointer',
          background: 'rgba(12, 22, 16, 0.75)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>
            CTRI Registration
          </span>
          <Globe2 size={16} style={{ color: '#facc15' }} />
        </div>
        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#facc15', fontFamily: 'var(--font-mono)' }}>
          {study.ctriNumber.replace('CTRI/', '')}
        </div>
        <div style={{ fontSize: '0.75rem', color: '#6ee7b7', fontWeight: 600 }}>
          ✓ Registered Prospectively
        </div>
        <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '6px' }}>
          6-Mo Update: <strong style={{ color: study.ctriDaysUntilUpdate <= 15 ? '#f87171' : '#34d399' }}>{study.ctriDaysUntilUpdate} days</strong>
        </div>
      </div>

      {/* KPI 3: Enrolment Progress */}
      <div 
        className="glass-panel"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('recruitment');
        }}
        style={{
          padding: '16px 18px',
          cursor: 'pointer',
          background: 'rgba(12, 22, 16, 0.75)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>
            Enrolment Velocity
          </span>
          <Users size={16} style={{ color: '#34d399' }} />
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
          {study.currentEnrolled} / {study.targetEnrollment} <span style={{ fontSize: '0.85rem', color: '#34d399' }}>({enrolmentPct}%)</span>
        </div>
        <div style={{
          width: '100%',
          height: '5px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          margin: '6px 0',
          overflow: 'hidden'
        }}>
          <div style={{
            width: `${enrolmentPct}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #10b981, #34d399)',
            borderRadius: '4px'
          }} />
        </div>
        <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
          Screened: <strong>{study.totalScreened}</strong> | Dropout: <strong>{study.dropoutRatePercent}%</strong>
        </div>
      </div>

      {/* KPI 4: Randomization Balance */}
      <div 
        className="glass-panel"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('recruitment');
        }}
        style={{
          padding: '16px 18px',
          cursor: 'pointer',
          background: 'rgba(12, 22, 16, 0.75)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>
            Randomization vs Target
          </span>
          <GitBranch size={16} style={{ color: '#38bdf8' }} />
        </div>
        <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#ffffff' }}>
          <span style={{ color: '#34d399' }}>{study.randomizedActiveArm} Active</span> : <span style={{ color: '#38bdf8' }}>{study.randomizedComparatorArm} Placebo</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600, marginTop: '4px' }}>
          1:1 Block Permuted • Valid
        </div>
        <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>
          Stratified: Age & Prakriti
        </div>
      </div>

      {/* KPI 5: Visit & Protocol Compliance */}
      <div 
        className="glass-panel"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('compliance');
        }}
        style={{
          padding: '16px 18px',
          cursor: 'pointer',
          background: 'rgba(12, 22, 16, 0.75)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>
            Visit Compliance
          </span>
          <Activity size={16} style={{ color: '#34d399' }} />
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#34d399' }}>
          {study.visitComplianceOverall}%
        </div>
        <div style={{ fontSize: '0.75rem', color: '#a7f3d0' }}>
          Window Adherence: ±2 Days
        </div>
        <div style={{ fontSize: '0.7rem', color: '#facc15', marginTop: '6px' }}>
          Deviations: <strong>{study.protocolDeviations.length} Logged</strong> (CAPA tracked)
        </div>
      </div>

      {/* KPI 6: NPvCC 24h SAE Regulatory Clock */}
      <div 
        className="glass-panel"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('safety');
        }}
        style={{
          padding: '16px 18px',
          cursor: 'pointer',
          background: activeSae ? 'rgba(28, 16, 16, 0.85)' : 'rgba(12, 22, 16, 0.75)',
          border: activeSae ? '1px solid rgba(239, 68, 68, 0.4)' : undefined
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: activeSae ? '#fca5a5' : '#94a3b8', fontWeight: 700 }}>
            NPvCC Safety Sentinel
          </span>
          <Clock size={16} style={{ color: activeSae ? '#ef4444' : '#34d399' }} />
        </div>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, color: activeSae ? '#f87171' : '#34d399', fontFamily: 'var(--font-mono)' }}>
          {activeSae ? '02h : 00m : 00s' : '0 SAEs Pending'}
        </div>
        <div style={{ fontSize: '0.75rem', color: activeSae ? '#fca5a5' : '#6ee7b7', fontWeight: 600 }}>
          {activeSae ? '24h Regulatory Clock' : 'No Critical Safety Signals'}
        </div>
        <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '6px' }}>
          Total AEs: <strong>{study.aeSaeList.length}</strong> | MedDRA/WHO Coded
        </div>
      </div>

      {/* KPI 7: Data Queries & ALCOA+ */}
      <div 
        className="glass-panel"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('queries');
        }}
        style={{
          padding: '16px 18px',
          cursor: 'pointer',
          background: 'rgba(12, 22, 16, 0.75)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>
            EDC Queries & ALCOA+
          </span>
          <HelpCircle size={16} style={{ color: '#38bdf8' }} />
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
          {openQueriesCount} Open <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>/ {study.dataQueries.length} total</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#38bdf8', fontWeight: 600 }}>
          ALCOA+ Score: {study.alcoaScore.overall}%
        </div>
        <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '6px' }}>
          Avg Aging: <strong>2.1 Days</strong> (0 &gt; 7d)
        </div>
      </div>

      {/* KPI 8: Multi-Centre Site Activation */}
      <div 
        className="glass-panel"
        onClick={() => {
          soundManager.playClick();
          onNavigateTab('sites');
        }}
        style={{
          padding: '16px 18px',
          cursor: 'pointer',
          background: 'rgba(12, 22, 16, 0.75)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#94a3b8', fontWeight: 600 }}>
            Site Activation
          </span>
          <Building2 size={16} style={{ color: '#facc15' }} />
        </div>
        <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
          {study.sites.length} / {study.sites.length} Active
        </div>
        <div style={{ fontSize: '0.75rem', color: '#facc15', fontWeight: 600 }}>
          Apex: AIIA New Delhi
        </div>
        <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '6px' }}>
          ISF Completeness: <strong>96.8%</strong>
        </div>
      </div>
    </div>
  );
};
