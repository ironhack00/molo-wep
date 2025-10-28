"use client";

import Link from 'next/link';
import { useLocale } from '@/lib/i18n/IntlProvider';
import { localizedPath } from '@/lib/i18n/routing';
import { ComponentProps } from 'react';

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

/**
 * Link component que automáticamente agrega el prefijo de locale
 * Usa /es para español, sin prefijo para inglés
 */
export function LocalizedLink({ href, children, ...props }: LocalizedLinkProps) {
  const locale = useLocale();
  const localizedHref = localizedPath(href, locale);
  
  return (
    <Link href={localizedHref} {...props}>
      {children}
    </Link>
  );
}

