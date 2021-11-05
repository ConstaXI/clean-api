export interface SurveyAnswerModel {
  image?: string
  answer: string
}

export interface SurveyModel {
  question: string
  answers: SurveyAnswerModel[]
  date: Date
}
