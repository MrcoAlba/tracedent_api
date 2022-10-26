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



{"mail":"clinic00@mail.com","pswd":"clinic00","phone_number":900000000,"district":"distritoc00","direction":"direccionc00","latitude":-12.00,"longitude":-77.00,"company_name":"companyName00","ruc":80000000000}
{"mail":"clinic01@mail.com","pswd":"clinic01","phone_number":900000001,"district":"distritoc01","direction":"direccionc01","latitude":-12.01,"longitude":-77.01,"company_name":"companyName01","ruc":80000000001}
{"mail":"clinic02@mail.com","pswd":"clinic02","phone_number":900000002,"district":"distritoc02","direction":"direccionc02","latitude":-12.02,"longitude":-77.02,"company_name":"companyName02","ruc":80000000002}
{"mail":"clinic03@mail.com","pswd":"clinic03","phone_number":900000003,"district":"distritoc03","direction":"direccionc03","latitude":-12.03,"longitude":-77.03,"company_name":"companyName03","ruc":80000000003}
{"mail":"clinic04@mail.com","pswd":"clinic04","phone_number":900000004,"district":"distritoc04","direction":"direccionc04","latitude":-12.04,"longitude":-77.04,"company_name":"companyName04","ruc":80000000004}
{"mail":"clinic05@mail.com","pswd":"clinic05","phone_number":900000005,"district":"distritoc05","direction":"direccionc05","latitude":-12.05,"longitude":-77.05,"company_name":"companyName05","ruc":80000000005}
{"mail":"clinic06@mail.com","pswd":"clinic06","phone_number":900000006,"district":"distritoc06","direction":"direccionc06","latitude":-12.06,"longitude":-77.06,"company_name":"companyName06","ruc":80000000006}
{"mail":"clinic07@mail.com","pswd":"clinic07","phone_number":900000007,"district":"distritoc07","direction":"direccionc07","latitude":-12.07,"longitude":-77.07,"company_name":"companyName07","ruc":80000000007}
{"mail":"clinic08@mail.com","pswd":"clinic08","phone_number":900000008,"district":"distritoc08","direction":"direccionc08","latitude":-12.08,"longitude":-77.08,"company_name":"companyName08","ruc":80000000008}
{"mail":"clinic09@mail.com","pswd":"clinic09","phone_number":900000009,"district":"distritoc09","direction":"direccionc09","latitude":-12.09,"longitude":-77.09,"company_name":"companyName09","ruc":80000000009}


