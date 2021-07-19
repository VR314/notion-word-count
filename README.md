# Notion Word Count Chrome Extension

Notion has a word count for a whole page, but what if you want to check the number of words/characters in a selected block? This extension does just that.

This extension only has one content script. At a high level, it simply grabs the element that is indicated as selected, and gets the content of that block.

## Install deps

```bash
npm install
```


## Build

```bash
npm run build
```

## Build in watch mode

```bash
npm run watch
```


## Load extension to chrome

Load `dist` directory
