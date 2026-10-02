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
  const [phase, setPhase] = useState<"closed" | "opening" | "opened">("closed");
  const [rsvp, setRsvp] = useState(false);
  const [scope, animate] = useAnimate();

  async function openInvitation() {
    if (phase !== "closed") return;
    setPhase("opening");
    await animate(".seal", {
      scale: [1, 1.08, 0.78, 0],
      opacity: [1, 1, 0.65, 0],
      filter: [
        "drop-shadow(0 0 0 transparent)",
        "drop-shadow(0 0 16px rgba(243,226,169,.75))",
        "drop-shadow(0 0 30px rgba(243,226,169,.95))",
        "drop-shadow(0 0 0 transparent)"
      ]
    }, { duration: 0.85, ease: "easeInOut" });
    await new Promise(resolve => setTimeout(resolve, 180));
    setPhase("opened");
  }

  const opened = phase === "opened";

  return <main ref={scope} className="min-h-screen overflow-hidden bg-[#fcf8f2] text-[#292219]">
    <AnimatePresence>
      {phase !== "opened" && (
        <motion.section
          key="album"
          className="fixed inset-0 z-50 grid place-items-center overflow-hidden bg-[#fcf8f2] px-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: .55 }}
        >
          <div className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(94,72,42,.13)_0.6px,transparent_0.8px),radial-gradient(rgba(255,255,255,.8)_0.7px,transparent_1px)] [background-position:0_0,4px_4px] [background-size:7px_7px]" />

          <div className="relative h-[min(86vw,720px)] w-[min(86vw,720px)] [perspective:1500px]">
            <div className="absolute inset-0 rounded-full border border-[#b38728]/25 shadow-[0_35px_100px_rgba(80,58,25,.14)]" />
            <div className="absolute inset-[3%] rounded-full border border-[#b38728]/20" />

            <svg className="absolute inset-[5%] h-[90%] w-[90%] overflow-visible" viewBox="0 0 600 600" aria-hidden="true">
              <defs>
                <filter id="embossAlbum" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2.4" result="blur"/>
                  <feOffset dx="2" dy="2" result="off"/>
                  <feComposite in="SourceGraphic" in2="off" operator="arithmetic" k2="1" k3="-1" result="raised"/>
                  <feDropShadow dx="-1.5" dy="-1.5" stdDeviation="1.2" floodColor="#fff" floodOpacity=".75"/>
                  <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="#8c6825" floodOpacity=".32"/>
                </filter>
                <radialGradient id="goldLine" cx="50%" cy="30%">
                  <stop offset="0%" stopColor="#f7e7ad"/>
                  <stop offset="48%" stopColor="#d8b75d"/>
                  <stop offset="100%" stopColor="#9d711d"/>
                </radialGradient>
              </defs>
              <g fill="none" stroke="url(#goldLine)" strokeWidth="2.1" filter="url(#embossAlbum)" opacity=".78">
                <circle cx="300" cy="300" r="255"/>
                <circle cx="300" cy="300" r="220" strokeDasharray="2 10" opacity=".7"/>
                <path d="M300 45c-24 45-67 35-78 82-8 34 24 55 3 82-18 23-58 5-72 38-14 34 20 55 5 86-15 31-57 18-63 54-7 38 36 48 36 79"/>
                <path d="M300 45c24 45 67 35 78 82 8 34-24 55-3 82 18 23 58 5 72 38 14 34-20 55-5 86 15 31 57 18 63 54 7 38-36 48-36 79"/>
                <path d="M155 118c39 14 54 42 42 72-12 30-49 31-61 2-13-31 11-57 45-50"/>
                <path d="M445 118c-39 14-54 42-42 72 12 30 49 31 61 2 13-31-11-57-45-50"/>
              </g>
            </svg>

            <div className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle_at_35%_25%,#fffaf0,#efe4d1_58%,#d8c5a5)] shadow-[inset_0_2px_8px_rgba(255,255,255,.9),inset_0_-14px_28px_rgba(104,76,35,.14),0_20px_50px_rgba(70,49,20,.12)]">
              <div className="absolute inset-[5%] rounded-full border border-[#b38728]/30" />
              <div className="absolute inset-[11%] rounded-full border border-dashed border-[#b38728]/25" />

              <motion.button
                type="button"
                aria-label="Open invitation"
                onClick={openInvitation}
                className="seal absolute left-1/2 top-1/2 z-40 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#f6df9e] bg-[radial-gradient(circle_at_30%_22%,#fff0b7,#e1bd62_38%,#b38728_72%,#795316)] shadow-[0_12px_30px_rgba(74,48,13,.38),inset_0_3px_6px_rgba(255,255,255,.62),inset_0_-7px_10px_rgba(71,41,4,.35)] sm:h-36 sm:w-36"
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: .96 }}
              >
                <span className="grid h-[72%] w-[72%] place-items-center rounded-full border border-[#fff0b8]/60 font-serif text-lg font-semibold tracking-[.16em] text-[#fff7dc] drop-shadow-[0_2px_2px_rgba(52,29,0,.65)]">
                  N &amp; B
                </span>
              </motion.button>
            </div>

            <AnimatePresence>
              {phase === "opening" && (
                <motion.div
                  className="pointer-events-none absolute left-1/2 top-1/2 z-30 h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#e8cc78]"
                  initial={{ rotate: 0, opacity: 0, scale: .92 }}
                  animate={{ rotate: 360, opacity: [0, 1, 1, 0], scale: [0.92, 1.02, 1.02, 1.08] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: .85, ease: "easeInOut" }}
                  style={{ boxShadow: "0 0 18px rgba(232,204,120,.75), inset 0 0 10px rgba(255,240,180,.45)" }}
                />
              )}
            </AnimatePresence>
          </div>

          <p className="absolute bottom-8 left-0 right-0 text-center font-serif text-[10px] uppercase tracking-[.38em] text-[#90703d]">
            Tap to open
          </p>
        </motion.section>
      )}
    </AnimatePresence>

    <motion.div initial={{ opacity: 0, y: 45, scale: .985 }} animate={{ opacity: opened ? 1 : 0, y: opened ? 0 : 45, scale: opened ? 1 : .985 }} transition={{ duration: .9, ease: [.16,1,.3,1] }}>
      <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div className="absolute inset-5 border border-[#b98a3b]/30 sm:inset-9"/>
        <div className="absolute inset-8 border border-[#b98a3b]/15 sm:inset-13"/>
        <div className="relative max-w-4xl">
          <p className="font-serif text-[10px] uppercase tracking-[.45em] text-[#9c783d]">Bismillah ir-Rahman ir-Raheem</p>
          <p dir="rtl" className="mt-9 font-serif text-2xl text-[#9c783d]">دعوتِ عقدِ نکاح</p>
          <h1 className="mt-5 font-serif text-7xl font-medium sm:text-9xl">N &amp; B</h1>
          <div className="mx-auto mt-8 flex justify-center gap-4 text-[#b98a3b]"><span>—</span><span>✦</span><span>—</span></div>
          <h2 className="mt-8 font-serif text-4xl leading-none sm:text-6xl">Welcome to the Nikkah Ceremony</h2>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-7 text-[#756d63] sm:text-base">A graceful beginning, shared with family and loved ones.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3 text-[10px] uppercase tracking-[.25em] text-[#92713d]"><span>4 October 2026</span><span>•</span><span>After Isha Prayer</span></div>
        </div>
      </section>

      <section className="px-6 py-24 text-center sm:py-32">
        <div className="mx-auto max-w-4xl border-y border-[#b98a3b]/25 px-5 py-14 sm:px-12">
          <p className="text-[10px] uppercase tracking-[.35em] text-[#9c783d]">The Invitation</p>
          <p dir="rtl" className="mt-9 font-serif text-[23px] leading-[2.25] sm:text-4xl">
            نومان سومرو<br/>ولدِ محترم نور محمد سومرو<br/>کے نکاحِ مسنونہ کی پُربہار تقریب<br/>عبدالكريم سومرو کی نورِ نظر<br/>کے ساتھ<br/>اللہ رب العزت کے فضل و کرم سے<br/>مورخہ 4 October 2026<br/>بعد از نمازِ عشاء<br/>منعقد ہوگی۔<br/>اس پُرمسرت موقع پر آپ کی تشریف آوری<br/>ہمارے لیے باعثِ عزت و مسرت ہوگی۔<br/>ہمراہ<br/>ریحان سومرو و نوشاد سومرو<br/>بصدِ خوشی شرکت میں<br/>حاجی ابراہیم سومرو<br/>نور محمد سومرو<br/>بیگم نور محمد سومرو
          </p>
        </div>
      </section>

      <section className="bg-[#f1eadf] px-6 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <p className="text-[10px] uppercase tracking-[.35em] text-[#9c783d]">The Details</p>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[["01","DATE","4 October 2026","After Isha Prayer"],["02","VENUE","Wedding Venue","Venue details to be added"],["03","DRESS CODE","Royal Elegance","Formal / Traditional"]].map(([n,l,t,d]) =>
              <div key={n} className="border-t border-[#b98a3b]/30 pt-5">
                <div className="flex justify-between text-[10px] uppercase tracking-[.25em] text-[#9c783d]"><span>{n}</span><span>{l}</span></div>
                <h3 className="mt-6 font-serif text-4xl">{t}</h3><p className="mt-3 text-sm text-[#756d63]">{d}</p>
                {l==="VENUE" && <a className="mt-5 inline-block text-[10px] uppercase tracking-[.2em] text-[#9c783d] underline underline-offset-8" href="https://maps.google.com" target="_blank">Open Google Maps</a>}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-24 text-center sm:py-32"><p className="text-[10px] uppercase tracking-[.35em] text-[#9c783d]">Counting Down</p><h2 className="mt-5 font-serif text-5xl sm:text-7xl">Until the moment</h2><Countdown/></section>
      <section className="bg-[#211b15] px-6 py-24 text-center text-[#fdfbf7] sm:py-32"><p className="text-[10px] uppercase tracking-[.35em] text-[#c9a55d]">A Celebration of Love &amp; Family</p><h2 className="mx-auto mt-7 max-w-3xl font-serif text-5xl leading-none sm:text-7xl">We would be honored to have you with us.</h2><button onClick={()=>setRsvp(true)} className="mt-10 border border-[#c9a55d] bg-transparent px-9 py-4 text-[10px] uppercase tracking-[.3em] text-[#f5e4bf]">RSVP</button></section>
      <footer className="border-t border-[#b98a3b]/20 px-6 py-16 text-center"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[#b98a3b]/45 font-serif text-xl text-[#9c783d]">N &amp; B</div><p className="mt-5 font-serif text-xl">With love &amp; duas</p></footer>
    </motion.div>

    <AnimatePresence>
      {rsvp && <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setRsvp(false)} className="fixed inset-0 z-[60] grid place-items-center bg-black/55 p-5">
        <motion.div initial={{y:30,scale:.96}} animate={{y:0,scale:1}} onClick={e=>e.stopPropagation()} className="w-full max-w-md bg-[#fdfbf7] p-8 shadow-2xl sm:p-10">
          <div className="flex justify-between"><p className="text-[10px] uppercase tracking-[.3em] text-[#9c783d]">RSVP</p><button onClick={()=>setRsvp(false)} className="text-2xl">×</button></div>
          <h3 className="mt-5 font-serif text-5xl">Will you join us?</h3>
          <input className="mt-8 w-full border-b border-[#b98a3b]/40 bg-transparent p-3 outline-none" placeholder="Your name"/>
          <input className="mt-4 w-full border-b border-[#b98a3b]/40 bg-transparent p-3 outline-none" placeholder="Number of guests"/>
          <button onClick={()=>setRsvp(false)} className="mt-8 w-full bg-[#211b15] px-6 py-4 text-[10px] uppercase tracking-[.25em] text-white">Send RSVP</button>
        </motion.div>
      </motion.div>}
    </AnimatePresence>
  </main>;
}
