"use client";
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
    getPictures();
  };

  const getPictures = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&count=${count}`
    );
    const data = await response.json();
    setPictures(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getPictures();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="max-w-7xl w-[90%] mx-auto flex flex-col gap-2 min-h-screen p-6 md:p-12">
      <h1 className="text-2xl font-bold">Random Images</h1>
      <form className="flex gap-2 w-full" onSubmit={handleSubmit}>
        <input
          type="number"
          name="count"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          max={50}
          className="w-[50%] rounded border shadow text-black bg-gray-50 px-2"
        />
        <button type="submit" className="px-6 py-2 rounded-sm bg-nasa-red">
          Voyage
        </button>
      </form>
      <p className="font-bold text-orange-400">
        <i>Search for less than 50 images at a time</i>
      </p>
      {isLoading && (
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
      )}
      <div className="gap-4 columns-1 sm:columns-2 md:columns-3">
        {pictures?.map((picture, index) => (
          <div key={index} className="break-inside-avoid mb-4">
            <SingleImageData picture={picture} onlyImage />
          </div>
        ))}
      </div>
    </main>
  );
};

export default RandomImages;
