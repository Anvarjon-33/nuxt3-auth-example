import { getUsers, isAdmin } from '~~/server/models/user'

export default defineEventHandler(async (event) => {
  if (!(await isAdmin(event.context.user))) {
    console.log(event.context)
    let err = createError({
      statusCode: 401,
      message: 'You don\'t have the rights to access this resource',
    })
    return `<div>${err}</div><a href='/'>Home</a>`
  }

  const usersWithPassword = await getUsers()

  const usersWithoutPassword = usersWithPassword.map(({ password: _password, ...user }) => user)

  return usersWithoutPassword
})