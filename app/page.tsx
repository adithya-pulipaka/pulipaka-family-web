"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Calendar26 from "@/components/calendar-26";
import { useState } from "react";
import axios from "axios";

interface EventInfo {
  eventName: string | null;
  description: string | null;
  eventStartTime: string | null;
  eventEndTime: string | null;
  location: string | null;
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState<EventInfo>({
    eventName: null,
    description: null,
    eventStartTime: null,
    eventEndTime: null,
    location: null,
  });

  const updateEventDuration = (startTime: string, eventEndTime: string) => {
    setEventInfo({
      ...eventInfo,
      eventStartTime: startTime,
      eventEndTime: eventEndTime,
    });
  };

  const onSubmit = async () => {
    console.log(eventInfo);
    eventInfo.description = "desc-1";
    eventInfo.eventName = "hello there";
    eventInfo.location = "hyderabad";
    const response = await axios.post(
      "http://localhost:8000/events",
      eventInfo
    );
    console.log(response);
    setOpen(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center py-16 px-8 bg-white dark:bg-black sm:items-start">
        <div className="">
          <Button
            onClick={() => setOpen(true)}
            className="hover:cursor-pointer"
          >
            Create Event
          </Button>
        </div>
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <Dialog open={open} onOpenChange={setOpen}>
            <form>
              {/* <DialogTrigger asChild>
                <Button>Create Event</Button>
              </DialogTrigger> */}
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Event Details</DialogTitle>
                  <DialogDescription>
                    Create a new Event using this form below. You can always
                    update the event info later.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="eventName">Event Name</Label>
                    <Input
                      id="eventName"
                      name="eventName"
                      defaultValue="Pedro Duarte"
                      placeholder="Enter the event name here"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="eventDescription">Event Description</Label>
                    <Input
                      id="eventDescription"
                      name="eventDescription"
                      defaultValue="@peduarte"
                      placeholder="Brief info about the event"
                    />
                  </div>
                  <div className="grid gap-3">
                    <Calendar26
                      onEventDurationChange={updateEventDuration}
                    ></Calendar26>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="eventLocation">Event Location</Label>
                    <Input
                      id="eventLocation"
                      name="eventLocation"
                      defaultValue="@peduarte"
                      placeholder="Location of the event"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit" onClick={onSubmit}>
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
        </div>
      </main>
    </div>
  );
}
