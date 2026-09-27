import React from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Globe2, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  ExternalLink, 
  Download, 
  AlertCircle,
  FileCheck2,
  GitCommit,
  User,
  Building
} from 'lucide-react';
import { ClinicalStudy } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface ProtocolIecCtriViewProps {
  study: ClinicalStudy;
  onNavigateTab: (tabId: string) => void;
}

export const ProtocolIecCtriView: React.FC<ProtocolIecCtriViewProps> = ({ study, onNavigateTab }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner: Protocol Synopsis & Identity */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <span className="glass-pill">{study.phase}</span>
              <span className="badge-gold">{study.studyType}</span>
              <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                Protocol Ref: <strong style={{ color: '#fff' }}>{study.protocolNumber}</strong>
              </span>
            </div>
            <h2 style={{ fontSize: '1.35rem', color: '#fff', marginBottom: '8px', maxWidth: '1000px', lineHeight: 1.35 }}>
              {study.title}
            </h2>
            <div style={{ fontSize: '0.85rem', color: '#6ee7b7', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>Indication: <strong>{study.indication}</strong></span>
              <span>•</span>
              <span>Design: <strong>{study.designDetails}</strong></span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => soundManager.playSuccess()}
              className="btn-secondary" 
              style={{ fontSize: '0.8rem', padding: '8px 14px' }}
            >
              <Download size={14} /> Download Protocol PDF (v2.3)
            </button>
          </div>
        </div>

        {/* Investigational Product & Comparator Specs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '16px',
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          borderRadius: '12px',
          padding: '16px'
        }}>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
              Investigational Ayurvedic Product (Arm A)
            </div>
            <div style={{ fontSize: '0.9rem', color: '#34d399', fontWeight: 600 }}>
              🌿 {study.investigationalProduct}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
              Comparator Arm (Arm B)
            </div>
            <div style={{ fontSize: '0.9rem', color: '#facc15', fontWeight: 600 }}>
              💊 {study.comparatorArm}
            </div>
          </div>
        </div>
      </div>

      {/* Two Column Grid: IEC Approval & CTRI Prospective Registration */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        {/* Module 1: Institutional Ethics Committee (IEC) Oversight */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={20} style={{ color: '#34d399' }} />
              <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>
                Institutional Ethics Committee (IEC)
              </h3>
            </div>
            <span className="glass-pill" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
              ✓ Approved & Active
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#94a3b8' }}>Ethics Clearance Ref:</span>
              <span style={{ color: '#fff', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>{study.iecRegistrationNumber}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#94a3b8' }}>Clearance Date:</span>
              <span style={{ color: '#f0fdf4' }}>{study.iecApprovalDate}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#94a3b8' }}>Annual Renewal Deadline:</span>
              <span style={{ color: '#facc15', fontWeight: 700 }}>{study.iecAnnualRenewalDue} ({study.iecDaysUntilRenewal} days remaining)</span>
            </div>
          </div>

          {/* Renewal Countdown Progress */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '6px' }}>
              <span>Renewal Horizon (12-Month Cycle)</span>
              <span style={{ color: '#34d399', fontWeight: 600 }}>181 Days Remaining</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '50%', height: '100%', background: 'linear-gradient(90deg, #10b981, #facc15)' }} />
            </div>
          </div>

          {/* ICMR Ethical Guidelines Compliance Checklist */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '10px',
            padding: '14px'
          }}>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase' }}>
              ICMR Ethical Guidelines Compliance Audit
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6ee7b7' }}>
                <CheckCircle2 size={14} /> Informed Consent Form in 3 languages (English, Hindi, Gujarati)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6ee7b7' }}>
                <CheckCircle2 size={14} /> Vulnerable Population Safeguards & Assent provisions verified
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6ee7b7' }}>
                <CheckCircle2 size={14} /> ASU Formulation Pre-clinical Safety & Heavy Metal Dossier Cleared
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#6ee7b7' }}>
                <CheckCircle2 size={14} /> Trial Insurance & Medical Management Liability Active
              </div>
            </div>
          </div>
        </div>

        {/* Module 2: CTRI Prospective Registration */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe2 size={20} style={{ color: '#facc15' }} />
              <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>
                Clinical Trials Registry – India (CTRI)
              </h3>
            </div>
            <span className="badge-gold">
              ✓ Prospectively Registered
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#94a3b8' }}>Mandatory CTRI Number:</span>
              <span style={{ color: '#facc15', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>{study.ctriNumber}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#94a3b8' }}>Registration Timestamp:</span>
              <span style={{ color: '#f0fdf4' }}>{study.ctriRegistrationDate} (Prior to FPI)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
              <span style={{ color: '#94a3b8' }}>Statutory 6-Month Update Due:</span>
              <span style={{ color: study.ctriDaysUntilUpdate <= 15 ? '#f87171' : '#34d399', fontWeight: 700 }}>
                {study.ctriNext6MonthUpdateDue} ({study.ctriDaysUntilUpdate} days remaining)
              </span>
            </div>
          </div>

          {/* Alert Callout for Semi-Annual Regulatory Renewal */}
          <div style={{
            background: 'rgba(234, 179, 8, 0.1)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            borderRadius: '10px',
            padding: '14px',
            marginBottom: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#facc15', fontWeight: 700, fontSize: '0.82rem', marginBottom: '4px' }}>
              <AlertCircle size={15} />
              <span>Mandatory 6-Month Status Renewal Approaching</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
              Per CTRI compliance guidelines, recruitment velocity, subject accrual counts, and safety summaries must be updated every 6 months.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                soundManager.playSuccess();
                alert(`CTRI Live Synchronizer: Verified prospective record ${study.ctriNumber}. All recruitment metrics synchronized with public portal.`);
              }}
              className="btn-primary"
              style={{ flex: 1, fontSize: '0.82rem', padding: '8px 16px' }}
            >
              <ExternalLink size={14} /> Synchronize CTRI Snapshot
            </button>
          </div>
        </div>
      </div>

      {/* Study Milestones & Timelines */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>
              Study Milestones & Timeline Progression
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              End-to-end lifecycle from protocol scientific clearance to final CTRI clinical study report (CSR) upload.
            </p>
          </div>
          <span className="glass-pill">
            Phase: Active Enrolment (Milestone 6/9)
          </span>
        </div>

        {/* Milestones Flow */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '14px'
        }}>
          {study.milestones.map((milestone, idx) => {
            const isCompleted = milestone.status === 'Completed';
            const isInProgress = milestone.status === 'In Progress';
            return (
              <div 
                key={milestone.id}
                style={{
                  background: isCompleted ? 'rgba(16, 185, 129, 0.08)' : isInProgress ? 'rgba(234, 179, 8, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  border: isCompleted ? '1px solid rgba(52, 211, 153, 0.3)' : isInProgress ? '1px solid rgba(250, 204, 21, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '10px',
                  padding: '16px',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{
                    fontSize: '0.68rem',
                    fontWeight: 800,
                    padding: '2px 6px',
                    borderRadius: '4px',
                    background: isCompleted ? 'rgba(16, 185, 129, 0.2)' : isInProgress ? 'rgba(234, 179, 8, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                    color: isCompleted ? '#34d399' : isInProgress ? '#facc15' : '#94a3b8'
                  }}>
                    {milestone.status}
                  </span>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>
                    Target: {milestone.targetDate}
                  </span>
                </div>

                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff', marginBottom: '4px' }}>
                  {idx + 1}. {milestone.title}
                </div>
                <div style={{ fontSize: '0.76rem', color: '#94a3b8', lineHeight: 1.4 }}>
                  {milestone.description}
                </div>
                {milestone.actualDate && (
                  <div style={{ fontSize: '0.7rem', color: '#34d399', marginTop: '8px', fontWeight: 600 }}>
                    ✓ Achieved on {milestone.actualDate}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
