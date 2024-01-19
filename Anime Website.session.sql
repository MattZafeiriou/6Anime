-- This file is for development and testing purposes only. It is not meant to be used in production.

-- @block
CREATE TABLE Anime(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    folder_name VARCHAR(50) NOT NULL UNIQUE,
    nicknames JSON NOT NULL,
    season INTEGER NOT NULL,
    description TEXT NOT NULL,
    studios JSON NOT NULL,
    genre JSON NOT NULL,
    episodes INTEGER NOT NULL,
    duration INTEGER NOT NULL,
    premiered DATE,
    other_seasons_folders JSON NOT NULL,
    other_seasons_names JSON NOT NULL,
    type TEXT NOT NULL, -- Movie or Series
    poster TEXT NOT NULL,
    update_date DATE NOT NULL,
    added_date DATE NOT NULL
);

-- @block
CREATE TABLE Episode(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    anime_id INTEGER NOT NULL,
    video_url TEXT NOT NULL,
    tracks JSON NOT NULL,
    episode_number INTEGER NOT NULL,
    FOREIGN KEY (anime_id) REFERENCES Anime(id)
);

-- @block
CREATE TABLE Views(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    anime_id INTEGER NOT NULL UNIQUE,
    views_count INTEGER NOT NULL,
    today_views INTEGER NOT NULL DEFAULT 0,
    week_views INTEGER NOT NULL DEFAULT 0,
    month_views INTEGER NOT NULL DEFAULT 0,
    year_views INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (anime_id) REFERENCES Anime(id)
)

-- @block
CREATE TABLE Form(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    text TEXT NOT NULL,
    ip TEXT NOT NULL
)

-- @block
SELECT * FROM Form;

-- @block
DROP TABLE Form;

-- @block
INSERT INTO Anime(name, folder_name, nicknames, season, description, studios, genre, episodes, duration, premiered, other_seasons_folders, other_seasons_names, type, poster)
VALUES('Tenki No Ko', 'Tenki_No_Ko', '["Weathering with you","天気の子"]', 1, "Tokyo is currently experiencing rain showers that seem to disrupt the usual pace of everyone living there to no end. Amidst this seemingly eternal downpour arrives the runaway high school student Hodaka Morishima, who struggles to financially support himself—ending up with a job at a small-time publisher. At the same time, the orphaned Hina Amano also strives to find work to sustain herself and her younger brother. Both fates intertwine when Hodaka attempts to rescue Hina from shady men, deciding to run away together. Subsequently, Hodaka discovers that Hina has a strange yet astounding power: the ability to call out the sun whenever she prays for it. With Tokyo's unusual weather in mind, Hodaka sees the potential of this ability. He suggests that Hina should become a sunshine girl—someone who will clear the sky for people when they need it the most. Things begin looking up for them at first. However, it is common knowledge that power always comes with a hefty price...",
'["CoMix Wave Films"]', '["Drama","Fantasy","Romance"]', 1, 114, '2019-07-19', '[]', '[]', "Movie", 'https://cdn.myanimelist.net/images/anime/1009/103147l.jpg');

-- @block
INSERT INTO Views(anime_id, views_count)
VALUES(1, 0);

-- @block
INSERT INTO Episode(anime_id, video_url, tracks, episode_number)
VALUES('1', 'https://eno.tendoloads.com/_v6/04c62d67738da375aca8b1659516f077c74801fa368082aa2ebd5c4556d4a621e40149ff082d9d6b627f702d28718f4cefec91e79fa9d9f8e407df2c2424be0114f0b211b8e8eb14baff1d78eb556215114a397444824941bed9fc5f7e12ed38b17fff668113bf7e2be351ef365348a89ba0ec5cdbbc56fd9b916d6342e2f46b/master.m3u8', '["https://cc.bunnyccdn.co/ca/6e/ca6e95a207b37aa7dfff60a5fe12dd75/eng-3.vtt"]', 1)

-- @block
SELECT * FROM Anime;

-- @block
 DELETE FROM Episode WHERE id = 41

-- @block
SHOW TABLES;

-- @block
DROP TABLE Episode

-- @block
SELECT url FROM Anime WHERE title='MORE'

-- @block
ALTER TABLE Anime
ADD COLUMN added_date DATE;

-- @block
UPDATE Anime
SET added_date = CURRENT_DATE;

-- @block
UPDATE Episode
SET tracks = '["https://cc.bunnyccdn.co/b8/7c/b87cf50ef7f1c9737d845a3ae961431a/eng-0.vtt"]'
WHERE id = 81;

-- @block
UPDATE Episode
SET video_url = 'https://eno.tendoloads.com/_v6/ef70bfa1e3f4081d895f25a06ce43fc78ecf2109cc436d9d9535068ef9afccbd49933ecc7fb5c2510802ca567b6e85519c582ab4e47848e4f1265e31054cc3468b536716d02d4d9ed627b288bd9b0522f8fb944b7029ff9398cb43e9fc0149f197b4810bc7c44c198e87ac5668f7548f7ffced9cdc3e71ab68f9c5343eb36e68/master.m3u8'
WHERE id = 81;

-- @block
SELECT * FROM Episode WHERE anime_id = 7;