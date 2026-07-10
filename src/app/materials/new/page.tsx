import Link from "next/link";
import { canManageWorkOrders } from "@/features/auth/policies";
import { getCurrentUserContext } from "@/features/auth/user-context";
import { createMaterialAction } from "@/features/materials/actions";

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

        <form
          action={createMaterialAction}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700">
                Material name
              </label>
              <input
                className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                name="name"
                placeholder="MERV 13 filters"
                required
              />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  SKU
                </label>
                <input
                  className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  name="sku"
                  placeholder="FLT-MERV13-20X25"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Unit
                </label>
                <input
                  className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  name="unit"
                  placeholder="unit, box, piece"
                  required
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Quantity on hand
                </label>
                <input
                  className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  min="0"
                  name="quantityOnHand"
                  type="number"
                  defaultValue="0"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Reorder level
                </label>
                <input
                  className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                  min="0"
                  name="reorderLevel"
                  type="number"
                  defaultValue="0"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-200 pt-6">
              <Link
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                href="/materials"
              >
                Cancel
              </Link>
              <button
                className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
                type="submit"
              >
                Create material
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}