import { UserManager } from "oidc-client";

const settings = {
  // Kazeem Branch
  authority: "http://backend-keycloak-auth:8080/realms/scheduler",
  client_id: "frontend_scheduler",
  redirect_uri: "http://localhost:3001/signin-callback.html",
  response_type: "code",
  scope: "openid profile scheduler.read",
  // authority: "http://backend-keycloak-auth:8080/realms/Payroll",
  // client_id: "frontend_payroll",
  // redirect_uri: "http://localhost:3000/signin-callback.html",
  // response_type: "code",
  // scope: "openid profile payroll.read",

  // Bros Demola Branch

  // authority: "http://backend-keycloak-auth:8080/auth/realms/Frontend",
  // client_id: "payroll",
  // redirect_uri: "http://localhost:3000/signin-callback.html",
  // response_type: "code",
  // scope: "openid profile payroll.read",

  // Remote Settings

  // authority: "http://xykine.com/realms/scheduler",
  // client_id: "frontend_scheduler",
  // redirect_uri: "http://xykinehr.com/signin-callback.html",
  // response_type: "code",
  // scope: "openid profile scheduler.read",

  // authority: "http://xykine.com/realms/scheduler",
  // client_id: "frontend_scheduler",
  // redirect_uri: "http://xykinehr.com/signin-callback.html",
  // response_type: "code",
  // scope: "openid profile scheduler.read",
};

const userManager = new UserManager(settings);

export function clearLocalStorage() {
  localStorage.removeItem("token");
  // localStorage.removeItem("companyCode");
}

// Add event listeners to handle token expiration
userManager.events.addAccessTokenExpired(() => {
  console.warn("Token expired, logging out the user...");
  clearLocalStorage();
  logoutUser().then((r) => console.log("user logged out"));
});

userManager.events.addSilentRenewError((e) => {
  console.error("Silent renew error: ", e.message);
  clearLocalStorage();
  logoutUser().then((r) => console.log("user logged out"));
});

export const getUser = () => {
  return userManager.getUser();
};

export const loginUser = () => {
  return userManager.signinRedirect();
};

export const logoutUser = () => {
  clearLocalStorage();
  return userManager.signoutRedirect({
    post_logout_redirect_uri: "http://localhost:3001",
    // post_logout_redirect_uri: "http://xykinehr.com",
    // post_logout_redirect_uri: "http://localhost:3000",
    // post_logout_redirect_uri: "http://xykinehr.com",
  });
};
