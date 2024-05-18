This application contains vertical stepper form. It utilizes data and stores information in a PostgreSQL database using Prisma ORM.

## How to Run

1. **Install Dependencies For Backend**: Run the following command to install project dependencies:

   ```bash
   npm install
   npx prisma generate
   npx prisma migrate dev --name init
   npm run start:dev
   The application will be accessible at http://localhost:8080

   ```

2. **Set Environment Variables**: Create a .env file in the root directory of the project and define the following variables:
   DATABASE_URL=postgresql://<username>:<password>@127.0.0.1:<port>/<database_name>

3. **Install Dependencies For Frontend**: Run the following command to install project dependencies:

   ```bash
   npm install
   npm run start
   The application will be accessible at http://localhost:3000
   ```
