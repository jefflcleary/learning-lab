// @ts-check
// Hand-curated sidebar: lab front matter first, then each curriculum as a
// category whose lessons follow that curriculum's PATH.md order. Lesson labels
// come from each file's H1 title. Update this file when lessons are added
// (the delivery workflow's render-check will catch omissions).

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  main: [
    'README',
    'HOW-TO-LEARN',
    'walls',
    {
      type: 'category',
      label: 'Running a Minecraft server',
      link: {type: 'doc', id: 'curricula/minecraft-server/README'},
      items: [
        'curricula/minecraft-server/PATH',
        'curricula/minecraft-server/lessons/dev-machine-setup/guided',
        'curricula/minecraft-server/lessons/running-your-own-server/guided',
        'curricula/minecraft-server/lessons/server-settings/guided',
        'curricula/minecraft-server/lessons/console-commands/guided',
        'curricula/minecraft-server/lessons/first-datapack/guided',
        'curricula/minecraft-server/lessons/datapack-functions/guided',
        'curricula/minecraft-server/lessons/joining-over-lan/guided',
        'curricula/minecraft-server/lessons/joining-from-outside/guided',
        'curricula/minecraft-server/lessons/locking-the-door/guided',
        'curricula/minecraft-server/lessons/worlds-and-copies/guided',
        'curricula/minecraft-server/lessons/backups/guided',
        'curricula/minecraft-server/lessons/backups-without-stopping/guided',
        'curricula/minecraft-server/lessons/always-on/guided',
        'curricula/minecraft-server/lessons/git-for-your-server/guided',
        'curricula/minecraft-server/lessons/choosing-a-version/guided',
        'curricula/minecraft-server/lessons/first-bot/guided',
        'curricula/minecraft-server/lessons/bot-follows/guided',
        'curricula/minecraft-server/lessons/bot-chat-commands/guided',
        'curricula/minecraft-server/lessons/bot-builds/guided',
        'curricula/minecraft-server/lessons/bot-runs-a-game/guided',
        'curricula/minecraft-server/lessons/bot-pathfinding/guided',
        'curricula/minecraft-server/lessons/reading-the-logs/guided',
        'curricula/minecraft-server/lessons/rcon-scripting/guided',
        'curricula/minecraft-server/lessons/world-data/guided',
        'curricula/minecraft-server/lessons/server-list-ping/guided',
        'curricula/minecraft-server/lessons/discord-bridge/guided',
        'curricula/minecraft-server/lessons/whos-online-page/guided',
        {
          type: 'category',
          label: 'Quick references',
          items: [
            'curricula/minecraft-server/lessons/dev-machine-setup/reference',
            'curricula/minecraft-server/lessons/running-your-own-server/reference',
            'curricula/minecraft-server/lessons/joining-from-outside/reference',
            'curricula/minecraft-server/lessons/always-on/reference',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
