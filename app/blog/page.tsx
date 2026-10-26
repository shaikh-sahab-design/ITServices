import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { Stats } from "@/components/Stats";
import { BlogGrid, type BlogCard } from "@/components/page/BlogGrid";
import { PageHero } from "@/components/page/PageHero";
import { PHONE, ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Blog | Folio3 Managed IT Services",
  description:
    "Discover expert insights on managed IT services, cybersecurity, migration services, and IT strategy. Stay up to date with the latest technology trends, practical tips, and industry best practices to help your business grow.",
};

// The design repeats one placeholder card nine times. Every card opens the one article designed so far.
const CARD: BlogCard = {
  image: "/images/blog-card.webp",
  title: "Optimal IT Infrastructure: What It Looks Like and How to Build It",
  excerpt:
    "A company can have modern applications, several security tools, and a sizeable technology budget while still dealing with slow connections, recurring access problems, unexplained migration costs, and failed",
  date: "August 31, 2026",
  href: ROUTES.blogPost,
};

export default function BlogPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          image="/images/hero-blog.webp"
          fade={[34.8, 78.1]}
          copyWidth={625}
          title={["Expert Insights for", "Smarter IT Decisions"]}
          lede="Discover expert insights on managed IT services, cybersecurity, migration services, and IT strategy. Stay up to date with the latest technology trends, practical tips, and industry best practices to help your business grow."
          actions={[
            { label: "Talk to a Managed IT Expert", href: ROUTES.contact, variant: "primary" },
            { label: PHONE.label, href: PHONE.href, variant: "ghost" },
          ]}
        />
        <BlogGrid posts={Array.from({ length: 9 }, () => CARD)} />
        <Stats />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
