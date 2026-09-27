import React from 'react';
import { 
  FileCheck2, 
  Activity, 
  ShieldAlert, 
  Database, 
  Lock, 
  CheckCircle, 
  Clock, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FeaturesBentoProps {
  onLaunchDashboard: () => void;
  onOpenAuditModal: () => void;
  onOpenCdiscModal: () => void;
}

export const FeaturesBento: React.FC<FeaturesBentoProps> = ({
  onLaunchDashboard,
  onOpenAuditModal,
  onOpenCdiscModal
}) => {
  return (
    <section id="features" style={{
      maxWidth: '1440px',
      margin: '0 auto',
      padding: '40px 24px 60px'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="glass-pill" style={{ marginBottom: '12px' }}>
          <span>ARCHITECTED FOR REGULATORY EXCELLENCE</span>
        </div>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
          fontWeight: 800,
          color: '#0f172a',
          marginBottom: '12px'
        }}>
          Comprehensive Architecture for <span style={{ color: '#047857' }}>Ayurvedic Clinical Science</span>
        </h2>
        <p style={{
          color: '#64748b',
          fontSize: '1rem',
          maxWidth: '720px',
          margin: '0 auto'
        }}>
          Every module is built from the ground up to satisfy <strong>GCP-ASU</strong>, <strong>ICMR Ethical Guidelines</strong>, 
          <strong>NDCT Rules 2019</strong>, and the <strong>DPDP Act 2023</strong>.
        </p>
      </div>

      {/* Bento Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gap: '20px'
      }}>
        {/* Bento Item 1: CTMS Investigator Dashboard (Col 8) */}
        <div 
          className="glass-panel" 
          style={{
            gridColumn: 'span 8',
            padding: '30px',
            position: 'relative',
            cursor: 'pointer'
          }}
          onClick={onLaunchDashboard}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div className="glass-pill">
              <Activity size={13} />
              <span>INVESTIGATOR & COORDINATOR PORTAL</span>
            </div>
            <span style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              Launch Portal <ArrowRight size={13} />
            </span>
          </div>

          <h3 style={{ fontSize: '1.45rem', marginBottom: '8px', color: '#0f172a' }}>
            Real-Time Trial Monitoring & KPI Engine
          </h3>
          <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '20px', maxWidth: '640px' }}>
            Multi-study drilldown tracking screening funnels, randomized 1:1 arm balance, visit window adherence (±2 days), 
            protocol deviations with root cause analysis (CAPA), and EDC data queries with aging alerts.
          </p>

          {/* Mini Preview Graphic */}
          <div style={{
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '8px',
            padding: '14px 18px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '14px'
          }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>PROTOCOL STATUS</div>
              <div style={{ color: '#047857', fontWeight: 700, fontSize: '0.9rem' }}>v2.3 Approved</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>IEC-AIIA Clearance Active</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>RECRUITMENT VELOCITY</div>
              <div style={{ color: '#b45309', fontWeight: 700, fontSize: '0.9rem' }}>108 / 120 Enrolled</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>89.3% Milestone Met</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>VISIT COMPLIANCE</div>
              <div style={{ color: '#047857', fontWeight: 700, fontSize: '0.9rem' }}>96.4% On-Time</div>
              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Window Violations: 2.1%</div>
            </div>
          </div>
        </div>

        {/* Bento Item 2: NPvCC Pharmacovigilance Module (Col 4) */}
        <div 
          className="glass-panel" 
          style={{
            gridColumn: 'span 4',
            padding: '30px',
            border: '1px solid #fecaca',
            background: '#ffffff'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '14px' }}>
            <span className="badge-crimson">NPvCC ASU SAFETY SENTINEL</span>
          </div>

          <h3 style={{ fontSize: '1.25rem', marginBottom: '8px', color: '#0f172a' }}>
            24h SAE Regulatory Clock
          </h3>
          <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '18px' }}>
            Automated compliance with NDCT Rules 2019 Rule 42. Countdown for 24-hr CDSCO & IEC notification, 
            MedDRA & WHODrug auto-coding, and WHO-UMC causality algorithms.
          </p>

          <div style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            padding: '12px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: '#991b1b', fontWeight: 600 }}>URGENT SAE REPORT CLOCK</div>
              <div style={{ fontSize: '1.15rem', fontWeight: 800, color: '#dc2626', fontFamily: 'var(--font-mono)' }}>
                01h : 58m : 42s
              </div>
            </div>
            <Clock size={22} style={{ color: '#dc2626' }} />
          </div>
        </div>

        {/* Bento Item 3: Prospective CTRI Registration (Col 4) */}
        <div className="glass-panel" style={{ gridColumn: 'span 4', padding: '26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <span className="badge-gold">CTRI.NIC.IN AUTOMATION</span>
          </div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', color: '#0f172a' }}>
            Mandatory Prospective Registration
          </h3>
          <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '14px' }}>
            Full alignment with mandatory prospective registration rules before the first patient is screened. 
            Automated alerts for statutory 6-month status updates and recruitment snapshots.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#047857', fontSize: '0.8rem', fontWeight: 600 }}>
            <CheckCircle size={14} /> Prospective Lock Enforced
          </div>
        </div>

        {/* Bento Item 4: CDISC & HL7 FHIR Interoperability (Col 4) */}
        <div 
          className="glass-panel" 
          style={{ gridColumn: 'span 4', padding: '26px', cursor: 'pointer' }}
          onClick={onOpenCdiscModal}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <span className="badge-cyan">CDISC & HL7 FHIR R4</span>
          </div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', color: '#0f172a' }}>
            Submission-Ready Clinical Data
          </h3>
          <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '14px' }}>
            Instant transformation from CDASH eCRFs to SDTM domains (DM, AE, VS, EX) and ADaM datasets. 
            Native HL7 FHIR R4 ResearchStudy export linked to Ayushman Bharat Digital Mission (ABDM).
          </p>
          <div style={{ color: '#0284c7', fontSize: '0.8rem', fontWeight: 600 }}>
            View SDTM 3.3 & FHIR JSON →
          </div>
        </div>

        {/* Bento Item 5: ALCOA+ Immutable Audit Trail & DPDP (Col 4) */}
        <div 
          className="glass-panel" 
          style={{ gridColumn: 'span 4', padding: '26px', cursor: 'pointer' }}
          onClick={onOpenAuditModal}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            <span className="glass-pill">ALCOA+ & DPDP ACT 2023</span>
          </div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '8px', color: '#0f172a' }}>
            Immutable Cryptographic Ledger
          </h3>
          <p style={{ color: '#475569', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '14px' }}>
            Attributable, Legible, Contemporaneous, Original, and Accurate with SHA-256 digital seals. 
            DPDP-compliant informed consent withdrawal, data minimization, and role-based access.
          </p>
          <div style={{ color: '#047857', fontSize: '0.8rem', fontWeight: 600 }}>
            Inspect Real-Time Audit Trail →
          </div>
        </div>
      </div>
    </section>
  );
};
