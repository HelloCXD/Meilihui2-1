-- MySQL dump 10.13  Distrib 5.6.16, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: meilihui
-- ------------------------------------------------------
-- Server version	5.6.16-1~exp1

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
-- Table structure for table `App_cart`
--

DROP TABLE IF EXISTS `App_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `App_cart` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) NOT NULL,
  `isselect` tinyint(1) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `App_cart_user_id_4853be0b_fk_App_user_id` (`user_id`),
  KEY `App_cart_goods_id_7f683fdc_fk_App_goodsdetail_id` (`goods_id`),
  CONSTRAINT `App_cart_goods_id_7f683fdc_fk_App_goodsdetail_id` FOREIGN KEY (`goods_id`) REFERENCES `App_goodsdetail` (`id`),
  CONSTRAINT `App_cart_user_id_4853be0b_fk_App_user_id` FOREIGN KEY (`user_id`) REFERENCES `App_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `App_cart`
--

LOCK TABLES `App_cart` WRITE;
/*!40000 ALTER TABLE `App_cart` DISABLE KEYS */;
INSERT INTO `App_cart` VALUES (1,12,1,2,17);
/*!40000 ALTER TABLE `App_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `App_goodsdetail`
--

DROP TABLE IF EXISTS `App_goodsdetail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `App_goodsdetail` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsid` varchar(20) NOT NULL,
  `buyer` varchar(20) NOT NULL,
  `src1` varchar(100) NOT NULL,
  `src2` varchar(100) NOT NULL,
  `src3` varchar(100) NOT NULL,
  `src4` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` decimal(7,2) NOT NULL,
  `original_price` decimal(7,2) NOT NULL,
  `index1` varchar(100) NOT NULL,
  `index2` varchar(100) NOT NULL,
  `index3` varchar(100) NOT NULL,
  `index4` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `App_goodsdetail`
--

LOCK TABLES `App_goodsdetail` WRITE;
/*!40000 ALTER TABLE `App_goodsdetail` DISABLE KEYS */;
INSERT INTO `App_goodsdetail` VALUES (1,'product1','买手推荐','/static/img/product1_1.jpg','/static/img/product1_2.jpg','/static/img/product1_3.jpg','/static/img/product1_4_b.jpg','红色荔枝纹拉链手提肩包','Tory Burch',3123.32,6756.00,'/static/img/product1_1_s.jpg','/static/img/product1_2_s.jpg','/static/img/product1_3_s.jpg','/static/img/product1_4_bs.jpg'),(2,'product2','买手推荐','/static/img/product2_1.jpg','/static/img/product2_2.jpg','/static/img/product2_3.jpg','/static/img/product2_4_b.jpg','黑色翻盖束带双肩包','Tory Burch',3245.33,7567.00,'/static/img/product2_1_s.jpg','/static/img/product2_2_s.jpg','/static/img/product2_3_s.jpg','/static/img/product2_4_bs.jpg'),(3,'product3','买手推荐','/static/img/product3_1.jpg','/static/img/product3_2.jpg','/static/img/product3_3.jpg','/static/img/product3_4_b.jpg','黑色荔枝纹Logo图案翻盖双肩包','Tory Burch',2342.41,8678.00,'/static/img/product3_1_s.jpg','/static/img/product3_2_s.jpg','/static/img/product3_3_s.jpg','/static/img/product3_4_bs.jpg'),(4,'product4','买手推荐','/static/img/product4_1.jpg','/static/img/product4_2.jpg','/static/img/product4_3.jpg','/static/img/product4_4_b.jpg','红色荔枝纹流苏翻盖双肩包','Tory Burch',2412.87,8767.00,'/static/img/product4_1_s.jpg','/static/img/product4_2_s.jpg','/static/img/product4_3_s.jpg','/static/img/product4_4_bs.jpg'),(5,'product5','买手推荐','/static/img/product4_1.jpg','/static/img/product4_2.jpg','/static/img/product4_3.jpg','/static/img/product4_4_b.jpg','红色荔枝纹流苏翻盖双肩包','Tory Burch',3142.53,5675.00,'/static/img/product4_1_s.jpg','/static/img/product4_2_s.jpg','/static/img/product4_3_s.jpg','/static/img/product4_4_bs.jpg'),(6,'product6','买手推荐','/static/img/product2_1.jpg','/static/img/product2_2.jpg','/static/img/product2_3.jpg','/static/img/product2_4_b.jpg','黑色翻盖束带双肩包','Tory Burch',2408.87,7565.00,'/static/img/product2_1_s.jpg','/static/img/product2_2_s.jpg','/static/img/product2_3_s.jpg','/static/img/product2_4_bs.jpg'),(7,'product7','买手推荐','/static/img/product1_1.jpg','/static/img/product1_2.jpg','/static/img/product1_3.jpg','/static/img/product1_4_b.jpg','红色荔枝纹拉链手提肩包','Tory Burch',3123.98,4564.00,'/static/img/product1_1_s.jpg','/static/img/product1_2_s.jpg','/static/img/product1_3_s.jpg','/static/img/product1_4_bs.jpg'),(8,'product8','买手推荐','/static/img/product3_1.jpg','/static/img/product3_2.jpg','/static/img/product3_3.jpg','/static/img/product3_4_b.jpg','黑色荔枝纹Logo图案翻盖双肩包','Tory Burch',3121.76,4564.00,'/static/img/product3_1_s.jpg','/static/img/product3_2_s.jpg','/static/img/product3_3_s.jpg','/static/img/product3_4_bs.jpg');
/*!40000 ALTER TABLE `App_goodsdetail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `App_goodslist`
--

DROP TABLE IF EXISTS `App_goodslist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `App_goodslist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsid` varchar(20) NOT NULL,
  `buyer` varchar(20) NOT NULL,
  `src1` varchar(100) NOT NULL,
  `src2` varchar(100) NOT NULL,
  `src3` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `price` varchar(40) NOT NULL,
  `original_price` varchar(40) NOT NULL,
  `index1` varchar(100) NOT NULL,
  `index2` varchar(100) NOT NULL,
  `index3` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `App_goodslist`
--

LOCK TABLES `App_goodslist` WRITE;
/*!40000 ALTER TABLE `App_goodslist` DISABLE KEYS */;
INSERT INTO `App_goodslist` VALUES (1,'product1','买手推荐','/static/img/product1_1.jpg','/static/img/product1_2.jpg','/static/img/product1_3.jpg','红色荔枝纹拉链手提肩包','Tory Burch','0','￥4995','/static/img/product1_1_s.jpg','/static/img/product1_2_s.jpg','/static/img/product1_3_s.jpg'),(2,'product2','买手推荐','/static/img/product2_1.jpg','/static/img/product2_2.jpg','/static/img/product2_3.jpg','黑色翻盖束带双肩包','Tory Burch','0','￥4960','/static/img/product2_1_s.jpg','/static/img/product2_2_s.jpg','/static/img/product2_3_s.jpg'),(3,'product3','买手推荐','/static/img/product3_1.jpg','/static/img/product3_2.jpg','/static/img/product3_3.jpg','黑色荔枝纹Logo图案翻盖双肩包','Tory Burch','0','￥2345','/static/img/product3_1_s.jpg','/static/img/product3_2_s.jpg','/static/img/product3_3_s.jpg'),(4,'product4','买手推荐','/static/img/product4_1.jpg','/static/img/product4_2.jpg','/static/img/product4_3.jpg','红色荔枝纹流苏翻盖双肩包','Tory Burch','0','￥5080','/static/img/product4_1_s.jpg','/static/img/product4_2_s.jpg','/static/img/product4_3_s.jpg'),(5,'product5','买手推荐','/static/img/product4_1.jpg','/static/img/product4_2.jpg','/static/img/product4_3.jpg','红色荔枝纹流苏翻盖双肩包','Tory Burch','0','￥6902','/static/img/product4_1_s.jpg','/static/img/product4_2_s.jpg','/static/img/product4_3_s.jpg'),(6,'product6','买手推荐','/static/img/product2_1.jpg','/static/img/product2_2.jpg','/static/img/product2_3.jpg','黑色翻盖束带双肩包','Tory Burch','2408','￥5808','/static/img/product2_1_s.jpg','/static/img/product2_2_s.jpg','/static/img/product2_3_s.jpg'),(7,'product7','买手推荐','/static/img/product1_1.jpg','/static/img/product1_2.jpg','/static/img/product1_3.jpg','红色荔枝纹拉链手提肩包','Tory Burch','0','￥7609','/static/img/product1_1_s.jpg','/static/img/product1_2_s.jpg','/static/img/product1_3_s.jpg'),(8,'product8','买手推荐','/static/img/product3_1.jpg','/static/img/product3_2.jpg','/static/img/product3_3.jpg','黑色荔枝纹Logo图案翻盖双肩包','Tory Burch','0','￥5830','/static/img/product3_1_s.jpg','/static/img/product3_2_s.jpg','/static/img/product3_3_s.jpg');
/*!40000 ALTER TABLE `App_goodslist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `App_order`
--

DROP TABLE IF EXISTS `App_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `App_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createtime` datetime(6) NOT NULL,
  `status` int(11) NOT NULL,
  `identifier` varchar(256) NOT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `App_order_user_id_040b7227_fk_App_user_id` (`user_id`),
  CONSTRAINT `App_order_user_id_040b7227_fk_App_user_id` FOREIGN KEY (`user_id`) REFERENCES `App_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `App_order`
--

LOCK TABLES `App_order` WRITE;
/*!40000 ALTER TABLE `App_order` DISABLE KEYS */;
INSERT INTO `App_order` VALUES (1,'2018-11-11 07:11:32.011428',1,'154192029220069',18),(2,'2018-11-11 07:43:42.920546',1,'154192222237532',18),(3,'2018-11-11 08:24:04.777843',1,'154192464422088',18),(4,'2018-11-11 08:25:47.810659',1,'154192474727814',18),(5,'2018-11-11 08:25:55.418477',1,'154192475555598',18),(6,'2018-11-11 08:27:05.173077',1,'154192482548802',18),(7,'2018-11-11 08:27:07.417403',1,'154192482755041',18),(8,'2018-11-11 08:27:31.718473',1,'154192485166999',18),(9,'2018-11-11 08:28:05.626011',1,'154192488584428',18),(10,'2018-11-11 08:28:48.237936',1,'154192492853131',18),(11,'2018-11-11 08:30:12.565886',1,'154192501221929',18);
/*!40000 ALTER TABLE `App_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `App_ordergoods`
--

DROP TABLE IF EXISTS `App_ordergoods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `App_ordergoods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` int(11) NOT NULL,
  `goods_id` int(11) NOT NULL,
  `order_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `App_ordergoods_goods_id_870997c9_fk_App_goodsdetail_id` (`goods_id`),
  KEY `App_ordergoods_order_id_1d9efb59_fk_App_order_id` (`order_id`),
  CONSTRAINT `App_ordergoods_goods_id_870997c9_fk_App_goodsdetail_id` FOREIGN KEY (`goods_id`) REFERENCES `App_goodsdetail` (`id`),
  CONSTRAINT `App_ordergoods_order_id_1d9efb59_fk_App_order_id` FOREIGN KEY (`order_id`) REFERENCES `App_order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `App_ordergoods`
--

LOCK TABLES `App_ordergoods` WRITE;
/*!40000 ALTER TABLE `App_ordergoods` DISABLE KEYS */;
INSERT INTO `App_ordergoods` VALUES (1,11,1,1),(2,17,2,1),(3,6,7,1),(4,6,8,1),(5,2,2,2),(6,4,2,3),(7,3,2,6),(8,2,2,9),(9,3,2,10),(10,7,2,11);
/*!40000 ALTER TABLE `App_ordergoods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `App_user`
--

DROP TABLE IF EXISTS `App_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `App_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tel` varchar(20) NOT NULL,
  `password` varchar(256) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `App_user_tel_bff5c2cb_uniq` (`tel`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `App_user`
--

LOCK TABLES `App_user` WRITE;
/*!40000 ALTER TABLE `App_user` DISABLE KEYS */;
INSERT INTO `App_user` VALUES (17,'17712215719','123456'),(18,'17712215717','123456'),(19,'','l');
/*!40000 ALTER TABLE `App_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `App_wheel`
--

DROP TABLE IF EXISTS `App_wheel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `App_wheel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `img` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `App_wheel`
--

LOCK TABLES `App_wheel` WRITE;
/*!40000 ALTER TABLE `App_wheel` DISABLE KEYS */;
INSERT INTO `App_wheel` VALUES (1,'/static/img/goods_big1.jpg','goods_big1'),(2,'/static/img/goods_big2.jpg','goods_big2');
/*!40000 ALTER TABLE `App_wheel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(80) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_group_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int(11) NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can add permission',2,'add_permission'),(5,'Can change permission',2,'change_permission'),(6,'Can delete permission',2,'delete_permission'),(7,'Can add group',3,'add_group'),(8,'Can change group',3,'change_group'),(9,'Can delete group',3,'delete_group'),(10,'Can add user',4,'add_user'),(11,'Can change user',4,'change_user'),(12,'Can delete user',4,'delete_user'),(13,'Can add content type',5,'add_contenttype'),(14,'Can change content type',5,'change_contenttype'),(15,'Can delete content type',5,'delete_contenttype'),(16,'Can add session',6,'add_session'),(17,'Can change session',6,'change_session'),(18,'Can delete session',6,'delete_session'),(19,'Can add user',7,'add_user'),(20,'Can change user',7,'change_user'),(21,'Can delete user',7,'delete_user'),(22,'Can add wheel',8,'add_wheel'),(23,'Can change wheel',8,'change_wheel'),(24,'Can delete wheel',8,'delete_wheel'),(25,'Can add goodslist',9,'add_goodslist'),(26,'Can change goodslist',9,'change_goodslist'),(27,'Can delete goodslist',9,'delete_goodslist'),(28,'Can add goodsdetail',10,'add_goodsdetail'),(29,'Can change goodsdetail',10,'change_goodsdetail'),(30,'Can delete goodsdetail',10,'delete_goodsdetail'),(31,'Can add cart',11,'add_cart'),(32,'Can change cart',11,'change_cart'),(33,'Can delete cart',11,'delete_cart'),(34,'Can add order goods',12,'add_ordergoods'),(35,'Can change order goods',12,'change_ordergoods'),(36,'Can delete order goods',12,'delete_ordergoods'),(37,'Can add order',13,'add_order'),(38,'Can change order',13,'change_order'),(39,'Can delete order',13,'delete_order');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user`
--

DROP TABLE IF EXISTS `auth_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user`
--

LOCK TABLES `auth_user` WRITE;
/*!40000 ALTER TABLE `auth_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_groups`
--

DROP TABLE IF EXISTS `auth_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `group_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_groups_user_id_group_id_94350c0c_uniq` (`user_id`,`group_id`),
  KEY `auth_user_groups_group_id_97559544_fk_auth_group_id` (`group_id`),
  CONSTRAINT `auth_user_groups_group_id_97559544_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `auth_user_groups_user_id_6a12ed8b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_groups`
--

LOCK TABLES `auth_user_groups` WRITE;
/*!40000 ALTER TABLE `auth_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_user_user_permissions`
--

DROP TABLE IF EXISTS `auth_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auth_user_user_permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_user_user_permissions_user_id_permission_id_14a6b632_uniq` (`user_id`,`permission_id`),
  KEY `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`),
  CONSTRAINT `auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_user_user_permissions`
--

LOCK TABLES `auth_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `auth_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_admin_log` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint(5) unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_auth_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_auth_user_id` FOREIGN KEY (`user_id`) REFERENCES `auth_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_content_type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(11,'App','cart'),(10,'App','goodsdetail'),(9,'App','goodslist'),(13,'App','order'),(12,'App','ordergoods'),(7,'App','user'),(8,'App','wheel'),(3,'auth','group'),(2,'auth','permission'),(4,'auth','user'),(5,'contenttypes','contenttype'),(6,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_migrations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2018-10-30 11:34:39.020115'),(2,'auth','0001_initial','2018-10-30 11:34:42.406262'),(3,'admin','0001_initial','2018-10-30 11:34:42.663711'),(4,'admin','0002_logentry_remove_auto_add','2018-10-30 11:34:42.703190'),(5,'contenttypes','0002_remove_content_type_name','2018-10-30 11:34:42.877597'),(6,'auth','0002_alter_permission_name_max_length','2018-10-30 11:34:42.931290'),(7,'auth','0003_alter_user_email_max_length','2018-10-30 11:34:43.023741'),(8,'auth','0004_alter_user_username_opts','2018-10-30 11:34:43.044392'),(9,'auth','0005_alter_user_last_login_null','2018-10-30 11:34:43.178744'),(10,'auth','0006_require_contenttypes_0002','2018-10-30 11:34:43.183467'),(11,'auth','0007_alter_validators_add_error_messages','2018-10-30 11:34:43.202379'),(12,'auth','0008_alter_user_username_max_length','2018-10-30 11:34:43.285744'),(13,'sessions','0001_initial','2018-10-30 11:34:43.350565'),(14,'App','0001_initial','2018-10-30 11:40:26.008747'),(15,'App','0002_wheel','2018-11-03 06:27:38.594847'),(16,'App','0003_goodslist','2018-11-03 08:23:12.797281'),(17,'App','0004_goodsdetail','2018-11-07 01:00:02.384275'),(18,'App','0005_cart','2018-11-09 07:18:30.887578'),(19,'App','0006_auto_20181109_1522','2018-11-09 07:22:58.430848'),(20,'App','0007_auto_20181109_1639','2018-11-09 08:39:46.586657'),(21,'App','0008_auto_20181109_2040','2018-11-09 12:40:23.198445'),(22,'App','0009_auto_20181110_0854','2018-11-10 00:54:11.407355'),(23,'App','0010_auto_20181110_1458','2018-11-10 06:58:15.382238'),(24,'App','0011_order_ordergoods','2018-11-11 06:41:54.262121');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-11-11 17:03:57
