package com.sjd.luckyou.utils;

import com.sjd.luckyou.dto.saju.SajuElement;
import com.sjd.luckyou.dto.saju.SajuInfoResponse;
import com.sjd.luckyou.dto.saju.SajuResponse;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Map;

@Service
public class SajuCalculator {

    // 천간, 지지 배열
    private static final Map<String, Map<String, String>> CHEONGAN_DATA = Map.ofEntries(
            Map.entry("갑", Map.of("ohaeng", "목", "chinese", "甲", "eumyang", "양")),
            Map.entry("을", Map.of("ohaeng", "목", "chinese", "乙", "eumyang", "음")),
            Map.entry("병", Map.of("ohaeng", "화", "chinese", "丙", "eumyang", "양")),
            Map.entry("정", Map.of("ohaeng", "화", "chinese", "丁", "eumyang", "음")),
            Map.entry("무", Map.of("ohaeng", "토", "chinese", "戊", "eumyang", "양")),
            Map.entry("기", Map.of("ohaeng", "토", "chinese", "己", "eumyang", "음")),
            Map.entry("경", Map.of("ohaeng", "금", "chinese", "庚", "eumyang", "양")),
            Map.entry("신", Map.of("ohaeng", "금", "chinese", "辛", "eumyang", "음")),
            Map.entry("임", Map.of("ohaeng", "수", "chinese", "壬", "eumyang", "양")),
            Map.entry("계", Map.of("ohaeng", "수", "chinese", "癸", "eumyang", "음"))
    );

    private static final Map<String, Map<String, String>> JIJI_DATA = Map.ofEntries(
            Map.entry("자", Map.of("animal", "쥐", "ohaeng", "수", "chinese", "子", "eumyang", "음")),
            Map.entry("축", Map.of("animal", "소", "ohaeng", "토", "chinese", "丑", "eumyang", "음")),
            Map.entry("인", Map.of("animal", "호랑이", "ohaeng", "목", "chinese", "寅", "eumyang", "양")),
            Map.entry("묘", Map.of("animal", "토끼", "ohaeng", "목", "chinese", "卯", "eumyang", "음")),
            Map.entry("진", Map.of("animal", "용", "ohaeng", "토", "chinese", "辰", "eumyang", "양")),
            Map.entry("사", Map.of("animal", "뱀", "ohaeng", "화", "chinese", "巳", "eumyang", "양")),
            Map.entry("오", Map.of("animal", "말", "ohaeng", "화", "chinese", "午", "eumyang", "음")),
            Map.entry("미", Map.of("animal", "양", "ohaeng", "토", "chinese", "未", "eumyang", "음")),
            Map.entry("신", Map.of("animal", "원숭이", "ohaeng", "금", "chinese", "申", "eumyang", "양")),
            Map.entry("유", Map.of("animal", "닭", "ohaeng", "금", "chinese", "酉", "eumyang", "음")),
            Map.entry("술", Map.of("animal", "개", "ohaeng", "토", "chinese", "戌", "eumyang", "양")),
            Map.entry("해", Map.of("animal", "돼지", "ohaeng", "수", "chinese", "亥", "eumyang", "양"))
    );
    private static final String[] CHEONGAN_KEYS = {"갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"};
    private static final String[] JIJI_KEYS = {"자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"};

    // 월 간지 계산용
    private static final String[] MONTH_BRANCHES = {"인", "묘", "진", "사", "오", "미", "신", "유", "술", "해", "자", "축"};

    // 년간 5개 그룹별(갑/기, 을/경, 병/신, 정/임, 무/계),
    // 12개월(1~12)에 해당하는 '월간' 배열
    private static final String[][] MONTH_STEMS_TABLE = {
            {"병", "정", "무", "기", "경", "신", "임", "계", "갑", "을", "병", "정"},
            {"무", "기", "경", "신", "임", "계", "갑", "을", "병", "정", "무", "기"},
            {"경", "신", "임", "계", "갑", "을", "병", "정", "무", "기", "경", "신"},
            {"임", "계", "갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"},
            {"갑", "을", "병", "정", "무", "기", "경", "신", "임", "계", "갑", "을"}
    };

    // -----------------------
    // 일주 계산용 기준일: 1900-01-31 (갑자일)
    // -----------------------
    private static final LocalDate BASE_DATE = LocalDate.of(1900, 1, 31);

    // -----------------------
    // (시주) 일간에 따른 "23시 천간" 출발 인덱스
    // (갑/기=0, 을/경=2, 병/신=4, 정/임=6, 무/계=8)
    // -----------------------
    private static final int[] HOUR_STEM_START_23 = {0, 2, 4, 6, 8};


    private boolean isBeforeIpchun(int year, int month, int day) {
        LocalDate ipchunDate = LocalDate.of(year, 2, 4);
        LocalDate birthDate = LocalDate.of(year, month, day);
        return birthDate.isBefore(ipchunDate);
    }

    // (1) 연주 계산
    private String getGanzhiYear(int year, int month, int day) {
        boolean beforeIpchun = isBeforeIpchun(year, month, day);
        int adjustedYear = beforeIpchun ? year - 1 : year;

        int baseYear = 1924; // 1924년 = 갑자년
        int gap = adjustedYear - baseYear;
        int stemIndex = ((gap % 10) + 10) % 10; // 천간
        int branchIndex = ((gap % 12) + 12) % 12; // 지지

        return CHEONGAN_KEYS[stemIndex] + JIJI_KEYS[branchIndex];
    }

    // (2) 월주 계산
    private String getGanzhiMonth(int year, int month, int day) {
        boolean beforeIpchun = isBeforeIpchun(year, month, day);
        int usedMonth = month - 1;
        int adjustedYear = beforeIpchun ? year - 1 : year;
        if (usedMonth < 0) {
            usedMonth += 12;
            adjustedYear -= 1;
        }

        int gap = adjustedYear - 1984;
        int stemIndex = ((gap % 10) + 10) % 10;
        String yearStem = CHEONGAN_KEYS[stemIndex];

        int stemGroup = switch (yearStem) {
            case "갑", "기" -> 0;
            case "을", "경" -> 1;
            case "병", "신" -> 2;
            case "정", "임" -> 3;
            case "무", "계" -> 4;
            default -> throw new IllegalArgumentException("Invalid yearStem = " + yearStem);
        };

        return MONTH_STEMS_TABLE[stemGroup][usedMonth - 1] + MONTH_BRANCHES[usedMonth - 1];
    }

    // (3) 일주 계산
    private String getGanzhiDay(LocalDateTime dateTime) {
        long days = ChronoUnit.DAYS.between(BASE_DATE, dateTime.toLocalDate());
        int dayIndex = (int) ((days + 40) % 60);
        if (dayIndex < 0) dayIndex += 60;
        return CHEONGAN_KEYS[dayIndex % 10] + JIJI_KEYS[dayIndex % 12];
    }

    // (4) 시주 계산
    private String getGanzhiHour(String dayStem, int hour) {
        int hourBranchIndex = (hour == 23 ? 0 : (hour + 1) / 2) % 12;
        String hourBranch = JIJI_KEYS[hourBranchIndex];
        int dayStemIndex = Arrays.asList(CHEONGAN_KEYS).indexOf(dayStem);
        if (dayStemIndex == -1) {
            System.err.println("일간(천간) 찾기 실패: " + dayStem + ", 기본값 '갑' 사용");
            return CHEONGAN_KEYS[0] + hourBranch;
        }
        int stemAt23 = HOUR_STEM_START_23[dayStemIndex % 5];
        int hourStemIndex = (stemAt23 + hourBranchIndex) % 10;
        return CHEONGAN_KEYS[hourStemIndex] + hourBranch;
    }

    private SajuElement createSajuElement(String gan, String ji) {
        return SajuElement.builder()
                .gan(gan)
                .ji(ji)
                .animal(ji.equals("-") ? "-" : JIJI_DATA.get(ji).get("animal"))
                .ganOhaeng(gan.equals("-") ? "-" : CHEONGAN_DATA.get(gan).get("ohaeng"))
                .ganChinese(gan.equals("-") ? "-" : CHEONGAN_DATA.get(gan).get("chinese"))
                .jiOhaeng(ji.equals("-") ? "-" : JIJI_DATA.get(ji).get("ohaeng"))
                .jiChinese(ji.equals("-") ? "-" : JIJI_DATA.get(ji).get("chinese"))
                .build();
    }

    public SajuResponse calculateSaju(SajuInfoResponse request) {
        if (request.getBirthDate() == null) {
            throw new IllegalArgumentException("birthDate는 필수입니다.");
        }

        LocalDateTime birthDateTime = LocalDateTime.of(request.getBirthDate(),
                request.getBirthTime() != null ? request.getBirthTime() : LocalTime.of(0, 0));
        // 한국 기준 30분 보정
        birthDateTime = birthDateTime.minusMinutes(30);

        int year = birthDateTime.getYear();
        int month = birthDateTime.getMonthValue();
        int day = birthDateTime.getDayOfMonth();
        int hour = birthDateTime.getHour();

        String yearPillar = getGanzhiYear(year, month, day);
        String monthPillar = getGanzhiMonth(year, month, day);
        String dayPillar = getGanzhiDay(birthDateTime);
        String timePillar = request.getBirthTime() != null ? getGanzhiHour(dayPillar.substring(0, 1), hour) : "-";

        return SajuResponse.builder()
                .id(request.getId())
                .year(createSajuElement(yearPillar.substring(0, 1), yearPillar.substring(1)))
                .month(createSajuElement(monthPillar.substring(0, 1), monthPillar.substring(1)))
                .day(createSajuElement(dayPillar.substring(0, 1), dayPillar.substring(1)))
                .time(createSajuElement(timePillar.equals("-") ? "-" : timePillar.substring(0, 1), timePillar.equals("-") ? "-" : timePillar.substring(1)))
                .build();
    }
}
