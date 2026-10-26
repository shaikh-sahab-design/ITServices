import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import {
  CaseChallenge,
  CaseFacts,
  CaseOutcomes,
  CaseQuote,
  CaseServices,
  CaseSolution,
  CaseStack,
} from "@/components/page/CaseDetail";
import { PageHero } from "@/components/page/PageHero";
import { CASE_STUDIES, findCaseStudy } from "@/lib/case-studies";
import { PHONE, ROUTES } from "@/lib/routes";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const study = findCaseStudy((await params).slug);
  return study ? study.meta : {};
}

export default async function CaseStudyPage({ params }: Params) {
  const study = findCaseStudy((await params).slug);
  if (!study) notFound();

  return (
    <>
      <Nav />
      <main className="inner-page">
        <PageHero
          image={study.hero.image}
          fade={[33, 74.3]}
          copyWidth={study.hero.copyWidth}
          flow
          title={study.hero.title}
          lede={study.hero.lede}
          actions={[
            { label: "Talk to a Managed IT Expert", href: ROUTES.contact, variant: "primary" },
            { label: PHONE.label, href: PHONE.href, variant: "ghost" },
          ]}
        />
        <CaseFacts facts={study.facts} />
        {study.services && <CaseServices services={study.services} />}
        <CaseChallenge challenge={study.challenge} />
        <CaseSolution solution={study.solution} />
        {study.stack && <CaseStack logos={study.stack} />}
        <CaseOutcomes outcomes={study.outcomes} flushBottom={!!study.testimonial} />
        {study.testimonial && <CaseQuote testimonial={study.testimonial} />}
      </main>
      <Footer />
    </>
  );
}
