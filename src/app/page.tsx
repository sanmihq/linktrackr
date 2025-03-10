import { PageContent } from "./(app)/components/PageContent";
import LinkInput from "./(app)/components/LinkInput";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "LinkTrackr - Home",
  description:
    "Generate and track your links with LinkTrackr. Monitor clicks and analyze your audience.",
};

export default function Home() {
  const content = {
    title: "Welcome to LinkTrackr 🔗",
    description:
      "Your gateway to smarter link tracking! Enter a URL to generate a tracking link and start monitoring clicks instantly.",
  };

  return (
    <PageContent title={content.title} description={content.description}>
      <LinkInput />
    </PageContent>
  );
}
