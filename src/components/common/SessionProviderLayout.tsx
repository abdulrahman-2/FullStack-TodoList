import { SessionProvider } from "next-auth/react";

const SessionProviderLayout = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderLayout;
