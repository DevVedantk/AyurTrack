import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Activity, 
  Clock, 
  AlertTriangle, 
  TrendingUp, 
  BarChart2, 
  BookOpen, 
  FileText, 
  CheckCircle2, 
  Share2, 
  Send, 
  Download,
  Search,
  Zap,
  Cpu
} from 'lucide-react';
import { ClinicalStudy, AeSaeRecord, PharmacovigilanceSignal } from '../../types/clinical';
import { MOCK_PV_SIGNALS } from '../../data/mockStudies';

interface PharmacovigilanceDashboardProps {
  studies: ClinicalStudy[];
  currentStudy: ClinicalStudy;
  onSelectStudy: (studyId: string) => void;
  onOpenLogAeSae: () => void;
  onOpenAuditTrail: () => void;
}

export const PharmacovigilanceDashboard: React.FC<PharmacovigilanceDashboardProps> = ({
  studies,
  currentStudy,
  onSelectStudy,
  onOpenLogAeSae,
  onOpenAuditTrail
}) => {
  const [activePvTab, setActivePvTab] = useState<'sentinel-clock' | 'adr-capture' | 'signal-engine' | 'dsmb-dossier'>('sentinel-clock');
  const [signals, setSignals] = useState<PharmacovigilanceSignal[]>(MOCK_PV_SIGNALS);

  const allAeSaeList = studies.flatMap(s => s.aeSaeList);
  const activeSae = currentStudy.aeSaeList.find(e => e.isSae);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner: National Pharmacovigilance Coordination Centre Hub */}
      <div className="glass-panel" style={{
        padding: '24px',
        background: '#ffffff',
        borderLeft: '4px solid #dc2626'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge-crimson">
                <span className="pulse-dot-red"></span>
                NPvCC • NATIONAL PHARMACOVIGILANCE COORDINATION CENTRE
              </span>
              <span className="glass-pill" style={{ fontSize: '0.72rem' }}>
                ASU&H Drugs Nationwide Surveillance
              </span>
            </div>
            <h2 style={{ fontSize: '1.45rem', color: '#0f172a', marginBottom: '6px' }}>
              Safety Surveillance, MedDRA / WHODrug & DSMB Telemetry Hub
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#475569', maxWidth: '850px', lineHeight: 1.5 }}>
              All India Institute of Ayurveda anchors the <strong>NPvCC for Ayurveda, Siddha, Unani and Homoeopathy drugs</strong>. 
              This command center enforces the <strong>24-hr regulatory reporting clock</strong> to CDSCO, performs automated 
              <strong>MedDRA 27.0 & WHODrug</strong> indexing, computes <strong>disproportionality signal detection (PRR/ROR)</strong>, 
              and feeds unblinded safety signals to the <strong>Data Safety Monitoring Board (DSMB)</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={onOpenLogAeSae}
              className="btn-primary"
              style={{
                background: '#dc2626',
                color: '#fff',
                fontSize: '0.84rem',
                padding: '9px 18px',
                border: 'none'
              }}
            >
              <ShieldAlert size={16} /> Report New AE / SAE / ADR
            </button>
          </div>
        </div>

        {/* Quick PV KPI Tiles */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid #e2e8f0'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#dc2626', textTransform: 'uppercase', fontWeight: 700 }}>
              Urgent 24h Regulatory Clock
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: activeSae ? '#dc2626' : '#047857', fontFamily: 'var(--font-mono)' }}>
              {activeSae ? '01h : 58m : 42s' : '0 SAEs Pending'}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>NDCT 2019 Rule 42 Sentinel</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
              Portfolio Safety Reports
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a' }}>
              {allAeSaeList.length} Total ADR / AEs
            </div>
            <div style={{ fontSize: '0.72rem', color: '#047857' }}>100% MedDRA & WHODrug Coded</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
              Active Safety Signals (PRR &gt; 2.0)
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#b45309' }}>
              {signals.filter(s => s.prrScore > 2.0).length} Flagged Signals
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Disproportionality Matrix</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600 }}>
              DSMB Safety Charter Status
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0284c7' }}>
              Favorable / Active
            </div>
            <div style={{ fontSize: '0.72rem', color: '#047857' }}>Zero Halting Boundaries Triggered</div>
          </div>
        </div>
      </div>

      {/* PV Module Navigation Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid #e2e8f0',
        paddingBottom: '8px',
        overflowX: 'auto'
      }}>
        {[
          { id: 'sentinel-clock', label: '24-Hour Regulatory Clock & Timelines', icon: <Clock size={15} /> },
          { id: 'adr-capture', label: 'MedDRA 27.0 & WHODrug ADR Registry', icon: <FileText size={15} /> },
          { id: 'signal-engine', label: 'Aggregate Safety Signals & PRR Engine', icon: <Cpu size={15} /> },
          { id: 'dsmb-dossier', label: 'DSMB Safety Dossier & Interim Charter', icon: <Activity size={15} /> }
        ].map(tab => {
          const isActive = activePvTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActivePvTab(tab.id as any)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: '8px',
                border: isActive ? '1px solid #fecaca' : '1px solid #e2e8f0',
                background: isActive ? '#fef2f2' : '#ffffff',
                color: isActive ? '#dc2626' : '#64748b',
                fontWeight: isActive ? 700 : 500,
                fontSize: '0.84rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap'
              }}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* --- TAB 1: 24h Regulatory Clock & Timelines --- */}
      {activePvTab === 'sentinel-clock' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {activeSae && (
            <div className="glass-panel" style={{
              padding: '24px',
              background: '#fef2f2',
              border: '1px solid #fecaca'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: '#fee2e2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#dc2626'
                  }}>
                    <Clock size={32} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#991b1b', textTransform: 'uppercase', fontWeight: 800 }}>
                      ACTIVE EXPEDITED STATUTORY SAFETY SENTINEL (NDCT RULE 42)
                    </div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--font-mono)' }}>
                      01h : 58m : 42s <span style={{ fontSize: '0.9rem', color: '#991b1b' }}>remaining for initial CDSCO & IEC notification</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#475569' }}>
                      Event: <strong>{activeSae.term}</strong> • Subject: {activeSae.subjectId} • Onset: {activeSae.onsetDate}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => alert(`Expedited SAE Form 11 narrative transmitted to CDSCO SUGAM portal and State Licensing Authority. Verification hash: a665a459204...`)}
                    className="btn-gold"
                    style={{ fontSize: '0.82rem', padding: '8px 18px' }}
                  >
                    <Send size={14} /> Transmit Form 11 to CDSCO
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Timeline Milestones Table */}
          <div className="glass-panel" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '8px' }}>
              Statutory Pharmacovigilance Timelines (NDCT Rules 2019 & GCP-ASU)
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '20px' }}>
              Timeline tracking for Initial (24-hour) and Detailed Causality Assessment (14-day) reporting obligations.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px'
            }}>
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#991b1b', textTransform: 'uppercase', fontWeight: 700 }}>
                  Stage 1: Urgent 24-Hour Notice
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '4px 0' }}>
                  CDSCO & Licensing Authority Form 11
                </div>
                <p style={{ fontSize: '0.76rem', color: '#475569', lineHeight: 1.4 }}>
                  Mandatory expedited initial notification to Central Licensing Authority (DCGI/CDSCO) and IEC within 24 hours of occurrence.
                </p>
                <div style={{ color: '#047857', fontSize: '0.75rem', fontWeight: 600, marginTop: '8px' }}>
                  ✓ System Auto-Trigger Active
                </div>
              </div>

              <div style={{
                background: '#fffbeb',
                border: '1px solid #fde68a',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#92400e', textTransform: 'uppercase', fontWeight: 700 }}>
                  Stage 2: 14-Day Detailed Causality Report
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '4px 0' }}>
                  Full Clinical Analysis & Compensation
                </div>
                <p style={{ fontSize: '0.76rem', color: '#475569', lineHeight: 1.4 }}>
                  Submission of complete medical dossier, discharge summaries, heavy-metal toxicology, and WHO-UMC causality report.
                </p>
                <div style={{ color: '#b45309', fontSize: '0.75rem', fontWeight: 600, marginTop: '8px' }}>
                  ⏳ 12 Days Remaining
                </div>
              </div>

              <div style={{
                background: '#f0f9ff',
                border: '1px solid #bae6fd',
                borderRadius: '10px',
                padding: '16px'
              }}>
                <div style={{ fontSize: '0.72rem', color: '#075985', textTransform: 'uppercase', fontWeight: 700 }}>
                  Stage 3: 30-Day IEC Liability Assessment
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', margin: '4px 0' }}>
                  Independent Expert Committee Review
                </div>
                <p style={{ fontSize: '0.76rem', color: '#475569', lineHeight: 1.4 }}>
                  Ethics Committee evaluates study-related injury compensation formula as prescribed in the NDCT Rules 2019.
                </p>
                <div style={{ color: '#0284c7', fontSize: '0.75rem', fontWeight: 600, marginTop: '8px' }}>
                  📅 Scheduled on Oct 24, 2026
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: MedDRA & WHODrug ADR Registry --- */}
      {activePvTab === 'adr-capture' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a' }}>
                  MedDRA 27.0 & WHODrug Global Adverse Event Registry
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Standardized terminology coding bridging traditional Ayurvedic terminology (e.g., Ushnatva, Vibandha, Aruchi) with international safety terms.
                </p>
              </div>

              <button
                onClick={() => alert('Exporting MedDRA 27.0 coded safety listing in CDISC SDTM AE domain format.')}
                className="btn-secondary"
                style={{ fontSize: '0.8rem', padding: '6px 14px' }}
              >
                <Download size={13} /> Export MedDRA AE Listing
              </button>
            </div>

            {/* AE/SAE List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {allAeSaeList.map(item => (
                <div
                  key={item.id}
                  style={{
                    background: item.isSae ? '#fef2f2' : '#f8fafc',
                    border: item.isSae ? '1px solid #fecaca' : '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={item.isSae ? 'badge-crimson' : 'glass-pill'}>
                        {item.eventType}
                      </span>
                      <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{item.term}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        Subject: <strong style={{ color: '#047857' }}>{item.subjectId}</strong> ({item.siteId})
                      </span>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#475569' }}>
                      Severity: <strong style={{ color: item.severity === 'Severe' ? '#dc2626' : '#b45309' }}>{item.severity}</strong> • Outcome: {item.outcome}
                    </div>
                  </div>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                    gap: '10px',
                    fontSize: '0.76rem',
                    background: '#f1f5f9',
                    padding: '10px',
                    borderRadius: '6px'
                  }}>
                    <div>
                      <span style={{ color: '#0284c7', fontWeight: 700 }}>MedDRA Preferred Term: </span>
                      <div style={{ color: '#0f172a' }}>{item.meddraPt}</div>
                      <div style={{ color: '#64748b', fontSize: '0.7rem' }}>SOC: {item.meddraSoc}</div>
                    </div>
                    <div>
                      <span style={{ color: '#b45309', fontWeight: 700 }}>WHODrug Concomitant: </span>
                      <div style={{ color: '#0f172a' }}>{item.concomitantMedicationWhodrug}</div>
                      <div style={{ color: '#64748b', fontSize: '0.7rem' }}>ASU Herb-Drug Interaction Screen: Negative</div>
                    </div>
                    <div>
                      <span style={{ color: '#047857', fontWeight: 700 }}>ASU Causality: </span>
                      <div style={{ color: '#0f172a' }}>WHO-UMC: <strong>{item.whoUmcCausality}</strong></div>
                      <div style={{ color: '#64748b', fontSize: '0.7rem' }}>Naranjo Algorithm Score: {item.naranjoScore} / 13</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: Aggregate Safety Signals & PRR Engine --- */}
      {activePvTab === 'signal-engine' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a' }}>
                  Aggregate Safety Signals & Disproportionality Engine (PRR / ROR)
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Automated disproportionality algorithms calculating Proportional Reporting Ratios (PRR &gt; 2.0 with χ² ≥ 4.0) across ASU clinical formulations.
                </p>
              </div>

              <span className="badge-gold">
                <Cpu size={14} /> AI Signal Triage Active
              </span>
            </div>

            {/* Signals Table */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {signals.map(sig => {
                const isConfirmed = sig.signalStatus.includes('Confirmed');
                return (
                  <div
                    key={sig.signalId}
                    style={{
                      background: isConfirmed ? '#fef2f2' : '#fffbeb',
                      border: isConfirmed ? '1px solid #fecaca' : '1px solid #fde68a',
                      borderRadius: '10px',
                      padding: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span className={isConfirmed ? 'badge-crimson' : 'badge-gold'}>
                            {sig.signalId}
                          </span>
                          <strong style={{ fontSize: '0.92rem', color: '#0f172a' }}>{sig.suspectAsuDrug}</strong>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#047857' }}>
                          Adverse Signal: <strong>{sig.adverseEventTerm}</strong> [{sig.meddraPt}]
                        </div>
                      </div>

                      <div style={{ textAlign: 'right' }}>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: isConfirmed ? '#fee2e2' : '#fef3c7',
                          color: isConfirmed ? '#dc2626' : '#b45309'
                        }}>
                          {sig.signalStatus}
                        </span>
                        <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '4px' }}>Flagged on {sig.dateFlagged}</div>
                      </div>
                    </div>

                    {/* Disproportionality Metrics */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                      gap: '8px',
                      background: '#f1f5f9',
                      padding: '10px 14px',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      marginBottom: '10px'
                    }}>
                      <div>
                        <span style={{ color: '#64748b' }}>Cases Reported:</span>
                        <div style={{ color: '#0f172a', fontWeight: 800 }}>{sig.casesReported} Cases</div>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>PRR Score:</span>
                        <div style={{ color: sig.prrScore > 2 ? '#dc2626' : '#047857', fontWeight: 800 }}>{sig.prrScore}</div>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>Reporting Odds (ROR):</span>
                        <div style={{ color: '#0f172a', fontWeight: 800 }}>{sig.rorScore}</div>
                      </div>
                      <div>
                        <span style={{ color: '#64748b' }}>Chi-Square (χ²):</span>
                        <div style={{ color: sig.chiSquare >= 4 ? '#b45309' : '#64748b', fontWeight: 800 }}>{sig.chiSquare}</div>
                      </div>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: '#475569', lineHeight: 1.4 }}>
                      <strong style={{ color: '#0284c7' }}>DSMB Advisory: </strong>
                      {sig.dsmbActionRequired}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: DSMB Safety Dossier --- */}
      {activePvTab === 'dsmb-dossier' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#0f172a' }}>
                  Data Safety Monitoring Board (DSMB) Independent Charter
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Unblinded interim safety analyses, formal stopping rule evaluations, and statistical boundaries (O'Brien-Fleming).
                </p>
              </div>

              <span className="glass-pill" style={{ color: '#047857' }}>
                Charter Meeting: Unanimous Trial Continuation
              </span>
            </div>

            <div style={{
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '10px',
              padding: '18px',
              marginBottom: '20px'
            }}>
              <h4 style={{ fontSize: '1rem', color: '#0f172a', marginBottom: '10px' }}>
                Latest Interim DSMB Safety Resolution (Dated 2026-09-20)
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.6, marginBottom: '12px' }}>
                The independent Data Safety Monitoring Board evaluated unblinded cumulative safety data for <strong>{currentStudy.id}</strong>. 
                With 108 patients randomized (53 Active : 51 Placebo), no mortality or irreversible organ toxicities attributed to the 
                investigational Ayurvedic formulation have occurred. Incidence of grade 1-2 transient dyspepsia was balanced across arms. 
                The DSMB unanimously recommends continuing the trial without sample size modification.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '0.76rem', color: '#047857' }}>
                <CheckCircle2 size={15} /> DSMB Stopping Boundary: p &lt; 0.001 (Observed p = 0.42, far from halting threshold).
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button
                onClick={() => alert(`DSMB Unblinded Safety Summary Package generated for ${currentStudy.id}.`)}
                className="btn-primary"
                style={{ fontSize: '0.82rem', padding: '8px 18px' }}
              >
                <Download size={14} /> Download DSMB Formal Recommendation Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
