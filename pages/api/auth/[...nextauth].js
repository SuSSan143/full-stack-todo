import axios from "axios";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        email: {
          label: "Username",
          type: "text",
          placeholder: "jsmith@example.com",
        },
      },
      async authorize(credentials, req) {
        const { username, email, password } = credentials;
        let data;

        if (!username) {
          data = await axios.post(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`,
            {
              identifier: email,
              password: password,
            }
          );
        } else {
          data = await axios.post(
            `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local/register`,
            {
              username: username,
              email: email,
              password: password,
            }
          );
        }

        const user = { user: data.data.user, jwt: data.data.jwt };

        if (user) {
          return { user };
        } else {
          return null;
        }
      },
    }),
  ],
  theme: {
    colorScheme: "light",
  },
  pages: {
    signIn: "/index",
    error: "/error",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        if (account.type === "credentials") {
          token.jwt = user.user.jwt;
          token.id = user.user.user.id;
          token.name = user.user.user.username;
          token.email = user.user.user.email;
          token.provider = user.user.user.provider;
        }
      }

      if (account) {
        const url = new URL(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/${account.provider}/callback`
        );
        url.searchParams.set("access_token", account.access_token);
        const response = await fetch(url.toString());
        const data = await response.json();
        if (data && account.type !== "credentials") {
          token.jwt = data.jwt;
          token.id = data.user.id;
          token.provider = data.user.provider;
          token.username = data.user.username;
        }
      }

      return token;
    },
    async session({ session, token, user }) {
      session.jwt = token.jwt;
      session.id = token.id;
      session.provider = token.provider;
      session.user.name = token.username;
      return session;
    },
  },
});
