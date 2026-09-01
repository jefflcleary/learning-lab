# Ideas

Holding ground. Append raw ideas under a date heading; structure them later (or never).
Nothing here is a commitment. When an idea graduates into the module, move it there
and delete it here.

---

## 2026-07-31

- **Module: creating a brand new game mode in Minecraft.** Probably spans datapacks
  → bots → maybe Skript; could be the worked example of a learner-driven arc.
- **Side lesson: try downgrading an existing world to an older version.** The stated
  assumption is "the current world is on the newest version, so it can't move to a
  version the community tools support." Perfect assumption to push on. Nobody involved
  knows what's actually possible (Mojang's upgrader is one-way by design; third-party
  tools exist that claim otherwise — current state unknown), which makes it a genuinely
  open experiment rather than a staged one. The deeper payload: a world stops being a
  nebulous "the world in the game" and becomes *files you can copy* — copies are cheap,
  experiments on copies are free, and "version of a world" becomes concrete. Natural
  bridge between `choosing-a-version` and the worlds/backups arc; also potentially
  reframes the sandbox-server option (sandbox = downgraded *copy of the real world*
  instead of a fresh world, if it works). Rule the lesson must enforce: experiments run
  on a copy, never on the original.

## Carried over from early design sessions

Datapack material: custom crafting recipes; welcome message + starter kit; a
`/trigger`-based teleport system; repeating tick function; custom advancements.

Python-against-the-server material: RCON scripting (scheduled weather, announcements,
milestone triggers); log parsing into a leaderboard, piped back through RCON so the
server trash-talks people automatically; world data analysis (nbtlib, anvil-parser,
heat maps, block census); Server List Ping implemented by hand.

Infrastructure material: bash and PowerShell backup scripts; git properly; Docker; WSL2
or a mini PC for Linux/SSH/cron/systemd; DNS + SRV record so people connect to a real
hostname; **Wireshark on a Minecraft join** (watch the handshake in the clear, watch
encryption engage — ten minutes and networking becomes visible).

"Wait, you can do that?" reveals, each a potential short lesson or aside:

- **flying-squid** — write a Minecraft *server* in JavaScript; mind-expander about what
  software is
- **Skript** — English-like scripting on Paper; plugin behavior without Java
- **Geyser + Floodgate** — Bedrock players (phones, consoles) join a Java server;
  restores crossplay lost by leaving hosted worlds
- **Simple Voice Chat** — proximity voice; changes how a server feels
- **BlueMap / squaremap** — live browser map of the world
- **Velocity** — multiple worlds behind one address
- **Chunky** — pregenerate terrain

Open questions parked here so they aren't lost:

- Cross-version joining: people have built things that attempt it; current state
  unknown. Kept as a genuinely open Go Further question in `choosing-a-version`.
- Where does "read the entire events list" belong in the bot arc — before first
  success, or right after it?
- Does the dev/prod passage at the end of `choosing-a-version`'s guided delivery read
  as talking down? Flagged, unresolved.
