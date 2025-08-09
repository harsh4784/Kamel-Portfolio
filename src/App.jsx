import { motion } from 'framer-motion';
import { useState } from 'react';
import './App.css';
import RecommendationStack from './components/RecommendationStack.jsx';

// Placeholder data (replace with real LinkedIn data manually later)
// Added first entry referencing local profile image so the uploaded photo is visible in the stack.
const recommendations = [
  { name: 'Kamel Hothi OBE', title: 'Board Advisor & Keynote Speaker', text: 'Committed to empowering inclusive leadership and sustainable growth.', image: '/profile.jpg' },
  { name: 'John Doe', title: 'CEO, Example Corp', text: 'Kamel is an outstanding leader and visionary. Her dedication and expertise are unmatched.', image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&auto=format&fit=crop&crop=faces' },
  { name: 'Jane Smith', title: 'COO, Business Ltd.', text: 'Her strategic thinking and compassion make her a true asset to any organization.', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&auto=format&fit=crop&crop=faces' },
  { name: 'Michael Lee', title: 'Director, Global Ventures', text: "Kamel's professionalism and drive inspire everyone around her.", image: 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&auto=format&fit=crop&crop=faces' },
  { name: 'Amelia Rivers', title: 'Chief People Officer', text: 'She elevates every room she enters and builds bridges across cultures and sectors.', image: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=300&auto=format&fit=crop&crop=faces' },
  { name: 'Raj Patel', title: 'SVP, Strategy & Growth', text: 'Her board advisory guidance unlocked alignment and velocity across divisions.', image: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=301&auto=format&fit=crop&crop=faces' },
  { name: 'Elena García', title: 'Head of People Transformation', text: 'A rare blend of vision, pragmatism and deep human understanding.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&crop=faces' },
];

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Impact', href: '#impact' },
  { label: 'Speaking', href: '#speaking' },
  { label: 'Recommendations', href: '#recommendations' },
];

function GlassPane({ children, className = '' }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.1)] ${className}`}>
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 via-transparent to-white/5" />
      <div className="relative z-10 p-6">{children}</div>
    </div>
  );
}

function GradientText({ children, className = '' }) {
  return (
    <span className={`bg-gradient-to-r from-fuchsia-300 via-pink-300 to-amber-200 bg-clip-text text-transparent ${className}`}>{children}</span>
  );
}

function FloatingOrbs() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute w-[40rem] h-[40rem] -top-40 -left-40 bg-fuchsia-600/30 rounded-full blur-[140px] animate-pulse" />
      <div className="absolute w-[32rem] h-[32rem] bottom-0 -right-20 bg-indigo-600/30 rounded-full blur-[120px] animate-pulse [animation-delay:800ms]" />
      <div className="absolute w-[28rem] h-[28rem] top-1/3 right-1/4 bg-cyan-500/25 rounded-full blur-[110px] animate-pulse [animation-delay:1500ms]" />
    </div>
  );
}

function RecommendationCard({ rec, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotate: -2 }}
      whileInView={{ opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
      className="group"
    >
      <GlassPane className="w-80 h-full hover:shadow-2xl transition-shadow duration-500">
        <div className="flex items-center mb-5">
          <div className="relative mr-4">
            <img src={rec.image} alt={rec.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white/40 shadow-lg" />
            <span className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 ring-2 ring-slate-900" />
          </div>
          <div>
            <div className="font-semibold text-white tracking-tight">{rec.name}</div>
            <div className="text-xs uppercase tracking-wide text-white/60">{rec.title}</div>
          </div>
        </div>
        <p className="text-sm leading-relaxed text-white/80 font-light">“{rec.text}”</p>
      </GlassPane>
    </motion.div>
  );
}

function Metric({ label, value, suffix = '' }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent drop-shadow">{value}{suffix}</div>
      <div className="mt-2 text-xs font-medium tracking-wider text-white/60 uppercase">{label}</div>
    </div>
  );
}

function ProfileHeroImage() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  return (
    <motion.div initial={{ opacity: 0, scale: .9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: .15 }} className="relative">
      <GlassPane className="p-0 aspect-[4/5] max-w-sm mx-auto group overflow-hidden">
        <div className="relative h-full w-full rounded-2xl">
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center text-xs tracking-wide text-white/50 bg-slate-900/40 animate-pulse">Loading...</div>
          )}
          <img
            src="/profile.jpg"
            alt="Kamel Hothi"
            onLoad={() => setLoaded(true)}
            onError={() => { setError(true); setLoaded(true); }}
            className={`h-full w-full object-cover rounded-2xl transition duration-[1600ms] ease-[cubic-bezier(.19,1,.22,1)] ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.03]'} brightness-[1.05] contrast-105 group-hover:scale-[1.04]`}
            draggable={false}
          />
          {error && (
            <div className="absolute inset-0 flex items-center justify-center text-center px-6 text-white/60 text-sm bg-slate-900/70">Add profile.jpg to the public folder to display the photo.</div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_60%)]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/55 via-slate-900/10 to-slate-900/0" />
          <div className="absolute top-4 left-4 right-4 z-10">
            <div className="backdrop-blur-md bg-slate-800/40 border border-white/10 rounded-full px-5 py-2 flex items-center justify-center text-sm font-medium text-white/80 tracking-wide shadow-inner shadow-white/5">Kamel Hothi</div>
          </div>
          <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-fuchsia-500/30 via-pink-500/20 to-amber-400/30 opacity-0 group-hover:opacity-100 blur-lg transition duration-700" />
        </div>
      </GlassPane>
      <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-gradient-to-br from-fuchsia-500/40 to-amber-400/30 blur-2xl rounded-full" />
      <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-tr from-cyan-400/40 to-indigo-500/30 blur-2xl rounded-full" />
    </motion.div>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen font-sans text-white selection:bg-fuchsia-400/40">
      <FloatingOrbs />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-900/50 bg-slate-900/70 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
          <div className="font-semibold tracking-tight text-lg">
            <GradientText>KH</GradientText>
          </div>
            <ul className="hidden md:flex gap-8 text-sm">
              {navItems.map(item => (
                <li key={item.href}><a href={item.href} className="text-white/70 hover:text-white transition font-medium tracking-wide">{item.label}</a></li>
              ))}
            </ul>
          <a href="https://www.linkedin.com/in/kamelhothi" target="_blank" className="hidden md:inline-flex bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 text-slate-900 font-semibold px-5 py-2 rounded-full shadow hover:brightness-110 transition text-sm">Connect</a>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative pt-32 pb-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <p className="mb-4 inline-block rounded-full border border-white/15 bg-white/5 px-4 py-1 text-xs tracking-wider uppercase font-medium text-white/70 backdrop-blur">Board Advisor • Speaker • Diversity Champion</p>
              <h1 className="text-hero font-extrabold leading-[1.05] tracking-tight mb-8">
                Empowering <GradientText>Inclusive Leadership</GradientText> & Global Impact
              </h1>
              <p className="text-xl md:text-2xl text-white/70 leading-relaxed max-w-2xl mb-10">Strategic advisor and keynote voice on innovation, equity, and transformative growth across sectors. Dedicated to unlocking potential in people, purpose, and performance.</p>
              <div className="flex flex-wrap gap-5 items-center text-lg">
                <a href="#contact" className="group relative inline-flex items-center gap-2 rounded-full px-9 py-4 font-semibold bg-gradient-to-r from-fuchsia-500 via-pink-500 to-amber-400 text-slate-900 shadow-lg shadow-fuchsia-500/30 hover:shadow-amber-400/40 transition">
                  <span>Book a Talk</span>
                </a>
                <a href="#impact" className="inline-flex rounded-full px-9 py-4 border border-white/20 bg-white/5 font-medium text-white/80 hover:text-white hover:bg-white/10 transition">Discover Impact</a>
              </div>
            </motion.div>
            <ProfileHeroImage />
          </div>
        </div>
      </header>

      {/* Impact Metrics */}
      <section id="impact" className="relative py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
            <Metric label="Global Keynotes" value={250} />
            <Metric label="Leaders Mentored" value={1200} />
            <Metric label="Countries Reached" value={35} />
            <Metric label="Awards & Honors" value={18} />
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="relative py-24">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-2 gap-16 items-start">
          <GlassPane>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">About <GradientText>Kamel</GradientText></h2>
            <p className="text-white/70 leading-relaxed mb-6 text-lg">Kamel Hothi OBE is a transformational voice helping organizations embed inclusive leadership, resilience, and human-centered innovation. She brings decades of strategic board experience guiding enterprises through growth, governance, and cultural impact.</p>
            <p className="text-white/70 leading-relaxed mb-6 text-lg">Her work champions underrepresented talent, fosters psychological safety, and accelerates purpose-led performance. She bridges corporate strategy with social value, enabling sustainable transformation.</p>
            <p className="text-white/70 leading-relaxed text-lg">Kamel advises boards, mentors emerging leaders, and speaks globally on diversity of thought, ethical leadership, and equitable opportunity.</p>
          </GlassPane>
          <div className="space-y-8">
            <GlassPane>
              <h3 className="font-semibold text-lg mb-3 tracking-wide">Focus Themes</h3>
              <ul className="grid sm:grid-cols-2 gap-3 text-sm text-white/75">
                {['Inclusive Leadership', 'Board Advisory', 'Cultural Transformation', 'Equity & Belonging', 'Ethical Growth', 'Mentorship', 'Purpose Strategy', 'Keynote Speaking'].map(tag => (
                  <li key={tag} className="rounded-lg bg-white/5 px-3 py-2 border border-white/10 backdrop-blur hover:bg-white/10 transition">{tag}</li>
                ))}
              </ul>
            </GlassPane>
            <GlassPane>
              <h3 className="font-semibold text-lg mb-3 tracking-wide">Signature Topics</h3>
              <div className="space-y-3 text-base text-white/75">
                <p>Designing resilient, human-centered leadership cultures.</p>
                <p>Translating diversity into sustainable business value.</p>
                <p>Transformational mentorship and inclusive talent pipelines.</p>
              </div>
            </GlassPane>
          </div>
        </div>
      </section>

      {/* Speaking */}
      <section id="speaking" className="relative py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-14 text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">Keynote & Advisory <GradientText>Engagements</GradientText></h2>
            <p className="text-white/70 leading-relaxed text-lg">High-impact sessions blending vision, practicality, and empathy—tailored for executive teams, summits, and transformative leadership programs.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: 'Inclusive Leadership Labs', body: 'Immersive sessions that reframe leadership models through equity, empathy, and strategic foresight.' },
              { title: 'Board Diversity Strategy', body: 'Advisory support aligning governance with innovation, representation, and ethical growth.' },
              { title: 'Purpose & Performance', body: 'Unlocking authentic values to drive culture, engagement, and sustainable outcomes.' },
            ].map(card => (
              <GlassPane key={card.title} className="hover:scale-[1.02] transition-transform duration-500">
                <h3 className="font-semibold text-lg mb-3 tracking-wide">{card.title}</h3>
                <p className="text-sm text-white/70 leading-relaxed">{card.body}</p>
              </GlassPane>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <section id="recommendations" className="relative py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between mb-16 flex-wrap gap-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">LinkedIn <GradientText>Recommendations</GradientText></h2>
              <p className="text-white/60 max-w-xl text-lg md:text-xl">Testimonials from peers and leaders who have partnered with Kamel on advisory, cultural, and leadership transformation initiatives.</p>
            </div>
            <a href="https://www.linkedin.com/in/kamelhothi" target="_blank" className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 bg-white/10 border border-white/15 text-sm text-white/70 hover:bg-white/15 hover:text-white transition">View Profile ↗</a>
          </div>
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div className="space-y-8 max-w-xl">
              <p className="text-white/70 leading-relaxed text-lg">Real-world impact reflected through authentic endorsements of character, leadership integrity and transformational influence.</p>
              <p className="text-white/60 text-sm md:text-base">Cards auto-cycle every few seconds; interact by tapping the top card to advance the stack manually or scroll.</p>
              <div className="flex gap-4 flex-wrap">
                {['Strategic Insight','Inclusive Leadership','Mentorship','Governance','Culture Shift','Purpose Alignment'].map(tag => (
                  <span key={tag} className="text-[11px] tracking-wide uppercase font-medium bg-white/10 border border-white/15 px-3 py-1 rounded-full text-white/70">{tag}</span>
                ))}
              </div>
            </div>
            <RecommendationStack items={recommendations} interval={4200} visible={4} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-white/10 bg-slate-900/60 backdrop-blur py-10 text-center text-xs text-white/50">
        <p>© {new Date().getFullYear()} Kamel Hothi OBE. All rights reserved.</p>
      </footer>
    </div>
  );
}
