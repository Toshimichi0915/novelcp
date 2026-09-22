import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // keep Prisma external so its native query engine ships with the function bundle
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
