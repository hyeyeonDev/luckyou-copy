package com.sjd.luckyou.dto.saju;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class FourPillars {
    private String yearPillar;
    private String monthPillar;
    private String dayPillar;
    private String hourPillar;
}
