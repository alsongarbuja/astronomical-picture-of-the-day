import Link from "next/link";
import Image from "next/image";

interface ISingleImageDataProps {
  picture: Picture;
  onlyImage?: boolean;
}

const SingleImageData = ({
  picture,
  onlyImage = false,
}: ISingleImageDataProps) => {
  return (
    <>
      <div className="">
        {picture?.media_type === "image" ? (
          <Link href={picture?.url}>
            <Image
              width={600}
              height={500}
              priority
              src={
                picture?.media_type === "image"
                  ? picture?.hdurl
                  : picture?.thumbnail_url
              }
              alt={picture?.title}
              className={`w-full min-h-[300px] object-cover rounded-md`}
            />
          </Link>
        ) : (
          <iframe
            src={picture?.url}
            className="w-full col-span-3 md:col-span-1"
          ></iframe>
        )}
      </div>
      {!onlyImage && (
        <p className="text-justify col-span-3 md:col-span-2 py-4 md:px-4">
          {picture?.explanation}
        </p>
      )}
    </>
  );
};

export default SingleImageData;
