"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Stagger, fadeUpChild } from "../motion";
import { asset } from "@/lib/asset";

export type BlogCard = { image: string; title: string; excerpt: string; date: string; href: string };

/** Three-column grid of article cards from the Blog page. */
export function BlogGrid({ posts }: { posts: BlogCard[] }) {
  return (
    <section className="blog-grid">
      <Stagger className="container blog-grid__inner" stagger={0.05}>
        {posts.map((p, i) => (
          <motion.article key={i} className="blog-card" variants={fadeUpChild}>
            <Link href={p.href} className="blog-card__media" tabIndex={-1} aria-hidden>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(p.image)} alt="" width={427} height={160} loading="lazy" />
            </Link>
            <div className="blog-card__body">
              <h2 className="blog-card__title">
                <Link href={p.href}>{p.title}</Link>
              </h2>
              <p className="blog-card__excerpt">{p.excerpt}</p>
              <div className="blog-card__foot">
                <Link href={p.href} className="blog-card__more">
                  Read Full Article
                </Link>
                <span className="blog-meta">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset("/icons/meta-date.svg")} alt="" width={18} height={18} />
                  {p.date}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </Stagger>
    </section>
  );
}
