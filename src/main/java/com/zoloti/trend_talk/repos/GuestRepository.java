package com.zoloti.trend_talk.repos;

import com.zoloti.trend_talk.domain.Guest;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface GuestRepository extends MongoRepository<Guest, Long> {
}
