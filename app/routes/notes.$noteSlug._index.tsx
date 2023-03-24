import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { Balancer } from "~/components";
import { model } from "~/models";
import { createCacheHeaders, createSitemap, invariant } from "~/utils";

import type { LoaderArgs } from "@remix-run/node";

export const handle = createSitemap();

export async function loader({ request, params }: LoaderArgs) {
  invariant(params.noteSlug, `noteSlug does not exist`);

  const note = await model.note.query.getBySlug({ slug: params.noteSlug });

  return json({ note }, { headers: createCacheHeaders(request) });
}

export default function NotesViewRoute() {
  const { note } = useLoaderData<typeof loader>();

  if (!note) {
    return <p>Note does not exist or maybe still unpublished.</p>;
  }

  return (
    <div className="">
      <article className="prose-config contain-sm mt-10 whitespace-pre-wrap">
        <header className="pb-10">
          <h1>
            <Balancer>{note.title}</Balancer>
          </h1>
          <h2>{note.description}</h2>
        </header>

        {note.content}
      </article>
    </div>
  );
}
