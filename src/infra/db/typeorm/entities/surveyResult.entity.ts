import { ISurveyResultModel } from '../../../../domain/models/survey-result'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import AccountEntity from './account.entity'
import SurveyEntity from './survey.entity'
import { IAccountModel } from '../../../../domain/models/account'
import { ISurveyModel } from '../../../../domain/models/survey'

@Entity('surveyResult')
export default class SurveyResultEntity implements ISurveyResultModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  answer: string

  @Column()
  surveyId: string

  @Column()
  accountId: string

  @Column({ type: 'timestamptz' })
  date: Date

  @ManyToOne(() => AccountEntity, accounts => accounts.surveyResults)
  account: IAccountModel

  @ManyToOne(() => SurveyEntity, survey => survey.surveyResults)
  survey: ISurveyModel
}
