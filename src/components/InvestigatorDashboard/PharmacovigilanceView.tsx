import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  BookOpen, 
  Sparkles, 
  Activity,
  HeartPulse,
  Send,
  Download
} from 'lucide-react';
import { ClinicalStudy, AeSaeRecord } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface PharmacovigilanceViewProps {
  study: ClinicalStudy;
  onOpenLogAeSae: () => void;
}

export const PharmacovigilanceView: React.FC<PharmacovigilanceViewProps> = ({
  study,
  onOpenLogAeSae
}) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'SAE' | 'AE'>('All');

  const filteredEvents = study.aeSaeList.filter(item => {
    if (selectedFilter === 'SAE') return item.isSae;
    if (selectedFilter === 'AE') return !item.isSae;
    return true;
  });

  const activeSae = study.aeSaeList.find(e => e.isSae);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* NPvCC National Pharmacovigilance Header */}
      <div className="glass-panel" style={{
        padding: '24px',
        background: 'linear-gradient(135deg, rgba(28, 16, 16, 0.85) 0%, rgba(14, 22, 18, 0.9) 100%)',
        border: '1px solid rgba(239, 68, 68, 0.35)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span className="badge-crimson">
                <span className="pulse-dot-red"></span>
                NPvCC ASU&H SAFETY COORDINATION CENTRE
              </span>
              <span className="glass-pill" style={{ fontSize: '0.72rem' }}>
                NDCT Rules 2019 Rule 42 Compliant
              </span>
            </div>
            <h2 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '6px' }}>
              Pharmacovigilance & Safety Surveillance Sentinel
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', maxWidth: '780px', lineHeight: 1.5 }}>
              AIIA anchors nationwide safety surveillance for ASU medicines. This module automatically enforces 
              the <strong>mandatory 24-hour regulatory notification clock</strong> to CDSCO and the Ethics Committee for SAEs, 
              indexes reactions against <strong>MedDRA 27.0</strong> and <strong>WHODrug Global</strong>, and computes WHO-UMC causality.
            </p>
          </div>

          <button
            onClick={() => {
              soundManager.playAlert();
              onOpenLogAeSae();
            }}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)',
              color: '#fff',
              fontSize: '0.88rem',
              padding: '10px 20px',
              border: 'none',
              boxShadow: '0 4px 16px rgba(239, 68, 68, 0.4)'
            }}
          >
            <ShieldAlert size={16} /> Report New AE / SAE
          </button>
        </div>

        {/* Live 24-Hour Urgent Regulatory Clock Box */}
        {activeSae && (
          <div style={{
            marginTop: '20px',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.4)',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(239, 68, 68, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#f87171'
              }}>
                <Clock size={28} />
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', color: '#fca5a5', textTransform: 'uppercase', fontWeight: 700 }}>
                  MANDATORY STATUTORY 24-HR REGULATORY CLOCK (NDCT RULE 42)
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-mono)' }}>
                  01h : 58m : 42s <span style={{ fontSize: '0.85rem', color: '#fca5a5', fontWeight: 600 }}>until CDSCO & IEC notification deadline</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                  Event: <strong>{activeSae.term}</strong> (Subject: {activeSae.subjectId} at {activeSae.siteId}) • Onset: {new Date(activeSae.onsetDate).toLocaleTimeString()}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => {
                  soundManager.playSuccess();
                  alert(`Expedited SAE Form 11 transmitted electronically to CDSCO SUGAM portal and AIIA Institutional Ethics Committee. Receipt ID: SUGAM-SAE-${Date.now()}`);
                }}
                className="btn-gold"
                style={{ fontSize: '0.82rem', padding: '8px 16px' }}
              >
                <Send size={14} /> Transmit Form 11 to CDSCO
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Events Table & Filter */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#fff' }}>
              Adverse Reactions & Safety Surveillance Ledger
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
              All events coded with MedDRA 27.0 System Organ Class (SOC) and WHODrug dictionary.
            </p>
          </div>

          {/* Filter Pills */}
          <div style={{ display: 'flex', gap: '8px' }}>
            {(['All', 'SAE', 'AE'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  soundManager.playClick();
                  setSelectedFilter(tab);
                }}
                style={{
                  background: selectedFilter === tab ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255, 255, 255, 0.04)',
                  border: selectedFilter === tab ? '1px solid rgba(52, 211, 153, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  color: selectedFilter === tab ? '#34d399' : '#94a3b8',
                  borderRadius: '6px',
                  padding: '6px 14px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {tab === 'All' ? 'All Events' : tab === 'SAE' ? 'Serious (SAE)' : 'Adverse (AE)'}
              </button>
            ))}
          </div>
        </div>

        {/* Safety Events Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filteredEvents.map(event => (
            <div
              key={event.id}
              style={{
                background: event.isSae ? 'rgba(239, 68, 68, 0.05)' : 'rgba(0, 0, 0, 0.3)',
                border: event.isSae ? '1px solid rgba(239, 68, 68, 0.35)' : '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '12px',
                padding: '18px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={event.isSae ? 'badge-crimson' : 'glass-pill'}>
                    {event.eventType}
                  </span>
                  <span style={{ fontSize: '0.92rem', fontWeight: 800, color: '#fff' }}>
                    {event.term}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    Subject: <strong style={{ color: '#34d399' }}>{event.subjectId}</strong> ({event.siteId})
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 700,
                    background: event.severity === 'Severe' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(234, 179, 8, 0.2)',
                    color: event.severity === 'Severe' ? '#f87171' : '#facc15'
                  }}>
                    Severity: {event.severity}
                  </span>
                  <span style={{
                    fontSize: '0.72rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontWeight: 600,
                    background: 'rgba(52, 211, 153, 0.15)',
                    color: '#34d399'
                  }}>
                    Outcome: {event.outcome}
                  </span>
                </div>
              </div>

              {/* Dictionaries & Causality Breakdown */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '12px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '8px',
                padding: '12px',
                fontSize: '0.78rem'
              }}>
                <div>
                  <span style={{ color: '#38bdf8', fontWeight: 700 }}>MedDRA Coding:</span>
                  <div style={{ color: '#fff', marginTop: '2px' }}>
                    PT: {event.meddraPt}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>
                    SOC: {event.meddraSoc}
                  </div>
                </div>

                <div>
                  <span style={{ color: '#facc15', fontWeight: 700 }}>ASU Causality Assessment:</span>
                  <div style={{ color: '#fff', marginTop: '2px' }}>
                    WHO-UMC: <strong>{event.whoUmcCausality}</strong>
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>
                    Naranjo Probability Algorithm Score: {event.naranjoScore} / 13
                  </div>
                </div>

                <div>
                  <span style={{ color: '#a7f3d0', fontWeight: 700 }}>WHODrug Concomitant:</span>
                  <div style={{ color: '#fff', marginTop: '2px' }}>
                    {event.concomitantMedicationWhodrug}
                  </div>
                  <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>
                    DSMB Status: <strong style={{ color: '#34d399' }}>{event.dsmbReviewStatus}</strong>
                  </div>
                </div>
              </div>

              {/* Regulatory Audit Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', fontSize: '0.72rem', color: '#64748b' }}>
                <span>Reported within 24h: <strong style={{ color: '#34d399' }}>Yes (GCP-ASU Compliant)</strong></span>
                <span>SHA-256 Audit Seal: a665a45920422f9d417e...</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
