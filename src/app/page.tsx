import { Hero } from "@/components/home/hero";
import { TrustedBy } from "@/components/home/trusted-by";
import { WhyMatters } from "@/components/home/why-matters";
import { ServicesGrid } from "@/components/home/services-grid";
import { FeaturedPortfolio } from "@/components/home/featured-portfolio";
import { BeforeAfter } from "@/components/home/before-after";
import { BookingProcess } from "@/components/home/booking-process";
import { WhyUs } from "@/components/home/why-us";
import { Testimonials } from "@/components/home/testimonials";
import { HomeFaq } from "@/components/home/home-faq";
import { FinalCta } from "@/components/home/final-cta";
import { faqSchema, jsonLd } from "@/lib/schema";

export default function HomePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqSchema())} />
      <Hero />
      <TrustedBy />
      <WhyMatters />
      <ServicesGrid />
      <FeaturedPortfolio />
      <BeforeAfter />
      <BookingProcess />
      <WhyUs />
      <Testimonials />
      <HomeFaq />
      <FinalCta />
    </>
  );
}
