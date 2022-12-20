// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";

function init() {
  // Sentry.init({
  // dsn: "https://10f11935dbae488eb89bee658739a487@o1160449.ingest.sentry.io/6244949",
  // integrations: [new BrowserTracing()],
  // // Set tracesSampleRate to 1.0 to capture 100%
  // // of transactions for performance monitoring.
  // // We recommend adjusting this value in production
  // tracesSampleRate: 1.0,
  // });
}

function log(error) {
  console.error(error);
  // Sentry.captureException(error);
}

export default {
  init,
  log,
};
