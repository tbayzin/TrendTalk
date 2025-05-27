package com.zoloti.trend_talk.repos;

import com.zoloti.trend_talk.domain.Guest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;


@Repository
public class GuestRepository {
    private static final String GUEST_KEY_PREFIX = "guest:";
    private final RedisTemplate<String, Object> redisTemplate;

    public GuestRepository(RedisTemplate<String, Object> redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    // Guest kaydetme
    public void save(Guest guest) {
        String key = GUEST_KEY_PREFIX + guest.getId();
        redisTemplate.opsForValue().set(key, guest);
        redisTemplate.opsForSet().add("guest:username", guest.getGuestName());
    }

    // Guest bulma
    public Guest findById(Long id) {
        String key = GUEST_KEY_PREFIX + id;
        return (Guest) redisTemplate.opsForValue().get(key);
    }

    // Guest var mı kontrol
    public boolean existsById(Long id) {
        String key = GUEST_KEY_PREFIX + id;
        return Boolean.TRUE.equals(redisTemplate.hasKey(key));
    }

    // Guest silme
    public void deleteById(Long id) {
        String key = GUEST_KEY_PREFIX + id;
        redisTemplate.delete(key);
    }
}