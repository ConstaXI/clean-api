export type SurveyAnswerModel = {
  image?: string
  answer: string
}

export interface ISurveyAnswerModel extends SurveyAnswerModel {}

export type SurveyModel = {
  id: string
  accountId: string
  question: string
  answers: SurveyAnswerModel[]
  date: Date
  didAnswer?: boolean
}

export interface ISurveyModel extends SurveyModel {}
