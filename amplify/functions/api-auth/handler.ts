import type {
  APIGatewayAuthorizerResult,
  APIGatewayTokenAuthorizerEvent,
} from "aws-lambda";

export const handler = async (
  event: APIGatewayTokenAuthorizerEvent
): Promise<APIGatewayAuthorizerResult> => {
  const token = event.authorizationToken?.split(" ")[1]; // expect "Bearer <token>" for example...

  // Add real checks here, e.g., verify issuer or claims in payload
  if (token !== "valid-token") {
    //  https://repost.aws/questions/QUn63V_IHYRTqynaJ034Fuxw/return-401-unauthorized-response-when-using-lambda-authorizer-with-api-gateway
    throw "Unauthorized"; // 401

    // Or return a Deny Policy which will result in a 403
    return {
      principalId: "unauthorized",
      policyDocument: {
        Version: "2012-10-17",
        Statement: [
          {
            Action: "execute-api:Invoke",
            Effect: "Deny",
            Resource: event.methodArn,
          },
        ],
      },
    };
  }

  // Build an IAM policy allowing access if verification passed
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
