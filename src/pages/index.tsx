"use client";
import { useState, useEffect, useCallback } from "react";
import SearchBar from "@/components/SearchBar";
import ImageGrid, { UnsplashImage } from "@/components/ImageGrid";
import ImageModal from "@/components/ImageModal";

function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<T>) {
    clearTimeout(timer);
    timer = setTimeout(() => func(...args), delay);
  };
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<UnsplashImage[]>([]);
  const [page, setPage] = useState(1);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fetchImages = async (newQuery: string, pageNumber: number) => {
    setIsLoading(true);
    const res = await fetch(
      `https://api.unsplash.com/search/photos?client_id=Ip0XA55zY7b7-d19osq1L5btGg-YCeDZVpnnJjXqHxs&query=${newQuery}&page=${pageNumber}&per_page=30`
    );
    const data = await res.json();
    setIsLoading(false);

    if (pageNumber === 1) {
      setImages(data.results);
    } else {
      setImages((prev) => [...prev, ...data.results]);
    }
  };

  const handleSearch = (newQuery: string) => {
    if (!newQuery.trim()) return;
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setHasSearched(true);
  };

  useEffect(() => {
    if (!hasSearched) return;
    fetchImages(query, page);
  }, [page, query, hasSearched]);

  const handleScroll = useCallback(
    debounce(() => {
      const bottomReached =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 100;

      if (bottomReached && !isLoading) {
        setPage((prev) => prev + 1);
      }
    }, 300),
    [isLoading]
  );

  useEffect(() => {
    if (!hasSearched) return;
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasSearched, handleScroll]);

  return (
    <main className="min-h-screen w-full">
      <div
        className={`transition-all duration-500 ${
          hasSearched
            ? "mt-[40px] mb-[16px] pl-[16px] sm:pl-[80px] items-start"
            : "h-screen flex items-center justify-center"
        }`}
      >
        <SearchBar onSearch={handleSearch} />
      </div>

      {hasSearched && images.length > 0 && (
        <div className="px-[16px] sm:px-[80px]">
          <ImageGrid images={images} onImageClick={(src) => setSelectedImage(src)} />

          {selectedImage && (
            <ImageModal src={selectedImage} onClose={() => setSelectedImage(null)} />
          )}
        </div>
      )}

      {hasSearched && images.length === 0 && !isLoading && (
        <p className="mt-[40px] text-center text-lg text-gray-600">
          К сожалению, поиск не дал результатов
        </p>
      )}

      {isLoading && (
        <div className="flex justify-center items-center my-8">
          <div className="w-6 h-6 border-4 border-t-transparent border-gray-400 rounded-full animate-spin" />
        </div>
      )}
    </main>
  );
}