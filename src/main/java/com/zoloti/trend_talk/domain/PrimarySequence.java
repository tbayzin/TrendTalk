package com.zoloti.trend_talk.domain;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;


@Getter
@Setter
public class PrimarySequence {

    @Id
    private String id;

    private long seq;

}
