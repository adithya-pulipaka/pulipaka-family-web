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
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import EventList from "@/components/events/EventList";

interface EventInfo {
  eventId: string | null;
  eventName: string | null;
  description: string | null;
  eventStartTime: string | null;
  eventEndTime: string | null;
  location: string | null;
}

export default function Home() {
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
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full flex-col items-center py-16 px-8 bg-white dark:bg-black sm:items-start">
        <EventList />
      </main>
    </div>
  );
}
