package com.sjd.luckyou.service;

import com.sjd.luckyou.dto.saju.*;
import com.sjd.luckyou.entity.Saju;
import com.sjd.luckyou.entity.SajuInfo;
import com.sjd.luckyou.repository.SajuInfoRepository;
import com.sjd.luckyou.repository.SajuRepository;
import com.sjd.luckyou.utils.SajuCalculator;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SajuService {

    private final ModelMapper modelMapper;
    private final SajuCalculator sajuCalculator;
    private final SajuRepository sajuRepository;
    private final SajuInfoRepository sajuInfoRepository;

    public SajuInfoResponse getSajuInfo(UUID userId) {
        SajuInfo sajuInfo = sajuInfoRepository.findByUserId(userId).orElse(new SajuInfo());
        return modelMapper.map(sajuInfo, SajuInfoResponse.class);
    }

    @Transactional
    public SajuInfoResponse saveSajuInfo(UUID userId, SajuInfoRequest sajuInfoRequest) {
        SajuInfo sajuInfo = sajuInfoRepository.findByUserId(userId)
                .map(existingSajuInfo -> {
                    existingSajuInfo.setName(sajuInfoRequest.getName());
                    existingSajuInfo.setBirthDate(sajuInfoRequest.getBirthDate());
                    existingSajuInfo.setBirthTime(sajuInfoRequest.getBirthTime());
                    existingSajuInfo.setGender(sajuInfoRequest.getGender());
                    return existingSajuInfo;
                })
                .orElseGet(() -> SajuInfo.builder()
                        .userId(userId)
                        .name(sajuInfoRequest.getName())
                        .birthDate(sajuInfoRequest.getBirthDate())
                        .birthTime(sajuInfoRequest.getBirthTime())
                        .gender(sajuInfoRequest.getGender())
                        .build()
                );


        SajuInfo savedSajuInfo = sajuInfoRepository.save(sajuInfo);
        return modelMapper.map(savedSajuInfo, SajuInfoResponse.class);
    }


    public SajuResponse getSaju(UUID userId) {
        return sajuInfoRepository.findByUserId(userId)
                .map(saJuInfo -> {
                    SajuInfoResponse response = modelMapper.map(saJuInfo, SajuInfoResponse.class);
                    response.setId(saJuInfo.getId());
                    return sajuCalculator.calculateSaju(response);
                })
                .orElse(null);
    }

    @Transactional
    public SajuResultResponse saveSaju(UUID userId, SajuResultRequest sajuResultRequest, String interpretation) {
        String topic = sajuResultRequest.getTopic();
        String question = sajuResultRequest.getQuestion();

        String slug = generateSlug();

        Saju newSaju = Saju.builder()
                .userId(userId)
                .question(topic == null ? question : topic)
                .interpretation(interpretation)
                .slug(slug)
                .build();

        Saju savedSaju = sajuRepository.save(newSaju);
        return modelMapper.map(savedSaju, SajuResultResponse.class);
    }

    public List<SajuResultResponse> findSajuResults(UUID userId) {
        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime startOfDay = now.minusDays(1);
        List<Saju> histories = sajuRepository.findAllByUserIdAndCreatedAtBetweenOrderByCreatedAtDesc(userId, startOfDay, now);
        return histories.stream().map(history -> modelMapper.map(history, SajuResultResponse.class)).collect(Collectors.toList());
    }

    public SajuResultResponse getSajuResultBySlug(String slug) {
        return sajuRepository.findBySlug(slug)
                .map(saju -> modelMapper.map(saju, SajuResultResponse.class))
                .orElse(null);
    }

    private String generateSlug() {
        return UUID.randomUUID().toString(); // 고유한 slug 생성
    }

    @Transactional
    public void deleteSaju(Long id) {
        sajuRepository.deleteById(id);
    }

    public StringBuilder sajuPrompt(SajuResultRequest sajuResultRequest, UUID userId) {
        SajuInfoResponse sajuInfo = getSajuInfo(userId);
        SajuResponse saju = getSaju(userId);

        StringBuilder prompt = new StringBuilder();
        prompt.append(String.format("사용자 질문: %s\n", sajuResultRequest.getQuestion()));
        prompt.append("사주정보:\n");
        prompt.append(String.format("- 이름: %s\n", sajuInfo.getName()));
        prompt.append(String.format("- 태어난 날짜: %s\n", sajuInfo.getBirthDate()));
        prompt.append(String.format("- 태어난 시간: %s\n", sajuInfo.getBirthTime()));

        prompt.append("만세력:\n");
        SajuElement year = saju.getYear();
        prompt.append(String.format("- 년주: %s(%s) %s(%s), 오행: %s %s\n", year.getGan(), year.getGanChinese(), year.getJi(), year.getJiChinese(), year.getGanOhaeng(), year.getJiOhaeng()));
        SajuElement month = saju.getMonth();
        prompt.append(String.format("- 월주: %s(%s) %s(%s), 오행: %s %s\n", month.getGan(), month.getGanChinese(), month.getJi(), month.getJiChinese(), month.getGanOhaeng(), month.getJiOhaeng()));
        SajuElement day = saju.getDay();
        prompt.append(String.format("- 일주: %s(%s) %s(%s), 오행: %s %s\n", day.getGan(), day.getGanChinese(), day.getJi(), day.getJiChinese(), day.getGanOhaeng(), day.getJiOhaeng()));
        SajuElement time = saju.getTime();
        prompt.append(String.format("- 시주: %s(%s) %s(%s), 오행: %s %s\n", time.getGan(), time.getGanChinese(), time.getJi(), time.getJiChinese(), time.getGanOhaeng(), time.getJiOhaeng()));
        prompt.append("이 정보를 바탕으로 사주팔자를 해석해 주세요.");

        return prompt;
    }

}
