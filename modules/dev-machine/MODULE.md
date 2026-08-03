# Module design — Setting up a dev machine

General-purpose machine setup: lessons whose results other modules assume and cite.
Nothing in this module is specific to any other module's theme — that's the reason
it exists. When a setup step is particular to one module (installing a game, a
game-specific tool), it belongs in that module, not here.

General method and format rules live in `authoring/PRINCIPLES.md`; this file binds
only this module.

## Module-specific constraints

- **Theme-neutral.** No lesson here references any other module's subject matter.
  Motivating examples stay generic ("programs that write files constantly"), and
  the lesson must pay off on its own terms (the machine runs real code by the end).
- **Platform scope: macOS deliveries only, for now.** Cores tag platform-specific
  facts `[macos]` / `[windows]`; a Windows/WSL2 variant is the most likely next
  addition.
- **Reference deliveries matter here.** Setup is the module most likely to be
  executed by an experienced adult on a learner's behalf; every lesson gets a
  reference delivery.

## Lessons

| Lesson | Goal | Status |
|---|---|---|
| `dev-machine-setup` | VS Code, Node, git installed and verified; terminal basics; a projects folder; first code run in the Node REPL | core + guided + reference written |

## Stubs / likely additions

- Windows (WSL2) variant of the coding-machine lesson, when a Windows learner
  exists.
- A "second machine" lesson (SSH, moving work between machines) if/when a module
  needs it — do not build speculatively.

## Cross-module condition

Other modules cite this module's result as: "a computer set up for coding —
established by `modules/dev-machine/lessons/dev-machine-setup/`."
