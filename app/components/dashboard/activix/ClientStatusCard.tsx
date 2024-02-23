import { Input, Button, Separator, Checkbox, PopoverTrigger, PopoverContent, Popover, DropdownMenuItem, } from '~/components/ui/index'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, } from "~/other/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger, } from "~/other/tabs"
import { PhoneOutcome, MenuScale, MailOut, MessageText, User, ArrowDown } from "iconoir-react";
import { Form, useFetcher, useSubmit } from '@remix-run/react';
import React from 'react';

const ClientStatusCard = ({ data }) => {
    const submit = useSubmit();
    const id = data.id ? data.id.toString() : '';
    const fetcher = useFetcher();
    const isActive = data.status === 'Active';
    const isDuplicate = data.status === 'Duplicate';
    const isInvalid = data.status === 'Invalid';
    const isLost = data.status === 'Lost';

    return (
        <Form method="post" onChange={(event) => { submit(event.currentTarget); }}>
            <select
                defaultValue={data.status}
                name='status'
                className={`mx-auto text-xs h-8 cursor-pointer rounded border-gray-300 border px-2 bg-slate12 text-gray-300 placeholder-blue-300 shadow transition-all duration-150 ease-linear focus:outline-none focus:ring focus-visible:ring-[#60b9fd] broder uppercase`}>
                <option value="Active">Active</option>
                <option value="Duplicate">Duplicate</option>
                <option value="Invalid">Invalid</option>
                <option value="Lost">Lost</option>
            </select>
            <Input type="hidden" defaultValue={data.userEmail} name="userEmail" />
            <Input type="hidden" defaultValue={data.id} name="financeId" />
            <Input type="hidden" defaultValue={id} name="id" />
            <Input type="hidden" defaultValue={data.brand} name="brand" />
            <Input type="hidden" defaultValue='updateStatus' name="intent" />
        </Form>
    );
}

export default ClientStatusCard;
