package com.zoloti.trend_talk.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class GuestDTO {

    private Long id;

    @NotNull
    @Size(max = 30)
    private String guestName;

}
