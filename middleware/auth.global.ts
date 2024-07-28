export default defineNuxtRouteMiddleware((to, from) => {
    const accessToken = useCookie("access_token").value;
    const is_admin=useCookie("isAdmin").value
    const protectedRoutes = ['/dashboard', '/admin'];

    if (protectedRoutes.includes(to.path) && !accessToken) {
        return navigateTo('/');
    }
    if(!(protectedRoutes.includes(to.path)) && accessToken) {
        return navigateTo('/dashboard');

    }
    if(to.path=='/admin' &&!is_admin) {
return navigateTo('/dashboard');
    }
});
