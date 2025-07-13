import Image from "next/image";

export default function ImageModal({
  src,
  onClose,
}: {
  src: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/30 z-50 overflow-auto">
      <button
        onClick={onClose}
        className="fixed top-[24px] right-[24px] z-50"
        aria-label="Закрыть"
      >
        <Image
          src="/close-icon.svg" 
          alt="Закрыть"
          width={24}
          height={24}
        />
      </button>

      <div className="w-full flex justify-center mt-[40px]">
        <div className="relative w-[266px] h-[266px] sm:w-[767px] sm:h-[760px]">
          <Image
            src={src}
            alt="Расширенное изображение"
            fill
            className="object-contain rounded"
            sizes="(max-width: 639px) 266px, 767px"
          />
        </div>
      </div>
    </div>
  );
}