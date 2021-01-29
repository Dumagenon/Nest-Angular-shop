FROM node:14.15.4-alpine3.10

WORKDIR /app/frontend

COPY package*.json /app/frontend/

RUN npm install

COPY . .

CMD ["npm", "start"]
