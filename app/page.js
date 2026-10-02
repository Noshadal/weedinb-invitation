"use client";
import {useEffect,useState} from "react";
import {motion} from "framer-motion";
export default function Home(){
 const [open,setOpen]=useState(false),[rsvp,setRsvp]=useState(false),[time,setTime]=useState({d:0,h:0,m:0,s:0});
 useEffect(()=>{const target=new Date("2026-10-04T20:30:00+05:00").getTime();const tick=()=>{let x=Math.max(0,target-Date.now());setTime({d:Math.floor(x/86400000),h:Math.floor(x/3600000)%24,m:Math.floor(x/60000)%60,s:Math.floor(x/1000)%60})};tick();const id=setInterval(tick,1000);return()=>clearInterval(id)},[]);
 return <main>
  {!open&&<section className="cover"><div><p className="eyebrow">BISMILLAH</p><div className="monogram">N</div><p className="urdu-title">دعوتِ عقدِ نکاح</p><h1>Noman <span>&</span> His Beloved</h1><p className="muted">A timeless invitation to a beautiful beginning</p><button onClick={()=>setOpen(true)}>Open Invitation</button></div></section>}
  <motion.section className="hero" initial={{opacity:0}} animate={{opacity:1}}><div className="hero-overlay"/><div className="hero-content"><p className="eyebrow">WITH THE BLESSINGS OF ALLAH</p><h2>A beautiful beginning,<br/><i>together.</i></h2><p>We invite you to celebrate this blessed occasion with us.</p></div></motion.section>
  <section className="paper intro"><p className="urdu-copy">نومان سومرو<br/>ولدِ محترم نور محمد سومرو<br/>کے نکاحِ مسنونہ کی پُربہار تقریب<br/>کے ساتھ<br/>اللہ رب العزت کے فضل و کرم سے</p></section>
  <section className="paper date-card"><p className="eyebrow">THE DATE</p><div className="scratch">4 OCTOBER 2026</div><p>After Isha Prayer</p></section>
  <section className="story"><p className="eyebrow">OUR STORY</p><h2>From this day,<br/><i>a new chapter begins.</i></h2><p>Two families, one beautiful gathering, and a moment to remember.</p></section>
  <section className="paper details"><div><p className="eyebrow">DATE</p><h3>4 October 2026</h3><p>After Isha Prayer</p></div><div><p className="eyebrow">VENUE</p><h3>Wedding Venue</h3><p>Details to be added</p><a href="https://maps.google.com" target="_blank">Open in Google Maps →</a></div></section>
  <section className="timeline"><p className="eyebrow">THE EVENING</p><h2>Wedding Timeline</h2>{["Guest Arrival","Nikah Ceremony","Dinner & Celebration"].map((x,i)=><div className="timeline-row" key={x}><span>0{i+1}</span><div><h3>{x}</h3><p>{["Guests are welcomed","A blessed beginning","An evening with family"][i]}</p></div></div>)}</section>
  <section className="countdown paper"><p className="eyebrow">COUNTING DOWN</p><h2>The moment is near.</h2><div className="count-grid">{Object.entries({Days:time.d,Hours:time.h,Minutes:time.m,Seconds:time.s}).map(([k,v])=><div key={k}><strong>{String(v).padStart(2,"0")}</strong><span>{k}</span></div>)}</div></section>
  <section className="gallery"><p className="eyebrow">A GLIMPSE</p><h2>Moments to remember</h2><div className="gallery-grid">{["https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=80","https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=900&q=80"].map(src=><img src={src} alt="" key={src}/>)}</div></section>
  <section className="rsvp paper"><p className="eyebrow">RSVP</p><h2>We would be honored<br/>to have you with us.</h2><button onClick={()=>setRsvp(true)}>Confirm Attendance</button></section>
  <footer><div className="monogram small">N</div><p>With love, Noman & Family</p></footer>
  {rsvp&&<div className="modal" onClick={()=>setRsvp(false)}><div className="modal-card" onClick={e=>e.stopPropagation()}><button className="close" onClick={()=>setRsvp(false)}>×</button><p className="eyebrow">RSVP</p><h2>Will you join us?</h2><input placeholder="Your name"/><input placeholder="Guests"/><button onClick={()=>setRsvp(false)}>Send RSVP</button></div></div>}
 </main>
}