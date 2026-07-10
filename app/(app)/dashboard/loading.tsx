export default function DashboardLoading() {
  return <div className="animate-pulse space-y-6" aria-label="Loading dashboard"><div className="h-24 max-w-md rounded-2xl bg-[var(--muted-surface)]" /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, index) => <div key={index} className="h-36 rounded-2xl bg-[var(--muted-surface)]" />)}</div><div className="grid gap-6 xl:grid-cols-[1.65fr_.8fr]"><div className="h-96 rounded-2xl bg-[var(--muted-surface)]" /><div className="h-96 rounded-2xl bg-[var(--muted-surface)]" /></div></div>;
}
