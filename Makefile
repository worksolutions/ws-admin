build-app:
	docker build -t ws-admin-app .

run-app:
	docker run -d -p 3000:80 --restart always --env-file ./.env ws-admin-app
