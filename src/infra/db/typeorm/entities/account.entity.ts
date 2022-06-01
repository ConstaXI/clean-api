import { IAccountModel } from '../../../../domain/models/account'
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('accounts')
export default class AccountEntity extends BaseEntity implements IAccountModel {
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
}
