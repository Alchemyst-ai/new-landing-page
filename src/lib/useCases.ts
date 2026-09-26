/**
 * useCases.ts
 *
 * Single source of truth for /use-cases and /use-cases/[slug].
 *
 * Every use case is the same context layer in a different mixture of the same
 * five jobs. Each use case leads with one job (`job`), leans on three others
 * (`support`), and uses the fifth lightly. The fifth is derived, never stored.
 *
 * House rules apply to all copy here: no em-dashes, no hype, no invented
 * customer metrics.
 */

export type JobId = "persistent" | "current" | "traced" | "shared" | "scoped";

export interface Job {
  id: JobId;
  num: string;
  /** Display name, e.g. "Persistent memory". */
  name: string;
  /** One-line description shown on the index. */
  summary: string;
  /** Generic headline for the job, used when it leads a use case. */
  headline: string;
  /** The API surface or primitive that carries the job. */
  primitive: string;
}

export const JOBS: Job[] = [
  {
    id: "persistent",
    num: "01",
    name: "Persistent memory",
    summary: "Preferences and corrections survive the session, the handoff and the model swap.",
    headline: "What the user told you once stays told",
    primitive: "context.memory.add",
  },
  {
    id: "current",
    num: "02",
    name: "Current context",
    summary: "Superseded versions are subtracted before the model ever sees them.",
    headline: "Only the version in force reaches the window",
    primitive: "subtraction · versioned fileName",
  },
  {
    id: "traced",
    num: "03",
    name: "Traceable decisions",
    summary: "Every answer carries the exact context it was served, and why.",
    headline: "Every answer keeps its receipts",
    primitive: "context.traces",
  },
  {
    id: "shared",
    num: "04",
    name: "Shared context",
    summary: "What one agent learns, the next one already knows, on the same definitions.",
    headline: "One version of the business, however many agents read it",
    primitive: "groupName scopes · semantic consensus",
  },
  {
    id: "scoped",
    num: "05",
    name: "Scoped retrieval",
    summary: "Intersection, subtraction and ranking decide what enters the window, not similarity alone.",
    headline: "The nearest match stops winning",
    primitive: "context arithmetic",
  },
];

export const JOB_BY_ID: Record<JobId, Job> = Object.fromEntries(JOBS.map((j) => [j.id, j])) as Record<JobId, Job>;

export interface UseCase {
  slug: string;
  name: string;
  job: JobId;
  /** Short line for index and cross-link cards. */
  tagline: string;
  /** Hero H1. */
  title: string;
  /** Hero lead. */
  lead: string;
  /** SEO description. */
  description: string;
  breaks: {
    title: string;
    lead: string;
    items: { title: string; body: string }[];
  };
  dominant: { body: string; points: string[] };
  support: { job: JobId; title: string; body: string }[];
  sources: string[];
  sourcesLead: string;
  ingest: {
    source: string;
    fileName: string;
    groupName: string[];
    content: string;
    scope?: "internal" | "external";
  };
  write: { title: string; body: string; code: string };
  recall: { query: string; verb: string; groupName?: string[]; mode?: "fast" | "standard" };
  runs: { title: string; body: string };
  cta: { title: string; body: string; note?: string };

  /* Optional blocks. Most of these carry content from the previous
     getalchemystai.com use-case pages so nothing was lost in the redesign. */

  /** Feature grid ("What it does"). */
  capabilities?: { title: string; lead: string; items: { title: string; body: string }[] };
  /** Cost section, rendered with the shared token comparison. */
  efficiency?: { title: string; lead: string; points: string[] };
  /** Benchmark strip plus optional comparison table. */
  benchmarks?: {
    title: string;
    lead: string;
    stats: { value: string; label: string; note: string }[];
    comparison?: { columns: string[]; rows: string[][] };
  };
  /** Sub-scenarios inside the use case, each with a headline benefit. */
  scenarios?: { title: string; lead: string; items: { title: string; body: string; benefit: string }[] };
  faqs?: { q: string; a: string }[];
}

/** Average tokens per task, standard agent vs Alchemyst-enhanced (from the previous site). */
export const TOKEN_COMPARISON = {
  standard: { label: "Standard agent", tokens: 3, value: "3M tokens", note: "High token usage, short context window" },
  enhanced: { label: "Alchemyst-enhanced agent", tokens: 1.8, value: "1.8M tokens", note: "Shorter prompt optimized with Alchemyst" },
} as const;

const COST_OPTIMIZED: NonNullable<UseCase["efficiency"]> = {
  title: "Cost optimized. Out of the box.",
  lead: "Run agents with more power, at lower cost.",
  points: [
    "Does the heavy lifting of memory offloading by itself.",
    "Optimizes token expenditure with efficient prompts.",
    "Highly capable of handling longer tasks.",
  ],
};

/** Capability tiles from the previous homepage's "Use Cases" section. */
export const PLATFORM_TILES: { title: string; body: string; href?: string }[] = [
  {
    title: "Context-aware memory",
    body: "Agents that remember user preferences across sessions, enabling truly personalized automation.",
  },
  {
    title: "Real-time sync",
    body: "Your data is always up to date. Information syncs across teams and applications in real time.",
  },
  {
    title: "Customer support",
    body: "Add a human touch to your chatbots with memory, so they retain context.",
    href: "/use-cases/customer-support",
  },
  {
    title: "Integrated tooling",
    body: "Connect your existing stack through a single, powerful API layer.",
  },
  {
    title: "LLMs with memory",
    body: "Give large language models long-term memory for richer, continuous conversations.",
  },
  {
    title: "Agentic AI",
    body: "Build autonomous agents that reason, plan and execute complex tasks using context.",
  },
];

const DEFAULT_SOURCES_LEAD =
  "Bring sources in through the data-source integrations (PostgreSQL, MongoDB, Google Docs, Google Sheets, Amazon S3), an n8n workflow, or a direct context.add call. Each one lands scoped, so retrieval can intersect it with everything else.";

export const USE_CASES: UseCase[] = [
  /* ── 01 Persistent memory ─────────────────────────────────────────────── */
  {
    slug: "assistant-agents",
    name: "Assistant agents",
    job: "persistent",
    tagline: "Agents that pick up where they left off",
    title: "Assistants that pick up where they left off",
    lead: "A good human assistant never asks how you take your coffee twice. Most AI assistants ask every session, because what you told them lived in a context window that has since closed.",
    description:
      "Build AI assistants with persistent memory: preferences and corrections that survive the session, the device and the model swap, on the Alchemyst AI context layer.",
    breaks: {
      title: "Every session starts from zero",
      lead: "Not \"the model forgets.\" Three specific mechanisms, each of which you can find in your own transcripts this afternoon.",
      items: [
        {
          title: "Corrections do not stick",
          body: "The user said \"never book before 10am\" last Tuesday. The agent complied, and the session ended. Nothing wrote the rule down, so this Tuesday it books a 9am and the user corrects it again.",
        },
        {
          title: "The model swap resets the relationship",
          body: "You moved to a cheaper model. The preferences lived inside the old provider's built-in memory, so the switch quietly wiped months of accumulated context along with it.",
        },
        {
          title: "History is stuffed, not selected",
          body: "To compensate, the whole chat log goes into the prompt. Cost climbs, latency climbs, and the one line that mattered is buried under three hundred that did not.",
        },
      ],
    },
    dominant: {
      body: "Memory is written per user and per session with context.memory.add, and updated rather than duplicated. It lives in your context layer, not inside any one model, so it follows the user across sessions, devices and providers.",
      points: [
        "Preferences return on the first turn, not the fifth.",
        "Corrections overwrite, they do not pile up.",
        "Swapping models does not reset the user.",
      ],
    },
    support: [
      { job: "shared", title: "Every surface, one user", body: "The email assistant and the calendar assistant read the same memory, scoped to the same person." },
      { job: "scoped", title: "Only the relevant preference", body: "Travel preferences stay out of the expense report. Scopes decide what the window sees." },
      { job: "traced", title: "Why it did that", body: "When the assistant acts on a remembered preference, the trace shows which memory it used, and from when." },
    ],
    sources: ["Chat history", "Email", "Calendar", "Google Docs", "CRM notes", "Vercel AI SDK"],
    sourcesLead:
      "The assistant already sees the conversation. Write the durable parts back as memory, and pull the rest from where it already lives. The Vercel AI SDK middleware and LangChain integrations do the wiring for you.",
    ingest: {
      source: "google-docs",
      fileName: "travel-preferences.md",
      groupName: ["assistant", "user_4821"],
      content: "Travel: aisle seat, no red-eye flights, hotels within 1km of the meeting venue.",
    },
    write: {
      title: "Write what the user corrected",
      body: "The transcript is not the memory. The correction is. Write it once, against the user, and it is there next time.",
      code: `await client.v1.context.memory.add({
  sessionId: "user_4821",
  contents: [
    { role: "user", content: "Please never book anything before 10am." },
    { role: "assistant", content: "Understood. All bookings at 10am or later." },
  ],
  metadata: { groupName: ["assistant", "user_4821"] },
});`,
    },
    recall: { query: "Book a meeting with the Acme team next week", verb: "replying" },
    runs: {
      title: "A user's memory is their data, not your vendor's",
      body: "Preferences, habits and corrections are personal data under GDPR, the DPDP Act and CCPA. They need to be exportable and deletable on request, and they should not be locked inside a model provider's memory feature you cannot inspect.",
    },
    cta: {
      title: "Bring the assistant that keeps asking.",
      body: "Not the demo. The one whose users have stopped correcting it because they have given up.",
    },
  },
  {
    slug: "commerce-agents",
    name: "Commerce agents",
    job: "persistent",
    tagline: "Agents that remember what the customer actually responds to",
    title: "Commerce agents that remember what the customer actually buys",
    lead: "A good store clerk remembers the shopper who returns everything in medium. A shopping agent without memory recommends medium again, with confidence.",
    description:
      "Build shopping and commerce agents that remember sizes, returns and stated constraints across chat, email and checkout, on the Alchemyst AI context layer.",
    breaks: {
      title: "Every visit is a first visit",
      lead: "Personalisation usually fails in the same three places, and all of them are visible in your returns data.",
      items: [
        {
          title: "Returns never become preferences",
          body: "The customer returned two jackets because the sleeves ran short. The reason sits in the order system. The shopping agent never reads it, so the third recommendation has the same sleeves.",
        },
        {
          title: "Segments stand in for people",
          body: "Without per-shopper memory, the agent personalises from a segment. \"Women, 25 to 34, urban\" is not the person who said last week she is shopping for her father.",
        },
        {
          title: "Stated constraints expire with the chat",
          body: "\"Nothing with wool\" was said in chat on Monday. On Thursday the email agent sends a wool edit, because the constraint never left the conversation it was spoken in.",
        },
      ],
    },
    dominant: {
      body: "Each shopper gets a durable memory: sizes that fit, reasons for returns, stated constraints, the person they are buying for. It is written as the conversation happens and read before every recommendation.",
      points: [
        "Constraints persist across channels.",
        "Returns become signal, not noise.",
        "The shopper is a person, not a segment.",
      ],
    },
    support: [
      { job: "current", title: "The price and stock in force", body: "Last season's catalogue is subtracted, so the agent never recommends what you no longer sell." },
      { job: "shared", title: "Chat, email and checkout agree", body: "Every commerce surface reads the same shopper memory." },
      { job: "scoped", title: "The right products in the window", body: "Catalogue, size and constraint scopes are intersected before ranking, not after." },
    ],
    sources: ["Catalogue exports", "Order history (PostgreSQL)", "Return reasons", "Chat transcripts", "Reviews", "Amazon S3"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "catalogue",
      fileName: "sku-JK-2291.json",
      groupName: ["catalogue", "outerwear", "fw26"],
      content: "Field jacket JK-2291. Sleeve runs 2cm longer than standard. Sizes S to XL. In stock.",
    },
    write: {
      title: "Write the constraint, wherever it was said",
      body: "A constraint said once in chat should hold in email, in search and at checkout. Write it against the shopper the moment it is said.",
      code: `await client.v1.context.memory.add({
  sessionId: "shopper_77120",
  contents: [
    {
      role: "user",
      content: "I returned the last two because the sleeves were short. And nothing with wool.",
    },
    { role: "assistant", content: "Noted: longer sleeves, no wool." },
  ],
  metadata: { groupName: ["commerce", "shopper_77120"] },
});`,
    },
    recall: { query: "Suggest a winter jacket for me", verb: "recommending" },
    runs: {
      title: "Shopper memory is personal data first",
      body: "Purchase history, sizes and stated preferences are personal data in every market you sell into. Keep them scoped per shopper, exportable on request, and deletable when the customer asks, without rebuilding your recommendation stack.",
    },
    cta: {
      title: "Bring the recommendation that keeps missing.",
      body: "The one that suggested the thing the customer already returned.",
    },
  },
  {
    slug: "edtech",
    name: "EdTech & tutoring",
    job: "persistent",
    tagline: "Tutors that remember what the student already struggled with",
    title: "Tutors that remember where the student got stuck",
    lead: "A good teacher remembers that a student confuses mitosis and meiosis every time. An AI tutor without memory explains both from scratch, every session, the same way that did not work last time.",
    description:
      "Build AI tutors with persistent learner memory and syllabus-scoped answers: misconceptions, progress and explanations that carry across sessions, on Alchemyst AI.",
    breaks: {
      title: "Every lesson is the first lesson",
      lead: "Current AI education tools struggle with context retention and personalization. Tutors fail learners in patterns, and patterns are exactly what a stateless agent cannot see.",
      items: [
        {
          title: "No context from previous sessions",
          body: "New sessions start without the learner's preferences or history, so the tutor has no idea what happened last time.",
        },
        {
          title: "Too generalized teaching",
          body: "Without previous context, guidance stays generic, and generic guidance does not move a student forward.",
        },
        {
          title: "No learner-centric content",
          body: "Content does not keep up with each learner's pace or goals. The fast student is bored and the struggling one is lost.",
        },
        {
          title: "Misconceptions are not recorded",
          body: "The student got the same fractions question wrong three times, for the same reason. Each session saw one mistake. None of them saw the pattern.",
        },
        {
          title: "The syllabus is generic",
          body: "The tutor answers from the internet's version of the course, not the syllabus this teacher set, in the order they set it, with the terms they use.",
        },
        {
          title: "Explanations repeat",
          body: "The analogy that failed on Monday is offered again on Wednesday, because nothing recorded that it failed.",
        },
      ],
    },
    dominant: {
      body: "Each learner gets a durable memory of what they have mastered, where they stall and which explanations landed. It is written as they work and read before the next question.",
      points: [
        "Misconceptions accumulate into a picture.",
        "Explanations that failed are not repeated.",
        "Progress carries across sessions and subjects.",
      ],
    },
    support: [
      { job: "scoped", title: "This course, this unit", body: "The syllabus, the unit and the student's level are intersected, so answers come from the material actually being taught." },
      { job: "current", title: "This term's syllabus", body: "Last year's reading list is subtracted when the course is updated." },
      { job: "shared", title: "Tutor and teacher, one picture", body: "The teacher's dashboard agent reads the same learner memory as the tutor." },
    ],
    sources: ["Syllabus PDFs", "Lecture notes", "Google Docs", "Assignment feedback", "Quiz results (Google Sheets)", "Tutor chats"],
    sourcesLead:
      "Integration is two lines: install the SDK and add context. Alchemyst works with a large repertoire of compatible tools, brings sources in through the data-source integrations or n8n, and gives you observability at runtime through Context Traces.",
    ingest: {
      source: "syllabus",
      fileName: "bio-101-unit-4.pdf",
      groupName: ["bio_101", "unit_4"],
      content: "Unit 4: Cell division. Mitosis produces two identical diploid cells. Meiosis produces four haploid gametes.",
    },
    write: {
      title: "Write the misconception, not the chat",
      body: "What matters for next time is not the whole exchange. It is what the student believed, and what finally corrected it.",
      code: `await client.v1.context.memory.add({
  sessionId: "student_3317",
  contents: [
    { role: "user", content: "Wait, so meiosis is the one that makes identical cells?" },
    {
      role: "assistant",
      content: "Close, but that is mitosis. Meiosis makes four different cells with half the chromosomes.",
    },
  ],
  metadata: { groupName: ["bio_101", "student_3317"] },
});`,
    },
    recall: { query: "Explain why meiosis matters for genetic variation", verb: "explaining" },
    runs: {
      title: "Learner records carry obligations",
      body: "Student data is often the data of minors, and it is regulated in most jurisdictions. Keep learner memory scoped per student and per institution, and deletable at the end of enrolment.",
    },
    cta: {
      title: "Bring the tutor that explains it the same way twice.",
      body: "The one whose students keep asking the question it already answered.",
    },
    capabilities: {
      title: "Intelligent education features",
      lead: "With memory, AI tutors can track progress, understand learning patterns and personalize over time.",
      items: [
        { title: "Personalized learning at scale", body: "Retains student goals, past performance and pace, and suggests content that actually fits." },
        { title: "Real-time learner context sync", body: "Keeps up with grading, attendance and quiz scores, reducing manual syncing and admin overhead." },
        { title: "Adaptive tutoring agents", body: "Agents adjust tone, difficulty and pace, tuned to each learner's trajectory." },
        { title: "Secure, governed memory", body: "Role-based access and context-aware retrieval keep classrooms safe and edtech systems governed." },
      ],
    },
    efficiency: COST_OPTIMIZED,
  },
  {
    slug: "gaming",
    name: "Games & companions",
    job: "persistent",
    tagline: "Characters that remember the player between sessions",
    title: "Characters that remember the player",
    lead: "A character that forgets you betrayed it last night is a vending machine with dialogue. Players notice within one session.",
    description:
      "Build game characters and AI companions with persistent per-player memory and canon-scoped lore, on the Alchemyst AI context layer.",
    breaks: {
      title: "The world forgets on logout",
      lead: "Generative dialogue makes characters sound alive. Memory is what makes them feel alive, and it is usually the missing half.",
      items: [
        {
          title: "Choices do not carry",
          body: "The player spared the smuggler in chapter two. In chapter four the smuggler greets them as a stranger, because the choice lived in a save flag nobody wrote into the character's context.",
        },
        {
          title: "Lore drifts",
          body: "Writers updated the faction history in the bible. The dialogue agent still answers from the old draft, and the community wiki notices before the studio does.",
        },
        {
          title: "Every player gets the same character",
          body: "Without per-player memory, a companion cannot grow a relationship. It can only replay a script with more expensive text.",
        },
      ],
    },
    dominant: {
      body: "Each player has a durable memory per character: what they did, what they said, what the character thinks of them. It is written as it happens and read at the start of every conversation.",
      points: [
        "Choices shape later dialogue.",
        "Relationships persist across sessions.",
        "Memory is per player, per character.",
      ],
    },
    support: [
      { job: "current", title: "The canon in force", body: "Superseded lore drafts are subtracted, so characters speak from the current bible." },
      { job: "scoped", title: "What this character would know", body: "Retrieval is scoped to the character's faction and location, so the blacksmith does not know the king's secrets." },
      { job: "shared", title: "The party remembers together", body: "In multiplayer, a shared event is written once and read by every character who witnessed it." },
    ],
    sources: ["Lore bible (Google Docs)", "Quest scripts", "Player events", "Dialogue logs", "Game telemetry", "Discord"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "lore-bible",
      fileName: "factions-harbor-guild-v3.md",
      groupName: ["lore", "harbor_guild"],
      content: "The Harbor Guild controls the eastern docks. Its leader, Mara Venn, distrusts anyone carrying a Crown seal.",
    },
    write: {
      title: "Write what the player did",
      body: "The relationship is built from moments. Write each one against the player and the character, and the next conversation starts from where they left it.",
      code: `await client.v1.context.memory.add({
  sessionId: "player_90412:mara_venn",
  contents: [
    { role: "user", content: "I'll keep your secret. I never saw the ledger." },
    { role: "assistant", content: "Then you have a friend on the docks. Do not make me regret it." },
  ],
  metadata: { groupName: ["lore", "harbor_guild", "player_90412"] },
});`,
    },
    recall: {
      query: "Player returns to the docks after siding with the Crown",
      verb: "the character speaks",
      mode: "fast",
    },
    runs: {
      title: "Latency is the budget",
      body: "Dialogue has to land inside a budget players will not forgive. Use fast search mode for in-conversation lookups, keep scopes tight, and keep per-player memory deletable when an account is closed.",
    },
    cta: {
      title: "Bring the character players say feels hollow.",
      body: "The one that forgot what happened an hour ago.",
    },
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    job: "persistent",
    tagline: "Care agents that remember the patient between visits",
    title: "Care agents that remember the patient between visits",
    lead: "Enhance patient care with memory-powered AI that understands context, history and individual needs. Without memory, every conversation asks the patient to start again from the intake form.",
    description:
      "Build healthcare agents with persistent patient context: history, medications, preferences and care-plan progress across sessions, scoped per patient and care team, on Alchemyst AI.",
    breaks: {
      title: "Every visit starts from the intake form",
      lead: "Current AI healthcare solutions struggle with context retention and personalization, leading to poor patient experiences. Patients feel it first.",
      items: [
        {
          title: "Very generic suggestions",
          body: "Agents cannot retain the context of previous conversations, so what they suggest is generic, and generic suggestions are not a reliable basis for a care plan.",
        },
        {
          title: "No connection for patients",
          body: "Patients have to give their details again for every query. The agent never feels like it knows them.",
        },
        {
          title: "No progress retention",
          body: "Sessions are not stored, so past conversations and the progress made in them are lost between visits.",
        },
      ],
    },
    dominant: {
      body: "Each patient has a durable memory of history, medications, preferences and where they are in their care plan. It is written as conversations happen and read before the next one, so the patient never has to repeat themselves.",
      points: [
        "Patients do not repeat their history.",
        "Progress carries from visit to visit.",
        "The next step in the plan is remembered.",
      ],
    },
    support: [
      { job: "current", title: "The medication list in force", body: "Discontinued medications and superseded plans are subtracted before the agent answers." },
      { job: "scoped", title: "This patient, this care team", body: "Patient and care-team scopes are intersected, so an agent only sees what it is entitled to see." },
      { job: "traced", title: "Where the answer came from", body: "Every answer carries the notes and guidelines it drew on, for a clinician to verify." },
    ],
    sources: ["Clinical guidelines (PDF)", "Care pathways", "Visit summaries", "Medication lists", "Patient messages", "Scheduling"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "care-guidelines",
      fileName: "post-op-knee-recovery.md",
      groupName: ["clinic", "ortho", "guidelines"],
      content: "Post-operative knee recovery: weight-bearing as tolerated from day 2. Physiotherapy three times a week for six weeks.",
    },
    write: {
      title: "Write where the patient is in their plan",
      body: "The next conversation needs to know what happened in the last one. Write progress against the patient, not into a transcript nobody reads.",
      code: `// De-identified reference, never a name or record number.
await client.v1.context.memory.add({
  sessionId: "patient_ref_20931",
  contents: [{
    role: "assistant",
    content: "Week 3 of physiotherapy. Reported pain 3/10, down from 6/10. Next review due in two weeks.",
  }],
  metadata: { groupName: ["clinic", "ortho", "patient_ref_20931"] },
});`,
    },
    recall: { query: "Patient asks whether they can start cycling again", verb: "responding", groupName: ["clinic", "ortho"] },
    runs: {
      title: "Patient data needs an agreement before it needs a feature",
      body: "Support for Protected Health Information is on our roadmap. Until a Business Associate Agreement is in place, do not send PHI to Alchemyst: start with guidelines, care pathways and de-identified data, and talk to us about dedicated or self-hosted deployment.",
    },
    cta: {
      title: "Bring the conversation that starts from zero.",
      body: "The one where the patient had to explain their history again.",
    },
    capabilities: {
      title: "Intelligent healthcare features",
      lead: "Transform patient care with memory-powered AI that understands each patient's unique journey.",
      items: [
        { title: "Full context awareness of the patient", body: "Retains history, medications and preferences across all sessions." },
        { title: "Patient-tailored suggestions, at scale", body: "Suggestions are custom-suited to the patient in front of it, not the average patient." },
        { title: "Remembers each patient's quirks", body: "Tracks past conversations, so answers stay consistent with each patient's earlier questions." },
        { title: "Plans ahead", body: "Remembers what is next in line in the patient's treatment." },
      ],
    },
    efficiency: COST_OPTIMIZED,
  },

  /* ── 02 Current context ───────────────────────────────────────────────── */
  {
    slug: "employee-support",
    name: "Employee support",
    job: "current",
    tagline: "Agents that answer from the policy in force today",
    title: "Agents that answer from the policy in force today",
    lead: "The HR agent confidently quotes the parental leave policy. It is the one from 2024. The current one is in the same drive, one folder over, with a very similar title.",
    description:
      "Build HR and IT helpdesk agents that answer from the policy in force today, for the employee's region, with superseded versions subtracted, on Alchemyst AI.",
    breaks: {
      title: "Three versions of every policy",
      lead: "Internal knowledge bases do not fail because the answer is missing. They fail because four answers are present and only one is true.",
      items: [
        {
          title: "Old and new look identical to search",
          body: "The superseded policy and the current one share ninety per cent of their words. Similarity cannot tell them apart, so the agent returns whichever chunk scored higher.",
        },
        {
          title: "Nobody deletes, everybody uploads",
          body: "Policy updates arrive as new files. The old ones stay, because someone might need them. The agent reads all of them as equally true.",
        },
        {
          title: "Regional variants collide",
          body: "The India leave policy and the US leave policy both answer \"how many days do I get.\" Without scope, the employee in Bengaluru gets the California answer.",
        },
      ],
    },
    dominant: {
      body: "Each policy is stored with a stable fileName. When it changes, the old version is removed and the new one added, so the two never compete. Subtraction runs before ranking, and only the version in force reaches the window.",
      points: [
        "Superseded versions never reach the model.",
        "Region and entity scopes are enforced.",
        "Updates land without re-indexing everything.",
      ],
    },
    support: [
      { job: "scoped", title: "This employee's policy", body: "Region, entity and employment type are intersected, so the answer fits the person asking." },
      { job: "traced", title: "Which document said so", body: "Every answer carries the policy file it came from, for HR to verify." },
      { job: "shared", title: "HR, IT and Finance agree", body: "Benefits, laptops and expenses agents read one set of definitions." },
    ],
    sources: ["Google Docs", "Wiki exports", "HRIS (PostgreSQL)", "Slack", "Benefits PDFs", "Amazon S3"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "hr-policies/leave-in",
      fileName: "leave-policy-in.md",
      groupName: ["hr", "policy", "india"],
      content: "Parental leave (India), effective 1 April 2026: 26 weeks for birthing parents, 8 weeks for non-birthing parents.",
    },
    write: {
      title: "Replace the policy, do not append it",
      body: "Policies change by replacement. Delete the superseded version, then add the new one under the same fileName, so the old text can never outrank the new.",
      code: `// Same fileName without a delete returns 409 Conflict, by design.
await client.v1.context.delete({
  organization_id: ORG_ID,
  source: "hr-policies/leave-in",
  by_doc: true,
});

await client.v1.context.add({
  context_type: "resource",
  scope: "internal",
  source: "hr-policies/leave-in",
  documents: [{ content: updatedPolicy }],
  metadata: {
    fileName: "leave-policy-in.md",
    groupName: ["hr", "policy", "india"],
    lastModified: "2026-04-01T00:00:00Z",
  },
});`,
    },
    recall: { query: "How much parental leave do I get?", verb: "answering" },
    runs: {
      title: "Policy questions are employee data",
      body: "Employees ask about leave, health, pay and performance. The questions, and the answers, are personal data. Keep them scoped per employee and region, encrypted, and deletable, with SSO in front of every agent that can read them.",
    },
    cta: {
      title: "Bring the policy question it gets wrong.",
      body: "The one where the answer was right two years ago.",
    },
  },
  {
    slug: "legal-ops",
    name: "Contract & legal ops",
    job: "current",
    tagline: "Agents that know which version of the contract governs",
    title: "Agents that know which version of the contract governs",
    lead: "The MSA was amended twice and there is a side letter. Ask most contract agents about the liability cap and you get the number from the original, quoted with total confidence.",
    description:
      "Build contract and legal ops agents that answer from executed terms, amendments and side letters, scoped per matter with drafts subtracted, on Alchemyst AI.",
    breaks: {
      title: "The redline is not the contract",
      lead: "Legal corpora are full of near-duplicates by design. That is precisely what similarity search is worst at.",
      items: [
        {
          title: "Amendments are separate files",
          body: "The amendment that changed the cap is a four-page PDF. The original is forty pages. Retrieval ranks the forty-page document higher on almost every query, because it has more matching text.",
        },
        {
          title: "Drafts leak into answers",
          body: "Negotiation drafts, markups and the executed copy sit in the same matter folder. An agent that cannot subtract drafts will quote a clause the other side struck out.",
        },
        {
          title: "Matters bleed into each other",
          body: "Two clients, similar templates, same clause numbers. Without matter-level scope, the agent answers one client's question with the other client's terms.",
        },
      ],
    },
    dominant: {
      body: "Each document is stored with its matter, its status and what it supersedes. Drafts and superseded text are subtracted before ranking, and amendments are retrieved alongside the clauses they modify, so the answer reflects what was actually signed.",
      points: [
        "Executed terms beat drafts, every time.",
        "Amendments travel with the clause they change.",
        "Matters never bleed into each other.",
      ],
    },
    support: [
      { job: "traced", title: "Cite the clause", body: "Every answer carries the document and passage it came from, ready for a lawyer to check." },
      { job: "scoped", title: "This matter only", body: "Client and matter scopes are intersected before anything is ranked." },
      { job: "shared", title: "One reading of the definitions", body: "\"Affiliate\" resolves to the definition in this agreement, not the template." },
    ],
    sources: ["Executed PDFs", "CLM exports", "Amendments & side letters", "Email threads", "Google Drive", "Amazon S3"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "clm",
      fileName: "acme-msa-2024-executed.pdf",
      groupName: ["legal", "client_acme", "matter_msa", "executed"],
      content: "Section 9.2 Limitation of Liability. Aggregate liability shall not exceed fees paid in the twelve months preceding the claim.",
    },
    write: {
      title: "Store the amendment with what it changes",
      body: "An amendment is only useful next to the clause it modifies. Store it in the same matter scope, name what it supersedes, and keep drafts out of the executed scope entirely.",
      code: `await client.v1.context.add({
  context_type: "resource",
  scope: "internal",
  source: "clm",
  documents: [{
    content: "Amendment No. 2: Section 9.2 is replaced. Liability shall not exceed 2x fees paid in the preceding twelve months.",
    supersedes: "acme-msa-2024-executed.pdf#9.2",
  }],
  metadata: {
    fileName: "acme-msa-amendment-2.pdf",
    groupName: ["legal", "client_acme", "matter_msa", "executed"],
    lastModified: "2026-02-14T00:00:00Z",
  },
});`,
    },
    recall: { query: "What is our liability cap with Acme?", verb: "answering" },
    runs: {
      title: "Privilege does not survive a careless vendor",
      body: "Matter files are privileged and confidential. They belong on infrastructure you can defend to a client: scoped per matter, encrypted at rest, and on dedicated or self-hosted deployment when the engagement requires it.",
    },
    cta: {
      title: "Bring the clause it quotes wrong.",
      body: "The one where the answer came from the draft, not the signed copy.",
    },
  },
  {
    slug: "financial-ops",
    name: "Financial ops",
    job: "current",
    tagline: "Agents that reconcile against the number finance signed off",
    title: "Finance agents that use the number finance actually signed off",
    lead: "There are four versions of Q3 revenue in your drive: the forecast, the flash, the restated figure and the board deck. An agent that picks one at random is worse than no agent.",
    description:
      "Build finance and FP&A agents that reconcile against final, restated figures with one definition of revenue, on the Alchemyst AI context layer.",
    breaks: {
      title: "Every number has three drafts",
      lead: "Finance agents rarely fail at arithmetic. They fail at choosing which number to do the arithmetic on.",
      items: [
        {
          title: "Forecasts outrank actuals",
          body: "The forecast was discussed in forty emails. The actual was posted once. Retrieval weighs volume, so the agent quotes the number everyone talked about, not the one that closed.",
        },
        {
          title: "Revenue means five things",
          body: "Sales says bookings, finance says recognised revenue, the board says ARR. The agent reads all three as \"revenue\" and adds them up.",
        },
        {
          title: "Restatements do not propagate",
          body: "Q2 was restated after audit. Every agent built before the restatement still reconciles against the original figure, and nothing tells them otherwise.",
        },
      ],
    },
    dominant: {
      body: "Every figure is stored with its period, its status (forecast, flash, final, restated) and what it replaces. Superseded figures are subtracted, so the agent reconciles against the final number unless you explicitly ask for the forecast.",
      points: [
        "Final beats forecast unless you ask otherwise.",
        "Restatements replace, they do not coexist.",
        "Every figure carries its period and status.",
      ],
    },
    support: [
      { job: "shared", title: "One definition of revenue", body: "Semantic consensus pins \"revenue\" to the definition finance owns, for every agent." },
      { job: "traced", title: "Where the number came from", body: "Each reconciliation carries the file, period and status of the figure it used." },
      { job: "scoped", title: "This entity, this period", body: "Entity and period scopes are intersected before ranking." },
    ],
    sources: ["ERP exports", "General ledger (PostgreSQL)", "Board decks", "Close checklists", "Google Sheets", "Email"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "gl-close",
      fileName: "q3-2026-revenue-final.csv",
      groupName: ["finance", "fy26", "q3", "final"],
      content: "Q3 FY26 recognised revenue, final after close: $4.82M. Supersedes flash estimate of $4.95M.",
    },
    write: {
      title: "Replace the figure when it is restated",
      body: "A restatement is a new version of the truth. Store it with what it supersedes, and move the old figure out of the final scope so nothing reconciles against it again.",
      code: `await client.v1.context.add({
  context_type: "resource",
  scope: "internal",
  source: "gl-close",
  documents: [{
    content: "Q2 FY26 revenue restated after audit: $4.41M (previously $4.57M).",
    status: "restated",
    supersedes: "q2-2026-revenue-final.csv",
  }],
  metadata: {
    fileName: "q2-2026-revenue-restated.csv",
    groupName: ["finance", "fy26", "q2", "final"],
    lastModified: "2026-08-19T00:00:00Z",
  },
});`,
    },
    recall: { query: "Reconcile Q3 revenue against the board deck", verb: "reconciling" },
    runs: {
      title: "Unreleased numbers are material information",
      body: "Pre-close figures, forecasts and board materials are some of the most sensitive data a company holds. Keep them in scopes only finance agents can read, with every retrieval traced for audit.",
    },
    cta: {
      title: "Bring the reconciliation that does not tie out.",
      body: "The one where the agent used a number nobody signed off.",
    },
  },
  {
    slug: "product-docs",
    name: "Product documentation",
    job: "current",
    tagline: "Docs agents that answer from the version you shipped",
    title: "Docs agents that answer for the version the customer runs",
    lead: "Your customer is on v2. Your docs agent answers from v3, the version with the renamed endpoint. The answer is correct, and completely useless to them.",
    description:
      "Build documentation and developer support agents that answer for the product version the customer runs, with deprecated pages subtracted, on Alchemyst AI.",
    breaks: {
      title: "Every release makes the agent a little more wrong",
      lead: "Docs are versioned by nature, and retrieval is version-blind by default.",
      items: [
        {
          title: "Versions overlap",
          body: "v2 and v3 docs share most of their text. The agent retrieves whichever is closer to the phrasing of the question, which has nothing to do with the version the user runs.",
        },
        {
          title: "Deprecated pages keep ranking",
          body: "The deprecated guide has three years of examples and forum answers pointing at it. It outranks the new page on every query that matters.",
        },
        {
          title: "Changelogs are not read",
          body: "The breaking change is documented in one changelog line. The agent never connects that line to the forty pages it invalidates.",
        },
      ],
    },
    dominant: {
      body: "Each page is stored with its product version. The user's version is intersected in and deprecated pages are subtracted before ranking, so the answer fits the software actually installed.",
      points: [
        "Answers match the installed version.",
        "Deprecated pages stop ranking.",
        "Breaking changes surface with the pages they affect.",
      ],
    },
    support: [
      { job: "scoped", title: "This product, this version", body: "Product and version scopes are intersected, so v2 users get v2 answers." },
      { job: "traced", title: "Link the source page", body: "Every answer carries the page it came from, so users can check and your team can fix." },
      { job: "persistent", title: "Remember the customer's setup", body: "Their SDK, region and plan are remembered, not asked again on every question." },
    ],
    sources: ["Docs repo (Markdown)", "OpenAPI specs", "Changelogs", "Support tickets", "GitHub issues", "Discord"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "docs",
      fileName: "v3/auth/tokens.md",
      groupName: ["docs", "api", "v3"],
      content: "API v3: tokens are issued by POST /v3/auth/token. The /v2/login endpoint is removed.",
      scope: "external",
    },
    write: {
      title: "Mark the version, not just the page",
      body: "When v3 ships, v2 pages do not disappear. Keep them in their own version scope, so v2 users still get v2 answers and v3 users never see them.",
      code: `await client.v1.context.add({
  context_type: "resource",
  scope: "external",
  source: "docs",
  documents: [{ content: v2LoginPage, status: "deprecated" }],
  metadata: {
    fileName: "v2/auth/login.md",
    groupName: ["docs", "api", "v2"],
    lastModified: "2025-11-03T00:00:00Z",
  },
});`,
    },
    recall: { query: "How do I get an access token?", verb: "answering", groupName: ["docs", "api", "v2"] },
    runs: {
      title: "Public docs, private questions",
      body: "Docs are public, but what customers ask about them is not. Publish documentation through external scope, and keep questions, setups and account details in internal scope.",
    },
    cta: {
      title: "Bring the docs question it answers for the wrong version.",
      body: "The one your support team corrects every week.",
    },
  },

  /* ── 03 Traceable decisions ───────────────────────────────────────────── */
  {
    slug: "customer-support",
    name: "Customer support",
    job: "traced",
    tagline: "Support agents that remember the last time",
    title: "Support agents that remember the last time",
    lead: "A senior rep carries three years of an account in their head. An agent fleet starts every conversation at zero, unless what happened last time was written somewhere it can read.",
    description:
      "Build customer support agents with traceable answers, remembered resolutions and one customer context across chat and email, on Alchemyst AI.",
    breaks: {
      title: "Every ticket is the first ticket",
      lead: "Current support systems struggle with coordination, prioritization and context retention. Six specific failure modes, each of which leaves a trace in your own helpdesk.",
      items: [
        {
          title: "Escalation ping-pong",
          body: "Issues bounce between departments without anyone owning the resolution. Each team sees its own slice of the case, never the whole of it.",
        },
        {
          title: "Priority paralysis",
          body: "Critical issues sit buried in the queue, because nothing detects urgency from what the customer has already been through.",
        },
        {
          title: "Case history blackouts",
          body: "Previous interactions are invisible to the next agent, so customers are forced to restart their explanation every time.",
        },
        {
          title: "The fix is in the transcript, not in context",
          body: "The same customer hit this six weeks ago and it was solved. The thread can be searched, but the resolution was never stored as something an agent can retrieve. Diagnosis starts again from the top.",
        },
        {
          title: "Two agents, two truths",
          body: "The customer tells the chat agent they moved to the legacy plan. An hour later the email agent answers from a billing record that has not synced. Nothing holds the reconciliation, so the contradiction reaches the customer.",
        },
        {
          title: "Nobody can say why it answered that",
          body: "A customer escalates a wrong refund answer. The logs show the prompt and the reply, but not which article, ticket or policy the agent was reading when it decided.",
        },
      ],
    },
    dominant: {
      body: "Every search an agent runs is recorded as a Context Trace: the sources it was served, their scores and the rules applied. When an answer is wrong, you open the trace, see exactly which document caused it, and fix that document once.",
      points: [
        "Wrong answers trace back to one source.",
        "Fixes land in the context, not the prompt.",
        "Escalations arrive with evidence attached.",
      ],
    },
    support: [
      { job: "persistent", title: "The last time, remembered", body: "Resolutions are written back against the customer, so the next ticket starts from what worked." },
      { job: "shared", title: "Chat and email agree", body: "Every channel reads the same customer context, scoped to the same account." },
      { job: "current", title: "The refund policy in force", body: "Superseded macros and old policies are subtracted before the agent answers." },
    ],
    sources: ["Zendesk", "Intercom", "Help center articles", "Slack", "Jira", "Billing (PostgreSQL)"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "help-center",
      fileName: "refunds-annual-plans.md",
      groupName: ["support", "billing", "refunds"],
      content: "Annual plans are refundable pro rata within 30 days of renewal. After 30 days, credit is issued instead.",
    },
    write: {
      title: "Write the resolution, not the transcript",
      body: "The transcript is already in the helpdesk. What is missing is the outcome, stored against the customer so the next agent retrieves it as experience.",
      code: `await client.v1.context.memory.add({
  sessionId: "acme:ticket-44812",
  contents: [
    { role: "user", content: "Renewal card keeps getting declined." },
    {
      role: "assistant",
      content: "Resolved: 3DS step timing out on their gateway. Retry window raised to 40s.",
    },
  ],
  metadata: { groupName: ["support", "acme", "resolved"] },
});`,
    },
    recall: {
      query: "Customer says their renewal payment failed again",
      verb: "replying",
      groupName: ["support", "acme"],
    },
    runs: {
      title: "Support transcripts are the customer's data",
      body: "A support history is often the highest-PII corpus a company owns: names, orders, card failures and whatever the customer typed in frustration at 2am. Scope it per account, encrypt it, and keep it deletable on request.",
    },
    cta: {
      title: "Bring the ticket it gets wrong.",
      body: "Not the demo. The one where it asked a question the customer had already answered.",
    },
    capabilities: {
      title: "Smart support features",
      lead: "Enhance customer experience with AI agents that remember context, learn from interactions and deliver personalized support at scale.",
      items: [
        { title: "Retain customer history", body: "Agents remember past conversations and customer context, without having to ask for it again." },
        { title: "Tailored solutions", body: "Every reply feels personalized to the customer it is written for." },
        { title: "Pattern recognition", body: "Agents detect patterns across customer interactions, so they are prepared for the unexpected." },
        { title: "Feels human", body: "Past context lets agents remember things about the customer, so the customer feels connected to the agent." },
      ],
    },
    efficiency: {
      title: "Efficient support at scale",
      lead: "Handle more support tickets with fewer resources, while maintaining quality.",
      points: [
        "Automated context management reduces agent cognitive load.",
        "Smart token usage cuts operational costs by up to 40%.",
        "Handles complex, multi-turn conversations effortlessly.",
      ],
    },
  },
  {
    slug: "it-operations",
    name: "IT & incident response",
    job: "traced",
    tagline: "Agents that remember what the last fix actually did",
    title: "Incident agents that remember what the last fix actually did",
    lead: "At 3am the on-call engineer asks the agent what happened last time the queue backed up. The agent suggests a restart. Last time, the restart made it worse.",
    description:
      "Build IT service and incident response agents with traced recommendations, remembered outcomes and current runbooks, on the Alchemyst AI context layer.",
    breaks: {
      title: "Every incident is the first incident",
      lead: "Operations teams write down almost everything. The problem is that none of it is where the agent looks.",
      items: [
        {
          title: "Postmortems are written, then never read",
          body: "The postmortem says \"do not restart the consumer, drain it first.\" It lives in a doc nobody opens at 3am, so the agent never retrieves it either.",
        },
        {
          title: "Runbooks drift from reality",
          body: "The runbook references a dashboard that was renamed and a flag that was removed. The agent follows it faithfully and the engineer loses twenty minutes.",
        },
        {
          title: "The advice cannot be audited",
          body: "After the incident, someone asks why the agent recommended the restart. Nobody can say which runbook, ticket or postmortem it was reading at the time.",
        },
      ],
    },
    dominant: {
      body: "Every recommendation carries a Context Trace: which runbook, which postmortem, which past incident, with scores. The review starts from what the agent actually saw, and the fix goes into the source that misled it.",
      points: [
        "Recommendations cite the runbook they used.",
        "Post-incident reviews start from evidence.",
        "Bad sources get fixed once, not argued about.",
      ],
    },
    support: [
      { job: "persistent", title: "The last incident, remembered", body: "What was tried, what worked and what made it worse is written back when every incident closes." },
      { job: "current", title: "The runbook in force", body: "Superseded runbook versions are subtracted as soon as the new one lands." },
      { job: "scoped", title: "This service, this environment", body: "Service and environment scopes are intersected, so staging advice never reaches production." },
    ],
    sources: ["PagerDuty", "Postmortems (Google Docs)", "Runbooks (Markdown)", "Jira", "Slack incident channels", "GitHub"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "runbooks",
      fileName: "orders-queue-backlog.md",
      groupName: ["sre", "orders", "prod"],
      content: "Orders queue backlog: drain the consumer group before restarting. Restarting first causes duplicate processing.",
    },
    write: {
      title: "Write the outcome when the incident closes",
      body: "An incident is only useful next time if what was tried, and what happened, is stored as context. Write it when the incident closes, scoped to the service.",
      code: `await client.v1.context.add({
  context_type: "conversation",
  scope: "internal",
  source: "incidents",
  documents: [{
    content: "INC-2291: Orders backlog. Restart made duplicates worse. Draining the consumer group, then scaling to 6 replicas, resolved it in 12 minutes.",
  }],
  metadata: {
    fileName: "inc-2291-outcome.md",
    groupName: ["sre", "orders", "prod"],
    lastModified: "2026-09-02T03:41:00Z",
  },
});`,
    },
    recall: { query: "Orders queue is backing up in production", verb: "recommending" },
    runs: {
      title: "Incident context is an attack map",
      body: "Runbooks, architecture notes and incident timelines describe exactly how your systems fail. Keep them in scopes only on-call agents can read, on dedicated or self-hosted infrastructure when policy requires it.",
    },
    cta: {
      title: "Bring the incident it made worse.",
      body: "The one where the agent suggested the fix that failed last time.",
    },
  },
  {
    slug: "compliance",
    name: "Compliance & audit",
    job: "traced",
    tagline: "Every agent answer, with its sources still attached",
    title: "Every agent answer, with its sources still attached",
    lead: "A regulator does not ask whether your agent is accurate on average. They ask why it said this, to this customer, on this date. \"The model decided\" is not an answer.",
    description:
      "Build compliant, auditable AI agents: every answer recorded as a Context Trace with its sources, scores and rules, on the Alchemyst AI context layer.",
    breaks: {
      title: "Logs are not evidence",
      lead: "Most teams discover the gap during their first serious review, which is the worst possible time.",
      items: [
        {
          title: "Prompts are logged, context is not",
          body: "You kept every prompt and every reply. You did not keep which documents were retrieved, with what scores, under which rules. The reasoning is gone.",
        },
        {
          title: "Answers cannot be reproduced",
          body: "The knowledge base has changed since. Re-running the question today gives a different answer, so you cannot show what the agent saw on the day it acted.",
        },
        {
          title: "Access is implicit",
          body: "The agent could read the whole knowledge base, including documents the customer's own advisor was not entitled to see. Nobody noticed until an audit asked.",
        },
      ],
    },
    dominant: {
      body: "Every retrieval is recorded as a Context Trace: the sources served, their scores and the rules applied. Traces are listed and exported through the API, so for any answer you can show what the agent knew, and why.",
      points: [
        "Every answer is attributable.",
        "Evidence survives knowledge base changes.",
        "Scopes are recorded with the answer.",
      ],
    },
    support: [
      { job: "scoped", title: "Entitlements enforced at retrieval", body: "Scopes are checked on every call, so the agent only sees what the user may see." },
      { job: "current", title: "The rule in force on the day", body: "Superseded rules are subtracted, and the trace records which version was used." },
      { job: "shared", title: "One definition of \"suitable\"", body: "Regulated terms resolve to the definition compliance owns, for every agent." },
    ],
    sources: ["Policy manuals", "Regulatory circulars", "Product disclosures", "Advisor notes", "CRM", "Amazon S3"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "compliance",
      fileName: "suitability-policy-v7.pdf",
      groupName: ["compliance", "suitability", "in_force"],
      content: "Products rated risk level 5 may only be recommended to clients with a documented high risk tolerance assessed within 12 months.",
    },
    write: {
      title: "Pull the trace, not just the log",
      body: "When a review asks why an agent said something, list the traces. Each one records the sources, scores and rules behind the answer, ready to hand over.",
      code: `// Every search is recorded as a Context Trace.
const traces = await client.v1.context.traces.list();

// Sources, scores and rules applied, for the reviewer.
await exportForReview("REVIEW-2026-118", traces);`,
    },
    recall: { query: "Can I recommend the growth fund to this client?", verb: "advising" },
    runs: {
      title: "Regulated context stays where the regulator expects",
      body: "Some context cannot leave a jurisdiction or a network boundary. Run on dedicated infrastructure with VPC peering, or self-host the context layer, and keep traces alongside the rest of your audit record.",
    },
    cta: {
      title: "Bring the answer you could not explain.",
      body: "The one where the review asked why, and the logs could not say.",
    },
  },

  /* ── 04 Shared context ────────────────────────────────────────────────── */
  {
    slug: "sales-agents",
    name: "Sales agents",
    job: "shared",
    tagline: "One account memory, however many agents touch it",
    title: "One account memory, however many agents touch it",
    lead: "The research agent found that the champion changed jobs. The outreach agent emailed the old one anyway. Both were working. Neither knew what the other knew.",
    description:
      "Build sales agents that share one account context across research, outreach and forecasting, with pipeline terms that mean one thing, on Alchemyst AI.",
    breaks: {
      title: "Every agent has its own version of the account",
      lead: "Sales was the first function to get a fleet of agents. It was also the first to find out they do not talk to each other.",
      items: [
        {
          title: "Agents do not share what they learn",
          body: "Research, outreach, call notes and forecasting each keep their own context. What one discovers, the others never see.",
        },
        {
          title: "The CRM is a summary, not a memory",
          body: "The CRM says \"Stage 3.\" It does not say the buyer's CFO objected to annual billing on the last call, which is exactly what the next email needs to know.",
        },
        {
          title: "Every team speaks a different pipeline",
          body: "One team says \"qualified opportunity\", another says \"SQL\", and the forecasting agent counts both, twice.",
        },
      ],
    },
    dominant: {
      body: "Every agent reads and writes the same account context, scoped by account and team. What the call agent hears is available to the outreach agent on its next turn, and every agent resolves pipeline terms to the same definition.",
      points: [
        "What one agent learns, the next one knows.",
        "Pipeline terms mean one thing.",
        "Scopes keep territories separate.",
      ],
    },
    support: [
      { job: "persistent", title: "The buyer's objections, remembered", body: "Objections and preferences from every call are written back to the account." },
      { job: "current", title: "The deal as it stands", body: "Superseded pricing and old proposals are subtracted before the agent drafts." },
      { job: "traced", title: "Why this email said that", body: "Every drafted message carries the calls and notes it drew on." },
    ],
    sources: ["CRM exports", "Call transcripts", "Email threads", "Account research", "Proposals (Google Docs)", "Slack deal rooms"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "calls",
      fileName: "acme-discovery-2026-09-12.txt",
      groupName: ["sales", "acct_acme"],
      content: "CFO objected to annual prepay; prefers quarterly billing. New champion is Priya (VP Ops). Previous champion left in August.",
    },
    write: {
      title: "Pin what the pipeline words mean",
      body: "Shared context only helps if agents agree on the words. Store the definitions sales leadership owns, once, and every agent reads the same ones.",
      code: `await client.v1.context.add({
  context_type: "instruction",
  scope: "internal",
  source: "revops",
  documents: [{
    content: "A qualified opportunity has a confirmed budget owner, a timeline under two quarters and a completed discovery call. SQL is an alias, not a separate stage.",
  }],
  metadata: {
    fileName: "definition-qualified-opportunity.md",
    groupName: ["sales", "definitions"],
  },
});`,
    },
    recall: { query: "Draft a follow-up to Acme after the pricing call", verb: "drafting" },
    runs: {
      title: "Deal context is competitive intelligence",
      body: "Pricing, discounts and buyer objections are exactly what competitors would like to see. Keep them scoped per account and team, with SSO in front of every agent that can read them.",
    },
    cta: {
      title: "Bring the email that should never have been sent.",
      body: "The one that went to the champion who had already left.",
    },
  },
  {
    slug: "customer-success",
    name: "Customer success",
    job: "shared",
    tagline: "Handoffs that carry the account, not a summary of it",
    title: "Handoffs that carry the account, not a summary of it",
    lead: "Sales promised a custom integration in the last week of the deal. Onboarding found out in week three, from the customer, on a call that was supposed to be a kickoff.",
    description:
      "Build customer success agents that carry commitments, escalations and goals across every handoff from close to renewal, on the Alchemyst AI context layer.",
    breaks: {
      title: "Every handoff loses something",
      lead: "An account passes through four teams and at least as many tools in its first year. Each hop drops a little context.",
      items: [
        {
          title: "Promises live in the wrong system",
          body: "The commitment was made in an email thread the success team cannot see. The handoff doc summarises the deal, and summaries drop the awkward parts.",
        },
        {
          title: "Health scores without reasons",
          body: "The dashboard says the account is amber. It does not say the champion is on leave and the admin has opened four tickets about SSO.",
        },
        {
          title: "Renewal starts cold",
          body: "Eleven months of context across support, success and product sits in four tools. The renewal agent reads none of it and opens with a discount.",
        },
      ],
    },
    dominant: {
      body: "Sales, onboarding, support and renewal agents read and write one account context. Promises, escalations and product feedback are there for whoever touches the account next, scoped so each team sees what it needs.",
      points: [
        "Commitments survive the handoff.",
        "Health comes with reasons.",
        "Renewals start from the whole year.",
      ],
    },
    support: [
      { job: "persistent", title: "The customer's goals, remembered", body: "Stated goals and success criteria stay with the account from kickoff to renewal." },
      { job: "traced", title: "Why the agent flagged risk", body: "Every risk flag carries the tickets, calls and notes behind it." },
      { job: "scoped", title: "What matters for this call", body: "Account and topic scopes are intersected, so QBR prep pulls the right year, not the whole history." },
    ],
    sources: ["CRM", "Support tickets", "Call transcripts", "Product usage (PostgreSQL)", "Onboarding plans (Google Docs)", "Slack shared channels"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "sales-handoff",
      fileName: "globex-commitments.md",
      groupName: ["cs", "acct_globex"],
      content: "Committed at close: Workday integration by end of Q1, a dedicated onboarding manager, SSO at no extra cost.",
    },
    write: {
      title: "Write the escalation where everyone can read it",
      body: "Context only survives a handoff if it is stored against the account, not in the inbox of the person who noticed it.",
      code: `await client.v1.context.memory.add({
  sessionId: "acct_globex",
  contents: [{
    role: "system",
    content: "Risk: admin opened 4 SSO tickets in 2 weeks. Champion on leave until Oct 14. Renewal owner notified.",
  }],
  metadata: { groupName: ["cs", "acct_globex", "risk"] },
});`,
    },
    recall: { query: "Prepare the QBR for Globex", verb: "preparing" },
    runs: {
      title: "The account history is the customer's history",
      body: "Success context mixes contract terms, usage data and people's names. Keep it scoped per account, exportable when the customer asks, and deleted when the relationship ends.",
    },
    cta: {
      title: "Bring the handoff that dropped something.",
      body: "The one the customer had to remind you about.",
    },
  },
  {
    slug: "enterprise-operations",
    name: "Enterprise operations",
    job: "shared",
    tagline: "Every agent on the same version of the business",
    title: "Every agent on the same version of the business",
    lead: "\"Revenue\" means $500K to your CFO and $5M to your sales team. Your agents do not know which one is right, and act with false confidence on whichever they find first.",
    description:
      "Run enterprise operations on AI agents that share one consensus version of the business: canonical definitions, owned by the right team, on Alchemyst AI.",
    breaks: {
      title: "Semantic drift, at scale",
      lead: "One agent with the wrong definition is a bug. A hundred agents with a hundred definitions is how an organisation stops trusting its AI.",
      items: [
        {
          title: "Definitions fork silently",
          body: "Every team has its own glossary. Agents built by each team inherit its dialect, and cross-team workflows break at the joins.",
        },
        {
          title: "The ontology rots from day one",
          body: "The knowledge graph was accurate when it shipped. Then a pricing tier launched, a region was added and two teams merged. Nobody updated the schema.",
        },
        {
          title: "Forward-deployed teams do not scale",
          body: "The usual fix is engineers embedded in every workflow, hand-maintaining context. That works for a handful of agents. It does not work for hundreds.",
        },
      ],
    },
    dominant: {
      body: "Canonical definitions, owned by the team that owns the term, are stored once and scoped to the whole organisation. Every agent, in every team, resolves ambiguous terms to the same meaning before the model sees them.",
      points: [
        "Terms resolve before the model reads them.",
        "Owners update definitions, not engineers.",
        "New agents inherit the consensus on day one.",
      ],
    },
    support: [
      { job: "current", title: "The organisation as it is today", body: "When teams merge or a tier launches, superseded structure is subtracted." },
      { job: "traced", title: "Which definition was used", body: "Every decision records the definitions and sources it resolved." },
      { job: "scoped", title: "Per team, when it should be", body: "Team scopes stay private and organisation scopes are shared. Intersection decides." },
    ],
    sources: ["Wikis", "Google Docs", "Warehouse documentation", "Org charts (HRIS)", "Slack", "MongoDB"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "org-glossary",
      fileName: "definition-active-customer.md",
      groupName: ["org", "definitions"],
      content: "Active customer: an account with a paid invoice in the last 90 days. Owner: Finance. Trials are not active customers.",
    },
    write: {
      title: "Let the owner define the term",
      body: "Consensus is not a longer prompt. It is a definition with an owner, stored once and read by every agent in the organisation.",
      code: `await client.v1.context.add({
  context_type: "instruction",
  scope: "internal",
  source: "org-glossary",
  documents: [{
    content: "Revenue means ARR as reported to the board. Bookings and pipeline are separate metrics.",
    owner: "finance",
  }],
  metadata: {
    fileName: "definition-revenue.md",
    groupName: ["org", "definitions"],
  },
});`,
    },
    recall: { query: "How many active customers did we add in Q3?", verb: "acting" },
    runs: {
      title: "Your organisation's meaning is the asset",
      body: "Models will keep changing. The definitions, decisions and context your organisation builds up are what compounds, so they belong in a layer you own: model-agnostic, exportable and yours.",
    },
    cta: {
      title: "Bring the term your teams disagree on.",
      body: "The one that means something different in every department.",
    },
  },
  {
    slug: "finance",
    name: "Finance & payments",
    job: "shared",
    tagline: "Fraud, payments and KYC agents that see the whole case",
    title: "Fraud, payments and KYC on one memory",
    lead: "Enhance fraud detection, streamline payments and accelerate KYC with memory-powered AI that learns from every transaction. Today, most of that learning is thrown away the moment a check completes.",
    description:
      "Build fraud detection, payments and KYC agents on shared, persistent memory: fewer duplicate checks, checkout logic that learns, cheaper credit routing and one view of every case, on Alchemyst AI.",
    breaks: {
      title: "Every check starts from scratch",
      lead: "Legacy financial systems struggle with efficiency, speed and context retention. Three places it shows up on the bill.",
      items: [
        {
          title: "Repetitive fraud checks",
          body: "Legacy systems reprocess the same entities and devices every time. The device cleared yesterday is scored from zero today, which is redundant and expensive.",
        },
        {
          title: "Rigid payments logic",
          body: "There is no memory of past issuer quirks or merchant behavior, so the same avoidable declines keep happening. Higher declines, lost revenue.",
        },
        {
          title: "Fragmented case data",
          body: "KYC, device and transaction information live in silos. Agents cannot act fast, because none of them can see the full context of the case.",
        },
      ],
    },
    dominant: {
      body: "Fraud, payments and KYC agents read and write one case context, scoped by customer, merchant and device. What the fraud agent cleared, the payments agent already knows, and what KYC verified, the credit agent does not ask for again.",
      points: [
        "One case, one context, every agent.",
        "Cleared entities stay cleared.",
        "No full ledgers in the prompt.",
      ],
    },
    support: [
      { job: "persistent", title: "Devices and issuers, remembered", body: "Prior entities, device fingerprints and issuer quirks persist between checks." },
      { job: "scoped", title: "Only the ledger lines that matter", body: "Credit and BNPL checks intersect applicant and product scopes instead of sending the full loan ledger." },
      { job: "traced", title: "Why the case was flagged", body: "Every decision carries the entities, rules and transactions behind it, ready for review." },
    ],
    sources: ["Transaction streams", "KYC records", "Device fingerprints", "Issuer responses", "Case management", "PostgreSQL & MongoDB"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "kyc",
      fileName: "cust_55102-kyc.json",
      groupName: ["finance", "cust_55102"],
      content: "KYC verified 2026-06-11: identity and address match. Risk tier: low. Linked device dev_8f21, cleared.",
    },
    write: {
      title: "Write what the check concluded",
      body: "A cleared device or a known issuer quirk is worth keeping. Write the conclusion against the entity, so the next check starts from it instead of repeating it.",
      code: `await client.v1.context.memory.add({
  sessionId: "merchant_4471",
  contents: [{
    role: "system",
    content: "Issuer 5318 soft-declines first attempts over INR 50,000 at night. Retry with 3DS succeeds.",
  }],
  metadata: { groupName: ["finance", "payments", "merchant_4471"] },
});`,
    },
    recall: { query: "Score this transaction from dev_8f21 for cust_55102", verb: "scoring" },
    runs: {
      title: "Financial data has the strictest boundaries",
      body: "Transaction, KYC and device data are regulated in every market. Keep them scoped per customer and merchant, encrypted at rest, traced on every retrieval, and on dedicated or self-hosted infrastructure when your regulator requires it.",
    },
    cta: {
      title: "Bring the check you run twice.",
      body: "The one that re-scores the device you cleared yesterday.",
    },
    capabilities: {
      title: "Intelligent financial features",
      lead: "Transform financial operations with memory-powered AI that learns and adapts from every transaction.",
      items: [
        { title: "Persistent memory for fraud prevention", body: "Remembers devices and prior entities, so duplicate checks are avoided and token and infrastructure costs fall." },
        { title: "Checkout that learns over time", body: "Alchemyst retains issuer quirks and merchant-specific logic, for faster, more accurate authorizations." },
        { title: "Smart credit & BNPL routing", body: "No more sending full loan ledgers. Eligibility checks become 70% cheaper, and smarter." },
        { title: "Unified view of financial cases", body: "KYC, payments and user fingerprints stitched into one memory, for faster resolution and fewer reruns." },
      ],
    },
    efficiency: COST_OPTIMIZED,
  },

  /* ── 05 Scoped retrieval ──────────────────────────────────────────────── */
  {
    slug: "research-agents",
    name: "Research agents",
    job: "scoped",
    tagline: "Fewer things in the window, and better ones",
    title: "Research agents with fewer things in the window, and better ones",
    lead: "Give a research agent two hundred documents and it will summarise all of them. Give it the six that matter and it will actually answer the question.",
    description:
      "Build research agents that retrieve the few sources that matter using context arithmetic: scoped, deduplicated and ranked, on Alchemyst AI.",
    breaks: {
      title: "More context, worse answers",
      lead: "Research agents are usually starved of precision, not recall.",
      items: [
        {
          title: "Top-K is not relevance",
          body: "The ten most similar chunks are often ten paraphrases of the same point. The contradicting source, the one that changes the conclusion, scores eleventh.",
        },
        {
          title: "Everything is in scope",
          body: "The agent searched the whole corpus: last year's reports, drafts, another client's research. Precision fell, and so did trust.",
        },
        {
          title: "Long windows hide the signal",
          body: "Models degrade well before their advertised window. Stuffing more in costs more, runs slower and buries the passage that mattered.",
        },
      ],
    },
    dominant: {
      body: "Context arithmetic decides what enters the window: intersect the project, period and source scopes, subtract superseded and duplicate material, then rank what survives. The model sees a small, deliberate set instead of a long list of lookalikes.",
      points: [
        "Duplicates and paraphrases are subtracted.",
        "Scope narrows before similarity ranks.",
        "Smaller windows, lower cost, better answers.",
      ],
    },
    support: [
      { job: "traced", title: "Every claim, cited", body: "Each finding carries the sources and scores it came from." },
      { job: "persistent", title: "What the analyst already ruled out", body: "Rejected hypotheses and sources are remembered, so they are not suggested again." },
      { job: "current", title: "The latest edition", body: "Superseded reports are subtracted when a new edition lands." },
    ],
    sources: ["Research reports (PDF)", "Web research", "Internal memos", "Interview notes", "Google Drive", "Amazon S3"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "research",
      fileName: "ev-battery-market-2026-h1.pdf",
      groupName: ["research", "ev_batteries", "2026"],
      content: "H1 2026: LFP share of new EV battery capacity reached 48%, up from 41% in 2025.",
    },
    write: {
      title: "Remember what was ruled out",
      body: "Research is as much about what you rejected as what you kept. Write rejected sources and hypotheses back, so the agent stops proposing them.",
      code: `await client.v1.context.memory.add({
  sessionId: "project_ev_batteries",
  contents: [{
    role: "user",
    content: "Exclude the 2024 vendor-sponsored survey: 60 respondents, all existing customers.",
  }],
  metadata: { groupName: ["research", "ev_batteries", "exclusions"] },
});`,
    },
    recall: { query: "What is driving LFP adoption in 2026?", verb: "synthesising" },
    runs: {
      title: "Research is often someone else's data",
      body: "Licensed reports, client materials and interview notes come with terms. Scope them per project and per client, so an agent working for one client never reads another's materials.",
    },
    cta: {
      title: "Bring the question it over-answers.",
      body: "The one where the summary was long and the answer was missing.",
    },
  },
  {
    slug: "coding-agents",
    name: "Coding agents",
    job: "scoped",
    tagline: "Agents that retrieve the relevant file, not the similar one",
    title: "Coding agents that retrieve the relevant file, not the similar one",
    lead: "Ask a coding agent to fix auth and it will happily read the three files named auth. The bug is in the middleware that calls them, which is named nothing like auth.",
    description:
      "Give coding agents scoped repository context, design decisions and remembered conventions through MCP, the OpenCode plugin or the SDK, on Alchemyst AI.",
    breaks: {
      title: "Similar is not relevant",
      lead: "Coding agents are fast. Most of their wasted time is spent confidently reading the wrong files.",
      items: [
        {
          title: "Names beat structure",
          body: "Similarity ranks files by what they are called and what they say. The file that actually matters, the one that imports and wraps them, scores lower.",
        },
        {
          title: "Decisions live outside the repo",
          body: "Why the retry logic looks strange is explained in a PR discussion and a design doc. The agent reads the code, \"fixes\" the strangeness and reintroduces the bug.",
        },
        {
          title: "Every session relearns the codebase",
          body: "The agent rediscovers the same conventions every session: the test command, the lint rules, the directory nobody is allowed to touch.",
        },
      ],
    },
    dominant: {
      body: "Repository context is scoped by service and layer, and design docs and PRs are stored alongside the code they explain. Intersection narrows to the service being changed, subtraction removes generated and deprecated code, and ranking decides what the agent reads first.",
      points: [
        "The relevant file beats the similarly named one.",
        "Design decisions travel with the code.",
        "Generated and vendored code stays out.",
      ],
    },
    support: [
      { job: "persistent", title: "Conventions, remembered", body: "Test commands, lint rules and team conventions persist across sessions." },
      { job: "shared", title: "Every agent, same map", body: "Review, coding and docs agents read the same repository context." },
      { job: "current", title: "The code on main today", body: "Removed modules and merged branches are subtracted after merge." },
    ],
    sources: ["GitHub repos", "Pull requests", "Design docs", "ADRs", "Jira", "MCP (Cursor, VS Code, Claude)"],
    sourcesLead:
      "Connect through the Alchemyst MCP server in Cursor, VS Code or Claude Desktop, the OpenCode plugin, or index the repository directly with the SDK.",
    ingest: {
      source: "github",
      fileName: "services/api/middleware/session.ts",
      groupName: ["codebase", "api", "middleware"],
      content: "withSession() wraps every authenticated route. Token refresh happens here, not in auth/refresh.ts.",
    },
    write: {
      title: "Store the decision next to the code",
      body: "The reason code looks strange is usually in a PR thread. Store it in the same scope as the file it explains, so the agent reads the why before it changes the what.",
      code: `await client.v1.context.add({
  context_type: "resource",
  scope: "internal",
  source: "github-prs",
  documents: [{
    content: "PR #1184: retry refresh once, with jitter. Immediate retry caused a thundering herd on token expiry. Do not remove the delay.",
  }],
  metadata: {
    fileName: "pr-1184-session-retry.md",
    groupName: ["codebase", "api", "middleware"],
    lastModified: "2026-07-22T00:00:00Z",
  },
});`,
    },
    recall: { query: "Users are logged out after token refresh", verb: "editing" },
    runs: {
      title: "Source code is the crown jewels",
      body: "Your repository, its history and its design docs are the most sensitive IP most software companies hold. Scope them per team and repository, and self-host the context layer when code cannot leave your network.",
    },
    cta: {
      title: "Bring the bug it fixed in the wrong file.",
      body: "The one where the agent was confident, fast and in the wrong place.",
    },
  },
  {
    slug: "voice-agents",
    name: "Voice AI",
    job: "scoped",
    tagline: "One round trip, and it has to be the right one",
    title: "Voice agents get one round trip, and it has to be the right one",
    lead: "In a chat, a slow answer is a spinner. On a call, it is dead air, and the caller starts talking over the agent. Voice leaves no budget for retrieving the wrong thing.",
    description:
      "Build voice AI agents with narrow, fast, scoped retrieval and cross-session caller memory, including the LiveKit plugin, on Alchemyst AI.",
    breaks: {
      title: "Latency is the whole product",
      lead: "Every retrieval choice that is invisible in text is audible on a call.",
      items: [
        {
          title: "Every extra lookup is audible",
          body: "Agents that search, reflect and search again feel fine in text. On a call, the second lookup is the moment the caller says \"hello?\"",
        },
        {
          title: "Wide retrieval is slow retrieval",
          body: "Searching the whole knowledge base for every utterance spends latency the conversation does not have, and most of what comes back is irrelevant to this caller.",
        },
        {
          title: "Callers repeat themselves",
          body: "The caller explained the problem yesterday. Today's agent asks again, and a caller who has to repeat themselves asks for a human.",
        },
      ],
    },
    dominant: {
      body: "Scopes are set before the call connects: this caller, this account, this intent. Each turn runs one narrow search in fast mode, so what comes back is small, relevant and inside the latency budget.",
      points: [
        "One narrow search per turn.",
        "Scopes set before the first word.",
        "Fast mode for in-call lookups.",
      ],
    },
    support: [
      { job: "persistent", title: "Yesterday's call, remembered", body: "What the caller said last time is written back and read before they speak." },
      { job: "current", title: "Today's hours and offers", body: "Superseded scripts and promotions are subtracted, so the agent never offers what has expired." },
      { job: "traced", title: "Why the agent said that", body: "Every spoken answer carries the sources behind it, for QA review." },
    ],
    sources: ["LiveKit", "Plivo", "Twilio", "OpenAI", "Anthropic", "Call transcripts", "Knowledge base articles", "CRM", "Order status (PostgreSQL)"],
    sourcesLead:
      "Works with your voice stack: Plivo, Twilio and any existing telephony, with OpenAI or Anthropic models. The LiveKit plugin adds persistent cross-session memory, and production-ready APIs deploy in under 24 hours.",
    ingest: {
      source: "kb",
      fileName: "delivery-windows.md",
      groupName: ["voice", "support", "delivery"],
      content: "Standard delivery: 2 to 4 business days. Same-day delivery in Bengaluru and Mumbai for orders placed before 1pm.",
    },
    write: {
      title: "Write what the caller needs next time",
      body: "The call ends and the transcript is long. Keep the part the next call needs: the issue, what was promised, what is still open.",
      code: `await client.v1.context.memory.add({
  sessionId: "caller_4410",
  contents: [{
    role: "assistant",
    content: "Order #88213 reported missing. Promised a callback by 6pm with a courier update.",
  }],
  metadata: { groupName: ["voice", "support", "caller_4410"] },
});`,
    },
    recall: { query: "Where is my order?", verb: "speaking", mode: "fast" },
    runs: {
      title: "Every network hop is audible",
      body: "Voice agents feel the distance between the context layer and the model. Keep retrieval close to inference, keep scopes tight, and keep caller memory deletable when a customer asks.",
    },
    cta: {
      title: "Bring the call with the dead air.",
      body: "The one where the caller hung up before the agent found the answer.",
      note: "No credit card required · Deploy in under 24 hours · 30-day free trial",
    },
    benchmarks: {
      title: "170ms latency. Best-in-class efficiency.",
      lead: "Benchmark-proven performance for voice, tested in December 2025 on publicly available benchmarks. This is how the Alchemyst context engine defines the new Pareto frontier for voice AI.",
      stats: [
        { value: "170ms", label: "P50 latency", note: "Real-time voice AI responses" },
        { value: "12x", label: "Value ratio", note: "More intelligence per dollar" },
        { value: "83%", label: "Cost savings", note: "vs traditional engines" },
        { value: "0.76", label: "Memory F1 score", note: "Superior context retention" },
      ],
      comparison: {
        columns: ["Metric", "Competitors", "Alchemyst"],
        rows: [
          ["P50 latency", "500-800ms", "170ms"],
          ["Memory F1 score", "0.45-0.58", "0.76"],
          ["Value ratio (performance / cost)", "1x-2x", "12x"],
          ["Cost savings", "Baseline", "83% reduction"],
          ["Setup time", "2-4 weeks", "Under 24 hours"],
        ],
      },
    },
    capabilities: {
      title: "Why voice AI teams choose Alchemyst",
      lead: "Verified capabilities built for enterprises deploying voice AI at scale.",
      items: [
        { title: "Unmatched context speed", body: "Complex conversation context is processed in 170ms, so voice agents respond instantly, without latency delays." },
        { title: "Superior context awareness", body: "The highest memory F1 score in the industry (0.76) keeps conversation continuity precise." },
        { title: "Enterprise economics", body: "Save 83% on costs while delivering 12x more performance value per dollar than competing solutions." },
        { title: "Verified and transparent", body: "Tested in December 2025 on publicly available benchmarks. No hidden claims, only results." },
        { title: "Pareto frontier performance", body: "Positioned at the efficiency frontier: the best balance of cost and performance available today." },
        { title: "Easy integration", body: "REST APIs and SDKs that integrate with your existing voice stack in hours, not months." },
      ],
    },
    scenarios: {
      title: "Transform any voice use case",
      lead: "Deliver the same context engine across your entire voice AI stack.",
      items: [
        {
          title: "Sales & outbound calling",
          body: "Qualify leads and close deals with context-aware agents that understand customer history and objections.",
          benefit: "3x faster call completion",
        },
        {
          title: "Customer support",
          body: "Resolve issues faster with instant context retrieval on customer history and preferences.",
          benefit: "40% faster resolution",
        },
        {
          title: "Collections & reminders",
          body: "Intelligent due reminders that understand payment history and customer circumstances.",
          benefit: "25% improvement in recovery rates",
        },
        {
          title: "Inbound call handling",
          body: "Route and handle incoming calls intelligently, with complete context on the first ring.",
          benefit: "Instant smart routing",
        },
      ],
    },
    faqs: [
      {
        q: "What makes Alchemyst different?",
        a: "Alchemyst is the only AI context engine with verified, publicly available benchmarks. Our 170ms P50 latency and 0.76 memory F1 score are tested and proven, not marketing claims.",
      },
      {
        q: "How much can we save?",
        a: "Alchemyst delivers 12x more value per dollar with 83% cost savings versus traditional engines. A typical enterprise saves $50K to $500K a year, depending on call volume.",
      },
      {
        q: "How quickly can we deploy?",
        a: "In less than 24 hours. The APIs are designed for rapid integration with Twilio, Plivo or any custom telephony system.",
      },
      {
        q: "Is there a setup cost or long-term contract?",
        a: "No setup fees and no contracts. You only pay for what you use. Start free with a 30-day trial and full production access.",
      },
    ],
  },
  {
    slug: "content-marketing",
    name: "Content & marketing",
    job: "scoped",
    tagline: "Content agents that write in the voice you approved",
    title: "Content agents that write in the voice you approved",
    lead: "The brand guidelines say never write \"synergy.\" The content agent read them once, in a prompt, three hundred prompts ago. The newsletter says synergy.",
    description:
      "Build content and marketing agents that draft from approved, on-brand examples scoped by campaign and channel, with retired positioning subtracted, on Alchemyst AI.",
    breaks: {
      title: "Every draft forgets the brand",
      lead: "Brand drift is rarely one bad draft. It is a slow slide, one plausible sentence at a time.",
      items: [
        {
          title: "Guidelines are prompts, not context",
          body: "Voice, banned words and positioning are pasted into a system prompt that grows until someone trims it. Whatever was trimmed is what gets violated.",
        },
        {
          title: "Old positioning resurfaces",
          body: "The product was repositioned in spring. The agent keeps pulling phrasing from last year's launch posts, because they are the best-performing pages.",
        },
        {
          title: "Every channel drifts separately",
          body: "The social agent, the blog agent and the email agent each learned the brand from different examples, and it shows.",
        },
      ],
    },
    dominant: {
      body: "Content is retrieved by campaign, channel and audience scope, with retired positioning subtracted. The agent drafts from the few approved examples that fit this piece, not from everything you have ever published.",
      points: [
        "Approved examples beat popular ones.",
        "Retired positioning stays retired.",
        "Each channel drafts from that channel.",
      ],
    },
    support: [
      { job: "shared", title: "One voice across channels", body: "Every content agent reads the same brand definitions and approved examples." },
      { job: "current", title: "This season's positioning", body: "When positioning changes, last season's messaging is subtracted." },
      { job: "persistent", title: "Editor feedback, remembered", body: "Edits and rejections are written back, so the same mistake is not made twice." },
    ],
    sources: ["Brand guidelines", "Published posts", "Campaign briefs (Google Docs)", "Editor feedback", "n8n workflows", "Analytics (Google Sheets)"],
    sourcesLead: DEFAULT_SOURCES_LEAD,
    ingest: {
      source: "brand",
      fileName: "voice-guidelines-2026.md",
      groupName: ["marketing", "brand"],
      content: "Voice: plain, specific, confident. Never use \"synergy\" or \"revolutionary\". Lead with the customer's problem.",
    },
    write: {
      title: "Write the editor's correction back",
      body: "Every edit is a lesson. Store it in the brand scope, and the next draft starts from what the editor already fixed.",
      code: `await client.v1.context.memory.add({
  sessionId: "brand_editorial",
  contents: [{
    role: "user",
    content: "Rejected: headline was a rhetorical question. House style is statements, not questions.",
  }],
  metadata: { groupName: ["marketing", "brand", "feedback"] },
});`,
    },
    recall: { query: "Draft the October product newsletter", verb: "drafting" },
    runs: {
      title: "Unreleased campaigns are confidential",
      body: "Launch plans, embargoed announcements and pricing changes sit in the same corpus as published posts. Keep them in scopes that only the right agents can read until launch day.",
    },
    cta: {
      title: "Bring the draft your editor rewrote.",
      body: "The one that sounded like everyone except you.",
    },
  },
];

export const USE_CASE_BY_SLUG: Record<string, UseCase> = Object.fromEntries(USE_CASES.map((u) => [u.slug, u]));

export const useCasesForJob = (job: JobId) => USE_CASES.filter((u) => u.job === job);

export const useCasePath = (slug: string) => `/use-cases/${slug}`;

/* ── Mixture helpers ───────────────────────────────────────────────────────── */

export type Weight = "lead" | "uses" | "light";

/** How heavily a use case leans on each of the five jobs, in canonical order. */
export function mixtureOf(uc: UseCase): { job: Job; weight: Weight }[] {
  const supporting = new Set(uc.support.map((s) => s.job));
  return JOBS.map((job) => ({
    job,
    weight: job.id === uc.job ? "lead" : supporting.has(job.id) ? "uses" : "light",
  }));
}

/** The one job a use case leans on least. */
export function lightJobOf(uc: UseCase): Job {
  return mixtureOf(uc).find((m) => m.weight === "light")!.job;
}

/* ── Code samples ──────────────────────────────────────────────────────────── */

const q = (s: string) => JSON.stringify(s);
const arr = (xs: string[]) => `[${xs.map(q).join(", ")}]`;

export function ingestCode(uc: UseCase): string {
  const { source, fileName, groupName, content, scope = "internal" } = uc.ingest;
  return `import AlchemystAI from "@alchemystai/sdk";

const client = new AlchemystAI(); // reads ALCHEMYST_AI_API_KEY

await client.v1.context.add({
  context_type: "resource",
  scope: ${q(scope)},
  source: ${q(source)},
  documents: [{
    content: ${q(content)},
  }],
  metadata: {
    fileName: ${q(fileName)},
    groupName: ${arr(groupName)},   // the sets this belongs to
  },
});`;
}

export function recallCode(uc: UseCase): string {
  const groupName = uc.recall.groupName ?? uc.ingest.groupName;
  const scope = uc.ingest.scope ?? "internal";
  const mode = uc.recall.mode ? `\n  mode: ${q(uc.recall.mode)},` : "";
  return `const { contexts } = await client.v1.context.search({
  query: ${q(uc.recall.query)},
  scope: ${q(scope)},${mode}
  similarity_threshold: 0.8,
  minimum_similarity_threshold: 0.5,
  metadata: { groupName: ${arr(groupName)} },   // ∩ narrow scope
});
// − superseded, deduplicated → ranked → into the window
// Every search is recorded as a Context Trace.

const reply = await llm.respond(message, { context: contexts });`;
}
