import React from 'react';
import { 
  Building2, 
  UserCheck, 
  Bell, 
  ShieldCheck, 
  FilePlus, 
  AlertTriangle, 
  FileCode, 
  History, 
  Home,
  CheckCircle2,
  Clock,
  HeartPulse,
  Crown,
  Activity,
  LogOut
} from 'lucide-react';
import { ClinicalStudy, UserRole, SystemAlert, UserAccount } from '../../types/clinical';

interface DashboardHeaderProps {
  studies: ClinicalStudy[];
  currentStudy: ClinicalStudy;
  onSelectStudy: (studyId: string) => void;
  currentUser: UserAccount;
  activeDashboard: 'investigator' | 'ethics' | 'pv' | 'leadership';
  onSwitchDashboard: (dashboard: 'investigator' | 'ethics' | 'pv' | 'leadership') => void;
  onOpenAuth: () => void;
  alerts: SystemAlert[];
  onOpenAlerts: () => void;
  onOpenLogDeviation: () => void;
  onOpenLogAeSae: () => void;
  onOpenCdiscModal: () => void;
  onOpenAuditModal: () => void;
  onBackToLanding: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  studies,
  currentStudy,
  onSelectStudy,
  currentUser,
  activeDashboard,
  onSwitchDashboard,
  onOpenAuth,
  alerts,
  onOpenAlerts,
  onOpenLogDeviation,
  onOpenLogAeSae,
  onOpenCdiscModal,
  onOpenAuditModal,
  onBackToLanding
}) => {
  const unreadAlertsCount = alerts.filter(a => !a.isRead).length;
  const hasCriticalAlert = alerts.some(a => a.severity === 'critical' && !a.isRead);

  const dashboards = [
    { id: 'investigator' as const, label: 'Investigator CTMS', icon: <Activity size={14} />, roleMatch: 'Principal Investigator' },
    { id: 'ethics' as const, label: 'Ethics Committee (IEC)', icon: <ShieldCheck size={14} />, roleMatch: 'Institutional Ethics Committee' },
    { id: 'pv' as const, label: 'Pharmacovigilance (NPvCC)', icon: <HeartPulse size={14} />, roleMatch: 'Pharmacovigilance (NPvCC / DSMB)' },
    { id: 'leadership' as const, label: 'Leadership Portfolio', icon: <Crown size={14} />, roleMatch: 'Institutional Leadership (Director / Dean)' }
  ];

  return (
    <div style={{
      background: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      position: 'sticky',
      top: 0,
      zIndex: 90,
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)'
    }}>
      {/* Top Protocol Identifier Strip */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{
              background: '#047857',
              color: '#ffffff',
              padding: '2px 8px',
              borderRadius: '4px',
              fontWeight: 700,
              fontSize: '0.7rem'
            }}>
              AIIA APEX CTMS
            </span>
            <span style={{ fontWeight: 600, color: '#ecfdf5' }}>
              Protocol ID: {currentStudy.protocolNumber}
            </span>
          </div>

          <span style={{ color: '#a7f3d0', opacity: 0.4 }}>|</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle2 size={13} style={{ color: '#6ee7b7' }} />
            <span>CTRI: <strong>{currentStudy.ctriNumber}</strong> ({currentStudy.ctriRegistrationType})</span>
          </div>

          <span style={{ color: '#a7f3d0', opacity: 0.4 }}>|</span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <ShieldCheck size={13} style={{ color: '#fde68a' }} />
            <span>IEC Clearance: <strong>{currentStudy.iecRegistrationNumber.split(' ')[0]}</strong></span>
          </div>
        </div>

        {/* Dashboard Role Switcher Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {dashboards.map(d => {
            const isActive = activeDashboard === d.id;
            return (
              <button
                key={d.id}
                onClick={() => onSwitchDashboard(d.id)}
                style={{
                  background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.06)',
                  border: isActive ? '1px solid rgba(255, 255, 255, 0.35)' : '1px solid rgba(255, 255, 255, 0.12)',
                  color: isActive ? '#ffffff' : '#d1fae5',
                  borderRadius: '6px',
                  padding: '3px 10px',
                  fontSize: '0.72rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                {d.icon}
                <span>{d.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Action Header */}
      <div style={{
        maxWidth: '1600px',
        margin: '0 auto',
        padding: '12px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Left: Study Selector & Identity */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={onBackToLanding}
            title="Return to Public Overview"
            className="btn-secondary"
            style={{
              padding: '8px 12px',
              fontSize: '0.8rem'
            }}
          >
            <Home size={15} />
            <span>Portal</span>
          </button>

          <div>
            <div style={{ fontSize: '0.7rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Clinical Trial
            </div>
            <select
              value={currentStudy.id}
              onChange={(e) => onSelectStudy(e.target.value)}
              style={{
                background: '#ffffff',
                color: '#0f172a',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                outline: 'none',
                minWidth: '320px'
              }}
            >
              {studies.map(study => (
                <option key={study.id} value={study.id}>
                  {study.id} - {study.shortTitle}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Center: Current User Profile Card */}
        <div style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: '10px',
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#ecfdf5',
            border: '1px solid #a7f3d0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 800,
            color: '#047857'
          }}>
            {currentUser.avatarInitials}
          </div>

          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>
              {currentUser.name}
            </div>
            <div style={{ fontSize: '0.68rem', color: '#047857', fontWeight: 600 }}>
              {currentUser.role}
            </div>
          </div>

          <button
            onClick={onOpenAuth}
            title="Switch User Role or Sign In"
            style={{
              background: '#f1f5f9',
              border: '1px solid #e2e8f0',
              borderRadius: '6px',
              padding: '4px 8px',
              color: '#64748b',
              fontSize: '0.7rem',
              fontWeight: 600,
              cursor: 'pointer',
              marginLeft: '4px'
            }}
          >
            Switch
          </button>
        </div>

        {/* Right: Quick Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Urgent SAE Button */}
          <button
            onClick={onOpenLogAeSae}
            className="badge-crimson"
            style={{
              padding: '7px 13px',
              fontSize: '0.8rem',
              cursor: 'pointer',
              border: '1px solid #fecaca',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span className="pulse-dot-red"></span>
            <span>Report AE / SAE</span>
          </button>

          {/* Log Deviation */}
          <button
            onClick={onOpenLogDeviation}
            className="btn-secondary"
            style={{
              padding: '7px 13px',
              fontSize: '0.8rem',
              borderRadius: '8px'
            }}
          >
            <FilePlus size={14} style={{ color: '#b45309' }} />
            <span>Log Deviation</span>
          </button>

          {/* CDISC / FHIR Export */}
          <button
            onClick={onOpenCdiscModal}
            className="btn-secondary"
            style={{
              padding: '7px 13px',
              fontSize: '0.8rem',
              borderRadius: '8px'
            }}
          >
            <FileCode size={14} style={{ color: '#0284c7' }} />
            <span>CDISC / FHIR</span>
          </button>

          {/* ALCOA+ Audit Trail */}
          <button
            onClick={onOpenAuditModal}
            className="btn-secondary"
            style={{
              padding: '7px 13px',
              fontSize: '0.8rem',
              borderRadius: '8px'
            }}
          >
            <History size={14} style={{ color: '#047857' }} />
            <span>Audit Trail</span>
          </button>

          {/* Alert Notification Bell */}
          <button
            onClick={onOpenAlerts}
            style={{
              position: 'relative',
              background: hasCriticalAlert ? '#fef2f2' : '#f8fafc',
              border: hasCriticalAlert ? '1px solid #fecaca' : '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '8px 12px',
              color: hasCriticalAlert ? '#dc2626' : '#334155',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.82rem',
              fontWeight: 600
            }}
          >
            <Bell size={16} />
            <span>Alerts</span>
            {unreadAlertsCount > 0 && (
              <span style={{
                background: hasCriticalAlert ? '#ef4444' : '#f59e0b',
                color: '#fff',
                borderRadius: '10px',
                padding: '1px 6px',
                fontSize: '0.7rem',
                fontWeight: 800
              }}>
                {unreadAlertsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
