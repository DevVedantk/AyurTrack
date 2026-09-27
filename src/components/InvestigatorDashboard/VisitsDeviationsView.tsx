import React from 'react';
import { 
  Activity, 
  AlertTriangle, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  FilePlus, 
  ShieldAlert,
  ArrowRight,
  Filter
} from 'lucide-react';
import { ClinicalStudy, ProtocolDeviation } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface VisitsDeviationsViewProps {
  study: ClinicalStudy;
  onOpenLogDeviation: () => void;
}

export const VisitsDeviationsView: React.FC<VisitsDeviationsViewProps> = ({
  study,
  onOpenLogDeviation
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner: Visit Compliance Overview */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>
              Subject Visit & Protocol Schedule Compliance
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Adherence to per-protocol visit windows (±2 calendar days) across all multi-centre study visits.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="glass-pill" style={{ fontSize: '0.85rem' }}>
              Overall Compliance: <strong>{study.visitComplianceOverall}%</strong>
            </span>
          </div>
        </div>

        {/* Table of Visits */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', textAlign: 'left' }}>
                <th style={{ padding: '12px 10px' }}>Visit Identifier</th>
                <th style={{ padding: '12px 10px' }}>Target Day</th>
                <th style={{ padding: '12px 10px' }}>Completed / Target</th>
                <th style={{ padding: '12px 10px' }}>Window Violations (±2d)</th>
                <th style={{ padding: '12px 10px' }}>Missed Visits</th>
                <th style={{ padding: '12px 10px' }}>Compliance %</th>
                <th style={{ padding: '12px 10px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {study.visits.map((v, idx) => (
                <tr key={idx} style={{
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                  background: idx % 2 === 0 ? 'rgba(255, 255, 255, 0.01)' : 'transparent'
                }}>
                  <td style={{ padding: '12px 10px', color: '#fff', fontWeight: 600 }}>
                    {v.visitName}
                  </td>
                  <td style={{ padding: '12px 10px', color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
                    Day {v.plannedDay > 0 ? `+${v.plannedDay}` : v.plannedDay}
                  </td>
                  <td style={{ padding: '12px 10px', color: '#f0fdf4' }}>
                    <strong>{v.completedCount}</strong> / {v.targetCount}
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{
                      color: v.windowViolationCount > 0 ? '#facc15' : '#6ee7b7',
                      fontWeight: v.windowViolationCount > 0 ? 700 : 400
                    }}>
                      {v.windowViolationCount} violations
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{
                      color: v.missedCount > 0 ? '#f87171' : '#94a3b8',
                      fontWeight: v.missedCount > 0 ? 700 : 400
                    }}>
                      {v.missedCount} missed
                    </span>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '60px', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${v.complianceRate}%`, height: '100%', background: v.complianceRate > 95 ? '#10b981' : '#facc15' }} />
                      </div>
                      <span style={{ color: '#fff', fontWeight: 700 }}>{v.complianceRate}%</span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 10px' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: v.complianceRate >= 96 ? 'rgba(16, 185, 129, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                      color: v.complianceRate >= 96 ? '#34d399' : '#facc15'
                    }}>
                      {v.complianceRate >= 96 ? 'Optimal' : 'Review Window'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Protocol Deviations Management Ledger */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={20} style={{ color: '#facc15' }} />
              <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>
                Protocol Deviations Registry & CAPA Tracking
              </h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px' }}>
              GCP-ASU requires all major protocol deviations to be reported to the Institutional Ethics Committee (IEC) within 7 working days.
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playClick();
              onOpenLogDeviation();
            }}
            className="btn-primary"
            style={{ fontSize: '0.82rem', padding: '8px 16px' }}
          >
            <FilePlus size={15} /> Log New Deviation
          </button>
        </div>

        {/* Deviations List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {study.protocolDeviations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '30px', color: '#94a3b8' }}>
              No protocol deviations logged for this trial.
            </div>
          ) : (
            study.protocolDeviations.map(dev => (
              <div 
                key={dev.id}
                style={{
                  background: 'rgba(0, 0, 0, 0.3)',
                  border: dev.deviationType === 'Major' ? '1px solid rgba(239, 68, 68, 0.35)' : '1px solid rgba(250, 204, 21, 0.3)',
                  borderRadius: '12px',
                  padding: '18px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span className={dev.deviationType === 'Major' ? 'badge-crimson' : 'badge-gold'}>
                      {dev.deviationType} Deviation
                    </span>
                    <span style={{ fontSize: '0.82rem', color: '#fff', fontWeight: 700 }}>
                      {dev.id}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      Subject: <strong style={{ color: '#6ee7b7' }}>{dev.subjectId}</strong> (Site: {dev.siteId})
                    </span>
                    <span className="glass-pill" style={{ fontSize: '0.72rem' }}>
                      {dev.category}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem' }}>
                    <span style={{ color: '#94a3b8' }}>Identified: {dev.dateIdentified}</span>
                    <span style={{ color: '#34d399', fontWeight: 600 }}>
                      ✓ Reported to IEC within 7 Days
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '0.86rem', color: '#f1f5f9', marginBottom: '14px', lineHeight: 1.5 }}>
                  {dev.description}
                </div>

                {/* Root Cause & CAPA */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '12px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  padding: '12px',
                  fontSize: '0.78rem'
                }}>
                  <div>
                    <span style={{ color: '#facc15', fontWeight: 700 }}>Root Cause Analysis (RCA):</span>
                    <div style={{ color: '#cbd5e1', marginTop: '2px' }}>{dev.rootCause}</div>
                  </div>
                  <div>
                    <span style={{ color: '#34d399', fontWeight: 700 }}>Corrective Action:</span>
                    <div style={{ color: '#cbd5e1', marginTop: '2px' }}>{dev.correctiveAction}</div>
                  </div>
                  <div>
                    <span style={{ color: '#38bdf8', fontWeight: 700 }}>Preventive Action (CAPA):</span>
                    <div style={{ color: '#cbd5e1', marginTop: '2px' }}>{dev.preventiveAction}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '0.74rem' }}>
                  <span style={{ color: '#94a3b8' }}>
                    Status: <strong style={{ color: dev.status.includes('Closed') ? '#34d399' : '#facc15' }}>{dev.status}</strong>
                  </span>
                  <span style={{ color: '#64748b' }}>
                    IEC Regulatory Audit Timestamp: 2026-09-22 14:10 IST
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
