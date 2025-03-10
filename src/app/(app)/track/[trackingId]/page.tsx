import { Metadata } from "next";
import { TrackingData } from "../components/TrackingData";

interface TrackingPageProps {
  params: { trackingId?: string };
}

export async function generateMetadata({
  params,
}: TrackingPageProps): Promise<Metadata> {
  const { trackingId } = params;
  return {
    title: `LinkTrackr - Tracking ${trackingId}`,
    description: `Tracking details for link ID: ${trackingId}. Monitor clicks and analyze traffic.`,
  };
}

export default function TrackingPage({ params }: TrackingPageProps) {
  const { trackingId } = params;

  return <TrackingData trackingId={trackingId!} />;
}
