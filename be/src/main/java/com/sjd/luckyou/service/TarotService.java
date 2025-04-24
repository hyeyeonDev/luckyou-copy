package com.sjd.luckyou.service;

import com.sjd.luckyou.dto.tarot.TarotResultRequest;
import com.sjd.luckyou.dto.tarot.TarotResultResponse;
import com.sjd.luckyou.entity.Tarot;
import com.sjd.luckyou.repository.TarotRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TarotService {

    private final ModelMapper modelMapper;
    private final TarotRepository tarotRepository;

    @Transactional
    public TarotResultResponse saveTarot(UUID userId, TarotResultRequest tarotResultRequest, String interpretation) {
        String topic = tarotResultRequest.getTopic();
        String question = tarotResultRequest.getQuestion();
        String cardNames = joinCardNames(tarotResultRequest);

        String slug = generateSlug();

        Tarot newTarot = Tarot.builder()
                .userId(userId)
                .question(topic == null ? question : topic)
                .selectedCards(cardNames)
                .interpretation(interpretation)
                .slug(slug)
                .build();

        Tarot savedTarot = tarotRepository.save(newTarot);
        return modelMapper.map(savedTarot, TarotResultResponse.class);
    }

    public List<TarotResultResponse> findTarotResults(UUID userId) {
        ZonedDateTime now = ZonedDateTime.now();
        ZonedDateTime startOfDay = now.minusDays(1);
        List<Tarot> histories = tarotRepository.findAllByUserIdAndCreatedAtBetweenOrderByCreatedAtDesc(userId, startOfDay, now);
        return histories.stream().map(history -> modelMapper.map(history, TarotResultResponse.class)).collect(Collectors.toList());
    }

    @Transactional
    public void deleteTarot(Long id) {
        tarotRepository.deleteById(id);
    }

    public TarotResultResponse getTarotResultBySlug(String slug) {
        return tarotRepository.findBySlug(slug)
                .map(tarot -> modelMapper.map(tarot, TarotResultResponse.class))
                .orElse(null);
    }

    private String generateSlug() {
        return UUID.randomUUID().toString(); // 고유한 slug 생성
    }

    private String joinCardNames(TarotResultRequest request) {
        if (request.getSelectedCards() == null || request.getSelectedCards().isEmpty()) {
            throw new IllegalArgumentException("Selected cards cannot be null or empty");
        }
        return request.getSelectedCards().stream()
                .map(TarotResultRequest.TarotCardInfo::getName)
                .collect(Collectors.joining(", "));
    }

    public StringBuilder tarotPrompt(TarotResultRequest tarotResultRequest) {
        StringBuilder prompt = new StringBuilder();
        prompt.append(String.format("사용자 질문: %s\n", tarotResultRequest.getQuestion()));
        prompt.append("선택된 카드:\n");
        int index = 1;
        for (TarotResultRequest.TarotCardInfo card : tarotResultRequest.getSelectedCards()) {
            prompt.append(String.format("%d. %s - %s\n", index++, card.getMeaning(), card.getName()));
        }
        prompt.append("이 정보를 바탕으로 오늘의 운세를 해석해 주세요.");

        return prompt;
    }

}
