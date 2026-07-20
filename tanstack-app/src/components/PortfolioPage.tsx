import { useEffect, useState, type FormEvent } from "react";
import { toast } from "sonner";
import { ArrowRight, ArrowUpRight } from "lucide-react";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const projects = [
  {
    title: "Atlas Design System",
    tags: ["Design system", "React", "2024–25"],
    body: "Rebuilt a multi-product component library for a Series C fintech. Unified 11 product surfaces onto one token pipeline, cut design-to-dev handoff rework by roughly half, and shipped WCAG 2.2 AA defaults.",
    outcome: "48% fewer UI bugs in QA · 3 teams on shared tokens",
    size: "lg" as const,
  },
  {
    title: "Ledger Flow",
    tags: ["Product", "Motion"],
    body: "Redesigned reconciliation for mid-market finance ops. Progressive disclosure and micro-motion reduced average task time from 11 minutes to under 4.",
    outcome: "Task time −64% on pilot cohort",
    size: "sm" as const,
  },
  {
    title: "Signal Inbox",
    tags: ["A11y", "TypeScript"],
    body: "Keyboard-first triage for customer support. Full screen-reader map, roving tabindex, and reduced-motion paths as first-class features.",
    outcome: "NPS +18 with power users",
    size: "sm" as const,
  },
  {
    title: "Northbound",
    tags: ["0→1 product", "Design + FE", "2023"],
    body: "Co-founded the interface for a route-planning tool used by regional logistics teams. Designed the spatial UI, built the React map shell, and established the interaction model still in production.",
    outcome: "Launched in 14 weeks · still primary UI two years later",
    size: "wide" as const,
  },
];

const roles = [
  {
    years: "2022 – Present",
    place: "Meridian Labs · Oakland",
    title: "Staff Product Designer / Frontend",
    body: "Lead design systems and high-traffic product surfaces. Own Atlas DS, partner with platform eng on token architecture, and ship React features end-to-end for finance workflows.",
  },
  {
    years: "2019 – 2022",
    place: "Northbound · Remote",
    title: "Founding Designer & Engineer",
    body: "0→1 product design and frontend for logistics route planning. Established the design language, built the map shell in React/TypeScript, and hired the second designer.",
  },
  {
    years: "2016 – 2019",
    place: "Fieldnote · San Francisco",
    title: "Product Designer",
    body: "Designed research tooling for academic and enterprise labs. Grew from visual design into interaction systems and a small shared component kit used by three product squads.",
  },
];

const skillGroups = [
  {
    title: "Design",
    items: [
      "Design systems",
      "Interaction design",
      "Visual craft",
      "Prototyping",
      "Design critique",
    ],
  },
  {
    title: "Frontend",
    items: ["React", "TypeScript", "Tailwind", "TanStack", "Component APIs"],
  },
  {
    title: "Motion & quality",
    items: [
      "Motion design",
      "Accessibility",
      "Performance budgets",
      "Design tokens",
    ],
  },
  {
    title: "Practice",
    items: [
      "System thinking",
      "Writing specs",
      "Mentoring",
      "Cross-functional facilitation",
    ],
  },
];

export function PortfolioPage() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const message = String(fd.get("message") || "").trim();
    if (!name || !email || !message) {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!/^[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(email)) {
      toast.error("Enter a valid email address.");
      return;
    }
    e.currentTarget.reset();
    toast.success("Message sent. I’ll get back to you soon.");
  }

  return (
    <>
      <header
        className={`sticky top-0 z-40 flex h-[72px] items-center justify-between px-[clamp(1.25rem,4vw,2.5rem)] transition-colors ${
          scrolled
            ? "border-b border-white/10 bg-[#121416]/95"
            : "border-b border-transparent bg-[#121416]/80"
        } backdrop-blur-md`}
      >
        <a href="#top" className="flex items-center gap-2.5 font-[family-name:var(--font-display)] font-semibold tracking-tight">
          <span className="grid h-9 w-9 place-items-center rounded-[10px] border border-white/15 bg-[#22262c] text-xs font-bold text-[#2dd4bf]">
            MC
          </span>
          <span className="text-[0.98rem]">Mira Chen</span>
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {navLinks.map((l) =>
            l.href === "#contact" ? (
              <a
                key={l.href}
                href={l.href}
                className="rounded-full border border-[#2dd4bf]/25 bg-[#2dd4bf]/15 px-3.5 py-1.5 text-[0.92rem] text-[#2dd4bf] transition hover:bg-[#2dd4bf]/25"
              >
                {l.label}
              </a>
            ) : (
              <a
                key={l.href}
                href={l.href}
                className="text-[0.92rem] text-[#9aa3ad] transition hover:text-[#e8eaed]"
              >
                {l.label}
              </a>
            ),
          )}
        </nav>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center md:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-4.5 bg-white" />
            <span className="block h-0.5 w-4.5 bg-white" />
          </span>
        </button>
      </header>

      {menuOpen && (
        <div className="fixed inset-x-0 top-[72px] z-35 flex flex-col gap-4 border-b border-white/10 bg-[#1a1d21] px-6 py-5 md:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-[family-name:var(--font-display)] text-lg font-medium"
              onClick={() => setMenuOpen(false)}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <main id="top">
        {/* Hero */}
        <section className="mx-auto grid max-w-[1120px] items-end gap-10 px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(3rem,8vw,6.5rem)] md:grid-cols-[1.25fr_0.85fr]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 text-[0.82rem] text-[#9aa3ad]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#2dd4bf] shadow-[0_0_0_4px_rgba(45,212,191,0.2)]" />
              Oakland, CA · Open for staff design roles
            </div>
            <h1 className="mb-5 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5.5vw,3.85rem)] font-semibold leading-[1.08] tracking-[-0.035em]">
              <span className="block">I design interfaces</span>
              <span className="block text-[#2dd4bf]">that feel inevitable</span>
            </h1>
            <p className="mb-8 max-w-xl text-[1.05rem] leading-relaxed text-[#9aa3ad]">
              Mira Chen is a product designer and frontend engineer who bridges
              systems thinking with craft. Design systems, accessible React, and
              motion that earns its place.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex items-center gap-2 rounded-[12px] bg-[#2dd4bf] px-5 py-3 text-[0.95rem] font-semibold text-[#0a1210] transition hover:bg-[#5eead4]"
              >
                Selected work
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center rounded-[12px] border border-white/15 px-5 py-3 text-[0.95rem] font-semibold transition hover:bg-[#1a1d21]"
              >
                Start a conversation
              </a>
            </div>
          </div>

          <aside className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#1a1d21] p-5">
            {[
              ["Role", "Product designer & frontend engineer"],
              ["Currently", "Staff IC · design systems"],
              ["Focus", "React · TypeScript · a11y · motion"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="grid grid-cols-[88px_1fr] gap-3 border-b border-white/10 pb-3 text-sm"
              >
                <span className="text-[0.75rem] uppercase tracking-wider text-[#6b7480]">
                  {k}
                </span>
                <span>{v}</span>
              </div>
            ))}
            <div className="grid grid-cols-[88px_1fr] gap-3 rounded-[10px] bg-[#2dd4bf]/15 p-2.5 text-sm">
              <span className="text-[0.75rem] uppercase tracking-wider text-[#6b7480]">
                Next
              </span>
              <span className="font-semibold text-[#2dd4bf]">
                Hiring managers welcome
              </span>
            </div>
            <code className="mt-1 border-t border-white/10 pt-3 font-mono text-[0.72rem] text-[#6b7480]">
              {"interface Craft { calm: true; precise: true }"}
            </code>
          </aside>
        </section>

        {/* Work */}
        <section
          id="work"
          className="mx-auto max-w-[1120px] px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(3.5rem,8vw,6rem)]"
        >
          <div className="mb-10 grid max-w-none items-end gap-6 md:grid-cols-[1.2fr_0.9fr]">
            <div>
              <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-[#2dd4bf]">
                Selected work
              </p>
              <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.5vw,2.55rem)] font-semibold tracking-tight">
                Case studies with outcomes.
              </h2>
            </div>
            <p className="text-[#9aa3ad]">
              Four product efforts where design and engineering shipped together.
              Outcomes are specific; vanity metrics stay offline.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((p) => (
              <article
                key={p.title}
                className={`flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1a1d21] transition hover:-translate-y-0.5 hover:border-white/20 ${
                  p.size === "wide" ? "md:col-span-2 md:flex-row" : ""
                } ${p.size === "lg" ? "md:row-span-2" : ""}`}
              >
                <div
                  className={`min-h-[160px] bg-[#22262c] ${
                    p.size === "wide" ? "md:w-[42%]" : ""
                  } ${p.size === "lg" ? "md:min-h-[240px]" : ""}`}
                >
                  <div className="flex h-full min-h-[160px] items-end p-6">
                    <div className="flex h-24 w-full items-end gap-2">
                      {[42, 68, 55, 82, 70].map((h, i) => (
                        <span
                          key={i}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-[#2dd4bf]/30 to-[#2dd4bf] opacity-85"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex flex-1 flex-col gap-2.5 p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-white/10 bg-[#121416] px-2.5 py-0.5 text-[0.72rem] text-[#9aa3ad]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight">
                    {p.title}
                  </h3>
                  <p className="flex-1 text-[0.94rem] leading-relaxed text-[#9aa3ad]">
                    {p.body}
                  </p>
                  <div className="mt-1 border-t border-white/10 pt-3">
                    <span className="block text-[0.7rem] uppercase tracking-wider text-[#6b7480]">
                      Outcome
                    </span>
                    <strong className="text-[0.88rem] font-semibold text-[#2dd4bf]">
                      {p.outcome}
                    </strong>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="mx-auto grid max-w-[1120px] gap-10 px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(3.5rem,8vw,6rem)] md:grid-cols-[1.3fr_0.9fr]"
        >
          <div>
            <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-[#2dd4bf]">
              About
            </p>
            <h2 className="mb-5 font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.5vw,2.55rem)] font-semibold tracking-tight">
              Calm systems.
              <br />
              <em className="font-medium not-italic text-[#2dd4bf]">
                Clear craft.
              </em>
            </h2>
            <p className="mb-4 max-w-xl text-[#9aa3ad]">
              I started as a visual designer, learned to ship React in production,
              and never fully chose one lane. That hybrid is the point: I can sit
              in a critique and a PR review on the same day without translating.
            </p>
            <p className="mb-4 max-w-xl text-[#9aa3ad]">
              I care about design systems that engineers trust, motion that
              explains state instead of decorating it, and accessibility treated
              as structure rather than a checklist at the end.
            </p>
            <p className="mt-5 max-w-xl rounded-r-[10px] border-l-2 border-[#2dd4bf] bg-[#2dd4bf]/15 px-4 py-3 text-[0.95rem]">
              Based in Oakland. Prefer thoughtful product teams over chaotic
              growth theater.
            </p>
          </div>
          <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-[#1a1d21] p-6">
            <div className="grid h-[72px] w-[72px] place-items-center rounded-[14px] border border-[#2dd4bf]/25 bg-gradient-to-br from-[#2dd4bf]/20 to-[#22262c] font-[family-name:var(--font-display)] text-xl font-bold text-[#2dd4bf]">
              MC
            </div>
            <div>
              <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">
                Mira Chen
              </h3>
              <p className="mt-1 text-[0.92rem] text-[#9aa3ad]">
                Product designer & frontend engineer
              </p>
            </div>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li className="flex justify-between border-b border-white/10 pb-2.5">
                <span className="text-[#6b7480]">Location</span>
                <span>Oakland, CA</span>
              </li>
              <li className="flex justify-between border-b border-white/10 pb-2.5">
                <span className="text-[#6b7480]">Email</span>
                <a className="text-[#2dd4bf] hover:underline" href="mailto:mira@mira.design">
                  mira@mira.design
                </a>
              </li>
              <li className="flex justify-between">
                <span className="text-[#6b7480]">Working</span>
                <span>Hybrid · remote-friendly</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Experience */}
        <section
          id="experience"
          className="mx-auto max-w-[1120px] px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(3.5rem,8vw,6rem)]"
        >
          <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-[#2dd4bf]">
            Experience
          </p>
          <h2 className="mb-10 font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.5vw,2.55rem)] font-semibold tracking-tight">
            Where the work happened.
          </h2>
          <ol className="relative max-w-[800px]">
            <span className="absolute bottom-2 left-[5px] top-2 w-px bg-white/15" />
            {roles.map((r) => (
              <li
                key={r.title}
                className="relative grid gap-3 py-5 md:grid-cols-[24px_160px_1fr] md:gap-5"
              >
                <span className="mt-1.5 z-10 h-[11px] w-[11px] rounded-full border-2 border-[#2dd4bf] bg-[#121416]" />
                <div>
                  <span className="block text-[0.82rem] font-semibold tabular-nums">
                    {r.years}
                  </span>
                  <span className="mt-0.5 block text-[0.82rem] text-[#6b7480]">
                    {r.place}
                  </span>
                </div>
                <div>
                  <h3 className="mb-1.5 font-[family-name:var(--font-display)] text-lg font-semibold tracking-tight">
                    {r.title}
                  </h3>
                  <p className="text-[0.94rem] leading-relaxed text-[#9aa3ad]">
                    {r.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="mx-auto max-w-[1120px] px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(3.5rem,8vw,6rem)]"
        >
          <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-[#2dd4bf]">
            Skills
          </p>
          <h2 className="mb-10 font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.5vw,2.55rem)] font-semibold tracking-tight">
            How I show up in a team.
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {skillGroups.map((g) => (
              <div
                key={g.title}
                className="rounded-[12px] border border-white/10 bg-[#1a1d21] p-5"
              >
                <h4 className="mb-3 font-[family-name:var(--font-display)] text-[0.95rem] font-semibold">
                  {g.title}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {g.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-[#121416] px-3 py-1.5 text-[0.82rem] text-[#9aa3ad]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="mx-auto grid max-w-[1120px] gap-10 px-[clamp(1.25rem,4vw,2.5rem)] py-[clamp(3.5rem,8vw,6rem)] md:grid-cols-[1fr_1.1fr]"
        >
          <div>
            <p className="mb-2 text-[0.78rem] font-semibold uppercase tracking-[0.1em] text-[#2dd4bf]">
              Contact
            </p>
            <h2 className="font-[family-name:var(--font-display)] text-[clamp(1.85rem,3.5vw,2.55rem)] font-semibold tracking-tight">
              Tell me about the product.
            </h2>
            <p className="my-4 max-w-md text-[#9aa3ad]">
              Hiring managers, founders, and collaborators: send a short note
              with context. I read every message and reply within a few days when
              something fits.
            </p>
            <a
              href="mailto:mira@mira.design"
              className="font-[family-name:var(--font-display)] text-lg font-medium text-[#2dd4bf] hover:underline"
            >
              mira@mira.design
            </a>
          </div>
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#1a1d21] p-6"
            noValidate
          >
            <label className="flex flex-col gap-1.5 text-[0.82rem] font-semibold text-[#9aa3ad]">
              Name
              <input
                name="name"
                required
                autoComplete="name"
                placeholder="Alex Rivera"
                className="rounded-[10px] border border-white/15 bg-[#121416] px-3.5 py-3 text-sm font-normal text-[#e8eaed] outline-none placeholder:text-[#6b7480] focus:border-[#2dd4bf]/45 focus:ring-2 focus:ring-[#2dd4bf]/15"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-[0.82rem] font-semibold text-[#9aa3ad]">
              Email
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="alex@company.com"
                className="rounded-[10px] border border-white/15 bg-[#121416] px-3.5 py-3 text-sm font-normal text-[#e8eaed] outline-none placeholder:text-[#6b7480] focus:border-[#2dd4bf]/45 focus:ring-2 focus:ring-[#2dd4bf]/15"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-[0.82rem] font-semibold text-[#9aa3ad]">
              Message
              <textarea
                name="message"
                required
                rows={5}
                placeholder="What are you building, and how might I help?"
                className="resize-y rounded-[10px] border border-white/15 bg-[#121416] px-3.5 py-3 text-sm font-normal text-[#e8eaed] outline-none placeholder:text-[#6b7480] focus:border-[#2dd4bf]/45 focus:ring-2 focus:ring-[#2dd4bf]/15"
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-[12px] bg-[#2dd4bf] px-5 py-3 text-[0.95rem] font-semibold text-[#0a1210] transition hover:bg-[#5eead4]"
            >
              Send message
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </form>
        </section>
      </main>

      <footer className="border-t border-white/10 px-[clamp(1.25rem,4vw,2.5rem)] py-7">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-between gap-3 text-[0.85rem] text-[#6b7480]">
          <span>© {year} Mira Chen</span>
          <span>Oakland · Product design · Frontend engineering</span>
          <a href="#top" className="text-[#9aa3ad] hover:text-[#2dd4bf]">
            Back to top
          </a>
        </div>
      </footer>
    </>
  );
}
