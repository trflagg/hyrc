build:
	docker build -t hyrc .

run-prod:
	docker run --rm -e "MONGO_URL=$(MONGO_URL)" -p 80:80 --name hyrc hyrc:latest

run:
	docker-compose up
