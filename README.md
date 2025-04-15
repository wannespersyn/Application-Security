
# Full-Stack Project: Home Control Center

## Overzicht
Dit project is een full-stack applicatie waarmee gebruikers de verlichting en scènes in hun huis kunnen beheren. Het bestaat uit een **frontend** gebouwd met **Next.js** en een **backend** gebouwd met **Node.js** en **Express**, ondersteund door een **PostgreSQL**-database via **Prisma ORM**.

---

## Functionaliteiten
- **Gebruikersbeheer**: Registratie, inloggen, en beheer van gebruikers (inclusief rollen zoals admin).
- **Lichtbeheer**: Aan- en uitzetten van lampen, aanpassen van helderheid en locatiebeheer.
- **Scènebeheer**: Creëren, aanpassen en activeren van scènes met meerdere lichtbronnen.
- **Beveiliging**: JWT-authenticatie, inputvalidatie, en beveiligingsheaders via Helmet.
- **Meertaligheid**: Ondersteuning voor meerdere talen met `next-i18next`.

---

## Technologieën
### Frontend
- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Internationale ondersteuning**: next-i18next
- **State Management**: React Hooks en SWR

### Backend
- **Framework**: Node.js met Express
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Beveiliging**: Helmet, express-jwt
- **API-documentatie**: Swagger

---

## Installatie
### Vereisten
- **Node.js** (LTS-versie aanbevolen)
- **PostgreSQL** database
- **npm** of **yarn**

### Backend
1. Navigeer naar de `back-end` map:
   ```bash
   cd back-end