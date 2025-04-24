package com.sjd.luckyou.dto.saju;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SajuResultRequest {
    private String topic;
    private String question;
}
