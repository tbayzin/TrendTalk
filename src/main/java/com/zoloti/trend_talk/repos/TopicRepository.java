package com.zoloti.trend_talk.repos;

import com.zoloti.trend_talk.domain.Guest;
import com.zoloti.trend_talk.domain.Topic;



import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class TopicRepository {
    private static final String TOPIC_KEY_PREFIX = "topic:";
    private final RedisTemplate<String, Object> redisTemplate;

    public TopicRepository(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void save(String topicName) {
        String key = TOPIC_KEY_PREFIX + topicName.toLowerCase();
        redisTemplate.opsForValue().set(key, topicName);
    }

    // Guest bulma
    public Topic findById(Long id) {
        String key = TOPIC_KEY_PREFIX + id;
        return (Topic) redisTemplate.opsForValue().get(key);
    }

    public boolean existsById(Long id) {
        String key = TOPIC_KEY_PREFIX + id;
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }


    public boolean existsByTopicNameIgnoreCase(String topicName) {
        String key = TOPIC_KEY_PREFIX + topicName.toLowerCase();
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    public void deleteById(Long id) {
        String key = TOPIC_KEY_PREFIX + id;
        redisTemplate.delete(key);
    }

}
