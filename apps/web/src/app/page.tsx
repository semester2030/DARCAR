import type { Metadata } from "next";
import { getHomeContent } from "@/lib/get-home-content";
import { HomePageView } from "@/components/home/home-page-view";

export async function generateMetadata(): Promise<Metadata> {
  const doc = await getHomeContent();
  return {
    title: doc.meta.titleAr,
    description: doc.meta.descriptionAr,
  };
}

export default async function HomePage() {
  const document = await getHomeContent();
  return <HomePageView document={document} />;
}
