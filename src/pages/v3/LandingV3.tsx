/**
 * LandingV3 — Standalone greenfield landing page.
 *
 * Self-contained: no design-system imports. Only React, framer-motion,
 * lucide-react, recharts, and the project router Link.
 */
import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  TrendingUp,
  Zap,
  Scale,
  Lock,
  ScrollText,
  PlayCircle,
  RotateCcw,
  Brain,
  Waves,
} from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import { Link } from '../../router';

/* ─── Mock data ────────────────────────────────────────────────────────────── */

const metricsData = [
  {
    label: 'System Confidence',
    value: '0.92',
    color: '#0DD9B4',
    spark: [4, 6, 5, 7, 8, 7, 9, 8, 9, 9.2],
  },
  {
    label: 'Decisions Audited',
    value: '1,247',
    color: '#4E94FF',
    spark: [2, 4, 5, 7, 8, 9, 10, 11, 12, 12.5],
  },
  {
    label: 'Threats Blocked',
    value: '23',
    color: '#FFB020',
    spark: [8, 7, 5, 6, 4, 3, 3, 2, 2, 2.3],
  },
  {
    label: 'Response Time',
    value: '<200ms',
    color: '#34D399',
    spark: [5, 4, 5, 4, 3, 4, 3, 3, 2, 2],
  },
];

const engines = [
  {
    icon: Shield,
    name: 'Protect',
    color: '#0DD9B4',
    desc: 'Real-time threat detection with explainable AI.',
    confidence: 0.94,
  },
  {
    icon: TrendingUp,
    name: 'Grow',
    color: '#9B6DFF',
    desc: 'Forecast-driven growth with Monte Carlo simulations.',
    confidence: 0.89,
  },
  {
    icon: Zap,
    name: 'Execute',
    color: '#FFB020',
    desc: 'Consent-first automation with reversible actions.',
    confidence: 0.91,
  },
  {
    icon: Scale,
    name: 'Govern',
    color: '#4E94FF',
    desc: 'Full audit trail for every AI decision.',
    confidence: 0.97,
  },
];

const governancePillars = [
  {
    icon: Brain,
    title: 'Explainable',
    desc: 'Every AI decision includes SHAP feature attribution.',
    color: '#4E94FF',
  },
  {
    icon: ScrollText,
    title: 'Auditable',
    desc: '1,247 decisions with full audit trails.',
    color: '#4E94FF',
  },
  {
    icon: RotateCcw,
    title: 'Reversible',
    desc: 'One-click rollback on any automated action.',
    color: '#4E94FF',
  },
];

/* ─── Animation helpers ────────────────────────────────────────────────────── */

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

/* ─── Sparkline component ──────────────────────────────────────────────────── */

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const chartData = data.map((v, i) => ({ v, i }));
  return (
    <ResponsiveContainer width="100%" height={24}>
      <AreaChart data={chartData} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id={`spark-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#spark-${color.replace('#', '')})`}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

/* ─── Main component ───────────────────────────────────────────────────────── */

export default function LandingV3() {
  return (
    <div className="min-h-screen bg-[#070d1a] text-slate-100 overflow-hidden relative">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 30%, rgba(13,217,180,0.06) 0%, transparent 70%), radial-gradient(ellipse 50% 50% at 70% 60%, rgba(78,148,255,0.04) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        {/* ── 1. Navigation ─────────────────────────────────────────────── */}
        <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/[0.03] border-b border-white/[0.06]">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">
            {/* Logo */}
            <Link to="/v3/landing" className="flex items-center gap-2 group" aria-label="Poseidon.AI home">
              <Waves className="h-5 w-5 text-[#0DD9B4] transition-transform group-hover:rotate-6" />
              <span className="text-base font-bold tracking-tight text-white">
                Poseidon<span className="text-[#0DD9B4]">.AI</span>
              </span>
            </Link>

            {/* Center nav */}
            <div className="hidden items-center gap-8 md:flex">
              {['Product', 'Trust', 'Pricing'].map((label) => (
                <a
                  key={label}
                  href={`#${label.toLowerCase()}`}
                  className="text-sm text-slate-500 transition-colors hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="hidden text-sm text-slate-400 transition-colors hover:text-white md:inline-block"
              >
                Sign in
              </Link>
              <Link
                to="/v3/dashboard"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-[#0DD9B4] to-[#0BB5D9] px-4 py-2 text-sm font-medium text-[#070d1a] shadow-lg shadow-[#0DD9B4]/10 transition-all hover:shadow-[#0DD9B4]/20 hover:brightness-110"
              >
                Get Started
              </Link>
            </div>
          </div>
        </nav>

        {/* ── 2. Hero ───────────────────────────────────────────────────── */}
        <section className="relative px-5 pb-16 pt-20 md:px-8 md:pb-24 md:pt-32">
          {/* Hero glow */}
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              background:
                'radial-gradient(ellipse 70% 50% at 50% 20%, rgba(13,217,180,0.08) 0%, transparent 60%)',
            }}
          />
          <motion.div
            className="relative z-10 mx-auto max-w-4xl text-center"
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-balance text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
            >
              Safer satisfying money decisions{' '}
              <span className="bg-gradient-to-r from-[#0DD9B4] to-[#4E94FF] bg-clip-text text-transparent">
                in one place
              </span>
              .
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-slate-400 md:text-xl"
            >
              Four AI engines working together. Every decision explainable, auditable, and reversible.
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-10 flex flex-wrap items-center justify-center gap-4"
            >
              <Link
                to="/v3/dashboard"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#0DD9B4] to-[#0BB5D9] px-8 py-4 text-base font-semibold text-[#070d1a] shadow-xl shadow-[#0DD9B4]/15 transition-all hover:shadow-[#0DD9B4]/25 hover:brightness-110"
              >
                Open Dashboard
                <span aria-hidden="true">&rarr;</span>
              </Link>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 py-4 text-base font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-white/20 hover:text-white"
              >
                <PlayCircle className="h-5 w-5" />
                Watch Demo
              </button>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500"
            >
              <span className="flex items-center gap-1.5">
                <Lock className="h-3.5 w-3.5" />
                Bank-grade encryption
              </span>
              <span className="flex items-center gap-1.5">
                <Shield className="h-3.5 w-3.5" />
                GDPR compliant
              </span>
              <span className="flex items-center gap-1.5">
                <ScrollText className="h-3.5 w-3.5" />
                100% auditable
              </span>
            </motion.div>
          </motion.div>
        </section>

        {/* ── 3. Live metrics strip ─────────────────────────────────────── */}
        <section className="px-5 pb-20 md:px-8" id="product">
          <motion.div
            className="mx-auto grid max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
          >
            {metricsData.map((m) => (
              <motion.div
                key={m.label}
                variants={fadeUp}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5 backdrop-blur-xl"
              >
                <p className="text-[11px] font-medium uppercase tracking-widest text-slate-500">
                  {m.label}
                </p>
                <p className="mt-1 text-2xl font-bold text-white">{m.value}</p>
                <div className="mt-3">
                  <Sparkline data={m.spark} color={m.color} />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* ── 4. Four Engine showcase ───────────────────────────────────── */}
        <section className="px-5 pb-20 md:px-8">
          <motion.div
            className="mx-auto max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center text-3xl font-bold text-white md:text-4xl"
            >
              Four engines. One trusted system.
            </motion.h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {engines.map((eng) => {
                const Icon = eng.icon;
                return (
                  <motion.div
                    key={eng.name}
                    variants={fadeUp}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-white/[0.12] hover:shadow-lg"
                    style={{
                      ['--engine-color' as string]: eng.color,
                    }}
                  >
                    {/* Hover glow */}
                    <div
                      className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      aria-hidden="true"
                      style={{
                        boxShadow: `inset 0 0 0 1px ${eng.color}20, 0 0 24px -8px ${eng.color}15`,
                      }}
                    />

                    <div className="relative z-10 flex items-start gap-4">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                        style={{ backgroundColor: `${eng.color}15` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: eng.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-white">{eng.name}</h3>
                          <span
                            className="rounded-full px-2.5 py-0.5 font-mono text-xs"
                            style={{
                              backgroundColor: `${eng.color}15`,
                              color: eng.color,
                            }}
                          >
                            {eng.confidence.toFixed(2)}
                          </span>
                        </div>
                        <p className="mt-1 text-sm leading-relaxed text-slate-400">{eng.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </section>

        {/* ── 5. Governance proof ───────────────────────────────────────── */}
        <section className="px-5 pb-20 md:px-8" id="trust">
          <motion.div
            className="mx-auto max-w-6xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.h2
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mb-10 text-center text-2xl font-bold text-white md:text-3xl"
            >
              Governance by design, not by checkbox.
            </motion.h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {governancePillars.map((g) => {
                const Icon = g.icon;
                return (
                  <motion.div
                    key={g.title}
                    variants={fadeUp}
                    transition={{ duration: 0.6 }}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-6 text-center backdrop-blur-xl"
                  >
                    <div
                      className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full"
                      style={{ backgroundColor: `${g.color}15` }}
                    >
                      <Icon className="h-5 w-5" style={{ color: g.color }} />
                    </div>
                    <h3 className="text-base font-bold text-white">{g.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">{g.desc}</p>
                  </motion.div>
                );
              })}
            </div>

            {/* Proof bar */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6 }}
              className="mt-6 rounded-lg border border-white/[0.06] bg-white/[0.02] px-5 py-3 text-center font-mono text-xs text-slate-500"
            >
              System uptime 99.97% &middot; Last audit: 4m ago &middot; Model version: v3.2.1
              &middot; Decisions today: 47
            </motion.div>
          </motion.div>
        </section>

        {/* ── 6. Footer ─────────────────────────────────────────────────── */}
        <footer className="border-t border-white/[0.06] px-5 py-10 md:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-slate-500">
              <Shield className="h-4 w-4 text-slate-600" />
              <span>MIT Sloan CTO Program &middot; Group 7 &middot; March 2026</span>
            </div>
            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-600">
              <a href="#" className="transition-colors hover:text-slate-400">
                Privacy Policy
              </a>
              <span>&middot;</span>
              <a href="#" className="transition-colors hover:text-slate-400">
                Terms of Service
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
