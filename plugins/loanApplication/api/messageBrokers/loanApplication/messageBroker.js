import { isUndefined } from 'lodash'
import actionMap from './messageBrokerActions'
const sendError = message => ({
  status: 'error',
  errorMessage: message
})

const sendSuccess = (data) => {
  const response = {
    status: 'success',
    data
  }
  return response
}
/*
data should contain {
  user: ...
  customer / company / loanApplication / deal etc
}
*/
const init = resolvers => {
  const handler = async (message, context) => {
    const { action, data } = message
    console.log("message InIt", message)
    console.log("action=============", action)
    console.log("data===========", data)
    if (isUndefined(actionMap[action])) {
      console.log("isUndefined(actionMap[action])",isUndefined(actionMap[action]))
      return sendError(`ACTION_NOT_SUPPORTED ${action}`)
    }
    try {
      console.log("actionMap===========",actionMap[action])
      const response = await actionMap[action].handler(data, resolvers, context)
      console.log("response--------messageBroker=============", response)
      return sendSuccess(response, action)
    } catch (e) {
      console.log("e.message", e.message)

      return sendError(e.message)
    }
    // send response
  } // message broker handler
  return {
    method: 'RPCQueue',
    channel: 'integrations:loanApplication',
    handler: handler
  }
}

export default {
  init,
  channel: 'integrations:loanApplication'
}
