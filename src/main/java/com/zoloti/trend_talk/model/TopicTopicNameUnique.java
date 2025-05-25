package com.zoloti.trend_talk.model;

import static java.lang.annotation.ElementType.ANNOTATION_TYPE;
import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;

import com.zoloti.trend_talk.service.TopicService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Constraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.Map;
import org.springframework.web.servlet.HandlerMapping;


/**
 * Validate that the topicName value isn't taken yet.
 */
@Target({ FIELD, METHOD, ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Constraint(
        validatedBy = TopicTopicNameUnique.TopicTopicNameUniqueValidator.class
)
public @interface TopicTopicNameUnique {

    String message() default "{exists.topic.topicName}";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

    class TopicTopicNameUniqueValidator implements ConstraintValidator<TopicTopicNameUnique, String> {

        private final TopicService topicService;
        private final HttpServletRequest request;

        public TopicTopicNameUniqueValidator(final TopicService topicService,
                final HttpServletRequest request) {
            this.topicService = topicService;
            this.request = request;
        }

        @Override
        public boolean isValid(final String value, final ConstraintValidatorContext cvContext) {
            if (value == null) {
                // no value present
                return true;
            }
            @SuppressWarnings("unchecked") final Map<String, String> pathVariables =
                    ((Map<String, String>)request.getAttribute(HandlerMapping.URI_TEMPLATE_VARIABLES_ATTRIBUTE));
            final String currentId = pathVariables.get("id");
            if (currentId != null && value.equalsIgnoreCase(topicService.get(Long.parseLong(currentId)).getTopicName())) {
                // value hasn't changed
                return true;
            }
            return !topicService.topicNameExists(value);
        }

    }

}
