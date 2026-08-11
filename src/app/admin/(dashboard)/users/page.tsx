"use client";

import { createAdminUser, deleteAdminUser, listAdminUsers } from "@/lib/admin-api";
import type { AdminUser } from "@/types";
import { useEffect, useState } from "react";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" });
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creating, setCreating] = useState(false);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState("");

  const load = async () => {
    try {
      setUsers(await listAdminUsers());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load admin users");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setCreating(true);
    try {
      await createAdminUser(email.trim(), password, name.trim());
      setName("");
      setEmail("");
      setPassword("");
      await load();
    } catch (err) {
      setFormError(err instanceof Error ? err.message : "Failed to create admin");
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    setDeleteError("");
    try {
      await deleteAdminUser(id);
      await load();
    } catch (err) {
      setDeleteError(err instanceof Error ? err.message : "Failed to delete admin");
    } finally {
      setConfirmingId(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#333]">Admin users</h1>
        <p className="mt-2 text-sm text-[#666]">Manage who can log in to this dashboard.</p>
      </div>

      <form onSubmit={handleCreate} className="mb-8 max-w-md space-y-3 rounded-lg border border-[#e5e5e5] bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[2px] text-[#999]">Add admin</p>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full name"
          className="w-full border border-[#ddd] px-4 py-2.5 text-sm outline-none focus:border-brand-purple"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full border border-[#ddd] px-4 py-2.5 text-sm outline-none focus:border-brand-purple"
        />
        <input
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 8 characters)"
          className="w-full border border-[#ddd] px-4 py-2.5 text-sm outline-none focus:border-brand-purple"
        />
        {formError && <p className="text-sm text-red-600">{formError}</p>}
        <button
          type="submit"
          disabled={creating}
          className="bg-brand-purple px-5 py-2.5 text-xs font-semibold uppercase tracking-[2px] text-white hover:bg-brand-purple2 disabled:opacity-50 cursor-pointer"
        >
          {creating ? "Creating…" : "Create admin"}
        </button>
      </form>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}
      {deleteError && <p className="mb-4 text-sm text-red-600">{deleteError}</p>}

      {users === null ? (
        <p className="text-sm text-[#666]">Loading…</p>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#e5e5e5] bg-white shadow-sm">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="border-b border-[#eee] bg-[#fafafa] text-[10px] uppercase tracking-[2px] text-[#999]">
              <tr>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Added</th>
                <th className="px-5 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eee]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#fafafa]">
                  <td className="px-5 py-4 font-medium text-[#333]">{u.name}</td>
                  <td className="px-5 py-4 text-[#666]">{u.email}</td>
                  <td className="px-5 py-4 text-[#666] whitespace-nowrap">{formatDate(u.createdAt)}</td>
                  <td className="px-5 py-4 text-right">
                    {confirmingId === u.id ? (
                      <div className="flex items-center justify-end gap-3">
                        <span className="text-xs text-red-600">Remove?</span>
                        <button
                          type="button"
                          onClick={() => handleDelete(u.id)}
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
                        onClick={() => setConfirmingId(u.id)}
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
