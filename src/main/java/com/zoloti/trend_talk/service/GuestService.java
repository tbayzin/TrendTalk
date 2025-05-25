package com.zoloti.trend_talk.service;

import com.zoloti.trend_talk.domain.Guest;
import com.zoloti.trend_talk.model.GuestDTO;
import com.zoloti.trend_talk.repos.GuestRepository;
import com.zoloti.trend_talk.util.NotFoundException;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;


@Service
public class GuestService {

    private final GuestRepository guestRepository;

    public GuestService(final GuestRepository guestRepository) {
        this.guestRepository = guestRepository;
    }

    public List<GuestDTO> findAll() {
        final List<Guest> guests = guestRepository.findAll(Sort.by("id"));
        return guests.stream()
                .map(guest -> mapToDTO(guest, new GuestDTO()))
                .toList();
    }

    public GuestDTO get(final Long id) {
        return guestRepository.findById(id)
                .map(guest -> mapToDTO(guest, new GuestDTO()))
                .orElseThrow(NotFoundException::new);
    }

    public Long create(final GuestDTO guestDTO) {
        final Guest guest = new Guest();
        mapToEntity(guestDTO, guest);
        return guestRepository.save(guest).getId();
    }

    public void update(final Long id, final GuestDTO guestDTO) {
        final Guest guest = guestRepository.findById(id)
                .orElseThrow(NotFoundException::new);
        mapToEntity(guestDTO, guest);
        guestRepository.save(guest);
    }

    public void delete(final Long id) {
        guestRepository.deleteById(id);
    }

    private GuestDTO mapToDTO(final Guest guest, final GuestDTO guestDTO) {
        guestDTO.setId(guest.getId());
        guestDTO.setGuestName(guest.getGuestName());
        return guestDTO;
    }

    private Guest mapToEntity(final GuestDTO guestDTO, final Guest guest) {
        guest.setGuestName(guestDTO.getGuestName());
        return guest;
    }

}
