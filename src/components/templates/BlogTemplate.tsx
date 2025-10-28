"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { BlogHeroSection, BlogGridSection } from "../organisms/blog";
import { BackgroundGlow } from "../molecules/BackgroundGlow";
import { sectionPadding, maxWidths } from "@/utils/classNames";
import { useLocale } from '@/lib/i18n/IntlProvider';
import type { BlogPost } from "@/data/blog/postsData";

interface ApiPost {
  id: string;
  titulo: string;
  descripcion: string;
  fecha_publicacion: string;
  imagenes: { id: number; url: string }[];
  contenido: string;
  categorias: { nombre: string; id: number }[];
}

interface Tag {
  nombre: string;
  id: number;
}

/**
 * Template: BlogTemplate
 * Plantilla principal de la página de Blog
 * Organiza todos los organismos de la sección
 * Obtiene datos de la API de Molokaih
 */
export function BlogTemplate() {
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [lastPost, setLastPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  const loadingText = locale === 'es' ? 'Cargando artículos...' : 'Loading articles...';

  // Mapeo de traducciones de categorías
  const categoryTranslations: Record<string, Record<string, string>> = {
    en: {
      "Automatización de Procesos": "Process Automation",
      "Agencia Digital": "Digital Agency",
      "Diseño web moderno": "Modern Web Design",
      "Empresa de diseño web": "Web Design Company",
      "Software a medida": "Custom Software",
      "Agencia de marketing de rendimiento": "Performance Marketing Agency",
      "Agencia Google Ads": "Google Ads Agency",
      "Todos": "All",
      "Sin categoría": "Uncategorized"
    },
    es: {
      "Automatización de Procesos": "Automatización de Procesos",
      "Agencia Digital": "Agencia Digital",
      "Diseño web moderno": "Diseño web moderno",
      "Empresa de diseño web": "Empresa de diseño web",
      "Software a medida": "Software a medida",
      "Agencia de marketing de rendimiento": "Agencia de marketing de rendimiento",
      "Agencia Google Ads": "Agencia Google Ads",
      "Todos": "Todos",
      "Sin categoría": "Sin categoría"
    }
  };

  const translateCategory = (categoryName: string) => {
    return categoryTranslations[locale]?.[categoryName] || categoryName;
  };

  // Obtener categorías
  async function getTags() {
    try {
      const { data } = await axios.get(
        "https://blog-molokaih.onrender.com/api/categorias"
      );

      if (data.length >= 0) {
        const allTags = [
          { id: 0, nombre: locale === 'es' ? "Todos" : "All" },
          ...data,
        ];
        setTags(allTags);
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
      setTags([{ id: 0, nombre: locale === 'es' ? "Todos" : "All" }]);
    }
  }

  // Obtener posts
  async function getPosts() {
    try {
      const params: { page: number; sort: string; category_id?: number } = {
        page: 1,
        sort: "latest",
      };

      if (selectedCategory !== 0) {
        params.category_id = selectedCategory;
      }

      const { data } = await axios.get(
        "https://blog-molokaih.onrender.com/api/posteos",
        { params }
      );

      // Convertir posts de API a formato local
      const convertedPosts: BlogPost[] = data.data.map((post: ApiPost) => ({
        id: post.id,
        title: post.titulo,
        description: post.descripcion,
        date: post.fecha_publicacion,
        coverImage: post.imagenes[0]?.url || "",
        category: translateCategory(post.categorias[0]?.nombre || "Sin categoría"),
        readTime: Math.ceil(post.contenido.length / 1000) || 5,
      }));

      setPosts(convertedPosts);

      // Post destacado
      if (data.last_post) {
        const featured: BlogPost = {
          id: data.last_post.id,
          title: data.last_post.titulo,
          description: data.last_post.descripcion,
          date: data.last_post.fecha_publicacion,
          coverImage: data.last_post.imagenes[0]?.url || "",
          category: translateCategory(data.last_post.categorias[0]?.nombre || "Sin categoría"),
          readTime: Math.ceil(data.last_post.contenido.length / 1000) || 5,
        };
        setLastPost(featured);
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    getTags();
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, locale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative flex items-center justify-center">
        <BackgroundGlow theme="primary" intensity={0.5} />
        <div className="relative z-10 text-white text-xl animate-pulse">
          {loadingText}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative">
      {/* Iluminación de fondo */}
      <BackgroundGlow theme="primary" intensity={0.5} />
      
      {/* Contenido con z-index - ancho y paddings centralizados */}
      <div className={`relative z-10 pt-32 md:pt-40 ${maxWidths.lg} ${sectionPadding.x}`}>
        {/* Hero Section con post destacado */}
        {lastPost && <BlogHeroSection post={lastPost} />}
        
        {/* Grid de posts con filtros */}
        <BlogGridSection
          posts={posts}
          categories={tags.map(tag => translateCategory(tag.nombre))}
          selectedCategory={translateCategory(tags.find(t => t.id === selectedCategory)?.nombre || (locale === 'es' ? "Todos" : "All"))}
          onCategoryChange={(categoryName) => {
            // Encontrar la categoría original desde la traducción
            const originalCategory = Object.keys(categoryTranslations[locale]).find(
              key => categoryTranslations[locale][key] === categoryName
            ) || categoryName;
            const tag = tags.find(t => t.nombre === originalCategory);
            setSelectedCategory(tag?.id || 0);
          }}
        />
      </div>
    </div>
  );
}

