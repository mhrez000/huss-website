/* ===========================================================
   HussMedia — site content (single source of truth)
   -----------------------------------------------------------
   This file is the "CMS". Every headline, price, FAQ,
   testimonial and image on the site is edited here.
   Blog posts live in ./blog.ts, service areas in ./areas.ts.
   =========================================================== */

export const site = {
  name: "HussMedia",
  legalName: "HussMedia Pty Ltd",
  tagline: "Photography that helps homes sell faster",
  description:
    "Professional residential real estate photography in Melbourne. HDR photography, drone, twilight, floor plans and video — delivered within 24 hours.",
  url: "https://hussmedia.com",
  email: "hello@hussmedia.com",
  phone: "+61 3 9000 0000",
  phoneDisplay: "(03) 9000 0000",
  location: "Melbourne, Australia",
  serviceRegion: "Melbourne & surrounding suburbs",
  hours: [
    { days: "Monday – Friday", hours: "8:00am – 7:00pm" },
    { days: "Saturday", hours: "8:00am – 5:00pm" },
    { days: "Twilight sessions", hours: "By schedule, at dusk" },
  ],
  googleRating: 5.0,
  googleReviewCount: 132,
  socials: [
    { label: "Instagram", href: "https://instagram.com/hussmedia" },
    { label: "YouTube", href: "https://youtube.com/@hussmedia" },
    { label: "LinkedIn", href: "https://linkedin.com/company/hussmedia" },
  ],
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Areas", href: "/areas" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

/** Prefix local /public assets with the base path on static (GitHub Pages) builds. */
const asset = (p: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;

export const heroMedia = {
  video: asset("/hero.mp4"),
  poster: asset("/hero-poster.jpg"),
};

export const hero = {
  headline: "Photography That Helps Homes Sell Faster",
  subheading:
    "Professional residential real estate photography designed to attract more buyers, generate more inspections and help agents win more listings.",
  primaryCta: { label: "Book a Shoot", href: "/book" },
  secondaryCta: { label: "View Portfolio", href: "/portfolio" },
};

/* ---------- image pool (curated Unsplash placeholders) ----------
   Swap these for real HussMedia photography as it becomes available. */

const u = (id: string, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const IMG = {
  luxuryExteriorDusk: u("photo-1564013799919-ab600027ffc6"),
  modernExterior: u("photo-1600585154340-be6161a56a0c"),
  whiteExterior: u("photo-1570129477492-45c003edd2be"),
  lawnExterior: u("photo-1568605114967-8130f3a36994"),
  brickExterior: u("photo-1523217582562-09d0def993a6"),
  modernFacade: u("photo-1580587771525-78b9dba3b914"),
  poolEvening: u("photo-1512917774080-9991f1c4c750"),
  poolLuxury: u("photo-1600596542815-ffad4c1539a9"),
  villaTwilight: u("photo-1613490493576-7fde63acd811"),
  houseExterior2: u("photo-1600047509807-ba8f99d2cdde"),
  houseExterior3: u("photo-1600585154526-990dced4db0d"),
  houseExterior4: u("photo-1494526585095-c41746248156"),
  livingNeutral: u("photo-1554995207-c18c203602cb"),
  livingModern: u("photo-1586023492125-27b2c045efd7"),
  livingBright: u("photo-1600210492486-724fe5c67fb0"),
  livingWarm: u("photo-1600607687939-ce8a6c25118c"),
  interiorSoft: u("photo-1600566753190-17f0baa2a6c3"),
  interiorLuxury: u("photo-1600585152220-90363fe7e115"),
  interiorStaged: u("photo-1512918728675-ed5a9ecdebfd"),
  kitchenMarble: u("photo-1600585154084-4e5fe7c39198"),
  kitchenModern: u("photo-1600566753086-00f18fb6b3ea"),
  kitchenBright: u("photo-1556912167-f556f1f39fdf"),
  kitchenApartment: u("photo-1484154218962-a197022b5858"),
  bedroomSoft: u("photo-1560185007-cde436f6a4d0"),
  bedroomLight: u("photo-1600585153490-76fb20a32601"),
  bathroomLuxury: u("photo-1584622650111-993a426fbf0a"),
  bathroomModern: u("photo-1600607688969-a5bfcd646154"),
  apartmentLiving: u("photo-1502672260266-1c1ef2d93688"),
  apartmentStyled: u("photo-1493809842364-78817add7ffb"),
  apartmentModern: u("photo-1522708323590-d24dbb6b0267"),
  apartmentCompact: u("photo-1560448204-e02f11c3d0e2"),
  townhouseRow: u("photo-1519710164239-da123dc03ef4"),
  aerialHouses: u("photo-1449844908441-8829872d2607"),
  aerialLandscape: u("photo-1500382017468-9049fed747ef"),
  houseModern2: u("photo-1613977257363-707ba9348227"),
  houseFacade2: u("photo-1600047509358-9dc75507daeb"),
  livingRoom2: u("photo-1598928506311-c55ded91a20c"),
  interiorLux2: u("photo-1613545325278-f24b0cae1224"),
  twilightHouse: u("photo-1416331108676-a22ccb276e35"),
};

/* ---------- portraits for testimonials ---------- */
const portrait = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=200&h=200&q=80`;

/* ---------- stats / trusted by ---------- */

export const stats = [
  { value: 2500, suffix: "+", label: "Properties photographed" },
  { value: 8, suffix: "+", label: "Years in business" },
  { value: 350, suffix: "+", label: "Agents trust us" },
  { value: 5.0, suffix: "★", label: "Google rating", decimals: 1 },
  { value: 24, suffix: "hr", label: "Standard delivery" },
  { value: 98, suffix: "%", label: "Delivered next-day" },
];

/** Fictional agency wordmarks for the trusted-by marquee. */
export const trustedBy = [
  "Northside Property Group",
  "Bayside Estate Agents",
  "Harper & Finch",
  "Boutique Property Co.",
  "Summit Realty",
  "Meridian Estates",
  "Fifth Avenue Property",
  "Grandview Real Estate",
];

/* ---------- why photography matters ---------- */

export const whyMatters = {
  eyebrow: "Why it matters",
  heading: "Buyers decide in seconds. Make them count.",
  cards: [
    {
      stat: "90%",
      title: "of buyers start their search online",
      text: "Your photography is the first inspection. Before a buyer ever steps inside, they've already judged the home by its images.",
    },
    {
      stat: "2×",
      title: "more views with professional photography",
      text: "Listings with professional images consistently attract more clicks, more saves and more enquiries than phone photos.",
    },
    {
      stat: "3s",
      title: "to win or lose a buyer's attention",
      text: "Scrolling buyers give each listing seconds. A striking hero image stops the scroll and books the inspection.",
    },
  ],
};

/* ---------- services ---------- */

export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  title: string;
  navLabel: string;
  eyebrow: string;
  blurb: string;
  heroImage: string;
  heroAlt: string;
  description: string[];
  benefits: { title: string; text: string }[];
  gallery: { src: string; alt: string }[];
  faqs: ServiceFaq[];
  priceFrom: number;
  priceNote: string;
  related: string[];
  icon: string; // lucide icon name, mapped in components
};

export const services: Service[] = [
  {
    slug: "residential-photography",
    title: "Residential Photography",
    navLabel: "Residential",
    eyebrow: "Core service",
    blurb:
      "Magazine-quality HDR photography that makes every room feel bright, spacious and inviting.",
    heroImage: IMG.livingWarm,
    heroAlt: "Bright, professionally photographed living room interior",
    description: [
      "Great listing photography isn't about an expensive camera — it's about light, composition and consistency. Every HussMedia shoot is planned around the property's best angles and the best natural light, then hand-edited so whites are clean, windows show the view, and every room feels as generous as it does in person.",
      "Agents receive a consistent, on-brand gallery for every listing — vertical and horizontal crops included — sized and optimised for realestate.com.au, Domain and print.",
    ],
    benefits: [
      { title: "HDR exposure blending", text: "Balanced light in every frame — no blown-out windows, no dark corners." },
      { title: "Hand-edited, never batch-processed", text: "Every image individually colour-corrected for clean whites and natural tones." },
      { title: "Composed for buyers", text: "Wide, honest angles that make spaces feel generous without distortion." },
      { title: "Print & portal ready", text: "Delivered sized for realestate.com.au, Domain, social and brochures." },
      { title: "Consistent every time", text: "The same premium look across your whole window of listings." },
      { title: "24-hour delivery", text: "Shot today, in your inbox tomorrow morning — guaranteed." },
    ],
    gallery: [
      { src: IMG.livingWarm, alt: "Warm modern living room with natural light" },
      { src: IMG.kitchenMarble, alt: "Marble kitchen with pendant lighting" },
      { src: IMG.bedroomSoft, alt: "Softly lit master bedroom" },
      { src: IMG.bathroomLuxury, alt: "Luxury bathroom with freestanding bath" },
      { src: IMG.modernExterior, alt: "Modern home exterior at golden hour" },
      { src: IMG.livingNeutral, alt: "Neutral-toned styled living space" },
    ],
    faqs: [
      { q: "How many photos will I receive?", a: "Standard shoots include up to 20 professionally edited images. Larger homes can be quoted for extended sets — most listings present best with 15–25 images." },
      { q: "How long does a residential shoot take?", a: "Most homes take 45–90 minutes on site depending on size and preparation. We work efficiently around tenants and vendors." },
      { q: "Do you help style or prepare rooms?", a: "We do a walkthrough first and make light adjustments — straightening linen, decluttering benches, hiding bins and cables — so every frame is clean." },
      { q: "What if the weather is grey?", a: "Interiors are unaffected, and we digitally replace dull skies on exteriors at no charge. If conditions are truly poor we'll reschedule at no cost." },
    ],
    priceFrom: 349,
    priceNote: "up to 20 images, 24hr delivery",
    related: ["drone-photography", "twilight-photography", "floor-plans"],
    icon: "Camera",
  },
  {
    slug: "drone-photography",
    title: "Drone Photography",
    navLabel: "Drone",
    eyebrow: "Aerial perspective",
    blurb:
      "CASA-licensed aerial photography that showcases land, location and lifestyle in a single frame.",
    heroImage: IMG.aerialHouses,
    heroAlt: "Aerial drone view of residential neighbourhood",
    description: [
      "Some properties simply can't be told from the ground. Aerial photography captures the full block, the position on the street, proximity to parks, schools and water — the context that makes buyers commit to an inspection.",
      "HussMedia operates CASA-compliant drones with licensed pilots, full insurance, and airspace approval handled for every shoot. You get cinematic, magazine-grade aerials without any of the compliance headache.",
    ],
    benefits: [
      { title: "CASA-licensed & insured", text: "Fully compliant operations with airspace clearance arranged for you." },
      { title: "Show the whole block", text: "Land size, orientation and boundaries — clear at a glance." },
      { title: "Sell the location", text: "Parks, beaches, schools and skyline distance become selling points." },
      { title: "High-resolution stills", text: "Crisp aerials that hold up as hero images and print spreads." },
      { title: "Elevated 'mast' angles", text: "Low-altitude elevated shots perfect for single-level streetscapes." },
      { title: "Bundle-friendly", text: "Add aerials to any photography package for a small add-on fee." },
    ],
    gallery: [
      { src: IMG.aerialHouses, alt: "Aerial view of suburban homes" },
      { src: IMG.aerialLandscape, alt: "High aerial landscape view" },
      { src: IMG.poolLuxury, alt: "Luxury home with pool from above" },
      { src: IMG.modernFacade, alt: "Modern facade photographed from elevation" },
    ],
    faqs: [
      { q: "Are you licensed to fly drones commercially?", a: "Yes — all flights are conducted under CASA regulations by licensed operators with public liability insurance. Airspace approvals are handled before every shoot." },
      { q: "Can you fly anywhere?", a: "Most residential areas are fine. Near airports or in controlled airspace we arrange approvals in advance; in rare no-fly zones we'll advise elevated mast photography instead." },
      { q: "What weather do you need?", a: "Light wind and dry conditions. If it's unsafe to fly we reschedule the aerial component at no charge — your interior shoot still goes ahead." },
      { q: "Do aerials really make a difference?", a: "For land, lifestyle and premium properties — absolutely. Aerials communicate block size and location instantly, which are two of the top three buyer questions." },
    ],
    priceFrom: 159,
    priceNote: "as add-on to any shoot",
    related: ["residential-photography", "property-videos", "twilight-photography"],
    icon: "Plane",
  },
  {
    slug: "twilight-photography",
    title: "Twilight Photography",
    navLabel: "Twilight",
    eyebrow: "The scroll-stopper",
    blurb:
      "Warm, glowing dusk imagery that makes any home feel like the best house on the street.",
    heroImage: IMG.luxuryExteriorDusk,
    heroAlt: "Luxury home glowing at twilight",
    description: [
      "Nothing stops a scrolling buyer like a twilight hero shot. Warm interior glow against a deep dusk sky adds instant emotion and prestige — it's the single most effective upgrade for a listing's first impression.",
      "We shoot in the short window when ambient light and interior light balance perfectly, then finish each frame by hand. For budget-conscious campaigns we also offer day-to-dusk conversions of daytime exteriors.",
    ],
    benefits: [
      { title: "Instant prestige", text: "Twilight heroes lift perceived value across the entire campaign." },
      { title: "Stops the scroll", text: "Dusk images consistently out-click daytime exteriors on the portals." },
      { title: "Perfectly timed", text: "Shot in the true 'blue hour' window for rich, natural skies." },
      { title: "Day-to-dusk option", text: "Convert an existing daytime exterior when schedules are tight." },
      { title: "Warm, inviting glow", text: "Every window lit, every space welcoming." },
      { title: "Campaign-ready", text: "Ideal for premium listings, auctions and print covers." },
    ],
    gallery: [
      { src: IMG.luxuryExteriorDusk, alt: "Home exterior at dusk with glowing windows" },
      { src: IMG.villaTwilight, alt: "Luxury villa at twilight" },
      { src: IMG.poolEvening, alt: "Pool and home in evening light" },
      { src: IMG.twilightHouse, alt: "House at twilight against deep blue sky" },
    ],
    faqs: [
      { q: "When do twilight shoots happen?", a: "In the 20–30 minute window around dusk. We schedule precisely for your property's orientation and confirm the exact time the day before." },
      { q: "What's a day-to-dusk conversion?", a: "A professional edit that transforms a daytime exterior into a twilight image — a cost-effective option when a live twilight shoot isn't practical." },
      { q: "How many images do I get?", a: "A twilight session focuses on 4–6 hero frames of the facade and key outdoor areas — quality over quantity, built to lead a campaign." },
      { q: "Can I combine twilight with a standard shoot?", a: "Yes — most agents book the daytime shoot and twilight session on the same day. It's the most popular premium combination." },
    ],
    priceFrom: 149,
    priceNote: "as add-on • day-to-dusk from $49",
    related: ["residential-photography", "drone-photography", "property-videos"],
    icon: "Sunset",
  },
  {
    slug: "floor-plans",
    title: "Floor Plans",
    navLabel: "Floor Plans",
    eyebrow: "Buyers' #1 request",
    blurb:
      "Accurate, beautifully drafted floor plans — the feature buyers ask for most after photos.",
    heroImage: IMG.interiorStaged,
    heroAlt: "Styled interior representing accurate floor plan measurement",
    description: [
      "Floor plans are consistently ranked by buyers as the most useful listing feature after photography. They answer the questions photos can't: how rooms connect, where the kids sleep, whether the study fits a second desk.",
      "We laser-measure on site during your photo shoot and deliver clean, branded 2D plans with total areas — accurate, portal-ready and matched to your agency's style.",
    ],
    benefits: [
      { title: "Laser-measured accuracy", text: "Measured on site to a professional standard buyers can trust." },
      { title: "Buyers stay longer", text: "Listings with floor plans hold attention and reduce bounce." },
      { title: "Fewer wasted inspections", text: "Buyers pre-qualify themselves on layout before they book." },
      { title: "Branded to your agency", text: "Colours and styling matched to your brand guidelines." },
      { title: "Total & room areas", text: "Internal, external and land areas clearly stated." },
      { title: "Fast turnaround", text: "Delivered within 24–48 hours of the shoot." },
    ],
    gallery: [
      { src: IMG.interiorStaged, alt: "Open-plan living area" },
      { src: IMG.apartmentLiving, alt: "Apartment living space" },
      { src: IMG.kitchenModern, alt: "Modern kitchen layout" },
      { src: IMG.bedroomLight, alt: "Light-filled bedroom" },
    ],
    faqs: [
      { q: "Are the plans to scale?", a: "Yes — plans are drafted from on-site laser measurements and drawn to scale, with total internal area calculations included." },
      { q: "Can you match my agency branding?", a: "Absolutely. We keep your agency's colours, fonts and disclaimer text on file so every plan is consistent." },
      { q: "Do you offer 3D floor plans?", a: "Yes — 3D and furnished plans are available as an upgrade. They're popular for off-the-plan and premium campaigns." },
      { q: "How quickly are plans delivered?", a: "Standard 2D plans arrive within 24–48 hours of the shoot; complex or multi-level homes may take slightly longer." },
    ],
    priceFrom: 139,
    priceNote: "2D branded plan, most homes",
    related: ["residential-photography", "virtual-staging", "property-videos"],
    icon: "Ruler",
  },
  {
    slug: "property-videos",
    title: "Property Videos",
    navLabel: "Video",
    eyebrow: "Cinematic walkthroughs",
    blurb:
      "Smooth, cinematic property films that let buyers walk through before they ever visit.",
    heroImage: IMG.interiorLuxury,
    heroAlt: "Cinematic interior of luxury living space",
    description: [
      "Video builds emotional connection like nothing else. A 60–90 second cinematic walkthrough guides buyers through the home's flow — arrival, living, entertaining, retreat — set to licensed music and graded like film.",
      "Every property film is shot on stabilised cinema gear, edited with agent branding and delivered in horizontal and vertical formats for portals, YouTube and social.",
    ],
    benefits: [
      { title: "Cinematic movement", text: "Gimbal-stabilised shots that glide through the home." },
      { title: "Emotional storytelling", text: "Paced to build connection, not just show rooms." },
      { title: "Agent-branded", text: "Your intro, outro and contact details on every film." },
      { title: "Licensed music", text: "Premium soundtrack cleared for commercial use." },
      { title: "Portal + social formats", text: "16:9 and 9:16 versions included in every delivery." },
      { title: "Drone integration", text: "Aerial establishing shots woven in seamlessly." },
    ],
    gallery: [
      { src: IMG.interiorLuxury, alt: "Luxury interior video still" },
      { src: IMG.poolLuxury, alt: "Pool area cinematic frame" },
      { src: IMG.livingModern, alt: "Modern living area video frame" },
      { src: IMG.modernExterior, alt: "Home exterior establishing shot" },
    ],
    faqs: [
      { q: "How long are the videos?", a: "Standard walkthroughs run 60–90 seconds — long enough to tell the story, short enough to hold attention on portals and social." },
      { q: "Can I appear in the video?", a: "Yes — agent-hosted intros are a popular upgrade. We'll coach you through a simple piece-to-camera on site." },
      { q: "What's the turnaround for video?", a: "48 hours for standard walkthroughs. Rush editing is available when a campaign is launching fast." },
      { q: "Do you include drone footage?", a: "Aerial sequences are included in our video packages where conditions allow, or available as an add-on to any film." },
    ],
    priceFrom: 399,
    priceNote: "60–90s film, 48hr delivery",
    related: ["social-media-reels", "drone-photography", "residential-photography"],
    icon: "Video",
  },
  {
    slug: "social-media-reels",
    title: "Social Media Reels",
    navLabel: "Reels",
    eyebrow: "Built for the feed",
    blurb:
      "Vertical, fast-cut property reels engineered for Instagram, TikTok and Facebook reach.",
    heroImage: IMG.apartmentStyled,
    heroAlt: "Styled apartment interior for social media content",
    description: [
      "Social is where campaigns compound. A sharp 20–30 second vertical reel puts your listing — and your personal brand — in front of thousands of local buyers and future vendors.",
      "We shoot and cut natively for vertical: quick reveals, kinetic pacing, on-screen captions and trending-safe audio. Every reel is designed to be reposted by your agency page and boosted as an ad.",
    ],
    benefits: [
      { title: "Native 9:16 vertical", text: "Shot for the feed, not cropped from a landscape film." },
      { title: "Hook-first editing", text: "The best moment leads, because the first second decides the view." },
      { title: "On-screen captions", text: "Key features readable with the sound off." },
      { title: "Agent brand growth", text: "Consistent reels build your following between listings." },
      { title: "Ad-ready", text: "Formatted for boosting on Instagram and Facebook." },
      { title: "Fast turnaround", text: "Delivered within 48 hours, ready to post." },
    ],
    gallery: [
      { src: IMG.apartmentStyled, alt: "Styled apartment reel frame" },
      { src: IMG.kitchenBright, alt: "Bright kitchen social content frame" },
      { src: IMG.livingBright, alt: "Bright living room vertical frame" },
      { src: IMG.bathroomModern, alt: "Modern bathroom detail shot" },
    ],
    faqs: [
      { q: "What length are the reels?", a: "20–30 seconds — the sweet spot for completion rate, which is what the algorithms reward." },
      { q: "Can I add my own voiceover or appear on camera?", a: "Yes — agent-fronted reels perform brilliantly. We'll script a simple hook with you on the day." },
      { q: "What about music copyright?", a: "We edit to commercially licensed tracks, and structure the cut so you can swap in trending audio natively inside Instagram or TikTok." },
      { q: "Is a reel included in any package?", a: "Yes — the Complete Marketing Package includes a vertical reel alongside the main property film." },
    ],
    priceFrom: 249,
    priceNote: "20–30s vertical edit",
    related: ["property-videos", "twilight-photography", "residential-photography"],
    icon: "Smartphone",
  },
  {
    slug: "virtual-staging",
    title: "Virtual Staging",
    navLabel: "Staging",
    eyebrow: "Empty rooms, sold looks",
    blurb:
      "Photo-realistic digital furniture that turns empty rooms into aspirational homes — at 1% of physical staging cost.",
    heroImage: IMG.interiorSoft,
    heroAlt: "Beautifully staged living room interior",
    description: [
      "Empty rooms photograph smaller and feel colder — and buyers struggle to imagine the life inside them. Virtual staging furnishes your photos with photo-realistic, style-matched furniture at a fraction of physical staging cost.",
      "Choose from contemporary, Hamptons, Scandinavian and luxury styles. Every staged image is checked for realistic scale, shadows and reflections, and delivered alongside the original for full transparency.",
    ],
    benefits: [
      { title: "Photo-realistic results", text: "Correct scale, shadows and light — indistinguishable at portal size." },
      { title: "1% of physical staging cost", text: "Stage a whole home digitally for less than one room of hire furniture." },
      { title: "Style-matched interiors", text: "Contemporary, Hamptons, Scandi or luxury — matched to the buyer profile." },
      { title: "48-hour turnaround", text: "Staged images back within two business days." },
      { title: "Original supplied", text: "Unstaged versions included for transparency and compliance." },
      { title: "Revisions included", text: "One round of furniture/style revisions on every image." },
    ],
    gallery: [
      { src: IMG.interiorSoft, alt: "Virtually staged living room" },
      { src: IMG.livingNeutral, alt: "Neutral staged living space" },
      { src: IMG.bedroomSoft, alt: "Staged master bedroom" },
      { src: IMG.apartmentModern, alt: "Staged modern apartment" },
    ],
    faqs: [
      { q: "Does virtual staging look real?", a: "At portal and print size, professionally staged images are effectively indistinguishable from physical staging. We obsess over scale, shadows and reflections." },
      { q: "Is virtual staging allowed?", a: "Yes, when disclosed. We recommend the standard 'digitally staged' caption and always supply the original image alongside." },
      { q: "What styles can I choose?", a: "Contemporary, Hamptons, Scandinavian, minimalist and luxury. Tell us the target buyer and we'll match the look." },
      { q: "Can you stage from old photos?", a: "We can stage any sufficiently high-resolution photo, though results are best from our own HDR photography." },
    ],
    priceFrom: 79,
    priceNote: "per image, 48hr delivery",
    related: ["virtual-furniture-removal", "residential-photography", "floor-plans"],
    icon: "Sofa",
  },
  {
    slug: "virtual-furniture-removal",
    title: "Virtual Furniture Removal",
    navLabel: "Decluttering",
    eyebrow: "Digital declutter",
    blurb:
      "Digitally remove furniture and clutter from occupied homes — no removalists, no disruption.",
    heroImage: IMG.livingBright,
    heroAlt: "Clean, decluttered living room",
    description: [
      "Tenanted or lived-in homes rarely present at their best, and asking vendors to move out their life for a shoot isn't realistic. Virtual furniture removal digitally clears rooms — dated furniture, clutter, personal items — leaving clean, open spaces.",
      "Combine removal with virtual staging to take a room from cluttered to aspirational in a single edit: the most dramatic transformation we offer.",
    ],
    benefits: [
      { title: "No disruption to occupants", text: "Tenants and vendors don't move a thing." },
      { title: "Dated interiors neutralised", text: "Remove tired furniture that anchors the home to a lower price." },
      { title: "Combine with staging", text: "Cluttered-to-styled in one edit — the full transformation." },
      { title: "Photo-realistic clean-up", text: "Flooring, walls and light rebuilt seamlessly behind removed items." },
      { title: "Per-image pricing", text: "Only pay for the rooms that need it." },
      { title: "Compliance-safe", text: "Delivered with originals and disclosure guidance." },
    ],
    gallery: [
      { src: IMG.livingBright, alt: "Decluttered bright living room" },
      { src: IMG.livingRoom2, alt: "Clean open living area" },
      { src: IMG.kitchenApartment, alt: "Clear apartment kitchen" },
      { src: IMG.bedroomLight, alt: "Minimal light bedroom" },
    ],
    faqs: [
      { q: "How real does furniture removal look?", a: "Our editors rebuild floors, skirting and wall detail behind removed items. At listing resolution the result is seamless." },
      { q: "Can you remove just some items?", a: "Yes — partial declutters (excess furniture, personal items, cords and clutter) are common and often all a room needs." },
      { q: "Do buyers need to be told?", a: "Yes — as with staging, edited images should carry a 'digitally edited' disclosure. We supply originals and recommended captions." },
      { q: "What does it cost?", a: "From $59 per image depending on complexity, with bundle pricing when combined with virtual staging." },
    ],
    priceFrom: 59,
    priceNote: "per image, complexity-based",
    related: ["virtual-staging", "residential-photography", "twilight-photography"],
    icon: "Eraser",
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/* ---------- portfolio ---------- */

export type PortfolioCategory =
  | "Luxury Homes"
  | "Family Homes"
  | "Apartments"
  | "Townhouses"
  | "Lifestyle"
  | "Drone"
  | "Twilight";

export const portfolioCategories: PortfolioCategory[] = [
  "Luxury Homes",
  "Family Homes",
  "Apartments",
  "Townhouses",
  "Lifestyle",
  "Drone",
  "Twilight",
];

export type PortfolioItem = {
  id: string;
  src: string;
  alt: string;
  category: PortfolioCategory;
  location: string;
  /** aspect hint for masonry: tall | wide | square */
  aspect: "tall" | "wide" | "square";
};

export const portfolio: PortfolioItem[] = [
  { id: "p1", src: IMG.luxuryExteriorDusk, alt: "Luxury home exterior glowing at dusk", category: "Twilight", location: "Toorak", aspect: "wide" },
  { id: "p2", src: IMG.modernExterior, alt: "Architect-designed modern home exterior", category: "Luxury Homes", location: "Brighton", aspect: "wide" },
  { id: "p3", src: IMG.kitchenMarble, alt: "Marble island kitchen with brass pendants", category: "Luxury Homes", location: "South Yarra", aspect: "square" },
  { id: "p4", src: IMG.livingWarm, alt: "Warm family living room with garden view", category: "Family Homes", location: "Camberwell", aspect: "tall" },
  { id: "p5", src: IMG.aerialHouses, alt: "Aerial view over leafy residential streets", category: "Drone", location: "Kew", aspect: "wide" },
  { id: "p6", src: IMG.apartmentStyled, alt: "Styled inner-city apartment living room", category: "Apartments", location: "Melbourne CBD", aspect: "tall" },
  { id: "p7", src: IMG.poolEvening, alt: "Resort-style pool at evening", category: "Lifestyle", location: "Malvern", aspect: "wide" },
  { id: "p8", src: IMG.lawnExterior, alt: "Family home with manicured front lawn", category: "Family Homes", location: "Glen Waverley", aspect: "square" },
  { id: "p9", src: IMG.villaTwilight, alt: "Contemporary villa at twilight", category: "Twilight", location: "Hawthorn", aspect: "tall" },
  { id: "p10", src: IMG.apartmentModern, alt: "Modern apartment with city outlook", category: "Apartments", location: "Southbank", aspect: "square" },
  { id: "p11", src: IMG.townhouseRow, alt: "Row of contemporary townhouses", category: "Townhouses", location: "Essendon", aspect: "wide" },
  { id: "p12", src: IMG.poolLuxury, alt: "Luxury backyard pool and entertaining area", category: "Lifestyle", location: "Brighton", aspect: "tall" },
  { id: "p13", src: IMG.interiorLuxury, alt: "Designer living space with soft natural light", category: "Luxury Homes", location: "Toorak", aspect: "square" },
  { id: "p14", src: IMG.whiteExterior, alt: "Classic white weatherboard family home", category: "Family Homes", location: "Williamstown", aspect: "wide" },
  { id: "p15", src: IMG.aerialLandscape, alt: "Sweeping aerial landscape at golden hour", category: "Drone", location: "Doncaster", aspect: "wide" },
  { id: "p16", src: IMG.apartmentLiving, alt: "Light-filled apartment living space", category: "Apartments", location: "Richmond", aspect: "tall" },
  { id: "p17", src: IMG.brickExterior, alt: "Renovated brick townhouse facade", category: "Townhouses", location: "Balwyn", aspect: "square" },
  { id: "p18", src: IMG.bathroomLuxury, alt: "Marble bathroom with freestanding bath", category: "Luxury Homes", location: "South Yarra", aspect: "tall" },
];

/* ---------- before / after ----------
   Placeholder pairs: the "before" is a CSS-degraded version of the same
   frame until real before/after pairs are supplied. */

export const beforeAfter = {
  eyebrow: "The HussMedia edit",
  heading: "Every image, finished by hand",
  intro:
    "Drag the slider to see the difference professional editing makes. Sky replacement, grass enhancement, window views, colour correction — this is why our listings stop the scroll.",
  items: [
    {
      id: "sky",
      title: "Blue sky replacement",
      text: "Grey shoot day? Every exterior gets a natural blue sky.",
      image: IMG.modernExterior,
    },
    {
      id: "grass",
      title: "Grass & garden enhancement",
      text: "Lawns greened and gardens tidied — honestly, believably.",
      image: IMG.lawnExterior,
    },
    {
      id: "window",
      title: "Window view enhancement",
      text: "Balanced exposures pull the view back through every window.",
      image: IMG.livingWarm,
    },
    {
      id: "colour",
      title: "Colour correction",
      text: "Clean whites, natural timber, true-to-life tones in every room.",
      image: IMG.kitchenMarble,
    },
    {
      id: "twilight",
      title: "Day-to-dusk conversion",
      text: "A daytime exterior transformed into a glowing twilight hero.",
      image: IMG.luxuryExteriorDusk,
    },
  ],
};

/* ---------- process ---------- */

export const bookingProcess = {
  eyebrow: "Simple by design",
  heading: "From booking to inbox in 24 hours",
  steps: [
    { num: "01", title: "Book online", text: "Pick a package, choose a time. Your booking summary lands instantly — we confirm your time within business hours." },
    { num: "02", title: "We photograph your property", text: "On time, every time. A calm, efficient shoot that works around vendors and tenants." },
    { num: "03", title: "We professionally edit", text: "Every frame hand-finished — skies, lawns, windows and colour, all perfected." },
    { num: "04", title: "Images within 24 hours", text: "A ready-to-publish gallery in your inbox the next morning. Guaranteed." },
  ],
};

/* ---------- why agents choose us ---------- */

export const whyUs = {
  eyebrow: "Why HussMedia",
  heading: "Built around the way agents actually work",
  items: [
    { icon: "Zap", title: "Fast turnaround", text: "Photos next morning, video in 48 hours. Campaigns never wait on us." },
    { icon: "CalendarCheck", title: "Reliable scheduling", text: "Confirmed bookings, on-time arrivals, proactive updates." },
    { icon: "BadgeCheck", title: "Consistent quality", text: "Your tenth listing looks as good as your first. Every time." },
    { icon: "Wand2", title: "Premium editing", text: "Hand-finished images — never rushed batch processing." },
    { icon: "Plane", title: "Licensed drone operator", text: "CASA-compliant aerials with insurance and approvals handled." },
    { icon: "MousePointerClick", title: "Easy online booking", text: "Book a shoot in under two minutes, any time of day." },
    { icon: "MessageCircle", title: "Responsive communication", text: "Real replies from a real person — usually within the hour." },
    { icon: "Tags", title: "Honest packages", text: "Clear pricing, no surprises, genuine value at every tier." },
    { icon: "CloudSun", title: "Weather flexibility", text: "Free rescheduling and sky replacement when Melbourne does its thing." },
    { icon: "Truck", title: "Next-day delivery", text: "98% of shoots delivered by 9am the next business day." },
  ],
};

/* ---------- testimonials ---------- */

export const testimonials = [
  {
    quote:
      "Our auction campaigns changed the day we switched to HussMedia. The twilight shots alone have buyers arriving emotionally sold before the open.",
    name: "Sarah Mitchell",
    role: "Director",
    agency: "Bayside Estate Agents",
    avatar: portrait("photo-1573496359142-b8d87734a5a2"),
    rating: 5,
  },
  {
    quote:
      "Booked at 9pm, photographed next morning, images in my inbox by 8am the day after. I've never worked with a more reliable photographer.",
    name: "James Chen",
    role: "Senior Sales Agent",
    agency: "Northside Property Group",
    avatar: portrait("photo-1507003211169-0a1dd7228f2d"),
    rating: 5,
  },
  {
    quote:
      "Vendors notice the difference at listing presentations. Showing HussMedia photography next to competitors' has genuinely won me campaigns.",
    name: "Amelia Rossi",
    role: "Sales Agent",
    agency: "Harper & Finch",
    avatar: portrait("photo-1438761681033-6461ffad8d80"),
    rating: 5,
  },
  {
    quote:
      "The drone and video package on our Kew listing pulled 40% more portal views than the suburb average. The numbers speak for themselves.",
    name: "Tom Nguyen",
    role: "Auctioneer & Partner",
    agency: "Summit Realty",
    avatar: portrait("photo-1472099645785-5658abf4ff4e"),
    rating: 5,
  },
  {
    quote:
      "Every gallery is consistent, every deadline is met, and the booking system means my assistant can organise a shoot in minutes.",
    name: "Priya Sharma",
    role: "Office Manager",
    agency: "Boutique Property Co.",
    avatar: portrait("photo-1544005313-94ddf0286df2"),
    rating: 5,
  },
  {
    quote:
      "Virtual staging saved a tenanted listing that photographed terribly. Two days later it looked like a display home — and it sold in nine days.",
    name: "Marcus Webb",
    role: "Principal",
    agency: "Meridian Estates",
    avatar: portrait("photo-1560250097-0b93528c311a"),
    rating: 5,
  },
];

/* ---------- FAQ (homepage) ---------- */

export const faqs = [
  {
    q: "How long does a shoot take?",
    a: "Most residential shoots take 45–90 minutes on site depending on the size of the property. Larger homes with drone and video may take up to three hours. We'll confirm timing when you book.",
  },
  {
    q: "How quickly do I receive images?",
    a: "Photos are delivered within 24 hours — 98% arrive by 9am the next business day. Video and floor plans are delivered within 48 hours.",
  },
  {
    q: "What if it rains?",
    a: "Interiors go ahead regardless, and we replace grey skies on exteriors free of charge. If conditions make a quality shoot impossible, we reschedule at no cost — you'll never pay for weather.",
  },
  {
    q: "Do you photograph occupied homes?",
    a: "Absolutely — most homes we shoot are lived in. We tidy as we compose, work respectfully around tenants and vendors, and can digitally declutter rooms where needed.",
  },
  {
    q: "Do you travel outside Melbourne?",
    a: "Our standard service area covers metropolitan Melbourne with no travel fees. Regional and peninsula shoots are welcome with a small travel charge — just ask when booking.",
  },
  {
    q: "How do I book?",
    a: "Use the online booking form — it takes under two minutes, you'll receive an instant summary and we confirm your time within business hours. Prefer to talk? Call us and we'll organise everything on the spot.",
  },
  {
    q: "What payment methods do you accept?",
    a: "Card, bank transfer and agency invoicing. Most agencies settle on 14-day invoice terms; individual agents can pay by card at booking.",
  },
  {
    q: "Can I order drone photography?",
    a: "Yes — aerial photography is available as an add-on to any package or as a standalone shoot. All flights are CASA-compliant, insured and approval-checked for your suburb.",
  },
];

/* ---------- pricing ---------- */

export type Package = {
  id: string;
  name: string;
  tagline: string;
  price: number;
  popular?: boolean;
  includes: string[];
  turnaround: string;
  cta: string;
};

export const packages: Package[] = [
  {
    id: "essentials",
    name: "Photography",
    tagline: "Everything a standard listing needs",
    price: 349,
    includes: [
      "Up to 20 professional HDR images",
      "Interior, exterior & detail shots",
      "Hand-edited: sky, lawn & colour",
      "Portal, print & social crops",
      "Online gallery delivery",
    ],
    turnaround: "24-hour delivery",
    cta: "Book Photography",
  },
  {
    id: "aerial",
    name: "Photography + Drone",
    tagline: "Add the angle that sells location",
    price: 499,
    popular: true,
    includes: [
      "Everything in Photography",
      "5+ aerial drone images",
      "Block, position & lifestyle context",
      "CASA-licensed & fully insured",
      "Elevated facade angles",
    ],
    turnaround: "24-hour delivery",
    cta: "Book Photo + Drone",
  },
  {
    id: "complete-media",
    name: "Photo + Drone + Floor Plan",
    tagline: "The complete portal listing",
    price: 629,
    includes: [
      "Everything in Photography + Drone",
      "Laser-measured 2D floor plan",
      "Agency-branded plan design",
      "Total area calculations",
      "Buyers' most-requested feature",
    ],
    turnaround: "24–48 hour delivery",
    cta: "Book Complete Listing",
  },
  {
    id: "marketing",
    name: "Complete Marketing Package",
    tagline: "Premium campaigns & auctions",
    price: 999,
    includes: [
      "Up to 30 HDR images + drone set",
      "Twilight hero session",
      "60–90s cinematic property film",
      "Vertical social reel",
      "Laser-measured floor plan",
    ],
    turnaround: "Photos 24hr • film 48hr",
    cta: "Book Marketing Package",
  },
];

export const extras = [
  { name: "Twilight session", price: 149, unit: "add-on" },
  { name: "Day-to-dusk conversion", price: 49, unit: "per image" },
  { name: "Aerial drone set", price: 159, unit: "add-on" },
  { name: "2D floor plan", price: 139, unit: "most homes" },
  { name: "Property film (60–90s)", price: 399, unit: "add-on" },
  { name: "Vertical social reel", price: 249, unit: "add-on" },
  { name: "Virtual staging", price: 79, unit: "per image" },
  { name: "Furniture removal", price: 59, unit: "per image" },
  { name: "Same-day rush delivery", price: 99, unit: "add-on" },
];

/* ---------- booking form options ---------- */

export const bookingOptions = {
  propertyTypes: ["House", "Townhouse", "Apartment", "Unit", "Land / Acreage", "Other"],
  timeSlots: ["Morning (8am – 11am)", "Midday (11am – 2pm)", "Afternoon (2pm – 5pm)", "Twilight (dusk)"],
  bedrooms: ["1", "2", "3", "4", "5", "6+"],
  bathrooms: ["1", "2", "3", "4+"],
  propertySizes: ["Small (< 200m²)", "Medium (200 – 400m²)", "Large (400 – 700m²)", "Very large (700m²+)"],
  services: [
    "Photography",
    "Drone / aerial",
    "Twilight",
    "Floor plan",
    "Property video",
    "Social media reel",
    "Virtual staging",
    "Furniture removal",
  ],
};

/* ---------- final CTA ---------- */

export const finalCta = {
  heading: "Ready to make your next listing stand out?",
  text: "Join 350+ Melbourne agents who trust HussMedia with their campaigns. Book online in under two minutes.",
  cta: { label: "Book Your Next Shoot Today", href: "/book" },
};
