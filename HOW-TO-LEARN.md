# How to learn from this repo

Seven habits. None of them are hard, all of them feel slightly unnecessary, and
together they're most of the difference between someone who gets stuck and stays stuck
and someone who gets stuck and gets through. The lessons assume you're using them.

## 1. Predict before you run

Before you run anything — a command, a program, a change to a setting — say what you
expect to happen. Out loud or written down, but concretely: "the server will refuse and
print an error naming the version."

This isn't about being right. It's that an unexpected result only teaches you something
if you *notice* it's unexpected. Without a prediction, a weird result is just noise and
you shrug. With one, it's evidence that something you believed is wrong — and now you
have a specific thing to find out.

## 2. Read the whole error, out loud, before changing anything

When something fails, the message it prints is usually more specific than you'd expect:
it names the file it wanted, the thing it got instead, the line it gave up on. Most
people never read it — they see red text, feel the sting, and start changing things.

Read every word first, out loud, even the parts that look like gibberish. Then decide
what to change. This single habit will save you more time than anything else on this
page.

## 3. Break it on purpose

When a lesson says "break it on purpose," actually do it. Causing a failure yourself —
and then undoing it — does three things: the error becomes a known consequence instead
of a mystery, you get proof that failure is reversible (which is most of the fear), and
you build the habit of asking "what did I change?" while the answer is still obvious.

You can do this beyond the lessons, too. Anything you know how to un-break, you're
allowed to break.

## 4. Keep the walls log

Every time you get properly stuck, put four lines in [walls.md](walls.md):

```
What stopped me:
What I guessed:
What I tried:
What it actually was:
```

This will feel pointless in the moment. Do it anyway. A few months from now that file
will be a list of things that were impossible at the time — every one of which turned
out to be temporary. There is no argument anyone can make to you that is as convincing
as your own data.

## 5. Type it, don't paste it

Setup commands — installers, boilerplate you're told to run once — copy and paste those,
they teach nothing. But the material itself, the code and configuration a lesson is
actually about: type it by hand. Typing forces you to read every character, and reading
every character is how the shape of a language gets into your head.

## 6. Explain it to someone

After you build something, explain what happened to another person — at dinner, over a
game, whoever will listen. Explaining forces you to actually have the story straight,
and you'll find the gaps in your understanding exactly where the explanation gets
vague. It's also allowed to be fun that you made a thing.

Each time you re-explain something, try to be slightly more accurate than last time.
"My code told the bot to talk" is a fine first version. Later it becomes a story about
a library, a message, and two programs agreeing on a language — same story, sharper
focus.

## 7. Sometimes, read the whole surface

Now and then a lesson will tell you to read an *entire* list — every setting in a file,
every command a tool accepts — not to find any particular answer, but to see how big
the space is. Do these. Knowing what exists is what lets you later think "wait, isn't
there a setting for that?" — which is the actual skill that separates people who can
find doors from people who see walls.
