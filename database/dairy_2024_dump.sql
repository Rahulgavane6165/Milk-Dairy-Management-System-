-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: localhost    Database: dairy_2024
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection` (
  `id` char(36) NOT NULL,
  `user_id` char(36) NOT NULL,
  `milk_type` enum('cow','buffalo','sheep','cattle','other') NOT NULL,
  `fat` decimal(5,2) NOT NULL,
  `quantity` decimal(10,2) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `collection_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
INSERT INTO `collection` VALUES ('2c92c334-a893-468b-b911-25c35736780b','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','sheep',4.80,12.00,1032.00,'2024-09-08','2024-09-08 16:49:46','2024-09-08 16:49:46'),('37116325-7554-4790-a424-2085fb4ba5fc','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','cow',4.80,10.00,760.00,'2024-09-08','2024-09-08 16:13:15','2024-09-08 16:13:15'),('3b3c004c-1f26-499e-a3a6-7a18e7c51e2d','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','sheep',4.80,12.00,1032.00,'2024-09-08','2024-09-08 16:51:33','2024-09-08 16:51:33'),('3f03d8c7-f081-4ba3-a887-5fa3d78689af','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','cow',3.60,100.00,6400.00,'2024-09-08','2024-09-08 17:39:38','2024-09-08 17:39:38'),('61420db4-02a2-4983-88bd-d2a31b62d11b','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','cow',3.60,12.00,768.00,'2024-09-08','2024-09-08 17:07:53','2024-09-08 17:07:53'),('77768839-da69-4274-bd18-5a12fde82728','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','sheep',4.80,12.00,1032.00,'2024-09-08','2024-09-08 16:52:55','2024-09-08 16:52:55'),('805defef-3339-475a-8c6d-e50dd8f0fa45','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','cow',3.60,12.00,768.00,'2024-09-08','2024-09-08 17:27:56','2024-09-08 17:27:56'),('ddd9134b-cd9e-410d-b4f4-691ed0699467','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','sheep',4.80,12.00,1032.00,'2024-09-08','2024-09-08 16:54:56','2024-09-08 16:54:56'),('e2bb9ee8-798a-49b7-a500-41303704fb20','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','cow',3.60,12.00,768.00,'2024-09-08','2024-09-08 17:31:03','2024-09-08 17:31:03'),('f875bbd4-e9bd-417e-ae97-ce3662103665','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','sheep',4.80,12.00,1032.00,'2024-09-08','2024-09-08 16:50:58','2024-09-08 16:50:58');
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `milkprice`
--

DROP TABLE IF EXISTS `milkprice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `milkprice` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `fat` decimal(5,2) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `milk_type` enum('cow','buffalo','sheep','cattle','other') NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `milkprice`
--

LOCK TABLES `milkprice` WRITE;
/*!40000 ALTER TABLE `milkprice` DISABLE KEYS */;
INSERT INTO `milkprice` VALUES ('baf4264b-6950-11ef-aa0c-00ffa31b0d70',2.20,50.00,'cow','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf43d79-6950-11ef-aa0c-00ffa31b0d70',2.20,55.00,'buffalo','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf440bd-6950-11ef-aa0c-00ffa31b0d70',2.20,60.00,'sheep','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf4417d-6950-11ef-aa0c-00ffa31b0d70',2.20,65.00,'cattle','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf44222-6950-11ef-aa0c-00ffa31b0d70',2.20,70.00,'other','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf4e350-6950-11ef-aa0c-00ffa31b0d70',2.40,52.00,'cow','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf53f69-6950-11ef-aa0c-00ffa31b0d70',2.40,57.00,'buffalo','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf54140-6950-11ef-aa0c-00ffa31b0d70',2.40,62.00,'sheep','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf541ec-6950-11ef-aa0c-00ffa31b0d70',2.40,67.00,'cattle','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf5427f-6950-11ef-aa0c-00ffa31b0d70',2.40,72.00,'other','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf5cc74-6950-11ef-aa0c-00ffa31b0d70',2.60,54.00,'cow','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf5d372-6950-11ef-aa0c-00ffa31b0d70',2.60,59.00,'buffalo','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf5d458-6950-11ef-aa0c-00ffa31b0d70',2.60,64.00,'sheep','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf5d4eb-6950-11ef-aa0c-00ffa31b0d70',2.60,69.00,'cattle','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf5d56b-6950-11ef-aa0c-00ffa31b0d70',2.60,74.00,'other','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf66387-6950-11ef-aa0c-00ffa31b0d70',2.80,56.00,'cow','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf68367-6950-11ef-aa0c-00ffa31b0d70',2.80,61.00,'buffalo','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf68564-6950-11ef-aa0c-00ffa31b0d70',2.80,66.00,'sheep','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf6860b-6950-11ef-aa0c-00ffa31b0d70',2.80,71.00,'cattle','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf68691-6950-11ef-aa0c-00ffa31b0d70',2.80,76.00,'other','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf6f0c1-6950-11ef-aa0c-00ffa31b0d70',3.00,58.00,'cow','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf6f61b-6950-11ef-aa0c-00ffa31b0d70',3.00,63.00,'buffalo','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf6f6e6-6950-11ef-aa0c-00ffa31b0d70',3.00,68.00,'sheep','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf6f7a5-6950-11ef-aa0c-00ffa31b0d70',3.00,73.00,'cattle','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf6f833-6950-11ef-aa0c-00ffa31b0d70',3.00,78.00,'other','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf7651d-6950-11ef-aa0c-00ffa31b0d70',3.20,60.00,'cow','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf76be8-6950-11ef-aa0c-00ffa31b0d70',3.20,65.00,'buffalo','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf76cae-6950-11ef-aa0c-00ffa31b0d70',3.20,70.00,'sheep','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf76cf5-6950-11ef-aa0c-00ffa31b0d70',3.20,75.00,'cattle','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf76d2f-6950-11ef-aa0c-00ffa31b0d70',3.20,80.00,'other','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf7e86f-6950-11ef-aa0c-00ffa31b0d70',3.40,62.00,'cow','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf7f947-6950-11ef-aa0c-00ffa31b0d70',3.40,67.00,'buffalo','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf7fabe-6950-11ef-aa0c-00ffa31b0d70',3.40,72.00,'sheep','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf7fb01-6950-11ef-aa0c-00ffa31b0d70',3.40,77.00,'cattle','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf7fb45-6950-11ef-aa0c-00ffa31b0d70',3.40,82.00,'other','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf8710f-6950-11ef-aa0c-00ffa31b0d70',3.60,64.00,'cow','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf87a36-6950-11ef-aa0c-00ffa31b0d70',3.60,69.00,'buffalo','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf87b1a-6950-11ef-aa0c-00ffa31b0d70',3.60,74.00,'sheep','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf87ba0-6950-11ef-aa0c-00ffa31b0d70',3.60,79.00,'cattle','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf87c1f-6950-11ef-aa0c-00ffa31b0d70',3.60,84.00,'other','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf905df-6950-11ef-aa0c-00ffa31b0d70',3.80,66.00,'cow','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf90cad-6950-11ef-aa0c-00ffa31b0d70',3.80,71.00,'buffalo','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf90d87-6950-11ef-aa0c-00ffa31b0d70',3.80,76.00,'sheep','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf90e15-6950-11ef-aa0c-00ffa31b0d70',3.80,81.00,'cattle','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf90e9c-6950-11ef-aa0c-00ffa31b0d70',3.80,86.00,'other','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf9a605-6950-11ef-aa0c-00ffa31b0d70',4.00,68.00,'cow','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf9ad51-6950-11ef-aa0c-00ffa31b0d70',4.00,73.00,'buffalo','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf9ae98-6950-11ef-aa0c-00ffa31b0d70',4.00,78.00,'sheep','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf9af2c-6950-11ef-aa0c-00ffa31b0d70',4.00,83.00,'cattle','2024-09-02 17:28:12','2024-09-02 17:28:12'),('baf9afb0-6950-11ef-aa0c-00ffa31b0d70',4.00,88.00,'other','2024-09-02 17:28:12','2024-09-02 17:28:12'),('ff7297ef-6950-11ef-aa0c-00ffa31b0d70',4.20,70.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff729d3d-6950-11ef-aa0c-00ffa31b0d70',4.20,75.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff729e12-6950-11ef-aa0c-00ffa31b0d70',4.20,80.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff729ea0-6950-11ef-aa0c-00ffa31b0d70',4.20,85.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff729f25-6950-11ef-aa0c-00ffa31b0d70',4.20,90.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff731eed-6950-11ef-aa0c-00ffa31b0d70',4.40,72.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7323ac-6950-11ef-aa0c-00ffa31b0d70',4.40,77.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff732ed9-6950-11ef-aa0c-00ffa31b0d70',4.40,82.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff732fd9-6950-11ef-aa0c-00ffa31b0d70',4.40,87.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff73305f-6950-11ef-aa0c-00ffa31b0d70',4.40,92.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff73a1fb-6950-11ef-aa0c-00ffa31b0d70',4.60,74.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff73a58f-6950-11ef-aa0c-00ffa31b0d70',4.60,79.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff73a5fa-6950-11ef-aa0c-00ffa31b0d70',4.60,84.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff73a637-6950-11ef-aa0c-00ffa31b0d70',4.60,89.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff73a678-6950-11ef-aa0c-00ffa31b0d70',4.60,94.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff73fdf2-6950-11ef-aa0c-00ffa31b0d70',4.80,76.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7413bd-6950-11ef-aa0c-00ffa31b0d70',4.80,81.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff741481-6950-11ef-aa0c-00ffa31b0d70',4.80,86.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7414ce-6950-11ef-aa0c-00ffa31b0d70',4.80,91.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff741507-6950-11ef-aa0c-00ffa31b0d70',4.80,96.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff747fe6-6950-11ef-aa0c-00ffa31b0d70',5.00,78.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7490b1-6950-11ef-aa0c-00ffa31b0d70',5.00,83.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff749166-6950-11ef-aa0c-00ffa31b0d70',5.00,88.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7491a4-6950-11ef-aa0c-00ffa31b0d70',5.00,93.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7491e3-6950-11ef-aa0c-00ffa31b0d70',5.00,98.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff74e4bb-6950-11ef-aa0c-00ffa31b0d70',5.20,80.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff74e9a7-6950-11ef-aa0c-00ffa31b0d70',5.20,85.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff74ea6e-6950-11ef-aa0c-00ffa31b0d70',5.20,90.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff74eaf5-6950-11ef-aa0c-00ffa31b0d70',5.20,95.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff74eb78-6950-11ef-aa0c-00ffa31b0d70',5.20,100.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff753ce9-6950-11ef-aa0c-00ffa31b0d70',5.40,82.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7552db-6950-11ef-aa0c-00ffa31b0d70',5.40,87.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7553ab-6950-11ef-aa0c-00ffa31b0d70',5.40,92.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7553ef-6950-11ef-aa0c-00ffa31b0d70',5.40,97.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff755434-6950-11ef-aa0c-00ffa31b0d70',5.40,102.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff75cb4f-6950-11ef-aa0c-00ffa31b0d70',5.60,84.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff75d03e-6950-11ef-aa0c-00ffa31b0d70',5.60,89.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff75d153-6950-11ef-aa0c-00ffa31b0d70',5.60,94.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff75d1f5-6950-11ef-aa0c-00ffa31b0d70',5.60,99.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff75d276-6950-11ef-aa0c-00ffa31b0d70',5.60,104.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff767ba6-6950-11ef-aa0c-00ffa31b0d70',5.80,86.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff76802a-6950-11ef-aa0c-00ffa31b0d70',5.80,91.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff76809a-6950-11ef-aa0c-00ffa31b0d70',5.80,96.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7680d8-6950-11ef-aa0c-00ffa31b0d70',5.80,101.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff768118-6950-11ef-aa0c-00ffa31b0d70',5.80,106.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff773225-6950-11ef-aa0c-00ffa31b0d70',6.00,88.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff77374b-6950-11ef-aa0c-00ffa31b0d70',6.00,93.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff773815-6950-11ef-aa0c-00ffa31b0d70',6.00,98.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff77389c-6950-11ef-aa0c-00ffa31b0d70',6.00,103.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff77391a-6950-11ef-aa0c-00ffa31b0d70',6.00,108.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff77e50f-6950-11ef-aa0c-00ffa31b0d70',6.20,90.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff77eb3d-6950-11ef-aa0c-00ffa31b0d70',6.20,95.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff77ec03-6950-11ef-aa0c-00ffa31b0d70',6.20,100.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff77ec45-6950-11ef-aa0c-00ffa31b0d70',6.20,105.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff77ec83-6950-11ef-aa0c-00ffa31b0d70',6.20,110.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff787d06-6950-11ef-aa0c-00ffa31b0d70',6.40,92.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7892b1-6950-11ef-aa0c-00ffa31b0d70',6.40,97.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff789423-6950-11ef-aa0c-00ffa31b0d70',6.40,102.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7894cf-6950-11ef-aa0c-00ffa31b0d70',6.40,107.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff789554-6950-11ef-aa0c-00ffa31b0d70',6.40,112.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff790fcb-6950-11ef-aa0c-00ffa31b0d70',6.60,94.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff79153c-6950-11ef-aa0c-00ffa31b0d70',6.60,99.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7915c0-6950-11ef-aa0c-00ffa31b0d70',6.60,104.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7915fe-6950-11ef-aa0c-00ffa31b0d70',6.60,109.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff79163a-6950-11ef-aa0c-00ffa31b0d70',6.60,114.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff79e914-6950-11ef-aa0c-00ffa31b0d70',6.80,96.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff79ee53-6950-11ef-aa0c-00ffa31b0d70',6.80,101.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff79eece-6950-11ef-aa0c-00ffa31b0d70',6.80,106.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff79ef14-6950-11ef-aa0c-00ffa31b0d70',6.80,111.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff79ef56-6950-11ef-aa0c-00ffa31b0d70',6.80,116.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7a8a13-6950-11ef-aa0c-00ffa31b0d70',7.00,98.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7a95c2-6950-11ef-aa0c-00ffa31b0d70',7.00,103.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7a96e0-6950-11ef-aa0c-00ffa31b0d70',7.00,108.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7a9770-6950-11ef-aa0c-00ffa31b0d70',7.00,113.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7a97f8-6950-11ef-aa0c-00ffa31b0d70',7.00,118.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7b494d-6950-11ef-aa0c-00ffa31b0d70',7.20,100.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7b4de8-6950-11ef-aa0c-00ffa31b0d70',7.20,105.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7b4e57-6950-11ef-aa0c-00ffa31b0d70',7.20,110.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7b4ec8-6950-11ef-aa0c-00ffa31b0d70',7.20,115.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7b4f2a-6950-11ef-aa0c-00ffa31b0d70',7.20,120.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7c37c4-6950-11ef-aa0c-00ffa31b0d70',7.40,102.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7c4735-6950-11ef-aa0c-00ffa31b0d70',7.40,107.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7c4f32-6950-11ef-aa0c-00ffa31b0d70',7.40,112.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7c4fd8-6950-11ef-aa0c-00ffa31b0d70',7.40,117.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7c505d-6950-11ef-aa0c-00ffa31b0d70',7.40,122.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7cf744-6950-11ef-aa0c-00ffa31b0d70',7.60,104.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7cfcfc-6950-11ef-aa0c-00ffa31b0d70',7.60,109.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7cfdce-6950-11ef-aa0c-00ffa31b0d70',7.60,114.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7cfe56-6950-11ef-aa0c-00ffa31b0d70',7.60,119.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7cfed5-6950-11ef-aa0c-00ffa31b0d70',7.60,124.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7d6d2d-6950-11ef-aa0c-00ffa31b0d70',7.80,106.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7d72fb-6950-11ef-aa0c-00ffa31b0d70',7.80,111.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7d73c3-6950-11ef-aa0c-00ffa31b0d70',7.80,116.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7d746d-6950-11ef-aa0c-00ffa31b0d70',7.80,121.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7d74f4-6950-11ef-aa0c-00ffa31b0d70',7.80,126.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7e1bd7-6950-11ef-aa0c-00ffa31b0d70',8.00,108.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7e25d0-6950-11ef-aa0c-00ffa31b0d70',8.00,113.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7e26df-6950-11ef-aa0c-00ffa31b0d70',8.00,118.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7e27b5-6950-11ef-aa0c-00ffa31b0d70',8.00,123.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7e284d-6950-11ef-aa0c-00ffa31b0d70',8.00,128.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7ecb96-6950-11ef-aa0c-00ffa31b0d70',8.20,110.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7ed21d-6950-11ef-aa0c-00ffa31b0d70',8.20,115.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7ed2fa-6950-11ef-aa0c-00ffa31b0d70',8.20,120.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7ed392-6950-11ef-aa0c-00ffa31b0d70',8.20,125.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7ed413-6950-11ef-aa0c-00ffa31b0d70',8.20,130.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7f6931-6950-11ef-aa0c-00ffa31b0d70',8.40,112.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7f8a66-6950-11ef-aa0c-00ffa31b0d70',8.40,117.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7f8c0a-6950-11ef-aa0c-00ffa31b0d70',8.40,122.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7f8c9f-6950-11ef-aa0c-00ffa31b0d70',8.40,127.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff7f8d3b-6950-11ef-aa0c-00ffa31b0d70',8.40,132.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff80153b-6950-11ef-aa0c-00ffa31b0d70',8.60,114.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff801baf-6950-11ef-aa0c-00ffa31b0d70',8.60,119.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff801cb3-6950-11ef-aa0c-00ffa31b0d70',8.60,124.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff801d3c-6950-11ef-aa0c-00ffa31b0d70',8.60,129.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff801dc1-6950-11ef-aa0c-00ffa31b0d70',8.60,134.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff80a360-6950-11ef-aa0c-00ffa31b0d70',8.80,116.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff80a928-6950-11ef-aa0c-00ffa31b0d70',8.80,121.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff80a9f6-6950-11ef-aa0c-00ffa31b0d70',8.80,126.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff80aa81-6950-11ef-aa0c-00ffa31b0d70',8.80,131.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff80ab40-6950-11ef-aa0c-00ffa31b0d70',8.80,136.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff8144a9-6950-11ef-aa0c-00ffa31b0d70',9.00,118.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff814b0c-6950-11ef-aa0c-00ffa31b0d70',9.00,123.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff814bfd-6950-11ef-aa0c-00ffa31b0d70',9.00,128.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff814c82-6950-11ef-aa0c-00ffa31b0d70',9.00,133.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff814cff-6950-11ef-aa0c-00ffa31b0d70',9.00,138.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff81b9d1-6950-11ef-aa0c-00ffa31b0d70',9.20,120.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff81bfc3-6950-11ef-aa0c-00ffa31b0d70',9.20,125.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff81c091-6950-11ef-aa0c-00ffa31b0d70',9.20,130.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff81c132-6950-11ef-aa0c-00ffa31b0d70',9.20,135.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff81c1b5-6950-11ef-aa0c-00ffa31b0d70',9.20,140.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff8255a9-6950-11ef-aa0c-00ffa31b0d70',9.40,122.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff825ca8-6950-11ef-aa0c-00ffa31b0d70',9.40,127.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff825da5-6950-11ef-aa0c-00ffa31b0d70',9.40,132.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff825e2b-6950-11ef-aa0c-00ffa31b0d70',9.40,137.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff825eb2-6950-11ef-aa0c-00ffa31b0d70',9.40,142.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff82d364-6950-11ef-aa0c-00ffa31b0d70',9.60,124.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff82d9cf-6950-11ef-aa0c-00ffa31b0d70',9.60,129.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff82db23-6950-11ef-aa0c-00ffa31b0d70',9.60,134.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff82dbc7-6950-11ef-aa0c-00ffa31b0d70',9.60,139.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff82dc9f-6950-11ef-aa0c-00ffa31b0d70',9.60,144.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff83503d-6950-11ef-aa0c-00ffa31b0d70',9.80,126.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff835689-6950-11ef-aa0c-00ffa31b0d70',9.80,131.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff8357c4-6950-11ef-aa0c-00ffa31b0d70',9.80,136.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff83585f-6950-11ef-aa0c-00ffa31b0d70',9.80,141.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff8358e9-6950-11ef-aa0c-00ffa31b0d70',9.80,146.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff83f779-6950-11ef-aa0c-00ffa31b0d70',10.00,128.00,'cow','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff83fdf3-6950-11ef-aa0c-00ffa31b0d70',10.00,133.00,'buffalo','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff83fef7-6950-11ef-aa0c-00ffa31b0d70',10.00,138.00,'sheep','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff83ff81-6950-11ef-aa0c-00ffa31b0d70',10.00,143.00,'cattle','2024-09-02 17:30:07','2024-09-02 17:30:07'),('ff840006-6950-11ef-aa0c-00ffa31b0d70',10.00,148.00,'other','2024-09-02 17:30:07','2024-09-02 17:30:07');
/*!40000 ALTER TABLE `milkprice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `category` enum('medicine','feed') NOT NULL,
  `stock_quantity` int NOT NULL DEFAULT '0',
  `image_path` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `discount` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES ('4e92c8ae-8d1f-47db-87d4-1b634d2e48b9','Product A','High-quality medicine for quick relief from common ailments. Effective and trusted by many users.',10.00,'medicine',100,'images/products/img1.png','2024-09-02 18:59:35','2024-09-02 18:59:35',5),('5f92c8ae-9d1f-48db-87d4-2b634d2e49b9','Product B','Premium feed with all essential nutrients for healthy growth.',25.00,'feed',148,'images/products/img2.png','2024-09-02 18:59:42','2024-09-10 04:45:24',10),('6g92c8ae-ad1f-49db-87d4-3b634d2e50b9','Product C','High-quality veterinary medicine for effective treatment of common diseases.',15.00,'medicine',195,'images/products/img3.png','2024-09-02 18:59:49','2024-09-08 19:42:03',8),('7h92c8ae-bd1f-40db-87d4-4b634d2e61b9','Product D','Effective feed supplement for improving livestock health.',30.00,'feed',37,'images/products/img4.png','2024-09-02 18:59:56','2024-09-08 19:42:11',12),('8i92c8ae-cd1f-51db-87d4-5b634d2e72b9','Product E','Top-quality medicine for preventive care of pets.',20.00,'medicine',120,'images/products/img5.png','2024-09-02 19:00:03','2024-09-02 19:00:03',7),('9j92c8ae-dd1f-62db-87d4-6b634d2e83b9','Product F','High-nutrient feed for optimal growth and performance.',35.00,'feed',80,'images/products/img6.png','2024-09-02 19:00:09','2024-09-02 19:00:09',15),('a092c8ae-ed1f-73db-87d4-7b634d2e94b9','Product G','Medicinal feed to support immune system health.',18.00,'feed',90,'images/products/img7.png','2024-09-02 19:00:16','2024-09-02 19:00:16',9),('b192c8ae-fd1f-84db-87d4-8b634d2e05b9','Product H','Specialized medicine for long-term health benefits.',45.00,'medicine',60,'images/products/img8.png','2024-09-02 19:00:23','2024-09-02 19:00:23',20);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resetpassword`
--

DROP TABLE IF EXISTS `resetpassword`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resetpassword` (
  `id` char(36) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expiresAt` datetime NOT NULL,
  `userId` char(36) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token` (`token`),
  KEY `userId` (`userId`),
  CONSTRAINT `resetpassword_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resetpassword`
--

LOCK TABLES `resetpassword` WRITE;
/*!40000 ALTER TABLE `resetpassword` DISABLE KEYS */;
INSERT INTO `resetpassword` VALUES ('bc18fcbe-3471-4fcb-8323-234a1c66337e','ea9166912a76892c7c3e9104789f799811b375644b2561c8ffb468e570f727c7','2024-09-09 22:58:26','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','2024-09-09 21:58:26','2024-09-09 21:58:26');
/*!40000 ALTER TABLE `resetpassword` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salesdata`
--

DROP TABLE IF EXISTS `salesdata`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salesdata` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `user_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `product_id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `quantity_sold` int NOT NULL,
  `sale_price` decimal(10,2) NOT NULL,
  `sale_date` date NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updateddAt` datetime DEFAULT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salesdata`
--

LOCK TABLES `salesdata` WRITE;
/*!40000 ALTER TABLE `salesdata` DISABLE KEYS */;
INSERT INTO `salesdata` VALUES ('271e15bf-ccf6-4697-a3a9-22a944efa2e3','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','6g92c8ae-ad1f-49db-87d4-3b634d2e50b9',1,15.00,'2024-09-09','2024-09-08 19:42:03',NULL,'2024-09-08 19:42:03'),('6b852056-68f9-4fa4-96d8-551d0cbdbc94','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','5f92c8ae-9d1f-48db-87d4-2b634d2e49b9',1,25.00,'2024-09-10','2024-09-10 04:45:24',NULL,'2024-09-10 04:45:24'),('a67c6bc6-22d7-4049-b13c-8c34985eb9bd','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','7h92c8ae-bd1f-40db-87d4-4b634d2e61b9',2,30.00,'2024-09-09','2024-09-08 19:42:11',NULL,'2024-09-08 19:42:11'),('ca956ff1-1bca-4fab-aef4-16c0ab4b2efd','b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','5f92c8ae-9d1f-48db-87d4-2b634d2e49b9',1,25.00,'2024-09-09','2024-09-08 18:32:07',NULL,'2024-09-08 18:32:07');
/*!40000 ALTER TABLE `salesdata` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` char(36) NOT NULL DEFAULT (uuid()),
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `adhar_number` char(12) NOT NULL,
  `bank_account_number` varchar(20) NOT NULL,
  `ifsc_code` varchar(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `userType` enum('admin','farmer','vendor') NOT NULL,
  `createdAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `adhar_number` (`adhar_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('b3a6a251-0e31-4ffb-aeac-c1e003e4e0a6','RAHUL MADEV GAVANE1','rahulgavane65@gmail.com','DHABADHABAHATTI','123412341234','1234567893','SBIN0000259','$2a$10$6I9efIsGwDgNjuGVAW/fpelL3w1ssBz7C13bDgOdn.NWxyYqtZOhK','farmer','2024-09-02 06:10:06','2024-09-10 05:07:05');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-09-10 21:19:20
