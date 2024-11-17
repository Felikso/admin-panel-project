export const contactMail = 'aleksandrasniegucka@wp.pl'

export const panelPath = '/panel';

export const pagesLinks = {
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
    cart: 'koszyk',
    aboutUs: 'o nas',
    order: 'podsumowanie',
    verify: 'weryfikacja',
    myorders: 'zamowienia',
    verifyRabat: 'verify'
}

export const authList = {
    list: '/lista',
    add: '/dodaj',
    orders: '/zamówienia', 
}

export const customErrors = {
    logout: 'wystąpił problem podczas wylogowania',
    loginin: 'wystąpił błąd przy logowaniu',
    signup: 'wystąpił problem przy rejestracji',
    verifyEmail: 'wystąpił problem przy weryfikacji e-maila',
    verifyRabat: 'wystąpił błąd podczas weryfikacji kodu rabatowego',
    resetPass: 'wystąpił problem przy resetowaniu hasła',
    remindPassMail: 'wystąpił problem przy wysyłaniu e-maila',
    invalidCredentials: 'nieprawidłowe dane',
    userNotAdmin: 'nie masz odpowiednich uprawnień',
    network: 'błąd sieci',
    
}

export const customInfo = {
    strongPassword: 'pamiętaj o ustawieniu silnego hasła',
    needPermissions: 'żeby móc w pełni korzystać z portalu administrator musi przyznać dodatkowe uprawnienia',
    itemAdded: 'przedmiot został dodany pomyslnie do koszyka',
    itemRemoved: 'przedmiot został usunięty z koszyka',
    tryRefresh: 'spróbuj załadować stronę ponownie',
    unauthenticatedAccpetPlaceOrder: 'na podany adres email przjdzie kod potwierdzający złożenie zamówienia',


    /** cart */
    emptyCart: 'koszyk jest pusty :(',

    /** place order */
    cancelPlaceOrder: 'złożenie zamówienia anulowane',
    accpetPlaceOrder: 'zamówienie przyjęte do realizacji',
    addressUpdated: 'adres zaktualizowany'
}



export const url = 'http://localhost:4000';
export const urlAdd = '/api/items/add';
export const urlEdit = '/api/items/update';
export const urlList = '/api/items/list';
export const urlImg = '/images/';
export const urlRemove = '/api/items/remove';
export const urlUpdate = '/api/items/update';
export const urlRemoveOrder = '/api/order/remove';
export const errorMessage = 'Wystąpił błąd, spróbuj ponownie później. :('




export const imgUrl = '/images/'
export const addCartUrl = '/api/cart/add'
export const removeFromCartUrl = '/api/cart/remove'

export const orderUrl = '/api/order/'
export const orderPlaceUrl = orderUrl+'/place'
export const orderVerifyUrl = orderUrl+pagesLinks.verify
export const myOrdersUrl = '/moje-zamowienia'
export const userOrdersUrl = orderUrl+'/zamowienia-klienta' //endpoint to set in backend

export const quantityItems = 'quantity' //string in order
/* export const deliveryPrice = 8 */ //useContext

export const orders = 'zamówienia'


export const socialLinks = {
    fb: 'https://www.facebook.com/',
    ig: 'https://www.instagram.com/',
    tw: 'https://www.twitter.com/',
    ln: 'https://pl.linkedin.com/',
    ps: 'https://play.google.com/',
    as: 'https://www.apple.com/pl/app-store/'
}


export const footerTitle = 'Bądźmy w kontakcie'

export const welcomeTitle = 'witaj ponownie ;)'
export const remindPass = 'przypomnij hasło'
export const forgotPass = 'nie pamiętasz hasła?'
export const dontHaveAccount = 'nie masz jeszcze swojego konta? '
export const signUp = 'zarejestruj się'
export const loginBtnText = 'zaloguj się'
export const loginBtnTextAnimate = 'logowanie'

export const emailVeryData = {
    emailVeryTitle: 'wprowadź kod z e-maila ;)',
    emailVeryBtnText: 'potwierdź kod',
    emailVeryTextAnimate: 'sprawdzanie',
}
export const dashBoardData = {
    title: 'panel użytkownika: '
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

export const remindPassData = {
    remindPasswordInfo: 'na podany adres e-mail zostanie wysłany kod do zresetowania hasła',
    remindPasswordTitle: 'tym razem postaraj się zapamiętać swoje hasło. ;)',
    remindPasswordPlaceholder: 'wpisz swojego maila',
    remindPasswordBtn: 'tym razem zapamiętam!',
    remindPasswordBtnAnimate: 'wysyłanie',
    remindPasswordLink: 'wróć do strony logowania'
}




/* routes for pages */

export const routes = {
	add: '/dodaj',
	list: '/lista',
	orders: '/zamowienia',
    forgot: 'forgot-password',
	reminder: '/reset-password'
}


export const singUpPath = '/rejestracja'
export const singInPath = '/logowanie'

export const logout = 'wyloguj'

export const brandData = {
    name: 'Ventus DEV',
    number: '888-888-888',
    mail: 'xxx@ventus-dev.pl'
}

export const formData = {
    namePlaceholder: 'wpisz swoje imię',
    emailPlaceholder: 'podaj adres e-mail',
    passwordPlaceholder: 'wprowadź swoje hasło',
    createAccount: 'załóż konto',
    loginTitle: 'witaj ponownie ;)',
    loginState: 'logowanie',
    signupState: 'zarejestruj się',
    buttonText: 'zaloguj się',
    policyAcceptQuestion: 'akceptujesz warunki polityki prywatności?',
    createNewAccountQuestion: 'jeśli chcesz założyć konto',
    clickHereToCreate: 'kliknij tutaj',
    haveAccountQuestion: 'jeśli masz już swoje konto',
    clickHereToLogin: 'kliknij, żeby się zalogować',
    forgotPasswordTitle: 'wyślij mail dla przypomnienia hasła',
    forgotPasswordQuestion: 'nie pamiętasz swojego hasła?',
    clikIfForgotPassword: 'kliknij, żeby przypomniec hasło',
    forgotPasswordBtn: 'przypomnij hasło',
    forgotPasswordBack: 'wróć do strony logowania',
    checkEmailMess: 'sprawdź swojego maila',



    /** forgot password */
    forgotPassTitle: 'przypomianie hasła',

}

export const itemsUrl = '/api/items/list'

export const getFromCartUrl = '/api/cart/get'

export const objMenu = {
    menu: 'exploreMain',
  /*   app: 'appDownload', */
    kontakt: 'footer',
  };

export const objPages = {
    cart: '/koszyk',
    orders: '/zamówienia',
  };

export const itemsQuantity = 'liczba przedmiotów'

export const ordersTitle = 'zamówienia'

export const orderStatus = [
    'oczekiwanie na płatność',
    'przyjęte do realizacji',
    'wysłane',
    'dostarczone',
    'anulowane'
]


export const sidebarData = {
    addP: 'dodaj item',
    itemList: 'lista przedmiotów',
    order: 'zamówienia'
}

export const addData = {
    addPhoto: 'dodaj zdjęcie',
    itemName: 'nazwa',
    typeItemName: 'wpisz nazwę',
    itemDesc: 'opis produktu',
    typeItemDesc: 'wprowadź opis',
    itemCat: 'kategoria',
    selectItemCat: 'wybierz kategorię',
    itemPrice: 'cena',
    typeItemPrice: 'wpisz cenę',
    addBtn: 'dodaj',
    editBtn: 'edytuj',
    breakEdit: 'przerwij edycję',
    acceptEdit: 'zaakceptuj edycję'
}

export const listData = {
    title: 'lista przedmiotów'
}

export const categories = [
    'pizza',
    'zupy',
    'sałatki',
    'surówki',
    'desery',
    'napoje'
]

export const tableTitle = [
    'zdjęcie',
    'nazwa',
    'kategoria',
    'cena',
    'akcja'
]

import aboutUsImg from '../assets/main_files/links/aboutUs.png'
import deliveryImg from '../assets/main_files/links/delivery.png'
import policyImg from '../assets/main_files/links/policy.png'


export const footerLinks = {
    aboutUs: [
        'o nas',
        '<h2>Witamy w naszej pizzerii, gdzie pasja do jedzenia spotyka się z wyjątkowym smakiem! Od momentu założenia, naszym celem było dostarczenie najlepszej pizzy w mieście.</h2><br/><h3>Nasza Misja</h3><br /><p>Stawiamy na jakość, świeżość i tradycję. Każda pizza jest przygotowywana z najstaranniejszych składników, aby zaspokoić nawet najbardziej wymagające podniebienia.</p><br/><h3>Nasze Składniki</h3><br /><p>Używamy tylko lokalnych, ekologicznych produktów, co sprawia, że nasze dania są nie tylko smaczne, ale i zdrowe. Nasze ciasto wyrabiamy ręcznie, a sosy robimy według własnych receptur.</p><br/><h3>Pasja i Tradycja</h3><br /><p>Inspiracje czerpiemy z włoskiej tradycji kulinarnej, co pozwala nam tworzyć unikalne smaki. Każda pizza to małe dzieło sztuki, które z dumą podajemy naszym gościom.</p><br/><h3>Nasza Społeczność</h3><br /><p>Jesteśmy dumni z naszej społeczności i staramy się angażować w lokalne wydarzenia. Wierzymy, że jedzenie łączy ludzi, dlatego organizujemy różne akcje i wydarzenia.</p><br/><h3>Zapraszamy!</h3><br /><p>Przyjdź do nas i przekonaj się, dlaczego nasza pizzeria jest ulubionym miejscem mieszkańców. Niezależnie od tego, czy szukasz miejsca na rodzinny obiad, czy chcesz spędzić czas z przyjaciółmi, u nas zawsze znajdziesz coś dla siebie.</p><p>Dołącz do nas w tej kulinarnej podróży i odkryj smaki, które na długo pozostaną w Twojej pamięci!</p>',
        aboutUsImg
    ],
    delivery: [
        'dostawa',
        '<h3>Dostawa Pizzy</h3><p>Nasza pizzeria oferuje szybką i wygodną dostawę pizzy prosto do Twojego domu!</p><br /><h3>Jak zamówić?</h3><p>Aby zamówić, wystarczy wybrać ulubione danie z naszego menu i dodać je do koszyka.</p><br /><h3>Czas dostawy</h3><p>Staramy się dostarczyć Twoje zamówienie w ciągu 30-45 minut.</p><br /><h3>Obszar dostawy</h3><p>Dostarczamy do większości lokalizacji w mieście. Sprawdź, czy dostarczamy do Twojego rejonu!</p><br /><h3>Opłata za dostawę</h3><p>Opłata za dostawę wynosi tylko 10 zł w promieniu 5 km od naszej pizzerii.</p><br /><h3>Świeżość i jakość</h3><p>Dbamy o to, aby każda pizza była świeża i gorąca w momencie dostarczenia.</p><br /><h3>Płatności</h3><p>Oferujemy różne metody płatności, w tym płatności online i gotówką przy odbiorze.</p><br /><h3>Możliwość śledzenia zamówienia</h3><p>Po złożeniu zamówienia możesz śledzić jego status na naszej stronie.</p><br /><h3>Wygodne godziny dostawy</h3><p>Dostarczamy codziennie od 12:00 do 22:00.</p><br /><h3>Promocje i rabaty</h3><p>Sprawdzaj nasze promocje na dostawę! Czasami oferujemy darmową dostawę przy większych zamówieniach.</p><br /><h3>Opinie klientów</h3><p>Twoje zadowolenie jest dla nas najważniejsze! Zachęcamy do dzielenia się opiniami na temat naszej dostawy.</p><br /><h3>Kontakt</h3><p>Masz pytania dotyczące dostawy? Skontaktuj się z nami przez telefon lub czat online!</p><br /><h3>Bezpieczeństwo dostawy</h3><p>Przestrzegamy wszystkich zasad bezpieczeństwa podczas dostawy, aby zapewnić Ci bezpieczeństwo.</p><br /><h3>Ekologiczne opakowania</h3><p>Stawiamy na ekologię, dlatego nasze opakowania są przyjazne dla środowiska.</p><br /><h3>Obsługa klienta</h3><p>Nasz zespół obsługi klienta jest dostępny, aby odpowiedzieć na Twoje pytania dotyczące zamówienia.</p><br /><h3>Wygodny kontakt</h3><p>Zamówienie można złożyć przez naszą stronę internetową lub aplikację mobilną.</p><br /><h3>Program lojalnościowy</h3><p>Dołącz do naszego programu lojalnościowego, aby zbierać punkty na darmowe zamówienia!</p><br /><h3>Rekomendacje</h3><p>Nasze pizze są przygotowywane przez doświadczonych kucharzy, którzy pasjonują się włoską kuchnią.</p><br /><h3>Personalizacja zamówienia</h3><p>Możesz dostosować swoją pizzę według własnych preferencji — wybierz ulubione składniki!</p><br /><h3>Wydarzenia i catering</h3><p>Organizujesz imprezę? Oferujemy usługi cateringowe z dostawą pizzy dla większych grup.</p><br />',
        deliveryImg
    ],
    policy: [
        'polityka prywatności',
        `<h3>1. Wprowadzenie</h3><p>Niniejsza polityka prywatności informuje o tym, w jaki sposób zbieramy, używamy, przechowujemy i udostępniamy Twoje dane osobowe w związku z korzystaniem z naszej strony internetowej ${brandData.name}.</p><br /><h3>2. Zbieranie danych osobowych</h3><p>Zbieramy dane osobowe, które dobrowolnie nam przekazujesz, takie jak:</p><br /><h5>Imię i nazwisko</h5><h5>Adres e-mail</h5><h5>Numer telefonu</h5><h5>Adres dostawy</h5><h5>Informacje o zamówieniu</h5><br/><h3>3. Użycie danych osobowych</h3><h4>Twoje dane osobowe są wykorzystywane w celu:</h4><br/><h5>Realizacji zamówień</h5><h5>Komunikacji z Tobą</h5><h5>Ulepszania naszych usług</h5><h5>Wysyłania powiadomień o promocjach i ofertach (jeśli wyrazisz na to zgodę)</h5><h3>4. Przechowywanie danych</h3><p>Przechowujemy Twoje dane osobowe tylko tak długo, jak jest to konieczne do realizacji celów, dla których zostały zebrane, lub zgodnie z wymogami prawa.</p><br /><h3>5. Udostępnianie danych osobowych</h3><p>Nie sprzedajemy ani nie wynajmujemy Twoich danych osobowych osobom trzecim. Twoje dane mogą być udostępniane jedynie w przypadku:</p><h5>Zgody na udostępnienie</h5><h5>Wymogu prawnego</h5><br /><h3>6. Bezpieczeństwo danych</h3>Dokładamy wszelkich starań, aby chronić Twoje dane osobowe przed nieautoryzowanym dostępem, użyciem lub ujawnieniem. Stosujemy odpowiednie środki techniczne i organizacyjne w celu zapewnienia bezpieczeństwa danych.<h3>7. Twoje prawa</h3><h4>Masz prawo do:</h4><br /><h5>Dostępu do swoich danych osobowych</h5><h5>Sprostowania swoich danych</h5><h5>Usunięcia swoich danych</h5><h5>Ograniczenia przetwarzania swoich danych</h5><h3>8. Zmiany w polityce prywatności</h3><p>Zastrzegamy sobie prawo do wprowadzenia zmian w niniejszej polityce prywatności. O wszelkich zmianach będziemy informować na naszej stronie internetowej.</p><h3>9. Kontakt</h3><p>Jeśli masz pytania dotyczące naszej polityki prywatności, skontaktuj się z nami pod adresem ${brandData.mail} lub telefonicznie pod numerem ${brandData.number}.</p>`,
        policyImg
    ]
}



export const headerData = {
    headerH2: 'zamów sobie coś ulubionego',
    headerP: 'Odkryj bogactwo smaków naszej pizzy oraz pysznych sałatek! W naszej pizzerii stawiamy na świeże składniki i tradycyjne receptury, aby każdy kęs był prawdziwą ucztą. Niezależnie od tego, czy masz ochotę na klasyczną żargheritę, czy sycącą pizzę wiejską, mamy coś dla każdego. Złóż zamówienie online i ciesz się pysznym jedzeniem w wygodnym otoczeniu!',
    headetBtn: 'sprawdź menu'
  }

export const itemsMainData = {
    h1: 'zapoznaj się z naszym menu',
    p: 'Najważniejszy jest dla nas dobór odpowiednich składników. To klucz do zadowolenia naszych klientów! ',
    displayItemTitle: 'dodaj do koszka wybrane podukty'
  }

export const cartData = {
    delivery: 'dostawa',
    total: 'podsumowanie',
    subtotal: 'całość',
    checkout: 'podsumuj zamówienie',
    promocodeInfo: 'jeśli masz kod promocyjny wprowadź go tutaj',
    promocodeUsed: 'kod rabatowy wykorzystany',
    subbmitCodebtn: 'akceptuj',
    promocodePlaceholder: 'kod promocyjny',
    beforeRabat: 'przed rabatem',
    rabat: 'po rabacie'
} 

export const placeOrderData = {
    title: 'informacje o zamówieniu',
    firstName: 'imię',
    lastName: 'nazwisko',
    email: 'email',
    street: 'ulica',
    numberStreet: 'numer lokalu',
    city: 'miasto',
    state: 'województwo',
    zipCode: 'kod pocztowy',
    country: 'państwo',
    phone: 'numer telefonu',
    checkout: 'zapłać',
    h2: 'podsumowanie koszyka'
}

export const cartItemsData = {
    items: 'przedmioty',
    name: 'nazwa',
    title: 'tytuł',
    price: 'cena',
    quantity: 'ilość',
    total: 'podsumowanie',
    remove: 'usuń'

}

/* export const formData = {
    namePlaceholder: 'wpisz swoje imię',
    emailPlaceholder: 'podaj adres e-mail',
    passwordPlaceholder: 'wprowadź swoje hasło',
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
 */
export const appData = {
    p: 'Koniecznie pobierz nasz aplikację!'
}

export const coppyrightInfo = `Copyright 2024 © ${url.replace('https://','').replace('http://','')} - wszelkie prawa zastrzeżone`


export const allCategoriesName = 'Całe menu'

export const currency = 'PLN'

/* orders */

export const myOrdersData = {
    title: 'złożone zamówienia',
    btnText: 'odśwież zamówienie',
    refreshInfo: 'informacje odświeżone',
    quantity: 'liczba',
    iconTitle: 'dane',
    orderTitle: 'zamówienie',
    priceTitle: 'cena',
    quantityTitle: 'ilość',
    statusTitle: 'status',
    refreshTitle: 'odśwież',
    deleteTitle: 'usuń',
    addressTitle: 'adres',
    purchaserTitle: 'kontakt'
}