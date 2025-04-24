package com.sjd.luckyou.dto.tarot;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class TarotResultRequest {
    private String topic;
    private String question;

    private List<TarotCardInfo> selectedCards;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TarotCardInfo {
        private String meaning;
        private String name;
    }
}
