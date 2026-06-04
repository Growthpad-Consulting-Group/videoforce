"use client";

import { useEffect, useState } from "react";

/** Canonical origin for share links during SSR and the first client paint. */
export const CANONICAL_SITE_URL = "https://videoforce.co.ke";

export function useShareUrl() {
  const [url, setUrl] = useState(CANONICAL_SITE_URL);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return url;
}
