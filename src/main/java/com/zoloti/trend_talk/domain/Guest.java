package com.zoloti.trend_talk.domain;

import jakarta.validation.constraints.Size;

import java.io.Serializable;
import java.time.OffsetDateTime;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;



@Getter
@Setter
public class Guest implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String guestName;
    private OffsetDateTime dateCreated;
    private OffsetDateTime lastUpdated;

}
