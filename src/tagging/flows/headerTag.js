const headerDefaultHeaderTag = {
  idgeneral: "gtm",
  seccion: "header",
};

export const headerLogoHeaderTag = {
    ...headerDefaultHeaderTag,
    elemento: 'logo',
    idsubelement:''
}

export const headerMenuOpenHeaderTag = {
    ...headerDefaultHeaderTag,
    elemento: 'menu',
    idsubelemento: 'open'
}

export const headerMenuCloseHeaderTag = {
    ...headerDefaultHeaderTag,
    elemento: 'menu',
    idsubelemento: 'close'
}

export const headerMenuClassRoomHeaderTag = {
    ...headerDefaultHeaderTag,
    elemento: 'menu',
    idsubelemento: 'aula'
}

export const headerMenuBiblioHeaderTag = {
    ...headerDefaultHeaderTag,
    elemento: 'menu',
    idsubelemento: 'biblio'
}

export const headerMenuAccountHeaderTag = {
    ...headerDefaultHeaderTag,
    elemento: 'menu',
    idsubelemento: 'cuenta'
}

export const headerPaymentHeaderTag = {
    ...headerDefaultHeaderTag,
    elemento: 'menu',
    idsubelemento: 'pagos'
}