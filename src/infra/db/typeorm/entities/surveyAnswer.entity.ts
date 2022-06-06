import { ISurveyAnswerModel, ISurveyModel } from '../../../../domain/models/survey'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import SurveyEntity from './survey.entity'

@Entity('surveyAnswers')
export default class SurveyAnswerEntity implements ISurveyAnswerModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  answer: string

  @Column({ nullable: true })
  image: string

  count: number

  percent: number

  isCurrentAccountAnswered: boolean

  @Column()
  surveyId: string

  @ManyToOne(() => SurveyEntity, survey => survey.answers, { onDelete: 'CASCADE' })
  survey: ISurveyModel
}
