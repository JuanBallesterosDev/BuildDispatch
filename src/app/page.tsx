const workOrders = [
  {
    title: "Emergency furnace callback",
    customer: "North York Community Centre",
    assignedTo: "Unassigned",
    status: "Needs attention",
    statusClass: "bg-rose-500/15 text-rose-200 ring-1 ring-rose-400/30",
  },
  {
    title: "Rooftop unit inspection",
    customer: "Maple Plaza - Building A",
    assignedTo: "Maria Gomez",
    status: "In progress",
    statusClass: "bg-sky-500/15 text-sky-200 ring-1 ring-sky-400/30",
  },
  {
    title: "Basement framing walkthrough",
    customer: "Riverbend Townhomes",
    assignedTo: "Build Crew 1",
    status: "Scheduled",
    statusClass: "bg-slate-700 text-slate-200 ring-1 ring-slate-500",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-5 text-slate-100 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="mb-6 rounded-lg border border-white/10 bg-slate-900 p-5 shadow-2xl shadow-black/20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-cyan-300">
                FieldOps AI
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-white">
                Northline Mechanical & Build
              </h1>
              <p className="mt-1 text-sm text-slate-400">
                HVAC and construction work orders for today.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-300">
                New work order
              </button>
              <button className="rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-white/10">
                Review reports
              </button>
            </div>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-slate-900 p-5">
            <p className="text-sm font-medium text-slate-400">Open today</p>
            <p className="mt-3 text-3xl font-semibold text-white">8</p>
            <p className="mt-2 text-sm text-slate-400">
              Work orders scheduled or waiting.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-slate-900 p-5">
            <p className="text-sm font-medium text-slate-400">In progress</p>
            <p className="mt-3 text-3xl font-semibold text-white">3</p>
            <p className="mt-2 text-sm text-slate-400">
              Crews currently on site.
            </p>
          </div>

          <div className="rounded-lg border border-rose-400/20 bg-rose-500/10 p-5">
            <p className="text-sm font-medium text-rose-200">
              Needs attention
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">2</p>
            <p className="mt-2 text-sm text-rose-100/80">
              Unassigned urgent work or missing report details.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-lg border border-white/10 bg-slate-900">
            <div className="border-b border-white/10 p-5">
              <h2 className="text-lg font-semibold text-white">
                Today&apos;s work
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Simple view of the jobs the office needs to manage right now.
              </p>
            </div>

            <div className="divide-y divide-white/10">
              {workOrders.map((order) => (
                <article
                  className="flex flex-col gap-4 p-5 hover:bg-white/[0.03] sm:flex-row sm:items-center sm:justify-between"
                  key={order.title}
                >
                  <div>
                    <h3 className="font-semibold text-white">{order.title}</h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {order.customer}
                    </p>
                    <p className="mt-2 text-sm text-slate-300">
                      Assigned to:{" "}
                      <span className="font-medium text-slate-100">
                        {order.assignedTo}
                      </span>
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-md px-3 py-1 text-sm font-medium ${order.statusClass}`}
                  >
                    {order.status}
                  </span>
                </article>
              ))}
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-white/10 bg-slate-900 p-5">
              <h2 className="text-lg font-semibold text-white">
                Quick actions
              </h2>
              <div className="mt-4 grid gap-2">
                <button className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm font-medium text-slate-100 hover:bg-white/10">
                  Assign urgent work
                </button>
                <button className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm font-medium text-slate-100 hover:bg-white/10">
                  Add material usage
                </button>
                <button className="rounded-md border border-white/10 bg-white/[0.03] px-4 py-3 text-left text-sm font-medium text-slate-100 hover:bg-white/10">
                  Generate service report
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-amber-300/20 bg-amber-400/10 p-5">
              <h2 className="text-lg font-semibold text-amber-100">
                Material alert
              </h2>
              <p className="mt-2 text-sm text-amber-100/80">
                MERV 13 filters are low. Two scheduled HVAC jobs may need them
                this week.
              </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-slate-900 p-5">
              <h2 className="text-lg font-semibold text-white">Reports</h2>
              <p className="mt-2 text-sm text-slate-400">
                4 completed jobs are waiting for photo review before being sent
                to clients.
              </p>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}
