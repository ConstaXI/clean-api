export type SurveyResultModel = {
  surveyId: string
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}

type SurveyAnswerModel = {
  image?: string
  answer: string
  count: number
  percent: number
  isCurrentAccountAnswered: boolean
}

export interface ISurveyResultModel {
  surveyId: string
  accountId: string
  answer: string
  date: Date
}
