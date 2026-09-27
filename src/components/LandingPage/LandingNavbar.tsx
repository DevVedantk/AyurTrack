import React from 'react';
import { ShieldCheck, Activity, ArrowRight, UserCheck } from 'lucide-react';

interface LandingNavbarProps {
  onLaunchDashboard: () => void;
  onOpenAuth: () => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onLaunchDashboard,
  onOpenAuth
}) => {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
    }}>
      {/* Top Ministerial Notification Banner */}
      <div style={{
        background: '#064e3b',
        borderBottom: '1px solid #047857',
        padding: '6px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.75rem',
        color: '#d1fae5'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            background: '#047857',
            color: '#ffffff',
            padding: '1px 6px',
            borderRadius: '3px',
            fontWeight: 700,
            fontSize: '0.66rem'
          }}>
            GOVT OF INDIA
          </span>
          <span style={{ fontWeight: 600 }}>
            Ministry of Ayush • All India Institute of Ayurveda (AIIA)
          </span>
          <span style={{ opacity: 0.4 }}>|</span>
          <span style={{ color: '#a7f3d0' }}>
            National Pharmacovigilance Coordination Centre (NPvCC) for ASU&H Drugs
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#6ee7b7', fontWeight: 600 }}>
            <span className="pulse-dot" style={{ background: '#34d399' }}></span> CTRI Prospective Sync Active
          </span>
          <span style={{ color: '#d1fae5' }}>GCP-ASU & DPDP 2023 Compliant</span>
        </div>
      </div>

      {/* Main Navbar */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        padding: '14px 28px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '8px',
            background: '#047857',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: 800
          }}>
            <ShieldCheck size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 800,
                color: '#0f172a',
                letterSpacing: '-0.02em'
              }}>
                Ayur<span style={{ color: '#047857' }}>Track</span>
              </span>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '4px',
                background: '#ecfdf5',
                color: '#047857',
                border: '1px solid #a7f3d0'
              }}>
                CTMS & NPvCC
              </span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
              AIIA Clinical Trial Management & Safety Surveillance
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          <a href="#overview" style={{ color: '#334155', textDecoration: 'none', fontSize: '0.86rem', fontWeight: 600 }}>
            Portfolio Overview
          </a>
          <a href="#features" style={{ color: '#334155', textDecoration: 'none', fontSize: '0.86rem', fontWeight: 600 }}>
            CTMS Modules
          </a>
          <a href="#npvcc-safety" style={{ color: '#334155', textDecoration: 'none', fontSize: '0.86rem', fontWeight: 600 }}>
            NPvCC Safety
          </a>
          <a href="#interop" style={{ color: '#334155', textDecoration: 'none', fontSize: '0.86rem', fontWeight: 600 }}>
            CDISC & FHIR R4
          </a>
          <a href="#compliance" style={{ color: '#334155', textDecoration: 'none', fontSize: '0.86rem', fontWeight: 600 }}>
            GCP-ASU / DPDP
          </a>
        </nav>

        {/* Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={onOpenAuth}
            className="btn-secondary"
            style={{
              padding: '8px 14px',
              fontSize: '0.82rem'
            }}
          >
            <UserCheck size={14} style={{ color: '#047857' }} />
            <span>Sign In / Roles</span>
          </button>

          <button
            onClick={onLaunchDashboard}
            className="btn-primary"
            style={{
              padding: '8px 16px',
              fontSize: '0.84rem'
            }}
          >
            <Activity size={15} />
            <span>Launch CTMS Portal</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};
