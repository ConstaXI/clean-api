import { makeLoginController } from '../../factories/controllers/login/login/login-controller-factory'
import { adaptResolver } from '../../adapters/express/apollo-server-resolver-adapter'

export default {
  Query: {
    login: async (parent: any, args: any) => await adaptResolver(makeLoginController(), args)
  }
}
