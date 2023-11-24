"use client";

import { Feeds } from "@/db";
import { fetchFeeds } from "@/serveractions/fetchFeeds";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

export default function Feeds({
  initialPosts,
  initialCursor,
}: {
  initialPosts: Feeds;
  initialCursor: number;
}) {
  const feedRef = useRef<HTMLDivElement>(null);
  const [posts, setPosts] = useState<Feeds>(initialPosts);
  const [cursor, setCursor] = useState(initialCursor);
  const [loading, setLoading] = useState(false);
  const [lastChild, setLastChild] = useState<HTMLDivElement | null | Element>(
    null
  );

  const infiniteFetching = async () => {
    setLoading(true);
    const data = await fetchFeeds(cursor);
    flushSync(() => {
      setPosts((p) => [...p, ...data.data]);
    });
    setLoading(false);
    setLastChild(feedRef.current?.lastElementChild!);
    setCursor(data.cursor);
  };

  const observerFunction = (entry: IntersectionObserverEntry[]) => {
    entry.forEach((item) => {
      if (item.isIntersecting) {
        infiniteFetching();
        console.log("infinite fetching has been executed");
      }
    });
  };

  const observer = new IntersectionObserver(observerFunction);

  useEffect(() => {
    console.log(lastChild);
    if (!lastChild) {
      setLastChild(feedRef.current?.lastElementChild!);
      return;
    }
    observer.observe(lastChild);
    return () => observer.disconnect();
  }, [lastChild]);

  return (
    <>
      <div className=" flex flex-col gap-4" ref={feedRef}>
        {posts.map((p) => (
          <div
            className=" w-96 h-96 border-white bg-blue-600 text-white flex items-center justify-center"
            key={p.id}
          >
            {p.text}
          </div>
        ))}
      </div>
      {loading && (
        <div className=" flex flex-col gap-4 my-4">
          <div className=" w-96 h-96 border-white bg-blue-600 text-white">
            Loading ..
          </div>
          <div className=" w-96 h-96 border-white bg-blue-600 text-white my-4">
            Loading ..
          </div>
        </div>
      )}
    </>
  );
}
