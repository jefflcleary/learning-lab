// @ts-check
// Hand-curated sidebar. Two top-level sections: Welcome (the lab itself) and
// Modules (one category per module, lessons in that module's PATH order). Lesson
// labels come from each file's H1 title. Update this file when lessons or modules
// are added (the delivery workflow's render-check will catch omissions).

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  main: [
    {
      type: 'category',
      label: 'Welcome',
      collapsed: false,
      link: {type: 'doc', id: 'README'},
      items: ['HOW-TO-LEARN', 'logbook', 'about-this-repo'],
    },
    {
      type: 'category',
      label: 'Modules',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'Getting set up',
          link: {type: 'doc', id: 'modules/setup/README'},
          items: [
            'modules/setup/PATH',
            'modules/setup/lessons/dev-machine-setup/guided',
          ],
        },
        {
          type: 'category',
          label: 'Running a Minecraft server',
          link: {type: 'doc', id: 'modules/minecraft-server/README'},
          items: [
            'modules/minecraft-server/PATH',
            'modules/minecraft-server/lessons/running-your-own-server/guided',
            'modules/minecraft-server/lessons/server-settings/guided',
            'modules/minecraft-server/lessons/console-commands/guided',
            'modules/minecraft-server/lessons/first-datapack/guided',
            'modules/minecraft-server/lessons/datapack-functions/guided',
            'modules/minecraft-server/lessons/joining-over-lan/guided',
            'modules/minecraft-server/lessons/joining-from-outside/guided',
            'modules/minecraft-server/lessons/locking-the-door/guided',
            'modules/minecraft-server/lessons/worlds-and-copies/guided',
            'modules/minecraft-server/lessons/backups/guided',
            'modules/minecraft-server/lessons/backups-without-stopping/guided',
            'modules/minecraft-server/lessons/always-on/guided',
            'modules/minecraft-server/lessons/git-for-your-server/guided',
            'modules/minecraft-server/lessons/choosing-a-version/guided',
            'modules/minecraft-server/lessons/first-bot/guided',
            'modules/minecraft-server/lessons/bot-follows/guided',
            'modules/minecraft-server/lessons/bot-chat-commands/guided',
            'modules/minecraft-server/lessons/bot-builds/guided',
            'modules/minecraft-server/lessons/bot-runs-a-game/guided',
            'modules/minecraft-server/lessons/bot-pathfinding/guided',
            'modules/minecraft-server/lessons/reading-the-logs/guided',
            'modules/minecraft-server/lessons/rcon-scripting/guided',
            'modules/minecraft-server/lessons/world-data/guided',
            'modules/minecraft-server/lessons/server-list-ping/guided',
            'modules/minecraft-server/lessons/discord-bridge/guided',
            'modules/minecraft-server/lessons/whos-online-page/guided',
            {
              type: 'category',
              label: 'Quick references',
              items: [
                'modules/minecraft-server/lessons/running-your-own-server/reference',
                'modules/minecraft-server/lessons/joining-from-outside/reference',
                'modules/minecraft-server/lessons/always-on/reference',
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
