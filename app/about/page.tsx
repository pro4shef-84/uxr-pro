import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/content/site";
import FadeIn from "@/components/FadeIn";
export const metadata:Metadata={title:"Why Random Creation",description:site.about.intro};
export default function About(){return <><section className="inner-hero"><div className="shell"><FadeIn><p className="eyebrow">Why Random Creation</p><h1>{site.about.headline}</h1><p>{site.about.intro}</p></FadeIn></div></section><section className="page-section"><div className="shell about-grid"><FadeIn><div className="about-badge"><strong>15+</strong><p>years building and operating small businesses</p></div></FadeIn><FadeIn delay={80}><div className="about-copy">{site.about.body.split("\n\n").map(x=><p key={x}>{x}</p>)}<Link href="/book" className="btn-primary">Book a conversation →</Link></div></FadeIn></div></section></>}
