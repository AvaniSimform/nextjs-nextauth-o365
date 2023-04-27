import NextAuth from 'next-auth';
import AzureADProvider from 'next-auth/providers/azure-ad';

const env = process.env;

async function refreshAccessToken(token) {
  try {
    const url = `https://login.microsoftonline.com/${env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}/oauth2/v2.0/token`;

    const body = new URLSearchParams({
      client_id:
        process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID || 'azure-ad-client-id',
      client_secret:
        process.env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET ||
        'azure-ad-client-secret',
      scope: 'email openid profile User.Read offline_access',
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken,
    });

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body,
    });

    const refreshedTokens = await response.json();
    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.id_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions = {
  providers: [
    AzureADProvider({
      clientId: `${env.NEXT_PUBLIC_AZURE_AD_CLIENT_ID}`,
      clientSecret: `${env.NEXT_PUBLIC_AZURE_AD_CLIENT_SECRET}`,
      tenantId: `${env.NEXT_PUBLIC_AZURE_AD_TENANT_ID}`,
      authorization: {
        params: { scope: 'openid email profile User.Read  offline_access' },
      },
      httpOptions: { timeout: 10000 },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the id_token, expires_at &refresh_token to the token right after signin
      if (account && user) {
        return {
          accessToken: account.id_token,
          accessTokenExpires: account?.expires_at
            ? account.expires_at * 1000
            : 0,
          refreshToken: account.refresh_token,
          user,
        };
      }

      if (Date.now() < token.accessTokenExpires - 100000 || 0) {
        return token;
      }

      return refreshAccessToken(token);
    },
    async session({ session, token }) {
      if (session) {
        session.user = token.user;
        session.error = token.error;
        session.accessToken = token.accessToken;
      }
      return session;
    },
  },
};
export default NextAuth(authOptions);

// return refreshAccessToken(token);
