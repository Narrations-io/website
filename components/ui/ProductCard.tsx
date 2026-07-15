import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import ProductName from "@/components/ui/ProductName";

type ProductCardProps = {
  name: string;
  slug: string;
  pre: string;
  post: string;
  vertical: string;
  desc: string;
  Icon: LucideIcon;
};

export default function ProductCard({
  name,
  slug,
  pre,
  post,
  vertical,
  desc,
  Icon,
}: ProductCardProps) {
  return (
    <Link
      href={`/products/${slug}`}
      aria-label={`${name}, ${vertical}`}
      className="group flex h-full flex-col rounded-[20px] border border-line bg-paper p-6 shadow-card transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-1 hover:shadow-pop"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
        <Icon size={20} strokeWidth={2} aria-hidden />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-ink-900">
        <ProductName name={name} pre={pre} post={post} />
      </h3>
      <p className="mt-1 text-[13px] font-medium text-ink-500">{vertical}</p>
      <p className="mt-3 text-sm leading-6 text-ink-700">{desc}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-semibold text-green-500">
        Explore
        <ArrowRight
          size={15}
          aria-hidden
          className="transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </span>
    </Link>
  );
}
