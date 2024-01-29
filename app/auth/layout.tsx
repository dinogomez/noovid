const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full flex-col items-center justify-center px-12 pt-4 lg:pt-16">
      {children}
    </div>
  );
};

export default AuthLayout;
