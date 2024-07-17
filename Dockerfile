# Install dependencies only when needed
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --production --force


FROM node:20-alpine as builder
WORKDIR /app

ARG NEXT_PUBLIC_GOOGLE_MAPSKEY
ARG NEXT_EMAIL_USER
ARG NEXT_EMAIL_PASS
ARG NEXT_BASEURL
ARG NEXT_FIREBASE_API_KEY
ARG NEXT_FIREBASE_AUTH_DOMAIN
ARG NEXT_FIREBASE_PROJECTID
ARG NEXT_FIREBASE_STORAGEBUCKET
ARG NEXT_FIREBASE_MESSAGESENDERID
ARG NEXT_FIREBASE_APPID
ARG NEXT_FIREBASE_MEASUREMENTID
ARG NEXT_PUBLIC_GOOGLE_GAID

ENV PATH /app/node_modules/.bin:$PATH
ENV TZ=Europe/Budapest
RUN apk add tzdata
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 8082
# start app
CMD ["npm", "start"]