/* eslint-disable node/no-path-concat */
import express, { Express } from 'express'
import { resolve } from 'path'

export default (app: Express): void => {
  app.use('/static', express.static(resolve(__dirname, '../../static')))
}
