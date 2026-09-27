import React, { useState } from 'react';
import { X, ShieldAlert, Clock, AlertTriangle, Sparkles, CheckCircle2 } from 'lucide-react';
import { AeSaeRecord, SiteInfo } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface LogAeSaeModalProps {
  isOpen: boolean;
  onClose: () => void;
  sites: SiteInfo[];
  onSubmitAeSae: (record: AeSaeRecord) => void;
}

export const LogAeSaeModal: React.FC<LogAeSaeModalProps> = ({
  isOpen,
  onClose,
  sites,
  onSubmitAeSae
}) => {
  const [subjectId, setSubjectId] = useState('AIIA-01-073');
  const [siteId, setSiteId] = useState('SITE-01');
  const [term, setTerm] = useState('');
  const [isSae, setIsSae] = useState(false);
  const [severity, setSeverity] = useState<AeSaeRecord['severity']>('Moderate');
  const [meddraSoc, setMeddraSoc] = useState('Gastrointestinal disorders');
  const [meddraPt, setMeddraPt] = useState('Abdominal pain (10000081)');
  const [saeCriteria, setSaeCriteria] = useState<AeSaeRecord['saeCriteria']>('Hospitalization');
  const [whoUmcCausality, setWhoUmcCausality] = useState<AeSaeRecord['whoUmcCausality']>('Possible');
  const [naranjoScore, setNaranjoScore] = useState<number>(4);
  const [concomitantMeds, setConcomitantMeds] = useState('Metformin 500mg BD');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!term.trim()) {
      alert('Please specify the clinical adverse event term.');
      return;
    }

    soundManager.playSuccess();
    const newRecord: AeSaeRecord = {
      id: isSae ? `SAE-2026-${Math.floor(100 + Math.random() * 900)}` : `AE-2026-${Math.floor(100 + Math.random() * 900)}`,
      subjectId,
      siteId,
      eventType: isSae ? 'Serious Adverse Event (SAE)' : 'Adverse Event (AE)',
      term: term.trim(),
      meddraSoc,
      meddraPt,
      severity,
      onsetDate: new Date().toISOString(),
      dateReported: new Date().toISOString().split('T')[0],
      isSae,
      saeCriteria: isSae ? saeCriteria : undefined,
      reportedToIecWithin24h: true,
      reportedToCdscoWithin24h: isSae,
      hoursElapsedSinceOnset: 0,
      regulatoryClockHoursLeft: isSae ? 24 : 0,
      whoUmcCausality,
      naranjoScore,
      concomitantMedicationWhodrug: concomitantMeds || 'None reported',
      dsmbReviewStatus: isSae ? 'Pending Review' : 'Signal Evaluated - No Action',
      outcome: 'Recovering'
    };

    onSubmitAeSae(newRecord);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert size={22} style={{ color: isSae ? '#ef4444' : '#facc15' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>
              NPvCC Adverse Event & Safety Reporting Form
            </h3>
          </div>
          <button 
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* SAE Toggle Box */}
          <div style={{
            background: isSae ? 'rgba(239, 68, 68, 0.15)' : 'rgba(255, 255, 255, 0.04)',
            border: isSae ? '1px solid rgba(239, 68, 68, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '10px',
            padding: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: isSae ? '#f87171' : '#fff' }}>
                Is this a Serious Adverse Event (SAE)?
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Triggers mandatory 24-hr regulatory reporting clock to CDSCO & Institutional Ethics Committee.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  soundManager.playClick();
                  setIsSae(false);
                }}
                style={{
                  background: !isSae ? 'rgba(52, 211, 153, 0.25)' : 'rgba(0, 0, 0, 0.3)',
                  border: !isSae ? '1px solid rgba(52, 211, 153, 0.5)' : '1px solid transparent',
                  color: !isSae ? '#34d399' : '#94a3b8',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                No (Standard AE)
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playAlert();
                  setIsSae(true);
                }}
                style={{
                  background: isSae ? '#ef4444' : 'rgba(0, 0, 0, 0.3)',
                  border: isSae ? '1px solid #f87171' : '1px solid transparent',
                  color: isSae ? '#fff' : '#94a3b8',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Yes (SAE Urgent)
              </button>
            </div>
          </div>

          {/* Row 1: Subject ID & Site */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                Subject ID
              </label>
              <input
                type="text"
                value={subjectId}
                onChange={(e) => setSubjectId(e.target.value)}
                required
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '8px 12px',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                Reporting Site
              </label>
              <select
                value={siteId}
                onChange={(e) => setSiteId(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0d1a12',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '8px 12px',
                  fontSize: '0.85rem'
                }}
              >
                {sites.map(s => (
                  <option key={s.siteId} value={s.siteId}>
                    {s.siteId} - {s.siteName}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Term & Severity */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                Adverse Reaction Term (Verbatim Clinical Text)
              </label>
              <input
                type="text"
                value={term}
                onChange={(e) => setTerm(e.target.value)}
                placeholder="e.g. Acute gastric burning after ingestion, urticaria, dizziness..."
                required
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '8px 12px',
                  fontSize: '0.85rem'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                Severity
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value as any)}
                style={{
                  width: '100%',
                  background: '#0d1a12',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '8px 12px',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
                <option value="Life-Threatening">Life-Threatening</option>
              </select>
            </div>
          </div>

          {/* If SAE: Show SAE Criteria */}
          {isSae && (
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#fca5a5', marginBottom: '4px', textTransform: 'uppercase', fontWeight: 700 }}>
                SAE Qualification Criteria
              </label>
              <select
                value={saeCriteria}
                onChange={(e) => setSaeCriteria(e.target.value as any)}
                style={{
                  width: '100%',
                  background: 'rgba(239, 68, 68, 0.1)',
                  border: '1px solid rgba(239, 68, 68, 0.4)',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '8px 12px',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Hospitalization">In-patient Hospitalization or Prolongation</option>
                <option value="Life Threatening">Immediate Life Threatening Threat</option>
                <option value="Disability">Persistent or Significant Disability/Incapacity</option>
                <option value="Congenital Anomaly">Congenital Anomaly / Birth Defect</option>
                <option value="Death">Death</option>
              </select>
            </div>
          )}

          {/* MedDRA SOC & PT Coding */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                MedDRA 27.0 System Organ Class (SOC)
              </label>
              <select
                value={meddraSoc}
                onChange={(e) => setMeddraSoc(e.target.value)}
                style={{
                  width: '100%',
                  background: '#0d1a12',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '8px 12px',
                  fontSize: '0.82rem'
                }}
              >
                <option value="Gastrointestinal disorders">Gastrointestinal disorders</option>
                <option value="Infections and infestations">Infections and infestations</option>
                <option value="Hepatobiliary disorders">Hepatobiliary disorders</option>
                <option value="Skin and subcutaneous tissue disorders">Skin and subcutaneous tissue disorders</option>
                <option value="Nervous system disorders">Nervous system disorders</option>
                <option value="General disorders and administration site conditions">General disorders</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                MedDRA Preferred Term (PT)
              </label>
              <input
                type="text"
                value={meddraPt}
                onChange={(e) => setMeddraPt(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '8px 12px',
                  fontSize: '0.82rem'
                }}
              />
            </div>
          </div>

          {/* WHO-UMC Causality & Naranjo Algorithm */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                ASU WHO-UMC Causality Assessment
              </label>
              <select
                value={whoUmcCausality}
                onChange={(e) => setWhoUmcCausality(e.target.value as any)}
                style={{
                  width: '100%',
                  background: '#0d1a12',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '8px 12px',
                  fontSize: '0.82rem'
                }}
              >
                <option value="Certain">Certain (Re-challenge positive, plausible time)</option>
                <option value="Probable">Probable (Reasonable time relationship, unlikely other causes)</option>
                <option value="Possible">Possible (Reasonable time, but could be explained by concurrent disease)</option>
                <option value="Unlikely">Unlikely (Improbable temporal relationship)</option>
                <option value="Conditional">Conditional / Unclassified</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                Naranjo Probability Algorithm Score (0-13)
              </label>
              <input
                type="number"
                min="0"
                max="13"
                value={naranjoScore}
                onChange={(e) => setNaranjoScore(Number(e.target.value))}
                style={{
                  width: '100%',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  color: '#fff',
                  padding: '8px 12px',
                  fontSize: '0.82rem'
                }}
              />
            </div>
          </div>

          {/* Regulatory Warning Banner */}
          {isSae && (
            <div style={{
              background: 'rgba(239, 68, 68, 0.15)',
              border: '1px solid rgba(239, 68, 68, 0.4)',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '0.75rem',
              color: '#fca5a5',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Clock size={16} style={{ color: '#ef4444' }} />
              <span>Mandatory compliance: Upon submission, a 24-hr countdown will initiate for Form 11 expedited notification to CDSCO and IEC.</span>
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ fontSize: '0.82rem', padding: '8px 16px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={isSae ? 'btn-primary' : 'btn-gold'}
              style={{
                fontSize: '0.82rem',
                padding: '8px 20px',
                background: isSae ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' : undefined
              }}
            >
              {isSae ? 'Transmit SAE & Start 24h Clock' : 'Log Adverse Event Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
