package com.sjd.luckyou.dto.saju;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

@Data
@AllArgsConstructor
@Builder
@ToString
public class SajuResponse {
    private Long id;
    private SajuElement year;
    private SajuElement month;
    private SajuElement day;
    private SajuElement time;
}
