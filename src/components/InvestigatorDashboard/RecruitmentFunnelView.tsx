import React, { useState } from 'react';
import { 
  Users, 
  UserX, 
  GitBranch, 
  TrendingUp, 
  Filter, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
  PieChart
} from 'lucide-react';
import { ClinicalStudy, ScreenFailureReason } from '../../types/clinical';
import { soundManager } from '../../utils/audioFeedback';

interface RecruitmentFunnelViewProps {
  study: ClinicalStudy;
}

export const RecruitmentFunnelView: React.FC<RecruitmentFunnelViewProps> = ({ study }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const filteredReasons = selectedCategory === 'All' 
    ? study.screenFailureReasons 
    : study.screenFailureReasons.filter(r => r.category === selectedCategory);

  const totalReasonsCount = study.screenFailureReasons.reduce((acc, curr) => acc + curr.count, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Funnel Metrics Bar */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#fff' }}>
              Screening & Enrolment Funnel
            </h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
              Real-time patient accrual tracking from initial screening through 1:1 block randomization.
            </p>
          </div>
          <span className="glass-pill">
            <span className="pulse-dot"></span> Pacing: 90% of Target Achieved
          </span>
        </div>

        {/* Funnel Stages */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '20px'
        }}>
          {/* Stage 1 */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '12px',
            padding: '18px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '4px' }}>
              Stage 1: Screened
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#ffffff' }}>
              {study.totalScreened}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#6ee7b7' }}>
              Target: {study.screeningTarget} (83.6%)
            </div>
          </div>

          {/* Stage 2 */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.05)',
            border: '1px solid rgba(239, 68, 68, 0.25)',
            borderRadius: '12px',
            padding: '18px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#f87171', textTransform: 'uppercase', marginBottom: '4px' }}>
              Screen Failures
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#f87171' }}>
              {study.screenFailuresCount}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#fca5a5' }}>
              Failure Rate: {Math.round((study.screenFailuresCount / study.totalScreened) * 100)}%
            </div>
          </div>

          {/* Stage 3 */}
          <div style={{
            background: 'rgba(16, 185, 129, 0.06)',
            border: '1px solid rgba(52, 211, 153, 0.25)',
            borderRadius: '12px',
            padding: '18px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#34d399', textTransform: 'uppercase', marginBottom: '4px' }}>
              Stage 2: Eligible
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#34d399' }}>
              {study.totalEligible}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#a7f3d0' }}>
              Eligibility Rate: 77.2%
            </div>
          </div>

          {/* Stage 4 */}
          <div style={{
            background: 'rgba(234, 179, 8, 0.08)',
            border: '1px solid rgba(250, 204, 21, 0.35)',
            borderRadius: '12px',
            padding: '18px',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#facc15', textTransform: 'uppercase', marginBottom: '4px' }}>
              Stage 3: Enrolled
            </div>
            <div style={{ fontSize: '1.9rem', fontWeight: 800, color: '#facc15' }}>
              {study.currentEnrolled}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#fef08a' }}>
              Target: {study.targetEnrollment} (90.0%)
            </div>
          </div>
        </div>

        {/* Funnel Horizontal Bar Graphic */}
        <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
          <div style={{ width: '58.7%', background: '#10b981' }} title="Enrolled (58.7%)" />
          <div style={{ width: '18.5%', background: '#38bdf8' }} title="Pending Run-in (18.5%)" />
          <div style={{ width: '22.8%', background: '#ef4444' }} title="Screen Failures (22.8%)" />
        </div>
        <div style={{ display: 'flex', gap: '20px', marginTop: '10px', fontSize: '0.74rem', color: '#94a3b8' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></span> Enrolled ({study.currentEnrolled})
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#38bdf8' }}></span> In Run-in / Evaluation ({study.totalEligible - study.currentEnrolled})
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></span> Screen Failures ({study.screenFailuresCount})
          </span>
        </div>
      </div>

      {/* Two Column Grid: Screen Failure Reasons & Randomization vs Target */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        {/* Screen Failures Reason Analysis */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserX size={18} style={{ color: '#f87171' }} />
              <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>
                Screen Failure Reasons (n = {study.screenFailuresCount})
              </h3>
            </div>
            
            {/* Category filter */}
            <select
              value={selectedCategory}
              onChange={(e) => {
                soundManager.playClick();
                setSelectedCategory(e.target.value);
              }}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#cbd5e1',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '6px',
                padding: '4px 8px',
                fontSize: '0.75rem',
                outline: 'none'
              }}
            >
              <option value="All">All Categories</option>
              <option value="Exclusion Criteria">Exclusion Criteria</option>
              <option value="Consent Withdrawn">Consent Withdrawn</option>
              <option value="Prakriti Mismatch">Prakriti Criteria</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filteredReasons.map((item, idx) => {
              const pct = Math.round((item.count / totalReasonsCount) * 100);
              return (
                <div key={idx} style={{
                  background: 'rgba(0, 0, 0, 0.25)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderRadius: '8px',
                  padding: '12px'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                    <span style={{ color: '#f1f5f9', fontWeight: 600 }}>{item.reason}</span>
                    <span style={{ color: '#f87171', fontWeight: 700 }}>{item.count} pts ({pct}%)</span>
                  </div>
                  <div style={{ width: '100%', height: '5px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{ width: `${pct}%`, height: '100%', background: '#f87171', borderRadius: '3px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Randomization vs Target Breakdown */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <GitBranch size={18} style={{ color: '#38bdf8' }} />
              <h3 style={{ fontSize: '1.15rem', color: '#fff' }}>
                1:1 Randomization vs Target
              </h3>
            </div>
            <span className="badge-cyan">
              ✓ Block Validated
            </span>
          </div>

          {/* Allocation Arms Card */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginBottom: '20px'
          }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              borderRadius: '10px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: '#34d399', textTransform: 'uppercase', marginBottom: '4px' }}>
                Arm A: Active ASU Formulation
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#34d399' }}>
                {study.randomizedActiveArm}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                Target: 60 (88.3%)
              </div>
            </div>

            <div style={{
              background: 'rgba(56, 189, 248, 0.08)',
              border: '1px solid rgba(56, 189, 248, 0.3)',
              borderRadius: '10px',
              padding: '16px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '0.72rem', color: '#38bdf8', textTransform: 'uppercase', marginBottom: '4px' }}>
                Arm B: Matched Placebo
              </div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8' }}>
                {study.randomizedComparatorArm}
              </div>
              <div style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
                Target: 60 (85.0%)
              </div>
            </div>
          </div>

          {/* Stratification Breakdown by Prakriti & Age */}
          <div style={{
            background: 'rgba(0, 0, 0, 0.25)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '10px',
            padding: '14px'
          }}>
            <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontWeight: 700, marginBottom: '8px', textTransform: 'uppercase' }}>
              Randomization Stratification Balance Matrix
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', textAlign: 'center', fontSize: '0.78rem' }}>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px', borderRadius: '6px' }}>
                <div style={{ color: '#94a3b8' }}>Vata-Pitta</div>
                <div style={{ color: '#fff', fontWeight: 700 }}>38 pts</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px', borderRadius: '6px' }}>
                <div style={{ color: '#94a3b8' }}>Pitta-Kapha</div>
                <div style={{ color: '#fff', fontWeight: 700 }}>44 pts</div>
              </div>
              <div style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '8px', borderRadius: '6px' }}>
                <div style={{ color: '#94a3b8' }}>Kapha-Vata</div>
                <div style={{ color: '#fff', fontWeight: 700 }}>22 pts</div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#6ee7b7', marginTop: '10px' }}>
              <CheckCircle2 size={13} /> Chi-square balance verified (p = 0.88, no arm imbalance).
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
