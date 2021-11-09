import { CognitoUserPool } from "amazon-cognito-identity-js";

const userPoolConfig = {
  UserPoolId: "us-east-1_S7KVtIctZ",
  ClientId: "4unp5rj4pse1643our4ehcskl"
}
const cognitoUserPool = new CognitoUserPool(userPoolConfig);
export default cognitoUserPool;


