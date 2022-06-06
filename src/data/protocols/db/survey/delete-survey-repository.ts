export interface DeleteSurveyByIdRepository {
  delete: (id: string) => Promise<void>
}
