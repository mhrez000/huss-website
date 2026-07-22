/* ===========================================================
   LuxeVisuals — service areas (suburb pages)
   Each area gets a dedicated SEO page with unique content.
   =========================================================== */

import { IMG } from "./site";

export type Area = {
  slug: string;
  name: string;
  region: string;
  /** One-line hook used on cards and meta descriptions. */
  blurb: string;
  /** 2–3 unique intro paragraphs (SEO body copy). */
  intro: string[];
  /** Common property styles in this suburb. */
  propertyStyles: { title: string; text: string }[];
  faqs: { q: string; a: string }[];
  /** Image URLs from the shared pool in site.ts. */
  gallery: { src: string; alt: string }[];
  testimonial?: {
    quote: string;
    name: string;
    role: string;
    agency: string;
  };
  /** Slugs of nearby serviced suburbs. */
  nearby: string[];
};

export const areas: Area[] = [
  /* ---------------- Toorak ---------------- */
  {
    slug: "toorak",
    name: "Toorak",
    region: "Inner South-East",
    blurb:
      "Prestige photography for Melbourne's most exclusive addresses — estates, formal gardens and glowing twilight facades.",
    intro: [
      "Toorak campaigns don't compete on price — they compete on presentation. Behind the high hedges of St Georges Road, Irving Road and Grange Road sit some of Australia's most significant homes: Victorian and Georgian-revival mansions, French-provincial rebuilds and architect-designed estates on landholdings that can stretch past two thousand square metres. Buyers at this level expect campaign imagery that belongs in a design annual, and vendors expect a photographer who understands how to move through a significant home with care.",
      "Our Toorak shoots are planned like editorial productions. We scout the light for formal living rooms hung with art, compose around antiques and commissioned joinery, and time the exterior for the moment the facade lighting, pool and garden all glow together at dusk. Aerials — flown with full CASA compliance — capture what ground photography can't in this suburb: the sheer scale of the block, the tennis court, the north-facing garden.",
      "Discretion matters here too. A large share of Toorak transactions begin off-market, so we regularly deliver complete media suites before a listing ever reaches the portals — unbranded, confidential, and ready for a quiet launch to a private buyer list.",
    ],
    propertyStyles: [
      {
        title: "Landmark estates",
        text: "Gated Victorian and Georgian-revival mansions on deep blocks — shot to convey scale, provenance and privacy.",
      },
      {
        title: "Architect rebuilds",
        text: "Contemporary and French-provincial new builds with basement garaging, pools and home cinemas that reward detailed interior coverage.",
      },
      {
        title: "Prestige apartments",
        text: "Boutique developments near Toorak Village where finishes, outlooks and building amenity carry the campaign.",
      },
    ],
    faqs: [
      {
        q: "How do you photograph a large Toorak estate?",
        a: "We allow two to three hours on site and deliver extended sets of 30–40 images, sequenced from arrival through formal rooms to garden and pool. Twilight facade frames are shot as a separate session so both windows of light are perfect.",
      },
      {
        q: "Can you shoot discreetly for off-market campaigns?",
        a: "Yes — much of our Toorak work never appears on the portals. We arrive unbranded, work only with the parties you nominate, and deliver media privately so you control exactly who sees the home and when.",
      },
      {
        q: "Is a twilight session essential in Toorak?",
        a: "At this price point, almost always. Hedge-lined frontages, facade lighting and landscaped gardens come alive at dusk, and a twilight hero sets the prestige tone for the entire campaign — in print, online and at the listing presentation.",
      },
    ],
    gallery: [
      { src: IMG.luxuryExteriorDusk, alt: "Toorak estate facade glowing at twilight behind manicured gardens" },
      { src: IMG.interiorLuxury, alt: "Formal living room of a prestige Toorak residence in soft natural light" },
      { src: IMG.poolLuxury, alt: "Resort-style pool and entertaining terrace at a Toorak home" },
    ],
    testimonial: {
      quote:
        "On St Georges Road the photography is the listing presentation. LuxeVisuals's twilight and interior work has helped us secure three prestige appointments this year alone.",
      name: "Charlotte Beaumont",
      role: "Prestige Sales Director",
      agency: "Fifth Avenue Property",
    },
    nearby: ["south-yarra", "malvern", "hawthorn"],
  },

  /* ---------------- South Yarra ---------------- */
  {
    slug: "south-yarra",
    name: "South Yarra",
    region: "Inner South-East",
    blurb:
      "From Victorian terraces to skyline apartments — photography that matches South Yarra's pace and polish.",
    intro: [
      "South Yarra moves faster than almost any market in Melbourne. Between the energy of Chapel Street and Toorak Road and the calm of the Royal Botanic Gardens, campaigns here span single-fronted Victorian terraces on tree-lined side streets, art-deco walk-ups with original detail, and glass towers along the river where the view is the headline feature. Each demands a different photographic approach — and buyers scrolling past hundreds of local listings will only pause for the ones that get it right.",
      "Apartments are our specialty in this suburb. We know how to make a compact one-bedroom feel open without dishonest distortion, when to shoot a balcony at dusk so the skyline glows behind the glass, and how to cover building amenity — pools, gyms, rooftop terraces — so a listing sells the lifestyle as much as the floor space. For period terraces we slow down, letting ceiling roses, open fireplaces and courtyard gardens do the talking.",
      "With owner-occupiers, investors and downsizers all competing in the same postcode, consistent next-morning delivery keeps your South Yarra campaigns launching on schedule — every time.",
    ],
    propertyStyles: [
      {
        title: "Victorian terraces",
        text: "Single- and double-fronted terraces on leafy side streets, shot to balance period facades with renovated rear extensions.",
      },
      {
        title: "Art-deco apartments",
        text: "Character walk-ups with curved plaster, timber floors and leadlight — photographed warm and true to era.",
      },
      {
        title: "Luxury new developments",
        text: "River and Domain-precinct towers where dusk balcony frames and amenity coverage set the listing apart.",
      },
    ],
    faqs: [
      {
        q: "Can you handle apartment buildings with access rules?",
        a: "Yes — we coordinate with building managers and owners corporations regularly across South Yarra, booking lifts and common-area access in advance so shoot day runs without a hitch.",
      },
      {
        q: "How do you make a compact apartment feel spacious?",
        a: "Careful heights, wide-but-honest focal lengths and balanced HDR exposures that pull light through every window. We also deliver vertical crops so the listing presents beautifully on mobile, where most South Yarra buyers browse.",
      },
      {
        q: "Do you shoot skyline and Botanic Gardens outlooks?",
        a: "Absolutely — outlook is often the most valuable feature in this suburb. We time balcony and living-room frames for dusk so the city lights up behind the glass, and capture green garden outlooks in soft morning light.",
      },
    ],
    gallery: [
      { src: IMG.apartmentStyled, alt: "Styled South Yarra apartment living room with designer furniture" },
      { src: IMG.kitchenMarble, alt: "Marble kitchen with brass pendants in a South Yarra residence" },
      { src: IMG.apartmentModern, alt: "Modern South Yarra apartment with floor-to-ceiling city outlook" },
    ],
    testimonial: {
      quote:
        "We list everything from deco one-bedders to $4m terraces in South Yarra, and LuxeVisuals nails the brief on both. The dusk balcony shots consistently double our click-throughs.",
      name: "Oliver Tan",
      role: "Senior Sales Agent",
      agency: "Boutique Property Co.",
    },
    nearby: ["toorak", "malvern"],
  },

  /* ---------------- Brighton ---------------- */
  {
    slug: "brighton",
    name: "Brighton",
    region: "Bayside",
    blurb:
      "Bayside light, Golden Mile prestige and twilight over the bathing boxes — Brighton campaigns done properly.",
    intro: [
      "Few Melbourne suburbs photograph like Brighton. The famous Golden Mile between Church Street and the Esplanade delivers a run of grand Edwardian residences and bold contemporary rebuilds, while the Dendy Street bathing boxes give campaigns a location cue recognised around the world. Bayside light does something special here in the late afternoon — and we build our Brighton schedules around it.",
      "Local buyers shop on lifestyle: walk-to-beach, Church Street cafes, the yacht club, the school run. Our aerial work makes those distances tangible, framing the home against the curve of the bay so a buyer in another suburb — or another state — understands the position instantly. On the ground, we photograph pools, alfresco terraces and north-facing gardens the way Brighton families actually live in them.",
      "Twilight matters more here than almost anywhere. A dusk hero shot with the sky burning over Port Phillip Bay is the single most requested frame from our Brighton agents, and it routinely leads their print and portal campaigns.",
    ],
    propertyStyles: [
      {
        title: "Golden Mile prestige",
        text: "Landmark homes between Church Street and the Esplanade, where twilight facades and bay-context aerials lead the campaign.",
      },
      {
        title: "Edwardian family homes",
        text: "Wide-verandah period residences on deep blocks — photographed to honour heritage detail alongside renovated interiors.",
      },
      {
        title: "Contemporary rebuilds",
        text: "Architect-designed new homes with pools, basements and glass-lined living zones that reward crisp, layered HDR coverage.",
      },
    ],
    faqs: [
      {
        q: "Do you photograph twilight along the Golden Mile?",
        a: "It's our most requested Brighton session. We schedule for the exact dusk window on your street, capturing the facade glowing against the bay sky — and where the brief calls for it, an aerial twilight with the coastline curving behind the home.",
      },
      {
        q: "Can the drone show how close we are to the beach?",
        a: "Yes — beach proximity is Brighton's biggest selling point and aerials prove it in one frame. We fly CASA-compliant flights that place the home against Dendy Street Beach, the bathing boxes and the bay, so distance-to-sand is unmistakable.",
      },
      {
        q: "Is there a travel fee for Brighton shoots?",
        a: "No — Brighton and the Bayside strip sit well inside our standard metro service area. Standard pricing and the 24-hour delivery guarantee apply, including twilight sessions.",
      },
    ],
    gallery: [
      { src: IMG.modernExterior, alt: "Contemporary Brighton rebuild in golden afternoon bayside light" },
      { src: IMG.poolEvening, alt: "Brighton family pool and entertaining area at evening" },
      { src: IMG.twilightHouse, alt: "Brighton home at twilight against a deep blue bay sky" },
    ],
    testimonial: {
      quote:
        "Our Golden Mile twilights from LuxeVisuals have become a signature for the office. Vendors ask for 'those dusk photos' by name before we've even pitched the campaign.",
      name: "Sophie Kalogeropoulos",
      role: "Partner",
      agency: "Bayside Estate Agents",
    },
    nearby: ["malvern", "south-yarra"],
  },

  /* ---------------- Hawthorn ---------------- */
  {
    slug: "hawthorn",
    name: "Hawthorn",
    region: "Inner East",
    blurb:
      "Heritage brickwork and designer extensions, photographed for Hawthorn's discerning buyers.",
    intro: [
      "Hawthorn's streets tell Melbourne's architectural story in a single walk: polychrome 'Hawthorn brick' Victorians on Scotch Hill, grand Edwardians above the river bends, and a steady stream of boutique apartments rising around Glenferrie Road and Swinburne. It's a suburb where buyers know their parapets from their pediments — which means listing photography has to be architecturally literate, not just bright.",
      "The signature Hawthorn campaign is the period home with a contemporary heart: an ornate heritage frontage giving way to a glass-and-steel rear extension over the garden. We sequence these shoots deliberately — street presence first, then the reveal — so the gallery walks buyers through the same emotional journey an inspection would. Interiors are hand-edited to keep original timber, tessellation and stained glass true to colour.",
      "Between family auctions, investor apartments and the private-school catchment market, Hawthorn agents run relentless campaign calendars. Our next-morning delivery and same-evening twilight add-ons are built to keep pace.",
    ],
    propertyStyles: [
      {
        title: "Hawthorn-brick Victorians",
        text: "The suburb's famous polychrome brick homes — photographed to make patterned facades and iron lacework sing.",
      },
      {
        title: "Period homes with modern rears",
        text: "Heritage frontages concealing architect extensions; we sequence the gallery so the contemporary reveal lands with impact.",
      },
      {
        title: "Boutique apartments",
        text: "Investor and downsizer stock around Glenferrie Road and Swinburne, shot efficiently with honest, light-filled angles.",
      },
    ],
    faqs: [
      {
        q: "How do you shoot a heritage facade with a modern extension?",
        a: "As a narrative. We open with the period street presence in flattering light, then move through to the contemporary rear and garden so the transformation reads clearly in the gallery — the same reveal buyers experience at an inspection.",
      },
      {
        q: "Do you photograph investment apartments near Swinburne?",
        a: "Yes — we shoot compact investor sets for Hawthorn apartments regularly, priced for smaller properties and delivered with the vertical crops that perform best with young renters and first-home buyers browsing on mobile.",
      },
      {
        q: "Can you turn a Hawthorn auction campaign around quickly?",
        a: "Photos land next morning — 98% by 9am — and a twilight session can run the same evening as the daytime shoot. Most Hawthorn agents book us the day the authority is signed so the campaign launches inside the week.",
      },
    ],
    gallery: [
      { src: IMG.villaTwilight, alt: "Renovated Hawthorn residence glowing at twilight" },
      { src: IMG.brickExterior, alt: "Classic Hawthorn brick facade with period detailing" },
      { src: IMG.livingModern, alt: "Contemporary rear extension living space in a Hawthorn period home" },
    ],
    testimonial: {
      quote:
        "Hawthorn buyers scrutinise everything, and LuxeVisuals's galleries survive that scrutiny. The way they sequence heritage front to modern rear has genuinely lifted our open numbers.",
      name: "Edward Fairbrother",
      role: "Auctioneer & Director",
      agency: "Harper & Finch",
    },
    nearby: ["kew", "camberwell", "toorak"],
  },

  /* ---------------- Kew ---------------- */
  {
    slug: "kew",
    name: "Kew",
    region: "Inner East",
    blurb:
      "Leafy aerials and architecture-first photography for Kew's grand family homes.",
    intro: [
      "Kew is Melbourne's garden suburb in the truest sense — deep blocks, mature European trees, and an unusually rich architectural mix. The Sackville precinct holds some of the city's grandest family residences, while the winding streets of Studley Park shelter celebrated mid-century and modernist homes that attract design-aware buyers from across the country. Photographing here means respecting the architecture first.",
      "Our aerial work earns its keep in Kew like few other suburbs. Flown above the tree canopy, drone frames reveal what the street never shows: the full depth of the block, the pool and north lawn behind the home, and the green corridor running down to the Yarra. For modernist listings we go the other way — low, considered, natural-light compositions that treat the home like the design object its buyers believe it to be.",
      "With the private-school belt on the doorstep, Kew campaigns are family campaigns. We shoot the spaces that decide those sales: big kitchens, kids' zones, studies and gardens made for weekend cricket.",
    ],
    propertyStyles: [
      {
        title: "Grand family homes",
        text: "Sackville-precinct residences on deep garden blocks — covered with extended interior sets and canopy-level aerials.",
      },
      {
        title: "Mid-century & modernist",
        text: "Studley Park's design pedigree demands restraint: natural light, honest lines and no over-processing.",
      },
      {
        title: "New luxury townhouses",
        text: "High-spec downsizer stock near Kew Junction, where finish detail and light-filled voids carry the gallery.",
      },
    ],
    faqs: [
      {
        q: "Can you photograph mid-century homes sympathetically?",
        a: "It's some of our favourite work. We shoot architecture-first — natural light, level verticals, original materials rendered true — and skip the glossy over-processing that design-literate Studley Park buyers see through instantly.",
      },
      {
        q: "Will a drone actually show anything over Kew's trees?",
        a: "Yes — that canopy is the point. We fly above it to reveal block depth, gardens and pools invisible from the street, and wider frames place the home in Kew's green corridor running down to the Yarra. All flights are CASA-compliant and insured.",
      },
      {
        q: "How long does a large Kew family home take to shoot?",
        a: "Typically 90 minutes to two hours for a full interior, exterior and aerial set. We laser-measure for the floor plan during the same visit, so one appointment covers the entire campaign kit.",
      },
    ],
    gallery: [
      { src: IMG.aerialHouses, alt: "Aerial view over Kew's leafy residential streets and deep blocks" },
      { src: IMG.houseExterior3, alt: "Established Kew family home behind a mature garden" },
      { src: IMG.interiorSoft, alt: "Light-filled family living room in a Kew residence" },
    ],
    testimonial: {
      quote:
        "The canopy aerials sold the block before anyone stepped inside. Our Sackville Street campaign hit 40% above the suburb's average portal views in week one.",
      name: "Miranda Hollis",
      role: "Sales Agent",
      agency: "Summit Realty",
    },
    nearby: ["hawthorn", "balwyn", "camberwell"],
  },

  /* ---------------- Camberwell ---------------- */
  {
    slug: "camberwell",
    name: "Camberwell",
    region: "Inner East",
    blurb:
      "Auction-ready galleries for Camberwell's Edwardian streets and deep family blocks.",
    intro: [
      "Camberwell is Melbourne auction country. From the ridge along Prospect Hill Road down through streets of red-brick Edwardians and Californian bungalows, this is a suburb of family homes on generous blocks — and of Saturday mornings where a strong campaign draws four bidders instead of two. The photography that opens that campaign has one job: get more families through the gate.",
      "We photograph Camberwell homes the way their buyers imagine living in them. Morning light through leadlight entry halls, kitchens that anchor the family zone, and backyards deep enough for a trampoline and a veggie patch — often captured from an elevated angle so the full block reads at a glance. Around Camberwell Junction and Burke Road, townhouse and unit campaigns get the same treatment scaled to size.",
      "Agents here run listing windows with multiple properties launching in the same week. Our consistency is the quiet advantage: every gallery in your window carries the same premium look, shot and delivered on a schedule that never slips.",
    ],
    propertyStyles: [
      {
        title: "Edwardian & Queen Anne homes",
        text: "Red-brick period homes with return verandahs and leadlight — shot warm, level and true to era.",
      },
      {
        title: "Californian bungalows",
        text: "The suburb's staple family home; we emphasise street appeal, light and the depth of the backyard.",
      },
      {
        title: "Family townhouses",
        text: "Newer stock near Camberwell Junction, covered with efficient, bright sets for downsizers and young families.",
      },
    ],
    faqs: [
      {
        q: "Can you keep up with a Saturday auction cycle?",
        a: "That's our rhythm too. Shoot early in the campaign week, photos in your inbox next morning, floor plan within 48 hours — your Camberwell listing is portal-ready days before the first open.",
      },
      {
        q: "How do you show off a deep Camberwell backyard?",
        a: "Elevated angles. A low drone or mast frame over the rear of the block shows lawn, established trees and the garage in one image — the exact picture upsizing families are hunting for and street photography can't deliver.",
      },
      {
        q: "Can our whole listing window look consistent?",
        a: "Yes — consistency is the core of what we do. Same photographer standards, same hand-editing style, same delivery format across every property, so your window of Camberwell campaigns presents as one premium brand.",
      },
    ],
    gallery: [
      { src: IMG.livingWarm, alt: "Warm family living room with garden outlook in a Camberwell home" },
      { src: IMG.houseExterior4, alt: "Character Camberwell family home on a leafy street" },
      { src: IMG.kitchenBright, alt: "Bright renovated kitchen at the heart of a Camberwell bungalow" },
    ],
    testimonial: {
      quote:
        "Four campaigns launching in one week and every gallery looked like the same magazine. That consistency is why our vendors sign — and why we won't use anyone else in Camberwell.",
      name: "Daniel Petrakis",
      role: "Director",
      agency: "Meridian Estates",
    },
    nearby: ["hawthorn", "kew", "balwyn"],
  },

  /* ---------------- Malvern ---------------- */
  {
    slug: "malvern",
    name: "Malvern",
    region: "Inner South-East",
    blurb:
      "Iron lace, tessellated paths and designer interiors — Malvern's period homes at their finest.",
    intro: [
      "Malvern rewards photographers who notice things. Its Victorian and Edwardian streets — from the tightly held Gascoigne Estate to the avenues around Central Park — are rich in the details that justify the suburb's price tags: iron-lace verandahs, tessellated tile paths, arched hallways and marble fireplaces that survive behind immaculately renovated frontages.",
      "Our Malvern galleries pair those heritage details with what today's buyers actually purchase: designer kitchens, seamless indoor-outdoor living and landscaped gardens tucked behind period facades. We shoot detail frames — the tessellation at the front gate, the original ceiling rose — because Malvern buyers linger on them, and because they signal a home that has been loved rather than flipped.",
      "Between Glenferrie Road village, Central Park and some of Melbourne's most consistent capital growth, Malvern campaigns attract sophisticated, research-heavy buyers. The photography needs to hold up to a second and third viewing online — ours does.",
    ],
    propertyStyles: [
      {
        title: "Victorian iron-lace homes",
        text: "Ornate single- and double-fronted Victorians where verandah detail and hallway arches deserve their own frames.",
      },
      {
        title: "Edwardian family residences",
        text: "Solid red-brick homes near Central Park, shot to balance period bones with renovated family living.",
      },
      {
        title: "Designer renovations",
        text: "Heritage frontages hiding architect interiors — galleries sequenced so the transformation reveals itself.",
      },
    ],
    faqs: [
      {
        q: "Do you capture period details like tessellated paths and iron lace?",
        a: "Always — every Malvern shoot includes a detail set. Tessellation, lacework, leadlight and ceiling roses are the credibility markers Malvern buyers look for, and they perform brilliantly as supporting frames in the gallery.",
      },
      {
        q: "Is twilight worth booking on a leafy Malvern street?",
        a: "Yes — some of our favourite twilights come from this suburb. Street trees frame the glowing verandah beautifully at dusk, and the warm-period-home-at-nightfall image is emotional gold for family buyers.",
      },
      {
        q: "Can you show proximity to Central Park?",
        a: "We can — a brief CASA-compliant aerial places the home in its pocket, with Central Park's green canopy as the landmark. For parkside listings it's often the difference between a good campaign and a great one.",
      },
    ],
    gallery: [
      { src: IMG.houseExterior2, alt: "Period Malvern home with landscaped frontage in afternoon light" },
      { src: IMG.interiorLux2, alt: "Designer renovated interior within a Malvern Victorian residence" },
      { src: IMG.bedroomSoft, alt: "Softly lit main bedroom in a renovated Malvern home" },
    ],
    testimonial: {
      quote:
        "They photographed the tessellated path and the ceiling roses without being asked. Malvern buyers notice that level of care — and our enquiry rates show it.",
      name: "Annabel Wray",
      role: "Senior Sales Consultant",
      agency: "Grandview Real Estate",
    },
    nearby: ["toorak", "south-yarra", "camberwell"],
  },

  /* ---------------- Balwyn ---------------- */
  {
    slug: "balwyn",
    name: "Balwyn",
    region: "Inner East",
    blurb:
      "Photography built for Balwyn's grand new builds, clinker classics and sight-unseen buyers.",
    intro: [
      "Balwyn's market runs on two engines: the school zone and the rebuild. Wide, quiet streets of 1930s clinker-brick homes sit alongside imposing new residences — stone facades, double-height voids, home theatres and alfresco kitchens — built for families anchoring themselves inside one of Melbourne's most sought-after public-school catchments. Both ends of that market are unusually image-driven.",
      "A significant share of Balwyn buyers research from interstate or overseas, and many commit to inspect — or even to buy — based almost entirely on the listing media. That raises the stakes on every frame. Our Balwyn kits lean comprehensive: full interior coverage, aerials that show block dimensions and orientation, laser-measured floor plans and video walkthroughs, so a remote buyer can genuinely understand the home.",
      "For brand-new builds we shoot to display-home standard — styling-aware compositions, crisp HDR that keeps stone and timber honest, and twilight sessions that make a statement facade unmissable in the portal scroll.",
    ],
    propertyStyles: [
      {
        title: "Clinker-brick classics",
        text: "The 1930s homes that define old Balwyn — shot for character, north light and the potential in their deep blocks.",
      },
      {
        title: "Grand new builds",
        text: "Statement family residences with voids, theatres and stone kitchens, photographed to display-home standard.",
      },
      {
        title: "School-zone townhouses",
        text: "Newer low-maintenance stock for families buying into the catchment — efficient, bright, mobile-first galleries.",
      },
    ],
    faqs: [
      {
        q: "Many of our Balwyn buyers are interstate or overseas. Does that change the shoot?",
        a: "It changes the whole kit. We recommend extended photo sets, a floor plan and a video walkthrough so remote buyers can assess the home with confidence — sight-unseen offers are common in Balwyn when the media is thorough enough to trust.",
      },
      {
        q: "Can you photograph a new build before landscaping is finished?",
        a: "Yes — it's a constant in this suburb. We frame around unfinished edges where possible and apply honest digital lawn and garden enhancement, so the home presents complete without misrepresenting the block.",
      },
      {
        q: "How quickly can a handover-to-market campaign move?",
        a: "Fast. Shoot the day after handover, photos next morning, plan and video within 48 hours — Balwyn builders and agents often have a completed campaign kit inside three days of keys.",
      },
    ],
    gallery: [
      { src: IMG.houseModern2, alt: "Grand contemporary new build on a wide Balwyn street" },
      { src: IMG.interiorStaged, alt: "Open-plan living zone styled for a Balwyn family campaign" },
      { src: IMG.bathroomLuxury, alt: "Stone bathroom with freestanding bath in a Balwyn new build" },
    ],
    testimonial: {
      quote:
        "A Shanghai-based buyer purchased our Balwyn North listing after the video walkthrough and floor plan alone. That's what complete media from LuxeVisuals makes possible.",
      name: "Grace Liu",
      role: "Sales Agent",
      agency: "Harper & Finch",
    },
    nearby: ["kew", "camberwell", "doncaster"],
  },

  /* ---------------- Glen Waverley ---------------- */
  {
    slug: "glen-waverley",
    name: "Glen Waverley",
    region: "South-East",
    blurb:
      "From original blocks to brand-new builds — media that wins Glen Waverley's competitive family market.",
    intro: [
      "Glen Waverley may be Melbourne's most competitive family market. Anchored by the Glen Waverley Secondary College zone, The Glen shopping centre and the restaurants of Kingsway, the suburb draws relentless demand from local upgraders and international families alike — and its auctions are famous for depth of bidding when a campaign is done well.",
      "The housing stock tells a story of transformation: original 1960s and 70s brick veneers on 600-plus square metre blocks, selling alongside the luxurious new homes that replace them. We shoot both ends with intent. For original homes, aerial frames make the block itself the hero — dimensions, orientation and rebuild potential in a single image. For new builds, we deliver display-home-standard galleries where stone benchtops, butler's pantries and zoned family living shine.",
      "Because so many Glen Waverley buyers begin their search from overseas, our agents here lean on complete media kits — photography, floor plan, video — that let a family in Singapore or Shenzhen shortlist the home with total confidence.",
    ],
    propertyStyles: [
      {
        title: "Original family homes",
        text: "1960s–70s brick veneers on big blocks, where aerial land coverage often matters more than the interiors.",
      },
      {
        title: "Brand-new luxury builds",
        text: "Double-storey family homes with premium finishes — photographed to the standard of a builder's display gallery.",
      },
      {
        title: "Modern townhouses & units",
        text: "The fast-moving entry point to the school zone, shot bright and efficient for first-home and investor buyers.",
      },
    ],
    faqs: [
      {
        q: "The home is original but the land is the value. How do you shoot that?",
        a: "We lead with the block. CASA-compliant aerials show the full parcel, its orientation and street position, while ground frames keep the home tidy and honest — exactly the mix developers and rebuild-minded families want to see.",
      },
      {
        q: "Can you photograph a new build to display-home standard?",
        a: "Yes — new-build campaigns are a Glen Waverley staple for us. Crisp HDR that keeps stone and timber true, considered styling adjustments on site, and detail frames of the finishes that justify the price guide.",
      },
      {
        q: "Is it worth showing The Glen and Kingsway in the campaign?",
        a: "For this suburb, absolutely. A single aerial placing the home relative to the school zone, The Glen and the station answers the first three questions every Glen Waverley buyer asks — before they've read a word of the copy.",
      },
    ],
    gallery: [
      { src: IMG.lawnExterior, alt: "Glen Waverley family home with manicured front lawn" },
      { src: IMG.kitchenModern, alt: "Modern stone kitchen in a new Glen Waverley build" },
      { src: IMG.bedroomLight, alt: "Light-filled bedroom in a contemporary Glen Waverley home" },
    ],
    testimonial: {
      quote:
        "Our last original-condition listing drew seven bidders because the aerial made the block impossible to ignore. LuxeVisuals understands exactly what sells in Glen Waverley.",
      name: "Kevin Zhang",
      role: "Auctioneer & Partner",
      agency: "Summit Realty",
    },
    nearby: ["doncaster", "camberwell"],
  },

  /* ---------------- Doncaster ---------------- */
  {
    slug: "doncaster",
    name: "Doncaster",
    region: "East",
    blurb:
      "Skyline views and elevated blocks — Doncaster photography that leads with the outlook.",
    intro: [
      "Doncaster's secret weapon is elevation. Built across some of the highest ground in Melbourne's east, the suburb's ridgelines look clean across the treetops to the city skyline — and on a clear evening, that view sells homes. Our Doncaster campaigns are scheduled around it, timing west-facing frames and twilight aerials for the moment the CBD lights up on the horizon.",
      "The market itself spans three generations of housing: solid 1970s family homes on generous, gently sloping blocks; townhouse developments filling the middle ground; and the apartment towers of Doncaster Hill rising beside Westfield. Each needs its own playbook — block-and-orientation aerials for the originals, light-and-flow interiors for townhouses, and amenity-plus-outlook coverage for the Hill's apartments and their skyline balconies.",
      "For families weighing up the leafy courts against school access and the Eastern Freeway commute, honest lifestyle context — parks, Ruffey Lake, the shopping centre — rounds out a campaign that answers questions before they're asked.",
    ],
    propertyStyles: [
      {
        title: "Elevated 1970s family homes",
        text: "Original homes on high, generous blocks — shot with aerials that capture the land and the city glimpse beyond.",
      },
      {
        title: "Doncaster Hill apartments",
        text: "Tower living beside Westfield, where balcony skyline frames at dusk and amenity floors drive enquiry.",
      },
      {
        title: "New townhouse developments",
        text: "Modern family stock in quiet courts, photographed bright and spacious for upsizers and downsizers alike.",
      },
    ],
    faqs: [
      {
        q: "Can the drone really capture the city skyline from Doncaster?",
        a: "On the ridgelines, yes — and it's spectacular. We fly CASA-compliant twilight aerials that catch the CBD glowing on the horizon behind the home, an image that instantly separates a Doncaster listing from everything else on the portal.",
      },
      {
        q: "Do you shoot Doncaster Hill apartments?",
        a: "Regularly. We coordinate building access, photograph the amenity floors and pools, and time balcony frames for dusk so the skyline outlook — the reason buyers choose the Hill — leads the gallery.",
      },
      {
        q: "Is Doncaster inside your standard service area?",
        a: "Completely. No travel fees apply anywhere in metro Melbourne, and the 24-hour photo delivery guarantee holds for Doncaster exactly as it does in the inner suburbs.",
      },
    ],
    gallery: [
      { src: IMG.aerialLandscape, alt: "Sweeping aerial over Doncaster's elevated streets at golden hour" },
      { src: IMG.houseFacade2, alt: "Established Doncaster family home on a generous elevated block" },
      { src: IMG.livingBright, alt: "Bright open living space in a modern Doncaster townhouse" },
    ],
    testimonial: {
      quote:
        "The twilight aerial with the city on the horizon became our best-performing hero image of the year. Doncaster's elevation is wasted without a photographer who knows how to use it.",
      name: "Robert Ianniello",
      role: "Principal",
      agency: "Grandview Real Estate",
    },
    nearby: ["balwyn", "glen-waverley", "kew"],
  },

  /* ---------------- Essendon ---------------- */
  {
    slug: "essendon",
    name: "Essendon",
    region: "North-West",
    blurb:
      "Period charm and airport-airspace expertise — Essendon campaigns without the compliance headaches.",
    intro: [
      "Essendon is the grand old dame of Melbourne's north-west. Its avenues off Mt Alexander Road carry some of the city's finest Queen Anne and Edwardian homes — turrets, fretwork, return verandahs — alongside streets of Californian bungalows, a growing crop of townhouses, and the village life of North Essendon and the Windy Hill precinct. Buyers come here for character, and character is exactly what the photography has to deliver.",
      "Our Essendon detail sets celebrate what makes these homes irreplaceable: leadlight entries, timber fretwork, tessellated verandahs and original fireplaces, hand-edited so heritage colours stay true. For renovated homes we balance that character with the modern rear — kitchens, alfresco zones and studios — so the gallery sells both the romance and the practicality.",
      "One local wrinkle we handle better than anyone: airspace. Much of Essendon sits inside controlled airspace for Essendon Fields Airport, which grounds casual drone operators. As CASA-licensed pilots, we arrange the required approvals in advance — so your listing still gets its aerial coverage, legally and safely.",
    ],
    propertyStyles: [
      {
        title: "Queen Anne & Edwardian homes",
        text: "Turreted, fretworked period residences on Essendon's grand avenues — shot to honour every original detail.",
      },
      {
        title: "Californian bungalows",
        text: "The north-west's classic family home, photographed for street charm, north light and renovated interiors.",
      },
      {
        title: "Modern townhouses & apartments",
        text: "Newer stock along the Mt Alexander Road corridor, covered with bright, efficient sets for first-home buyers and investors.",
      },
    ],
    faqs: [
      {
        q: "Can you fly a drone near Essendon Fields Airport?",
        a: "Yes — this is our home-turf expertise. Much of Essendon is controlled airspace, so we arrange CASA approvals ahead of your shoot; where a particular address can't be approved, we substitute elevated mast photography so the campaign never loses its high angle.",
      },
      {
        q: "Do you photograph period details like leadlight and fretwork?",
        a: "Every Essendon shoot includes a heritage detail set — leadlight, fretwork, ceiling roses and verandah tessellation. Those frames are what separate a genuine Queen Anne campaign from a generic one, and buyers pore over them.",
      },
      {
        q: "Is there a travel fee for the north-west?",
        a: "None — Essendon, Moonee Valley and the surrounding north-west sit squarely inside our standard metro service area, with the same pricing and 24-hour delivery guarantee as everywhere else in Melbourne.",
      },
    ],
    gallery: [
      { src: IMG.townhouseRow, alt: "Row of contemporary townhouses in Essendon" },
      { src: IMG.livingRoom2, alt: "Renovated open living area in an Essendon period home" },
      { src: IMG.kitchenApartment, alt: "Modern kitchen in an Essendon apartment" },
    ],
    testimonial: {
      quote:
        "Two other photographers told us drone shots were impossible because of the airport. LuxeVisuals had the approval sorted within days — and the aerials made the campaign.",
      name: "Frank Caruana",
      role: "Director",
      agency: "Northside Property Group",
    },
    nearby: ["williamstown", "kew"],
  },

  /* ---------------- Williamstown ---------------- */
  {
    slug: "williamstown",
    name: "Williamstown",
    region: "Inner West",
    blurb:
      "Heritage seaport character and skyline-across-the-water twilights, shot with local care.",
    intro: [
      "Williamstown is unlike anywhere else in Melbourne — a heritage seaport on its own peninsula, where sea captains' Victorian residences and rows of timber workers' cottages step down to Nelson Place, Gem Pier and the masts of the yacht clubs. Add The Strand's unbroken view of the city skyline across the water, and you have a suburb that hands photographers extraordinary raw material.",
      "We treat that material with respect. Weatherboard homes are photographed colour-true and level — no lens distortion stretching a cottage into something it isn't — because Williamstown's heritage-savvy buyers know exactly what an honest four-room Victorian looks like. For the grander Hanmer and Osborne Street homes, we build fuller campaigns: period detail sets, garden frames and aerials that show the peninsula setting, the beach and the botanic gardens in one sweep.",
      "And then there's the twilight. A dusk shoot on or near The Strand, with the CBD lighting up across Hobsons Bay behind the home, is the single most powerful image a Williamstown campaign can own. We schedule these to the minute.",
    ],
    propertyStyles: [
      {
        title: "Sea captains' Victorians",
        text: "The grand heritage residences of old Williamstown — photographed with full detail sets and peninsula-context aerials.",
      },
      {
        title: "Workers' weatherboard cottages",
        text: "Timber cottages shot honest, level and colour-true, the way heritage buyers expect to see them.",
      },
      {
        title: "Waterfront contemporary",
        text: "Modern homes and apartments near The Strand, where skyline-across-the-water frames lead the gallery.",
      },
    ],
    faqs: [
      {
        q: "Do you photograph twilight on The Strand?",
        a: "It's the signature Williamstown frame — the home glowing at dusk with the city skyline lighting up across the water behind it. We time these sessions precisely and they routinely become the hero image of the entire campaign.",
      },
      {
        q: "How do you photograph heritage weatherboards honestly?",
        a: "Level verticals, honest focal lengths and hand-edited colour that keeps heritage paint schemes true. Williamstown buyers know these cottages intimately, and photography that over-stretches or over-saturates costs credibility at the open.",
      },
      {
        q: "Can aerials capture the peninsula setting?",
        a: "Beautifully — few suburbs reward a drone like Williamstown. One CASA-compliant flight can place the home against the beach, the botanic gardens, Gem Pier and the bay, telling the whole location story in a single frame.",
      },
    ],
    gallery: [
      { src: IMG.whiteExterior, alt: "Classic white weatherboard home in Williamstown" },
      { src: IMG.livingNeutral, alt: "Neutral-toned renovated living room in a Williamstown cottage" },
      { src: IMG.bathroomModern, alt: "Modern renovated bathroom in a Williamstown period home" },
    ],
    testimonial: {
      quote:
        "The Strand twilight with the city behind the house stopped everyone mid-scroll — we tracked triple our usual saves on that listing. Nobody shoots Willy like this.",
      name: "Erin Doyle",
      role: "Sales Agent",
      agency: "Bayside Estate Agents",
    },
    nearby: ["essendon", "brighton"],
  },
];

export function getArea(slug: string) {
  return areas.find((a) => a.slug === slug);
}
