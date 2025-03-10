"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Check, Copy, Trash2 } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface LinkItem {
  label: string;
  value: string | null;
  copyable?: boolean;
}

interface LinkTableProps {
  data: LinkItem[];
}

export function LinkTable({ data }: LinkTableProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (value: string, index: number) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <Table className="mx-auto max-w-5xl border border-gray-200">
      <TableCaption>Tracking details for your link.</TableCaption>
      <TableHeader>
        <TableRow className="border-b border-gray-200 bg-gray-100">
          <TableHead className="border-r border-gray-200">Label</TableHead>
          <TableHead className="text-left">Value</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index} className="border-b border-gray-200">
            <TableCell className="w-[10rem] min-w-[10rem] border-r border-gray-200 text-left font-medium">
              {item.label}
            </TableCell>
            <TableCell
              className={`text-left ${item.copyable && "flex items-center gap-4"}`}
            >
              {item.value}
              {"    "}
              {item.copyable && item.value && (
                <>
                  {" "}
                  <Button
                    size="sm"
                    onClick={() => handleCopy(item.value!, index)}
                  >
                    {copiedIndex === index ? (
                      <>
                        Copied <Check />
                      </>
                    ) : (
                      <>
                        Copy <Copy />
                      </>
                    )}
                  </Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

interface UserLinksTableProps {
  data: Array<{
    accessLink: string;
    trackingId: string;
    originalUrl: string;
    clicks: number;
    copyable?: boolean;
    value?: string;
  }>;
  onDelete: (trackingId: string) => void;
}

export function UserLinksTable({ data, onDelete }: UserLinksTableProps) {
  const [deleteId, setDeleteId] = useState<string | null>(null);

  return (
    <Table className="mx-auto w-full max-w-7xl border border-gray-300">
      <TableHeader>
        <TableRow className="border-b border-gray-300 bg-gray-100">
          <TableHead className="w-[4rem] border-r border-gray-300 text-center">
            S/N
          </TableHead>
          <TableHead className="w-[7rem] border-r border-gray-300">
            Tracking ID
          </TableHead>
          <TableHead className="w-[6rem] border-r border-gray-300 text-center">
            Clicks
          </TableHead>
          <TableHead className="w-[20rem] border-r border-gray-300">
            Original URL
          </TableHead>
          <TableHead className="w-[4rem] text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.trackingId} className="border-b border-gray-300">
            <TableCell className="border-r border-gray-300 text-center font-medium">
              {index + 1}
            </TableCell>
            <TableCell className="truncate border-r border-gray-300">
              <span title={item.trackingId} className="block truncate">
                <Link href={item.accessLink} target="_blank">
                  {item.trackingId}
                </Link>
              </span>
            </TableCell>
            <TableCell className="border-r border-gray-300 text-center">
              {item.clicks}
            </TableCell>
            <TableCell className="max-w-[20rem] truncate border-r border-gray-300">
              <span title={item.originalUrl} className="block truncate">
                {item.originalUrl}
              </span>
            </TableCell>
            <TableCell className="text-center">
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setDeleteId(item.trackingId)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      the tracking link.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => {
                        if (deleteId) {
                          onDelete(deleteId);
                          setDeleteId(null);
                        }
                      }}
                    >
                      Confirm
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
