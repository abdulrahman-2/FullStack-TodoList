export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email as string,
          name: token.name as string,
        };
      }
      return session;
    },
    authorized({ auth, request }: any) {
      const user = auth?.user;
      const isOnTodosPage = request.nextUrl?.pathname.startsWith("/todos");
      const isOnSignUpPage = request.nextUrl?.pathname.startsWith("/signUp");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      if (isOnTodosPage && !user) {
        return false;
      }
      if ((isOnLoginPage || isOnSignUpPage) && user) {
        return Response.redirect(new URL("/todos", request.nextUrl));
      }
      return true;
    },
  },
};
