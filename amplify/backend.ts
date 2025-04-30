import { defineBackend } from "@aws-amplify/backend";
import { auth } from "./auth/resource";
import { data } from "./data/resource";
import { Duration, Stack } from "aws-cdk-lib";
import {
  AuthorizationType,
  Cors,
  LambdaIntegration,
  RestApi,
  TokenAuthorizer,
} from "aws-cdk-lib/aws-apigateway";
import { apiAuthorizerFunction } from "./functions/api-auth/resource";
import { myApiFunction } from "./functions/api-function/resource";

const backend = defineBackend({
  auth,
  data,
  apiAuthorizerFunction,
  myApiFunction,
});

// Create API Stack
const apiStack = backend.myApiFunction.stack;

// Define the REST API
const myRestApi = new RestApi(apiStack, "RestApi", {
  restApiName: "myRestApi",
  deploy: true,
  deployOptions: {
    stageName: "dev",
  },
  defaultCorsPreflightOptions: {
    allowOrigins: Cors.ALL_ORIGINS, // restrict in production
    allowMethods: Cors.ALL_METHODS,
    allowHeaders: Cors.DEFAULT_HEADERS,
  },
});

// Lambda integration for the api route
const fooLambdaIntegration = new LambdaIntegration(
  backend.myApiFunction.resources.lambda
);

// Custom Lambda authorizer
const fooAuthorizer = new TokenAuthorizer(apiStack, "FooJwtAuthorizer", {
  handler: backend.apiAuthorizerFunction.resources.lambda,
  identitySource: "method.request.header.Authorization",
  authorizerName: "FooJwtAuthorizer",
  resultsCacheTtl: Duration.seconds(0),
});

// Define the route, secured with custom authorizer
const fooResourcePath = myRestApi.root.addResource("foo-resource");

fooResourcePath.addMethod("GET", fooLambdaIntegration, {
  authorizationType: AuthorizationType.CUSTOM,
  authorizer: fooAuthorizer,
});

backend.addOutput({
  custom: {
    API: {
      [myRestApi.restApiName]: {
        endpoint: myRestApi.url,
        region: Stack.of(myRestApi).region,
        apiName: myRestApi.restApiName,
      },
    },
  },
});
