import React, { useState } from 'react';
import { 
  X, 
  Bell, 
  Sliders, 
  AlertTriangle, 
  Clock, 
  Users, 
  Globe2, 
  ShieldCheck, 
  CheckCircle2,
  Volume2
} from 'lucide-react';
import { SystemAlert } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface AlertConfigDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  alerts: SystemAlert[];
  onDismissAlert: (alertId: string) => void;
  onTriggerTestAlert: () => void;
}

export const AlertConfigDrawer: React.FC<AlertConfigDrawerProps> = ({
  isOpen,
  onClose,
  alerts,
  onDismissAlert,
  onTriggerTestAlert
}) => {
  // Thresholds state
  const [enrolmentLagThreshold, setEnrolmentLagThreshold] = useState<number>(15);
  const [iecRenewalReminderDays, setIecRenewalReminderDays] = useState<number>(30);
  const [ctriUpdateReminderDays, setCtriUpdateReminderDays] = useState<number>(20);
  const [saeClockWarningHours, setSaeClockWarningHours] = useState<number>(4);
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSaveThresholds = () => {
    soundManager.playSuccess();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '680px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sliders size={20} style={{ color: '#34d399' }} />
            <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>
              Configurable Alerts & Regulatory Thresholds
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

        {/* Section 1: Active System Alerts */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 700, textTransform: 'uppercase' }}>
              Active Clinical Alerts ({alerts.filter(a => !a.isRead).length} Unread)
            </span>
            <button
              onClick={() => {
                soundManager.playAlert();
                onTriggerTestAlert();
              }}
              style={{
                background: 'rgba(234, 179, 8, 0.15)',
                border: '1px solid rgba(234, 179, 8, 0.3)',
                color: '#facc15',
                padding: '4px 10px',
                borderRadius: '6px',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              + Trigger Test Alert
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto' }}>
            {alerts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '16px', color: '#64748b', fontSize: '0.82rem' }}>
                All clear. No active alerts.
              </div>
            ) : (
              alerts.map(a => (
                <div 
                  key={a.id}
                  style={{
                    background: a.severity === 'critical' ? 'rgba(239, 68, 68, 0.12)' : 'rgba(234, 179, 8, 0.08)',
                    border: a.severity === 'critical' ? '1px solid rgba(239, 68, 68, 0.35)' : '1px solid rgba(250, 204, 21, 0.3)',
                    borderRadius: '8px',
                    padding: '12px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '12px'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                      <span className={a.severity === 'critical' ? 'badge-crimson' : 'badge-gold'} style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                        {a.category}
                      </span>
                      <strong style={{ fontSize: '0.85rem', color: '#fff' }}>{a.title}</strong>
                    </div>
                    <p style={{ fontSize: '0.76rem', color: '#cbd5e1', lineHeight: 1.4 }}>
                      {a.message}
                    </p>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', marginTop: '4px' }}>
                      Action: <strong style={{ color: '#34d399' }}>{a.actionRequired}</strong> • {a.timestamp}
                    </div>
                  </div>

                  {!a.isRead && (
                    <button
                      onClick={() => onDismissAlert(a.id)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: '#94a3b8',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '0.7rem',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Section 2: Configurable Thresholds */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.35)',
          border: '1px solid rgba(52, 211, 153, 0.2)',
          borderRadius: '12px',
          padding: '18px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#34d399', fontWeight: 700, marginBottom: '16px', textTransform: 'uppercase' }}>
            Alert Trigger Parameters
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {/* Slider 1: Enrolment Lag */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>
                <span>Site Enrolment Lag Alert Threshold</span>
                <strong style={{ color: '#facc15' }}>&gt; {enrolmentLagThreshold}% behind target</strong>
              </div>
              <input 
                type="range" 
                min="5" 
                max="35" 
                value={enrolmentLagThreshold} 
                onChange={(e) => setEnrolmentLagThreshold(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
              />
            </div>

            {/* Slider 2: IEC Annual Renewal */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>
                <span>IEC Annual Ethics Renewal Advance Notice</span>
                <strong style={{ color: '#38bdf8' }}>{iecRenewalReminderDays} Days prior</strong>
              </div>
              <input 
                type="range" 
                min="10" 
                max="60" 
                value={iecRenewalReminderDays} 
                onChange={(e) => setIecRenewalReminderDays(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#38bdf8', cursor: 'pointer' }}
              />
            </div>

            {/* Slider 3: CTRI Statutory Update */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>
                <span>CTRI Semi-Annual Mandatory Update Advance Warning</span>
                <strong style={{ color: '#facc15' }}>{ctriUpdateReminderDays} Days prior</strong>
              </div>
              <input 
                type="range" 
                min="7" 
                max="30" 
                value={ctriUpdateReminderDays} 
                onChange={(e) => setCtriUpdateReminderDays(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#facc15', cursor: 'pointer' }}
              />
            </div>

            {/* Slider 4: SAE Clock Warning */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#cbd5e1', marginBottom: '6px' }}>
                <span>Urgent 24-hr SAE Regulatory Clock Warning</span>
                <strong style={{ color: '#f87171' }}>When &lt; {saeClockWarningHours} Hours remain</strong>
              </div>
              <input 
                type="range" 
                min="1" 
                max="8" 
                value={saeClockWarningHours} 
                onChange={(e) => setSaeClockWarningHours(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#ef4444', cursor: 'pointer' }}
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            {savedSuccess && (
              <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} /> Threshold parameters updated successfully!
              </span>
            )}
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={onClose} 
              className="btn-secondary" 
              style={{ fontSize: '0.82rem', padding: '8px 16px' }}
            >
              Close
            </button>
            <button 
              onClick={handleSaveThresholds} 
              className="btn-primary" 
              style={{ fontSize: '0.82rem', padding: '8px 18px' }}
            >
              Save Configuration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
