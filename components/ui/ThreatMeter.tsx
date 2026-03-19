'use client';

interface ThreatMeterProps {
  score: number;
  maxScore?: number;
  label?: string;
  showScore?: boolean;
}

function getColor(score: number, maxScore: number) {
  const pct = score / maxScore;
  if (pct >= 0.83) return { fill: 'bg-[#00E87A]', shadow: 'shadow-[0_0_10px_rgba(0,232,122,0.3)]', text: 'text-[#00E87A]' };
  if (pct >= 0.58) return { fill: 'bg-[#FF8C00]', shadow: 'shadow-[0_0_10px_rgba(255,140,0,0.3)]', text: 'text-[#FF8C00]' };
  return { fill: 'bg-[#D42B00]', shadow: 'shadow-[0_0_10px_rgba(212,43,0,0.3)]', text: 'text-[#D42B00]' };
}

function getStateLabel(score: number, maxScore: number) {
  const pct = score / maxScore;
  if (pct >= 0.83) return 'KILL CONFIRMED';
  if (pct >= 0.58) return 'STILL ACTIVE';
  return 'CRITICAL THREAT';
}

export function ThreatMeter({ score, maxScore = 12, label, showScore = true }: ThreatMeterProps) {
  const pct = Math.min(100, (score / maxScore) * 100);
  const colors = getColor(score, maxScore);
  const stateLabel = label ?? getStateLabel(score, maxScore);

  return (
    <div role="status" aria-label={`Threat meter: ${score} of ${maxScore}`} className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="font-mono text-[10px] text-[#8A9E8A] uppercase tracking-widest">{stateLabel}</span>
        {showScore && (
          <span className={`font-mono text-lg font-medium ${colors.text}`}>
            {score}/{maxScore}
          </span>
        )}
      </div>
      <div className="w-full h-2 bg-[var(--zombie-red-dim,rgba(122,24,0,0.12))] overflow-hidden">
        <div
          className={`h-full ${colors.fill} ${colors.shadow} transition-all duration-700 ease-out`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
