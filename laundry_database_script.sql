CREATE DATABASE  IF NOT EXISTS `db_laundry` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_vietnamese_ci */;
USE `db_laundry`;
-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: db_laundry
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `idcart` int(11) NOT NULL AUTO_INCREMENT,
  `idcustomer` int(11) DEFAULT NULL,
  `idservice` int(11) DEFAULT NULL,
  `number` int(11) DEFAULT '1',
  PRIMARY KEY (`idcart`),
  KEY `FK_CA_CU_idx` (`idcustomer`),
  KEY `FK_CA_SE_idx` (`idservice`),
  CONSTRAINT `FK_CA_CU` FOREIGN KEY (`idcustomer`) REFERENCES `customer` (`idcustomer`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_CA_SE` FOREIGN KEY (`idservice`) REFERENCES `service` (`idservice`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `idcustomer` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `phonenumber` varchar(12) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `address` varchar(256) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `email` varchar(256) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL DEFAULT '1234567890',
  `status` int(11) DEFAULT '1',
  `isAdmin` int(11) DEFAULT '0',
  PRIMARY KEY (`idcustomer`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Lê Hoàng Khanh Nguyên ','123478909','ABC','ikdskajjfjjj@gmail.com','1234567890',1,0),(2,'Lăng Thảo Thảo','823973242','ABC','ksjkjalfwij@gmail.com','1234567890',1,0),(3,'Nguyễn Minh Quang','712731994','ABC','jhsdausjd@gmail.com','1234567890',1,0),(4,'Lê Hoài Phương','828399493','ABC','jkdi8yedj@gmail.com','1234567890',1,0),(5,'Bành Hảo Toàn','839828239','ABC','9ieifesieh@gmail.com','1234567890',1,0);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `idorder` int(11) NOT NULL AUTO_INCREMENT,
  `idcustomer` int(11) NOT NULL,
  `totalprice` int(11) DEFAULT '0',
  `address` varchar(256) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `phonenumber` varchar(12) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  PRIMARY KEY (`idorder`),
  KEY `FK_ORDER_CUSTOMER_idx` (`idcustomer`),
  CONSTRAINT `FK_ORDER_CUSTOMER` FOREIGN KEY (`idcustomer`) REFERENCES `customer` (`idcustomer`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,1,0,NULL,NULL),(2,1,0,NULL,NULL),(3,2,0,NULL,NULL),(4,3,0,NULL,NULL),(5,4,0,NULL,NULL);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orderdetail` (
  `idorder` int(11) NOT NULL,
  `idservice` int(11) NOT NULL,
  `number` int(11) DEFAULT '1',
  PRIMARY KEY (`idorder`,`idservice`),
  KEY `FK_DETAIL_SERVICE_idx` (`idservice`),
  CONSTRAINT `FK_DETAIL_ORDER` FOREIGN KEY (`idorder`) REFERENCES `order` (`idorder`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_DETAIL_SERVICE` FOREIGN KEY (`idservice`) REFERENCES `service` (`idservice`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orderdetail`
--

LOCK TABLES `orderdetail` WRITE;
/*!40000 ALTER TABLE `orderdetail` DISABLE KEYS */;
INSERT INTO `orderdetail` VALUES (1,1,1),(1,2,1),(1,3,1),(1,4,1),(1,5,1);
/*!40000 ALTER TABLE `orderdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `idservice` int(11) NOT NULL AUTO_INCREMENT,
  `servicename` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  `description` varchar(45) COLLATE utf8mb4_vietnamese_ci DEFAULT '"No information"',
  `price` int(11) DEFAULT '0',
  `idtype` int(11) NOT NULL,
  `rating` double DEFAULT '0',
  `image` varchar(256) COLLATE utf8mb4_vietnamese_ci DEFAULT NULL,
  `availability` int(11) DEFAULT '1',
  `totalpurchase` int(11) DEFAULT '0',
  PRIMARY KEY (`idservice`),
  KEY `FK_SERVICE_TYPE_idx` (`idtype`),
  CONSTRAINT `FK_SERVICE_TYPE` FOREIGN KEY (`idtype`) REFERENCES `type` (`idtype`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (1,'Inspection and Sorting','\"No information\"',10000,1,0,'/image/cleanings/dry/dry_sort.jpg',1,0),(2,'Stain removal','\"No information\"',20000,1,0,'/image/cleanings/dry/dry_remove.jpg',1,0),(3,'Dry cleaning','\"No information\"',50000,1,0,'/image/cleanings/dry/dry_clean.jpg',1,0),(4,'Normal temperature Drying','\"No information\"',10000,1,0,'/image/cleanings/dry/dry_dry.jpg',1,0),(5,'Pressing and Finishing','\"No information\"',10000,1,0,'/image/cleanings/dry/dry_press.jpg',1,0),(6,'Packaging','\"No information\"',10000,1,0,'/image/cleanings/dry/dry_package.jpg',1,0),(7,'Inspection and Sorting','\"No information\"',10000,2,0,'/image/cleanings/laundry/laundry_sort.jpg',1,0),(8,'Stain removal','\"No information\"',20000,2,0,'/image/cleanings/laundry/laundry_remove.jpg',1,0),(9,'Washing','\"No information\"',30000,2,0,'/image/cleanings/laundry/laundry_wash.jpg',1,0),(10,'Hot air Drying','\"No information\"',20000,2,0,'/image/cleanings/laundry/laundry_dry.jpg',1,0),(11,'Ironing and Finishing','\"No information\"',10000,2,0,'/image/cleanings/laundry/laundry_iron.jpg',1,0),(12,'Packaging','\"No information\"',10000,2,0,'/image/cleanings/laundry/laundry_package.jpg',1,0),(13,'Inspection and Sorting','\"No information\"',10000,3,0,'/image/cleanings/shoes/shoes_inspect.jpg',1,0),(14,'Stain removal','\"No information\"',20000,3,0,'/image/cleanings/shoes/shoes_remove.jpg',1,0),(15,'Soft cleaning','\"No information\"',50000,3,0,'/image/cleanings/shoes/shoes_clean.webp',1,0),(16,'Normal temperature Drying','\"No information\"',10000,3,0,'/image/cleanings/shoes/shoes_dry.jpg',1,0),(17,'Pressing and Finishing','\"No information\"',10000,3,0,'/image/cleanings/shoes/shoes_press.jpg',1,0),(18,'Packaging','\"No information\"',10000,3,0,'/image/cleanings/shoes/shoes_package.jpg',1,0),(19,'Inspection and Sorting','\"No information\"',10000,5,0,'/image/cleanings/stuffed/stuffed_sort.jpg',1,0),(20,'Stain removal','\"No information\"',20000,5,0,'/image/cleanings/stuffed/stuffed_remove.jpg',1,0),(21,'Soft cleaning','\"No information\"',50000,5,0,'/image/cleanings/stuffed/stuffed_wash.jpg',1,0),(22,'Normal temperature Drying','\"No information\"',10000,5,0,'/image/cleanings/stuffed/stuffed_dry.jpg',1,0),(23,'Pressing and Finishing','\"No information\"',10000,5,0,'/image/cleanings/stuffed/stuffed_press.jpg',1,0),(24,'Packaging','\"No information\"',10000,5,0,'/image/cleanings/stuffed/stuffed_package.jpg',1,0),(25,'Inspection and Preparing tools','\"No information\"',50000,4,0,'/image/cleanings/furniture/furniture_tools.jpg',1,0),(26,'Stain removal','\"No information\"',20000,4,0,'/image/cleanings/furniture/furniture_remove.jpg',1,0),(27,'Surface cleaning','\"No information\"',50000,4,0,'/image/cleanings/furniture/furniture_clean.jpg',1,0),(28,'New coating','\"No information\"',30000,4,0,'/image/cleanings/furniture/furniture_coat.jpg',1,0),(29,'Sanitization','\"No information\"',20000,4,0,'/image/cleanings/furniture/furniture_sanitize.jpg',1,0),(30,'Hot air Drying','\"No information\"',20000,4,0,'/image/cleanings/furniture/furniture_dry.jpg',1,0);
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type`
--

DROP TABLE IF EXISTS `type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type` (
  `idtype` int(11) NOT NULL AUTO_INCREMENT,
  `typename` varchar(100) COLLATE utf8mb4_vietnamese_ci NOT NULL,
  PRIMARY KEY (`idtype`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_vietnamese_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type`
--

LOCK TABLES `type` WRITE;
/*!40000 ALTER TABLE `type` DISABLE KEYS */;
INSERT INTO `type` VALUES (1,'Dry cleaning'),(2,'Laundry cleaning'),(3,'Shoes cleaning'),(4,'Furniture cleaning'),(5,'Stuffed dolls cleaning');
/*!40000 ALTER TABLE `type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'db_laundry'
--

--
-- Dumping routines for database 'db_laundry'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-01-02 15:24:24
