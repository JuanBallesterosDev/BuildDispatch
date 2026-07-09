import Link from "next/link";
import { getCurrentUserContext } from "@/features/auth/user-context";
import { roleLabels } from "@/features/auth/permissions";
import { getMaterials } from "@/features/materials/data";

export default async function MaterialsPage() {
  const context = await getCurrentUserContext();
  const materials = await getMaterials(context.organization.id);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-950 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-6xl">
        <header className="mb-6 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">
                BuildDispatch
              </p>
              <h1 className="mt-2 text-2xl font-semibold">Materials</h1>
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
            </div>
          </div>
        </header>

        <section className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <h2 className="text-lg font-semibold">Inventory</h2>
            <p className="mt-1 text-sm text-slate-500">
              Tenant-scoped material inventory for field work.
            </p>
          </div>

          {materials.length === 0 ? (
            <div className="p-5 text-sm text-slate-500">
              No materials found.
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {materials.map((material) => {
                const isLowStock =
                  material.quantityOnHand <= material.reorderLevel;

                return (
                  <article
                    className="grid gap-4 p-5 lg:grid-cols-[1.2fr_0.7fr_0.7fr_0.6fr] lg:items-center"
                    key={material.id}
                  >
                    <div>
                      <p className="font-semibold text-slate-950">
                        {material.name}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        SKU: {material.sku ?? "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        On hand
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        {material.quantityOnHand} {material.unit}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Reorder level
                      </p>
                      <p className="mt-1 text-sm text-slate-700">
                        {material.reorderLevel} {material.unit}
                      </p>
                    </div>

                    <div>
                      <span
                        className={
                          isLowStock
                            ? "rounded-md bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700 ring-1 ring-amber-200"
                            : "rounded-md bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700 ring-1 ring-emerald-200"
                        }
                      >
                        {isLowStock ? "Low stock" : "In stock"}
                      </span>
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