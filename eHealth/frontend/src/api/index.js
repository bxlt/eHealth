import { APP_SERVER } from '../constants/constants'

export const request = async (url, requestType, body = null) => {
  try {
    let fetchBody = {
      method: requestType
    }

    if (body) {
      fetchBody = {
        ...fetchBody,
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        }
      }
    }

    const request = await fetch(`${APP_SERVER}${url}`, fetchBody)
    const json = await request.json()

    if (request.ok) {
      return {
        success: true,
        response: json
      }
    }
    return {
      success: false,
      response: json
    }
  } catch (e) {
    console.log('Request could not be completed: ', e)
    return {
      success: false,
      response: {}
    }
  }
}
