
import React, { useState, useEffect, useRef } from "react";
import { Search, Menu, X, ChevronDown, ArrowRight } from "lucide-react";
import "./home.css";


const Linkedin = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={props.size || 15} height={props.size || 15} {...props}>
    <path d="M4.98 3.5C4.98 4.88 3.87 6 2.49 6S0 4.88 0 3.5 1.11 1 2.49 1s2.49 1.12 2.49 2.5zM.24 8.25h4.5V23H.24V8.25zM8.25 8.25h4.31v2.02h.06c.6-1.13 2.07-2.33 4.26-2.33 4.56 0 5.4 3 5.4 6.9V23h-4.5v-6.9c0-1.65-.03-3.77-2.3-3.77-2.3 0-2.65 1.8-2.65 3.65V23h-4.5V8.25z" />
  </svg>
);
const Facebook = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={props.size || 15} height={props.size || 15} {...props}>
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.16 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.91h-2.34V22c4.78-.78 8.44-4.94 8.44-9.94z" />
  </svg>
);
const Twitter = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={props.size || 15} height={props.size || 15} {...props}>
    <path d="M18.24 2H21l-6.55 7.49L22.2 22h-6.16l-4.82-6.3L5.7 22H2.9l7.02-8.02L2 2h6.32l4.36 5.77L18.24 2zm-1.08 18.17h1.71L7 3.73H5.16l12 16.44z" />
  </svg>
);
const Instagram = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={props.size || 15} height={props.size || 15} {...props}>
    <path d="M12 2c2.72 0 3.06.01 4.12.06 1.06.05 1.79.22 2.43.47.66.26 1.22.6 1.77 1.15.5.5.86 1.03 1.15 1.77.25.64.42 1.37.47 2.43.05 1.06.06 1.4.06 4.12s-.01 3.06-.06 4.12c-.05 1.06-.22 1.79-.47 2.43a4.9 4.9 0 01-1.15 1.77c-.5.5-1.03.86-1.77 1.15-.64.25-1.37.42-2.43.47-1.06.05-1.4.06-4.12.06s-3.06-.01-4.12-.06c-1.06-.05-1.79-.22-2.43-.47a4.9 4.9 0 01-1.77-1.15 4.9 4.9 0 01-1.15-1.77c-.25-.64-.42-1.37-.47-2.43C2.01 15.06 2 14.72 2 12s.01-3.06.06-4.12c.05-1.06.22-1.79.47-2.43.26-.66.6-1.22 1.15-1.77.5-.5 1.03-.86 1.77-1.15.64-.25 1.37-.42 2.43-.47C8.94 2.01 9.28 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm0 8.25A3.25 3.25 0 1112 8.75a3.25 3.25 0 010 6.5zM17.5 6.75a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z" />
  </svg>
);
const Youtube = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={props.size || 15} height={props.size || 15} {...props}>
    <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 00.5 6.19 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.81 3.02 3.02 0 002.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 002.12-2.14A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.81zM9.6 15.6V8.4l6.4 3.6-6.4 3.6z" />
  </svg>
);

const NAV_ITEMS = [
  {
    label: "Our Services",
    href: "#services",
    submenu: [
      { label: "Industries", href: "#industries", kind: "services", value: "industries" },
      { label: "Capabilities", href: "#capabilities", kind: "services", value: "capabilities" },
    ],
  },
  {
    label: "Our Company",
    submenu: [
      { label: "About Ventora", href: "#about", kind: "company", value: "about" },
      { label: "Client Impact", href: "#client-impact", kind: "company", value: "client-impact" },
      { label: "Leadership", href: "#leadership", kind: "company", value: "leadership" },
      { label: "Offices", href: "#offices", kind: "company", value: "offices" },
      { label: "Corporate Newsroom", href: "#newsroom", kind: "company", value: "newsroom" },
    ],
  },
  { label: "Join Us", kind: "company", value: "careers" },
];

const IMPACT_CARDS = [
  {
    stat: "15-year",
    statLabel: "best performance",
    tag: "Client Impact",
    title: "Transforming Heathrow Operations",
    text: "Working with a major airline partner on a wide-reaching transformation across people, leadership, and technology to drive operational excellence.",
    className: "grad-1",
    image: "https://picsum.photos/seed/bcg-airport/600/440",
  },
  {
    stat: "29",
    statLabel: "countries with improved service",
    tag: "Client Impact",
    title: "Scaling Generative AI Across Global Operations",
    text: "Helping a pharma-wholesale leader turn AI into a durable capability — cutting costs, lifting service levels, and strengthening supply-chain resilience.",
    className: "grad-2",
    image: "https://picsum.photos/seed/bcg-pharma/600/440",
  },
  {
    stat: "60%",
    statLabel: "efficiency increase",
    tag: "Client Impact",
    title: "Reinventing Marketing With AI",
    text: "Teaming with a global consumer-goods leader to roll out a generative AI platform that boosted effectiveness and freed capacity for higher-value work.",
    className: "grad-3",
    image: "https://picsum.photos/seed/bcg-marketing/600/440",
  },
  {
    stat: "2x",
    statLabel: "productivity",
    tag: "Client Impact",
    title: "Optimizing Scheduling With AI at Scale",
    text: "Supporting a mining leader's rollout of AI-enabled scheduling, sharpening decision quality across a vast and complex supply chain.",
    className: "grad-4",
    image: "https://picsum.photos/seed/bcg-mining/600/440",
  },
];

const TILES = [
  {
    kicker: "BCG Answer",
    title: "BCG Answer",
    text: "Discover the answer to your most important business challenges. BCG Answer delivers integrated insights powered by our cross-functional expertise and the latest thinking shaping today’s business decisions.",
    cta: "Ask us a question",
    href: "https://www.bcg.com/bcg-answer",
    className: "tile-1",
    image: "https://picsum.photos/seed/bcg-answer-engine/500/600",
  },
  {
    kicker: "Lead With Advantage",
    title: "Artificial Intelligence at Scale",
    text: "Applied AI is now the difference between advantage and catch-up. See how leaders are scaling it responsibly.",
    cta: "Navigate what's next",
    href: "https://www.bcg.com/capabilities/artificial-intelligence",
    className: "tile-2",
    image: "https://picsum.photos/seed/bcg-ai-scale/500/600",
  },
  {
    kicker: "Build Tomorrow",
    title: "Meet BCG X",
    text: "New products, services, and businesses — built in partnership with the world’s largest organizations.",
    cta: "Start your transformation",
    href: "https://www.bcg.com/x/",
    className: "tile-3",
    image: "https://picsum.photos/seed/bcg-build-studio/500/600",
  },
];

const INDUSTRIES = [
  {
    label: "Aerospace and Defense Industry",
    href: "https://www.bcg.com/industries/aerospace-defense",
    image: "https://images.unsplash.com/photo-1520012218364-4d75f4e7df12?auto=format&fit=crop&w=900&q=80",
    description:
      "Our aerospace and defense experts help industry players navigate their day-to-day operations and identify ways they can innovate for the future.",
  },
  {
    label: "Automotive Industry",
    href: "https://www.bcg.com/industries/automotive",
    image: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=900&q=80",
    description:
      "We work with automotive leaders to accelerate electrification, smart mobility, and digital manufacturing at scale.",
  },
  {
    label: "Consumer Products Industry",
    href: "https://www.bcg.com/industries/consumer-products",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    description:
      "From brands to retail, we help consumer products companies create resilience, growth, and more meaningful customer experiences.",
  },
  {
    label: "Education",
    href: "https://www.bcg.com/industries/education",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=80",
    description:
      "We support education institutions and systems to improve outcomes, access, and digital learning journeys.",
  },
  {
    label: "Energy",
    href: "https://www.bcg.com/industries/energy",
    image: "https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=900&q=80",
    description:
      "We partner with energy companies on the transition to clean, resilient, and digitally enabled business models.",
  },
  {
    label: "Financial Institutions",
    href: "https://www.bcg.com/industries/financial-institutions",
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&w=900&q=80",
    description:
      "Helping banks, insurers, and asset managers modernize customer experience, risk, and operating efficiency.",
  },
  {
    label: "Health Care Industry",
    href: "https://www.bcg.com/industries/health-care",
    image: "https://images.unsplash.com/photo-1580281657521-8b4fbb7e8c8a?auto=format&fit=crop&w=900&q=80",
    description:
      "We work with providers, payers, and life sciences organizations to improve care, outcomes, and innovation.",
  },
  {
    label: "Industrial Goods",
    href: "https://www.bcg.com/industries/industrial-goods",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    description:
      "Our industrial goods clients rely on us for operations, supply chain transformation, and sustainable growth.",
  },
  {
    label: "Insurance Industry",
    href: "https://www.bcg.com/industries/insurance",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
    description:
      "We help insurers drive digital claims, underwriting, and customer strategies for a rapidly changing market.",
  },
  {
    label: "Principal Investors and Private Equity",
    href: "https://www.bcg.com/industries/private-equity",
    image: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383?auto=format&fit=crop&w=900&q=80",
    description:
      "We advise private equity firms and investors on deal strategy, value creation, and portfolio transformation.",
  },
  {
    label: "Public Sector",
    href: "https://www.bcg.com/industries/public-sector",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    description:
      "We support government and public-sector leaders with strategy, digital transformation, and citizen-centric services.",
  },
  {
    label: "Retail Industry",
    href: "https://www.bcg.com/industries/retail",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    description:
      "Retailers partner with us to reshape omnichannel, merchandising, and customer loyalty in a digital-first world.",
  },
  {
    label: "Technology, Media & Telecommunications",
    href: "https://www.bcg.com/industries/technology-media-telecommunications",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    description:
      "We help TMT companies scale digital platforms, speed innovation, and capture new sources of value.",
  },
  {
    label: "Transportation and Logistics",
    href: "https://www.bcg.com/industries/transportation-logistics",
    image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=80",
    description:
      "We work with carriers, logistics networks, and mobility providers to improve efficiency and customer experience.",
  },
  {
    label: "Travel and Tourism",
    href: "https://www.bcg.com/industries/travel-tourism",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=80",
    description:
      "Helping travel and tourism companies recover, innovate, and design stronger guest journeys.",
  },
  {
    label: "Urban Planning",
    href: "https://www.bcg.com/industries/urban-planning",
    image: "https://images.unsplash.com/photo-1505842465776-3eadc29d216d?auto=format&fit=crop&w=900&q=80",
    description:
      "We help cities and developers create sustainable, connected, and resilient urban spaces.",
  },
];

const CAPABILITIES = [
  {
    label: "Artificial Intelligence",
    href: "https://www.bcg.com/capabilities/artificial-intelligence",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    description:
      "We help organizations turn AI from ambition into operating reality, scaling models, data, and technology across every function.",
  },
  {
    label: "Business and Organizational Purpose",
    href: "https://www.bcg.com/capabilities/business-purpose",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
    description:
      "We help companies define their purpose and translate it into strategic choices, culture change, and sustained performance.",
  },
  {
    label: "Business Resilience",
    href: "https://www.bcg.com/capabilities/business-resilience",
    image: "https://images.unsplash.com/photo-1518183214770-9cffbec72538?auto=format&fit=crop&w=900&q=80",
    description:
      "Our teams build the resilience that lets businesses absorb disruption, maintain performance, and adapt quickly.",
  },
  {
    label: "Business Transformation",
    href: "https://www.bcg.com/capabilities/business-transformation",
    image: "https://images.unsplash.com/photo-1497493292307-31c376b6e479?auto=format&fit=crop&w=900&q=80",
    description:
      "We design and deliver large-scale transformations that improve growth, cost, and customer outcomes.",
  },
  {
    label: "Climate Change and Sustainability",
    href: "https://www.bcg.com/capabilities/climate-change-sustainability",
    image: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=900&q=80",
    description:
      "We support companies in decarbonizing operations, embedding sustainability, and unlocking new sources of value.",
  },
  {
    label: "Corporate Finance and Strategy",
    href: "https://www.bcg.com/capabilities/corporate-finance-strategy",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    description:
      "Our finance and strategy experts help leaders make the critical decisions that create long-term value.",
  },
  {
    label: "Cost Management",
    href: "https://www.bcg.com/capabilities/cost-management",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    description:
      "We identify and capture sustainable cost reductions while protecting growth and customer experience.",
  },
  {
    label: "Customer Insights",
    href: "https://www.bcg.com/capabilities/customer-insights",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    description:
      "We uncover the customer needs and behaviors that drive demand, choice, and loyalty.",
  },
  {
    label: "Digital, Technology, and Data",
    href: "https://www.bcg.com/capabilities/digital-technology-data",
    image: "https://images.unsplash.com/photo-1531497865144-046d3dbd91a7?auto=format&fit=crop&w=900&q=80",
    description:
      "We help organizations build modern digital platforms, data capabilities, and agile technology operating models.",
  },
  {
    label: "Innovation Strategy and Delivery",
    href: "https://www.bcg.com/capabilities/innovation-strategy-delivery",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
    description:
      "Our teams help clients discover, incubate, and scale new products, services, and business models.",
  },
  {
    label: "International Business",
    href: "https://www.bcg.com/capabilities/international-business",
    image: "https://images.unsplash.com/photo-1518118573788-d7d9bcd9a541?auto=format&fit=crop&w=900&q=80",
    description:
      "We support companies expanding across borders with local-market insight and global execution.",
  },
  {
    label: "Manufacturing",
    href: "https://www.bcg.com/capabilities/manufacturing",
    image: "https://images.unsplash.com/photo-1516542076529-1ea3854896cc?auto=format&fit=crop&w=900&q=80",
    description:
      "We help manufacturers improve productivity, quality, and flexibility through digital operations.",
  },
  {
    label: "Marketing and Sales",
    href: "https://www.bcg.com/capabilities/marketing-sales",
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?auto=format&fit=crop&w=900&q=80",
    description:
      "We help companies strengthen growth by creating differentiated offers and more effective sales motions.",
  },
  {
    label: "M&A, Transactions, and PMI",
    href: "https://www.bcg.com/capabilities/mergers-acquisitions",
    image: "https://images.unsplash.com/photo-1508385082359-f25a8be108f9?auto=format&fit=crop&w=900&q=80",
    description:
      "We support buyers, sellers, and investors across deals, integrations, and value capture.",
  },
  {
    label: "Operations",
    href: "https://www.bcg.com/capabilities/operations",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=900&q=80",
    description:
      "We help operations leaders transform logistics, manufacturing, and supply chains for better performance.",
  },
  {
    label: "Organization Strategy",
    href: "https://www.bcg.com/capabilities/organization-strategy",
    image: "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=900&q=80",
    description:
      "We help organizations structure their teams, governance, and leadership capabilities to deliver strategy.",
  },
  {
    label: "People Strategy",
    href: "https://www.bcg.com/capabilities/people-strategy",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80",
    description:
      "Our people strategy work helps clients build talent, culture, and operating models for the future of work.",
  },
  {
    label: "Pricing and Revenue Management",
    href: "https://www.bcg.com/capabilities/pricing-revenue-management",
    image: "https://images.unsplash.com/photo-1517142089942-ba376ce32a2e?auto=format&fit=crop&w=900&q=80",
    description:
      "We help companies set prices and revenue models that maximize value without sacrificing demand.",
  },
  {
    label: "Risk Management and Compliance",
    href: "https://www.bcg.com/capabilities/risk-management-compliance",
    image: "https://images.unsplash.com/photo-1485217988980-11786ced9454?auto=format&fit=crop&w=900&q=80",
    description:
      "We help clients manage risk, compliance, and resilience while pursuing strategic growth.",
  },
  {
    label: "Social Impact",
    href: "https://www.bcg.com/capabilities/social-impact",
    image: "https://images.unsplash.com/photo-1476958526483-36efcaa80f58?auto=format&fit=crop&w=900&q=80",
    description:
      "We work with leaders on social impact strategies that drive both societal and business outcomes.",
  },
];

const INSIGHTS = [
  { tag: "Artificial Intelligence", title: "Why Applied AI Beats Ambitious AI", image: "https://picsum.photos/seed/bcg-insight-ai/500/320" },
  { tag: "Corporate Strategy", title: "Reimagining Value Creation In A Volatile World", image: "https://picsum.photos/seed/bcg-insight-strategy/500/320" },
  { tag: "Climate & Sustainability", title: "The Next Decade Of The Energy Transition", image: "https://picsum.photos/seed/bcg-insight-climate/500/320" },
];

function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

// ===== Nav bar =====
function Nav({ onTrackClick, onShowServices, onShowCompany, onGoHome, onMenuToggle }) {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null);

  useEffect(() => {
    onMenuToggle?.(open);
  }, [open, onMenuToggle]);

  return (
    <header className={`bcg-nav ${scrolled ? "bcg-nav-scrolled" : ""}`}>
      <div className="bcg-container bcg-nav-inner">
        <a
          href="#top"
          className="bcg-logo"
          onClick={(e) => {
            e.preventDefault();
            if (onGoHome) onGoHome();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          VENTORA
        </a>

        <nav className="bcg-nav-links">
          {NAV_ITEMS.map((item) => (
            item.submenu ? (
              <div
                key={item.label}
                className="bcg-nav-item-group"
              >
                <button
                  type="button"
                  className="bcg-nav-link"
                  onClick={() => {
                    setOpenMenu((current) => (current === item.label ? null : item.label));
                  }}
                >
                  {item.label}
                  <ChevronDown size={14} className="bcg-chevron" />
                </button>
                <div className={`bcg-nav-dropdown ${openMenu === item.label ? "open" : ""}`}>
                  {item.submenu.map((sub) => (
                    <a
                      key={sub.label}
                      className="bcg-nav-dropdown-link"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenMenu(null);
                        if (sub.kind === "services") {
                          onShowServices?.(sub.value);
                        } else if (sub.kind === "company") {
                          onShowCompany?.(sub.value);
                        }
                      }}
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : item.kind === "company" && item.value ? (
              <button
                key={item.label}
                className="bcg-nav-link"
                onClick={() => onShowCompany?.(item.value)}
              >
                {item.label}
                <ChevronDown size={14} className="bcg-chevron" />
              </button>
            ) : item.href ? (
              <a key={item.label} href={item.href} className="bcg-nav-link">
                {item.label}
                <ChevronDown size={14} className="bcg-chevron" />
              </a>
            ) : (
              <button key={item.label} className="bcg-nav-link">
                {item.label}
                <ChevronDown size={14} className="bcg-chevron" />
              </button>
            )
          ))}
        </nav>

        <div className="bcg-nav-actions">
          <button aria-label="Search" className="bcg-icon-btn">
            <Search size={18} />
          </button>
          <button onClick={onTrackClick} className="bcg-btn-pill">
            Track Passport
          </button>
        </div>

        <button className="bcg-menu-toggle" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="bcg-mobile-menu">
          <div className="bcg-mobile-menu-header">
            <button
              type="button"
              className="bcg-mobile-menu-close"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
          {NAV_ITEMS.filter((item) => item.label !== "Join Us").map((item) => (
            item.submenu ? (
              <div key={item.label} className="bcg-mobile-menu-group">
                <div className="bcg-mobile-link">{item.label}</div>
                {item.submenu.map((sub) => (
                  <a
                    key={sub.label}
                    href={sub.href}
                    className="bcg-mobile-sub-link"
                    onClick={() => {
                      setOpen(false);
                      if (sub.kind === "services") {
                        onShowServices?.(sub.value);
                      } else if (sub.kind === "company") {
                        onShowCompany?.(sub.value);
                      }
                    }}
                  >
                    {sub.label}
                  </a>
                ))}
              </div>
            ) : (
              <a
                key={item.label}
                href={item.href || "#"}
                className="bcg-mobile-link"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            )
          ))}
          <button
            onClick={() => {
              setOpen(false);
              onTrackClick();
            }}
            className="bcg-mobile-track-btn"
          >
            Track Passport
          </button>
        </div>
      )}
    </header>
  );
}

// ===== Hero =====
function Hero({ onTrackClick }) {
  return (
    <section id="top" className="bcg-hero">
      <img
        src="https://web-assets.bcg.com/dims4/default/670aae0/2147483647/strip/true/crop/492x1080+262+0/resize/320x703!/format/webp/quality/90/?url=http%3A%2F%2Fboston-consulting-group-brightspot.s3.amazonaws.com%2Fc9%2F87%2Fb731f9d546ceac1c839129b6c5f6%2Fhomepage-gradient-ambient-video-still.jpg"
        alt="BCG hero background"
        className="bcg-hero-bg-img"
      />
      <div className="bcg-hero-glow" />
      <div className="bcg-hero-grid" />
      <div className="bcg-container bcg-hero-inner">
        <p className="bcg-eyebrow">Welcome to VENTORA</p>
        <h1 className="bcg-h1">Where Strategic Clarity Meets Applied AI</h1>
        <p className="bcg-hero-sub">We're built for leaders who need more than advice.</p>
        <button onClick={onTrackClick} className="bcg-btn-primary">
          See how we work <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}

function ImpactCard({ card }) {
  return (
    <div className="bcg-impact-card">
      <div className={`bcg-impact-visual ${card.className}`}>
        <img src={card.image} alt={card.title} className="bcg-impact-img" />
        <div className="bcg-impact-overlay" />
        <span className="bcg-impact-stat">{card.stat}</span>
        <span className="bcg-impact-stat-label">{card.statLabel}</span>
      </div>
      <p className="bcg-tag">{card.tag}</p>
      <h3 className="bcg-impact-title">{card.title}</h3>
      <p className="bcg-impact-text">{card.text}</p>
      <button className="bcg-link-btn">
        Learn More <ArrowRight size={14} />
      </button>
    </div>
  );
}

function ClientImpact() {
  const scrollerRef = useRef(null);
  return (
    <section className="bcg-section bcg-section-white">
      <div className="bcg-container">
        <div className="bcg-section-header">
          <h2 className="bcg-h2">Beyond Strategy. Real Impact.</h2>
          <button className="bcg-link-btn bcg-hide-mobile">
            See more stories <ArrowRight size={14} />
          </button>
        </div>
        <p className="bcg-section-lead">
          We turn ambition into outcomes that matter — building capabilities, scaling applied AI, and
          working shoulder to shoulder with clients to deliver transformation that sticks.
        </p>
        <div ref={scrollerRef} className="bcg-impact-scroller">
          {IMPACT_CARDS.map((c) => (
            <ImpactCard key={c.title} card={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICE_TABS = [
  {
    label: "Industries",
    value: "industries",
    description:
      "Our work covers the full range of industries. Explore the business areas where we help organizations create value, transform operations, and grow.",
  },
  {
    label: "Capabilities",
    value: "capabilities",
    description:
      "Building the capabilities that help our clients turn ambition into action—across AI, transformation, digital, and business strategy.",
  },
];

function ServicesPanelSection({ initialTab = "industries" }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0]);
  const [selectedCapability, setSelectedCapability] = useState(CAPABILITIES[0]);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  const currentTab = SERVICE_TABS.find((tab) => tab.value === activeTab);

  return (
    <section id="services" className="bcg-section bcg-section-grey">
      <div className="bcg-container bcg-services-panel">
        <aside className="bcg-services-sidebar">
          <div className="bcg-section-header">
            <h2 className="bcg-h2">Our Services</h2>
          </div>
          <p className="bcg-section-lead bcg-services-sidebar-lead">
            Explore the solutions we mobilize across industries, capabilities, and digital innovation.
          </p>
          <div className="bcg-services-sidebar-nav">
            {SERVICE_TABS.map((tab) => (
              <button
                type="button"
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`bcg-services-sidebar-link ${activeTab === tab.value ? "active" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </aside>
        <div className="bcg-services-content bcg-services-content-panel">
          <div className="bcg-services-content-main">
            <div className="bcg-section-header">
              <h2 className="bcg-h2">{currentTab.label}</h2>
            </div>
            <p className="bcg-section-lead">{currentTab.description}</p>

            {activeTab === "industries" && (
              <div id="industries" className="bcg-industry-list bcg-service-options-list">
                {INDUSTRIES.map((industry) => (
                  <button
                    key={industry.label}
                    type="button"
                    onClick={() => setSelectedIndustry(industry)}
                    className={`bcg-industry-item ${selectedIndustry.label === industry.label ? "active" : ""}`}
                  >
                    <span>{industry.label}</span>
                    <span className="bcg-industry-arrow">→</span>
                  </button>
                ))}
              </div>
            )}

            {activeTab === "capabilities" && (
              <div id="capabilities" className="bcg-capability-list bcg-service-options-list">
                {CAPABILITIES.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setSelectedCapability(item)}
                    className={`bcg-capability-item ${selectedCapability.label === item.label ? "active" : ""}`}
                  >
                    <span>{item.label}</span>
                    <span className="bcg-industry-arrow">→</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {activeTab === "industries" && (
            <aside className="bcg-industry-detail-panel">
              <img
                src={selectedIndustry.image}
                alt={selectedIndustry.label}
                className="bcg-industry-detail-img"
              />
              <div className="bcg-industry-detail-copy">
                <h3 className="bcg-industry-detail-title">{selectedIndustry.label}</h3>
                <p className="bcg-industry-detail-text">{selectedIndustry.description}</p>
                <a href={selectedIndustry.href} target="_blank" rel="noreferrer" className="bcg-industry-detail-btn">
                  Visit Page <ArrowRight size={14} />
                </a>
              </div>
            </aside>
          )}

          {activeTab === "capabilities" && (
            <aside className="bcg-industry-detail-panel">
              <img
                src={selectedCapability.image}
                alt={selectedCapability.label}
                className="bcg-industry-detail-img"
              />
              <div className="bcg-industry-detail-copy">
                <h3 className="bcg-industry-detail-title">{selectedCapability.label}</h3>
                <p className="bcg-industry-detail-text">{selectedCapability.description}</p>
                <a href={selectedCapability.href} target="_blank" rel="noreferrer" className="bcg-industry-detail-btn">
                  Visit Page <ArrowRight size={14} />
                </a>
              </div>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}

function CompanyPage({ page, onClose, fullPage }) {
  const pageMap = {
    about: {
      title: "About BCG",
      description:
        "Boston Consulting Group bridges the gap between ambition and outcomes. We team with organizations throughout the world to deliver transformative impact to lead this new era.",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=1200&q=80",
      buttonText: "Visit Page",
      buttonHref: "https://www.bcg.com/about/overview",
      links: [
        { label: "Our Purpose and People", href: "https://www.bcg.com/about/purpose-people" },
        { label: "Our Commitments", href: "https://www.bcg.com/about/commitments" },
        { label: "Our Expertise", href: "https://www.bcg.com/about/expertise" },
        { label: "Our History", href: "https://www.bcg.com/about/overview" },
        { label: "Ventora", value: "ventora", kind: "company" },
      ],
    },
    "client-impact": {
      title: "Client Impact",
      description:
        "BCG teams work shoulder to shoulder with clients to deliver outcomes that matter — from transformational operations and digital journeys to accelerated growth and value creation.",
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=1200&q=80",
      buttonText: "View Client Impact",
      buttonHref: "https://www.bcg.com/about/client-impact",
      links: [
        { label: "Featured Stories", href: "https://www.bcg.com/about/client-impact" },
        { label: "Transformation Examples", href: "https://www.bcg.com/about/client-impact" },
        { label: "AI and Analytics", href: "https://www.bcg.com/about/client-impact" },
      ],
    },
    ventora: {
      title: "Ventora",
      description:
        "Ventora is a strategic venture within BCG that incubates and scales innovative businesses and technology-enabled products to accelerate client impact.",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=1200&q=80",
      buttonText: "Visit Ventora",
      buttonHref: "https://www.bcg.com/ventora",
      links: [
        { label: "About Ventora", href: "https://www.bcg.com/ventora" },
        { label: "Ventora Offerings", href: "https://www.bcg.com/ventora#offerings" },
        { label: "Ventora Insights", href: "https://www.bcg.com/ventora#insights" },
      ],
    },
    careers: {
      title: "Beyond Is Where We Begin.",
      description: "When you start with Beyond there's no limit to how far we can advance the world.",
      image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1200&q=80",
      buttonText: "EXPLORE CAREERS",
      buttonHref: "https://www.bcg.com/careers",
      links: [
        { label: "Search Jobs", href: "#search-jobs" },
        { label: "Early Careers", href: "#early-careers" },
        { label: "Culture, Values, and Inclusion", href: "#culture-values" },
        { label: "Experienced Professionals", href: "#experienced" },
        { label: "Locations", href: "#locations" },
        { label: "Events", href: "#events" },
      ],
    },
    leadership: {
      title: "Leadership",
      description:
        "BCG’s leadership team brings deep expertise across industries, capabilities, and global markets to help clients address their most critical priorities.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1200&q=80",
      buttonText: "Meet Leadership",
      buttonHref: "https://www.bcg.com/leadership",
      links: [
        { label: "Global Leadership", href: "https://www.bcg.com/leadership" },
        { label: "CEO Biography", href: "https://www.bcg.com/about/people" },
        { label: "Leadership Insights", href: "https://www.bcg.com/leadership" },
      ],
    },
    offices: {
      title: "Offices",
      description:
        "BCG operates in more than 100 cities across more than 50 countries, bringing local insight and global perspective to our clients.",
      image: "https://images.unsplash.com/photo-1504384308090-c894ddcc538d?auto=format&fit=crop&w=1200&q=80",
      buttonText: "Explore Our Offices",
      buttonHref: "https://www.bcg.com/offices/default",
      links: [
        { label: "Office Locations", href: "https://www.bcg.com/offices/default" },
        { label: "Country Pages", href: "https://www.bcg.com/offices/default" },
        { label: "Contact Offices", href: "https://www.bcg.com/offices/default" },
      ],
    },
    newsroom: {
      title: "Corporate Newsroom",
      description:
        "Stay informed on the latest thinking, announcements, and news from BCG — including innovation, strategy, and business transformation.",
      image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80",
      buttonText: "Visit Newsroom",
      buttonHref: "https://www.bcg.com/newsroom",
      links: [
        { label: "Latest News", href: "https://www.bcg.com/newsroom" },
        { label: "Press Releases", href: "https://www.bcg.com/newsroom" },
        { label: "Media Contacts", href: "https://www.bcg.com/newsroom" },
      ],
    },
  };

  const pageData = pageMap[page] || pageMap.about;

  const compact = !fullPage && (page === "ventora" || page === "careers");

  return (
    <section className={`bcg-section bcg-section-white bcg-company-page ${compact ? "compact" : ""} ${fullPage ? "full-page" : ""}`}>
      <div className="bcg-container">
        {fullPage && (
          <div className="bcg-company-full-header">
            <button type="button" className="bcg-company-back" onClick={onClose}>
              ← Back
            </button>
          </div>
        )}
        {compact ? (
          <div className="bcg-company-compact-card">
            <div className="bcg-company-media-compact">
              <img src={pageData.image} alt={pageData.title} className="bcg-company-img-compact" />
            </div>
            <div className="bcg-company-copy-compact">
              <h2>{pageData.title}</h2>
              <p className="bcg-company-description">{pageData.description}</p>
              <a href={pageData.buttonHref} target="_blank" rel="noreferrer" className="bcg-btn-ventora">
                {pageData.buttonText} <ArrowRight size={14} />
              </a>
            </div>
            <div className="bcg-company-within">
              <h4>WITHIN ABOUT</h4>
              <div className="bcg-within-grid">
                {pageData.links.map((link) => (
                  <button
                    key={link.label}
                    type="button"
                    className="bcg-company-link-compact"
                    onClick={() => {
                      if (link.value && window.__showCompanyInline) window.__showCompanyInline(link.value);
                    }}
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bcg-company-grid">
            <div className="bcg-company-media">
              <img src={pageData.image} alt={pageData.title} className="bcg-company-img" />
            </div>
            <div className="bcg-company-copy">
              <h1>{pageData.title}</h1>
              <p className="bcg-company-description">{pageData.description}</p>
              <a href={pageData.buttonHref} target="_blank" rel="noreferrer" className="bcg-btn-primary">
                {pageData.buttonText} <ArrowRight size={16} />
              </a>
              <div className="bcg-company-links">
                {pageData.links.map((link) => (
                  link.kind === "company" ? (
                    <button
                      key={link.label}
                      type="button"
                      className="bcg-company-link"
                      onClick={() => {
                        if (typeof link.value !== "undefined" && link.value) {
                          if (window.__showCompanyInline) window.__showCompanyInline(link.value);
                        }
                      }}
                    >
                      {link.label}
                    </button>
                  ) : (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="bcg-company-link">
                      {link.label}
                    </a>
                  )
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function CareersBand({ onTrackClick }) {
  return (
    <section className="bcg-section bcg-section-black">
      <div className="bcg-container bcg-careers-grid">
        <div className="bcg-careers-visual">
          <img
            src="https://picsum.photos/seed/bcg-careers-team/700/600"
            alt="BCG team collaborating"
            className="bcg-careers-img"
          />
        </div>
        <div>
          <p className="bcg-tag bcg-tag-light">BCG Careers</p>
          <h2 className="bcg-h2 bcg-h2-light">Go Beyond the Expected</h2>
          <p className="bcg-careers-text">
            We're dedicated to helping clients do extraordinary things — and to unlocking the potential of
            the people who make that possible. Join us, and you can too.
          </p>
          <div className="bcg-careers-actions">
            <button className="bcg-btn-primary">
              Explore Careers <ArrowRight size={16} />
            </button>
            <button onClick={onTrackClick} className="bcg-btn-outline">
              Track Passport <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Insights() {
  return (
    <section id="insights" className="bcg-section bcg-section-white">
      <div className="bcg-container">
        <p className="bcg-tag">Featured Insights</p>
        <h2 className="bcg-h2 bcg-insights-heading">
          Thought leadership on the issues shaping the future of business and society
        </h2>
        <div className="bcg-insights-grid">
          {INSIGHTS.map((i) => (
            <div key={i.title} className="bcg-insight-card">
              <img src={i.image} alt={i.title} className="bcg-insight-img" />
              <p className="bcg-insight-tag">{i.tag}</p>
              <h3 className="bcg-insight-title">{i.title}</h3>
              <button className="bcg-link-btn">
                Read more <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>

        <div className="bcg-newsletter">
          <h3 className="bcg-newsletter-title">Get the latest industry insights delivered to you</h3>
          <div className="bcg-newsletter-form">
            <input type="email" placeholder="Your email" className="bcg-input" />
            <button className="bcg-btn-dark">Subscribe</button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ onTrackClick }) {
  const socials = [
    { Icon: Linkedin, label: "LinkedIn" },
    { Icon: Facebook, label: "Facebook" },
    { Icon: Twitter, label: "X" },
    { Icon: Instagram, label: "Instagram" },
    { Icon: Youtube, label: "YouTube" },
  ];
  return (
    <footer className="bcg-footer">
      <div className="bcg-container">
        <div className="bcg-footer-top">
          <div>
            <p className="bcg-footer-logo">VENTORA</p>
            <p className="bcg-footer-tagline">Unlocking the potential of those who advance the world.</p>
          </div>
          <div className="bcg-footer-links">
            {["Careers", "Alumni", "Offices", "Subscribe", "About"].map((l) => (
              <button key={l} type="button" className="bcg-footer-link">
                {l}
              </button>
            ))}
            <button type="button" onClick={onTrackClick} className="bcg-footer-link">
              Track Passport
            </button>
          </div>
          <div className="bcg-social-row">
            {socials.map(({ Icon, label }) => (
              <button key={label} type="button" aria-label={label} className="bcg-social-btn">
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>
        <div className="bcg-footer-bottom">
          <div className="bcg-footer-legal">
            <button type="button" className="bcg-footer-legal-link">Privacy Policy</button>
            <button type="button" className="bcg-footer-legal-link">Terms Of Use</button>
            <button type="button" className="bcg-footer-legal-link">Sitemap</button>
            <button type="button" className="bcg-footer-legal-link">Responsible Disclosure</button>
          </div>
          <p>© 2026 Boston Consulting Group (demo clone — for educational use only)</p>
        </div>
      </div>
    </footer>
  );
}

// onTrackClick: parent (App.jsx) passes this down to switch the page to TrackPassport
export default function Home({ onTrackClick }) {
  const [showServices, setShowServices] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [servicesTab, setServicesTab] = useState("industries");
  const [companyPage, setCompanyPage] = useState("about");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!showServices) return;
    const target = document.getElementById("services");
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  }, [showServices, servicesTab]);

  const handleShowServices = (tab = "industries") => {
    setShowCompany(false);
    setServicesTab(tab);
    setShowServices(true);
  };

  const handleShowCompany = (page = "about") => {
    setCompanyPage(page);
    setShowCompany(true);
    setShowServices(false);
  };

  const handleGoHome = () => {
    setShowCompany(false);
    setShowServices(false);
    setCompanyPage("about");
    setServicesTab("industries");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // expose a simple global hook so CompanyPage's internal buttons can request a company subpage
    window.__showCompanyInline = handleShowCompany;
    return () => {
      try {
        delete window.__showCompanyInline;
      } catch (e) {
        window.__showCompanyInline = undefined;
      }
    };
  }, [handleShowCompany]);

  return (
    <div className={`bcg-page${menuOpen ? " menu-open" : ""}`}>
      <Nav onTrackClick={onTrackClick} onShowServices={handleShowServices} onShowCompany={handleShowCompany} onGoHome={handleGoHome} onMenuToggle={setMenuOpen} />
      {showCompany ? (
        // render any company page as a separate full-page view (keep nav)
        <>
          <CompanyPage page={companyPage} fullPage onClose={() => setShowCompany(false)} />
        </>
      ) : (
        <>
          <Hero onTrackClick={onTrackClick} />
          <ClientImpact />
          {showServices && <ServicesPanelSection initialTab={servicesTab} />}
          {showCompany && <CompanyPage page={companyPage} />}
          <CareersBand onTrackClick={onTrackClick} />
          <Insights />
          <Footer onTrackClick={onTrackClick} />
        </>
      )}
    </div>
  );
}