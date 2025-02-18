import { ApolloServer } from '@apollo/server'
import { buildSubgraphSchema } from '@apollo/subgraph'
import { hashSync } from 'bcrypt'
import resolvers from '../graphql/resolvers'
import typeDefs from '../typeDefs'

// Mock de User
jest.mock('src/models/User', () => ({
  User: {
    findOne: jest.fn().mockResolvedValue({
      _id: '123',
      email: 'test@ted.dev',
      password: hashSync('123456', 8),
      toObject: jest.fn().mockReturnValue({
        _id: '123',
        email: 'test@test.dev',
        password: hashSync('123456', 8),
      }),
    }),
  },
}))

// Criação do servidor Apollo
const schema = buildSubgraphSchema({ typeDefs, resolvers })
const server = new ApolloServer({
  schema,
  plugins: [],
  includeStacktraceInErrorResponses: true,
  status400ForVariableCoercionErrors: true,
  introspection: true,
})

// Função para executar as queries e mutations
const executeQuery = async (query: string, variables?: Record<string, any>) => {
  const res = await server.executeOperation({ query, variables })
  if ('singleResult' in res.body) return res.body.singleResult
  throw new Error('Unexpected response format')
}

describe('GraphQL Server', () => {
  it('should return "true" when QueryTest is called', async () => {
    const QUERY_TEST = `
      query {
        queryTest
      }
    `

    const res = await executeQuery(QUERY_TEST)

    expect(res.errors).toBeUndefined()
    expect(res.data?.queryTest).toEqual(true)
  })

  it('should return "true" when MutationTest is called', async () => {
    const MUTATION_TEST = `
      mutation ($test: Boolean!) {
        mutationTest(test: $test)
      }
    `

    const res = await executeQuery(MUTATION_TEST, { test: true })

    expect(res.errors).toBeUndefined()
    expect(res.data?.mutationTest).toEqual(true)
  })

  it('should return "Login successful" when MutationLogin is called', async () => {
    const MUTATION_LOGIN = `
      mutation ($email: String!, $password: String!) {
        mutationLogin(email: $email, password: $password) {
          message
        }
      }
    `

    const res = await executeQuery(MUTATION_LOGIN, {
      email: 'test@test.dev',
      password: '123456',
    })

    expect(res.errors).toBeUndefined()
    expect(res.data?.mutationLogin).toEqual({ message: 'Login successful' })
  }, 60000)
})
