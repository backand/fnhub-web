#!/usr/bin/env bash
while echo $1 | grep -q ^-; do
    eval $( echo $1 | sed 's/^-//' )=$2
    shift
    shift
done
rm -rf $dir/server/storage/cache/*
chmod -R o+w $dir/server/storage
dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
export $(cat $dir/server/.env | xargs)
printf "Building on $FNHUB_ENV\n"
composer=$(which composer)
cd $dir/server
$composer install
php artisan optimize --force
cd $dir/client
npm install --unsafe-perm
printf "Done\n"