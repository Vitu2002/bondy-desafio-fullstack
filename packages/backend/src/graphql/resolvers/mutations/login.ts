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
      return {
        message: 'Email and password are required',
        success: false,
      }

    // Validando email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!emailRegex.test(args.email))
      return { message: 'Invalid email format', success: false }

    // Validando senha
    if (args.password.length < 4 || args.password.length > 8)
      return {
        message: 'Password must be between 4 and 8 characters',
        success: false,
      }

    const data = await User.findOne({ email: args.email })
    if (!data) return { message: 'Invalid credentials', success: false }
    const { password, _id, ...user } = data.toObject()

    const isValidPasswod = await compare(args.password, password)
    if (!isValidPasswod)
      return { message: 'Invalid credentials', success: false }

    return { user, success: true, message: 'Login successful' }
  } catch (err) {
    return {
      message: (err.message as string) || 'Internal server error',
      success: false,
    }
  }
}

export interface MutationLoginData {
  email: string
  password: string
}
