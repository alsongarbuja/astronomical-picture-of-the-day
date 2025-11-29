"use client";
import SingleImageData from "@/components/SingleImageData";
import moment from "moment";
import { useEffect, useState } from "react";

const DateRangeImages = () => {
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment().subtract(3, "days").format("YYYY-MM-DD"),
    endDate: moment().format("YYYY-MM-DD"),
  });
  const [pictures, setPictures] = useState<Picture[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateRange({
      ...dateRange,
      [e.target.name]: moment(e.target.value).format("YYYY-MM-DD"),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    getPictures();
  };

  const getPictures = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NEXT_PUBLIC_NASA_API_KEY}&start_date=${dateRange.startDate}&end_date=${dateRange.endDate}`
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
    <main className="max-w-7xl w-[90%] mx-auto flex flex-col gap-4 min-h-screen p-6 md:p-12">
      <h1 className="text-2xl font-bold">Date Range Images</h1>
      <form className="flex gap-2 w-full" onSubmit={handleSubmit}>
        <input
          type="date"
          name="startDate"
          value={dateRange.startDate}
          onChange={handleDateChange}
          max={moment().subtract(1, "day").format("YYYY-MM-DD")}
          className="w-[50%] rounded border shadow text-black bg-gray-50 px-2"
        />
        <input
          type="date"
          name="endDate"
          value={dateRange.endDate}
          onChange={handleDateChange}
          max={moment().format("YYYY-MM-DD")}
          className="w-[50%] rounded border shadow text-black bg-gray-50 px-2"
        />
        <button type="submit" className="px-6 py-2 rounded-sm bg-nasa-red">
          Fly
        </button>
      </form>
      {isLoading && (
        <div className="min-h-[60wv] w-full">
          <div className="animate-pulse flex flex-col gap-4">
            <div className="w-1/2 mx-auto h-12 bg-gray-500 rounded-lg"></div>
            <div className="w-1/2 mx-auto h-96 bg-gray-500 rounded-lg"></div>
            <div className="w-full h-52 bg-gray-500 rounded-lg"></div>
            <div className="w-1/2 mx-auto h-12 bg-gray-500 rounded-lg"></div>
            <div className="w-1/2 mx-auto h-96 bg-gray-500 rounded-lg"></div>
            <div className="w-full h-52 bg-gray-500 rounded-lg"></div>
          </div>
        </div>
      )}
      {pictures?.map((picture, index) => (
        <div key={index} className="border-b border-white items-center">
          <h2 className="text-xl font-bold text-center mb-4">
            {picture?.title}
          </h2>
          <SingleImageData picture={picture} />
        </div>
      ))}
    </main>
  );
};

export default DateRangeImages;
