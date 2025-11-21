DB_CONTAINER = nest_postgres
DB_USER = ilya
DB_NAME = twitter_clone

.PHONY: psql up down stop rm

psql:
	docker exec -it $(DB_CONTAINER) psql -U $(DB_USER) -d $(DB_NAME)

up:
	docker compose up -d

stop:
	docker stop $(DB_CONTAINER)

rm:
	docker rm $(DB_CONTAINER)

seed:
	ts-node src/seed/seed.ts

clear-db:
	ts-node src/seed/clearDB.ts
