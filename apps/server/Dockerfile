FROM node:18-alpine as build

WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM node:18-alpine as server
COPY --from=build app/dist/server.bundle.js .
EXPOSE 3000

CMD ["node", "server.bundle.js"]