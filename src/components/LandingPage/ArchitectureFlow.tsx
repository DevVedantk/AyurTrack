import React from 'react';
import { 
  Building2, 
  Cpu, 
  ShieldCheck, 
  Lock, 
  Globe2,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

export const ArchitectureFlow: React.FC = () => {
  const steps = [
    {
      id: '01',
      icon: <Building2 size={22} style={{ color: '#047857' }} />,
      title: 'Ayush HIS & Multi-Centre EDC',
      subtitle: 'CDASH Bedside Capture',
      desc: 'eCRFs capturing Ayurvedic diagnostic metrics (Prakriti, Agni, Dhatu, Rogabala) alongside conventional endpoints.',
      accent: '#047857',
      accentBg: '#ecfdf5',
      accentBorder: '#a7f3d0'
    },
    {
      id: '02',
      icon: <Cpu size={22} style={{ color: '#b45309' }} />,
      title: 'CTMS Protocol Governance',
      subtitle: 'Automated Rule Engine',
      desc: 'Real-time protocol window verification (±2 days), 1:1 stratified block randomization, and screening eligibility.',
      accent: '#b45309',
      accentBg: '#fffbeb',
      accentBorder: '#fde68a'
    },
    {
      id: '03',
      icon: <ShieldCheck size={22} style={{ color: '#dc2626' }} />,
      title: 'NPvCC Safety & MedDRA',
      subtitle: '24-Hour Urgent Sentinel',
      desc: 'Automated 24h SAE countdown clock, WHODrug ASU herb-drug interaction flags, and WHO-UMC causality scoring.',
      accent: '#dc2626',
      accentBg: '#fef2f2',
      accentBorder: '#fecaca'
    },
    {
      id: '04',
      icon: <Lock size={22} style={{ color: '#0284c7' }} />,
      title: 'DPDP Vault & ALCOA+',
      subtitle: 'Immutable Cryptographic Log',
      desc: 'Attributable & contemporaneous audit logs sealed with SHA-256 hashes, with consent withdrawal handling.',
      accent: '#0284c7',
      accentBg: '#f0f9ff',
      accentBorder: '#bae6fd'
    },
    {
      id: '05',
      icon: <Globe2 size={22} style={{ color: '#047857' }} />,
      title: 'CDISC SDTM & ABDM FHIR',
      subtitle: 'Global Regulatory Ready',
      desc: 'Automated transformation to SDTM (DM, AE, VS) and HL7 FHIR R4 ResearchStudy resource for national health exchange.',
      accent: '#047857',
      accentBg: '#ecfdf5',
      accentBorder: '#a7f3d0'
    }
  ];

  return (
    <section id="interop" style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '60px 24px 80px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <div className="badge-cyan" style={{ marginBottom: '14px' }}>
          <span>END-TO-END CLINICAL DATA LIFECYCLE</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
          fontWeight: 800,
          color: '#0f172a',
          marginBottom: '16px'
        }}>
          Interoperable Pipeline from <span style={{ color: '#047857' }}>Bedside to Global Regulatory Submission</span>
        </h2>
        <p style={{
          color: '#64748b',
          fontSize: '1rem',
          maxWidth: '740px',
          margin: '0 auto'
        }}>
          Designed to ensure complete scientific transparency and rapid global submission (CDSCO, US FDA, EMA, WHO).
        </p>
      </div>

      {/* Steps Flow Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '16px',
        position: 'relative'
      }}>
        {steps.map((step, idx) => (
          <div 
            key={step.id}
            className="glass-panel"
            style={{
              padding: '24px 20px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: step.accentBg,
                  border: `1px solid ${step.accentBorder}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {step.icon}
                </div>
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  color: step.accent,
                  opacity: 0.5
                }}>
                  {step.id}
                </span>
              </div>

              <h4 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '4px' }}>
                {step.title}
              </h4>
              <div style={{ fontSize: '0.78rem', color: step.accent, fontWeight: 600, marginBottom: '12px' }}>
                {step.subtitle}
              </div>
              <p style={{ fontSize: '0.82rem', color: '#64748b', lineHeight: 1.5 }}>
                {step.desc}
              </p>
            </div>

            <div style={{
              marginTop: '20px',
              paddingTop: '12px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.72rem',
              color: '#047857'
            }}>
              <CheckCircle2 size={13} /> ALCOA+ Audited Step
            </div>

            {/* Arrow between cards (only if not last) */}
            {idx < steps.length - 1 && (
              <div style={{
                position: 'absolute',
                right: '-13px',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                color: '#cbd5e1'
              }}>
                <ArrowRight size={16} />
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
