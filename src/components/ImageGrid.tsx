import Image from "next/image";

type UnsplashImage = {
  id: string;
  alt_description?: string;
  urls: {
    regular: string;
    thumb: string;
  };
};

export default function ImageGrid({
  images,
  onImageClick,
}: {
  images: UnsplashImage[];
  onImageClick: (src: string) => void;
}) {
  return (
   
<div className="flex flex-wrap gap-2">
  {images.map((img) => (
    <div
      key={img.id}
      className="cursor-pointer"
      onClick={() => onImageClick(img.urls.regular)}
    >
      <div className="relative w-[114px] h-[114px] sm:w-[204px] sm:h-[204px]">
        <Image
          src={img.urls.thumb}
          alt={img.alt_description || "image"}
          fill
          className="object-cover rounded border border-[#EBEBEB]"
          sizes="(max-width: 639px) 114px, 204px"
        />
      </div>
    </div>
  ))}
</div>
  );
}
