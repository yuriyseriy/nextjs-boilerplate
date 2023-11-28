declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      DATABASE_URL: string;
      NEXTAUTH_URL: string;
      NEXTAUTH_SECRET: string;
      NEXT_PUBLIC_URL: string;
      NEXT_SITE_NAME: string;
      NEXT_SITE_EMAIL: string;
      RESEND_API_KEY: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
