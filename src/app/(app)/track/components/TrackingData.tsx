"use client";

import { api } from "@/../convex/_generated/api";
import { useQuery } from "convex/react";
import { PageContent } from "../../components/PageContent";
import { LinkNotFound } from "./LinkNotFound";
import { Skeleton } from "@/components/ui/skeleton";
import { LinkTable } from "../../components/Tables";

interface TrackingDataProps {
  trackingId: string;
}

export function TrackingData({ trackingId }: TrackingDataProps) {
  const link = useQuery(api.links.getTrackingLink, { trackingId });

  if (link === undefined)
    return (
      <div className="mx-auto w-full">
        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      </div>
    );

  if (link === null) {
    return <LinkNotFound />;
  }

  const linkData = [
    { label: "Original URL", value: link.originalUrl },
    { label: "New URL", value: link.newUrl, copyable: true },
    { label: "Tracking Code", value: link.trackingId },
    { label: "Access Link", value: link.accessLink },
  ];

  const content = {
    title: "Tracking & Logs – Your Digital Footprint in Motion 🚀",
    description:
      "Track & Analyze Clicks in Real Time – Because Every Click Counts!",
  };

  return (
    <PageContent title={content.title} description={content.description}>
      <div className="w-full">
        <LinkTable data={linkData} />
      </div>
    </PageContent>
  );
}
