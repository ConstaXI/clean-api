import TypeormHelper from './typeorm-helper'

describe('Typeorm helper', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  test('Should reconnect if typeorm connection is down', async () => {
    const connection = await TypeormHelper.getConnection()
    expect(connection.isInitialized).toBeTruthy()
    await TypeormHelper.disconnect()
    expect(connection.isInitialized).toBeFalsy()
    await TypeormHelper.connect()
    expect(connection.isInitialized).toBeTruthy()
  })
})
