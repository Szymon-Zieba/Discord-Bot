FROM node:slim

RUN apt update && apt install chromium -y

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /puppeteer

COPY . .

RUN npm install

CMD ["node", "./src/discord/main.js"]