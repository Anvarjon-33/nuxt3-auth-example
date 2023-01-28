import { getUserByEmail } from '~~/server/models/user'
import { verify } from '~~/server/utils/password'
import { serialize, sign } from '~~/server/utils/session'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email: string; password: string; rememberMe: boolean }>(event)

  const {
    email,
    password,
    rememberMe,
  } = body

  if (!email || !password) {
    return createError({
      statusCode: 400,
      message: 'Email address and password are required',
    })
  }

  const userWithPassword = await getUserByEmail(email)

  if (!userWithPassword) {
    return createError({
      statusCode: 401,
      message: 'Bad credentials',
    })
  }

  const verified = await verify(password, userWithPassword.password)

  if (!verified) {
    return createError({
      statusCode: 401,
      message: 'Bad credentials',
    })
  }

  const config = useRuntimeConfig()

  /*
      {                                                                                             18:01:01
      app: { baseURL: '/', buildAssetsDir: '/_nuxt/', cdnURL: '' },
      nitro: { routeRules: { '/__nuxt_error': [Object] }, envPrefix: 'NUXT_' },
      public: {},
      cookieName: '__session',
      cookieSecret: 'secret',
      cookieExpires: 86400000,
      cookieRememberMeExpires: 604800000
      }
  */

console.log(config)

  const session = serialize({ userId: userWithPassword.id })
  const signedSession = sign(session, config.cookieSecret)
  
  setCookie(event, config.cookieName, signedSession, {
    httpOnly: true,
    path: '/',
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
    expires: rememberMe ? new Date(Date.now() + config.cookieRememberMeExpires) : new Date(Date.now() + config.cookieExpires),
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password: _password, ...userWithoutPassword } = userWithPassword

  return {
    user: userWithoutPassword,
  }
})
