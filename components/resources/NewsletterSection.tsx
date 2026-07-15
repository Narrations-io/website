import NewsletterForm from "@/components/ui/NewsletterForm";

// Uses the shared NewsletterForm (components/ui/NewsletterForm.tsx) — the same
// box and the same /api/subscribe backend as the footer, in its light variant.
export default function NewsletterSection() {
  return (
    <div className="mt-24 rounded-[24px] border border-line bg-sunken p-8 text-center md:p-12">
      <h2 className="text-2xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2rem]">
        Get updates when we publish.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-base leading-7 text-ink-500">
        New posts on AI systems and narrative work, sent occasionally, no
        spam.
      </p>
      <NewsletterForm
        variant="light"
        source="resources"
        placeholder="Enter work email"
        submitLabel="Submit"
      />
    </div>
  );
}
