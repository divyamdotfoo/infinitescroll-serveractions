import { Feeds } from "@/components/Feeds";
import { fetchFeeds } from "@/serveractions/fetchFeeds";
import dynamic from "next/dynamic";
export default async function Home() {
  const data = await fetchFeeds(0);
  return <Feeds initialCursor={data.cursor} initialPosts={data.data} />;
}
