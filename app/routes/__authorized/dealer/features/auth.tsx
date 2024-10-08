import { AuthenticatedTemplate, UnauthenticatedTemplate, MsalProvider } from '@azure/msal-react'
import { json, redirect, type LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import { getSession, commitSession, authSessionStorage, destroySession } from "~/sessions/auth-session.server";
import { GetUser } from "~/utils/loader.server";
import Sidebar from "~/components/zRoutes/oldComps/sidebar";
import { ClientOnly } from "remix-utils";
import {
  PublicClientApplication,
  EventType,
  type EventMessage,
  type AuthenticationResult,
} from '@azure/msal-browser';
import ProvideAppContext from '~/components/microsoft/AppContext';

const tenantId = "fa812bd2-3d1f-455b-9ce5-4bfd0a4dfba6";

const microsoftAuthConfig = {
  clientId: "0fa1346a-ab27-4b54-bffd-e76e9882fcfe",
  clientSecret: "rut8Q~s5LpXMnEjujrxkcJs9H3KpUzxO~LfAOc-D",
  redirectUri: "http://localhost:3000/email/Welcome",
  authorizationUrl: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/authorize`,
  tokenUrl: `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token?`,
  userInfoUrl: "https://graph.microsoft.com/oidc/userinfo",
  scopes: [
    "User.ReadWrite",
    "mailboxsettings.read",
    "calendars.readwrite",
    "mail.readwrite",
    "Mail.Send",
    "Notes.ReadWrite.All",
    "Mail.ReadBasic.All",
  ],
  // scopes: ["openid", "User.ReadWrite", "Mail.ReadWrite", "offline_access"],
  prompt: "login",
  resource: "https://graph.microsoft.com",
  authority: "https://login.microsoftonline.com",

};

export async function loader({ request, params, req }: LoaderFunction) {
  let session = await getSession(request.headers.get("Cookie"));
  let email = session.get("email")
  let user = await GetUser(email)
  return json({ user, email });
}

export default function Root() {
  const { user, email } = useLoaderData()

  const msalInstance = new PublicClientApplication({
    auth: {
      clientId: microsoftAuthConfig.clientId,
      redirectUri: microsoftAuthConfig.redirectUri,

    },

    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: true
    }
  });

  const accounts = msalInstance.getAllAccounts();
  if (accounts && accounts.length > 0) {
    msalInstance.setActiveAccount(accounts[0]);
  }

  msalInstance.addEventCallback((event: EventMessage) => {
    if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
      const authResult = event.payload as AuthenticationResult;
      console.log(authResult, authResult.account)
      msalInstance.setActiveAccount(authResult.account);
    }
  });
  return (
    <ClientOnly fallback={<Loading />} >
      {() => (
        <MsalProvider instance={msalInstance}>
          <ProvideAppContext>
            <Outlet />
          </ProvideAppContext>
        </MsalProvider>
      )}
    </ClientOnly>
  );
}


function Loading() {
  return (
    <ul>
      {Array.from({ length: 12 }).map((_, i) => (
        <li key={i}>
          <RandomLengthDashes /> <RandomLengthDashes /> <RandomLengthDashes />
        </li>
      ))}
    </ul>
  )
}

function RandomLengthDashes() {
  return <span>{'-'.repeat(Math.floor(Math.random() * 20))}</span>
}
