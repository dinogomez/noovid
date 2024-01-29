declare namespace NodeJS {
  interface ProcessEnv {
    DATABASE_URL: string;
    SESSION_KEY: string;
    SESSION_NAME: string;
  }
}
