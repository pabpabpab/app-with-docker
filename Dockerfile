FROM node:16

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# команда RUN для сборки образа
RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# Здесь на самом деле копируется из текущей папки в в папку которая указана WORKDIR'ом
# Или может быть абсолютный путь указан как типа /app
COPY . .

# В таком порядке - сначала package.json, потом npm install и потом копирование всего остального - так правильнее,
# потому что в этом случае, только при изменении кода в скриптах к примеру, докер в след раз при построении образа
# неизменные слои возьмет из кэша


# Указать для контейнера переменную окружения
# ENV TZ Europe/Moscow
# можно вот так использовать переменные окружения
# ENV PORT 8080
# EXPOSE $PORT

EXPOSE 3000

# анонимный вольюм
# VOLUME ["/usr/src/app/db"]

# команда CMD для запуска образа
CMD [ "node", "mongo-app.js" ]