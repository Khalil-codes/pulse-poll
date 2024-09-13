import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";

const Loading = () => {
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
            <TableHead>
              <Skeleton className="h-7 w-20 rounded-md" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-7 w-20 rounded-md" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-7 w-20 rounded-md" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-7 w-20 rounded-md" />
            </TableHead>
            <TableHead className="w-[100px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(4)
            .fill(1)
            .map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-7 w-36 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-7 w-20 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-7 w-24 rounded-md" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-7 w-24 rounded-md" />
                </TableCell>
                <TableCell className="flex w-[100px] gap-3">
                  <Skeleton className="h-7 w-20 rounded-md" />
                  <Skeleton className="h-7 w-20 rounded-md" />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Loading;
