FROM node:14.17.6

WORKDIR /src/app/products-pdfmake

COPY ./package*.json ./

RUN apt-get update && \
  yarn && \
  yarn add typescript -g

COPY . .
CMD ["yarn","dev"]