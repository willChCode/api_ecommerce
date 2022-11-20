const { z } = require('zod')

const loginSchema = z.object({
  email: z.string().min(1, 'Required').email(),
  password: z.string().min(1, 'Required')
})

const registerSchema = z
  .object({
    name: z.string().min(1, 'Required').max(30),
    age: z
      .number()
      .min(1, 'Required')
      .min(10, 'Los menores de edad no se admiten')
      .max(100, 'No queremos viejos'),
    email: z.string().min(1, 'Required').email(),
    password: z
      .string()
      .min(1, 'Required')
      .max(30)
      .trim()
      .superRefine((val, ctx) => {
        if (val.trim().includes(' ')) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'No puede haber espacios'
          })
        }
      })
      .transform(val => val.trim().replaceAll("'", '')),
    password2: z.string().optional()
  })
  .superRefine(val => val.password === val.password2, {
    message: 'Contraseñas no coinciden',
    path: ['password2']
  })

module.exports = {
  loginSchema,
  registerSchema
}
