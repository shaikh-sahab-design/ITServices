import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "Contact Us | Folio3 Managed IT Services",
  description:
    "If you need more IT capacity, better security, infrastructure help, migration support, or a proactive model, share details with our team.",
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main className="inner-page">
        <ContactForm variant="page" />
      </main>
      <Footer />
    </>
  );
}
