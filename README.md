```
$ npm install sfobj
```

# Usage

```js
import Safe, { unwrap } from 'sfobj'
// const { Safe, unwrap } = require('sfobj')

const obj = Safe({ hello: 'world' })

console.log(obj.hello[unwrap]) // Output: world
console.log(obj.this.prop[0].does.not().even.exist()[unwrap]) // Output: undefined


// No more null/undefined checks
if (typeof obj.a.b().c[1].d()[unwrap] === 'number') {
  // do something here
}

// fallback to default value
const name = obj.getUsers().list[0].name[unwrap] || ''
```
