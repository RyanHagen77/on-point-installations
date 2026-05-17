__Entity Optimization__

On Point Installations, Inc\.  |  onpointinstallations\.com  |  Wauconda, IL  |  Prompt 17 Results

*Source: Live Google, Wikidata, and Rich Results Test audit via Claude in Chrome  |  Audit date: April 24, 2026  |  IntegrePro Software LLC SEO Engagement*

__🔍  KEY FINDING__

Google has sufficient signals to generate a local Knowledge Panel for On Point Installations, Inc\. — confirmed live on April 24, 2026 — driven primarily by the claimed GBP, active social profiles \(Instagram, Facebook, LinkedIn\), and a growing citation footprint including GSA eLibrary, Yelp, and Wauconda Chamber of Commerce\. However, the business does not yet exist as a structured Wikidata entity, its schema markup contains a critical brand name error \("On Point Installation, Inc\." without the 's'\) propagated across all three schema types on the homepage, and three optional but high\-value LocalBusiness fields \(telephone, priceRange, address\) are missing from the structured data\. The entity is recognized at a basic local\-map level, not at the broader knowledge graph level that triggers a full, authoritative Knowledge Panel with description panel, services, and disambiguation confidence\.

__Highest\-Leverage Action: __A two\-part fix executed simultaneously: \(1\) correct the business name typo in all three JSON\-LD schema blocks on the homepage from "On Point Installation, Inc\." to "On Point Installations, Inc\." and add the missing telephone, address, and priceRange fields; and \(2\) create the Wikidata entity \(Q\-number\) and connect it to the GBP, website, and LinkedIn via sameAs — this combination gives Google a cross\-referenced, structured entity signal it currently lacks entirely\.

__SECTION 1 — Entity Audit Results__

__Check__

__Platform__

__Status__

__Finding__

__Action Required__

1

Google Knowledge Panel

⚠️ PARTIAL

Knowledge Panel EXISTS and is CLAIMED \(blue verified checkmark\)\. Displays: name "On Point Installations, Inc\.", 5\.0★ / 25 reviews, address 1220 Karl Ct Wauconda IL 60084, phone \(847\) 550\-4042, hours Mon–Fri 9AM–5PM, website link, active Google Posts, Instagram \+ Facebook \+ LinkedIn profiles\. MISSING: Wikipedia/Wikidata source link, founding year, owner attribution, explicit service categories panel, Twitter/X, YouTube\. Panel categorized as "Office refurbishment service" \(generic\)\.

Correct schema name typo site\-wide; create Wikidata entity; add Twitter/X and YouTube to GBP; update GBP primary category to "Commercial furniture store"; add founding date and owner bio to GBP\.

2

Wikidata

❌ MISSING

No Wikidata entity exists for On Point Installations, Inc\. Search of all 37 results for "On Point Installations" returned only unrelated art installations, patents, and military installations\. No Q\-number assigned\. Zero structured entity data in the global knowledge graph\.

Create Wikidata entity immediately following the step\-by\-step guide in Section 4\. This is the single most impactful missing entity signal\.

3

Schema Markup \(Rich Results Test\)

⚠️ PARTIAL

2 valid schema types detected on homepage: LocalBusiness \(1 valid item, 3 non\-critical issues\) and Organization \(1 valid item\)\. No schema detected on any other page\. Critical brand name error: all schema blocks use "On Point Installation, Inc\." \(missing 's'\)\. LocalBusiness missing telephone, priceRange, and address\. WebSite schema present but minimal \(missing SearchAction\)\. No Service, FAQPage, BreadcrumbList, Review/AggregateRating, or Person schema anywhere on the site\.

Fix name typo and deploy all 7 corrected schema types from Section 3\. Add Service schema to all service pages\. Add FAQPage schema to pages with FAQ content\.

4

Brand Consistency \(Quoted Search\)

⚠️ PARTIAL

10 results on page 1\. ISSUES: \(a\) Site title tags and schema use "On Point Installation, Inc\." without 's'; \(b\) About page title same error; \(c\) GSA eLibrary shows all\-lowercase "on point installations inc"; \(d\) Yelp shows 3\.7★ \(3 reviews\) vs\. GBP 5\.0★ \(25\) — reputation inconsistency; \(e\) onpointinstallers\.com \(unrelated company\) appears at result \#2 — brand confusion risk; \(f\) YouTube channel name is "OnPointInstallatios" \(missing 'n'\); \(g\) ZoomInfo appears with unverified data\. Social profiles confirmed: Instagram 890 followers, Facebook 1,300\+ followers, LinkedIn 830\+ followers\.

Fix site\-wide title tags and schema to correct legal name; update GSA eLibrary; drive more Yelp reviews; correct YouTube channel name; add YouTube to GBP and schema sameAs\.

__SECTION 2 — Schema Markup Audit Detail__

__Schema Type__

__Currently Implemented?__

__Pages It Appears On__

__Errors Found__

__Priority to Fix__

LocalBusiness

✅ YES \(partial\)

Homepage only

Name typo: "On Point Installation, Inc\." \(missing 's'\); Missing: telephone, priceRange, address, geo, openingHoursSpecification, foundingDate, founder, areaServed, aggregateRating, sameAs — all absent; @type uses generic "LocalBusiness" not specific subtype

🔴 CRITICAL — Fix immediately

Organization

✅ YES \(partial\)

Homepage only

Name typo same as above; sameAs array only has 3 URLs — missing 10\+ directory citations; missing contactPoint, logo dimensions, foundingDate, areaServed

🔴 HIGH — Fix this week

WebSite

✅ YES \(minimal\)

Homepage only

Name typo same as above; missing potentialAction \(SearchAction for Sitelinks Searchbox\); description is generic only

🟡 MEDIUM — Fix this month

WebPage

❌ NO

Nowhere on site

Completely absent from all pages tested

🟡 MEDIUM

Service

❌ NO

Nowhere on site

Completely absent — no structured service data exists

🔴 HIGH — Add to all service pages

FAQPage

❌ NO

Nowhere on site

No FAQ schema detected anywhere

🟡 MEDIUM — Add to service pages with FAQ content

BreadcrumbList

❌ NO

Nowhere on site

No breadcrumb schema — reduces sitelink eligibility

🟡 MEDIUM

Review / AggregateRating

❌ NO

Nowhere on site

5\.0★ / 25 reviews from GBP not surfaced in schema — missing aggregateRating entirely

🔴 HIGH — Add to LocalBusiness block

Person \(Brian Vetter\)

❌ NO

Nowhere on site

No structured founder/owner entity data

🟡 MEDIUM — Add to /about/ page

__SECTION 3 — Complete Schema Markup Code__

*All 7 schema blocks are ready to paste — copy each block into the appropriate page's <head> section in WordPress\. Use a plugin like Yoast SEO, RankMath, or Schema Pro, or add directly to the theme's header\.php\. Validate each block at search\.google\.com/test/rich\-results after deployment\.*

__SCHEMA 1 — LocalBusiness  |  Paste into homepage <head>  |  FIXES: name typo, adds telephone/address/priceRange/geo/hours/aggregateRating/areaServed/sameAs__

<script type="application/ld\+json">
\{
  "@context": "https://schema\.org",
  "@type": "ProfessionalService",
  "@id": "https://onpointinstallations\.com/\#business",
  "name": "On Point Installations, Inc\.",
  "alternateName": \["On Point Installations", "OPI"\],
  "url": "https://onpointinstallations\.com",
  "telephone": "\+18475504042",
  "priceRange": "$$",
  "address": \{
    "@type": "PostalAddress",
    "streetAddress": "1220 Karl Ct",
    "addressLocality": "Wauconda",
    "addressRegion": "IL",
    "postalCode": "60084",
    "addressCountry": "US"
  \},
  "geo": \{
    "@type": "GeoCoordinates",
    "latitude": 42\.2788618,
    "longitude": \-88\.1409177
  \},
  "openingHoursSpecification": \[\{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": \["Monday","Tuesday","Wednesday","Thursday","Friday"\],
    "opens": "09:00",
    "closes": "17:00"
  \}\],
  "description": "On Point Installations, Inc\. is a fully insured, non\-union commercial furniture installation company headquartered in Wauconda, IL\. Since 2010, we have delivered expert commercial furniture installation, cubicle installation, systems furniture installation, office furniture delivery and setup, and office relocation support throughout the Chicagoland metropolitan area and the Tri\-State region of Illinois, Wisconsin, and Indiana\.",
  "image": "https://onpointinstallations\.com/wp\-content/themes/onpoint\-installations/images/logo\.png",
  "logo": "https://onpointinstallations\.com/wp\-content/themes/onpoint\-installations/images/logo\.png",
  "founder": \{ "@type": "Person", "name": "Brian Vetter" \},
  "foundingDate": "2010",
  "numberOfEmployees": \{ "@type": "QuantitativeValue", "minValue": 10, "maxValue": 49 \},
  "areaServed": \[
    \{ "@type": "City", "name": "Chicago", "sameAs": "https://www\.wikidata\.org/wiki/Q1297" \},
    \{ "@type": "City", "name": "Schaumburg", "sameAs": "https://www\.wikidata\.org/wiki/Q1007793" \},
    \{ "@type": "City", "name": "Naperville", "sameAs": "https://www\.wikidata\.org/wiki/Q979697" \},
    \{ "@type": "City", "name": "Waukegan", "sameAs": "https://www\.wikidata\.org/wiki/Q980471" \},
    \{ "@type": "City", "name": "Wauconda", "sameAs": "https://www\.wikidata\.org/wiki/Q2629741" \},
    \{ "@type": "State", "name": "Illinois" \},
    \{ "@type": "State", "name": "Wisconsin" \},
    \{ "@type": "State", "name": "Indiana" \}
  \],
  "sameAs": \[
    "https://www\.facebook\.com/onpointinstallationsinc",
    "https://www\.instagram\.com/onpointinstallations/",
    "https://www\.linkedin\.com/company/on\-point\-installations\-inc/",
    "https://www\.yelp\.com/biz/on\-point\-installations\-wauconda",
    "https://birdeye\.com/on\-point\-installations\-inc\-149068928481786",
    "https://business\.waucondachamber\.org/list/member/on\-point\-installations\-inc",
    "https://www\.manta\.com/c/mh10kpr/on\-point\-installations\-inc",
    "https://www\.yellowpages\.com/wauconda\-il/mip/on\-point\-installations\-inc",
    "https://www\.merchantcircle\.com/on\-point\-installations\-inc\-wauconda\-il",
    "https://www\.superpages\.com/wauconda\-il/bpp/on\-point\-installations\-inc",
    "https://www\.industrynet\.com/co/on\-point\-installations",
    "https://www\.zoominfo\.com/c/on\-point\-installations\-inc"
  \],
  "aggregateRating": \{
    "@type": "AggregateRating",
    "ratingValue": "5\.0",
    "reviewCount": "25",
    "bestRating": "5",
    "worstRating": "1"
  \},
  "hasOfferCatalog": \{
    "@type": "OfferCatalog",
    "name": "Commercial Furniture Installation Services",
    "itemListElement": \[
      \{ "@type": "Offer", "itemOffered": \{ "@type": "Service", "name": "Commercial Furniture Installation" \} \},
      \{ "@type": "Offer", "itemOffered": \{ "@type": "Service", "name": "Cubicle Installation" \} \},
      \{ "@type": "Offer", "itemOffered": \{ "@type": "Service", "name": "Systems Furniture Installation" \} \},
      \{ "@type": "Offer", "itemOffered": \{ "@type": "Service", "name": "Office Furniture Delivery and Setup" \} \},
      \{ "@type": "Offer", "itemOffered": \{ "@type": "Service", "name": "Office Relocation Support" \} \},
      \{ "@type": "Offer", "itemOffered": \{ "@type": "Service", "name": "Commercial Space Planning" \} \}
    \]
  \}
\}
</script>

__SCHEMA 2 — Organization  |  Paste into homepage <head>  |  FIXES: name typo, adds contactPoint/logo/foundingDate/full sameAs array__

<script type="application/ld\+json">
\{
  "@context": "https://schema\.org",
  "@type": "Organization",
  "@id": "https://onpointinstallations\.com/\#organization",
  "name": "On Point Installations, Inc\.",
  "alternateName": "On Point Installations",
  "url": "https://onpointinstallations\.com",
  "logo": \{
    "@type": "ImageObject",
    "url": "https://onpointinstallations\.com/wp\-content/themes/onpoint\-installations/images/logo\.png",
    "width": 300,
    "height": 100
  \},
  "foundingDate": "2010",
  "founder": \{ "@type": "Person", "name": "Brian Vetter" \},
  "description": "On Point Installations, Inc\. provides fully insured, non\-union commercial furniture installation services throughout the Chicagoland metropolitan area and Tri\-State region \(Illinois, Wisconsin, Indiana\)\. Founded in 2010 by Brian Vetter\.",
  "contactPoint": \{
    "@type": "ContactPoint",
    "telephone": "\+18475504042",
    "contactType": "customer service",
    "areaServed": \["IL", "WI", "IN"\],
    "availableLanguage": "English"
  \},
  "address": \{
    "@type": "PostalAddress",
    "streetAddress": "1220 Karl Ct",
    "addressLocality": "Wauconda",
    "addressRegion": "IL",
    "postalCode": "60084",
    "addressCountry": "US"
  \},
  "sameAs": \[
    "https://www\.facebook\.com/onpointinstallationsinc",
    "https://www\.instagram\.com/onpointinstallations/",
    "https://www\.linkedin\.com/company/on\-point\-installations\-inc/",
    "https://www\.yelp\.com/biz/on\-point\-installations\-wauconda",
    "https://birdeye\.com/on\-point\-installations\-inc\-149068928481786",
    "https://business\.waucondachamber\.org/list/member/on\-point\-installations\-inc",
    "https://www\.manta\.com/c/mh10kpr/on\-point\-installations\-inc",
    "https://www\.yellowpages\.com/wauconda\-il/mip/on\-point\-installations\-inc",
    "https://www\.merchantcircle\.com/on\-point\-installations\-inc\-wauconda\-il",
    "https://www\.superpages\.com/wauconda\-il/bpp/on\-point\-installations\-inc",
    "https://www\.industrynet\.com/co/on\-point\-installations",
    "https://www\.zoominfo\.com/c/on\-point\-installations\-inc"
  \]
\}
</script>

__SCHEMA 3 — WebSite  |  Paste into homepage <head>  |  FIXES: name typo, adds SearchAction/potentialAction for Sitelinks Searchbox__

<script type="application/ld\+json">
\{
  "@context": "https://schema\.org",
  "@type": "WebSite",
  "@id": "https://onpointinstallations\.com/\#website",
  "name": "On Point Installations, Inc\.",
  "alternateName": "On Point Installations",
  "url": "https://onpointinstallations\.com",
  "description": "Commercial furniture installation services in Chicagoland and the Tri\-State region\. Serving Chicago, Schaumburg, Naperville, Waukegan, and Wauconda, IL\.",
  "publisher": \{ "@id": "https://onpointinstallations\.com/\#organization" \},
  "potentialAction": \{
    "@type": "SearchAction",
    "target": \{
      "@type": "EntryPoint",
      "urlTemplate": "https://onpointinstallations\.com/?s=\{search\_term\_string\}"
    \},
    "query\-input": "required name=search\_term\_string"
  \}
\}
</script>

__SCHEMA 4 — Service  |  Paste into /services/commercial\-office\-furniture\-installation\-chicago\-il/ <head>  |  NEW: structured service data for primary money page__

<script type="application/ld\+json">
\{
  "@context": "https://schema\.org",
  "@type": "Service",
  "@id": "https://onpointinstallations\.com/services/commercial\-office\-furniture\-installation\-chicago\-il/\#service",
  "name": "Commercial Office Furniture Installation in Chicago, IL",
  "serviceType": "Commercial Furniture Installation",
  "description": "Professional, fully insured commercial office furniture installation services throughout Chicago and Chicagoland\. Non\-union crews handle cubicle systems, panel systems, workstations, executive furniture, conference room furniture, and complete office setups\.",
  "provider": \{
    "@type": "ProfessionalService",
    "@id": "https://onpointinstallations\.com/\#business",
    "name": "On Point Installations, Inc\.",
    "telephone": "\+18475504042",
    "url": "https://onpointinstallations\.com"
  \},
  "areaServed": \[
    \{ "@type": "City", "name": "Chicago", "sameAs": "https://www\.wikidata\.org/wiki/Q1297" \},
    \{ "@type": "City", "name": "Schaumburg" \},
    \{ "@type": "City", "name": "Naperville" \},
    \{ "@type": "City", "name": "Waukegan" \},
    \{ "@type": "City", "name": "Wauconda" \}
  \],
  "offers": \{
    "@type": "Offer",
    "priceSpecification": \{ "@type": "PriceSpecification", "priceCurrency": "USD" \},
    "availability": "https://schema\.org/InStock",
    "url": "https://onpointinstallations\.com/services/commercial\-office\-furniture\-installation\-chicago\-il/"
  \}
\}
</script>

__SCHEMA 5 — FAQPage  |  Paste into any service page with FAQ content  |  NEW: 5 Q&A pairs with FAQ rich results eligibility__

<script type="application/ld\+json">
\{
  "@context": "https://schema\.org",
  "@type": "FAQPage",
  "mainEntity": \[
    \{
      "@type": "Question",
      "name": "What types of commercial furniture does On Point Installations install in Chicago?",
      "acceptedAnswer": \{ "@type": "Answer", "text": "On Point Installations, Inc\. installs cubicles and panel systems, systems furniture \(Herman Miller, Steelcase, Haworth, Knoll\), executive office furniture, conference room furniture, workstations, reception area furniture, training room furniture, and healthcare and hospitality furniture throughout Chicago and Chicagoland\. We handle both new installation and reconfiguration of existing systems\." \}
    \},
    \{
      "@type": "Question",
      "name": "Is On Point Installations a union or non\-union installation company?",
      "acceptedAnswer": \{ "@type": "Answer", "text": "On Point Installations, Inc\. is a fully insured, non\-union commercial furniture installation company\. This allows us to work flexibly across all commercial job sites in Chicago, the Chicagoland metropolitan area, and the Tri\-State region of Illinois, Wisconsin, and Indiana without union jurisdiction restrictions\." \}
    \},
    \{
      "@type": "Question",
      "name": "What areas does On Point Installations serve for commercial furniture installation?",
      "acceptedAnswer": \{ "@type": "Answer", "text": "On Point Installations, Inc\. serves the entire Chicagoland metropolitan area and the broader Tri\-State region\. Our primary service cities include Chicago, Schaumburg, Naperville, Waukegan, and Wauconda, Illinois\. We also serve commercial clients throughout Wisconsin and Indiana\. Headquarters: 1220 Karl Ct, Wauconda, IL 60084\." \}
    \},
    \{
      "@type": "Question",
      "name": "How long has On Point Installations been providing commercial furniture installation services?",
      "acceptedAnswer": \{ "@type": "Answer", "text": "On Point Installations, Inc\. was founded in 2010 by Brian Vetter, giving us over 15 years of experience in commercial furniture installation\. We have served corporations, healthcare facilities, retail stores, schools, and senior living communities throughout the Chicagoland area and Midwest\." \}
    \},
    \{
      "@type": "Question",
      "name": "Can On Point Installations help with office relocations and space planning in Chicago?",
      "acceptedAnswer": \{ "@type": "Answer", "text": "Yes\. On Point Installations, Inc\. provides full office relocation support and commercial space planning services throughout Chicago and Chicagoland\. Our relocation services include furniture decommissioning, transport coordination, floor plan layout, and complete reinstallation at the new location\." \}
    \}
  \]
\}
</script>

__SCHEMA 6 — BreadcrumbList  |  Paste into each service page <head> \(update URLs per page\)  |  NEW: enables breadcrumb rich results in SERPs__

<script type="application/ld\+json">
\{
  "@context": "https://schema\.org",
  "@type": "BreadcrumbList",
  "itemListElement": \[
    \{ "@type": "ListItem", "position": 1, "name": "Home", "item": "https://onpointinstallations\.com" \},
    \{ "@type": "ListItem", "position": 2, "name": "Services", "item": "https://onpointinstallations\.com/services/" \},
    \{ "@type": "ListItem", "position": 3, "name": "Commercial Office Furniture Installation — Chicago, IL", "item": "https://onpointinstallations\.com/services/commercial\-office\-furniture\-installation\-chicago\-il/" \}
  \]
\}
</script>

__SCHEMA 7 — Person \(Brian Vetter\)  |  Paste into /about/ page <head>  |  NEW: founder entity recognition__

<script type="application/ld\+json">
\{
  "@context": "https://schema\.org",
  "@type": "Person",
  "@id": "https://onpointinstallations\.com/about/\#brianvetter",
  "name": "Brian Vetter",
  "givenName": "Brian",
  "familyName": "Vetter",
  "jobTitle": "Founder and Owner",
  "description": "Brian Vetter founded On Point Installations, Inc\. in 2010 and has built it into a leading commercial furniture installation company serving the Chicagoland metropolitan area and Tri\-State region\. With over 15 years of experience in commercial interior services, Brian leads a team specializing in commercial furniture installation, cubicle systems, office relocation, and space planning\.",
  "worksFor": \{
    "@type": "ProfessionalService",
    "@id": "https://onpointinstallations\.com/\#business",
    "name": "On Point Installations, Inc\."
  \},
  "url": "https://onpointinstallations\.com/about/",
  "sameAs": \["https://www\.linkedin\.com/company/on\-point\-installations\-inc/"\]
\}
</script>

__SECTION 4 — Wikidata Entity Creation Guide__

*No Wikidata entity exists for On Point Installations, Inc\. Follow these steps exactly\. Creating the entity is the single missing structured data signal that separates a local\-panel business from a Knowledge Graph entity\.*

__Step\-by\-Step Instructions__

— Step 1 — Create a Wikidata account at wikidata\.org\. Use a professional username \(not the business name per Wikidata's COI guidelines\)\.

— Step 2 — Go to https://www\.wikidata\.org/wiki/Special:NewItem\. Label \(English\): On Point Installations, Inc\. | Description \(English\): commercial furniture installation company based in Wauconda, Illinois, United States | Aliases: On Point Installations, OPI

— Step 3 — Add all properties from the table below after the item is created\.

— Step 4 — Add the Wikidata Q\-URL to the website schema sameAs array once assigned \(e\.g\., "https://www\.wikidata\.org/wiki/QXXXXXXX"\)\. This creates a bidirectional entity signal\.

— Step 5 — Ensure the business name, address, phone, and website in Wikidata exactly match the GBP and website schema\. Google reconciles entity data through exact\-match cross\-referencing\.

— Step 6 \(optional\) — If the business qualifies for a Wikipedia stub \(GBP verified, GSA listed, Chamber member, 15\+ years old\), a Wikipedia article citing the Wikidata entity accelerates Knowledge Panel generation significantly\.

__Expected Timeline: __*Google typically reconciles a new Wikidata entity with an existing GBP within 30–90 days\. A Knowledge Panel enhancement showing the Wikipedia/Wikidata attribution source link may appear within 60–180 days of entity creation\.*

__Property__

__Property ID__

__Value to Enter__

instance of

P31

business \(Q4830453\)

country

P17

United States of America \(Q30\)

headquarters location

P159

Wauconda \(Q2629741\)

located in administrative territory

P131

Lake County, Illinois \(Q488390\)

coordinate location

P625

42\.2788618°N, 88\.1409177°W

inception

P571

2010

founder

P112

Create or link "Brian Vetter" as a Person entity

industry

P452

interior design \(Q14659\)

official website

P856

https://onpointinstallations\.com

phone number

P1329

\+1\-847\-550\-4042

Facebook ID

P2013

onpointinstallationsinc

Instagram username

P2003

onpointinstallations

LinkedIn company ID

P4264

on\-point\-installations\-inc

street address

P6375

1220 Karl Ct, Wauconda, IL 60084

postal code

P281

60084

number of employees

P1128

10–49 \(QuantitativeValue range\)

image

P18

Upload or link company logo image

described at URL

P973

https://onpointinstallations\.com/about/

__SECTION 5 — Knowledge Panel Gap Analysis__

*Current panel is a local business Knowledge Panel \(GBP\-driven\), not a full entity Knowledge Panel \(Wikidata/Wikipedia\-driven\)\. The target is the broader panel format that shows a description source link, services panel, and disambiguation confidence\.*

__Exact Sequence of Actions to Trigger a Full Knowledge Panel Within 90–180 Days__

— WEEKS 1–2: Fix brand name typo in all schema and site title tags\. Add missing LocalBusiness fields \(telephone, address, priceRange, aggregateRating\)\. Deploy all 7 schema types from Section 3\.

— WEEKS 2–4: Create the Wikidata entity and add all properties from Section 4\. Add Wikidata Q\-URL to website schema sameAs once the Q\-number is assigned\. Correct YouTube channel name typo\. Create Twitter/X account\.

— MONTHS 2–3: Drive 10\+ additional Google reviews to reach 35\+ total\. Ensure Yelp profile is actively managed\. Fix Manta address issue \(Prompt 14\)\. Submit GSA eLibrary name capitalization correction\.

— MONTHS 3–6: Monitor Knowledge Panel for expansion\. Use Google's "Claim this Knowledge Panel" feature for the entity panel \(separate from GBP claim\)\. Build 2–3 additional authoritative links \(local press mention, industry association listing, trade publication feature\)\.

__Entity Signal__

__Current Status__

__Strength \(1–5\)__

__Target Strength__

__Action to Close Gap__

Google Business Profile \(claimed, active\)

✅ Claimed, verified, 25 reviews, active posts

5

5

Maintain; add posts weekly

Schema Markup — LocalBusiness

⚠️ Present but wrong name, missing key fields

2

5

Deploy corrected Schema 1 from Section 3 this week

Schema Markup — Organization

⚠️ Present but incomplete sameAs, wrong name

2

5

Deploy corrected Schema 2 from Section 3 this week

Schema Markup — Service/FAQ/Breadcrumb/Person

❌ Completely absent

1

4

Deploy Schemas 4–7 from Section 3 within 30 days

Wikidata Entity

❌ Does not exist

1

5

Create entity per Section 4 — highest single missing signal

Wikipedia Article

❌ Does not exist

1

3

Research notability; create stub if eligible, or defer

Brand Name Consistency

⚠️ "Installation" vs\. "Installations" error site\-wide

2

5

Fix all title tags, schema, and meta descriptions this week

Social Profiles \(cross\-linked\)

⚠️ 3 confirmed, 2 missing \(Twitter/X, YouTube correctly named\)

3

5

Create Twitter/X; fix YouTube channel name; add to GBP

Citation/NAP Consistency

⚠️ Strong volume but name errors exist \(GSA, own site\)

3

5

Fix GSA entry; fix Manta address; audit all 14 directories

Authoritative Third\-Party Mentions

✅ GSA eLibrary, Chamber, IndustryNet, Yelp

4

5

Pursue 2–3 press/media mentions; trade publication features

aggregateRating in Schema

❌ Not implemented despite 25 GBP reviews

1

5

Add to LocalBusiness schema immediately — already in Schema 1

Wikidata sameAs Reference in Schema

❌ Cannot add until Wikidata entity exists

1

4

Create Wikidata entity then add Q\-URL to sameAs arrays

__SECTION 6 — Summary Table__

__ID__

__Page / Action__

__Est\. Current Position__

__Target Position__

__Time to Results__

__Priority__

Fix brand name typo in all schema \("Installation" → "Installations"\)

❌ Wrong name in all 3 schema blocks and site title tags

"On Point Installations, Inc\." consistent in all schema and title tags

2–4 weeks for Google to re\-crawl

🔴 DO THIS WEEK

Add missing LocalBusiness schema fields \(telephone, address, priceRange, aggregateRating, geo, openingHours, sameAs\)

❌ All absent

All fields populated per Schema 1 in Section 3

2–4 weeks

🔴 DO THIS WEEK

Deploy Service schema on all service pages

❌ Not implemented

Schema 4 on all service pages

4–8 weeks for ranking impact

🔴 DO THIS WEEK

Deploy FAQPage schema on service pages

❌ Not implemented

FAQ rich results eligible on Chicago and key city pages

4–12 weeks

🔴 DO THIS WEEK

Deploy BreadcrumbList schema site\-wide

❌ Not implemented

Breadcrumb rich results in SERPs

2–6 weeks

🔴 DO THIS WEEK

Deploy Person schema \(Brian Vetter\) on /about/ page

❌ Not implemented

Founder entity recognized in schema

4–8 weeks

🔴 DO THIS WEEK

Correct WebSite schema \(name typo \+ add SearchAction\)

⚠️ Present but wrong name, missing SearchAction

Correct name \+ Sitelinks Searchbox eligible

4–8 weeks

🔴 DO THIS WEEK

Create Wikidata entity for On Point Installations, Inc\.

❌ Does not exist

Q\-number assigned; all properties populated

30–90 days for Google reconciliation

🟡 DO THIS MONTH

Add Wikidata Q\-URL to schema sameAs on website

❌ Cannot do until Wikidata entity created

Bidirectional entity link established

After Wikidata creation

🟡 DO THIS MONTH

Fix GSA eLibrary name format \(all\-lowercase, no comma\)

⚠️ "on point installations inc" — not matching legal name

"On Point Installations, Inc\." exact legal name

30–60 days

🟡 DO THIS MONTH

Fix Manta address listing \(per Prompt 14\)

⚠️ Address error confirmed

Correct address: 1220 Karl Ct, Wauconda, IL 60084

30–60 days

🟡 DO THIS MONTH

Correct YouTube channel name \("OnPointInstallatios" → correct name\)

⚠️ Misspelled; not in GBP or schema sameAs

Correct name; added to GBP social links and all sameAs arrays

30 days

🟡 DO THIS MONTH

Create Twitter/X business account

❌ No account found

Active handle claimed

30–60 days

🟡 DO THIS MONTH

Update GBP primary category to "Office furniture store" or "Commercial furniture store"

⚠️ Currently "Office refurbishment service" \(generic\)

More specific, industry\-accurate primary category

2–4 weeks

🟡 DO THIS MONTH

Drive Yelp reviews to close gap \(3\.7★ / 3 reviews vs\. GBP 5\.0★ / 25\)

⚠️ Major reputation signal discrepancy

10\+ Yelp reviews at 4\.5★\+

60–120 days

🟡 DO THIS MONTH

Add founding year and owner name \(Brian Vetter\) to GBP business description

⚠️ Not currently visible in public GBP description

Founding date and owner name in GBP description field

1–2 weeks

🟡 DO THIS MONTH

Monitor Knowledge Panel for entity panel upgrade \(Wikidata\-driven\)

❌ Currently GBP\-only local panel

Full entity Knowledge Panel with Wikidata attribution

90–180 days post Wikidata creation

🟢 ONGOING

Build 2–3 authoritative press or trade publication mentions

❌ No media coverage found

2–3 earned mentions \(Crain's Chicago Business, BIFMA, Daily Herald\)

90–180 days

🟢 ONGOING

Expand citation profile to 25\+ consistent directories

⚠️ ~14 directories confirmed but several have errors

25\+ directories all showing exact legal name and correct address

90–180 days

🟢 ONGOING

Publish weekly Google Posts to keep GBP entity signals active

⚠️ Active but irregular

Weekly posts: project completions, service spotlights

Ongoing

🟢 ONGOING

Add Wikipedia article \(if notability threshold is met\)

❌ No Wikipedia article exists

Wikipedia stub published, linked to Wikidata entity

180\+ days

🟢 ONGOING

__ENTITY STRENGTH ASSESSMENT__

On Point Installations, Inc\. currently operates as a locally\-recognized but globally\-undefined entity in Google's Knowledge Graph\. The business has earned a legitimate, claimed local Knowledge Panel driven primarily by its verified GBP, active social presence on three platforms, and a solid 14\-directory citation footprint — meaningfully better than most small businesses at this stage\. However, the panel is fragile: it is GBP\-dependent, not Wikidata\-anchored, meaning Google is presenting it based on proximity and citation confidence rather than structured entity certainty\. The most urgent and damaging issue discovered in this audit is the brand name typo "On Point Installation, Inc\." \(missing the 's'\) embedded in all three schema blocks on the homepage, the site title tag, and the About page title — actively creating an entity split signal where Google indexes some data under the correct name and other data under a slightly different name, diluting the entity consolidation score across the entire citation profile\.

The realistic path to a full, authoritative Knowledge Panel runs through three sequential milestones: first, correct the schema name error and deploy the complete schema package from Section 3 \(this resolves the entity split and strengthens the structured signal Google is already reading\); second, create the Wikidata entity within the next 30 days and cross\-reference it bidirectionally through the website schema sameAs and GBP \(this is the single missing structured data signal that separates a local\-panel business from a Knowledge Graph entity\); third, drive 3–5 pieces of third\-party earned media — a Crain's Chicago Business mention, a BIFMA industry directory listing, or a trade publication case study — which provide the unstructured corroboration signals that push an entity from "recognized" to "authoritative" in Google's scoring model\. Given the domain age, existing citation volume, GSA government contractor status, and active GBP with 25 five\-star reviews, a full entity Knowledge Panel is achievable within 90–180 days of completing the above steps\.

The single action that will have the biggest impact on entity recognition within 90 days is fixing the brand name typo across all schema and title tags immediately, followed within the same week by deploying the complete LocalBusiness schema block from Section 3\. Google is already reading the site's structured data — it is simply reading a slightly wrong name and missing 80% of the available entity fields\. Correcting those two things transforms the homepage from a partial entity signal into a complete entity declaration, and Google's re\-crawl will register that upgrade within 2–4 weeks\.

