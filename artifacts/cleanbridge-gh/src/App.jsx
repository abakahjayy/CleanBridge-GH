import { useState } from 'react';
import { Link, Route, Router, Switch, useLocation, useRoute } from 'wouter';
import {
  Activity, ArrowLeft, ArrowRight, BarChart3, Bell, CalendarDays,
  Check, ChevronRight, CircleDollarSign, Clock3, Fuel, LayoutDashboard,
  ListFilter, LoaderCircle, Map, MapPin, Menu, PackageCheck, Phone,
  Plus, Route as RouteIcon, Search, Settings2, ShieldCheck, Sparkles,
  Truck, UserRound, UsersRound, WalletCards, X, Zap
} from 'lucide-react';

const demoData = {
  mode: 'Preview data',
  user: { id: 'u-24', name: 'Ama Osei', email: 'ama.osei@example.com', phone: '+233 24 555 0198', role: 'customer', area: 'East Legon', avatar: 'AO' },
  pickup: { id: 'CB-1048', customer: 'Ama Osei', area: 'East Legon Hills', wasteType: 'Household mix', quantity: '3 bags', scheduledDate: 'Tuesday, 18 Jun', scheduledTime: '08:00 – 10:00', status: 'On the way', estimatedPrice: 'GH₵ 42.00', assignedCollector: 'Kojo Mensah', vehicle: 'CB 07 · Kia K2700', eta: '18 min', location: 'East Legon Hills' },
  pickups: [
    { id: 'CB-1048', area: 'East Legon Hills', wasteType: 'Household mix', quantity: '3 bags', scheduledDate: 'Tue, 18 Jun', scheduledTime: '08:00 – 10:00', status: 'On the way', estimatedPrice: 'GH₵ 42.00', assignedCollector: 'Kojo Mensah' },
    { id: 'CB-1031', area: 'Airport Residential', wasteType: 'Recyclables', quantity: '2 bags', scheduledDate: 'Fri, 14 Jun', scheduledTime: '14:00 – 16:00', status: 'Completed', estimatedPrice: 'GH₵ 28.50', assignedCollector: 'Esi Owusu' },
    { id: 'CB-1004', area: 'Cantonments', wasteType: 'Household mix', quantity: '4 bags', scheduledDate: 'Mon, 03 Jun', scheduledTime: '09:00 – 11:00', status: 'Completed', estimatedPrice: 'GH₵ 52.00', assignedCollector: 'Kojo Mensah' },
    { id: 'CB-0988', area: 'Labone', wasteType: 'Garden waste', quantity: '1 bag', scheduledDate: 'Sat, 25 May', scheduledTime: '10:00 – 12:00', status: 'Completed', estimatedPrice: 'GH₵ 19.00', assignedCollector: 'Yaw Boateng' }
  ],
  collector: { id: 'c-17', name: 'Kojo Mensah', phone: '+233 20 719 4421', rating: 4.8, status: 'On route', vehicle: 'CB 07 · Kia K2700', area: 'Accra East', completedJobs: 186, earnings: 'GH₵ 4,280' },
  jobs: [
    { id: 'CB-1048', customer: 'Ama Osei', area: 'East Legon Hills', time: '08:00 – 10:00', type: 'Household mix', bags: '3 bags', status: 'Next' },
    { id: 'CB-1050', customer: 'Kofi Antwi', area: 'Adjiringanor', time: '10:30 – 12:00', type: 'Recyclables', bags: '5 bags', status: 'Queued' },
    { id: 'CB-1052', customer: 'Mavis Addo', area: 'Ogbodjo', time: '13:30 – 15:00', type: 'Household mix', bags: '2 bags', status: 'Queued' }
  ],
  route: { id: 'RT-0624', date: 'Tuesday, 18 June', stops: 18, distanceKm: '32.4 km', estimatedFuelLitres: '8.6 L', estimatedFuelCost: 'GH₵ 127.84', status: 'In progress' },
  vehicle: { id: 'VH-007', type: 'Light truck', make: 'Kia', model: 'K2700', registration: 'GT 4821-22', fuelType: 'Diesel', fuelEconomy: '9.4 L / 100 km', capacity: '1.2 tonnes', verificationStatus: 'Verified' },
  routes: [
    { id: 'RT-0624', date: 'Tue, 18 Jun', stops: 18, distanceKm: '32.4 km', estimatedFuelLitres: '8.6 L', estimatedFuelCost: 'GH₵ 127.84', status: 'In progress' },
    { id: 'RT-0619', date: 'Mon, 17 Jun', stops: 21, distanceKm: '38.1 km', estimatedFuelLitres: '10.2 L', estimatedFuelCost: 'GH₵ 151.47', status: 'Completed' },
    { id: 'RT-0612', date: 'Sat, 15 Jun', stops: 16, distanceKm: '29.8 km', estimatedFuelLitres: '7.9 L', estimatedFuelCost: 'GH₵ 117.24', status: 'Completed' }
  ],
  collectors: [
    { id: 'c-17', name: 'Kojo Mensah', phone: '+233 20 719 4421', rating: 4.8, status: 'On route', vehicle: 'CB 07 · Kia K2700', area: 'Accra East', completedJobs: 186, earnings: 'GH₵ 4,280' },
    { id: 'c-04', name: 'Esi Owusu', phone: '+233 55 183 2201', rating: 4.9, status: 'Available', vehicle: 'CB 03 · Tata Ace', area: 'Airport', completedJobs: 243, earnings: 'GH₵ 5,610' },
    { id: 'c-22', name: 'Yaw Boateng', phone: '+233 27 661 5082', rating: 4.6, status: 'Off duty', vehicle: 'CB 11 · Hyundai Porter', area: 'Osu', completedJobs: 154, earnings: 'GH₵ 3,920' }
  ],
  notifications: [
    { id: 'n1', title: 'Your collector is nearby', message: 'Kojo is 18 minutes away from East Legon Hills.', read: false, createdAt: '12 min ago' },
    { id: 'n2', title: 'Pickup completed', message: 'Your recyclables pickup CB-1031 was completed.', read: true, createdAt: '4 days ago' },
    { id: 'n3', title: 'A cleaner Accra starts at home', message: 'Add a standing pickup schedule for less to remember.', read: true, createdAt: '1 week ago' }
  ],
  fuelPrice: { fuelType: 'Diesel', currentPrice: 'GH₵ 14.86 / L', previousPrice: 'GH₵ 14.41 / L', effectiveDate: '17 Jun 2024' },
  pricing: { baseFee: 'GH₵ 15.00', distanceFee: 'GH₵ 1.50 / km', quantityFee: 'GH₵ 5.00 / bag', wasteTypeFees: 'From GH₵ 0.00', urgencyFee: 'GH₵ 12.00', weekendFee: 'GH₵ 4.00' }
};

const navSets = {
  customer: [
    ['Overview', '/dashboard', LayoutDashboard], ['Request pickup', '/pickup', Plus], ['My pickups', '/pickups', PackageCheck], ['Live map', '/map', Map], ['Notifications', '/notifications', Bell], ['Profile', '/profile', UserRound]
  ],
  collector: [
    ['Overview', '/collector/dashboard', LayoutDashboard], ['My jobs', '/collector/jobs', ListFilter], ['Today’s route', '/collector/route', RouteIcon], ['Earnings', '/collector/earnings', WalletCards], ['Vehicle', '/collector/vehicle', Truck]
  ],
  admin: [
    ['Command centre', '/admin/dashboard', LayoutDashboard], ['Collections', '/admin/collections', PackageCheck], ['Customers', '/admin/customers', UsersRound], ['Collectors', '/admin/collectors', UserRound], ['Routes', '/admin/routes', RouteIcon], ['Network map', '/admin/map', Map], ['Fuel costs', '/admin/fuel', Fuel], ['Pricing', '/admin/pricing', CircleDollarSign], ['Analytics', '/admin/analytics', BarChart3]
  ]
};

function Logo({ dark = false }) {
  return <span className="brand-mark" data-testid="brand-logo"><span className="brand-symbol"><Sparkles size={16} /></span><span>cleanbridge <b>GH</b></span></span>;
}

function StatusBadge({ status }) {
  const tone = status === 'Completed' || status === 'Available' || status === 'Verified' ? 'badge-green' : status === 'On the way' || status === 'On route' || status === 'In progress' ? 'badge-yellow' : status === 'Next' ? 'badge-orange' : 'badge-slate';
  return <span className={`badge ${tone}`} data-testid={`status-${String(status).toLowerCase().replaceAll(' ', '-')}`}><span>●</span>{status}</span>;
}

function PreviewNote({ compact = false }) {
  return <div className={`preview-note ${compact ? 'compact' : ''}`} data-testid="preview-data-note"><Zap size={14} /><span><strong>Preview mode.</strong> Showing locally prepared CleanBridge GH data. Actions that would need the live service are clearly marked.</span></div>;
}

function PublicNav() {
  return <nav className="public-nav"><Link href="/" data-testid="link-public-logo"><Logo /></Link><div className="nav-links"><a href="#how-it-works" data-testid="link-how-it-works">How it works</a><a href="#for-collectors" data-testid="link-for-collectors">For collectors</a><a href="#areas" data-testid="link-areas">Areas we serve</a></div><div style={{ display: 'flex', gap: '.5rem' }}><Link className="btn btn-ghost" href="/login" data-testid="link-login">Log in</Link><Link className="btn btn-secondary btn-sm" href="/register" data-testid="link-register">Join CleanBridge</Link></div></nav>;
}

function Landing() {
  return <div>
    <section className="hero">
      <div className="hero-grid" />
      <PublicNav />
      <div className="hero-inner">
        <div className="hero-copy fade-in">
          <div className="eyebrow" style={{ color: 'hsl(var(--secondary))' }}>Household waste, handled properly</div>
          <h1>Cleaner streets start at <span>your gate.</span></h1>
          <p className="hero-sub">CleanBridge GH connects homes, trusted collectors, and smart routes across Accra — so waste leaves on time and neighborhoods breathe easier.</p>
          <div className="hero-actions"><Link className="btn btn-secondary" href="/pickup" data-testid="button-request-pickup">Request a pickup <ArrowRight size={16} /></Link><Link className="btn btn-ghost" href="/register" data-testid="button-create-account">Create your account</Link></div>
          <div style={{ display: 'flex', gap: '1.4rem', marginTop: '2rem', color: 'rgba(255,255,255,.53)', fontSize: '.72rem' }}><span><Check size={13} style={{ verticalAlign: 'middle', marginRight: '.3rem', color: 'hsl(var(--secondary))' }} />Scheduled collection</span><span><Check size={13} style={{ verticalAlign: 'middle', marginRight: '.3rem', color: 'hsl(var(--secondary))' }} />Local teams</span></div>
        </div>
        <div className="hero-orbit" aria-label="CleanBridge route preview">
          <div className="hero-stat"><strong>18 min</strong><small>next arrival · East Legon</small></div>
          <div className="map-card"><div className="route-line" /><span className="route-dot one" /><span className="route-dot two" /><span className="route-dot three" /></div>
        </div>
      </div>
    </section>
    <section className="section" id="how-it-works"><div className="section-heading"><div><div className="eyebrow">One bridge, three moving parts</div><h2>The everyday logistics of a cleaner home.</h2></div><p>Built around the way Accra actually moves: clear handoffs, local knowledge, and no guesswork about what happens next.</p></div><div className="story-grid"><article className="story-card"><div className="card-icon"><CalendarDays size={20} /></div><h3>Book around your day</h3><p>Choose your waste type, bag count, and a time window that works for your household.</p></article><article className="story-card"><div className="card-icon" style={{ background: 'hsl(var(--muted))' }}><MapPin size={20} /></div><h3>Follow the route</h3><p>See your collector’s progress from dispatch to doorstep.</p></article><article className="story-card"><div className="card-icon" style={{ background: 'hsl(var(--accent))', color: 'white' }}><ShieldCheck size={20} /></div><h3>Trust the handoff</h3><p>Verified collectors and transparent pricing, pickup by pickup.</p></article></div></section>
    <section className="trust-band" id="areas"><div className="section"><div><div className="eyebrow" style={{ color: 'rgba(27,45,47,.6)' }}>Growing with the city</div><strong>Serving the Accra neighborhoods that keep Ghana moving.</strong></div><div className="trust-list"><span>East Legon</span><span>Airport</span><span>Cantonments</span><span>Osu</span><span>Labone</span></div></div></section>
    <section className="section" id="for-collectors"><div className="section-heading"><div><div className="eyebrow">For the people doing the work</div><h2>Better routes. Fairer days.</h2></div><p>Collectors get the tools to plan stops, record handoffs, and see what they earn — without paper lists or blind turns.</p></div><div className="panel panel-pad" style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'center', gap: '2rem', background: 'hsl(var(--sidebar))', color: 'white' }}><div><div className="eyebrow" style={{ color: 'hsl(var(--secondary))' }}>Collector workspace</div><h3 className="display" style={{ fontSize: '2rem', margin: '.5rem 0' }}>Every stop has a next step.</h3><p style={{ maxWidth: 450, color: 'rgba(255,255,255,.62)', lineHeight: 1.6 }}>A focused route view keeps the day moving and gives operations a clean signal when plans change.</p></div><Link className="btn btn-secondary" href="/collector/dashboard" data-testid="link-collector-preview">Preview collector view <ArrowRight size={15} /></Link></div></section>
    <footer className="public-footer"><div className="public-footer-inner"><span>© 2024 CleanBridge GH · Accra, Ghana</span><span>Collection should be simple. The city should feel it.</span></div></footer>
  </div>;
}

function AuthPage({ register = false }) {
  const [, navigate] = useLocation();
  const [submitted, setSubmitted] = useState(false);
  const submit = (event) => { event.preventDefault(); setSubmitted(true); setTimeout(() => navigate('/dashboard'), 650); };
  return <div className="auth-page"><div className="auth-visual"><Link href="/" data-testid="link-auth-logo"><Logo /></Link><div><div className="eyebrow" style={{ color: 'hsl(var(--secondary))' }}>CleanBridge GH / Accra</div><h1>{register ? <>Your home.<br /><span>Handled.</span></> : <>Good to see<br /><span>you again.</span></>}</h1><p>{register ? 'Join a clearer way to manage household waste, with local collectors and routes that respect your time.' : 'Your collection history, next arrival, and a cleaner routine — all in one place.'}</p></div><span style={{ color: 'rgba(255,255,255,.4)', fontSize: '.7rem' }}>Preview workspace · Live account service pending</span></div><div className="auth-form-wrap"><form className="auth-form" onSubmit={submit}><div className="eyebrow">{register ? 'Create account' : 'Welcome back'}</div><h2>{register ? 'Start with your address.' : 'Log in to CleanBridge.'}</h2><p>{register ? 'We use your area to pair you with the right collection route.' : 'Use any details to explore the prepared preview workspace.'}</p><PreviewNote compact /><div style={{ marginTop: '1.3rem' }}>{register && <div className="field"><label htmlFor="name">Full name</label><input id="name" data-testid="input-name" placeholder="Ama Osei" required /></div>}<div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" data-testid="input-email" placeholder="you@example.com" required /></div>{register && <div className="field"><label htmlFor="phone">Phone number</label><input id="phone" data-testid="input-phone" placeholder="+233 24 000 0000" required /></div>}<div className="field"><label htmlFor="password">Password</label><input id="password" type="password" data-testid="input-password" placeholder="••••••••" required /></div></div><button className="btn btn-primary" style={{ width: '100%' }} disabled={submitted} data-testid="button-auth-submit">{submitted ? <><LoaderCircle size={15} /> Opening preview</> : <>{register ? 'Create preview account' : 'Open preview workspace'} <ArrowRight size={15} /></>}</button><div className="form-foot">{register ? <>Already have an account? <Link href="/login" data-testid="link-switch-login">Log in</Link></> : <>New to CleanBridge? <Link href="/register" data-testid="link-switch-register">Create an account</Link></>}</div></form></div></div>;
}

function Sidebar({ role }) {
  const [location] = useLocation();
  return <aside className="side-shell"><Link href={role === 'admin' ? '/admin/dashboard' : role === 'collector' ? '/collector/dashboard' : '/dashboard'}><Logo /></Link><div className="side-kicker">{role === 'admin' ? 'Operations' : role === 'collector' ? 'Collector workspace' : 'Household workspace'}</div><nav className="side-nav">{navSets[role].map(([label, href, Icon]) => <Link key={href} href={href} className={location === href ? 'active' : ''} data-testid={`link-nav-${href.replaceAll('/', '-').replace(/^-/, '')}`}><Icon size={17} /><span>{label}</span></Link>)}</nav><div className="side-bottom"><div className="side-preview"><Zap size={13} style={{ verticalAlign: 'middle', marginRight: '.3rem', color: 'hsl(var(--secondary))' }} />Preview data is local to this workspace.</div><Link className="side-nav" href="/"><span style={{ display: 'flex', alignItems: 'center', gap: '.7rem', padding: '.72rem .8rem', color: 'rgba(255,255,255,.5)', fontSize: '.82rem' }}><ArrowLeft size={16} />Back to public site</span></Link></div></aside>;
}

function Shell({ role, children, title, subtitle }) {
  const [toast, setToast] = useState('');
  const notify = (message) => { setToast(message); setTimeout(() => setToast(''), 2600); };
  return <div className="app-shell"><Sidebar role={role} /><main className="app-main"><header className="topbar"><div className="topbar-title"><button className="icon-btn mobile-menu" data-testid="button-mobile-menu"><Menu size={18} /></button><div><h1 data-testid="text-page-title">{title}</h1><p>{subtitle}</p></div></div><div className="topbar-actions"><button className="icon-btn" onClick={() => notify('Live notifications are available in the full service.')} data-testid="button-notifications"><Bell size={17} /></button><Link href={role === 'admin' ? '/admin/dashboard' : role === 'collector' ? '/collector/dashboard' : '/profile'} className="avatar" data-testid="link-topbar-profile">{role === 'admin' ? 'OP' : role === 'collector' ? 'KM' : 'AO'}</Link></div></header><div className="page-content fade-in">{children}</div>{toast && <div className="toast" data-testid="toast-message">{toast}</div>}</main></div>;
}

function CustomerDashboard() {
  return <Shell role="customer" title="Good morning, Ama" subtitle="Tuesday, 18 June 2024 · East Legon Hills"><PreviewNote /><div className="page-head" style={{ marginTop: '1.4rem' }}><div><div className="eyebrow">Your household overview</div><h2>Keep the next pickup simple.</h2><p>Your collection is moving through the East Legon route today.</p></div><Link className="btn btn-primary" href="/pickup" data-testid="button-dashboard-pickup"><Plus size={15} /> Request pickup</Link></div><div className="grid-3"><div className="stat-card"><div className="stat-top"><span>Next pickup</span><CalendarDays size={17} /></div><div className="stat-value" style={{ fontSize: '1.35rem' }}>18 Jun</div><div className="stat-foot">08:00 – 10:00 · <StatusBadge status="On the way" /></div></div><div className="stat-card"><div className="stat-top"><span>Collected this month</span><PackageCheck size={17} /></div><div className="stat-value">9 bags</div><div className="stat-foot">Across 3 completed pickups</div></div><div className="stat-card"><div className="stat-top"><span>Saved from streets</span><Sparkles size={17} /></div><div className="stat-value">27 kg</div><div className="stat-foot">Estimated household impact</div></div></div><div className="grid-2" style={{ marginTop: '1rem' }}><div className="panel panel-pad"><div className="mini-title"><h3>Today’s pickup</h3><Link href="/pickup/CB-1048" data-testid="link-dashboard-tracking">Track live <ChevronRight size={14} style={{ verticalAlign: 'middle' }} /></Link></div><div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '.5rem 0 1.2rem' }}><div className="avatar" style={{ background: 'hsl(var(--primary))' }}>KM</div><div><strong style={{ fontSize: '.9rem' }}>Kojo Mensah is on the way</strong><span className="muted" style={{ display: 'block', marginTop: '.25rem', fontSize: '.72rem' }}>CB 07 · Kia K2700 · arriving in 18 min</span></div></div><div className="progress"><span style={{ width: '72%' }} /></div><div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.65rem', color: 'hsl(var(--muted-foreground))', fontSize: '.68rem' }}><span>Dispatched</span><span>At your gate</span></div></div><div className="panel panel-pad"><div className="mini-title"><h3>Recent pickups</h3><Link href="/pickups" data-testid="link-dashboard-history">View all <ChevronRight size={14} style={{ verticalAlign: 'middle' }} /></Link></div><div className="data-list">{demoData.pickups.slice(1, 4).map(item => <div className="data-row" key={item.id} data-testid={`row-recent-pickup-${item.id}`}><div className="data-main"><strong>{item.id} · {item.wasteType}</strong><span>{item.scheduledDate} · {item.area}</span></div><div style={{ textAlign: 'right' }}><StatusBadge status={item.status} /><strong style={{ display: 'block', marginTop: '.25rem', fontSize: '.75rem' }}>{item.estimatedPrice}</strong></div></div>)}</div></div></div></Shell>;
}

function PickupRequest() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [selectedWaste, setSelectedWaste] = useState('Household mix');
  const [selectedQuantity, setSelectedQuantity] = useState('1 bag');
  const [, navigate] = useLocation();
  const wasteTypes = ['Household mix', 'Recyclables', 'Garden waste', 'Bulky items', 'Large waste bin'];
  const quantityOptions = selectedWaste === 'Large waste bin'
    ? ['1 large bin', '2 large bins', '3 large bins', '4+ large bins']
    : ['1 bag', '2 bags', '3 bags', '4+ bags'];
  const next = () => step < 3 ? setStep(step + 1) : (setSubmitted(true), setTimeout(() => navigate('/pickups'), 800));
  return <Shell role="customer" title="Request a pickup" subtitle="Tell us what is waiting at your gate.">
    <div className="form-card panel">
      <PreviewNote />
      <div className="stepper" style={{ marginTop: '1.6rem' }}>
        {['Waste & quantity', 'When & where', 'Review'].map((label, index) => (
          <span key={label} className={`step ${step >= index + 1 ? 'active' : ''}`}>
            <i>{step > index + 1 ? <Check size={12} /> : index + 1}</i>
            <span>{label}</span>
            {index < 2 && <b className="step-line" />}
          </span>
        ))}
      </div>

      {step === 1 && <div>
        <div className="eyebrow">Step 01</div>
        <h2 className="display" style={{ margin: '.5rem 0 .4rem' }}>What should we collect?</h2>
        <p className="muted" style={{ fontSize: '.8rem', marginBottom: '1.5rem' }}>Choose the closest match. You can tell the collector more at handoff.</p>
        <div className="field">
          <label>Waste type</label>
          <div className="choice-grid">
            {wasteTypes.map((waste) => (
              <label className="choice" key={waste}>
                <input
                  type="radio"
                  name="waste"
                  value={waste}
                  checked={selectedWaste === waste}
                  onChange={() => {
                    setSelectedWaste(waste);
                    setSelectedQuantity(waste === 'Large waste bin' ? '1 large bin' : '1 bag');
                  }}
                />
                {waste}
              </label>
            ))}
          </div>
        </div>
        <div className="field">
          <label htmlFor="quantity">How many bags, bundles, or bins?</label>
          <select id="quantity" value={selectedQuantity} onChange={(event) => setSelectedQuantity(event.target.value)} data-testid="select-quantity">
            {quantityOptions.map((quantity) => <option key={quantity}>{quantity}</option>)}
          </select>
        </div>
      </div>}

      {step === 2 && <div>
        <div className="eyebrow">Step 02</div>
        <h2 className="display" style={{ margin: '.5rem 0 .4rem' }}>Set the handoff.</h2>
        <p className="muted" style={{ fontSize: '.8rem', marginBottom: '1.5rem' }}>Our route team will confirm the closest arrival window.</p>
        <div className="input-grid">
          <div className="field"><label htmlFor="date">Preferred date</label><input id="date" type="date" defaultValue="2024-06-18" data-testid="input-pickup-date" /></div>
          <div className="field"><label htmlFor="time">Preferred time</label><select id="time" data-testid="select-pickup-time"><option>08:00 – 10:00</option><option>10:00 – 12:00</option><option>14:00 – 16:00</option></select></div>
        </div>
        <div className="field"><label htmlFor="address">Collection address</label><input id="address" defaultValue="House 14, East Legon Hills" data-testid="input-address" /></div>
        <div className="field"><label htmlFor="note">Gate note <span className="muted">(optional)</span></label><textarea id="note" rows="3" placeholder="Anything that helps your collector find you?" data-testid="input-gate-note" /></div>
      </div>}

      {step === 3 && <div>
        <div className="eyebrow">Step 03</div>
        <h2 className="display" style={{ margin: '.5rem 0 .4rem' }}>Check the details.</h2>
        <p className="muted" style={{ fontSize: '.8rem', marginBottom: '1.5rem' }}>This is a preview estimate. The live service will confirm availability and price.</p>
        <div className="data-list panel" style={{ padding: '0 1rem' }}>
          {[
            ['Waste', `${selectedWaste} · ${selectedQuantity}`],
            ['When', 'Tuesday, 18 Jun · 08:00 – 10:00'],
            ['Where', 'House 14, East Legon Hills'],
            ['Estimate', 'GH₵ 42.00']
          ].map(([label, value]) => <div className="data-row" key={label}><span className="muted" style={{ fontSize: '.75rem' }}>{label}</span><strong style={{ fontSize: '.8rem' }}>{value}</strong></div>)}
        </div>
        <div className="preview-note" style={{ marginTop: '1rem' }}><ShieldCheck size={14} /><span>This request will be saved only as a preview until the collection service is connected.</span></div>
      </div>}

      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '.7rem', marginTop: '2rem' }}>
        {step > 1 ? <button className="btn btn-outline" onClick={() => setStep(step - 1)} data-testid="button-pickup-back"><ArrowLeft size={15} /> Back</button> : <span />}
        {submitted
          ? <button className="btn btn-primary" disabled data-testid="button-pickup-submit"><LoaderCircle size={15} /> Saving preview</button>
          : <button className="btn btn-primary" onClick={next} data-testid="button-pickup-next">{step === 3 ? 'Save preview request' : 'Continue'} <ArrowRight size={15} /></button>}
      </div>
    </div>
  </Shell>;
}

function Pickups() {
  const [filter, setFilter] = useState('All');
  const items = demoData.pickups.filter(x => filter === 'All' || x.status === filter);
  return <Shell role="customer" title="My pickups" subtitle="A clear record of every handoff."><div className="page-head"><div><div className="eyebrow">Collection history</div><h2>Every pickup, accounted for.</h2><p>Preview history for your household.</p></div><Link className="btn btn-primary" href="/pickup" data-testid="button-history-new"><Plus size={15} /> New pickup</Link></div><div className="panel"><div style={{ display: 'flex', gap: '.45rem', padding: '1rem', borderBottom: '1px solid hsl(var(--border))' }}>{['All', 'On the way', 'Completed'].map(x => <button key={x} className={`btn btn-sm ${filter === x ? 'btn-primary' : 'btn-quiet'}`} onClick={() => setFilter(x)} data-testid={`button-filter-${x.toLowerCase().replaceAll(' ', '-')}`}>{x}</button>)}</div><div className="table-wrap"><table className="table"><thead><tr><th>Pickup</th><th>Area</th><th>Schedule</th><th>Collector</th><th>Status</th><th>Amount</th><th /></tr></thead><tbody>{items.map(item => <tr key={item.id} data-testid={`row-pickup-${item.id}`}><td><strong>{item.id}</strong><div className="muted" style={{ marginTop: '.2rem', fontSize: '.68rem' }}>{item.wasteType} · {item.quantity}</div></td><td>{item.area}</td><td>{item.scheduledDate}<div className="muted" style={{ marginTop: '.2rem', fontSize: '.68rem' }}>{item.scheduledTime}</div></td><td>{item.assignedCollector}</td><td><StatusBadge status={item.status} /></td><td>{item.estimatedPrice}</td><td><Link className="btn btn-quiet btn-sm" href={`/pickup/${item.id}`} data-testid={`link-pickup-${item.id}`}>Details</Link></td></tr>)}</tbody></table></div></div></Shell>;
}

function PickupDetail() {
  const [, params] = useRoute('/pickup/:id');
  const item = demoData.pickups.find(x => x.id === params?.id) || demoData.pickup;
  return <Shell role="customer" title={`Pickup ${item.id}`} subtitle="Live handoff details · preview route"><div style={{ marginBottom: '1rem' }}><Link href="/pickups" className="btn btn-ghost btn-sm" data-testid="link-back-pickups"><ArrowLeft size={15} /> Back to pickups</Link></div><div className="grid-2"><div className="panel panel-pad"><div className="mini-title"><h3>Collection status</h3><StatusBadge status={item.status} /></div><div className="map-panel" style={{ minHeight: 330, margin: '0 -.1rem 1rem' }}><div className="map-route" /><div className="map-pin a"><MapPin size={15} /></div><div className="map-pin b"><Truck size={15} /></div><div className="map-pin c"><MapPin size={15} /></div><div className="map-legend"><strong>Collector en route</strong><br /><span className="muted">ETA {demoData.pickup.eta} · East Legon Hills</span></div></div><div style={{ display: 'flex', gap: '.7rem' }}><button className="btn btn-primary" onClick={() => alert('Calling is unavailable in preview mode.')} data-testid="button-call-collector"><Phone size={15} /> Call collector</button><button className="btn btn-outline" onClick={() => alert('Directions are unavailable in preview mode.')} data-testid="button-directions"><MapPin size={15} /> Directions</button></div></div><div className="panel panel-pad"><div className="mini-title"><h3>Pickup timeline</h3><span className="muted mono" style={{ fontSize: '.7rem' }}>{item.id}</span></div><div className="timeline"><div className="timeline-item"><div className="timeline-dot" /><div className="timeline-copy"><strong>Collector dispatched</strong><span>Kojo accepted this route at 07:34</span></div></div><div className="timeline-item"><div className="timeline-dot" /><div className="timeline-copy"><strong>On the way</strong><span>Current position · estimated arrival in {demoData.pickup.eta}</span></div></div><div className="timeline-item pending"><div className="timeline-dot" /><div className="timeline-copy"><strong>At your gate</strong><span>We’ll update this after the handoff.</span></div></div><div className="timeline-item pending"><div className="timeline-dot" /><div className="timeline-copy"><strong>Collected</strong><span>Receipt will appear here.</span></div></div></div><div className="data-list" style={{ marginTop: '1rem', borderTop: '1px solid hsl(var(--border))' }}><div className="data-row"><span className="muted">Address</span><strong style={{ fontSize: '.76rem' }}>{item.area}</strong></div><div className="data-row"><span className="muted">Estimate</span><strong style={{ fontSize: '.76rem' }}>{item.estimatedPrice}</strong></div><div className="data-row"><span className="muted">Vehicle</span><strong style={{ fontSize: '.76rem' }}>{demoData.pickup.vehicle}</strong></div></div></div></div></Shell>;
}

function MapPage({ admin = false }) {
  return <Shell role={admin ? 'admin' : 'customer'} title={admin ? 'Network map' : 'Live map'} subtitle={admin ? 'A prepared view of today’s collection network.' : 'Follow the route serving your neighborhood.'}><PreviewNote /><div className="grid-2" style={{ marginTop: '1rem' }}><div className="map-panel"><div className="map-river" /><div className="map-route" /><div className="map-pin a"><MapPin size={15} /></div><div className="map-pin b"><Truck size={15} /></div><div className="map-pin c"><MapPin size={15} /></div><div className="map-legend"><strong>{admin ? '7 active routes' : 'Route East Legon'}</strong><br /><span className="muted">{admin ? '18 collectors · 64 stops remaining' : 'Kojo Mensah · 18 min away'}</span></div></div><div className="panel panel-pad"><div className="mini-title"><h3>{admin ? 'Network pulse' : 'Your route today'}</h3><StatusBadge status="In progress" /></div>{(admin ? [['Active collectors', '18', 'badge-green'], ['Stops completed', '126 / 190', 'badge-yellow'], ['Routes on time', '92%', 'badge-green'], ['Service areas', '12 neighborhoods', 'badge-slate']] : [['Collector', 'Kojo Mensah', 'badge-green'], ['Vehicle', 'CB 07 · Kia K2700', 'badge-slate'], ['Next stop', 'East Legon Hills', 'badge-yellow'], ['ETA', '18 min', 'badge-orange']]).map(([a, b, tone]) => <div className="data-row" key={a}><span className="muted">{a}</span><strong style={{ fontSize: '.78rem' }}>{b}</strong></div>)}<button className="btn btn-outline" style={{ width: '100%', marginTop: '1rem' }} onClick={() => alert('Live map connection is unavailable in preview mode.')} data-testid="button-refresh-map"><Activity size={15} /> Refresh network</button></div></div></Shell>;
}

function Notifications() {
  const [items, setItems] = useState(demoData.notifications);
  return <Shell role="customer" title="Notifications" subtitle="Useful updates, not noise."><div className="page-head"><div><div className="eyebrow">Your inbox</div><h2>Stay in the loop.</h2><p>Collection updates and a few good reminders.</p></div><button className="btn btn-outline" onClick={() => setItems(items.map(x => ({ ...x, read: true })))} data-testid="button-mark-all-read"><Check size={15} /> Mark all read</button></div><div className="panel panel-pad"><div className="data-list">{items.map(item => <div className="data-row" key={item.id} data-testid={`row-notification-${item.id}`}><div style={{ display: 'flex', gap: '.8rem', alignItems: 'flex-start' }}><div className="card-icon" style={{ width: '2.2rem', height: '2.2rem', background: item.read ? 'hsl(var(--muted))' : 'hsl(var(--secondary))' }}><Bell size={15} /></div><div className="data-main"><strong>{item.title} {!item.read && <span className="badge badge-orange" style={{ marginLeft: '.4rem' }}>New</span>}</strong><span>{item.message}</span><span style={{ marginTop: '.45rem' }}>{item.createdAt}</span></div></div><button className="icon-btn" onClick={() => setItems(items.filter(x => x.id !== item.id))} data-testid={`button-dismiss-${item.id}`}><X size={15} /></button></div>)}</div></div></Shell>;
}

function Profile() {
  const [saved, setSaved] = useState(false);
  return <Shell role="customer" title="Profile" subtitle="Your household details and preferences."><div className="grid-2"><div className="panel panel-pad"><div style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingBottom: '1.3rem', borderBottom: '1px solid hsl(var(--border))' }}><div className="avatar" style={{ width: '3.5rem', height: '3.5rem', fontSize: '1rem' }}>AO</div><div><h3 className="display" style={{ margin: 0, fontSize: '1.3rem' }}>Ama Osei</h3><span className="muted" style={{ fontSize: '.75rem' }}>Household account · East Legon</span></div></div><div style={{ marginTop: '1.3rem' }}><div className="field"><label htmlFor="profile-name">Full name</label><input id="profile-name" defaultValue={demoData.user.name} data-testid="input-profile-name" /></div><div className="field"><label htmlFor="profile-email">Email</label><input id="profile-email" defaultValue={demoData.user.email} data-testid="input-profile-email" /></div><div className="field"><label htmlFor="profile-phone">Phone</label><input id="profile-phone" defaultValue={demoData.user.phone} data-testid="input-profile-phone" /></div><button className="btn btn-primary" onClick={() => setSaved(true)} data-testid="button-save-profile">{saved ? <><Check size={15} /> Saved in preview</> : 'Save profile'}</button></div></div><div className="panel panel-pad"><div className="mini-title"><h3>Collection preferences</h3><Settings2 size={17} className="muted" /></div><div className="field"><label htmlFor="profile-area">Usual area</label><select id="profile-area" defaultValue="East Legon Hills" data-testid="select-profile-area"><option>East Legon Hills</option><option>Airport Residential</option><option>Cantonments</option><option>Labone</option></select></div><div className="field"><label htmlFor="profile-frequency">Standing pickup</label><select id="profile-frequency" defaultValue="No standing pickup" data-testid="select-profile-frequency"><option>No standing pickup</option><option>Every week</option><option>Every two weeks</option></select></div><div className="preview-note"><ShieldCheck size={14} /><span>Your details are only stored in this browser preview. Live profile editing is not connected yet.</span></div></div></div></Shell>;
}

function CollectorDashboard() {
  return <Shell role="collector" title="Good morning, Kojo" subtitle="Tuesday, 18 June 2024 · Accra East"><PreviewNote /><div className="page-head" style={{ marginTop: '1.4rem' }}><div><div className="eyebrow">Collector workspace</div><h2>Your day, in order.</h2><p>Three stops left on this route. You’re moving well.</p></div><Link className="btn btn-secondary" href="/collector/route" data-testid="button-open-route"><RouteIcon size={15} /> Open route</Link></div><div className="grid-4"><div className="stat-card"><div className="stat-top"><span>Stops today</span><MapPin size={16} /></div><div className="stat-value">18</div><div className="stat-foot">12 completed · 6 remaining</div></div><div className="stat-card"><div className="stat-top"><span>Route status</span><Activity size={16} /></div><div className="stat-value" style={{ fontSize: '1.35rem' }}>On route</div><div className="stat-foot">Next stop in 18 min</div></div><div className="stat-card"><div className="stat-top"><span>Today’s earnings</span><WalletCards size={16} /></div><div className="stat-value">GH₵ 380</div><div className="stat-foot">+ GH₵ 42 pending</div></div><div className="stat-card"><div className="stat-top"><span>Rating</span><Sparkles size={16} /></div><div className="stat-value">4.8</div><div className="stat-foot">From 186 completed jobs</div></div></div><div className="grid-2" style={{ marginTop: '1rem' }}><div className="panel panel-pad"><div className="mini-title"><h3>Next stops</h3><Link href="/collector/jobs" data-testid="link-collector-jobs">All jobs <ChevronRight size={14} style={{ verticalAlign: 'middle' }} /></Link></div><div className="data-list">{demoData.jobs.map((job, i) => <div className="data-row" key={job.id}><div className="data-main"><strong>{i + 1}. {job.customer}</strong><span>{job.area} · {job.time}</span></div><StatusBadge status={job.status} /></div>)}</div></div><div className="panel panel-pad"><div className="mini-title"><h3>Route completion</h3><span className="mono" style={{ color: 'hsl(var(--primary))', fontSize: '.78rem' }}>67%</span></div><div className="progress" style={{ height: '.75rem' }}><span style={{ width: '67%' }} /></div><div className="data-list" style={{ marginTop: '1rem' }}><div className="data-row"><span className="muted">Vehicle</span><strong>{demoData.vehicle.registration}</strong></div><div className="data-row"><span className="muted">Fuel estimate</span><strong>{demoData.route.estimatedFuelLitres}</strong></div><div className="data-row"><span className="muted">Route distance</span><strong>{demoData.route.distanceKm}</strong></div></div></div></div></Shell>;
}

function CollectorJobs() {
  const [jobs, setJobs] = useState(demoData.jobs);
  const complete = (id) => setJobs(jobs.map(x => x.id === id ? { ...x, status: 'Completed' } : x));
  return <Shell role="collector" title="My jobs" subtitle="Your assigned stops for today."><div className="page-head"><div><div className="eyebrow">Tuesday route · RT-0624</div><h2>Keep the handoff moving.</h2><p>Mark a stop complete when the bags are loaded.</p></div><Link className="btn btn-primary" href="/collector/route" data-testid="button-jobs-route"><Map size={15} /> View route</Link></div><div className="panel"><div className="table-wrap"><table className="table"><thead><tr><th>Stop</th><th>Customer</th><th>Area</th><th>Window</th><th>Load</th><th>Status</th><th>Action</th></tr></thead><tbody>{jobs.map((job, i) => <tr key={job.id} data-testid={`row-job-${job.id}`}><td className="mono">{String(i + 1).padStart(2, '0')}</td><td><strong>{job.customer}</strong><div className="muted" style={{ fontSize: '.68rem', marginTop: '.2rem' }}>{job.id}</div></td><td>{job.area}</td><td>{job.time}</td><td>{job.bags}<div className="muted" style={{ fontSize: '.68rem', marginTop: '.2rem' }}>{job.type}</div></td><td><StatusBadge status={job.status} /></td><td>{job.status !== 'Completed' ? <button className="btn btn-secondary btn-sm" onClick={() => complete(job.id)} data-testid={`button-complete-job-${job.id}`}><Check size={14} /> Complete</button> : <span className="muted" style={{ fontSize: '.7rem' }}>Recorded in preview</span>}</td></tr>)}</tbody></table></div></div></Shell>;
}

function CollectorRoute() {
  return <Shell role="collector" title="Today’s route" subtitle="RT-0624 · Tuesday, 18 June 2024"><div className="grid-2"><div className="map-panel"><div className="map-river" /><div className="map-route" /><div className="map-pin a"><span className="mono">1</span></div><div className="map-pin b"><span className="mono">2</span></div><div className="map-pin c"><span className="mono">3</span></div><div className="map-legend"><strong>3 visible stops</strong><br /><span className="muted">18 total on today’s route</span></div></div><div className="panel panel-pad"><div className="mini-title"><h3>Route brief</h3><StatusBadge status="In progress" /></div><div className="data-list">{[['Stops', '18'], ['Distance', '32.4 km'], ['Fuel estimate', '8.6 L'], ['Fuel cost', 'GH₵ 127.84']].map(([a, b]) => <div className="data-row" key={a}><span className="muted">{a}</span><strong>{b}</strong></div>)}</div><button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => alert('Turn-by-turn navigation is unavailable in preview mode.')} data-testid="button-start-navigation"><RouteIcon size={15} /> Start navigation</button><div className="preview-note" style={{ marginTop: '1rem' }}><Zap size={14} /><span>Route geometry is illustrative preview data, not live navigation.</span></div></div></div></Shell>;
}

function CollectorEarnings() {
  return <Shell role="collector" title="Earnings" subtitle="A simple view of the work behind the numbers."><div className="grid-3"><div className="stat-card"><div className="stat-top"><span>This month</span><WalletCards size={16} /></div><div className="stat-value">GH₵ 4,280</div><div className="stat-foot">Paid through 14 Jun</div></div><div className="stat-card"><div className="stat-top"><span>Completed jobs</span><PackageCheck size={16} /></div><div className="stat-value">186</div><div className="stat-foot">+ 23 this month</div></div><div className="stat-card"><div className="stat-top"><span>Average per job</span><CircleDollarSign size={16} /></div><div className="stat-value">GH₵ 23</div><div className="stat-foot">Before fuel adjustment</div></div></div><div className="grid-2" style={{ marginTop: '1rem' }}><div className="panel panel-pad"><div className="mini-title"><h3>Weekly earnings</h3><span className="muted">June 2024</span></div><div className="chart"><div className="chart-lines"><i /><i /><i /><i /></div><div className="bars">{[44, 62, 51, 76, 67, 89, 74].map((h, i) => <span className="bar" style={{ height: `${h}%` }} key={i} />)}</div><div className="chart-labels">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((x, i) => <span key={i}>{x}</span>)}</div></div></div><div className="panel panel-pad"><div className="mini-title"><h3>Recent payouts</h3><span className="muted">Preview ledger</span></div><div className="data-list">{[['14 Jun', 'Route RT-0619', 'GH₵ 151.47'], ['12 Jun', 'Route RT-0612', 'GH₵ 117.24'], ['10 Jun', 'Route RT-0605', 'GH₵ 138.90'], ['07 Jun', 'Route RT-0597', 'GH₵ 126.42']].map(([a, b, c]) => <div className="data-row" key={a}><div className="data-main"><strong>{a}</strong><span>{b}</span></div><strong>{c}</strong></div>)}</div></div></div></Shell>;
}

function CollectorVehicle() {
  const [saved, setSaved] = useState(false);
  return <Shell role="collector" title="Vehicle" subtitle="The vehicle attached to your collector profile."><div className="grid-2"><div className="panel panel-pad"><div className="mini-title"><h3>Vehicle details</h3><StatusBadge status={demoData.vehicle.verificationStatus} /></div><div className="field"><label htmlFor="vehicle-registration">Registration</label><input id="vehicle-registration" defaultValue={demoData.vehicle.registration} data-testid="input-vehicle-registration" /></div><div className="input-grid"><div className="field"><label htmlFor="vehicle-make">Make</label><input id="vehicle-make" defaultValue={demoData.vehicle.make} data-testid="input-vehicle-make" /></div><div className="field"><label htmlFor="vehicle-model">Model</label><input id="vehicle-model" defaultValue={demoData.vehicle.model} data-testid="input-vehicle-model" /></div></div><div className="field"><label htmlFor="vehicle-type">Vehicle type</label><select id="vehicle-type" defaultValue={demoData.vehicle.type} data-testid="select-vehicle-type"><option>Light truck</option><option>Mini truck</option><option>Motor tricycle</option></select></div><button className="btn btn-primary" onClick={() => setSaved(true)} data-testid="button-save-vehicle">{saved ? <><Check size={15} /> Saved in preview</> : 'Save vehicle details'}</button></div><div className="panel panel-pad"><div className="mini-title"><h3>Capacity & fuel</h3><Truck size={18} className="muted" /></div>{[['Fuel type', demoData.vehicle.fuelType], ['Fuel economy', demoData.vehicle.fuelEconomy], ['Load capacity', demoData.vehicle.capacity], ['Last verified', '06 June 2024']].map(([a, b]) => <div className="data-row" key={a}><span className="muted">{a}</span><strong>{b}</strong></div>)}<div className="preview-note" style={{ marginTop: '1rem' }}><ShieldCheck size={14} /><span>Documents and verification updates need the operations service before they can be saved.</span></div></div></div></Shell>;
}

function AdminShellPage({ title, subtitle, children }) {
  return <Shell role="admin" title={title} subtitle={subtitle}>{children}</Shell>;
}

function AdminDashboard() {
  return <AdminShellPage title="Command centre" subtitle="Tuesday, 18 June 2024 · Accra network"><PreviewNote /><div className="page-head" style={{ marginTop: '1.4rem' }}><div><div className="eyebrow">Operations overview</div><h2>See the city in motion.</h2><p>Today’s network signal across households, collectors, and routes.</p></div><button className="btn btn-primary" onClick={() => alert('Report export is unavailable in preview mode.')} data-testid="button-export-report"><BarChart3 size={15} /> Export report</button></div><div className="grid-4"><div className="stat-card"><div className="stat-top"><span>Pickups today</span><PackageCheck size={16} /></div><div className="stat-value">190</div><div className="stat-foot" style={{ color: 'hsl(var(--primary))' }}>+12% vs last Tuesday</div></div><div className="stat-card"><div className="stat-top"><span>On-time rate</span><Clock3 size={16} /></div><div className="stat-value">92%</div><div className="stat-foot">Target: 90%</div></div><div className="stat-card"><div className="stat-top"><span>Active collectors</span><UsersRound size={16} /></div><div className="stat-value">18</div><div className="stat-foot">2 awaiting dispatch</div></div><div className="stat-card"><div className="stat-top"><span>Network revenue</span><CircleDollarSign size={16} /></div><div className="stat-value">GH₵ 8.4k</div><div className="stat-foot">Today’s estimate</div></div></div><div className="grid-2" style={{ marginTop: '1rem' }}><div className="panel panel-pad"><div className="mini-title"><h3>Collections this week</h3><Link href="/admin/analytics" data-testid="link-admin-analytics">Open analytics <ChevronRight size={14} style={{ verticalAlign: 'middle' }} /></Link></div><div className="chart"><div className="chart-lines"><i /><i /><i /><i /></div><div className="bars">{[59, 68, 82, 73, 91, 79, 86].map((h, i) => <span className="bar" style={{ height: `${h}%` }} key={i} />)}</div><div className="chart-labels">{['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'].map(x => <span key={x}>{x}</span>)}</div></div></div><div className="panel panel-pad"><div className="mini-title"><h3>Needs attention</h3><span className="badge badge-orange">4 items</span></div><div className="data-list">{[['Route RT-0621', 'Vehicle delay · Osu', 'Review'], ['Customer CB-1048', 'Address note missing', 'Open'], ['Vehicle VH-012', 'Verification due', 'Review'], ['Fuel price', 'Updated 17 Jun', 'View']].map(([a, b, c]) => <div className="data-row" key={a}><div className="data-main"><strong>{a}</strong><span>{b}</span></div><button className="btn btn-quiet btn-sm" onClick={() => alert(`${c} is available in the connected operations service.`)} data-testid={`button-attention-${a.replaceAll(' ', '-').toLowerCase()}`}>{c}</button></div>)}</div></div></div></AdminShellPage>;
}

function AdminTablePage({ kind }) {
  const config = {
    collections: ['Collections', 'All collection jobs across the network.', ['Pickup', 'Customer', 'Area', 'Schedule', 'Collector', 'Status'], demoData.pickups.map(x => [x.id, x.customer || 'Ama Osei', x.area, `${x.scheduledDate} · ${x.scheduledTime}`, x.assignedCollector, x.status])],
    customers: ['Customers', 'Households using CleanBridge GH.', ['Customer', 'Area', 'Phone', 'Pickups', 'Last activity'], [['Ama Osei', 'East Legon', '+233 24 555 0198', '12', 'Today'], ['Kofi Antwi', 'Adjiringanor', '+233 20 111 4832', '8', 'Yesterday'], ['Mavis Addo', 'Ogbodjo', '+233 55 449 1800', '19', '14 Jun']]],
    collectors: ['Collectors', 'People moving the network every day.', ['Collector', 'Area', 'Vehicle', 'Rating', 'Jobs', 'Status'], demoData.collectors.map(x => [x.name, x.area, x.vehicle, x.rating, x.completedJobs, x.status])],
    routes: ['Routes', 'Prepared route plans and their fuel assumptions.', ['Route', 'Date', 'Stops', 'Distance', 'Fuel estimate', 'Status'], demoData.routes.map(x => [x.id, x.date, x.stops, x.distanceKm, `${x.estimatedFuelLitres} · ${x.estimatedFuelCost}`, x.status])]
  }[kind];
  return <AdminShellPage title={config[0]} subtitle={config[1]}><PreviewNote /><div className="page-head" style={{ marginTop: '1.4rem' }}><div><div className="eyebrow">Operations directory</div><h2>{config[0]} at a glance.</h2><p>Preview records are ready for the future live operations API.</p></div><button className="btn btn-primary" onClick={() => alert('Creating records is unavailable in preview mode.')} data-testid={`button-add-${kind}`}><Plus size={15} /> Add {kind === 'routes' ? 'route' : kind.slice(0, -1)}</button></div><div className="panel"><div style={{ display: 'flex', gap: '.6rem', padding: '1rem', borderBottom: '1px solid hsl(var(--border))' }}><div className="field" style={{ flex: 1, margin: 0, position: 'relative' }}><Search size={15} style={{ position: 'absolute', left: '.8rem', top: '.75rem', color: 'hsl(var(--muted-foreground))' }} /><input style={{ paddingLeft: '2.2rem' }} placeholder={`Search ${kind}`} data-testid={`input-search-${kind}`} /></div><button className="icon-btn" onClick={() => alert('Filters are unavailable in preview mode.')} data-testid={`button-filter-${kind}`}><ListFilter size={16} /></button></div><div className="table-wrap"><table className="table"><thead><tr>{config[2].map(x => <th key={x}>{x}</th>)}<th /></tr></thead><tbody>{config[3].map((row, i) => <tr key={i} data-testid={`row-${kind}-${i}`}>{row.map((cell, j) => <td key={j}>{j === row.length - 1 ? <StatusBadge status={String(cell)} /> : cell}</td>)}<td><button className="btn btn-quiet btn-sm" onClick={() => alert('Record details are available in the connected operations service.')} data-testid={`button-view-${kind}-${i}`}>View</button></td></tr>)}</tbody></table></div></div></AdminShellPage>;
}

function AdminFuel() {
  return <AdminShellPage title="Fuel costs" subtitle="Keep route economics grounded in the current market."><div className="grid-2"><div className="panel panel-pad"><div className="mini-title"><h3>Current price</h3><Fuel size={18} className="muted" /></div><div className="stat-value">{demoData.fuelPrice.currentPrice}</div><div className="stat-foot">Effective {demoData.fuelPrice.effectiveDate}</div><div className="data-list" style={{ marginTop: '1.1rem' }}><div className="data-row"><span className="muted">Previous price</span><strong>{demoData.fuelPrice.previousPrice}</strong></div><div className="data-row"><span className="muted">Change</span><strong style={{ color: 'hsl(var(--accent))' }}>+ GH₵ 0.45 / L</strong></div></div></div><div className="panel panel-pad"><div className="mini-title"><h3>Fuel price history</h3><span className="muted">Diesel</span></div><div className="chart"><div className="chart-lines"><i /><i /><i /><i /></div><div className="bars">{[46, 52, 49, 67, 61, 77, 86].map((h, i) => <span className="bar" style={{ height: `${h}%` }} key={i} />)}</div><div className="chart-labels">{['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Now'].map(x => <span key={x}>{x}</span>)}</div></div></div></div><div className="panel panel-pad" style={{ marginTop: '1rem' }}><div className="mini-title"><h3>Update source</h3><StatusBadge status="Preview only" /></div><p className="muted" style={{ fontSize: '.8rem', lineHeight: 1.6 }}>The API does not yet expose fuel price records. This view is prepared for a future operations update flow and does not change route estimates.</p><button className="btn btn-outline" onClick={() => alert('Fuel price editing is unavailable in preview mode.')} data-testid="button-update-fuel"><Fuel size={15} /> Update fuel price</button></div></AdminShellPage>;
}

function AdminPricing() {
  const [saved, setSaved] = useState(false);
  return <AdminShellPage title="Pricing" subtitle="Transparent rules for a fair collection estimate."><PreviewNote /><div className="grid-2" style={{ marginTop: '1rem' }}><div className="panel panel-pad"><div className="mini-title"><h3>Base pricing</h3><CircleDollarSign size={18} className="muted" /></div>{[['Base fee', demoData.pricing.baseFee], ['Distance fee', demoData.pricing.distanceFee], ['Quantity fee', demoData.pricing.quantityFee], ['Waste-type adjustment', demoData.pricing.wasteTypeFees]].map(([a, b]) => <div className="data-row" key={a}><label className="muted" htmlFor={a}>{a}</label><input id={a} defaultValue={b} style={{ width: '130px', padding: '.5rem', border: '1px solid hsl(var(--border))', borderRadius: '.5rem', textAlign: 'right', fontSize: '.78rem' }} data-testid={`input-pricing-${a.replaceAll(' ', '-').toLowerCase()}`} /></div>)}</div><div className="panel panel-pad"><div className="mini-title"><h3>Adjustments</h3><Settings2 size={18} className="muted" /></div>{[['Urgency fee', demoData.pricing.urgencyFee], ['Weekend fee', demoData.pricing.weekendFee], ['Minimum charge', 'GH₵ 25.00'], ['Collector share', '65%']].map(([a, b]) => <div className="data-row" key={a}><label className="muted" htmlFor={a}>{a}</label><input id={a} defaultValue={b} style={{ width: '130px', padding: '.5rem', border: '1px solid hsl(var(--border))', borderRadius: '.5rem', textAlign: 'right', fontSize: '.78rem' }} data-testid={`input-adjustment-${a.replaceAll(' ', '-').toLowerCase()}`} /></div>)}<button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={() => setSaved(true)} data-testid="button-save-pricing">{saved ? <><Check size={15} /> Saved in preview</> : 'Save pricing rules'}</button></div></div></AdminShellPage>;
}

function AdminAnalytics() {
  return <AdminShellPage title="Analytics" subtitle="Patterns worth acting on, not vanity numbers."><div className="grid-3"><div className="stat-card"><div className="stat-top"><span>Monthly revenue</span><CircleDollarSign size={16} /></div><div className="stat-value">GH₵ 42.8k</div><div className="stat-foot">Across 1,184 pickups</div></div><div className="stat-card"><div className="stat-top"><span>Recycling share</span><Activity size={16} /></div><div className="stat-value">31.4%</div><div className="stat-foot">+4.2 points this month</div></div><div className="stat-card"><div className="stat-top"><span>Fuel per stop</span><Fuel size={16} /></div><div className="stat-value">0.48 L</div><div className="stat-foot">Down from 0.53 L</div></div></div><div className="grid-2" style={{ marginTop: '1rem' }}><div className="panel panel-pad"><div className="mini-title"><h3>Pickups over time</h3><span className="muted">Last 7 days</span></div><div className="chart"><div className="chart-lines"><i /><i /><i /><i /></div><div className="bars">{[45, 58, 67, 61, 80, 72, 91].map((h, i) => <span className="bar" style={{ height: `${h}%` }} key={i} />)}</div><div className="chart-labels">{['12 Jun', '13', '14', '15', '16', '17', '18'].map(x => <span key={x}>{x}</span>)}</div></div></div><div className="panel panel-pad"><div className="mini-title"><h3>Waste categories</h3><span className="muted">Current month</span></div>{[['Household mix', '54%', 54], ['Recyclables', '31%', 31], ['Garden waste', '10%', 10], ['Bulky items', '5%', 5]].map(([a, b, c]) => <div key={a} style={{ marginBottom: '1rem' }}><div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '.4rem', fontSize: '.75rem' }}><span>{a}</span><strong>{b}</strong></div><div className="progress"><span style={{ width: `${c}%` }} /></div></div>)}</div></div></AdminShellPage>;
}

function NotFound() {
  return <div className="not-found"><div><Logo /><h1>404</h1><p>That route is not on today’s collection plan.</p><Link href="/" className="btn btn-primary" data-testid="link-not-found-home"><ArrowLeft size={15} /> Return home</Link></div></div>;
}

function RouteView() {
  return <Switch><Route path="/" component={Landing} /><Route path="/login"><AuthPage /></Route><Route path="/register"><AuthPage register /></Route><Route path="/dashboard" component={CustomerDashboard} /><Route path="/pickup" component={PickupRequest} /><Route path="/pickups" component={Pickups} /><Route path="/pickup/:id" component={PickupDetail} /><Route path="/map" component={MapPage} /><Route path="/notifications" component={Notifications} /><Route path="/profile" component={Profile} /><Route path="/collector/dashboard" component={CollectorDashboard} /><Route path="/collector/jobs" component={CollectorJobs} /><Route path="/collector/route" component={CollectorRoute} /><Route path="/collector/earnings" component={CollectorEarnings} /><Route path="/collector/vehicle" component={CollectorVehicle} /><Route path="/admin/dashboard" component={AdminDashboard} /><Route path="/admin/collections"><AdminTablePage kind="collections" /></Route><Route path="/admin/customers"><AdminTablePage kind="customers" /></Route><Route path="/admin/collectors"><AdminTablePage kind="collectors" /></Route><Route path="/admin/routes"><AdminTablePage kind="routes" /></Route><Route path="/admin/map"><MapPage admin /></Route><Route path="/admin/fuel" component={AdminFuel} /><Route path="/admin/pricing" component={AdminPricing} /><Route path="/admin/analytics" component={AdminAnalytics} /><Route component={NotFound} /></Switch>;
}

export default function App() {
  return <Router base={import.meta.env.BASE_URL.replace(/\/$/, '')}><RouteView /></Router>;
}