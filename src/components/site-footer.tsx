import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";
import { site, nav, services } from "@/content/site";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export function SiteFooter() {
  return (
    <footer className="relative bg-charcoal text-cream grain">
      <Container className="relative">
        {/* CTA band */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-line-dark py-16 lg:flex-row lg:items-center">
          <div>
            <p className="eyebrow mb-3 !text-gold-soft">HussMedia</p>
            <h2 className="display max-w-xl text-3xl text-cream sm:text-4xl">
              Your next listing deserves better photography.
            </h2>
          </div>
          <Button href="/book" variant="gold" size="lg">
            Book a Shoot
          </Button>
        </div>

        {/* Link columns */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-lg font-extrabold tracking-tight">
              Huss<span className="text-gold-soft">Media</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              {site.description}
            </p>
            <div className="mt-6 flex gap-4">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-cream/60 transition-colors hover:text-gold-soft"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-widest text-cream/60">
              Explore
            </p>
            <ul className="space-y-3">
              {nav
                .filter((n) => n.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-cream/70 transition-colors hover:text-cream"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-widest text-cream/60">
              Services
            </p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="text-sm text-cream/70 transition-colors hover:text-cream"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-5 text-sm font-bold uppercase tracking-widest text-cream/60">
              Contact
            </p>
            <ul className="space-y-4 text-sm text-cream/70">
              <li>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 transition-colors hover:text-cream"
                >
                  <Phone className="size-4 text-gold-soft" aria-hidden />
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="flex items-center gap-3 transition-colors hover:text-cream"
                >
                  <Mail className="size-4 text-gold-soft" aria-hidden />
                  {site.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold-soft" aria-hidden />
                {site.serviceRegion}
              </li>
            </ul>
            <div className="mt-6 space-y-1 text-xs text-cream/60">
              {site.hours.map((h) => (
                <p key={h.days}>
                  {h.days}: {h.hours}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Legal — extra bottom padding on <lg clears the fixed mobile Book bar */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-line-dark pt-8 pb-28 text-xs text-cream/60 sm:flex-row sm:items-center lg:pb-8">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <p>Residential real estate photography — {site.location}.</p>
        </div>
      </Container>
    </footer>
  );
}
