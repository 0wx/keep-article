const fs = require('fs');
const translations = require('./raw/translations.json');
const all = fs.readdirSync('./raw/all');
const filterLink = [
  'https://docs.google.com/spreadsheets/d/1ieuBy28G-ZKPLV-7SUuWN9Eu56U-xw4Z1t2JrpEClfc/.+',
  'https?:[/.a-z0-9A-Z-]+(tbtc|keep).network(.+)?',
  'https?://(cdn.)?(discordapp|discord).com(.+)?',
  'https?://[a-zA-Z0-9.-]/',
];


parse(translations, './parsed/translations.json');

all.forEach(data => {
  if(!fs.existsSync('./parsed/all')) fs.mkdirSync('./parsed/all');
  parse(require(`./raw/all/${data}`), `./parsed/all/${data}`);
})


function parse({ guild, channel, messages }, path) {
  let results = {};
  messages

    // filter wheter the message from bot or not
    .filter((x) => !x.author.isBot)

    // this process actually can be done using reduce function
    // but i'm not really good using reduce, so I use old school forEach function
    .forEach(({ author, content, timestamp, id }) => {
      let links = content

        // this is to remove all 'quoted' reply
        .split('\n')
        .filter((x) => x[0] != '>')

        // then join them with space instead
        // so we can split everything with 1 identifier instead using regex /[\s\n]/
        // because it cause some issue with regex
        .join(' ')

        // then split original message and filter message that identified as links
        .split(' ')
        .filter((x) => x.match(/https?:\/\/.+/i))

        // this is to filter is the link from filterLink array
        .filter((url) =>
          filterLink.every((x) => !url.match(new RegExp(x, 'i')))
        )

        // this map to append the chat id and timestamp
        .map((url) => ({ id, timestamp, url }));

      if (!!links.length) {
        if (results[author.id]) {
          results[author.id].contents = [
            ...results[author.id].contents,
            ...links,
          ];
        } else {
          // this just to make the JSON file looks cleaner, lol.
          author.avatarUrl = author.avatarUrl.replace(
            /https?:\/\/cdn\.discordapp.com\/avatars\/[0-9]+\/(.+)\.[a-z0-9]+/g,
            '$1'
          );

          results[author.id] = {
            ...author,
            contents: [...links],
          };
        }
      }
    });

  results = { guild, channel, results };
  fs.writeFileSync(path, JSON.stringify(results, null, 4));
}
