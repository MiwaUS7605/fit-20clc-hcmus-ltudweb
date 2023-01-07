module.exports = {
    type: 'object',
    properties: {
      name: { type: 'string', 'minLength': 1 },
      price: { type: 'number', 'minimum': 1 }
    },
    required: ['name', 'price'],
    additionalProperties: false
  };