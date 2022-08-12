FROM node:14.17.0
WORKDIR /app
COPY binding.gyp ./
COPY src/ ./src/
COPY lyra2/ ./lyra2/
COPY package.json ./
RUN npm install --unsafe-perm
CMD ["npm", "run", "start"]