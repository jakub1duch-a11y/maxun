# MLŽIDLA.CZ × HolmTec — interní datové centrum

## Identita a účel
Společný nástroj obou značek pro získávání a zpracování **oprávněně dostupných webových dat**. Weby mlzidla.cz a holmtec.cz se tím nemění. Vlastní vizuální prostředí staví na Maxun (AGPL-3.0); původní licenční oznámení a přístup ke zdrojovému kódu musí být zachovány.

### Styl
- Název v UI: **MLŽIDLA.CZ × HolmTec**
- Popisek: **Datové a automatizační centrum**
- Schválený směr pěti barev: tmavě modrá `#183B56` (navigace, nadpisy), tyrkysová `#0C98A7` (aktivní prvky a odkazy), šedá `#697985` (popisky), bílá `#FFFFFF` (plochy), červená `#D63D48` (upozornění a drobné akcenty). Červenou používat střídmě. Barvy jsou pracovní hex interpretace zvoleného barevného směru, nikoli změřené hodnoty z oficiálního brand manuálu.
- Písmo: Montserrat (nadpisy, s fallbackem), Inter (text, s fallbackem)
- Výchozí česká lokalizace pro přihlášení, registraci a menu; ostatní texty se pro chybějící překlady zobrazují anglicky.
- Wordmark v `src/components/branding/BrandLockup.tsx` je typografická **pracovní varianta**, nikoli ověřený oficiální grafický logotyp. Oficiální soubory log obou značek teprve musí být nasazeny.

## Funkční hranice
- Sdílený vizuální styl **neznamená** sdílení ani izolaci dat. Oddělení dat Mlžidla a HolmTec je samostatný backendový požadavek a nelze ho nahradit dvěma záložkami nebo filtrem v UI.
- Stávající správa Mlžidla.cz v Base44 ani GitHub repozitář webu se **nemění**.
- Maxun API a Playwright běží odděleně; napojení Base44 používejte přes serverové funkce a tajné klíče. Nezpřístupňujte interní API klíče v prohlížeči.
- Produkční režim blokuje veřejnou registraci, pokud není explicitně nastavené `ALLOW_PUBLIC_SIGNUP=true`. Tento přepínač **nemá** být zapnutý na veřejném endpointu. První administrátorský účet musí být bezpečně založen odděleným bootstrapem.

## Před skutečným provozem
1. Ověřit oficiální loga a schválené barvy.
2. Zavést autentizované přístupy ke všem zákaznickým datům, API endpointům a exportům.
3. Oddělit datové prostory podle značky na backendu (tenant / projekt / oprávnění).
4. Opravit konzumaci soukromých binárních výstupů — nynější Maxun stále předpokládá veřejné URL u části screenshotů. Produkční S3 bucket se nesmí otevřít pro anonymní čtení.
5. Vyřešit stejné HTTPS originy / CORS / cookie politiku pro frontend a API.
6. Připravit provozní monitoring, zálohování, GDPR a pravidla pro webové scraping roboty.
7. Zkontrolovat náklady na Render a externí S3 úložiště před vytvořením placených služeb.
