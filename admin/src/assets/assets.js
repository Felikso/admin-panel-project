/* category */

const main_1_cat = 'pizza';
const main_2_cat = 'zupy';
const main_3_cat = 'sałatki';
const main_4_cat = 'surówki';
const main_5_cat = 'desery';
const main_6_cat = 'napoje';
/* import icon from './icon.png' */

import main_1 from './categories/1/main.png'
import main_2 from './categories/2/main.png'
import main_3 from './categories/3/main.png'
import main_4 from './categories/4/main.png'
import main_5 from './categories/5/main.png'
import main_6 from './categories/6/main.png'

//for example 3 items to main


import main_1_item_1 from './categories/1/items/1.png'
import main_1_item_2 from './categories/1/items/2.png'
import main_1_item_3 from './categories/1/items/3.png'
import main_1_item_4 from './categories/1/items/4.png'

import main_2_item_1 from './categories/2/items/1.png'
import main_2_item_2 from './categories/2/items/2.png'
import main_2_item_3 from './categories/2/items/3.png'

import main_3_item_1 from './categories/3/items/1.png'
import main_3_item_2 from './categories/3/items/2.png'
import main_3_item_3 from './categories/3/items/3.png'

import main_4_item_1 from './categories/4/items/1.png'
import main_4_item_2 from './categories/4/items/2.png'
import main_4_item_3 from './categories/4/items/3.png'

import main_5_item_1 from './categories/5/items/1.png'
import main_5_item_2 from './categories/5/items/2.png'
import main_5_item_3 from './categories/5/items/3.png'

import main_6_item_1 from './categories/6/items/1.png'
import main_6_item_2 from './categories/6/items/2.png'
import main_6_item_3 from './categories/6/items/3.png'


const countMainId = (main_1_item_1) =>{
    const arr = main_1_item_1.split('/');
    const mainId = arr[arr.length-3]; 
    const itemId = arr[arr.length-1].replace('.png','');
    return [mainId, itemId]
}


/* socials */

import linkedin_icon from './main_files/socials/linkedin_icon.svg'
import facebook_icon from './main_files/socials/facebook_icon.svg'
import twitter_icon from './main_files/socials/twitter_icon.svg'

import app_store from './main_files/socials/app_store.svg'
import play_store from './main_files/socials/play_store.svg'

import logo from './main_files/logo.png'
import basket_icon from './main_files/basket_icon.png'
import search_icon from './main_files/search_icon.png'
import rating_stars from './main_files/rating_stars.png'
import add_icon_white from './main_files/add_icon_white.svg'
import add_icon_green from './main_files/add_icon_green.svg'
import remove_icon_red from './main_files/remove_icon_red.svg'
import cross_icon from './main_files/cross_icon.svg'

import profile_icon from './main_files/profile_icon.png'
import bag_icon from './main_files/bag_icon.png'
import logout_icon from './main_files/logout_icon.png'
import parcel_icon from './main_files/parcel_icon.png'

 




/* import item_2 from './categories/2.png'
import item_3 from './categories/3.png'
import item_4 from './categories/4.png'
import item_5 from './categories/5.png'
import item_6 from './categories/6.png'
import item_7 from './categories/7.png'
import item_8 from './categories/8.png'
import item_9 from './categories/9.png'
import item_10 from './categories/10.png'
import item_11 from './categories/11.png'
import item_12 from './categories/12.png'
 */
/* import header from './header.png'


import main_7 from './main_7.png'
import main_8 from './main_8.png'

import item_1 from './categories/1.png'
import item_2 from './categories/2.png'
import item_3 from './categories/3.png'
import item_4 from './categories/4.png'
import item_5 from './categories/5.png'
import item_6 from './categories/6.png'
import item_7 from './categories/7.png'
import item_8 from './categories/8.png'
import item_9 from './categories/9.png'
import item_10 from './categories/10.png'
import item_11 from './categories/11.png'
import item_12 from './categories/12.png'


import add_icon_green from './add_icon_green.png'




import selector_icon from './selector_icon.png'



 */

export const assets = {
 /*     
 


    selector_icon,   

   
 
    icon, */ 
    parcel_icon,    
    bag_icon, 
    logout_icon,  
    profile_icon,    
    cross_icon, 
    app_store,   
    play_store,  
    linkedin_icon,    
    facebook_icon,    
    twitter_icon,
    add_icon_green,   
    remove_icon_red,   
    add_icon_white,
    rating_stars,  
    logo,
    basket_icon,
    search_icon, 
    main_1,    
    main_2,    
    main_3,    
    main_4,    
    main_5,    
    main_6,
    main_1_item_1,
    main_1_item_2,
    main_1_item_3,
    main_2_item_1,
    main_2_item_2,
    main_2_item_3,
    main_3_item_1,
    main_3_item_2,
    main_3_item_3,
    main_4_item_1,
    main_4_item_2,
    main_4_item_3,
    main_5_item_1,
    main_5_item_2,
    main_5_item_3,
    main_6_item_1,
    main_6_item_2,
    main_6_item_3,
    
   /*  header,    
   
    
    main_7,    
    main_8,    
    item_1,    
    item_2,    
    item_3,    
    item_4,    
    item_5,    
    item_6,    
    item_7,    
    item_8,    
    item_9,    
    item_10,   
    item_11,    
    item_12 */
}


export const main_list = [
    {
        main_name: main_1_cat,
        main_image: main_1
    },
    {
        main_name: main_2_cat,
        main_image: main_2
    },
    {
        main_name: main_3_cat,
        main_image: main_3
    },
    {
        main_name: main_4_cat,
        main_image: main_4
    },
    {
        main_name: main_5_cat,
        main_image: main_5
    },
    {
        main_name: main_6_cat,
        main_image: main_6
    }
]

export const items_list = [
    {
        _id: countMainId(main_1_item_1)[0]+countMainId(main_1_item_1)[1],
        name: 'margherita',
        image: main_1_item_1,
        price: 12,
        description: 'Klasyka włoskiej kuchni – cienkie ciasto, aromatyczne pomidory, mozzarella i świeża bazylia. Idealna dla miłośników prostoty!',
        category: main_1_cat
    },
    {
        _id: countMainId(main_1_item_2)[0]+countMainId(main_1_item_2)[1],
        name: 'pizza prosciutto',
        image: main_1_item_2,
        alt: 'pizza salami',
        price: 16,
        description: 'Pyszna kombinacja delikatnego prosciutto, mozzarella i świeżych ziół. Doskonała na każdą okazję!',
        category: main_1_cat
    },
    {
        _id: countMainId(main_1_item_3)[0]+countMainId(main_1_item_3)[1],
        name: 'pizza 4 sery',
        image: main_1_item_3,
        price: 18,
        description: 'Serowe szaleństwo z mozzarella, gorgonzolą, parmezanem i serem feta. To prawdziwa uczta dla koneserów!',
        category: main_1_cat
    },
    {
        _id: countMainId(main_1_item_4)[0]+countMainId(main_1_item_4)[1],
        name: 'pizza wiejska',
        image: main_1_item_4,
        price: 18,
        description: 'Sycąca pizza z kiełbasą, cebulą, papryką i serem. Idealna na rodzinny obiad lub spotkanie ze znajomymi.',
        category: main_1_cat
    },
    {
        _id: countMainId(main_2_item_1)[0]+countMainId(main_2_item_1)[1],
        name: 'zupa pomidorowa',
        image: main_2_item_1,
        price: 12,
        description: 'Gładka i aromatyczna, serwowana z ryżem lub makaronem.',
        category: main_2_cat
    },
    {
        _id: countMainId(main_2_item_2)[0]+countMainId(main_2_item_2)[1],
        name: 'zupa krem z brokułów',
        image: main_2_item_2,
        price: 16,
        description: 'Kremowa, z dodatkiem śmietany i chrupiących grzanek.',
        category: main_2_cat
    },
    {
        _id: countMainId(main_2_item_3)[0]+countMainId(main_2_item_3)[1],
        name: 'zupa grzybowa',
        image: main_2_item_3,
        price: 18,
        description: 'Intensywna w smaku, z świeżymi grzybami leśnymi i przyprawami.',
        category: main_2_cat
    },

    {
        _id: countMainId(main_3_item_1)[0]+countMainId(main_3_item_1)[1],
        name: 'sałatka cesar',
        image: main_3_item_1,
        price: 15,
        description: 'Klasyczna sałatka z chrupiącymi kawałkami kurczaka, sałatą rzymską, parmezanem i sosem Caesar. Idealna na lunch!',
        category: main_3_cat
    },
    {
        _id: countMainId(main_3_item_2)[0]+countMainId(main_3_item_2)[1],
        name: 'sałatka grecka',
        image: main_3_item_2,
        price: 15,
        description: 'Orzeźwiająca sałatka z pomidorów, ogórków, oliwek, cebuli i feta, skropiona oliwą z oliwek. Doskonała jako lekka przystawka.',
        category: main_3_cat
    },

    {
        _id: countMainId(main_4_item_1)[0]+countMainId(main_4_item_1)[1],
        name: 'surówka z marchewki',
        image: main_4_item_1,
        price: 10,
        description: 'Lekka i chrupiąca, z dodatkiem świeżego soku z cytryny.',
        category: main_4_cat
    },
    {
        _id: countMainId(main_4_item_2)[0]+countMainId(main_4_item_2)[1],
        name: 'surówka z kapusty',
        image: main_4_item_2,
        price: 8,
        description: 'Klasyczna, z dodatkiem marchwi i sosu vinegret.',
        category: main_4_cat
    },   
    {
        _id: countMainId(main_4_item_3)[0]+countMainId(main_4_item_3)[1],
        name: 'surówka z buraków',
        image: main_4_item_3,
        price: 10,
        description: 'Słodka i zdrowa, z dodatkiem octu balsamicznego.',
        category: main_4_cat
    },

    {
        _id: countMainId(main_5_item_1)[0]+countMainId(main_5_item_1)[1],
        name: 'tiramisu',
        image: main_5_item_1,
        price: 18,
        description: 'Klasyczny włoski deser z warstwami biszkoptów nasączonych kawą i mascarpone.',
        category: main_5_cat
    },
    {
        _id: countMainId(main_5_item_2)[0]+countMainId(main_5_item_2)[1],
        name: 'sernik',
        image: main_5_item_2,
        price: 16,
        description: 'Delikatny sernik na zimno, z kruchym spodem i owocowym polewą..',
        category: main_5_cat
    },
    {
        _id: countMainId(main_5_item_3)[0]+countMainId(main_5_item_3)[1],
        name: 'panna cotta',
        image: main_5_item_3,
        price: 18,
        description: 'Kremowy deser z dodatkiem owocowego sosu lub karmelu.',
        category: main_5_cat
    },

    {
        _id: countMainId(main_6_item_1)[0]+countMainId(main_6_item_1)[1],
        name: 'lemoniada',
        image: main_6_item_1,
        price: 8,
        description: 'Orzeźwiający napój cytrynowy z miętą..',
        category: main_6_cat
    },
    {
        _id: countMainId(main_6_item_2)[0]+countMainId(main_6_item_2)[1],
        name: 'woda mineralna',
        image: main_6_item_2,
        price: 6,
        description: 'Świeża, gazowana i niegazowana.',
        category: main_6_cat
    },
    {
        _id: countMainId(main_6_item_3)[0]+countMainId(main_6_item_3)[1],
        name: 'sok pomarańczowy',
        image: main_6_item_3,
        price: 8,
        description: 'Świeżo wyciśnięty sok, idealny na rozpoczęcie dnia.',
        category: main_6_cat
    }





]
