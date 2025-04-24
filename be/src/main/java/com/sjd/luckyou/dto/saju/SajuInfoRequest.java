package com.sjd.luckyou.dto.saju;

import com.sjd.luckyou.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SajuInfoRequest {
    private String name;
    private Gender gender;
    private LocalDate birthDate;
    private LocalTime birthTime;
}
