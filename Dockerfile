FROM node:18

WORKDIR /app

ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.12.0/wait /wait
RUN chmod +x /wait

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run prisma:generate

RUN npm run build

RUN rm -rf node_modules && npm install --production

EXPOSE 3000

CMD /wait && npm run prisma:migrate:prod && npm start