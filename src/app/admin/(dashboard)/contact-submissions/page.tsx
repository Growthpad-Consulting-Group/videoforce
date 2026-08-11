"use client";

import { deleteSubmission, listContactSubmissions, markSubmissionStatus } from "@/lib/admin-api";
import type { ContactSubmission } from "@/types";
import { useEffect, useState } from "react";

function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-KE", { year: "numeric", month: "long", day: "numeric" });
}

export default function AdminContactSubmissionsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[] | null>(null);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmingId, setConfirmingId] = useState<string | null>(null);

  const load = async () => {
    try {
      setSubmissions(await listContactSubmissions());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load submissions");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleExpand = async (submission: ContactSubmission) => {
    const opening = expandedId !== submission.id;
    setExpandedId(opening ? submission.id : null);
    if (opening && submission.status === "new") {
      try {
        await markSubmissionStatus(submission.id, "read");
        setSubmissions((prev) =>
          prev?.map((s) => (s.id === submission.id ? { ...s, status: "read" } : s)) ?? null
        );
      } catch {
        // non-critical — leave status as-is
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSubmission(id);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete submission");
    } finally {
      setConfirmingId(null);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-[#333]">Contact submissions</h1>
        <p className="mt-2 text-sm text-[#666]">Messages sent through the website contact form.</p>
      </div>

      {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

      {submissions === null ? (
        <p className="text-sm text-[#666]">Loading…</p>
      ) : submissions.length === 0 ? (
        <p className="text-sm text-[#666]">No submissions yet.</p>
      ) : (
        <div className="space-y-3">
          {submissions.map((s) => (
            <div key={s.id} className="rounded-lg border border-[#e5e5e5] bg-white shadow-sm">
              <button
                type="button"
                onClick={() => handleExpand(s)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {s.status === "new" && (
                    <span className="h-2 w-2 rounded-full bg-brand-pink shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-[#333]">
                      {s.name} <span className="text-[#999] font-normal">— {s.subject}</span>
                    </p>
                    <p className="text-xs text-[#999]">{s.email}</p>
                  </div>
                </div>
                <span className="text-xs text-[#999] whitespace-nowrap">{formatDate(s.createdAt)}</span>
              </button>

              {expandedId === s.id && (
                <div className="border-t border-[#eee] px-5 py-4 text-sm text-[#444] space-y-3">
                  <p><span className="font-semibold text-[#333]">Phone:</span> {s.phone}</p>
                  <p className="whitespace-pre-wrap">{s.comments}</p>
                  <div className="flex items-center gap-4 pt-2">
                    <a
                      href={`mailto:${s.email}`}
                      className="text-xs uppercase tracking-wider text-brand-purple hover:underline font-semibold"
                    >
                      Reply by email
                    </a>
                    {confirmingId === s.id ? (
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-red-600">Delete?</span>
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
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
