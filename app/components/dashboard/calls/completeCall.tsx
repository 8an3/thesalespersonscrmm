import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "~/components/ui/dialog"
import { Input, Button, TextArea, Label, Popover, PopoverTrigger, PopoverContent } from '~/components/ui/index'
import { ClipboardCheck } from "iconoir-react";
import DateTimePicker from 'react-datetime-picker'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import { Cross2Icon, CaretSortIcon, CalendarIcon, ClockIcon, ChevronDownIcon, DotsHorizontalIcon, } from "@radix-ui/react-icons";
import { ScrollArea } from "~/components/ui/scroll-area"
import React, { useState, useEffect } from "react";
import { Form, useLoaderData, useSubmit } from '@remix-run/react'
import MesasageContent from "./messageContent";
import DateTimeComponent from "./DateTime";
import { Calendar } from '~/components/ui/calendar';
import { format } from "date-fns"
import clsx from 'clsx'
import { isDate } from 'date-fns';
import { FaCheck } from "react-icons/fa";

import { toast } from "sonner"
import { cn } from "~/utils";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const CompleteCall = ({ data, contactMethod }) => {
  const [value, onChange] = useState<Value>(new Date());
  const [open, setOpen] = React.useState(false);
  const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const timerRef = React.useRef(0);
  const handleDateSelect = (selectedDate) => { setDate(selectedDate) };
  React.useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);
  const id = data.id ? data.id.toString() : '';
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [date, setDate] = useState<Date>()

  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentSecond = now.getSeconds();
  const [hour, setHour] = useState(currentHour)
  const [min, setMin] = useState(currentMinute)
  const [sec, setSec] = useState(currentSecond);

  const currentTime = `${hour}:${min}:${currentSecond}`
  console.log(`Current time is `, currentTime);

  useEffect(() => {
    function updateTime() {
      setHour(currentHour)
      setMin(currentMinute)
      setSec(currentSecond)
    }
    updateTime();
    const intervalId = setInterval(updateTime, 60000);
    return () => clearInterval(intervalId);
  }, []);
  console.log(`Current time is `, currentTime);
  const time = `${hour}:${min}:${sec}`
  const newDate = new Date()

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className='mx-auto cursor-pointer'>
          <ClipboardCheck className='mx-auto  text-[#fafafa] items-center justify-center hover:text-[#02a9ff] target:text-[#02a9ff]' />
        </div>
      </DialogTrigger>
      <DialogContent className="w-full md:w-[50%]  bg-[#09090b] text-[#fafafa] border-[#262626] h-auto">
        <DialogHeader>
          <DialogTitle>
            <p className="mt-4 text-[#fafafa] ">Schedule Follow-up</p>
            <hr className="my-3 text-[#27272a] w-[98%] mx-auto" />
          </DialogTitle>
        </DialogHeader>
        <Form method="post" >
          <div className='grid grid-cols-1 mx-auto w-[90%] '>
            <div className="relative mt-3">

              <Select name='resultOfcall' defaultValue="Left Message" >
                <SelectTrigger className="w-full  bg-[#09090b] text-[#fafafa] border border-[#27272a]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='bg-[#09090b] text-[#fafafa] '>
                  <SelectGroup>
                    <SelectLabel>Result of call</SelectLabel>
                    <SelectItem value="Reached">Reached</SelectItem>
                    <SelectItem value="Attempted">N/A</SelectItem>
                    <SelectItem value="Left Message">Left Message</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Rescheduled">Rescheduled</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Updating Completed Appointment</label>
            </div>
            <p className=' text-[#fafafa] mt-5'>Creating New Appointment</p>
            <hr className="solid  text-[#27272a] " />
            <div className="relative mt-3">
              <Input
                type="text"
                name="title"
                defaultValue={`F/U on the ${data.model}`}
                className="w-full bg-[#09090b] border-[#27272a] "
              />
              <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Title</label>
            </div>
            <div className="relative mt-3">
              <Select name='note' defaultValue="No Answer / Left Message">
                <SelectTrigger className="w-full bg-[#09090b] text-[#fafafa] border border-[#27272a]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='bg-[#09090b] text-[#fafafa] '>
                  <SelectGroup>
                    <SelectLabel>Message examples</SelectLabel>

                    <SelectItem value="">-- Moving Forward --</SelectItem>
                    <SelectItem value="Wants to move forward, got deposit">Wants to move forward, got deposit</SelectItem>
                    <SelectItem value="Wants to move forward, did not have credit card on him">Wants to move forward, did not have credit card on him</SelectItem>
                    <SelectItem value="Wants to get fiannce approval before moving forward">Wants to get approval before moving forward</SelectItem>
                    <SelectItem value="Sent BOS to sign off on">Sent BOS to sign off on deal</SelectItem>
                    <SelectItem value="Wants to come back in to view and negotiate">Wants to come back in to view and negotiate</SelectItem>

                    <SelectItem value="">-- Stand Still --</SelectItem>
                    <SelectItem value="Talked to spouse, client was not home">Talked to wife, husband was not home</SelectItem>
                    <SelectItem value="Got ahold of the client, was busy, need to call back">Got ahold of the client, was busy need to call back</SelectItem>
                    <SelectItem value="Gave pricing, need to follow up">Gave pricing, need to follow up</SelectItem>
                    <SelectItem value="Needs to discuss with spouse">Needs to discuss with spouse</SelectItem>
                    <SelectItem value="No Answer / Left Message">No Answer / Left Message</SelectItem>

                    <SelectItem value="">-- Not Moving Forward --</SelectItem>
                    <SelectItem value="Does not want to move forward right now wants me to call in the future">Does not want to move forward right now wants me to call in the future</SelectItem>
                    <SelectItem value="Bought else where, set to lost">Bought else where</SelectItem>
                    <SelectItem value="Does not want to move forward, set to lost">Does not want to move forward, set to lost</SelectItem>
                    <SelectItem value=""></SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Pre-Made Notes</label>
            </div>
            <div className="relative mt-3">
              <Input
                name="note"
                className="w-full bg-[#09090b] border-[#27272a] "
              />
              <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Custom Notes</label>
            </div>
            <div className="relative mt-3">
              <Select name='contactMethod' defaultValue="SMS">
                <SelectTrigger className="w-full  bg-[#09090b] text-[#fafafa] border border-[#27272a]  ">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='bg-[#09090b] text-[#fafafa] '>
                  <SelectGroup>
                    <SelectLabel>Contact Method</SelectLabel>
                    <SelectItem value="Phone">Phone</SelectItem>
                    <SelectItem value="In Person">In-Person</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Custom Notes</label>
            </div>
            <div className="relative mt-3">
              <Select name='resourceId' defaultValue="1">
                <SelectTrigger className="w-full  bg-[#09090b] text-[#fafafa] border border-[#27272a] ">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className='bg-[#09090b] text-[#fafafa] '>
                  <SelectGroup>
                    <SelectLabel>Type of Appointment</SelectLabel>
                    <SelectItem value="1">Sales Calls</SelectItem>
                    <SelectItem value="2">Sales Appointments</SelectItem>
                    <SelectItem value="3">Deliveries</SelectItem>
                    <SelectItem value="4">F & I Appointments</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <label className=" text-sm absolute left-3  rounded-full -top-3 px-2 bg-[#09090b] transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-blue-500">Type of Appointment</label>
            </div>
            <div className=' mt-5 flex-col mx-auto justify-center'>
              <div className="mx-auto w-[280px] rounded-md border-white bg-[#09090b] px-3 text-[#fafafa] " >
                <div className='  my-3 flex justify-center   '>
                  <CalendarIcon className="mr-2 size-8 " />
                  {date ? format(date, "PPP") : <span>{format(newDate, "PPP")}</span>}
                </div>
                <Calendar
                  className='mx-auto w-auto   bg-[#09090b] text-[#fafafa]'
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </div>
            </div>
            <div className=' flex-col mx-auto justify-center' >
              <div className="mx-auto w-[280px] rounded-md border-white bg-[#09090b] px-3 text-[#fafafa] " >

                <input type='hidden' value={String(date)} name='value' />
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] px-4 text-[#fafafa] mx-auto  h-[55px] font-normal bg-transparent hover:bg-transparent hover:text-[#02a9ff] border-[#27272a]",
                        !date && " text-[#fafafa]"
                      )}
                    >
                      <div className=' text-[#fafafa]  mx-auto flex justify-center  '>
                        <ClockIcon className="mr-2 size-8 " />
                        {currentTime ? (time) : <span>Pick a Time</span>}
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[275px] bg-[#151518] p-0 text-[#f1f1f1] border-[#27272a]" align="start">
                    <div className='align-center my-3 flex justify-center   '>
                      <Select name='pickHour'  >
                        <SelectTrigger className="m-3 w-auto mx-auto bg-[#09090b] text-[#fafafa] border border-[#27272a]" >
                          <SelectValue defaultValue='09' />
                        </SelectTrigger>
                        <SelectContent className='bg-white text-black' >
                          <SelectGroup>
                            <SelectLabel>Hour</SelectLabel>
                            <SelectItem value="09">09</SelectItem>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="11">11</SelectItem>
                            <SelectItem value="12">12</SelectItem>
                            <SelectItem value="13">13</SelectItem>
                            <SelectItem value="14">14</SelectItem>
                            <SelectItem value="15">15</SelectItem>
                            <SelectItem value="16">16</SelectItem>
                            <SelectItem value="17">17</SelectItem>
                            <SelectItem value="18">18</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <Select name='pickMin'   >
                        <SelectTrigger className="m-3 w-full bg-[#09090b] text-[#fafafa] border border-[#27272a]" >
                          <SelectValue defaultValue='10' />
                        </SelectTrigger>
                        <SelectContent className='bg-white text-black'  >
                          <SelectGroup>
                            <SelectLabel>Minute</SelectLabel>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="30">30</SelectItem>
                            <SelectItem value="40">40</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <Input type='hidden' value={value} name='dateModal' />
          <Input type='hidden' value={value} name='followUpDay' />
          <input type='hidden' value={data.firstName} name='firstName' />
          <input type='hidden' value={data.lastName} name='lastName' />
          <input type='hidden' value={data.phone} name='phone' />
          <input type='hidden' value={data.email} name='email' />
          <input type='hidden' value='scheduleFUp' name='intent' />
          <Input type="hidden" defaultValue={data.userEmail} name="userEmail" />
          <Input type="hidden" defaultValue={data.id} name="financeId" />
          <Input type="hidden" defaultValue={id} name="id" />
          <Input type="hidden" defaultValue={data.brand} name="brand" />
          <Input type="hidden" defaultValue='future' name="apptStatus" />
          <Input type="hidden" defaultValue={data.model} name="unit" />
          <Input type="hidden" defaultValue='no' name="completed" />
          <Input type="hidden" defaultValue='Sales' name="apptType" />
          <input type="hidden" defaultValue={data.vin} name="vin" />
          <input type="hidden" defaultValue={data.stockNum} name="stockNum" />
          <input type='hidden' name='activixId' value={data.activixId} />

          <div className="mt-[25px] flex justify-end">
            <DialogClose >
              <Button
                onClick={() => {
                  setIsButtonPressed(true);
                  toast.message('Event has been created', {
                    description: `${value}, ${currentTime}`,
                  })
                }}
                name='intent' size='sm' value='scheduleFUp' type='submit'
                className={`bg-[#dc2626] cursor-pointer ml-2 mr-2 p-3 hover:text-[#02a9ff] text-[#fafafa] font-bold uppercase text-xs rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all text-center duration-150 ${isButtonPressed ? ' bg-green-500 ' : 'bg-[#02a9ff]'}`}
              >
                Complete
              </Button>
            </DialogClose>
          </div>

        </Form>
      </DialogContent>
    </Dialog >
  )
}

export default CompleteCall
