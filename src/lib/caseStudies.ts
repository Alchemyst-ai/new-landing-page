/**
 * Case studies: one industry per entry, each told through the context and
 * memory layer underneath the agents (voice or otherwise) that run on it.
 *
 * Single source of truth for /case-study and /case-study/[slug].
 *
 * Copy rules (same as useCases.ts): no em-dashes, no hype, no invented
 * customer metrics. Every figure here comes from a production deployment or
 * a scoped engagement.
 *
 * Section order is fixed: problem, solution, where it fits, why it works.
 * A heading of the form "Kicker: Title" renders the title only; the kicker
 * comes from SECTION_LABELS. Bullets of the form "Title: body" render as
 * titled rows when every bullet in the section has a title.
 */

export interface CaseStudy {
  slug: string;
  industry: string;
  shortLabel: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  tagline: string;
  tldr: string;
  heroMetric: string;
  heroMetricLabel: string;
  sections: {
    heading: string;
    body: string;
    bullets?: string[];
  }[];
}

export const SECTION_LABELS = ["The problem", "The context layer", "Where it fits", "Why it works"] as const;

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "healthcare",
    industry: "Healthcare & Hospitals",
    shortLabel: "Healthcare",
    metaTitle: "Context-Aware Voice AI for Hospitals | Patient Memory Across Every Call",
    metaDescription:
      "How a context and memory layer makes hospital Voice AI work: appointments, post-discharge recovery, lab reports, palliative care, chronic disease follow-up, community outreach, and patient feedback, with every call grounded in the patient's live HIMS record. Production-proven multilingual coverage.",
    h1: "Voice AI for Hospitals: Every Call Carries the Patient's Context.",
    tagline: "Augment, Don't Replace.",
    tldr: "Hospitals run on high-volume, repeatable patient communication: confirming appointments, checking on discharged patients, fielding 'are my results ready?' calls, supporting palliative caregivers, chasing chronic disease adherence, following up on community screening referrals, and collecting feedback. Each task competes for limited clinical and administrative bandwidth, and each one only works if the call knows who the patient is. The Alchemyst context layer gives every call the patient's live record and history. Kathan Voice OS, running on top of it, absorbs the repeatable load, escalates anything clinically meaningful to the right human in real time, and runs natively in Indian languages including Tamil, Kannada, Telugu, and Hindi.",
    heroMetric: "440K+",
    heroMetricLabel: "Patients Served / Year (BBH)",
    sections: [
      {
        heading: "The Problem: Communication Load Outstrips Clinical Bandwidth",
        body: "Indian hospitals carry a communication footprint that no manual operation can keep pace with. Front desks spend hours on confirmation calls and still miss patients. Discharged patients return to rural districts with no structured follow-up; complications go undetected until they become readmissions. Lab portals only reach digitally literate patients, leaving a large rural and elderly cohort dependent on inbound calls. Palliative caregivers go days without a check-in. Community screening camps generate hundreds of referrals that are never acted upon. Paper feedback forms and SMS surveys collect single-digit response rates, so the patient experience signal arrives too late, if at all. The patient's context already lives in the HIMS. Nothing carries it to the conversation, and nothing brings the conversation back.",
      },
      {
        heading: "The Solution: A Context Layer Wired Into HIMS",
        body: "The context layer sits underneath existing hospital workflows rather than around them, and Kathan Voice OS speaks from it. Each call carries a live, filtered context retrieved from the HIMS in under 200ms: language preference, treating doctor, campus, procedure, medication list, palliative or chronic disease enrolment, no-show or referral history. Critical responses route to the right human in real time, with that context attached. Emergency keywords transfer directly to the doctor on call. Caregiver crises route to the palliative nurse. Unacted critical referrals route to the Community Health coordinator. Routine data flows back to the HIMS longitudinal record without a human touching it, so the next call starts from what this one learned.",
        bullets: [
          "170ms P50 context retrieval, sub-1-second voice pickup, and 500,000+ calls daily campaign capacity.",
          "Write-back to the HIMS longitudinal record on every call, so the patient's history compounds instead of resetting.",
          "Three escalation modes: full automation, AI-first with human close, and AI-assist for clinically sensitive moments, each handing the full patient context to the clinician.",
          "Native multilingual coverage: Tamil, Kannada, Telugu, Hindi, Malayalam, English, and 7+ more Indian languages, synthesised natively, not dubbed.",
          "TRAI-compliant caller ID, time-window enforcement, and complete audit trails on every patient interaction.",
        ],
      },
      {
        heading: "Where It Fits in the Patient Journey",
        body: "Seven workflow gaps repeat across nearly every multi-specialty and mission hospital we have scoped. Each one is high-volume, repeatable, depends on knowing the patient, and is currently absorbed by clinical or administrative staff who would be better deployed elsewhere.",
        bullets: [
          "OPD Appointment Management: priority voice for high-risk no-show patients, WhatsApp for the rest, live reschedule against doctor availability, three-deep waitlist engine on cancellations.",
          "Post-Discharge Well-Being Check-Ins: 48-hour structured recovery assessment against the actual procedure and medication list, with severe pain or warning symptoms escalating directly to the treating physician.",
          "Test Report Ready Notifications: HIMS lab webhook triggers identity-verified outbound calls; routine results delivered as time-limited PDF, abnormal results auto-book a consultation.",
          "Palliative & Hospice Family Support: scheduled caregiver check-ins covering patient comfort, medication supply, and caregiver wellbeing, with critical flags routed to the palliative nurse on call.",
          "Chronic Disease & Dialysis Adherence: condition-matched outreach (post-dialysis the next day, fortnightly for hypertension and diabetes) with same-day care team alerts on missed sessions or out-of-range readings.",
          "Community Health Outreach Callbacks: post-camp follow-up in the patient's village language, repeating the referral by name, with unacted critical referrals routed to a coordinator.",
          "Patient Experience Feedback: 24 to 48 hour post-visit NPS calls with department-specific probes; detractors escalate to Patient Relations within four hours, promoters get a Google review nudge.",
        ],
      },
      {
        heading: "Why It Works for Healthcare Specifically",
        body: "Voice closes the channel gap that SMS and patient portals cannot. A meaningful share of any Indian hospital's patient base is rural, elderly, or low-literacy and never opens a portal link. A voice call in Kannada or Tamil reaches them on the first ring. The context layer is what makes that call worth answering: every call carries the actual procedure, medication, and treating doctor, so the agent references real specifics rather than a generic template, any concerning response reaches a named clinician within minutes rather than days, and every answer is written back so the next call, and the next clinician, picks up where this one left off. The result is a system that augments existing nursing and front desk teams instead of asking patients to adapt to a new channel.",
      },
    ],
  },
  {
    slug: "edtech",
    industry: "Education Technology",
    shortLabel: "EdTech",
    metaTitle: "Context-Aware Voice AI for EdTech | Memory Across Every Attempt",
    metaDescription:
      "How a persistent context layer powers multilingual EdTech outreach at scale: career guidance, parent-teacher follow-up, course enrollment, feedback, and re-engagement, with connection rates that outpace AI-outbound benchmarks because every call remembers the last.",
    h1: "Voice AI for EdTech: Multilingual Outbound That Remembers.",
    tagline: "Context, Not Cold Scripts.",
    tldr: "EdTech outbound calling in India hits a wall that generic dialers cannot solve. Students and parents expect conversations in their own language, and a single script does not work across career guidance, parent-teacher follow-up, enrollment, feedback, and re-engagement. Kathan Voice OS handles all of these natively across 12+ Indian languages on the Alchemyst context layer, which keeps a persistent memory of every lead. Retargeted cohorts consistently outperform cold outreach because context accumulates across attempts.",
    heroMetric: "38.7%",
    heroMetricLabel: "Aggregate Connection Rate",
    sections: [
      {
        heading: "The Problem: Multilingual Outbound at Scale Breaks Generic Dialers",
        body: "EdTech operations in India span career guidance for new prospects, parent-teacher follow-ups for existing students, enrollment for upcoming batches, feedback collection, and re-engagement of leads who went cold. Each motion has its own opening, tone, and decision logic, and most run across at least four languages. Traditional manual dialing requires a large, expensive team. Generic AI dialers achieve 20 to 25% connection rates and treat every retry like a cold call, so retargeted leads convert worse than fresh ones, the inverse of what should happen when the institute already has prior signal on the lead. The signal exists. Nothing carries it into the next call.",
      },
      {
        heading: "The Solution: Voice Agents That Carry Context Across Attempts",
        body: "Kathan does not work from a flat script. The context layer gives each call a live, filtered view of the lead's history, the campaign's objective, the language preference, and the prior interaction trail, and writes the outcome back when the call ends. A retargeted Gujarati parent receiving a third PTM follow-up call hears a conversation that references the prior objection, the specific student, and the upcoming event by name, in Gujarati from the first syllable. The agent calling a Telugu CA student about exam prep operates from a different context entirely.",
        bullets: [
          "Persistent context across attempts: retargeted leads are not called from zero, and connection compounds across waves.",
          "Per-campaign context scoping so career guidance, PTM, enrollment, feedback, and retargeting each follow their own conversational logic.",
          "Six to twelve languages handled natively per deployment, with regional phrasing rather than English scripts dubbed through TTS.",
          "TRAI-compliant caller ID, time-window enforcement, and complete audit trails.",
        ],
      },
      {
        heading: "Where It Fits in the Student Lifecycle",
        body: "Five workflow patterns repeat across coaching institutes, online platforms, and certification academies. Each one absorbs counsellor or admin bandwidth that should be focused on the high-intent conversations only humans can have.",
        bullets: [
          "Career Guidance Outreach: first-touch conversations with new prospects in their preferred language, qualifying interest before a counsellor ever joins.",
          "Parent-Teacher Follow-Ups: reminders and rescheduling for PTM events, with parent-language conversations that respect regional norms.",
          "Course Enrollment Drives: outbound calls during open windows that reference the specific course and prior interactions.",
          "Feedback & NPS Collection: post-batch and post-event feedback at multiples of email response rates.",
          "Lapsed-Lead Re-Engagement: retargeting waves that consistently outperform cold outreach because the agent already knows the lead's prior objection.",
        ],
      },
      {
        heading: "Why It Works for EdTech Specifically",
        body: "Education is a relationship business, and the relationship is rarely English-only. A Gujarati parent expects a Gujarati conversation, and the call is lost in the first ten seconds otherwise. The compounding effect of memory across attempts is also more visible in EdTech than almost any other vertical: by the third touch, a retargeted cohort can connect at 1.5x the cold-outreach rate because every prior interaction sharpens what the agent says next. The result is an outbound motion that actually scales without scaling the headcount behind it.",
      },
    ],
  },
  {
    slug: "agrotech",
    industry: "AgroTech & D2C Logistics",
    shortLabel: "AgroTech",
    metaTitle: "Context-Aware Voice AI for AgroTech & D2C | NDR Recovery & Post-Dispatch",
    metaDescription:
      "How a context and memory layer powers post-dispatch confirmation and NDR recovery for D2C and AgroTech operations across rural and tier-2/3 India, in Hindi, Telugu, Tamil, and more, with every retry carrying the prior failure reason.",
    h1: "Voice AI for AgroTech & D2C: Context-Aware Post-Dispatch and NDR Recovery.",
    tagline: "Recover Revenue Before It Becomes RTO.",
    tldr: "India's D2C logistics reality is unforgiving. A meaningful share of all shipments hit a delivery exception, and if the carrier cannot resolve it within its attempt window, the package converts to RTO and the seller absorbs the reverse-logistics cost on top of the lost sale. AgroTech compounds the problem with rural customers spread across Hindi, Telugu, and Tamil belts, narrow phone reachability windows, and seasonal cycles where a missed delivery can cancel the sale outright. Kathan Voice OS, running on the Alchemyst context layer, confirms every dispatch before the carrier knocks and recovers failed deliveries within hours of an exception, with each customer's order, address, and attempt history already in context.",
    heroMetric: "41.7%",
    heroMetricLabel: "Aggregate Connection Rate",
    sections: [
      {
        heading: "The Problem: Post-Purchase Operations Don't Scale on Old Infrastructure",
        body: "A majority of online orders in India are cash-on-delivery, and a meaningful share of all shipments hit at least one delivery exception. SMS and email leave read receipts, not reschedules. Staffing human BPO agents across three or four languages is operationally heavy and economically punishing. When NDR recovery does happen at all, second-attempt cohorts collapse: legacy outbound systems treat every retry like a cold call, so the harder-to-reach leads, by definition the ones already flagged, get the worst conversion. The system forgets everything it learned on the first attempt.",
      },
      {
        heading: "The Solution: Two Workflows, One Context Layer",
        body: "Kathan runs two complementary motions on the same context layer, so what one agent learns the other already knows. The post-dispatch confirmation agent calls every dispatched customer to verify address, availability, and preferred delivery window before the courier attempts delivery. The NDR recovery agent calls back within hours of a failed attempt, with the specific failure reason already in context (wrong address, unavailable, refused, unreachable) and the right remedy ready: correct the address, reschedule the slot, or convert COD to prepaid. A farmer flagged as unreachable on attempt one hears a different conversation than a farmer who refused delivery.",
        bullets: [
          "Per-customer state tracking so address corrections, language preferences, and prior attempts always reflect the latest truth.",
          "Sub-second context retrieval so real-time conversation never stalls on a lookup, even on flaky rural connections.",
          "Native Hindi, Telugu, Tamil, and 9+ Indian languages, with regional phrasing tuned for rural and tier-2/3 audiences.",
          "AI-to-human escalation for the small share of cases that need a live agent, with full transcript and context handoff.",
        ],
      },
      {
        heading: "Where It Fits in the Order Lifecycle",
        body: "Three workflow gaps drive the bulk of recoverable post-purchase loss. All three currently rely on SMS, email, or a thin BPO layer that does not scale across languages or attempt windows, and none of them remember the customer between attempts.",
        bullets: [
          "Pre-Delivery Confirmation: catch address errors and scheduling conflicts before the courier knocks, in the customer's language.",
          "NDR Recovery: within hours of a failed attempt, call with the specific failure reason in context and the right remedy ready.",
          "COD-to-Prepaid Conversion: where the customer is reachable and willing, convert on the call rather than risking RTO.",
        ],
      },
      {
        heading: "Why It Works for D2C and AgroTech Specifically",
        body: "Rural and tier-2/3 phone reachability is not the same problem as urban outreach. Connection windows are narrow and language-specific, and the customer is not going to navigate an English IVR to reschedule a delivery. The compounding effect of context across attempts is critical: NDR cohorts are harder leads by definition, so the only way to keep their connection rate in the same band as first-attempt outreach is for the agent to know the prior reason before the call connects. The result is a post-purchase operation where second and third touches no longer collapse, and a stubborn category of revenue loss becomes a recoverable line.",
      },
    ],
  },
  {
    slug: "bfsi",
    industry: "Banking, Financial Services & Insurance",
    shortLabel: "BFSI",
    metaTitle: "Context Layer for BFSI Voice AI | Memory for Collections, NPS, Cross-Sell, Fraud",
    metaDescription:
      "How a context and memory layer augments BFSI customer care: stateful collections, mortgage lifecycle engagement, voice NPS, ecosystem cross-sell, and proactive fraud communication, with persistent memory across calls.",
    h1: "Voice AI for BFSI: Memory Across Every Interaction.",
    tagline: "Stateless Automation Hits a Wall.",
    tldr: "Banks and insurers field tens of millions of voice and text requests every month. Existing automation handles most simple, single-turn queries. Anything that requires remembering what was said last time, what was promised, or what the customer is in the middle of, still routes to a human. The Alchemyst context layer slots underneath existing voice and text agents, so collections remember prior promise-to-pay, mortgage conversations carry document history, and fraud calls reach the customer with full transaction context within minutes of detection.",
    heroMetric: "5",
    heroMetricLabel: "Use Cases Per Engagement",
    sections: [
      {
        heading: "The Problem: Stateless Automation at Bank Scale",
        body: "Voice automation in BFSI today handles most easy traffic: balance checks, fraud confirmations, single-turn queries. It is overwhelmingly stateless. The mortgage book, the ecosystem breadth across auto, home, and lifestyle products, and the high monthly volume of fraud-related inbound calls all demand voice agents that remember who they are talking to, why they called last time, and what was said. Without that memory, every call starts from zero, every retarget feels like a cold call, and every detractor's complaint reaches the complaints desk after the service-recovery window has closed.",
      },
      {
        heading: "The Solution: Context Layer Beneath Existing Agents",
        body: "Most large banks and insurers already have a substantial in-house team building voice and text bots powered by domestic models. The right move is rarely to replace that investment. Alchemyst provides the context layer that makes existing voice agents remember. The domestic model is the brain, the bank's telephony is the pipe, and Alchemyst's Context Platform is the memory layer that carries intent, history, and business data across every interaction. The pilot entry point is the Context Platform API, which slots underneath existing agents, with full Kathan Voice OS deployment as the expansion play once the context layer proves its value.",
        bullets: [
          "Persistent context retrieval that survives across calls, channels, and weeks of customer history.",
          "CRM-bidirectional sync and AI-to-human escalation with full context handoff.",
          "Voice-based NPS at scale with structured qualitative capture, ingested as signal for trend analysis.",
          "Multilingual support including Russian, Arabic, English, Hindi, and 12+ regional languages.",
        ],
      },
      {
        heading: "Where It Fits Across the Bank",
        body: "Five workflows repeatedly come up when scoping BFSI voice deployments. Each one currently runs as either a stateless bot or a human-only motion, and each one gets meaningfully better when the agent carries memory.",
        bullets: [
          "Loan Collections & Follow-Up: context-aware retargeting that remembers prior payment promises and objections, lifting retarget connection rates and improving promise-to-pay continuity vs. stateless dialing.",
          "Mortgage Lifecycle Engagement: staged context per lifecycle moment (application, active, renewal) so document chase, payment reminders, and refinancing each draw on the right history.",
          "Customer Satisfaction & NPS: voice NPS that captures qualitative sentiment at multiples of email response rates, ingested as structured signal for trend analysis.",
          "Ecosystem Cross-Sell: scoped, per-product context so the agent pitches what the customer actually uses rather than a generic upsell.",
          "Proactive Fraud Communication: inverting the reactive flow by reaching customers with full transaction context within minutes of detection, deflecting a meaningful share of inbound fraud volume.",
        ],
      },
      {
        heading: "Why It Works for BFSI Specifically",
        body: "Banks live and die on continuity. A collections call that does not remember last week's promise-to-pay, a mortgage renewal that does not remember the document already submitted, a fraud confirmation that does not remember the transaction the customer disputed yesterday, all of these erode trust faster than anything else. The context layer sits below the voice and text channels and remembers all of it. Domestic models stay in place, telephony stays in place, regulators stay satisfied, and the customer hears a bank that finally remembers them.",
      },
    ],
  },
  {
    slug: "real-estate",
    industry: "Real Estate Services",
    shortLabel: "Real Estate",
    metaTitle: "Context AI for Real Estate | Unified Buyer Intelligence",
    metaDescription:
      "How a context layer connects home search, sales CRM, channel partner portals, community management, and flex workspace into a single buyer profile, enriching existing AI agents with cross-product signals at inference time.",
    h1: "Context AI for Real Estate: One Buyer Profile, Every Product.",
    tagline: "Unify the Stack. Enrich the Agents Already in Place.",
    tldr: "Full-stack real estate consultancies operate across home search portals, sales CRM, channel partner portals, community management, and flex workspace. Each platform holds a slice of the buyer journey, and none speak to the others. A buyer discovered on the search portal is re-onboarded in CRM, loses context at community handover, and is invisible to the workspace product. Lead-scoring agents see only the slice of data inside the product where they run. The context layer resolves identities across every product, enriches existing AI agents with cross-product signals at inference time, and unlocks workflows that are structurally impossible without a unified data fabric.",
    heroMetric: "7",
    heroMetricLabel: "Products Unified",
    sections: [
      {
        heading: "The Problem: Buyer Context Evaporates Between Systems",
        body: "A homebuyer who discovers a property on the search portal, signs an agreement tracked in CRM, and moves into a community managed elsewhere is treated as three separate records. If the same person books a desk at the flex workspace product, they become a fourth unknown entity. Lead-scoring agents see only the slice of data inside the product where they run, so a confirmed property owner with three months of sustained search behaviour and an active workspace footprint is scored as a generic mid-band lead instead of the high-intent buyer they actually are. Re-onboarding friction is high, cross-sell is accidental, and personalisation is zero across an industry where the customer lifecycle spans years.",
      },
      {
        heading: "The Solution: A Persistent Identity Fabric Across Every Product",
        body: "The context layer maintains a canonical identity record for each buyer, keyed on verified contact identifiers (phone, email, PAN where applicable) and enriched with behavioural signals from every connected platform. Each product pushes context updates to the shared layer via a lightweight sidecar integration. Existing databases stay untouched. Existing AI agents stay in place. A Context Router sits as an OpenAI-compatible proxy in front of any LLM-backed agent, intercepting inference requests and injecting filtered, token-efficient cross-product context before forwarding to the model. The agent code does not change; the context the agent sees does.",
        bullets: [
          "Cross-product identity resolution targeting >85% coverage of active buyers, with sub-5-minute context lag end to end.",
          "OpenAI-compatible Context Router so existing scoring and recommendation agents gain cross-product signals with zero code changes.",
          "Sidecar deployment with Push, Pull, and Route integration patterns per product. No incumbent system is replaced or migrated.",
          "Full audit trail and access control on every read and write, supporting verifiable AI for any sales or compliance review.",
        ],
      },
      {
        heading: "Where It Fits Across the Real Estate Stack",
        body: "Seven workflow patterns repeat across full-stack real estate consultancies operating residential, commercial, channel partner, community, and workspace lines. Each one currently runs on a single product's data perimeter, and each one becomes meaningfully sharper once the agent can see the rest of the journey.",
        bullets: [
          "Unified Homebuyer Identity: the same buyer recognised across home search, CRM, community management, and workspace, with no re-onboarding and full context on every touch.",
          "AI Lead Scoring Enrichment: existing scoring agents pick up sustained search history, ownership signals, channel partner pursuit status, and workspace footprint at inference time, lifting average scores by double-digit points.",
          "Channel Partner Intelligence: live inventory, micro-market trends, and community health surfaced inside the partner portal, replacing developer marketing material with verified data the partner cannot get anywhere else.",
          "Developer Command Center: real-time pipeline, lead quality, competitive launches, and post-handover community health unified in one view, so weekly developer reviews take minutes instead of days.",
          "Flex-to-Fixed Workspace Migration: usage patterns at the workspace product surface companies ready for managed office space, routed automatically to commercial advisory and to residential outreach for relocating employees.",
          "Resident Upgrade Pipeline: community residents recognised on the search portal, with co-pilot recommendations calibrated to actual equity position and verified maintenance history rather than generic listings.",
          "Investor Portfolio Intelligence: a queryable, real-time view across all units a sophisticated investor holds, with portfolio health alerts on occupancy, maintenance, and price deviation.",
        ],
      },
      {
        heading: "Why It Works for Real Estate Specifically",
        body: "Real estate is one of the longest customer lifecycles in any consumer-facing category: discovery to handover spans years, ownership spans decades, and the same individual flows through residential, commercial, and investment products at different life stages. The competitive advantage of a full-stack consultancy lies precisely in that breadth, but breadth without continuity is just a list of disconnected products. The context layer is the connective tissue: every resolved identity sharpens every downstream agent, every enriched agent interaction writes back signal that improves the next, and the data flywheel compounds non-linearly as more products plug in. Existing AI investments stay in place, and their effective capability multiplies.",
      },
    ],
  },
  {
    slug: "auto-retail",
    industry: "Automotive Retail",
    shortLabel: "Auto Retail",
    metaTitle: "Context-Aware Voice AI for Automobile Dealerships | Lifecycle Memory",
    metaDescription:
      "How a context layer connects DMS, service management, CRM, and insurance partner data into a single vehicle and owner profile, so every voice call covering free service reminders, AMC upsell, insurance renewal, test drive nurture, upgrade pipeline, and recall campaigns starts from what the dealership already knows.",
    h1: "Voice AI for Automobile Dealerships: Lifecycle Memory.",
    tagline: "Every Reminder, Every Renewal, Every Adviser Smarter Than the Last.",
    tldr: "Dealerships operate across four distinct data domains that rarely speak to one another: the DMS, the CRM, service management, and the insurance and warranty stack. Free service reminders go out as generic SMS blasts. Insurance renewals are lost to aggregators because nobody calls before expiry. Test drive walk-ins disappear into CRM notes that never get acted on. Loyal customers crossing the upgrade threshold are invisible. The context layer maintains a persistent profile per vehicle and owner across every system, and the voice agent makes every inbound and outbound call context-aware from the first second.",
    heroMetric: "6",
    heroMetricLabel: "Workflows Per Dealership",
    sections: [
      {
        heading: "The Problem: A Stranger at Every Touchpoint",
        body: "The DMS records the sale. The service platform tracks job cards. The CRM holds test drive notes. The insurance partner API completes the picture. Yet at every customer touchpoint the customer is treated as a stranger. Free services trigger generic SMS blasts with no booking pathway, advisers manually call lists each morning with no memory of who has already been reached, insurance details collected at delivery are filed and never actioned, and test drive objections live in CRM notes that nobody reopens. The competitive advantage a dealership holds over local garages and aggregators is continuity of relationship, and that advantage is structurally undermined by siloed systems.",
      },
      {
        heading: "The Solution: A Sidecar Context Layer with a Voice Frontend",
        body: "The context layer deploys as a sidecar to existing dealership infrastructure. Each system pushes context events to the API on key state changes, the context layer stores and links them, and a WebRTC voice agent extends the same memory to inbound and outbound calls. Repeat callers are recognised by number, the agent resumes from prior context rather than starting from scratch, and structured outputs such as booking confirmations, service summaries, and objection updates are written back to the relevant system automatically. Existing databases stay unchanged.",
        bullets: [
          "Persistent vehicle and owner profile spanning DMS, service management, CRM, and insurance partner data, keyed on VIN and customer UUID.",
          "Mileage-aware prediction so service reminders, AMC offers, and upgrade nudges fire at the moment the customer is most receptive.",
          "WebRTC and VoIP voice agent for 24/7 inbound booking and proactive outbound engagement, with PSTN bridge and WhatsApp support.",
          "Full audit trail per VIN and customer, supporting OEM dealer data standards and recall compliance documentation.",
        ],
      },
      {
        heading: "Where It Fits Across the Sales and Service Lifecycle",
        body: "Six workflow patterns repeat across dealerships across markets and brands. Each one is high-volume, high-frequency, and currently absorbed by adviser bandwidth that should be focused on the conversations only humans can have.",
        bullets: [
          "Free Service Reminder and Voice Booking: mileage-aware outbound calls at the right moment, with slots booked directly into the service platform and the next reminder auto-scheduled post-service.",
          "Paid Service and AMC Upsell: outreach two to three weeks before the next due window after free services exhaust, with personalised AMC quotes based on actual usage patterns established during the free period.",
          "Insurance Renewal: 30-day pre-expiry calls with model-specific premiums, NCB context where available, and partner API routing, recovering renewal revenue currently lost to comparison aggregators.",
          "Test Drive Lead Nurturing: follow-ups that reference the actual stated objection (price, colour, EMI, exchange valuation) instead of starting from scratch on every call.",
          "Loyal Customer Upgrade Pipeline: continuous scoring across vehicle age, mileage, service frequency, warranty expiry, and finance tenure, with outbound calls fired at the readiness threshold and full ownership context handed to the sales adviser on interest.",
          "Recall and Service Campaign Notification: VIN-matched outbound calls with explanation, slot booking, WhatsApp follow-up for non-responders, and full compliance audit trail per affected vehicle.",
        ],
      },
      {
        heading: "Why It Works for Dealerships Specifically",
        body: "A dealership's competitive moat over local garages and online aggregators is the quality and continuity of the customer relationship. That moat erodes every time a free service notification goes ignored, an insurance renewal is lost to a comparison site, or a loyal customer's upgrade window passes without a call. The context layer resolves the silo problem structurally without replacing anything that already works, and the voice frontend extends that memory to where most owners actually engage, which is the phone rather than a portal. Each connected system adds non-linear value because it retroactively enriches every existing vehicle record, and the flywheel compounds as the data deepens.",
      },
    ],
  },
  {
    slug: "hr-services",
    industry: "HR Services & Staffing",
    shortLabel: "HR Services",
    metaTitle: "Context-Aware Voice AI for HR Services | Persistent Memory at Workforce Scale",
    metaDescription:
      "How a context layer gives voice AI persistent memory across ATS, HRMS, LMS, and WFM: blue-collar inbound screening, high-volume RPO shortlisting, worker self-service, intelligent onboarding, account manager copilots, and flexi-workforce shift management.",
    h1: "Voice AI for HR Services: Persistent Memory at Workforce Scale.",
    tagline: "From First Inbound Call to 90-Day Onboarding, Without Losing Context.",
    tldr: "HR services companies running permanent recruitment, flexi and contract staffing, RPO, and HR outsourcing process tens of thousands of candidate interactions each month across desk-based and blue-collar roles. The data is plentiful; the problem is fragmentation. ATS, HRMS, LMS, payroll, and shift scheduling each hold an isolated slice of the candidate or worker record, with no persistent memory stitching them together across touchpoints. The context layer provides that memory, and voice extends it to the mobile-first, form-averse blue-collar segment where most volume actually lives.",
    heroMetric: "6",
    heroMetricLabel: "Workflows Across the Talent Lifecycle",
    sections: [
      {
        heading: "The Problem: High Volume, No Memory",
        body: "A large share of the blue-collar candidate pipeline (logistics associates, shopfloor workers, security personnel, hospitality staff) responds to job postings by calling a number. They do not fill forms, do not have email addresses, and do not engage with digital career portals. Inbound calls to recruiter mobiles are unstructured, unrecorded, and generate no persistent profile. Repeat callers are not recognised, and every call starts from zero. RPO mandates compound the problem at higher volumes. The ATS holds the resume pool but no cross-session memory, so duplicate screening of the same candidate happens routinely and recruiter time is distributed arbitrarily rather than concentrated on candidates most likely to convert.",
      },
      {
        heading: "The Solution: A Sidecar Context Layer with Multilingual Voice",
        body: "The context layer deploys as a sidecar to ATS, HRMS, LMS, WFM, and payroll. Each system pushes context events to the API on key state changes, and a WebRTC voice agent handles inbound screening, outbound shortlisting, worker self-service, onboarding follow-ups, and shift management with full continuity across sessions. Calls are conducted in the candidate's preferred language, with regional phrasing rather than dubbed English scripts. Structured outputs such as call summaries, candidate profiles, and shift confirmations are written back to the relevant system automatically.",
        bullets: [
          "Persistent candidate and worker UUID across ATS, HRMS, LMS, WFM, and payroll, with cross-session memory that survives weeks of intermittent contact.",
          "Account-level data isolation per client, with full audit trail per candidate, worker, and account for compliance and contractual review.",
          "Multilingual inbound screening at scale across English, Hindi, and regional languages, tuned for blue-collar audiences rather than desk workers.",
          "Voice-driven shift swap, overtime, and roster queries with hard eligibility rules (contract type, certifications, attendance) enforced before any swap completes.",
        ],
      },
      {
        heading: "Where It Fits Across the Talent Lifecycle",
        body: "Six workflow patterns repeat across permanent recruitment, flexi and contract staffing, RPO, and HR outsourcing engagements. Each one currently absorbs recruiter, account manager, or supervisor time that should be focused on the conversations and decisions only humans can make.",
        bullets: [
          "Blue-Collar Inbound Voice Screening: 24/7 multilingual inbound on every job posting number, with structured shortlists pushed to recruiter or client ATS instead of unmanaged drop-off.",
          "High-Volume RPO Shortlisting: cross-session ranking and outbound screening on top of the resume pool, with prior test scores and rejection reasons carried forward across attempts.",
          "Worker Self-Service: 24/7 voice and chat for payslip, attendance, PF/ESI, and leave queries, with personalised responses calibrated to each worker's contract and assignment.",
          "Intelligent Onboarding: cross-system orchestration spanning HRMS, client IT, payroll, LMS, and background verification, with proactive nudges to whichever party is blocking Day-1 readiness.",
          "Account Manager and HRBP Copilot: ranked attrition risk, quarterly review briefs, and individual drill-downs grounded in cross-system signals rather than four to eight hours of manual synthesis.",
          "Flexi Workforce Shift Management: voice-driven swap and overtime requests with eligibility checked automatically and updates written directly to the WFM system, removing the supervisor bottleneck on every transaction.",
        ],
      },
      {
        heading: "Why It Works for HR Services Specifically",
        body: "The competitive advantage of an HR services company is delivery quality at scale: faster shortlists, better-matched candidates, lower early attrition, and smoother account relationships. Each of those outcomes depends on context, and today that context is fragmented across systems with no persistent memory. The blue-collar and flexi segments where volume runs deepest are precisely the segments where forms and portals fail and voice succeeds. The context layer resolves the fragmentation without replacing a single incumbent, and the voice frontend covers the channel where most interactions actually happen. Each additional connected system adds non-linear value by retroactively enriching every prior candidate and worker record.",
      },
    ],
  },
];

export const CASE_STUDY_BY_SLUG: Record<string, CaseStudy> = Object.fromEntries(
  CASE_STUDIES.map((cs) => [cs.slug, cs]),
);

export const CASE_STUDIES_PATH = "/case-study";
export const caseStudyPath = (slug: string) => `${CASE_STUDIES_PATH}/${slug}`;

/** "The Problem: Stateless Automation" → "Stateless Automation". */
export function sectionTitle(heading: string): string {
  const i = heading.indexOf(": ");
  return i > 0 ? heading.slice(i + 2) : heading;
}

/** "Title: body" → { title, body }. Bullets without a short lead-in return title null. */
export function splitBullet(bullet: string): { title: string | null; body: string } {
  const i = bullet.indexOf(": ");
  if (i > 0 && i <= 60) return { title: bullet.slice(0, i), body: bullet.slice(i + 2) };
  return { title: null, body: bullet };
}
