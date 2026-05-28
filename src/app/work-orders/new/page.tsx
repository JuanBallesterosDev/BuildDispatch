import { getCurrentUserContext } from "@/features/auth/user-context";
import { hasAnyRole } from "@/features/auth/permissions";
import { getWorkOrderFormData } from "@/features/work-orders/data";
import Link from "next/link";
import { createWorkOrderAction } from "@/features/work-orders/actions";

export default async function NewWorkOrderPage() {
  const context = await getCurrentUserContext();

  const canCreateWorkOrders = hasAnyRole(context.role, [
    "OWNER",
    "ADMIN",
    "DISPATCHER",
  ]);

  if (!canCreateWorkOrders) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 text-slate-950">
        <section className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Access denied</h1>
          <p className="mt-2 text-slate-600">
            Your role does not allow you to create work orders.
          </p>
        </section>
      </main>
    );
  }

 const { clients, assignableUsers } = await getWorkOrderFormData(
    context.organization.id,
  );

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            BuildDispatch
          </p>
          <h1 className="mt-2 text-2xl font-semibold">New work order</h1>
          <p className="mt-1 text-sm text-slate-500">
            Create a work order for {context.organization.name}.
          </p>
        </div>

        <form
          action={createWorkOrderAction}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Title
              </label>
              <input
                className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                name="title"
                placeholder="Emergency furnace callback"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Client
              </label>
              <select
                className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                name="clientId"
                required
              >
                <option value="">Select client</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Assign to
                </label>
                <select
                  className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  name="assignedUserId"
                >
                  <option value="">Leave unassigned</option>
                  {assignableUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
              <label className="block text-sm font-medium text-slate-700">
                Job site
              </label>
              <select
                className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                name="jobSiteId"
                required
              >
                <option value="">Select job site</option>
                {clients.flatMap((client) =>
                  client.jobSites.map((site) => (
                    <option key={site.id} value={site.id}>
                      {client.name} - {site.name}
                    </option>
                  )),
                )}
              </select>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Priority
                </label>
                <select
                  className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  name="priority"
                  defaultValue="NORMAL"
                >
                  <option value="LOW">Low</option>
                  <option value="NORMAL">Normal</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Scheduled date
                </label>
                <input
                  className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  name="scheduledFor"
                  type="date"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">
                Description
              </label>
              <textarea
                className="mt-2 block min-h-28 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                name="description"
                placeholder="Describe the issue, site notes, or requested work."
              />
            </div>

            <div className="flex justify-end gap-2">
              <Link
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                href="/"
              >
                Cancel
              </Link>
              <button
                className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                type="submit"
              >
                Create work order
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}