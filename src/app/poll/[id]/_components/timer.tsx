"use client";

import { Badge } from "@/components/ui/badge";
import { Timer } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";

type Props = {
  date: string;
};

const doubleDigits = (num: number) => {
  return num.toString().padStart(2, "0");
};

const calculateTimeLeft = (targetDate: Date) => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference < 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = doubleDigits(Math.floor((difference / (1000 * 60 * 60)) % 24));
  const minutes = doubleDigits(Math.floor((difference / (1000 * 60)) % 60));
  const seconds = doubleDigits(Math.floor((difference / 1000) % 60));

  return {
    days,
    hours,
    minutes,
    seconds,
  };
};

const TimerCountDown = ({ date }: Props) => {
  const targetDate = useMemo(() => new Date(date), [date]);
  const [timeLeft, setTimeLeft] = useState(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft(targetDate);
      setTimeLeft(timeLeft);
      if (
        timeLeft.days === 0 &&
        timeLeft.hours === 0 &&
        timeLeft.minutes === 0 &&
        timeLeft.seconds === 0
      ) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (targetDate < new Date()) {
    return (
      <div>
        <Badge>Expired</Badge>
      </div>
    );
  }

  return (
    <div
      className="text-md flex items-center gap-2 font-geist-mono leading-relaxed text-gray-500 dark:text-gray-400"
      suppressHydrationWarning>
      <Timer size={18} />
      <span suppressHydrationWarning className="mt-[3px]">
        {timeLeft.days}D:
      </span>
      <span suppressHydrationWarning className="mt-[3px]">
        {timeLeft.hours}H:
      </span>
      <span suppressHydrationWarning className="mt-[3px]">
        {timeLeft.minutes}M:
      </span>
      <span suppressHydrationWarning className="mt-[3px]">
        {timeLeft.seconds}S
      </span>
    </div>
  );
};

export default TimerCountDown;
