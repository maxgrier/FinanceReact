FROM node:alpine
WORKDIR /app

COPY package*.json ./
COPY package.json .
RUN npm install --force
COPY . .

# EXPOSE 3000

# COPY . .

# CMD ["npm", "run", "start"]
CMD ["npm", "run", "dev2"]

# TO RUN THIS, YOU NEED TO COPY TO ./CLIENT/WEBPACK.CONFIG.JS TO THE ./CLIENT/NODE_MODULES/REACT-SCRIPTS/CONFIG/WEBPACK.CONFIG.JS FILE