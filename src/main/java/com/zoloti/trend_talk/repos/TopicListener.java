package com.zoloti.trend_talk.repos;

import com.zoloti.trend_talk.domain.Topic;
import com.zoloti.trend_talk.service.PrimarySequenceService;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;


@Component
public class TopicListener extends AbstractMongoEventListener<Topic> {

    private final PrimarySequenceService primarySequenceService;

    public TopicListener(final PrimarySequenceService primarySequenceService) {
        this.primarySequenceService = primarySequenceService;
    }

    @Override
    public void onBeforeConvert(final BeforeConvertEvent<Topic> event) {
        if (event.getSource().getId() == null) {
            event.getSource().setId(primarySequenceService.getNextValue());
        }
    }

}
