# Sistema di Aggregazione

Questo è un sistema di aggregazione dati per la gestione e l'analisi delle attività del team. L'applicazione permette di aggregare i dati per progetto, dipendente o data per ottenere insights preziosi.

## Prerequisiti

Prima di iniziare, assicurati di avere installato sul tuo sistema:

-   PHP >= 8.1
-   Composer
-   Node.js >= 16.x
-   NPM o Yarn
-   MySQL o PostgreSQL

## Installazione

Segui questi passaggi per configurare il progetto localmente:

1. **Clona il repository**

    ```bash
    git clone <repository-url>
    cd aggregation-app
    ```

2. **Installa le dipendenze PHP**

    ```bash
    composer install
    ```

3. **Installa le dipendenze JavaScript**

    ```bash
    npm install
    # oppure se usi Yarn
    yarn
    ```

4. **Configura l'ambiente**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. **Configura il database**

    - Crea un nuovo database MySQL/PostgreSQL
    - Aggiorna il file .env con le credenziali del tuo database:
        ```
        DB_CONNECTION=mysql
        DB_HOST=127.0.0.1
        DB_PORT=3306
        DB_DATABASE=nome_database
        DB_USERNAME=username
        DB_PASSWORD=password
        ```

6. **Esegui le migrazioni e i seeder**
    ```bash
    php artisan migrate
    php artisan db:seed
    ```

## Avvio dell'applicazione

1. **Avvia il server di sviluppo Laravel**

    ```bash
    php artisan serve
    ```

2. **In un nuovo terminale, avvia Vite per il frontend**

    ```bash
    npm run dev
    # oppure se usi Yarn
    yarn dev
    ```

## Risoluzione dei problemi comuni

1. **Errore di permessi storage**

    ```bash
    php artisan cache:clear
    php artisan config:clear
    chmod -R 777 storage bootstrap/cache
    ```

2. **Errore di compilazione assets**

    ```bash
    npm clean-install
    npm run build
    ```

3. **Errore di database**
    ```bash
    php artisan migrate:fresh --seed
    ```

## Supporto

Per problemi o domande, apri una issue nel repository del progetto.

## Licenza

Questo progetto è rilasciato sotto licenza MIT.
