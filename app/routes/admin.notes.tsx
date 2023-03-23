import { parse } from "@conform-to/react";
import { json, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import {
  Button,
  ButtonLink,
  PageAdminHeader,
  RemixForm,
  RemixLink,
} from "~/components";
import { requireUserSession } from "~/helpers";
import { Plus, Trash } from "~/icons";
import { model } from "~/models";
import { createSitemap } from "~/utils";

import type { ActionArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader() {
  const notesCount = await model.adminNote.query.count();
  return json({ notesCount });
}

export async function action({ request }: ActionArgs) {
  await requireUserSession(request);

  const formData = await request.formData();
  const submission = parse(formData, {});

  if (submission.payload.intent === "admin-delete-all-notes") {
    await model.adminNote.mutation.deleteAll();
    return json(submission);
  }

  return redirect(`/admin/notes`);
}

const isDevelopment = process.env.NODE_ENV === "development";

export default function AdminNotesRoute() {
  const { notesCount } = useLoaderData<typeof loader>();

  return (
    <div data-id="admin-notes-layout">
      <PageAdminHeader size="xs">
        <RemixLink to=".">
          <h1>Notes</h1>
        </RemixLink>
        <ButtonLink to="new" size="sm">
          <Plus className="size-sm" />
          <span>New note</span>
        </ButtonLink>
        {isDevelopment && (
          <RemixForm method="delete">
            <Button
              size="sm"
              variant="danger"
              name="intent"
              value="admin-delete-all-notes"
              disabled={notesCount <= 0}
            >
              <Trash className="size-sm" />
              <span>Delete All Notes</span>
            </Button>
          </RemixForm>
        )}
      </PageAdminHeader>

      <div data-id="admin-notes-outlet" className="px-layout">
        <Outlet />
      </div>
    </div>
  );
}
