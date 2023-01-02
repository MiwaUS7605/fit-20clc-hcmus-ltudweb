module.exports = {
  type: 'object',
  properties: {
    name: { type: 'string', 'minLength': 1 },
    email: { type: 'string', format: 'email' },
    password: { type: 'string', 'minLength': 6 },
    confirmpassword: { type: 'string', 'minLength':6},
    phonenumber: {type: 'string', 'minLength':10},
    address: { type: 'string', 'maxLength':256}
  },
  required: ['name', 'email', 'password','confirmpassword','phonenumber'],
  additionalProperties: false,
};