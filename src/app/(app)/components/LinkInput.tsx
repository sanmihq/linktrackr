"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../../convex/_generated/api";
import { toast } from "sonner";

export default function LinkInput() {
  const router = useRouter();
  const { user } = useUser();
  const userId = user?.id;
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const createTrackingLink = useMutation(api.links.createTrackingLink);

  const handleSubmit = async () => {
    if (!url.trim())
      return toast.error("URL field cannot be empty", {
        description: "Please enter a URL to track",
        action: {
          label: "Dismiss",
          onClick: () => toast.dismiss(),
        },
      });

    setLoading(true);
    try {
      const response = await createTrackingLink({
        originalUrl: url,
        userId: userId,
      });
      router.push(`/track/${response.trackingId}`);
      setUrl("");
    } catch (error) {
      console.error("Error creating tracking link:", error);
    }
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="flex w-full flex-col items-center space-y-4">
      <div className="flex items-center space-x-2">
        <Input
          type="url"
          placeholder="Enter a URL to track"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full text-sm sm:w-[25rem]"
        />
        <Button type="button" disabled={loading} onClick={handleSubmit}>
          {loading ? <Loader2 className="animate-spin" /> : "Track"}
        </Button>
      </div>
    </div>
  );
}
