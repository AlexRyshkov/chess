Запуск локально:

1. Указать в .env файле SECRET_KEY

2. `docker compose -f docker-compose.yaml up -d`

приложение будет доступно на http://localhost (порт указывать не нужно)

Для проверки можно запустить два окна браузера (одно из них инкогнито), создать игру в одном окне и зайти по создавшейся ссылке в другом окне

Задеплоенная версия: http://84.201.161.167/

TODO:
Убрать фон при Drag&Drop  
Пофиксить баг с повышением фигур  
Сделать полноценный адаптив  
Добавить автотесты  
