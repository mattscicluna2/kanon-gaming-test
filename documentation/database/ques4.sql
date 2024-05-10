DROP DATABASE casino_db;

CREATE DATABASE IF NOT EXISTS `casino_db`
USE `casino_db`;

CREATE TABLE IF NOT EXISTS `countries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  `short_code` varchar(5) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `games` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `type_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `thumbnail_url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_games_game_types` (`type_id`),
  CONSTRAINT `FK_games_game_types` FOREIGN KEY (`type_id`) REFERENCES `game_types` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `game_allowed_countries` (
  `game_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  KEY `FK__games` (`game_id`),
  KEY `FK__countries` (`country_id`),
  CONSTRAINT `FK__countries` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK__games` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `game_types` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `players` (
  `id` int(11) NOT NULL AUTO_INCREMENT, 
  `country_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `balance` double NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_players_countries` (`country_id`),
  CONSTRAINT `FK_players_countries` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE IF NOT EXISTS `player_favourite_games` (
  `player_id` int(11) NOT NULL ,
  `game_id` int(11) NOT NULL,
  KEY `FK_player_favourite_games_players` (`player_id`),
  KEY `FK_player_favourite_games_games` (`game_id`),
  CONSTRAINT `FK_player_favourite_games_games` FOREIGN KEY (`game_id`) REFERENCES `games` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_player_favourite_games_players` FOREIGN KEY (`player_id`) REFERENCES `players` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

