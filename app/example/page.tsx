import { unstable_noStore as nostore, revalidatePath } from "next/cache";
export default async function Page() {
  const data = await get();
  return (
    <div>
      <img src={data} width={200} height={200} alt="random dog image" />
    </div>
  );
}
async function get() {
  nostore();
  const res = await fetch("http://dog.ceo/api/breeds/image/random");
  const data = await res.json();
  return data.message;
}
