CREATE TABLE developer (
  id SERIAL,
  name VARCHAR,
  CONSTRAINT "pk_developer" PRIMARY KEY (id),
  CONSTRAINT "uq_developer_name" UNIQUE (name)
);

CREATE TABLE genre (
  id SERIAL,
  name VARCHAR,
  CONSTRAINT "pk_genre" PRIMARY KEY (id),
  CONSTRAINT "uq_genre_name" UNIQUE (name)
);

CREATE TABLE platform (
  id SERIAL,
  name VARCHAR,
  CONSTRAINT "pk_platform" PRIMARY KEY (id),
  CONSTRAINT "uq_platform_name" UNIQUE (name)
);

CREATE TABLE esrb_rating (
  id VARCHAR,
  name VARCHAR,
  CONSTRAINT "pk_esrbRating" PRIMARY KEY (id),
  CONSTRAINT "uq_esrbRating_name" UNIQUE (name)
);

CREATE TABLE status (
  id VARCHAR,
  name VARCHAR,
  CONSTRAINT "pk_status" PRIMARY KEY (id),
  CONSTRAINT "uq_status_name" UNIQUE (name)
);

CREATE TABLE videogame (
  id SERIAL,
  esrb_rating_id VARCHAR,
  status_id VARCHAR,
  name VARCHAR,
  description VARCHAR,
  release_year INTEGER,
  user_score FLOAT,
  CONSTRAINT "pk_videogame" PRIMARY KEY (id),
  CONSTRAINT "fk_videogame_esrbRating" FOREIGN KEY (esrb_rating_id) REFERENCES esrb_rating (id),
  CONSTRAINT "fk_videogame_status" FOREIGN KEY (status_id) REFERENCES status (id)
);

CREATE TABLE videogame_platform (
  videogame_id INTEGER,
  platform_id INTEGER,
  CONSTRAINT "pk_videogamePlatform" PRIMARY KEY (videogame_id, platform_id),
  CONSTRAINT "fk_videogamePlatform_videogame" FOREIGN KEY (videogame_id) REFERENCES videogame (id),
  CONSTRAINT "fk_videogamePlatform_platform" FOREIGN KEY (platform_id) REFERENCES platform (id)
);

CREATE TABLE videogame_developer (
  videogame_id INTEGER,
  developer_id INTEGER,
  CONSTRAINT "pk_videogameDeveloper" PRIMARY KEY (videogame_id, developer_id),
  CONSTRAINT "fk_videogameDeveloper_videogame" FOREIGN KEY (videogame_id) REFERENCES videogame (id),
  CONSTRAINT "fk_videogameDeveloper_developer" FOREIGN KEY (developer_id) REFERENCES developer (id)
);

CREATE TABLE videogame_genre (
  videogame_id INTEGER,
  genre_id INTEGER,
  CONSTRAINT "pk_videogameGenre" PRIMARY KEY (videogame_id, genre_id),
  CONSTRAINT "fk_videogameGenre_videogame" FOREIGN KEY (videogame_id) REFERENCES videogame (id),
  CONSTRAINT "fk_videogameGenre_genre" FOREIGN KEY (genre_id) REFERENCES genre (id)
);