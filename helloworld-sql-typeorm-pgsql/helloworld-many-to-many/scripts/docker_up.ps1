docker kill $(docker ps -q -a)
docker rm $(docker ps -q -a)

docker system prune -f
docker volume prune -f
docker image prune -f

docker image rm $(docker image ls -q -a)

docker compose up -d

docker compose exec -it api bash
