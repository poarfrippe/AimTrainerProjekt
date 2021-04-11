-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 11. Apr 2021 um 22:28
-- Server-Version: 10.4.18-MariaDB
-- PHP-Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `aimtrainer`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `benutzer`
--

CREATE TABLE `benutzer` (
  `email` varchar(100) NOT NULL,
  `username` varchar(100) NOT NULL,
  `passwort` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `benutzer`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `classic`
--

CREATE TABLE `classic` (
  `versuch` int(11) NOT NULL,
  `anschlaege` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `anschlaegeProSekunde` decimal(4,2) DEFAULT NULL,
  `trefferquote` decimal(5,2) DEFAULT NULL,
  `spielid` int(11) DEFAULT NULL,
  `zeit` time(3) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `classic`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `flick`
--

CREATE TABLE `flick` (
  `versuch` int(11) NOT NULL,
  `anschlaege` int(11) DEFAULT NULL,
  `score` int(11) DEFAULT NULL,
  `anschlaegeProSekunde` decimal(4,2) DEFAULT NULL,
  `trefferquote` decimal(5,2) DEFAULT NULL,
  `spielid` int(11) DEFAULT NULL,
  `zeit` time(3) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Daten für Tabelle `flick`
--

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `benutzer`
--
ALTER TABLE `benutzer`
  ADD PRIMARY KEY (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indizes für die Tabelle `classic`
--
ALTER TABLE `classic`
  ADD PRIMARY KEY (`versuch`),
  ADD KEY `username` (`username`);

--
-- Indizes für die Tabelle `flick`
--
ALTER TABLE `flick`
  ADD PRIMARY KEY (`versuch`),
  ADD KEY `username` (`username`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `classic`
--
ALTER TABLE `classic`
  MODIFY `versuch` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT für Tabelle `flick`
--
ALTER TABLE `flick`
  MODIFY `versuch` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints der exportierten Tabellen
--

--
-- Constraints der Tabelle `classic`
--
ALTER TABLE `classic`
  ADD CONSTRAINT `classic_ibfk_1` FOREIGN KEY (`username`) REFERENCES `benutzer` (`username`);

--
-- Constraints der Tabelle `flick`
--
ALTER TABLE `flick`
  ADD CONSTRAINT `flick_ibfk_1` FOREIGN KEY (`username`) REFERENCES `benutzer` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
