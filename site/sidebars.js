// @ts-check
// Hand-curated sidebar. Two top-level sections: Welcome (the lab itself) and
// Modules (one category per module, lessons in that module's PATH order), plus
// Reference. Lesson labels come from each file's H1 title. Update this file when
// lessons or modules are added (the delivery workflow's render-check will catch
// omissions).

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
          label: 'Setting up a dev machine',
          link: {type: 'doc', id: 'modules/dev-machine/README'},
          items: [
            'modules/dev-machine/PATH',
            'modules/dev-machine/lessons/dev-machine-setup/guided',
          ],
        },
        {
          type: 'category',
          label: 'Running a Minecraft server',
          link: {type: 'doc', id: 'modules/minecraft-server/README'},
          items: [
            'modules/minecraft-server/PATH',
            'modules/minecraft-server/lessons/running-your-own-server/guided',
            'modules/minecraft-server/lessons/server-settings-and-console/guided',
            'modules/minecraft-server/lessons/building-datapacks/guided',
            'modules/minecraft-server/lessons/letting-friends-join/guided',
            'modules/minecraft-server/lessons/worlds-and-backups/guided',
            'modules/minecraft-server/lessons/always-on/guided',
            'modules/minecraft-server/lessons/git-for-your-server/guided',
            'modules/minecraft-server/lessons/choosing-a-version/guided',
            'modules/minecraft-server/lessons/writing-your-first-bot/guided',
            'modules/minecraft-server/lessons/bot-commands-and-building/guided',
            'modules/minecraft-server/lessons/bot-games-and-pathfinding/guided',
            'modules/minecraft-server/lessons/python-logs-and-rcon/guided',
            'modules/minecraft-server/lessons/world-data-and-protocol/guided',
            'modules/minecraft-server/lessons/discord-and-web/guided',
            {
              type: 'category',
              label: 'Quick references',
              items: [
                'modules/minecraft-server/lessons/running-your-own-server/reference',
                'modules/minecraft-server/lessons/letting-friends-join/reference',
                'modules/minecraft-server/lessons/always-on/reference',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Building a collection tracker',
          link: {type: 'doc', id: 'modules/collection-tracker/README'},
          items: [
            'modules/collection-tracker/PATH',
            'modules/collection-tracker/lessons/building-the-ledger/guided',
            'modules/collection-tracker/lessons/purchases-and-payback/guided',
            'modules/collection-tracker/lessons/stats-and-clean-data/guided',
            'modules/collection-tracker/lessons/charts-and-query/guided',
            'modules/collection-tracker/lessons/snapshots-and-logging/guided',
            'modules/collection-tracker/lessons/pack-value-and-selling/guided',
            'modules/collection-tracker/lessons/apps-script-automation/guided',
            'modules/collection-tracker/lessons/fetching-real-prices/guided',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'reference/when-youre-stuck',
        'reference/finding-the-docs',
      ],
    },
  ],
};

export default sidebars;
