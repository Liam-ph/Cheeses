FROM node:20.18.0

WORKDIR /cheeseAPI

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]