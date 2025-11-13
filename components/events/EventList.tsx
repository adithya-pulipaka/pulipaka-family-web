import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPinIcon } from "@/components/ui/icons/heroicons-map-pin";

interface EventInfo {
  eventId: string | null;
  eventName: string | null;
  description: string | null;
  eventStartTime: string | null;
  eventEndTime: string | null;
  location: string | null;
}

const EventList = () => {
  const [events, setEvents] = useState<EventInfo[]>([]);
  useEffect(() => {
    const getEvents = async () => {
      const eventsList = await axios.get("http://localhost:8000/events");
      setEvents(eventsList.data);
      console.log(eventsList.data);
    };
    getEvents();
  }, []);
  return (
    <section className="flex gap-8 w-full">
      {events &&
        events.length > 0 &&
        events.map((event) => {
          return (
            <Card className="w-full max-w-sm" key={event.eventId}>
              <CardHeader>
                <CardTitle>{event.eventName}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPinIcon size={16} />
                  {event.location}
                </CardDescription>
              </CardHeader>
              <CardContent></CardContent>
              <CardFooter className="flex-col gap-2">
                <Button className="w-full" asChild>
                  <Link href={`events/${event.eventId}`}>
                    View Event Details
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
    </section>
  );
};

export default EventList;
