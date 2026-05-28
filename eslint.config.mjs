import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  {
    ignores: ["node_modules/**", ".next/**", "Next.js", "reserv/**"],
  },
  ...nextVitals,
  ...nextTs,
];

export default config;
