-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.1.13-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win32
-- HeidiSQL Versión:             9.3.0.4984
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

-- Volcando estructura de base de datos para company
CREATE DATABASE IF NOT EXISTS `company` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `company`;


-- Volcando estructura para tabla company.assignment
CREATE TABLE IF NOT EXISTS `assignment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `company_id` int(11) NOT NULL DEFAULT '0',
  `schedule_` datetime DEFAULT NULL,
  `service_description` varchar(255) DEFAULT NULL,
  `observation` varchar(255) DEFAULT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0:pendiente,1:atendido,2:observado',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `FK_assignment_user` (`user_id`),
  KEY `FK_assignment_company` (`company_id`),
  CONSTRAINT `FK_assignment_company` FOREIGN KEY (`company_id`) REFERENCES `company` (`id`),
  CONSTRAINT `FK_assignment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1 COMMENT='Asignación de empresas a empleados';

-- Volcando datos para la tabla company.assignment: ~10 rows (aproximadamente)
/*!40000 ALTER TABLE `assignment` DISABLE KEYS */;
INSERT INTO `assignment` (`id`, `user_id`, `company_id`, `schedule_`, `service_description`, `observation`, `state`, `created`, `updated`) VALUES
	(1, 1, 1, '2018-06-29 03:12:53', 'Chatbots', 'Por favor corregir observaciones.', 0, '2018-06-29 03:13:09', '2018-06-29 15:45:18'),
	(2, 2, 2, '2018-06-29 03:13:29', 'App android', 'Por favor avanza el app para la u.', 0, '2018-06-29 03:13:30', '2018-06-29 03:28:30'),
	(3, 2, 3, '2018-06-29 03:13:43', 'Api rest', 'Por favor genera los api restful', 0, '2018-06-29 03:13:43', '2018-06-29 03:13:57'),
	(4, 1, 3, '2018-07-02 03:13:43', 'Verificación de impresoras', NULL, 0, '2018-06-29 11:29:49', '2018-06-29 11:29:49'),
	(5, 1, 3, '2018-07-02 03:13:43', 'Verificación de pantallas', NULL, 0, '2018-06-29 11:32:16', '2018-06-29 11:32:16'),
	(6, 1, 3, '2018-07-02 03:13:43', 'Verihhh asdasdh66', NULL, 0, '2018-06-29 12:57:11', '2018-06-29 12:57:11');
	
/*!40000 ALTER TABLE `assignment` ENABLE KEYS */;


-- Volcando estructura para tabla company.company
CREATE TABLE IF NOT EXISTS `company` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `phone1` char(30) DEFAULT NULL,
  `phone2` char(30) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `latitude` char(50) DEFAULT NULL,
  `longitude` char(50) DEFAULT NULL,
  `state` tinyint(4) NOT NULL DEFAULT '1',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla company.company: ~3 rows (aproximadamente)
/*!40000 ALTER TABLE `company` DISABLE KEYS */;
INSERT INTO `company` (`id`, `name`, `phone1`, `phone2`, `address`, `latitude`, `longitude`, `state`, `created`, `updated`) VALUES
	(1, 'GBProyectos', '0', '0', '0', '', '', 1, '2018-06-29 02:56:53', '2018-06-29 03:10:21'),
	(2, 'Gloria S.A.', '0', '0', '0', '', '', 1, '2018-06-29 02:56:53', '2018-06-29 03:10:39'),
	(3, 'Jhonson', '0', '0', '0', '', '', 1, '2018-06-29 02:56:53', '2018-06-29 03:10:54');
/*!40000 ALTER TABLE `company` ENABLE KEYS */;


-- Volcando estructura para tabla company.user
CREATE TABLE IF NOT EXISTS `user` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(150) NOT NULL DEFAULT '' COMMENT 'Usuario email',
  `password` varchar(250) NOT NULL DEFAULT '' COMMENT 'Password bcrypt',
  `first_name` varchar(150) DEFAULT NULL COMMENT 'Nombres',
  `last_name` varchar(150) DEFAULT NULL COMMENT 'Apellidos',
  `state` varchar(150) NOT NULL DEFAULT '1' COMMENT '0:No activo, 1:Activo',
  `google_account` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1 : Tiene cuenta integrada con Google',
  `facebook_account` tinyint(4) NOT NULL DEFAULT '0' COMMENT '1: Tiene cuenta integrada con FB',
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Fecha de creación',
  `updated` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Fecha de última actualización',
  PRIMARY KEY (`user_id`),
  KEY `indice_login` (`username`,`password`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COMMENT='/*Tabla usuario*/';

-- Volcando datos para la tabla company.user: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`user_id`, `username`, `password`, `first_name`, `last_name`, `state`, `google_account`, `facebook_account`, `created`, `updated`) VALUES
	(1, 'ocorimanya@gmail.com', 'a12345', 'Omar', 'Mlast', '1', 1, 0, '2018-06-29 02:49:03', '2018-06-29 02:51:54'),
	(2, 'ocori@gmail.com', 'a12345', 'Juan', 'Mlast', '1', 0, 0, '2018-06-29 03:12:27', '2018-06-29 03:12:27');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
