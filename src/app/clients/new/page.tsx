import Link from "next/link";
import { getCurrentUserContext } from "@/features/auth/user-context";
import { hasAnyRole } from "@/features/auth/permissions";
import { createClientAction } from "@/features/clients/actions";

export default async function NewClientPage() {
  const context = await getCurrentUserContext();

  const canCreateClients = hasAnyRole(context.role, [
    "OWNER",
    "ADMIN",
    "DISPATCHER",
  ]);

  if (!canCreateClients) {
    return (
      <main className="min-h-screen bg-slate-50 p-6 text-slate-950">
        <section className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Access denied</h1>
          <p className="mt-2 text-slate-600">
            Your role does not allow you to create clients.
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
          <h1 className="mt-2 text-2xl font-semibold">New client</h1>
          <p className="mt-1 text-sm text-slate-500">
            Add a client and their first job site for {context.organization.name}.
          </p>
        </div>

        <form
          action={createClientAction}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-6">
            <section>
              <h2 className="text-lg font-semibold text-slate-950">
                Client details
              </h2>

              <div className="mt-4 grid gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Client name
                  </label>
                  <input
                    className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    name="clientName"
                    placeholder="North York Community Centre"
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Contact name
                    </label>
                    <input
                      className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      name="contactName"
                      placeholder="Elena Ruiz"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Phone
                    </label>
                    <input
                      className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      name="phone"
                      placeholder="416-555-0142"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    name="email"
                    placeholder="facilities@example.com"
                    type="email"
                  />
                </div>
              </div>
            </section>

            <section className="border-t border-slate-200 pt-6">
              <h2 className="text-lg font-semibold text-slate-950">
                First job site
              </h2>

              <div className="mt-4 grid gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Site name
                  </label>
                  <input
                    className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    name="siteName"
                    placeholder="Main Facility"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Address
                  </label>
                  <input
                    className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    name="address"
                    placeholder="1200 Finch Ave W"
                    required
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      City
                    </label>
                    <input
                      className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      name="city"
                      placeholder="Toronto"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Province
                    </label>
                    <input
                      className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      name="province"
                      placeholder="ON"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700">
                      Postal code
                    </label>
                    <input
                      className="mt-2 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                      name="postalCode"
                      placeholder="M3J 3K1"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700">
                    Site notes
                  </label>
                  <textarea
                    className="mt-2 block min-h-24 w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
                    name="notes"
                    placeholder="Gate code, entrance notes, parking instructions, or safety details."
                  />
                </div>
              </div>
            </section>

            <div className="flex justify-end gap-2 border-t border-slate-200 pt-6">
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
                Create client
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}