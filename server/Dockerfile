FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 4040

CMD npx prisma migrate reset --force --skip-seed && npm run start

