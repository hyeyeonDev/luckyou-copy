package com.sjd.luckyou.dto.tarot;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TarotQuestionResponse {
    private String question;
    private List<String> cardMeanings;
}
