DROP DATABASE IF EXISTS `bbs_test`;
CREATE DATABASE `bbs_test`;

USE `bbs_test`;

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
    `id` bigint(20) NOT NULL AUTO_INCREMENT,
    `response` varchar(280) DEFAULT NULL,
    `created_at` datetime DEFAULT NULL,
    `deleted_at` datetime,
    PRIMARY KEY (`id`)
    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;