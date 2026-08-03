# Keeping the data clean

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Last session a single stray value — a plural, a trailing space — made a stat
quietly wrong, and you hunted it down and retyped it. That fixed the cell. It
didn't fix the problem: nothing stops the next inconsistent value from being
typed tomorrow, and the stats will go quietly wrong again, with no error and no
warning. Cleaning is not prevention.

This session is prevention. Google Sheets has a feature called **data
validation**: a rule attached to cells that says what they're allowed to
contain. You'll put your two category columns — Type on Purchases, Set on
Collection — under rules, turn them into dropdowns, and watch something
satisfying happen the moment the rules land: every old inconsistency still
hiding in your data gets flagged, all at once. Cleanup becomes archaeology.

There's a bigger idea underneath, and it's worth saying plainly at the start:
deciding which values a column may contain is not busywork before the real
task. It *is* the real task. Choosing what's allowed to exist in your data is
called designing the data, people do it for a living, and today you're doing
it — in work clothes.

---

## Before you start

You need:

- **A Stats tab whose numbers have been wrong at least once.**
  [Questions your data can answer](../questions-your-data-can-answer/guided.md)
  builds it — including the moment where a category mismatch makes a stat come
  up short. Quick check: your Stats tab has the check row comparing the four
  Type totals against total ever spent, and you can tell the story of the cell
  that broke it.
- **A Purchases tab with a Type column and a Collection tab with a Set
  column.** Established in [Every pack you open](../every-pack-you-open/guided.md)
  and [What is it all worth?](../first-ledger/guided.md). Quick check: both
  columns have a value on every row.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A Type column that only accepts Pack, Box, Single, or Supplies — picked from
  a dropdown, with anything else refused at the door
- A Set column fed from an official Sets list you curate, so a set name is
  spelled one way, forever, everywhere
- Every old inconsistency in both columns found and repaired — flagged for you
  by the rules themselves
- A Stats tab whose check row agrees permanently, instead of by luck — and
  data entry that behaves like an app, which you can hand to someone else and
  watch

---

## New tools

**Data validation** is the Sheets feature that restricts what a cell will
accept. A rule names a range of cells and what counts as valid there; the
friendliest kind of rule is a **dropdown**, where valid means "one of these
values" and the cell offers them as a clickable list. A rule also decides what
happens when someone types something invalid: **show a warning** (the value
goes in, but the cell gets flagged) or **reject the input** (the value is
refused with a message). You'll feel the difference between those two today
rather than take it on faith.

You'll find it in the **Data menu** — look for "Data validation." The exact
layout of what opens changes as Google redesigns things, so hunt by purpose,
not by position: every version of this feature asks you the same three
questions — *which cells, what rule, what happens on failure*. If the panel
ever confuses you, Google's own instructions live in the Docs editors help
center — searching it for "data validation" finds the current version.

Nothing to install; it's built in.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- When the rule lands on your existing Type column: how many cells do you
  think will turn out to break it? An actual number — you fixed one last
  session, but was it the only one?
- Where *should* a mistake announce itself: the moment it's typed, or the
  moment a stat reads it? What does each choice cost?
- Which columns of the tracker should *never* get a dropdown? Name them and
  say why.

---

## The work

### Decide the law

Before touching any menus, write two lists in your logbook.

The first is already decided — the Type column has used four values all along:
**Pack, Box, Single, Supplies**. Write them anyway; they're about to become
law.

The second is yours to design: every set you collect, each spelled the one way
it will be spelled forever. `Base Set` or `Base Set (1999)`? Full name or the
short one everyone actually says? Take the extra minute — this list will
outlive any single row of your data, and every future formula, dropdown, and
stat will spell things exactly the way you write them now.

### Build the Sets list

The Sets list needs to live in cells so a rule can point at it. Put it on the
Stats tab, off to the right of your stats with an empty column as a gap: a
header saying `Sets`, then one set name per row beneath it, straight from your
logbook.

Plain-looking, but new in kind: this is the first range in your tracker that
exists not to record events, but to be *pointed at* — reference data, the
official spellings, in one place.

### Put Type under contract

Select the Type column's data cells on the Purchases tab (from the first data
row down). Open the Data menu, find Data validation, and add a rule. The three
decisions:

- **Which cells:** the Type column data you selected.
- **What rule:** a dropdown whose values are exactly your four — Pack, Box,
  Single, Supplies — typed into the rule.
- **What happens on failure:** reject. Not warn — reject. For this column
  there is no fifth type, so anything else is by definition a mistake.

Save the rule and look at your Purchases tab. The Type cells have become
pickable — chips or a small arrow, depending on the year — and typing is now
optional where clicking will do.

### Archaeology

Here's the satisfying part. The moment the rule landed, Sheets checked every
existing cell in that range against it — and marked the ones that fail. Scan
the Type column for marked cells (a small colored flag in the corner of the
cell; hover one and Sheets explains its objection).

Compare the count against your logbook prediction. Then repair each one:
click the cell, pick the right value from the dropdown, watch the mark
disappear. Every one of those marks was a stat already wrong or waiting to be.

When the column is clean, visit the Stats tab: the check row agrees — and now
it isn't luck. It's enforced.

### Put Set under contract — from the list

Same move on the Collection tab's Set column, with two differences.

First: instead of typing values into the rule, choose the rule kind that reads
its allowed values **from a range** — and point it at your Sets list on the
Stats tab. (Why from a range here, when Type's values went straight into the
rule? Set the question aside; it gets answered once you've used both for a
while — or work it out now: what's different about the two lists?)

Second: on your first pass, deliberately set the failure behavior to **show a
warning** instead of reject. Then feel the difference:

- Type a junk set name — `zzz` — into some Set cell. It goes in. The cell gets
  flagged, but the mistake is now *in your data*, muttering to itself.
- Change the rule's failure behavior to **reject**, and try the same junk
  again. Refused at the door, with a message, before it ever touches the data.

That's the whole difference: a warning documents the mistake; a rejection
prevents it. Leave the rule on reject, clean up your `zzz`, and repair
whatever old Set inconsistencies the rule flagged — same archaeology as
before.

### Show it

Enter your next real purchase using only the chips — or better, hand the
keyboard to someone else and say "add a pack for me." Watch the sheet steer
them: the Type column offers exactly four choices, the Set column offers your
official list, and there is no way to fumble a category. Data entry in your
tracker now behaves like an app, because you built what apps are built from.

---

## Break it on purpose

**A new set arrives.** Sooner or later you'll start collecting a set that
isn't in your Sets list. Simulate it now: pick any set name you don't collect
yet and try to type it directly into a validated Set cell. Rejected — the
contract doesn't know it yet, and the sheet has no way to tell a new truth
from a typo.

The right order: go to the Sets list first, add the new name there, then come
back to the cell — the dropdown now offers it. (If the new name doesn't
appear, check whether your rule points at a range that includes the row you
just added — a rule aimed at a too-short range is the usual cause.) Remove
your test entries when done.

Notice that those were two different kinds of act. Adding to the Sets list
changed *the rules* — what's allowed to exist. Picking from the dropdown
recorded *a fact* — what happened. Real systems keep those two separate on
purpose, and the small friction of "add it to the list first" is that
separation, felt. You'll meet it again in every database you ever touch.

**Let the contract lapse.** First, the standard pre-experiment move: File →
Version history, name the current version. Now select the Type column, open
Data validation, and remove the rule entirely. Type `Packs` into one row's
Type. No mark. No complaint. Now look at the Stats tab: pack total short,
check row disagreeing — quietly, *again*. The disease from last session came
straight back the moment the contract lapsed, because the formulas were never
protecting themselves; they were only trusting.

Put it right: fix the cell, re-create the rule (or restore your named
version), confirm the check row agrees. Validation isn't a one-time cleanup —
it's a standing guard.

---

## What just happened

"Garbage in, garbage out" gets said like a shrug, but you've now watched every
gear of the mechanism. Every `SUMIF` on your Stats tab trusts the category
columns completely. A value that matches nothing isn't an error — it's
silently left out. So garbage enters at typing time, exits at reading time as
a confident wrong number, and in between: silence. That's not a slogan, it's a
supply chain.

What validation changed is not whether mistakes happen. It's **when and how
loudly**. Without the rule, a mistake is silent when written and silent when
read. With the rule, it's loud at the exact moment of writing — refused at the
door, in front of the one person who knows what they meant and can fix it in
two seconds. Moving failure from silent-and-late to loud-and-early is the
whole game, and not just in spreadsheets: it's why every app, every website,
every form you have ever used puts a dropdown on anything it possibly can.
You've clicked ten thousand of them. Now you know what they were all for.

And the two rules you wrote weren't configured the same way, for a reason
worth noticing. Type's four values went straight into the rule because that
list is *closed* — there is no fifth kind of purchase coming. Sets points at a
range because that list *grows* — new sets keep arriving, and a rule that
reads from a range grows with the list, no rule-editing required. You designed
for your data's future, which is most of what data design is.

---

## Go further

- The dropdown chips can be colored — dig into the rule's options and give
  each Type its own color. The Purchases tab becomes readable from across the
  room. Then decide honestly: is that signal, or decoration?
- Dates can be validated too: a rule that a cell must contain a valid date.
  Should your tracker also refuse dates in the *future*? There's a case each
  way. Decide, then make the Date columns enforce your answer — you're
  writing another clause of the contract.
- Genuinely open: after everything this session taught, the Notes column on
  Purchases is still free text — and that's *correct*. When is free text the
  right choice? What gets lost when a column is validated, and for the next
  new column you ever add, how would you decide which side of the line it
  belongs on?

---

## What you have now

- A Type column under contract: four official values, dropdown-picked,
  everything else rejected at typing time
- A Set column fed from an official Sets list on the Stats tab — the
  tracker's first reference data, with one spelling per set, forever
- Both columns archaeologically cleaned: every old inconsistency flagged by
  the rules and repaired by you
- A Stats check row that agrees by enforcement, not by luck — and the lived
  difference between warn and reject, between changing the rules and
  recording a fact
- Data entry you can hand to anyone: the sheet itself now steers them right
