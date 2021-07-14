FROM ubuntu:latest
USER root
WORKDIR /app
RUN apt-get update
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_14.x  | bash -
RUN apt-get -y install nodejs
COPY package*.json ./
RUN npm install
RUN curl -LJ "https://github.com/amazon-biobank/lyra2-file-encryptor/releases/download/v1.3.0/lyra2-file-encryptor_0.1-1_amd64.deb" -o lyra2.deb
RUN apt install ./lyra2.deb
COPY . .
CMD ["npm", "run", "start"]

