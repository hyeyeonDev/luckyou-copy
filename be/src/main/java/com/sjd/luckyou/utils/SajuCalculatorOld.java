package com.sjd.luckyou.utils;

import com.sjd.luckyou.dto.saju.FourPillars;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

/**
 * 사주 계산 관련 유틸 / 서비스 클래스
 */
@Service
public class SajuCalculatorOld {

    // -----------------------
    // 천간, 지지 배열
    // -----------------------
    private static final String[] HEAVENLY_STEMS = {
            "갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"
    };
    private static final String[] EARTHLY_BRANCHES = {
            "자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"
    };

    // -----------------------
    // 월 간지 계산용
    // -----------------------
    private static final String[] MONTH_BRANCHES = {
            "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해", "자", "축"
    };

    // 년간 5개 그룹별(갑/기, 을/경, 병/신, 정/임, 무/계),
    // 12개월(1~12)에 해당하는 '월간' 배열
    private static final String[][] MONTH_STEMS_TABLE = {
            // 갑, 기
            {"병", "정", "무", "기", "경", "신", "임", "계", "갑", "을", "병", "정"},
            // 을, 경
            {"무", "기", "경", "신", "임", "계", "갑", "을", "병", "정", "무", "기"},
            // 병, 신
            {"경", "신", "임", "계", "갑", "을", "병", "정", "무", "기", "경", "신"},
            // 정, 임
            {"임", "계", "갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"},
            // 무, 계
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

    private static boolean isBeforeIpchun(int year, int month, int day) {
        LocalDate ipchunDate = LocalDate.of(year, 2, 4);
        LocalDate birthDate = LocalDate.of(year, month, day);
        return birthDate.isBefore(ipchunDate);
    }

    // -------------------------
    // (1) 연주 계산
    // -------------------------
    private static String getGanzhiYear(int year, int month, int day) {
        boolean beforeIpchun = isBeforeIpchun(year, month, day);
        int adjustedYear = beforeIpchun ? year - 1 : year;

        int baseYear = 1924;  // 1924년 = 갑자년
        int gap = adjustedYear - baseYear;
        int stemIndex = (gap % 10 + 10) % 10;    // 천간
        int branchIndex = (gap % 12 + 12) % 12;  // 지지

        return HEAVENLY_STEMS[stemIndex] + EARTHLY_BRANCHES[branchIndex];
    }

    // -------------------------
    // (2) 월주 계산
    // -------------------------
    private static String getGanzhiMonth(int year, int month) {
        // (month - 1) 보정
        int usedMonth = month - 1;
        if (usedMonth < 1) {
            usedMonth += 12;
            year -= 1;
        }

        // 연간(천간) => 5개 그룹 분류
        int gap = year - 1984;
        int stemIndex = (gap % 10 + 10) % 10;
        String yearStem = HEAVENLY_STEMS[stemIndex];

        int stemGroup = switch (yearStem) {
            case "갑", "기" -> 0;
            case "을", "경" -> 1;
            case "병", "신" -> 2;
            case "정", "임" -> 3;
            case "무", "계" -> 4;
            default -> throw new RuntimeException("Invalid yearStem = " + yearStem);
        };

        // usedMonth-1이 인덱스
        String monthStem = MONTH_STEMS_TABLE[stemGroup][usedMonth - 1];
        String monthBranch = MONTH_BRANCHES[usedMonth - 1];

        return monthStem + monthBranch;
    }

    // -------------------------
    // (3) 일주 계산
    // -------------------------
    private static String getGanzhiDay(LocalDateTime dateTime) {
        LocalDate targetDate = dateTime.toLocalDate();
        long daysBetween = ChronoUnit.DAYS.between(BASE_DATE, targetDate);

        // 오프셋(40) 더한 뒤 % 60
        long dayIndex = (daysBetween + 40) % 60;
        if (dayIndex < 0) {
            dayIndex += 60;
        }

        int stemIndex = (int) (dayIndex % 10);
        int branchIndex = (int) (dayIndex % 12);

        return HEAVENLY_STEMS[stemIndex] + EARTHLY_BRANCHES[branchIndex];
    }

    // -------------------------
    // (4) 시주 계산
    // -------------------------
    private static String getGanzhiHour(String dayStem, int hour) {
        // 시지
        int hourBranchIndex = (hour == 23) ? 0 : (hour + 1) / 2;
        hourBranchIndex %= 12;
        String hourBranch = EARTHLY_BRANCHES[hourBranchIndex];

        // 일간 인덱스
        int dayStemIndex = -1;
        for (int i = 0; i < HEAVENLY_STEMS.length; i++) {
            if (HEAVENLY_STEMS[i].equals(dayStem)) {
                dayStemIndex = i;
                break;
            }
        }
        if (dayStemIndex < 0) {
            throw new RuntimeException("일간(천간) 찾기 실패: " + dayStem);
        }

        // 일간 %5 => (0,1,2,3,4) 그룹
        int group5 = dayStemIndex % 5;
        int stemAt23 = HOUR_STEM_START_23[group5];
        int hourStemIndex = (stemAt23 + hourBranchIndex) % 10;

        return HEAVENLY_STEMS[hourStemIndex] + hourBranch;
    }

    /**
     * 사주(년주, 월주, 일주, 시주)를 계산해주는 편의 메서드.
     *
     * @param year        생년 (예: 1998)
     * @param month       생월 (1~12)
     * @param day         생일 (1~31)
     * @param hour        생시 (0~23)
     * @param minute      생분 (0~59)
     * @param adjust30Min true 면 30분 보정 로직 사용
     * @return FourPillars (년주, 월주, 일주, 시주를 담은 DTO)
     */
    public FourPillars calculateFourPillars(int year, int month, int day, int hour, int minute, boolean adjust30Min) {
        System.out.println("생년월일시(양력): " + year + "년 " + month + "월 " + day + "일 " + hour + "시 " + minute + "분");
        LocalDateTime birthDateTime = LocalDateTime.of(year, month, day, hour, minute);

        // 30분 보정
        if (adjust30Min) {
            birthDateTime = birthDateTime.minusMinutes(30);
        }
        System.out.println("▼ 30분 보정 후 : " + birthDateTime);

        int adjustYear = birthDateTime.getYear();
        int adjustMonth = birthDateTime.getMonthValue();
        int adjustDay = birthDateTime.getDayOfMonth();
        int adjustHour = birthDateTime.getHour();

        // (1) 연주
        String yearPillar = getGanzhiYear(adjustYear, adjustMonth, adjustDay);
        // (2) 월주
        String monthPillar = getGanzhiMonth(adjustYear, adjustMonth);
        // (3) 일주
        String dayPillar = getGanzhiDay(birthDateTime);
        // (4) 시주
        String hourPillar = getGanzhiHour(dayPillar.substring(0, 1), adjustHour);

        return new FourPillars(yearPillar, monthPillar, dayPillar, hourPillar);
    }
}