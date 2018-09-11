import Promise from 'bluebird';
import connection from './postgresConnection';

const functionQueries = {};

functionQueries.getDeveloperList = (req, res, next) => {
  connection.any('SELECT * FROM developer ORDER BY name')
    .then(data => res.status(200).json({ data }))
    .catch(err => res.status(500).json({ err, message: 'No fue posible recuperar la lista de desarrolladores'}));
};

functionQueries.getGenreList = (req, res, next) => {
  connection.any('SELECT * FROM genre ORDER BY name')
    .then(data => res.status(200).json({ data }))
    .catch(err => res.status(500).json({ err, message: 'No fue posible recuperar la lista de géneros' }));
};

functionQueries.getEsrbRatingList = (req, res, next) => {
  connection.any('SELECT * FROM esrb_rating')
    .then(data => res.status(200).json({ data }))
    .catch(err => res.status(500).json({ err, message: 'No fue posible recuperar la clasificación ESRB' }));
};

functionQueries.getPlatformList = (req, res, next) => {
  connection.any('SELECT * FROM platform')
    .then(data => res.status(200).json({ data }))
    .catch(err => res.status(500).json({ err, message: 'No fue posible recuperar la lista de plataformas' }));
};

functionQueries.getStatusList = (req, res, next) => {
  connection.any('SELECT * FROM status')
    .then(data => res.status(200).json({ data }))
    .catch(err => res.status(500).json({ err, message: 'No fue posible recuperar la lista de estados' }));
};

functionQueries.getVideoGameById = (req, res, next) => {
  let query = 'SELECT videogame.id, videogame.name, videogame.description, videogame.user_score, videogame.release_year,\
               videogame.status_id, developer, genre, platform, json_build_object(\'value\', esrb_rating.id, \'label\', esrb_rating.name) AS esrb_rating\
               FROM videogame\
               INNER JOIN esrb_rating ON videogame.esrb_rating_id = esrb_rating.id\
               INNER JOIN(\
                 SELECT videogame_id, array_agg(json_build_object(\'value\', developer.id, \'label\', developer.name)) AS developer\
                 FROM videogame_developer\
                 INNER JOIN developer ON videogame_developer.developer_id = developer.id\
                 GROUP BY videogame_id\
               ) videogame_developer ON videogame.id = videogame_developer.videogame_id\
               INNER JOIN(\
                 SELECT videogame_id, array_agg(json_build_object(\'value\', genre.id, \'label\', genre.name)) AS genre\
                 FROM videogame_genre\
                 INNER JOIN genre ON videogame_genre.genre_id = genre.id\
                 GROUP BY videogame_id\
               ) videogame_genre ON videogame.id = videogame_genre.videogame_id\
               INNER JOIN(\
                 SELECT videogame_id, array_agg(json_build_object(\'value\', platform.id, \'label\', platform.name)) AS platform\
                 FROM videogame_platform\
                 INNER JOIN platform ON videogame_platform.platform_id = platform.id\
                 GROUP BY videogame_id\
               ) videogame_platform ON videogame.id = videogame_platform.videogame_id\
               WHERE videogame.id = $1';

  connection.oneOrNone(query, req.params.id)
    .then(data => res.status(200).json({ data }))
    .catch(err => res.status(500).json({ err, message: 'No fue posible recuperar los datos del videojuego' }));    
};

functionQueries.getVideoGameList = (req, res, next) => {
  let query = 'SELECT videogame.id, videogame.name AS videogame, videogame.description, developer, genre, platform, videogame.release_year,\
               status.name AS status, videogame.user_score\
               FROM videogame\
               INNER JOIN status ON videogame.status_id = status.id\
               INNER JOIN(\
                  SELECT videogame_id, array_agg(developer.name) AS developer\
                  FROM videogame_developer\
                  INNER JOIN developer ON videogame_developer.developer_id = developer.id\
                  GROUP BY videogame_id\
               ) videogame_developer ON videogame.id = videogame_developer.videogame_id\
              INNER JOIN(\
                  SELECT videogame_id, array_agg(genre.name) AS genre\
                  FROM videogame_genre\
                  INNER JOIN genre ON videogame_genre.genre_id = genre.id\
                  GROUP BY videogame_id\
               ) videogame_genre ON videogame.id = videogame_genre.videogame_id\
               INNER JOIN(\
                  SELECT videogame_id, array_agg(platform.name) AS platform\
                  FROM videogame_platform\
                  INNER JOIN platform ON videogame_platform.platform_id = platform.id\
                  GROUP BY videogame_id\
               ) videogame_platform ON videogame.id = videogame_platform.videogame_id';

  connection.any(query)
    .then(data => res.status(200).json({ data }))
    .catch(err => res.status(500).json({ err, message: 'No fue posible recuperar la lista de videojuegos' }));
}

functionQueries.insertVideoGame = (req, res, next) => {
  connection.tx(t => {
    return t.sequence((order, data) => {
      if (order == 0) {
        let videogame = {
          esrb_rating_id: req.body.esrbRating.value,
          status_id: req.body.status,
          name: req.body.name,
          description: req.body.description,
          release_year: req.body.releaseYear.value,
          user_score: req.body.userScore
        };

        return t.one('INSERT INTO videogame (${this~}) VALUES (${esrb_rating_id}, ${status_id},\
        ${name}, ${description}, ${release_year}, ${user_score}) RETURNING id', videogame);
      }

      if (order == 1) {
        let videogameId = data.id;

        let queries = [
          req.body.developer.map(developer => {
            t.none('INSERT INTO videogame_developer (${this~}) VALUES (${videogame_id}, ${developer_id})', {
              videogame_id: videogameId,
              developer_id: developer.value
            })
          }),
          req.body.genre.map(genre => {
            t.none('INSERT INTO videogame_genre (${this~}) VALUES (${videogame_id}, ${genre_id})', {
              videogame_id: videogameId,
              genre_id: genre.value
            })
          }),
          req.body.platform.map(platform => {
            t.none('INSERT INTO videogame_platform (${this~}) VALUES (${videogame_id}, ${platform_id})', {
              videogame_id: videogameId,
              platform_id: platform.value
            })
          })
        ];

        return t.batch(queries);
      }
    });
  })
    .then(() => {
      res.status(200).json({
        success: true,
        message: 'Datos guardados'
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: 'Error al guardar',
        error: err
      });
    });
};

export default functionQueries;