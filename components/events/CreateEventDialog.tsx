"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Calendar26 from "@/components/calendar-26";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface EventInfo {
  eventId: string | null;
  eventName: string | null;
  description: string | null;
  eventStartTime: string | null;
  eventEndTime: string | null;
  location: string | null;
}

const CreateEventDialog = () => {
  const [open, setOpen] = useState(false);
  const [eventInfo, setEventInfo] = useState<EventInfo>({
    eventId: null,
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
    <>
      <Button
        onClick={() => setOpen(true)}
        className="hover:cursor-pointer"
        variant={"outline"}
      >
        Create Event
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <form>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Event Details</DialogTitle>
              <DialogDescription>
                Create a new Event using this form below. You can always update
                the event info later.
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
    </>
  );
};

export default CreateEventDialog;
