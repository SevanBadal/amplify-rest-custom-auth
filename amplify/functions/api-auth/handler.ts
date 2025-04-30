import type {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerEvent,
} from "aws-lambda";

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  const token = event.authorizationToken?.split(" ")[1]; // expect "Bearer <token>" for example...
  if (!token) {
    throw new Error("Unauthorized"); // No token provided
  }

  // Add additional checks here, e.g., verify issuer or claims in payload

  // Build an IAM policy allowing or denying access. Here we allow if verification passed.
  return {
    principalId: "user-sub", // sub (user ID from token)
    policyDocument: {
      Version: "2012-10-17",
      Statement: [
        {
          Action: "execute-api:Invoke",
          Effect: "Allow",
          Resource: event.methodArn, // authorize the request to the invoked route
        },
      ],
    },
    context: {
      // Pass additional context to your API Lambda via the authorizer context if needed
      userId: "user-sub",
      email: "user-email",
      // ...any other custom claims from the token
    },
  };
};
