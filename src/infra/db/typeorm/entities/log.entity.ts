import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('logs')
export default class LogEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'text' })
  stack: string

  @Column({ type: 'timestamptz' })
  date: Date
}
