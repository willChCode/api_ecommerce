const { z } = require('zod')
const { ObjectId } = require('mongodb')

const orderSchema = z.object({
  user: z
    .string()
    .min(1, 'Required')
    .superRefine((val, ctx) => {
      if (!ObjectId.isValid(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `ID ->${val}, no es un id valido de mongodb`
        })
      }
    }),
  orderItems: z
    .object({
      // _id,
      title: z.string().min(1, 'Requerido').max(30),
      size: z.enum(['XS', 'S', , 'M', , 'L', , 'XL', , 'XXL', , 'XXXL']),
      quantity: z.number().default(0),
      slug: z
        .string()
        .min(1)
        .superRefine((val, ctx) => {
          if (val.trim().includes(' '))
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: 'there cannot be spaces'
            })
        })
        .transform(val => val.trim().replaceAll("'", '')),
      image: z.string().min(1, 'Minimo 1 imagen'),
      price: z.number().default(0)
    })
    .array()
    .min(
      1,
      'Al menos un product es requerido en el carrito para crear una orden'
    ),
  shippingAddress: z.object({
    firstName: z.string().min(1, 'Requerido'),
    lastName: z.string().min(1, 'Requerido'),
    address: z.string().min(1, 'Requerido'),
    address2: z.string().optional(),
    zip: z.number().min(1, 'Requerido'),
    city: z.string().min(1, 'Requerido'),
    country: z.string().min(1, 'Requerido'),
    phone: z.number().min(1, 'Requerido')
  }),
  numberOfItems: z
    .number()
    .min(
      1,
      'Al menos un product es requerido en el carrito para crear una orden'
    ),
  subTotal: z.number().default(0),
  tax: z.number().default(0),
  total: z.number().default(0),
  isPaid: z.boolean().default(false),
  paidAt: z.string().optional(),
  transactionId: z.string().optional()
})

module.exports = {
  orderSchema
}
