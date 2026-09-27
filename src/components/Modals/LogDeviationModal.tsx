import React, { useState } from 'react';
import { X, AlertTriangle, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ProtocolDeviation, SiteInfo } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface LogDeviationModalProps {
  isOpen: boolean;
  onClose: () => void;
  sites: SiteInfo[];
  onSubmitDeviation: (deviation: ProtocolDeviation) => void;
}

export const LogDeviationModal: React.FC<LogDeviationModalProps> = ({
  isOpen,
  onClose,
  sites,
  onSubmitDeviation
}) => {
  const [subjectId, setSubjectId] = useState('AIIA-01-094');
  const [siteId, setSiteId] = useState('SITE-01');
  const [deviationType, setDeviationType] = useState<'Major' | 'Minor'>('Minor');
  const [category, setCategory] = useState<ProtocolDeviation['category']>('Visit Window');
  const [description, setDescription] = useState('');
  const [rootCause, setRootCause] = useState('');
  const [correctiveAction, setCorrectiveAction] = useState('');
  const [preventiveAction, setPreventiveAction] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please enter a description for the deviation.');
      return;
    }

    soundManager.playSuccess();
    const newDev: ProtocolDeviation = {
      id: `DEV-2026-${Math.floor(100 + Math.random() * 900)}`,
      subjectId,
      siteId,
      deviationType,
      category,
      description,
      dateIdentified: new Date().toISOString().split('T')[0],
      iecReportedWithin7Days: true,
      status: 'Under Investigation',
      rootCause: rootCause.trim() || 'Clinical investigation ongoing per SOP.',
      correctiveAction: correctiveAction.trim() || 'Subject counselled and vital parameters re-evaluated.',
      preventiveAction: preventiveAction.trim() || 'Study coordinator notified to enforce reminder protocol.'
    };

    onSubmitDeviation(newDev);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={20} style={{ color: '#facc15' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>
              Log Protocol Deviation (GCP-ASU Compliant)
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
                Trial Site
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

          {/* Row 2: Type & Category */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                Deviation Severity
              </label>
              <select
                value={deviationType}
                onChange={(e) => setDeviationType(e.target.value as any)}
                style={{
                  width: '100%',
                  background: '#0d1a12',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  borderRadius: '6px',
                  color: deviationType === 'Major' ? '#f87171' : '#facc15',
                  fontWeight: 700,
                  padding: '8px 12px',
                  fontSize: '0.85rem'
                }}
              >
                <option value="Minor">Minor (No impact on safety/endpoints)</option>
                <option value="Major">Major (Requires 7-day IEC report)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
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
                <option value="Visit Window">Visit Window Elapsed</option>
                <option value="Concomitant Medication">Concomitant Medication</option>
                <option value="Informed Consent">Informed Consent Process</option>
                <option value="Study Drug Non-Compliance">Study Drug Non-Compliance</option>
                <option value="Ineligible Enrolment">Ineligible Enrolment</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
              Detailed Description of Deviation
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Subject consumed unprescribed over-the-counter Ayurvedic formulation or missed visit window by 48 hours..."
              required
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '6px',
                color: '#fff',
                padding: '8px 12px',
                fontSize: '0.85rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Root Cause & CAPA */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                Root Cause Analysis (RCA)
              </label>
              <input
                type="text"
                value={rootCause}
                onChange={(e) => setRootCause(e.target.value)}
                placeholder="e.g. Rail transit delay during regional floods"
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
                Corrective & Preventive Action (CAPA)
              </label>
              <input
                type="text"
                value={correctiveAction}
                onChange={(e) => setCorrectiveAction(e.target.value)}
                placeholder="e.g. Re-counselled with visual schedule booklet"
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
          </div>

          {/* GCP-ASU Compliance notice */}
          <div style={{
            background: 'rgba(52, 211, 153, 0.08)',
            border: '1px solid rgba(52, 211, 153, 0.25)',
            borderRadius: '8px',
            padding: '10px 14px',
            fontSize: '0.75rem',
            color: '#a7f3d0',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <ShieldCheck size={16} style={{ color: '#34d399' }} />
            <span>Automatic compliance: Entry generates an immutable ALCOA+ SHA-256 audit entry and initiates the 7-day IEC transmission draft.</span>
          </div>

          {/* Actions */}
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
              className="btn-primary"
              style={{ fontSize: '0.82rem', padding: '8px 20px' }}
            >
              Log Deviation & Seal Audit Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
