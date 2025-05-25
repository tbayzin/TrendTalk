package com.zoloti.trend_talk.service;

import com.zoloti.trend_talk.domain.Topic;
import com.zoloti.trend_talk.model.TopicDTO;
import com.zoloti.trend_talk.repos.TopicRepository;
import com.zoloti.trend_talk.util.NotFoundException;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class TopicService {

    private final TopicRepository topicRepository;

    public TopicService(final TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public List<TopicDTO> findAll() {
        final List<Topic> topics = topicRepository.findAll(Sort.by("id"));
        return topics.stream()
                .map(topic -> mapToDTO(topic, new TopicDTO()))
                .toList();
    }

    public TopicDTO get(final Long id) {
        return topicRepository.findById(id)
                .map(topic -> mapToDTO(topic, new TopicDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final TopicDTO topicDTO) {
        final Topic topic = new Topic();
        mapToEntity(topicDTO, topic);
        return topicRepository.save(topic).getId();
    }

    public void update(final Long id, final TopicDTO topicDTO) {
        final Topic topic = topicRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(topicDTO, topic);
        topicRepository.save(topic);
    }

    public void delete(final Long id) {
        topicRepository.deleteById(id);
    }

    private TopicDTO mapToDTO(final Topic topic, final TopicDTO topicDTO) {
        topicDTO.setId(topic.getId());
        topicDTO.setTopicName(topic.getTopicName());
        return topicDTO;
    }

    private Topic mapToEntity(final TopicDTO topicDTO, final Topic topic) {
        topic.setTopicName(topicDTO.getTopicName());
        return topic;
    }

    public boolean topicNameExists(final String topicName) {
        return topicRepository.existsByTopicNameIgnoreCase(topicName);
    }

}
