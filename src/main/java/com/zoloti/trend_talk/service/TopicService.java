package com.zoloti.trend_talk.service;

import com.zoloti.trend_talk.domain.Topic;
import com.zoloti.trend_talk.model.TopicDTO;
import com.zoloti.trend_talk.repos.TopicRepository;
import com.zoloti.trend_talk.util.NotFoundException;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;


@Service
public class TopicService {


    private RedisTemplate<String, String> redisTemplate;
    private final TopicRepository topicRepository;
    private final PrimarySequenceService primarySequenceService;

    public TopicService(final TopicRepository topicRepository,final PrimarySequenceService primarySequenceService,RedisTemplate<String, String> redisTemplate) {
        this.topicRepository = topicRepository;
        this.primarySequenceService = primarySequenceService;
        this.redisTemplate = redisTemplate;
    }

    public List<TopicDTO> findAll() {
        List<TopicDTO> topicDTOs = new ArrayList<>();
        // Not: Tüm guest'leri almak için Redis'te anahtarları taramak gerekir, ancak bu pahalı bir işlem olabilir
        // Örnek olarak, ID'leri biliniyorsa döngüyle alınabilir
        // Gerçek uygulamada, ID listesini ayrı bir Redis setinde tutabilirsiniz
        return topicDTOs; // Şimdilik basit bir liste döndürüyoruz, gerekirse ID'leri tarama eklenebilir
    }

    public TopicDTO get(final Long id) {
        Topic topic = topicRepository.findById(id);
        if (topic == null) {
            throw new NotFoundException();
        }
        return mapToDTO(topic, new TopicDTO());
    }


    public Long create(final TopicDTO topicDTO) {
        final Topic topic = new Topic();
        mapToEntity(topicDTO, topic);
        topicRepository.save(String.valueOf(topic));
        return topic.getId();
    }

    public void update(final Long id, final TopicDTO topicDTO) {
        Topic topic = topicRepository.findById(id);
        if (topic == null) {
            throw new NotFoundException();
        }
        mapToEntity(topicDTO, topic);
        topicRepository.save(String.valueOf(topic));
    }

    private TopicDTO mapToDTO(final Topic topic, final TopicDTO topicDTO) {
        topicDTO.setId(topic.getId());
        return topicDTO;
    }

    private Topic mapToEntity(final TopicDTO topicDTO, final Topic topic) {
        topic.setId(topicDTO.getId());
        return topic;
    }

    public boolean topicNameExistsInRedis(String topicName) {
        Long added = redisTemplate.opsForSet().add("topicNames", topicName);
        if (added == null) {
            throw new IllegalStateException("Redis operation failed");
        }
        if (added == 0) {
            return true;
        }
        return false;
    }

}