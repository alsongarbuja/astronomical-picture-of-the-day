"use client"
import SingleImageData from "@/components/SingleImageData";
import { useEffect, useState } from "react";

const RandomImages = () => {
  const [count, setCount] = useState<number>(20);
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (count > 50) {
      return;
    }
    setIsLoading(true);
    getPictures();
  }

  const getPictures = async () => {
    const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&count=${count}`);
    const data = await response.json();
    console.log(data);

    setPictures(data);
    setIsLoading(false);
  }

  useEffect(() => {
    setIsLoading(true);
    getPictures();
  }, [])


  return (
    <main className="max-w-7xl w-[90%] mx-auto flex flex-col gap-4 min-h-screen p-6 md:p-12">
      <h1 className="text-2xl font-bold">Random Images</h1>
      <form className="flex gap-2 w-full" onSubmit={handleSubmit}>
        <input
          type="number"
          name="count"
          value={count}
          onChange={e => setCount(parseInt(e.target.value))}
          max={50}
          className='w-[50%] rounded border shadow text-black bg-gray-50 px-2'
        />
        <button type="submit" className="px-6 py-2 rounded-sm bg-nasa-red">Fly</button>
      </form>
      {
        isLoading && (
          <div className="min-h-[60wv] w-full">
            <div className="animate-pulse flex flex-wrap gap-4">
              <div className="w-96 h-96 bg-gray-500 rounded-lg"></div>
              <div className="w-96 h-96 bg-gray-500 rounded-lg"></div>
              <div className="w-96 h-96 bg-gray-500 rounded-lg"></div>
              <div className="w-96 h-96 bg-gray-500 rounded-lg"></div>
              <div className="w-96 h-96 bg-gray-500 rounded-lg"></div>
              <div className="w-96 h-96 bg-gray-500 rounded-lg"></div>
              <div className="w-96 h-96 bg-gray-500 rounded-lg"></div>
              <div className="w-96 h-96 bg-gray-500 rounded-lg"></div>
            </div>
          </div>
        )
      }
      <div className="flex gap-4 flex-wrap">
        {
          pictures?.map((picture, index) => (
            <div key={index}>
              <SingleImageData picture={picture} onlyImage />
            </div>
          ))
        }
      </div>
    </main>
  )
}

export default RandomImages
