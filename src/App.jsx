import { useEffect, useMemo, useRef, useState } from 'react'
import { AGENTS, SPACES, INITIAL_ITEMS, ROUNDS, TRIAL_SETTINGS, RULES } from './data.js'
import { SCREEN_COMPONENTS, Scenario } from './Screens.jsx'

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

function Agent({ id, edited }) {
  const a = AGENTS[id]
  return <span className={'who who-' + id}>{a.name}{edited ? `, edited by ${AGENTS[edited].name}` : ''}</span>
}

const KIND_LABEL = { proposal: 'Proposal', exception: 'Shared part', ready: 'Ready for review' }

/* ---------- needs-you strip ---------- */

function NeedsYou({ items, onOpen, history, onUndo, onJump, phone, collapseTick, expandTick }) {
  const open = items.filter(i => i.status === 'open')
  const deferred = items.filter(i => i.status === 'deferred')
  const [expanded, setExpanded] = useState(!phone)
  useEffect(() => { setExpanded(!phone) }, [phone])
  useEffect(() => { if (phone && collapseTick) setExpanded(false) }, [phone, collapseTick])
  useEffect(() => { if (expandTick) setExpanded(true) }, [expandTick])
  const summary = open.length
    ? `${open.length} open ${open.length === 1 ? 'decision' : 'decisions'}${deferred.length ? `, ${deferred.length} deferred to next round` : ''}. Tap one to rule where the work is.`
    : deferred.length
      ? `Nothing needs you now. ${deferred.length} ${deferred.length === 1 ? 'decision is' : 'decisions are'} deferred and will come back next round.`
      : 'Nothing needs you. Both agents can continue.'
  return (
    <section className={'needs' + (phone && !expanded ? ' needs-compact' : '')} aria-labelledby="needs-h">
      <div className="needs-head">
        <h2 id="needs-h">
          {open.length ? <>Needs you <span className="count" aria-hidden="true">{open.length}</span></> : deferred.length ? 'Nothing needs you now' : 'Nothing needs you'}
        </h2>
        <p className="needs-sub" aria-live="polite">{summary}</p>
        {phone && (open.length > 0 || history.length > 0) && (
          <button className="btn btn-quiet btn-sm" aria-expanded={expanded} onClick={() => setExpanded(v => !v)}>{expanded ? 'Hide list' : 'Show list'}</button>
        )}
      </div>
      {expanded && open.length > 0 && (
        <ol className="needs-list">
          {open.map(i => (
            <li key={i.id}>
              <button id={'need-' + i.id} className={'need need-' + i.kind} onClick={() => onOpen(i.id)} aria-describedby={'need-b-' + i.id}>
                <span className="need-kind">{KIND_LABEL[i.kind]}{i.laterAt ? ' · marked Later' : ''}</span>
                <span className="need-title">{i.title}</span>
                <span className="need-from">from <Agent id={i.from} /></span>
                <span id={'need-b-' + i.id} className="sr-only">{i.body}</span>
              </button>
            </li>
          ))}
        </ol>
      )}
      {expanded && deferred.length > 0 && (
        <div className="deferred">
          <h3>Deferred to next round</h3>
          <ul>
            {deferred.map(i => (
              <li key={i.id}>
                <button className="link" onClick={() => onJump(i.id)}>{i.title}</button>
                <button className="link" onClick={() => onUndo(i.id)}>Undo defer</button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {expanded && history.length > 0 && (
        <details className="resolved" open={!phone}>
          <summary>Ruled this session ({history.length})</summary>
          <ul>
            {history.map(h => (
              <li key={h.id}>
                <strong>{h.choiceLabel}</strong> · <button className="link link-inline" onClick={() => onJump(h.id)}>{h.title}</button>
                <button className="link" onClick={() => onUndo(h.id)}>Undo</button>
              </li>
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
  const box = useRef(null)
  useEffect(() => {
    const first = box.current?.querySelector('input[type=radio]')
    first?.focus()
  }, [])
  useEffect(() => {
    const onKey = e => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); return }
      if (e.key !== 'Tab' || !box.current) return
      const all = [...box.current.querySelectorAll('input:not([disabled]), button:not([disabled])')]
      const radios = all.filter(x => x.type === 'radio')
      const stop = radios.find(x => x.checked) || radios[0]
      const f = all.filter(x => x.type !== 'radio' || x === stop)
      if (!f.length) return
      const first = f[0], last = f[f.length - 1]
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
      else if (!box.current.contains(document.activeElement)) { e.preventDefault(); first.focus() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])
  const choice = item.choices.find(c => c.id === picked)
  return (
    <div className="scrim" onClick={onClose}>
      <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="dlg-t" ref={box} onClick={e => e.stopPropagation()}>
        <p className="eyebrow">{item.kind === 'proposal' ? 'Proposal' : item.kind === 'exception' ? 'Request to change a shared part' : 'Ready for review'} · from <Agent id={item.from} /></p>
        <h3 id="dlg-t">{item.title}</h3>
        <p>{item.body}</p>
        {item.reply && <p className="reply">{item.reply}</p>}
        {item.reach && <p className="reach">{item.reach}</p>}
        <fieldset>
          <legend>Your ruling</legend>
          {item.choices.map(c => (
            <label key={c.id} className={'choice' + (picked === c.id ? ' on' : '')}>
              <input type="radio" name="rule" value={c.id} checked={picked === c.id} onChange={() => setPicked(c.id)} />
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

function Rounds({ rounds, reviewing, mode, next }) {
  return (
    <section className="rounds" aria-labelledby="rounds-h">
      <h2 id="rounds-h">Rounds</h2>
      <ol className="round-list">
        {rounds.map(r => (
          <li key={r.id} className="round">
            <div className="round-name">{r.name} <span className="mode">{r.id === 'r2' ? (mode === 0 ? 'Shared space' : 'Separate spaces') : r.mode}</span></div>
            <ol className="steps">
              {r.steps.map((s, i) => <li key={s} className={i < r.done ? 'done' : i === r.done ? 'now' : ''}>{s}{r.id === 'r2' && s === 'Review' && reviewing ? ' · in progress' : ''}</li>)}
            </ol>
            {r.ruling ? <p className="round-ruling"><strong>Ruling:</strong> {r.id === 'r1' ? (next === 0 ? 'Both directions carried forward with agreed fixes. Each carried-forward object names its next editor; Astra on hers, Claude on his, proposals across.' : 'Both directions carried forward with agreed fixes. Astra takes the next turn on every carried-forward object; Claude proposes.') : r.ruling}</p> : <p className="round-ruling muted">{reviewing ? 'Review is open. Pick comes after both agents have reviewed.' : 'Ruling comes after Pick.'}</p>}
          </li>
        ))}
      </ol>
    </section>
  )
}

/* ---------- spaces ---------- */

function Screen({ screen, spaceAgent, marks, focusPill, onPill, notes = {} }) {
  const wrap = useRef(null)
  const s = useScale(wrap)
  const Cmp = SCREEN_COMPONENTS[screen.id]
  return (
    <div className="screen" id={'screen-' + screen.id}>
      <div className="screen-stage" ref={wrap} style={{ height: 844 * s }}>
        <div className="screen-scale" style={{ transform: `scale(${s})` }} aria-label={`${screen.title}, design preview`}><Cmp /></div>
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
        <h4><span>{screen.title}: why it is like this</span><span className="legend-tag">Design preview, not a working app</span></h4>
        <ol>
          {screen.pills.map(p => (
            <li key={p.n} id={`leg-${screen.id}-${p.n}`} className={focusPill === p.n ? 'leg-focus' : ''}>
              <span className={`pill pill-static pill-${p.editedBy || spaceAgent}`} aria-hidden="true">{p.n}</span>
              <div>
                <div className="leg-tag">{p.tag}{p.editedBy && <> · <Agent id={spaceAgent} edited={p.editedBy} /></>}</div>
                <div className="leg-note">{notes[p.n] ? notes[p.n].note : p.note}</div>
                {notes[p.n] && <div className="leg-ruled">{notes[p.n].ruled}</div>}
                {p.agreed && <div className="leg-agreed">{p.agreed}</div>}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

function Space({ space, status, marks, focus, setFocus, highlighted, forceOpen, notes, mode, next }) {
  const phone = useIsPhone()
  const [openOnPhone, setOpenOnPhone] = useState(false)
  useEffect(() => { if (focus && space.screens.some(s => s.id === focus.screen)) setOpenOnPhone(true) }, [focus, space.screens])
  useEffect(() => { if (forceOpen) setOpenOnPhone(true) }, [forceOpen])
  const show = !phone || openOnPhone
  const statusText = status === 'review' ? 'In review · Claude proposes next' : 'Ready for review'
  const editLine = next === 0
    ? `Edits here: ${AGENTS[space.agent].name} on ${space.agent === 'claude' ? 'his' : 'her'} own objects; the other agent proposes.`
    : `Edits here: Astra's turn on every carried-forward object; Claude proposes.`
  const modeLine = mode === 0 ? 'Round 2 · shared space with the other direction' : 'Round 2 · own space'
  return (
    <section id={'space-' + space.id} className={`space space-${space.agent}` + (highlighted ? ' space-hi' : '')} aria-labelledby={'sp-' + space.id}>
      <header className="space-head">
        <div className="space-owner"><Agent id={space.agent} /> · <span className={'status status-' + status}>{statusText}</span></div>
        <h3 id={'sp-' + space.id}>{space.title}</h3>
        <p className="bet">{space.bet}</p>
        <p className="space-rules"><span>{modeLine}</span> · <span>{editLine}</span></p>
      </header>
      {phone && (
        <button className="btn btn-quiet phone-toggle" aria-expanded={show} onClick={() => setOpenOnPhone(v => !v)}>
          {show ? 'Hide screens and notes' : 'Show 3 screens and notes'}
        </button>
      )}
      {show && <div className="screens">
        {space.screens.map(sc => (
          <Screen key={sc.id} screen={sc} spaceAgent={space.agent}
            marks={marks.filter(m => m.screen === sc.id)}
            focusPill={focus?.screen === sc.id ? focus.pill : null}
            notes={notes[sc.id] || {}}
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
          <p className="setting-effect" aria-live="polite"><strong>On this page now:</strong> {s.effects[s.value]}</p>
          <p className="setting-why">{s.why}</p>
        </div>
      ))}
    </section>
  )
}

/* ---------- app ---------- */

const fresh = () => INITIAL_ITEMS.map(i => ({ ...i, status: 'open', resolution: null, laterAt: null }))

export default function App() {
  const phone = useIsPhone()
  const [items, setItems] = useState(fresh)
  const [openId, setOpenId] = useState(null)
  const [focus, setFocus] = useState(null)
  const [hi, setHi] = useState(null)
  const [settings, setSettings] = useState(TRIAL_SETTINGS)
  const [log, setLog] = useState([])
  const [forceOpen, setForceOpen] = useState({})
  const [collapseTick, setCollapseTick] = useState(0)
  const [expandTick, setExpandTick] = useState(0)
  const afterRule = useRef(null)

  const openItem = items.find(i => i.id === openId)
  const spaceStatus = { a: 'ready', b: items.find(i => i.id === 'r1')?.resolution?.id === 'review' ? 'review' : 'ready' }
  const reviewing = spaceStatus.b === 'review'

  function scrollToTarget(t) {
    const el = document.getElementById(t.screen ? 'screen-' + t.screen : 'space-' + t.space)
    if (!el) return
    // The needs-you strip is sticky; measure its real height so the target and its mark land below it.
    const strip = document.querySelector('.needs')
    const offset = (strip ? strip.getBoundingClientRect().height : 0) + 16
    const top = el.getBoundingClientRect().top + window.scrollY - offset
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' })
  }

  function goTo(item, { open = true } = {}) {
    const t = item.target
    setHi(t.space)
    setForceOpen(f => ({ ...f, [t.space]: Date.now() }))
    if (t.screen && t.pill) setFocus({ screen: t.screen, pill: t.pill })
    // wait for phone sections to expand before scrolling
    setTimeout(() => scrollToTarget(t), 60)
    setTimeout(() => setHi(null), 2400)
  }

  function open(id) {
    const it = items.find(i => i.id === id)
    goTo(it)
    setOpenId(id)
    setCollapseTick(t => t + 1)
  }

  function rule(id, choice) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, resolution: choice, status: choice.status, laterAt: choice.id === 'later' ? Date.now() : null } : i))
    if (choice.id !== 'later') setLog(prev => [{ id, choice }, ...prev.filter(l => l.id !== id)])
    setOpenId(null)
    const it = items.find(i => i.id === id)
    afterRule.current = it.target
    setForceOpen(f => ({ ...f, [it.target.space]: Date.now() }))
  }

  useEffect(() => {
    if (openId !== null || !afterRule.current) return
    const t = afterRule.current; afterRule.current = null
    setTimeout(() => {
      scrollToTarget(t)
      const next = document.querySelector('.needs-list .need') || document.getElementById('needs-h')
      if (next) { next.setAttribute('tabindex', '-1'); next.focus({ preventScroll: true }) }
    }, 80)
  }, [openId, items])

  function close() {
    const id = openId
    setOpenId(null)
    setExpandTick(t => t + 1)
    setTimeout(() => {
      const el = document.getElementById('need-' + id) || document.getElementById('needs-h')
      if (el && el.id === 'needs-h') el.setAttribute('tabindex', '-1')
      el?.focus()
    }, 30)
  }

  function undo(id) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, resolution: null, status: 'open', laterAt: null } : i))
    setLog(prev => prev.filter(l => l.id !== id))
  }

  function reset() {
    setItems(fresh()); setLog([]); setFocus(null); setHi(null); setOpenId(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.getElementById('needs-h')?.focus()
  }

  const history = useMemo(() => log.map(l => {
    const it = items.find(i => i.id === l.id)
    return { id: l.id, title: it.title, choiceLabel: l.choice.label }
  }), [log, items])

  const p1 = items.find(i => i.id === 'p1'), x1 = items.find(i => i.id === 'x1')
  const modeVal = settings.find(s => s.id === 'mode').value
  const nextVal = settings.find(s => s.id === 'next').value
  const scenario = {
    sheetClose: p1?.resolution?.id === 'agree',
    waitlist: x1?.resolution?.id === 'allow' ? 'all' : x1?.resolution?.id === 'copy' ? 'a' : 'none',
  }

  // Legend notes that change with a ruling (F7). Pending wording comes back on Undo because the base note is untouched.
  const notes = useMemo(() => {
    const n = { a2: {} }
    const r1 = p1?.resolution?.id
    if (r1 === 'agree') n.a2[1] = { note: 'Astra proposed a way back other than the handle. Claude applied it: an X and a Back to event link, and the chosen session and entered details are kept.', ruled: 'Ruled: agreed. Applied by Claude.' }
    if (r1 === 'decline') n.a2[1] = { note: 'Astra proposed a way back other than the handle. The handle stays the only way back; the reason is kept with the proposal.', ruled: 'Ruled: declined.' }
    if (r1 === 'defer') n.a2[1] = { note: 'Astra proposed a way back other than the handle. Nothing changes now; the proposal returns at the next round.', ruled: 'Ruled: deferred to next round.' }
    const r2 = x1?.resolution?.id
    if (r2 === 'allow') n.a2[2] = { note: 'Shown as Full with a Join waitlist action. Session row was changed once, by Claude, with your permission; both directions show it.', ruled: 'Ruled: allowed once.' }
    if (r2 === 'copy') n.a2[2] = { note: 'Shown as Full with a Join waitlist action on a local copy of Session row inside Direction A. Direction B is unchanged.', ruled: 'Ruled: local copy.' }
    if (r2 === 'decline') n.a2[2] = { note: 'Shown as Full. Session row stays unchanged, so Direction A continues without a waitlist and says so.', ruled: 'Ruled: declined.' }
    return n
  }, [p1, x1])

  const marks = useMemo(() => {
    const m = []
    if (p1?.resolution) {
      const r = p1.resolution.id
      m.push({ id: 'm-p1', screen: 'a2', y: 16, kind: r, label: r === 'agree' ? 'Agreed · applied by Claude' : r === 'decline' ? 'Declined · unchanged' : 'Deferred · returns next round' })
    }
    if (x1?.resolution) {
      const r = x1.resolution.id
      if (r === 'allow') { m.push({ id: 'm-x1-a', screen: 'a2', y: 47, kind: 'allow', label: 'Session row · changed once, by Claude' }); m.push({ id: 'm-x1-b', screen: 'b2', y: 47, kind: 'allow', label: 'Session row · changed once, by Claude' }) }
      if (r === 'copy') m.push({ id: 'm-x1-a', screen: 'a2', y: 47, kind: 'copy', label: 'Local copy · Direction A only' })
      if (r === 'decline') m.push({ id: 'm-x1-a', screen: 'a2', y: 47, kind: 'decline', label: 'Declined · Session row unchanged' })
    }
    return m
  }, [p1, x1])

  return (
    <Scenario.Provider value={scenario}>
      <div className="app" inert={openItem ? '' : undefined}>
        <a className="skip" href="#needs-h">Skip to what needs you</a>
        <header className="top">
          <div>
            <p className="eyebrow">Project page · Harbor Street Library · Event signup</p>
            <h1>Agent Spaces</h1>
          </div>
          <div className="top-right">
            <p className="top-note">Fictional design tool. Two scripted agents. Content from a real working trial.</p>
            <button className="btn btn-quiet btn-sm" onClick={reset}>Reset demo</button>
          </div>
        </header>

        <main>
          <NeedsYou items={items} onOpen={open} history={history} onUndo={undo} onJump={id => { setCollapseTick(t => t + 1); goTo(items.find(i => i.id === id)) }} phone={phone} collapseTick={collapseTick} expandTick={expandTick} />
          <Rounds rounds={ROUNDS} reviewing={reviewing} mode={modeVal} next={nextVal} />

          <div className={'spaces' + (modeVal === 0 ? ' spaces-shared' : ' spaces-separate')}>
            {modeVal === 0 && <p className="spaces-label">Round 2 · one shared space. Both directions on one canvas, same rules, attribution on every object.</p>}
            {SPACES.map(sp => <Space key={sp.id} space={sp} status={spaceStatus[sp.id]} marks={marks} focus={focus} setFocus={setFocus} highlighted={hi === sp.id} forceOpen={forceOpen[sp.id]} notes={notes} mode={modeVal} next={nextVal} />)}
          </div>

          <Settings settings={settings} onChange={(id, v) => setSettings(s => s.map(x => x.id === id ? { ...x, value: v } : x))} />
        </main>

        <footer className="foot">
          <p>Self-initiated concept. Not affiliated with any company. Agents are scripted; nothing here claims real agents obey these boundaries. The phone screens are design previews, not a working signup app.</p>
        </footer>
      </div>
      {openItem && <Ruling item={openItem} onRule={rule} onClose={close} />}
    </Scenario.Provider>
  )
}
