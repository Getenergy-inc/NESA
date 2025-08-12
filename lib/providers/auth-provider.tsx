import { FC, PropsWithChildren } from "react";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  return <>{children}</>;
};

export default AuthProvider;
