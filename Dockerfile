FROM node:18-bullseye as bot

WORKDIR /index

COPY package*.json ./
RUN npm install

COPY . .

ARG RAILWAY_STATIC_URL
ARG PUBLIC_URL
ARG PORT

CMD ["npm", "start"]
