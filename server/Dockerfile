FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Сгенерировать клиент Prisma (важно до запуска)
RUN npx prisma generate

# Собрать проект
RUN npm run build

EXPOSE 4040

CMD npx prisma migrate reset --force --skip-seed && npm run start

