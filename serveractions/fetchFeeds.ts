"use server";

import { data } from "@/db";

export async function fetchFeeds(cursor: number) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { data: data.slice(cursor, cursor + 3), cursor: cursor + 3 };
}
