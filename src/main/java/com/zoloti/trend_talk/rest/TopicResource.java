package com.zoloti.trend_talk.rest;

import com.zoloti.trend_talk.model.TopicDTO;
import com.zoloti.trend_talk.service.TopicService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(value = "/api/topics", produces = MediaType.APPLICATION_JSON_VALUE)
public class TopicResource {

    private final TopicService topicService;

    public TopicResource(final TopicService topicService) {
        this.topicService = topicService;
    }

    @GetMapping
    public ResponseEntity<List<TopicDTO>> getAllTopics() {
        return ResponseEntity.ok(topicService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TopicDTO> getTopic(@PathVariable(name = "id") final Long id) {
        return ResponseEntity.ok(topicService.get(id));
    }

    @PostMapping
    @ApiResponse(responseCode = "201")
    public ResponseEntity<Long> createTopic(@RequestBody @Valid final TopicDTO topicDTO) {
        final Long createdId = topicService.create(topicDTO);
        return new ResponseEntity<>(createdId, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Long> updateTopic(@PathVariable(name = "id") final Long id,
            @RequestBody @Valid final TopicDTO topicDTO) {
        topicService.update(id, topicDTO);
        return ResponseEntity.ok(id);
    }

    /*
    @DeleteMapping("/{id}")
    @ApiResponse(responseCode = "204")
    public ResponseEntity<Void> deleteTopic(@PathVariable(name = "id") final Long id) {
        topicService.delete(id);
        return ResponseEntity.noContent().build();
    }
     */

}
