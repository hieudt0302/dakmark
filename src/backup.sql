-- MySQL dump 10.13  Distrib 5.7.19, for Linux (x86_64)
--
-- Host: localhost    Database: dakmark
-- ------------------------------------------------------
-- Server version	5.7.19-0ubuntu0.17.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `book_addresses`
--

DROP TABLE IF EXISTS `book_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `book_addresses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `company` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address1` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address2` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `district` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state_province` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `zipcode` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fax` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `book_addresses_user_id_foreign` (`user_id`),
  CONSTRAINT `book_addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `book_addresses`
--

LOCK TABLES `book_addresses` WRITE;
/*!40000 ALTER TABLE `book_addresses` DISABLE KEYS */;
INSERT INTO `book_addresses` VALUES (1,'DakMark','Min','Anh','02 Quang Trung','','Hải Châu','Đà Nẵng','Việt Nam','','123456','+84 123 456 789','','admin@admin.com',1,'2017-10-19 18:38:32','2017-11-01 16:08:14',NULL),(2,'Cty Bravo Hex 3','Tuan s','Le 2','address 1 3','address 2 3','Hai Chau 3','Da Nang 4','Việt Nam 3','Mien Trung 4','5500003','09891831933','33333333333','tuanlm@jcs-corp.coms',1,'2017-10-20 04:24:51','2017-11-04 16:22:09','2017-11-04 16:22:09'),(3,'','Thắng','Lê','','','Liên Chiểu','Đà Nẵng','','','','0935334983','','',2,'2017-10-22 15:46:53','2017-10-22 15:46:53',NULL);
/*!40000 ALTER TABLE `book_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int(10) unsigned NOT NULL DEFAULT '0',
  `enabled` tinyint(1) NOT NULL DEFAULT '1',
  `is_visible` tinyint(1) NOT NULL DEFAULT '1',
  `is_menu_avaiable` tinyint(1) NOT NULL DEFAULT '0',
  `image_icon` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `categories_parent_id_foreign` (`parent_id`),
  CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Posts','posts',0,1,1,1,'',NULL,'2017-10-19 18:38:32','2017-10-26 07:05:40',NULL),(2,'Ordering','products',1,1,1,1,'',NULL,'2017-10-19 18:38:32','2017-11-07 04:26:16',NULL),(3,'Cà phê','ca-phe',0,1,1,1,'',2,'2017-10-19 18:38:32','2017-12-13 04:30:37','2017-12-13 04:30:37'),(4,'Hồ tiêu','ho-tieu',2,1,1,1,'',2,'2017-10-19 18:38:32','2017-10-20 03:23:21',NULL),(5,'Cộng đồng','community',1,1,1,1,'',1,'2017-10-19 18:38:32','2017-10-28 05:52:24',NULL),(6,'Hoạt động','activities',2,1,1,1,'',1,'2017-10-20 03:06:06','2017-12-07 03:52:50','2017-12-07 03:52:50'),(7,'Cacao','ca-cao',1,1,1,1,'',2,'2017-10-20 03:09:34','2017-12-13 04:30:43','2017-12-13 04:30:43'),(8,'Nông sản khác','others',3,1,1,1,'',2,'2017-10-20 03:10:56','2017-10-20 04:23:42',NULL),(9,'Sản phẩm','product-intro',0,1,1,1,'',1,'2017-10-26 07:02:38','2017-10-26 07:02:38',NULL),(10,'dsadasdas','sssssss',0,1,1,1,'',2,'2017-11-07 15:02:42','2017-11-07 15:03:00','2017-11-07 15:03:00'),(11,'ssdasdasdasd','sadsadaczzcxzczx',0,1,1,1,'',NULL,'2017-11-07 15:17:09','2017-11-07 15:17:41','2017-11-07 15:17:41'),(12,'test menu parent','test-menu-parent',0,1,1,1,'',NULL,'2017-11-07 16:02:49','2017-11-07 16:36:37','2017-11-07 16:36:37'),(13,'menu con','menu-con',0,1,1,1,'',12,'2017-11-07 16:03:13','2017-11-07 16:36:30','2017-11-07 16:36:30'),(14,'Promotion','promotion',2,1,1,1,'',1,'2017-12-09 07:00:13','2017-12-09 07:28:02',NULL),(15,'Cà phê đặc sản','specialty-coffee',0,1,1,1,'',2,'2017-12-12 09:43:16','2017-12-13 04:31:01',NULL),(16,'Cà phê thương phẩm','commercial-coffee',0,1,1,1,'',2,'2017-12-12 09:44:13','2017-12-13 04:31:35',NULL),(17,'Galleries','galleries',0,1,1,1,'',NULL,'2017-12-23 15:46:35','2017-12-23 15:46:35',NULL),(18,'Spring','spring',0,1,1,1,'',17,'2017-12-23 15:47:23','2017-12-23 15:47:23',NULL),(19,'Summer','summer',0,1,1,1,'',17,'2017-12-23 16:21:39','2017-12-23 16:21:39',NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_translations`
--

DROP TABLE IF EXISTS `category_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category_translations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `language_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `category_translations_language_id_foreign` (`language_id`),
  KEY `category_translations_category_id_foreign` (`category_id`),
  CONSTRAINT `category_translations_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `category_translations_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_translations`
--

LOCK TABLES `category_translations` WRITE;
/*!40000 ALTER TABLE `category_translations` DISABLE KEYS */;
INSERT INTO `category_translations` VALUES (1,'Bài viết','Description',1,1,'2017-10-19 18:38:32','2017-10-26 07:05:14'),(2,'Posts','Description',2,1,'2017-10-19 18:38:32','2017-10-26 07:05:22'),(3,'Mua Hàng','Description',1,2,'2017-10-19 18:38:32','2017-12-11 10:06:29'),(4,'Ordering','Description',2,2,'2017-10-19 18:38:32','2017-11-07 04:26:34'),(5,'Cà phê','Description',1,3,'2017-10-19 18:38:32','2017-10-20 03:04:51'),(6,'Coffee','Description',2,3,'2017-10-19 18:38:32','2017-10-20 03:04:59'),(7,'Hồ tiêu','Description',1,4,'2017-10-19 18:38:32','2017-10-20 03:05:17'),(8,'Pepper','Description',2,4,'2017-10-19 18:38:32','2017-10-20 03:05:26'),(9,'Hoạt động cộng đồng','Description',1,5,'2017-10-19 18:38:32','2017-12-11 10:04:52'),(10,'Community','Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit? Uterque enim summo bono fruitur, id est voluptate barbarorum pedibu',2,5,'2017-10-19 18:38:32','2017-10-30 07:00:26'),(11,'Hoạt động',NULL,1,6,'2017-10-20 03:06:12','2017-10-26 07:06:19'),(12,'Activities',NULL,2,6,'2017-10-20 03:06:21','2017-10-26 07:06:28'),(13,'Cacao',NULL,1,7,'2017-10-20 03:09:42','2017-10-20 03:09:42'),(14,'Cocoa',NULL,2,7,'2017-10-20 03:09:49','2017-10-20 03:09:49'),(15,'Nông sản khác',NULL,1,8,'2017-10-20 03:11:05','2017-10-20 04:37:25'),(16,'Others',NULL,2,8,'2017-10-20 03:11:11','2017-10-20 03:11:11'),(17,'Sản phẩm',NULL,1,9,'2017-10-26 07:02:55','2017-10-26 07:02:55'),(18,'Our Products',NULL,2,9,'2017-10-26 07:03:03','2017-12-11 09:58:09'),(19,'产品',NULL,3,9,'2017-10-30 06:47:52','2017-10-30 06:47:52'),(20,'商品',NULL,4,9,'2017-10-30 06:48:03','2017-10-30 06:48:03'),(21,'상품',NULL,5,9,'2017-10-30 06:48:21','2017-10-30 06:48:21'),(22,'社区',NULL,3,5,'2017-10-30 06:57:27','2017-10-30 06:57:27'),(23,'共同',NULL,4,5,'2017-10-30 06:57:39','2017-10-30 06:57:39'),(24,'공동 사회',NULL,5,5,'2017-10-30 06:58:22','2017-10-30 06:58:22'),(25,'활동',NULL,5,6,'2017-10-30 06:58:59','2017-10-30 06:58:59'),(26,'活動',NULL,4,6,'2017-10-30 06:59:17','2017-10-30 06:59:17'),(27,'活动',NULL,3,6,'2017-10-30 06:59:36','2017-10-30 06:59:36'),(28,'购物',NULL,3,2,'2017-10-30 07:02:02','2017-10-30 07:02:02'),(29,'ショッピング',NULL,4,2,'2017-10-30 07:02:17','2017-10-30 07:02:17'),(30,'쇼핑',NULL,5,2,'2017-10-30 07:02:27','2017-10-30 07:02:27'),(31,'Promotion','Promotion',2,14,'2017-12-09 07:00:28','2017-12-09 07:00:28'),(32,'Khuyến Mại',NULL,1,14,'2017-12-09 07:02:12','2017-12-11 10:05:59'),(33,'キャンペーン',NULL,4,14,'2017-12-12 08:20:59','2017-12-12 08:20:59'),(34,'판매',NULL,5,14,'2017-12-12 08:21:46','2017-12-12 08:21:46'),(35,'销售',NULL,3,14,'2017-12-12 08:22:55','2017-12-12 08:22:55'),(36,'Specialty coffee','Specialty coffee',2,15,'2017-12-12 09:43:28','2017-12-12 09:43:28'),(37,'Commercial Coffee','Commercial Coffee',2,16,'2017-12-12 09:44:21','2017-12-12 09:44:21'),(38,'Cà phê đặc sản',NULL,1,15,'2017-12-13 03:54:13','2017-12-13 03:54:13'),(39,'전문 커피',NULL,5,15,'2017-12-13 03:55:52','2017-12-13 03:55:52'),(40,'名産コーヒー',NULL,4,15,'2017-12-13 03:56:25','2017-12-13 03:56:25'),(41,'特色咖啡',NULL,3,15,'2017-12-13 03:56:40','2017-12-13 03:56:40'),(42,'Cà phê thương phẩm',NULL,1,16,'2017-12-13 03:57:13','2017-12-13 03:57:13'),(43,'商业咖啡',NULL,3,16,'2017-12-13 03:57:28','2017-12-13 03:57:28'),(44,'商業コーヒー',NULL,4,16,'2017-12-13 03:57:40','2017-12-13 03:57:40'),(45,'상업용 커피',NULL,5,16,'2017-12-13 03:57:52','2017-12-13 03:57:52'),(46,'Galleries','Galleries',2,17,'2017-12-23 15:46:55','2017-12-23 15:46:55'),(47,'Galleries','Galleries',1,17,'2017-12-23 15:47:00','2017-12-23 15:47:00'),(48,'Xuân','xuân',1,18,'2017-12-23 15:47:42','2017-12-23 15:47:42'),(49,'spring','spring',2,18,'2017-12-23 15:47:48','2017-12-23 15:47:48'),(50,'Hè','Summer',1,19,'2017-12-23 16:21:51','2017-12-23 16:21:51'),(51,'Summer','Summer',2,19,'2017-12-23 16:21:56','2017-12-23 16:21:56');
/*!40000 ALTER TABLE `category_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `rate` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `website` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `approved` tinyint(1) NOT NULL DEFAULT '1',
  `parent_id` int(10) unsigned DEFAULT NULL,
  `author_id` int(10) unsigned DEFAULT NULL,
  `commentable_id` int(10) unsigned NOT NULL,
  `commentable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `comments_parent_id_foreign` (`parent_id`),
  KEY `comments_author_id_foreign` (`author_id`),
  CONSTRAINT `comments_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `comments_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (2,'Mr. Admin','Tuấn không thích cà phê sữa :)',1,'admin@admin.com',NULL,1,NULL,1,5,'App\\Models\\Product','2017-10-20 04:23:23','2017-10-20 04:23:23'),(3,'Tuan','Good  one',5,'admin@bravohex.com',NULL,1,NULL,NULL,5,'App\\Models\\Product','2017-10-20 06:46:44','2017-10-20 06:46:44'),(4,'Mr. Admin','Sản phẩm tốt bất ngờ, thật không thể tin được.',2,'admin@admin.com',NULL,1,NULL,1,1,'App\\Models\\Product','2017-10-24 06:02:29','2017-10-24 06:02:29'),(5,'Mr. Admin','Great!!!',5,'admin@admin.com',NULL,1,NULL,1,3,'App\\Models\\Product','2017-10-30 07:16:23','2017-10-30 07:16:23'),(6,'Tuan','Good one',4,'tuanlddm@jcs-corp.com',NULL,1,NULL,NULL,7,'App\\Models\\Product','2017-10-31 12:34:48','2017-10-31 12:34:48'),(8,'bravohex','good one',0,'admin@admin.com',NULL,1,NULL,NULL,2,'App\\Models\\Post','2017-10-31 14:44:37','2017-10-31 14:44:37'),(10,'Tuan','comment',5,'tuanlddm@jcs-corp.com',NULL,1,NULL,NULL,1,'App\\Models\\Product','2017-11-03 13:52:07','2017-11-03 13:52:07'),(11,'TÙNG','TÙng thích Latte',5,'nht2007@gmail.com',NULL,1,NULL,NULL,5,'App\\Models\\Product','2017-11-03 15:28:23','2017-11-03 15:28:23'),(12,'Mr. Admin','bài viết hay',0,'admin@admin.com',NULL,1,NULL,1,6,'App\\Models\\Post','2017-11-09 10:18:33','2017-11-09 10:18:33');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq_translations`
--

DROP TABLE IF EXISTS `faq_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faq_translations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `language_id` int(10) unsigned NOT NULL,
  `faq_id` int(10) unsigned NOT NULL,
  `question` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `answer` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `faq_translations_language_id_foreign` (`language_id`),
  KEY `faq_translations_faq_id_foreign` (`faq_id`),
  CONSTRAINT `faq_translations_faq_id_foreign` FOREIGN KEY (`faq_id`) REFERENCES `faqs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `faq_translations_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq_translations`
--

LOCK TABLES `faq_translations` WRITE;
/*!40000 ALTER TABLE `faq_translations` DISABLE KEYS */;
INSERT INTO `faq_translations` VALUES (1,1,1,'Thịt choá?','Mắm tôm.','2017-10-19 18:38:32','2017-10-19 18:38:32'),(2,2,1,'Who are you?','We are Dakmark foods.','2017-10-19 18:38:32','2017-10-19 18:38:32'),(3,3,1,'Hao cu su?','Lang lung treo.','2017-10-19 18:38:32','2017-10-19 18:38:32'),(4,1,4,'vi','vi','2017-10-28 07:35:43','2017-10-28 07:35:43'),(5,2,4,'en','en','2017-10-28 07:35:51','2017-10-28 07:35:51'),(6,3,4,'cn','cn','2017-10-28 07:35:58','2017-10-28 07:35:58');
/*!40000 ALTER TABLE `faq_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faqs`
--

DROP TABLE IF EXISTS `faqs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `faqs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `question` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_show` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faqs`
--

LOCK TABLES `faqs` WRITE;
/*!40000 ALTER TABLE `faqs` DISABLE KEYS */;
INSERT INTO `faqs` VALUES (1,'Thịt choá?',1,'2017-10-19 18:38:32','2017-10-19 18:38:32'),(2,'mắm tôm',0,'2017-10-28 05:22:47','2017-10-28 05:22:47'),(4,'Code cái này làm sao ta?',1,'2017-10-28 07:32:23','2017-10-28 07:32:23'),(5,'Tại hạ không ăn thịt chó',0,'2017-10-28 08:01:10','2017-10-28 08:01:10');
/*!40000 ALTER TABLE `faqs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `galleries`
--

DROP TABLE IF EXISTS `galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `galleries` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '1',
  `category_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `galleries_category_id_foreign` (`category_id`),
  CONSTRAINT `galleries_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galleries`
--

LOCK TABLES `galleries` WRITE;
/*!40000 ALTER TABLE `galleries` DISABLE KEYS */;
INSERT INTO `galleries` VALUES (1,'fix name of gallery','fix-name-of-gallery','',1,19,'2017-12-23 15:48:52','2017-12-23 16:37:45'),(6,'54454554e','54454554e','',1,18,'2017-12-23 16:42:30','2017-12-23 16:42:34');
/*!40000 ALTER TABLE `galleries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gallery_media`
--

DROP TABLE IF EXISTS `gallery_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `gallery_media` (
  `gallery_id` int(10) unsigned NOT NULL,
  `media_id` int(10) unsigned NOT NULL,
  `order` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`gallery_id`,`media_id`),
  KEY `gallery_media_media_id_foreign` (`media_id`),
  CONSTRAINT `gallery_media_gallery_id_foreign` FOREIGN KEY (`gallery_id`) REFERENCES `galleries` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `gallery_media_media_id_foreign` FOREIGN KEY (`media_id`) REFERENCES `medias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gallery_media`
--

LOCK TABLES `gallery_media` WRITE;
/*!40000 ALTER TABLE `gallery_media` DISABLE KEYS */;
INSERT INTO `gallery_media` VALUES (1,52,0),(1,53,0),(1,54,0);
/*!40000 ALTER TABLE `gallery_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info_page_translations`
--

DROP TABLE IF EXISTS `info_page_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `info_page_translations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `language_id` int(10) unsigned NOT NULL,
  `info_page_id` int(10) unsigned NOT NULL,
  `title` text COLLATE utf8mb4_unicode_ci,
  `content` text COLLATE utf8mb4_unicode_ci,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `info_page_translations_language_id_foreign` (`language_id`),
  KEY `info_page_translations_info_page_id_foreign` (`info_page_id`),
  CONSTRAINT `info_page_translations_info_page_id_foreign` FOREIGN KEY (`info_page_id`) REFERENCES `info_pages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `info_page_translations_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info_page_translations`
--

LOCK TABLES `info_page_translations` WRITE;
/*!40000 ALTER TABLE `info_page_translations` DISABLE KEYS */;
INSERT INTO `info_page_translations` VALUES (1,1,1,'Đổi trả hàng','<p>L&agrave;m thế n&agrave;o để t&igrave;m Phiếu đổi trả h&agrave;ng trực tuyến?</p>\r\n\r\n<p>Khi muốn đổi trả sản phẩm, qu&yacute; kh&aacute;ch vui l&ograve;ng v&agrave;o trang&nbsp;<a href=\"https://www.lazada.vn/customer/order/index\" target=\"_blank\">&quot;Đơn h&agrave;ng của t&ocirc;i&quot;</a>&nbsp;v&agrave; chọn mục &ldquo;ĐỔI TRẢ H&Agrave;NG&rdquo; ph&iacute;a b&ecirc;n phải để điền v&agrave;o phiếu đổi trả trực tuyến.</p>\r\n\r\n<p><strong>Lưu &yacute;:</strong>&nbsp;Mục &ldquo;ĐỔI TRẢ H&Agrave;NG&rdquo; chỉ xuất hiện khi đơn h&agrave;ng ở trạng th&aacute;i &ldquo;Đ&atilde; giao h&agrave;ng&rdquo;</p>\r\n\r\n<p><img src=\"http://vn-live-03.slatic.net/cms/faq-screenshot/return_screen-300616.png\" /></p>\r\n\r\n<p>- Qu&yacute; kh&aacute;ch n&ecirc;n tham khảo&nbsp;<a href=\"http://www.lazada.vn/helpcenter/returns-refunds/?setLang=vi#answer-faq-returnpolicy-ans\" target=\"_blank\">Ch&iacute;nh S&aacute;ch Đổi Trả H&agrave;ng</a>&nbsp;của ch&uacute;ng t&ocirc;i nhằm đảm bảo sản phẩm c&oacute; đủ điều kiện để ho&agrave;n trả.</p>\r\n\r\n<p>- C&aacute;c bước thực hiện theo hướng dẫn tại &quot;<a href=\"http://www.lazada.vn/huong-dan-doi-tra-hang-online/\" target=\"_blank\">video clip</a>&quot;.</p>\r\n\r\n<p>L&agrave;m thế n&agrave;o để biết được t&ocirc;i đ&atilde; thực hiện th&agrave;nh c&ocirc;ng y&ecirc;u cầu đổi trả trực tuyến?</p>\r\n\r\n<p>Sau khi qu&yacute; kh&aacute;ch ho&agrave;n tất c&aacute;c bước điền th&ocirc;ng tin trong &ldquo;Y&ecirc;u cầu đổi trả h&agrave;ng trực tuyến&rdquo;, m&agrave;n h&igrave;nh giao diện tr&ecirc;n website sẽ hiển thị th&ocirc;ng b&aacute;o y&ecirc;u cầu của qu&yacute; kh&aacute;ch đ&atilde; được cập nhật th&agrave;nh c&ocirc;ng.</p>\r\n\r\n<p>L&agrave;m thế n&agrave;o để kiểm tra t&igrave;nh trạng đổi trả h&agrave;ng khi gửi đổi trả qua bưu điện VNpost?</p>\r\n\r\n<p>Sau khi gửi đổi trả tại bưu điện VNpost th&agrave;nh c&ocirc;ng, qu&yacute; kh&aacute;ch sẽ nhận được m&atilde; vận đơn do VNPost cung cấp, dựa v&agrave;o m&atilde; vận đơn n&agrave;y qu&yacute; kh&aacute;ch c&oacute; thể kiểm tra t&igrave;nh trạng gửi h&agrave;ng tại www.vnpost.vn</p>\r\n\r\n<p>L&agrave;m thế n&agrave;o để kiểm tra t&igrave;nh trạng đổi trả khi y&ecirc;u cầu Lazada đến nhận h&agrave;ng đổi trả?</p>\r\n\r\n<p>Sau khi đơn vị vận chuyển của Lazada đến nhận h&agrave;ng đổi trả th&agrave;nh c&ocirc;ng, qu&yacute; kh&aacute;ch sẽ nhận được m&atilde; vận đơn từ đơn vị vận chuyển, dựa v&agrave;o m&atilde; vận đơn n&agrave;y qu&yacute; kh&aacute;ch c&oacute; thể kiểm tra t&igrave;nh trạng gửi h&agrave;ng tại website của đơn vị đ&oacute;.</p>\r\n\r\n<p>Lazada.vn c&oacute; thanh to&aacute;n tiền ph&iacute; vận chuyển cho sản phẩm đổi trả?</p>\r\n\r\n<p>Lazada.vn hỗ trợ ho&agrave;n tiền miễn ph&iacute; ph&iacute; vận chuyển khi qu&yacute; kh&aacute;ch thực hiện gửi h&agrave;ng tại VNpost với c&aacute;c m&atilde; bưu gửi sau:</p>\r\n\r\n<p><strong>* 70C-0816-005SG</strong>&nbsp;đối với kho Lazada.vn tại TP.Hồ Ch&iacute; Minh.<br />\r\nĐịa chỉ: Kho xưởng 1-4, cụm 1, đường M14, Khu c&ocirc;ng nghiệp T&acirc;n B&igrave;nh mở rộng, B&igrave;nh Hưng H&ograve;a, Q. B&igrave;nh T&acirc;n, TP. Hồ Ch&iacute; Minh.<br />\r\n<strong>* 10EMSC 1217 - 001TT</strong>&nbsp;đối với kho Lazada.vn tại H&agrave; Nội.<br />\r\nAddress: l&ocirc; 2 đường Độc Lập, KCN H&agrave; B&igrave;nh Phương, thị trấn Thường T&iacute;n, Tp. H&agrave; Nội.</p>\r\n\r\n<p>Nếu c&oacute; bất k&igrave; vấn đề g&igrave; ph&aacute;t sinh, qu&yacute; kh&aacute;ch c&oacute; thể li&ecirc;n hệ với bộ phận Chăm s&oacute;c kh&aacute;ch h&agrave;ng 1900 1007</p>\r\n\r\n<p>Khi n&agrave;o t&ocirc;i c&oacute; thể biết được kết quả đổi trả h&agrave;ng của m&igrave;nh?</p>\r\n\r\n<p>Sau khi kho Lazada.vn nhận được sản phẩm của qu&yacute; kh&aacute;ch gửi về, Lazada sẽ tiến h&agrave;nh kiểm tra chất lượng sản phẩm v&agrave; th&ocirc;ng b&aacute;o kết quả qua email cũng như tin nhắn điện thoại trong v&ograve;ng&nbsp;<strong>2-3 ng&agrave;y l&agrave;m việc</strong>.</p>','','2017-10-19 18:38:33','2017-11-01 14:25:56'),(2,2,1,'Returns','<h3>Return is easy! Lazada can pick up your item or you can send it back to Lazada for free via VN Post.</h3>\r\n\r\n<p><img src=\"http://vn-live-03.slatic.net/cms/faq-screenshot/img-return-step-en-3006.png\" /></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>How do I submit the Online Return Form?</p>\r\n\r\n<p>To return an item, please choose&nbsp;<a href=\"https://www.lazada.vn/customer/order/index\" target=\"_blank\">&quot;My orders&quot;</a>&nbsp;and click &quot;RETURN ITEMS&quot; button on the right to fill in the Online Return Form.</p>\r\n\r\n<p><strong>Notice</strong>: The &ldquo;RETURN ITEMS&rdquo; button would be shown only when the delivery status is &ldquo;Delivered&rdquo;.</p>\r\n\r\n<p><img src=\"http://vn-live-01.slatic.net/cms/faq-screenshot/return_screen-300616-en.PNG\" /></p>\r\n\r\n<p>You can read our&nbsp;<a href=\"http://www.lazada.vn/helpcenter/returns-refunds/?setLang=vi#answer-faq-returnpolicy-ans\" target=\"_blank\">Return Policy</a>&nbsp;to make sure your item is eligible for return</p>\r\n\r\n<p>For step by step instruction please check the &quot;<a href=\"http://www.lazada.vn/huong-dan-doi-tra-hang-online/\" target=\"_blank\">video clip</a>&quot;.</p>\r\n\r\n<p>How do I know if Lazada had received my online return request?</p>\r\n\r\n<p>When you complete the &quot;Online Return Form&quot;, there will be a confirmation on our website saying that your request has been updated successfully.</p>\r\n\r\n<p>How do I track my return status in case I send back the item via VNpost?</p>\r\n\r\n<p>Right after sending back the product successfully at VNPost, you will receive the tracking number provided by VNPost to monitor your return shipment on&nbsp;www.vnpost.vn</p>\r\n\r\n<p>How do I track my return status in case Lazada comes to pick up the item?</p>\r\n\r\n<p>Right after our shipping company picks up the product successfully, you will receive the tracking number provided by Lazada to monitor your return shipment on Lazada/ shipping company&rsquo;s website.</p>\r\n\r\n<p>Does Lazada.vn cover the shipment / EMS cost for returns?</p>\r\n\r\n<p>Yes. It is totally free when you send the item back to Lazada.vn via VNPost with these shipping codes:</p>\r\n\r\n<ul>\r\n	<li><strong>* 70C-0816-005SG</strong>&nbsp;for Lazada.vn Ho Chi Minh Warehouse<br />\r\n	Address: Warehouse 1-4, Area 1, M14 Street, Opened IPs Tan Binh, Binh Hung Hoa Ward, Binh Tan District, Ho Chi Minh City.</li>\r\n	<li><strong>* 10EMSC 1217 - 001TT</strong>&nbsp;for Lazada.vn Hanoi Warehouse<br />\r\n	Address: lot 2, Doc Lap Street, Ha Binh Phuong Industrial Area, Thuong Tin District, Hanoi City</li>\r\n</ul>\r\n\r\n<p>In case of any problems, please kindly contact our Customer Service at 1900 1007</p>\r\n\r\n<p>How long will it take to receive the return/ refund feedback?</p>\r\n\r\n<p>After we have received your item at our warehouse, we will process the quality evaluation then send you an email and SMS notification within 2-3 working days.</p>',NULL,'2017-10-19 18:38:33','2017-10-22 14:44:41'),(3,3,1,'Purchase flow','<p>Updating...</p>','Updating...','2017-10-19 18:38:33','2017-12-07 07:22:12'),(4,1,2,'Hướng dẫn đặt hàng','<p>Đặt h&agrave;ng tại website Lazada ho&agrave;n to&agrave;n đơn giản như sau:</p>\r\n\r\n<p><img src=\"http://vn-live-03.slatic.net/cms/faq-screenshot/OP.jpg\" style=\"width:80%\" /></p>\r\n\r\n<p>Để xem hướng dẫn chi tiết, mời qu&yacute; kh&aacute;ch tham khảo&nbsp;<strong><a href=\"http://www.lazada.vn/huong-dan-mua-hang/\" target=\"_blank\">www.lazada.vn/huong-dan-mua-hang/</a></strong>.</p>\r\n\r\n<p>T&ocirc;i đ&atilde; đặt h&agrave;ng v&agrave; x&aacute;c nhận thanh to&aacute;n từ Lazada. T&ocirc;i phải l&agrave;m g&igrave; tiếp theo?</p>\r\n\r\n<p>Ngay sau khi qu&yacute; kh&aacute;ch đặt h&agrave;ng th&agrave;nh c&ocirc;ng, bạn chỉ cần để điện thoại ở chế độ li&ecirc;n lạc v&agrave; kiểm tra email nếu thuận tiện. Lazada.vn sẽ nhanh ch&oacute;ng x&aacute;c nhận đơn h&agrave;ng v&agrave; gửi cập nhật sớm nhất đến qu&yacute; kh&aacute;ch qua email v&agrave; tin nhắn SMS.</p>\r\n\r\n<p>Sau khi qu&aacute; tr&igrave;nh x&aacute;c minh th&agrave;nh c&ocirc;ng, đơn h&agrave;ng sẽ được giao đến qu&yacute; kh&aacute;ch trong khoảng 2-6 ng&agrave;y l&agrave;m việc. Ngo&agrave;i ra, qu&yacute; kh&aacute;ch c&oacute; thể kiểm tra t&igrave;nh trạng đơn h&agrave;ng bất cứ l&uacute;c n&agrave;o tại&nbsp;<a href=\"http://www.lazada.vn/kiem-tra-don-hang\" target=\"_blank\">www.lazada.vn/kiem-tra-don-hang</a>.</p>\r\n\r\n<p>Nếu chưa đăng k&yacute; t&agrave;i khoản tại Lazada th&igrave; t&ocirc;i c&oacute; đặt h&agrave;ng được kh&ocirc;ng?</p>\r\n\r\n<p>Qu&yacute; kh&aacute;ch c&oacute; thể đặt h&agrave;ng tại Lazada m&agrave; kh&ocirc;ng cần đăng k&yacute;/đăng nhập t&agrave;i khoản trước bằng c&aacute;ch:</p>\r\n\r\n<ol>\r\n	<li>Chọn sản phẩm muốn mua, cho v&agrave;o giỏ h&agrave;ng v&agrave; tiến h&agrave;nh thanh to&aacute;n</li>\r\n	<li>Tại trang đăng nhập, qu&yacute; kh&aacute;ch chọn mục&nbsp;<strong>&quot;Đặt h&agrave;ng m&agrave; kh&ocirc;ng cần đăng k&yacute;&quot;</strong>, rồi nhấn&nbsp;<strong>&quot;Tiếp tục&quot;</strong><br />\r\n	<br />\r\n	<img src=\"http://vn-live-01.slatic.net/cms/faq-screenshot/OP-1-1.jpg\" /></li>\r\n	<li>Điền th&ocirc;ng tin giao h&agrave;ng v&agrave; chọn h&igrave;nh thức thanh to&aacute;n mong muốn</li>\r\n	<li>Nhấn n&uacute;t&nbsp;<strong>&quot;Đặt h&agrave;ng&quot;</strong></li>\r\n</ol>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Để xem hướng dẫn chi tiết, mời qu&yacute; kh&aacute;ch tham khảo&nbsp;<a href=\"http://www.lazada.vn/huong-dan-mua-hang/\" target=\"_blank\">www.lazada.vn/huong-dan-mua-hang/</a></p>\r\n\r\n<p>Tuy nhi&ecirc;n, nhằm phục vụ tiện &iacute;ch mua sắm của qu&yacute; kh&aacute;ch, ch&uacute;ng t&ocirc;i khuyến kh&iacute;ch qu&yacute; kh&aacute;ch đăng k&yacute; tạo t&agrave;i khoản mua h&agrave;ng tại Lazada để trở th&agrave;nh một trong những người đầu ti&ecirc;n nhận được cập nhật mới nhất về c&aacute;c chương tr&igrave;nh ưu đ&atilde;i hấp dẫn, đồng thời tham gia chương tr&igrave;nh d&agrave;nh cho kh&aacute;ch h&agrave;ng th&acirc;n thiết (nếu c&oacute;).</p>\r\n\r\n<p>T&ocirc;i c&oacute; thể đặt h&agrave;ng qua điện thoại kh&ocirc;ng?</p>\r\n\r\n<p>Ch&uacute;ng t&ocirc;i c&oacute; thể hỗ trợ qu&yacute; kh&aacute;ch đặt h&agrave;ng qua điện thoại nếu qu&yacute; kh&aacute;ch chọn h&igrave;nh thức thanh to&aacute;n l&agrave; &quot;Thanh to&aacute;n khi nhận h&agrave;ng&quot;.</p>\r\n\r\n<p>Tuy nhi&ecirc;n, ch&uacute;ng t&ocirc;i lu&ocirc;n khuyến kh&iacute;ch qu&yacute; kh&aacute;ch t&igrave;m hiểu th&ecirc;m về c&aacute;ch đặt h&agrave;ng trực tuyến tại&nbsp;<a href=\"http://www.lazada.vn/huong-dan-mua-hang/\" target=\"_blank\">www.lazada.vn/huong-dan-mua-hang</a>.</p>\r\n\r\n<p>Nếu qu&yacute; kh&aacute;ch chưa thể tự đặt h&agrave;ng trực tuyến v&igrave; bất cứ l&yacute; do g&igrave;, xin đừng ngần ngại li&ecirc;n hệ ngay với bộ phận Chăm s&oacute;c kh&aacute;ch h&agrave;ng của Lazada [<a href=\"http://www.lazada.vn/helpcenter/contact-us/#answer-faq-contactus-ans\" target=\"_blank\"><strong>Bấm v&agrave;o đ&acirc;y</strong></a>], ch&uacute;ng t&ocirc;i rất h&acirc;n hạnh được phục vụ qu&yacute; kh&aacute;ch.</p>\r\n\r\n<p>L&agrave;m thế n&agrave;o để bỏ một sản phẩm trong giỏ h&agrave;ng?</p>\r\n\r\n<p>Để bỏ một sản phẩm trong giỏ h&agrave;ng, qu&yacute; kh&aacute;ch vui l&ograve;ng:</p>\r\n\r\n<ul>\r\n	<li>Chọn n&uacute;t&nbsp;<strong>&quot;Giỏ h&agrave;ng&quot;</strong>&nbsp;tại thanh c&ocirc;ng cụ ở đầu trang web để v&agrave;o giỏ h&agrave;ng hiện tại<br />\r\n	<br />\r\n	<img src=\"http://vn-live-01.slatic.net/cms/faq-screenshot/OP-1-2.jpg\" /></li>\r\n	<br />\r\n	<li>Tại trang giỏ h&agrave;ng, qu&yacute; kh&aacute;ch chọn n&uacute;t&nbsp;<strong>&quot;X&oacute;a&quot;</strong>&nbsp;để bỏ sản phẩm<br />\r\n	<br />\r\n	<img src=\"http://vn-live-03.slatic.net/cms/FAQ/cart2.png\" /></li>\r\n</ul>\r\n\r\n<p>Qu&yacute; kh&aacute;ch sẽ thấy giỏ h&agrave;ng được cập nhật tương ứng.</p>\r\n\r\n<p>Sau khi đặt h&agrave;ng, t&ocirc;i c&oacute; nhận được x&aacute;c nhận đơn h&agrave;ng n&agrave;o kh&ocirc;ng?</p>\r\n\r\n<p>Ngay sau khi đơn h&agrave;ng được đặt th&agrave;nh c&ocirc;ng, Lazada.vn sẽ gửi tin nhắn v&agrave; email th&ocirc;ng b&aacute;o đến qu&yacute; kh&aacute;ch x&aacute;c nhận đ&atilde; nhận y&ecirc;u cầu đặt h&agrave;ng với m&atilde; số đơn h&agrave;ng k&egrave;m theo.</p>\r\n\r\n<p>Trong một số trường hợp Lazada cần x&aacute;c nhận đơn h&agrave;ng từ qu&yacute; kh&aacute;ch, nh&acirc;n vi&ecirc;n hỗ trợ kh&aacute;ch h&agrave;ng của Lazada.vn c&oacute; thể sẽ li&ecirc;n hệ với qu&yacute; kh&aacute;ch qua điện thoại hoặc tổng đ&agrave;i của Lazada sẽ thực hiện cuộc gọi hay tin nhắn tự động đến số điện thoại qu&yacute; kh&aacute;ch đ&atilde; đăng k&yacute;. Cuộc gọi x&aacute;c nhận đơn h&agrave;ng sẽ được thực hiện 3 lần, nếu sau 3 lần Lazada vẫn chưa nhận được x&aacute;c nhận của qu&yacute; kh&aacute;ch, ch&uacute;ng t&ocirc;i c&oacute; thể sẽ tiến h&agrave;nh gửi tin nhắn đề nghị x&aacute;c nhận đơn h&agrave;ng đến qu&yacute; kh&aacute;ch. Qu&yacute; kh&aacute;ch vui l&ograve;ng thực hiện theo hướng dẫn từ nội dung được gửi đến. Ph&iacute; cho mỗi tin nhắn phản hồi l&agrave; 500 đồng. Nếu qu&aacute; thời gian đề cập trong tin nhắn m&agrave; Lazada vẫn chưa nhận được th&ocirc;ng tin từ qu&yacute; kh&aacute;ch, ch&uacute;ng t&ocirc;i rất tiếc sẽ ngừng thực hiện đơn h&agrave;ng tr&ecirc;n hệ thống.</p>\r\n\r\n<p>T&igrave;nh trạng đơn h&agrave;ng sẽ được cập nhật qua email v&agrave; tin nhắn để qu&yacute; kh&aacute;ch kịp thời theo d&otilde;i.</p>\r\n\r\n<p>Khi đặt h&agrave;ng tr&ecirc;n website Lazada b&aacute;o đ&atilde; nhận y&ecirc;u cầu đặt h&agrave;ng, nhưng sau đ&oacute; lại nhận được th&ocirc;ng b&aacute;o đơn h&agrave;ng đ&atilde; hủy, tại sao lại như vậy?</p>\r\n\r\n<p>Sau khi qu&yacute; kh&aacute;ch đặt h&agrave;ng, hệ thống của Lazada sẽ nhận được y&ecirc;u cầu đặt h&agrave;ng của qu&yacute; kh&aacute;ch. Giao dịch thanh to&aacute;n cho đơn h&agrave;ng sẽ được x&aacute;c minh th&ocirc;ng qua&nbsp;<strong>Cổng thanh to&aacute;n</strong>&nbsp;(t&ugrave;y theo loại thẻ m&agrave; giao dịch sẽ được x&aacute;c minh qua c&aacute;c loại Cổng thanh to&aacute;n kh&aacute;c nhau), việc x&aacute;c minh n&agrave;y l&agrave; bắt buộc cho mọi giao dịch thanh to&aacute;n thẻ nhằm đảm bảo t&iacute;nh an to&agrave;n v&agrave; bảo mật của giao dịch.</p>\r\n\r\n<p>Trường hợp Cổng thanh to&aacute;n kh&ocirc;ng thể x&aacute;c minh được th&ocirc;ng tin, khoản thanh to&aacute;n sẽ được ho&agrave;n tự động về t&agrave;i khoản thẻ. V&igrave; vậy, Lazada kh&ocirc;ng thể tiếp tục thực hiện đơn h&agrave;ng của qu&yacute; kh&aacute;ch. Trong những trường hợp đ&oacute;, qu&yacute; kh&aacute;ch c&oacute; thể thay đổi h&igrave;nh thức thanh to&aacute;n hoặc li&ecirc;n hệ Bộ phận hỗ trợ của Lazada tại&nbsp;<a href=\"http://www.lazada.vn/contact/\" target=\"_blank\">www.lazada.vn/contact</a>&nbsp;để được hỗ trợ.</p>\r\n\r\n<p>Thời gian x&aacute;c minh giao dịch của Lazada l&agrave; bao l&acirc;u?</p>\r\n\r\n<p>Thời gian x&aacute;c minh giao dịch của Lazada trung b&igrave;nh từ 1 &ndash; 2 tiếng kể từ thời điểm qu&yacute; kh&aacute;ch đặt h&agrave;ng.<br />\r\nTuy nhi&ecirc;n trong một số trường hợp c&oacute; thể k&eacute;o d&agrave;i hơn thời gian tr&ecirc;n nhưng&nbsp;<strong>kh&ocirc;ng qu&aacute; 24 tiếng</strong>&nbsp;từ khi qu&yacute; kh&aacute;ch đặt h&agrave;ng.</p>\r\n\r\n<p>Đặt h&agrave;ng tr&ecirc;n ứng dụng của iOS như thế n&agrave;o?</p>\r\n\r\n<table>\r\n	<tbody>\r\n		<tr>\r\n			<td><strong>Bước 1</strong>&nbsp;: Lựa chọn sản phẩm cần t&igrave;m bằng c&aacute;ch điền t&ecirc;n sản phẩm v&agrave;o &ocirc; t&igrave;m kiếm, sau đ&oacute; nhấn chọn biểu tượng t&igrave;m kiếm<br />\r\n			<br />\r\n			<img src=\"http://vn-live-02.slatic.net/cms/faq-screenshot/iOS_1-min.jpg\" style=\"width:57%\" /></td>\r\n			<td><strong>Bước 2</strong>&nbsp;: Nhấn n&uacute;t &ldquo;Mua ngay&rdquo; để tiến h&agrave;nh đặt h&agrave;ng tại Lazada.vn<br />\r\n			<br />\r\n			<img src=\"http://vn-live-01.slatic.net/cms/faq-screenshot/iOS_2-min.jpg\" style=\"width:100%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td><br />\r\n			<strong>Bước 3</strong>&nbsp;: Đăng nhập t&agrave;i khoản Lazada.vn để mua h&agrave;ng c&oacute; sử dụng m&atilde; giảm gi&aacute;. Nếu qu&yacute; kh&aacute;ch chưa c&oacute; t&agrave;i khoản th&igrave; đăng k&yacute; tại&nbsp;<a href=\"http://www.lazada.vn/customer/account/create/\" target=\"_blank\">https://www.lazada.vn/customer/account/create/</a><br />\r\n			<br />\r\n			<img src=\"http://vn-live-02.slatic.net/cms/faq-screenshot/iOS_3-min.jpg\" style=\"width:100%\" /></td>\r\n			<td><br />\r\n			<strong>Bước 4</strong>&nbsp;: Nhập th&ocirc;ng tin người đặt h&agrave;ng<br />\r\n			- Nếu qu&yacute; kh&aacute;ch đ&atilde; từng mua sắm tại Lazada.vn th&igrave; hệ thống sẽ tự động lưu lại th&ocirc;ng tin người đặt h&agrave;ng của đơn h&agrave;ng trước đ&oacute;.<br />\r\n			- Trong trường hợp qu&yacute; kh&aacute;ch c&oacute; nhu cầu chỉnh sửa th&ocirc;ng tin người đặt h&agrave;ng vui l&ograve;ng chuyển sang bước số 6<br />\r\n			<br />\r\n			<img src=\"http://vn-live-02.slatic.net/cms/faq-screenshot/iOS_4-min.jpg\" style=\"width:50%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td colspan=\"2\"><br />\r\n			<strong>Bước 5</strong>&nbsp;: Chọn h&igrave;nh thức thanh to&aacute;n: &ldquo;Thanh to&aacute;n khi nhận h&agrave;ng&rdquo; hoặc &ldquo;Thanh to&aacute;n thẻ t&iacute;n dụng&rdquo;<br />\r\n			<br />\r\n			<img src=\"http://vn-live-02.slatic.net/cms/faq-screenshot/iOS_5-min_(Rev).jpg\" style=\"width:60%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td colspan=\"2\"><br />\r\n			<strong>Bước 6</strong>&nbsp;: X&aacute;c nhận lại th&ocirc;ng tin người đặt h&agrave;ng v&agrave; nhập m&atilde; giảm gi&aacute; (nếu c&oacute;)<br />\r\n			<br />\r\n			<img src=\"http://vn-live-01.slatic.net/cms/faq-screenshot/iOS_6-min.jpg\" style=\"width:60%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td colspan=\"2\"><strong>Bước 7</strong>: Nhấn n&uacute;t &ldquo;Đặt h&agrave;ng&rdquo; để ho&agrave;n tất qu&aacute; tr&igrave;nh mua sắm. M&atilde; số đơn h&agrave;ng sẽ hiển thị ngay tr&ecirc;n m&agrave;n h&igrave;nh điện thoại.</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>Đặt h&agrave;ng tr&ecirc;n ứng dụng Android như thế n&agrave;o?</p>\r\n\r\n<table>\r\n	<tbody>\r\n		<tr>\r\n			<td><strong>Bước 1</strong>&nbsp;: Lựa chọn sản phẩm cần t&igrave;m bằng c&aacute;ch điền t&ecirc;n sản phẩm v&agrave;o &ocirc; t&igrave;m kiếm, sau đ&oacute; nhấn chọn biểu tượng t&igrave;m kiếm.<br />\r\n			<br />\r\n			<img src=\"http://vn-live-01.slatic.net/cms/faq-screenshot/Android_1-min_(Rev).jpg\" style=\"width:78%\" /></td>\r\n			<td><strong>Bước 2</strong>&nbsp;: Nhấn n&uacute;t &ldquo;Mua ngay&rdquo; để tiến h&agrave;nh đặt h&agrave;ng tại Lazada.vn<br />\r\n			<br />\r\n			<img src=\"http://vn-live-01.slatic.net/cms/faq-screenshot/Android_2-min.jpg\" style=\"width:100%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td><br />\r\n			<strong>Bước 3</strong>&nbsp;: Đăng nhập t&agrave;i khoản Lazada.vn để mua h&agrave;ng c&oacute; sử dụng m&atilde; giảm gi&aacute;. Nếu qu&yacute; kh&aacute;ch chưa c&oacute; t&agrave;i khoản th&igrave; đăng k&yacute; tại&nbsp;<a href=\"http://www.lazada.vn/customer/account/create/\" target=\"_blank\">https://www.lazada.vn/customer/account/create/</a><br />\r\n			<br />\r\n			<img src=\"http://vn-live-03.slatic.net/cms/faq-screenshot/Android_3-min_(Rev).jpg\" style=\"width:82%\" /></td>\r\n			<td><br />\r\n			<strong>Bước 4</strong>&nbsp;: Nhập th&ocirc;ng tin người đặt h&agrave;ng<br />\r\n			- Nếu qu&yacute; kh&aacute;ch đ&atilde; từng mua sắm tại Lazada.vn th&igrave; hệ thống sẽ tự động lưu lại th&ocirc;ng tin người đặt h&agrave;ng của đơn h&agrave;ng trước đ&oacute;.<br />\r\n			- Trong trường hợp qu&yacute; kh&aacute;ch c&oacute; nhu cầu chỉnh sửa th&ocirc;ng tin người đặt h&agrave;ng vui l&ograve;ng chuyển sang bước số 6<br />\r\n			<br />\r\n			<img src=\"http://vn-live-03.slatic.net/cms/faq-screenshot/Android_4-min_(Rev).jpg\" style=\"width:65%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td colspan=\"2\"><br />\r\n			<strong>Bước 5</strong>&nbsp;: Chọn h&igrave;nh thức thanh to&aacute;n<br />\r\n			<br />\r\n			<img src=\"http://vn-live-03.slatic.net/cms/faq-screenshot/Android_5-min_(Rev).jpg\" style=\"width:45%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td colspan=\"2\"><br />\r\n			<strong>Bước 6</strong>&nbsp;: X&aacute;c nhận lại th&ocirc;ng tin người đặt h&agrave;ng v&agrave; nhập m&atilde; giảm gi&aacute; (nếu c&oacute;)<br />\r\n			<br />\r\n			<img src=\"http://vn-live-03.slatic.net/cms/faq-screenshot/Android_6-min.jpg\" style=\"width:80%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td colspan=\"2\"><strong>Bước 7</strong>: Nhấn n&uacute;t &ldquo;Đặt h&agrave;ng&rdquo; để ho&agrave;n tất qu&aacute; tr&igrave;nh mua sắm. M&atilde; số đơn h&agrave;ng sẽ hiển thị ngay tr&ecirc;n m&agrave;n h&igrave;nh điện thoại.</td>\r\n		</tr>\r\n	</tbody>\r\n</table>',NULL,'2017-10-19 18:38:33','2017-10-22 14:42:25'),(5,2,2,'Purchase flow','<p>It is easy to place an order at Lazada:</p>\r\n\r\n<p><img alt=\"\" src=\"http://vn-live-01.slatic.net/cms/faq-screenshot/new-order-image.jpg\" style=\"width:90%\" /></p>\r\n\r\n<p>For full instruction, please click here&nbsp;<strong><a href=\"http://www.lazada.vn/huong-dan-mua-hang/\" target=\"_blank\">www.lazada.vn/huong-dan-mua-hang/</a></strong>.</p>\r\n\r\n<p>I have ordered and confirmed payment with Lazada. What should I do next?</p>\r\n\r\n<p>After you have placed order succesfully at Lazada.vn, all you need to do is to let your phone in available mode and check your email if possible. Lazada.vn will verify your order and update you via sms and email as soon as possible.After successful verification, you can expect to receive your order within 2- 6 working days.</p>\r\n\r\n<p>You can also check your order status anytime online with our&nbsp;<a href=\"http://www.lazada.vn/kiem-tra-don-hang/\" target=\"_blank\">https://www.lazada.vn/kiem-tra-don-hang/</a>.</p>\r\n\r\n<p>How can I order without an account on Lazada website?</p>\r\n\r\n<p>You absolutely can order on Lazada without an account:</p>\r\n\r\n<ol>\r\n	<li>Choose the product you want and proceed to checkout</li>\r\n	<li>At Email Login step, enter your email address and choose&nbsp;<strong>&quot;Continue without password&quot;</strong><br />\r\n	<br />\r\n	<img src=\"http://vn-live-01.slatic.net/cms/faq-screenshot/OP-1-1.jpg\" /></li>\r\n	<br />\r\n	<li>Enter your delivery information and choose your payment method</li>\r\n	<li>Place your order</li>\r\n</ol>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>For more detailed instruction on how to order, please check out&nbsp;<a href=\"http://www.lazada.vn/huong-dan-mua-hang/\" target=\"_blank\">www.lazada.vn/huong-dan-mua-hang/</a>.</p>\r\n\r\n<p>We encourage you to create an account to get updated with Lazada&#39;s latest and attractive promotions, plus to have your information and order history saved for your best online shopping experience.</p>\r\n\r\n<p>Can I place an order by phone?</p>\r\n\r\n<p>We can assist you to place your order over the phone if your preferred payment method is Cash On Delivery (COD).</p>\r\n\r\n<p>However, we highly recommend you to check out how to make a purchase online here&nbsp;<a href=\"http://www.lazada.vn/huong-dan-mua-hang/\" target=\"_blank\">www.lazada.vn/huong-dan-mua-hang</a>.</p>\r\n\r\n<p>If in any situation you cannot place an order online, please call our Customer Service [<a href=\"http://www.lazada.vn/helpcenter/contact-us/#answer-faq-contactus-ans\" target=\"_blank\"><strong>Click</strong></a>], we will be more than happy to assist you.</p>\r\n\r\n<p>How to remove an item in your shopping cart?</p>\r\n\r\n<p>To remove an item in your shopping cart, you can:</p>\r\n\r\n<ul>\r\n	<li>Click on the Cart icon on top of Lazada page to go to your shopping cart<br />\r\n	<br />\r\n	<img src=\"http://vn-live-01.slatic.net/cms/faq-screenshot/OP-1-2.jpg\" /></li>\r\n	<br />\r\n	<li>Click on<strong>&quot;Remove item&quot;</strong><br />\r\n	<br />\r\n	<img src=\"http://vn-live-03.slatic.net/cms/FAQ/cart2.png\" /></li>\r\n</ul>\r\n\r\n<p>Your cart will be updated and that item will be removed.</p>\r\n\r\n<p>Will I receive any order confirmation after placing an order?</p>\r\n\r\n<p>When you place an order on Lazada.vn, you will receive an SMS and email notification with an order number to confirm that Lazada has received your order request.</p>\r\n\r\n<p>In case Lazada need your confirmation to continue the order process, our Customer Support Agent may contact you via phone or send an automatic call or 2 way SMS from LAZADA.VN. An automatic confirmation call will be done 3 times, if after 3 times Lazada has not received your confirmation, we may proceed to send a message requesting to confirm order again. Please follow the instructions and send your confirmation by replying to 8055. The fee for a SMS confirmation is 500 VND. If Lazada has not yet received information from you according to the time period mentioned in the message, we&#39;re sorry to cancel the order.</p>\r\n\r\n<p>Your order status will be updated via emails and SMS notification.</p>\r\n\r\n<p>Why I received confirmation from Lazada website for my order via credit card but after that you sent me a cancellation notification?</p>\r\n\r\n<p>After making order, Lazada system will receive your order request. Payment transaction will be verified via&nbsp;<strong>payment gateway</strong>&nbsp;(depending on types of card, there will be different payment gateway accordingly). This verification progress is mandatory for all card payment to ensure security and safetiness.</p>\r\n\r\n<p>If gateway cannot verify information, the money will be refunded automatically to your account, so Lazada could not continue to process your order. In this case, you can change your payment method or leave your message at&nbsp;<a href=\"http://www.lazada.vn/contact/\" target=\"_blank\">www.lazada.vn/contact</a>for more support.</p>\r\n\r\n<p>How long does the credit card vertification process take?</p>\r\n\r\n<p>Time for verifying transaction will take averagely 1 to 2 hours since your order is made.<br />\r\nHowever, in some cases, this period of time may take longer, but&nbsp;<strong>not more than 24 hours</strong>&nbsp;from time you make order.</p>\r\n\r\n<p>How do I place an order on App - iOS?</p>\r\n\r\n<table>\r\n	<tbody>\r\n		<tr>\r\n			<td><strong>Step 1</strong>&nbsp;: Find your product<br />\r\n			<br />\r\n			<img src=\"http://vn-live-02.slatic.net/cms/faq-screenshot/iOS_1-min.jpg\" style=\"width:57%\" /></td>\r\n			<td><strong>Step 2</strong>&nbsp;: Choose your product by clicking on &ldquo;Mua Ngay&rdquo; button<br />\r\n			<br />\r\n			<img src=\"http://vn-live-01.slatic.net/cms/faq-screenshot/iOS_2-min.jpg\" style=\"width:100%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td><br />\r\n			<strong>Step 3</strong>&nbsp;: Enter your email, you can register one for free at:&nbsp;<a href=\"http://www.lazada.vn/customer/account/create/\" target=\"_blank\">https://www.lazada.vn/customer/account/create/</a><br />\r\n			<br />\r\n			<img src=\"http://vn-live-02.slatic.net/cms/faq-screenshot/iOS_3-min.jpg\" style=\"width:100%\" /></td>\r\n			<td><br />\r\n			<strong>Step 4</strong>&nbsp;: Provide delivery information<br />\r\n			- If you are a returning customer, Lazada.vn will auto select the previous deliver information<br />\r\n			- In case you want to change shipping address, please prefer to step 6&nbsp;<br />\r\n			<br />\r\n			<img src=\"http://vn-live-02.slatic.net/cms/faq-screenshot/iOS_4-min.jpg\" style=\"width:50%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td colspan=\"2\"><br />\r\n			<strong>Step 5</strong>&nbsp;: Choose your payment method<br />\r\n			<br />\r\n			<img src=\"http://vn-live-02.slatic.net/cms/faq-screenshot/iOS_5-min_(Rev).jpg\" style=\"width:60%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td colspan=\"2\"><br />\r\n			<strong>Step 6</strong>&nbsp;: Double check delivery information and input voucher code (if applicable), click on &ldquo;chỉnh sửa&rdquo; to change shipping address or payment method<br />\r\n			<br />\r\n			<img src=\"http://vn-live-01.slatic.net/cms/faq-screenshot/iOS_6-min.jpg\" style=\"width:60%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td colspan=\"2\"><strong>Step 7</strong>: Choose &ldquo;Đặt h&agrave;ng&rdquo; to place your order. The order number will show up within 20s.</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>How do I place an order on App - Android?</p>\r\n\r\n<table>\r\n	<tbody>\r\n		<tr>\r\n			<td><strong>Step 1</strong>&nbsp;: Find your product<br />\r\n			<br />\r\n			<img src=\"http://vn-live-01.slatic.net/cms/faq-screenshot/Android_1-min_(Rev).jpg\" style=\"width:78%\" /></td>\r\n			<td><strong>Step 2</strong>&nbsp;: Choose your product by clicking on &ldquo;Mua Ngay&rdquo; button<br />\r\n			<br />\r\n			<img src=\"http://vn-live-01.slatic.net/cms/faq-screenshot/Android_2-min.jpg\" style=\"width:100%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td><br />\r\n			<strong>Step 3</strong>&nbsp;: Enter your email, you can register one for free at:&nbsp;<a href=\"http://www.lazada.vn/customer/account/create/\" target=\"_blank\">https://www.lazada.vn/customer/account/create/</a><br />\r\n			<br />\r\n			<img src=\"http://vn-live-03.slatic.net/cms/faq-screenshot/Android_3-min_(Rev).jpg\" style=\"width:82%\" /></td>\r\n			<td><br />\r\n			<strong>Step 4</strong>&nbsp;: Provide delivery information<br />\r\n			- If you are a returning customer, Lazada.vn will auto select the previous deliver information<br />\r\n			- In case you want to change shipping address, please prefer to step 6&nbsp;<br />\r\n			<br />\r\n			<img src=\"http://vn-live-03.slatic.net/cms/faq-screenshot/Android_4-min_(Rev).jpg\" style=\"width:65%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td colspan=\"2\"><br />\r\n			<strong>Step 5</strong>&nbsp;: Choose your payment method<br />\r\n			<br />\r\n			<img src=\"http://vn-live-03.slatic.net/cms/faq-screenshot/Android_5-min_(Rev).jpg\" style=\"width:45%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td colspan=\"2\"><br />\r\n			<strong>Step 6</strong>&nbsp;: Double check delivery information and input voucher code (if applicable), click on &ldquo;chỉnh sửa&rdquo; to change shipping address or payment method<br />\r\n			<br />\r\n			<img src=\"http://vn-live-03.slatic.net/cms/faq-screenshot/Android_6-min.jpg\" style=\"width:80%\" /></td>\r\n		</tr>\r\n		<tr>\r\n			<td colspan=\"2\"><strong>Step 7</strong>: Choose &ldquo;Đặt h&agrave;ng&rdquo; to place your order. The order number will show up within 20s.</td>\r\n		</tr>\r\n	</tbody>\r\n</table>',NULL,'2017-10-19 18:38:33','2017-10-22 14:42:25'),(6,3,2,'Purchase flow','<p>Updating...</p>','Updating...','2017-10-19 18:38:33','2017-12-07 07:21:31'),(7,1,3,'Dakmark Foods','<p><strong>C&ocirc;ng ty TNHH MTV C&agrave; ph&ecirc; Nguy&ecirc;n Huy H&ugrave;ng</strong>&nbsp;được th&agrave;nh lập v&agrave;o năm 2005. Ch&uacute;ng t&ocirc;i đ&atilde; c&oacute; 10 năm kinh nghiệm sản xuất, cung ứng v&agrave; xuất khẩu c&agrave; ph&ecirc;. Năm 2009, ch&uacute;ng t&ocirc;i đ&atilde; đạt chứng nhận Fairtrade (FLO ID: 21968) v&agrave; l&agrave; một trong hai nh&agrave; xuất khẩu được chứng nhận Fairtrade đầu ti&ecirc;n ở Việt Nam &ndash; quốc gia đứng thứ hai thế giới về sản lượng c&agrave; ph&ecirc;.</p>\r\n\r\n<p>Cho tới năm 2013, ch&uacute;ng t&ocirc;i đ&atilde; xuất khẩu c&agrave; ph&ecirc; tới ch&acirc;u &Acirc;u (Bỉ, Thụy Sĩ, Ph&aacute;p, T&acirc;y Ban Nha),&nbsp;Mỹ v&agrave; một số nước kh&aacute;c. Tổng sản lượng xuất khẩu l&agrave; hơn 30.000 tấn.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Sản phẩm của ch&uacute;ng t&ocirc;i</strong></p>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:824px\">\r\n	<tbody>\r\n		<tr>\r\n			<td><strong>Loại</strong></td>\r\n			<td><strong>M&ocirc; tả</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td>H&ograve;a tan</td>\r\n			<td>&nbsp;</td>\r\n		</tr>\r\n		<tr>\r\n			<td>Cafe t&uacute;i lọc</td>\r\n			<td>&nbsp;</td>\r\n		</tr>\r\n		<tr>\r\n			<td>Rang xay nguy&ecirc;n hạt</td>\r\n			<td>&nbsp;</td>\r\n		</tr>\r\n		<tr>\r\n			<td>Cafe pha phin</td>\r\n			<td>&nbsp;</td>\r\n		</tr>\r\n		<tr>\r\n			<td>Cafe chồn</td>\r\n			<td>&nbsp;</td>\r\n		</tr>\r\n		<tr>\r\n			<td>Cafe giao qu&aacute;n</td>\r\n			<td>&nbsp;</td>\r\n		</tr>\r\n		<tr>\r\n			<td>Cafe nh&acirc;n x&ocirc; (R1, R2)</td>\r\n			<td>&nbsp;</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Ch&uacute;ng t&ocirc;i cũng đạt được chứng nhận Hệ thống quản l&yacute; vệ sinh an to&agrave;n thực phẩm (HACCP v&agrave; ISO). Hiện tại, ch&uacute;ng t&ocirc;i đang hỗ trợ 04 THT tại Đăk H&agrave;, Kon Tum trồng c&agrave; ph&ecirc; bền vững, bao gồm 02 THT Fairtrade (THT Sản xuất c&agrave; ph&ecirc; bền vững, tổ CSCC), 01 THT 4C, 01 THT chứng nhận UTZ v&agrave; gi&uacute;p đỡ một THT kh&aacute;c đạt chứng nhận Rainforest Alliance.</p>','Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit? Uterque enim summo bono fruitur, id est voluptate barbarorum pedibu','2017-10-19 18:38:33','2017-10-22 09:49:00'),(8,2,3,'About us','<p><strong>Company Limited Nguyen Huy Hung Coffee</strong>&nbsp;was founded in 2005. We have 10 years experience in manufacturing, supplying and exporting coffee.&nbsp;In 2009, we were certified Fairtrade (FLO ID: 21 968) and is one of the two exporters first Fairtrade certified in Vietnam - the country in the second world coffee production.</p>\r\n\r\n<p>Until 2013, we had coffee exports to Europe (Belgium, Switzerland, France, Spain), the United States and some other countries.&nbsp;The total export volume is more than 30,000 tons.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Our products</strong></p>\r\n\r\n<table border=\"1\" style=\"height:454px; width:1194px\">\r\n	<tbody>\r\n		<tr>\r\n			<td style=\"background-color:#ffffff; text-align:center; vertical-align:middle\"><strong>Species</strong></td>\r\n			<td style=\"background-color:#ffffff; text-align:center; vertical-align:middle\"><strong>Describe</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td style=\"background-color:rgba(0, 0, 0, 0.01); text-align:center; vertical-align:middle\">Dissolve</td>\r\n			<td style=\"background-color:rgba(0, 0, 0, 0.01); text-align:center; vertical-align:middle\">&nbsp;</td>\r\n		</tr>\r\n		<tr>\r\n			<td style=\"background-color:#ffffff; text-align:center; vertical-align:middle\">Tea bag</td>\r\n			<td style=\"background-color:#ffffff; text-align:center; vertical-align:middle\">&nbsp;</td>\r\n		</tr>\r\n		<tr>\r\n			<td style=\"background-color:rgba(0, 0, 0, 0.01); text-align:center; vertical-align:middle\">Roasted grain</td>\r\n			<td style=\"background-color:rgba(0, 0, 0, 0.01); text-align:center; vertical-align:middle\">&nbsp;</td>\r\n		</tr>\r\n		<tr>\r\n			<td style=\"background-color:#ffffff; text-align:center; vertical-align:middle\">Filter coffee maker</td>\r\n			<td style=\"background-color:#ffffff; text-align:center; vertical-align:middle\">&nbsp;</td>\r\n		</tr>\r\n		<tr>\r\n			<td style=\"background-color:rgba(0, 0, 0, 0.01); text-align:center; vertical-align:middle\">mink Cafe</td>\r\n			<td style=\"background-color:rgba(0, 0, 0, 0.01); text-align:center; vertical-align:middle\">&nbsp;</td>\r\n		</tr>\r\n		<tr>\r\n			<td style=\"background-color:#ffffff; text-align:center; vertical-align:middle\">Affairs Cafe shop</td>\r\n			<td style=\"background-color:#ffffff; text-align:center; vertical-align:middle\">&nbsp;</td>\r\n		</tr>\r\n		<tr>\r\n			<td style=\"background-color:rgba(0, 0, 0, 0.01); text-align:center; vertical-align:middle\">Cafe bucket (R1, R2)</td>\r\n			<td style=\"background-color:rgba(0, 0, 0, 0.01); text-align:center; vertical-align:middle\">&nbsp;</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>We also achieved certification management system food safety (HACCP and ISO).&nbsp;Currently, we are supporting 04 THT in Dak Ha Kon Tum coffee growing sustainably, including 02 THT Fairtrade (THT production of sustainable coffee, organization CSCC), 01 THT 4C, 01 THT UTZ certification and help one another tht Rainforest Alliance certified.</p>','Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit? Uterque enim summo bono fruitur, id est voluptate barbarorum pedibu','2017-10-19 18:38:33','2017-10-22 09:49:00'),(9,3,3,'About us','<p>Updating...</p>','Updating...','2017-10-19 18:38:33','2017-12-07 07:20:47'),(10,1,4,'Chuỗi cửa hàng trưng bày','<p>- VP H&agrave; Nội: tầng 1, T&ograve;a nh&agrave; Vinaconex D, Đường số 1, Trần Th&aacute;i T&ocirc;ng, Dịch Vọng, Cầu Giấy, H&agrave; Nội<br />\r\n- VP Đ&agrave; Nẵng: 78 Hồ Nguy&ecirc;n Trừng, , P. Khu&ecirc; Trung, Q.Cẩm Lệ, TP. Đ&agrave; Nẵng<br />\r\n- Nha Trang: Bảo t&agrave;ng c&agrave; ph&ecirc; DakMark, LotteMart Nha Trang, 58 đường 23/10, TP. Nha Trang<br />\r\n- Cần Thơ: 02 Nguyễn Th&aacute;i Học, Q. Ninh Kiều, TP. Cần Thơ<br />\r\n- VP TP. HCM: Căn số 1, lầu 7, To&agrave; nh&agrave; Tulip, 15 Ho&agrave;ng Quốc Việt, Ph&uacute; Mỹ, Quận 7, TP. Hồ Ch&iacute; Minh&nbsp;</p>',NULL,'2017-10-19 18:38:33','2017-10-22 14:40:24'),(11,2,4,'Showrooms','<p>- Hanoi: 1st Floor, Building D Vinaconex, Street 1, Tran Thai Tong, Dich Vong, Cau Giay District, Hanoi&nbsp;<br />\r\n- Da Nang: 78 Ho Nguyen Trung, , Khue Trung Ward, Q.Cam Le TP.&nbsp;Da Nang&nbsp;<br />\r\n- Nha Trang Museum DakMark coffee, Lotte Mart Nha Trang 58 23/10 street, Hanoi.&nbsp;Nha Trang&nbsp;<br />\r\n- Can Tho: 02 Nguyen Thai Hoc Street, Ninh Kieu District, HCMC.&nbsp;Tho&nbsp;<br />\r\n- TP.&nbsp;HCM: Apartment No. 1, 7th floor, Tulip Building, 15 Hoang Quoc Vietnam, Phu, District 7, HCMC.&nbsp;Ho Chi Minh&nbsp;</p>',NULL,'2017-10-19 18:38:33','2017-10-22 14:40:03'),(12,3,4,'','<p>Updating...</p>','Updating...','2017-10-19 18:38:33','2017-12-07 07:23:38'),(13,1,5,'Nguồn gốc sản phẩm','<p><strong>THT sản xuất c&agrave; ph&ecirc; sạch v&igrave; sức khỏe cộng đồng</strong>&nbsp;(Cooperative for Producing Safe Coffee for Community&rsquo;s Health, gọi tắt l&agrave; CSCC) l&agrave; một tổ hợp t&aacute;c phi lợi nhuận, chuy&ecirc;n sản xuất c&agrave; ph&ecirc; sạch theo ti&ecirc;u chuẩn của FLO v&agrave; ph&acirc;n phối theo k&ecirc;nh thương mại c&ocirc;ng bằng. CSCC được th&agrave;nh lập v&agrave;o ng&agrave;y 28 th&aacute;ng 01 năm 2009, đặt tại khu phố 5 thị trấn Đắk H&agrave;, huyện Đắk H&agrave;, tỉnh Kon Tum.</p>\r\n\r\n<p>Tổ hợp t&aacute;c sản xuất c&agrave; ph&ecirc; sạch v&igrave; sức khỏe cộng đồng (CSCC) nằm tại một trong những v&ugrave;ng đất c&oacute; điều kiện tự nhi&ecirc;n th&iacute;ch hợp nhất cho việc trồng c&agrave; ph&ecirc; ở Việt Nam. Th&agrave;nh vi&ecirc;n của CSCC c&oacute; hơn 90% l&agrave; người sản xuất nhỏ, c&oacute; điều kiện kinh tế kh&oacute; khăn v&agrave; l&agrave; những người l&iacute;nh trở về từ chiến tranh. Sau khi đất nước h&ograve;a b&igrave;nh, nhiều người n&ocirc;ng d&acirc;n đ&atilde; phải rời bỏ qu&ecirc; hương để v&agrave;o v&ugrave;ng đất T&acirc;y Nguy&ecirc;n lập nghiệp với mong ước tho&aacute;t được c&aacute;i ngh&egrave;o c&aacute;i khổ. Nhưng sự bấp b&ecirc;nh của gi&aacute; c&agrave; ph&ecirc;, sự phụ thuộc v&agrave;o điều kiện tự nhi&ecirc;n đ&atilde; khiến cuộc sống của họ ng&agrave;y c&agrave;ng kh&oacute; khăn. May mắn đ&atilde; mỉm cười khi họ biết đến Fairtrade v&agrave; nhận được sự hỗ trợ của đại diện Flo-eV ở Việt Nam v&agrave; Doanh nghiệp tư nh&acirc;n Huy H&ugrave;ng. Th&aacute;ng 2 năm 2009, 43 n&ocirc;ng d&acirc;n đ&atilde; lập n&ecirc;n một tổ hợp t&aacute;c nhằm học hỏi kiến thức canh t&aacute;c v&agrave; c&ugrave;ng nhau vượt qua những kh&oacute; khăn trong kinh tế cũng như trong cuộc sống. CSCC l&agrave; một trong hai tổ hợp t&aacute;c đầu ti&ecirc;n được nhận chứng nhận Fairtrade của tổ chức FLO-cert tại Việt Nam (FLO ID: 21473). Năm 2014, tổ đ&atilde; c&oacute; 98 th&agrave;nh vi&ecirc;n v&agrave; tổng diện t&iacute;ch chứng nhận l&agrave; 181,4ha với sản lượng l&agrave; 4.787 tấn c&agrave; ph&ecirc; hạt.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Sản phẩm của ch&uacute;ng t&ocirc;i</strong></p>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:828px\">\r\n	<tbody>\r\n		<tr>\r\n			<td colspan=\"3\"><strong>C&agrave; ph&ecirc; chứng nhận Fairtrade</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td>C&agrave; ph&ecirc; Robusta R1</td>\r\n			<td>S&agrave;ng 16</td>\r\n			<td>Độ ẩm 12.5%; 0.1% hạt đen; 0.3% hạt vỡ; 0.2% tạp; 0.1% Excelsa</td>\r\n		</tr>\r\n		<tr>\r\n			<td>C&agrave; ph&ecirc; Robusta R2</td>\r\n			<td>S&agrave;ng 13</td>\r\n			<td>Độ ẩm 13%; 2% hạt đen + vỡ; 1% tạp; 1% Excelsa</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Sản xuất vững bền</strong></p>\r\n\r\n<p>D&ugrave; đứng thứ hai về sản xuất c&agrave; ph&ecirc; tr&ecirc;n thế giới, c&agrave; ph&ecirc; nước ta vẫn phải g&aacute;nh chịu nhiều rủi ro như gi&aacute; cả kh&ocirc;ng ổn định, năng suất v&agrave; chất lượng chưa cao, gi&aacute; trị xuất khẩu thấp. Một hướng đi mới cho b&agrave; con n&ocirc;ng d&acirc;n: sản xuất c&agrave; ph&ecirc; bền vững gi&uacute;p hạn chế những rủi ro tr&ecirc;n v&agrave; g&oacute;p phần bảo vệ m&ocirc;i trường, tạo m&ocirc;i trường lao động tốt nhất cho b&agrave; con n&ocirc;ng d&acirc;n v&agrave; c&ocirc;ng nh&acirc;n.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Bảo vệ m&ocirc;i trường</strong></p>\r\n\r\n<p>Tu&acirc;n thủ đ&uacute;ng theo c&aacute;c ti&ecirc;u chuẩn m&ocirc;i trường của Fairtrade, CSCC cam kết duy tr&igrave; c&aacute;c phương ph&aacute;p bảo vệ v&agrave; bảo tồn m&ocirc;i trường trong khả năng c&oacute; thể. Ch&uacute;ng t&ocirc;i tổ chức c&aacute;c buổi huấn luyện về c&aacute;c chủ đề canh t&aacute;c, thải kh&iacute; carbon, sản phẩm n&ocirc;ng h&oacute;a học v&agrave; t&aacute;i sử dụng chất thải nhằm khuyến kh&iacute;ch người d&acirc;n tiến tới tham gia c&aacute;c ti&ecirc;u chuẩn cao hơn m&agrave; vừa c&oacute; lợi cho người n&ocirc;ng d&acirc;n lại vừa gia tăng t&iacute;nh bền vững.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Lợi &iacute;ch đối với người n&ocirc;ng d&acirc;n</strong></p>\r\n\r\n<p>Đời sống b&agrave; con n&ocirc;ng d&acirc;n trở n&ecirc;n tốt đẹp hơn khi giờ đ&acirc;y việc tham gia sản xuất c&agrave; ph&ecirc; chứng nhận thương mại c&ocirc;ng bằng đ&atilde; gi&uacute;p ổn định v&agrave; n&acirc;ng cao gi&aacute; c&agrave; ph&ecirc; cũng như chất lượng của sản phẩm. Tiền ph&uacute;c lợi từ việc b&aacute;n c&agrave; ph&ecirc; thương mại c&ocirc;ng bằng kh&ocirc;ng những gi&uacute;p c&aacute;c th&agrave;nh vi&ecirc;n c&oacute; khoản đầu tư v&agrave;o sản xuất m&agrave; c&ograve;n gi&uacute;p họ chia sẻ sự sung t&uacute;c với cộng đồng. Họ đ&atilde; kh&ocirc;ng c&ograve;n phải vay tiền để c&oacute; thể trả tiền học cho con c&aacute;i, tiền mua thức ăn, trả tiền điện, nước&hellip; Họ c&oacute; nhiều cơ hội tiếp cận với c&aacute;c dịch vụ y tế hơn, nhờ đ&oacute; sức khỏe được cải thiện đ&aacute;ng kể, b&ecirc;n cạnh đ&oacute; x&acirc;y dựng th&ecirc;m cơ sở vật chất như x&acirc;y nh&agrave; văn h&oacute;a, nh&agrave; trẻ, đường x&aacute;&hellip; Đến năm 2014, tổ đ&atilde; x&acirc;y được 02 nh&agrave; văn h&oacute;a cộng đồng; 06 nh&agrave; t&igrave;nh thương; 01 trường mầm non; 01 đường n&ocirc;ng th&ocirc;n; v&agrave; ủng hộ cho nhiều quỹ từ thiện, quỹ khuyến học.</p>','Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit? Uterque enim summo bono fruitur, id est voluptate barbarorum pedibu','2017-10-20 03:23:52','2017-10-22 09:49:29'),(14,2,5,'Product Origin','<p><strong>THT coffee producing clean because public health</strong>&nbsp;(Cooperative for Producing Safe Coffee for Community&#39;s Health, referred to as CSCC) is a consortium of nonprofit partners, specializing in coffee producing clean by the standards of FLO and distributed by fair trade channels.&nbsp;CSCC was established on 01 May 28, 2009, located in the neighborhood Dak Ha 5 town, Dak Ha district, Kon Tum province.</p>\r\n\r\n<p>Cooperative groups producing organic coffee for public health (CSCC) is located in one of the areas with natural conditions most suitable for the cultivation of coffee in Vietnam.&nbsp;CSCC membership of more than 90% are small producers, with the difficult economic conditions and the soldiers returned from the war.&nbsp;After a peaceful country, many farmers had to leave their homeland in the Central Highlands to settle with the desire to escape the suffering poor.&nbsp;But the uncertainty of coffee prices, dependence on natural conditions have made their life increasingly difficult.&nbsp;Luck has smiled when they said to Fairtrade and received the support of representatives Flo-eV in Vietnam and Huy Hung private enterprise.&nbsp;February 2009,&nbsp;43 farmers formed a cooperative group to learn knowledge of farming and jointly overcome the difficulties in the economy as well as in life.&nbsp;CSCC is a cooperation of the two organizations first Fairtrade certification FLO-cert organization in Vietnam (FLO ID: 21 473).&nbsp;2014, has 98 member organizations and the total area of ​​certified 181,4ha output is 4,787 tons with coffee beans.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Our products</strong></p>\r\n\r\n<table border=\"1\" style=\"height:222px; width:1194px\">\r\n	<tbody>\r\n		<tr>\r\n			<td colspan=\"3\" style=\"background-color:#ffffff; text-align:center; vertical-align:middle\"><strong>Fairtrade certified coffee</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td style=\"background-color:rgba(0, 0, 0, 0.01); text-align:center; vertical-align:middle\">Robusta R1</td>\r\n			<td style=\"background-color:rgba(0, 0, 0, 0.01); text-align:center; vertical-align:middle\">Screens 16</td>\r\n			<td style=\"background-color:rgba(0, 0, 0, 0.01); text-align:center; vertical-align:middle\">Humidity 12.5%;&nbsp;0.1% black seeds;&nbsp;0.3% broken grain;&nbsp;0.2% impurities;&nbsp;0.1% Excelsa</td>\r\n		</tr>\r\n		<tr>\r\n			<td style=\"background-color:#ffffff; text-align:center; vertical-align:middle\">Robusta R2</td>\r\n			<td style=\"background-color:#ffffff; text-align:center; vertical-align:middle\">Screens 13</td>\r\n			<td style=\"background-color:#ffffff; text-align:center; vertical-align:middle\">Humidity 13%;&nbsp;2% + black beads burst;&nbsp;1% impurities;&nbsp;1% Excelsa</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Sustainable production</strong></p>\r\n\r\n<p>Though the second largest coffee producer in the world, our country&#39;s coffee still incurs risk as unstable prices, productivity and the quality is not high, low export value.&nbsp;A new way for farmers: sustainable coffee production to help curb these risks and help protect the environment, create the best working environment for farmers and workers.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Environmental Protection</strong></p>\r\n\r\n<p>Compliance with the environmental standards of Fairtrade, CSCC is committed to maintaining the protection measures and environmental conservation in the possibility.&nbsp;We organize training sessions on topics farming, carbon emissions, agricultural products chemistry and reuse of waste in order to encourage people towards participating higher standard that has to benefit the farmers to both increase sustainability.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Benefits for farmers</strong></p>\r\n\r\n<p>Life farmers become better while now participating coffee producers certified fair trade has helped stabilize and raise coffee prices as well as quality of the product.&nbsp;Welfare money from the sale of fair trade coffee not only helps members with investments in production, but also help them to share their wealth with the community.&nbsp;They did not have to borrow money to pay for school for their children, buy food, pay for electricity, water ... they have more opportunities to access to health services more, so that health is improved significantly, besides building more infrastructure such as building culture, kindergarten, roads ... by 2014, the organization has built 02 cultural communities;&nbsp;06 houses of compassion;&nbsp;01 kindergartens;&nbsp;01 rural roads;&nbsp;and support for many charities, education promotion fund.</p>','Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit? Uterque enim summo bono fruitur, id est voluptate barbarorum pedibu','2017-10-20 03:23:52','2017-10-22 09:49:29'),(15,3,5,'产品来源','<p>THT VI清洁咖啡生产公共卫生（用于生产安全的咖啡合作社的社区卫生，简称CSCC）是非营利合作伙伴的联盟，专门从事咖啡由FLO标准和生产清洁通过公平贸易渠道的分布。 CSCC成立于2009年5月1日，位于Kon Tum省Dak Ha区的Dak Ha区。</p>\r\n\r\n<p>为公共健康生产有机咖啡的合作组织（CSCC）位于其中一个具有自然条件的地区。超过90％的CSCC成员是小型生产者，经济条件困难，士兵退伍。在一个和平的国家之后，许多农民不得不离开他们的家园到中部高地去解决，希望摆脱苦难的穷人。但咖啡价格的不确定性，对自然条件的依赖使得他们的生活变得艰难。当他们说公平贸易时，运气已经笑了，并得到了Flo-eV在越南的代表和Huy Hung私营企业的支持。 2009年2月，43名农民组成了合作小组，学习农业知识，共同克服经济和生活中的困难。 CSCC是第一个公平贸易认证机构公平贸易认证组织在越南两个合作组织（FLO ID：21 473）。 2014年有98个会员组织，认证181.4ha的总面积为4,787吨，咖啡豆。</p>\r\n\r\n<p>我们的产品</p>\r\n\r\n<p>公平贸易认证的咖啡<br />\r\n罗布斯塔R1屏幕16湿度12.5％; 0.1％黑种子;破碎谷粒0.3％ 0.2％的杂质; 0.1％Excelsa<br />\r\n罗布斯塔R2屏幕13湿度13％; 2％+黑珠爆裂; 1％的杂质; 1％excelsa</p>\r\n\r\n<p><br />\r\n可持续生产</p>\r\n\r\n<p>虽然是世界第二大咖啡生产国，但我国咖啡仍存在价格不稳定，生产力和质量不高，出口额低的风险。农民的新途径：可持续的咖啡生产，帮助遏制这些风险，帮助保护环境，为农民和工人创造最佳的工作环境。</p>\r\n\r\n<p>环境保护</p>\r\n\r\n<p>遵守公平贸易委员会的环保标准，CSCC致力于维护保护措施和环境保护的可能性。组织农业，碳排放，农产品，废物等专题的培训班，鼓励人们达到更高标准。</p>\r\n\r\n<p>对农民的好处</p>\r\n\r\n<p>农民变得更好，而新的公平的咖啡公平交易有助于稳定和提高咖啡的价格以及产品的质量。出售公平交易咖啡的福利金不仅帮助会员投资生产，而且帮助他们与社区分享财富。他们不需要借钱来为孩子买单，买食物，买电，买水......他们有更多的机会获得健康服务。建设文化，幼儿园，道路......到2014年，该组织已经建成了02个文化社区;慈悲之家06 01幼儿园; 01乡村道路; v&agrave;hỗtrợnhiều慈善机构，教育促进基金。</p>','为公共健康生产有机咖啡的合作组织（CSCC）位于其中一个具有自然条件的地区。超过90％的CSCC成员是小型生产者，经济条件困难，士兵退伍。在一个和平的国家之后，许多农民不得不离开他们的家园到中部高地去解决，希望摆脱苦难的穷人','2017-10-20 03:23:52','2017-12-07 07:16:43'),(16,1,6,'Chất lượng sản phẩm','<p>&nbsp;</p>\r\n\r\n<p><strong>Rainforest Alliance (RA)&nbsp;</strong>l&agrave; một tổ chức phi ch&iacute;nh phủ (NGO) l&agrave;m việc nhằm bảo tồn đa dạng sinh học v&agrave; đảm bảo sinh kế bền vững bằng c&aacute;ch chuyển đổi tập qu&aacute;n sử dụng đất, tập qu&aacute;n kinh doanh v&agrave; h&agrave;nh vi của người ti&ecirc;u d&ugrave;ng. C&oacute; trụ sở ch&iacute;nh tại th&agrave;nh phố New York với c&aacute;c văn ph&ograve;ng tr&ecirc;n khắp Bắc Mỹ v&agrave; Nam Mỹ, ch&acirc;u &Aacute;, ch&acirc;u Phi v&agrave; ch&acirc;u &Acirc;u v&agrave; chương tr&igrave;nh l&agrave;m việc tại hơn 100 quốc gia, tổ chức n&agrave;y đ&atilde; gi&agrave;nh được một đ&aacute;nh gi&aacute; bốn sao của tổ chức Charity Navigator trong hơn năm năm li&ecirc;n tiếp. RA được Daniel Katz, một th&agrave;nh vi&ecirc;n trong hội đồng quản trị, th&agrave;nh lập v&agrave;o năm 1987, v&agrave; được dẫn dắt bởi Tổng thống Tensie Whelan.</p>\r\n\r\n<p>Rainforest Alliance khai th&aacute;c c&aacute;c lực lượng thị trường như một phần trong chiến lược của m&igrave;nh nhằm x&aacute;c định những t&aacute;c nh&acirc;n ch&iacute;nh của nạn ph&aacute; rừng v&agrave; t&agrave;n ph&aacute; m&ocirc;i trường: khai th&aacute;c gỗ, mở rộng canh t&aacute;c n&ocirc;ng nghiệp, chăn nu&ocirc;i gia s&uacute;c v&agrave; du lịch. Tổ chức n&agrave;y cũng đ&agrave;o tạo n&ocirc;ng d&acirc;n, c&aacute;n bộ l&acirc;m nghiệp v&agrave; những người khai th&aacute;c du lịch trong c&aacute;c hoạt động bền vững bảo tồn đất v&agrave; đường thủy, cải thiện đời sống, bảo vệ người lao động v&agrave; cộng đồng; tổ chức n&agrave;y cũng gi&uacute;p họ tiếp cận c&aacute;c nguồn t&agrave;i ch&iacute;nh cần thiết để thực hiện những thay đổi bền vững. C&aacute;c trang trại v&agrave; c&aacute;c doanh nghiệp l&acirc;m nghiệp được kiểm to&aacute;n theo c&aacute;c ti&ecirc;u chuẩn nghi&ecirc;m ngặt của Mạng lưới n&ocirc;ng nghiệp bền vững v&agrave; Hội đồng quản l&yacute; rừng &ndash; c&aacute;c tổ chức phi ch&iacute;nh phủ quốc tế m&agrave; Rainforest Alliance đ&atilde; hỗ trợ th&agrave;nh lập.</p>\r\n\r\n<p>Những trang trại v&agrave; doanh nghiệp m&agrave; đồng thời đ&aacute;p ứng được cả c&aacute;c cuộc kiểm to&aacute;n h&agrave;ng năm v&agrave; đột xuất sẽ được RA chứng nhận v&agrave; c&oacute; quyền sử dụng con dấu của RA. C&aacute;c doanh nghiệp du lịch m&agrave; th&ocirc;ng qua c&aacute;c thực h&agrave;nh quản l&yacute; tốt nhất đ&atilde; được thiết lập c&oacute; thể sử dụng nh&atilde;n hiệu do RA kiểm tra. Con dấu n&agrave;y gi&uacute;p người ti&ecirc;u d&ugrave;ng hỗ trợ những người d&acirc;n, c&aacute;n bộ l&acirc;m nghiệp v&agrave; doanh nghiệp du lịch c&oacute; tr&aacute;ch nhiệm bằng việc chỉ ra những sản phẩm c&oacute; th&agrave;nh phần từ những trang trại v&agrave; dịch vụ m&agrave; thực hiện những thực h&agrave;nh tốt nhất.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Nội dung trong c&aacute;c chương tr&igrave;nh của RA gồm:</p>\r\n\r\n<ul>\r\n	<li><strong>Chứng nhận rừng bền vững:&nbsp;</strong>&nbsp;Rainforest Alliance đ&atilde; đưa ra chương tr&igrave;nh chứng nhận rừng bền vững đầu ti&ecirc;n tr&ecirc;n thế giới v&agrave;o năm 1989 để khuyến kh&iacute;ch việc quản l&yacute; rừng, trang trại c&acirc;y giống v&agrave; t&agrave;i nguy&ecirc;n rừng theo định hướng thị trường v&agrave; c&oacute; tr&aacute;ch nhiệm với m&ocirc;i trường v&agrave; x&atilde; hội.</li>\r\n</ul>\r\n\r\n<p>Tổ chức n&agrave;y cũng kết nối c&aacute;c doanh nghiệp l&acirc;m nghiệp được chứng nhận với người mua l&acirc;m sản v&agrave; cung cấp hỗ trợ tiếp thị cho c&aacute;c doanh nghiệp l&acirc;m nghiệp cộng đồng. Bằng c&aacute;ch th&uacute;c đẩy x&acirc;y dựng xanh v&agrave; hỗ trợ c&aacute;c c&ocirc;ng ty thu mua l&acirc;m sản để kết hợp việc ph&aacute;t triển bền vững v&agrave;o c&aacute;c ch&iacute;nh s&aacute;ch t&igrave;m nguồn cung ứng của họ, RA cũng đang th&uacute;c đẩy tăng nhu cầu về c&aacute;c sản phẩm được chứng nhận.</p>\r\n\r\n<p>Ngo&agrave;i ra RA c&ograve;n cung cấp đ&agrave;o tạo v&agrave; hỗ trợ kỹ thuật cho c&aacute;c doanh nghiệp l&acirc;m nghiệp nhỏ về c&aacute;ch thức thực hiện c&aacute;c thực h&agrave;nh quản l&yacute; đất bền vững (đ&ocirc;i khi với mục đ&iacute;ch cuối c&ugrave;ng l&agrave; c&oacute; được chứng nhận) v&agrave; phổ biến cho người ti&ecirc;u d&ugrave;ng, c&aacute;c doanh nghiệp kinh doanh l&acirc;m sản về bảo tồn v&agrave; chứng nhận.</p>\r\n\r\n<ul>\r\n	<li><strong>Chứng nhận b&ugrave; đắp carbon:</strong>&nbsp;RA x&aacute;c minh c&aacute;c dự &aacute;n b&ugrave; đắp carbon theo c&aacute;c ti&ecirc;u chuẩn giải quyết vấn đề hấp thụ kh&iacute; g&acirc;y hiệu ứng nh&agrave; k&iacute;nh, bảo tồn đa dạng sinh học v&agrave; sinh kế bền vững.</li>\r\n	<li><strong>Chứng nhận N&ocirc;ng nghiệp bền vững:</strong>&nbsp;Chương tr&igrave;nh n&ocirc;ng nghiệp bền vững của RA bao gồm c&aacute;c chương tr&igrave;nh đ&agrave;o tạo v&agrave; chứng nhận cho c&aacute;c trang trại lớn, vừa v&agrave; nhỏ sản xuất c&aacute;c c&acirc;y trồng nhiệt đới như c&agrave; ph&ecirc;, chuối, ca cao, cam, c&aacute;c loại hoa tươi, dương xỉ v&agrave; tr&agrave;.</li>\r\n	<li><strong>C&aacute;c ti&ecirc;u ch&iacute; v&agrave; ti&ecirc;u chuẩn c&acirc;y trồng:</strong>&nbsp;Bao gồm một chương tr&igrave;nh bảo tồn hệ sinh th&aacute;i, bảo vệ động vật hoang d&atilde; v&agrave; đường thủy, cấm ph&acirc;n biệt chủng tộc trong c&ocirc;ng việc v&agrave; hoạt động tuyển dụng, cấm thu&ecirc; lao động trẻ em dưới 15 tuổi, sử dụng bảo hộ lao động, hướng dẫn về việc sử dụng h&oacute;a chất n&ocirc;ng nghiệp v&agrave; cấm c&aacute;c loại c&acirc;y trồng biến đổi gen.</li>\r\n	<li><strong>Dấu chứng nhận RA:</strong>&nbsp;Con dấu chứng nhận RA chỉ xuất hiện tr&ecirc;n c&aacute;c sản phẩm đ&aacute;p ứng c&aacute;c ti&ecirc;u chuẩn v&agrave; ti&ecirc;u ch&iacute; c&acirc;y trồng chi tiết b&ecirc;n tr&ecirc;n.</li>\r\n	<li><strong>Du lịch bền vững:</strong>&nbsp;RA đ&atilde; c&oacute; quyết định rằng việc hỗ trợ c&aacute;c chương tr&igrave;nh chứng nhận địa phương sẽ c&oacute; hiệu quả hơn (so với việc thiết lập c&aacute;c cơ quan chứng nhận ri&ecirc;ng của m&igrave;nh), gi&uacute;p tăng cường việc c&ocirc;ng nhận quốc tế v&agrave; thiết lập mạng lưới khu vực c&aacute;c chương tr&igrave;nh chứng nhận để chia sẻ t&agrave;i nguy&ecirc;n v&agrave; th&ocirc;ng tin v&agrave; thiết lập c&aacute;c ti&ecirc;u chuẩn chứng nhận. Ngo&agrave;i ra họ cũng hỗ trợ tiếp thị, đ&agrave;o tạo v&agrave; hỗ trợ kỹ thuật cho c&aacute;c doanh nghiệp được chứng nhận v&agrave; c&aacute;c doanh nghiệp đang trong qu&aacute; tr&igrave;nh được chứng nhận. Th&ecirc;m v&agrave;o đ&oacute;, họ cũng hợp t&aacute;c quốc tế để thiết lập c&aacute;c mối quan hệ với c&aacute;c nh&agrave; khai th&aacute;c du lịch (kh&aacute;ch sạn, nh&agrave; nghỉ, đại l&yacute; du lịch, &hellip;) để phủ xanh tất cả c&aacute;c yếu tố của của chuỗi cung ứng du lịch.</li>\r\n	<li><strong>Chương tr&igrave;nh gi&aacute;o dục:</strong>&nbsp;RA hoạt động để gi&uacute;p người d&acirc;n ở mọi lứa tuổi hiểu được vai tr&ograve; của mỗi người trong c&ocirc;ng t&aacute;c bảo tồn đa dạng sinh học. C&ocirc;ng việc n&agrave;y được thực hiện th&ocirc;ng qua khu vực gi&aacute;o duc &ndash; được ph&aacute;t triển trong mối li&ecirc;n hệ với c&aacute;c chuy&ecirc;n gia du lịch &ndash; v&agrave; chương tr&igrave;nh Adopt-a-Rainforest của họ. Ngo&agrave;i ra họ cũng l&agrave;m việc với một số trường học tr&ecirc;n cả nước để hỗ trợ gi&aacute;o vi&ecirc;n thực hiện kế hoạch giảng dạy.</li>\r\n	<li><strong>Chỉ số sinh th&aacute;i:</strong>&nbsp;Trang web cung cấp cho người d&ugrave;ng c&aacute;c th&ocirc;ng tin t&oacute;m tắt dự &aacute;n, mục ti&ecirc;u, th&ocirc;ng tin li&ecirc;n hệ, ng&acirc;n s&aacute;ch v&agrave; nh&agrave; t&agrave;i trợ của dự &aacute;n, c&aacute;c th&agrave;nh tựu v&agrave; mục ti&ecirc;u, b&agrave;i học r&uacute;t ra, c&aacute;c b&aacute;o c&aacute;o v&agrave; c&aacute;c trang web li&ecirc;n quan. Người d&ugrave;ng c&oacute; thể t&igrave;m kiếm chỉ số sinh th&aacute;i theo quốc gia, ph&acirc;n loại, tổ chức, nh&agrave; t&agrave;i trợ v&agrave;/hoặc t&ecirc;n dự &aacute;n. Trang web gi&uacute;p tạo ra mạng lưới c&aacute;c nh&agrave; bảo tồn đồng nhất bằng việc cung cấp cho họ kh&ocirc;ng gian để chia sẻ dữ liệu dự &aacute;n v&agrave; b&aacute;o c&aacute;o, c&aacute;c b&agrave;i học kinh nghiệm v&agrave; c&aacute;c điển h&igrave;nh tốt vượt qua r&agrave;o cản địa l&yacute; v&agrave; ng&ocirc;n ngữ.</li>\r\n</ul>\r\n\r\n<p>Truy cập&nbsp;<a href=\"http://www.rainforest-alliance.org/\">http://www.rainforest-alliance.org/</a>&nbsp;để biết th&ecirc;m th&ocirc;ng tin.</p>\r\n\r\n<p><img alt=\"\" src=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/07/eco_certified_rainforest_alliance.jpg\" style=\"height:180px; width:195px\" /></p>\r\n\r\n<hr />\r\n<p><strong>Rainforest Alliance (RA)&nbsp;</strong>l&agrave; một tổ chức phi ch&iacute;nh phủ (NGO) l&agrave;m việc nhằm bảo tồn đa dạng sinh học v&agrave; đảm bảo sinh kế bền vững bằng c&aacute;ch chuyển đổi tập qu&aacute;n sử dụng đất, tập qu&aacute;n kinh doanh v&agrave; h&agrave;nh vi của người ti&ecirc;u d&ugrave;ng. C&oacute; trụ sở ch&iacute;nh tại th&agrave;nh phố New York với c&aacute;c văn ph&ograve;ng tr&ecirc;n khắp Bắc Mỹ v&agrave; Nam Mỹ, ch&acirc;u &Aacute;, ch&acirc;u Phi v&agrave; ch&acirc;u &Acirc;u v&agrave; chương tr&igrave;nh l&agrave;m việc tại hơn 100 quốc gia, tổ chức n&agrave;y đ&atilde; gi&agrave;nh được một đ&aacute;nh gi&aacute; bốn sao của tổ chức Charity Navigator trong hơn năm năm li&ecirc;n tiếp. RA được Daniel Katz, một th&agrave;nh vi&ecirc;n trong hội đồng quản trị, th&agrave;nh lập v&agrave;o năm 1987, v&agrave; được dẫn dắt bởi Tổng thống Tensie Whelan.</p>\r\n\r\n<p>Rainforest Alliance khai th&aacute;c c&aacute;c lực lượng thị trường như một phần trong chiến lược của m&igrave;nh nhằm x&aacute;c định những t&aacute;c nh&acirc;n ch&iacute;nh của nạn ph&aacute; rừng v&agrave; t&agrave;n ph&aacute; m&ocirc;i trường: khai th&aacute;c gỗ, mở rộng canh t&aacute;c n&ocirc;ng nghiệp, chăn nu&ocirc;i gia s&uacute;c v&agrave; du lịch. Tổ chức n&agrave;y cũng đ&agrave;o tạo n&ocirc;ng d&acirc;n, c&aacute;n bộ l&acirc;m nghiệp v&agrave; những người khai th&aacute;c du lịch trong c&aacute;c hoạt động bền vững bảo tồn đất v&agrave; đường thủy, cải thiện đời sống, bảo vệ người lao động v&agrave; cộng đồng; tổ chức n&agrave;y cũng gi&uacute;p họ tiếp cận c&aacute;c nguồn t&agrave;i ch&iacute;nh cần thiết để thực hiện những thay đổi bền vững. C&aacute;c trang trại v&agrave; c&aacute;c doanh nghiệp l&acirc;m nghiệp được kiểm to&aacute;n theo c&aacute;c ti&ecirc;u chuẩn nghi&ecirc;m ngặt của Mạng lưới n&ocirc;ng nghiệp bền vững v&agrave; Hội đồng quản l&yacute; rừng &ndash; c&aacute;c tổ chức phi ch&iacute;nh phủ quốc tế m&agrave; Rainforest Alliance đ&atilde; hỗ trợ th&agrave;nh lập.</p>\r\n\r\n<p>Những trang trại v&agrave; doanh nghiệp m&agrave; đồng thời đ&aacute;p ứng được cả c&aacute;c cuộc kiểm to&aacute;n h&agrave;ng năm v&agrave; đột xuất sẽ được RA chứng nhận v&agrave; c&oacute; quyền sử dụng con dấu của RA. C&aacute;c doanh nghiệp du lịch m&agrave; th&ocirc;ng qua c&aacute;c thực h&agrave;nh quản l&yacute; tốt nhất đ&atilde; được thiết lập c&oacute; thể sử dụng nh&atilde;n hiệu do RA kiểm tra. Con dấu n&agrave;y gi&uacute;p người ti&ecirc;u d&ugrave;ng hỗ trợ những người d&acirc;n, c&aacute;n bộ l&acirc;m nghiệp v&agrave; doanh nghiệp du lịch c&oacute; tr&aacute;ch nhiệm bằng việc chỉ ra những sản phẩm c&oacute; th&agrave;nh phần từ những trang trại v&agrave; dịch vụ m&agrave; thực hiện những thực h&agrave;nh tốt nhất.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Nội dung trong c&aacute;c chương tr&igrave;nh của RA gồm:</p>\r\n\r\n<ul>\r\n	<li><strong>Chứng nhận rừng bền vững:&nbsp;</strong>&nbsp;Rainforest Alliance đ&atilde; đưa ra chương tr&igrave;nh chứng nhận rừng bền vững đầu ti&ecirc;n tr&ecirc;n thế giới v&agrave;o năm 1989 để khuyến kh&iacute;ch việc quản l&yacute; rừng, trang trại c&acirc;y giống v&agrave; t&agrave;i nguy&ecirc;n rừng theo định hướng thị trường v&agrave; c&oacute; tr&aacute;ch nhiệm với m&ocirc;i trường v&agrave; x&atilde; hội.</li>\r\n</ul>\r\n\r\n<p>Tổ chức n&agrave;y cũng kết nối c&aacute;c doanh nghiệp l&acirc;m nghiệp được chứng nhận với người mua l&acirc;m sản v&agrave; cung cấp hỗ trợ tiếp thị cho c&aacute;c doanh nghiệp l&acirc;m nghiệp cộng đồng. Bằng c&aacute;ch th&uacute;c đẩy x&acirc;y dựng xanh v&agrave; hỗ trợ c&aacute;c c&ocirc;ng ty thu mua l&acirc;m sản để kết hợp việc ph&aacute;t triển bền vững v&agrave;o c&aacute;c ch&iacute;nh s&aacute;ch t&igrave;m nguồn cung ứng của họ, RA cũng đang th&uacute;c đẩy tăng nhu cầu về c&aacute;c sản phẩm được chứng nhận.</p>\r\n\r\n<p>Ngo&agrave;i ra RA c&ograve;n cung cấp đ&agrave;o tạo v&agrave; hỗ trợ kỹ thuật cho c&aacute;c doanh nghiệp l&acirc;m nghiệp nhỏ về c&aacute;ch thức thực hiện c&aacute;c thực h&agrave;nh quản l&yacute; đất bền vững (đ&ocirc;i khi với mục đ&iacute;ch cuối c&ugrave;ng l&agrave; c&oacute; được chứng nhận) v&agrave; phổ biến cho người ti&ecirc;u d&ugrave;ng, c&aacute;c doanh nghiệp kinh doanh l&acirc;m sản về bảo tồn v&agrave; chứng nhận.</p>\r\n\r\n<ul>\r\n	<li><strong>Chứng nhận b&ugrave; đắp carbon:</strong>&nbsp;RA x&aacute;c minh c&aacute;c dự &aacute;n b&ugrave; đắp carbon theo c&aacute;c ti&ecirc;u chuẩn giải quyết vấn đề hấp thụ kh&iacute; g&acirc;y hiệu ứng nh&agrave; k&iacute;nh, bảo tồn đa dạng sinh học v&agrave; sinh kế bền vững.</li>\r\n	<li><strong>Chứng nhận N&ocirc;ng nghiệp bền vững:</strong>&nbsp;Chương tr&igrave;nh n&ocirc;ng nghiệp bền vững của RA bao gồm c&aacute;c chương tr&igrave;nh đ&agrave;o tạo v&agrave; chứng nhận cho c&aacute;c trang trại lớn, vừa v&agrave; nhỏ sản xuất c&aacute;c c&acirc;y trồng nhiệt đới như c&agrave; ph&ecirc;, chuối, ca cao, cam, c&aacute;c loại hoa tươi, dương xỉ v&agrave; tr&agrave;.</li>\r\n	<li><strong>C&aacute;c ti&ecirc;u ch&iacute; v&agrave; ti&ecirc;u chuẩn c&acirc;y trồng:</strong>&nbsp;Bao gồm một chương tr&igrave;nh bảo tồn hệ sinh th&aacute;i, bảo vệ động vật hoang d&atilde; v&agrave; đường thủy, cấm ph&acirc;n biệt chủng tộc trong c&ocirc;ng việc v&agrave; hoạt động tuyển dụng, cấm thu&ecirc; lao động trẻ em dưới 15 tuổi, sử dụng bảo hộ lao động, hướng dẫn về việc sử dụng h&oacute;a chất n&ocirc;ng nghiệp v&agrave; cấm c&aacute;c loại c&acirc;y trồng biến đổi gen.</li>\r\n	<li><strong>Dấu chứng nhận RA:</strong>&nbsp;Con dấu chứng nhận RA chỉ xuất hiện tr&ecirc;n c&aacute;c sản phẩm đ&aacute;p ứng c&aacute;c ti&ecirc;u chuẩn v&agrave; ti&ecirc;u ch&iacute; c&acirc;y trồng chi tiết b&ecirc;n tr&ecirc;n.</li>\r\n	<li><strong>Du lịch bền vững:</strong>&nbsp;RA đ&atilde; c&oacute; quyết định rằng việc hỗ trợ c&aacute;c chương tr&igrave;nh chứng nhận địa phương sẽ c&oacute; hiệu quả hơn (so với việc thiết lập c&aacute;c cơ quan chứng nhận ri&ecirc;ng của m&igrave;nh), gi&uacute;p tăng cường việc c&ocirc;ng nhận quốc tế v&agrave; thiết lập mạng lưới khu vực c&aacute;c chương tr&igrave;nh chứng nhận để chia sẻ t&agrave;i nguy&ecirc;n v&agrave; th&ocirc;ng tin v&agrave; thiết lập c&aacute;c ti&ecirc;u chuẩn chứng nhận. Ngo&agrave;i ra họ cũng hỗ trợ tiếp thị, đ&agrave;o tạo v&agrave; hỗ trợ kỹ thuật cho c&aacute;c doanh nghiệp được chứng nhận v&agrave; c&aacute;c doanh nghiệp đang trong qu&aacute; tr&igrave;nh được chứng nhận. Th&ecirc;m v&agrave;o đ&oacute;, họ cũng hợp t&aacute;c quốc tế để thiết lập c&aacute;c mối quan hệ với c&aacute;c nh&agrave; khai th&aacute;c du lịch (kh&aacute;ch sạn, nh&agrave; nghỉ, đại l&yacute; du lịch, &hellip;) để phủ xanh tất cả c&aacute;c yếu tố của của chuỗi cung ứng du lịch.</li>\r\n	<li><strong>Chương tr&igrave;nh gi&aacute;o dục:</strong>&nbsp;RA hoạt động để gi&uacute;p người d&acirc;n ở mọi lứa tuổi hiểu được vai tr&ograve; của mỗi người trong c&ocirc;ng t&aacute;c bảo tồn đa dạng sinh học. C&ocirc;ng việc n&agrave;y được thực hiện th&ocirc;ng qua khu vực gi&aacute;o duc &ndash; được ph&aacute;t triển trong mối li&ecirc;n hệ với c&aacute;c chuy&ecirc;n gia du lịch &ndash; v&agrave; chương tr&igrave;nh Adopt-a-Rainforest của họ. Ngo&agrave;i ra họ cũng l&agrave;m việc với một số trường học tr&ecirc;n cả nước để hỗ trợ gi&aacute;o vi&ecirc;n thực hiện kế hoạch giảng dạy.</li>\r\n	<li><strong>Chỉ số sinh th&aacute;i:</strong>&nbsp;Trang web cung cấp cho người d&ugrave;ng c&aacute;c th&ocirc;ng tin t&oacute;m tắt dự &aacute;n, mục ti&ecirc;u, th&ocirc;ng tin li&ecirc;n hệ, ng&acirc;n s&aacute;ch v&agrave; nh&agrave; t&agrave;i trợ của dự &aacute;n, c&aacute;c th&agrave;nh tựu v&agrave; mục ti&ecirc;u, b&agrave;i học r&uacute;t ra, c&aacute;c b&aacute;o c&aacute;o v&agrave; c&aacute;c trang web li&ecirc;n quan. Người d&ugrave;ng c&oacute; thể t&igrave;m kiếm chỉ số sinh th&aacute;i theo quốc gia, ph&acirc;n loại, tổ chức, nh&agrave; t&agrave;i trợ v&agrave;/hoặc t&ecirc;n dự &aacute;n. Trang web gi&uacute;p tạo ra mạng lưới c&aacute;c nh&agrave; bảo tồn đồng nhất bằng việc cung cấp cho họ kh&ocirc;ng gian để chia sẻ dữ liệu dự &aacute;n v&agrave; b&aacute;o c&aacute;o, c&aacute;c b&agrave;i học kinh nghiệm v&agrave; c&aacute;c điển h&igrave;nh tốt vượt qua r&agrave;o cản địa l&yacute; v&agrave; ng&ocirc;n ngữ.</li>\r\n</ul>\r\n\r\n<p>Truy cập&nbsp;<a href=\"http://www.rainforest-alliance.org/\">http://www.rainforest-alliance.org/</a>&nbsp;để biết th&ecirc;m th&ocirc;ng tin.</p>','Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit? Uterque enim summo bono fruitur, id est voluptate barbarorum pedibu','2017-10-20 03:24:28','2017-10-22 09:49:15'),(17,2,6,'Product quality','<p><strong>Rainforest Alliance (RA)&nbsp;</strong>&nbsp;is a non-governmental (NGO) working to conserve biodiversity and ensure sustainable livelihoods by transforming practices of land use, business practices and behavior Consumers.&nbsp;Headquartered in New York City with offices throughout North America and South America, Asia, Africa and Europe and work programs in more than 100 countries, the organization has earned a rating of four Charity Navigator stars of the organization for more than five consecutive years.&nbsp;RA Daniel Katz, a member of the board, established in 1987, and is led by President Tensie Whelan.</p>\r\n\r\n<p>Rainforest Alliance exploiting market forces as part of its strategy to identify the main agents of deforestation and environmental destruction: logging, expanding agriculture, livestock and travel.&nbsp;The organization also trained farmers, forestry workers and those who exploit tourism in sustainable activities and waterways soil conservation, improved livelihoods, protect workers and communities;&nbsp;Such organizations also help them access financial resources needed to implement sustainable changes.&nbsp;Farms and forestry businesses are audited according to the stringent standards of the Sustainable Agriculture Network and the Forest Stewardship Council - non-governmental organizations and international Rainforest Alliance has supported the establishment.</p>\r\n\r\n<p>Farms and businesses that simultaneously satisfies both annual audits and unscheduled will be RA certification and have the right to use the seal of RA.&nbsp;Tourism enterprises which through best management practices have been established can use check marks by RA.&nbsp;They help consumers to support these people, forest officials and tourism businesses have the responsibility by pointing out the products with ingredients from the farm and services that perform best practices .</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>The content of the programs of RA include:</p>\r\n\r\n<ul>\r\n	<li><strong>Certification of sustainable forest:&nbsp;</strong>&nbsp;Rainforest Alliance has launched certification program for sustainable forest first in the world in 1989 to encourage sustainable forest management, farm seedlings and forest resources according to market-oriented and accountable responsibility to the environment and society.</li>\r\n</ul>\r\n\r\n<p>The organization also connects businesses with forestry certified forest product buyers and provide marketing support for community forestry enterprises.&nbsp;By promoting green building and supporting companies purchasing of forest products to incorporate sustainable development into policies sourcing their RA is also boosting demand for certified products receive.</p>\r\n\r\n<p>Also RA also provides training and technical assistance for the forestry enterprises little about how the implementation of management practices sustainable land (sometimes with the ultimate goal is to get certified) and popular for consumers, the business enterprises of conservation and forest product certification.</p>\r\n\r\n<ul>\r\n	<li><strong>Certified carbon offset:</strong>&nbsp;RA verified carbon offset projects according to the standards solve problems caused to absorb greenhouse gases, conservation of biodiversity and sustainable livelihoods.</li>\r\n	<li><strong>Certified Sustainable Agriculture:</strong>&nbsp;Program Sustainable Agriculture of RA include training programs and certification for large farms, small and medium producers of tropical crops such as coffee, bananas, cocoa, oranges, fresh flowers, ferns and tea.</li>\r\n	<li><strong>The criteria and standards crops:</strong>&nbsp;&nbsp;Includes a program of conservation of ecosystems, protect wildlife and waterways, prohibiting racial discrimination in employment and recruitment activities, prohibit hire child labor under 15, use of labor protection, guidance on the use of agricultural chemicals and banned genetically modified crops.</li>\r\n	<li><strong>RA certification mark:</strong>&nbsp;&nbsp;Seal certified RA appear only on products that meet the standards and criteria for crop detail above.</li>\r\n	<li><strong>Sustainable tourism:</strong>&nbsp;&nbsp;RA had decided that the support programs local certification would be more effective (than the establishment of the certification body itself), enhances the international recognition and establish regional networks of certification programs to share resources and information and establish certification standards.&nbsp;In addition they are also marketing support, training and technical support for certified businesses and businesses that are in the process of being certified.&nbsp;In addition, they also international cooperation to establish relationships with the operators tourism (hotels, motels, travel agents, ...) for greening all elements of the supply chain travel app.</li>\r\n	<li><strong>Educational program:</strong>&nbsp;RA activities to help people of all ages understand the role of each person in the conservation of biodiversity.&nbsp;This work is done through the education sector - was developed in connection with the travel experts - and Adopt-a-program their Rainforest.&nbsp;They also work with several schools across the country to support teachers implement instructional strategies.</li>\r\n	<li><strong>Ecological indicators:</strong>&nbsp;The site provides users with information project summary, objectives, contact information, budgets and sponsors of the project, achievements and goals, lessons learned, reports and related sites.&nbsp;Users can search for ecological indicators by country, classify, organize, sponsor and / or the project name.&nbsp;Site to help create a network of conservation uniform by providing them space to share project data and reports, lessons learned and good practices to overcome geographical barriers and language language.</li>\r\n</ul>\r\n\r\n<p>Access&nbsp;&nbsp;<a href=\"http://www.rainforest-alliance.org/\">http://www.rainforest-alliance.org/</a>&nbsp;&nbsp;for more information.</p>','Cur tantas regiones barbarorum pedibus obiit, tot maria transmisit? Uterque enim summo bono fruitur, id est voluptate barbarorum pedibu','2017-10-20 03:24:28','2017-10-22 09:49:15'),(18,3,6,'Product quality','<p>Updating...</p>','Updating...','2017-10-20 03:24:28','2017-12-07 07:20:00'),(19,1,7,'Tin nhắn từ Pokofarms','','Pô Kô Farms tự hào là hợp tác xã lớn nhất vùng Đắk Hà, chuyên cung cấp cà phê nguyên liệu và các nông sản chất lượng cao, mang đặc trưng riêng, được trồng tại các nông trại nằm trên lưu vực dòng sông Pô Kô trù phú. Hãy ghé thăm website của Pô Kô Farms để ','2017-12-07 04:13:33','2017-12-07 04:13:33'),(20,2,7,'Pokofamrs message','','Pô Kô Farms is proud of being the biggest producer who supplier Fairtrade certified coffee with the unique Dak Ha quality. Visit our site for more and necessary information on Vietnam coffee','2017-12-07 04:14:26','2017-12-07 04:14:26'),(21,3,7,'信息','','Po Ko农场以拥有达喀尔（Dak Ha）品质的公平贸易认证咖啡为最大生产商而自豪。 访问我们的网站了解越南咖啡的更多信息','2017-12-07 04:19:08','2017-12-07 04:19:08'),(22,4,7,'Pokofamrs message','','Po Ko Farmsは、Dak Ha品質のフェアトレード認定コーヒーを持っている最大の生産者であることを誇りに思っています。 ベトナムのコーヒーに関するもっと必要な情報については、当サイトをご覧ください','2017-12-07 04:20:17','2017-12-07 04:20:17'),(23,5,7,'Pokofamrs message','','Po Ko Farms는 Dak Ha 품질의 Fairtrade 인증 커피를 보유한 가장 큰 생산자임을 자랑스럽게 생각합니다. 베트남 커피에 대한 더 많은 정보와 필요 정보는 저희 사이트를 방문하십시오.','2017-12-07 04:20:53','2017-12-07 04:20:53'),(24,1,8,'Nông dân nông trại Pô Kô','','Pô Kô farms và nông dân vùng Đắk Hà cùng nhau hướng tới một cuộc sống tốt đẹp hơn thông qua việc sản xuất cà phê có trách nhiệm. Pô Kô farms là lựa chọn uy tín hàng đầu của khách hàng khi mua sản phẩm cà phê nói riêng và nông sản nói chung được chứng nhận','2017-12-07 04:22:26','2017-12-07 07:06:36'),(25,2,8,'The Po Ko Farms Farmers','','For coffee exporters and importers, Pô Kô Farms as the biggest Fairtrade certified producer in the Dak Ha region, promises to bạnsistently deliver large quantities of Fairtrade certified coffee with the unique Dak Ha qualiy.  For specialty coffee buyers,','2017-12-07 04:22:45','2017-12-07 07:06:03'),(26,5,8,'Video message','','커피 수출 업체 및 수입업자들에게 Pako Farms는 Dak Ha 지역에서 가장 큰 Fairtrade 인증 생산 업체로서 독창적 인 Dak Ha 품질로 공정 무역 인증 커피를 대량 공급할 것을 약속합니다. 전문 커피 구매자 인 Pô Kô Farms는 Dak Ha 지역에서 유일하게 Fairtrade 인증을받은 생산자로서 독특한 Dak Ha 품질의 Fine Robusta Fairtrade 인증 커피를 제공 할 것을 약속합니다.','2017-12-07 04:23:06','2017-12-07 04:23:06'),(27,4,8,'Video message','','コーヒー輸出業者のために、Dak Ha地域で最大のフェアトレード認定プロデューサーであるPôKôFarmsは、ユニークなDak Ha qualiyで大量のフェアトレード認定コーヒーを提供することを約束しています。 専門コーヒーのバイヤーのために、Dak Ha地域の唯一のFairtrade認定プロデューサーであるPôKôFarmsは、ユニークなDak Ha品質のFine Robusta Fairtrade認定コーヒーを提供することを約束します','2017-12-07 04:23:37','2017-12-07 04:23:37'),(28,3,8,'Video message','','对于咖啡出口商和进口商，PôKô农场作为达喀尔地区最大的公平贸易认证生产商，承诺将以独特的Dak Ha质量交付大量经过公平贸易认证的咖啡。 对于特色咖啡的买家，PôKôFarms是达喀尔地区唯一一家获得公平贸易认证的生产商，承诺将以独特的达喀尔（Dak Ha）品质提供精致的罗布斯塔公平贸易认证咖啡','2017-12-07 04:23:53','2017-12-07 04:23:53'),(29,4,5,'製品起源','<p>公衆衛生（CSCC）は、FLOの基準によるクリーンコーヒーの生産に特化した、非営利団体のコンソーシアムであり、フェアトレードチャネルで配布されているため、きれいなコーヒーを生産しています。 CSCCは2009年5月28日にKon Tum州Dak Ha地区のDak Ha地区に設立されました。</p>\r\n\r\n<p>公衆衛生のために有機コーヒーを生産する協同組合（CSCC）は、自然条件のある地域に位置しています。 90％以上のCSCCメンバーシップは、困難な経済状況と戦争から帰還した兵士たちの小さな生産者です。平和な国の後で、多くの農民は苦しんでいる貧しい人々を逃れたいという希望で解決するために中部高原に祖国を残さなければなりませんでした。しかし、コーヒー価格の不確実性、自然条件への依存は、彼らの人生を困難にしてしまった。彼らがFairtradeに言い、ベトナムとホーイック民間企業のFlo-eV代表者の支持を受けたとき、運は微笑んだ。 2009年2月、43人の農家が、農業の知識を学び、共同生活で経済の困難を克服するための協力グループを結成しました。 CSCCは、最初の2つの組織のパートナーシップです。フェアトレード認証ベトナムでのFLO-cert組織（FLO ID：21 473）。 2014年には98団体の組織があり、認定された181.4haの面積はコーヒー豆で4,787トンです。</p>\r\n\r\n<p>当社の製品</p>\r\n\r\n<p>フェアトレード認定コーヒー<br />\r\nロブスタR1画面16湿度12.5％; 0.1％の黒色種子; 0.3％破砕穀物; 0.2％の不純物; 0.1％エクセルサ<br />\r\nロブスタR2画面13湿度13％; 2％+ブラックビーズバースト; 1％の不純物; 1％excelsa</p>\r\n\r\n<p><br />\r\n持続可能な生産</p>\r\n\r\n<p>世界第2位のコーヒー生産国であるにもかかわらず、私たちのカントリーコーヒーは依然として価格が不安定で、生産性と品質が高くなく、輸出価値が低いというリスクがあります。農家のための新しい方法：持続可能なコーヒー生産は、これらのリスクを抑制し、環境を保護し、農家や労働者にとって最高の作業環境を作り出すのに役立ちます。</p>\r\n\r\n<p>環境保護</p>\r\n\r\n<p>フェアトレードの環境基準に準拠したCSCCは、保護対策と環境保全を可能な限り維持しています。農業、炭素排出量、農産物、廃棄物などのトピックに関する研修会を組織し、人々のより高い水準への到達を促す。</p>\r\n\r\n<p>農家の利益</p>\r\n\r\n<p>農家は新しい公平なコーヒーフェアトレードが安定してコーヒーの価格を高め、製品の品質を向上させるのに役立ちました。フェアトレードコーヒーの販売による福祉資金は、メンバーに生産投資を助けるだけでなく、富を地域社会と共有するのにも役立ちます。彼らは子供のためにお金を借りたり、食べ物を買ったり、電気や水を払ったりするためにお金を借りる必要はありません。文化、幼稚園、道路の建設... 2014年までに、組織は02の文化的コミュニティを建設しました。同情の06家; 01幼稚園; 01農村道路; v&agrave;hỗtrợnhiều慈善団体、教育推進基金。</p>','公衆衛生（CSCC）は、FLOの基準によるクリーンコーヒーの生産に特化した、非営利団体のコンソーシアムであり、フェアトレードチャネルで配布されているため、きれいなコーヒーを生産しています。 CSCCは2009年5月28日にKon Tum州Dak Ha地区のDak Ha地区に設立されました。','2017-12-07 07:17:35','2017-12-07 07:17:35'),(30,5,5,'제품 원산지','<p>THT 커피는 공중 보건 (CSCC)이 FLO 기준에 따라 깨끗한 커피를 생산하고 공정 무역 채널을 통해 배포되는 비영리 단체의 컨소시엄이기 때문에 깨끗하게 생산됩니다. CSCC는 2009 년 5 월 28 일 Kum Tum 지방의 Dak Ha 지역 Dak Ha 지역에 설립되었습니다.</p>\r\n\r\n<p>공중 보건을위한 유기농 커피를 생산하는 협동 조합 (CSCC)은 자연 조건을 가진 지역 중 하나에 위치하고 있습니다. 90 % 이상의 CSCC 회원은 어려운 경제 상황과 병사가 전쟁에서 돌아온 소규모 생산자입니다. 평화로운 나라 이후, 많은 농부들은 고통받는 가난한 사람들을 피하고자하는 결심을하기 위해 중앙 고원에있는 고향을 떠나야했습니다. 그러나 커피 가격의 불확실성, 자연 조건에 대한 의존으로 인해 그들의 삶은 어려워졌습니다. 행운은 Fairtrade에 말했을 때 미소 지으며 베트남과 Huy Hung 민간 기업에서 Flo-eV 대표의 지원을 받았다. 2009 년 2 월 43 명의 농민들이 농업에 대한 지식을 배우고 농업에서의 어려움을 함께 극복하기 위해 협력 단체를 결성했습니다. CSCC는 처음 두 기관의 파트너십입니다. Fairtrade certification FLO-cert organization in Vietnam (FLO ID : 21 473). 2014 년에 98 개 회원 조직이 있으며 공인 된 181.4ha의 총 면적은 커피 콩으로 4,787 톤입니다.</p>\r\n\r\n<p>당사의 제품</p>\r\n\r\n<p>공정 무역 인증 커피<br />\r\nRobusta R1 화면 16 습도 12.5 %; 검은 씨앗 0.1 %; 0.3 % 깨진 입자; 0.2 % 불순물; 0.1 % 엑셀사<br />\r\n로부스타 R2 스크린 13 습도 13 %; 2 % + 블랙 비즈 버스트; 1 % 불순물; 1 % 엑셀사</p>\r\n\r\n<p><br />\r\n지속 가능한 생산</p>\r\n\r\n<p>세계에서 두 번째로 큰 커피 생산국이지만, 우리나라 커피는 아직도 불안정한 가격으로 위험을 초래하고 생산성과 품질은 높지 않고 수출 가치가 낮습니다. 농민을위한 새로운 길 : 지속 가능한 커피 생산은 이러한 위험을 줄이고 환경을 보호하며 농부와 근로자를위한 최상의 근무 환경을 조성하도록 돕습니다.</p>\r\n\r\n<p>환경 보호</p>\r\n\r\n<p>공정 무역의 환경 기준을 준수하는 CSCC는 보호 조치 및 환경 보전을 가능한 한 유지 관리하기 위해 최선을 다하고 있습니다. 농민, 탄소 배출량, 농산물 및 폐기물에 대한 주제별 교육 세션을 조직하여 사람들이 더 높은 기준에 도달하도록 장려합니다.</p>\r\n\r\n<p>농부를위한 혜택</p>\r\n\r\n<p>새로운 공평한 커피 공정 무역이 제품의 품질뿐만 아니라 커피 가격을 안정화시키고 인상시키는 데 도움을 준 반면 농부는 더욱 좋아졌습니다. 공정 무역 커피 판매로 인한 복지 자금은 회원들로 하여금 생산에 대한 투자를 도울뿐만 아니라 지역 사회와 부를 나누도록 돕습니다. 그들은 자녀를 위해 돈을 빌려야하고, 음식을 살며, 전기와 물을 지불 할 돈을 빌릴 필요가 없습니다 ... 그들은 건강 서비스에 더 많은 기회를 갖습니다. 문화, 유치원, 도로 건설 ... 2014 년까지이 조직은 02 문화 공동체를 건설했습니다. 연민의 06 집; 01 유치원; 01 농촌 도로; v&agrave; hỗ trợ nhiều 자선 단체, 교육 진흥 기금.</p>','THT 커피는 공중 보건 (CSCC)이 FLO 기준에 따라 깨끗한 커피를 생산하고 공정 무역 채널을 통해 배포되는 비영리 단체의 컨소시엄이기 때문에 깨끗하게 생산됩니다. CSCC는 2009 년 5 월 28 일 Kum Tum 지방의 Dak Ha 지역 Dak Ha 지역에 설립되었습니다.','2017-12-07 07:18:20','2017-12-07 07:18:20'),(31,4,6,'Product quality','<p>Updating...</p>','Updating...','2017-12-07 07:19:29','2017-12-07 07:19:54'),(32,5,6,'Product quality','<p>Updating...</p>','Updating...','2017-12-07 07:19:35','2017-12-07 07:19:49'),(33,4,3,'About us','<p>Updating...</p>','Updating...','2017-12-07 07:20:57','2017-12-07 07:20:57'),(34,5,3,'About us','<p>Updating...</p>','Updating...','2017-12-07 07:21:06','2017-12-07 07:21:06'),(35,4,2,'Purchase flow','<p>Updating...</p>','Updating...','2017-12-07 07:21:40','2017-12-07 07:21:40'),(36,5,2,'Purchase flow','<p>Updating...</p>','Updating...','2017-12-07 07:21:50','2017-12-07 07:21:50'),(37,4,1,'Purchase flow','<p>Updating...</p>','Updating...','2017-12-07 07:22:22','2017-12-07 07:22:22'),(38,5,1,'Purchase flow','<p>Updating...</p>','Updating...','2017-12-07 07:22:36','2017-12-07 07:22:36'),(39,4,4,'','<p>Updating...</p>','Updating...','2017-12-07 07:23:10','2017-12-07 07:23:44'),(40,5,4,'','<p>Updating...</p>','Updating...','2017-12-07 07:23:19','2017-12-07 07:23:19');
/*!40000 ALTER TABLE `info_page_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `info_pages`
--

DROP TABLE IF EXISTS `info_pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `info_pages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `info_pages`
--

LOCK TABLES `info_pages` WRITE;
/*!40000 ALTER TABLE `info_pages` DISABLE KEYS */;
INSERT INTO `info_pages` VALUES (1,'returns','returns','2017-10-19 18:38:33','2017-10-19 18:38:33',NULL),(2,'Purchase flow','purchase-flow','2017-10-19 18:38:33','2017-10-19 18:38:33',NULL),(3,'about','about','2017-10-19 18:38:33','2017-10-19 18:38:33',NULL),(4,'showrooms','showrooms','2017-10-19 18:38:33','2017-10-19 18:38:33',NULL),(5,'Product origin','product-origin','2017-10-20 03:23:52','2017-10-20 03:23:52',NULL),(6,'Product quality','product-quality','2017-10-20 03:24:28','2017-10-20 03:24:28',NULL),(7,'Pokofarms message','pokofarms-message','2017-12-07 04:12:32','2017-12-07 04:33:27',NULL),(8,'Video message','video-message','2017-12-07 04:21:56','2017-12-07 04:21:56',NULL);
/*!40000 ALTER TABLE `info_pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `languages`
--

DROP TABLE IF EXISTS `languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `languages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '1',
  `media_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `languages_media_id_foreign` (`media_id`),
  CONSTRAINT `languages_media_id_foreign` FOREIGN KEY (`media_id`) REFERENCES `medias` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `languages`
--

LOCK TABLES `languages` WRITE;
/*!40000 ALTER TABLE `languages` DISABLE KEYS */;
INSERT INTO `languages` VALUES (1,'Vietnamese','vi',1,NULL,'2017-10-19 18:38:32','2017-10-19 18:38:32'),(2,'English','en',1,NULL,'2017-10-19 18:38:32','2017-10-19 18:38:32'),(3,'Chinese','cn',1,NULL,'2017-10-19 18:38:32','2017-10-19 18:38:32'),(4,'Japanese','jp',1,NULL,'2017-10-30 06:23:52','2017-10-30 06:23:52'),(5,'Korean','kr',1,NULL,'2017-10-30 06:24:22','2017-10-30 06:24:22');
/*!40000 ALTER TABLE `languages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail_template_translations`
--

DROP TABLE IF EXISTS `mail_template_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mail_template_translations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `language_id` int(10) unsigned NOT NULL,
  `mail_template_id` int(10) unsigned NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `mail_template_translations_language_id_foreign` (`language_id`),
  KEY `mail_template_translations_mail_template_id_foreign` (`mail_template_id`),
  CONSTRAINT `mail_template_translations_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mail_template_translations_mail_template_id_foreign` FOREIGN KEY (`mail_template_id`) REFERENCES `mail_templates` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail_template_translations`
--

LOCK TABLES `mail_template_translations` WRITE;
/*!40000 ALTER TABLE `mail_template_translations` DISABLE KEYS */;
INSERT INTO `mail_template_translations` VALUES (1,1,1,'<p>Sale th&igrave; Sale th&ocirc;i</p>','Bùng nổ sale Black Friday','2017-10-31 03:11:15','2017-11-24 03:53:26'),(2,2,1,'<p><strong><img alt=\"\" src=\"/ckfinder/userfiles/images/download.jpeg\" style=\"height:900px; width:1600px\" />ffff</strong></p>','Title for English','2017-10-31 03:11:15','2017-11-13 09:39:22'),(3,3,1,NULL,NULL,'2017-10-31 03:11:15','2017-10-31 03:11:15'),(4,4,1,NULL,NULL,'2017-10-31 03:11:15','2017-10-31 03:11:15'),(5,5,1,NULL,NULL,'2017-10-31 03:11:15','2017-10-31 03:11:15');
/*!40000 ALTER TABLE `mail_template_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mail_templates`
--

DROP TABLE IF EXISTS `mail_templates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mail_templates` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mail_templates`
--

LOCK TABLES `mail_templates` WRITE;
/*!40000 ALTER TABLE `mail_templates` DISABLE KEYS */;
INSERT INTO `mail_templates` VALUES (1,'sale mùa hallowen vui vẻ','2017-10-31 03:11:15','2017-10-31 03:11:15');
/*!40000 ALTER TABLE `mail_templates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medias`
--

DROP TABLE IF EXISTS `medias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `medias` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `source` text COLLATE utf8mb4_unicode_ci,
  `thumb` text COLLATE utf8mb4_unicode_ci,
  `type` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medias`
--

LOCK TABLES `medias` WRITE;
/*!40000 ALTER TABLE `medias` DISABLE KEYS */;
INSERT INTO `medias` VALUES (6,NULL,NULL,'images/T9O6WpentZr53ZMh1hHswECHS8AVsJ2YeOUHnpd7.jpeg','images/T9O6WpentZr53ZMh1hHswECHS8AVsJ2YeOUHnpd7.jpeg',1,'2017-10-20 03:06:26','2017-10-20 03:06:26'),(12,NULL,NULL,'images/IFsmmAOtizvyMUwGJFE4aAj93q7n778SrKmwCZf1.jpeg','images/IFsmmAOtizvyMUwGJFE4aAj93q7n778SrKmwCZf1.jpeg',1,'2017-10-20 03:47:59','2017-10-20 03:47:59'),(23,'nguyenhat',NULL,'images/fm6OBYWSj9fqnGlp0fzLay13CD3sW02Vy1RMHHc4.jpeg','images/fm6OBYWSj9fqnGlp0fzLay13CD3sW02Vy1RMHHc4.jpeg',1,'2017-10-23 02:28:07','2017-10-23 02:28:07'),(25,'tuiloc',NULL,'images/wLj2v36fGBvG2LUrp3nu5GVPWnbkzpNoqGX3t1LK.jpeg','images/wLj2v36fGBvG2LUrp3nu5GVPWnbkzpNoqGX3t1LK.jpeg',1,'2017-10-23 02:30:00','2017-10-23 02:30:00'),(26,'rangxay',NULL,'images/Du5k76bIUkZW1PLv0Odc9Q9rQ6Ki6Ijh2SqtkHGM.jpeg','images/Du5k76bIUkZW1PLv0Odc9Q9rQ6Ki6Ijh2SqtkHGM.jpeg',1,'2017-10-23 02:33:49','2017-10-23 02:33:49'),(27,'matcha',NULL,'images/mgHqACqBVgd95vKhig1q5ZQ0VHRVZqiHur3MOTaD.jpeg','images/mgHqACqBVgd95vKhig1q5ZQ0VHRVZqiHur3MOTaD.jpeg',1,'2017-10-23 02:42:40','2017-10-23 02:42:40'),(30,'Matcha','Matcha','images/Bs0tH2ATbQusw53Lv0fnnKEfw8syuLZdoPPgwR7l.jpeg','images/Bs0tH2ATbQusw53Lv0fnnKEfw8syuLZdoPPgwR7l.jpeg',1,'2017-11-30 01:45:34','2017-11-30 01:45:34'),(33,'chon',NULL,'images/qTZhrZltJeFpe826wS3xietZ70lZRe5wzVL7QyhT.jpeg','images/qTZhrZltJeFpe826wS3xietZ70lZRe5wzVL7QyhT.jpeg',1,'2017-12-20 06:56:20','2017-12-20 06:56:20'),(50,'test',NULL,'images/av8N7ABmUXR356UhpiApTFdbgMpsITwgrm75lmos.jpeg','images/av8N7ABmUXR356UhpiApTFdbgMpsITwgrm75lmos.jpeg',1,'2017-12-22 02:00:56','2017-12-22 02:00:56'),(51,'test 2',NULL,'images/ac5I7uHa13UVzgOSC4B5DujZ4Z55gbH3JTVXWHwl.jpeg','images/ac5I7uHa13UVzgOSC4B5DujZ4Z55gbH3JTVXWHwl.jpeg',1,'2017-12-22 02:01:15','2017-12-22 02:01:15'),(52,NULL,NULL,'images/DfwmkWFuXnKjwFT2bTTBPrxpLuvmNDpar2szj1io.png','images/DfwmkWFuXnKjwFT2bTTBPrxpLuvmNDpar2szj1io.png',1,'2017-12-23 16:19:09','2017-12-23 16:19:09'),(53,NULL,NULL,'images/pvSeLEy2IPDizgENMsAaOmBOVs8xhJrMIdyXPNQA.png','images/pvSeLEy2IPDizgENMsAaOmBOVs8xhJrMIdyXPNQA.png',1,'2017-12-23 16:19:13','2017-12-23 16:19:13'),(54,NULL,NULL,'images/ehP6yAd5M63DN6KVEcYnxYtVYvuVZrVqVpVA0eWS.png','images/ehP6yAd5M63DN6KVEcYnxYtVYvuVZrVqVpVA0eWS.png',1,'2017-12-23 16:19:25','2017-12-23 16:19:25');
/*!40000 ALTER TABLE `medias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (55,'2014_10_12_000000_create_users_table',1),(56,'2014_10_12_100000_create_password_resets_table',1),(57,'2017_09_23_163332_entrust_setup_tables',1),(58,'2017_09_24_064800_create_tags_table',1),(59,'2017_09_25_141754_create_categories_table',1),(60,'2017_09_25_144448_create_book_addresses_table',1),(61,'2017_09_25_145309_create_medias_table',1),(62,'2017_09_25_145412_create_products_table',1),(63,'2017_09_25_150549_create_product_media_table',1),(64,'2017_09_25_151726_create_posts_table',1),(65,'2017_09_25_152021_create_post_media_table',1),(66,'2017_09_27_235425_create_languages_table',1),(67,'2017_09_27_235450_create_faqs_table',1),(68,'2017_09_27_235514_create_faq_translations_table',1),(69,'2017_10_06_021955_create_taggables_table',1),(70,'2017_10_06_023705_create_comments_table',1),(71,'2017_10_08_085432_create_info_pages_table',1),(72,'2017_10_08_085515_create_info_page_translations_table',1),(73,'2017_10_08_141106_create_orders_table',1),(74,'2017_10_08_141438_create_order_details_table',1),(75,'2017_10_08_143727_create_order_notes_table',1),(76,'2017_10_09_145344_create_sliders_table',1),(77,'2017_10_09_145448_create_slider_translations_table',1),(78,'2017_10_11_041656_create_post_translations_table',1),(79,'2017_10_11_041735_create_product_translations_table',1),(80,'2017_10_13_092027_create_category_translations_table',1),(81,'2017_10_15_154718_create_shoppingcart_table',1),(82,'2017_10_18_131558_create_subscribe_table',2),(83,'2017_10_18_134846_create_mail_templates_table',2),(84,'2017_10_18_165020_create_mail_template_translations_table',2),(85,'2017_10_19_144026_create_settings_table',2),(86,'2017_12_23_141328_create_galleries_table',3),(87,'2017_12_23_141606_create_gallery_media_table',3);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_details` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned NOT NULL,
  `order_id` int(10) unsigned NOT NULL,
  `price` decimal(12,0) NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT '0',
  `discount` decimal(12,0) NOT NULL,
  `total` decimal(12,0) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_details_product_id_foreign` (`product_id`),
  KEY `order_details_order_id_foreign` (`order_id`),
  CONSTRAINT `order_details_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  CONSTRAINT `order_details_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,5,1,40000,3,500,119500,'2017-10-20 04:27:10','2017-11-01 15:47:12'),(2,4,1,10000,10,250,99750,'2017-10-20 04:27:10','2017-11-01 15:47:43'),(6,6,3,0,4,0,0,'2017-10-22 15:52:13','2017-10-22 15:52:13'),(7,5,3,40000,2,0,80000,'2017-10-22 15:52:13','2017-10-22 15:52:13'),(8,5,4,40000,1,0,40000,'2017-10-30 07:50:36','2017-10-30 07:50:36'),(9,7,4,55000,2,0,110000,'2017-10-30 07:50:36','2017-10-30 07:50:36'),(10,5,5,40000,3,0,120000,'2017-10-30 07:55:51','2017-10-30 07:55:51'),(11,1,6,1000,10,0,10000,'2017-11-04 06:54:06','2017-11-04 06:54:06'),(12,4,7,10000,2,0,20000,'2017-11-07 03:44:48','2017-11-07 03:44:48'),(13,7,8,55000,7,0,385000,'2017-11-10 04:09:57','2017-11-10 04:09:57');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_notes`
--

DROP TABLE IF EXISTS `order_notes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `order_notes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `note` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_to_customer` tinyint(1) NOT NULL DEFAULT '0',
  `order_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_notes_order_id_foreign` (`order_id`),
  CONSTRAINT `order_notes_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_notes`
--

LOCK TABLES `order_notes` WRITE;
/*!40000 ALTER TABLE `order_notes` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_notes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_no` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_start_date` datetime NOT NULL,
  `order_end_date` datetime DEFAULT NULL,
  `order_tax` decimal(12,2) NOT NULL DEFAULT '0.00',
  `order_shipping_price` decimal(12,2) NOT NULL DEFAULT '0.00',
  `order_total` decimal(12,2) NOT NULL DEFAULT '0.00',
  `customer_id` int(10) unsigned NOT NULL,
  `billing_address_id` int(10) unsigned DEFAULT NULL,
  `shipping_address_id` int(10) unsigned DEFAULT NULL,
  `payment_method` tinyint(4) NOT NULL DEFAULT '0',
  `shipping_method` tinyint(4) NOT NULL DEFAULT '0',
  `order_status` tinyint(4) NOT NULL DEFAULT '0',
  `payment_status` tinyint(4) NOT NULL DEFAULT '0',
  `shipping_status` tinyint(4) NOT NULL DEFAULT '0',
  `note` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orders_customer_id_foreign` (`customer_id`),
  KEY `orders_billing_address_id_foreign` (`billing_address_id`),
  KEY `orders_shipping_address_id_foreign` (`shipping_address_id`),
  CONSTRAINT `orders_billing_address_id_foreign` FOREIGN KEY (`billing_address_id`) REFERENCES `book_addresses` (`id`),
  CONSTRAINT `orders_customer_id_foreign` FOREIGN KEY (`customer_id`) REFERENCES `users` (`id`),
  CONSTRAINT `orders_shipping_address_id_foreign` FOREIGN KEY (`shipping_address_id`) REFERENCES `book_addresses` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,'O2018-123','2017-10-20 04:27:10','2017-10-20 04:27:10',6.00,8.00,219250.00,1,1,1,4,1,2,2,1,NULL,'2017-10-20 04:27:10','2017-12-09 06:55:45',NULL),(2,'1710210610591','2017-10-21 18:22:59','2017-10-21 18:22:59',0.00,0.00,0.00,1,2,2,0,1,0,3,4,'test','2017-10-21 18:22:59','2017-11-01 15:49:36',NULL),(3,'1710220310132','2017-10-22 15:52:13','2017-10-22 15:52:13',0.00,0.00,80000.00,2,3,3,1,0,1,1,1,NULL,'2017-10-22 15:52:13','2017-10-22 15:52:13',NULL),(4,'1710300710361','2017-10-30 07:50:36','2017-10-30 07:50:36',0.00,0.00,150000.00,1,1,1,1,1,0,0,0,NULL,'2017-10-30 07:50:36','2017-10-30 07:50:36',NULL),(5,'1710300710511','2017-10-30 07:55:51','2017-10-30 07:55:51',0.00,0.00,120000.00,1,1,1,1,1,0,3,0,NULL,'2017-10-30 07:55:51','2017-11-01 16:08:23',NULL),(6,'1711040611061','2017-11-04 06:54:06','2017-11-04 06:54:06',0.00,0.00,10000.00,1,2,2,0,0,0,0,0,NULL,'2017-11-04 06:54:06','2017-11-04 06:54:06',NULL),(7,'1711070311481','2017-11-07 03:44:48','2017-11-07 03:44:48',0.00,0.00,20000.00,1,1,1,0,1,0,0,0,NULL,'2017-11-07 03:44:48','2017-11-07 03:44:48',NULL),(8,'1711100411571','2017-11-10 04:09:57','2017-11-10 04:09:57',0.00,0.00,385000.00,1,1,1,0,0,3,0,0,NULL,'2017-11-10 04:09:57','2017-12-04 14:40:56',NULL);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission_role` (
  `permission_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `permission_role_role_id_foreign` (`role_id`),
  CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_role`
--

LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,'role-list','Xem danh sách quyền','Xem danh sách quyền','2017-10-19 18:38:32','2017-10-19 18:38:32'),(2,'role-show','Hiển thị chi tiết quyền','Hiển thị chi tiết quyền','2017-10-19 18:38:32','2017-10-19 18:38:32'),(3,'role-create','Tạo mới quyền','Tạo mới quyền','2017-10-19 18:38:32','2017-10-19 18:38:32'),(4,'role-edit','Chỉnh sửa quyền','Chỉnh sửa quyền','2017-10-19 18:38:32','2017-10-19 18:38:32'),(5,'role-delete','Xóa quyền','Xóa quyền','2017-10-19 18:38:32','2017-10-19 18:38:32'),(6,'user-list','Xem danh sách tài khoản  người dùng','Xem danh sách tài khoản người dùng','2017-10-19 18:38:32','2017-10-19 18:38:32'),(7,'user-show','Hiển thị chi tiết tài khoản  người dùng','Hiển thị chi tiết tài khoản  người dùng','2017-10-19 18:38:32','2017-10-19 18:38:32'),(8,'user-create','Tạo mới tài khoản  người dùng','Tạo mới tài khoản  người dùng','2017-10-19 18:38:32','2017-10-19 18:38:32'),(9,'user-edit','Chỉnh sửa tài khoản người dùng','Chỉnh sửa tài khoản  người dùng','2017-10-19 18:38:32','2017-10-19 18:38:32'),(10,'user-delete','Xóa tài khoản người dùng','Xóa tài khoản người dùng','2017-10-19 18:38:32','2017-10-19 18:38:32'),(11,'order-list','Xem danh sách đơn đặt hàng theo người dùng','Xem danh sách đơn đặt hàng theo người dùng','2017-10-19 18:38:32','2017-10-19 18:38:32'),(12,'order-show','Hiển thị chi tiết đơn đặt hàng theo người dùng','Hiển thị chi tiết đơn đặt hàng theo người dùng','2017-10-19 18:38:32','2017-10-19 18:38:32'),(13,'order-create','Tạo mới đơn đặt hàng theo người dùng','Tạo mới đơn đặt hàng theo người dùng','2017-10-19 18:38:32','2017-10-19 18:38:32'),(14,'order-edit','Chỉnh sửa đơn đặt hàng theo người dùng','Chỉnh sửa đơn đặt hàng theo người dùng','2017-10-19 18:38:32','2017-10-19 18:38:32'),(15,'order-delete','Xóa đơn đặt hàng theo người dùng','Xóa đơn đặt hàng theo người dùng','2017-10-19 18:38:32','2017-10-19 18:38:32');
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_media`
--

DROP TABLE IF EXISTS `post_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_media` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `post_id` int(10) unsigned NOT NULL,
  `media_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `post_media_post_id_foreign` (`post_id`),
  KEY `post_media_media_id_foreign` (`media_id`),
  CONSTRAINT `post_media_media_id_foreign` FOREIGN KEY (`media_id`) REFERENCES `medias` (`id`),
  CONSTRAINT `post_media_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_media`
--

LOCK TABLES `post_media` WRITE;
/*!40000 ALTER TABLE `post_media` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_translations`
--

DROP TABLE IF EXISTS `post_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post_translations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `language_id` int(10) unsigned NOT NULL,
  `post_id` int(10) unsigned NOT NULL,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `excerpt` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `content` text COLLATE utf8mb4_unicode_ci,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `post_translations_language_id_foreign` (`language_id`),
  KEY `post_translations_post_id_foreign` (`post_id`),
  CONSTRAINT `post_translations_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `post_translations_post_id_foreign` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_translations`
--

LOCK TABLES `post_translations` WRITE;
/*!40000 ALTER TABLE `post_translations` DISABLE KEYS */;
INSERT INTO `post_translations` VALUES (1,1,1,'Ca phe va bo','VI Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et','VI Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis','VI Description','2017-10-19 18:38:33','2017-10-19 18:38:33'),(2,2,1,'Coffee and dad','EN Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et','EN Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis','EN Description','2017-10-19 18:38:33','2017-10-19 18:38:33'),(3,3,1,'CN Coffee and dad','CN Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et','CN Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi. Curabitur ligula sapien, tincidunt non, euismod vitae, posuere imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis orci. Phasellus consectetuer vestibulum elit. Aenean tellus metus, bibendum sed, posuere ac, mattis non, nunc. Vestibulum fringilla pede sit amet augue. In turpis. Pellentesque posuere. Praesent turpis. Aenean posuere, tortor sed cursus feugiat, nunc augue blandit nunc, eu sollicitudin urna dolor sagittis lacus. Donec elit libero, sodales nec, volutpat a, suscipit non, turpis. Nullam sagittis. Suspendisse pulvinar, augue ac venenatis condimentum, sem libero volutpat nibh, nec pellentesque velit pede quis nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce id purus. Ut varius tincidunt libero. Phasellus dolor. Maecenas vestibulum mollis','CN Description','2017-10-19 18:38:33','2017-10-19 18:38:33'),(4,1,2,'3 cách làm món ăn từ trái ổi','Ổi Thanh Hà là một trong những loại quả có giá trị dinh dưỡng rất cao, ổi chứa ít chất béo bão hoà, cholesterol và natri, còn chứa nhiều chất xơ, vitamin C, A, kẽm, kali và mangan giúp bảo vệ','<p><strong>Ổi ướp lạnh:</strong>&nbsp;Gi&uacute;p giải nhiệt khi thời tiết nắng n&oacute;ng.</p>\r\n\r\n<p>- Lấy phần nạc của ổi, xắt nhỏ v&agrave; xay nhuyễn.</p>\r\n\r\n<p>- Cho nước chanh tươi, rượu vodka v&agrave; đường xay th&ecirc;m cho đều.</p>\r\n\r\n<p>- Cho hỗn hợp v&agrave;o tủ lạnh trong khoảng 45-60 ph&uacute;t. Ngo&agrave;i ra, c&oacute; thể cho hỗn hợp v&agrave;o tủ l&agrave;m đ&ocirc;ng để ăn như kem th&ocirc;ng thường.</p>\r\n\r\n<p><strong>Ổi trộn:</strong>&nbsp;Gi&uacute;p giảm c&acirc;n v&agrave; bồi dưỡng thể lực.</p>\r\n\r\n<p>- Gọt vỏ ổi, chỉ lấy phần nạc v&agrave; xắt th&agrave;nh từng l&aacute;t vừa ăn, cam gọt vỏ xắt từng l&aacute;t mỏng, chuối xắt khoanh tr&ograve;n sau đ&oacute; trộn đều ba loại với nhau.</p>\r\n\r\n<p>- Rưới nước chanh tươi v&agrave;o hỗn hợp, trộn đều.</p>\r\n\r\n<p>- Trước khi ăn, rưới th&ecirc;m mật ong.</p>\r\n\r\n<p>- Bạn c&oacute; thể cho v&agrave;o tủ lạnh khoảng một giờ trước khi d&ugrave;ng.</p>\r\n\r\n<p><strong>Nước &eacute;p ổi:</strong>&nbsp;Tăng cường sức khoẻ.</p>\r\n\r\n<p>- Ổi bỏ vỏ, moi bỏ hạt, &eacute;p lấy nước, cho th&ecirc;m &iacute;t muối v&agrave; đường.</p>\r\n\r\n<p>- Ngon hơn khi uống lạnh.</p>','Cách làm ổi ướp lạnh, ổi trộn, nước ép ổi đánh tan cơn khát trong hè nắng nóng...','2017-10-20 03:12:09','2017-11-02 06:34:57'),(5,2,2,'3 ways to make food from guava','Thanh Ha is one of the fruits of high nutritional value. The guava is low in saturated fat, cholesterol and sodium. It contains fiber, vitamins C, A, zinc, potassium and manganese for protect','<p>Chilled: Helps to cool when the weather is hot.</p>\r\n\r\n<p>- Take the lean part of guava, chopped and pureed.</p>\r\n\r\n<p>- Add the fresh lemon juice, vodka and sugar until smooth.</p>\r\n\r\n<p>- Put the mixture in the refrigerator for 45-60 minutes. In addition, can be mixed into the freezer to eat as usual cream.</p>\r\n\r\n<p>Mix: Helps lose weight and improves physical fitness.</p>\r\n\r\n<p>- Peel the guava, take only the lean and cut into each slice just eat, orange peeled sliced thin slices, bananas cut into circles then mixed all three types together.</p>\r\n\r\n<p>- Add fresh lemon juice to the mixture, mix well.</p>\r\n\r\n<p>- Before eating, add honey.</p>\r\n\r\n<p>- You can put in the fridge about an hour before use.</p>\r\n\r\n<p>Guinea pig: Improve health.</p>\r\n\r\n<p>- Remove the peel, remove seeds, squeeze water, add some salt and sugar.</p>\r\n\r\n<p>- More delicious cold drink.</p>','','2017-10-20 03:14:55','2017-10-20 03:14:55'),(6,1,3,'Cách giảm cân bằng mật ong hiệu quả','Mật ong nguyên chất ngoài việc chăm sóc da nó còn có thể giúp bạn giảm cân hiệu quả nhưng bạn cần phải biết sử dụng đúng cách, đúng liều lượng thì mới có thể giảm cân bằng mật ong một cách nh','<h2><strong>+ GIẢM C&Acirc;N BẰNG MẬT ONG ĐƯỢC NHIỀU NGƯỜI &Aacute;P DỤNG NHẤT HIỆN NAY</strong></h2>\r\n\r\n<p>- Mật ong c&oacute; chứa vitamin, kho&aacute;ng chất v&agrave; a-x&iacute;t amino. Tất cả những yếu tố n&agrave;y đều c&oacute; t&aacute;c dụng k&iacute;ch th&iacute;ch qu&aacute; tr&igrave;nh trao đổi chất b&eacute;o v&agrave; cholesterol, gi&uacute;p duy tr&igrave; trọng lượng cơ thể v&agrave; ngăn ngừa b&eacute;o ph&igrave;. V&igrave; thế c&aacute;ch&nbsp;giảm c&acirc;n bằng mật ong&nbsp;lu&ocirc;n l&agrave; sự lựa chọn h&agrave;ng đầu với người cần giảm c&acirc;n.</p>\r\n\r\n<p>- Mật ong l&agrave; một chất chống vi tr&ugrave;ng hiệu quả, rất c&oacute; lợi cho to&agrave;n bộ đường ruột. Lượng en-zim hiện hữu trong mật ong c&oacute; thể sản sinh ra một lượng nhỏ &ocirc;-xi gi&agrave; hy-đr&ocirc;, c&oacute; thể gi&uacute;p trị vi&ecirc;m dạ d&agrave;y.</p>\r\n\r\n<h2><strong>+ C&Aacute;CH GIẢM C&Acirc;N BẰNG MẬT ONG ĐỂ GIẢM C&Acirc;N HIỆU QUẢ V&Agrave; AN TO&Agrave;N!!</strong></h2>\r\n\r\n<p>- Ba ng&agrave;y đầu ti&ecirc;n, bạn vẫn ăn s&aacute;ng v&agrave; trưa đầy đủ, nhưng cắt bữa tối bằng c&aacute;ch pha 1 muỗng mật ong với một&nbsp; cốc nước ấm để uống. Tới tầm 9h nếu thấy đ&oacute;i lại tiếp tục pha mật ong với tr&agrave; để tạo cảm gi&aacute;c no.</p>\r\n\r\n<p>- Sang ng&agrave;y thứ 4, bạn chỉ ăn đầy đủ bữa s&aacute;ng, cắt bữa trưa v&agrave; tối, thay bằng mật ong v&agrave; nước ấm.</p>\r\n\r\n<p><img alt=\"Mật ong\" src=\"http://shopnongsan.vn/assets/uploads/images/cam/giam%20ca.jpg\" style=\"height:302px; width:500px\" /></p>\r\n\r\n<p>- Để c&aacute;ch&nbsp;giảm c&acirc;n bằng mật ong&nbsp;hiệu quả&nbsp;nhất bạn cần tạo cho m&igrave;nh một th&oacute;i quen sinh hoạt l&agrave;nh mạnh v&agrave; khoa học như:</p>\r\n\r\n<ul>\r\n	<li>Tập thể dục thường xuy&ecirc;n.</li>\r\n	<li>Hạn chế c&aacute;c chất k&iacute;ch th&iacute;ch như: bia, rượu, thuốc l&aacute; .</li>\r\n	<li>Hạn chế ăn vặt, ăn thức ăn nhanh .</li>\r\n	<li>Hạn chế ăn đồ ăn chứa nhiều chất b&eacute;o.</li>\r\n</ul>\r\n\r\n<p>+ Lưu &yacute;:</p>\r\n\r\n<p>- Kh&ocirc;ng n&ecirc;n pha mật ong với nước s&ocirc;i n&oacute;ng hoặc nấu mật ong ở nhiệt độ cao, bởi v&igrave; l&agrave;m n&oacute;ng kh&ocirc;ng th&iacute;ch hợp sẽ l&agrave;m cho dưỡng chất trong mật ong bị ph&aacute; hỏng nghi&ecirc;m trọng, l&agrave;m cho chất x&uacute;c t&aacute;c trong mật ong mất đi.</p>','','2017-10-20 03:19:19','2017-10-20 03:19:19'),(7,2,3,'How to lose honey effectively','Honey pure in addition to skin care it can help you lose weight effectively, but you need to know the right way, the right dose can lose weight honey quickly.','<p>REDUCE THE BALANCE OF HUMAN BEING MANY MORE</p>\r\n\r\n<p>- Honey contains vitamins, minerals and amino acids. All these factors stimulate the metabolism of fats and cholesterol, help maintain body weight and prevent obesity. Honey weight loss is always a top choice for people who need to lose weight.</p>\r\n\r\n<p>- Honey is an effective antiseptic, very beneficial for the entire intestines. The amount of enzymes present in honey can produce a small amount of hydrogen peroxide, which can help with stomach inflammation.</p>\r\n\r\n<p>+ HOW TO REDUCE THE HUMIDITY BALANCE TO REDUCE EFFICIENCY AND SAFETY !!</p>\r\n\r\n<p>- The first three days, you still eat breakfast and lunch, but cut the dinner by mixing 1 tablespoon of honey with a glass of warm water to drink. Go to 9h if hungry, continue to make honey with tea to make sense of full.</p>\r\n\r\n<p>- On the fourth day, you only eat breakfast, cut lunch and dinner, instead of honey and warm water.</p>\r\n\r\n<p>Honey</p>\r\n\r\n<p>- For the most effective way to lose honey balance you need to create a healthy and scientific habit such as:</p>\r\n\r\n<p>Exercise regularly.<br />\r\nLimit stimulants such as beer, alcohol, cigarettes.<br />\r\nLimit snacks, eat fast food.<br />\r\nLimit foods high in fat.<br />\r\n+ Note:</p>\r\n\r\n<p>- Do not mix honey with hot boiling water or cook honey at high temperatures, because improper heating will cause nutrients in the honey to be severely damaged, causing the catalyst in the honey to lose. .</p>','','2017-10-20 03:20:15','2017-10-20 03:20:15'),(8,1,4,'Hội chợ Làng nghề Việt Nam lần thứ XI năm 2015','Từ ngày 10 đến 16/12/2015 tại Nhà triển lãm Nông nghiệp Việt Nam (số 489 Hoàng Quốc Việt, Cầu Giấy, Hà Nội)., sẽ diễn ra Hội chợ Làng nghề Việt Nam lần thứ XI năm 2015 do Bộ NN-PTNT tổ chứ','<p>From 10 to 12/16/2015 at the Vietnam Agricultural Exhibition (No. 489 Hoang Quoc Vietnam, Cau Giay District, Hanoi)., Will take place Fair Trade Village Eleventh Vietnam Ministry of Agriculture in 2015 by Rural organizations.</p>\r\n\r\n<p><a href=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/12/54d427858e1a0.jpg\"><img alt=\"54d427858e1a0\" src=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/12/54d427858e1a0-300x199.jpg\" style=\"height:270px; margin:0px auto; width:407px\" /></a></p>\r\n\r\n<p>This activity is to introduce, promote and trade the group&#39;s major agricultural commodity products, handicrafts of Vietnam in 2015. The fair is the trade promotion activities (trade promotion) important to promote activities economic exchanges, enhance the activity of branding, product, tour deals, shopping contribute to the village as well as agricultural commodities into commodities commercial and high added value.&nbsp;This is an annual activity of the MARD meant to encourage the creativity of the artisans, craftsmen and manufacturers of business to contribute to improving the quality, elite culture handicraft villages traditional Vietnam.</p>\r\n\r\n<p>Especially all, &quot;festival tasting and promotion of coffee products in Vietnam&quot; held from 10/12 - 16/12 in the fair campus on 300 m2 area by the Association of Coffee - Cocoa Vietnam Coordinator with Agriculture Trade Promotion Center organization.&nbsp;Coffee DakMark are honored to bring these products clean your coffee here to introduce and communicate with friends and customers from near and far.</p>\r\n\r\n<p>In addition, many cultural activities, excellent art will also be held during the fair such as: Demonstration of occupations represented by the union artisans, craftsmen good come from villages traditional crafts famous nationwide demonstration, crafted products at the fair;&nbsp;cultural performances - music, organize music programs, cultural exchanges in the arts take place at the fair to attract visitors;&nbsp;organizing delegations artisans, craftsmen, farmers visit and exchanges at the fair (BTC fair collaboration with the Department of Agriculture PTNThon, Center for Agriculture, Peasants provinces and cities expected to take about 2,000 artisans, craftsmen, farmers, manufacturers of the provinces and cities to visit, exchange and learning at the fair).</p>\r\n\r\n<p><a href=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/12/11377123_395532513972471_4399641000136171672_n.jpg\"><img alt=\"11377123_395532513972471_4399641000136171672_n\" src=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/12/11377123_395532513972471_4399641000136171672_n-300x113.jpg\" style=\"height:182px; margin:0px auto; width:483px\" /></a></p>\r\n\r\n<p>Fair promises to bring opportunities to exchange and collaboration for businesses across the country in general and in particular DakMark Coffee.&nbsp;DakMark Coffee very pleased to welcome you to the exhibition of Agriculture Vietnam (489 Hoang Quoc Vietnam, Cau Giay District, Hanoi) to enjoy the taste of organic coffee delicious, pure and receive attractive gifts in our Game show.</p>','Từ ngày 10 đến 16/12/2015 tại Nhà triển lãm Nông nghiệp Việt Nam (số 489 Hoàng Quốc Việt, Cầu Giấy, Hà Nội)., sẽ diễn ra Hội chợ Làng nghề Việt Nam lần thứ XI năm 2015 do Bộ NN-PTNT tổ chứ','2017-10-20 03:22:40','2017-10-23 06:30:46'),(9,2,4,'Vietnam Craft Village Fair XI th 2015','From 10 to 12/16/2015 at the Vietnam Agricultural Exhibition (No. 489 Hoang Quoc Vietnam, Cau Giay District, Hanoi)., Will take place Fair Trade Village Eleventh Vietnam Ministry of Agricultu','<p>From 10 to 12/16/2015 at the Vietnam Agricultural Exhibition (No. 489 Hoang Quoc Vietnam, Cau Giay District, Hanoi)., Will take place Fair Trade Village Eleventh Vietnam Ministry of Agriculture in 2015 by Rural organizations.</p>\r\n\r\n<p><a href=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/12/54d427858e1a0.jpg\"><img alt=\"54d427858e1a0\" src=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/12/54d427858e1a0-300x199.jpg\" style=\"height:270px; margin:0px auto; width:407px\" /></a></p>\r\n\r\n<p>This activity is to introduce, promote and trade the group&#39;s major agricultural commodity products, handicrafts of Vietnam in 2015. The fair is the trade promotion activities (trade promotion) important to promote activities economic exchanges, enhance the activity of branding, product, tour deals, shopping contribute to the village as well as agricultural commodities into commodities commercial and high added value.&nbsp;This is an annual activity of the MARD meant to encourage the creativity of the artisans, craftsmen and manufacturers of business to contribute to improving the quality, elite culture handicraft villages traditional Vietnam.</p>\r\n\r\n<p>Especially all, &quot;festival tasting and promotion of coffee products in Vietnam&quot; held from 10/12 - 16/12 in the fair campus on 300 m2 area by the Association of Coffee - Cocoa Vietnam Coordinator with Agriculture Trade Promotion Center organization.&nbsp;Coffee DakMark are honored to bring these products clean your coffee here to introduce and communicate with friends and customers from near and far.</p>\r\n\r\n<p>In addition, many cultural activities, excellent art will also be held during the fair such as: Demonstration of occupations represented by the union artisans, craftsmen good come from villages traditional crafts famous nationwide demonstration, crafted products at the fair;&nbsp;cultural performances - music, organize music programs, cultural exchanges in the arts take place at the fair to attract visitors;&nbsp;organizing delegations artisans, craftsmen, farmers visit and exchanges at the fair (BTC fair collaboration with the Department of Agriculture PTNThon, Center for Agriculture, Peasants provinces and cities expected to take about 2,000 artisans, craftsmen, farmers, manufacturers of the provinces and cities to visit, exchange and learning at the fair).</p>\r\n\r\n<p><a href=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/12/11377123_395532513972471_4399641000136171672_n.jpg\"><img alt=\"11377123_395532513972471_4399641000136171672_n\" src=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/12/11377123_395532513972471_4399641000136171672_n-300x113.jpg\" style=\"height:182px; margin:0px auto; width:483px\" /></a></p>\r\n\r\n<p>Fair promises to bring opportunities to exchange and collaboration for businesses across the country in general and in particular DakMark Coffee.&nbsp;DakMark Coffee very pleased to welcome you to the exhibition of Agriculture Vietnam (489 Hoang Quoc Vietnam, Cau Giay District, Hanoi) to enjoy the taste of organic coffee delicious, pure and receive attractive gifts in our Game show.</p>','From 10 to 12/16/2015 at the Vietnam Agricultural Exhibition (No. 489 Hoang Quoc Vietnam, Cau Giay District, Hanoi)., Will take place Fair Trade Village Eleventh Vietnam Ministry of Agricultu','2017-10-20 03:23:28','2017-10-23 06:30:26'),(10,1,5,'Hạt hạnh nhân có tác dụng gì','Hạnh nhân là loại hạt ăn được mọc trên cây Prunus dulcis, thường được gọi là cây hạnh nhân. Hạnh nhân có nguồn gốc ở Trung Đông, nhưng Hoa Kỳ hiện là nhà sản xuất lớn nhất thế giới và hình ản','<p>&nbsp;</p>\r\n\r\n<h1>Hạt hạnh nh&acirc;n c&oacute; t&aacute;c dụng g&igrave;</h1>\r\n\r\n<p><strong>Trong tủ lạnh nh&agrave; m&igrave;nh kh&ocirc;ng bao giờ thiếu hạnh nh&acirc;n, v&igrave; nh&agrave; m&igrave;nh c&oacute; trẻ em v&agrave; người gi&agrave;, họ cần ch&uacute;ng cho c&aacute;c bữa ăn vặt, ăn v&igrave; sức khỏe v&agrave; hơn thế nữa.</strong></p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Thật may mắn trong cuộc sống của c&aacute;c con nh&agrave; m&igrave;nh, hạnh nh&acirc;n l&agrave; m&oacute;n lu&ocirc;n hiện hữu trong thực đơn dinh dưỡng của ch&uacute;ng. &nbsp;Hồi m&igrave;nh mang bầu, em g&aacute;i m&igrave;nh ở Mỹ bảo c&oacute; bầu h&atilde;y ăn hạnh nh&acirc;n, rất tốt cho sức khỏe, thậm ch&iacute; đ&oacute; cũng l&agrave; m&oacute;n cực k&igrave; tốt cho cả trẻ em gi&uacute;p cơ thể trả ph&aacute;t triển một c&aacute;ch to&agrave;n diện.</strong></p>\r\n\r\n<p><strong>Trong b&agrave;i n&agrave;y, m&igrave;nh sẽ n&ecirc;u r&otilde; c&aacute;c l&yacute; do tại sao ch&uacute;ng ta n&ecirc;n ăn hạnh nh&acirc;n v&agrave; t&aacute;c dụng của hạnh nh&acirc;n với sức khỏe con người:</strong></p>\r\n\r\n<p>Hạnh nh&acirc;n l&agrave; loại hạt ăn được mọc tr&ecirc;n c&acirc;y Prunus dulcis, thường được gọi l&agrave; c&acirc;y hạnh nh&acirc;n. Hạnh nh&acirc;n c&oacute; nguồn gốc ở Trung Đ&ocirc;ng, nhưng Hoa Kỳ hiện l&agrave; nh&agrave; sản xuất lớn nhất thế giới v&agrave; h&igrave;nh ảnh hạnh nh&acirc;n lu&ocirc;n gắn liền với h&igrave;nh ảnh của nước Mỹ, l&agrave; sản phẩm n&ocirc;ng nghiệp chủ đạo của đất nước n&agrave;y.</p>\r\n\r\n<p><img alt=\"\" src=\"http://hatdieu.org/wp-content/uploads/2017/02/almonds-1-e1487995062459.jpg\" style=\"height:398px; width:600px\" /></p>\r\n\r\n<p>Hạnh nh&acirc;n c&oacute; một hồ sơ dinh dưỡng rất ấn tượng, ch&uacute;ng l&agrave; loại hạt c&oacute; chứa nhiều dinh dưỡng hơn tất cả c&aacute;c loại hạt kh&aacute;c, xếp sau hạnh nh&acirc;n l&agrave; hạt điều, kế đến &oacute;c ch&oacute; v&agrave; mắc ca.</p>\r\n\r\n<ul>\r\n	<li><em>Một quả hạnh nh&acirc;n 28gr chứa:</em></li>\r\n	<li>Chất xơ: 3,5 gram.<br />\r\n	Protein: 6 gram.</li>\r\n	<li>Canxi:75 miligam<br />\r\n	Chất b&eacute;o: 14 gram (trong đ&oacute; 9 loại l&agrave; kh&ocirc;ng b&atilde;o h&ograve;a đơn).<br />\r\n	Vitamin E: 37% RDA.<br />\r\n	Mangan: 32% RDA.<br />\r\n	Magie: 20% RDA.<br />\r\n	Ch&uacute;ng cũng chứa một lượng đồng, vitamin B2 (riboflavin) v&agrave; phốt pho.<br />\r\n	Hạnh nh&acirc;n cung cấp chỉ 161 calo v&agrave; 2,5 gam carbohydrate ti&ecirc;u h&oacute;a.</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Cũng cần lưu &yacute; rằng 10-15% lượng calo của quả hạnh kh&ocirc;ng bị hấp thu bởi cơ thể v&igrave; chất b&eacute;o qu&aacute; kh&oacute; tiếp cận v&agrave; bị ph&aacute; vỡ . N&ecirc;n&nbsp;<em>&nbsp;hạnh nh&acirc;n dung nạp nhiều vẫn kh&ocirc;ng c&oacute; hại cho cơ thể , trẻ em, b&agrave; bầu hay người gi&agrave; khi ăn đều c&oacute; lợi m&agrave; kh&ocirc;ng sợ tăng c&acirc;n qu&aacute; nhiều.</em></p>\r\n\r\n<h3>&nbsp;</h3>\r\n\r\n<h3><strong>2. Hạnh nh&acirc;n chứa đầy chất chống oxy ho&aacute;, ngăn ngừa ung thư v&agrave; l&agrave;m đẹp da</strong></h3>\r\n\r\n<p>Trong hạnh nh&acirc;n c&oacute; chứa chất chống oxy h&oacute;a cực mạnh. C&aacute;c chất chống oxy h&oacute;a gi&uacute;p bảo vệ cơ thể chống lại sự oxy h&oacute;a, c&oacute; thể ph&aacute; huỷ c&aacute;c tế b&agrave;o ung thư, ngăn chặn sự ph&aacute;t triển v&agrave; l&acirc;y lan của n&oacute;.</p>\r\n\r\n<ul>\r\n	<li>L&ecirc; đọc c&aacute;i t&agrave;i liệu nghi&ecirc;n cứu l&acirc;u năm của c&aacute;c nh&agrave; Khoa học mỹ nghi&ecirc;n cứu chỉ ra rằng: C&aacute;c chất chống oxy h&oacute;a mạnh mẽ chủ yếu tập trung ở lớp vỏ mỏng m&agrave;u n&acirc;u của hạnh nh&acirc;n, n&ecirc;n lưu &yacute; khi ăn hạnh nh&acirc;n n&ecirc;n chọn vỏ c&ograve;n lớp da mỏng đ&oacute; , đừng loại bỏ nh&eacute; c&aacute;c bạn.</li>\r\n	<li>V&agrave; hạnh nh&acirc;n rang c&oacute; lượng vitamin E cao v&agrave; dễ hấp thụ hơn hạnh nh&acirc;n tươi</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>V&igrave; l&yacute; do n&agrave;y, ăn hạnh nh&acirc;n đ&atilde; loại bỏ lớp da n&acirc;u l&agrave; một lựa chọn hết sức sai lầm x&eacute;t theo g&oacute;c độ sức khỏe.</p>\r\n\r\n<p>Một thử nghiệm l&acirc;m s&agrave;ng của 60 người h&uacute;t thuốc &nbsp;cho thấy rằng 84 gram (khoảng 3 ounces) quả hạnh mỗi ng&agrave;y l&agrave;m giảm c&aacute;c dấu hiệu sinh học oxy h&oacute;a o 23-34%, trong khoảng thời gian 4 tuần .</p>\r\n\r\n<p>Những ph&aacute;t hiện n&agrave;y hỗ trợ những nghi&ecirc;n cứu kh&aacute;c, trong đ&oacute; ph&aacute;t hiện ra rằng ăn hạnh nh&acirc;n với c&aacute;c bữa ăn ch&iacute;nh l&agrave;m giảm một số dấu hiệu l&atilde;o h&oacute;a của cơ thể.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h3><strong>3. Hạnh nh&acirc;n gi&agrave;u vitamin E, gi&uacute;p bảo vệ m&agrave;ng tế b&agrave;o của bạn khỏi hư hỏng</strong></h3>\r\n\r\n<p>Vitamin E l&agrave; t&ecirc;n của một nh&oacute;m c&aacute;c chất chống oxy ho&aacute; h&ograve;a tan chất b&eacute;o. Những chất chống oxy ho&aacute; n&agrave;y c&oacute; xu hướng t&iacute;ch tụ trong m&agrave;ng tế b&agrave;o trong cơ thể, bảo vệ tế b&agrave;o khỏi bị oxy h&oacute;a.</p>\r\n\r\n<p>Hạnh nh&acirc;n l&agrave; một trong những nguồn cung cấp vitamin E tốt nhất thế giới, với chỉ một ounce cung cấp 37% lượng thức ăn h&agrave;ng ng&agrave;y được đề nghị .</p>\r\n\r\n<p>Một số nghi&ecirc;n cứu cho thấy sử dụng hạnh nh&acirc;n đều đặn mỗi ng&agrave;y c&oacute; thể giảm nguy cơ mắc bệnh tim, ung thư v&agrave; bệnh Alzheime</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h3><strong>4. Hạnh nh&acirc;n c&oacute; thể hỗ trợ kiểm so&aacute;t lượng đường trong m&aacute;u, tốt cho tim mạch</strong></h3>\r\n\r\n<p>Hạt c&oacute; lượng carbs thấp, nhưng c&oacute; nhiều chất b&eacute;o, chất đạm v&agrave; chất xơ. Điều n&agrave;y l&agrave;m cho họ một sự lựa chọn ho&agrave;n hảo cho người bị tiểu đường. Bởi vậy, người gi&agrave; ăn hạnh nh&acirc;n l&agrave; cực tốt cho sức khỏe.</p>\r\n\r\n<p>Tuy nhi&ecirc;n, một thứ kh&aacute;c cực đ&aacute;ng ch&uacute; &yacute; l&agrave; lượng Magie cao đ&aacute;ng kể chưa trong n&oacute;. Magnesium l&agrave; một kho&aacute;ng chất li&ecirc;n quan đến hơn 300 quy tr&igrave;nh cơ thể, bao gồm kiểm so&aacute;t lượng đường trong m&aacute;u một c&aacute;ch hữu hiệu.</p>\r\n\r\n<p>Chỉ cần mỗi ng&agrave;y ăn 50gr hạnh nh&acirc;n th&igrave; bạn đ&atilde; cung cấp đủ magie cho cơ thể v&agrave; l&agrave;m giảm lượng đường trong m&aacute;u.</p>\r\n\r\n<p>Nghi&ecirc;n cứu chỉ ra rằng 25-38% bệnh nh&acirc;n tiểu đường loại II thiếu magi&ecirc;, v&agrave; điều chỉnh sự thiếu hụt megie l&agrave;m giảm đ&aacute;ng kể lượng đường trong m&aacute;u v&agrave; cải thiện chức năng của insulin của tuyến thận.</p>\r\n\r\n<p>Điều n&agrave;y cho thấy c&aacute;c thực phẩm magi&ecirc; cao (như hạnh nh&acirc;n) c&oacute; thể c&oacute; lợi cho việc ngăn ngừa hội chứng chuyển h&oacute;a v&agrave; đ&aacute;i đường t&yacute;p 2, cả hai đều l&agrave; những vấn đề sức khoẻ to lớn hiện nay.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h3><strong>5. Magi&ecirc; cũng c&oacute; lợi &iacute;ch đối với người cao &nbsp;huyết &aacute;p</strong></h3>\r\n\r\n<p>Huyết &aacute;p cao l&agrave; một trong những động lực h&agrave;ng đầu của c&aacute;c cơn đau tim, đột quỵ v&agrave; suy thận.</p>\r\n\r\n<p>Sự thiếu hụt magi&ecirc; li&ecirc;n quan chặt chẽ đến c&aacute;c vấn đề về huyết &aacute;p, bất kể bạn thừa c&acirc;n hay kh&ocirc;ng .C&aacute;c nghi&ecirc;n cứu đ&atilde; chỉ ra rằng việc điều chỉnh thiếu magi&ecirc; c&oacute; thể l&agrave;m giảm huyết &aacute;p</p>\r\n\r\n<p>Do đa số người trưởng th&agrave;nh Hoa Kỳ lu&ocirc;n được khuyến c&aacute;o bổ xung đầy đủ magie cho cơ thể, việc bổ sung hạnh nh&acirc;n cho chế độ ăn c&oacute; thể c&oacute; t&aacute;c động rất lớn đến sự cải thiện sức khỏe.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h3><strong>6. Hạnh nh&acirc;n c&oacute; thể hạ thấp mức cholesterol v&agrave; l&agrave;m đẹp d&aacute;ng.</strong></h3>\r\n\r\n<p>C&oacute; nhiều lipoprotein LDL (cholesterol &ldquo;xấu&rdquo;) trong m&aacute;u l&agrave; một yếu tố nguy cơ nổi tiếng về bệnh tim.</p>\r\n\r\n<p>Những g&igrave; bạn ăn c&oacute; thể c&oacute; t&aacute;c động ch&iacute;nh l&ecirc;n mức LDL, v&agrave; một số nghi&ecirc;n cứu cho thấy hạnh nh&acirc;n c&oacute; hiệu quả trong việc cải thiện c&aacute;c cholesterol xấu trong cơ thể.</p>\r\n\r\n<p>Một nghi&ecirc;n cứu k&eacute;o d&agrave;i 16 tuần ở 65 đối tượng tiền tiểu đường cho thấy một chế độ ăn uống với 20% calo từ hạnh nh&acirc;n l&agrave;m giảm mức cholesterol LDL trung b&igrave;nh 12,4 mg / dL (28).</p>\r\n\r\n<p>Một nghi&ecirc;n cứu kh&aacute;c cho thấy rằng 1,5 ounce (42 grams) hạnh nh&acirc;n mỗi ng&agrave;y l&agrave;m giảm cholesterol LDL xuống 5,3 mg / dl, trong khi vẫn duy tr&igrave; mức cholesterol HDL &ldquo;tốt&rdquo;. Nh&oacute;m ăn nhiều hạnh nh&acirc;n đều đặn cũng mất mỡ bụng thừ tr&ecirc;n cơ thể, v&igrave; vậy hạnh nh&acirc;n l&agrave; m&oacute;n cải thiện v&oacute;c d&aacute;ng cực k&igrave; hữu hiệu cho người muốn c&aacute;c b&oacute; cơ tr&ecirc;n cơ thể trở n&ecirc;n đẹp đẽ hơn.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h3><strong>7. Hạnh nh&acirc;n Ngăn ngừa Oxidation Nguy hại của LDL Cholesterol</strong></h3>\r\n\r\n<p>Da của hạnh nh&acirc;n gi&agrave;u chất chống oxy ho&aacute; polyphenol, đ&atilde; được chứng minh l&agrave; ngăn chặn qu&aacute; tr&igrave;nh oxy h&oacute;a cholesterol trong ống nghiệm v&agrave; trong c&aacute;c nghi&ecirc;n cứu tr&ecirc;n động vật cũng cho kết quả tương tự.</p>\r\n\r\n<p>Hiệu quả c&oacute; thể c&ograve;n mạnh hơn khi kết hợp với c&aacute;c chất chống oxy ho&aacute; kh&aacute;c, như vitamin E.</p>\r\n\r\n<p>Trong một nghi&ecirc;n cứu của con người, ăn vặt hạnh nh&acirc;n trong một th&aacute;ng l&agrave;m giảm mức oxy h&oacute;a LDL cholesterol xuống 14% (32).</p>\r\n\r\n<p>Điều n&agrave;y sẽ l&agrave;m giảm nguy cơ mắc bệnh tim theo thời gian.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<h3><strong>8. Ăn quả hạnh giảm đ&oacute;i, giảm lượng calorie nạp v&agrave;o cơ thể , từ đ&oacute; c&oacute; thể gi&uacute;p bạn giảm c&acirc;n.</strong></h3>\r\n\r\n<p>Hạnh nh&acirc;n thấp carbs, v&agrave; cao cả protein v&agrave; chất xơ.</p>\r\n\r\n<p>Cả hai chất đạm v&agrave; chất xơ được biết l&agrave; l&agrave;m tăng độ no. Họ gi&uacute;p mọi người cảm thấy đầy đủ hơn, v&igrave; vậy họ ăn &iacute;t calo hơn .</p>\r\n\r\n<p>Trong một nghi&ecirc;n cứu k&eacute;o d&agrave;i 4 tuần với 137 người tham gia, mỗi ng&agrave;y một ounce (43 gram) ăn quả hạnh nh&acirc;n l&agrave;m giảm sự th&egrave;m ăn của cơ thể v&agrave; g&acirc;y cảm gi&aacute;c no l&acirc;u.</p>\r\n\r\n<p>Một nghi&ecirc;n cứu kh&aacute;c ở 100 phụ nữ thừa c&acirc;n nhận thấy rằng những người uống hạnh nh&acirc;n bị mất c&acirc;n nặng nhiều hơn những người trong nh&oacute;m kh&ocirc;ng c&oacute; hạt. Họ cũng c&oacute; những cải tiến trong v&ograve;ng đai v&ograve;ng eo v&agrave; c&aacute;c dấu hiệu sức khoẻ kh&aacute;c .</p>\r\n\r\n<p>V&igrave; vậy nếu bạn muốn giảm c&acirc;n, th&igrave; quả hạnh chắc chắn l&agrave; lựa chọn cực k&igrave; hữu hiệu v&agrave; l&yacute; tưởng nhất.</p>\r\n\r\n<h3><strong>9. L&agrave; một si&ecirc;u thực phẩm với b&agrave; bầu v&agrave; trẻ em</strong></h3>\r\n\r\n<p>Hồi m&igrave;nh mang bầu, m&igrave;nh nhớ rằng m&igrave;nh ăn kh&aacute; nhiều hạnh nh&acirc;n v&agrave; c&aacute;c hạt dinh dưỡng kh&aacute;c như &oacute;c ch&oacute;, hạt điều, mắc ca, v&igrave; theo lời khuy&ecirc;n của c&ocirc; em g&aacute;i sống ở Mỹ. Thật quả đ&uacute;ng như mong đợi, nhờ ăn uống hợp l&yacute; v&agrave; c&acirc;n bằng, b&eacute; nh&agrave; m&igrave;nh đ&atilde; ph&aacute;t triển từ l&uacute;c trong bụng mẹ đến khi sinh ra đều khỏe mạnh, kh&aacute;u khỉnh v&agrave; tăng trưởng rất chuẩn. (L&ecirc; kh&ocirc;ng mong b&eacute; nh&agrave; m&igrave;nh tăng c&acirc;n mạnh, m&agrave; chỉ cần đ&uacute;ng chuẩn, lanh lẹ l&agrave; được rồi)</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"http://hatdieu.org/wp-content/uploads/2016/04/13226700_176732852724405_7092515308900116295_n.jpg\" style=\"height:394px; width:591px\" /></p>\r\n\r\n<p>Hai mẹ con L&ecirc; đi chơi H&agrave; Nội</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Sở dĩ L&ecirc; chọn ăn hạnh nh&acirc;n v&igrave; hạnh nh&acirc;n c&oacute; chứa nhiều chất qu&yacute; gi&aacute; c&oacute; lợi cho sự ph&aacute;t triển b&agrave;o thai v&agrave; thể chất của trẻ. Gi&uacute;p trẻ ph&aacute;t triển cứng c&aacute;p v&agrave; ổn định từ b&ecirc;n trong bụng mẹ.</p>\r\n\r\n<p>100gr hạnh nh&acirc;n đ&atilde; cung cấp cho cơ thể một lượng sắt đ&aacute;ng kể để giảm thiếu m&aacute;u v&agrave; mệt mỏi khi mang bầu. Cũng c&ugrave;ng lượng 100 gr hạnh nh&acirc;n, đ&atilde; cung cấp cho cơ thể 60% lượng canxi cần thiết cho một đứa trẻ b&igrave;nh thường lẫn người lớn. (Nhu cầu canxi của người b&igrave;nh thường l&agrave; 500miligram mỗi ng&agrave;y). Bởi vậy ăn hạnh nh&acirc;n c&oacute; thể gi&uacute;p b&agrave; bầu v&agrave; trẻ em ph&ograve;ng chống thiếu hụt canxi cực k&igrave; hữu hiệu m&agrave; kh&ocirc;ng lo lắng dư thừa chất. Canxi dung nạp bằng thuốc bổ xung kh&ocirc;ng thể n&agrave;o tốt bằng canxi tự nhi&ecirc;n trong thực phẩm, v&igrave; canxi nh&acirc;n tạo dạng thuốc nếu thừa th&igrave; khả năng cơ thể kh&ocirc;ng đ&agrave;o thải hết m&agrave; t&iacute;ch tụ lại trong cơ thể g&acirc;y sạn thận.</p>\r\n\r\n<p>Ở dạng b&agrave;o thai, c&aacute;c mẹ chắc chắn lo lắng nhất l&agrave; con bị dị tật. Mỗi lần đến k&igrave; kh&aacute;m thai, L&ecirc; đ&atilde; rất căng thẳng thế n&agrave;o khi đợi kết quả x&eacute;t nghiệm n&ecirc;n đ&atilde; rất cẩn thận trong ăn uống. Ở tuần thứ 12 th&igrave; c&aacute;c mẹ sẽ phải đi si&ecirc;u &acirc;m x&eacute;t nghiệm độ mờ da g&aacute;y để xem b&eacute; c&oacute; bị dị tật ống thần kinh kh&ocirc;ng. Dị tật n&agrave;y li&ecirc;n quan chặt chẽ đến qu&aacute; tr&igrave;nh ăn uống thiếu hụt trầm trọng &nbsp;axit folate (axit folic). Bổ xung n&oacute; l&agrave; điều cực k&igrave; quan trọng. Thật may mắn l&agrave; hạnh nh&acirc;n lại dồi d&agrave;o thứ n&agrave;y. (&Oacute;c ch&oacute; cũng l&agrave; một thứ dồi d&agrave;o axit folic kh&ocirc;ng thua k&eacute;m g&igrave; hạnh nh&acirc;n. Xem&nbsp;<strong><a href=\"http://hatdieu.org/2017/04/23/qua-oc-cho-co-tac-dung-gi/%20%E2%80%8E\">t&aacute;c dụng của &oacute;c ch&oacute; với sức khỏe tại đ&acirc;y</a></strong>) . Nhu cầu axit folate của b&agrave; bầu l&agrave; 400mcg mỗi ng&agrave;y, chỉ cần ăn 100-200gr hạnh nh&acirc;n v&agrave; một số loại hạt như &oacute;c ch&oacute;, hạt điều cho đa dạng th&igrave; đ&atilde; đủ cung cấp axit folic cho b&agrave; bầu cả ng&agrave;y rồi.</p>','','2017-10-20 03:30:49','2017-10-20 03:30:49'),(11,2,5,'What is the effect of almonds?','Almonds are edible nuts that grow on Prunus dulcis, commonly known as almond trees. Almonds are native to the Middle East, but the United States is now the world\'s largest producer, and almon','<p>What is the effect of almonds?<br />\r\nIn the fridge our homes are never lacking in almonds, because our homes have children and the elderly, they need them for snacks, eat for health and more.</p>\r\n\r\n<p><br />\r\nFortunately in the lives of their children, almonds are always present in their nutritional menu. When I was pregnant, my sister in America told me to eat almonds, which is good for health, even it is extremely good for children to help the body pay a comprehensive development.</p>\r\n\r\n<p>In this article, I will highlight the reasons why we should eat almonds and the effects of almonds on human health:</p>\r\n\r\n<p>Almonds are edible nuts that grow on Prunus dulcis, commonly known as almond trees. Almonds are native to the Middle East, but the United States is now the world&#39;s largest producer, and almonds are associated with the image of the United States, which is the dominant agricultural product of the country.</p>\r\n\r\n<p>Almonds have an impressive nutrition profile, which is nutritious than all other nuts, followed by almonds, walnuts and walnuts.</p>\r\n\r\n<p>One almonds 28gr contains:<br />\r\nFiber: 3.5 grams.<br />\r\nProtein: 6 grams.<br />\r\nCalcium: 75 milligrams<br />\r\nFat: 14 grams (of which 9 types are monounsaturated).<br />\r\nVitamin E: 37% RDA.<br />\r\nManganese: 32% RDA.<br />\r\nMagnesium: 20% RDA.<br />\r\nThey also contain copper, vitamin B2 (riboflavin) and phosphorus.<br />\r\nAlmonds provide only 161 calories and 2.5 grams of carbohydrates digested.<br />\r\n&nbsp;</p>\r\n\r\n<p>It is important to note that 10-15% of the calorie intake of almonds is not absorbed by the body because fat is too difficult to reach and is broken. Adequate almonds are not harmful to the body, children, pregnant women or the elderly when eating is beneficial without fear of gaining too much weight.</p>\r\n\r\n<p>2. Almonds are full of antioxidants, cancer prevention and skin beauty<br />\r\nAlmonds contain powerful antioxidants. Antioxidants help protect the body against oxidation, which can destroy cancer cells, stop the growth and spread of it.</p>\r\n\r\n<p>Le read the long-standing research paper by Fine Arts Researchers that: Strong antioxidants are concentrated in the thin brown skin of almonds, so note when eating almonds. Choose a thin skin, do not remove you.<br />\r\nAnd roasted almonds have high vitamin E and are easier to absorb than fresh almonds<br />\r\n&nbsp;</p>\r\n\r\n<p>For this reason, eating almonds eliminating brown skin is a very wrong choice considering health.</p>\r\n\r\n<p>A clinical trial of 60 smokers showed that 84 grams (about 3 ounces) of almonds a day reduced oxidative bio markers by 23-34%, over a 4 week period.</p>\r\n\r\n<p>These findings support other studies, which found that eating almonds with the main meals reduced some of the signs of aging.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>3. Almonds are rich in vitamin E, which helps protect your cell membrane from damage<br />\r\nVitamin E is the name of a group of antioxidants that dissolve fat. These antioxidants tend to build up in the cell membrane in the body, protecting cells from oxidation.</p>\r\n\r\n<p>Almonds are one of the best sources of vitamin E in the world, with only one ounce providing 37% of the recommended daily amount.</p>\r\n\r\n<p>Some studies have shown that daily use of almonds can reduce the risk of heart disease, cancer and Alzheimer&#39;s.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>4. Almonds can help control blood sugar, good for the heart<br />\r\nBeans have low carbs, but are high in fat, protein and fiber. This makes them a perfect choice for people with diabetes. Therefore, almonds are good for your health.</p>\r\n\r\n<p>However, another remarkable thing is the remarkable amount of magnesium is not in it. Magnesium is a mineral that is involved in more than 300 body processes, including effective blood sugar control.</p>\r\n\r\n<p>Just 50 grams of almonds a day, you have enough magnesium to the body and reduce blood sugar.</p>\r\n\r\n<p>Studies show that 25-38% of people with type 2 diabetes lack magnesium, and regulating mega deficiency significantly reduces blood sugar and improves the function of the insulin of the gut.</p>\r\n\r\n<p>This suggests that high magnesium foods (such as almonds) may be beneficial for preventing metabolic syndrome and type 2 diabetes, both of which are major health problems today.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>5. Magnesium is also beneficial for people with high blood pressure<br />\r\nHigh blood pressure is one of the leading motivations for heart attacks, stroke and kidney failure.</p>\r\n\r\n<p>Magnesium deficiency is closely related to blood pressure problems, regardless of whether you are overweight. Studies have shown that correcting magnesium deficiency can reduce blood pressure.</p>\r\n\r\n<p>As most US adults are advised to add adequate magnesium to the body, almond supplementation for the diet can have a huge impact on improving health.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>6. Almonds can lower cholesterol levels and make you look good.<br />\r\nHaving high levels of LDL lipoprotein (&quot;bad&quot; cholesterol) in the blood is a known risk factor for heart disease.</p>\r\n\r\n<p>What you eat can have a major impact on your metabolism</p>','','2017-10-20 03:31:54','2017-10-20 03:31:54'),(12,1,6,'THT Sản xuất cà phê bền vững','THT Sản xuất cà phê bền vững (gọi tắt là THT Đăk Mar) được thành lập vào ngày 12 tháng 04 năm 2012, đặt tại thôn 5, xã Đắk Mar, huyện Đắk Hà, tỉnh Kon Tum. Hơn 70% thành viên tổ là đồng bào d','<p><strong>THT Sản xuất c&agrave; ph&ecirc; bền vững</strong>&nbsp;(gọi tắt l&agrave; THT Đăk Mar) được th&agrave;nh lập v&agrave;o ng&agrave;y 12 th&aacute;ng 04 năm 2012, đặt tại th&ocirc;n 5, x&atilde; Đắk Mar, huyện Đắk H&agrave;, tỉnh Kon Tum. Hơn 70% th&agrave;nh vi&ecirc;n tổ l&agrave; đồng b&agrave;o d&acirc;n tộc thiểu số ở Việt Nam như Rơ Ngao, X&ecirc; Đăng&hellip; Hiện THT Đắk Mar gồm c&oacute; 49 th&agrave;nh vi&ecirc;n với diện t&iacute;nh 62.7ha, tổng sản lượng đạt được trong ni&ecirc;n vụ 2013-2014 hơn 320 tấn. Với sự ủng hộ của C&ocirc;ng ty Huy H&ugrave;ng, THT đ&atilde; đạt được chứng nhận Fairtrade th&aacute;ng 12 năm 2012 (FLO ID: 28454).</p>\r\n\r\n<p>THT Đắk Mar hiện đang được điều h&agrave;nh bởi Ban Quản l&yacute; v&agrave; Ban Kiểm so&aacute;t Nội bộ. Ban Quản l&yacute; c&oacute; nhiệm vụ đề ra c&aacute;c phương hướng kinh doanh v&agrave; thực hiện c&aacute;c giao dịch thương mại xuất khẩu. Ban Kiểm so&aacute;t nội bộ c&oacute; chức năng gi&aacute;m s&aacute;t v&agrave; đảm bảo c&aacute;c th&agrave;nh vi&ecirc;n trong tổ hợp t&aacute;c thực hiện đ&uacute;ng quy định khi trồng c&agrave; ph&ecirc; của tổ chức FLO-cert.</p>\r\n\r\n<p>THT Đắk Mar được th&agrave;nh lập dựa tr&ecirc;n tinh thần tự nguyện v&agrave; mong muốn cải thiện cuộc sống, ph&aacute;t triển bền vững của c&aacute;c hộ n&ocirc;ng d&acirc;n trồng c&agrave; ph&ecirc; tại huyện Đắk H&agrave;, tỉnh Kon Tum.&nbsp;</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Sản phẩm</strong></p>\r\n\r\n<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"width:828px\">\r\n	<tbody>\r\n		<tr>\r\n			<td colspan=\"3\"><strong>C&agrave; ph&ecirc; chứng nhận Fairtrade</strong></td>\r\n		</tr>\r\n		<tr>\r\n			<td>C&agrave; ph&ecirc; Robusta R1</td>\r\n			<td>S&agrave;ng 16</td>\r\n			<td>Độ ẩm 12.5%; 0.1% hạt đen; 0.3% hạt vỡ; 0.2% tạp; 0.1% Excelsa</td>\r\n		</tr>\r\n		<tr>\r\n			<td>C&agrave; ph&ecirc; Robusta R2</td>\r\n			<td>S&agrave;ng 13</td>\r\n			<td>Độ ẩm 13%; 2% hạt đen + vỡ; 1% tạp; 1% Excelsa</td>\r\n		</tr>\r\n	</tbody>\r\n</table>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Đ&oacute;ng g&oacute;p cho cộng đồng</strong></p>\r\n\r\n<p>Nhờ số tiền ph&uacute;c lợi thu được, THT đ&atilde; đầu tư được hơn 500 triệu để mua ph&acirc;n b&oacute;n, dụng cụ thiết yếu phục vụ t&aacute;i sản xuất; x&acirc;y dựng nh&agrave; văn ho&aacute; cộng đồng, l&agrave; nơi sinh hoạt cộng đồng cho đồng b&agrave;o d&acirc;n tộc thiểu số v&agrave; c&aacute;c gia đ&igrave;nh ngh&egrave;o tr&ecirc;n địa b&agrave;n với gi&aacute; trị hơn 500 triệu đồng. Ngo&agrave;i ra, THT c&ograve;n lập quỹ khuyến kh&iacute;ch ph&aacute;t triển hoạt động của trẻ em, thăm hỏi th&agrave;nh vi&ecirc;n với gi&aacute; trị 20 triệu đồng v&agrave; lập quỹ cho hoạt động của c&aacute;c năm thiếp theo. Trong ni&ecirc;n vụ vừa qua, THT đ&atilde; tổ chức được 06 buổi tập huấn, hướng dẫn b&agrave; con sản xuất n&ocirc;ng nghiệp bền vững, n&acirc;ng cao nhận thức về chứng nhận Fairtrade, về quản l&yacute; rủi ro trong canh t&aacute;c, sản xuất c&agrave; ph&ecirc;&hellip; Cử c&aacute;n bộ đi tập huấn, n&acirc;ng cao khả năng quản l&yacute; cũng như kinh nghiệm về thực h&agrave;nh n&ocirc;ng nghiệp tốt.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><strong>Th&ocirc;ng tin li&ecirc;n hệ</strong></p>\r\n\r\n<p><strong>THT SẢN XUẤT C&Agrave; PH&Ecirc; BỀN VỮNG</strong></p>\r\n\r\n<p>Tổ 5, Đăk Mar, Đăk H&agrave;, Kon Tum, T&acirc;y Nguy&ecirc;n, Việt Nam</p>\r\n\r\n<p>Email:&nbsp;<a href=\"mailto:dakmark.coffee@gmail.com\">dakmark.coffee@gmail.com</a></p>','','2017-10-20 03:35:16','2017-10-20 03:35:16'),(13,2,6,'THT Sustainable coffee production','THT Sustainable Coffee (abbreviated as THT Dak Mar) was established on 12 April 2012, located in Village 5, Dak Mar Commune, Dak Ha District, Kon Tum Province. More than 70% of the members ar','<p>THT Sustainable Coffee (abbreviated as THT Dak Mar) was established on 12 April 2012, located in Village 5, Dak Mar Commune, Dak Ha District, Kon Tum Province. More than 70% of the members are ethnic minorities in Vietnam such as Ro Ngao, Xe Dang ... Dak Lak is composed of 49 members with a total area of ​​62.7ha, total output in the crop 2013-2014. 320 tons. With the support of Huy Hung Company, THT has achieved Fairtrade certification in December 2012 (FLO ID: 28454).</p>\r\n\r\n<p>Dak Mar is currently managed by the Management Board and the Internal Control Board. The Management Board is responsible for identifying business directions and conducting export trade transactions. The Internal Control Board has the function of supervising and ensuring that the members of the cooperative team comply with the FLO-cert&#39;s regulations.</p>\r\n\r\n<p>Dak Mar is established on the basis of voluntary spirit and the desire to improve the life and sustainable development of coffee farmers in Dak Ha district, Kon Tum province.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Product</p>\r\n\r\n<p>Fairtrade certified coffee<br />\r\nRobusta coffee R1 Screen 16 Moisture 12.5%; 0.1% black seeds; 0.3% broken seeds; 0.2% spore; 0.1% Excelsa<br />\r\nRobusta Coffee R2 Screen 13 Moisture 13%; 2% black seeds + broken; 1% spore; 1% excelsa<br />\r\n&nbsp;</p>\r\n\r\n<p>Contribute to the community</p>\r\n\r\n<p>Thanks to the amount of benefits received, THT has invested more than 500 million to buy fertilizer, essential equipment for reproduction; to build a community cultural house, a place for community activities for ethnic minority people and poor families in the province with the value of over 500 million. In addition, THT also set up a fund to encourage the development of children&#39;s activities, visit members with a value of 20 million and set up funds for activities of the next year. In the last season, THT has organized 6 training sessions, guided farmers in sustainable agriculture, raised awareness about Fairtrade certification, risk management in cultivation, coffee production ... Train staff to train, improve management as well as experience in good agricultural practice.</p>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p>Contact Info</p>\r\n\r\n<p>THT PRODUCTION OF SUSTAINABLE COFFEE</p>\r\n\r\n<p>Group 5, Dak Mar, Dak Ha, Kon Tum, Central Highlands, Vietnam</p>\r\n\r\n<p>Email: dakmark.coffee@gmail.com</p>','','2017-10-20 03:36:27','2017-10-20 03:36:27'),(14,1,7,'DakMark Coffee và các doanh nghiệp chuẩn bị hàng hóa phục vụ Tết 2017','Còn  hơn 2 tháng nữa là tới Tết Đinh Dậu 2017, nhưng thời điểm này, nhiều doanh nghiệp trên cả nước đã khẩn trương xây dựng chương trình sản xuất hàng hóa cũng như kế hoạch phân phối để phục ','','','2017-10-20 03:38:34','2017-10-20 03:41:59'),(15,2,7,'DakMark Coffee and enterprises preparing goods for Tet 2017','Over the next two months, Dinh Dau Tide Festival will be held in 2017, but at this time, many enterprises nationwide have urgently set up production programs as well as distribution plans to ','','','2017-10-20 03:41:05','2017-10-20 03:41:44'),(16,1,8,'Cà Phê Rang Xay','Cà phê nguyên chất không độn\r\nLàm từ những hạt cà phê đạt chứng nhận bền vững\r\nCà phê tiêu chuẩn xuất khẩu Châu Âu, Mỹ','<h3>V&igrave; Sức Khoẻ Cộng Đồng</h3>\r\n\r\n<h3>C&Agrave; PH&Ecirc; RANG XAY DAKMARK</h3>\r\n\r\n<hr />\r\n<ul>\r\n	<li>C&agrave; ph&ecirc; nguy&ecirc;n chất kh&ocirc;ng độn</li>\r\n	<li>L&agrave;m từ những hạt c&agrave; ph&ecirc; đạt chứng nhận bền vững</li>\r\n	<li>C&agrave; ph&ecirc; ti&ecirc;u chuẩn xuất khẩu Ch&acirc;u &Acirc;u, Mỹ</li>\r\n	<li>C&agrave; ph&ecirc; được trồng tại ch&acirc;n n&uacute;i Ngọc Linh, ngọn n&uacute;i cao nhất T&acirc;y Nguy&ecirc;n, nơi c&oacute; nguồn nước tinh khiết, trong m&aacute;t, đảm bảo c&agrave; ph&ecirc; lu&ocirc;n đạt chất lượng cao nhất</li>\r\n	<li>C&agrave; ph&ecirc; rang xay</li>\r\n</ul>\r\n\r\n<p><br />\r\n<br />\r\n<a href=\"http://dakmarkcoffee.vn/san-pham/ca-phe-rang-xay-dakmark/\" target=\"_blank\">MUA H&Agrave;NG</a></p>\r\n\r\n<h3>CAM KẾT CỦA DAKMARK</h3>\r\n\r\n<hr />\r\n<ul>\r\n	<li>Mong muốn của ch&uacute;ng t&ocirc;i l&agrave; mang đến cho bạn những sản phẩm c&agrave; ph&ecirc;nguy&ecirc;n chất, an to&agrave;n cho sức khoẻ,</li>\r\n	<li>Tuyệt đối kh&ocirc;ng sử dụng chất tạo đặc s&aacute;nh, chất độn, hương liệu hay tạp chất tạo bọt.</li>\r\n	<li>Sản phẩm của ch&uacute;ng t&ocirc;i đ&atilde; được chứng nhận về vệ sinh an to&agrave;n thực phẩm(HACCP) v&agrave; quy tr&igrave;nh quản l&yacute; chất lượng (ISO)</li>\r\n</ul>\r\n\r\n<p><img alt=\"\" src=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/07/slide-8.jpg\" style=\"height:1091px; width:1920px\" /></p>\r\n\r\n<p><img alt=\"\" src=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/08/be6ad8761fe4eb9bb85934a2d21686bb.jpg\" style=\"height:633px; width:950px\" /></p>\r\n\r\n<h3>HƯỚNG DẪN PHA C&Agrave; PH&Ecirc;</h3>\r\n\r\n<hr />\r\n<ul>\r\n	<li>Cho hạt c&agrave; ph&ecirc; v&agrave;o m&aacute;y xay, xay một lượng đủ pha (20 -25g/phin)</li>\r\n	<li>Tr&aacute;ng C&agrave; ph&ecirc; phin bằng nước n&oacute;ng</li>\r\n	<li>Cho c&agrave; ph&ecirc; đ&atilde; xay v&agrave;o v&agrave;o phin</li>\r\n	<li>R&oacute;t khoảng 25ml nước s&ocirc;i v&agrave;o phin v&agrave; chờ 1-2 ph&uacute;t để c&agrave; ph&ecirc; ngấm đều nước</li>\r\n	<li>R&oacute;t th&ecirc;m khoảng 45ml nước s&ocirc;i v&agrave;o phin</li>\r\n	<li>D&ugrave;ng k&egrave;m đường, sữa hay đ&aacute; tuỳ theo khẩu vị</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/08/Coc-caphe-ve-dakmark-2.png\" style=\"height:211px; width:308px\" /></p>\r\n\r\n<hr />\r\n<p>Với t&igrave;nh y&ecirc;u với hạt c&agrave; ph&ecirc;, DAKMARK cam kết mang lại những t&aacute;ch c&agrave; ph&ecirc; chất lượng cao nhất với mụi vị tự nhi&ecirc;n nhất, đảm bảo những ph&uacute;t gi&acirc;y tỉnh t&aacute;o để bạn c&oacute; những ph&uacute;t gi&acirc;y s&aacute;ng tạo v&agrave; đầy thăng hoa</p>\r\n\r\n<hr />\r\n<p>H&atilde;y c&ugrave;ng thưởng thức những t&aacute;ch c&agrave; ph&ecirc; DAKMARK tuyệt vời n&agrave;o!</p>','Cà phê nguyên chất không độn\r\nLàm từ những hạt cà phê đạt chứng nhận bền vững\r\nCà phê tiêu chuẩn xuất khẩu Châu Âu, Mỹ','2017-10-26 07:12:00','2017-10-26 07:12:00'),(17,2,8,'Roasted Coffee','Pure unadulterated coffee\r\nMade from coffee beans certified sustainable\r\nCoffee export standards in Europe, US','<h3>Since Community Health</h3>\r\n\r\n<h3>Roasted coffee DAKMARK</h3>\r\n\r\n<hr />\r\n<ul>\r\n	<li>Pure unadulterated coffee</li>\r\n	<li>Made from coffee beans certified sustainable</li>\r\n	<li>Coffee export standards in Europe, US</li>\r\n	<li>The coffee is grown at the foot of Mount Ngoc Linh, the highest mountain in the Central Highlands, where the pure water, in cooling, ensuring coffee always achieve the highest quality</li>\r\n	<li>Coffee Roasters</li>\r\n</ul>\r\n\r\n<p><br />\r\n<br />\r\n<a href=\"http://dakmarkcoffee.vn/san-pham/ca-phe-rang-xay-dakmark/\" target=\"_blank\">PURCHASE</a></p>\r\n\r\n<h3>COMMITMENT DAKMARK</h3>\r\n\r\n<hr />\r\n<ul>\r\n	<li>Our desire is to bring you products phenguyen coffee quality, safe for health,</li>\r\n	<li>Absolutely do not use substances thicken, fillers, flavors or impurities foaming.</li>\r\n	<li>Our products have been certified for food safety (HACCP) and quality management processes (ISO)</li>\r\n</ul>\r\n\r\n<p><img alt=\"\" src=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/07/slide-8.jpg\" style=\"height:1091px; margin:0px; width:1920px\" /></p>\r\n\r\n<p><img alt=\"\" src=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/08/be6ad8761fe4eb9bb85934a2d21686bb.jpg\" style=\"height:633px; margin:0px; width:950px\" /></p>\r\n\r\n<h3>INSTRUCTIONS Coffee</h3>\r\n\r\n<hr />\r\n<ul>\r\n	<li>For the beans in a blender, grind a sufficient challenge (20 -25g / filter)</li>\r\n	<li>Rinse the filter with hot water Coffee</li>\r\n	<li>For ground coffee into the filter on</li>\r\n	<li>Pour about 25ml boiling water and wait 1-2 minutes for filter coffee are infused water</li>\r\n	<li>Add about 45ml of boiling water poured into the filter</li>\r\n	<li>Served with sugar, milk or ice, depending on taste</li>\r\n</ul>\r\n\r\n<p>&nbsp;</p>\r\n\r\n<p><img alt=\"\" src=\"http://dakmarkcoffee.vn/wp-content/uploads/2015/08/Coc-caphe-ve-dakmark-2.png\" style=\"height:211px; margin:0px; width:308px\" /></p>\r\n\r\n<hr />\r\n<p>With love with coffee beans, DAKMARK committed to bringing the cup of coffee of the highest quality with the most natural taste, ensuring moments of alertness so you have moments of creative and sublimation</p>\r\n\r\n<hr />\r\n<p><strong>Please enjoy the great cup of coffee yet DAKMARK!</strong></p>','Pure unadulterated coffee\r\nMade from coffee beans certified sustainable\r\nCoffee export standards in Europe, US','2017-10-26 07:15:05','2017-10-26 08:03:06'),(18,1,10,'','','','','2017-11-01 16:23:44','2017-11-01 16:23:44');
/*!40000 ALTER TABLE `post_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `img` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '1',
  `category_id` int(10) unsigned DEFAULT NULL,
  `author_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `posts_category_id_foreign` (`category_id`),
  KEY `posts_author_id_foreign` (`author_id`),
  CONSTRAINT `posts_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `posts_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Ca phe va bo','post-1','test.jpg',1,5,1,'2017-10-19 18:38:33','2017-10-23 08:59:55','2017-10-23 08:59:55'),(2,'3 cách làm món ăn từ trái ổi','3 cách làm món ăn từ trái ổi','',1,5,1,'2017-10-20 03:10:55','2017-11-07 02:38:35','2017-11-07 02:38:35'),(3,'Cách giảm cân bằng mật ong hiệu quả','Cách giảm cân bằng mật ong hiệu quả','matong.jpg',1,5,1,'2017-10-20 03:18:01','2017-12-15 02:29:29','2017-12-15 02:29:29'),(4,'Hội chợ Làng nghề Việt Nam lần thứ XI năm 2015','hoi-cho','54d427858e1a0.jpg',1,6,1,'2017-10-20 03:22:01','2017-12-15 02:31:46','2017-12-15 02:31:46'),(5,'Hạt hạnh nhân có tác dụng gì','Hạt hạnh nhân có tác dụng gì','almonds-1-e1487995062459.jpg',1,5,1,'2017-10-20 03:28:58','2017-12-15 02:29:23','2017-12-15 02:29:23'),(6,'THT Sản xuất cà phê bền vững','THT Sản xuất cà phê bền vững','images.jpg',1,5,1,'2017-10-20 03:34:06','2017-11-07 04:28:38',NULL),(7,'DakMark Coffee và các doanh nghiệp chuẩn bị hàng hóa phục vụ Tết 2017','DakMark Coffee và các doanh nghiệp chuẩn bị hàng hóa phục vụ Tết 2017','dakmark-coffee-va-cac-doanh-nghiep-chuan-bi-hang-hoa-phuc-vu-tet-2017.jpg',1,6,1,'2017-10-20 03:38:06','2017-12-15 02:32:37','2017-12-15 02:32:37'),(8,'Cà Phê Rang Xay','ca-phe-rang-xay','ca-phe-rang-xay-dakmark.jpg',1,9,1,'2017-10-26 07:09:13','2017-10-26 07:16:03',NULL),(9,'đasadsad','dasadsad','images/blog/kUQemgVv1yjt2sB6m6r2AMeCfEVEE95sTXKn6au0.png',0,5,1,'2017-10-29 08:55:58','2017-10-29 09:15:41','2017-10-29 09:15:41'),(10,'test ok','test-ok','',0,5,1,'2017-11-01 16:23:24','2017-11-01 16:24:18','2017-11-01 16:24:18'),(11,'lê minh tuấn','le-minh-tuan','',0,9,1,'2017-11-01 16:27:05','2017-11-01 16:27:12','2017-11-01 16:27:12'),(12,'fsdfsdfsd','fsdfsdfsd','F# Comparison operators.PNG',0,14,1,'2017-12-23 16:30:24','2017-12-23 16:30:33','2017-12-23 16:30:33');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_media`
--

DROP TABLE IF EXISTS `product_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_media` (
  `product_id` int(10) unsigned NOT NULL,
  `media_id` int(10) unsigned NOT NULL,
  `order` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`,`media_id`),
  KEY `product_media_media_id_foreign` (`media_id`),
  CONSTRAINT `product_media_media_id_foreign` FOREIGN KEY (`media_id`) REFERENCES `medias` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_media_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_media`
--

LOCK TABLES `product_media` WRITE;
/*!40000 ALTER TABLE `product_media` DISABLE KEYS */;
INSERT INTO `product_media` VALUES (1,26,0),(2,6,0),(3,23,0),(4,12,0),(5,33,0),(5,50,1),(5,51,2),(6,25,0),(7,27,0),(15,30,1);
/*!40000 ALTER TABLE `product_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_translations`
--

DROP TABLE IF EXISTS `product_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_translations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `language_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `summary` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `specs` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `product_translations_language_id_foreign` (`language_id`),
  KEY `product_translations_product_id_foreign` (`product_id`),
  CONSTRAINT `product_translations_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `product_translations_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_translations`
--

LOCK TABLES `product_translations` WRITE;
/*!40000 ALTER TABLE `product_translations` DISABLE KEYS */;
INSERT INTO `product_translations` VALUES (1,1,1,'CÀ Phê Rang Xay','Giới thiệu...','Mô tả...','Thông số...','2017-10-19 18:38:33','2017-10-23 02:32:51'),(2,2,1,'Roasted Coffee','Intro..4','<p>ỷtyr</p>','Specs... 4','2017-10-19 18:38:33','2017-12-21 07:58:02'),(3,3,1,'CN Cà phê Socola','CN Summary','CN Description','CN Specs','2017-10-19 18:38:33','2017-10-19 18:38:33'),(4,2,6,'Filter bag coffee','Intro...','Description...','Specs...','2017-10-23 02:31:13','2017-10-23 02:31:13'),(5,1,6,'Cà Phê Túi Lọc','Giới thiệu...','Mô tả...','Thông số...','2017-10-23 02:31:35','2017-10-23 02:31:35'),(6,1,3,'Cà Phê Nguyên Hạt','Giới thiệu...','Mô tả...','Thông số...','2017-10-23 02:34:27','2017-10-23 02:34:27'),(7,2,3,'Whole Bean Coffee','Intro...','Description...','Specs...','2017-10-23 02:35:00','2017-10-23 02:35:00'),(8,1,5,'Cà Phê Chồn','Giới thiệu...','Mô tả...','Thông số...','2017-10-23 02:36:25','2017-10-23 02:36:25'),(9,2,5,'Weasel Coffee','Intro...','Description...','Specs...','2017-10-23 02:36:41','2017-10-23 02:36:41'),(10,1,2,'Ca Cao Rang','Giới thiệu...','Mô tả...','Thông số...','2017-10-23 02:38:29','2017-10-23 02:38:29'),(11,2,2,'Roasted Cocoa','Intro...','Description...','Specs...','2017-10-23 02:38:50','2017-10-23 02:38:50'),(12,1,4,'Tiêu','Giới thiệu...','Mô tả...','Thông số...','2017-10-23 02:39:33','2017-10-23 02:39:33'),(13,2,4,'Black Pepper','Intro...','Description...','Specs...','2017-10-23 02:39:53','2017-10-23 02:39:53'),(14,1,7,'Trà Sữa Matcha','Giới thiệu...','Mô tả...','Thông số...','2017-10-23 02:42:02','2017-10-23 02:42:02'),(15,2,7,'Matcha MilkTea','Intro...','Description...','Specs...','2017-10-23 02:42:26','2017-10-23 02:42:26'),(16,1,15,'Trà sữa matcha DakMark','Làm từ matcha trà sữa','<p>DakMark&nbsp;with love</p>',NULL,'2017-11-30 01:44:52','2017-11-30 01:45:41');
/*!40000 ALTER TABLE `product_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `sku` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `old_price` decimal(8,2) unsigned NOT NULL DEFAULT '0.00',
  `price` decimal(8,2) unsigned NOT NULL DEFAULT '0.00',
  `special_price` decimal(8,2) unsigned NOT NULL DEFAULT '0.00',
  `special_price_start_date` datetime DEFAULT NULL,
  `special_price_end_date` datetime DEFAULT NULL,
  `disable_buy_button` tinyint(1) NOT NULL DEFAULT '0',
  `disable_wishlist_button` tinyint(1) NOT NULL DEFAULT '0',
  `call_for_price` tinyint(1) NOT NULL DEFAULT '0',
  `sold_off` tinyint(1) NOT NULL DEFAULT '0',
  `minimum_amount` int(11) NOT NULL DEFAULT '1',
  `maximum_amount` int(11) DEFAULT NULL,
  `published` tinyint(1) NOT NULL DEFAULT '1',
  `category_id` int(10) unsigned DEFAULT NULL,
  `author_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `products_category_id_foreign` (`category_id`),
  KEY `products_author_id_foreign` (`author_id`),
  CONSTRAINT `products_author_id_foreign` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`),
  CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'SKU10','Cà phê Rang Xay','ca-phe-rang-xay',0.00,50000.00,40000.00,'2017-12-13 00:00:00','2018-01-04 23:59:59',0,0,0,0,1,NULL,1,16,1,'2017-10-19 18:38:32','2017-12-13 04:18:22',NULL),(2,'SKU17CC','Ca Cao','ca-cao-vn',10000.00,85000.00,0.00,'1970-01-01 00:00:00','1970-01-01 23:59:59',0,0,0,0,1,NULL,1,16,1,'2017-10-20 03:05:05','2017-12-13 04:29:18','2017-12-13 04:29:18'),(3,'SKUCP12','Cà Phê Nguyên Hạt','ca-phe-nguyen-hat',100000.00,110000.00,99000.00,'2017-12-14 00:00:00','2018-01-02 23:59:59',1,1,1,0,1,NULL,1,16,1,'2017-10-20 03:45:16','2017-12-13 04:29:05',NULL),(4,'SKUTIEU18','Tiêu','tieu-slug-vn',1000.00,10000.00,0.00,'1970-01-01 00:00:00','1970-01-01 23:59:59',0,0,0,0,1,NULL,1,4,1,'2017-10-20 03:46:49','2017-11-07 03:29:45',NULL),(5,'SKUCPS10','Cà Phê Chồn','ca-phe-chon',250000.00,240000.00,0.00,'2017-12-13 00:00:00','2018-01-01 23:59:59',0,0,0,0,1,NULL,1,15,1,'2017-10-20 03:55:48','2017-12-13 04:28:07',NULL),(6,'TUILOC1','Cà Phê Túi Lọc','ca-phe-tui-loc',150000.00,160000.00,0.00,'1970-01-01 00:00:00','1970-01-01 23:59:59',0,0,0,0,1,NULL,1,16,1,'2017-10-21 07:48:24','2017-12-13 04:29:59',NULL),(7,'MATCHA1','Trà sữa Matcha','tra-sua-matcha',50000.00,55000.00,40000.00,'1970-01-01 00:00:00','1970-01-01 23:59:59',0,0,0,0,1,NULL,1,3,1,'2017-10-23 02:41:35','2017-10-29 08:16:19',NULL),(8,NULL,'Temp asd','temp-asd',0.00,0.00,0.00,NULL,NULL,0,0,0,0,1,NULL,0,8,1,'2017-10-29 03:57:05','2017-10-29 03:57:28','2017-10-29 03:57:28'),(9,NULL,'adasdas','adasdas',0.00,0.00,0.00,NULL,NULL,0,0,0,0,1,NULL,0,8,1,'2017-10-29 03:59:41','2017-10-29 03:59:51','2017-10-29 03:59:51'),(10,'sdasdas','test thoi ma','test-thoi-ma',0.00,0.00,0.00,NULL,NULL,0,0,0,0,1,NULL,0,8,1,'2017-10-29 06:20:06','2017-10-29 06:20:55','2017-10-29 06:20:55'),(11,NULL,'test thoi nhe','test-thoi-nhe',0.00,0.00,0.00,NULL,NULL,0,0,0,0,1,NULL,0,8,1,'2017-10-29 06:22:19','2017-10-29 08:15:42','2017-10-29 08:15:42'),(12,NULL,'test thoi nhe','test-thoi-nhe-171029064401',0.00,0.00,0.00,NULL,NULL,0,0,0,0,1,NULL,0,3,1,'2017-10-29 06:44:14','2017-10-29 08:15:54','2017-10-29 08:15:54'),(13,NULL,'test thoi nhe 2','test-thoi-nhe-2',0.00,0.00,0.00,'1970-01-01 00:00:00','1970-01-01 23:59:59',0,0,0,0,1,NULL,0,3,1,'2017-10-29 07:20:54','2017-10-29 08:16:03','2017-10-29 08:16:03'),(14,NULL,'ô tô kê rô','o-to-ke-ro',0.00,0.00,0.00,NULL,NULL,0,0,0,0,1,NULL,0,3,1,'2017-10-29 08:04:56','2017-10-29 08:04:56',NULL),(15,'1TM20s01','Matcha trà sữa DakMark','matcha-tra-sua-dakmark',56000.00,55000.00,40000.00,'2017-11-30 00:00:00','2017-12-01 23:59:59',1,0,0,0,1,NULL,1,3,1,'2017-11-30 01:43:53','2017-11-30 01:46:27',NULL),(16,'t1','test 1 1','test-1-1',0.00,0.00,0.00,NULL,NULL,0,0,0,0,1,NULL,0,4,1,'2017-12-22 04:03:29','2017-12-22 04:03:41','2017-12-22 04:03:41');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_user` (
  `user_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_user_role_id_foreign` (`role_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (1,1),(2,3),(6,3);
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `display_name` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin','Administrator','Admin Account','2017-10-19 18:38:32','2017-10-19 18:38:32'),(2,'manager','Manager','Manager Account','2017-10-19 18:38:32','2017-10-19 18:38:32'),(3,'customer','Customer','Customer Account','2017-10-19 18:38:32','2017-10-19 18:38:32');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `settings` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES (1,'_token','UVZsPiGRKmtGumE2EcBsLyFdPaq2Bh8QoE4dS45M','2017-10-31 03:07:39','2017-12-07 07:01:42'),(2,'website_name','Pokofarms','2017-10-31 03:07:39','2017-10-31 03:07:39'),(3,'address','123 Hung Vuong, Dakha, Kontum','2017-10-31 03:07:39','2017-11-08 09:58:52'),(4,'phone','0122 333 8889','2017-10-31 03:07:39','2017-11-03 16:07:53'),(5,'hotline','0122 333 8889','2017-10-31 03:07:39','2017-11-02 10:43:30'),(6,'fax','0122 333 8889','2017-10-31 03:07:39','2017-11-03 16:08:09'),(7,'email','pokofarms@pokofarms.com.vn','2017-10-31 03:07:39','2017-11-24 03:42:05'),(8,'tax_code','0122 333 8889','2017-10-31 03:07:39','2017-11-03 16:08:09'),(9,'seo_title','http://pokofarms.com.vn','2017-10-31 03:07:39','2017-11-03 16:08:28'),(10,'keyword','http://pokofarms.com.vn','2017-10-31 03:07:39','2017-11-03 16:08:28'),(11,'description','http://pokofarms.com.vn','2017-10-31 03:07:39','2017-11-03 16:08:28'),(12,'logo',NULL,'2017-10-31 03:07:39','2017-10-31 03:07:39'),(13,'favicon',NULL,'2017-10-31 03:07:39','2017-10-31 03:07:39'),(14,'facebook','pokofarms','2017-11-02 10:43:30','2017-11-02 10:43:30'),(15,'messenger','pokofarms','2017-11-02 10:43:30','2017-11-02 10:43:30'),(16,'twitter','pokofarms','2017-11-02 10:43:30','2017-11-02 10:43:30'),(17,'youtube','pokofarms','2017-11-02 10:43:30','2017-11-02 10:43:30'),(18,'vimeo','pokofarms','2017-11-02 10:43:30','2017-11-02 10:43:30'),(19,'home_video_url','https://www.youtube.com/embed/PLKTGWH398Q','2017-11-02 10:43:30','2017-11-02 10:43:30'),(20,'account_active_mail','1','2017-11-02 10:43:30','2017-11-02 10:43:30'),(21,'promote_mail','1','2017-11-02 10:43:30','2017-11-02 10:43:30'),(22,'currency_','usd','2017-11-08 03:58:29','2017-11-08 04:01:25'),(23,'banner-style',NULL,'2017-11-08 03:58:29','2017-12-07 07:01:42'),(24,'skype','pokofarms','2017-11-08 03:59:50','2017-11-08 03:59:50'),(25,'currency','vnd','2017-11-08 04:09:11','2017-11-08 04:09:16'),(26,'website','https://pokofarms.vn','2017-11-08 09:58:52','2017-11-08 09:58:52'),(27,'fw-banner-url','#','2017-11-22 01:15:36','2017-11-22 01:15:36'),(28,'left-banner-url','#','2017-11-22 01:15:36','2017-11-22 01:15:36'),(29,'right-banner-url','#','2017-11-22 01:15:36','2017-11-22 01:15:36');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `shoppingcart`
--

DROP TABLE IF EXISTS `shoppingcart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `shoppingcart` (
  `identifier` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `instance` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`identifier`,`instance`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shoppingcart`
--

LOCK TABLES `shoppingcart` WRITE;
/*!40000 ALTER TABLE `shoppingcart` DISABLE KEYS */;
INSERT INTO `shoppingcart` VALUES ('1','wishlist','O:29:\"Illuminate\\Support\\Collection\":1:{s:8:\"\0*\0items\";a:2:{s:32:\"775dbb9c30d41d902e22b2b6b7a06532\";O:32:\"Gloudemans\\Shoppingcart\\CartItem\":8:{s:5:\"rowId\";s:32:\"775dbb9c30d41d902e22b2b6b7a06532\";s:2:\"id\";s:1:\"5\";s:3:\"qty\";s:2:\"69\";s:4:\"name\";s:15:\"Cà Phê Chồn\";s:5:\"price\";d:240000;s:7:\"options\";O:39:\"Gloudemans\\Shoppingcart\\CartItemOptions\":1:{s:8:\"\0*\0items\";a:2:{s:7:\"summary\";s:8:\"Intro...\";s:6:\"source\";s:52:\"images/Lt7NjNv3bWBBeHJq6k2Jyij5g4Je9ECJ3wckrzYS.jpeg\";}}s:49:\"\0Gloudemans\\Shoppingcart\\CartItem\0associatedModel\";N;s:41:\"\0Gloudemans\\Shoppingcart\\CartItem\0taxRate\";i:0;}s:32:\"e27a8683a8ec9ac64e3a7a4f34a6e29f\";O:32:\"Gloudemans\\Shoppingcart\\CartItem\":8:{s:5:\"rowId\";s:32:\"e27a8683a8ec9ac64e3a7a4f34a6e29f\";s:2:\"id\";s:1:\"6\";s:3:\"qty\";s:1:\"5\";s:4:\"name\";s:19:\"Cà Phê Túi Lọc\";s:5:\"price\";d:160000;s:7:\"options\";O:39:\"Gloudemans\\Shoppingcart\\CartItemOptions\":1:{s:8:\"\0*\0items\";a:2:{s:7:\"summary\";s:8:\"Intro...\";s:6:\"source\";s:52:\"images/wLj2v36fGBvG2LUrp3nu5GVPWnbkzpNoqGX3t1LK.jpeg\";}}s:49:\"\0Gloudemans\\Shoppingcart\\CartItem\0associatedModel\";N;s:41:\"\0Gloudemans\\Shoppingcart\\CartItem\0taxRate\";i:0;}}}',NULL,NULL);
/*!40000 ALTER TABLE `shoppingcart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `slider_translations`
--

DROP TABLE IF EXISTS `slider_translations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `slider_translations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `language_id` int(10) unsigned NOT NULL,
  `slider_id` int(10) unsigned NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `slider_translations_language_id_foreign` (`language_id`),
  KEY `slider_translations_slider_id_foreign` (`slider_id`),
  CONSTRAINT `slider_translations_language_id_foreign` FOREIGN KEY (`language_id`) REFERENCES `languages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `slider_translations_slider_id_foreign` FOREIGN KEY (`slider_id`) REFERENCES `sliders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `slider_translations`
--

LOCK TABLES `slider_translations` WRITE;
/*!40000 ALTER TABLE `slider_translations` DISABLE KEYS */;
INSERT INTO `slider_translations` VALUES (1,1,1,'Nông sản sạch được chăm sóc bằng cả tầm lòng người nông dân','2017-10-19 18:38:33','2017-10-20 04:03:23'),(2,2,1,'Organic products grow with love','2017-10-19 18:38:33','2017-10-20 04:03:23'),(3,3,1,'Ni sua ma. vãi Tiếng Trung,','2017-10-19 18:38:33','2017-10-31 14:06:43'),(4,1,2,'Ở Pokofarms, chúng tôi chan hòa với thiên nhiên','2017-10-19 18:38:33','2017-10-20 04:04:22'),(5,2,2,'Pokofarms share with nature','2017-10-19 18:38:33','2017-10-20 04:04:22'),(6,3,2,'Chin thien hao ron a.','2017-10-19 18:38:33','2017-10-19 18:38:33'),(7,1,3,'Cuộc sống khỏe bắt đầu bằng thực phẩm sạch','2017-10-19 18:38:33','2017-10-20 04:05:56'),(8,2,3,'Natural fine coffee','2017-10-19 18:38:33','2017-12-19 17:32:59'),(9,3,3,'Chin thien hao lon a.','2017-10-19 18:38:33','2017-10-19 18:38:33'),(10,4,1,'Ki mo','2017-10-31 14:07:01','2017-10-31 14:07:01');
/*!40000 ALTER TABLE `slider_translations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sliders`
--

DROP TABLE IF EXISTS `sliders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sliders` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `url` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order` int(10) unsigned NOT NULL,
  `image` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_show` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sliders`
--

LOCK TABLES `sliders` WRITE;
/*!40000 ALTER TABLE `sliders` DISABLE KEYS */;
INSERT INTO `sliders` VALUES (1,'Pô Kô Farms - sharing from nature!','po-ko-farms-sharing-from-nature',1,'images/slider/22812585_1456427991060776_936973309_o.jpg',1,'2017-10-19 18:38:33','2017-11-07 02:56:50'),(2,'Pokofarms share with nature','#',2,'images/slider/Hap-dan-trang-trai-cafe-chon.jpg',1,'2017-10-19 18:38:33','2017-10-20 04:04:22'),(3,'Naturall fine coffee','naturall-fine-coffee',3,'images/slider/natural fine Robusta.jpg',1,'2017-10-19 18:38:33','2017-12-19 17:32:11');
/*!40000 ALTER TABLE `sliders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribe`
--

DROP TABLE IF EXISTS `subscribe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subscribe` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `locale` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribe`
--

LOCK TABLES `subscribe` WRITE;
/*!40000 ALTER TABLE `subscribe` DISABLE KEYS */;
INSERT INTO `subscribe` VALUES (5,'hieudt0302@gmail.com','en','2017-12-01 05:54:21','2017-12-01 05:54:21');
/*!40000 ALTER TABLE `subscribe` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taggables`
--

DROP TABLE IF EXISTS `taggables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `taggables` (
  `tag_id` int(10) unsigned NOT NULL,
  `taggable_id` int(10) unsigned NOT NULL,
  `taggable_type` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  KEY `taggables_tag_id_foreign` (`tag_id`),
  CONSTRAINT `taggables_tag_id_foreign` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taggables`
--

LOCK TABLES `taggables` WRITE;
/*!40000 ALTER TABLE `taggables` DISABLE KEYS */;
INSERT INTO `taggables` VALUES (25,9,'App\\Models\\Post',NULL,NULL),(26,9,'App\\Models\\Post',NULL,NULL),(27,9,'App\\Models\\Post',NULL,NULL),(28,1,'App\\Models\\Product',NULL,NULL),(29,1,'App\\Models\\Product',NULL,NULL),(29,6,'App\\Models\\Post',NULL,NULL),(30,6,'App\\Models\\Post',NULL,NULL),(31,1,'App\\Models\\Product',NULL,NULL),(26,10,'App\\Models\\Post',NULL,NULL),(28,10,'App\\Models\\Post',NULL,NULL),(25,10,'App\\Models\\Post',NULL,NULL),(25,11,'App\\Models\\Post',NULL,NULL),(26,11,'App\\Models\\Post',NULL,NULL),(27,11,'App\\Models\\Post',NULL,NULL),(31,15,'App\\Models\\Product',NULL,NULL),(32,15,'App\\Models\\Product',NULL,NULL),(33,15,'App\\Models\\Product',NULL,NULL),(34,15,'App\\Models\\Product',NULL,NULL),(29,5,'App\\Models\\Product',NULL,NULL),(35,5,'App\\Models\\Product',NULL,NULL),(36,5,'App\\Models\\Product',NULL,NULL),(30,12,'App\\Models\\Post',NULL,NULL);
/*!40000 ALTER TABLE `taggables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tags`
--

DROP TABLE IF EXISTS `tags`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tags` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `slug` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tags`
--

LOCK TABLES `tags` WRITE;
/*!40000 ALTER TABLE `tags` DISABLE KEYS */;
INSERT INTO `tags` VALUES (25,'Lê','le','2017-10-29 08:55:58','2017-10-29 08:55:58',NULL),(26,'Minh','minh','2017-10-29 08:55:58','2017-10-29 08:55:58',NULL),(27,'Tuấn','tuan','2017-10-29 08:55:58','2017-10-29 08:55:58',NULL),(28,'Rang xay','rang-xay','2017-10-31 07:54:09','2017-10-31 07:54:09',NULL),(29,'Cà phê','ca-phe','2017-10-31 07:54:10','2017-10-31 07:54:10',NULL),(30,'sản xuất','san-xuat','2017-10-31 07:57:15','2017-10-31 07:57:15',NULL),(31,'Hot','hot','2017-11-01 16:10:55','2017-11-01 16:10:55',NULL),(32,'matcha','matcha','2017-11-30 01:43:53','2017-11-30 01:43:53',NULL),(33,'Trà sữa','tra-sua','2017-11-30 01:43:53','2017-11-30 01:43:53',NULL),(34,'thức uống','thuc-uong','2017-11-30 01:43:54','2017-11-30 01:43:54',NULL),(35,'đặc sản','dac-san','2017-12-13 03:58:32','2017-12-13 03:58:32',NULL),(36,'chồn','chon','2017-12-13 03:58:32','2017-12-13 03:58:32',NULL);
/*!40000 ALTER TABLE `tags` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `first_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `avatar` text COLLATE utf8mb4_unicode_ci,
  `gender` tinyint(1) NOT NULL,
  `date_of_birth` date NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `company` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `vat` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `newsletter` tinyint(1) NOT NULL DEFAULT '0',
  `password` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `activated` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','Admin','Mr.',NULL,1,'2017-10-31','admin@admin.com','+84 123 456 789',NULL,NULL,1,'$2y$10$EmMu4b8o3LEKcIVW.DiFVenwzshsfF96jCrs11DrWucNIrIj5LbaK','DmWnMpJybBNwaaC3oWXndQfdb1axiRowEKKEuIgLOIxtc31dNAVaiW1lSTSY',1,'2017-10-19 18:38:32','2017-11-04 16:21:56',NULL),(2,'Đức Thắng','Thắng','Lê',NULL,0,'0000-00-00','thangld@jcs-corp.com',NULL,NULL,NULL,0,'$2y$10$6m61bloVOdJ7NKr1cI56iegHgmi2zJcdBWZVWM4nfZ/NWAgh0qkMa',NULL,1,'2017-10-22 15:44:39','2017-10-22 15:44:39',NULL),(5,'tuanlm','Tuan','Le',NULL,0,'0000-00-00','tuanlddm@jcs-corp.com',NULL,NULL,NULL,0,'$2y$10$lOLsJsXZpOrzTffVYTvQPuDVCNO2uAtBeaTOO24pR24vVbeEKpZ8e',NULL,1,'2017-11-01 16:42:18','2017-11-01 16:55:21','2017-11-01 16:55:21'),(6,'linh@pokofarm.com','Linh','Ngọc',NULL,0,'0000-00-00','mkt6@dakmark.com.vn',NULL,NULL,NULL,0,'$2y$10$aT5a89NA/bZl2mCoezA.Yeun/AGu/6Kf35IEg.7XiyCxhv9O.utk6',NULL,1,'2017-11-02 06:43:07','2017-11-02 06:43:07',NULL);
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

-- Dump completed on 2017-12-24  2:06:58
