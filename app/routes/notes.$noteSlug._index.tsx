import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Balancer } from "~/components";
import { note } from "~/models";
import { createSitemap, invariant } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ params }: LoaderArgs) {
  const { noteSlug } = params;
  invariant(noteSlug, "noteSlug doesn not exist");

  return json({
    note: await note.getNoteBySlug({ slug: noteSlug }),
  });
}

// Similar with "admin-notes-edit"
export default function NotesViewRoute() {
  const { note } = useLoaderData<typeof loader>();

  if (!note) {
    return <p>Note doesn not exist or maybe still unpublished.</p>;
  }

  return (
    <div>
      <article className="prose-config mx-auto mt-10">
        <h1>
          <Balancer>{note.title}</Balancer>
        </h1>
        {note.description && <h2>{note.description}</h2>}
        <p>{note.content}</p>
      </article>
    </div>
  );
}
