"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Poll } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { format, isAfter } from "date-fns";
import { Copy, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getURL } from "@/lib/utils";

type Props = {
  polls: Poll[];
};

const PollsTable = ({ polls }: Props) => {
  return (
    <div className="rounded-md border">
      <Table>
        <colgroup>
          <col width="50%" />
          <col width="10%" />
          <col width="15%" />
          <col width="15%" />
        </colgroup>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>End At</TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {polls.map((poll) => (
            <TableRow key={poll.id}>
              <TableCell className="max-w-full truncate">
                {poll.title}
              </TableCell>
              <TableCell>
                <Badge variant={"secondary"}>
                  {isAfter(new Date(), poll.ends_at) ? "Expired" : "Active"}
                </Badge>
              </TableCell>
              <TableCell>{format(poll.created_at, "dd/MM/yyyy")}</TableCell>
              <TableCell>{format(poll.ends_at, "dd/MM/yyyy")}</TableCell>
              <TableCell className="flex gap-3">
                <Button asChild variant={"ghost"}>
                  <Link
                    href={`/poll/${poll.id}`}
                    target="_blank"
                    className="flex items-center gap-2">
                    View <ExternalLink size={16} />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2"
                  onClick={() => {
                    toast.promise(
                      navigator.clipboard.writeText(
                        `${getURL()}/poll/${poll.id}`
                      ),
                      {
                        loading: "Copying...",
                        success: "Copied!",
                        error: "Failed to copy",
                        position: "bottom-right",
                      }
                    );
                  }}>
                  Share <Copy size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PollsTable;
