import Image from "next/image";
import Link from "next/link";

interface RecentImageProps {
  picture: Picture;
}

const RecentImage = ({ picture }: RecentImageProps) => {
  return (
    <div className={`flex flex-col border-y md:border-x`}>
      <h3 className="text-2xl text-center py-2 bg-gray-200/20">
        {picture?.date}
      </h3>
      {picture?.media_type === "image" ? (
        <Link href={picture?.url}>
          <Image
            width={600}
            height={400}
            src={
              picture?.media_type === "image"
                ? picture?.hdurl
                : picture?.thumbnail_url
            }
            alt={picture?.title}
            className="w-full h-[400px] object-cover"
          />
        </Link>
      ) : (
        <iframe src={picture?.url} className="w-full"></iframe>
      )}
    </div>
  );
};

export default RecentImage;
