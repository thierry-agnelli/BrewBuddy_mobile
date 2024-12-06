const config = {
  dev: {
    API_URL: "http://localhost:8000",
  },
  prod: {
    API_URL: "http://api-prod.com",
  },
};

let env;

if (__DEV__) env = config.dev;
else env = config.prod;

/* Exports */
export { env };
