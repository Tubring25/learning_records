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

 Date: 15/03/2021 17:27:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for st_game_type
-- ----------------------------
DROP TABLE IF EXISTS `st_game_type`;
CREATE TABLE `st_game_type`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createdAt` datetime(0) NULL DEFAULT NULL,
  `updatedAt` datetime(0) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

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

SET FOREIGN_KEY_CHECKS = 1;
