FROM node:alpine

# Bug to enable docker builds
ENV CI=true

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./

RUN npm install
COPY . ./

CMD ["npm", "start"]