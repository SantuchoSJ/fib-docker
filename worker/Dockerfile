FROM node:14.14.0-alpine

WORKDIR /worker

COPY package.json ./package.json
RUN npm install

COPY . .

CMD ["npm","start"]