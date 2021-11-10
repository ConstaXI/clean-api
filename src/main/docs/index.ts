import { accountSchema } from './schemas/account-schema'
import { loginPath } from './paths/login-path'
import { loginParamsSchema } from './schemas/login-params-schema'
import { errorSchema } from './schemas/error-schema'
import { badRequest } from './components/bad-request'
import { serverError } from './components/server-error'
import { unauthorized } from './components/unauthorized'
import { notFound } from './components/not-found'
import { surveysPath } from './paths/surveys-path'
import { surveysSchema } from './schemas/surveys-schema'
import { surveySchema } from './schemas/survey-schema'
import { surveyAnswerSchema } from './schemas/survey-answer-schema'
import { forbidden } from './components/forbidden'
import { apiKeyAuthSchema } from './schemas/api-key-auth-schema'
import { signUpPath } from './paths/signup-path'
import { signUpParamsSchema } from './schemas/signup-params-schema'
import { addSurveyParamsSchema } from './schemas/add-survey-params-schema'
import { surveyResultPath } from './paths/survey-result-path'
import { saveSurveyParamsSchema } from './schemas/save-survey-params-schema'
import { surveyResultSchema } from './schemas/survey-result-schema'
import { surveyResultAnswerSchema } from './schemas/survey-result-answer-schema'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Clean Node API',
    description: 'An API designed with clean architecture',
    version: '1.0.0'
  },
  license: {
    name: 'ISC',
    url: 'https://opensource.org/licenses/ISC'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }, {
    name: 'Survey'
  }],
  paths: {
    '/login': loginPath,
    '/surveys': surveysPath,
    '/signup': signUpPath,
    '/surveys/{surveyId}/results': surveyResultPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema,
    signUpParams: signUpParamsSchema,
    addSurveyParams: addSurveyParamsSchema,
    saveSurveyParams: saveSurveyParamsSchema,
    surveyResult: surveyResultSchema,
    surveyResultAnswer: surveyResultAnswerSchema
  },
  components: {
    securitySchemes: {
      apikeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
