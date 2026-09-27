import React from 'react';
import { 
  FileText, 
  Users, 
  Activity, 
  ShieldAlert, 
  HelpCircle, 
  Building2, 
  Flag,
  CheckCircle2
} from 'lucide-react';
import { soundManager } from '../../utils/audioFeedback';

export type DashboardTabId = 
  | 'overview' 
  | 'recruitment' 
  | 'compliance' 
  | 'safety' 
  | 'queries' 
  | 'sites' 
  | 'closeout';

interface DashboardTabsProps {
  activeTab: DashboardTabId;
  onChangeTab: (tabId: DashboardTabId) => void;
  openQueriesCount: number;
  openDeviationsCount: number;
  saeCount: number;
}

export const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  onChangeTab,
  openQueriesCount,
  openDeviationsCount,
  saeCount
}) => {
  const tabs = [
    {
      id: 'overview',
      label: 'Protocol & Regulatory Governance',
      icon: <FileText size={16} />,
      badge: null
    },
    {
      id: 'recruitment',
      label: 'Screening & Randomization',
      icon: <Users size={16} />,
      badge: null
    },
    {
      id: 'compliance',
      label: 'Visits & Protocol Deviations',
      icon: <Activity size={16} />,
      badge: openDeviationsCount > 0 ? `${openDeviationsCount} Dev` : null,
      badgeColor: '#facc15'
    },
    {
      id: 'safety',
      label: 'Pharmacovigilance (NPvCC)',
      icon: <ShieldAlert size={16} />,
      badge: saeCount > 0 ? '24h Clock Active' : null,
      badgeColor: '#ef4444'
    },
    {
      id: 'queries',
      label: 'EDC Queries & ALCOA+',
      icon: <HelpCircle size={16} />,
      badge: openQueriesCount > 0 ? `${openQueriesCount} Open` : null,
      badgeColor: '#38bdf8'
    },
    {
      id: 'sites',
      label: 'Multi-Centre Sites',
      icon: <Building2 size={16} />,
      badge: null
    },
    {
      id: 'closeout',
      label: 'Study Close-Out',
      icon: <Flag size={16} />,
      badge: null
    }
  ];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      overflowX: 'auto',
      paddingBottom: '8px',
      marginBottom: '24px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      {tabs.map(tab => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => {
              soundManager.playClick();
              onChangeTab(tab.id as DashboardTabId);
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 16px',
              borderRadius: '8px',
              border: isActive 
                ? '1px solid rgba(52, 211, 153, 0.4)' 
                : '1px solid rgba(255, 255, 255, 0.06)',
              background: isActive 
                ? 'rgba(16, 185, 129, 0.15)' 
                : 'rgba(255, 255, 255, 0.02)',
              color: isActive ? '#34d399' : '#94a3b8',
              fontWeight: isActive ? 700 : 500,
              fontSize: '0.86rem',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'all 0.2s',
              boxShadow: isActive ? '0 4px 12px rgba(16, 185, 129, 0.15)' : 'none'
            }}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge && (
              <span style={{
                background: tab.badgeColor || '#34d399',
                color: '#000',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '1px 6px',
                borderRadius: '6px'
              }}>
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
