# Office 365 login in Next.js using NextAuth.js
This repository serves to demonstrate an example of secure user authentication using O365 (Azure Active Directory) in [Next.js](https://nextjs.org/) and [NextAuth.js](https://next-auth.js.org/).

### To allow specific Active Directory users access:

*   In [https://portal.azure.com/](https://portal.azure.com/) search for "Azure Active Directory", and select your organization.
*   Next, go to "App Registration" in the left menu, and create a new one.
*   Pay close attention to "Who can use this application or access this API?"
    *   This allows you to scope access to specific types of user accounts
    *   Only your tenant, all azure tenants, or all azure tenants and public Microsoft accounts (Skype, Xbox, Outlook.com, etc.)
*   When asked for a redirection URL, select the platform type "Web" and use `https://yourapplication.com/api/auth/callback/azure-ad` or for development `http://localhost:3000/api/auth/callback/azure-ad`.
*   After your App Registration is created, under "Client Credential" create your Client secret.
*   Now copy your:
    *   Application (client) ID
    *   Directory (tenant) ID
    *   Client secret (value)

In `.env.local` create the following entries:
```
AZURE_AD_CLIENT_ID=<copy Application (client) ID here>
AZURE_AD_CLIENT_SECRET=<copy generated client secret value here>
AZURE_AD_TENANT_ID=<copy the tenant id here>
```

## Getting Started

First, create `.env.local` file at root of project and set all variables available in `.env.example` then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Output

https://user-images.githubusercontent.com/96057435/235067443-04503b59-4996-4245-87fa-5dcb40b970aa.mp4

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
