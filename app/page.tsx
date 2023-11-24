import { fetchFeeds } from "@/serveractions/fetchFeeds";
import dynamic from "next/dynamic";
const Feeds = dynamic(() => import("@/components/Feeds"), { ssr: false });
export default async function Home() {
  const data = await fetchFeeds(0);
  return <Feeds initialCursor={data.cursor} initialPosts={data.data} />;
}
