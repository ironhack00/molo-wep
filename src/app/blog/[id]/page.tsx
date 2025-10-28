import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { headers } from 'next/headers';
import axios from "axios";
import { BlogPostTemplate } from "@/components/templates/BlogPostTemplate";

interface BlogPostPageProps {
  params: Promise<{ id: string }>;
}

interface ApiPost {
  id: string;
  titulo: string;
  descripcion: string;
  fecha_publicacion: string;
  imagenes: { id: number; url: string }[];
  contenido: string;
  categorias: { nombre: string; id: number }[];
}

const categoryTranslations: Record<string, Record<string, string>> = {
  en: {
    "Automatización de Procesos": "Process Automation",
    "Agencia Digital": "Digital Agency",
    "Diseño web moderno": "Modern Web Design",
    "Empresa de diseño web": "Web Design Company",
    "Software a medida": "Custom Software",
    "Agencia de marketing de rendimiento": "Performance Marketing Agency",
    "Agencia Google Ads": "Google Ads Agency",
    "Sin categoría": "Uncategorized",
  },
  es: {
    "Automatización de Procesos": "Automatización de Procesos",
    "Agencia Digital": "Agencia Digital",
    "Diseño web moderno": "Diseño web moderno",
    "Empresa de diseño web": "Empresa de diseño web",
    "Software a medida": "Software a medida",
    "Agencia de marketing de rendimiento": "Agencia de marketing de rendimiento",
    "Agencia Google Ads": "Agencia Google Ads",
    "Sin categoría": "Sin categoría",
  }
};

async function getPost(id: string) {
  try {
    const response = await axios.get<{ data: ApiPost }>(
      `https://blog-molokaih.onrender.com/api/posteos/${id}`
    );
    
    const post = response.data.data;
    const hdrs = await headers();
    const pathname = hdrs.get('x-pathname') || '';
    const locale = pathname.startsWith('/es') ? 'es' : 'en';
    
    const translateCategory = (categoryName: string) => {
      return categoryTranslations[locale]?.[categoryName] || categoryName;
    };
    
    return {
      id: post.id,
      title: post.titulo,
      description: post.descripcion,
      date: post.fecha_publicacion,
      coverImage: post.imagenes[0]?.url || "",
      category: translateCategory(post.categorias[0]?.nombre || "Sin categoría"),
      readTime: Math.ceil(post.contenido.length / 1000) || 5,
      content: post.contenido,
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return {
      title: "Post no encontrado",
    };
  }

  return {
    title: `${post.title} | Blog Molokaih`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.coverImage],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    notFound();
  }

  return <BlogPostTemplate post={post} />;
}
