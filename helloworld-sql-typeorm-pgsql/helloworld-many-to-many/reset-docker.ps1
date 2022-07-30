docker-compose kill
docker-compose down --remove-orphans
docker-compose rm -v -f

timeout /T 1
docker system prune -f
docker container prune -f

docker-compose up -d

docker-compose logs -f
