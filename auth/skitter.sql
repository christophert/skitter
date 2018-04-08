CREATE DATABASE IF NOT EXISTS skitter;
CREATE USER 'skitter_overlord'@'localhost' IDENTIFIED BY 'a_GENerIC_p@ssW0rd';
GRANT ALL ON skitter.* to 'skitter_overlord'@'localhost';

SELECT skitter;
