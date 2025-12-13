'use client';

import React, { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageCarouselProps {
  images: string[];
  autoplay?: boolean;
  autoplayDelay?: number;
  className?: string;
}

export const ImageCarousel = ({
  images,
  autoplay = true,
  autoplayDelay = 5000,
  className
}: ImageCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!autoplay || !emblaApi) return;

    const intervalId = setInterval(() => {
      emblaApi.scrollNext();
    }, autoplayDelay);

    return () => clearInterval(intervalId);
  }, [emblaApi, autoplay, autoplayDelay]);

  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0">
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-900">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6 text-gray-800 dark:text-gray-200" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 hover:bg-white dark:hover:bg-gray-900 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-10"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6 text-gray-800 dark:text-gray-200" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              "w-2.5 h-2.5 rounded-full transition-all duration-300",
              selectedIndex === index
                ? "bg-emerald-600 dark:bg-emerald-500 w-8"
                : "bg-white/70 dark:bg-gray-400/70 hover:bg-white dark:hover:bg-gray-300"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
