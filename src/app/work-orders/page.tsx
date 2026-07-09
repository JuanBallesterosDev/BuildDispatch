import Link from "next/link";
import { getCurrentUserContext } from "@/features/auth/user-context";
import { roleLabels } from "@/features/auth/permissions";
import { canManageWorkOrders } from "@/features/auth/policies";
import { getWorkOrders } from "@/features/work-orders/data";

export default async function WorkOrdersPage() {
  const context = await getCurrentUserContext();
  const workOrders = await getWorkOrders(context.organization.id);

  const canManageWorkOrdersForUser = canManageWorkOrders(context.role);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                BuildDispatch
              </p>
              <h1 className="mt-2 text-2xl font-semibold">Work orders</h1>
              <p className="mt-1 text-sm text-slate-500">
                {context.organization.name} · {roleLabels[context.role]}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                href="/"
              >
                Dashboard
              </Link>

              {canManageWorkOrdersForUser ? (
                <Link
                  className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                  href="/work-orders/new"
                >
                  New work order
                </Link>
              ) : null}
            </div>
          </div>
        </header>

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-lg font-semibold">All work orders</h2>
            <p className="mt-1 text-sm text-slate-500">
              Tenant-scoped list of work orders for the current organization.
            </p>
          </div>

          {workOrders.length === 0 ? (
            <div className="p-5 text-sm text-slate-500">
              No work orders found.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {workOrders.map((order) => {
                const assignedTo =
                  order.assignments
                    .map((assignment) => assignment.user.name)
                    .join(", ") || "Unassigned";

                return (
                  <article
                    className="grid gap-4 p-5 lg:grid-cols-[1.2fr_0.8fr_0.6fr_0.6fr] lg:items-center"
                    key={order.id}
                  >
                    <div>
                      <Link
                        className="font-semibold text-slate-950 hover:text-blue-700"
                        href={`/work-orders/${order.id}`}
                      >
                        {order.title}
                      </Link>
                      <p className="mt-1 text-sm text-slate-500">
                        {order.client.name} · {order.jobSite.name}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Assigned
                      </p>
                      <p className="mt-1 text-sm text-slate-700">{assignedTo}</p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Status
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        {order.status.replaceAll("_", " ")}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Priority
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        {order.priority}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </section>
    </main>
  );
}