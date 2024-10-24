const { GraphQLError } = require("graphql");
const JWT = require("jsonwebtoken");

const Secret = process.env.JWT_SECRET || "fallbacksecret";
if (process.env.NODE_ENV !== "production") {
  console.log("JWT Secret:", Secret);
}
const Expiration = "2h";

module.exports = {
  AuthenticationError: new GraphQLError("Could Not Authenticate User", {
    extensions: {
      code: "UNAUTHENTICATED",
    },
  }),
  // Function to decode and verify the JWT token
  decode: function (token) {
    try {
      return JWT.verify(token, Secret); // Verify token using the secret
    } catch (error) {
      console.error("Invalid Token Error:", error.message); // Log errors if the token is invalid
      throw new GraphQLError("Invalid token", {
        extensions: {
          code: "UNAUTHENTICATED",
        },
      });
    }
  },
  // Function to sign and return a new JWT token
  signToken: function ({ email, username, _id }) {
    const Payload = { email, username, _id };
    console.log("Signing token with payload:", Payload); // Log token payload during creation (helpful for debugging)

    try {
      return JWT.sign({ data: Payload }, Secret, { expiresIn: Expiration });
    } catch (error) {
      console.error("Token Signing Error:", error.message); // Log if there's any error during signing
      throw new GraphQLError("Failed to sign token"); // Changed to GraphQLError
    }
  },
};
