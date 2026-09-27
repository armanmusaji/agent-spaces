import { EVENT } from './data.js'

// The six trial screens, rebuilt as DOM at 390 x 844. Fictional product; no Figma UI.

function Phone({ children, dim }) {
  return <div className={'ph' + (dim ? ' ph-dim' : '')}>{children}</div>
}

function Row({ k, v }) {
  return <div className="ph-row"><span className="ph-k">{k}</span><span className="ph-v">{v}</span></div>
}

function SessionRow({ s, state }) {
  const full = s.seats === 0
  return (
    <div className={'ph-sess ph-sess-' + state}>
      <div className="ph-sess-text">
        <div className="ph-sess-when">{s.when}</div>
        <div className={'ph-sess-seats' + (full ? ' full' : '')}>{full ? 'Full. No waitlist for this session.' : `${s.seats} seats left`}</div>
      </div>
      {!full && <span className={'ph-radio' + (state === 'sel' ? ' on' : '')} aria-hidden="true" />}
    </div>
  )
}

function Field({ label, value, placeholder }) {
  return (
    <div className="ph-field">
      <div className="ph-field-l">{label}</div>
      <div className={'ph-field-v' + (value ? '' : ' ph-ph')}>{value || placeholder || ' '}</div>
    </div>
  )
}

export function A1() {
  return (
    <Phone>
      <div className="ph-top"><span className="ph-link">‹ Events</span></div>
      <div className="ph-head">
        <div className="ph-kicker">{EVENT.kicker.toUpperCase()}</div>
        <div className="ph-title">{EVENT.title}</div>
        <div className="ph-sub">3 sessions in October · Community Room B</div>
      </div>
      <div className="ph-body">
        <Row k="Where" v={EVENT.where} />
        <Row k="Cost" v={EVENT.cost} />
        <Row k="Host" v={EVENT.host} />
        <Row k="Access" v={EVENT.access} />
        <div className="ph-h2">About this workshop</div>
        <p>{EVENT.blurb}</p>
      </div>
      <div className="ph-bar">
        <div className="ph-btn">Choose a session</div>
        <div className="ph-cap center">2 of 3 sessions have seats</div>
      </div>
    </Phone>
  )
}

export function A2() {
  return (
    <Phone dim>
      <div className="ph-top"><span className="ph-link">‹ Events</span></div>
      <div className="ph-head"><div className="ph-kicker">{EVENT.kicker.toUpperCase()}</div></div>
      <div className="ph-sheet">
        <div className="ph-handle" />
        <div className="ph-sheet-head">
          <div>
            <div className="ph-h2">Choose a session</div>
            <div className="ph-cap">{EVENT.title} · 90 minutes</div>
            <div className="ph-cap ph-linkc">Back to event keeps your choices</div>
          </div>
          <span className="ph-x" aria-hidden="true">✕</span>
        </div>
        <SessionRow s={EVENT.sessions[0]} state="def" />
        <SessionRow s={EVENT.sessions[1]} state="full" />
        <SessionRow s={EVENT.sessions[2]} state="sel" />
        <div className="ph-label">Your details</div>
        <Field label="Name" value="Ada Okafor" />
        <Field label="Email" value="ada@example.com" />
        <Field label="Phone (optional)" />
        <div className="ph-btn">Sign up for Oct 17</div>
        <div className="ph-cap center">Confirmation and a reminder go to your email.</div>
      </div>
    </Phone>
  )
}

export function A3() {
  return (
    <Phone>
      <div className="ph-top"><span className="ph-link">Done</span></div>
      <div className="ph-body">
        <div className="ph-check" aria-hidden="true">✓</div>
        <div className="ph-title">You're signed up, Ada</div>
        <p className="ph-muted">A confirmation is on its way to ada@example.com. We'll send a reminder before the session.</p>
        <div className="ph-card">
          <div className="ph-h3">{EVENT.title}</div>
          <Row k="When" v="Sat, Oct 17 · 10:00 to 11:30" />
          <Row k="Where" v="Harbor Street Library, Community Room B, 2nd floor (elevator available)" />
          <Row k="Bring" v="A laptop if you have one. A few are available to borrow." />
        </div>
      </div>
      <div className="ph-bar">
        <div className="ph-btn">Add to calendar</div>
        <div className="ph-btn ph-btn2">Cancel signup</div>
        <div className="ph-cap center">Cancel any time before the session starts. Your seat goes back to the list and you return to Events.</div>
      </div>
    </Phone>
  )
}

export function B1() {
  return (
    <Phone>
      <div className="ph-top ph-stack"><span className="ph-status">9:41</span><span className="ph-link">‹ Events</span><span className="ph-brand">HARBOR STREET LIBRARY</span></div>
      <div className="ph-body pad">
        <div className="ph-title">{EVENT.title}</div>
        <p>{EVENT.blurb}</p>
        <div className="ph-card">
          <div className="ph-strong">{EVENT.cost}</div>
          <div>Harbor Street Library, Community Room B (2nd floor, elevator available)</div>
          <div className="ph-cap">Host: {EVENT.host}</div>
        </div>
        <div className="ph-h2">Accessibility</div>
        <p>{EVENT.access}</p>
        <div className="ph-label">Three sessions in October</div>
        <div className="ph-cap">Oct 10 and Oct 17 have seats. Oct 13 is full.</div>
      </div>
      <div className="ph-bar"><div className="ph-btn">Choose a session</div></div>
    </Phone>
  )
}

export function B2() {
  return (
    <Phone>
      <div className="ph-top ph-stack"><span className="ph-status">9:41</span><span className="ph-link">Back to event</span><span className="ph-cap">Step 1 of 2 · Sign up</span></div>
      <div className="ph-body pad">
        <div className="ph-title">Choose a session</div>
        <div className="ph-cap">{EVENT.title}</div>
        <SessionRow s={EVENT.sessions[0]} state="sel" />
        <SessionRow s={EVENT.sessions[1]} state="full" />
        <SessionRow s={EVENT.sessions[2]} state="def" />
        <div className="ph-label">Your details</div>
        <Field label="Name" value="Alex Morgan" />
        <Field label="Email" value="alex.morgan@example.com" />
        <Field label="Phone (optional)" placeholder="Enter phone number" />
        <div className="ph-btn">Sign up for Oct 10</div>
        <div className="ph-cap">Free. Confirmation and reminders by email.</div>
      </div>
    </Phone>
  )
}

export function B3() {
  return (
    <Phone>
      <div className="ph-top ph-stack"><span className="ph-status">9:41</span><span className="ph-link">Done</span><span className="ph-brand">HARBOR STREET LIBRARY</span><span className="ph-cap">Step 2 of 2 · Confirmed</span></div>
      <div className="ph-body pad">
        <div className="ph-title">You're signed up</div>
        <div className="ph-cap">Confirmation is on its way to alex.morgan@example.com. We'll email reminders.</div>
        <div className="ph-h3">{EVENT.title}</div>
        <div className="ph-card ph-card-accent">
          <div className="ph-strong">Sat, Oct 10 · 10:00 to 11:30</div>
          <div>Harbor Street Library, Community Room B (2nd floor, elevator available)</div>
          <div className="ph-cap">Alex Morgan</div>
        </div>
        <div className="ph-h2">What to bring</div>
        <p>Bring a laptop if you have one; a few are available to borrow.</p>
        <div className="ph-cap">{EVENT.access}</div>
      </div>
      <div className="ph-bar">
        <div className="ph-btn">Add to calendar</div>
        <div className="ph-btn ph-btn2">Cancel signup</div>
        <div className="ph-cap center">Cancel any time before the session starts.</div>
      </div>
    </Phone>
  )
}

export const SCREEN_COMPONENTS = { a1: A1, a2: A2, a3: A3, b1: B1, b2: B2, b3: B3 }
