import {jsonToJevko, jsonToSchema} from './mod.js'
import {jevkoToPrettyString, assert} from './devDeps.js'

const {test} = Deno

test('jsonToJevko', () => {
  assert(jevkoToPrettyString(jsonToJevko({ 
    "first name": "John",
    "last name": "Smith",
    "is alive": true,
    "age": 27,
    "address": {
      "street address": "21 2nd Street",
      "city": "New York",
      "state": "NY",
      "postal code": "10021-3100"
    },
    "phone numbers": [
      {
        "type": "home",
        "number": "212 555-1234"
      },
      {
        "type": "office",
        "number": "646 555-4567"
      }
    ],
    "children": [],
    "spouse": null 
  })).includes(`
  [
    type [home]
    number [212 555-1234]
  ]`))
})

test('jsonToSchema', () => {
  const res = jsonToSchema({ 
    "first name": "John",
    "last name": "Smith",
    "is alive": true,
    "age": 27,
    "address": {
      "street address": "21 2nd Street",
      "city": "New York",
      "state": "NY",
      "postal code": "10021-3100"
    },
    "phone numbers": [
      {
        "type": "home",
        "number": "212 555-1234"
      },
      {
        "type": "office",
        "number": "646 555-4567"
      }
    ],
    "children": [],
    "spouse": null 
  })
  
  assert(res.props['phone numbers'].itemSchemas[0].props.number.type === 'string')
})

