export default function Home(){
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 py-8">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
              FieldOps AI
            </p>
            <h1 className="mt-2 text-2xl font-semibold">
              Multi-tenant field service operations
            </h1>
          </div>

          <nav className="hidden gap-6 text-sm text-slate-300 sm:flex">
            <a className="hover:text-white" href="#workflow">
              Workflow
            </a>
            <a className="hover:text-white" href="#modules">
              Modules
            </a>
            <a className="hover:text-white" href="#architecture">
              Architecture
            </a>
          </nav>
        </header>

        <div className="grid flex-1 items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <section>
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-cyan-300">
              SaaS for service companies
            </p>

            <h2 className="mt-5 max-w-3xl text-5xl font-semibold leading-tight text-white">
              Manage technicians, jobs, inventory, and client reports from one
              operating system.
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              FieldOps AI helps small field service companies replace scattered
              calls, spreadsheets, and messages with a secure workflow for
              dispatching work, tracking field updates, and producing
              professional service reports.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-md border border-cyan-300/30 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100">
                Multi-tenant SaaS
              </span>
              <span className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200">
                Role-based access
              </span>
              <span className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200">
                Technician mobile workflow
              </span>
              <span className="rounded-md border border-white/15 bg-white/5 px-3 py-2 text-sm text-slate-200">
                PDF service reports
              </span>
            </div>
          </section>

          <section className="rounded-lg border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-cyan-950/30">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <p className="text-sm text-slate-400">Today&apos;s operations</p>
                <h3 className="mt-1 text-xl font-semibold">
                  North Toronto HVAC
                </h3>
              </div>
              <span className="rounded-md bg-emerald-400/10 px-3 py-1 text-sm font-medium text-emerald-300">
                Active
              </span>
            </div>

            <div className="grid gap-4 py-6 sm:grid-cols-3">
              <div className="rounded-md bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Open jobs</p>
                <p className="mt-2 text-3xl font-semibold">18</p>
              </div>
              <div className="rounded-md bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Technicians</p>
                <p className="mt-2 text-3xl font-semibold">7</p>
              </div>
              <div className="rounded-md bg-slate-900 p-4">
                <p className="text-sm text-slate-400">Low stock</p>
                <p className="mt-2 text-3xl font-semibold">4</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="rounded-md border border-white/10 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">AC repair inspection</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Assigned to Maria Gomez
                    </p>
                  </div>
                  <span className="text-sm text-cyan-300">In progress</span>
                </div>
              </div>

              <div className="rounded-md border border-white/10 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Furnace maintenance</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Waiting for dispatch
                    </p>
                  </div>
                  <span className="text-sm text-amber-300">Unassigned</span>
                </div>
              </div>

              <div className="rounded-md border border-white/10 bg-slate-900/80 p-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-medium">Commercial filter replacement</p>
                    <p className="mt-1 text-sm text-slate-400">
                      Report ready for review
                    </p>
                  </div>
                  <span className="text-sm text-emerald-300">Completed</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}