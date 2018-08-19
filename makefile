build:
	docker build -t hyrc .

run-prod:
	docker run -p 80:80 hyrc:latest

run:
	docker-compose up
