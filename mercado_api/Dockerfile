# Stage 1
FROM node:16-alpine as builder
RUN apk add --no-cache libc6-compat
WORKDIR /builder/usr/app
COPY package*.json ./
COPY .env ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2
FROM node:16-alpine as deployer
WORKDIR /usr/app
COPY package*.json ./
COPY .env ./.env
RUN npm install --production
COPY --from=builder /builder/usr/app/dist ./dist
USER node
CMD ["npm","start"]

# docker build -t mibarber-api:dev .
# docker run -d -p 1027:4001 --name mibarber-api mibarber-api:dev

# DATABASE_HOST=172.26.1.206
# DATABASE_PORT=1026
# DATABASE_USER=developUser
# DATABASE_PASSWORD=!p4ssw0rd1
# DATABASE_NAME=the_barbershop

# PORT=4001
# TOKEN_SECRET=n9dyt89h7
# SENDINBLUE_API_KEY=nomelase