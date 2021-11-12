import { makeLoginController } from '../../factories/controllers/login/login/login-controller-factory'
import { adaptResolver } from '../../adapters/express/apollo-server-resolver-adapter'
import { makeSignUpController } from '../../factories/controllers/login/signup/signup-controller-factory'

export default {
  Query: {
    login: async (parent: any, args: any) => await adaptResolver(makeLoginController(), args)
  },

  Mutation: {
    signup: async (parent: any, args: any) => await adaptResolver(makeSignUpController(), args)
  }
}
