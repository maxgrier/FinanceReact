FROM node:current-alpine
WORKDIR /app

COPY package*.json ./
COPY package.json .
RUN npm i
COPY . .

# COPY . .

# EXPOSE 3001

CMD ["node", "server.js"]
