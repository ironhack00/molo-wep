"use client";

import { BlogCard } from "../../molecules/BlogCard";
import { SectionTitle } from "../../molecules/SectionTitle";
import { BlogFilters } from "../../molecules/BlogFilters";
import { cn, sectionPadding, maxWidths, themeColors } from "@/utils/classNames";
import { useTranslations } from '@/lib/i18n/IntlProvider';
import type { BlogPost } from "@/data/blog/postsData";

interface BlogGridSectionProps {
  posts: BlogPost[];
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

/**
 * Organism: BlogGridSection
 * Grid de artículos del blog con filtros
 * Reutiliza: BlogCard, SectionTitle, BlogFilters
 */
export function BlogGridSection({ 
  posts, 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: BlogGridSectionProps) {
  const t = useTranslations('blog');

  return (
    <section className={cn("relative", sectionPadding.y)}>
      <div className={cn(maxWidths.xl, sectionPadding.x)}>
        {/* Header */}
        <div className="mb-12">
          <SectionTitle className={cn(themeColors.white, "mb-8 text-center md:text-left")}>
            {String(t('title'))} <span className={themeColors.primary}>{String(t('titleHighlight'))}</span>
          </SectionTitle>
          
          {/* Filters */}
          <BlogFilters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>

        {/* Grid */}
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, index) => (
              <BlogCard
                key={post.id}
                {...post}
                delay={index * 0.1}
              />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <div className="mb-6">
              <svg className="w-16 h-16 mx-auto text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <p className="text-white/60 text-lg">{String(t('noArticles'))}</p>
          </div>
        )}
      </div>
    </section>
  );
}

