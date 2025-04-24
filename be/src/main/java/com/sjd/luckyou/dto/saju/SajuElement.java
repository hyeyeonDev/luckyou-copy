package com.sjd.luckyou.dto.saju;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class SajuElement {
    private String gan;
    private String ji;
    private String animal;
    private String ganOhaeng;
    private String ganChinese;
    private String jiOhaeng;
    private String jiChinese;
}
