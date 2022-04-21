insert into regions(name)values('Sudamérica');
insert into regions(name)values('Centroamérica');
insert into regions(name)values('Norteamérica');
insert into regions(name)values('Europa');
insert into regions(name)values('Asia');
insert into regions(name)values('Africa');
insert into regions(name)values('Oceanía');
insert into regions(name)values('Antártida');



INSERT INTO customers (create_at, date_birth, document, email, name, phone, photo, update_at, region_id) VALUES (to_timestamp('24/03/2022 10:16:21,088000000 PM','DD/MM/YYYY HH12:MI:SSXFF AM'),to_date('19/03/2022','DD/MM/YYYY'), '123456754', 'prueba@hotmail.com', 'Nelly Fajardo', '4212577', '07c7bba6-c8d7-4f58-8e58-c92f35ca9f31_descarga (1).jpg',null,1);
INSERT INTO customers (create_at, date_birth, document, email, name, phone, photo, update_at, region_id) VALUES (to_timestamp('24/03/2022 10:16:21,088000000 PM','DD/MM/YYYY HH12:MI:SSXFF AM'),to_date('19/03/2022','DD/MM/YYYY'), '94525648', 'david717@hotmail.es', 'David Forero', '3113067035', '39974f45-bf0e-4293-bbba-58a9ab636c9e_Screenshot_1.png',null,2);
INSERT INTO customers (create_at, date_birth, document, email, name, phone, photo, update_at, region_id) VALUES (to_timestamp('24/03/2022 10:16:21,088000000 PM','DD/MM/YYYY HH12:MI:SSXFF AM'),to_date('19/03/2022','DD/MM/YYYY'), '1143940722', 'MeraR@gmail.com', 'Carlos Mera Rodriguez', '4212497', 'f86577c4-b36b-4057-b5fe-c0e0706c7403_Foto David.JPG',null,3);
INSERT INTO customers (create_at, date_birth, document, email, name, phone, photo, update_at, region_id) VALUES (to_timestamp('24/03/2022 10:16:21,088000000 PM','DD/MM/YYYY HH12:MI:SSXFF AM'),to_date('19/03/2022','DD/MM/YYYY'), '656565666', 'david717@hotmail.es', 'Fabian Forero', '3113067035', '7352fd18-7a28-4cbb-8fa4-366d717ca52d_descarga.jpg',null,4);
INSERT INTO customers (create_at, date_birth, document, email, name, phone, photo, update_at, region_id) VALUES (to_timestamp('24/03/2022 10:16:21,088000000 PM','DD/MM/YYYY HH12:MI:SSXFF AM'),to_date('19/03/2022','DD/MM/YYYY'), '123456758', 'caroldd@hotmail.es', 'Carol Benitez', '3113067035', NULL, NULL,5);
INSERT INTO customers (create_at, date_birth, document, email, name, phone, photo, update_at, region_id) VALUES (to_timestamp('24/03/2022 10:16:21,088000000 PM','DD/MM/YYYY HH12:MI:SSXFF AM'),to_date('19/03/2022','DD/MM/YYYY'), '11439845', 'Camila@hotmail.es', 'Camila Leniy', '3113067035', NULL, NULL,6);
INSERT INTO customers (create_at, date_birth, document, email, name, phone, photo, update_at, region_id) VALUES (to_timestamp('24/03/2022 10:16:21,088000000 PM','DD/MM/YYYY HH12:MI:SSXFF AM'),to_date('19/03/2022','DD/MM/YYYY'), '11459854', 'andres@hotmail.com', 'Andres Dominguez', '4212577', 'b08be21c-8ebe-433d-83d9-6dcf995f290a_descarga (1).jpg', null,7);
INSERT INTO customers (create_at, date_birth, document, email, name, phone, photo, update_at, region_id) VALUES (to_timestamp('24/03/2022 10:16:21,088000000 PM','DD/MM/YYYY HH12:MI:SSXFF AM'),to_date('19/03/2022','DD/MM/YYYY'), '12345678', 'caroldd@hotmail.es', 'Carol Benitez', '3113067035', '449818a2-3bd3-4a51-b116-fc59898f7d4a_Capture001.png', null,8);

INSERT INTO usuarios (username, password, enabled, nombre, apellido, email) VALUES ('andres','$2a$10$fVEKQ0t6ZlfPgkrgcJIw4uQBz3SDDYAfmfJwSBklXYboLh.3kStle',1, 'Andres','Guzman','andres12@gmail.com');
INSERT INTO usuarios (username, password, enabled, nombre, apellido, email) VALUES ('admin','$2a$10$.RN/mHBGLW1Q3Hkl6cnYnugDCcb9FXQ7VoJlCUpyfNE5YifzQwwPC',1, 'David','Forero','david717@hotmail.es');

insert into roles(nombre)values('ROLE_USER');
insert into roles(nombre)values('ROLE_ADMIN');

INSERT INTO usuarios_roles (usuario_id, roles_id) VALUES (1,1);
INSERT INTO usuarios_roles (usuario_id, roles_id) VALUES (2,2);
INSERT INTO usuarios_roles (usuario_id, roles_id) VALUES (2,1);

