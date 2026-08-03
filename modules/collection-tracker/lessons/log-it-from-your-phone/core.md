# Log it from your phone

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** log-it-from-your-phone
- **Module / Part:** collection-tracker — Part 4, Time and flow
- **Scaffolding:** level 2 for the Forms skill (first Google Forms lesson: goals
  plus hints, concepts named); level 3 for the design decision at the end (options
  and tradeoffs stated, the choice entirely the learner's — there is no hint
  ladder for a judgment call)
- **Deliveries:** guided only (per module MODULE.md)
- **Status:** ready

## Goal and payoff

Kill the tracker's biggest real threat: entry friction. Build a Google Form whose
questions mirror the Purchases columns, linked to the tracker so every submission
lands as a new row, and put the form one tap from the phone's home screen — so a
pack bought at a card-shop counter gets logged before the receipt is in a pocket.
Then face the design decision the form forces (responses land in their own tab,
not in Purchases) and choose deliberately among three honest options.

Payoff, visible to others: hand anyone your phone and they can log a purchase into
your tracker in about ten seconds. The tracker stops being a thing you sit down to
maintain and becomes a thing that keeps itself fed.

## Prerequisites

- A Purchases tab (Date | Item | Type | Cost | Paid by | Notes) with real purchase
  history — established by `lessons/every-pack-you-open/`
- The Type column restricted to a fixed category list by data validation, and the
  reason why felt first — established by `lessons/keeping-data-clean/`
- (Soft, for the decision section only: a Stats tab whose formulas read Purchases —
  established by `lessons/questions-your-data-can-answer/`. The decision about
  where form responses live is sharper if stats exist, but the form itself needs
  only Purchases.)

## Establishes

- A Google Form is linked to the tracker; submitting it appends a row to a
  form-responses tab in the spreadsheet
- The form is reachable from the learner's phone home screen; logging a purchase
  away from a computer takes seconds
- The learner has made and recorded a deliberate decision about where form
  responses live relative to the Purchases tab (pointed stats at the responses
  tab, copies rows over on a ritual, or made the responses tab the purchases
  record going forward)
- Cited by other cores as: "purchases get logged from a phone through a form —
  established by `lessons/log-it-from-your-phone/`."

## Facts

- **Google Forms** is a free Google tool for building forms — pages of questions
  that anyone with the link can fill in and submit. It comes with the same Google
  account the learner already uses for Sheets; nothing is installed.
- Documentation: the Google Forms section of Google's **Docs editors help center**
  (support.google.com/docs) — the same help center that covers Sheets.
- A form can be **linked to a spreadsheet**, and there are two ways in
  [volatile as of 2026-08 — UI labels and menu locations shift; deliveries phrase
  resiliently and have the learner find controls by name]:
  - From inside the spreadsheet: the **Tools** menu has an option to create a
    linked form (currently worded along the lines of "Create a new form").
  - From **forms.google.com**: build the form, then in its **Responses** area
    choose to send responses to a spreadsheet and pick the existing one.
  Either route ends in the same place: a linked form plus a new tab in the
  spreadsheet.
- Linked responses land in a **new tab of their own** (currently named something
  like "Form Responses 1"), never in an existing tab. The form owns that tab: it
  writes the header row from the question titles and appends one row per
  submission. A **Timestamp** column is added automatically as the first column —
  the exact submission time, free.
- Question types relevant here: **short answer** (free text), **multiple choice**
  (pick one from a fixed list), **dropdown** (same contract, rendered as a menu),
  **date**, and a plain paragraph/text type for notes. Multiple choice and
  dropdown can be marked **required**; multiple choice can optionally offer an
  **"Other"** choice that accepts free text.
- The mapping this lesson builds: one question per Purchases column — Date (date
  type), Item (short answer), Type (multiple choice or dropdown, choices copied
  exactly from the validation list on Purchases), Cost (short answer; Forms can
  also apply response validation to require a number), Paid by (multiple choice),
  Notes (paragraph, not required).
- Sharing: the form's **Send** control produces a link (with an option to shorten
  it). Anyone with the link can submit; they see the questions, never the
  spreadsheet.
- Phone home screen: every major mobile browser can add a website to the home
  screen from its share or menu control (iOS Safari: Share → Add to Home Screen;
  Android Chrome: menu → Add to Home screen) [volatile as of 2026-08 — phrase as
  "your browser's share or menu has an option named along the lines of 'Add to
  Home Screen'"].
- Editing a form's questions or choices later does **not** touch rows already in
  the responses tab. Responses are copies made at submission time; the form is
  only the stencil they were made through.
- The responses tab is a normal tab for reading purposes: formulas elsewhere can
  reference it (`SUMIF('Form Responses 1'!...)` works like any cross-tab
  reference). Hand-editing *inside* it works but is worth gentle caution — the
  form appends below the last response it knows about, so treat the tab as the
  form's territory and do manual fixes deliberately.
- The three options for where responses live, with tradeoffs (the lesson's
  decision section; no right answer):
  - **(a) Point the stats at both tabs.** Purchases stays the manual record, the
    responses tab is the phone record, and every stat formula reads both.
    Tradeoff: every future formula must remember there are two sources; forget
    one and the stat silently undercounts.
  - **(b) Copy rows over as a ritual.** Periodically move new responses into
    Purchases by hand. One table remains the truth; the cost is a recurring chore
    — exactly the kind of friction this lesson exists to remove — and any lapse
    means the truth is stale.
  - **(c) The responses tab becomes the purchases record.** Retire manual entry;
    repoint stats formulas at the responses tab; keep old Purchases rows either
    by pasting them (carefully) above/into the record or by keeping Purchases as
    a closed historical tab. Tradeoff: a schema change — column order now belongs
    to the form, the Timestamp column arrives whether wanted or not, and history
    lives in two shapes unless merged.
- The connection to name explicitly: a multiple-choice question is the **same
  contract** as the validation dropdown on Purchases — a fixed list of allowed
  answers, agreed in advance. The learner has now enforced one contract at two
  different doors.
- The general pattern to name: **a form is a friendly face on a table**. Every
  signup page, order form, and survey on the web is this pattern — questions in
  front, rows landing in something table-shaped behind. The learner has now built
  both halves.

## Arc

### Orientation — given plainly

Open with the honest problem, concretely: the tracker is only as good as what
gets entered, and entry has friction. A pack bought at a card shop on a Saturday
gets logged never — not out of laziness but because "log it" meant "later, at a
computer," and later lost. Trackers die exactly this way; the best tracker is not
the cleverest one, it is the one that gets used.

Then the tool: what Google Forms is, that it is free and already part of the
account, where its documentation lives, what "linked to a spreadsheet" means, and
the two ways to create the link (resilient phrasing — find the control by name,
or start from forms.google.com). State plainly that responses will land in a new
tab of their own; that fact is load-bearing for the second half.

### Predictions to elicit

- Count honestly: of the purchases you made in the last month, how many are in
  the Purchases tab, and how many never made it? (The gap is the reason this
  lesson exists. Zero gap is a fine answer — then the form is insurance.)
- When a form submission arrives in the spreadsheet, where do you expect the new
  row to appear — the bottom of Purchases, or somewhere else?
- Your Type column rejects categories that aren't on its list. If the form asks
  for Type as multiple choice, can a submission contain a category not on the
  list? What if the question allowed an "Other" answer?

### The work — goals and hint ladders

1. **Build the form to mirror Purchases.** Goal: a linked form with one question
   per Purchases column — Date, Item, Type, Cost, Paid by, Notes — created so
   that submissions land in the tracker spreadsheet. Type and Paid by as fixed
   choices (choices copied exactly from the validation list); Cost should only
   accept a number; Notes optional; the rest required. Success: submit a test
   response from the computer and watch the row appear.
   - Rung 1 (creation): the spreadsheet's own menus can start a linked form —
     look through them for anything about forms. If nothing turns up, build at
     forms.google.com and look in the form's Responses area for a way to send
     responses to an existing spreadsheet. The help center covers both routes.
   - Rung 2 (question types): each column has a natural question type — a date
     question for Date, free text for Item, a fixed-choice type for Type and
     Paid by, free text with number-only validation for Cost (Forms calls this
     response validation), paragraph for Notes. Matching column to type *is* the
     design work; the choices for Type must match the Purchases validation list
     character for character, for the same reason the validation list exists at
     all.
   - Rung 3 (verify the link): after linking, look at the spreadsheet's tab
     strip. Submit one test response and read the new tab's header row against
     the Purchases header row — same information, plus a Timestamp column the
     form added on its own.
2. **Put it on the phone.** Goal: the form opens from the phone's home screen in
   one tap. Get the form's link from its Send control, open it on the phone, and
   use the browser's share or menu option (named along the lines of "Add to Home
   Screen"). Success criterion, timed honestly: from home screen tap to
   submitted, a real purchase logged in about ten seconds. That ten seconds is
   the entire point of the lesson — it has to be short enough to happen at a
   counter.
3. **Decide where responses live.** The form writes to its own tab; the stats
   read Purchases; something has to give. Present options (a), (b), (c) with
   their tradeoffs stated in full (see Facts). No hint ladder — this is a
   judgment call, and all three options are used in the real world. The learner
   chooses, implements enough of the choice to see it working (repointed or
   doubled formulas for (a), one performed ritual for (b), the repointing and a
   decision about old rows for (c)), and **records the decision and the reasoning
   in the logbook**. Owning the choice is the lesson; there is no right answer to
   reveal.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Walk around the guard.** On the Purchases tab, validation rejects a made-up
  category — the learner proved that in the data-cleaning lesson. Now add an
  "Other" option to the form's Type question, submit a nonsense category through
  it from the phone, and watch it land in the responses tab unchallenged. The
  sheet's validation guards the sheet's front door; the form is a second door,
  and it walked right past. Every door needs its own guard — that is why the Type
  question uses a fixed list with no "Other": the question's choice list *is* the
  form's validation. Undo: remove the "Other" option and delete the nonsense row.
- **Change the stencil, keep the copies.** Reword one of the Type choices in the
  form (say, rename a category), then look at old rows in the responses tab:
  unchanged. Submit a new response: the new wording arrives. Data outlives the
  schema that made it — the rows are copies made at submission time, and no
  edit to the form reaches back into them. This is the same lesson the
  validation dropdown taught (changing the list doesn't fix old cells), now seen
  from the other side of the door. Undo: restore the choice's original wording,
  and fix or remove the test row.

### What just happened — the explanation

Name the pattern at full size: a form is a friendly face on a table. The web
runs on this — every signup, every checkout, every survey is questions in front
and rows landing in something table-shaped behind. Having built both halves, the
learner can now see the seam in every website they use: required fields are
validation, dropdowns are the fixed-list contract, the confirmation page is the
row being written. Second: friction as a design force. The tracker didn't get
more capable today — it got *easier*, and easier is what determines whether data
exists at all six months from now. Systems that survive are systems cheap enough
to keep feeding. Third, the two-door lesson in general form: rules enforced at
one entrance don't cover an entrance added later; guards belong at every door,
which is why real systems validate at the form *and* the table.

### Go further — open questions

- The form can notify you when responses arrive — the help center covers
  response notifications. Would you want a ping per purchase, or is the
  responses tab enough? What would a notification be *for*?
- A QR code taped inside the binder lid would let anyone at the table log a
  purchase without touching your phone. Plenty of free QR generators exist —
  what would you point the code at, and would you trust what strangers submit?
- The Timestamp column arrived free with every submission, and Purchases never
  had one. What could the tracker learn from *when* purchases happen that the
  Date column alone can't tell it?
- Genuinely open: entry friction was killing this tracker, and a form fixed it.
  What other good habits die of friction — logging exercise, tracking spending,
  practicing anything — and which of them could a form pointed at a spreadsheet
  fix? The pattern is now yours; where else does it apply?

## Delivery notes

- **guided:** the ten-seconds-at-the-counter image carries the motivation; keep
  it concrete and keep the payoff deliverable-shaped (hand someone the phone).
  The decision section must not lean toward an option — present all three flat,
  tradeoffs stated, and make the logbook entry the required artifact. Resist any
  urge to add a hint ladder there.
- UI paths are volatile: menu names ("Tools", "Create a new form", "Send",
  "Add to Home Screen") get "named along the lines of" phrasing, and the help
  center is the pointer of record.
- Do not spoil the break-it outcomes in learner text beyond what the setup
  requires (the "Other" response landing unvalidated is half-spoiled by the
  predict question; that is deliberate — the felt moment still lands).
- The soft prerequisite on stats: phrase the decision section so it works even
  if the learner's stats are thin — "whatever reads Purchases today" rather
  than assuming a rich Stats tab.
