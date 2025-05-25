package com.zoloti.trend_talk.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class TopicDTO {

    private Long id;

    @NotNull
    @Size(max = 100)
    @TopicTopicNameUnique
    private String topicName;

}
