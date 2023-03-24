import { parse } from "@conform-to/react";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { badRequest } from "remix-utils";

import {
  Button,
  ButtonLink,
  Debug,
  RemixForm,
  RemixLinkText,
  TooltipAuto,
} from "~/components";
import { requireUserSession } from "~/helpers";
import { EditPencil, Eye, Trash } from "~/icons";
import { model } from "~/models";
import {
  createSitemap,
  formatDateTime,
  formatRelativeTime,
  invariant,
} from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ params }: LoaderArgs) {
  invariant(params.noteId, "noteId does not exist");
  const note = await model.adminNote.query.getById({ id: params.noteId });
  return json({ note });
}

export async function action({ request }: ActionArgs) {
  await requireUserSession(request);

  const formData = await request.formData();
  const submission = parse(formData);

  if (submission.payload.intent === "delete-note") {
    try {
      await model.adminNote.mutation.deleteById({
        id: submission.payload.noteId,
      });
      return redirect(`..`);
    } catch (error) {
      console.error(error);
      return badRequest(submission);
    }
  }
}

export default function AdminNotesViewRoute() {
  const { note } = useLoaderData<typeof loader>();

  if (!note) {
    return <p>Note does not exist.</p>;
  }

  return (
    <div data-id="admin-notes-view" className="stack-v">
      <header>
        <div className="stack-h-center">
          <span>View Note</span>
          <ButtonLink to={`/notes/${note.slug}`} size="xs" variant="info">
            <Eye className="size-xs" />
            <span>View on Site</span>
          </ButtonLink>
          <ButtonLink to="edit" size="xs" variant="warning">
            <EditPencil className="size-xs" />
            <span>Edit</span>
          </ButtonLink>
          <RemixForm method="delete">
            <input type="hidden" name="noteId" value={note.id} />
            <Button
              size="xs"
              variant="danger"
              name="intent"
              value="delete-note"
            >
              <Trash className="size-xs" />
              <span>Delete</span>
            </Button>
          </RemixForm>
        </div>
      </header>

      <section className="card stack-v">
        <header>
          <div data-id="note-view-id-slug" className="stack-h-center text-xs">
            <p>
              ID: <b>{note.id}</b>
            </p>
            <span>·</span>
            <p>
              Slug: <b>{note.slug}</b>
            </p>
          </div>

          <div className="stack-h-center text-xs">
            <p>
              <span>Created by: </span>
              <RemixLinkText
                prefetch="intent"
                to={`/admin/users/${note.user.id}`}
              >
                {note.user.name}
              </RemixLinkText>
            </p>
            <span>·</span>
            <TooltipAuto content={<b>{formatDateTime(note.createdAt)}</b>}>
              <span>Created at: </span>
              <b>{formatRelativeTime(note.createdAt)}</b>
            </TooltipAuto>
            <span>·</span>
            <TooltipAuto content={<b>{formatDateTime(note.createdAt)}</b>}>
              <span>Updated at: </span>
              <b>{formatRelativeTime(note.updatedAt)}</b>
            </TooltipAuto>
          </div>
        </header>

        <div className="prose-config whitespace-pre-wrap sm:py-4">
          <h1>{note.title}</h1>
          <h2>
            {note.description || (
              <span className="opacity-30">No description</span>
            )}
          </h2>
          {note.content}
        </div>
      </section>

      <Debug name="note">{note}</Debug>
    </div>
  );
}
