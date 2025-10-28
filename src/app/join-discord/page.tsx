"use client";

import { useEffect } from "react";

export default function JoinDiscord() {

  useEffect(() => {
    window.location.href = "https://dub.sh/context-community";
  }, []);

  return <p>Redirecting to Discord…</p>;
}