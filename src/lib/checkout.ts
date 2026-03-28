import { courses } from "@/data/courses";
import { products } from "@/data/products";
import { bundles } from "@/data/bundles";

export type CheckoutItemType = "course" | "product" | "bundle";

export interface CheckoutItem {
  slug: string;
  itemType: CheckoutItemType;
  title: string;
  price: number; // dollars
  buyUrl: string; // Thinkific URL for post-purchase redirect
  imagePath: string;
}

export function resolveCheckoutItem(
  slug: string,
  itemType: CheckoutItemType
): CheckoutItem | null {
  switch (itemType) {
    case "course": {
      const course = courses.find((c) => c.slug === slug);
      if (!course) return null;
      return {
        slug: course.slug,
        itemType: "course",
        title: course.title,
        price: course.price,
        buyUrl: course.buyUrl,
        imagePath: course.imagePath,
      };
    }
    case "product": {
      const product = products.find((p) => p.slug === slug);
      if (!product) return null;
      return {
        slug: product.slug,
        itemType: "product",
        title: product.title,
        price: product.price,
        buyUrl: product.buyUrl,
        imagePath: product.imagePath,
      };
    }
    case "bundle": {
      const bundle = bundles.find((b) => b.slug === slug);
      if (!bundle) return null;
      return {
        slug: bundle.slug,
        itemType: "bundle",
        title: bundle.title,
        price: bundle.price,
        buyUrl: bundle.buyUrl,
        imagePath: bundle.imagePath,
      };
    }
    default:
      return null;
  }
}
