package com.sjd.luckyou.repository;

import com.sjd.luckyou.entity.SajuInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface SajuInfoRepository extends JpaRepository<SajuInfo, Long> {
    Optional<SajuInfo> findByUserId(UUID userId);
}
