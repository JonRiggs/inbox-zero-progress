'use client';

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from 'recharts';
import { ArchiveRestore, CheckCircle2, CircleDashed, Inbox, ShieldCheck, Sparkles } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';

const trend = [
  { date: 'Aug 24', updates: 69425, promotions: 61422 },
  { date: 'Aug 25', updates: 68922, promotions: 61436 },
  { date: 'Aug 26', updates: 68935, promotions: 61456 },
  { date: 'Aug 27', updates: 68980, promotions: 61464 },
  { date: 'Sep 1', updates: 65840, promotions: 60329 },
];

const chartConfig = {
  updates: { label: 'Updates', color: '#12d6a0' },
  promotions: { label: 'Promotions', color: '#ffbc6c' },
} satisfies ChartConfig;

const cleanupMix = [
  { name: 'Job alerts', value: 2277 },
  { name: 'Order mail', value: 1674 },
  { name: 'Mailer sweep', value: 1518 },
  { name: 'Faithlife', value: 485 },
  { name: 'Retail / food', value: 480 },
  { name: 'Restaurants', value: 436 },
  { name: 'Other verified', value: 1364 },
];

const cumulative = [
  { date: 'Aug 6', total: 2277 },
  { date: 'Aug 8', total: 4688 },
  { date: 'Aug 24', total: 5044 },
  { date: 'Aug 30', total: 6494 },
  { date: 'Aug 31', total: 8012 },
  { date: 'Sep 1', total: 8234 },
];

const focus = [
  { name: 'Cleared', value: 8234, color: '#12d6a0' },
  { name: 'Trend gap', value: 4854, color: '#ffbc6c' },
];

const singleConfig = { value: { label: 'Messages', color: '#12d6a0' }, total: { label: 'Cumulative', color: '#12d6a0' } } satisfies ChartConfig;

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="relative z-10 mx-auto flex max-w-[1440px] items-center justify-between px-5 py-7 sm:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="grid size-10 place-items-center rounded-2xl border border-primary/25 bg-primary/10 text-primary"><Inbox className="size-5" /></div>
          <div><p className="text-[11px] font-bold uppercase tracking-[.22em] text-muted-foreground">Personal operations</p><p className="text-sm font-semibold">Inbox Zero / Progress room</p></div>
        </div>
        <div className="live-pill"><span /> Updated Sep 1, 2026</div>
      </header>

      <section className="relative z-10 mx-auto max-w-[1440px] px-5 pb-14 sm:px-8 lg:px-12">
        <div className="mb-8 grid gap-5 lg:grid-cols-[1.6fr_.8fr]">
          <div className="hero-panel">
            <div className="eyebrow"><Sparkles className="size-3.5" /> Signal over noise</div>
            <h1>A calmer inbox,<br /><span>one verified sweep at a time.</span></h1>
            <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">Progress is measured in safely resolved clutter—not in erased evidence. The vault remains canonical; this is the cockpit.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <div className="stat-chip"><strong>8.2k+</strong><span>verified messages cleared*</span></div>
              <div className="stat-chip"><strong>0</strong><span>permanent deletions</span></div>
              <div className="stat-chip"><strong>100%</strong><span>bounded & reversible</span></div>
            </div>
          </div>

          <div className="score-panel">
            <div className="flex items-start justify-between">
              <div><p className="label">Momentum</p><p className="mt-2 text-5xl font-semibold tracking-[-.06em]">4,854</p><p className="mt-2 text-sm text-muted-foreground">fewer unread category signals</p></div>
              <div className="delta">↓ 3.7%</div>
            </div>
            <div className="mt-10 h-2 overflow-hidden rounded-full bg-white/8"><div className="h-full w-[74%] rounded-full bg-primary shadow-[0_0_22px_#12d6a099]" /></div>
            <div className="mt-4 flex justify-between text-xs text-muted-foreground"><span>Aug 24 baseline</span><span>Sep 1 morning</span></div>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[1.55fr_.85fr]">
          <article className="data-panel min-w-0">
            <div className="panel-heading"><div><p className="label">Backlog trajectory</p><h2>Updates + Promotions</h2></div><div className="legend"><span className="updates" /> Updates <span className="promotions" /> Promotions</div></div>
            <ChartContainer config={chartConfig} className="mt-6 h-[300px] w-full aspect-auto" initialDimension={{ width: 800, height: 300 }}>
              <AreaChart data={trend} margin={{ left: 2, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillUpdates" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-updates)" stopOpacity={0.36}/><stop offset="95%" stopColor="var(--color-updates)" stopOpacity={0.01}/></linearGradient>
                  <linearGradient id="fillPromotions" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="var(--color-promotions)" stopOpacity={0.24}/><stop offset="95%" stopColor="var(--color-promotions)" stopOpacity={0.01}/></linearGradient>
                </defs>
                <CartesianGrid vertical={false} strokeDasharray="3 7" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={12}/>
                <YAxis domain={[58000, 71000]} tickLine={false} axisLine={false} width={44} tickFormatter={(v) => `${Math.round(v / 1000)}k`}/>
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Area dataKey="updates" type="monotone" stroke="var(--color-updates)" strokeWidth={3} fill="url(#fillUpdates)" />
                <Area dataKey="promotions" type="monotone" stroke="var(--color-promotions)" strokeWidth={2.5} fill="url(#fillPromotions)" />
              </AreaChart>
            </ChartContainer>
          </article>

          <aside className="data-panel">
            <div className="panel-heading"><div><p className="label">Guardrails</p><h2>Trust is the metric</h2></div><ShieldCheck className="size-5 text-primary" /></div>
            <div className="mt-6 space-y-3">
              <Guard icon={<CheckCircle2 />} title="Protected labels checked" detail="STARRED · Actions · Waiting For" />
              <Guard icon={<ArchiveRestore />} title="Recovery window preserved" detail="Trash, never permanent deletion" />
              <Guard icon={<ShieldCheck />} title="Consequential evidence retained" detail="Financial · legal · health · career" />
            </div>
            <p className="mt-6 border-t border-white/8 pt-5 text-xs leading-5 text-muted-foreground">*Curated sum of documented, non-overlapping cleanup batches. Not a live Gmail total.</p>
          </aside>
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[.95fr_1.25fr]">
          <article className="data-panel">
            <div className="panel-heading"><div><p className="label">Cleanup mix</p><h2>Where the gains came from</h2></div><span className="mono-note">8,234 curated</span></div>
            <ChartContainer config={singleConfig} className="mt-6 h-[360px] w-full aspect-auto" initialDimension={{ width: 560, height: 360 }}>
              <BarChart data={cleanupMix} layout="vertical" margin={{ left: 12, right: 20, top: 0, bottom: 0 }}>
                <CartesianGrid horizontal={false} strokeDasharray="3 7" />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} width={92} tick={{ fontSize: 11 }} />
                <ChartTooltip cursor={{ fill: '#ffffff06' }} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="value" fill="var(--color-value)" radius={[0, 8, 8, 0]} barSize={16} />
              </BarChart>
            </ChartContainer>
          </article>

          <article className="data-panel">
            <div className="panel-heading"><div><p className="label">Compounding progress</p><h2>Verified cleanup, cumulatively</h2></div><span className="mono-note">Aug 6 → Sep 1</span></div>
            <ChartContainer config={singleConfig} className="mt-6 h-[360px] w-full aspect-auto" initialDimension={{ width: 720, height: 360 }}>
              <AreaChart data={cumulative} margin={{ left: 0, right: 12, top: 20, bottom: 0 }}>
                <defs><linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="var(--color-total)" stopOpacity={0.4}/><stop offset="1" stopColor="var(--color-total)" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid vertical={false} strokeDasharray="3 7" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={12}/>
                <YAxis tickLine={false} axisLine={false} width={42} tickFormatter={(v) => `${Math.round(v / 1000)}k`}/>
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Area dataKey="total" type="monotone" stroke="var(--color-total)" strokeWidth={3.5} fill="url(#fillTotal)" dot={{ fill: '#08100f', stroke: '#12d6a0', strokeWidth: 2, r: 4 }} />
              </AreaChart>
            </ChartContainer>
          </article>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
          <article className="data-panel flex flex-col">
            <div><p className="label">Two lenses</p><h2 className="mt-1 text-[1.35rem] font-semibold tracking-[-.03em]">Effort vs. inbox movement</h2></div>
            <div className="relative mx-auto mt-3 w-full max-w-[300px]">
              <ChartContainer config={singleConfig} className="h-[250px] w-full aspect-auto" initialDimension={{ width: 300, height: 250 }}>
                <PieChart><Pie data={focus} dataKey="value" nameKey="name" innerRadius={72} outerRadius={98} paddingAngle={4} stroke="none">{focus.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie><ChartTooltip content={<ChartTooltipContent hideLabel />} /></PieChart>
              </ChartContainer>
              <div className="donut-label"><strong>13,088</strong><span>tracked signals</span></div>
            </div>
            <div className="flex justify-center gap-5 text-xs text-muted-foreground"><span><i className="dot green"/>Verified cleared</span><span><i className="dot amber"/>Unread reduction</span></div>
          </article>

          <article className="data-panel">
            <div className="panel-heading"><div><p className="label">Status lane</p><h2>Wins locked in. Open loops visible.</h2></div><CircleDashed className="size-5 text-accent" /></div>
            <div className="milestone-grid mt-6">
              <Milestone state="done" kicker="Completed" title="Forums reached zero" detail="115 → 0 after a reviewed, exact-scope cleanup." />
              <Milestone state="done" kicker="Completed" title="Social reached zero" detail="76 → 0 while retaining job-relevant exceptions elsewhere." />
              <Milestone state="watch" kicker="Monitor" title="Faithlife recurrence" detail="A post-opt-out digest was preserved as evidence; settings remain the next read-only check." />
              <Milestone state="watch" kicker="Pending proof" title="Provider confirmations" detail="Several unsubscribe requests still need authoritative action-time confirmation." />
            </div>
          </article>
        </div>

        <footer className="mt-7 flex flex-col justify-between gap-2 border-t border-white/8 pt-5 text-[11px] text-muted-foreground sm:flex-row">
          <p>Source: Inbox Zero Dashboard · vault snapshot through Sep 1, 2026</p>
          <p>Counts are evidence-backed snapshots, not a live Gmail connection.</p>
        </footer>
      </section>
    </main>
  );
}

function Guard({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return <div className="guard-row"><span>{icon}</span><div><p>{title}</p><small>{detail}</small></div></div>;
}

function Milestone({ state, kicker, title, detail }: { state: 'done' | 'watch'; kicker: string; title: string; detail: string }) {
  return <div className={`milestone ${state}`}><div className="milestone-mark">{state === 'done' ? <CheckCircle2 /> : <CircleDashed />}</div><div><p className="milestone-kicker">{kicker}</p><h3>{title}</h3><small>{detail}</small></div></div>;
}
