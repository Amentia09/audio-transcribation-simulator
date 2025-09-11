Для запуска проекта необходимо настроить .env фалы по примеру из .env.example
В данном случае можно скопировать информацию из .env.example в созданный Вами файл .env

Запустите в корне проекта команду:
docker compose -f .\docker-compose.yml up -d

Затем перейдите по адресу: http://localhost:9000
Используйте креды для входа:
login: admin
pwd: password123

После входа создайте бакет для хранения файлов с именем: audio-transcribation


2 Вариант запуска:
Запустить minIO отдельно что позволит избежать ошибок с сохранением файлов, если таковые имеются
Перейдите в директорию
/minio
docker compose -f .\docker-compose.yml up -d

В папке client 
npm run build
npm run preview

server
npm run build
npm run start