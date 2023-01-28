export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const user = useAuthUser()

  if (user.value) {
    if (process.server)
      return abortNavigation(new Error("Name entred to URL line, proces.server is TRUE !!!"))
    return navigateTo({ name: 'index' })
  }
})
