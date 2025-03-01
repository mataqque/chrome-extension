FROM node:18-alpine

RUN apk add --no-cache git 
RUN git config --global --add safe.directory /app