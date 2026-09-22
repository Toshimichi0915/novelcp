import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ponytail: Prisma loads its native engine via dynamic require, invisible to file tracing
  outputFileTracingIncludes: {
    "**": ["../../node_modules/.pnpm/@prisma+client*/node_modules/.prisma/client/libquery_engine*.so.node"],
  },
};

export default nextConfig;
