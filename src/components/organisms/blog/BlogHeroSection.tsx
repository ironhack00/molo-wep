"use client";

import { IconArrowUp, IconCalendar } from "@tabler/icons-react";
import Image from "next/image";
import { useLocale } from '@/lib/i18n/IntlProvider';
import Link from "next/link";
import type { BlogPost } from "@/data/blog/postsData";
import React from "react";

interface BlogHeroSectionProps {
  post: BlogPost;
}

/**
 * Organism: BlogHeroSection
 * Hero section con el post destacado
 * Diseño igual al de Molokaih-web-v3
 */
export function BlogHeroSection({ post }: BlogHeroSectionProps) {
  const locale = useLocale();
  
  const formattedDate = new Date(post.date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${post.id}`}
      className="w-[98%] mx-auto aspect-2/1 max-md:aspect-3/5 relative rounded-[32px] overflow-hidden flex justify-end items-end mb-20"
    >
      <Image
        width={1200}
        height={1200}
        alt={post.title}
        src={post.coverImage}
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="z-10 relative w-full h-[27%] min-h-[180px] bg-black/60 backdrop-blur-lg
        flex flex-col lg:flex-row lg:justify-between lg:items-center
        px-3 py-3 gap-2
        sm:px-4 sm:py-4 sm:gap-3
        md:px-6 md:py-5 md:gap-4
        lg:px-8 lg:py-4 lg:gap-4
        xl:px-10 xl:py-5 xl:min-h-[200px]">

        {/* Contenido principal */}
        <div className="flex-1 flex flex-col justify-between h-full min-h-[120px]">
          {/* Títulos con texto adaptativo */}
          <div className="mb-2 lg:mb-0 overflow-hidden">
            <h2 className="font-medium w-full mb-1 leading-tight line-clamp-2
              text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl
              sm:mb-2 md:mb-2 lg:mb-2">
              {post.title}
            </h2>

            <p className="text-white/80 font-light w-full leading-snug line-clamp-2
              text-xs sm:text-sm md:text-base lg:text-sm xl:text-base
              mb-2 sm:mb-3 md:mb-4 lg:mb-3">
              {post.description}
            </p>
          </div>

          {/* Fecha y Categorías - más compactas */}
          <div className="flex flex-col gap-2 mt-auto 
            sm:gap-3 
            lg:flex-row lg:justify-between lg:items-center lg:gap-4">
            
            {/* Fecha - más compacta */}
            <div className="flex justify-start items-center gap-2 sm:gap-3">
              <div className="flex justify-center items-center gap-1.5 sm:gap-2
                text-xs sm:text-sm lg:text-xs xl:text-sm">
                <div className="border border-white p-1 rounded-full sm:p-1.5">
                  <IconCalendar className="size-3 sm:size-4 lg:size-4 xl:size-5" />
                </div>
                <p className="leading-tight">
                  <time dateTime={post.date}>
                    {formattedDate}
                  </time>
                </p>
              </div>
            </div>

            {/* Categorías - texto más pequeño y adaptativo */}
            <div className="flex items-center text-white/80 gap-1.5 whitespace-nowrap overflow-hidden
              text-xs sm:text-sm lg:text-xs xl:text-sm
              sm:gap-2 lg:gap-1.5">
              <span className="truncate max-w-[80px] sm:max-w-[180px] lg:max-w-[180px]">
                {post.category}
              </span>
            </div>
          </div>
        </div>

        {/* Botón flecha - posicionado de forma más eficiente */}
        <button className="absolute top-3 right-3 z-20 hover:scale-105 transition-transform active:scale-100
          sm:top-4 sm:right-4
          md:top-5 md:right-5
          lg:top-4 lg:right-6
          xl:top-5 xl:right-8">
          <IconArrowUp
            className="rotate-45 hover:scale-105 active:scale-100 transition-all
              size-5 sm:size-6 md:size-7 lg:size-6 xl:size-8"
            strokeWidth={1}
          />
        </button>

      </div>
    </Link>
  );
}

