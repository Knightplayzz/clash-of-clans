<div align="center">
 <img src="https://1000logos.net/wp-content/uploads/2021/02/Clash-of-Clans-logo.png" height="200px"  alt="Clash Of Clans"/>
 <br>
 <p>A light-weight module that makes <a href="https://developer.clashofclans.com/">Clash Of Clans API</a> become easy.</p>
 <a href="https://packagephobia.now.sh/result?p=clash-of-clans-node"><img src="https://badgen.net/packagephobia/install/clash-of-clans-node" alt="Current version"></a>
 <a href="https://www.npmjs.com/package/clash-of-clans-node"><img src="https://img.shields.io/npm/v/clash-of-clans-node" alt="Install size"></a>
 <a href="https://www.npmjs.com/package/clash-of-clans-node"><img src="https://img.shields.io/npm/dt/clash-of-clans-node.svg?maxAge=3600"></a>
 <a href='https://coveralls.io/github/Knightplayzz/clash-of-clans?branch=main'><img src='https://coveralls.io/repos/github/Knightplayzz/clash-of-clans/badge.svg?branch=main' alt='Coverage Status' /></a>
</div>

# Introduction

Provides an easy way to get started with the [Clash of Clans API](https://developer.clashofclans.com)
For more information about the responses please check [Official Clash of Clans Dev Website](https://developer.clashofclans.com/api-docs/index.html). Not releated to Supercell.
Created By: Philippe Smeets

## Installation

`npm install clash-of-clans-node`

## Links

- [Documentation](https://github.com/Knightplayzz/clash-of-clans/blob/main/documentation.md)
- [Clash of Clans Developer Website](https://developer.clashofclans.com/)
- [Clash of Clans API Community Discord](https://discord.gg/Eaja7gJ)

## Example

```javascript
const client = require('clash-of-clans-node');
async function myFunction() {
    await client.login('YOUR-TOKEN-HERE');
    const clan = await client.getClan('#2GLVC9GYV');
    console.log(`${clan.name} (${clan.tag})`);
}
myFunction();
```

### Disclaimer

> This content is not affiliated with, endorsed, sponsored, or specifically approved by Supercell and Supercell is not responsible for it.
