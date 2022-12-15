# make должен быть установлен (загуглить make install windows)


# можно вызвать по make run
run:
    docker run --rm --name web1 -p 8080:8080 -d --env-file ./.env hello-app
    docker run --rm --name web3 -p 8080:8080 -d --env-file ./.env -v vol3:/usr/src/app/db hello-app


# можно вызвать по make run-dev
# как бы контейнер в режиме разработки
# здесь первый вольюм это будем сами скрипты, и теперь не нужно пересоздавать образ при изменениях в скрипте
# скрипты будут маунтиться в сам контейнер
# и анонимный вольюм для папки node_modules при этом
run-dev:
    docker run --rm --name web3 -p 8080:8080 -d --env-file ./.env -v "C:\_GeekBrains\NodeJS\app-with-docker:/usr/src/app" -v /usr/src/app/node_modules -v vol3:/usr/src/app/db hello-app


# можно вызвать по make stop
stop:
    docker stop web1