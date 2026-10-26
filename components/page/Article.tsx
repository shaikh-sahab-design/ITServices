"use client";

import { useEffect, useState } from "react";
import { Reveal } from "../motion";
import { asset } from "@/lib/asset";

export type TocItem = { id: string; label: string };

type Props = {
  title: string;
  author: string;
  date: string;
  readTime: string;
  toc: TocItem[];
  bio: { photo: string; name: string; role: string; text: React.ReactNode };
  children: React.ReactNode;
};

/** Blog article body with a sticky table of contents that tracks the section in view. */
export function Article({ title, author, date, readTime, toc, bio, children }: Props) {
  const [active, setActive] = useState(toc[0]?.id);

  useEffect(() => {
    const heads = toc.map((t) => document.getElementById(t.id)).filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-90px 0px -65% 0px" },
    );
    heads.forEach((h) => io.observe(h));
    return () => io.disconnect();
  }, [toc]);

  const meta = [
    { icon: "/icons/meta-author.svg", text: author },
    { icon: "/icons/meta-date.svg", text: date },
    { icon: "/icons/meta-read.svg", text: readTime },
  ];

  return (
    <section className="article">
      <div className="container article__inner">
        <article className="article__main">
          <Reveal className="article__head">
            <h1 className="article__title">{title}</h1>
            <div className="article__meta">
              {meta.map((m) => (
                <span key={m.text} className="blog-meta">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(m.icon)} alt="" width={18} height={18} />
                  {m.text}
                </span>
              ))}
            </div>
          </Reveal>
          <div className="prose">{children}</div>
          <Reveal className="author-box">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(bio.photo)} alt={bio.name} width={182} height={182} loading="lazy" />
            <div className="author-box__copy">
              <div>
                <p className="author-box__name">{bio.name}</p>
                <p className="author-box__role">{bio.role}</p>
              </div>
              <p className="author-box__text">{bio.text}</p>
            </div>
          </Reveal>
        </article>
        <aside className="toc" aria-label="Table of Contents">
          <p className="toc__head">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset("/icons/toc.svg")} alt="" width={24} height={24} />
            Table of Contents
          </p>
          <ol className="toc__list">
            {toc.map((t) => (
              <li key={t.id}>
                <a href={`#${t.id}`} aria-current={active === t.id ? "location" : undefined}>
                  {t.label}
                </a>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}
