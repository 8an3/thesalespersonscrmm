import { useEffect, useState } from "react";
import { prisma } from "~/libs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog"
import { Button, Label, Input } from "~/components/ui";
import { useLoaderData } from "@remix-run/react";

export default function LastNote({ data }) {
  const [note, setNote] = useState('');
  const { latestNotes } = useLoaderData()
  console.log(latestNotes, 'latestnotes')

  const findNoteByCustomerId = (customerId) => {
    return latestNotes.find((note) => note && note.customerId === customerId);
  };

  const foundNote = findNoteByCustomerId(data.financeId);
  console.log(foundNote, 'foundNote')

  return (
    <>
      {note ? (
        <div>{getNote.customContent}</div>
      ) : (

        <Dialog>
          <DialogTrigger asChild>
            <Button variant='outline'>Add Note</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add note</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
