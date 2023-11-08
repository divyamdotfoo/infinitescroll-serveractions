import { Feeds } from "@/components/Feeds";
import { fetchFeeds } from "@/serveractions/fetchFeeds";
export default async function Home() {
  const data = await fetchFeeds(0);
  return <Feeds initialCursor={data.cursor} initialPosts={data.data} />;
}
