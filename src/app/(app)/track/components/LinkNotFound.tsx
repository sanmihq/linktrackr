import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageContent } from "../../components/PageContent";

export function LinkNotFound() {
  const content = {
    title: "Oops! This link doesn’t exist. ❌",
    description:
      "Looks like this link took a detour! 🛤️ Track new links and stay on course.",
  };
  return (
    <PageContent title={content.title} description={content.description}>
      <Button asChild>
        <Link href="/">Create a New Tracking Link</Link>
      </Button>
    </PageContent>
  );
}
