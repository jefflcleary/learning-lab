# Log it from your phone

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Here is the honest threat to your tracker, and it is not a formula error. It is a
Saturday afternoon at a card shop. You buy a pack, you tell yourself you'll log it
when you get home, and you don't — not out of laziness, but because "log it" meant
"later, at a computer," and later lost. Trackers die exactly this way: not
deleted, just quietly starved, one unlogged purchase at a time. The best tracker
is not the cleverest one. It is the one that gets used.

This session removes the friction. You'll build a Google Form — a page of
questions that anyone with the link can fill in — whose questions mirror your
Purchases columns, linked to your tracker so that every submission lands as a new
row in the spreadsheet. Then the form's link goes on your phone's home screen,
and logging a pack becomes a ten-second job you can do standing at the counter.
Along the way the form forces a real design decision about where its data lives,
and you'll make that call deliberately instead of by accident.

---

## Before you start

You need:

- **A Purchases tab with real history.** Columns Date, Item, Type, Cost, Paid by,
  Notes, built in [Every pack you open](../every-pack-you-open/guided.md). Quick
  check: the tab holds actual purchases, not sample rows.
- **A validated Type column.** The Type column only accepts categories from a
  fixed list, set up in [Keeping the data clean](../keeping-data-clean/guided.md).
  Quick check: type a made-up category into a Type cell and watch it get
  rejected, then undo.
- **Something that reads Purchases.** If you built stats in
  [Questions your data can answer](../questions-your-data-can-answer/guided.md),
  the decision at the end of this session will matter more — but the form itself
  only needs Purchases.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A form whose questions mirror your Purchases columns, linked to your tracker —
  submit it and a row appears in the spreadsheet
- The form on your phone's home screen, one tap from open, with a real purchase
  logged in about ten seconds
- A deliberate, written-down decision about where form responses live in your
  tracker — a choice with real tradeoffs and no right answer
- A tracker anyone can feed: hand someone your phone and they can log a purchase
  without ever seeing the spreadsheet

---

## New tools

**Google Forms** is a free Google tool for building forms — pages of questions
that anyone with the link can answer and submit. It comes with the same Google
account you already use for Sheets; nothing gets installed. A form can be
**linked to a spreadsheet**, which means every submission is written into the
spreadsheet as a new row, automatically, the moment someone taps Submit. Its
documentation lives in the Google Forms section of Google's
[Docs editors help center](https://support.google.com/docs) — the same help
center that covers Sheets.

One fact worth knowing before you build: linked responses land in a **new tab of
their own**, which the form creates and owns. They do not land in Purchases or
any other existing tab. That fact is going to matter in the second half of this
session.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Count honestly: of the purchases you made in the last month, how many are in
  the Purchases tab — and how many never made it? (If the answer is "all of them
  made it," excellent; the form is insurance. For most people the gap is the
  reason this lesson exists.)
- When a form submission arrives in the spreadsheet, where do you expect the new
  row to appear — at the bottom of Purchases, or somewhere else?
- Your Type column rejects categories that aren't on its list. If the form asks
  for Type as a multiple-choice question, can a submission contain a category
  that isn't on the list? What if the question offered an "Other" answer people
  could type into?

---

## The work

### Build the form to mirror Purchases

Your goal: a form with one question per Purchases column — Date, Item, Type,
Cost, Paid by, Notes — linked to your tracker, so that submitting the form writes
a row into the spreadsheet.

Design requirements, which are the same requirements Purchases already lives by:

- **Type and Paid by are fixed choices**, not free text — and the Type choices
  must match your validation list on Purchases exactly, character for character.
- **Cost should only accept a number.**
- **Notes is optional.** Everything else is required.

You're done when you submit a test response from your computer and watch the row
appear in the spreadsheet.

<details>
<summary>Stuck on creating the form? Start here</summary>

There are two roads and they end in the same place. The spreadsheet's own menus
can start a form that's linked from birth — look through them for anything about
forms; the option currently lives in a menu named along the lines of **Tools**.
Or build the form at [forms.google.com](https://forms.google.com) and then look
in the form's **Responses** area for a way to send responses to a spreadsheet —
it will let you pick your existing tracker. If neither turns up where you expect,
the help center's Forms section covers both routes; controls move, names mostly
don't.

</details>

<details>
<summary>Stuck on question types?</summary>

Each column has a natural question type, and matching them up is the design work:
a **date** question for Date; **short answer** for Item; a fixed-choice type —
**multiple choice** or **dropdown** — for Type and Paid by; short answer for
Cost, with the number-only rule enforced by what Forms calls **response
validation** (look in the question's own options); **paragraph** for Notes.

The Type question's choices come from your Purchases validation list, copied
exactly. A fixed-choice question is the same contract as your validation
dropdown: a list of allowed answers, agreed in advance. You've set this contract
once before; this is the same contract at a second door.

</details>

<details>
<summary>Verifying the link</summary>

After linking, look at the spreadsheet's tab strip — a new tab has appeared, with
a name along the lines of "Form Responses 1". Submit one test response, then read
the new tab's header row side by side with the Purchases header row. Same
information, plus one column you never asked for: **Timestamp**, the exact moment
of submission, which the form records on its own. Keep it; it's free data, and
Purchases never had anything like it.

</details>

### Put it on the phone

The form's **Send** control gives you its link (there's an option to shorten it).
Open that link on your phone, then use the browser's share or menu control — the
option is named along the lines of **Add to Home Screen** — so the form becomes
an icon next to your apps.

Then run the honest test: from home-screen tap to Submit, log a real purchase.
The target is about ten seconds. That number is the entire point — it has to be
short enough to happen at a shop counter, standing up, while whoever fronted the
money is still putting their wallet away. If it's slower than that, look at
which questions are costing time and whether the form can meet you halfway
(fewer required questions, dropdown instead of typing).

### Decide where responses live

Now the part the form forced on you. Responses land in their own tab. Your
stats — whatever reads Purchases today — know nothing about that tab. Two purchase
records now exist, and something has to give. There are three honest ways out,
all three used in the real world:

**(a) Point the stats at both tabs.** Purchases stays the manual record, the
responses tab is the phone record, and every stat formula reads both. The cost:
every future formula has to remember there are two sources. Forget one, and the
stat silently undercounts — no error, just a wrong number.

**(b) Copy rows over as a ritual.** Every so often, move new responses into
Purchases by hand. One table stays the single truth. The cost: a recurring chore
— exactly the species of friction this session exists to kill — and every lapse
means the truth is stale until you catch up.

**(c) Make the responses tab the purchases record.** Retire manual entry. Repoint
your stats at the responses tab, and decide what happens to the old Purchases
rows — folded into the new record, or kept as a closed historical tab. The cost:
the form now owns your schema. Column order belongs to it, the Timestamp column
is there whether you wanted it or not, and your history lives in two shapes
unless you merge it.

There is no hint for this one, because there is no answer to hint toward. Pick
the one that fits how you actually live with this tracker. Implement enough of
your choice to see it working — repointed or doubled formulas for (a), one
performed ritual for (b), the repointing plus a decision about old rows for
(c) — and then write the decision and your reasoning in your logbook. Future-you
will meet this fork again in other systems; what future-you needs is not the
answer you picked but the reasons you picked it.

---

## Break it on purpose

Cause each one, look closely at the result, undo it.

**Walk around the guard.** On the Purchases tab, validation rejects a made-up
category — you proved that yourself when you set it up. Now edit the form's Type
question and enable the **"Other"** option, the one that lets people type an
answer of their own. From your phone, submit a purchase with a nonsense
category through it. Go look at the responses tab: the nonsense landed,
unchallenged. The sheet's validation guards the sheet's front door — and the
form is a second door, and your submission walked straight past. Every door
needs its own guard. That is exactly why your Type question uses a fixed list
with no "Other": the question's choice list *is* the form's validation. Undo:
remove the "Other" option and delete the nonsense row.

**Change the stencil, keep the copies.** Edit the form again and reword one of
the Type choices — rename a category to anything else. Now look at the old rows
in the responses tab: unchanged, still wearing the old wording. Submit a fresh
test response: the new wording arrives. Rows are copies made at the moment of
submission; no edit to the form reaches back into them. Data outlives the schema
that made it. You met this once before, from the other side — changing a
validation list doesn't fix the old cells it once allowed. Undo: restore the
choice's wording and remove the test row.

---

## What just happened

You built the pattern that runs the web. A form is a friendly face on a table:
questions in front, rows landing in something table-shaped behind. Every signup
page, every checkout, every survey you have ever filled in is this exact
machinery — and now that you've built both halves, you can see the seam
everywhere. A required field is validation. A dropdown is the fixed-list
contract you've now enforced at two different doors. The confirmation page is
the row being written.

The second thing that happened is quieter. Your tracker did not get more capable
today — it got *easier*, and easier is the thing that decides whether data exists
at all. Six months from now, the difference between a Purchases record you trust
and one full of holes won't be a formula. It will be whether logging cost ten
seconds or ten minutes. Systems that survive are the ones cheap enough to keep
feeding; friction is a design force as real as any formula, and today you
designed against it.

And the break-it moment generalizes further than it looks: rules enforced at one
entrance do not cover an entrance added later. Real systems — banks, games,
stores — validate at the form *and* at the table, because doors keep getting
added and each one needs its own guard. You now know that from having walked
through an unguarded one yourself.

---

## Go further

- The form can notify you when responses arrive — the help center covers
  response notifications. Would you want a ping for every purchase, or is the
  responses tab enough? What would the notification actually be *for*?
- A QR code taped inside your binder's lid would let anyone at the table log a
  purchase without touching your phone. Free QR generators are easy to find.
  What would you point the code at — and how much would you trust what other
  people submit?
- The Timestamp column arrived free with every submission, and Purchases never
  had one. What could the tracker learn from *when* purchases happen — day of
  week, time of day — that the Date column alone can't tell it?
- Genuinely open: entry friction was starving this tracker, and a form fixed it.
  What other good habits die of friction — logging exercise, tracking spending,
  practicing an instrument — and which of them could a form pointed at a
  spreadsheet fix? The pattern is yours now. Where else does it apply?

---

## What you have now

- A Google Form linked to the tracker: submitting it appends a row to a
  form-responses tab in the spreadsheet
- The form on your phone's home screen — logging a purchase away from a computer
  takes about ten seconds, and anyone you hand the phone to can do it
- A written-down, deliberate decision about where form responses live relative
  to the Purchases tab, with the reasoning in your logbook
- Firsthand proof that a form is a second door needing its own guard, and that
  submitted rows outlive later edits to the form that made them
