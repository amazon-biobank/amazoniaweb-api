FROM ubuntu:latest
USER root
WORKDIR /app
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]
