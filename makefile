build:
	docker build -t hyrc .

mongo-compose:
	docker run -it --rm --network=hyrc_default mongo:3.4.7 sh -c 'exec mongo "mongodb://mongo:27017"'

run-prod:
	docker run --rm -e "MONGO_URL=$(MONGO_URL)" -p 80:80 --name hyrc hyrc:latest

run:
	docker-compose up

update-compose-fixtures:
	docker run  --rm --name='hyrc_fixtures' -e NODE_ENV=docker -e MONGO_URL -v $(shell pwd):/usr/src/app \
				--network=hyrc_default \
				node:9.9.0 \
				node --harmony /usr/src/app/node_modules/argie/messageLoader ../../db-environment-compose.js
