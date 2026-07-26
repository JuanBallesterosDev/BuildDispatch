"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  createMaterialAction,
  type CreateMaterialState,
} from "@/features/materials/actions";

const initialState: CreateMaterialState = {};

export function MaterialForm() {
  const [state, formAction, isPending] = useActionState(
    createMaterialAction,
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

        {state.error ? (
          <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
            {state.error}
          </p>
        ) : null}

        <div className="flex justify-end gap-2 border-t border-slate-200 pt-6">
          <Link
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            href="/materials"
          >
            Cancel
          </Link>
          <button
            className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-400"
            disabled={isPending}
            type="submit"
          >
            {isPending ? "Creating..." : "Create material"}
          </button>
        </div>
      </div>
    </form>
  );
}