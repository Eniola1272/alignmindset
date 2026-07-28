export const bookBundle = {
  slug: "align-mindset-comeback-bundle",
  title: "The Align Mindset Comeback Bundle",
  shortTitle: "Comeback Bundle",
  individualBookPrice: 2000,
  bundlePrice: 5000,
  currency: "NGN",
  books: [
    {
      title: "Get Good at Hard Things",
      tag: "Book 1",
      promise:
        "Build the identity and mental toughness needed to keep showing up when the work is difficult."
    },
    {
      title: "How to Create Value Without Capital",
      tag: "Book 2",
      promise:
        "Learn how to start with observation, skill, service, and proof before money enters the picture."
    },
    {
      title: "Systems, Not Motivation",
      tag: "Book 3",
      promise:
        "Turn inconsistent ambition into weekly rhythms, practical routines, and trackable progress."
    },
    {
      title: "The Discipline Reset",
      tag: "Book 4",
      promise:
        "Rebuild focus, habits, and personal standards without shame or empty motivation."
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
