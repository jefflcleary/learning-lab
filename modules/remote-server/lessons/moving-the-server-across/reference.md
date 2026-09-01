# Moving the server across — reference

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

Compressed version: commands and hazards only. The teaching version is
[guided.md](guided.md).

Goal: server folder on the rented machine, Java installed, port open, server started by
hand and joined. Automating it is the next lesson — deliberately, so a failure here has
one suspect rather than two.

## Java

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo apt update
sudo apt install openjdk-<version>-jre-headless
java -version
which java
```

Version: check Minecraft's own server requirements; the server's own error names what it
wanted if you get it wrong. JRE runs Java programs (the JDK also compiles); headless omits
graphical components. `which java` gives the absolute path the next lesson needs.

Java does not travel in the server folder, which is why it goes first.

## Copy

- **Fresh backup first.** First time the world crosses a network.
- **Stop the server on the Mac.** A world read while being written gives a copy of a state
  that never existed whole.

<span className="run-where run-where-local">On your Mac</span>

```
rsync -av --dry-run <server folder>/ minecraft@<address>:/home/minecraft/server/
rsync -av --progress <server folder>/ minecraft@<address>:/home/minecraft/server/
```

- **Trailing slash on the source is load-bearing.** `folder/` copies the contents;
  `folder` copies the folder into the destination. `--dry-run` shows which you're about to
  get, free.
- `-z` for a slow upload.
- **Do not use `--delete`.** It makes the destination match the source exactly, removing
  anything else there. It is in nearly every example online.
- Travels with the folder: world, `server.properties`, `whitelist.json`, `ops.json`,
  datapacks, and `eula.txt` already accepted. Nothing needs setting up again on the far
  side.

Verify from the far side with `ls`; confirm the world, `server.properties` and
`whitelist.json` arrived.

## Port

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo ufw allow 25565
sudo ufw status
```

Before this rule exists, joining times out — the server is running fine and the firewall
is discarding the connection first. "Running" and "reachable" are separate claims.

## First run by hand

<span className="run-where run-where-remote">On the rented machine</span>

```
java -Xmx3G -jar server.jar nogui
```

`-Xmx` must sit meaningfully below the machine's total memory — the JVM needs more than
the heap and the OS needs its own. Roughly 3G on a 4 GB machine. Set too high, the machine
either refuses to start it or swaps and crawls, with no explanation in the server's own
log.

Join from the Mac at the public address to confirm the copy worked.

## What you have now

- Java on the rented machine; `apt` used
- World, settings, and whitelist copied across and verified
- Minecraft's port open
- The server running on the rented machine and joinable at its public address
