--- drop existing tables:
drop table if exists public.albums;
drop table if exists public.genre;

--- load uuid extention:
-- create extension if not exists uuid-ossp;

-- create tables:
create table public.genre (
	id uuid default uuid_generate_v4(),
	name varchar not null,
	constraint genre_pk primary key (id),
	constraint genre_un unique (name)
);

create table public.albums (
	id uuid default uuid_generate_v4(),
	artist_name varchar(30) not null,
	collection_name varchar(100) not null,
	release_date date not null,
	url varchar not null,
	genre_id uuid null,
	youtube_url varchar null,
	constraint albums_pkey primary key (id),
	constraint albums_fk foreign key (genre_id) 
		references public.genre(id) 
		on delete set null
);

-- insert initial data:
insert into public.genre (id, name) 
values 
	('b08b7790-8930-43fd-ba80-44d8c4cf2112', 'Electronic'),
	('2fd3d8cc-b585-4989-8954-29e0ef113e61', 'Classical'),
	('cc63951a-3d09-41d2-baf3-0acd6bfe4960', 'Pop');


insert into public.albums 
    (artist_name, collection_name, release_date, url, genre_id, youtube_url)
values
	('Beyoncé', 'Crazy In Love', '2003-06-23', 
		'http://win-router/api/content?path=home/Albums/Beyonc%C3%A9%20-%20Crazy%20In%20Love.mp4', 
		'cc63951a-3d09-41d2-baf3-0acd6bfe4960', 'https://www.youtube.com/watch?v=ViwtNLUqkMY'),
		
	('Beyoncé', 'Hold Up', '2016-04-24', 
		'http://win-router/api/content?path=home/Albums/Beyonc%C3%A9%20-%20Hold%20Up.mkv', 
		'cc63951a-3d09-41d2-baf3-0acd6bfe4960', 'https://www.youtube.com/watch?v=PeonBmeFR8o'),

	('Beyoncé', 'Deja Vu', '2016-04-24', 
		'http://win-router/api/content?path=home/Albums/Beyonc%C3%A9%20-%20Deja%20Vu.mkv', 
		'cc63951a-3d09-41d2-baf3-0acd6bfe4960', 'https://www.youtube.com/watch?v=RQ9BWndKEgs'),

	('Radikal Guru', 'Subcouncious', '2013-11-25', 'https://www.youtube.com/watch?v=jOpHKM-ruDw', 
		'b08b7790-8930-43fd-ba80-44d8c4cf2112', 'https://www.youtube.com/watch?v=jOpHKM-ruDw'),

	('Tangerine Dream', 'Underwater Sunlight', '2011-05-28', 'https://www.youtube.com/watch?v=qiLt2eIR7xc', 
		'b08b7790-8930-43fd-ba80-44d8c4cf2112', 'https://www.youtube.com/watch?v=qiLt2eIR7xc'),

	('Tangerine Dream', 'Rubycon', '1975-03-20', 'https://www.youtube.com/watch?v=jd6XL_IOS3I', 
		'b08b7790-8930-43fd-ba80-44d8c4cf2112', 'https://www.youtube.com/watch?v=jd6XL_IOS3I');