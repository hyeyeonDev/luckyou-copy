package com.sjd.luckyou.dto.tarot;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TarotQuestionRequest {
    private String topic;
    private String question;
}
