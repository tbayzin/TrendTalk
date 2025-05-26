package com.zoloti.trend_talk.model;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserDTO {

    private Long id;

    @NotNull
    @Size(max = 50)
    private String userName;

    @NotNull
    @Size(max = 80)
    private String password;

}
