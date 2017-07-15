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
cd $dir/client
npm install --unsafe-perm
if [ "$FNHUB_ENV" == "prod" ]; then
    npm run build:prod
fi

if [ "$FNHUB_ENV" == "dev" ]; then
    printf "Starting node on $FNHUB_ENV\n"
    npm run watch:prod
    printf "Started node on $FNHUB_ENV\n"
fi