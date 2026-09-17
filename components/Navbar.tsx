"use client";
import { useState } from "react";
import Link from "next/link";
import { site } from "@/content/site";

export default function Navbar(){
  const [open,setOpen]=useState(false);
  const close=()=>setOpen(false);
  return <nav className="site-nav"><div className="shell nav-inner">
    <Link href="/" className="brand" onClick={close}><span className="brand-mark">R</span>{site.brand}</Link>
    <div className="nav-links"><Link href="/services">{site.nav.services}</Link><Link href="/about">{site.nav.about}</Link><a href={site.phoneHref}>{site.phoneDisplay}</a><Link href="/book" className="nav-cta">{site.nav.book} →</Link></div>
    <button className="menu-button" onClick={()=>setOpen(!open)} aria-expanded={open} aria-label="Toggle menu"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={open?"M6 6l12 12M18 6L6 18":"M4 7h16M4 12h16M4 17h16"}/></svg></button>
  </div>{open&&<div className="mobile-menu"><Link href="/services" onClick={close}>{site.nav.services}</Link><Link href="/about" onClick={close}>{site.nav.about}</Link><a href={site.phoneHref}>{site.phoneDisplay}</a><Link href="/book" onClick={close}>Book a free check-up →</Link></div>}</nav>
}
