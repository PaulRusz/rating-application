const { GraphQLError } = require("graphql");
const JWT = require("jsonwebtoken");

const Secret = process.env.JWT_SECRET || "fallbacksecret";
const Expiration = "2h";

module.exports = {
  AuthenticationError: new GraphQLError("Could Not Authenticate User", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  decode: function (token) {
    return JWT.verify(token, Secret);
  },
  signToken: function ({ email, username, _id }) {
    const Payload = { email, username, _id };
    return JWT.sign({ data: Payload }, Secret, { expiresIn: Expiration });
  },
};
