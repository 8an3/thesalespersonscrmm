import { conform, useForm } from "@conform-to/react";
import { getFieldsetConstraint, parse } from "@conform-to/zod";
import { json } from "@remix-run/node";
import { useActionData, useNavigation } from "@remix-run/react";
import { useId } from "react";
import { z } from "zod";

import {
  Alert,
  Button,
  Debug,
  Input,
  Label,
  Layout,
  PageHeader,
  RemixForm,
  RemixLinkText,
} from "~/components";
import { configSite } from "~/configs";
import { Loader2 } from "~/icons";
import { userModel } from "~/models";
import { authenticator } from "~/services";
import {
  createDocumentLinks,
  createMetaData,
  getRedirectTo,
  useRedirectTo,
} from "~/utils";

import type {
  ActionArgs,
  LoaderArgs,
  V2_MetaFunction,
  LinksFunction,
} from "@remix-run/node";

export const schemaRegister = z.object({
  name: z
    .string({ required_error: "Full Name is required" })
    .min(1, "Full Name at least 1 character")
    .max(50, "Full Name limited to 50 characters"),
  username: z
    .string({ required_error: "Username is required" })
    .regex(/^[a-zA-Z0-9]+$/, "Only alphabet and number allowed")
    .min(5, "Username at least 5 characters")
    .max(20, "Username limited to 20 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Email is invalid"),
  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password length at least 8 characters")
    .max(100, "Password length limited to 100 characters"),
});

export const meta: V2_MetaFunction = () => {
  return createMetaData({
    title: "Register",
    description: "Create new account to join the adventure.",
  });
};

export const links: LinksFunction = () => {
  return createDocumentLinks({ canonicalPath: "/register" });
};

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/user/profile",
  });
}

/**
 * More details about the decision here can be read
 * in the _auth.login route action function
 */
export async function action({ request }: ActionArgs) {
  const clonedRequest = request.clone();

  const formData = await clonedRequest.formData();
  const submission = parse(formData, { schema: schemaRegister });
  if (!submission.value || submission.intent !== "submit") {
    return json(submission, { status: 400 });
  }

  const result = await userModel.registerUserPassword(submission.value);

  if (result.error) {
    return json({ ...submission, error: result.error }, { status: 403 });
  }

  await authenticator.authenticate("user-pass", request, {
    successRedirect: getRedirectTo(request) || "/user/profile",
    failureRedirect: "/register",
  });
  return json(submission);
}

export default function AuthRegisterRoute() {
  const { searchParams, redirectTo } = useRedirectTo();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const actionData = useActionData<typeof action>();

  const id = useId();
  const [form, fields] = useForm<z.infer<typeof schemaRegister>>({
    id,
    initialReport: "onSubmit",
    lastSubmission: actionData,
    constraint: getFieldsetConstraint(schemaRegister),
    onValidate({ formData }) {
      return parse(formData, { schema: schemaRegister });
    },
  });
  const { name, username, email, password } = fields;

  return (
    <Layout
      isSpaced
      layoutHeader={
        <PageHeader size="xs" isTextCentered>
          <h1>Join {configSite.name}</h1>
          <p>Let's get started</p>
        </PageHeader>
      }
    >
      <div className="mx-auto w-full max-w-xs">
        <RemixForm {...form.props} method="post" className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor={name.id}>Full Name</Label>
            <Input
              {...conform.input(name)}
              type="text"
              placeholder="Your Full Name"
              autoComplete="name"
              autoFocus
              required
            />
            {name.error && (
              <Alert variant="danger" id={name.errorId}>
                {name.error}
              </Alert>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor={username.id}>Username</Label>
            <Input
              {...conform.input(username)}
              type="text"
              placeholder="yourname"
              autoComplete="username"
              autoFocus
              required
            />
            {username.error && (
              <Alert variant="danger" id={username.errorId}>
                {username.error}
              </Alert>
            )}
            <p className="text-xs text-surface-500">
              Alphanumeric only and between 5 to 20 characters
            </p>
          </div>

          <div className="space-y-1">
            <Label htmlFor={email.id}>Email address</Label>
            <Input
              {...conform.input(email)}
              type="email"
              placeholder="you@email.com"
              autoComplete="email"
              required
            />
            {email.error && (
              <Alert variant="danger" id={email.errorId}>
                {email.error}
              </Alert>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor={password.id}>Password</Label>
            <Input
              {...conform.input(password)}
              type="password"
              autoComplete="current-password"
              placeholder="Enter password"
              required
            />
            {password.error && (
              <Alert variant="danger" id={password.errorId}>
                {password.error}
              </Alert>
            )}
            <p className="text-xs text-surface-500">At least 8 characters</p>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />

          <Button
            type="submit"
            className="w-full"
            name="intent"
            value="submit"
            disabled={isSubmitting}
          >
            {isSubmitting && <Loader2 className="animate-spin" />}
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>

          <div>
            <p className="text-center">
              <span>Have an account? Please </span>
              <RemixLinkText
                to={{
                  pathname: "/login",
                  search: searchParams.toString(),
                }}
              >
                Log in
              </RemixLinkText>
            </p>
          </div>
        </RemixForm>
      </div>

      <Debug name="form">{{ actionData, fields }}</Debug>
    </Layout>
  );
}
