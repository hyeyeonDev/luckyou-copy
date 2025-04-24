package com.sjd.luckyou.dto.tarot;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TarotCard {
    private int id;
    private String type;
    private String name;
    private boolean isFlipped;
    private String image;
}
