package com.sjd.luckyou.repository;

import com.sjd.luckyou.entity.Tarot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TarotRepository extends JpaRepository<Tarot, Long> {
    List<Tarot> findAllByUserIdAndCreatedAtBetweenOrderByCreatedAtDesc(UUID userId, ZonedDateTime startOfDay, ZonedDateTime endOfDay);

    Optional<Tarot> findBySlug(String slug);
}
