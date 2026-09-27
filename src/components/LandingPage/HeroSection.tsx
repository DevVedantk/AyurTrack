import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  ArrowRight, 
  Clock, 
  FileCode,
  TrendingUp,
  Building2,
  CheckCircle2
} from 'lucide-react';

interface HeroSectionProps {
  onLaunchDashboard: () => void;
  onOpenCdiscModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onLaunchDashboard,
  onOpenCdiscModal
}) => {
  return (
    <section style={{
      position: 'relative',
      padding: '60px 24px 70px',
      maxWidth: '1440px',
      margin: '0 auto'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '980px', margin: '0 auto' }}>
        {/* Institutional Pill */}
        <div style={{ display: 'inline-flex', marginBottom: '20px' }}>
          <div className="glass-pill" style={{ padding: '6px 14px', fontSize: '0.78rem', gap: '8px' }}>
            <span className="pulse-dot"></span>
            <span style={{ fontWeight: 700 }}>AIIA • NPvCC • MINISTRY OF AYUSH</span>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <span style={{ color: '#0f172a' }}>CLINICAL RESEARCH OPERATING SYSTEM</span>
          </div>
        </div>

        {/* Main Hero Headline */}
        <h1 style={{
          fontSize: 'clamp(2.3rem, 4.8vw, 3.8rem)',
          fontWeight: 800,
          letterSpacing: '-0.025em',
          lineHeight: 1.15,
          marginBottom: '20px',
          color: '#0f172a'
        }}>
          Clinical Trial Management & Safety Surveillance for{' '}
          <span style={{ color: '#047857' }}>Ayurvedic Medicine</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: 'clamp(1rem, 1.6vw, 1.15rem)',
          color: '#475569',
          lineHeight: 1.6,
          maxWidth: '820px',
          margin: '0 auto 32px',
          fontWeight: 400
        }}>
          The centralized, role-based CTMS for the <strong>All India Institute of Ayurveda</strong>. 
          Harmonizing <strong>GCP-ASU</strong> guidelines, mandatory prospective <strong>CTRI registration</strong>, 
          <strong>ICMR Ethical Oversight</strong>, <strong>CDISC/FHIR R4</strong> interoperability, and 
          <strong>NPvCC Pharmacovigilance</strong> with an immutable <strong>ALCOA+ audit trail</strong>.
        </p>

        {/* CTAs */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          marginBottom: '48px'
        }}>
          <button
            onClick={onLaunchDashboard}
            className="btn-primary"
            style={{
              padding: '12px 28px',
              fontSize: '0.95rem'
            }}
          >
            <Activity size={18} />
            <span>Launch Investigator Dashboard</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={onOpenCdiscModal}
            className="btn-secondary"
            style={{
              padding: '12px 22px',
              fontSize: '0.95rem'
            }}
          >
            <FileCode size={17} style={{ color: '#047857' }} />
            <span>CDISC SDTM & FHIR R4 Specs</span>
          </button>
        </div>

        {/* Live Clinical Portfolio Telemetry HUD */}
        <div className="glass-panel" style={{
          padding: '24px 28px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          textAlign: 'left'
        }}>
          {/* Stat 1 */}
          <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <span className="pulse-dot"></span>
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '0.04em' }}>
                Active Portfolio
              </span>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
              3 <span style={{ fontSize: '0.9rem', color: '#047857', fontWeight: 600 }}>Multi-Centre RCTs</span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
              Oncology, Diabetes & Neurology
            </div>
          </div>

          {/* Stat 2 */}
          <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <TrendingUp size={14} style={{ color: '#047857' }} />
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '0.04em' }}>
                Recruitment Target
              </span>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
              348 / 380 <span style={{ fontSize: '0.85rem', color: '#b45309', fontWeight: 700 }}>[91.5%]</span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
              Screening Funnel: 590 Screened
            </div>
          </div>

          {/* Stat 3 */}
          <div style={{ borderRight: '1px solid #e2e8f0', paddingRight: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <ShieldCheck size={14} style={{ color: '#047857' }} />
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '0.04em' }}>
                ALCOA+ Data Integrity
              </span>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#047857' }}>
              99.2% <span style={{ fontSize: '0.85rem', color: '#334155' }}>Audit Pass</span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
              SHA-256 Cryptographic Hash Logs
            </div>
          </div>

          {/* Stat 4 */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
              <Clock size={14} style={{ color: '#dc2626' }} />
              <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: '#dc2626', fontWeight: 700, letterSpacing: '0.04em' }}>
                NPvCC 24h SAE Sentinel
              </span>
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--font-mono)' }}>
              01h 58m <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: 500 }}>Remaining</span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
              SAE-2026-004 Form 11 Clock
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
