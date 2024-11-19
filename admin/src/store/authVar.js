export const pagesLinks = {
    login: '/login',
    logout: '/logout',
    signup: '/signup',
    checkAuth: '/check-auth',
    forgotPass: '/forgot-password',
    resetPass: '/reset-password',
    verifyEmail: '/verify-email',
}

export const customErrors = {
    logout: 'wystąpił problem podczas wylogowania',
    loginin: 'wystąpił błąd przy logowaniu',
    signup: 'wystąpił problem przy rejestracji',
    verifyEmail: 'wystąpił problem przy weryfikacji e-maila',
    resetPass: 'wystąpił problem przy resetowaniu hasła',
    remindPassMail: 'wystąpił problem przy wysyłaniu e-maila',
    invalidCredentials: 'nieprawidłowe dane',
    verifyOrder: 'błąd poczas weryfikacji zamówienia'
}

export const api= {
    add: '/add',
}

export const urlAdd = '/api/items/add';
export const urlEdit = '/api/items/update';
export const urlList = '/api/items/list';
export const urlImg = '/images/';
export const urlRemove = '/api/items/remove';
export const urlUpdate = '/api/items/update';
export const urlRemoveOrder = '/api/order/remove';
export const errorMessage = 'Wystąpił błąd, spróbuj ponownie później. :('