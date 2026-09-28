# Learnings and effort

What we observed, what we changed because of it, and what the record can and cannot show. Three categories are kept apart on purpose: an observation is something that happened; a proposed change is what we decided to do about it; a demonstrated result is a change we later saw working, with evidence. Arman's own observations are marked (Arman).

## Observations from the trial

- (Arman) The human should not have to switch apps and monitors to review two agents' work. The review has to live where the work is.
- (Arman) Canvas notes must be readable with the whole section fitted on screen. Wide strips of small text failed; large type in narrow columns worked.
- (Arman) Agent notes need to look like a different kind of object from the product screens: different surface, different type. Pale cards everywhere made design and commentary blur together.
- (Arman) Callouts sitting on neighboring screens and legends not aligned to their screens made the canvas hard to read. Good layout is not only for the finished product.
- (Arman) Every comment posted through the agents' tools showed the human's name. Authorship in comments is a convention, not a fact the tool keeps.
- (Arman) After time on other projects, he must see in an instant where a decision is needed.
- (Arman) Clickable prototypes produced his fastest and most immediate input.
- (Arman) Carrying two directions through round 2 added review cost without adding a decision.
- Some of Arman's comments went missing during a format rework. Frames Claude had deleted were the suspected cause; not confirmed.
- Two agents once wrote in the same shared section at the same time, in different areas, and nothing collided. This is one instance with disjoint territories, not a test of two agents changing the same object.
- One small, already agreed direct edit by Astra to Claude's object, with both names kept, was accepted without friction. One instance; it does not show that broad cross-editing is safe.
- A scripted change that throws in Figma left no partial objects behind; the run rolled back. Observed on the runs we made, not a guarantee.
- Round 2 review produced two proposals each way, down from seven and six in round 1, on the same objects after a written ruling.
- (Astra) A verified style difference did not settle a perceptual disagreement; Arman's ruling did. Keep proposal, response, ruling and applied result as separate states.
- (Astra, recorded from Arman) Round 1's ruling took one exchange once the review surface was readable; the preceding two days went into making it readable. The finding is the cost of preparing a usable review, not a two-day ruling.
- Round 2's ruling took under five minutes of Arman's attention from three direct links.

## Proposed changes (decided, applied to the process or the prototype)

- Review format v1.4: orientation card, one legend per screen, callouts in a lane beside the screen, dark note surfaces in distinct fonts, author colors, per-screen numbering, never delete a commented object. See the [review kit](kit.md).
- A needs-you view as the center of the prototype, and a needs-you first line in every agent message to Arman.
- A Pick step in the round: choose one direction to build on after the first review.
- Build clickable early; host review builds so the director taps a link and never runs setup.
- Render every review build at three widths and inside a host that defines colliding style variable names before publishing.
- Any summary that says nothing needs you must be computed from item states, so Defer and Later never read as all clear.
- A badge on a screen describes only what the simulation actually did.
- A radio group is one tab stop, and it moves to the checked option; test focus traps from every option.
- Read a file back from disk before committing it, not the tool's confirmation.

## Demonstrated results (with evidence)

- With v1.4 in place on both agents' review notes, Arman reported both made sense: the first review surface that passed without a follow-up fix.
- Ruling time dropped from a two-day preparation plus one exchange to under five minutes of attention once notes were per screen and linked. One project, one person; an observation, not a measured saving.
- Astra's cold pass on the first prototype slice found seven issues; the fixes were verified by targeted automated checks and two rechecks before Gate B closed. See [reviews](critiques.md).

## Effort

Rules: one row per session; Claude's times are estimates; Astra's measured intervals cover only the Figma or review window and omit reading, planning and logging; Arman's walkthrough time was not recorded; cost is unavailable for every seat. Do not add the columns to compare seats.

| Date | Who | Session | Active time | Cost |
| --- | --- | --- | --- | --- |
| 2026-09-25 | Claude | Step 3: read Arman's agent-lane file, concept discussion, scope sheet | about 30 min | unavailable |
| 2026-09-25 | Astra | Project 3 Gate A scope critique | unavailable, not instrumented | unavailable |
| 2026-09-25 | Claude | Project 3: scope sheet v2 after Gate A rulings, research sources linked and labeled | about 35 min | unavailable |
| 2026-09-25 | Claude | Project 3: scope v2 approval recorded, tool choice, trial file located, handoff to fresh chat | about 10 min | unavailable |
| 2026-09-25 | Claude | Project 3: TRIAL.md v1 draft and Figma structure proposal | about 25 min | unavailable |
| 2026-09-25 | Claude | Project 3: approval logged, Astra documentation corrections applied to SCOPE.md and TRIAL.md v1.1 | about 15 min | unavailable |
| 2026-09-25 | Claude | Project 3: trial Figma file setup (pages, sections, reference library, Shared page kit, Read me), trial-log started | about 40 min | unavailable |
| 2026-09-25 | Astra | Project 3: independent reference library and Shared page kit check | unavailable, not instrumented | unavailable |
| 2026-09-25 | Claude | Project 3 trial, round 1 develop: Direction A, three screens and rationale in R1 · Claude space | about 35 min | unavailable |
| 2026-09-25 | Astra | Project 3: R1 develop, Direction B ready for review | full active time unavailable; measured Figma interval 2 min 39 sec | unavailable |
| 2026-09-25 | Claude | Project 3 trial, round 1 review: 7 proposals on Direction B | about 20 min | unavailable |
| 2026-09-25 | Astra | Project 3: R1 review of Direction A and replies to Claude | unavailable, not instrumented | unavailable |
| 2026-09-26 | Claude | Project 3 trial, round 1 review replies A1 to A6, overlap fix in shared section | about 15 min | unavailable |
| 2026-09-26 | Claude | Project 3 trial: comment channel test, callout kit, retrofit of own rationale and review, TRIAL.md v1.3 | about 65 min | unavailable |
| 2026-09-25 | Astra | Project 3: v1.3 annotation retrofit, rationale and review | total unavailable; measured interval 3 min 31 sec | unavailable |
| 2026-09-26 | Claude | Project 3 trial: walkthrough start, v1.4 review format applied to Claude space, LEARNINGS.md started | about 40 min | unavailable |
| 2026-09-26 | Claude | Project 3 trial: v1.4 readability, grid and note-style passes on Claude space after Arman reassessment; passed | about 35 min | unavailable |
| 2026-09-25 | Astra | Project 3: v1.4 own-space and review-format retrofit | total unavailable; measured interval 3 min 18 sec | unavailable |
| 2026-09-26 | Claude | Project 3 trial: review copies rebuilt in v1.4 | about 25 min | unavailable |
| 2026-09-27 | Astra | Project 3: per-screen numbering and preserved-thread recheck | unavailable, not instrumented | unavailable |
| 2026-09-27 | Claude | Project 3 trial: status check, round 1 ruling relayed to threads and canvas, R2 space prepared | about 25 min | unavailable |
| 2026-09-27 | Arman | Project 3 trial: round 1 review of both review blocks and ruling | unavailable, not recorded | unavailable |
| 2026-09-27 | Astra | Project 3 R2 develop: ruling fixes, allow-once master repair, attributed receipt edit and review surface | full active time unavailable; measured interval 4 min 27 sec | unavailable |
| 2026-09-27 | Claude | Project 3 trial, round 2 develop: Direction A ruling fixes, annotations, threads | about 30 min | unavailable |
| 2026-09-27 | Astra | Project 3 R2 review of Direction A | full active time unavailable; measured interval 2 min 13 sec | unavailable |
| 2026-09-27 | Claude | Project 3 trial, round 2 review: replies to Astra, review of Direction B | about 25 min | unavailable |
| 2026-09-27 | Astra | Project 3 R2 review replies | full active time unavailable; measured interval 41 sec | unavailable |
| 2026-09-27 | Claude | Project 3 trial: round 2 ruling relayed, own text rulings applied, answers to the three trial questions | about 25 min | unavailable |
| 2026-09-27 | Arman | Project 3 trial: round 2 ruling from three direct links | under 5 min of attention | unavailable |
| 2026-09-27 | Astra | Project 3 final R2 changes and independent trial answers | full active time unavailable; measured canvas interval 45 sec | unavailable |
| 2026-09-27 | Claude | Project 3 trial close: findings ruling recorded, scope and trial docs updated | about 15 min | unavailable |
| 2026-09-27 | Claude | Project 3: BRIEF.md v1 prototype plan | about 20 min | unavailable |
| 2026-09-27 | Claude | Project 3 prototype slice 1: build, flow test, captures, handoff | about 1 h 10 min | unavailable |
| 2026-09-27 | Astra | Project 3 Gate B slice 1 cold pass, app 815b0d3 | about 17 min measured review/report interval (00:45:41 to 01:02:27 UTC on Sept 28; Sept 27 PDT); final filing outside interval | unavailable |
| 2026-09-27 | Claude | Project 3 prototype slice 2: Gate B fixes F1 to F7, Reset, tap-back, republish, handoff | about 1 h 15 min | unavailable |
| 2026-09-27 | Astra | Project 3 Gate B slice 2 focused recheck, app 06558c6 | about 6 min measured review/report interval (01:33:55 to 01:39:50 UTC Sept 28; Sept 27 PDT); final filing outside interval | unavailable |
| 2026-09-27 | Claude | Project 3 slice 2b: F4, F5, F7 corrections, targeted tests, republish, handoff | about 35 min | unavailable |
| 2026-09-27 | Astra | Project 3 Gate B recheck 2, app 80b89a5 | about 4 min 25 sec measured review/report interval (01:55:43 to 02:00:08 UTC Sept 28; Sept 27 PDT); final filing outside interval | unavailable |
| 2026-09-27 | Claude | Project 3 case study draft v1 for Gate C | about 30 min | unavailable |
| 2026-09-27 | Claude | Project 3 slice 2c: token collision fix, host check, republish | about 20 min | unavailable |
| 2026-09-27 | Astra | Project 3 Gate C editorial pass, draft 5915d6d | about 5 min 41 sec measured review/report interval (02:23:51 to 02:29:32 UTC Sept 28; Sept 27 PDT); final filing outside interval | unavailable |
| 2026-09-27 | Claude | Project 3 case study v2: Gate C corrections applied, link plan and figure spec settled | about 25 min | unavailable |
| 2026-09-27 | Astra | Project 3 focused Gate C check, claimed v2 593b17e | under 2 min review and report; started 03:02:20 UTC Sept 28 (Sept 27 PDT), final filing outside interval | unavailable |
| 2026-09-27 | Astra | Project 3 focused Gate C check, actual v2 f2314e0 | measured review/report interval 54 sec (03:25:14 to 03:26:08 UTC Sept 28; Sept 27 PDT); final filing outside interval | unavailable |

Rows come from the private effort table at the time of publication. Timestamps for Astra are the measured review intervals only.
