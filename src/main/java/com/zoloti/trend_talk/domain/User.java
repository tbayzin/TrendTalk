package com.zoloti.trend_talk.domain;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.OffsetDateTime;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.annotation.Version;
import org.springframework.data.redis.core.index.Indexed;


@Getter
@Setter
public class User {

    @Id
    private Long id;

    @NotNull
    @Size(max = 50)
    private String userName;

    @NotNull
    @Size(max = 80)
    private String password;

    @CreatedDate
    private OffsetDateTime dateCreated;

    @LastModifiedDate
    private OffsetDateTime lastUpdated;

    @Version
    private Integer version;

}
