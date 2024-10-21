FROM node:20.18.0

WORKDIR /cheese-POC

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

ENV PORT=3001

EXPOSE 3001

CMD ["npm", "run", "serve"]