# Needs root for global install
sudo npm install -g pg@6 pg-hstore sequelize-auto

heroku local:run sequelize-auto -o models -c config.json -h $DATABASE_HOST -d $DATABASE_DB -u $DATABASE_USER -x $DATABASE_PASSWORD --dialect postgres
