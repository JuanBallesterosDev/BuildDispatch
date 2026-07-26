import { getCurrentUserContext } from "@/features/auth/user-context";
import { canManageWorkOrders } from "@/features/auth/policies";
import { getWorkOrderFormData } from "@/features/work-orders/data";
import { WorkOrderForm } from "@/features/work-orders/work-order-form";

export default async function NewWorkOrderPage() {
  const context = await getCurrentUserContext();

  const canCreateWorkOrders = canManageWorkOrders(context.role);

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

        <WorkOrderForm clients={clients} assignableUsers={assignableUsers} />
      </section>
    </main>
  );
}