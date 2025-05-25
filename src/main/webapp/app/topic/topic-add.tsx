import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { TopicDTO } from 'app/topic/topic-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    topicName: yup.string().emptyToNull().max(100).required()
  });
}

export default function TopicAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('topic.add.headline'));

  const navigate = useNavigate();

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const getMessage = (key: string) => {
    const messages: Record<string, string> = {
      TOPIC_TOPIC_NAME_UNIQUE: t('exists.topic.topicName')
    };
    return messages[key];
  };

  const createTopic = async (data: TopicDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/topics', data);
      navigate('/topics', {
            state: {
              msgSuccess: t('topic.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t, getMessage);
    }
  };

  return (<>
    <div className="d-flex flex-wrap mb-4">
      <h1 className="flex-grow-1">{t('topic.add.headline')}</h1>
      <div>
        <Link to="/topics" className="btn btn-secondary">{t('topic.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createTopic)} noValidate>
      <InputRow useFormResult={useFormResult} object="topic" field="topicName" required={true} />
      <input type="submit" value={t('topic.add.headline')} className="btn btn-primary mt-4" />
    </form>
  </>);
}
