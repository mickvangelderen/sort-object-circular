# Usage guide

This guide is for people who want to use sort-object-circular. 

Other guides:
* [Development guide](development.md)

## Install

`npm install sort-object-circular`

## Usage

```js
import sortObject from 'sort-object-circular'

sortObject({ b: 1, a: 2 })
// { a: 2, b: 1 }
```

The function:
* sorts keys recursively,
* clones object prototypes so you can sort class instances and
* works for circular structures.

## Thanks

This project uses [node-package-skeleton](https://github.com/mickvangelderen/node-package-skeleton) as a starting point for package development. 
