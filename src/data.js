// All content is fictional and comes from the Harbor Street Library trial (2026-09-25 to 27).
// Agents are scripted. No live AI.

export const AGENTS = {
  claude: { id: 'claude', name: 'Claude', short: 'C' },
  astra: { id: 'astra', name: 'Astra', short: 'A' },
}

export const EVENT = {
  title: 'Intro to Family History Research',
  kicker: 'Free · Workshop',
  blurb: 'Learn how to start tracing your family tree using free library databases. Bring a laptop if you have one; a few are available to borrow.',
  where: 'Harbor Street Library, Community Room B. 2nd floor, elevator available.',
  cost: 'Free. Library card not required.',
  host: 'Reference staff',
  access: 'Wheelchair accessible. Assistive listening available on request.',
  sessions: [
    { id: 's1', when: 'Sat, Oct 10 · 10:00 to 11:30', seats: 6 },
    { id: 's2', when: 'Tue, Oct 13 · 18:00 to 19:30', seats: 0 },
    { id: 's3', when: 'Sat, Oct 17 · 10:00 to 11:30', seats: 12 },
  ],
}

// Spaces on the page. Round 2 shared space holds both directions.
export const SPACES = [
  {
    id: 'a',
    agent: 'claude',
    title: 'Direction A · Detail first, choose in a sheet',
    bet: 'The event page is home base. Choosing a session and entering details happen in a sheet over it, so the person never leaves the event.',
    status: 'ready',
    screens: [
      {
        id: 'a1', title: 'Event detail', pills: [
          { n: 1, y: 22, tag: 'Header', note: 'The event page is the anchor. Kicker, title and a one-line sessions summary say what this is and how many chances there are to attend.' },
          { n: 2, y: 93, tag: 'Pinned button', note: 'One primary action, always visible. Seat line reads 2 of 3 sessions have seats.', agreed: 'Agreed in round 1 review.' },
        ],
      },
      {
        id: 'a2', title: 'Choose a session', pills: [
          { n: 1, y: 21, tag: 'The sheet', note: 'Choose a session and enter details in one sheet over the event page. An X and a Back to event link keep entered details.', agreed: 'Round 1 ruling applied.' },
          { n: 2, y: 40, tag: 'Full session', note: 'Shown as Full with no waitlist. The selector is hidden so it no longer looks choosable.', agreed: 'Round 1 ruling applied.' },
          { n: 3, y: 62, tag: 'Your details', note: 'The sheet scrolls inside itself. The Sign up button stays pinned; the focused field scrolls above the keyboard. Written, not drawn.' },
          { n: 4, y: 88, tag: 'Sign up button', note: 'The button names the date, so one tap cannot sign up for the wrong session.' },
        ],
      },
      {
        id: 'a3', title: 'Confirmation', pills: [
          { n: 1, y: 45, tag: 'Receipt card', note: 'When, Where, Bring in one card. Where names the library.', agreed: 'Edited by Astra, per the round 1 ruling.', editedBy: 'astra' },
          { n: 2, y: 78, tag: 'Actions', note: 'Add to calendar first, Cancel signup second. Cancel returns the person to Events with the seat released.', agreed: 'Round 2 rulings applied.' },
        ],
      },
    ],
  },
  {
    id: 'b',
    agent: 'astra',
    title: 'Direction B · A clear step at a time',
    bet: 'Full pages keep signup and the receipt clear. The count now starts at signup, not on the event page.',
    status: 'ready',
    screens: [
      {
        id: 'b1', title: 'Event detail', pills: [
          { n: 1, y: 8, tag: 'Return to events', note: 'Reading the event stays outside the signup count. Events link added.', agreed: 'Round 1 ruling applied.' },
          { n: 2, y: 78, tag: 'Session information', note: 'Heading reads Three sessions in October. Availability line stays visible.', agreed: 'Round 1 review fix applied.' },
        ],
      },
      {
        id: 'b2', title: 'Choose a session', pills: [
          { n: 1, y: 12, tag: 'Count from signup', note: 'Step 1 of 2 begins here. The receipt is Step 2 of 2.', agreed: 'Round 1 ruling applied.' },
          { n: 2, y: 56, tag: 'Values before labels', note: 'Entered values are primary, labels secondary. Empty phone shows a lighter placeholder.', agreed: 'Round 2 ruling applied.' },
          { n: 3, y: 80, tag: 'Confirm the chosen date', note: 'The button says Sign up for Oct 10. Confirmation and reminders by email.' },
        ],
      },
      {
        id: 'b3', title: 'Confirmation', pills: [
          { n: 1, y: 8, tag: 'A clear exit', note: 'Done above the receipt. The date, library and room stay together.', agreed: 'Round 1 review fix applied.' },
          { n: 2, y: 22, tag: 'Delivery', note: 'The receipt names the email destination and reminders. Cancel before the session starts.' },
        ],
      },
    ],
  },
]

// What needs the director right now. Three real items from the trial, reset to open.
export const INITIAL_ITEMS = [
  {
    id: 'p1', kind: 'proposal', from: 'astra', on: 'claude', target: { space: 'a', screen: 'a2', pill: 1 },
    title: 'Astra proposes a fix on Direction A, screen 2',
    body: 'Add a visible Close or Back to event on the sheet, and keep the chosen session and entered details when the person returns. The handle suggests a gesture; nothing explicit says how to get back.',
    reply: 'Claude: accept.',
    choices: [
      { id: 'agree', label: 'Agree', result: 'Claude applies it in the next develop turn. The proposal is closed as agreed.' },
      { id: 'decline', label: 'Decline', result: 'The sheet stays as it is. The proposal is closed as declined, with the reason kept.' },
      { id: 'defer', label: 'Defer', result: 'Stays open, marked deferred. It returns to this list at the next round.' },
    ],
  },
  {
    id: 'x1', kind: 'exception', from: 'claude', target: { space: 'shared', screen: null, pill: null },
    title: 'Claude asks to change a shared part: Session row',
    body: 'Direction A wants a Waitlist state on the full session. Session row is shared by both directions and instance overrides cannot add a state. The library itself is not involved and is not an option.',
    reach: 'Reaches: 6 instances on this page (3 in each direction). Undoable.',
    choices: [
      { id: 'allow', label: 'Allow once', result: 'Exactly this change to Session row, for this request only. Every instance on the page updates. Attributed to Claude, undoable. No wider access follows.' },
      { id: 'copy', label: 'Make a local copy', result: 'Claude works on a copy inside Direction A. The copy stops receiving updates from the original. Direction B is unchanged.' },
      { id: 'decline', label: 'Decline', result: 'Session row stays unchanged. Direction A continues without a waitlist and says so, rather than reporting done.' },
    ],
  },
  {
    id: 'r1', kind: 'ready', from: 'astra', target: { space: 'b', screen: null, pill: null },
    title: 'Astra marked Direction B ready for review',
    body: 'Three screens and their notes are complete. Nothing is accepted by itself; your review starts the next phase.',
    choices: [
      { id: 'review', label: 'Start review', result: 'Direction B opens for review. Claude is asked to file proposals on it.' },
      { id: 'later', label: 'Later', result: 'Stays ready. It remains in this list until you open it.' },
    ],
  },
]

export const ROUNDS = [
  { id: 'r1', name: 'Round 1', mode: 'Separate spaces', steps: ['Develop', 'Review', 'Pick', 'Ruling'], done: 4,
    ruling: 'Both directions carried forward with agreed fixes. Astra edits next.' },
  { id: 'r2', name: 'Round 2', mode: 'Shared space', steps: ['Develop', 'Review', 'Pick', 'Ruling'], done: 1, ruling: null },
]

export const TRIAL_SETTINGS = [
  { id: 'next', label: 'Who edits next', options: ['Per object', 'Per turn'], value: 0,
    why: 'Trial setting. Two agents worked side by side without collisions when their territories were separate. Live editing of the same object was never tested.' },
  { id: 'mode', label: 'Round 2 default', options: ['Shared space', 'Separate spaces'], value: 0,
    why: 'Trial setting. Same rules either way; only the default changes. Attribution travels with the object in both.' },
]

export const RULES = [
  'Every object shows its author. An edit by someone else adds the editor.',
  'Small, agreed or ruled changes may be made directly, and are signed. Everything else is a proposal.',
  'Review is proposal-only. Notes point at the object. You rule where the work is.',
  'Shared parts need explicit permission. The library is read-only and never an option.',
  'Nothing you have commented on is deleted. It is set aside.',
]
