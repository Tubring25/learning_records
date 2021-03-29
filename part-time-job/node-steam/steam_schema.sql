/*
 Navicat Premium Data Transfer

 Source Server         : sam
 Source Server Type    : MySQL
 Source Server Version : 80020
 Source Host           : localhost:3306
 Source Schema         : steam_schema

 Target Server Type    : MySQL
 Target Server Version : 80020
 File Encoding         : 65001

 Date: 29/03/2021 17:29:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for st_admin
-- ----------------------------
DROP TABLE IF EXISTS `st_admin`;
CREATE TABLE `st_admin`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `permission` int NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_admin
-- ----------------------------
INSERT INTO `st_admin` VALUES (1, 'admin', '123123', NULL, NULL, 0, '2021-03-18 10:47:51', NULL);

-- ----------------------------
-- Table structure for st_game
-- ----------------------------
DROP TABLE IF EXISTS `st_game`;
CREATE TABLE `st_game`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `img_list` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `release_date` datetime(0) NULL DEFAULT NULL,
  `developer` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `publisher` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `game_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT 0.00,
  `is_sale` tinyint(1) NULL DEFAULT 0,
  `sale_price` decimal(10, 2) NULL DEFAULT 0.00,
  `is_onshelf` tinyint(1) NULL DEFAULT 0,
  `is_delete` tinyint(1) NULL DEFAULT 0,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_game
-- ----------------------------
INSERT INTO `st_game` VALUES (6, '1111111', '12312312', '12123123', '2021-03-22 16:00:00', '11', '111', '2', 121212.00, 0, 0.00, 0, 0, '2021-03-27 01:31:30', '2021-03-27 01:31:30');
INSERT INTO `st_game` VALUES (7, '3333', '1111111111', '333', '2021-03-29 16:00:00', '33', '33', '3', 121212.00, 1, 111.00, 0, 0, '2021-03-27 01:38:58', '2021-03-27 01:38:58');
INSERT INTO `st_game` VALUES (8, '21324', '23423', '21324', '2021-03-29 16:00:00', '21324', '21324', '1', 11.00, 0, 0.00, 0, 0, '2021-03-29 09:14:07', '2021-03-29 09:14:07');

-- ----------------------------
-- Table structure for st_game_type
-- ----------------------------
DROP TABLE IF EXISTS `st_game_type`;
CREATE TABLE `st_game_type`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NULL DEFAULT NULL,
  `updated_at` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_game_type
-- ----------------------------
INSERT INTO `st_game_type` VALUES (1, '策略', '2021-03-15 07:32:37', '2021-03-15 07:35:41');
INSERT INTO `st_game_type` VALUES (2, '休闲', '2021-03-15 07:39:08', '2021-03-15 07:39:08');
INSERT INTO `st_game_type` VALUES (3, '体育', '2021-03-15 07:39:13', '2021-03-15 07:39:13');
INSERT INTO `st_game_type` VALUES (4, '冒险', '2021-03-15 07:39:18', '2021-03-15 07:39:18');
INSERT INTO `st_game_type` VALUES (5, '动作', '2021-03-15 07:39:21', '2021-03-15 07:39:21');
INSERT INTO `st_game_type` VALUES (6, '模拟', '2021-03-15 07:39:33', '2021-03-15 07:39:33');
INSERT INTO `st_game_type` VALUES (7, '独立', '2021-03-15 07:39:36', '2021-03-15 07:39:36');
INSERT INTO `st_game_type` VALUES (8, '竞速', '2021-03-15 07:39:39', '2021-03-15 07:39:39');
INSERT INTO `st_game_type` VALUES (9, '角色扮演', '2021-03-15 07:39:53', '2021-03-15 07:39:53');
INSERT INTO `st_game_type` VALUES (10, '大型多人在线', '2021-03-15 07:40:00', '2021-03-15 07:40:00');

-- ----------------------------
-- Table structure for st_system_requirement
-- ----------------------------
DROP TABLE IF EXISTS `st_system_requirement`;
CREATE TABLE `st_system_requirement`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `req_type` int NULL DEFAULT NULL,
  `handle_system` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'Windows 10',
  `cpu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'Intel i5-4590',
  `ram` int NULL DEFAULT 8,
  `ram_unit` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'GB',
  `gpu` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'NVIDIA GTX 970 / AMD Radeon R9 290',
  `storage_space` int NULL DEFAULT 4,
  `storage_space_unit` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'GB',
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `game_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `game_id`(`game_id`) USING BTREE,
  CONSTRAINT `st_system_requirement_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `st_game` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '游戏分类信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_system_requirement
-- ----------------------------
INSERT INTO `st_system_requirement` VALUES (1, 0, '21324', '21324', 2, 'GB', '21324', 2, 'GB', '2021-03-29 09:14:18', '2021-03-29 09:14:18', 8);
INSERT INTO `st_system_requirement` VALUES (2, 1, 'Windows 10', 'Intel i5-4590', 8, 'GB', 'NVIDIA GTX 970 / AMD Radeon R9 290', 4, 'GB', '2021-03-29 17:19:28', '2021-03-29 17:19:37', 8);

-- ----------------------------
-- Table structure for st_user
-- ----------------------------
DROP TABLE IF EXISTS `st_user`;
CREATE TABLE `st_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_user
-- ----------------------------
INSERT INTO `st_user` VALUES (1, 'test', '123123', NULL, 'admin@qq.com', NULL, NULL, NULL);
INSERT INTO `st_user` VALUES (2, 'test2', '1223', NULL, '851194017@qq.com', NULL, NULL, NULL);
INSERT INTO `st_user` VALUES (3, 'testww1', '123', NULL, 'tubring25@gmail.com', NULL, NULL, NULL);
INSERT INTO `st_user` VALUES (4, '2121212', '22222', NULL, '1111@ww.com', NULL, NULL, NULL);

SET FOREIGN_KEY_CHECKS = 1;
