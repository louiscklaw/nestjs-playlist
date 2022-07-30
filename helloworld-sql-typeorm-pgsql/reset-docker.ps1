docker-compose kill
docker-compose down
docker-compose rm -v -f

timeout /T 1

docker-compose up -d

docker-compose logs -f
