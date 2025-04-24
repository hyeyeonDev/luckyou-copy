package com.sjd.luckyou.entity;

import com.sjd.luckyou.enums.Gender;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(uniqueConstraints = {
        @UniqueConstraint(
                name = "uk_userId_name",
                columnNames = {"userId"}
//                columnNames = {"userId", "name"}
        )
})
public class SajuInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private UUID userId;

    @Column
    private String name;

    @Column
    private LocalDate birthDate;

    @Column
    private LocalTime birthTime;

    @Enumerated(EnumType.STRING)
    @Column
    private Gender gender;

    @Column(nullable = false, updatable = false) // null 불가, 업데이트 불가
    private ZonedDateTime createdAt;

    @Column // null 불가, 업데이트 불가
    private ZonedDateTime updatedAt;

    @Column(nullable = false)
    private Boolean isActive;

    @PrePersist
    protected void onCreate() {
        this.createdAt = ZonedDateTime.now(); // 현재 시간으로 설정
        this.isActive = this.isActive == null || this.isActive; // 기본값으로 true 설정
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = ZonedDateTime.now(); // 업데이트 시 현재 시간
    }
}
