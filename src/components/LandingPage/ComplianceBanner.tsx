import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const ComplianceBanner: React.FC = () => {
  const compliances = [
    { title: 'GCP-ASU Guidelines', org: 'Ministry of Ayush (2013)', icon: '📜' },
    { title: 'ICMR Ethical Guidelines', org: 'Biomedical & Health Research', icon: '⚖️' },
    { title: 'NDCT Rules 2019', org: 'CDSCO Rule 42 (SAE 24h)', icon: '⏱️' },
    { title: 'CTRI Mandatory Prospective', org: 'Clinical Trials Registry - India', icon: '🔍' },
    { title: 'CDISC Standards', org: 'CDASH, SDTM 3.3, ADaM, Define-XML', icon: '📊' },
    { title: 'HL7 FHIR R4 & ABDM', org: 'National Digital Health Mission', icon: '🌐' },
    { title: 'DPDP Act 2023 & 2025 Rules', org: 'Sensitive Personal Data Protection', icon: '🛡️' },
    { title: 'ISO/IEC 27001 & CERT-In', org: 'National Data Residency Verified', icon: '🔒' }
  ];

  return (
    <section id="compliance" style={{
      background: '#f1f5f9',
      borderTop: '1px solid #e2e8f0',
      borderBottom: '1px solid #e2e8f0',
      padding: '40px 24px',
      margin: '20px 0'
    }}>
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          marginBottom: '28px',
          fontSize: '0.8rem',
          color: '#047857',
          fontWeight: 700,
          letterSpacing: '0.08em',
          textTransform: 'uppercase'
        }}>
          <ShieldCheck size={16} style={{ color: '#047857' }} />
          <span>STATUTORY REGULATORY & ETHICAL COMPLIANCE FRAMEWORK</span>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '16px'
        }}>
          {compliances.map((item, idx) => (
            <div 
              key={idx}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                transition: 'border-color 0.2s, box-shadow 0.2s'
              }}
              onMouseOver={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#a7f3d0';
                (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
              }}
              onMouseOut={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = '#e2e8f0';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div style={{ fontSize: '24px' }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                  {item.title}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
                  {item.org}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
