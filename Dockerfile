# Install dependencies only when needed
FROM node:alpine AS deps
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --production --force


FROM node:alpine as builder
WORKDIR /app

ARG NEXT_PUBLIC_GOOGLE_MAPSKEY
ARG NEXT_PUBLIC_EMAIL_USER
ARG NEXT_PUBLIC_EMAIL_PASS
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
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 8082
# start app
CMD ["npm", "start"]