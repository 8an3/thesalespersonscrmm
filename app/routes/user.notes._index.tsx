import { parse } from "@conform-to/react";
import { json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import {
  Button,
  ButtonLink,
  PageHeader,
  RemixForm,
  RemixLink,
} from "~/components";
import { requireUserSession } from "~/helpers";
import { Plus, Trash } from "~/icons";
import { prisma } from "~/libs";
import { model } from "~/models";
import { createSitemap, formatPluralItems, truncateText } from "~/utils";

import type { ActionArgs, LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request }: LoaderArgs) {
  const { userSession, user } = await requireUserSession(request);

  const [notes, notesCount] = await prisma.$transaction([
    model.userNote.query.getAll({ user: userSession }),
    model.userNote.query.count({ user: userSession }),
  ]);

  return json({ user, notes, notesCount });
}

export async function action({ request }: ActionArgs) {
  const { userSession } = await requireUserSession(request);

  const formData = await request.formData();
  const submission = parse(formData, {});

  if (submission.payload.intent === "user-delete-all-notes") {
    await model.userNote.mutation.deleteAll({ user: userSession });
    return json(submission);
  }

  return redirect(`/user/notes`);
}

export default function AdminNotesRoute() {
  const { notes, notesCount } = useLoaderData<typeof loader>();

  return (
    <div data-id="user-notes" className="contain-sm space-y-4">
      <PageHeader size="xs" withBackground={false} withContainer={false}>
        <div className="stack-h-center">
          <RemixLink to=".">
            <h1>Notes</h1>
          </RemixLink>
          <ButtonLink to="new" size="sm">
            <Plus className="size-sm" />
            <span>Add Note</span>
          </ButtonLink>
          <RemixForm method="delete">
            <Button
              size="sm"
              variant="danger"
              name="intent"
              value="user-delete-all-notes"
              disabled={notesCount <= 0}
            >
              <Trash className="size-sm" />
              <span>Delete All My {formatPluralItems("Note", notesCount)}</span>
            </Button>
          </RemixForm>
        </div>
      </PageHeader>

      <section className="space-y-2">
        <p>{formatPluralItems("note", notesCount)}</p>
        <ul className="space-y-1">
          {notes.map((note) => {
            return (
              <li key={note.id}>
                <RemixLink
                  to={`/notes/${note.slug}`}
                  className="card-sm hover:card-hover"
                >
                  <h4>{note.title}</h4>
                  <p>{truncateText(note.content)}</p>
                </RemixLink>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
