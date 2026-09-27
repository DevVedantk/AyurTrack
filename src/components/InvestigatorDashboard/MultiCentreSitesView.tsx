import React from 'react';
import { 
  Building2, 
  MapPin, 
  User, 
  Calendar, 
  CheckCircle2, 
  FileCheck, 
  Package, 
  AlertCircle,
  TrendingUp
} from 'lucide-react';
import { ClinicalStudy, SiteInfo } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface MultiCentreSitesViewProps {
  study: ClinicalStudy;
}

export const MultiCentreSitesView: React.FC<MultiCentreSitesViewProps> = ({ study }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>
              Multi-Centre Site Activation & Trial Site Telemetry
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Distributed oversight across national participating Ayurveda research institutions.
            </p>
          </div>
          <span className="glass-pill">
            {study.sites.length} Active Participating Centres
          </span>
        </div>

        {/* Sites Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '20px'
        }}>
          {study.sites.map(site => {
            const enrolmentPct = Math.round((site.actualEnrolled / site.targetEnrolment) * 100);
            return (
              <div 
                key={site.siteId}
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: '1px solid rgba(52, 211, 153, 0.25)',
                  borderRadius: '14px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                        <span style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '2px 6px',
                          borderRadius: '4px',
                          background: 'rgba(16, 185, 129, 0.18)',
                          color: '#34d399'
                        }}>
                          {site.siteId}
                        </span>
                        <span style={{ fontSize: '0.74rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={12} /> {site.city}
                        </span>
                      </div>
                      <h4 style={{ fontSize: '1rem', color: '#fff', lineHeight: 1.3 }}>
                        {site.siteName}
                      </h4>
                    </div>
                    <span className="glass-pill" style={{ fontSize: '0.7rem' }}>
                      {site.status}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1', marginBottom: '16px' }}>
                    Principal Investigator: <strong style={{ color: '#fff' }}>{site.piName}</strong>
                  </div>

                  {/* Enrolment Bar */}
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                      <span style={{ color: '#94a3b8' }}>Enrolment Progress</span>
                      <span style={{ color: '#34d399', fontWeight: 700 }}>
                        {site.actualEnrolled} / {site.targetEnrolment} pts ({enrolmentPct}%)
                      </span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{ width: `${enrolmentPct}%`, height: '100%', background: 'linear-gradient(90deg, #10b981, #34d399)' }} />
                    </div>
                  </div>

                  {/* ISF & Monitoring Dates */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px',
                    fontSize: '0.74rem',
                    background: 'rgba(255, 255, 255, 0.02)',
                    padding: '10px',
                    borderRadius: '8px',
                    marginBottom: '14px'
                  }}>
                    <div>
                      <div style={{ color: '#94a3b8' }}>ISF Completeness:</div>
                      <div style={{ color: '#facc15', fontWeight: 700 }}>{site.isfCompleteness}% Audited</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8' }}>Open EDC Queries:</div>
                      <div style={{ color: site.openQueries > 0 ? '#f87171' : '#34d399', fontWeight: 700 }}>
                        {site.openQueries} Queries
                      </div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8' }}>Last Monitor Visit:</div>
                      <div style={{ color: '#fff' }}>{site.lastMonitoringVisit}</div>
                    </div>
                    <div>
                      <div style={{ color: '#94a3b8' }}>Next Monitor Visit:</div>
                      <div style={{ color: '#6ee7b7', fontWeight: 600 }}>{site.nextMonitoringVisit}</div>
                    </div>
                  </div>
                </div>

                {/* Drug Accountability */}
                <div style={{
                  borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.72rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#cbd5e1' }}>
                    <Package size={14} style={{ color: '#facc15' }} />
                    <span>Batch: <strong>{site.drugBatchLot}</strong></span>
                  </div>
                  <div style={{ color: '#34d399', fontWeight: 700 }}>
                    {site.drugVialsRemaining} Kits Remaining
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
