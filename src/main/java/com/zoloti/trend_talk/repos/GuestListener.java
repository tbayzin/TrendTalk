package com.zoloti.trend_talk.repos;

import com.zoloti.trend_talk.domain.Guest;
import com.zoloti.trend_talk.service.PrimarySequenceService;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;


@Component
public class GuestListener extends AbstractMongoEventListener<Guest> {

    private final PrimarySequenceService primarySequenceService;

    public GuestListener(final PrimarySequenceService primarySequenceService) {
        this.primarySequenceService = primarySequenceService;
    }

    @Override
    public void onBeforeConvert(final BeforeConvertEvent<Guest> event) {
        if (event.getSource().getId() == null) {
            event.getSource().setId(primarySequenceService.getNextValue());
        }
    }

}
