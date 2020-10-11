### This is example snapshot for translation

for the snapshot I use [Discord Chat Exporter CLI](https://github.com/Tyrrrz/DiscordChatExporter)
and then I use this script [index.js](/index.js) to get every submited link from each user.
It's also filter out this type of link.
```JavaScript
const filterLink = [
  'https://docs.google.com/spreadsheets/d/1ieuBy28G-ZKPLV-7SUuWN9Eu56U-xw4Z1t2JrpEClfc/.+',
  'https?:[/.a-z0-9A-Z-]+(tbtc|keep).network(.+)?',
  'https?://(cdn.)?(discordapp|discord).com(.+)?',
  'https?://[a-zA-Z0-9.-]/',
];
```
so (_hopefuly_) it will return only article link.

##### Folder tree:
- [raw/](https://github.com/0wx/keep-article/tree/master/snapshot/1602373715180/raw) 
  - [translations.json](https://github.com/0wx/keep-article/tree/master/snapshot/1602373715180/raw/translations.json) - raw snapshot from translations channel
  - [all/](/raw/all) - all raw snapshot from each translation language channel
- [parsed/](https://github.com/0wx/keep-article/tree/master/snapshot/1602373715180/parsed)
  - [translations.json](https://github.com/0wx/keep-article/tree/master/snapshot/1602373715180/parsed/translations.json) - parsed snapshot from translations channel
  - [all/](https://github.com/0wx/keep-article/tree/master/snapshot/1602373715180/parsed/all) - all parsed snapshot from each translation language channel