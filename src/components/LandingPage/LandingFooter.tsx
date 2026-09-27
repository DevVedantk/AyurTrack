import React from 'react';
import { ShieldCheck, ArrowUp } from 'lucide-react';

interface LandingFooterProps {
  onLaunchDashboard: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onLaunchDashboard }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer style={{
      background: '#ffffff',
      borderTop: '1px solid #e2e8f0',
      padding: '50px 24px 30px',
      color: '#64748b'
    }}>
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        {/* Col 1 */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <span style={{ fontSize: '24px' }}>🌿</span>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 800,
              color: '#0f172a'
            }}>
              Ayur<span style={{ color: '#047857' }}>Track</span> CTMS
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '16px', color: '#475569' }}>
            The National Clinical Trial Management System and Pharmacovigilance Surveillance Hub of the 
            <strong> All India Institute of Ayurveda (AIIA)</strong>, Ministry of Ayush, Government of India.
          </p>
          <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            National Pharmacovigilance Coordination Centre (NPvCC) for ASU&H Drugs
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 style={{ color: '#0f172a', fontSize: '0.95rem', marginBottom: '16px', fontWeight: 700 }}>
            Regulatory & Standards Links
          </h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.85rem', lineHeight: 2.2 }}>
            <li>
              <a href="https://ctri.nic.in" target="_blank" rel="noreferrer" style={{ color: '#475569', textDecoration: 'none' }}>
                • Clinical Trials Registry – India (CTRI)
              </a>
            </li>
            <li>
              <a href="https://cdisc.org" target="_blank" rel="noreferrer" style={{ color: '#475569', textDecoration: 'none' }}>
                • CDISC Standards (CDASH / SDTM / ADaM)
              </a>
            </li>
            <li>
              <a href="https://hl7.org/fhir" target="_blank" rel="noreferrer" style={{ color: '#475569', textDecoration: 'none' }}>
                • HL7 FHIR R4 ResearchStudy Standard
              </a>
            </li>
            <li>
              <a href="https://aiia.gov.in" target="_blank" rel="noreferrer" style={{ color: '#475569', textDecoration: 'none' }}>
                • All India Institute of Ayurveda Official Portal
              </a>
            </li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 style={{ color: '#0f172a', fontSize: '0.95rem', marginBottom: '16px', fontWeight: 700 }}>
            Data Residency & Security
          </h4>
          <p style={{ fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '12px', color: '#475569' }}>
            Clinical trial data is sensitive personal data protected under <strong>Digital Personal Data Protection (DPDP) Act 2023</strong> 
            and hosted on sovereign cloud infrastructure with CERT-In and ISO/IEC 27001 certification.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="glass-pill" style={{ fontSize: '0.72rem' }}>ISO 27001</span>
            <span className="glass-pill" style={{ fontSize: '0.72rem' }}>CERT-In Norms</span>
            <span className="glass-pill" style={{ fontSize: '0.72rem' }}>21 CFR Part 11</span>
          </div>
        </div>
      </div>

      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        paddingTop: '24px',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        fontSize: '0.8rem'
      }}>
        <div style={{ color: '#64748b' }}>
          © 2026 All India Institute of Ayurveda (AIIA) & Ministry of Ayush. All Rights Reserved.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button 
            onClick={onLaunchDashboard}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#047857',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '0.8rem'
            }}
          >
            Launch Investigator Dashboard →
          </button>
          <button
            onClick={scrollToTop}
            style={{
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '6px 12px',
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <ArrowUp size={14} /> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};
