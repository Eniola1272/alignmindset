export const bookBundle = {
  slug: "align-mindset-comeback-bundle",
  title: "The Align Mindset Comeback Bundle",
  shortTitle: "Comeback Bundle",
  individualBookPrice: 3500,
  bundlePrice: 4900,
  currency: "NGN",
  books: [
    {
      title: "Ask for Help",
      tag: "Book 1",
      coverImage: "/images/books/ask-for-help-book-cover.png",
      promise:
        "Learn how to stop struggling in silence, ask better questions, and use people, feedback, and community as leverage."
    },
    {
      title: "Pick Your Skill",
      tag: "Book 2",
      promise:
        "Choose one useful skill with intention instead of jumping between trends, pressure, and random advice."
    },
    {
      title: "Turn Your Skill Into an Offer",
      tag: "Book 3",
      promise:
        "Package what you can do into a clear promise people understand, trust, and can say yes to."
    },
    {
      title: "Love Your Work",
      tag: "Book 4",
      promise:
        "Build a healthier relationship with effort, mastery, service, and the daily practice that makes your work meaningful."
    }
  ]
};

export function formatNaira(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(amount);
}
