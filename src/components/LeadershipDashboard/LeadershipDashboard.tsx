import React, { useState } from 'react';
import { 
  Building2, 
  TrendingUp, 
  ShieldCheck, 
  AlertTriangle, 
  Clock, 
  Users, 
  Award, 
  FileText, 
  CheckCircle2, 
  MapPin, 
  Download, 
  Filter, 
  Sparkles,
  PieChart,
  BarChart3,
  Sliders,
  Bell
} from 'lucide-react';
import { ClinicalStudy, SystemAlert } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface LeadershipDashboardProps {
  studies: ClinicalStudy[];
  onSelectStudy: (studyId: string) => void;
  alerts: SystemAlert[];
  onOpenAlertConfig: () => void;
  onOpenAuditTrail: () => void;
}

export const LeadershipDashboard: React.FC<LeadershipDashboardProps> = ({
  studies,
  onSelectStudy,
  alerts,
  onOpenAlertConfig,
  onOpenAuditTrail
}) => {
  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

  // Aggregate metrics
  const totalTargetEnrolment = studies.reduce((acc, curr) => acc + curr.targetEnrollment, 0);
  const totalActualEnrolment = studies.reduce((acc, curr) => acc + curr.currentEnrolled, 0);
  const totalScreened = studies.reduce((acc, curr) => acc + curr.totalScreened, 0);
  const totalActiveSites = Array.from(new Set(studies.flatMap(s => s.sites.map(site => site.siteName)))).length;
  const portfolioAccrualPct = Math.round((totalActualEnrolment / totalTargetEnrolment) * 100);

  const departments = [
    { name: 'Kayachikitsa & Oncology', trials: 1, enrolled: 108, target: 120, lead: 'Prof. Dr. Rajesh Sharma' },
    { name: 'Diabetes Specialty & Dravyaguna', trials: 1, enrolled: 192, target: 200, lead: 'Prof. Dr. Tanuja Nesari' },
    { name: 'Panchakarma & Neuro-Ayurveda', trials: 1, enrolled: 48, target: 60, lead: 'Dr. Anand Kumar' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Leadership Executive Banner */}
      <div className="glass-panel" style={{
        padding: '28px',
        background: 'linear-gradient(135deg, rgba(10, 24, 18, 0.95) 0%, rgba(6, 14, 10, 0.98) 100%)',
        border: '1px solid rgba(234, 179, 8, 0.35)',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(234, 179, 8, 0.08)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge-gold">
                OFFICE OF THE DIRECTOR & INSTITUTIONAL LEADERSHIP
              </span>
              <span className="glass-pill" style={{ fontSize: '0.72rem' }}>
                All India Institute of Ayurveda (AIIA)
              </span>
            </div>
            <h2 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '6px' }}>
              Institutional Clinical Research Portfolio & Governance Overview
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#cbd5e1', maxWidth: '880px', lineHeight: 1.5 }}>
              Executive intelligence summarizing AIIA's national multi-centre clinical research portfolio. 
              Real-time surveillance across <strong>recruitment velocity</strong>, <strong>statutory CTRI prospective compliance</strong>, 
              <strong>NPvCC safety signals</strong>, and <strong>ALCOA+ clinical data integrity</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                soundManager.playClick();
                onOpenAlertConfig();
              }}
              className="btn-secondary"
              style={{ fontSize: '0.82rem', padding: '9px 16px' }}
            >
              <Sliders size={15} style={{ color: '#facc15' }} /> Configure Executive KPIs
            </button>

            <button
              onClick={() => {
                soundManager.playSuccess();
                alert('AIIA Annual Research Portfolio Executive Report (2026) generated. Contains multi-centre trial financials, CTRI registry verification, and NPvCC safety audit.');
              }}
              className="btn-gold"
              style={{ fontSize: '0.82rem', padding: '9px 18px' }}
            >
              <Download size={15} /> Export Annual Research Dossier
            </button>
          </div>
        </div>

        {/* Executive KPI Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
          gap: '16px',
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Total Research Portfolio
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#ffffff' }}>
              3 Active Flagship RCTs
            </div>
            <div style={{ fontSize: '0.72rem', color: '#34d399' }}>Phase IIb & Phase III Superiority</div>
          </div>

          <div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              National Patient Accrual
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#facc15' }}>
              {totalActualEnrolment} / {totalTargetEnrolment} <span style={{ fontSize: '0.9rem', color: '#34d399' }}>({portfolioAccrualPct}%)</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>{totalScreened} Total Pre-Screened</div>
          </div>

          <div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Participating Sites Across India
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#38bdf8' }}>
              {totalActiveSites} National Centres
            </div>
            <div style={{ fontSize: '0.72rem', color: '#6ee7b7' }}>AIIA Delhi, ITRA, NIA, BHU, TMC</div>
          </div>

          <div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              CTRI Prospective Compliance
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#34d399' }}>
              100.0% Verified
            </div>
            <div style={{ fontSize: '0.72rem', color: '#a7f3d0' }}>Zero Retrospective Trials</div>
          </div>

          <div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>
              Portfolio ALCOA+ Quality
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#34d399' }}>
              99.2% Composite
            </div>
            <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>SHA-256 State Hashing</div>
          </div>
        </div>
      </div>

      {/* Leadership Alert Sentinel Bar */}
      <div style={{
        background: 'rgba(234, 179, 8, 0.1)',
        border: '1px solid rgba(234, 179, 8, 0.3)',
        borderRadius: '12px',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <AlertTriangle size={20} style={{ color: '#facc15' }} />
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#facc15' }}>
              Active Executive Watch Items ({alerts.filter(a => !a.isRead).length} Items)
            </div>
            <div style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>
              1 Site Enrolment Lag (NIA Jaipur -16%) • 1 Mandatory CTRI 6-Mo Update due in 15 days • 1 Expedited SAE initial transmission active.
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onOpenAlertConfig();
          }}
          className="btn-primary"
          style={{ fontSize: '0.78rem', padding: '6px 14px' }}
        >
          Review Executive Alert Details →
        </button>
      </div>

      {/* Two Column Grid: Studies Breakdown & Departmental Performance */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(440px, 1fr))', gap: '24px' }}>
        {/* Module 1: Portfolio Studies Drilldown */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>
              Clinical Trial Status & Progression
            </h3>
            <span className="glass-pill" style={{ fontSize: '0.72rem' }}>
              3 Ongoing Studies
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {studies.map(study => {
              const accrual = Math.round((study.currentEnrolled / study.targetEnrollment) * 100);
              return (
                <div
                  key={study.id}
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                        <span className="badge-cyan" style={{ fontSize: '0.68rem' }}>{study.phase}</span>
                        <strong style={{ color: '#fff', fontSize: '0.92rem' }}>{study.id}</strong>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.3 }}>
                        {study.shortTitle}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginTop: '2px' }}>
                        Lead PI: <strong style={{ color: '#fff' }}>{study.principalInvestigator}</strong>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: accrual >= 90 ? '#34d399' : '#facc15' }}>
                        {study.currentEnrolled} / {study.targetEnrollment}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{accrual}% Accrued</div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden', margin: '8px 0' }}>
                    <div style={{ width: `${accrual}%`, height: '100%', background: accrual >= 90 ? '#10b981' : '#facc15' }} />
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.72rem', color: '#94a3b8' }}>
                    <span>CTRI: <strong style={{ color: '#facc15' }}>{study.ctriNumber}</strong></span>
                    <span>ALCOA+ Score: <strong style={{ color: '#34d399' }}>{study.alcoaScore.overall}%</strong></span>
                    <span>Sites: <strong>{study.sites.length} Active</strong></span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Module 2: Departmental Research Matrix */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>
              Departmental Research Productivity
            </h3>
            <span className="badge-gold">
              AIIA Academic Council
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
            {departments.map((dept, idx) => {
              const pct = Math.round((dept.enrolled / dept.target) * 100);
              return (
                <div
                  key={idx}
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '6px' }}>
                    <div>
                      <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#fff' }}>
                        {dept.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                        Department Chair: {dept.lead}
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#34d399' }}>
                        {dept.enrolled} / {dept.target}
                      </span>
                      <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{pct}% Capacity</div>
                    </div>
                  </div>

                  <div style={{ width: '100%', height: '5px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: '#34d399' }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* National Interoperability Status */}
          <div style={{
            background: 'rgba(56, 189, 248, 0.08)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
            borderRadius: '10px',
            padding: '14px',
            fontSize: '0.78rem'
          }}>
            <div style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '6px' }}>
              Ayushman Bharat Digital Mission (ABDM) Integration Status
            </div>
            <p style={{ color: '#cbd5e1', lineHeight: 1.5, marginBottom: '8px' }}>
              All 3 trials are integrated with the ABDM Health Information Provider (HIP) gateway, allowing ABHA-linked 
              electronic consent and CDISC/FHIR R4 ResearchStudy exchange across all government institutes.
            </p>
            <div style={{ color: '#6ee7b7', fontWeight: 600 }}>
              ✓ National Digital Health Architecture Tier-1 Certified
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
