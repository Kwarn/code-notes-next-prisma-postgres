import { Prisma, PrismaClient } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { GraphQLParams, YogaInitialContext } from "graphql-yoga/typings/types";

export interface GraphQLContext extends YogaInitialContext {
  prisma: PrismaClient;
}

export type Context = {
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>;
  params: GraphQLParams<Record<string, any>, Record<string, any>>;
  request: Request;
};

let prisma: PrismaClient;

declare global {
  var prisma: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}
export default prisma;
