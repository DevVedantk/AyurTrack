import React, { useState } from 'react';
import { X, FileCode, Download, Database, Share2, Copy, CheckCircle2 } from 'lucide-react';
import { CDISC_SDTM_SAMPLE, HL7_FHIR_RESEARCH_STUDY } from '../../data/mockStudies';
import { soundManager } from '../../utils/audioFeedback';

interface CdiscFhirModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CdiscFhirModal: React.FC<CdiscFhirModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'sdtm-dm' | 'sdtm-ae' | 'sdtm-vs' | 'fhir-r4'>('sdtm-dm');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = (content: string) => {
    soundManager.playClick();
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (filename: string, content: string) => {
    soundManager.playSuccess();
    const blob = new Blob([content], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '880px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FileCode size={22} style={{ color: '#38bdf8' }} />
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>
                CDISC Standards & HL7 FHIR R4 Interoperability Gateway
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Conforms to CDISC SDTM 3.3, ADaM, and Ayushman Bharat Digital Mission (ABDM) FHIR specs.
              </p>
            </div>
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

        {/* Tab buttons */}
        <div style={{
          display: 'flex',
          gap: '8px',
          marginBottom: '16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '8px',
          overflowX: 'auto'
        }}>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('sdtm-dm');
            }}
            style={{
              background: activeTab === 'sdtm-dm' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              border: activeTab === 'sdtm-dm' ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
              color: activeTab === 'sdtm-dm' ? '#38bdf8' : '#94a3b8',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            SDTM: DM (Demographics)
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('sdtm-ae');
            }}
            style={{
              background: activeTab === 'sdtm-ae' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              border: activeTab === 'sdtm-ae' ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
              color: activeTab === 'sdtm-ae' ? '#38bdf8' : '#94a3b8',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            SDTM: AE (Adverse Events)
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('sdtm-vs');
            }}
            style={{
              background: activeTab === 'sdtm-vs' ? 'rgba(56, 189, 248, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              border: activeTab === 'sdtm-vs' ? '1px solid rgba(56, 189, 248, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
              color: activeTab === 'sdtm-vs' ? '#38bdf8' : '#94a3b8',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            SDTM: VS (Vital Signs)
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('fhir-r4');
            }}
            style={{
              background: activeTab === 'fhir-r4' ? 'rgba(52, 211, 153, 0.2)' : 'rgba(255, 255, 255, 0.03)',
              border: activeTab === 'fhir-r4' ? '1px solid rgba(52, 211, 153, 0.4)' : '1px solid rgba(255, 255, 255, 0.06)',
              color: activeTab === 'fhir-r4' ? '#34d399' : '#94a3b8',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            HL7 FHIR R4 (ResearchStudy)
          </button>
        </div>

        {/* JSON Viewer */}
        <div style={{
          background: '#040805',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '10px',
          padding: '16px',
          maxHeight: '360px',
          overflowY: 'auto',
          marginBottom: '20px',
          position: 'relative'
        }}>
          <button
            onClick={() => {
              const content = activeTab === 'sdtm-dm' 
                ? JSON.stringify(CDISC_SDTM_SAMPLE.domainDM, null, 2)
                : activeTab === 'sdtm-ae'
                ? JSON.stringify(CDISC_SDTM_SAMPLE.domainAE, null, 2)
                : activeTab === 'sdtm-vs'
                ? JSON.stringify(CDISC_SDTM_SAMPLE.domainVS, null, 2)
                : JSON.stringify(HL7_FHIR_RESEARCH_STUDY, null, 2);
              handleCopy(content);
            }}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              padding: '4px 10px',
              color: '#cbd5e1',
              fontSize: '0.72rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            {copied ? <CheckCircle2 size={13} style={{ color: '#34d399' }} /> : <Copy size={13} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <pre style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: '#a7f3d0',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap'
          }}>
            {activeTab === 'sdtm-dm' && JSON.stringify(CDISC_SDTM_SAMPLE.domainDM, null, 2)}
            {activeTab === 'sdtm-ae' && JSON.stringify(CDISC_SDTM_SAMPLE.domainAE, null, 2)}
            {activeTab === 'sdtm-vs' && JSON.stringify(CDISC_SDTM_SAMPLE.domainVS, null, 2)}
            {activeTab === 'fhir-r4' && JSON.stringify(HL7_FHIR_RESEARCH_STUDY, null, 2)}
          </pre>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
            Validated against CDISC SDTM Implementation Guide v3.3 & Define-XML 2.1 specs.
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              onClick={() => {
                const content = JSON.stringify(CDISC_SDTM_SAMPLE, null, 2);
                handleDownload('CDISC_SDTM_Submission_Package.json', content);
              }}
              className="btn-secondary"
              style={{ fontSize: '0.8rem', padding: '8px 14px' }}
            >
              <Download size={14} /> Download SDTM Package (.json)
            </button>
            <button
              onClick={() => {
                const content = JSON.stringify(HL7_FHIR_RESEARCH_STUDY, null, 2);
                handleDownload('HL7_FHIR_ResearchStudy_ABDM.json', content);
              }}
              className="btn-primary"
              style={{ fontSize: '0.8rem', padding: '8px 16px' }}
            >
              <Download size={14} /> Export ABDM FHIR Bundle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
