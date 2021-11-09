export type SurveyResultModel = {
  surveyId: string
  accountId: string
  answers: SurveyAnswerModel[]
  date: Date
}

type SurveyAnswerModel = {
  image?: string
  answer: string
  count: number
  percent: number
}
