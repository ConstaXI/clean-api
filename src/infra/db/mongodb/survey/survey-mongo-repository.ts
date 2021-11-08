import { AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
import MongoHelper from '../helpers/mongo-helper'
import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '../../../../domain/models/survey'
import { LoadSurveyByIdRepository } from '../../../../data/protocols/db/survey/load-survey-by-id-repository'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async addSurvey(surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }

  async loadAll(): Promise<SurveyModel[] | null> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    return await surveyCollection.find().toArray() as SurveyModel[]
  }

  async loadById(id: string): Promise<SurveyModel | null> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    return await surveyCollection.findOne({ _id: new ObjectId(id) }) as SurveyModel
  }
}
