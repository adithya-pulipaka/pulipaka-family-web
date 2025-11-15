import EventList from "@/components/events/EventList";
import CreateEventDialog from "@/components/events/CreateEventDialog";

export default function Home() {
  return (
    <section className=" dark:bg-black flex flex-col gap-8">
      <section className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <p className="text-md font-bold">Upcoming Events</p>
          <div>
            <CreateEventDialog />
          </div>
        </div>
        <div>
          <EventList />
        </div>
      </section>
      <section className="flex flex-col gap-4">
        <p className="text-md font-bold">Past 3 Events</p>
        <div>
          <EventList />
        </div>
      </section>
    </section>
  );
}
