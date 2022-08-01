docker compose kill
docker compose down
docker compose rm -v -f

sleep 1

docker compose up -d

docker compose logs -f
