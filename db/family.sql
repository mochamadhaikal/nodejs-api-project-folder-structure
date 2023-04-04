CREATE TABLE IF NOT EXISTS public.family (
	id varchar(32) serial PRIMARY KEY,
    fullname varchar(200),
    dob date,
	description varchar(100),
	status integer,
    created_date timestamp without time zone default now(),
);

-- status
-- 1 = Suami
-- 2 = Istri
-- 0 = Anak
COMMENT ON COLUMN family.status IS '1: Suami, 2: Istri, 0: Anak';

INSERT INTO family (fullname, dob, description, status) values('Mochamad Haikal','2004-06-09', 'Programmer / Kepala Rumah Tangga', 1);
INSERT INTO family (fullname, dob, description, status) values('Siti Rahma Rudiana Putri','2003-11-03', 'HR / Ibu Rumah Tangga', 2);
INSERT INTO family (fullname, status) values('Anak ke-1', 0);
INSERT INTO family (fullname, status) values('Anak ke-2', 0);
INSERT INTO family (fullname, status) values('Anak ke-3', 0);