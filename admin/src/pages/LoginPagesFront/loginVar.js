export const loginPagesLinks = {
    cart: 'koszyk',
    aboutUs: 'o nas',
    order: 'podsumowanie',
    verify: 'weryfikacja',
    myorders: 'zamowienia',
    list: '/lista',
    add: '/dodaj',
    orders: '/zamówienia',
    login: '/login',
    logout: '/logout',
    signup: '/signup',
    checkAuth: '/check-auth',
/*     checkAuth: '/check-auth', */
    forgotPass: '/forgot-password',
    resetPass: '/reset-password',
    verifyEmail: '/verify-email',
}


/* 
export const url = 'http://localhost:4000'
export const itemsUrl = '/api/items/list'
export const imgUrl = '/images/'
export const addCartUrl = '/api/cart/add'
export const removeFromCartUrl = '/api/cart/remove'
export const getFromCartUrl = '/api/cart/get'
export const orderUrl = '/api/order/'
export const orderPlaceUrl = orderUrl+'/place'
export const orderVerifyUrl = orderUrl+loginPagesLinks.verify
export const myOrdersUrl = '/moje-zamowienia'
export const userOrdersUrl = orderUrl+'/zamowienia-klienta' //endpoint to set in backend

export const quantityItems = 'quantity' //string in order
/* export const deliveryPrice = 8 */ //useContext

/* export const orders = 'zamówienia'

export const logout = 'wyloguj' */


export const formData = {
    namePlaceholder: 'wpisz swoje imię',
    emailPlaceholder: 'podaj adres e-mail',
    passwordPlaceholder: 'wprowadź swoje hasło',
    newPasswordPlaceholder: 'wprowadź nowe hasło',
    confirmNewPasswordPlaceholder: 'potwierdź nowe hasło',
    createAccount: 'załóż konto',
    loginTitle: 'witaj ponownie ;)',
    loginState: 'logowanie',
    signupState: 'zarejestruj się',
    buttonText: 'zaloguj się',
    policyAcceptQuestion: 'akceptujesz warunki polityki prywatności?',
    createNewAccountQuestion: 'jeśli chcesz założyć konto',
    clickHereToCreate: 'kliknij tutaj',
    haveAccountQuestion: 'jeśli masz już swoje konto',
    clickHereToLogin: 'kliknij, żeby się zalogować'
}


export const customErrors = {
    logout: 'wystąpił problem podczas wylogowania',
    loginin: 'wystąpił błąd przy logowaniu',
    signup: 'wystąpił problem przy rejestracji',
    verifyEmail: 'wystąpił problem przy weryfikacji e-maila',
    resetPass: 'wystąpił problem przy resetowaniu hasła',
    remindPassMail: 'wystąpił problem przy wysyłaniu e-maila',
    invalidCredentials: 'nieprawidłowe dane',
    verifyOrder: 'błąd poczas weryfikacji zamówienia',
    passNotMatch: 'hasła nie są takie same',
    resettingPass: 'problem podczas resetowania hasła'
}


export const emailVeryData = {
    emailVeryTitle: 'wprowadź kod z e-maila ;)',
    emailVeryBtnText: 'potwierdź kod',
    emailVeryTextAnimate: 'sprawdzanie',
}

export const remindPassData = {
    remindPasswordInfo: 'na podany adres e-mail zostanie wysłany kod do zresetowania hasła',
    remindPasswordTitle: 'tym razem postaraj się zapamiętać swoje hasło. ;)',
    remindPasswordPlaceholder: 'wpisz swojego maila',
    remindPasswordBtn: 'tym razem zapamiętam!',
    remindPasswordBtnAnimate: 'wysyłanie',
    remindPasswordLink: 'wróć do strony logowania'
}

export const resetPassData = {
    resetPassTitle: 'wkrótce zaktualizujemy Twoje hasło ;)',
    haveAccount: 'masz już swoje konto?',
    resetBtnText: 'ustaw nowe hasło',
    resetBtnTextAnimate: 'resetowanie',
}

export const createAccountData = {
    createAccountTitle: 'witamy nowego użytkownika ;)',
    haveAccount: 'masz już swoje konto?',
    loginBtnText: 'zaloguj się',
    signUpBtnText: 'zarejestruj się',
    signUpProcess: 'rejestrowanie'
}

export const customInfo = {
    strongPassword: 'pamiętaj o ustawieniu silnego hasła',
    passResetSuccess: 'hasło zresetowane pomyślnie',
    emailVerified: 'email zweryfikowany pomyślnie'
}

export const welcomeTitle = 'Witaj, jeśli masz już swoje konto - śmiało, zaloguj się. ;)'
export const remindPass = 'przypomnij hasło'
export const forgotPass = 'nie pamiętasz hasła?'
export const dontHaveAccount = 'nie masz jeszcze swojego konta? '
export const signUp = 'zarejestruj się'
export const loginBtnText = 'zaloguj się'
export const loginBtnTextAnimate = 'logowanie'