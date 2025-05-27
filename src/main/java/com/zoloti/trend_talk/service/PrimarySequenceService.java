package com.zoloti.trend_talk.service;



import com.zoloti.trend_talk.domain.PrimarySequence;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
public class PrimarySequenceService {

    private static final String SEQUENCE_KEY = "sequence:guest";
    private final RedisTemplate<String, Object> redisTemplate;

    public PrimarySequenceService(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public Long getNextValue() {
        return redisTemplate.opsForValue().increment(SEQUENCE_KEY);
    }
}