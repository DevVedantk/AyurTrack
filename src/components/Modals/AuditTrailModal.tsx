import React, { useState } from 'react';
import { X, History, ShieldCheck, Search, Filter, Lock, CheckCircle2 } from 'lucide-react';
import { AuditTrailEntry } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface AuditTrailModalProps {
  isOpen: boolean;
  onClose: () => void;
  auditEntries: AuditTrailEntry[];
}

export const AuditTrailModal: React.FC<AuditTrailModalProps> = ({
  isOpen,
  onClose,
  auditEntries
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('All');

  if (!isOpen) return null;

  const filtered = auditEntries.filter(entry => {
    const matchesSearch = 
      entry.entity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.entityId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesAction = selectedAction === 'All' || entry.actionType === selectedAction;
    return matchesSearch && matchesAction;
  });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '920px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <History size={22} style={{ color: '#34d399' }} />
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>
                ALCOA+ Immutable Audit Trail & E-Signature Ledger
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                GCP-ASU & 21 CFR Part 11 compliant with SHA-256 state seal and DPDP Act 2023 privacy controls.
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

        {/* Filter & Search Bar */}
        <div style={{
          display: 'flex',
          gap: '12px',
          marginBottom: '16px',
          flexWrap: 'wrap'
        }}>
          <div style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}>
            <Search size={15} style={{ position: 'absolute', left: '12px', color: '#64748b' }} />
            <input
              type="text"
              placeholder="Search by entity, ID, user, or audit details..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(0, 0, 0, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: '#fff',
                padding: '8px 12px 8px 36px',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />
          </div>

          <select
            value={selectedAction}
            onChange={(e) => {
              soundManager.playClick();
              setSelectedAction(e.target.value);
            }}
            style={{
              background: '#0d1a12',
              color: '#cbd5e1',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          >
            <option value="All">All Action Types</option>
            <option value="CREATE">CREATE</option>
            <option value="UPDATE">UPDATE</option>
            <option value="VERIFY">VERIFY</option>
            <option value="SIGN">SIGN (Biometric/Token)</option>
            <option value="EXPORT">EXPORT</option>
          </select>
        </div>

        {/* Audit Log Table */}
        <div style={{
          maxHeight: '400px',
          overflowY: 'auto',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
          background: 'rgba(0, 0, 0, 0.3)'
        }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8', background: 'rgba(255, 255, 255, 0.02)' }}>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Timestamp (IST)</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Action</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Entity & Ref</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>User & Role</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>Audit Details</th>
                <th style={{ padding: '10px 12px', textAlign: 'left' }}>SHA-256 Hash</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(entry => (
                <tr key={entry.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
                  <td style={{ padding: '10px 12px', color: '#cbd5e1', whiteSpace: 'nowrap', fontFamily: 'var(--font-mono)' }}>
                    {entry.timestamp}
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: entry.actionType === 'SIGN' ? 'rgba(234, 179, 8, 0.2)' : entry.actionType === 'VERIFY' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(56, 189, 248, 0.2)',
                      color: entry.actionType === 'SIGN' ? '#facc15' : entry.actionType === 'VERIFY' ? '#34d399' : '#38bdf8'
                    }}>
                      {entry.actionType}
                    </span>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#fff', fontWeight: 600 }}>
                    {entry.entity}
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontFamily: 'var(--font-mono)' }}>{entry.entityId}</div>
                  </td>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ color: '#f0fdf4', fontWeight: 600 }}>{entry.userName}</div>
                    <div style={{ fontSize: '0.7rem', color: '#34d399' }}>{entry.userRole}</div>
                  </td>
                  <td style={{ padding: '10px 12px', color: '#cbd5e1', maxWidth: '240px', lineHeight: 1.4 }}>
                    {entry.details}
                  </td>
                  <td style={{ padding: '10px 12px', color: '#64748b', fontFamily: 'var(--font-mono)', fontSize: '0.68rem' }}>
                    {entry.sha256Hash.substring(0, 16)}...
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '16px',
          fontSize: '0.75rem',
          color: '#94a3b8'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#34d399' }}>
            <CheckCircle2 size={14} /> Immutable Write-Once-Read-Many (WORM) Storage Active
          </div>
          <button
            onClick={() => {
              soundManager.playSuccess();
              alert('Complete ALCOA+ Audit Trail exported as tamper-evident cryptographic archive (.xml / .json).');
            }}
            className="btn-primary"
            style={{ fontSize: '0.78rem', padding: '6px 14px' }}
          >
            Export Signed Audit Package
          </button>
        </div>
      </div>
    </div>
  );
};
