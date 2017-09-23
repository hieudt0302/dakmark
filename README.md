# how to dev

## config .env
```sh
copy .env.example .env
```
or linux
```sh
cp .env.example .env
```

## restore package
```sh
composer install
```
## create new app key
```sh
php artisan key:generate
```
## migrate and seed database
```sh
php artisan migrate --seed
```
## run in development
```sh
php artisan serve
```
