CREATE TABLE
  `users` (
    `id` CHAR(36) PRIMARY KEY NOT NULL,
    `username` VARCHAR(50) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `avatar` VARCHAR(100) DEFAULT '/images/avatars/01.jpg',
    `password` VARCHAR(255) NOT NULL,
    `gender` ENUM ('male', 'female', 'other') DEFAULT 'other',
    `role` ENUM ('member', 'admin') DEFAULT 'member',
    `status` ENUM ('active', 'banned') DEFAULT 'active',
    `type_account` ENUM ('credentials', 'google') DEFAULT 'credentials',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
  );

CREATE TABLE
  `notification` (
    `id` CHAR(36) PRIMARY KEY NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `message` TEXT NOT NULL,
    `type` ENUM ('community', 'individual') NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
  );

CREATE TABLE
  `user_report` (
    `id` CHAR(36) PRIMARY KEY NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `movie_slug` VARCHAR(255) NOT NULL,
    `movie_name` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
  );

CREATE TABLE
  `search_history` (
    `id` CHAR(36) PRIMARY KEY NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `keyword` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
  );

CREATE TABLE
  `feedbacks` (
    `id` CHAR(36) PRIMARY KEY NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `movie_slug` VARCHAR(255) NOT NULL,
    `parent_id` CHAR(36) DEFAULT NULL,
    `content` TEXT NULL,
    `is_spam` TINYINT (1) DEFAULT 0,
    `type` ENUM ('comment', 'review') NOT NULL,
    `point` INT DEFAULT NULL CHECK (`point` BETWEEN 1 AND 10),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`parent_id`) REFERENCES `feedbacks` (`id`) ON DELETE CASCADE
  );

CREATE TABLE
  `feedback_vote` (
    `id` CHAR(36) PRIMARY KEY NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `feedback_id` CHAR(36) NOT NULL,
    `movie_slug` VARCHAR(255) NOT NULL,
    `type` ENUM ('like', 'dislike') NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`feedback_id`) REFERENCES `feedbacks` (`id`) ON DELETE CASCADE,
    UNIQUE (`user_id`, `feedback_id`)
  );

CREATE TABLE
  `playlists` (
    `id` CHAR(36) PRIMARY KEY NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
  );

CREATE TABLE
  `user_movies` (
    `id` CHAR(36) PRIMARY KEY NOT NULL,
    `user_id` CHAR(36) NOT NULL,
    `movie_slug` VARCHAR(255) NOT NULL,
    `movie_name` VARCHAR(255) NOT NULL,
    `movie_poster` VARCHAR(255) NOT NULL,
    `movie_thumbnail` VARCHAR(255) NOT NULL,
    `type` ENUM ('history', 'favorite', 'playlist') NOT NULL,
    `playlist_id` CHAR(36) DEFAULT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    FOREIGN KEY (`playlist_id`) REFERENCES `playlists` (`id`) ON DELETE CASCADE
  );