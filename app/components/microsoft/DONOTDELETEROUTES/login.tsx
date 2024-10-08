
import { Button, Input, Separator } from '~/components';
import { Link, useSubmit, useNavigate, useLocation, Form, useLoaderData } from '@remix-run/react';
import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
import { useAppContext } from '~/components/microsoft/AppContext';
import { TfiMicrosoft } from "react-icons/tfi";
import { useState, useEffect, useRef } from 'react'
import financeFormSchema from "~/overviewUtils/financeFormSchema";
import { type ActionFunction, json, type LoaderFunction, redirect } from "@remix-run/node"
import { getUser } from '~/components/microsoft/GraphService';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { LogLevel } from '@azure/msal-browser';
import { prisma } from '~/libs';

export async function action({ request }: ActionFunction) {
  const formPayload = Object.fromEntries(await request.formData());
  const formData = financeFormSchema.parse(formPayload);
  const user = await prisma.user.findUnique({
    where: { email: formData.email }
  })
  const email = formData.email || ''
  const name = user.name
  return redirect(`/createSession?email=${email}&name=${name}`)
}

export async function loader({ request, params, req }: LoaderFunction) {
  const PROD_CALLBACK_URL = process.env.PROD_CALLBACK_URL
  return json({ PROD_CALLBACK_URL });
}

export default function Welcome() {
  const { PROD_CALLBACK_URL } = useLoaderData()

  const app = useAppContext();
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const email = activeAccount?.username || '';
  const name = activeAccount?.name || '';
  const idToken = activeAccount?.idToken || '';
  console.log(email, 'email', name, 'name', idToken, 'idToken', activeAccount)
  const [currentURL, setCurrentURL] = useState()


  const submit = useSubmit();
  const [user, setUser] = useState();

  useEffect(() => {
    const currentUrl2 = window.location.href;
    console.log("Current URL:", currentUrl2);
    setCurrentURL(currentUrl2)
    if (idToken && activeAccount) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("idToken", idToken);
      return submit(formData, { method: "post" });
    }
    if (!idToken && !activeAccount) {
      const fetchUnreadCount = async () => {
        const user = await getUser(app.authProvider!)
        setUser(user)
      };
      fetchUnreadCount();
    }
  }, []);
  let config = {
    auth: {
      clientId: "0fa1346a-ab27-4b54-bffd-e76e9882fcfe",
      clientSecret: '4hN8Q~RtcN.b9c.1LTCnHtY0UurShP1PIIFQGakw',
      tenantId: 'fa812bd2-3d1f-455b-9ce5-4bfd0a4dfba6',
      redirectUri: PROD_CALLBACK_URL,
      authority: `https://login.microsoftonline.com/common`,
      postLogoutRedirectUri: "/",
      prompt: "loginRedirect",
      scopes: [
        'User.Read',
        'Mail.ReadWrite',
        'Mail.send',
        'email',
        'openid',
        'profile',
        "Calendars.ReadWrite",
        "Notes.ReadWrite.All",
        "Calendars.ReadWrite.Shared",
        "Contacts.ReadWrite",
        "Contacts.ReadWrite.Shared",
        "Files.ReadWrite.All",
        "Files.ReadWrite.AppFolder",
        "Files.ReadWrite.Selected",
        "Mail.ReadWrite.Shared",
        "Mail.Send.Shared",
        "Mail.Send",
        "Mail.ReadWrite",
        "MailboxSettings.ReadWrite",
        "Notes.Create",
        "Notes.ReadWrite.All",
        "Schedule.ReadWrite.All",
        "Tasks.ReadWrite.Shared",
        "User.Read",
        "User.ReadWrite.All",
        "User.ReadWrite",
      ],
    },
    cache: {
      cacheLocation: 'localStorage',
      temporaryCacheLocation: "localStorage",
    },
    system: {
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
            default:
              return;
          }
        },
      },
    },

  }


  const OnClick = async () => {
    console.log(user, 'user')
    instance.loginPopup(config).catch(e => {
      console.log(e);
    });
    //  const signIn = app.signIn!
    // return signIn
  }
  const OnClickLogout = async () => {
    console.log(user, 'user')
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/"
    });
    //  const signOut = app.signOut!
    // return signOut
  }
  return (
    <>
      <div className="p-5 mb-4 bg-light rounded-3">
        <UnauthenticatedTemplate>
          <Card className="max-w-[350px] w-[350px]  fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <CardHeader>
              <CardTitle className="text-2xl">Demo Dealer</CardTitle>
              <CardDescription>

                Welcome to the demo, plea<button
                  onClick={OnClick}
                  className=" "  >s</button>e login with your given credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Form method='post' >
                  <Input name='email' placeholder='email@email.com' className=" w-full text-foreground bg-background border border-border mb-3" />
                  <Button
                    type='submit'
                    name='intent'
                    value='demoLogin'
                    variant="outline"
                    className=" w-full text-foreground bg-primary"  >
                    <p className="mr-1">Login  </p>
                  </Button>
                </Form>
                <Separator className="border-border" />
                <Link to="/privacy">
                  <Button variant='outline' type="submit" className="w-full bg-background">
                    <p className="text-muted-foreground">To review our Privacy Policy</p>
                  </Button>
                </Link>
                <div className="mt-4 text-center text-sm">
                  No account?{" "}
                  <Link to="/subscribe" className="underline">
                    Sign up
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

        </UnauthenticatedTemplate>
      </div>
      <div className="p-5 mb-4 bg-light rounded-3">
        <AuthenticatedTemplate>
          <Card className="max-w-[350px] w-[350px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <CardHeader>
              <CardTitle className="text-2xl"> Welcome back {activeAccount?.name}!
              </CardTitle>
              <CardDescription>
                Have a nice day!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Link to={`/createSession?email=${email}&name=${name}`} >
                  <Button
                    onClick={() => {
                    }}
                    variant="outline"
                    className=" w-full text-foreground bg-primary"  >
                    Continue...
                  </Button>
                </Link>

                <Separator className="border-border" />
                <Link to="/privacy">
                  <Button onClick={OnClickLogout} className="w-full  text-foreground ">
                    <p className="mr-1">Logout of your </p>
                    <TfiMicrosoft className="text-[28px]" />{" "}
                    <p className="ml-2">account</p>
                  </Button>
                </Link>
                <Link to="/privacy">
                  <Button variant='outline' type="submit" className="w-full">
                    <p className=" text-foreground ">To review our Privacy Policy</p>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>


        </AuthenticatedTemplate>
      </div>
    </>
  );
}
/** <div className="grid  w-full grid-cols-1">
            <div className="w-[50%]">
              <div className="flex items-center justify-center text-center">

                <div className=" fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <h1 className="text-foreground">Have a nice day!</h1>
                  <p className="mt-5 text-foreground">
                    Welcome {activeAccount?.name} to D.S.A.!
                  </p>
                  <div className='grid grid-cols-1'>
                    <Button
                      onClick={() => {
                        OnClickContinue()
                      }}
                      variant="outline" className="mt-5 w-auto rounded-xl border border-white px-8 py-5 text-xl text-foreground "  >
                      <p className="mr-1">Continue...</p>
                    </Button>

                    <Button onClick={OnClickLogout} variant="outline" className="mt-5 w-auto rounded-xl border border-white px-8 py-5 text-xl text-foreground bg-[#c72323] "  >
                      <p className="mr-1">Logout of your </p>
                      <TfiMicrosoft className="text-[28px]" />{" "}
                      <p className="ml-2">account</p>
                    </Button>
                  </div>

                  <hr className="solid mb-5 mt-5 text-foreground" />
                  <Link to="/privacy">
                    <p className="text-foreground">To review our Privacy Policy</p>
                  </Link>
                </div>

              </div>
            </div>
          </div>
 */

/**  <>
      <div className="p-5 mb-4 bg-light rounded-3">
        <UnauthenticatedTemplate>

        </UnauthenticatedTemplate>
      </div>
      <div className="p-5 mb-4 bg-light rounded-3">
        <AuthenticatedTemplate>


        </AuthenticatedTemplate>
      </div>
    </> */

/*import { Button, Separator } from '~/components';
import { Link, useSubmit, useNavigate, useLocation } from '@remix-run/react';
import { MsalProvider, AuthenticatedTemplate, useMsal, UnauthenticatedTemplate } from '@azure/msal-react';
import { useAppContext } from '~/components/microsoft/AppContext';
import { TfiMicrosoft } from "react-icons/tfi";
import { useState, useEffect, useRef } from 'react'
import financeFormSchema from "~/overviewUtils/financeFormSchema";
import { type ActionFunction, json, type LoaderFunction, redirect } from "@remix-run/node"
import { getUser } from '~/components/microsoft/GraphService';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card"
import { LogLevel } from '@azure/msal-browser';

export async function loader({ params, request }: DataFunctionArgs) {
  return null

}

export async function action({ request }: ActionFunction) {
  const formPayload = Object.fromEntries(await request.formData());
  const formData = financeFormSchema.parse(formPayload);
  const email = formData.email || ''
  const name = formData.name || ''
  return redirect(`/createSession?email=${email}&name=${name}`)
}

export default function Welcome() {
  const app = useAppContext();
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const email = activeAccount?.username || '';
  const name = activeAccount?.name || '';
  const idToken = activeAccount?.idToken || '';
  console.log(email, 'email', name, 'name', idToken, 'idToken', activeAccount)
  const [currentURL, setCurrentURL] = useState()


  const submit = useSubmit();
  const [user, setUser] = useState();

  useEffect(() => {
    const currentUrl2 = window.location.href;

    console.log("Current URL:", currentUrl2);
    setCurrentURL(currentUrl2)
    if (idToken && activeAccount) {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("idToken", idToken);
      return submit(formData, { method: "post" });
    }
    if (!idToken && !activeAccount) {
      const fetchUnreadCount = async () => {
        const user = await getUser(app.authProvider!)
        setUser(user)
      };
      fetchUnreadCount();
    }
  }, []);
  //currentHost === "localhost:3000" ? `http://localhost:3000/auth/login` : `https://www.dealersalesassistant.ca/auth/login`,
  let config = {
    auth: {
      clientId: "0fa1346a-ab27-4b54-bffd-e76e9882fcfe",
      clientSecret: '4hN8Q~RtcN.b9c.1LTCnHtY0UurShP1PIIFQGakw',
      tenantId: 'fa812bd2-3d1f-455b-9ce5-4bfd0a4dfba6',
      redirectUri: currentURL,
      authority: `https://login.microsoftonline.com/common`,
      postLogoutRedirectUri: "/",
      prompt: "none",
      scopes: [
        'User.Read',
        'Mail.ReadWrite',
        'Mail.send',
        'email',
        'openid',
        'profile',
        "Calendars.ReadWrite",
        "Notes.ReadWrite.All",
        "Calendars.ReadWrite.Shared",
        "Contacts.ReadWrite",
        "Contacts.ReadWrite.Shared",
        "Files.ReadWrite.All",
        "Files.ReadWrite.AppFolder",
        "Files.ReadWrite.Selected",
        "Mail.ReadWrite.Shared",
        "Mail.Send.Shared",
        "Mail.Send",
        "Mail.ReadWrite",
        "MailboxSettings.ReadWrite",
        "Notes.Create",
        "Notes.ReadWrite.All",
        "Schedule.ReadWrite.All",
        "Tasks.ReadWrite.Shared",
        "User.Read",
        "User.ReadWrite.All",
        "User.ReadWrite",
      ],
    },
    cache: {
      cacheLocation: 'localStorage',
      temporaryCacheLocation: "localStorage",
    },
    system: {
      loggerOptions: {
        loggerCallback: (level, message, containsPii) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
            default:
              return;
          }
        },
      },
    },

  }

  const iFrameRef: React.LegacyRef<HTMLIFrameElement> = useRef(null);

  useEffect(() => {

  }, []);
  const OnClick = async () => {
    console.log(config, currentURL, 'user')
    instance.loginPopup(config).catch(e => {
      console.log(e);
    });
    //  const signIn = app.signIn!
    // return signIn
  }
  const OnClickLogout = async () => {
    console.log(user, 'user')
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
      mainWindowRedirectUri: "/"
    });
    //  const signOut = app.signOut!
    // return signOut
  }
  return (
    <>
      <div className="p-5 mb-4 bg-light rounded-3">
        <UnauthenticatedTemplate>
          <Card className="max-w-[350px] w-[350px]  fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-background">
            <CardHeader>
              <CardTitle className="text-2xl">Login</CardTitle>
              <CardDescription>
                Login with your microsoft account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Button
                  onClick={() => {
                    console.log(config, host, 'onclick')
                    OnClick()
                  }}
                  variant="outline"
                  className=" w-full text-foreground bg-primary"  >
                  <p className="mr-1">Login with </p>
                  <TfiMicrosoft className="text-[28px]" />{" "}
                </Button>
                <Separator className="border-border" />
                <Link to="/privacy">
                  <Button variant='outline' type="submit" className="w-full bg-background">
                    <p className="text-muted-foreground">To review our Privacy Policy</p>
                  </Button>
                </Link>
                <div className="mt-4 text-center text-sm">
                  No account?{" "}
                  <Link to="/subscribe" className="underline">
                    Sign up
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>

        </UnauthenticatedTemplate>
      </div>
      <div className="p-5 mb-4 bg-light rounded-3">
        <AuthenticatedTemplate>
          <Card className="max-w-[350px] w-[350px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-background">
            <CardHeader>
              <CardTitle className="text-2xl"> Welcome back {activeAccount?.name}!
              </CardTitle>
              <CardDescription>
                Have a nice day!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                <Link to={`/createSession?email=${email}&name=${name}`} >
                  <Button
                    onClick={() => {
                    }}
                    variant="outline"
                    className=" w-full text-foreground bg-primary"  >
                    Continue...
                  </Button>
                </Link>

                <Separator className="border-border" />
                <Link to="/privacy">
                  <Button onClick={OnClickLogout} className="w-full  text-foreground ">
                    <p className="mr-1">Logout of your </p>
                    <TfiMicrosoft className="text-[28px]" />{" "}
                    <p className="ml-2">account</p>
                  </Button>
                </Link>
                <Link to="/privacy">
                  <Button variant='outline' type="submit" className="w-full">
                    <p className=" text-foreground ">To review our Privacy Policy</p>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </AuthenticatedTemplate>
      </div>
    </>
  );
}
/** <div className="grid  w-full grid-cols-1">
            <div className="w-[50%]">
              <div className="flex items-center justify-center text-center">

                <div className=" fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
                  <h1 className="text-foreground">Have a nice day!</h1>
                  <p className="mt-5 text-foreground">
                    Welcome {activeAccount?.name} to D.S.A.!
                  </p>
                  <div className='grid grid-cols-1'>
                    <Button
                      onClick={() => {
                        OnClickContinue()
                      }}
                      variant="outline" className="mt-5 w-auto rounded-xl border border-white px-8 py-5 text-xl text-foreground "  >
                      <p className="mr-1">Continue...</p>
                    </Button>

                    <Button onClick={OnClickLogout} variant="outline" className="mt-5 w-auto rounded-xl border border-white px-8 py-5 text-xl text-foreground bg-[#c72323] "  >
                      <p className="mr-1">Logout of your </p>
                      <TfiMicrosoft className="text-[28px]" />{" "}
                      <p className="ml-2">account</p>
                    </Button>
                  </div>

                  <hr className="solid mb-5 mt-5 text-foreground" />
                  <Link to="/privacy">
                    <p className="text-foreground">To review our Privacy Policy</p>
                  </Link>
                </div>

              </div>
            </div>
          </div>
 */

/**  <>
      <div className="p-5 mb-4 bg-light rounded-3">
        <UnauthenticatedTemplate>

        </UnauthenticatedTemplate>
      </div>
      <div className="p-5 mb-4 bg-light rounded-3">
        <AuthenticatedTemplate>


        </AuthenticatedTemplate>
      </div>
    </>
  if (host === "http://localhost:3000") {
    return (
      <>
        <div className="p-5 mb-4 bg-light rounded-3">
          <UnauthenticatedTemplate>
            <Card className="max-w-[350px] w-[350px]  fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-background">
              <CardHeader>
                <CardTitle className="text-2xl">Login</CardTitle>
                <CardDescription>
                  Login with your microsoft account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Button
                    onClick={OnClick}
                    variant="outline"
                    className=" w-full text-foreground bg-primary"  >
                    <p className="mr-1">Login with </p>
                    <TfiMicrosoft className="text-[28px]" />{" "}
                  </Button>
                  <Separator className="border-border" />
                  <Link to="/privacy">
                    <Button variant='outline' type="submit" className="w-full bg-background">
                      <p className="text-muted-foreground">To review our Privacy Policy</p>
                    </Button>
                  </Link>
                  <div className="mt-4 text-center text-sm">
                    No account?{" "}
                    <Link to="/subscribe" className="underline">
                      Sign up
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </UnauthenticatedTemplate>
        </div>
        <div className="p-5 mb-4 bg-light rounded-3">
          <AuthenticatedTemplate>
            <Card className="max-w-[350px] w-[350px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-background">
              <CardHeader>
                <CardTitle className="text-2xl"> Welcome back {activeAccount?.name}!
                </CardTitle>
                <CardDescription>
                  Have a nice day!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Link to={`/createSession?email=${email}&name=${name}`} >
                    <Button
                      onClick={() => {
                      }}
                      variant="outline"
                      className=" w-full text-foreground bg-primary"  >
                      Continue...
                    </Button>
                  </Link>
                  <Separator className="border-border" />
                  <Link to="/privacy">
                    <Button onClick={OnClickLogout} className="w-full  text-foreground ">
                      <p className="mr-1">Logout of your </p>
                      <TfiMicrosoft className="text-[28px]" />{" "}
                      <p className="ml-2">account</p>
                    </Button>
                  </Link>
                  <Link to="/privacy">
                    <Button variant='outline' type="submit" className="w-full">
                      <p className=" text-foreground ">To review our Privacy Policy</p>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </AuthenticatedTemplate>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="p-5 mb-4 bg-light rounded-3">
          <UnauthenticatedTemplate>
            <Card className="max-w-[350px] w-[350px]  fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              <CardHeader>
                <CardTitle className="text-2xl">Demo Dealer</CardTitle>
                <CardDescription>

                  Welcome to the demo, plea   <button
                    onClick={OnClick}
                    className=" "  >
                    s
                  </button>e login with your given credentials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Form method='post' >
                    <Input name='email' placeholder='email@email.com' className=" w-full text-foreground bg-background border border-border mb-3" />
                    <Button
                      type='submit'
                      name='intent'
                      value='demoLogin'
                      variant="outline"
                      className=" w-full text-foreground bg-primary"  >
                      <p className="mr-1">Login  </p>
                    </Button>
                  </Form>
                  <Separator className="border-border" />
                  <Link to="/privacy">
                    <Button variant='outline' type="submit" className="w-full bg-background">
                      <p className="text-muted-foreground">To review our Privacy Policy</p>
                    </Button>
                  </Link>
                  <div className="mt-4 text-center text-sm">
                    No account?{" "}
                    <Link to="/subscribe" className="underline">
                      Sign up
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

          </UnauthenticatedTemplate>
        </div>
        <div className="p-5 mb-4 bg-light rounded-3">
          <AuthenticatedTemplate>
            <Card className="max-w-[350px] w-[350px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
              <CardHeader>
                <CardTitle className="text-2xl"> Welcome back {activeAccount?.name}!
                </CardTitle>
                <CardDescription>
                  Have a nice day!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  <Link to={`/createSession?email=${email}&name=${name}`} >
                    <Button
                      onClick={() => {
                      }}
                      variant="outline"
                      className=" w-full text-foreground bg-primary"  >
                      Continue...
                    </Button>
                  </Link>

                  <Separator className="border-border" />
                  <Link to="/privacy">
                    <Button onClick={OnClickLogout} className="w-full  text-foreground ">
                      <p className="mr-1">Logout of your </p>
                      <TfiMicrosoft className="text-[28px]" />{" "}
                      <p className="ml-2">account</p>
                    </Button>
                  </Link>
                  <Link to="/privacy">
                    <Button variant='outline' type="submit" className="w-full">
                      <p className=" text-foreground ">To review our Privacy Policy</p>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>


          </AuthenticatedTemplate>
        </div>
      </>
    );
  }
}
*/
