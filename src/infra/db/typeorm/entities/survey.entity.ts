import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ISurveyAnswerModel, ISurveyModel } from '../../../../domain/models/survey'
import SurveyAnswerEntity from './surveyAnswer.entity'
import AccountEntity from './account.entity'
import { IAccountModel } from '../../../../domain/models/account'

@Entity('surveys')
export default class SurveyEntity implements ISurveyModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'timestamptz' })
  date: Date

  @Column()
  question: string

  @OneToMany(() => SurveyAnswerEntity, surveyAnswer => surveyAnswer.survey)
  answers: ISurveyAnswerModel[]

  @ManyToOne(() => AccountEntity, account => account.surveys)
  account: IAccountModel
}
