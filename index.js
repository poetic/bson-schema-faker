/*
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
*/

var bson = require('bson')

function bsonSchemaFaker (schema) {
  switch (schema.type) {
    case 'object':
      var fakeObject = {}

      for (var key in schema.properties) {
        fakeObject[key] = bsonSchemaFaker(schema.properties[key])
      }

      return fakeObject
    case 'array':
      return [bsonSchemaFaker(schema.items)]
    case 'string':
      return 'a'
    case 'bool':
      return true
    case 'date':
      return new Date(0)
    case 'timestamp':
      return bson.Timestamp.fromNumber(0)
    case 'int':
      return new bson.Int32(0)
    case 'long':
      return bson.Long.fromNumber(0)
    case 'double':
      return new bson.Double(0)
    case 'objectId':
      return new bson.objectId('57fbc79335224114d6c0e98b')
    default:
      throw new Error(schema.type + ' is not recognized')
  }
}

module.exports = bsonSchemaFaker
