"use client";

import { deletePost } from "@/lib/admin-api";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  slug: string;
  title: string;
}

export default function DeletePostButton({ slug, title }: Props) {
  const router = useRouter();
  const [confirming, setConfirming] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setLoading(true);
    setError("");
    try {
      await deletePost(slug);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  };

  if (error) {
    return <span className="text-xs text-red-600">{error}</span>;
  }

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-xs text-red-600">Delete &quot;{title}&quot;?</span>
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="text-xs font-semibold uppercase text-red-600 hover:underline cursor-pointer"
        >
          {loading ? "…" : "Yes"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-xs uppercase text-[#999] hover:underline cursor-pointer"
        >
          No
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="text-xs uppercase tracking-wider text-red-500 hover:text-red-700 cursor-pointer"
    >
      Delete
    </button>
  );
}
