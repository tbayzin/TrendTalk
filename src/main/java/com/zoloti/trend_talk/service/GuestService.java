package com.zoloti.trend_talk.service;

import com.zoloti.trend_talk.domain.Guest;
import com.zoloti.trend_talk.model.GuestDTO;
import com.zoloti.trend_talk.repos.GuestRepository;
import com.zoloti.trend_talk.util.NotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class GuestService {

    private final GuestRepository guestRepository;
    private final PrimarySequenceService primarySequenceService;

    public GuestService(final GuestRepository guestRepository, final PrimarySequenceService primarySequenceService) {
        this.guestRepository = guestRepository;
        this.primarySequenceService = primarySequenceService;
    }

    public List<GuestDTO> findAll() {
        List<GuestDTO> guestDTOs = new ArrayList<>();
        return guestDTOs;
    }

    public GuestDTO get(final Long id) {
        Guest guest = guestRepository.findById(id);
        if (guest == null) {
            throw new NotFoundException();
        }
        return mapToDTO(guest, new GuestDTO());
    }

    public Long create(final GuestDTO guestDTO) {
        final Guest guest = new Guest();
        mapToEntity(guestDTO, guest);
        if (guest.getId() == null) {
            guest.setId(primarySequenceService.getNextValue());
        }
        guestRepository.save(guest);
        return guest.getId();
    }

    public void update(final Long id, final GuestDTO guestDTO) {
        Guest guest = guestRepository.findById(id);
        if (guest == null) {
            throw new NotFoundException();
        }
        mapToEntity(guestDTO, guest);
        guestRepository.save(guest);
    }

    private GuestDTO mapToDTO(final Guest guest, final GuestDTO guestDTO) {
        guestDTO.setId(guest.getId());
        return guestDTO;
    }

    private Guest mapToEntity(final GuestDTO guestDTO, final Guest guest) {
        guest.setId(guestDTO.getId());
        return guest;
    }
}