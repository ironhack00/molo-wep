"use client";

import { motion } from "framer-motion";
import { UniversalImage } from "../atoms/UniversalImage";
import { Heading } from "../atoms/Heading";
import { Paragraph } from "../atoms/Paragraph";
import { cn, glassmorphism, glassBorder } from "@/utils/classNames";
import { useLocale } from '@/lib/i18n/IntlProvider';
import Link from "next/link";

interface BlogCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  coverImage: string;
  category: string;
  readTime: number;
  delay?: number;
}

/**
 * Molecule: BlogCard
 * Tarjeta de artículo de blog
 * Reutiliza: UniversalImage, Heading, Paragraph
 */
export function BlogCard({ 
  id, 
  title, 
  description, 
  date, 
  coverImage, 
  category, 
  readTime,
  delay = 0 
}: BlogCardProps) {
  const locale = useLocale();
  const formattedDate = new Date(date).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  
  const readTimeText = locale === 'es' ? 'min lectura' : 'min read';

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <Link 
        href={`/blog/${id}`}
        className={cn(
          "group block h-full rounded-3xl overflow-hidden border transition-all duration-300 hover:scale-[1.02] cursor-pointer",
          glassmorphism.medium,
          glassBorder.light,
          "hover:border-white/30"
        )}
      >
        {/* Image */}
        <div className="relative aspect-[16/9] overflow-hidden bg-black/20">
          <UniversalImage
            src={coverImage}
            alt={title}
            size="full"
            objectFit="cover"
            className="transition-transform duration-500 group-hover:scale-110"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <div className={cn(
              "px-4 py-2 rounded-full text-sm font-medium",
              glassmorphism.dark,
              "border",
              glassBorder.light
            )}>
              {category}
            </div>
          </div>

          {/* Arrow Icon */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1">
            <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
              <svg className="w-5 h-5 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          <Heading level="h3" className="text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors !text-xl md:!text-2xl">
            {title}
          </Heading>
          
          <Paragraph size="sm" className="text-white/70 mb-4 line-clamp-2">
            {description}
          </Paragraph>

          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-white/60">
            <time dateTime={date}>{formattedDate}</time>
            <span>•</span>
            <span>{readTime} {readTimeText}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

