# Stage 1: Install dependencies and build the project
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install -g pnpm && pnpm install && pnpm run build

# Copy the server bundle to a new directory
FROM node:18-alpine AS server
WORKDIR /project 
COPY --from=build /app/apps/server/dist/server.bundle.js .
EXPOSE 3000
CMD ["node","server.bundle.js"]

# Stage 2: Setup the client with Nginx
FROM nginx:alpine As client
COPY --from=build /app/apps/client/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]