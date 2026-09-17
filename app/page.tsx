import Link from "next/link";
import { site } from "@/content/site";
import FadeIn from "@/components/FadeIn";

const Arrow = () => <span aria-hidden="true">→</span>;
const Check = () => <span className="check" aria-hidden="true">✓</span>;

function ActivityMockup() {
  return <div className="activity-wrap" aria-label="Example activity dashboard showing handled customer enquiries">
    <div className="activity-card">
      <div className="activity-top"><div><span className="live-dot" /> Live activity</div><span className="status-pill">All systems on</span></div>
      <div className="metric-row"><div><strong>12</strong><span>enquiries handled</span></div><div><strong>7</strong><span>appointments booked</span></div><div><strong>0</strong><span>missed today</span></div></div>
      <div className="activity-list">
        <div className="activity-item"><span className="icon-bubble">☎</span><div><b>New call answered</b><small>New customer · HVAC repair</small></div><time>2m</time></div>
        <div className="activity-item"><span className="icon-bubble">✓</span><div><b>Appointment booked</b><small>Tomorrow · 10:30 AM</small></div><time>8m</time></div>
        <div className="activity-item"><span className="icon-bubble">★</span><div><b>Review reply posted</b><small>Google Business Profile</small></div><time>1h</time></div>
      </div>
      <div className="owner-note"><span>ST</span><p><b>Handled for you.</b><br />I keep an eye on every interaction.</p></div>
    </div>
    <div className="float-card float-one"><span>↗</span><div><b>Lead recovered</b><small>After-hours call</small></div></div>
    <div className="float-card float-two"><span>5.0</span><div><b>New review</b><small>Replied in your voice</small></div></div>
  </div>;
}

export default function Home() {
  return <>
    <section className="hero section-pad"><div className="shell hero-grid">
      <FadeIn className="hero-copy"><p className="eyebrow">{site.hero.eyebrow}</p><h1>{site.hero.headline}</h1><p className="hero-sub">{site.hero.subheadline}</p><div className="button-row"><Link href="/book" className="btn-primary">{site.hero.cta} <Arrow /></Link><Link href="#services" className="btn-secondary">{site.hero.secondary}</Link></div><p className="microcopy"><Check /> {site.hero.meta}</p></FadeIn>
      <FadeIn delay={120}><ActivityMockup /></FadeIn>
    </div></section>
    <section className="proof-strip"><div className="shell proof-row">{site.proof.map(x => <span key={x}><Check /> {x}</span>)}</div></section>
    <section className="section-pad why-section"><div className="shell why-grid"><FadeIn><div className="why-intro"><p className="eyebrow">{site.why.eyebrow}</p><h2>{site.why.title}</h2><p className="section-copy">{site.why.description}</p><Link href="/about" className="text-link dark-link">Meet the operator behind it <Arrow /></Link></div></FadeIn><div className="why-items">{site.why.items.map((item,i)=><FadeIn key={item.title} delay={i*60}><article className="why-item"><span>0{i+1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article></FadeIn>)}</div></div></section>
    <section id="services" className="section-pad"><div className="shell"><FadeIn><div className="section-heading"><p className="eyebrow">What we handle</p><h2>From first ring to five-star review.</h2><p>One connected service designed around the moments that turn interest into revenue.</p></div></FadeIn><div className="service-grid">{site.three.map((item, i) => <FadeIn key={item.num} delay={i * 90}><article className="service-card"><div className="service-number">{item.num}</div><span className="service-tag">{item.tag}</span><h3>{item.title}</h3><p>{item.description}</p><div className="service-outcome"><Check /> {item.outcome}</div></article></FadeIn>)}</div></div></section>
    <section className="section-pad dark-section"><div className="shell split-grid"><FadeIn><div><p className="eyebrow light">{site.walkthrough.eyebrow}</p><h2>{site.walkthrough.title}</h2><p className="section-copy">{site.walkthrough.description}</p><Link href="/book" className="text-link">Book my free check-up <Arrow /></Link></div></FadeIn><FadeIn delay={100}><div className="audit-card"><p className="audit-label">Your free business check-up</p>{site.walkthrough.points.map((p, i) => <div className="audit-row" key={p}><span>0{i + 1}</span><p>{p}</p></div>)}<div className="audit-footer">No deck. No pressure. Just useful findings.</div></div></FadeIn></div></section>
    <section className="section-pad audience-section"><div className="shell split-grid align-center"><FadeIn><div><p className="eyebrow">{site.who.eyebrow}</p><h2>{site.who.title}</h2><p className="section-copy">{site.who.description}</p></div></FadeIn><FadeIn delay={100}><div className="industry-grid">{site.who.industries.map((x, i) => <div key={x}><span>{["✚","⌂","⚙","✦","♡","◎"][i]}</span>{x}</div>)}</div></FadeIn></div></section>
    <section className="section-pad process-section"><div className="shell"><FadeIn><div className="section-heading center"><p className="eyebrow">Simple by design</p><h2>Start small. Fix what matters. Keep it working.</h2></div></FadeIn><div className="process-grid">{site.process.map((step, i) => <FadeIn key={step.num} delay={i * 90}><div className="process-card"><span>{step.num}</span><h3>{step.title}</h3><p>{step.description}</p></div></FadeIn>)}</div></div></section>
    <section className="section-pad"><div className="shell ai-panel"><FadeIn><div className="ai-mark">AI<span>+</span></div></FadeIn><FadeIn delay={80}><div><p className="eyebrow">{site.ai.eyebrow}</p><h2>{site.ai.title}</h2><p className="section-copy">{site.ai.description}</p></div></FadeIn></div></section>
    <section className="section-pad faq-section"><div className="shell faq-grid"><FadeIn><div><p className="eyebrow">Questions, answered</p><h2>What business owners usually ask.</h2></div></FadeIn><div className="faq-list">{site.faqs.map((f, i) => <FadeIn key={f.q} delay={i * 50}><details><summary>{f.q}<span>+</span></summary><p>{f.a}</p></details></FadeIn>)}</div></div></section>
    <section className="closing"><div className="shell"><FadeIn><p className="eyebrow light">{site.closing.eyebrow}</p><h2>{site.closing.title}</h2><p>{site.closing.description}</p><div className="button-row center-row"><Link href="/book" className="btn-light">{site.closing.cta} <Arrow /></Link><a href={site.phoneHref} className="phone-link">or call {site.phoneDisplay}</a></div></FadeIn></div></section>
  </>;
}
