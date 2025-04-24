package com.sjd.luckyou.dto.tarot;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TarotResultResponse {
    private Long id;
    private String question;
    private String selectedCards;
    private String interpretation;
    private String slug;
    private ZonedDateTime createdAt;
}
