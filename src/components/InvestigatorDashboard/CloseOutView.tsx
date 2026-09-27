import React, { useState } from 'react';
import { 
  Flag, 
  CheckCircle2, 
  Circle, 
  FileCheck2, 
  Archive, 
  Database, 
  ShieldCheck, 
  Download,
  AlertCircle
} from 'lucide-react';
import { ClinicalStudy } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface CloseOutViewProps {
  study: ClinicalStudy;
}

export const CloseOutView: React.FC<CloseOutViewProps> = ({ study }) => {
  const [checklist, setChecklist] = useState({
    ...study.closeoutStatus
  });

  const toggleItem = (key: keyof typeof checklist) => {
    soundManager.playClick();
    if (key === 'overallReadiness') return;
    setChecklist(prev => {
      const updated = { ...prev, [key]: !prev[key] };
      const trueCount = [
        updated.tmfAudited,
        updated.ipReconciliationDone,
        updated.sampleBiobankArchived,
        updated.iecFinalReportSubmitted,
        updated.ctriResultsUploaded,
        updated.csrDrafted
      ].filter(Boolean).length;
      updated.overallReadiness = Math.round((trueCount / 6) * 100);
      return updated;
    });
  };

  const checklistItems = [
    { key: 'tmfAudited' as const, label: 'Trial Master File (TMF) Final Regulatory Audit', desc: 'All essential documents, CVs, GCP certificates, and monitor letters signed.' },
    { key: 'ipReconciliationDone' as const, label: 'Investigational Product (IP) Final Reconciliation & Destruction', desc: '100% accountable balance sheets for herbal extracts and matching placebos.' },
    { key: 'sampleBiobankArchived' as const, label: 'Bio-sample Repository Archival & Cold-Chain Certification', desc: 'Serum, plasma, and genomic aliquots transferred to AIIA Central Bio-repository.' },
    { key: 'iecFinalReportSubmitted' as const, label: 'IEC Final Study Completion & Safety Summary Report', desc: 'Formal closure notification submitted to Institutional Ethics Committee.' },
    { key: 'ctriResultsUploaded' as const, label: 'CTRI Public Registry Results & Primary Endpoint Upload', desc: 'Statutory publication of findings per Indian clinical trial norms.' },
    { key: 'csrDrafted' as const, label: 'Clinical Study Report (CSR) per CDISC & ICH E3 Standard', desc: 'Final statistical analysis package (ADaM) and CSR manuscript prepared.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Flag size={22} style={{ color: '#34d399' }} />
              <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>
                Study Close-Out Governance & Readiness Index
              </h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px' }}>
              Comprehensive verification checklist required prior to database lock and final study de-registration.
            </p>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Close-Out Readiness</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>
              {checklist.overallReadiness}%
            </div>
          </div>
        </div>

        {/* Readiness Bar */}
        <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden', marginBottom: '28px' }}>
          <div style={{ width: `${checklist.overallReadiness}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #facc15)', borderRadius: '4px' }} />
        </div>

        {/* Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {checklistItems.map(item => {
            const isDone = checklist[item.key];
            return (
              <div
                key={item.key}
                onClick={() => toggleItem(item.key)}
                style={{
                  background: isDone ? 'rgba(16, 185, 129, 0.08)' : 'rgba(0, 0, 0, 0.25)',
                  border: isDone ? '1px solid rgba(52, 211, 153, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '10px',
                  padding: '16px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ marginTop: '2px', color: isDone ? '#34d399' : '#64748b' }}>
                  {isDone ? <CheckCircle2 size={20} /> : <Circle size={20} />}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    color: isDone ? '#fff' : '#cbd5e1',
                    marginBottom: '4px'
                  }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', lineHeight: 1.4 }}>
                    {item.desc}
                  </div>
                </div>

                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: '4px',
                  background: isDone ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  color: isDone ? '#34d399' : '#94a3b8'
                }}>
                  {isDone ? 'Verified' : 'Pending Action'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Export Dossier CTA */}
        <div style={{
          marginTop: '24px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            All close-out records undergo immutable ALCOA+ hashing prior to permanent study archive.
          </div>
          <button
            onClick={() => {
              soundManager.playSuccess();
              alert(`Close-Out Dossier Package generated for ${study.protocolNumber}. Contains TMF index, IP destruction certificate, and CTRI final upload draft.`);
            }}
            className="btn-primary"
            style={{ fontSize: '0.82rem', padding: '8px 18px' }}
          >
            <Download size={14} /> Export Close-Out Dossier Package
          </button>
        </div>
      </div>
    </div>
  );
};
