FROM node:20.12.0-alpine
WORKDIR /app
COPY ./package*.json ./
RUN npm install
RUN npm install -g nodemon
COPY . .
EXPOSE 5000
CMD ["npm","run","dev"]