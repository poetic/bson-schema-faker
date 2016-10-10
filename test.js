/*
  // "undefined",
  // "null",
  // "binData",
  // "regex",
  // "dbPointer",
  // "javascript",
  // "symbol",
  // "javascriptWithScope",
  "object",
  "array",
  "string",
  "bool",
  "date",
  "timestamp",
  "int",
  "long",
  "double",
  "objectId",
  // "minKey",
  // "maxKey",
*/

var assert = require('assert')
var bsj = require('./index')
var bson = require('bson')

var testCases = [
  {
    schema: {
      type: 'object',
      properties: {
        user: {
          type: 'object',
          properties: {
            string: {
              type: 'string'
            },
            long: {
              type: 'long',
            },
            int: {
              type: 'int',
            },
            bool: {
              type: 'bool',
            }
          },
        },
        cars: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              string: {
                type: 'string'
              }
            }
          }
        }
      },
    },
    fakeDoc: {
      user: {
        string: 'a',
        long: bson.Long.fromInt(0),
        int: new bson.Int32(0),
        bool: true,
      },
      cars: [
        {
          string: 'a'
        }
      ]
    }
  }
]

testCases.forEach(function(testCase) {
  assert.equal(
    JSON.stringify(bsj(testCase.schema), 2, null),
    JSON.stringify(testCase.fakeDoc, 2, null)
  )
})
