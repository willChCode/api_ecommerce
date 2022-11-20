const errors = {
  TypeError: res =>
    res.status(400).json({ error: 'TypeError, error dentro del sistema' }),

  ReferenceError: res =>
    res.status(401).json({ error: 'Referenceerror, dentro del sistema' }),

  Error: res => res.status(400).json({ error: 'errorrr del clienteee' }),

  CastError: (res, error) =>
    res.status(400).json({ error: 'el ID es incorrecto' }),

  MongoServerError: (res, error) => res.status(400).json(error),

  defaultError: res => res.status(500).end() //error del sistema
}

module.exports = (error, req, res, next) => {
  console.log(error.name)

  const handle = errors[error.name] || errors.defaultError

  handle(res, error)
}

// if (error.name === 'TypeError') {
//   res.status(400).json({ error: 'TypeError, error dentro del sistema' })
// } else if (error.name === 'ReferenceError') {
//   res.status(401).json({ error: 'Referenceerror, dentro del sistema' })
// } else if (error.name === 'Error') {
//   res.status(400).json({ error: 'errorrr del clienteee' })
// } else if (error.name == 'CastError') {
//   res.status(400).json({ error: 'el id es incorrecto, ObjectId expect' })
// }
