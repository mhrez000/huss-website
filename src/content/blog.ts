/* ===========================================================
   HussMedia — blog content
   Each post is structured data (no MDX dependency) so it can
   be edited like a CMS and rendered with full control.
   =========================================================== */

import { IMG } from "./site";

export type PostSection = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  /** ISO date, e.g. "2026-06-15" */
  date: string;
  readTime: string;
  cover: string;
  coverAlt: string;
  tags: string[];
  sections: PostSection[];
};

/** Posts are ordered newest first. */
export const posts: BlogPost[] = [
  {
    slug: "how-professional-photography-sells-homes-faster",
    title: "How Professional Photography Helps Sell Homes Faster",
    excerpt:
      "The data behind why professionally photographed listings attract more views, book more inspections and spend fewer days on market in Australia.",
    date: "2026-06-22",
    readTime: "4 min read",
    cover: IMG.modernExterior,
    coverAlt: "Architect-designed modern home exterior photographed at golden hour",
    tags: ["Photography", "Selling Strategy"],
    sections: [
      {
        paragraphs: [
          "Every agent has heard that professional photography helps homes sell. Fewer can explain exactly why — or put numbers behind it when a vendor asks whether it's worth the spend. The mechanics are worth understanding, because they change how you brief your photographer, how you order your gallery, and how you pitch marketing at the listing presentation.",
          "The short version: photography doesn't just make a home look nicer. It changes buyer behaviour at every stage of the funnel — from the first thumbnail on realestate.com.au to the number of groups walking through your Saturday open.",
        ],
      },
      {
        heading: "The first inspection happens on a phone",
        paragraphs: [
          "Around nine in ten Australian buyers begin their search online, and most of that browsing happens on a mobile screen during a commute, a lunch break, or the Saturday morning scroll. On realestate.com.au and Domain, your listing is competing inside an infinite feed of near-identical tiles: a hero image, a price guide, an address.",
          "Eye-tracking studies of portal search results consistently show the same pattern — buyers look at the photo first, dwell on it for a couple of seconds, and only read the text if the image earns it. If the hero shot is dark, tilted or taken on a phone, the buyer's thumb has already moved on. No amount of well-written copy recovers a scroll-past.",
          "That's why the hero image matters more than any other marketing decision in the campaign. It is, functionally, the first inspection — and most buyers hold it to the standard of every other beautiful image their feed has trained them to expect.",
        ],
      },
      {
        heading: "What the portal data actually shows",
        paragraphs: [
          "Portal and industry studies over the past decade point in the same direction. Listings with professional photography routinely attract roughly twice the views of comparable listings shot on a phone. Homes photographed professionally are consistently found to sell days — sometimes weeks — faster than the suburb average, and analyses in the US and Australia have associated professional imagery with sale premiums in the low single-digit percentages, which on a $900,000 Melbourne home is real money.",
          "Views compound into everything downstream. More views mean more saves and shortlists, which the portal algorithms reward with better placement in search results and email alerts. More shortlists mean more inspection bookings. More bodies at the open home means more competitive tension — and competitive tension is what moves price at auction.",
          "It also works in reverse. A listing that underperforms in its first week of views starts a campaign on the back foot: fewer email alert appearances, a staler feel by week three, and the creeping days-on-market count that buyers read as a signal something is wrong.",
        ],
      },
      {
        heading: "Why images change buyer psychology",
        paragraphs: [
          "Buyers don't purchase floor space; they purchase a future version of their life. Professional photography is engineered to trigger that projection. Balanced HDR exposures show the garden through the living room window — connecting inside to outside the way an inspection does. Wide, honest compositions communicate flow between rooms. Warm, corrected colour makes a space feel cared for, and buyers subconsciously price 'cared for' higher.",
          "Poor photography triggers the opposite response. Dark rooms read as small. Blown-out windows read as 'something to hide'. Clutter reads as a vendor who isn't serious. None of these judgements are conscious — which is exactly why they're so hard to argue a buyer out of later.",
        ],
      },
      {
        heading: "What 'professional' actually means",
        paragraphs: [
          "The gap between phone photos and professional photography isn't the camera — it's everything around it. When you're comparing photographers, these are the elements that actually move the needle:",
        ],
        list: [
          "HDR exposure blending, so windows show the view instead of white glare",
          "Deliberate composition height and angles that convey honest space without fisheye distortion",
          "Hand editing per image — clean whites, natural timber tones, believable skies and lawns",
          "A considered shoot order that produces a gallery with a narrative, not a pile of frames",
          "Consistent output across every listing, so your brand looks premium in every campaign",
          "Reliable 24-hour delivery, so the campaign never launches late",
        ],
      },
      {
        heading: "The bottom line for your next appraisal",
        paragraphs: [
          "For a few hundred dollars — a fraction of a percent of the sale price — professional photography changes the maths of the whole campaign: more views, better portal placement, fuller opens, shorter days on market and stronger competitive tension at the pointy end.",
          "It's also one of the easiest marketing lines to defend at a listing presentation. Show a vendor two search-result tiles side by side — one phone-shot, one professional — and ask which home they'd click on. The conversation usually ends there.",
        ],
      },
    ],
  },
  {
    slug: "real-estate-marketing-tips",
    title: "12 Real Estate Marketing Tips for Standout Campaigns",
    excerpt:
      "Twelve practical, field-tested marketing tips Australian agents can apply to their next campaign — portals, social, vendor reporting and more.",
    date: "2026-06-08",
    readTime: "5 min read",
    cover: IMG.apartmentStyled,
    coverAlt: "Styled inner-city apartment living room used in a marketing campaign",
    tags: ["Marketing", "Campaigns", "Social Media"],
    sections: [
      {
        paragraphs: [
          "Most listing campaigns in Australia look the same: a portal listing, a signboard, a Saturday open and a results email. The agents who consistently out-perform their suburb aren't spending dramatically more — they're being deliberate about a dozen small decisions the average campaign leaves to default. Here are twelve of them.",
          "A note before the list: none of these tips replace the fundamentals of pricing and buyer work. What they do is compound them. A well-priced home with deliberate marketing draws a deeper buyer pool, and a deeper buyer pool is what gives your negotiation — or your auctioneer — something to work with on the day.",
        ],
      },
      {
        heading: "Get the foundations right (tips 1–3)",
        paragraphs: [
          "1. Invest in media before anything else. Photography, floor plan and video are the assets every other channel reuses — the portal listing, the socials, the brochure, the email blast. A dollar spent here works in six places; a dollar spent boosting a bad photo works in none.",
          "2. Lead with your strongest image, not the front of the house. Buyers click on emotion. If the home's best moment is the entertainer's deck at dusk or the marble kitchen, make that the hero. The facade can be image three.",
          "3. Write the headline for the buyer's life, not the spec sheet. 'North-facing entertainer two streets from the village' out-performs '4 bed 2 bath 2 car' because the specs are already in the listing metadata. Use the headline for what data fields can't say.",
        ],
      },
      {
        heading: "Win the portals (tips 4–6)",
        paragraphs: [
          "4. Order your first six photos like a story. On realestate.com.au and Domain, most buyers never swipe past the first handful of images. Sequence them: hero exterior or twilight, living, kitchen, outdoor entertaining, master, bathroom. Save the laundry for the tail — or cut it.",
          "5. Always include a floor plan. Buyer surveys year after year rank floor plans among the most-wanted listing features, and portal data shows listings with plans hold attention longer. A plan also filters out mismatched buyers before they waste your Saturday.",
          "6. Refresh the listing mid-campaign. Swapping the hero image in week three — day shot to twilight, or exterior to interior — can re-trigger buyer attention and give tired listings a second wind in saved-search emails.",
        ],
      },
      {
        heading: "Make social work between listings (tips 7–9)",
        paragraphs: [
          "7. Cut a vertical reel for every listing. A 20–30 second 9:16 reel reaches local buyers the portals miss and — more importantly — puts your face in front of future vendors. Reels are as much a prospecting tool as a selling tool.",
          "8. Boost to the suburb, not the world. A modest paid boost targeted a few kilometres around the listing puts the home in front of the neighbours — and neighbours are the people most likely to know a buyer, or to be your next vendor.",
          "9. Post the result, not just the listing. 'Sold in 19 days, 4 bidders, $XX over reserve' is the single most persuasive content an agent can publish. Pair it with the campaign's best image and tag the suburb.",
        ],
      },
      {
        heading: "Turn every campaign into listing collateral (tips 10–12)",
        paragraphs: [
          "10. Screenshot your portal analytics weekly. Views, saves and enquiry counts make vendor reporting concrete — and the same screenshots, anonymised, become proof at your next listing presentation.",
          "11. Build a physical media kit. A printed before/after page, a sample floor plan and a QR code to a property film says 'this is how I market homes' better than any verbal pitch. Vendors choose the agent whose marketing they can see.",
          "12. Debrief every campaign in ten minutes. Which image drew the clicks? What did buyers ask at opens? Which channel produced the buyer? Three questions, logged in a note, compound into genuine local-market intelligence within a quarter.",
        ],
      },
      {
        heading: "A simple rhythm for every campaign",
        paragraphs: [
          "If twelve tips feel like a lot, run this sequence and you'll capture most of the value:",
        ],
        list: [
          "Book photography, floor plan and a reel before the campaign is signed off",
          "Sequence the first six portal images deliberately",
          "Publish the reel within 48 hours of launch and boost it to the suburb",
          "Screenshot portal stats every Monday for the vendor report",
          "Refresh the hero image if week-three views dip",
          "Post the sold result with the campaign's best image",
        ],
      },
      {
        heading: "Consistency beats cleverness",
        paragraphs: [
          "The uncomfortable truth about real estate marketing is that a merely good system executed on every listing beats a brilliant idea executed once. Vendors don't compare your best campaign to your competitors' best — they compare whatever is live under your name this week. Pick the tips above you can sustain across every listing, build them into your standard marketing schedule, and let the repetition do the compounding.",
        ],
      },
    ],
  },
  {
    slug: "the-importance-of-floor-plans",
    title: "The Importance of Floor Plans (Buyers' Most-Wanted Feature)",
    excerpt:
      "Floor plans consistently rank beside photos as the feature buyers want most. Here's why they work, and how they save agents wasted inspections.",
    date: "2026-05-25",
    readTime: "4 min read",
    cover: IMG.interiorStaged,
    coverAlt: "Open-plan staged interior illustrating how spaces connect on a floor plan",
    tags: ["Floor Plans", "Buyer Behaviour"],
    sections: [
      {
        paragraphs: [
          "Ask buyers what they want from a listing and the answer has been stable for a decade: photos first, floor plan second — often ahead of the written description and sometimes ahead of the price guide. Yet a surprising share of Australian listings still launch without one. That gap is an easy competitive edge for agents who close it.",
        ],
      },
      {
        heading: "What the research keeps finding",
        paragraphs: [
          "Consumer surveys run by the major portals and industry bodies repeatedly rank floor plans among the top two or three most-useful listing features. Portal behaviour data backs it up: buyers spend measurably longer on listings with plans, return to them more often, and are less likely to bounce straight back to search results.",
          "One frequently cited UK study found a meaningful share of buyers were less likely to enquire at all if a listing had no floor plan — and there's no reason to believe Australian buyers, raised on the same portals, behave differently. For a document that costs less than a tank of fuel, that's a lot of enquiry risk to leave on the table.",
          "The economics are hard to argue with. A professionally measured 2D plan typically costs between $130 and $200 for most homes — roughly the price of a single week of a minor print ad — and unlike an ad it works for the entire campaign, on every channel, for every buyer who ever opens the listing.",
        ],
      },
      {
        heading: "The questions photos can't answer",
        paragraphs: [
          "Photography sells emotion; a floor plan sells logic. Buyers make the shortlist with their heart and defend it to their partner with their head, and the plan is what the head reads. Photos — even great ones — can't reliably answer the questions that actually qualify a buyer:",
        ],
        list: [
          "How do the living areas connect, and can I see the kids from the kitchen?",
          "Is the fourth bedroom a real bedroom or a study with a wardrobe?",
          "How far is the master from the teenagers' rooms?",
          "Does the garage connect internally, and where does the laundry sit?",
          "Which way does the living zone face, and where does the afternoon sun land?",
          "Will our furniture — the big couch, the king bed — actually fit?",
        ],
      },
      {
        heading: "Plans reduce wasted inspections",
        paragraphs: [
          "Every agent has run an open where half the groups walked out within three minutes — the layout was wrong for them, and no photo had told them so. Those groups cost vendor goodwill, inflate your numbers without adding real buyers, and eat the Saturday you could spend with genuine prospects.",
          "A floor plan lets mismatched buyers disqualify themselves at home. The groups who do show up have already accepted the layout, which means questions at the open shift from 'where's the third bedroom?' to 'when's the auction?'. Pre-qualified traffic is worth more than raw traffic, and plans are the cheapest pre-qualification tool in the campaign.",
          "Plans matter even more for the buyers who can't attend at all. Interstate purchasers, expats and investors buying sight-unseen — a growing share of the market in many Melbourne suburbs — rely on the plan as their only spatial evidence. For those buyers, no plan doesn't mean 'I'll come and look'; it means the listing quietly drops off the shortlist.",
        ],
      },
      {
        heading: "What a good floor plan includes",
        paragraphs: [
          "Not all plans are equal. A plan that creates confidence rather than confusion should include:",
        ],
        list: [
          "On-site laser measurements — not estimates traced from council records",
          "Total internal area, plus external areas like garages, decks and balconies",
          "Room dimensions for bedrooms and living zones",
          "A north point, so buyers can judge orientation and light",
          "Clean, consistent drafting branded to your agency",
          "Portal-ready file formats delivered alongside the photography",
        ],
      },
      {
        heading: "The listing-presentation angle",
        paragraphs: [
          "Floor plans also win listings. Vendors compare marketing proposals side by side, and 'professional photography, drone, floor plan and video' reads like a campaign while 'photos' reads like a cost. Because plans are measured during the photo shoot, they add no extra vendor disruption — one visit, every asset.",
          "If you take one action from this article: make a floor plan non-negotiable in your standard marketing schedule, not an optional extra the vendor can strike out. The buyers have been telling us what they want for years. It's the second thing on the list.",
          "And for premium or off-the-plan campaigns, consider the 3D or furnished-plan upgrade — a rendered plan with furniture in place helps buyers judge scale instantly and gives the campaign one more asset that competitors' listings don't have.",
        ],
      },
    ],
  },
  {
    slug: "how-agents-can-win-more-listings",
    title: "How Agents Can Win More Listings",
    excerpt:
      "Listing presentations are won before you arrive. How marketing proof, vendor psychology and visible campaigns help agents win more appraisals.",
    date: "2026-05-11",
    readTime: "4 min read",
    cover: IMG.modernFacade,
    coverAlt: "Striking modern home facade of the kind featured in winning listing presentations",
    tags: ["Listing Presentations", "Vendor Psychology", "Marketing"],
    sections: [
      {
        paragraphs: [
          "Every listing presentation ends the same way: a vendor choosing between two or three agents who all quoted a similar range and a similar commission. What tips the decision is rarely the number — it's which agent the vendor believes will make their home look worth the number. That belief is built with evidence, and evidence is something you can manufacture deliberately, campaign after campaign.",
        ],
      },
      {
        heading: "Vendors buy the campaign, not the commission",
        paragraphs: [
          "Vendor psychology at an appraisal is simpler than it looks. They're anxious about underselling the biggest asset they own, and they're scanning for signals of competence. A confident price conversation matters, but vendors can't verify a price claim — what they can verify is the quality of your last ten campaigns, sitting right there on your Instagram and your recent portal listings.",
          "This is why cutting marketing to look cheaper usually backfires. A vendor who sees dark, phone-shot listings under your name quietly concludes their home will get the same treatment. The agent with consistently beautiful campaigns can charge for marketing and still win, because the vendor is buying reassurance, not photographs.",
        ],
      },
      {
        heading: "Show, don't tell: bring a media kit",
        paragraphs: [
          "Words at a kitchen table evaporate; artefacts stay behind. The most effective listing tool we see agents use is a simple printed media kit — a physical demonstration of what the vendor's campaign will look like:",
        ],
        list: [
          "A before/after spread: one phone photo next to one professional image of a similar room",
          "Two portal search tiles side by side — which one would you click?",
          "A sample branded floor plan from a recent campaign",
          "A QR code linking to a 60-second property film and a vertical reel",
          "One results page: days on market, groups at opens, buyer enquiries versus suburb average",
        ],
      },
      {
        heading: "Keep a digital twin of the kit",
        paragraphs: [
          "The printed kit wins the kitchen table; a digital version wins everything before and after it. Keep the same assets — before/after, sample plan, a two-minute showreel — on a single link you can text a vendor within minutes of the appraisal call. Vendors shortlist fast, often the same evening they decide to sell, and the agent whose proof arrives first frames how every later presentation is judged.",
        ],
      },
      {
        heading: "Your marketing prospects while you sleep",
        paragraphs: [
          "Most vendors decide on their shortlist of agents before they ever call one — from signboards they drive past, campaigns they watched as nosy neighbours, and reels the algorithm served them. In other words, every campaign you run is a listing presentation for the next three vendors in that street.",
          "That reframes the marketing spend. A twilight hero on this campaign isn't just selling this home; it's the image the neighbour at number 14 remembers when they're ready to sell in spring. Agents who treat each listing as a portfolio piece build a compounding pipeline that no letterbox drop can match.",
          "Sold results are the sharpest tool here. 'Sold in 16 days with 5 bidders' over the campaign's best photograph is proof of both marketing and outcome — post it every single time, and keep a gallery of them ready to scroll at the kitchen table.",
        ],
      },
      {
        heading: "Run the appraisal like a campaign preview",
        paragraphs: [
          "Structure the presentation around what the vendor will experience, week by week: professional shoot on day one, campaign live within 48 hours, portal stats emailed every Monday, open-home feedback the same afternoon. Specificity signals control, and control is what anxious vendors are buying.",
          "Then anchor the marketing conversation to the sale price, not the invoice. A complete media package on a $900,000 home is usually well under 0.2% of the price — while the studies on professional imagery point to faster sales and stronger buyer competition. Framed that way, the vendor who strikes out marketing is the one taking the risk.",
        ],
      },
      {
        heading: "After the signature: deliver visibly",
        paragraphs: [
          "Winning the listing is half the job; being rehired by the street is the other half. Send the vendor the gallery link the morning it arrives. Forward the portal stats without being asked. Text them when the reel goes live so they can share it with family. Visible effort is what turns one signature into referrals.",
          "None of this requires a bigger budget than your competitors — it requires consistency. Beautiful campaigns, documented results, and a presentation built on artefacts rather than adjectives. Do that for two quarters and the listings start coming to you.",
        ],
      },
    ],
  },
  {
    slug: "twilight-photography-explained",
    title: "Twilight Photography Explained",
    excerpt:
      "What twilight photography is, why dusk images stop scrolling buyers, and when a live twilight shoot beats a day-to-dusk conversion.",
    date: "2026-04-27",
    readTime: "4 min read",
    cover: IMG.luxuryExteriorDusk,
    coverAlt: "Luxury home exterior glowing warmly against a deep twilight sky",
    tags: ["Twilight", "Photography"],
    sections: [
      {
        paragraphs: [
          "Scroll any portal search-results page and the twilight shots find your eye before you've consciously looked. Deep blue sky, warm glowing windows, a home that looks like the best house on the street. That reaction is not an accident — it's the entire point of twilight photography, and it's why the format has become the signature of premium campaigns across Melbourne.",
        ],
      },
      {
        heading: "Why dusk images stop the scroll",
        paragraphs: [
          "On realestate.com.au and Domain, your hero image competes in a feed of near-identical daytime exteriors: blue sky, green lawn, grey render. A twilight image breaks the pattern. The colour palette is inverted — dark sky, warm light — and pattern interruption is what earns the two extra seconds of attention that become a click.",
          "There's an emotional layer too. Warm light in windows reads as occupied, safe and welcoming; buyers describe twilight images as feeling 'like coming home'. Daytime exteriors document a building. Twilight images sell an evening in your future life — dinner on, family home, lights glowing. That emotional head-start is measurable in click-through behaviour: dusk heroes consistently out-click daytime equivalents on the portals.",
        ],
      },
      {
        heading: "How a twilight shoot actually works",
        paragraphs: [
          "True twilight photography happens in a narrow window — roughly 20 to 30 minutes around dusk, often called the blue hour — when the fading ambient light balances the warm interior lighting. Too early and the windows look weak; too late and the sky goes black and flat.",
          "Preparation makes the window count. Every interior light goes on, including lamps and outdoor lighting. The photographer works fast through a planned shot list — facade, entertaining areas, pool if there is one — capturing multiple exposures that are later blended and finished by hand. A good session yields four to six hero frames, and that's the intent: quality over quantity, images built to lead a campaign rather than fill a gallery.",
          "Weather matters less than agents expect. A partly cloudy dusk often produces the most dramatic skies of all, and light drizzle can add reflections that flatter paved entertaining areas. Only genuinely poor conditions — heavy rain or a flat, featureless overcast — warrant a reschedule, and a good operator will make that call with you the day before rather than waste the vendor's preparation.",
        ],
      },
      {
        heading: "Live twilight vs day-to-dusk conversion",
        paragraphs: [
          "A day-to-dusk conversion is a professional edit that transforms a daytime exterior into a twilight image — sky replaced, windows lit, lighting rebalanced. Done well, it's remarkably convincing at portal size, and at a fraction of the cost of a live session it suits budget-conscious campaigns or homes where a dusk visit isn't practical.",
          "A live twilight shoot still wins where it matters most. Real reflections in the pool, genuine ambient glow on the facade, authentic depth in the sky — details that hold up in print spreads and on premium campaigns where buyers look closely. A useful rule of thumb: conversions for standard campaigns that need a stronger hero; live twilight for auctions, prestige homes and anything with significant outdoor entertaining.",
        ],
      },
      {
        heading: "Which properties benefit most",
        paragraphs: [
          "Twilight lifts almost any home, but the return is biggest when the property has features that dusk light amplifies:",
        ],
        list: [
          "Homes with pools, spas or landscaped entertaining areas",
          "Facades with strong architectural lines or feature lighting",
          "North- or west-facing homes that catch rich post-sunset skies",
          "Auction campaigns that need a premium, emotional hero image",
          "Homes where the street presence is the strongest selling feature",
          "Listings relaunching mid-campaign that need a fresh hero",
        ],
      },
      {
        heading: "The practical details for Melbourne agents",
        paragraphs: [
          "Because the window is short and moves with the season — dusk can land before 5:30pm in a Melbourne winter and after 8:30pm in January — twilight sessions are scheduled precisely, usually confirmed the day before based on the property's orientation and the forecast. Most agents pair the twilight session with the daytime shoot on the same day so the vendor prepares the home once.",
          "As an investment, twilight sits in the same conversation as a single line of print advertising — except it works for the entire campaign, on every channel, from the portal hero to the signboard to the auction brochure. For the listings where first impressions decide the buyer pool, it's the highest-leverage few hundred dollars in the budget.",
          "One last tip: brief the vendor the day before. Every interior and exterior light needs to work and be switched on, cars need to be off the driveway, and bins out of sight — the same preparation as the day shoot, plus globes. A twilight window is too short to spend ten minutes hunting for the switch to the alfresco lights.",
        ],
      },
    ],
  },
  {
    slug: "photography-mistakes-that-reduce-buyer-interest",
    title: "7 Photography Mistakes That Reduce Buyer Interest",
    excerpt:
      "Seven common listing photography mistakes that quietly cost views, clicks and inspections — and how Australian agents can avoid each one.",
    date: "2026-04-13",
    readTime: "4 min read",
    cover: IMG.livingBright,
    coverAlt: "Bright, correctly exposed living room — the standard listing photos should meet",
    tags: ["Photography", "Common Mistakes"],
    sections: [
      {
        paragraphs: [
          "Buyers rarely tell you why they scrolled past your listing. The portals don't flag it either — you just see softer view counts, quieter opens and a campaign that never quite catches. In our experience photographing thousands of Melbourne properties, the causes are usually one of seven avoidable mistakes.",
        ],
      },
      {
        heading: "1. Phone photos on a serious listing",
        paragraphs: [
          "The most expensive mistake is the one that saves a few hundred dollars. Phone cameras compress interiors, crush shadows and blow out every window — and buyers have been trained by thousands of professional listings to read those flaws, instantly and unconsciously, as 'low value'. On a median-priced home the photography spend is a rounding error against the sale price; the view-count difference is anything but.",
          "The signal it sends vendors is worse. Your current listing photos are your listing presentation for every neighbour watching the campaign.",
        ],
      },
      {
        heading: "2. Leading with the wrong hero image",
        paragraphs: [
          "The hero image decides your click-through rate, yet many listings default to a flat front-of-house shot even when the home's best feature is the kitchen, the outdoor room or the view. Choose the frame that makes a buyer feel something. If the facade is ordinary, lead with the interior moment and let the facade appear third or fourth — or invest in a twilight hero that makes even a modest facade glow.",
          "If you're unsure which frame should lead, test it: the portals let you reorder images mid-campaign, and a hero swap in week two costs nothing. Watching how views respond to a different lead image is the cheapest A/B test in real estate marketing.",
        ],
      },
      {
        heading: "3. Too many photos — or too few",
        paragraphs: [
          "A 45-image gallery buries the good frames and exhausts the buyer's attention before the master bedroom. A six-image gallery reads as 'something to hide'. Most homes present best in 15 to 25 deliberate images, sequenced like a walkthrough: hero, living, kitchen, dining, outdoor, master, remaining bedrooms, bathrooms. Cut the second angle of the laundry. Nobody ever booked an inspection off a laundry.",
        ],
      },
      {
        heading: "4. Clutter and personal items in frame",
        paragraphs: [
          "Bins in the driveway, cords behind the TV, fridge magnets, a bathroom bench full of products — every stray item pulls a buyer's eye away from the room and towards the current occupant's life. Buyers need to project their own life into the space, and clutter blocks the projection. A one-page vendor prep checklist sent a week before the shoot solves most of this for free, and a good photographer tidies the rest as they compose.",
          "For tenanted properties where preparation isn't realistic, virtual furniture removal and digital decluttering exist precisely for this problem — a per-image edit that clears the visual noise without asking a tenant to move their life. It costs less than a delayed campaign and dramatically less than a listing that launches looking tired.",
        ],
      },
      {
        heading: "5 & 6. Dark rooms and distorted angles",
        paragraphs: [
          "Underexposed rooms are the classic amateur tell: buyers read dark as small, and small as cheap. Professional HDR blending balances a bright window with a correctly exposed interior in the same frame — the window shows the garden, the room shows its true size, and nothing looks hidden.",
          "The opposite sin is the ultra-wide lens cranked until a three-metre room looks like a ballroom. Buyers aren't fooled twice: the inspection reveals the truth, and a buyer who feels misled at the open is a buyer lost — after they've wasted your Saturday and the vendor's goodwill. Honest wide angles win the inspection and survive it.",
        ],
      },
      {
        heading: "7. A gallery with no story",
        paragraphs: [
          "Random ordering — bathroom, exterior, bedroom two, kitchen — forces buyers to assemble the home in their head, and most won't bother. Sequence the gallery the way a great inspection flows: arrive, enter, live, entertain, retreat. Since most buyers only view the first handful of images on the portal apps, your first six frames should be able to sell the home on their own.",
          "Run this quick audit on your three most recent listings:",
        ],
        list: [
          "Would the hero image stop you mid-scroll in a feed of fifty listings?",
          "Do the first six images tell the home's story without any captions?",
          "Is every window showing a view rather than white glare?",
          "Is anything in frame that belongs to the vendor's life rather than the buyer's?",
          "Is the gallery 15–25 images, sequenced like a walkthrough?",
          "Do the wide shots reflect what a buyer will actually feel at the open?",
        ],
      },
    ],
  },
  {
    slug: "why-drone-photography-attracts-more-buyers",
    title: "Why Drone Photography Attracts More Buyers",
    excerpt:
      "Aerial photography answers the two questions buyers ask first — how big is the block and where exactly is it — and it changes portal performance.",
    date: "2026-03-30",
    readTime: "4 min read",
    cover: IMG.aerialHouses,
    coverAlt: "Aerial drone view over leafy Australian residential streets",
    tags: ["Drone", "Aerial Photography"],
    sections: [
      {
        paragraphs: [
          "Before a buyer asks about the kitchen, they ask two questions: how big is the block, and where exactly does it sit? Ground-level photography can't answer either. A single aerial frame answers both — which is why drone photography has moved from luxury extra to standard practice on land-rich and lifestyle listings across Australia.",
        ],
      },
      {
        heading: "Buyers purchase land and position, not just floor space",
        paragraphs: [
          "In most Australian suburbs the land is the majority of the value, yet the average listing dedicates twenty images to the interior and none to the block. An aerial establishes the property's footprint, orientation and boundaries in a way no written '650m² approx.' ever will — buyers see the backyard's real size, where the sun lands, and how much of the block the house actually occupies.",
          "Position is the second half of the story. Proximity to the park at the end of the street, the school two blocks over, the shopping strip, the bay — these are the lifestyle features that justify the price guide, and they're invisible from the front lawn. One well-composed aerial turns 'close to everything' from a cliché in the copy into a fact in the gallery.",
        ],
      },
      {
        heading: "What aerials answer that ground photos can't",
        paragraphs: [
          "The questions a good aerial set resolves before the first open:",
        ],
        list: [
          "True block size, shape and boundaries — at a glance",
          "Orientation: where north is, and where the sun lands through the day",
          "Distance to parks, schools, shops, transport and water",
          "What the neighbours' properties look like and how private the yard is",
          "Development context — subdivision potential, rear access, easements",
          "The street's character: leafy and established, or new and exposed",
        ],
      },
      {
        heading: "The portal performance angle",
        paragraphs: [
          "Variety in the first few images keeps buyers swiping, and an aerial dropped at position two or three is a proven pattern-breaker between interior frames. Listings marketed with aerial imagery consistently draw stronger engagement on the portals — industry analyses have repeatedly associated aerial media with materially higher enquiry rates on the listings where land and location drive the value.",
          "Aerials also feed the rest of the campaign: an elevated establishing shot opens the property film, a top-down block shot pairs beautifully with the floor plan and site plan, and drone frames make the most shareable social content in the set.",
          "There's a vendor-facing benefit too. Aerial imagery photographs the neighbourhood as much as the home, which makes it the easiest asset to defend in a marketing schedule — vendors immediately understand that no ground-level photo can show a buyer their quiet street, their tree canopy or their two-minute walk to the park.",
        ],
      },
      {
        heading: "Compliance: why licensed matters in Australia",
        paragraphs: [
          "Commercial drone work in Australia is regulated by CASA, and the rules have teeth — altitude limits, distance from people, controlled airspace around airports, and no-fly zones that cover more of metropolitan Melbourne than most people expect. A licensed operator carries the appropriate certification and public liability insurance, and checks airspace approvals for the suburb before every flight.",
          "For an agency, the compliance risk of an unlicensed flight — or an agent flying their own drone over a neighbour's yard — lands on the brand, not just the pilot. Using a licensed operator removes the risk entirely and usually produces dramatically better frames anyway: knowing where you can fly is half the craft.",
        ],
      },
      {
        heading: "When drone earns its fee — and when to skip it",
        paragraphs: [
          "Aerials add the most on: blocks over roughly 400m², corner sites, acreage, homes near water, parks or golf courses, pools and significant outdoor entertaining, and anything where subdivision or development potential is part of the pitch. On a mid-floor apartment with no outlook, spend the money on a twilight or an extra styled interior instead — good media budgets are allocated, not maximal.",
          "Timing is worth a thought as well. Aerials shot in the same session as the ground photography keep the light consistent across the gallery, and morning flights generally beat harsh midday sun. If the campaign includes video, brief the operator to capture both stills and a short orbit clip in the one flight — one approval, one session, two assets.",
          "As an add-on, aerial photography typically costs less than half a percent of the marketing budget's impact area — a small line item for the only images in the campaign that can show a buyer what they're really buying: the land, the position and the life around it.",
        ],
      },
    ],
  },
  {
    slug: "preparing-a-home-for-photography",
    title: "Preparing a Home for Photography: The Agent's Checklist",
    excerpt:
      "The complete room-by-room preparation checklist agents can send vendors before a shoot — because great photography starts before the camera arrives.",
    date: "2026-03-16",
    readTime: "5 min read",
    cover: IMG.livingNeutral,
    coverAlt: "Neutral, perfectly prepared living room ready for a listing shoot",
    tags: ["Preparation", "Checklists", "Vendors"],
    sections: [
      {
        paragraphs: [
          "The difference between a good gallery and a great one is usually decided before the photographer rings the doorbell. Editing can fix a grey sky; it can't remove a room full of clutter frame by frame without the budget ballooning. An hour of vendor preparation is the highest-return hour in the entire campaign — but only if the vendor knows exactly what to do.",
          "The fix is simple: send a one-page checklist a week before the shoot, and frame it the right way. Below is the list we wish every vendor received.",
        ],
      },
      {
        heading: "How to brief the vendor (psychology first)",
        paragraphs: [
          "Vendors don't resist preparation because they're lazy — they resist because 'declutter your home' sounds like a judgement about how they live. Reframe it as staging for a product photo: 'buyers need to imagine their own life in the rooms, so we temporarily remove yours'. That one sentence turns defensiveness into cooperation.",
          "Send the checklist seven days out, not the night before — decluttering takes a weekend, not an evening. And set the expectation that the photographer will make final micro-adjustments on the day, so the vendor doesn't need to achieve perfection, just readiness.",
          "It's also worth telling vendors why it matters in their language: listings compete on the portals within hours of launch, the first week of views decides how the algorithms treat the campaign, and preparation is the one input that costs nothing but effort. Vendors who understand the stakes almost always do the work.",
        ],
      },
      {
        heading: "Exterior and street appeal",
        paragraphs: [
          "The exterior supplies the hero image, and the hero image decides the click-through. Ask the vendor to:",
        ],
        list: [
          "Move all cars off the driveway and away from the front of the house",
          "Hide the bins — the classic Australian listing-photo fail",
          "Mow the lawn, edge the paths and sweep the driveway a day or two before",
          "Remove hoses, tools, toys and pet items from the yard",
          "Clean outdoor furniture and set it as if guests were coming",
          "Uncover the pool or spa, clean it, and skim the leaves",
          "Open exterior blinds and shutters so the house looks awake",
        ],
      },
      {
        heading: "Kitchen and living areas",
        paragraphs: [
          "These rooms carry the campaign — buyers rank kitchens and living zones as the images they study most. The goal is 'display home with a pulse': clean, open surfaces with one or two deliberate touches of life.",
        ],
        list: [
          "Clear benchtops completely, leaving at most a bowl of fruit or a coffee machine",
          "Remove fridge magnets, notes, calendars and kids' artwork from the fridge door",
          "Hide bins, dish racks, tea towels, sponges and paper towel",
          "Straighten couch cushions and throws; remove pet beds and toys",
          "Tuck away remotes, chargers, cords and gaming controllers",
          "Clear coffee tables down to one book or one small plant",
          "Turn every downlight, lamp and pendant on — replace any dead globes beforehand",
        ],
      },
      {
        heading: "Bedrooms and bathrooms",
        paragraphs: [
          "Bedrooms sell rest and bathrooms sell cleanliness — both are undone by the small personal items nobody notices in their own home.",
        ],
        list: [
          "Make beds hotel-style with the best linen in the house; iron or steam the covers",
          "Clear bedside tables to a lamp and a book; hide tissues, chargers and medications",
          "Remove clothes, shoes and washing baskets from view; close wardrobes fully",
          "Clear every bathroom bench and shower shelf of products — all of them",
          "Hang fresh matching towels; hide bath mats, toothbrushes and razors",
          "Put toilet lids down (the photographer will double-check, but start the habit)",
          "Remove kids' bath toys and pet litter trays",
        ],
      },
      {
        heading: "The morning of the shoot",
        paragraphs: [
          "A short final pass keeps the big work from being undone by breakfast:",
        ],
        list: [
          "Open all curtains and blinds fully to let natural light flood in",
          "Turn on every light in the house before the photographer arrives",
          "Run a final surface wipe over kitchen benches and bathroom mirrors",
          "Empty all bins and hide them",
          "Secure pets with a neighbour or in the car, and stow their bowls and beds",
          "Park cars up the street, not on the driveway or nature strip",
        ],
      },
      {
        heading: "What to leave to the photographer",
        paragraphs: [
          "Vendors don't need to style vignettes, replace furniture or fix a tired lawn — that's what professional composition and hand editing exist for. A good photographer will fine-tune cushions, straighten linen, adjust chairs and choose angles that flatter each room; the edit handles skies, lawns and window views.",
          "What no photographer can do is conjure clear benchtops out of a cluttered kitchen in a 90-minute shoot. Send the checklist, send it a week early, and frame it as staging rather than tidying. The gallery — and the campaign — will show the difference.",
        ],
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
