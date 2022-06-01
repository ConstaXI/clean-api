import { ISurveyAnswerModel, ISurveyModel } from '../../../../domain/models/survey'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import SurveyEntity from './survey.entity'

@Entity('surveyAnswers')
export default class SurveyAnswerEntity implements ISurveyAnswerModel {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  answer: string

  @Column()
  image: string

  @Column()
  survey_id: string

  @ManyToOne(() => SurveyEntity, survey => survey.answers)
  survey: ISurveyModel
}
