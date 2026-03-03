export const API_URL_prefix = process.env.NODE_ENV === "development"
  ? "http://localhost:7751"
  : process.env.NEXT_PUBLIC_API_URL_PREFIX!;
