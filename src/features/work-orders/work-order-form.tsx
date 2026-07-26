"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  createWorkOrderAction,
  type CreateWorkOrderState,
} from "@/features/work-orders/actions";

type WorkOrderFormProps = {
  clients: {
    id: string;
    name: string;
    jobSites: {
      id: string;
      name: string;
    }[];
  }[];
  assignableUsers: {
    id: string;
    name: string;
  }[];
};

const initialState: CreateWorkOrderState = {};

export function WorkOrderForm({
  clients,
  assignableUsers,
}: WorkOrderFormProps) {
  const [state, formAction, isPending] = useActionState(
    createWorkOrderAction,
    initialState,
  );

  return (
    <form
      action={formAction}
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

        {state.error ? (
          <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {state.error}
          </p>
        ) : null}

        <div className="flex justify-end gap-2">
          <Link
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            href="/"
          >
            Cancel
          </Link>
          <button
            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Creating..." : "Create work order"}
          </button>
        </div>
      </div>
    </form>
  );
}