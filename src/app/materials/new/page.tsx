import { canManageWorkOrders } from "@/features/auth/policies";
import { getCurrentUserContext } from "@/features/auth/user-context";
import { MaterialForm } from "@/features/materials/material-form";

export default async function NewMaterialPage() {
  const context = await getCurrentUserContext();

  if (!canManageWorkOrders(context.role)) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 text-slate-950">
        <section className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Access denied</h1>
          <p className="mt-2 text-slate-600">
            Your role does not allow you to create materials.
          </p>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
            BuildDispatch
          </p>
          <h1 className="mt-2 text-2xl font-semibold">New material</h1>
          <p className="mt-1 text-sm text-slate-500">
            Add inventory for {context.organization.name}.
          </p>
        </div>

        
        <MaterialForm/>
      </section>
    </main>
  );
}