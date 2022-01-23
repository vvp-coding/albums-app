CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    artist_name VARCHAR(30) NOT NULL,
    collection_name VARCHAR(100) NOT NULL,
    artwork_url VARCHAR,
    release_date DATE NOT NULL,
    primary_genre_name VARCHAR(30),
    url VARCHAR NOT NULL
);

INSERT INTO albums (artist_name, collection_name, artwork_url, release_date, primary_genre_name, url ) 
    VALUES ('Tangerine Dream', 'Rubycon', 
    'https://is2-ssl.mzstatic.com/image/thumb/Music/v4/4b/ab/0a/4bab0a6b-4d02-22d6-d9e8-9cbff4d0c606/source/100x100bb.jpg',
    '1975-03-21T08:00:00Z', 'Electronic', 'https://www.youtube.com/embed/jd6XL_IOS3I?rel=0&amp;controls=0&amp;showinfo=0');

INSERT INTO albums (artist_name, collection_name, artwork_url, release_date, primary_genre_name, url ) 
    VALUES ('Tangerine Dream', 'Underwater Sunlight', 
    'https://is2-ssl.mzstatic.com/image/thumb/Music123/v4/aa/db/ac/aadbac00-80ac-58d4-681f-1b36211e5eaa/source/100x100bb.jpg',
    '2011-05-30T07:00:00Z', 'Electronic', 'https://www.youtube.com/embed/qiLt2eIR7xc?rel=0&amp;controls=0&amp;showinfo=0');

INSERT INTO albums (artist_name, collection_name, artwork_url, release_date, primary_genre_name, url ) 
    VALUES ('Philip Glass', 'Glassworks', 
    'https://is2-ssl.mzstatic.com/image/thumb/Music125/v4/35/45/21/3545214a-df79-63b0-68e8-28eaf0fecc8e/source/100x100bb.jpg',
    '1982-09-29T07:00:00Z', 'Classical', 'https://www.youtube.com/embed/6Stu7h7Qup8?rel=0&amp;controls=0&amp;showinfo=0');

INSERT INTO albums (artist_name, collection_name, artwork_url, release_date, primary_genre_name, url ) 
    VALUES ('Radikal Guru', 'Subcouncious', 
    'https://is2-ssl.mzstatic.com/image/thumb/Music124/v4/c1/5a/e0/c15ae0c1-5037-1eb2-8775-18065c2a4239/source/100x100bb.jpg',
    '2013-11-25T08:00:00Z', 'Electronic', 'https://www.youtube.com/embed/jOpHKM-ruDw?rel=0&amp;controls=0&amp;showinfo=0');

INSERT INTO albums (artist_name, collection_name, artwork_url, release_date, primary_genre_name, url ) 
    VALUES ('Beyoncé', 'Lemonade', 
    'http://is1.mzstatic.com/image/thumb/Music20/v4/23/c1/9e/23c19e53-783f-ae47-7212-03cc9998bd84/source/100x100bb.jpg',
    '2016-04-25T07:00:00Z', 'Pop', 'https://www.youtube.com/embed/PeonBmeFR8o?rel=0&amp;controls=0&amp;showinfo=0');

INSERT INTO albums (artist_name, collection_name, artwork_url, release_date, primary_genre_name, url ) 
    VALUES ('Beyoncé', 'Dangerously In Love', 
    'http://is1.mzstatic.com/image/thumb/Music/v4/18/93/6d/18936d85-8f6b-7597-87ef-62c4c5211298/source/100x100bb.jpg',
    '2003-06-24T07:00:00Z', 'Pop', 'https://www.youtube.com/embed/ViwtNLUqkMY?rel=0&amp;controls=0&amp;showinfo=0');

SELECT * FROM albums;