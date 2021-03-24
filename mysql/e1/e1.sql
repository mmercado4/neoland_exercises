SELECT * FROM tblusuarios;

#Consultas 1

#1. Listar los nombres de los usuarios
SELECT id, nombre FROM pruebas.tblusuarios;

#2. Calcular el saldo máximo de los usuarios de sexo “Mujer”
SELECT SUM(saldo) FROM tblusuarios WHERE sexo = 'M';

#3. Listar nombre y teléfono de los usuarios con teléfono NOKIA, BLACKBERRY o SONY
SELECT nombre, telefono FROM tblusuarios WHERE marca = 'NOKIA' OR marca = 'BLACKBERRY' OR marca = 'SONY';

#4. Contar los usuarios sin saldo o inactivos
SELECT COUNT(usuario) FROM tblusuarios WHERE saldo > 0 AND activo = 1;

#5. Listar el login de los usuarios con nivel 1, 2 o 3
SELECT usuario FROM tblusuarios WHERE nivel > 0;

#6. Listar los números de teléfono con saldo menor o igual a 300
SELECT telefono FROM tblusuarios WHERE saldo <= 300;

#7. Calcular la suma de los saldos de los usuarios de la compañia telefónica NEXTEL
SELECT SUM(saldo) FROM tblusuarios WHERE compañia = 'NEXTEL';

#8. Contar el número de usuarios por compañía telefónica
SELECT compañia, COUNT(usuario) FROM tblusuarios group by compañia; 

#9. Contar el número de usuarios por nivel
SELECT nivel, COUNT(usuario) FROM tblusuarios GROUP BY nivel;

#10. Listar el login de los usuarios con nivel 2
SELECT usuario FROM tblusuarios WHERE nivel = 2;

#11. Mostrar el email de los usuarios que usan gmail
SELECT usuario, email FROM tblusuarios WHERE email LIKE '%@gmail.com';

#12. Listar nombre y teléfono de los usuarios con teléfono LG, SAMSUNG o MOTOROLA
SELECT nombre, telefono, marca FROM tblusuarios WHERE marca = 'LG' OR marca = 'SAMSUNG' OR marca = 'MOTOROLA';

#Consultas 2
#1. Listar nombre y teléfono de los usuarios con teléfono que no sea de la marca LG o SAMSUNG
SELECT nombre, telefono, marca FROM tblusuarios WHERE marca <> 'LG' AND marca <> 'SAMSUNG';

#2. Listar el login y teléfono de los usuarios con compañia telefónica IUSACELL
SELECT usuario, telefono, compañia FROM tblusuarios WHERE compañia = 'IUSACELL';

#3. Listar el login y teléfono de los usuarios con compañia telefónica que no sea TELCEL
SELECT usuario, telefono, compañia FROM tblusuarios WHERE compañia <> 'TELCEL';

#4. Calcular el saldo promedio de los usuarios que tienen teléfono marca NOKIA
SELECT AVG(saldo) FROM tblusuarios WHERE marca = 'NOKIA';

#5. Listar el login y teléfono de los usuarios con compañia telefónica IUSACELL o AXEL
SELECT usuario, telefono, compañia FROM tblusuarios WHERE compañia = 'IUSACELL' OR compañia = 'AXEL';

#6. Mostrar el email de los usuarios que no usan yahoo
SELECT email FROM tblusuarios WHERE email NOT LIKE '%@yahoo.com';

#7. Listar el login y teléfono de los usuarios con compañia telefónica que no sea TELCEL o IUSACELL
SELECT usuario, telefono, compañia FROM tblusuarios WHERE compañia <> 'TELCEL' AND compañia <> 'IUSACELL';

#8. Listar el login y teléfono de los usuarios con compañia telefónica UNEFON
SELECT usuario, telefono, compañia FROM tblusuarios WHERE compañia = 'UNEFON';

#9. Listar las diferentes marcas de celular en orden alfabético descendentemente
SELECT marca FROM tblusuarios GROUP BY marca ORDER BY marca DESC;

#10. Listar las diferentes compañias en orden alfabético aleatorio
SELECT compañia FROM tblusuarios GROUP BY compañia ORDER BY compañia;

#11. Listar el login de los usuarios con nivel 0 o 2
SELECT usuario, nivel FROM tblusuarios WHERE nivel = 0 OR nivel = 2;

#12. Calcular el saldo promedio de los usuarios que tienen teléfono marca LG
SELECT AVG(saldo) FROM tblusuarios WHERE marca = 'LG';