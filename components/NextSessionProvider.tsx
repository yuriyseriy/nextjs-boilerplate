"use client";

import { SessionProvider } from "next-auth/react";

export const NextSessionProvider: typeof SessionProvider = (props) => (
  <SessionProvider {...props} />
);
