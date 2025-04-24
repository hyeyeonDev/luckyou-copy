package com.sjd.luckyou.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Tarot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private UUID userId;

    @Column(columnDefinition = "TEXT")
    private String question;

    @Column
    private String selectedCards;

    @Column(columnDefinition = "TEXT")
    private String interpretation;

    @Column(unique = true)
    private String slug;

    @Column(nullable = false, updatable = false) // null 불가, 업데이트 불가
    private ZonedDateTime createdAt;

    @Column(nullable = false)
    private Boolean isActive;

    @PrePersist
    protected void onCreate() {
        this.createdAt = ZonedDateTime.now(); // 현재 시간으로 설정
        this.isActive = this.isActive == null || this.isActive; // 기본값으로 true 설정
    }
}
