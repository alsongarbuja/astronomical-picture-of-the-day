import { getPictureToday, getRecentPictures } from "@/lib/controller";
import SingleImageData from "@/components/SingleImageData";
import RecentImage from "@/components/RecentImage";

export default async function Home() {
  const picture = await getPictureToday();
  const recentPictures = await getRecentPictures(4);

  return (
    <main className="max-w-7xl w-[90%] mx-auto grid grid-cols-3 items-center justify-center">
      <section className="py-5 border-b-2 col-span-3">
        <h1 className="text-4xl font-bold">Picture of the day</h1>
        <p className="span text-xl">{picture.date}</p>
      </section>
      <SingleImageData picture={picture} />
      <section className="py-5 border-y-2 col-span-3">
        <h2 className="text-3xl font-bold">Recent Images</h2>
      </section>
      <section className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 pb-8">
        {recentPictures.map((picture, index) => (
          <RecentImage key={index} picture={picture} />
        ))}
      </section>
    </main>
  );
}
