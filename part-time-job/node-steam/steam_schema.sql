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

 Date: 28/04/2021 12:23:30
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for st_admin
-- ----------------------------
DROP TABLE IF EXISTS `st_admin`;
CREATE TABLE `st_admin`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `permission` int NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '管理员信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_admin
-- ----------------------------
INSERT INTO `st_admin` VALUES (1, 'admin', '123123', '4009696577', '851194017@qq.com', 1, NULL, 'upload/1619408202810_598.jpg', '2021-04-06 15:49:40', '2021-04-26 03:38:51');
INSERT INTO `st_admin` VALUES (2, 'admin2', '111111', '18052091165', '724666079@qq.com', 0, NULL, 'upload/1619408378536_456.jpg', '2021-04-26 03:40:25', '2021-04-26 08:18:38');

-- ----------------------------
-- Table structure for st_comments
-- ----------------------------
DROP TABLE IF EXISTS `st_comments`;
CREATE TABLE `st_comments`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `game_id` int NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `buy_from` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`user_id`) USING BTREE,
  INDEX `game_id`(`game_id`) USING BTREE,
  CONSTRAINT `st_comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `st_user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `st_comments_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `st_game` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '评价' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_comments
-- ----------------------------
INSERT INTO `st_comments` VALUES (1, 1, 1, '1111111111111111', '1', '2021-04-25 08:45:29', '2021-04-25 08:45:34');
INSERT INTO `st_comments` VALUES (2, 1, 1, '1111111111111111', '1', '2021-04-25 08:45:29', '2021-04-25 08:45:34');
INSERT INTO `st_comments` VALUES (3, 2, 1, '1111111111111111', '1', '2021-04-25 08:45:29', '2021-04-25 08:45:34');
INSERT INTO `st_comments` VALUES (4, 1, 2, '4', '4', '2021-04-25 08:46:17', '2021-04-25 08:46:21');
INSERT INTO `st_comments` VALUES (5, 1, NULL, '11111111111111111111111', '1', '2021-04-25 02:21:15', '2021-04-25 02:21:15');
INSERT INTO `st_comments` VALUES (6, 1, 9, '123123123', '1', '2021-04-25 02:30:58', '2021-04-25 02:30:58');
INSERT INTO `st_comments` VALUES (7, 1, 9, '111111111', '1', '2021-04-25 02:31:11', '2021-04-25 02:31:11');

-- ----------------------------
-- Table structure for st_game
-- ----------------------------
DROP TABLE IF EXISTS `st_game`;
CREATE TABLE `st_game`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `release_date` datetime(0) NULL DEFAULT NULL,
  `developer` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `publisher` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `game_type` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `price` decimal(10, 2) NULL DEFAULT 0.00,
  `is_sale` tinyint(1) NULL DEFAULT 0,
  `sale_price` decimal(10, 2) NULL DEFAULT 0.00,
  `is_onshelf` tinyint(1) NULL DEFAULT 0,
  `is_delete` tinyint(1) NULL DEFAULT 0,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `sale_num` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '游戏信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_game
-- ----------------------------
INSERT INTO `st_game` VALUES (1, 'Grand Theft Auto V', 'PC 版Grand Theft Auto V 能够以超越 4K 的最高分辨率和 60 帧每秒的帧率，为您呈现屡获殊荣、令人痴迷的游戏世界——洛桑托斯市和布雷恩郡。', '2016-03-08 16:00:00', ' Rockstar North', ' Rockstar Games', '4', 119.00, 0, 0.00, 1, 0, '2021-04-06 08:10:37', '2021-04-25 05:49:08', 1);
INSERT INTO `st_game` VALUES (2, '巫师 3：狂猎', '随着北方领域战乱四起，您接下了此生最为重大的一笔委托：找到预言之子，一件足以改变世界面貌的活生生的武器。', '2015-04-14 16:00:00', 'CD PROJEKT RED', 'CD PROJEKT RED', '7', 119.00, 1, 79.00, 1, 0, '2021-04-06 08:21:32', '2021-04-25 05:49:08', 1);
INSERT INTO `st_game` VALUES (3, 'Tom Clancy\'s Rainbow Six® Siege', '《彩虹六号：围攻》是育碧蒙特利尔工作室旗下即将推出的知名第一人称射击模拟系列游戏的最新作品，专为新一代游戏机和主机开发，属于《彩虹六号》系列。该作灵感来源于现实世界中的反恐行动，《彩虹六号：围攻》诚邀玩家掌控破坏的艺术，游戏核心是对激烈的近距离对抗，高杀伤力，战术，团队合作', '2019-05-26 16:00:00', ' Ubisoft Montreal', ' Ubisoft', '4', 88.00, 1, 35.00, 1, 0, '2021-04-06 08:31:54', '2021-04-25 05:49:02', 1);
INSERT INTO `st_game` VALUES (4, 'Detroit: Become Human', '在《底特律：化身为人》中，人类和机器人的命运都将掌握在您的手中，您将走进一个不远的未来，一个机器人具有比人类更高智慧的时代。您将体验到史上最为复杂的分支故事——您所作出的每个选择都将影响游戏的结局。', '2020-06-07 16:00:00', 'Quantic Dream', 'Quantic Dream', '7', 129.00, 1, 89.00, 1, 0, '2021-04-07 07:22:38', '2021-04-25 03:19:51', 1);
INSERT INTO `st_game` VALUES (5, 'Spiritfarer®', '《Spiritfarer®》是一款关于死亡的休闲管理游戏。作为逝者的船主，建造一艘船去探索世界，关爱你的幽灵朋友，引导他们穿越神秘的海洋，最终将他们送到来世', '2020-08-09 16:00:00', ' Thunder Lotus Games', ' Thunder Lotus Games', '3', 99.00, 1, 59.00, 1, 0, '2021-04-07 07:25:36', '2021-04-25 05:49:02', 1);
INSERT INTO `st_game` VALUES (6, 'The Slormancer', '《Slormancer》是一款史诗级的2D-ARPG地牢探索游戏，玩家将作为流浪者，与Slormancer和他手下成群的敌人作战！你可以扮演“威风凛凛”的骑士、勇悍绝伦”的猎手或“古灵精怪”的法师，掌握数百种技能和先祖之力，为你的族群而战，为你的王国而战！', '2021-04-06 16:00:00', ' Slormite Studios', ' Slormite Studios', '1', 50.00, 1, 42.00, 1, 0, '2021-04-07 07:30:26', '2021-04-25 05:49:08', 3);
INSERT INTO `st_game` VALUES (7, '双人成行', '游玩《双人成行》，踏上生命中最疯狂的旅程，这是一款别开生面的平台冒险游戏，完全为合作模式而设计。利用好友通行证*邀请一位好友免费游玩，共同体验多种多样的乐趣，享受颠覆性的玩法挑战。扮演相互看不顺眼的科迪和小梅夫妇，这两个人被魔咒变成了玩偶。他们一起被困在一个奇幻世界里，每个角落都隐藏着意想不到的东西，他们不得不一起克服挑战，同时挽救他们破裂的关系。', '2021-03-25 16:00:00', ' Hazelight', ' Electronic Arts', '10', 198.00, 0, 0.00, 1, 0, '2021-04-07 07:47:13', '2021-04-08 03:34:03', NULL);
INSERT INTO `st_game` VALUES (8, 'Katana ZERO', '《武士 零（Katana ZERO）》是一款新黑色电影风格的华丽平台动作游戏，以极速动作展开瞬间决定生死的战斗，劈砍、冲刺、操纵时间，在华丽、无情、行云流水般的战斗中发现你的过去。', '2019-04-17 16:00:00', ' Askiisoft', ' Devolver Digital', '1', 50.00, 1, 30.00, 1, 0, '2021-04-07 07:50:11', '2021-04-08 03:34:23', NULL);
INSERT INTO `st_game` VALUES (9, 'Sid Meier’s Civilization® VI', '《文明VI》提供了多种新方式让您与世界互动、在地图上扩张城市、发展文明，以及对抗历史上的伟大领袖，以建立起经得起时间考验的强盛文明。共有20位史上著名的领袖任君挑选，包括秦始皇。', '2016-10-20 16:00:00', ' Firaxis Games, Aspyr (Mac), Aspyr (Linux)', ' 2K, Aspyr (Mac), Aspyr (Linux)', '9', 199.00, 1, 49.00, 1, 0, '2021-04-07 08:12:02', '2021-04-25 05:49:02', 2);

-- ----------------------------
-- Table structure for st_game_img
-- ----------------------------
DROP TABLE IF EXISTS `st_game_img`;
CREATE TABLE `st_game_img`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `path` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  `game_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `game_id`(`game_id`) USING BTREE,
  CONSTRAINT `st_game_img_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `st_game` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '游戏图片信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_game_img
-- ----------------------------
INSERT INTO `st_game_img` VALUES (1, 'upload/1617696497993_903.jpg', '2021-04-06 08:10:37', '2021-04-06 08:10:37', 1);
INSERT INTO `st_game_img` VALUES (2, 'upload/1617696500634_338.jpg', '2021-04-06 08:10:37', '2021-04-06 08:10:37', 1);
INSERT INTO `st_game_img` VALUES (3, 'upload/1617696502553_962.jpg', '2021-04-06 08:10:37', '2021-04-06 08:10:37', 1);
INSERT INTO `st_game_img` VALUES (4, 'upload/1617697182551_413.jpg', '2021-04-06 08:21:32', '2021-04-06 08:21:32', 2);
INSERT INTO `st_game_img` VALUES (5, 'upload/1617697184741_21.jpg', '2021-04-06 08:21:32', '2021-04-06 08:21:32', 2);
INSERT INTO `st_game_img` VALUES (6, 'upload/1617697187017_28.jpg', '2021-04-06 08:21:32', '2021-04-06 08:21:32', 2);
INSERT INTO `st_game_img` VALUES (7, 'upload/1617697820325_512.jpg', '2021-04-06 08:31:54', '2021-04-06 08:31:54', 3);
INSERT INTO `st_game_img` VALUES (8, 'upload/1617697822595_405.jpg', '2021-04-06 08:31:54', '2021-04-06 08:31:54', 3);
INSERT INTO `st_game_img` VALUES (9, 'upload/1617697824164_68.jpg', '2021-04-06 08:31:54', '2021-04-06 08:31:54', 3);
INSERT INTO `st_game_img` VALUES (10, 'upload/1617780059083_53.jpg', '2021-04-07 07:22:38', '2021-04-07 07:22:38', 4);
INSERT INTO `st_game_img` VALUES (11, 'upload/1617780061191_61.jpg', '2021-04-07 07:22:38', '2021-04-07 07:22:38', 4);
INSERT INTO `st_game_img` VALUES (12, 'upload/1617780063005_871.jpg', '2021-04-07 07:22:38', '2021-04-07 07:22:38', 4);
INSERT INTO `st_game_img` VALUES (13, 'upload/1617780261453_340.jpg', '2021-04-07 07:25:36', '2021-04-07 07:25:36', 5);
INSERT INTO `st_game_img` VALUES (14, 'upload/1617780263160_694.jpg', '2021-04-07 07:25:36', '2021-04-07 07:25:36', 5);
INSERT INTO `st_game_img` VALUES (15, 'upload/1617780264923_226.jpg', '2021-04-07 07:25:36', '2021-04-07 07:25:36', 5);
INSERT INTO `st_game_img` VALUES (16, 'upload/1617780538393_158.jpg', '2021-04-07 07:30:26', '2021-04-07 07:30:26', 6);
INSERT INTO `st_game_img` VALUES (17, 'upload/1617780540277_825.jpg', '2021-04-07 07:30:26', '2021-04-07 07:30:26', 6);
INSERT INTO `st_game_img` VALUES (18, 'upload/1617780541806_846.jpg', '2021-04-07 07:30:26', '2021-04-07 07:30:26', 6);
INSERT INTO `st_game_img` VALUES (20, 'upload/1617781534944_587.jpg', '2021-04-07 07:47:13', '2021-04-07 07:47:13', 7);
INSERT INTO `st_game_img` VALUES (21, 'upload/1617781537237_693.jpg', '2021-04-07 07:47:13', '2021-04-07 07:47:13', 7);
INSERT INTO `st_game_img` VALUES (22, 'upload/1617781538932_480.jpg', '2021-04-07 07:47:13', '2021-04-07 07:47:13', 7);
INSERT INTO `st_game_img` VALUES (23, 'upload/1617781703637_314.jpg', '2021-04-07 07:50:11', '2021-04-07 07:50:11', 8);
INSERT INTO `st_game_img` VALUES (24, 'upload/1617781723200_927.jpg', '2021-04-07 07:50:11', '2021-04-07 07:50:11', 8);
INSERT INTO `st_game_img` VALUES (25, 'upload/1617781724797_582.jpg', '2021-04-07 07:50:11', '2021-04-07 07:50:11', 8);
INSERT INTO `st_game_img` VALUES (26, 'upload/1617783026747_430.jpg', '2021-04-07 08:12:02', '2021-04-07 08:12:02', 9);
INSERT INTO `st_game_img` VALUES (27, 'upload/1617783028391_558.jpg', '2021-04-07 08:12:02', '2021-04-07 08:12:02', 9);
INSERT INTO `st_game_img` VALUES (28, 'upload/1617783029891_197.jpg', '2021-04-07 08:12:02', '2021-04-07 08:12:02', 9);

-- ----------------------------
-- Table structure for st_game_type
-- ----------------------------
DROP TABLE IF EXISTS `st_game_type`;
CREATE TABLE `st_game_type`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '游戏分类信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_game_type
-- ----------------------------
INSERT INTO `st_game_type` VALUES (1, '休闲', '2021-04-06 07:50:19', '2021-04-08 03:31:22');
INSERT INTO `st_game_type` VALUES (2, '体育', '2021-04-06 07:50:24', '2021-04-08 03:31:26');
INSERT INTO `st_game_type` VALUES (3, '冒险', '2021-04-08 03:31:30', '2021-04-08 03:31:30');
INSERT INTO `st_game_type` VALUES (4, '动作', '2021-04-08 03:31:34', '2021-04-08 03:31:34');
INSERT INTO `st_game_type` VALUES (5, '大型多人在线', '2021-04-08 03:31:40', '2021-04-08 03:31:40');
INSERT INTO `st_game_type` VALUES (6, '模拟', '2021-04-08 03:31:51', '2021-04-08 03:31:51');
INSERT INTO `st_game_type` VALUES (7, '独立', '2021-04-08 03:31:54', '2021-04-08 03:31:54');
INSERT INTO `st_game_type` VALUES (8, '竞速', '2021-04-08 03:32:03', '2021-04-08 03:32:03');
INSERT INTO `st_game_type` VALUES (9, '策略', '2021-04-08 03:32:10', '2021-04-08 03:32:10');
INSERT INTO `st_game_type` VALUES (10, '角色扮演', '2021-04-08 03:32:28', '2021-04-08 03:32:28');

-- ----------------------------
-- Table structure for st_order
-- ----------------------------
DROP TABLE IF EXISTS `st_order`;
CREATE TABLE `st_order`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_no` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `user_id` int NULL DEFAULT NULL,
  `game_id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `num` int NULL DEFAULT NULL,
  `money` decimal(10, 2) NULL DEFAULT NULL,
  `is_finished` tinyint(1) NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '购物车' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_order
-- ----------------------------
INSERT INTO `st_order` VALUES (1, '1618628118375982', 2, '6,1,2', 3, 240.00, 1, '2021-04-17 02:55:18', '2021-04-25 05:49:08');
INSERT INTO `st_order` VALUES (5, '1618630880016802', 2, '4,1,2', 3, 287.00, 1, '2021-04-17 03:41:20', '2021-04-17 03:41:33');
INSERT INTO `st_order` VALUES (7, '1618630972324120', 2, '1', 1, 119.00, 1, '2021-04-17 03:42:52', '2021-04-17 03:42:55');
INSERT INTO `st_order` VALUES (8, '1619080535254330', 1, '9,3,5', 3, 143.00, 1, '2021-04-22 08:35:35', '2021-04-25 05:49:02');
INSERT INTO `st_order` VALUES (9, '1619319040180602', 1, '6', 1, 42.00, 1, '2021-04-24 02:50:40', '2021-04-25 05:49:08');
INSERT INTO `st_order` VALUES (10, '1619320791485841', 1, '4', 1, 89.00, 1, '2021-04-25 03:19:51', '2021-04-25 03:19:51');
INSERT INTO `st_order` VALUES (11, '1619320814795784', 1, '9', 1, 49.00, 1, '2021-04-25 03:20:14', '2021-04-25 03:20:14');

-- ----------------------------
-- Table structure for st_recommend
-- ----------------------------
DROP TABLE IF EXISTS `st_recommend`;
CREATE TABLE `st_recommend`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `game_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `game_id` int NULL DEFAULT NULL,
  `game_img_list` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `game_price` decimal(10, 2) NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '推荐商品' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_recommend
-- ----------------------------
INSERT INTO `st_recommend` VALUES (3, 'Sid Meier’s Civilization® VI', 9, 'upload/1617783026747_430.jpg,upload/1617783028391_558.jpg,upload/1617783029891_197.jpg', 199.00, '2021-04-07 08:16:56', '2021-04-07 08:16:56');
INSERT INTO `st_recommend` VALUES (4, 'Grand Theft Auto V', 1, 'upload/1617696497993_903.jpg,upload/1617696500634_338.jpg,upload/1617696502553_962.jpg', 119.00, '2021-04-07 08:28:45', '2021-04-07 08:28:45');
INSERT INTO `st_recommend` VALUES (7, 'Detroit: Become Human', 4, 'upload/1617780059083_53.jpg,upload/1617780061191_61.jpg,upload/1617780063005_871.jpg', 129.00, '2021-04-07 08:28:54', '2021-04-07 08:28:54');
INSERT INTO `st_recommend` VALUES (9, '双人成行', 7, 'upload/1617781534944_587.jpg,upload/1617781537237_693.jpg,upload/1617781538932_480.jpg', 198.00, '2021-04-08 03:26:31', '2021-04-08 03:26:31');
INSERT INTO `st_recommend` VALUES (10, 'Katana ZERO', 8, 'upload/1617781703637_314.jpg,upload/1617781723200_927.jpg,upload/1617781724797_582.jpg', 50.00, '2021-04-08 03:26:31', '2021-04-08 03:26:31');
INSERT INTO `st_recommend` VALUES (11, 'Tom Clancy\'s Rainbow Six® Siege', 3, 'upload/1617697820325_512.jpg,upload/1617697822595_405.jpg,upload/1617697824164_68.jpg', 88.00, '2021-04-08 03:26:57', '2021-04-08 03:26:57');
INSERT INTO `st_recommend` VALUES (12, 'The Slormancer', 6, 'upload/1617780538393_158.jpg,upload/1617780540277_825.jpg,upload/1617780541806_846.jpg', 50.00, '2021-04-08 03:26:57', '2021-04-08 03:26:57');
INSERT INTO `st_recommend` VALUES (13, 'Spiritfarer®', 5, 'upload/1617780261453_340.jpg,upload/1617780263160_694.jpg,upload/1617780264923_226.jpg', 99.00, '2021-04-08 03:26:57', '2021-04-08 03:26:57');

-- ----------------------------
-- Table structure for st_shopcart
-- ----------------------------
DROP TABLE IF EXISTS `st_shopcart`;
CREATE TABLE `st_shopcart`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NULL DEFAULT NULL,
  `game_ids` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '购物车' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_shopcart
-- ----------------------------

-- ----------------------------
-- Table structure for st_spec_sale
-- ----------------------------
DROP TABLE IF EXISTS `st_spec_sale`;
CREATE TABLE `st_spec_sale`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `game_id` int NULL DEFAULT NULL,
  `game_img` text CHARACTER SET utf8 COLLATE utf8_general_ci NULL,
  `game_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `game_price` decimal(10, 2) NULL DEFAULT NULL,
  `game_sale_price` decimal(10, 2) NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '特别优惠商品' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_spec_sale
-- ----------------------------
INSERT INTO `st_spec_sale` VALUES (1, 2, 'upload/1617697182551_413.jpg,upload/1617697184741_21.jpg,upload/1617697187017_28.jpg', '巫师 3：狂猎', 119.00, 79.00, '2021-04-08 02:26:20', '2021-04-08 02:26:20');
INSERT INTO `st_spec_sale` VALUES (2, 4, 'upload/1617780059083_53.jpg,upload/1617780061191_61.jpg,upload/1617780063005_871.jpg', 'Detroit: Become Human', 129.00, 89.00, '2021-04-08 02:26:30', '2021-04-08 02:26:30');
INSERT INTO `st_spec_sale` VALUES (3, 9, 'upload/1617783026747_430.jpg,upload/1617783028391_558.jpg,upload/1617783029891_197.jpg', 'Sid Meier’s Civilization® VI', 199.00, 49.00, '2021-04-08 02:26:30', '2021-04-08 02:26:30');
INSERT INTO `st_spec_sale` VALUES (4, 3, 'upload/1617697820325_512.jpg,upload/1617697822595_405.jpg,upload/1617697824164_68.jpg', 'Tom Clancy\'s Rainbow Six® Siege', 88.00, 35.00, '2021-04-08 02:26:48', '2021-04-08 02:26:48');
INSERT INTO `st_spec_sale` VALUES (5, 6, 'upload/1617780538393_158.jpg,upload/1617780540277_825.jpg,upload/1617780541806_846.jpg', 'The Slormancer', 50.00, 42.00, '2021-04-08 02:26:48', '2021-04-08 02:26:48');
INSERT INTO `st_spec_sale` VALUES (6, 5, 'upload/1617780261453_340.jpg,upload/1617780263160_694.jpg,upload/1617780264923_226.jpg', 'Spiritfarer®', 99.00, 59.00, '2021-04-08 02:26:48', '2021-04-08 02:26:48');
INSERT INTO `st_spec_sale` VALUES (7, 8, 'upload/1617781703637_314.jpg,upload/1617781723200_927.jpg,upload/1617781724797_582.jpg', 'Katana ZERO', 50.00, 30.00, '2021-04-08 03:27:10', '2021-04-08 03:27:10');

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
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '游戏分类信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_system_requirement
-- ----------------------------
INSERT INTO `st_system_requirement` VALUES (1, 0, ' Windows 8.1 64 位、Windows 8 64 位', ' Intel Core 2 Quad CPU Q6600 @ 2.40GHz (4 个 CPU) / AMD Phenom 9850 Quad-Core 处理器 (4 个 CPU) @ 2.5GHz', 4, 'GB', ' NVIDIA 9800 GT 1GB / AMD HD 4870 1GB (DX 10、10.1、11) 声卡：100% DirectX 10 兼容', 72, 'GB', '2021-04-06 08:10:37', '2021-04-08 03:32:54', 1);
INSERT INTO `st_system_requirement` VALUES (2, 1, 'Windows 8.1 64 位、Windows 8 64 位、Windows 7 64 位 Service Pack 1', 'Intel Core i5 3470 @ 3.2GHZ (4 个 CPU) / AMD X8 FX-8350 @ 4GHZ (8 个 CPU)', 8, 'GB', 'NVIDIA GTX 660 2GB / AMD HD7870 2GB', 72, 'GB', '2021-04-06 08:10:37', '2021-04-08 03:32:54', 1);
INSERT INTO `st_system_requirement` VALUES (3, 0, '64-bit Windows 7, 64-bit Windows 8 (8.1) or 64-bit Windows 10', 'Intel CPU Core i5-2500K 3.3GHz / AMD CPU Phenom II X4 940', 6, 'GB', 'Nvidia GPU GeForce GTX 660 / AMD GPU Radeon HD 7870', 35, 'GB', '2021-04-06 08:21:32', '2021-04-08 03:33:02', 2);
INSERT INTO `st_system_requirement` VALUES (4, 1, ' 64-bit Windows 7, 64-bit Windows 8 (8.1) or 64-bit Windows 10', ' Intel CPU Core i7 3770 3.4 GHz / AMD CPU AMD FX-8350 4 GHz', 8, 'GB', 'Nvidia GPU GeForce GTX 770 / AMD GPU Radeon R9 290', 35, 'GB', '2021-04-06 08:21:32', '2021-04-08 03:33:02', 2);
INSERT INTO `st_system_requirement` VALUES (5, 0, 'Windows 7, Windows 8.1, Windows 10 (64bit versions required)', ' Intel Core i3 560 @ 3.3 GHz or AMD Phenom II X4 945 @ 3.0 GHz', 6, 'GB', 'NVIDIA GeForce GTX 460 or AMD Radeon HD 5870 (DirectX-11 compliant with 1GB of VRAM)', 61, 'GB', '2021-04-06 08:31:54', '2021-04-08 03:33:09', 3);
INSERT INTO `st_system_requirement` VALUES (6, 1, 'Windows 7 SP1, Windows 8.1, Windows 10 (64bit versions required)', 'Intel Core i5-2500K @ 3.3 GHz or better or AMD FX-8120 @ 3.1 Ghz or better', 8, 'GB', 'NVIDIA GeForce GTX 670 (or GTX 760 / GTX 960) or AMD Radeon HD 7970 (or R9 280x [2GB VRAM] / R9 380 / Fury X)', 61, 'GB', '2021-04-06 08:31:54', '2021-04-08 03:33:09', 3);
INSERT INTO `st_system_requirement` VALUES (7, 0, 'Windows 10 (64 bit)', 'Intel Core i5-2300 @ 2.8 GHz or AMD Ryzen 3 1200 @ 3.1GHz or AMD FX-8350 @ 4.2GHz', 8, 'GB', ' Nvidia GeForce GTX 780 or AMD HD 7950 with 3GB VRAM minimum (Support of Vulkan 1.1 required)', 55, 'GB', '2021-04-07 07:22:38', '2021-04-08 03:33:22', 4);
INSERT INTO `st_system_requirement` VALUES (8, 1, 'Windows 10 (64 bit)', 'Intel Core i5-6600 @ 3.3 GHz or AMD Ryzen 3 1300 X @ 3.4 GHz', 12, 'GB', 'Nvidia GeForce GTX 1060 or AMD Radeon RX 580 with 4GB VRAM minimum (Support of Vulkan 1.1 required)', 55, 'GB', '2021-04-07 07:22:38', '2021-04-08 03:33:22', 4);
INSERT INTO `st_system_requirement` VALUES (9, 0, ' Microsoft® Windows® 7 SP1', ' Dual Core 3.0 GHz Processor', 4, 'GB', ' DirectX 10-compatible graphics card with at least 1GB of video memory', 7, 'GB', '2021-04-07 07:25:36', '2021-04-08 03:33:30', 5);
INSERT INTO `st_system_requirement` VALUES (10, 1, ' Microsoft® Windows® 7 SP1', ' Dual Core 3.0 GHz Processor', 4, 'GB', ' DirectX 10-compatible graphics card with at least 1GB of video memory', 7, 'GB', '2021-04-07 07:25:36', '2021-04-08 03:33:30', 5);
INSERT INTO `st_system_requirement` VALUES (11, 0, 'Windows 7 and Above', 'Dual-Core 1.8 GHZ or equivalent', 4, 'GB', '512MB', 450, 'MB', '2021-04-07 07:30:26', '2021-04-08 03:33:52', 6);
INSERT INTO `st_system_requirement` VALUES (12, 1, 'Windows 7 and Above', 'Dual-Core 2.4 GHZ or equivalent', 8, 'GB', '1GB', 450, 'MB', '2021-04-07 07:30:26', '2021-04-08 03:33:52', 6);
INSERT INTO `st_system_requirement` VALUES (13, 0, ' Windows 8.1 64-bit or Windows 10 64-bit', ' Intel Core i3-2100T or AMD FX 6100', 8, 'GB', 'Nvidia GeForce GTX 660 or AMD R7 260x', 60, 'GB', '2021-04-07 07:47:13', '2021-04-08 03:34:03', 7);
INSERT INTO `st_system_requirement` VALUES (14, 1, ' Windows 8.1 64-bit or Windows 10 64-bit', ' Intel Core i5 3570K or AMD Ryzen 3 1300x', 16, 'GB', 'Nvidia GeForce GTX 980 or AMD R9 290', 60, 'GB', '2021-04-07 07:47:13', '2021-04-08 03:34:03', 7);
INSERT INTO `st_system_requirement` VALUES (15, 0, 'Windows 7, 8, 8.1, 10 x64', 'Intel Pentium E2180 (2 * 2000) or equivalent', 1, 'GB', ' GeForce 7600 GT (256 MB)', 200, 'MB', '2021-04-07 07:50:11', '2021-04-08 03:34:23', 8);
INSERT INTO `st_system_requirement` VALUES (16, 1, ' Windows 7, 8, 8.1, 10 x64', 'Intel Core i3-3240 (2 * 3400) or equivalent', 2, 'GB', ' GeForce 8800 GTS (512 MB)', 200, 'MB', '2021-04-07 07:50:11', '2021-04-08 03:34:23', 8);
INSERT INTO `st_system_requirement` VALUES (17, 0, ' Windows 7x64 / Windows 8.1x64 / Windows 10x64', 'Intel Core i3 2.5 Ghz or AMD Phenom II 2.6 Ghz or greater', 4, 'GB', ' 1 GB & AMD 5570 or nVidia 450 or Intel Integrated Graphics 530', 12, 'GB', '2021-04-07 08:12:02', '2021-04-08 03:34:33', 9);
INSERT INTO `st_system_requirement` VALUES (18, 1, ' Windows 7x64 / Windows 8.1x64 / Windows 10x64', 'Fourth Generation Intel Core i5 2.5 Ghz or AMD FX8350 4.0 Ghz or greater', 8, 'GB', ' 2GB & AMD 7970 or nVidia 770 or greater', 12, 'GB', '2021-04-07 08:12:02', '2021-04-08 03:34:33', 9);

-- ----------------------------
-- Table structure for st_user
-- ----------------------------
DROP TABLE IF EXISTS `st_user`;
CREATE TABLE `st_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `email` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `description` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `create_time` datetime(0) NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `created_at` datetime(0) NOT NULL,
  `updated_at` datetime(0) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8 COLLATE = utf8_general_ci COMMENT = '用户登录信息' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of st_user
-- ----------------------------
INSERT INTO `st_user` VALUES (1, 'user', '123123', '4009696577', '724666079@qq.com', '123123123', NULL, 'upload/1619312426622_774.jpg', '2021-04-11 08:45:43', '2021-04-25 02:38:03');
INSERT INTO `st_user` VALUES (2, 'user1', '111111', NULL, '1211212@ee.com', NULL, NULL, 'upload/1619312426622_774.jpg', '2021-04-23 17:03:27', '2021-04-16 07:03:27');

SET FOREIGN_KEY_CHECKS = 1;
