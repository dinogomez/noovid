import {
  CourierConfig,
  LoginFormConfig,
  RegisterConfig,
  RegisterFormConfig,
  SiteConfig,
} from "@/commons/types";

export const siteConfig: SiteConfig = {
  title: "noovid",
  desc: "Delivery Tracking System",
  backButtonLabel: "Back",
};

export const courierConfig: CourierConfig = {
  title: "Nootrack",
  desc: "Courier Service",
  backButtonLabel: "Dashboard",
  route: "/courier",
};

export const loginConfig: RegisterConfig = {
  buttonLabel: "Login",
  route: "/auth/login",
};

export const loginFormConfig: LoginFormConfig = {
  emailFormLabel: "Email",
  emailFormPlaceholder: "dinogomez@noovid.com",
  emailFormType: "email",
  passFormLabel: "Password",
  passFormPlaceholder: "• • • • • • • • •",
  passFormType: "password",
};

export const registerFormConfig: RegisterFormConfig = {
  headerTitle: "noovid",
  headerLabel: "Register",
  usernameFormLabel: "Username",
  usernameFormPlaceholder: "dinogomez",
  usernameFormType: "text",
  emailFormLabel: "Email",
  emailFormPlaceholder: "dinogomez@noovid.com",
  emailFormType: "email",
  passFormLabel: "Password",
  passFormPlaceholder: "• • • • • • • • •",
  passFormType: "password",
};

export const registerConfig: RegisterConfig = {
  buttonLabel: "Register",
  route: "/auth/register",
};
