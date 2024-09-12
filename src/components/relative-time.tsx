"use client";

import React from "react";
import { formatRelative } from "date-fns";

type Props = {
  date: string;
};

const RelativeTime = ({ date }: Props) => {
  return <>{formatRelative(new Date(date), new Date())}</>;
};

export default RelativeTime;
