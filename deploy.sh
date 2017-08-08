  dir=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
  cd $dir/www
  #git init (First time)
  #heroku git:remote -a fnhubqa (First time)
  #heroku buildpacks:set heroku/php (First time)

  git add .
  git commit -m "new deploy"
  git push -f heroku master