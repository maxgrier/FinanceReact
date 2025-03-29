FROM node:current-alpine
WORKDIR /app

# COPY package.json ./
# RUN npm i
COPY . .

WORKDIR /app/server

COPY ./server/package.json ./server
RUN npm i

WORKDIR /app/client

COPY ./client/package.json ./client
# RUN npm i -force
RUN npm i --legacy-peer-deps
# RUN npm run build
# COPY . .

# COPY ./client/webpack.config.js ./node_modules/react-scripts/config
COPY ./client/src/newWebpackConfig.js ./node_modules/react-scripts/config/webpack.config.js

# Don't know if I need this
WORKDIR /app
COPY . .

# EXPOSE 3000 
# EXPOSE 3001 
EXPOSE 8080 
WORKDIR /app/client
# CMD ["npm", "run", "dev2"]


ENV GENERATE_SOURCEMAP=false
# RUN npm run build
# need to add this to webpack.config.js
# resolve: {
#    fallback: { "querystring": require.resolve("querystring-es3") }
# }
# https://stackoverflow.com/questions/70640271/getting-the-error-module-not-found-error-cant-resolve-querystring-how-do
CMD ["npm", "run", "dev2"]
# I think i followed this before
# https://medium.com/@antonio.maccarini/dockerize-a-react-application-with-node-js-postgres-and-nginx-124c204029d4

# what I was also trying
# docker build -t react-finance2 .
# docker run -dp 127.0.0.1:3000:3000 react-finance2