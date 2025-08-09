FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

COPY . .

RUN echo "Installing dependencies..."

RUN npm install 

RUN echo "Building the application..."
RUN npm run build

EXPOSE 3000

CMD npm run start 