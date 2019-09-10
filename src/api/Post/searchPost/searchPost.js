import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    searchPost: async (_, args) =>
      prisma.posts({
        where: {
          OR: [
            // { location_starts_with: args.term },
            // { caption_starts_with: args.term },
            { location_contains: args.term },
            { caption_contains: args.term }
          ]
        }
      })
  }
};
