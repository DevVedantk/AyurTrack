import React, { useState } from 'react';
import { 
  HelpCircle, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  AlertCircle,
  FileCheck,
  Send,
  Sparkles
} from 'lucide-react';
import { ClinicalStudy, DataQuery } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface DataQueriesAlcoaViewProps {
  study: ClinicalStudy;
  onUpdateQueries: (updatedQueries: DataQuery[]) => void;
}

export const DataQueriesAlcoaView: React.FC<DataQueriesAlcoaViewProps> = ({
  study,
  onUpdateQueries
}) => {
  const [replyTextMap, setReplyTextMap] = useState<Record<string, string>>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const handleSendResponse = (queryId: string) => {
    const text = replyTextMap[queryId];
    if (!text || !text.trim()) return;

    soundManager.playSuccess();
    const updated = study.dataQueries.map(q => {
      if (q.id === queryId) {
        return {
          ...q,
          status: 'Answered' as const,
          responseHistory: [
            ...(q.responseHistory || []),
            {
              respondedBy: 'Investigator / Coordinator Response',
              date: new Date().toISOString().split('T')[0],
              text: text.trim()
            }
          ]
        };
      }
      return q;
    });

    onUpdateQueries(updated);
    setReplyTextMap(prev => ({ ...prev, [queryId]: '' }));
    setActiveReplyId(null);
  };

  const handleCloseQuery = (queryId: string) => {
    soundManager.playSuccess();
    const updated = study.dataQueries.map(q => {
      if (q.id === queryId) {
        return { ...q, status: 'Closed' as const };
      }
      return q;
    });
    onUpdateQueries(updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner: ALCOA+ Clinical Data Integrity Index */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={22} style={{ color: '#34d399' }} />
              <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>
                ALCOA+ Data Integrity & Quality Index
              </h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px' }}>
              Strict adherence to GCP-ASU & 21 CFR Part 11: Attributable, Legible, Contemporaneous, Original, Accurate + Complete, Consistent, Enduring, Available.
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span className="glass-pill" style={{ fontSize: '0.9rem', padding: '6px 16px' }}>
              Composite Quality: <strong style={{ color: '#34d399' }}>{study.alcoaScore.overall}%</strong>
            </span>
          </div>
        </div>

        {/* 9 Dimensions Breakdown Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '12px'
        }}>
          {[
            { label: 'Attributable', score: study.alcoaScore.attributable, desc: 'Verified user ID & role signature' },
            { label: 'Legible', score: study.alcoaScore.legible, desc: 'Readable eCRF audit records' },
            { label: 'Contemporaneous', score: study.alcoaScore.contemporaneous, desc: 'Timestamped at event occurrence' },
            { label: 'Original', score: study.alcoaScore.original, desc: 'Primary source documentation linked' },
            { label: 'Accurate', score: study.alcoaScore.accurate, desc: 'Zero unverified data overrides' },
            { label: 'Complete', score: study.alcoaScore.complete, desc: 'No missing mandatory CDASH fields' },
            { label: 'Consistent', score: study.alcoaScore.consistent, desc: 'Cross-form visit chronological flow' },
            { label: 'Enduring', score: study.alcoaScore.enduring, desc: 'WORM immutable cloud repository' },
            { label: 'Available', score: study.alcoaScore.available, desc: 'Instant regulatory inspector export' },
          ].map((dim, idx) => (
            <div key={idx} style={{
              background: 'rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '8px',
              padding: '12px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '4px' }}>
                <span style={{ color: '#cbd5e1', fontWeight: 600 }}>{dim.label}</span>
                <span style={{ color: '#34d399', fontWeight: 800 }}>{dim.score}%</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${dim.score}%`, height: '100%', background: '#10b981' }} />
              </div>
              <div style={{ fontSize: '0.68rem', color: '#64748b', marginTop: '6px' }}>
                {dim.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EDC Data Queries Management Ledger */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <HelpCircle size={20} style={{ color: '#38bdf8' }} />
              <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>
                EDC Data Queries & Query Aging Tracker
              </h3>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '4px' }}>
              Monitor and resolve automated CDASH validation discrepancies and clinical data monitor queries.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span className="glass-pill" style={{ fontSize: '0.75rem' }}>
              Avg Turnaround: 2.1 Days
            </span>
          </div>
        </div>

        {/* Queries List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {study.dataQueries.map(q => {
            const isOpen = q.status === 'Open';
            const isAnswered = q.status === 'Answered';
            return (
              <div
                key={q.id}
                style={{
                  background: 'rgba(0, 0, 0, 0.35)',
                  border: isOpen ? '1px solid rgba(56, 189, 248, 0.35)' : '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '18px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: '4px',
                      background: isOpen ? 'rgba(56, 189, 248, 0.2)' : isAnswered ? 'rgba(234, 179, 8, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                      color: isOpen ? '#38bdf8' : isAnswered ? '#facc15' : '#34d399'
                    }}>
                      {q.status}
                    </span>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#fff' }}>
                      {q.id}
                    </span>
                    <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      Subject: <strong style={{ color: '#34d399' }}>{q.subjectId}</strong> ({q.siteId})
                    </span>
                    <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>
                      Form: <strong>{q.formName}</strong> [{q.fieldName}]
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.75rem' }}>
                    <span style={{ color: '#94a3b8' }}>Raised: {q.dateRaised}</span>
                    <span style={{ color: q.agingDays > 5 ? '#f87171' : '#facc15', fontWeight: 700 }}>
                      Aging: {q.agingDays} days
                    </span>
                  </div>
                </div>

                <div style={{ fontSize: '0.86rem', color: '#f1f5f9', marginBottom: '14px', lineHeight: 1.5, background: 'rgba(255, 255, 255, 0.02)', padding: '12px', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '4px' }}>
                    Raised by: {q.raisedBy}
                  </div>
                  {q.queryText}
                </div>

                {/* Response History */}
                {q.responseHistory && q.responseHistory.length > 0 && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px', paddingLeft: '16px', borderLeft: '2px solid rgba(52, 211, 153, 0.4)' }}>
                    {q.responseHistory.map((resp, rIdx) => (
                      <div key={rIdx} style={{ fontSize: '0.8rem', color: '#a7f3d0' }}>
                        <span style={{ fontWeight: 700 }}>{resp.respondedBy} ({resp.date}): </span>
                        {resp.text}
                      </div>
                    ))}
                  </div>
                )}

                {/* Action Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  {activeReplyId === q.id ? (
                    <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '8px' }}>
                      <input
                        type="text"
                        placeholder="Enter investigator clarification or amendment rationale..."
                        value={replyTextMap[q.id] || ''}
                        onChange={(e) => setReplyTextMap(prev => ({ ...prev, [q.id]: e.target.value }))}
                        style={{
                          flex: 1,
                          background: 'rgba(0, 0, 0, 0.5)',
                          border: '1px solid rgba(52, 211, 153, 0.4)',
                          borderRadius: '6px',
                          color: '#fff',
                          padding: '8px 12px',
                          fontSize: '0.82rem',
                          outline: 'none'
                        }}
                      />
                      <button
                        onClick={() => handleSendResponse(q.id)}
                        className="btn-primary"
                        style={{ fontSize: '0.8rem', padding: '6px 14px' }}
                      >
                        <Send size={13} /> Submit Response
                      </button>
                      <button
                        onClick={() => setActiveReplyId(null)}
                        className="btn-secondary"
                        style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {q.status !== 'Closed' && (
                        <button
                          onClick={() => {
                            soundManager.playClick();
                            setActiveReplyId(q.id);
                          }}
                          className="btn-secondary"
                          style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                        >
                          <MessageSquare size={13} /> Respond to Query
                        </button>
                      )}
                      {q.status === 'Answered' && (
                        <button
                          onClick={() => handleCloseQuery(q.id)}
                          className="btn-primary"
                          style={{ fontSize: '0.75rem', padding: '6px 12px' }}
                        >
                          <CheckCircle2 size={13} /> Verify & Close Query
                        </button>
                      )}
                    </div>
                  )}

                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                    CDASH eCRF Domain: TS / DM / LB
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
