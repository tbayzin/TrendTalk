import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { TopicDTO } from 'app/topic/topic-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function TopicList() {
  const { t } = useTranslation();
  useDocumentTitle(t('topic.list.headline'));

  const [topics, setTopics] = useState<TopicDTO[]>([]);
  const navigate = useNavigate();

  const getAllTopics = async () => {
    try {
      const response = await axios.get('/api/topics');
      setTopics(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: number) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/topics/' + id);
      navigate('/topics', {
            state: {
              msgInfo: t('topic.delete.success')
            }
          });
      getAllTopics();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllTopics();
  }, []);

  return (<>
    <div className="d-flex flex-wrap mb-4">
      <h1 className="flex-grow-1">{t('topic.list.headline')}</h1>
      <div>
        <Link to="/topics/add" className="btn btn-primary ms-2">{t('topic.list.createNew')}</Link>
      </div>
    </div>
    {!topics || topics.length === 0 ? (
    <div>{t('topic.list.empty')}</div>
    ) : (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">{t('topic.id.label')}</th>
            <th scope="col">{t('topic.topicName.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => (
          <tr key={topic.id}>
            <td>{topic.id}</td>
            <td>{topic.topicName}</td>
            <td>
              <div className="float-end text-nowrap">
                <Link to={'/topics/edit/' + topic.id} className="btn btn-sm btn-secondary">{t('topic.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(topic.id!)} className="btn btn-sm btn-secondary">{t('topic.list.delete')}</button>
                <Link to={`/topics/${topic.id}/chat`} className="btn btn-sm btn-primary ms-2">Chat</Link>
              </div>
            </td>
          </tr>
          ))}
        </tbody>
      </table>
    </div>
    )}
  </>);
}
