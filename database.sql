CREATE TYPE ENUM_USER AS ENUM ('patient', 'dentist', 'clinic');
CREATE TYPE ENUM_SUBS AS ENUM ('unsubscripted', 'subscripted');
CREATE TYPE ENUM_DIST AS ENUM ('an','at','ba','br','ca','cl',
'ch','cr','ci','co','ea','in','jm','lm','lv','li','lo','lu','lr',
'mm','mi','pc','pu','pl','pp','ph','pn','ri','st','sb','si','sl',
'sn','ss','sp','sm','sa','so','sr','su','sq','vs','vm');
CREATE TYPE ENUM_GEND AS ENUM ('male', 'female', 'none');
CREATE TYPE ENUM_STAT AS ENUM ('0','1','2','3','4','5','6','7','8');

CREATE TABLE users (
    id_user         SMALLSERIAL     PRIMARY KEY                                                 ,
    user_type       ENUM_USER       NOT NULL                                                    ,
    mail            VARCHAR(75)     NOT NULL    UNIQUE                                          ,
    pswd            VARCHAR(100)    NOT NULL                                                    ,
    phone_number    INTEGER         NOT NULL    UNIQUE                                          ,
    subscription    ENUM_SUBS       NOT NULL                                                    ,
    district        ENUM_DIST       NOT NULL                                                    ,
    direction       VARCHAR(200)    NOT NULL                                                    ,
    latitude        REAL            NOT NULL                                                    ,
    longitude       REAL            NOT NULL                                                    ,
    CONSTRAINT VALID_PHONE CHECK (phone_number <= 999999999 and phone_number >= 0)
);

CREATE TABLE person(
    id_person       SMALLSERIAL     PRIMARY KEY                                                 ,
    first_name      VARCHAR(75)     NOT NULL                                                    ,
    last_name       VARCHAR(75)     NOT NULL                                                    ,
    gender          ENUM_GEND       NOT NULL                                                    ,
    dni             INTEGER         NOT NULL    UNIQUE                                          ,
    id_user         SMALLINT        NOT NULL    REFERENCES users(id_user)                       ,
    CONSTRAINT VALID_DNI    CHECK (dni <= 99999999 and dni >= 0)
);

CREATE TABLE patient(
    id_patient       SMALLSERIAL    PRIMARY KEY                                                 ,
    id_person       SMALLINT        NOT NULL    REFERENCES person(id_person)
);

CREATE TABLE dentist(
    id_dentist      SMALLSERIAL     PRIMARY KEY                                                 ,
    ruc             bigint          NOT NULL    UNIQUE                                          ,
    rating          REAL            NOT NULL    DEFAULT 0                                       ,
    id_person       SMALLINT        NOT NULL    REFERENCES person(id_person)                    ,
    CONSTRAINT VALID_RUC    CHECK (ruc <= 99999999999 and ruc >= 0)
);

CREATE TABLE clinic(
    id_clinic       SMALLSERIAL     PRIMARY KEY                                                 ,
    company_name    VARCHAR(100)    NOT NULL    UNIQUE                                          ,
    ruc             bigint          NOT NULL    UNIQUE                                          ,
    rating          REAL            NOT NULL    DEFAULT 0                                       ,
    id_user         SMALLINT        NOT NULL    REFERENCES users(id_user)                       ,
    CONSTRAINT VALID_RUC    CHECK (ruc <= 99999999999 and ruc >= 0)
);

CREATE TABLE speciality(
    id_speciality   SMALLSERIAL     PRIMARY KEY                                                 ,
    name            VARCHAR(100)    NOT NULL    UNIQUE
);

CREATE TABLE dentistSpecialities(
    id_dentist      SMALLINT        NOT NULL    REFERENCES dentist(id_dentist)                  ,
    id_speciality   SMALLINT        NOT NULL    REFERENCES speciality(id_speciality)            ,
    PRIMARY KEY (id_dentist, id_speciality)
);

CREATE TABLE recruitment(
    id_recruitment  SMALLSERIAL     PRIMARY KEY                                                 ,
    beg_date        DATE            NOT NULL    DEFAULT now()                                   ,
    end_nate        DATE            NULL                                                        ,
    id_clinic       SMALLINT        NOT NULL    REFERENCES clinic(id_clinic)                    ,
    id_dentist      SMALLINT        NOT NULL    REFERENCES dentist(id_dentist)
);

CREATE TABLE comment(
    id_comment      SMALLSERIAL     PRIMARY KEY                                                 ,
    rating          SMALLINT        NOT NULL                                                    ,
    comment         VARCHAR(200)    NOT NULL                                                    ,
    CONSTRAINT VALID_RATING CHECK (rating <= 5 and rating >= 0)
);

CREATE TABLE schedule(
    id_schedule     SMALLSERIAL     PRIMARY KEY                                                 ,
    day             DATE            NOT NULL                                                    ,
    hour            SMALLINT        NOT NULL                                                    ,
    sttus           ENUM_STAT       NOT NULL    DEFAULT '0'                                     ,
    id_comment      SMALLINT        NULL        REFERENCES comment(id_comment)                  ,
    id_speciality   SMALLINT        NULL        REFERENCES speciality(id_speciality)            ,
    id_recruitment  SMALLINT        NULL        REFERENCES recruitment(id_recruitment)          ,
    id_patient      SMALLINT        NULL        REFERENCES patient(id_patient)                  ,
    id_dentist      SMALLINT        NOT NULL    REFERENCES dentist(id_dentist)                  ,
    CONSTRAINT VALID_HOUR   CHECK (hour <= 47 and hour >= 0)
);

INSERT INTO 
    users (user_type,mail,pswd,phone_number,subscription,district,direction,latitude,longitude)
VALUES 
    ('clinic','marco0@gmail.com','mrco0',956364760,'subscripted','lm','calle la habana0',0,2),
    ('dentist','marco1@gmail.com','mrco1',956364761,'subscripted','lm','calle la habana1',1,2),
    ('patient','marco2@gmail.com','mrco2',956364762,'subscripted','lm','calle la habana2',2,2),
    ('clinic','marco3@gmail.com','mrco3',956364763,'subscripted','lm','calle la habana3',3,2);

INSERT INTO
    clinic (company_name,ruc,id_user)
VALUES
    ('nombre compañia 1', 10111222333, 1),
    ('nombre compañia 2', 10111222332, 4);


























INSERT INTO
    users (id_user,user_type,mail,pswd,phone_number,district,direction,latitude,longitude)
VALUES 
    ('00000000-0000-0000-0000-0000000000c0','clinic','clinic00@mail.com','clinic00',900000000,'distritoc00','direccionc00',-12.00,-77.00),
    ('00000000-0000-0000-0000-0000000000c1','clinic','clinic01@mail.com','clinic01',900000001,'distritoc01','direccionc01',-12.01,-77.01),
    ('00000000-0000-0000-0000-0000000000c2','clinic','clinic02@mail.com','clinic02',900000002,'distritoc02','direccionc02',-12.02,-77.02),
    ('00000000-0000-0000-0000-0000000000c3','clinic','clinic03@mail.com','clinic03',900000003,'distritoc03','direccionc03',-12.03,-77.03),
    ('00000000-0000-0000-0000-0000000000c4','clinic','clinic04@mail.com','clinic04',900000004,'distritoc04','direccionc04',-12.04,-77.04),
    ('00000000-0000-0000-0000-0000000000c5','clinic','clinic05@mail.com','clinic05',900000005,'distritoc05','direccionc05',-12.05,-77.05),
    ('00000000-0000-0000-0000-0000000000c6','clinic','clinic06@mail.com','clinic06',900000006,'distritoc06','direccionc06',-12.06,-77.06),
    ('00000000-0000-0000-0000-0000000000c7','clinic','clinic07@mail.com','clinic07',900000007,'distritoc07','direccionc07',-12.07,-77.07),
    ('00000000-0000-0000-0000-0000000000c8','clinic','clinic08@mail.com','clinic08',900000008,'distritoc08','direccionc08',-12.08,-77.08),
    ('00000000-0000-0000-0000-0000000000c9','clinic','clinic09@mail.com','clinic09',900000009,'distritoc09','direccionc09',-12.09,-77.09),

    ('00000000-0000-0000-0000-0000000000d0','dentist','dentist00@mail.com','dentist00',900000010,'distritod00','direcciond00',-12.10,-77.10),
    ('00000000-0000-0000-0000-0000000000d1','dentist','dentist01@mail.com','dentist01',900000011,'distritod01','direcciond01',-12.11,-77.11),
    ('00000000-0000-0000-0000-0000000000d2','dentist','dentist02@mail.com','dentist02',900000012,'distritod02','direcciond02',-12.12,-77.12),
    ('00000000-0000-0000-0000-0000000000d3','dentist','dentist03@mail.com','dentist03',900000013,'distritod03','direcciond03',-12.13,-77.13),
    ('00000000-0000-0000-0000-0000000000d4','dentist','dentist04@mail.com','dentist04',900000014,'distritod04','direcciond04',-12.14,-77.14),
    ('00000000-0000-0000-0000-0000000000d5','dentist','dentist05@mail.com','dentist05',900000015,'distritod05','direcciond05',-12.15,-77.15),
    ('00000000-0000-0000-0000-0000000000d6','dentist','dentist06@mail.com','dentist06',900000016,'distritod06','direcciond06',-12.16,-77.16),
    ('00000000-0000-0000-0000-0000000000d7','dentist','dentist07@mail.com','dentist07',900000017,'distritod07','direcciond07',-12.17,-77.17),
    ('00000000-0000-0000-0000-0000000000d8','dentist','dentist08@mail.com','dentist08',900000018,'distritod08','direcciond08',-12.18,-77.18),
    ('00000000-0000-0000-0000-0000000000d9','dentist','dentist09@mail.com','dentist09',900000019,'distritod09','direcciond09',-12.19,-77.19),

    ('00000000-0000-0000-0000-0000000000a0','patient','patient00@mail.com','patient00',900000020,'distritop00','direccionp00',-12.20,-77.20),
    ('00000000-0000-0000-0000-0000000000a1','patient','patient01@mail.com','patient01',900000021,'distritop01','direccionp01',-12.21,-77.21),
    ('00000000-0000-0000-0000-0000000000a2','patient','patient02@mail.com','patient02',900000022,'distritop02','direccionp02',-12.22,-77.22),
    ('00000000-0000-0000-0000-0000000000a3','patient','patient03@mail.com','patient03',900000023,'distritop03','direccionp03',-12.23,-77.23),
    ('00000000-0000-0000-0000-0000000000a4','patient','patient04@mail.com','patient04',900000024,'distritop04','direccionp04',-12.24,-77.24),
    ('00000000-0000-0000-0000-0000000000a5','patient','patient05@mail.com','patient05',900000025,'distritop05','direccionp05',-12.25,-77.25),
    ('00000000-0000-0000-0000-0000000000a6','patient','patient06@mail.com','patient06',900000026,'distritop06','direccionp06',-12.26,-77.26),
    ('00000000-0000-0000-0000-0000000000a7','patient','patient07@mail.com','patient07',900000027,'distritop07','direccionp07',-12.27,-77.27),
    ('00000000-0000-0000-0000-0000000000a8','patient','patient08@mail.com','patient08',900000028,'distritop08','direccionp08',-12.28,-77.28),
    ('00000000-0000-0000-0000-0000000000a9','patient','patient09@mail.com','patient09',900000029,'distritop09','direccionp09',-12.29,-77.29);



{"mail":"c0@ma.co","pswd":"123456","phone_number":900000010,"district":"dstrto0","direction":"direcc0","latitude":-12.00,"longitude":-77.00,"company_name":"nombre clinica 0","ruc":20000000010}
{"mail":"c1@ma.co","pswd":"123456","phone_number":900000011,"district":"dstrto1","direction":"direcc1","latitude":-12.01,"longitude":-77.01,"company_name":"nombre clinica 1","ruc":20000000011}
{"mail":"c2@ma.co","pswd":"123456","phone_number":900000012,"district":"dstrto2","direction":"direcc2","latitude":-12.02,"longitude":-77.02,"company_name":"nombre clinica 2","ruc":20000000012}
{"mail":"c3@ma.co","pswd":"123456","phone_number":900000013,"district":"dstrto3","direction":"direcc3","latitude":-12.03,"longitude":-77.03,"company_name":"nombre clinica 3","ruc":20000000013}
{"mail":"c4@ma.co","pswd":"123456","phone_number":900000014,"district":"dstrto4","direction":"direcc4","latitude":-12.04,"longitude":-77.04,"company_name":"nombre clinica 4","ruc":20000000014}
{"mail":"c5@ma.co","pswd":"123456","phone_number":900000015,"district":"dstrto5","direction":"direcc5","latitude":-12.05,"longitude":-77.05,"company_name":"nombre clinica 5","ruc":20000000015}
{"mail":"c6@ma.co","pswd":"123456","phone_number":900000016,"district":"dstrto6","direction":"direcc6","latitude":-12.06,"longitude":-77.06,"company_name":"nombre clinica 6","ruc":20000000016}
{"mail":"c7@ma.co","pswd":"123456","phone_number":900000017,"district":"dstrto7","direction":"direcc7","latitude":-12.07,"longitude":-77.07,"company_name":"nombre clinica 7","ruc":20000000017}
{"mail":"c8@ma.co","pswd":"123456","phone_number":900000018,"district":"dstrto8","direction":"direcc8","latitude":-12.08,"longitude":-77.08,"company_name":"nombre clinica 8","ruc":20000000018}
{"mail":"c9@ma.co","pswd":"123456","phone_number":900000019,"district":"dstrto9","direction":"direcc9","latitude":-12.09,"longitude":-77.09,"company_name":"nombre clinica 9","ruc":20000000019}

{"mail":"d0@ma.co","pswd":"123456","phone_number":900000020,"district":"dstrto0","direction":"direcc0","latitude":-12.10,"longitude":-77.10,"first_name":"nombre 00","last_name":"apellido 09","gender":"male","dni":80000020,"ruc":10000000020}
{"mail":"d1@ma.co","pswd":"123456","phone_number":900000021,"district":"dstrto1","direction":"direcc1","latitude":-12.11,"longitude":-77.11,"first_name":"nombre 01","last_name":"apellido 08","gender":"male","dni":80000021,"ruc":10000000021}
{"mail":"d2@ma.co","pswd":"123456","phone_number":900000022,"district":"dstrto2","direction":"direcc2","latitude":-12.12,"longitude":-77.12,"first_name":"nombre 02","last_name":"apellido 07","gender":"male","dni":80000022,"ruc":10000000022}
{"mail":"d3@ma.co","pswd":"123456","phone_number":900000023,"district":"dstrto3","direction":"direcc3","latitude":-12.13,"longitude":-77.13,"first_name":"nombre 03","last_name":"apellido 06","gender":"male","dni":80000023,"ruc":10000000023}
{"mail":"d4@ma.co","pswd":"123456","phone_number":900000024,"district":"dstrto4","direction":"direcc4","latitude":-12.14,"longitude":-77.14,"first_name":"nombre 04","last_name":"apellido 05","gender":"male","dni":80000024,"ruc":10000000024}
{"mail":"d5@ma.co","pswd":"123456","phone_number":900000025,"district":"dstrto5","direction":"direcc5","latitude":-12.15,"longitude":-77.15,"first_name":"nombre 05","last_name":"apellido 04","gender":"male","dni":80000025,"ruc":10000000025}
{"mail":"d6@ma.co","pswd":"123456","phone_number":900000026,"district":"dstrto6","direction":"direcc6","latitude":-12.16,"longitude":-77.16,"first_name":"nombre 06","last_name":"apellido 03","gender":"male","dni":80000026,"ruc":10000000026}
{"mail":"d7@ma.co","pswd":"123456","phone_number":900000027,"district":"dstrto7","direction":"direcc7","latitude":-12.17,"longitude":-77.17,"first_name":"nombre 07","last_name":"apellido 02","gender":"male","dni":80000027,"ruc":10000000027}
{"mail":"d8@ma.co","pswd":"123456","phone_number":900000028,"district":"dstrto8","direction":"direcc8","latitude":-12.18,"longitude":-77.18,"first_name":"nombre 08","last_name":"apellido 01","gender":"male","dni":80000028,"ruc":10000000028}
{"mail":"d9@ma.co","pswd":"123456","phone_number":900000029,"district":"dstrto9","direction":"direcc9","latitude":-12.19,"longitude":-77.19,"first_name":"nombre 09","last_name":"apellido 00","gender":"male","dni":80000029,"ruc":10000000029}

{"mail":"p0@ma.co","pswd":"123456","phone_number":900000030,"district":"dstrto0","direction":"direcc0","latitude":-12.20,"longitude":-77.20,"first_name":"nombre 10","last_name":"apellido 19","gender":"female","dni":80000030}
{"mail":"p1@ma.co","pswd":"123456","phone_number":900000031,"district":"dstrto1","direction":"direcc1","latitude":-12.21,"longitude":-77.21,"first_name":"nombre 11","last_name":"apellido 18","gender":"female","dni":80000031}
{"mail":"p2@ma.co","pswd":"123456","phone_number":900000032,"district":"dstrto2","direction":"direcc2","latitude":-12.22,"longitude":-77.22,"first_name":"nombre 12","last_name":"apellido 17","gender":"female","dni":80000032}
{"mail":"p3@ma.co","pswd":"123456","phone_number":900000033,"district":"dstrto3","direction":"direcc3","latitude":-12.23,"longitude":-77.23,"first_name":"nombre 13","last_name":"apellido 16","gender":"female","dni":80000033}
{"mail":"p4@ma.co","pswd":"123456","phone_number":900000034,"district":"dstrto4","direction":"direcc4","latitude":-12.24,"longitude":-77.24,"first_name":"nombre 14","last_name":"apellido 15","gender":"female","dni":80000034}
{"mail":"p5@ma.co","pswd":"123456","phone_number":900000035,"district":"dstrto5","direction":"direcc5","latitude":-12.25,"longitude":-77.25,"first_name":"nombre 15","last_name":"apellido 14","gender":"female","dni":80000035}
{"mail":"p6@ma.co","pswd":"123456","phone_number":900000036,"district":"dstrto6","direction":"direcc6","latitude":-12.26,"longitude":-77.26,"first_name":"nombre 16","last_name":"apellido 13","gender":"female","dni":80000036}
{"mail":"p7@ma.co","pswd":"123456","phone_number":900000037,"district":"dstrto7","direction":"direcc7","latitude":-12.27,"longitude":-77.27,"first_name":"nombre 17","last_name":"apellido 12","gender":"female","dni":80000037}
{"mail":"p8@ma.co","pswd":"123456","phone_number":900000038,"district":"dstrto8","direction":"direcc8","latitude":-12.28,"longitude":-77.28,"first_name":"nombre 18","last_name":"apellido 11","gender":"female","dni":80000038}
{"mail":"p9@ma.co","pswd":"123456","phone_number":900000039,"district":"dstrto9","direction":"direcc9","latitude":-12.29,"longitude":-77.29,"first_name":"nombre 19","last_name":"apellido 10","gender":"female","dni":80000039}


{"id_clinic":"", "id_dentist":""}
{"id_clinic":"", "id_dentist":""}
{"id_clinic":"", "id_dentist":""}
{"id_clinic":"", "id_dentist":""}












































2022-11-23T01:10:13.990524+00:00 app[web.1]: Executing (default): 
SELECT 
    count("clinic"."id_clinic") AS "count" 
FROM 
    "clinic" AS "clinic" 
LEFT OUTER JOIN 
    "users" AS "user" 
ON 
    "clinic"."id_user" = "user"."id_user" 
WHERE 
    "clinic"."company_name" 
LIKE 
    '%%';

2022-11-23T01:10:13.991993+00:00 app[web.1]: Executing (default): 
SELECT 
    "clinic"."id_clinic", "clinic"."company_name", 
    "clinic"."ruc", 
    "clinic"."rating", 
    "user"."id_user" AS "user.id_user", 
    "user"."user_type" AS "user.user_type", 
    "user"."phone_number" AS "user.phone_number", 
    "user"."subscription" AS "user.subscription", 
    "user"."district" AS "user.district", 
    "user"."direction" AS "user.direction", 
    "user"."latitude" AS "user.latitude", 
    "user"."longitude" AS "user.longitude" 
FROM 
    "clinic" AS "clinic" 
LEFT OUTER JOIN 
    "users" AS "user" 
ON 
    "clinic"."id_user" = "user"."id_user" 
WHERE 
    "clinic"."company_name" 
LIKE 
    '%%' 
ORDER BY 
    "clinic"."company_name" ASC 
LIMIT 
    30 
OFFSET 
    0;

2022-11-23T01:10:13.994225+00:00 app[web.1]: Executing (default): 
SELECT 
    count("dentist"."id_dentist") AS "count" 
FROM 
    "dentist" AS "dentist" 
INNER JOIN 
    "person" AS "person" 
ON 
    "dentist"."id_person" = "person"."id_person" 
    AND 
    "person"."first_name" LIKE '%%' 
LEFT OUTER JOIN 
    "users" AS "person->user" 
ON 
    "person"."id_user" = "person->user"."id_user";

2022-11-23T01:10:13.997963+00:00 app[web.1]: Executing (default): 
SELECT 
    "dentist"."id_dentist", 
    "dentist"."ruc", 
    "dentist"."rating", 
    "person"."id_person" AS "person.id_person", 
    "person"."first_name" AS "person.first_name", 
    "person"."last_name" AS "person.last_name", 
    "person"."gender" AS "person.gender", 
    "person"."dni" AS "person.dni", 
    "person->user"."id_user" AS "person.user.id_user", 
    "person->user"."user_type" AS "person.user.user_type", 
    "person->user"."phone_number" AS "person.user.phone_number", 
    "person->user"."subscription" AS "person.user.subscription", 
    "person->user"."district" AS "person.user.district", 
    "person->user"."direction" AS "person.user.direction", 
    "person->user"."latitude" AS "person.user.latitude", 
    "person->user"."longitude" AS "person.user.longitude" 
FROM 
    "dentist" AS "dentist" 
INNER JOIN 
    "person" AS "person" 
ON 
    "dentist"."id_person" = "person"."id_person" 
    AND 
    "person"."first_name" LIKE '%%' 
LEFT OUTER JOIN 
    "users" AS "person->user" 
ON 
    "person"."id_user" = "person->user"."id_user" 
ORDER BY 
    "dentist"."ruc" ASC 
LIMIT 
    30 
OFFSET 
    0;