import type { z } from "zod";
import type { schemaEnv, schemaEnvPrivate } from "~/schemas";

/**
 * Public functionality that will expose all selected variables within global ENV
 * The values are only used for client-side env
 * Never expose the REMIX_SESSION_SECRET or any server/node/non-browser env
 */

export function getEnv(): z.infer<typeof schemaEnv> {
  return {
    NODE_ENV: process.env.NODE_ENV || "development", // development | test | production
    NODE_ENV: process.env.NODE_ENV || "unknown", // local | development | test | staging | production
    VERCEL: Boolean(process.env.VERCEL) || false,

    // REMIX variables are mostly private
    // DATABASE_URL is private

    UPLOADCARE_PUBLIC_KEY: process.env.UPLOADCARE_PUBLIC_KEY || "not-set",

    MAPBOX_PUBLIC_TOKEN: process.env.MAPBOX_PUBLIC_TOKEN || "not-set",
    GA_MEASUREMENT_ID: process.env.GA_MEASUREMENT_ID || "not-set",
    SENTRY_BROWSER_DSN: process.env.SENTRY_BROWSER_DSN || "not-set",
    POSTHOG_API_HOST: process.env.POSTHOG_API_HOST || "not-set",
    POSTHOG_API_KEY: process.env.POSTHOG_API_KEY || "not-set",
  };
}

export function getEnvPrivate(): z.infer<typeof schemaEnvPrivate> {
  return {
    DATABASE_URL: getEnvServer("DATABASE_URL"),
    REMIX_SESSION_SECRET: getEnvServer("REMIX_SESSION_SECRET"),
    REMIX_APP_NAME: getEnvServer("REMIX_APP_NAME"),
    REMIX_APP_EMAIL: getEnvServer("REMIX_APP_EMAIL"),
    APP_URL: getEnvServer("APP_URL"),
    STRIPE_SECRET_KEY: getEnvServer("STRIPE_SECRET_KEY"),
    RESEND_API_KEY: getEnvServer("RESEND_API_KEY"),
    API_ACTIVIX: getEnvServer("API_ACTIVIX"),
    MICRO_APP_ID: getEnvServer("MICRO_APP_ID"),
    MICRO_TENANT_ID: getEnvServer("MICRO_TENANT_ID"),
    MICRO_CLIENT_SECRET: getEnvServer("MICRO_CLIENT_SECRET"),
    TWILIO_ACCOUNTSID: getEnvServer("TWILIO_ACCOUNTSID"),
    TWILIO_AUTHTOKEN: getEnvServer("TWILIO_AUTHTOKEN"),
    REDIRECT_URI: getEnvServer("REDIRECT_URI"),
  };
}

/**
 * Only use for server-side env
 */

export function getEnvServer(key: string) {
  return getEnvRequired(process.env, key);
}

export function getEnvRequired(
  obj: Record<string, string | undefined>,
  key: string
) {
  const envVal = obj[key];

  if (!envVal) {
    throw new Error(`${key} is a required env variable`);
  }

  return envVal;
}
