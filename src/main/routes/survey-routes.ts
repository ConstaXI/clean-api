import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-routes-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-controller-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys-controller-factory/load-surveys-controller-factory'
import { auth } from '../middlewares/auth'
import {
  makeDeleteSurveysController
} from '../factories/controllers/survey/delete-survey-controller-factory/delete-survey-controller-factory'

export default (router: Router): void => {
  router.post('/surveys', auth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
  router.delete('/surveys/:surveyId', auth, adaptRoute(makeDeleteSurveysController()))
}
