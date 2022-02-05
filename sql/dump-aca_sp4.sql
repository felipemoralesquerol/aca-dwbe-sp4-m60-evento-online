-- Ejecutar desde cualquier cliente MySQL Compatible
-- MariaDB dump 10.19  Distrib 10.5.12-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: aca_sp4
-- ------------------------------------------------------
-- Server version	10.5.12-MariaDB-0ubuntu0.21.04.1
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE aca_sp4;
--
-- Table structure for table `direcciones`
--
DROP TABLE IF EXISTS `direcciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `direcciones` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ciudad` varchar(255) NOT NULL,
  `calle` varchar(255) NOT NULL,
  `calle_nro` varchar(255) DEFAULT NULL,
  `piso` varchar(255) DEFAULT NULL,
  `departamento` varchar(255) DEFAULT NULL,
  `observaciones` varchar(255) DEFAULT NULL,
  `borrado` tinyint(1) DEFAULT 0,
  `create_timestamp` datetime NOT NULL,
  `update_timestamp` datetime NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `usuario_id` (`usuario_id`),
  CONSTRAINT `direcciones_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `direcciones`
--
LOCK TABLES `direcciones` WRITE;
/*!40000 ALTER TABLE `direcciones` DISABLE KEYS */;
/*!40000 ALTER TABLE `direcciones` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `formas_de_pagos`
--
DROP TABLE IF EXISTS `formas_de_pagos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `formas_de_pagos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `borrado` tinyint(1) DEFAULT 0,
  `create_timestamp` datetime NOT NULL,
  `update_timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `formas_de_pagos`
--
LOCK TABLES `formas_de_pagos` WRITE;
/*!40000 ALTER TABLE `formas_de_pagos` DISABLE KEYS */;
/*!40000 ALTER TABLE `formas_de_pagos` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `pedidos`
--
DROP TABLE IF EXISTS `pedidos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` int(11) NOT NULL,
  `fecha` datetime DEFAULT '2021-10-16 16:05:58',
  `direccion` varchar(255) DEFAULT NULL COMMENT 'Registra la dirección del usuario al momento del pedido',
  `estado` varchar(255) DEFAULT 'PEN',
  `monto_total` decimal(16, 2) DEFAULT 0.00,
  `anulado` tinyint(1) DEFAULT 0,
  `create_timestamp` datetime NOT NULL,
  `update_timestamp` datetime NOT NULL,
  `usuario_id` int(11) DEFAULT NULL,
  `direccione_id` int(11) DEFAULT NULL,
  `formas_de_pago_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `numero` (`numero`),
  KEY `usuario_id` (`usuario_id`),
  KEY `direccione_id` (`direccione_id`),
  KEY `formas_de_pago_id` (`formas_de_pago_id`),
  CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`direccione_id`) REFERENCES `direcciones` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    CONSTRAINT `pedidos_ibfk_3` FOREIGN KEY (`formas_de_pago_id`) REFERENCES `formas_de_pagos` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `pedidos`
--
LOCK TABLES `pedidos` WRITE;
/*!40000 ALTER TABLE `pedidos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `pedidos_productos`
--
DROP TABLE IF EXISTS `pedidos_productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedidos_productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pedido_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT 0,
  `create_timestamp` datetime NOT NULL,
  `update_timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `pedido_id` (`pedido_id`),
  KEY `producto_id` (`producto_id`),
  CONSTRAINT `pedidos_productos_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE,
    CONSTRAINT `pedidos_productos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`) ON DELETE
  SET
    NULL ON UPDATE CASCADE
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `pedidos_productos`
--
LOCK TABLES `pedidos_productos` WRITE;
/*!40000 ALTER TABLE `pedidos_productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `pedidos_productos` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `productos`
--
DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `productos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(255) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `precio_venta` decimal(16, 2) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `borrado` tinyint(1) DEFAULT 0,
  `create_timestamp` datetime NOT NULL,
  `update_timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `codigo` (`codigo`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `productos`
--
LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Table structure for table `usuarios`
--
DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `telefono` varchar(255) DEFAULT NULL,
  `direccion_envio` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `admin` tinyint(1) DEFAULT 0,
  `borrado` tinyint(1) DEFAULT 0,
  `suspendido` tinyint(1) DEFAULT 0,
  `create_timestamp` datetime NOT NULL,
  `update_timestamp` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;
--
-- Dumping data for table `usuarios`
--
LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
--
-- Dumping routines for database 'aca_sp4'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;