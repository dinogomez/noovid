export type SiteConfig = {
  title: string;
  desc: string;
  backButtonLabel: string;
};
export type LoginConfig = {
  buttonLabel: string;
  route: string;
};

export type CourierConfig = {
  title: string;
  desc: string;
  backButtonLabel: string;
  route: string;
};

export type LoginFormConfig = {
  emailFormLabel: string;
  emailFormPlaceholder: string;
  emailFormType: string;
  passFormLabel: string;
  passFormPlaceholder: string;
  passFormType: string;
};

export type RegisterFormConfig = {
  headerTitle: string;
  headerLabel: string;
  usernameFormLabel: string;
  usernameFormPlaceholder: string;
  usernameFormType: string;
  emailFormLabel: string;
  emailFormPlaceholder: string;
  emailFormType: string;
  passFormLabel: string;
  passFormPlaceholder: string;
  passFormType: string;
};

export type RegisterConfig = {
  buttonLabel: string;
  route: string;
};
