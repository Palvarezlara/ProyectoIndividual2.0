-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema proyectoindividual
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema proyectoindividual
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `proyectoindividual` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `proyectoindividual` ;

-- -----------------------------------------------------
-- Table `proyectoindividual`.`funcionarias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectoindividual`.`funcionarias` (
  `rut` VARCHAR(20) NOT NULL,
  `nombre` VARCHAR(50) NOT NULL,
  `apellido` VARCHAR(50) NOT NULL,
  `rol` VARCHAR(50) NOT NULL,
  `fechaIngreso` DATE NULL DEFAULT NULL,
  `fechaNaci` DATE NULL DEFAULT NULL,
  `especialidad` VARCHAR(50) NULL DEFAULT NULL,
  `banco` VARCHAR(50) NOT NULL,
  `ncuenta` BIGINT NULL DEFAULT NULL,
  `email` VARCHAR(50) NULL DEFAULT NULL,
  `contrasena` VARCHAR(50) NOT NULL,
  `activo` TINYINT(1) NULL DEFAULT '1',
  PRIMARY KEY (`rut`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proyectoindividual`.`terapias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectoindividual`.`terapias` (
  `idservicios` INT NOT NULL AUTO_INCREMENT,
  `nombreTerapia` VARCHAR(45) CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_0900_ai_ci' NOT NULL,
  `duracion` INT NOT NULL,
  `comision` INT NOT NULL,
  `categoria` VARCHAR(45) NOT NULL,
  `descripcion` VARCHAR(250) NOT NULL,
  PRIMARY KEY (`idservicios`))
ENGINE = InnoDB
AUTO_INCREMENT = 25
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proyectoindividual`.`bd_comisiones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectoindividual`.`bd_comisiones` (
  `Id_comision` INT NOT NULL AUTO_INCREMENT,
  `fecha` DATE NULL DEFAULT NULL,
  `comanda` VARCHAR(10) NULL DEFAULT NULL,
  `rut` VARCHAR(10) NULL DEFAULT NULL,
  `idservicios` INT NULL DEFAULT NULL,
  PRIMARY KEY (`Id_comision`),
  INDEX `rut` (`rut` ASC) VISIBLE,
  INDEX `idservicios` (`idservicios` ASC) VISIBLE,
  CONSTRAINT `bd_comisiones_ibfk_1`
    FOREIGN KEY (`rut`)
    REFERENCES `proyectoindividual`.`funcionarias` (`rut`),
  CONSTRAINT `bd_comisiones_ibfk_2`
    FOREIGN KEY (`idservicios`)
    REFERENCES `proyectoindividual`.`terapias` (`idservicios`))
ENGINE = InnoDB
AUTO_INCREMENT = 24
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `proyectoindividual`.`turno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `proyectoindividual`.`turno` (
  `idturno` INT NOT NULL,
  `horaIngreso` VARCHAR(45) NOT NULL,
  `horaSalida` VARCHAR(45) NOT NULL,
  `fecha` DATE NOT NULL,
  `terapeutas_rut` VARCHAR(45) NOT NULL,
  `funcionarias_rut` VARCHAR(20) NOT NULL,
  PRIMARY KEY (`idturno`, `terapeutas_rut`, `funcionarias_rut`),
  INDEX `fk_turno_terapeutas1_idx` (`terapeutas_rut` ASC) VISIBLE,
  INDEX `fk_turno_funcionarias1_idx` (`funcionarias_rut` ASC) VISIBLE,
  CONSTRAINT `fk_turno_funcionarias1`
    FOREIGN KEY (`funcionarias_rut`)
    REFERENCES `proyectoindividual`.`funcionarias` (`rut`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO funcionarias(rut,nombre,apellido,rol,`fechaIngreso`,`fechaNaci`,especialidad,banco,ncuenta,email,contrasena)
VALUES('22803323-5','Noemí','Cifuentes','terapeuta','2022-11-23','2008-08-23','Masajes','estado',123456,'noe@gmail.com','12345'),
('16233794-7','Pamela','Alvarez','Admin','2012-11-14','1986-04-09','Masajes','estado',123456,'palvarezlara@gmail.com','12345'),
('15078558-8','Isabel','Soto','terapeuta','2013-11-14','1985-08-09','Masajes','estado',123456,'isabel@gmail.com','12345'),
('18227489-5','Juan','Salas','Recepcion','2023-04-07','1992-12-26','Programador','estado',123456,'js@gmail.com','12345'),
('9366541-4','Gladys','Lara','terapeuta','2023-05-01','1962-09-15','Masajes','estado',123456,'gladys@gmail.com','12345');

INSERT INTO terapia(nombre,duracion,comision,categoria,descripcion)
VALUES('Masaje de niños',20,4500,'Terapias','Masaje infantil'),
('Masaje de Relajación',30,4500,'Terapias','Masaje de relajación'),
('Masaje de Relajación',40,7500,'Terapias','Masaje de relajación'),
('Masaje de Relajación',60,8500,'Terapias','Masaje de relajación'),
('Masaje del Bosque',30,7500,'Terapias','Masaje Mixto'),
('Masaje del Bosque',40,9000,'Terapias','Masaje Mixto'),
('Masaje del Bosque',60,10000,'Terapias','Masaje Mixto'),
('Masaje Descontracturante',30,7500,'Terapias','Masaje profundo'),
('Masaje Descontracturante',40,9000,'Terapias','Masaje profundo'),
('Masaje Descontracturante',60,12000,'Terapias','Masaje profundo'),
('Masaje Embarazada',40,9000,'Terapias','Masaje'),
('Reflexologia Podal',40,9000,'Terapias','Masaje'),
('Masaje Aurvedico',50,10000,'Terapias','Masaje'),
('Drenaje Localizado',40,9000,'Terapias','Masaje'),
('Drenaje completo',60,10000,'Terapias','Masaje'),
('Masaje Piedras Calientes',60,12000,'Terapias','Masaje'),
('Exfoliación corporal',30,7500,'Tratamientos','Masaje'),
('Envoltura de Chocolate',50,10000,'Tratamientos','Masaje'),
('Chocolaterapia',90,15000,'Tratamientos','Masaje'),
('Day Use',150,19500,'Tratamientos',"."),
('Renovación',150,12000,"Olivoterapia"),
('Dulce Aventura',150,15000,'Tratamientos',"Chocolaterapia");

INSERT INTO bd_comisiones(fecha,comanda,rut,idservicios)
VALUES	('2023-05-01','25579','16233794-7',5),
	('2023-05-01','25602','16233794-7',24),
	('2023-05-01','25578','16233794-7',18),
	('2023-05-01','23456','16233794-7',20);
