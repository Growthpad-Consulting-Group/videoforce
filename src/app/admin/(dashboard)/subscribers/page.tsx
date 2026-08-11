"use client";

import { addSubscriber, deleteSubscriber, listSubscribers } from "@/lib/admin-api";
import type { Subscriber } from "@/types";
import { useEffect, useState } from "react";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" });
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[] | null>(null);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [adding, setAdding] = useState(false);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const load = async () => {
    try {
      setSubscribers(await listSubscribers());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load subscribers");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setAdding(true);
    setError("");
    try {
      await addSubscriber(email.trim());
      setEmail("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add subscriber");
    } finally {
      setAdding(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSubscriber(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete subscriber");
    } finally {
      setConfirmingId(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#333]">Subscribers</h1>
        <p className="mt-2 text-sm text-[#666]">
          Everyone who has signed up for the email newsletter.
        </p>
      </div>

      <form onSubmit={handleAdd} className="mb-6 flex max-w-md gap-3">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="new-subscriber@email.com"
          className="flex-1 border border-[#ddd] px-4 py-2.5 text-sm outline-none focus:border-brand-purple"
        />
        <button
          type="submit"
          disabled={adding}
          className="bg-brand-purple px-5 py-2.5 text-xs font-semibold uppercase tracking-[2px] text-white hover:bg-brand-purple2 disabled:opacity-50 cursor-pointer"
        >
          {adding ? "Adding…" : "Add"}
        </button>
      </form>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {subscribers === null ? (
        <p className="text-sm text-[#666]">Loading…</p>
      ) : subscribers.length === 0 ? (
        <p className="text-sm text-[#666]">No subscribers yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#e5e5e5] bg-white shadow-sm">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="border-b border-[#eee] bg-[#fafafa] text-[10px] uppercase tracking-[2px] text-[#999]">
              <tr>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Subscribed</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee]">
              {subscribers.map((s) => (
                <tr key={s.id} className="hover:bg-[#fafafa]">
                  <td className="px-5 py-4 font-medium text-[#333]">{s.email}</td>
                  <td className="px-5 py-4 text-[#666] whitespace-nowrap">
                    {formatDate(s.createdAt)}
                  </td>
                  <td className="px-5 py-4 text-right">
                    {confirmingId === s.id ? (
                      <div className="flex items-center justify-end gap-3">
                        <span className="text-xs text-red-600">Remove?</span>
                        <button
                          type="button"
                          onClick={() => handleDelete(s.id)}
                          className="text-xs font-semibold uppercase text-red-600 hover:underline cursor-pointer"
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmingId(null)}
                          className="text-xs uppercase text-[#999] hover:underline cursor-pointer"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmingId(s.id)}
                        className="text-xs uppercase tracking-wider text-red-500 hover:text-red-700 cursor-pointer"
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
