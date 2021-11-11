export const surveyResultAnswerSchema = {
  type: 'object',
  properties: {
    image: {
      type: 'string'
    },
    answer: {
      type: 'string'
    },
    count: {
      type: 'number'
    },
    percent: {
      type: 'number'
    },
    isCurrentAccountAnswered: {
      type: 'boolean'
    }
  },
  required: ['answer', 'count', 'percent', 'isCurrentAccountAnswered']
}
