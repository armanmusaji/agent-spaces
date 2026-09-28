# Reviews

Every gate result, in order, with what changed after it. GPT Astra ran every review; Arman ruled on each. The last build Astra reviewed from source is app commit 80b89a5. A later change (c50d6da) fixed how the hosted page renders inside its viewer; Astra did not browser-retest that hosted rendering.

## Gate A, concept and scope (2026-09-25)

Astra's finding: a credible feature with a first-hand reason to exist, but the first scope sheet bundled individual spaces, shared ideation, page management and permissions into one small project. She recommended keeping two individual spaces, visible ownership and one concrete exception, deferring shared spaces to a later version, choosing one fictional task, and correcting competitive claims with direct sources.

Arman's ruling: keep both separate and shared spaces in version 1 (Astra withdrew the deferral), adopt one fictional task, spell out ordinary behavior and each exception outcome, and treat the round-based process as a possible central contribution. He also ruled that whether agents may edit each other's work would be explored in a trial with basic ground rules rather than decided on paper.

## Gate B, build review (2026-09-27)

Astra's cold pass on the first prototype slice, from source at 390 and 1280 px in light and dark, found seven issues:

1. The summary said nothing needed the director after a Defer or Later, a false all-clear.
2. Start review advanced the round to Pick instead of staying at Review.
3. Shared-part badges claimed a change that had not been applied on the screen.
4. On a phone, tapping an item did not land on the screen, and the sticky strip covered it.
5. The dialog did not contain keyboard focus; Tab escaped to the page behind.
6. Several color pairs fell below 4.5:1 contrast in one or both themes.
7. The proposal's change was already applied before anyone ruled on it.

Claude fixed all seven. Two rechecks followed.

## Gate B recheck 1

F1, F2, F3 and F6 passed. Three remained: at 1000 px the sticky strip still covered the result badge (F4); with a second radio selected, Shift+Tab escaped the dialog (F5); after Agree, the legend note still said the proposal was waiting (F7). Claude measured the strip height at the moment of the jump instead of assuming it, treated the checked radio as the group's single tab stop, and derived the notes from the same ruling state as the marks.

## Gate B recheck 2

F4, F5 and F7 passed on app 80b89a5. Gate B closed.

## Gate C, editorial (2026-09-27)

Astra checked every claim in the case study draft against the trial log, decisions, effort table and the Gate B reports. Corrections included: the trial did not come "before designing anything" (it designed screens); the missing comments had a suspected cause, not a confirmed one; three findings, not two, needed a second correction round; the two open trial settings are per-object versus per-turn assignment and separate versus shared defaults, not same-object concurrency; and Claude's estimated hours must not sit beside Astra's partial intervals as if comparable. Claude applied the corrections. A focused check first found that the revised text had not actually been committed (a write that did not persist), then passed it once it was. Gate C closed.
