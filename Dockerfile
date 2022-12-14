FROM node:slim

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

WORKDIR /puppeteer

COPY . .

RUN apt update && apt install chromium -y && npm install

CMD ["node", "./src/puppeteer/main.js"]