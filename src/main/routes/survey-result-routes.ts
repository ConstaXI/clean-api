import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-routes-adapter'
import { auth } from '../middlewares/auth'
import { makeSaveSurveyResultController } from '../factories/controllers/survey-result/save-survey-result'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
}
