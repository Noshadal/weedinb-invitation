"use client";

import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

const target = new Date("2026-10-04T20:30:00+05:00").getTime();

function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const x = Math.max(0, target - Date.now());
      setT({ d: Math.floor(x / 86400000), h: Math.floor(x / 3600000) % 24, m: Math.floor(x / 60000) % 60, s: Math.floor(x / 1000) % 60 });
    };
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, []);
  return <div className="mx-auto mt-10 grid max-w-3xl grid-cols-4 border-y border-[#c9a55d]/30">
    {Object.entries({ Days:t.d, Hours:t.h, Minutes:t.m, Seconds:t.s }).map(([k,v]) => <div key={k} className="border-r border-[#c9a55d]/20 px-2 py-7 text-center last:border-0"><strong className="block font-serif text-4xl sm:text-6xl">{String(v).padStart(2,"0")}</strong><span className="mt-2 block text-[9px] uppercase tracking-[.28em] text-[#d6c5a6]">{k}</span></div>)}
  </div>;
}

export default function Home() {
  const [opened,setOpened] = useState(false);
  const [rsvp,setRsvp] = useState(false);
  const [scope,animate] = useAnimate();

  async function openInvitation() {
    await animate(".seal",{scale:[1,1.1,.75,0],opacity:[1,1,.8,0],filter:["drop-shadow(0 0 0 transparent)","drop-shadow(0 0 22px rgba(255,218,130,.9))","drop-shadow(0 0 8px rgba(255,218,130,.4))","drop-shadow(0 0 0 transparent)"]},{duration:.85,ease:"easeInOut"});
    setOpened(true);
  }

  return <main ref={scope} className="min-h-screen overflow-hidden bg-[#fdfbf7] text-[#292219]">
    <AnimatePresence>{!opened && <motion.section key="envelope" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 grid place-items-center bg-[#fdfbf7] px-5">
      <div className="w-full max-w-[680px] [perspective:1200px]">
        <div className="relative aspect-[1.55] rounded bg-[#eadfc9] shadow-[0_35px_100px_rgba(63,42,18,.24)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,.7),transparent_30%),linear-gradient(135deg,#f1e8d8,#dfceb0)]"/>
          <div className="absolute inset-[2.5%] border border-[#b58b4c]/25"/>
          <div className="absolute inset-x-0 bottom-0 z-20 h-[74%] bg-[#e7dac0] [clip-path:polygon(0_0,50%_52%,100%_0,100%_100%,0_100%)]"/>
          <motion.div className="absolute inset-x-0 top-0 z-30 h-[70%] origin-top bg-[#f0e5d0] [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-[0_12px_24px_rgba(54,37,18,.12)]" animate={{rotateX:opened?-170:0,opacity:opened?0:1}} transition={{duration:1,ease:[.16,1,.3,1]}} style={{transformStyle:"preserve-3d"}}/>
          <motion.button type="button" aria-label="Open invitation" onClick={openInvitation} className="seal absolute left-1/2 top-1/2 z-40 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#f2d58e] bg-[radial-gradient(circle_at_32%_24%,#ffe9a8,#d7a947_38%,#a97021_72%,#704715)] shadow-[0_12px_26px_rgba(75,48,14,.4),inset_0_3px_6px_rgba(255,255,255,.55),inset_0_-5px_9px_rgba(76,43,5,.35)] transition-transform hover:scale-105 sm:h-28 sm:w-28" whileTap={{scale:.94}}>
            <span className="grid h-[72%] w-[72%] place-items-center rounded-full border border-[#fff0b8]/60 font-serif text-sm font-semibold tracking-[.18em] text-[#fff4ce] drop-shadow-[0_2px_2px_rgba(52,29,0,.65)]">N &amp; B</span>
          </motion.button>
        </div>
        <p className="mt-7 text-center font-serif text-[10px] uppercase tracking-[.4em] text-[#90703d]">Tap the seal to open</p>
      </div>
    </motion.section>}</AnimatePresence>

    <motion.div initial={{opacity:0,scale:.97,y:35}} animate={{opacity:opened?1:0,scale:opened?1:.97,y:opened?0:35}} transition={{duration:1.05,delay:.18,ease:[.16,1,.3,1]}}>
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-5 border border-[#b98a3b]/30 sm:inset-9"/><div className="absolute inset-8 border border-[#b98a3b]/15 sm:inset-13"/>
        <div className="relative max-w-4xl"><p className="font-serif text-[10px] uppercase tracking-[.45em] text-[#9c783d]">Bismillah ir-Rahman ir-Raheem</p><p dir="rtl" className="mt-9 font-serif text-2xl text-[#9c783d]">دعوتِ عقدِ نکاح</p><h1 className="mt-5 font-serif text-7xl font-medium sm:text-9xl">N &amp; B</h1><div className="mx-auto mt-8 flex justify-center gap-4 text-[#b98a3b]"><span>—</span><span>✦</span><span>—</span></div><h2 className="mt-8 font-serif text-4xl leading-none sm:text-6xl">Welcome to the Nikkah Ceremony</h2><p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#756d63] sm:text-base">A graceful beginning, shared with family and loved ones.</p><div className="mt-9 flex flex-wrap justify-center gap-3 text-[10px] uppercase tracking-[.25em] text-[#92713d]"><span>4 October 2026</span><span>•</span><span>After Isha Prayer</span></div></div>
      </section>

      <section className="px-6 py-24 text-center sm:py-32"><div className="mx-auto max-w-4xl border-y border-[#b98a3b]/25 px-5 py-14 sm:px-12"><p className="text-[10px] uppercase tracking-[.35em] text-[#9c783d]">The Invitation</p><p dir="rtl" className="mt-9 font-serif text-[23px] leading-[2.25] sm:text-4xl">نومان سومرو<br/>ولدِ محترم نور محمد سومرو<br/>کے نکاحِ مسنونہ کی پُربہار تقریب<br/>عبدالكريم سومرو کی نورِ نظر<br/>کے ساتھ<br/>اللہ رب العزت کے فضل و کرم سے<br/>مورخہ 4 October 2026<br/>بعد از نمازِ عشاء<br/>منعقد ہوگی۔</p></div></section>

      <section className="bg-[#f1eadf] px-6 py-24 sm:py-32"><div className="mx-auto max-w-6xl"><p className="text-[10px] uppercase tracking-[.35em] text-[#9c783d]">The Details</p><div className="mt-10 grid gap-8 md:grid-cols-3">{[["01","DATE","4 October 2026","After Isha Prayer"],["02","VENUE","Wedding Venue","Venue details to be added"],["03","DRESS CODE","Royal Elegance","Formal / Traditional"]].map(([n,l,t,d])=><div key={n} className="border-t border-[#b98a3b]/30 pt-5"><div className="flex justify-between text-[10px] uppercase tracking-[.25em] text-[#9c783d]"><span>{n}</span><span>{l}</span></div><h3 className="mt-6 font-serif text-4xl">{t}</h3><p className="mt-3 text-sm text-[#756d63]">{d}</p>{l==="VENUE"&&<a className="mt-5 inline-block text-[10px] uppercase tracking-[.2em] text-[#9c783d] underline underline-offset-8" href="https://maps.google.com" target="_blank">Open Google Maps</a>}</div>)}</div></div></section>

      <section className="px-6 py-24 text-center sm:py-32"><p className="text-[10px] uppercase tracking-[.35em] text-[#9c783d]">Counting Down</p><h2 className="mt-5 font-serif text-5xl sm:text-7xl">Until the moment</h2><Countdown/></section>
      <section className="bg-[#211b15] px-6 py-24 text-center text-[#fdfbf7] sm:py-32"><p className="text-[10px] uppercase tracking-[.35em] text-[#c9a55d]">A Celebration of Love &amp; Family</p><h2 className="mx-auto mt-7 max-w-3xl font-serif text-5xl leading-none sm:text-7xl">We would be honored to have you with us.</h2><button onClick={()=>setRsvp(true)} className="mt-10 border border-[#c9a55d] bg-transparent px-9 py-4 text-[10px] uppercase tracking-[.3em] text-[#f5e4bf]">RSVP</button></section>
      <footer className="border-t border-[#b98a3b]/20 px-6 py-16 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#b98a3b]/45 font-serif text-xl text-[#9c783d]">N &amp; B</div><p className="mt-5 font-serif text-xl">With love &amp; duas</p></footer>
    </motion.div>

    <AnimatePresence>{rsvp&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setRsvp(false)} className="fixed inset-0 z-[60] grid place-items-center bg-black/55 p-5"><motion.div initial={{y:30,scale:.96}} animate={{y:0,scale:1}} onClick={e=>e.stopPropagation()} className="w-full max-w-md bg-[#fdfbf7] p-8 shadow-2xl sm:p-10"><div className="flex justify-between"><p className="text-[10px] uppercase tracking-[.3em] text-[#9c783d]">RSVP</p><button onClick={()=>setRsvp(false)} className="text-2xl">×</button></div><h3 className="mt-5 font-serif text-5xl">Will you join us?</h3><input className="mt-8 w-full border-b border-[#b98a3b]/40 bg-transparent p-3 outline-none" placeholder="Your name"/><input className="mt-4 w-full border-b border-[#b98a3b]/40 bg-transparent p-3 outline-none" placeholder="Number of guests"/><button onClick={()=>setRsvp(false)} className="mt-8 w-full bg-[#211b15] px-6 py-4 text-[10px] uppercase tracking-[.25em] text-white">Send RSVP</button></motion.div></motion.div>}</AnimatePresence>
  </main>;
}