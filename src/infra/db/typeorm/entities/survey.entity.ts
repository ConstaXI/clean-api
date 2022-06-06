import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ISurveyAnswerModel, ISurveyModel } from '../../../../domain/models/survey'
import SurveyAnswerEntity from './surveyAnswer.entity'
import AccountEntity from './account.entity'
import { IAccountModel } from '../../../../domain/models/account'
import { ISurveyResultModel } from '../../../../domain/models/survey-result'
import SurveyResultEntity from './surveyResult.entity'

@Entity('surveys')
export default class SurveyEntity implements ISurveyModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'timestamptz' })
  date: Date

  @Column()
  question: string

  @Column()
  accountId: string

  didAnswer?: boolean

  @OneToMany(() => SurveyAnswerEntity, surveyAnswer => surveyAnswer.survey, { cascade: true, onDelete: 'CASCADE' })
  answers: ISurveyAnswerModel[]

  @OneToMany(() => SurveyResultEntity, surveyResult => surveyResult.survey, { onDelete: 'CASCADE' })
  surveyResults: ISurveyResultModel[]

  @ManyToOne(() => AccountEntity, account => account.surveys, {
    cascade: ['insert'],
    onDelete: 'CASCADE'
  })
  account: IAccountModel
}
