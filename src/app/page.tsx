import { getCurrentUserContext } from "@/features/auth/user-context";
import { getDashboardData } from "@/features/dashboard/data";
import { logoutAction } from "@/features/auth/actions";
import { roleLabels } from "@/features/auth/permissions";
import {
  canManageWorkOrders,
  canUpdateFieldWork,
  isReadOnlyRole,
} from "@/features/auth/policies";
import Link from "next/link";


export default async function Home() {
  const context = await getCurrentUserContext();
  const organization = await getDashboardData(context.organization.id);
  const canManageWorkOrdersForUser = canManageWorkOrders(context.role);
  const canUpdateFieldWorkForUser = canUpdateFieldWork(context.role);
  const isReadOnly = isReadOnlyRole(context.role);

  if(!organization){
    return(
      <main className="min-h-screen bg-slate-50 p-6 text-slate-950">
        <section className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Demo data not found</h1>
          <p className="mt-2 text-slate-600">
            Run<code className="rounded bg-slate-100 px-1">npm run db:seed</code>{" "}
            to create the BuildDispatch demo workspace.
          </p>
        </section>
      </main>
    )
  }
  
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-5 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                BuildDispatch
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-950">
                {organization.name}
              </h1>
              <p className="mt-1 text-sm text-slate-500">
                HVAC and construction work orders for today.
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Signed in as{" "}
                <span className="font-medium text-slate-700">{context.user.name}</span> ·{" "}
                <span className="font-medium text-slate-700">
                  {roleLabels[context.role]}
                </span>
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {canManageWorkOrdersForUser ? (
                <>
                  <Link
                    className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                    href="/work-orders/new"
                  >
                    New work order
                  </Link>
                  <Link
                    className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                    href="/work-orders"
                  >
                    View work orders
                  </Link>
                </>
              ) : null}
              <form action={logoutAction}>
                <button
                  className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  type="submit"
                >
                  Sign out
                </button>
              </form>
            </div>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Open today</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">8</p>
            <p className="mt-2 text-sm text-slate-500">
              Work orders scheduled or waiting.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">In progress</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">3</p>
            <p className="mt-2 text-sm text-slate-500">
              Crews currently on site.
            </p>
          </div>

          <div className="rounded-lg border border-rose-200 bg-rose-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-rose-700">
              Needs attention
            </p>
            <p className="mt-3 text-3xl font-semibold text-rose-950">2</p>
            <p className="mt-2 text-sm text-rose-700">
              Unassigned urgent work or missing report details.
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_340px]">
          <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 p-5">
              <h2 className="text-lg font-semibold text-slate-950">
                Today&apos;s work
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Simple view of the jobs the office needs to manage right now.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {organization.workOrders.map((order) => {
                const assignedTo = order.assignments.map((assignment) => assignment.user.name).join(", ") || "Unassigned";

                return(
                  <article
                  className="flex flex-col gap-4 p-5 hover:bg-slate-50 sm:flex-row sm:items-center sm:justify-between"
                  key={order.id}
                  >
                    <div>
                      <h3 className="font-semibold text-slate-950">
                        {order.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {order.client.name}
                      </p>
                      <p className="mt-2 text-sm text-slate-600">
                        Assigned to:{" "}
                        <span className="font-medium text-slate-900">
                          {assignedTo}
                        </span>
                      </p>
                    </div>

                    <span
                      className="w-fit rounded-md px-3 py-1 text-sm font-medium"
                    >
                      {order.status.replaceAll("_", " ")}
                    </span>
                  </article>
                )
              })}
                
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">
                {isReadOnly ? "Read-only access" : "Quick actions"}
              </h2>
              {isReadOnly ? (
                <p className="mt-2 text-sm text-slate-500">
                  This role can review work orders and reports, but cannot make operational
                  changes.
                </p>
              ) : (
                <div className="mt-4 grid gap-2">
                  {canManageWorkOrdersForUser ? (
                    <>
                      <Link
                        className="rounded-md border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50"
                        href="/clients/new"
                      >
                        Add client and job site
                      </Link>

                      <button className="rounded-md border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
                        Assign urgent work
                      </button>
                    </>
                    
                  ) : null}

                  {canUpdateFieldWorkForUser ? (
                    <>
                      <button className="rounded-md border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
                        Add field note
                      </button>
                      <button className="rounded-md border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
                        Log material used
                      </button>
                    </>
                  ) : null}

                  {canManageWorkOrdersForUser ? (
                    <button className="rounded-md border border-slate-200 bg-white px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">
                      Generate service report
                    </button>
                  ) : null}
                </div>
              )}
            </div>

            <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-amber-950">
                {organization.materials[0]?.name ?? "No material alerts"} is low. Current
                stock: {organization.materials[0]?.quantityOnHand ?? 0}.
              </h2>
              <p className="mt-2 text-sm text-amber-800">
                MERV 13 filters are low. Two scheduled HVAC jobs may need them
                this week.
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">Reports</h2>
              <p className="mt-2 text-sm text-slate-500">
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
