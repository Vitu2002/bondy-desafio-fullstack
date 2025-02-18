import { compare } from 'bcrypt'
import { User } from 'src/models/User'

export const mutationLogin = async (
  _parent,
  args: MutationLoginData,
  _context,
  _info
) => {
  try {
    // Verificando se os argumentos estão preenchidos e válidos
    if (!args.email || !args.password)
      throw new Error('Email and password are required')

    // Validando email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(args.email)) throw new Error('Invalid email format')

    // Validando senha
    if (args.password.length < 4 || args.password.length > 8)
      throw new Error('Password must be between 4 and 8 characters')

    const data = await User.findOne({ email: args.email })
    if (!data) throw new Error('Invalid credentials')
    const { password, _id, ...user } = data.toObject()

    const isValidPasswod = await compare(args.password, password)
    if (!isValidPasswod) throw new Error('Invalid credentials')

    return { user, message: 'Login successful' }
  } catch (err) {
    throw new Error(err.message || 'Internal server error')
  }
}

export interface MutationLoginData {
  email: string
  password: string
}
