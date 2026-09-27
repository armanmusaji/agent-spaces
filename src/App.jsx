import { useEffect, useMemo, useRef, useState } from 'react'
import { AGENTS, SPACES, INITIAL_ITEMS, ROUNDS, TRIAL_SETTINGS, RULES } from './data.js'
import { SCREEN_COMPONENTS } from './Screens.jsx'

/* ---------- helpers ---------- */

function useScale(ref, natural = 390) {
  const [s, setS] = useState(1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setS(Math.min(1, e.contentRect.width / natural)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [ref, natural])
  return s
}

function Agent({ id, edited }) {
  const a = AGENTS[id]
  return <span className={'who who-' + id}>{a.name}{edited ? `, edited by ${AGENTS[edited].name}` : ''}</span>
}

/* ---------- needs-you strip ---------- */

function NeedsYou({ items, onOpen, resolved }) {
  const open = items.filter(i => !i.resolution)
  return (
    <section className="needs" aria-labelledby="needs-h">
      <div className="needs-head">
        <h2 id="needs-h">
          {open.length ? <>Needs you <span className="count" aria-hidden="true">{open.length}</span></> : 'Nothing needs you'}
        </h2>
        <p className="needs-sub" aria-live="polite">
          {open.length
            ? `${open.length} open ${open.length === 1 ? 'decision' : 'decisions'}. Tap one to rule where the work is.`
            : 'Both agents can continue. Round 2 review starts when Claude files proposals on Direction B.'}
        </p>
      </div>
      {open.length > 0 && (
        <ol className="needs-list">
          {open.map(i => (
            <li key={i.id}>
              <button className={'need need-' + i.kind} onClick={() => onOpen(i.id)} aria-describedby={'need-b-' + i.id}>
                <span className="need-kind">{i.kind === 'proposal' ? 'Proposal' : i.kind === 'exception' ? 'Shared part' : 'Ready for review'}</span>
                <span className="need-title">{i.title}</span>
                <span className="need-from">from <Agent id={i.from} /></span>
                <span id={'need-b-' + i.id} className="sr-only">{i.body}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
      {resolved.length > 0 && (
        <details className="resolved">
          <summary>Ruled this session ({resolved.length})</summary>
          <ul>
            {resolved.map(r => (
              <li key={r.id}><strong>{r.choiceLabel}</strong> · {r.title} <button className="link" onClick={() => r.undo()}>Undo</button></li>
            ))}
          </ul>
        </details>
      )}
    </section>
  )
}

/* ---------- ruling dialog ---------- */

function Ruling({ item, onRule, onClose }) {
  const [picked, setPicked] = useState(null)
  const first = useRef(null)
  useEffect(() => { first.current?.focus() }, [])
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  const choice = item.choices.find(c => c.id === picked)
  return (
    <div className="scrim" onClick={onClose}>
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-t" onClick={e => e.stopPropagation()}>
        <p className="eyebrow">{item.kind === 'proposal' ? 'Proposal' : item.kind === 'exception' ? 'Request to change a shared part' : 'Ready for review'} · from <Agent id={item.from} /></p>
        <h3 id="dlg-t">{item.title}</h3>
        <p>{item.body}</p>
        {item.reply && <p className="reply">{item.reply}</p>}
        {item.reach && <p className="reach">{item.reach}</p>}
        <fieldset>
          <legend>Your ruling</legend>
          {item.choices.map((c, i) => (
            <label key={c.id} className={'choice' + (picked === c.id ? ' on' : '')}>
              <input ref={i === 0 ? first : null} type="radio" name="rule" value={c.id} checked={picked === c.id} onChange={() => setPicked(c.id)} />
              <span className="choice-l">{c.label}</span>
              <span className="choice-r">{c.result}</span>
            </label>
          ))}
        </fieldset>
        <div className="dlg-actions">
          <button className="btn" disabled={!choice} onClick={() => onRule(item.id, choice)}>Rule: {choice ? choice.label : 'choose one'}</button>
          <button className="btn btn-quiet" onClick={onClose}>Not now</button>
        </div>
      </div>
    </div>
  )
}

/* ---------- rounds ---------- */

function Rounds({ rounds }) {
  return (
    <section className="rounds" aria-labelledby="rounds-h">
      <h2 id="rounds-h">Rounds</h2>
      <ol className="round-list">
        {rounds.map(r => (
          <li key={r.id} className="round">
            <div className="round-name">{r.name} <span className="mode">{r.mode}</span></div>
            <ol className="steps">
              {r.steps.map((s, i) => <li key={s} className={i < r.done ? 'done' : i === r.done ? 'now' : ''}>{s}</li>)}
            </ol>
            {r.ruling ? <p className="round-ruling"><strong>Ruling:</strong> {r.ruling}</p> : <p className="round-ruling muted">Ruling comes after Pick.</p>}
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ---------- spaces ---------- */

function Screen({ screen, spaceAgent, marks, focusPill, onPill }) {
  const wrap = useRef(null)
  const s = useScale(wrap)
  const Cmp = SCREEN_COMPONENTS[screen.id]
  return (
    <div className="screen">
      <div className="screen-stage" ref={wrap} style={{ height: 844 * s }}>
        <div className="screen-scale" style={{ transform: `scale(${s})` }}><Cmp /></div>
        {screen.pills.map(p => (
          <button
            key={p.n}
            className={`pill pill-${p.editedBy || spaceAgent}` + (focusPill === p.n ? ' pill-focus' : '')}
            style={{ top: `${p.y}%` }}
            onClick={() => onPill(p.n)}
            aria-label={`Note ${p.n}: ${p.tag}`}
          >{p.n}</button>
        ))}
        {marks.map(m => <span key={m.id} className={'mark mark-' + m.kind} style={{ top: `${m.y}%` }}>{m.label}</span>)}
      </div>
      <div className="legend">
        <h4>{screen.title}: why it is like this</h4>
        <ol>
          {screen.pills.map(p => (
            <li key={p.n} id={`leg-${screen.id}-${p.n}`} className={focusPill === p.n ? 'leg-focus' : ''}>
              <span className={`pill pill-static pill-${p.editedBy || spaceAgent}`} aria-hidden="true">{p.n}</span>
              <div>
                <div className="leg-tag">{p.tag}{p.editedBy && <> · <Agent id={spaceAgent} edited={p.editedBy} /></>}</div>
                <div className="leg-note">{p.note}</div>
                {p.agreed && <div className="leg-agreed">{p.agreed}</div>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function useIsPhone() {
  const [p, setP] = useState(() => window.matchMedia('(max-width: 719px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 719px)')
    const fn = e => setP(e.matches)
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [])
  return p
}

function Space({ space, marks, focus, setFocus, highlighted }) {
  const phone = useIsPhone()
  const [openOnPhone, setOpenOnPhone] = useState(false)
  useEffect(() => { if (focus && space.screens.some(s => s.id === focus.screen)) setOpenOnPhone(true) }, [focus, space.screens])
  const show = !phone || openOnPhone
  return (
    <section id={'space-' + space.id} className={`space space-${space.agent}` + (highlighted ? ' space-hi' : '')} aria-labelledby={'sp-' + space.id}>
      <header className="space-head">
        <div className="space-owner"><Agent id={space.agent} /> · {space.status === 'ready' ? 'Ready for review' : space.status}</div>
        <h3 id={'sp-' + space.id}>{space.title}</h3>
        <p className="bet">{space.bet}</p>
      </header>
      {phone && (
        <button className="btn btn-quiet phone-toggle" aria-expanded={show} onClick={() => setOpenOnPhone(v => !v)}>
          {show ? 'Hide screens and notes' : `Show 3 screens and notes`}
        </button>
      )}
      {show && <div className="screens">
        {space.screens.map(sc => (
          <Screen key={sc.id} screen={sc} spaceAgent={space.agent}
            marks={marks.filter(m => m.screen === sc.id)}
            focusPill={focus?.screen === sc.id ? focus.pill : null}
            onPill={n => setFocus({ screen: sc.id, pill: n })} />
        ))}
      </div>}
    </section>
  )
}

/* ---------- settings ---------- */

function Settings({ settings, onChange }) {
  return (
    <section className="settings" aria-labelledby="set-h">
      <h2 id="set-h">Editing rules on this page</h2>
      <ul className="rules">{RULES.map(r => <li key={r}>{r}</li>)}</ul>
      <h3>Trial settings <span className="tag-trial">not settled</span></h3>
      {settings.map(s => (
        <div key={s.id} className="setting">
          <div className="setting-l">{s.label}</div>
          <div className="seg" role="group" aria-label={s.label}>
            {s.options.map((o, i) => (
              <button key={o} className={'seg-b' + (s.value === i ? ' on' : '')} aria-pressed={s.value === i} onClick={() => onChange(s.id, i)}>{o}</button>
            ))}
          </div>
          <p className="setting-why">{s.why}</p>
        </div>
      ))}
    </section>
  )
}

/* ---------- app ---------- */

export default function App() {
  const [items, setItems] = useState(INITIAL_ITEMS)
  const [openId, setOpenId] = useState(null)
  const [focus, setFocus] = useState(null)
  const [hi, setHi] = useState(null)
  const [settings, setSettings] = useState(TRIAL_SETTINGS)
  const [rounds, setRounds] = useState(ROUNDS)
  const [log, setLog] = useState([])

  const openItem = items.find(i => i.id === openId)

  function goTo(item) {
    const t = item.target
    if (t.space === 'shared') { setHi(null); return }
    setHi(t.space)
    if (t.screen && t.pill) setFocus({ screen: t.screen, pill: t.pill })
    document.getElementById('space-' + t.space)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setTimeout(() => setHi(null), 2400)
  }

  function open(id) {
    const it = items.find(i => i.id === id)
    goTo(it)
    setOpenId(id)
  }

  function rule(id, choice) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, resolution: choice } : i))
    setLog(prev => [{ id, at: Date.now(), choice }, ...prev])
    setOpenId(null)
    if (id === 'r1' && choice.id === 'review') setRounds(r => r.map(x => x.id === 'r2' ? { ...x, done: 2 } : x))
  }

  function undo(id) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, resolution: null } : i))
    setLog(prev => prev.filter(l => l.id !== id))
    if (id === 'r1') setRounds(r => r.map(x => x.id === 'r2' ? { ...x, done: 1 } : x))
  }

  const resolved = useMemo(() => log.map(l => {
    const it = items.find(i => i.id === l.id)
    return { id: l.id, title: it.title, choiceLabel: l.choice.label, undo: () => undo(l.id) }
  }), [log, items])

  // marks placed on objects after a ruling
  const marks = useMemo(() => {
    const m = []
    for (const it of items) {
      if (!it.resolution) continue
      if (it.id === 'p1') m.push({ id: 'm-p1', screen: 'a2', y: 21, kind: it.resolution.id, label: it.resolution.id === 'agree' ? 'Agreed · Claude applies next' : it.resolution.id === 'decline' ? 'Declined' : 'Deferred' })
      if (it.id === 'x1') {
        const lab = it.resolution.id === 'allow' ? 'Session row · changed once, by Claude' : it.resolution.id === 'copy' ? 'Local copy in Direction A' : 'Unchanged · no waitlist'
        m.push({ id: 'm-x1-a', screen: 'a2', y: 40, kind: it.resolution.id, label: lab })
        if (it.resolution.id === 'allow') m.push({ id: 'm-x1-b', screen: 'b2', y: 40, kind: 'allow', label: 'Session row · changed once, by Claude' })
      }
    }
    return m
  }, [items])

  return (
    <div className="app">
      <a className="skip" href="#needs-h">Skip to what needs you</a>
      <header className="top">
        <div>
          <p className="eyebrow">Project page · Harbor Street Library · Event signup</p>
          <h1>Agent Spaces</h1>
        </div>
        <p className="top-note">Fictional design tool. Two scripted agents. Content from a real working trial.</p>
      </header>

      <NeedsYou items={items} onOpen={open} resolved={resolved} />
      <Rounds rounds={rounds} />

      <div className="spaces">
        {SPACES.map(sp => <Space key={sp.id} space={sp} marks={marks} focus={focus} setFocus={setFocus} highlighted={hi === sp.id} />)}
      </div>

      <Settings settings={settings} onChange={(id, v) => setSettings(s => s.map(x => x.id === id ? { ...x, value: v } : x))} />

      <footer className="foot">
        <p>Self-initiated concept. Not affiliated with any company. Agents are scripted; nothing here claims real agents obey these boundaries.</p>
      </footer>

      {openItem && <Ruling item={openItem} onRule={rule} onClose={() => setOpenId(null)} />}
    </div>
  )
}
