SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `myblog` DEFAULT CHARACTER SET utf8 ;
USE `myblog` ;

-- -----------------------------------------------------
-- Table `myblog`.`actors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myblog`.`actors` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NULL DEFAULT NULL,
  `last_name` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `myblog`.`genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myblog`.`genres` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 59
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `myblog`.`video`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myblog`.`video` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(250) NOT NULL,
  `year` INT(11) NULL DEFAULT NULL,
  `coutry` VARCHAR(250) NULL DEFAULT NULL,
  `director` VARCHAR(250) NULL DEFAULT NULL,
  `image` VARCHAR(250) NULL DEFAULT NULL,
  `imdb` DOUBLE NULL DEFAULT NULL,
  `kinopoisk` DOUBLE NULL DEFAULT NULL,
  `description` TEXT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `myblog`.`video_has_actors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myblog`.`video_has_actors` (
  `video_id` INT(11) NOT NULL,
  `actors_id` INT(11) NOT NULL,
  PRIMARY KEY (`video_id`, `actors_id`),
  INDEX `fk_video_has_actors_actors1_idx` (`actors_id` ASC),
  INDEX `fk_video_has_actors_video1_idx` (`video_id` ASC),
  CONSTRAINT `fk_video_has_actors_actors1`
    FOREIGN KEY (`actors_id`)
    REFERENCES `myblog`.`actors` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_video_has_actors_video1`
    FOREIGN KEY (`video_id`)
    REFERENCES `myblog`.`video` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `myblog`.`video_has_genres`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myblog`.`video_has_genres` (
  `video_id` INT(11) NOT NULL,
  `genres_id` INT(11) NOT NULL,
  PRIMARY KEY (`video_id`, `genres_id`),
  INDEX `fk_video_has_genres_genres1_idx` (`genres_id` ASC),
  INDEX `fk_video_has_genres_video_idx` (`video_id` ASC),
  CONSTRAINT `fk_video_has_genres_genres1`
    FOREIGN KEY (`genres_id`)
    REFERENCES `myblog`.`genres` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_video_has_genres_video`
    FOREIGN KEY (`video_id`)
    REFERENCES `myblog`.`video` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `myblog`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myblog`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(45) NOT NULL,
  `first_name` VARCHAR(100) NULL,
  `last_name` VARCHAR(100) NULL,
  `password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myblog`.`articles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myblog`.`articles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `created` DATETIME NOT NULL,
  `modified` DATETIME NOT NULL,
  `text` TEXT NULL,
  `short` TEXT NULL,
  `created_by` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_articles_users1_idx` (`created_by` ASC),
  CONSTRAINT `fk_articles_users1`
    FOREIGN KEY (`created_by`)
    REFERENCES `myblog`.`users` (`id`)
    ON DELETE RESTRICT
    ON UPDATE RESTRICT)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci
COMMENT = 'Blog articles\n';


-- -----------------------------------------------------
-- Table `myblog`.`roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myblog`.`roles` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
COMMENT = 'User roles';


-- -----------------------------------------------------
-- Table `myblog`.`users_has_roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myblog`.`users_has_roles` (
  `users_id` INT NOT NULL,
  `roles_id` INT NOT NULL,
  PRIMARY KEY (`users_id`, `roles_id`),
  INDEX `fk_users_has_roles_roles1_idx` (`roles_id` ASC),
  INDEX `fk_users_has_roles_users1_idx` (`users_id` ASC),
  CONSTRAINT `fk_users_has_roles_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `myblog`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_roles_roles1`
    FOREIGN KEY (`roles_id`)
    REFERENCES `myblog`.`roles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myblog`.`tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myblog`.`tags` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `myblog`.`articles_has_tags`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `myblog`.`articles_has_tags` (
  `articles_id` INT NOT NULL,
  `tags_id` INT NOT NULL,
  PRIMARY KEY (`articles_id`, `tags_id`),
  INDEX `fk_articles_has_tags_tags1_idx` (`tags_id` ASC),
  INDEX `fk_articles_has_tags_articles1_idx` (`articles_id` ASC),
  CONSTRAINT `fk_articles_has_tags_articles1`
    FOREIGN KEY (`articles_id`)
    REFERENCES `myblog`.`articles` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_articles_has_tags_tags1`
    FOREIGN KEY (`tags_id`)
    REFERENCES `myblog`.`tags` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
COLLATE = utf8_general_ci;

USE `myblog` ;

-- -----------------------------------------------------
-- procedure mb_insert_genre
-- -----------------------------------------------------

DELIMITER $$
USE `myblog`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `mb_insert_genre`(
    IN genre_title VARCHAR(45),
    OUT genre_id INT
)
BEGIN
    INSERT INTO genres(title) VALUES(genre_title);
    SET genre_id = LAST_INSERT_ID();
END$$

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


LOCK TABLES `genres` WRITE;
/*!40000 ALTER TABLE `genres` DISABLE KEYS */;
INSERT INTO `genres` VALUES (35,'Комедия'),(37,'Аниме'),(38,'Боевик'),(39,'Биография'),(40,'Вестерн'),(41,'Документальный'),(43,'Исторический'),(44,'Драмма'),(45,'Короткометражный'),(46,'Криминал'),(47,'Мультфильм'),(49,'Приключения'),(50,'Спорт'),(51,'Мелодрамма'),(52,'Триллер'),(53,'Ужас'),(55,'Фантастика'),(56,'Фэнтези'),(57,'Сериал'),(58,'Пародия');
/*!40000 ALTER TABLE `genres` ENABLE KEYS */;
UNLOCK TABLES;