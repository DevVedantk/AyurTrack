import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Lock, 
  Mail, 
  Building2, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  UserPlus, 
  LogIn,
  Sparkles,
  Stethoscope,
  Activity,
  HeartPulse,
  Crown
} from 'lucide-react';
import { UserAccount, UserRole } from '../../types/clinical';
import { DEFAULT_USERS } from '../../data/mockStudies';
import { soundManager } from '../../utils/audioFeedback';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticate: (user: UserAccount, targetDashboard: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthenticate
}) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  
  // Sign In State
  const [email, setEmail] = useState('rajesh.sharma@aiia.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  
  // Sign Up State
  const [name, setName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState<UserRole>('Principal Investigator');
  const [department, setDepartment] = useState('Kayachikitsa');
  const [institution, setInstitution] = useState('All India Institute of Ayurveda, New Delhi');

  if (!isOpen) return null;

  const handleRoleQuickLogin = (user: UserAccount) => {
    soundManager.playSuccess();
    let target = 'investigator';
    if (user.role === 'Institutional Ethics Committee') {
      target = 'ethics';
    } else if (user.role === 'Pharmacovigilance (NPvCC / DSMB)') {
      target = 'pv';
    } else if (user.role === 'Institutional Leadership (Director / Dean)') {
      target = 'leadership';
    } else {
      target = 'investigator';
    }

    onAuthenticate(user, target);
    onClose();
  };

  const handleSignInSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playSuccess();
    // Match with demo user or fallback
    const matchedUser = DEFAULT_USERS.find(u => u.email.toLowerCase() === email.toLowerCase()) || DEFAULT_USERS[0];
    let target = 'investigator';
    if (matchedUser.role === 'Institutional Ethics Committee') {
      target = 'ethics';
    } else if (matchedUser.role === 'Pharmacovigilance (NPvCC / DSMB)') {
      target = 'pv';
    } else if (matchedUser.role === 'Institutional Leadership (Director / Dean)') {
      target = 'leadership';
    }
    onAuthenticate(matchedUser, target);
    onClose();
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !signupEmail.trim()) {
      alert('Please fill in your name and email address.');
      return;
    }
    soundManager.playSuccess();
    const newUser: UserAccount = {
      id: `USR-${Date.now().toString().slice(-4)}`,
      name: name.trim(),
      title: `${signupRole} • ${department}`,
      email: signupEmail.trim(),
      role: signupRole,
      department: department.trim() || 'Ayurveda Research Faculty',
      institution: institution.trim() || 'All India Institute of Ayurveda',
      avatarInitials: name.trim().split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    };

    let target = 'investigator';
    if (signupRole === 'Institutional Ethics Committee') {
      target = 'ethics';
    } else if (signupRole === 'Pharmacovigilance (NPvCC / DSMB)') {
      target = 'pv';
    } else if (signupRole === 'Institutional Leadership (Director / Dean)') {
      target = 'leadership';
    }

    onAuthenticate(newUser, target);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '780px',
          background: 'linear-gradient(135deg, #0a1610 0%, #060e0a 100%)',
          border: '1px solid rgba(52, 211, 153, 0.35)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.9), 0 0 50px rgba(16, 185, 129, 0.15)'
        }}
      >
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(234, 179, 8, 0.15))',
              border: '1px solid rgba(52, 211, 153, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px'
            }}>
              🌿
            </div>
            <div>
              <h3 style={{ fontSize: '1.3rem', color: '#fff' }}>
                AyurTrack CTMS Access Portal
              </h3>
              <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                All India Institute of Ayurveda • Role-Based Authentication & Gateway
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

        {/* Quick Role-Login Selector */}
        <div style={{
          background: 'rgba(0, 0, 0, 0.45)',
          border: '1px solid rgba(52, 211, 153, 0.25)',
          borderRadius: '14px',
          padding: '16px',
          marginBottom: '24px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '12px',
            fontSize: '0.75rem',
            color: '#a7f3d0',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={14} style={{ color: '#facc15' }} />
              Quick One-Click Demo Role Login (Instant Dashboard Routing)
            </span>
            <span style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Select Role:</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '10px'
          }}>
            {DEFAULT_USERS.map(user => {
              let badgeColor = '#34d399';
              let roleIcon = <Activity size={15} />;
              let destLabel = 'Investigator Dashboard';
              
              if (user.role === 'Institutional Ethics Committee') {
                badgeColor = '#38bdf8';
                roleIcon = <ShieldCheck size={15} />;
                destLabel = 'Ethics Committee Dashboard';
              } else if (user.role === 'Pharmacovigilance (NPvCC / DSMB)') {
                badgeColor = '#f87171';
                roleIcon = <HeartPulse size={15} />;
                destLabel = 'NPvCC Safety Dashboard';
              } else if (user.role === 'Institutional Leadership (Director / Dean)') {
                badgeColor = '#facc15';
                roleIcon = <Crown size={15} />;
                destLabel = 'Leadership Dashboard';
              }

              return (
                <button
                  key={user.id}
                  onClick={() => handleRoleQuickLogin(user)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '10px',
                    padding: '12px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '6px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = badgeColor;
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        color: badgeColor
                      }}>
                        {user.avatarInitials}
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>
                        {user.name}
                      </span>
                    </div>
                    <span style={{ color: badgeColor }}>{roleIcon}</span>
                  </div>

                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                    {user.title.split('•')[0]}
                  </div>

                  <div style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: badgeColor,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '4px'
                  }}>
                    <span>→ Access {destLabel}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Switcher: Sign In vs Sign Up */}
        <div style={{
          display: 'flex',
          gap: '8px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          marginBottom: '20px',
          paddingBottom: '8px'
        }}>
          <button
            onClick={() => {
              soundManager.playClick();
              setTab('signin');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: tab === 'signin' ? 'rgba(52, 211, 153, 0.15)' : 'transparent',
              border: tab === 'signin' ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid transparent',
              color: tab === 'signin' ? '#34d399' : '#94a3b8',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <LogIn size={15} /> Sign In
          </button>

          <button
            onClick={() => {
              soundManager.playClick();
              setTab('signup');
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: tab === 'signup' ? 'rgba(52, 211, 153, 0.15)' : 'transparent',
              border: tab === 'signup' ? '1px solid rgba(52, 211, 153, 0.3)' : '1px solid transparent',
              color: tab === 'signup' ? '#34d399' : '#94a3b8',
              borderRadius: '6px',
              padding: '8px 16px',
              fontSize: '0.84rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            <UserPlus size={15} /> Register New Account
          </button>
        </div>

        {/* Tab 1: Sign In Form */}
        {tab === 'signin' && (
          <form onSubmit={handleSignInSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                Institutional Email Address
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Mail size={16} style={{ position: 'absolute', left: '12px', color: '#64748b' }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. rajesh.sharma@aiia.gov.in"
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    padding: '10px 12px 10px 38px',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                Password (21 CFR Part 11 Authenticated)
              </label>
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Lock size={16} style={{ position: 'absolute', left: '12px', color: '#64748b' }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your clinical password"
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    padding: '10px 12px 10px 38px',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
              <div style={{ fontSize: '0.75rem', color: '#6ee7b7', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <ShieldCheck size={14} /> CERT-In Cloud MFA Protected
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '0.88rem' }}
              >
                Sign In to Respective Dashboard <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Sign Up Form with Role Assignment */}
        {tab === 'signup' && (
          <form onSubmit={handleSignUpSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Full Name & Designation
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Harish Chandra, MD"
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    padding: '8px 12px',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Select Institutional Role
                </label>
                <select
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value as UserRole)}
                  style={{
                    width: '100%',
                    background: '#0d1a12',
                    border: '1px solid rgba(52, 211, 153, 0.4)',
                    borderRadius: '8px',
                    color: '#34d399',
                    fontWeight: 700,
                    padding: '8px 12px',
                    fontSize: '0.85rem'
                  }}
                >
                  <option value="Principal Investigator">Principal Investigator (PI Dashboard)</option>
                  <option value="Study Coordinator">Study Coordinator (PI/SC Dashboard)</option>
                  <option value="Institutional Ethics Committee">Institutional Ethics Committee (IEC Dashboard)</option>
                  <option value="Pharmacovigilance (NPvCC / DSMB)">Pharmacovigilance (NPvCC / DSMB Dashboard)</option>
                  <option value="Institutional Leadership (Director / Dean)">Institutional Leadership (Director Dashboard)</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Institutional Email (.gov.in or .ac.in)
                </label>
                <input
                  type="email"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  placeholder="name@aiia.gov.in"
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    padding: '8px 12px',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Password
                </label>
                <input
                  type="password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  placeholder="Create secure password"
                  required
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    padding: '8px 12px',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Department / Unit
                </label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g. Kayachikitsa, Dravyaguna, Shalya"
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    padding: '8px 12px',
                    fontSize: '0.85rem'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', color: '#94a3b8', marginBottom: '4px', textTransform: 'uppercase' }}>
                  Affiliated Institution
                </label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  placeholder="All India Institute of Ayurveda"
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    borderRadius: '8px',
                    color: '#fff',
                    padding: '8px 12px',
                    fontSize: '0.85rem'
                  }}
                />
              </div>
            </div>

            {/* DPDP Act 2023 Consent Checkbox */}
            <div style={{
              background: 'rgba(52, 211, 153, 0.06)',
              border: '1px solid rgba(52, 211, 153, 0.2)',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '0.75rem',
              color: '#cbd5e1',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <CheckCircle2 size={16} style={{ color: '#34d399' }} />
              <span>DPDP Act 2023 Notice: Clinical trial data access is governed by strict role-based access control and immutable ALCOA+ audit trails.</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '6px' }}>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '10px 24px', fontSize: '0.88rem' }}
              >
                Create Account & Launch Respective Dashboard <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
