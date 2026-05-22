import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { products } from '@/lib/products';
import ProductClientPage from '@/components/sections/ProductClientPage';

interface Props {
  params: {
    slug: string;
  };
}

// 1. Static Generation for all slugs
export async function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// 2. Dynamic Metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    return {
      title: 'Product Not Found | boAt Reimagined',
    };
  }

  return {
    title: `${product.name} | boAt Reimagined`,
    description: `${product.tagline} Experience ultra-premium sound with the high-fidelity ${product.name}.`,
    openGraph: {
      title: `${product.name} | boAt Reimagined`,
      description: `${product.tagline} Experience ultra-premium sound with the high-fidelity ${product.name}.`,
      images: [
        {
          url: product.image,
          alt: product.name,
        },
      ],
    },
  };
}

export default function ProductPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  // Get other products for "Pair it with" section
  const relatedProducts = products
    .filter((p) => p.slug !== product.slug)
    .slice(0, 3);

  return (
    <ProductClientPage 
      product={product} 
      relatedProducts={relatedProducts} 
    />
  );
}
