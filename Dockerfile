# Stage 1: Install dependencies and build the project
FROM node:20 AS build
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build

# Stage 2: Setup the server
FROM node:20 AS server
WORKDIR /project
COPY --from=build /app .
WORKDIR /project/apps/server
RUN npm install -g pnpm
RUN pnpm install
EXPOSE 3000
CMD ["pnpm", "start"]

# Stage 3: Setup the client with Nginx
FROM nginx:alpine AS client
COPY --from=build /app/apps/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]