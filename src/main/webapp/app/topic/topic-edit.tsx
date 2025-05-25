import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
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

export default function TopicEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('topic.edit.headline'));

  const navigate = useNavigate();
  const params = useParams();
  const currentId = +params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const getMessage = (key: string) => {
    const messages: Record<string, string> = {
      TOPIC_TOPIC_NAME_UNIQUE: t('exists.topic.topicName')
    };
    return messages[key];
  };

  const prepareForm = async () => {
    try {
      const data = (await axios.get('/api/topics/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateTopic = async (data: TopicDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/topics/' + currentId, data);
      navigate('/topics', {
            state: {
              msgSuccess: t('topic.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t, getMessage);
    }
  };

  return (<>
    <div className="d-flex flex-wrap mb-4">
      <h1 className="flex-grow-1">{t('topic.edit.headline')}</h1>
      <div>
        <Link to="/topics" className="btn btn-secondary">{t('topic.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateTopic)} noValidate>
      <InputRow useFormResult={useFormResult} object="topic" field="id" disabled={true} type="number" />
      <InputRow useFormResult={useFormResult} object="topic" field="topicName" required={true} />
      <input type="submit" value={t('topic.edit.headline')} className="btn btn-primary mt-4" />
    </form>
  </>);
}
