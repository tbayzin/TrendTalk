package com.zoloti.trend_talk.repos;

import com.zoloti.trend_talk.domain.Topic;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface TopicRepository extends MongoRepository<Topic, Long> {

    boolean existsByTopicNameIgnoreCase(String topicName);

}
