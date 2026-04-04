'use client';

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { PayoffPlan } from '@/lib/debt-calculator';
import { formatCurrency } from '@/lib/debt-calculator';

interface PayoffChartProps {
  plan: PayoffPlan;
  lang: string;
  dict: Record<string, string>;
  currency?: string;
}

const COLORS = [
  '#005235', // primary green
  '#FF8C73', // coral
  '#FFD966', // yellow
  '#4ECDC4', // teal
  '#7C3AED', // purple
  '#F472B6', // pink
  '#FB923C', // orange
  '#38BDF8', // sky blue
  '#A3E635', // lime
  '#E879F9', // fuchsia
];

export default function PayoffChart({ plan, lang, dict, currency }: PayoffChartProps) {
  const fc = (n: number) => formatCurrency(n, lang, currency);

  const chartData = useMemo(() => {
    if (plan.debts.length === 0 || plan.totalMonths === 0) return null;

    const totalMonths = plan.totalMonths;
    // Sample ~24 points max for readability
    const step = Math.max(1, Math.floor(totalMonths / 24));
    const points: number[] = [];
    for (let m = 0; m < totalMonths; m += step) points.push(m);
    if (points[points.length - 1] !== totalMonths - 1) points.push(totalMonths - 1);

    // Need at least 2 data points to draw a chart
    if (points.length < 2) return null;

    // Build stacked data: for each sample point, get each debt's remaining balance
    const stacked = points.map((month) => {
      const balances = plan.debts.map((debt) => {
        const payment = debt.monthlyPayments[month];
        return payment ? payment.remainingBalance : 0;
      });
      return { month, balances, total: balances.reduce((a, b) => a + b, 0) };
    });

    const maxTotal = Math.max(...stacked.map((s) => s.total), 1);

    return { stacked, maxTotal, points };
  }, [plan]);

  if (!chartData) return null;

  const { stacked, maxTotal } = chartData;
  const W = 800;
  const H = 300;
  const PAD_L = 60;
  const PAD_R = 20;
  const PAD_T = 20;
  const PAD_B = 40;
  const chartW = W - PAD_L - PAD_R;
  const chartH = H - PAD_T - PAD_B;

  // Build stacked area paths (bottom to top)
  const numDebts = plan.debts.length;
  const areas: { path: string; color: string; name: string }[] = [];

  for (let d = numDebts - 1; d >= 0; d--) {
    const topPoints = stacked.map((s, i) => {
      const stackTop = s.balances.slice(0, d + 1).reduce((a, b) => a + b, 0);
      const x = PAD_L + (i / (stacked.length - 1)) * chartW;
      const y = PAD_T + chartH - (stackTop / maxTotal) * chartH;
      return `${x},${y}`;
    });

    const bottomPoints = stacked.map((s, i) => {
      const stackBottom = d > 0 ? s.balances.slice(0, d).reduce((a, b) => a + b, 0) : 0;
      const x = PAD_L + (i / (stacked.length - 1)) * chartW;
      const y = PAD_T + chartH - (stackBottom / maxTotal) * chartH;
      return `${x},${y}`;
    });

    const path = `M${topPoints.join(' L')} L${bottomPoints.reverse().join(' L')} Z`;
    areas.push({
      path,
      color: COLORS[d % COLORS.length],
      name: plan.debts[d].debtName || `Debt ${d + 1}`,
    });
  }

  // Y-axis labels
  const yTicks = 5;
  const yLabels = Array.from({ length: yTicks + 1 }, (_, i) => {
    const val = (maxTotal / yTicks) * (yTicks - i);
    return {
      y: PAD_T + (i / yTicks) * chartH,
      label: val >= 1000 ? `${Math.round(val / 1000)}k` : Math.round(val).toString(),
    };
  });

  // X-axis labels
  const xTickCount = Math.min(6, stacked.length);
  const xLabels = Array.from({ length: xTickCount }, (_, i) => {
    const idx = Math.round((i / (xTickCount - 1)) * (stacked.length - 1));
    const month = stacked[idx].month;
    return {
      x: PAD_L + (idx / (stacked.length - 1)) * chartW,
      label: `${dict.month || 'Mo'} ${month + 1}`,
    };
  });

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-gray-900">
        {dict.balanceOverTime || 'Balance over time'}
      </h3>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[400px]">
          {/* Grid lines */}
          {yLabels.map((tick) => (
            <line
              key={tick.y}
              x1={PAD_L}
              y1={tick.y}
              x2={W - PAD_R}
              y2={tick.y}
              stroke="#e5e7eb"
              strokeWidth="1"
            />
          ))}

          {/* Stacked areas */}
          {areas.map((area, i) => (
            <motion.path
              key={area.name}
              d={area.path}
              fill={area.color}
              fillOpacity={0.6}
              stroke={area.color}
              strokeWidth="1.5"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            />
          ))}

          {/* Y-axis labels */}
          {yLabels.map((tick) => (
            <text
              key={`y-${tick.y}`}
              x={PAD_L - 8}
              y={tick.y + 4}
              textAnchor="end"
              className="text-[11px] fill-gray-400"
            >
              {tick.label}
            </text>
          ))}

          {/* X-axis labels */}
          {xLabels.map((tick) => (
            <text
              key={`x-${tick.x}`}
              x={tick.x}
              y={H - 8}
              textAnchor="middle"
              className="text-[11px] fill-gray-400"
            >
              {tick.label}
            </text>
          ))}
        </svg>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-4">
          {plan.debts.map((debt, i) => (
            <div key={debt.debtId} className="flex items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className="text-xs text-gray-600">
                {debt.debtName || `Debt ${i + 1}`} ({fc(debt.totalPaid)})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
