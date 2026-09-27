import React, { useState } from 'react';
import { 
  ShieldCheck, 
  FileText, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  Video, 
  Lock, 
  Download, 
  ExternalLink, 
  Calendar,
  FileCheck2,
  FileCode,
  Search,
  Eye,
  History,
  AlertCircle,
  FileQuestion
} from 'lucide-react';
import { ClinicalStudy, InformedConsentRecord, ProtocolDeviation, SystemAlert } from '../../types/clinical';
import { MOCK_CONSENT_RECORDS } from '../../data/mockStudies';
import { soundManager } from '../../utils/audioFeedback';

interface EthicsDashboardProps {
  studies: ClinicalStudy[];
  currentStudy: ClinicalStudy;
  onSelectStudy: (studyId: string) => void;
  onOpenAuditTrail: () => void;
  alerts: SystemAlert[];
}

export const EthicsDashboard: React.FC<EthicsDashboardProps> = ({
  studies,
  currentStudy,
  onSelectStudy,
  onOpenAuditTrail,
  alerts
}) => {
  const [activeEthicsTab, setActiveEthicsTab] = useState<'iec-status' | 'consent-mgmt' | 'deviations' | 'sae-oversight'>('iec-status');
  const [consentRecords, setConsentRecords] = useState<InformedConsentRecord[]>(MOCK_CONSENT_RECORDS);
  const [selectedLanguage, setSelectedLanguage] = useState<string>('All');

  // Filtered consent records
  const filteredConsents = consentRecords.filter(c => {
    if (selectedLanguage !== 'All' && c.language !== selectedLanguage) return false;
    return true;
  });

  const activeSae = currentStudy.aeSaeList.find(e => e.isSae);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner: IEC Authority Header */}
      <div className="glass-panel" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(16, 28, 22, 0.9) 0%, rgba(10, 18, 14, 0.95) 100%)',
        border: '1px solid rgba(52, 211, 153, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="glass-pill" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
                <ShieldCheck size={14} />
                INSTITUTIONAL ETHICS COMMITTEE (IEC-AIIA)
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                CDSCO Registration: <strong style={{ color: '#fff' }}>ECR/124/Inst/DL/2013/RR-19</strong>
              </span>
            </div>
            <h2 style={{ fontSize: '1.45rem', color: '#fff', marginBottom: '6px' }}>
              Ethics Committee Oversight & Human Subject Protection
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', maxWidth: '850px', lineHeight: 1.5 }}>
              Guiding ethical integrity across all Ayurvedic clinical trials per <strong>ICMR National Ethical Guidelines (2017/2024)</strong>, 
              <strong>GCP-ASU</strong>, and the <strong>Digital Personal Data Protection (DPDP) Act, 2023</strong>.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                soundManager.playSuccess();
                alert(`Exporting Ethics Committee Consolidated Clearance Dossier for ${currentStudy.protocolNumber}. Contains signed approval certificates, SAE expedited logs, and DPDP consent validation audit.`);
              }}
              className="btn-primary"
              style={{ fontSize: '0.82rem', padding: '9px 18px' }}
            >
              <Download size={14} /> Export IEC Clearance Dossier
            </button>
          </div>
        </div>

        {/* Quick KPI Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)'
        }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Current IEC Status</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#34d399' }}>✓ Approved & Active</div>
            <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Ref: {currentStudy.iecRegistrationNumber.split(' ')[0]}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Annual Renewal Horizon</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#facc15' }}>{currentStudy.iecDaysUntilRenewal} Days</div>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8' }}>Due Date: {currentStudy.iecAnnualRenewalDue}</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>DPDP Informed Consents</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#38bdf8' }}>
              {consentRecords.filter(c => c.dpdpConsentGranted).length} Validated
            </div>
            <div style={{ fontSize: '0.72rem', color: '#6ee7b7' }}>1 Withdrawn • Vaulted</div>
          </div>
          <div>
            <div style={{ fontSize: '0.7rem', color: '#94a3b8', textTransform: 'uppercase' }}>Expedited SAEs Reviewed</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 800, color: activeSae ? '#f87171' : '#34d399' }}>
              {activeSae ? '1 Urgent (24h Clock)' : '0 Pending'}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>Form 11 Regulatory Compliance</div>
          </div>
        </div>
      </div>

      {/* IEC Module Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        paddingBottom: '8px',
        overflowX: 'auto'
      }}>
        {[
          { id: 'iec-status', label: 'IEC Approvals & Regulatory Milestones', icon: <FileCheck2 size={15} /> },
          { id: 'consent-mgmt', label: 'Informed-Consent Management (DPDP 2023)', icon: <Lock size={15} /> },
          { id: 'deviations', label: 'Protocol Deviations & CAPA (7-Day Rule)', icon: <AlertTriangle size={15} /> },
          { id: 'sae-oversight', label: 'Urgent AE/SAE & Compensation Oversight', icon: <Clock size={15} /> }
        ].map(tab => {
          const isActive = activeEthicsTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                soundManager.playClick();
                setActiveEthicsTab(tab.id as any);
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                borderRadius: '8px',
                border: isActive ? '1px solid rgba(52, 211, 153, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
                background: isActive ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                color: isActive ? '#34d399' : '#94a3b8',
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

      {/* --- TAB 1: IEC Approvals & Milestones --- */}
      {activeEthicsTab === 'iec-status' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>
                  Institutional Ethics Committee Clearances & Statutory Registry
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Full Committee Review dossier tracking conforming to ICMR Ethical Guidelines and GCP-ASU.
                </p>
              </div>
              <span className="glass-pill">
                Meeting Quorum: 11/11 Members Present
              </span>
            </div>

            {/* Approval Table */}
            <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', textAlign: 'left' }}>
                    <th style={{ padding: '10px' }}>Protocol ID</th>
                    <th style={{ padding: '10px' }}>Study Title</th>
                    <th style={{ padding: '10px' }}>IEC Clearance Ref</th>
                    <th style={{ padding: '10px' }}>Approval Date</th>
                    <th style={{ padding: '10px' }}>Annual Renewal Due</th>
                    <th style={{ padding: '10px' }}>Risk Category</th>
                    <th style={{ padding: '10px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {studies.map((st, idx) => (
                    <tr key={st.id} style={{
                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                      background: st.id === currentStudy.id ? 'rgba(16, 185, 129, 0.05)' : 'transparent'
                    }}>
                      <td style={{ padding: '12px 10px', color: '#34d399', fontWeight: 700 }}>
                        {st.id}
                      </td>
                      <td style={{ padding: '12px 10px', color: '#fff', maxWidth: '320px', lineHeight: 1.4 }}>
                        {st.shortTitle}
                      </td>
                      <td style={{ padding: '12px 10px', color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>
                        {st.iecRegistrationNumber.split(' ')[0]}
                      </td>
                      <td style={{ padding: '12px 10px', color: '#cbd5e1' }}>
                        {st.iecApprovalDate}
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <span style={{ color: '#facc15', fontWeight: 700 }}>
                          {st.iecAnnualRenewalDue} ({st.iecDaysUntilRenewal}d)
                        </span>
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <span className="badge-cyan" style={{ fontSize: '0.7rem' }}>
                          Moderate Risk (ASU)
                        </span>
                      </td>
                      <td style={{ padding: '12px 10px' }}>
                        <button
                          onClick={() => {
                            soundManager.playClick();
                            onSelectStudy(st.id);
                          }}
                          style={{
                            background: st.id === currentStudy.id ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            borderRadius: '4px',
                            color: st.id === currentStudy.id ? '#34d399' : '#cbd5e1',
                            padding: '4px 10px',
                            fontSize: '0.72rem',
                            cursor: 'pointer'
                          }}
                        >
                          {st.id === currentStudy.id ? 'Active Focus' : 'Select'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ICMR Ethics Committee Composition Check */}
            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '10px',
              padding: '16px'
            }}>
              <div style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 700, marginBottom: '10px', textTransform: 'uppercase' }}>
                Institutional Ethics Committee Mandated Composition (Per ICMR 2017 & NDCT 2019)
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px', fontSize: '0.78rem' }}>
                <div style={{ color: '#cbd5e1' }}>• <strong>Chairperson</strong>: Prof. Dr. K. V. Raghuram (External)</div>
                <div style={{ color: '#cbd5e1' }}>• <strong>Member Secretary</strong>: Dr. R. K. Yadav (Pharmacologist)</div>
                <div style={{ color: '#cbd5e1' }}>• <strong>Legal Expert</strong>: Adv. Sunita Mathur (High Court)</div>
                <div style={{ color: '#cbd5e1' }}>• <strong>Lay Person</strong>: Smt. Gayatri Devi (Community Rep)</div>
                <div style={{ color: '#cbd5e1' }}>• <strong>Social Scientist / Ethicist</strong>: Dr. Manju Rao</div>
                <div style={{ color: '#cbd5e1' }}>• <strong>Ayurveda Expert</strong>: Prof. Dr. A. K. Tripathi</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 2: Informed-Consent Management (DPDP 2023) --- */}
      {activeEthicsTab === 'consent-mgmt' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>
                  Informed-Consent Governance & DPDP Act 2023 Compliance Vault
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Tracking audio-visual (AV) recordings, multilingual translations, vulnerable subject assent, and consent withdrawals.
                </p>
              </div>

              {/* Language filter */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>Filter Language:</span>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  style={{
                    background: '#0a140e',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    color: '#fff',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '0.78rem'
                  }}
                >
                  <option value="All">All Languages</option>
                  <option value="Hindi">Hindi (Official)</option>
                  <option value="English">English</option>
                  <option value="Gujarati">Gujarati</option>
                </select>
              </div>
            </div>

            {/* Consents Ledger */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {filteredConsents.map(consent => {
                const isWithdrawn = consent.withdrawalStatus === 'Withdrawn';
                return (
                  <div
                    key={consent.id}
                    style={{
                      background: isWithdrawn ? 'rgba(239, 68, 68, 0.08)' : 'rgba(0, 0, 0, 0.3)',
                      border: isWithdrawn ? '1px solid rgba(239, 68, 68, 0.35)' : '1px solid rgba(255, 255, 255, 0.06)',
                      borderRadius: '10px',
                      padding: '16px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{
                          fontSize: '0.7rem',
                          fontWeight: 700,
                          padding: '2px 8px',
                          borderRadius: '4px',
                          background: isWithdrawn ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                          color: isWithdrawn ? '#f87171' : '#34d399'
                        }}>
                          {consent.withdrawalStatus === 'Active' ? '✓ Active Consent' : '⚠️ Consent Withdrawn'}
                        </span>
                        <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff' }}>
                          Subject: {consent.subjectId} ({consent.siteId})
                        </span>
                        <span className="glass-pill" style={{ fontSize: '0.72rem' }}>
                          {consent.version}
                        </span>
                        <span style={{ fontSize: '0.75rem', color: '#facc15', fontWeight: 600 }}>
                          Language: {consent.language}
                        </span>
                      </div>

                      <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        Consent Date: <strong>{consent.consentDate}</strong>
                        {consent.withdrawalDate && (
                          <span style={{ color: '#f87171', marginLeft: '8px' }}>
                            (Withdrawn on {consent.withdrawalDate})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Safeguards Grid */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '8px',
                      fontSize: '0.76rem',
                      background: 'rgba(255, 255, 255, 0.02)',
                      padding: '10px',
                      borderRadius: '6px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: consent.avRecordingDone ? '#34d399' : '#94a3b8' }}>
                        <Video size={13} />
                        <span>AV Recording: {consent.avRecordingDone ? 'Archived in WORM Vault' : 'Exempt / Waived'}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: consent.impartialWitnessPresent ? '#38bdf8' : '#94a3b8' }}>
                        <Users size={13} />
                        <span>Impartial Witness: {consent.impartialWitnessPresent ? 'Yes (Signatures Verified)' : 'Not Required'}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: consent.isVulnerablePopulation ? '#facc15' : '#a7f3d0' }}>
                        <AlertCircle size={13} />
                        <span>Vulnerable Subject: {consent.isVulnerablePopulation ? 'Yes (Additional Safeguards)' : 'No'}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#6ee7b7' }}>
                        <Lock size={13} />
                        <span>DPDP Act 2023 Notice: Verified & Signed</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 3: Protocol Deviations (7-Day Rule) --- */}
      {activeEthicsTab === 'deviations' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>
                  Ethics Committee Protocol Deviation & CAPA Oversight
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Statutory enforcement of GCP-ASU clause: Major protocol deviations must be reported to the IEC within 7 working days.
                </p>
              </div>
              <span className="glass-pill" style={{ color: '#34d399' }}>
                ✓ 100% 7-Day Timeliness Compliance
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {currentStudy.protocolDeviations.map(dev => (
                <div
                  key={dev.id}
                  style={{
                    background: dev.deviationType === 'Major' ? 'rgba(239, 68, 68, 0.08)' : 'rgba(234, 179, 8, 0.06)',
                    border: dev.deviationType === 'Major' ? '1px solid rgba(239, 68, 68, 0.35)' : '1px solid rgba(250, 204, 21, 0.3)',
                    borderRadius: '10px',
                    padding: '16px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={dev.deviationType === 'Major' ? 'badge-crimson' : 'badge-gold'}>
                        {dev.deviationType}
                      </span>
                      <strong style={{ color: '#fff', fontSize: '0.88rem' }}>{dev.id}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                        Subject: <strong>{dev.subjectId}</strong> ({dev.siteId})
                      </span>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#34d399', fontWeight: 600 }}>
                      ✓ Reported to IEC within 7 Days ({dev.iecReportedDate || 'On-time'})
                    </div>
                  </div>

                  <p style={{ fontSize: '0.82rem', color: '#f1f5f9', marginBottom: '12px', lineHeight: 1.4 }}>
                    {dev.description}
                  </p>

                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: '10px',
                    fontSize: '0.75rem',
                    background: 'rgba(0, 0, 0, 0.25)',
                    padding: '10px',
                    borderRadius: '6px',
                    marginBottom: '10px'
                  }}>
                    <div>
                      <span style={{ color: '#facc15', fontWeight: 700 }}>RCA: </span>
                      <span style={{ color: '#cbd5e1' }}>{dev.rootCause}</span>
                    </div>
                    <div>
                      <span style={{ color: '#34d399', fontWeight: 700 }}>CAPA: </span>
                      <span style={{ color: '#cbd5e1' }}>{dev.preventiveAction}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                      IEC Committee Review Status: <strong style={{ color: '#34d399' }}>{dev.status}</strong>
                    </span>

                    <button
                      onClick={() => {
                        soundManager.playSuccess();
                        alert(`IEC formal closure note stamped for ${dev.id}. Document archived with SHA-256 seal.`);
                      }}
                      className="btn-primary"
                      style={{ fontSize: '0.72rem', padding: '4px 12px' }}
                    >
                      IEC Endorse CAPA Closure
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: Urgent AE/SAE Oversight --- */}
      {activeEthicsTab === 'sae-oversight' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="glass-panel" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>
                  Institutional Ethics Committee Urgent SAE & Compensation Oversight
                </h3>
                <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  Mandatory 24-hr expedited SAE transmission review and 30-day compensation liability assessment per NDCT Rules 2019.
                </p>
              </div>
              <span className="badge-crimson">
                <Clock size={14} /> 24h Regulatory Protocol
              </span>
            </div>

            {currentStudy.aeSaeList.filter(e => e.isSae).map(sae => (
              <div
                key={sae.id}
                style={{
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginBottom: '16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '12px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                      <span className="badge-crimson">{sae.id}</span>
                      <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>{sae.term}</h4>
                      <span className="glass-pill" style={{ fontSize: '0.72rem' }}>Criteria: {sae.saeCriteria}</span>
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                      Subject: <strong>{sae.subjectId}</strong> ({sae.siteId}) • Onset: {sae.onsetDate}
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.72rem', color: '#fca5a5' }}>STATUTORY 24H TRANSMISSION</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#34d399' }}>✓ Transmitted within 24h</div>
                  </div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '12px',
                  background: 'rgba(0, 0, 0, 0.3)',
                  padding: '14px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  marginBottom: '16px'
                }}>
                  <div>
                    <div style={{ color: '#94a3b8' }}>Investigator Causality Assessment:</div>
                    <div style={{ color: '#facc15', fontWeight: 700 }}>WHO-UMC: {sae.whoUmcCausality} (Naranjo: {sae.naranjoScore})</div>
                  </div>
                  <div>
                    <div style={{ color: '#94a3b8' }}>MedDRA System Organ Class:</div>
                    <div style={{ color: '#fff' }}>{sae.meddraSoc} [{sae.meddraPt}]</div>
                  </div>
                  <div>
                    <div style={{ color: '#94a3b8' }}>Medical Management & Compensation:</div>
                    <div style={{ color: '#34d399', fontWeight: 700 }}>Hospitalization coverage provided per NDCT</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    onClick={() => {
                      soundManager.playSuccess();
                      alert(`IEC Committee Opinion recorded: No study-halting signal. Continued multi-centre safety observation advised.`);
                    }}
                    className="btn-primary"
                    style={{ fontSize: '0.8rem', padding: '6px 16px' }}
                  >
                    Record IEC Expedited Safety Opinion
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
