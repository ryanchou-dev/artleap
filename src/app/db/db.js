import { PrismaClient } from "@prisma/client";

export const db = global.prisma || new PrismaClient();

// export prisma instance to be used in other files
if (process.env.NODE_ENV === "development") global.prisma = db;
