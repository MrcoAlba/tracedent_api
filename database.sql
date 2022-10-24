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

CREATE TABLE textMessage(
    id_message      SMALLSERIAL     PRIMARY KEY                                                 ,
    message_text    VARCHAR(256)    NOT NULL                                                    ,
    sent_datetime   TIMESTAMP WITHOUT TIME ZONE         DEFAULT now()                           ,
    id_from         SMALLINT        NOT NULL    REFERENCES users(id_user)                       ,
    id_destination  SMALLINT        NOT NULL    REFERENCES users(id_user)
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