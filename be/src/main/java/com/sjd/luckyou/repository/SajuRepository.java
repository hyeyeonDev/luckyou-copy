package com.sjd.luckyou.repository;

import com.sjd.luckyou.entity.Saju;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SajuRepository extends JpaRepository<Saju, Long> {
    List<Saju> findAllByUserIdAndCreatedAtBetweenOrderByCreatedAtDesc(UUID userId, ZonedDateTime startOfDay, ZonedDateTime endOfDay);

    Optional<Saju> findBySlug(String slug);
}
