export interface DeleteSurveyById {
  delete: (id: string) => Promise<void>
}
