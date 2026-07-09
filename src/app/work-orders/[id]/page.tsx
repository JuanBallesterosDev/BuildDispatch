import Link from "next/link";
import { notFound } from "next/navigation";
import { getCurrentUserContext } from "@/features/auth/user-context";
import { roleLabels } from "@/features/auth/permissions";
import {
  canGenerateServiceReports,
  canUpdateFieldWork,
} from "@/features/auth/policies";
import { getWorkOrderById, getMaterialsForOrganization } from "@/features/work-orders/data";
import { addFieldNoteAction, logMaterialUsageAction, completeWorkOrderAction, generateServiceReportAction } from "@/features/work-orders/actions";

type WorkOrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function WorkOrderDetailPage({
  params,
}: WorkOrderDetailPageProps) {
  const { id } = await params;
  const context = await getCurrentUserContext();
  const workOrder = await getWorkOrderById(context.organization.id, id);
  const materials = await getMaterialsForOrganization(context.organization.id);

  if (!workOrder) {
    notFound();
  }

  const assignedTo =
    workOrder.assignments.map((assignment) => assignment.user.name).join(", ") ||
    "Unassigned";

  const canUpdateFieldWorkForUser = canUpdateFieldWork(context.role);

  const isCompleted = workOrder.status === "COMPLETED";

  const canGenerateReportsForUser = canGenerateServiceReports(context.role);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                BuildDispatch
              </p>
              <h1 className="mt-2 text-2xl font-semibold">{workOrder.title}</h1>
              <p className="mt-1 text-sm text-slate-500">
                {workOrder.client.name} · {workOrder.jobSite.name}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Signed in as{" "}
                <span className="font-medium text-slate-700">
                  {context.user.name}
                </span>{" "}
                ·{" "}
                <span className="font-medium text-slate-700">
                  {roleLabels[context.role]}
                </span>
              </p>
            </div>

            {canUpdateFieldWorkForUser && !isCompleted ? (
              <form action={completeWorkOrderAction}>
                <input name="workOrderId" type="hidden" value={workOrder.id} />
                <button
                  className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
                  type="submit"
                >
                  Mark complete
                </button>
              </form>
            ) : null}

            {canGenerateReportsForUser && isCompleted ? (
              <form action={generateServiceReportAction}>
                <input name="workOrderId" type="hidden" value={workOrder.id} />
                <button
                  className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                  type="submit"
                >
                  Generate report
                </button>
              </form>
            ) : null}

            <div className="flex flex-wrap gap-2">
              <Link
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                href="/work-orders"
              >
                Work orders
              </Link>
              <Link
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                href="/"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </header>

        <section className="mb-6 grid gap-4 md:grid-cols-4">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Status</p>
            <p className="mt-3 text-lg font-semibold text-slate-950">
              {workOrder.status.replaceAll("_", " ")}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Priority</p>
            <p className="mt-3 text-lg font-semibold text-slate-950">
              {workOrder.priority}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Assigned to</p>
            <p className="mt-3 text-lg font-semibold text-slate-950">
              {assignedTo}
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-slate-500">Scheduled</p>
            <p className="mt-3 text-lg font-semibold text-slate-950">
              {workOrder.scheduledFor
                ? workOrder.scheduledFor.toLocaleDateString("en-CA")
                : "Not scheduled"}
            </p>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Description</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {workOrder.description || "No description provided."}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Field notes</h2>

              {canUpdateFieldWorkForUser ? (
                <form action={addFieldNoteAction} className="mt-4 space-y-3">
                  <input name="workOrderId" type="hidden" value={workOrder.id} />

                  <textarea
                    className="block min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    name="body"
                    placeholder="Add site update, issue found, work completed, or follow-up needed."
                    required
                  />

                  <button
                    className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                    type="submit"
                  >
                    Add field note
                  </button>
                </form>
              ) : null}

              {workOrder.fieldNotes.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500">
                  No field notes yet.
                </p>
              ) : (
                <div className="mt-4 divide-y divide-slate-100">
                  {workOrder.fieldNotes.map((note) => (
                    <article className="py-4" key={note.id}>
                      <p className="text-sm leading-6 text-slate-700">
                        {note.body}
                      </p>
                      <p className="mt-2 text-xs text-slate-500">
                        {note.author.name} ·{" "}
                        {note.createdAt.toLocaleDateString("en-CA")}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Job site</h2>
              <p className="mt-3 text-sm font-medium text-slate-700">
                {workOrder.jobSite.name}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {workOrder.jobSite.address}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {[workOrder.jobSite.city, workOrder.jobSite.province]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Material usage</h2>

              {canUpdateFieldWorkForUser ? (
                <form action={logMaterialUsageAction} className="mt-4 space-y-3">
                  <input name="workOrderId" type="hidden" value={workOrder.id} />

                  <select
                    className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    name="materialId"
                    required
                  >
                    <option value="">Select material</option>
                    {materials.map((material) => (
                      <option key={material.id} value={material.id}>
                        {material.name} ({material.quantityOnHand} {material.unit} available)
                      </option>
                    ))}
                  </select>

                  <input
                    className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    min="1"
                    name="quantity"
                    placeholder="Quantity used"
                    type="number"
                    required
                  />

                  <button
                    className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                    type="submit"
                  >
                    Log material
                  </button>
                </form>
              ) : null}

              {workOrder.materialUsages.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500">
                  No materials logged yet.
                </p>
              ) : (
                <div className="mt-4 space-y-3">
                  {workOrder.materialUsages.map((usage) => (
                    <div
                      className="rounded-md border border-slate-200 bg-slate-50 p-3"
                      key={usage.id}
                    >
                      <p className="text-sm font-medium text-slate-700">
                        {usage.material.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        Quantity: {usage.quantity} {usage.material.unit}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              {workOrder.serviceReports.length === 0 ? (
                <p className="mt-3 text-sm text-slate-500">No reports generated yet.</p>
              ) : (
                <div className="mt-4 space-y-3">
                  {workOrder.serviceReports.map((report) => (
                    <div
                      className="rounded-md border border-slate-200 bg-slate-50 p-3"
                      key={report.id}
                    >
                      <p className="text-sm font-medium text-slate-700">
                        Generated {report.createdAt.toLocaleDateString("en-CA")}
                      </p>
                      <pre className="mt-3 whitespace-pre-wrap text-xs leading-5 text-slate-600">
                        {report.summary}
                      </pre>
                      <Link
                        className="mt-3 inline-flex rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        href={`/work-orders/${workOrder.id}/report.pdf`}
                        target="_blank"
                      >
                        Download PDF
                      </Link>
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-3 text-sm text-slate-500">
                {workOrder.serviceReports.length} report
                {workOrder.serviceReports.length === 1 ? "" : "s"} generated.
              </p>
            </div>
          </aside>
        </section>
      </section>
    </main>
  );
}