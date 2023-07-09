export interface Open_po{
    Acsoport?: string;
    Lerakodohely?: string;
    Rendeles_szama?: string;
    Inditas?: string;
    Vege?: string;
    Aszam?: string;
    Megnev?: string;
    RendeltM?:string;
    VisszaJelM?:string;
    NyitottM?:string;
    BME?:string;
}

export interface Invoice{
    Datum?: string;
    Megrendelo_nev?: string;
    Szamla?: string;
    Szfajta?: string;
    OsszNettoErtek?: string;
    NettoErtek: number;
    Penznem: string;
    Szoveg?:string;
    Mennyiseg?:string;
    BME?:string;
}

export interface Incoming{
    Anyagbiz?: string;
    Konyveles_ideje?: string;
    Anyagszam?: string;
    Acsoport?: string;
    Megnev?: string;
    Menny: string;
    ME: string;
    Rendeles?:string;
    Szallitokod?:string;
    Szallitonev?:string;
    Ertek: string;
    Penznem: string;
}

export interface Open_so{
    Rendeles?: string;
    Tetel?: string;
    Mkod?: string;
    Megrendelo?: string;
    Datum?: string;
    Rogzitette?: string;
    Anyagszam?: string;
    Megnev?: string;
    RendeltM?:string;
    KiszallM?:string;
    NyitottM?:string;
    Aregyseg?:string;
    Ertek?:string;
    Ear?:string;
    Penznem?:string;
}

export interface Stock{
    Aszam?: string;
    Megnev?: string;
    Acsoport?: string;
    SzabadFelhk?: string;
    ZaroltK?: string;
    BermunkaK?: string;
    BME?: string;
    KulsoACS:string;
    SzabadE: number;
    ZaroltE: number;
    BermunkaE: number;
    MozgoAr?:string;
    Aregyseg?:string;
    StandardA?:string;
    HUF?:string;
    Csoport?:string;
    Csnev?:string;
}

export interface pivotStock{
    KulsoACS:string;
    Ertek: number;
}
