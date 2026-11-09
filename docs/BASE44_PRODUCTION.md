# Maxun: bezpečná produkční integrace s Base44

> Stav: příprava pro nasazení, **nikoliv potvrzení nasazení**. Nespouštějte publikaci bez funkčního backendu, zabezpečených tajných klíčů a úspěšných integračních testů.

## Výchozí stav (2026-11-09)

- Tento repozitář je fork Maxun, výchozí větev je `develop`.
- Maxun je full-stack služba (React/Vite, Node/Express, Playwright/Chromium, PostgreSQL, MinIO, samostatný browser worker).
- Base44 samo o sobě neprovozuje uvedený Docker Compose stack. Base44 může být **samostatným ovládacím UI a integrační vrstvou**, nikoli náhradou běžícího backendu Maxun.
- Současná aplikace Mlžidla.cz v Base44 je spojena s **jiným** GitHub repozitářem; její propojení ani produkční publikaci tato změna nemění.

## Doporučená architektura

```text
Uživatel -> Base44 aplikace (přihlášení + autorizace)
                     |
                     v
            serverová funkce Base44
            (tajný API klíč pouze na serveru)
                     |
                     v HTTPS
        Maxun API / samostatný hosting
                |           |
           PostgreSQL     MinIO
                |
           Playwright/browser worker
```

Maxun backend a browser worker provozujte na Docker-compatible hostingu nebo vlastním serveru. Prohlížečový worker potřebuje dostatek RAM a správně nakonfigurované síťové spojení; statický hosting, samotné Vite UI ani commit do GitHubu nestačí.

## Předpoklady produkčního nasazení

1. Vyberte **cílový server/workspace a domény** (např. `api.example.com` a `maxun.example.com`). Ověřte oprávnění k DNS a deploymentu.
2. Připravte produkční tajné údaje **mimo Git**: `JWT_SECRET`, `ENCRYPTION_KEY`, `SESSION_SECRET`, `DB_PASSWORD`, `MINIO_ACCESS_KEY`, `MINIO_SECRET_KEY`. Hodnoty z `ENVEXAMPLE` jsou pouze příklady a nesmějí se použít v produkci.
3. Nastavte `BACKEND_URL`, `VITE_BACKEND_URL`, `PUBLIC_URL`, `VITE_PUBLIC_URL` na skutečné HTTPS adresy a ověřte CORS, cookies a WebSocket spojení. `DB_HOST`, `MINIO_ENDPOINT` a `BROWSER_WS_HOST` musí odpovídat produkční síti.
4. Pro veřejnost zpřístupněte jen proxy přes HTTPS. PostgreSQL, MinIO admin rozhraní a browser/debug porty ponechte v privátní síti; zabezpečte správu účtů, šifrování, logy a zálohy databáze i objektového úložiště.
5. Sestavte a spusťte image backendu, frontendu a browser workeru. `docker-compose.yml` ve výchozím stavu používá image `getmaxun/*:latest` — samotný GitHub commit tedy **nenasadí změny tohoto forku**. Pro produkční image z forku je nutné je nejprve sestavit, označit neměnnou verzí a změnit reference v konfiguraci.
6. Proveďte migrace DB, smoke test přihlášení, vytvoření a spuštění robotu, čtení výsledku, API autorizaci, obnovu po restartu a ověření záloh.
7. Base44 napojte **až na funkční Maxun API** pomocí serverové funkce a tajného klíče uloženého v Base44 Secrets. Klíč nikdy neposílejte do klientského JavaScriptu; validujte vstupy i přístup k cizím URL.
8. Poté proveďte změny v pracovní větvi, vyhodnoťte Preview a testy, merge do `develop` a teprve následně samostatný produkční deploy ověřeného buildu. Bez povolení neměňte produkční web Mlžidla.cz.

## Připravená kontrola v CI

Workflow `.github/workflows/maxun-preflight.yml` při PR do `develop` a při ručním spuštění kontroluje syntaxi `docker-compose.yml` na vzorových proměnných a kontroluje, zda nejsou v Git verzované produkční soubory `.env`. Tato kontrola **nenahrazuje build, bezpečnostní audit ani smoke test živé služby**.

## Blokující podmínky

- Není vybrané produkční nasazovací prostředí pro Maxun, nebyly dodány produkční tajné hodnoty.
- V seznamu Base44 aplikací zatím není aplikace Maxun propojená s tímto repozitářem.
- Neexistuje ověřený produkční build tohoto forku ani běžící API endpoint, který by šlo bezpečně integrovat.

Teprve po odstranění těchto blokérů je možné označit projekt za „nasazený“.
