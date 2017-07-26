#!/usr/bin/env bash
while echo $1 | grep -q ^-; do
    eval $( echo $1 | sed 's/^-//' )=$2
    shift
    shift
done
dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
export $(cat $dir/server/.env | xargs)
printf "Building on $FNHUB_ENV\n"
composer=$(which composer)
cd $dir/server
$composer install
php artisan cache:clear
cd $dir/client
npm install --unsafe-perm
if [ "$FNHUB_ENV" == "prod" ]; then
    npm run build:prod
    cd $dir
    mv $dir/www/index.php index.php.saved
    cp -a $dir/www/.git/* $dir/tmp/.git/
    rm -rf $dir/www/*
    # update project/ to your directory name
    printf "Creating bundle\n"
    cp -a $dir/server/public/* www/
    rm -rf $dir/www/index.php
    mv index.php.saved $dir/www/index.php
    mv index.php.saved $dir/www/index.php
    cp -a $dir/tmp/.git/* $dir/www/.git/
    rm -rf $dir/tmp
    printf "Moving laravel application to /www\n"
    cp -r $dir/server/ $dir/www/server
    printf "Removing unecessary code\n"
    rm -rf $dir/www/server/database
    rm -rf $dir/www/server/public
    rm -f $dir/www/.env
    rm -f $dir/www/.env.example

    printf "applying permissions on bootstrap and storage\n"
    chmod -R 777 $dir/www/server/storage
    chown -R www-data:www-data $dir/www/server/storage
    chmod -R 777 $dir/www/server/bootstrap
    chown -R www-data:www-data $dir/www/server/bootstrap
    printf "www directory is ready, Copy the content from www and deploy on your server\n"
    
fi

if [ "$FNHUB_ENV" == "dev" ]; then
    printf "Starting node on $FNHUB_ENV\n"
    npm run watch:prod
    printf "Started node on $FNHUB_ENV\n"
fi