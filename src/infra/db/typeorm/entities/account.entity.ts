import { IAccountModel } from '../../../../domain/models/account'
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ISurveyModel } from '../../../../domain/models/survey'
import SurveyEntity from './survey.entity'
import SurveyResultEntity from './surveyResult.entity'

@Entity('accounts')
export default class AccountEntity implements IAccountModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  email: string

  @Column()
  name: string

  @Column()
  password: string

  @Column({ nullable: true })
  accessToken?: string

  @OneToMany(() => SurveyEntity, survey => survey.account)
  surveys: ISurveyModel

  @OneToMany(() => SurveyResultEntity, surveyResult => surveyResult.account)
  surveyResults: SurveyResultEntity[]
}
