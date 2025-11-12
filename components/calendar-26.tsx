"use client";

import { useState, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { addYears, format } from "date-fns";

interface FunctionProps {
  onEventDurationChange: (startDateTime: string, endDateTime: string) => void;
}

export default function Calendar26({ onEventDurationChange }: FunctionProps) {
  const [openFrom, setOpenFrom] = useState(false);
  const [openTo, setOpenTo] = useState(false);
  const [dateFrom, setDateFrom] = useState<Date>(new Date());
  const [dateTo, setDateTo] = useState<Date>(addYears(new Date(), 1));
  const [timeFrom, setTimeFrom] = useState("00:00:00");
  const [timeTo, setTimeTo] = useState("23:59:59");

  useEffect(() => {
    let fromDateTime = `${format(dateFrom, "yyyy-MM-dd")} ${timeFrom}`;
    let toDateTime = `${format(dateTo, "yyyy-MM-dd")} ${timeTo}`;
    onEventDurationChange(fromDateTime, toDateTime);
  }, [dateFrom, dateTo, timeFrom, timeTo]);

  return (
    <div className="flex w-full max-w-80 min-w-0 flex-col gap-6">
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-3">
          <Label htmlFor="date-from" className="px-1">
            Event Start Time
          </Label>
          <Popover open={openFrom} onOpenChange={setOpenFrom}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-from"
                className="w-full justify-between font-normal"
              >
                {dateFrom
                  ? dateFrom.toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dateFrom}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (date) {
                    setDateFrom(date);
                    setOpenFrom(false);
                  }
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-from" className="invisible px-1">
            From
          </Label>
          <Input
            type="time"
            id="time-from"
            step="1"
            defaultValue={timeFrom}
            onChange={(val) => setTimeFrom(val.target.value)}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-1 flex-col gap-3">
          <Label htmlFor="date-to" className="px-1">
            Event End Time
          </Label>
          <Popover open={openTo} onOpenChange={setOpenTo}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-to"
                className="w-full justify-between font-normal"
              >
                {dateTo
                  ? dateTo.toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "Select date"}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dateTo}
                endMonth={dateTo}
                captionLayout="dropdown"
                onSelect={(date) => {
                  if (date) {
                    setDateTo(date);
                    setOpenTo(false);
                  }
                }}
                disabled={dateFrom && { before: dateFrom }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-to" className="invisible px-1">
            To
          </Label>
          <Input
            type="time"
            id="time-to"
            step="1"
            defaultValue={timeTo}
            onChange={(val) => setTimeTo(val.target.value)}
            className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}
