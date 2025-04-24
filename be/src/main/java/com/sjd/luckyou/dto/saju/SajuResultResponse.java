package com.sjd.luckyou.dto.saju;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SajuResultResponse {
    private Long id;
    private String question;
    private String interpretation;
    private String slug;
    private ZonedDateTime createdAt;
}
