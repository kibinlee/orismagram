import "./env";
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
// import passport from "passport";
// import { sendSecretMail } from "./utils";
import "./passport";
import { authenticateJwt } from "./passport";
import { isAuthenticated } from "./middlewares";

// console.log(process.env.PORT);
// console.log();
// sendSecretMail("kibinlee19k@gmail.com", "123");

const PORT = process.env.PORT || 4000;

const server = new GraphQLServer({
  schema,
  // context: ({ request }) => {
  //   console.log(request.user);
  // }
  context: ({ request }) => ({ request, isAuthenticated })
});
// conext is a way of shaing context between all the graphql resolvers nomatter where they are

server.express.use(logger("dev"));
server.express.use(authenticateJwt);

server.start({ port: PORT }, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
