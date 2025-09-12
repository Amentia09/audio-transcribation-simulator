<h2>Симулятор транскрибации</h2>

<h3>Технологии:</h3>
<ul>
  <li>FrontEnd: React, ApolloClient, GraphQL, AntDesign</li>
  <li>BackEnd: ApolloService, TypeScript, GraphQL</li>
  <li>Prisma + SQLite - для безопасного хранения и записи/передачи/изменения записей</li>
  <li>Файловое хранилище MinIO</li>
  <li>Nginx - для решения проблем с cors</li>
</ul>

<h2>Функционал</h2>
- Создает записи в БД SQLite (Job)<br>
- По истичении 15 секунд статус задачи меняется с PROCESSING на COMPLETED или FAILED (30% шанс что будет фейл): Сделано для симуляции возвращения ошибки и отображения соответствующего варианта<br>
- Файл передается и хранится в файловой системе<br>


<h2>Запуск проекта</h2>

Для запуска проекта необходимо настроить <b>.env</b> файлы по примеру из <b>.env.example</b>
В данном случае можно скопировать информацию из .env.example в созданный Вами файл .env в папке server

```
-server <br>
--src <br>
--.env <br>
```


Запустите в корне проекта команду:
<code>docker compose -f .\docker-compose.yml up -d</code>

Затем перейдите по адресу: http://localhost:9000
Используйте креды для входа:
<code>
login: admin
pwd: password123
</code>

После входа создайте бакет для хранения файлов с именем: <code>audio-transcribation</code>

Перейдите по адресу <code>localhost:5173</code> для использования интерфейса

<h3>Пример 1</h3>
<img width="1899" height="940" alt="image" src="https://github.com/user-attachments/assets/2a604a9b-ba41-43e5-9ba0-b32479177f3a" />
<h3>Пример 2</h3>
<img width="1900" height="945" alt="Снимок экрана Test_Job" src="https://github.com/user-attachments/assets/d341bd70-9cae-4222-96e2-bdb523330c9f" />
<h3>Демонстрация MinIO UI</h3>
<img width="1888" height="921" alt="image" src="https://github.com/user-attachments/assets/a12f572b-d979-4bf5-8c8d-1cbf106421d9" />

