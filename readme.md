## Opis
To je spletna aplikacija za upravljanje opravil, kjer lahko uporabniki dodajajo, pregledajo in brišejo opravila. 

## Tehnologije
- **Angular**
- **TypeScript**
- **HTML & CSS**
- **FontAwesome** za ikone
- **Express.ts** za backend
- **PostgressSQL** za podatkovno bazo

## Implementirane funkcionalnosti
- Dodajanje novih opravil preko modalnega obrazca
- Pregled opravil v scroll-listi kartic
- Brisanje opravil s seznama
- Funkcija odjave (logout)
- Registracija uporabnika 

## Tehnične lastnosti
- trudil sem se čim bolj držati standardov razvoja prog. opreme
- gesla se v podatkovni bazi hranijo po standardu "salted hash" kar zagotavlja varnost pred vdori
- vnosna polja so validirana proti SQL injekcijam
- Podatkovni tok: podatkovna baza -> servis ->  kontroler -> servis > pogled
- za avtentifikacijo uporabljamo JWT Token

# Ranljivosti aplikacije ki niso primerne za produkcijo: 
- JWT Token se hrani v Local storage, kar ga izpostavi XSS napadom
- CORS politika ni določena
- Ni vpeljanega mehanizma za obrambo pred spammom (preprost napad na polnjenje baze)