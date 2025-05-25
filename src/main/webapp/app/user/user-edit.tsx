import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { UserDTO } from 'app/user/user-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    userName: yup.string().emptyToNull().max(50).required(),
    password: yup.string().emptyToNull().max(80).required()
  });
}

export default function UserEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('user.edit.headline'));

  const navigate = useNavigate();
  const params = useParams();
  const currentId = +params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const getMessage = (key: string) => {
    const messages: Record<string, string> = {
      USER_USER_NAME_UNIQUE: t('exists.user.userName')
    };
    return messages[key];
  };

  const prepareForm = async () => {
    try {
      const data = (await axios.get('/api/users/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateUser = async (data: UserDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/users/' + currentId, data);
      navigate('/users', {
            state: {
              msgSuccess: t('user.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t, getMessage);
    }
  };

  return (<>
    <div className="d-flex flex-wrap mb-4">
      <h1 className="flex-grow-1">{t('user.edit.headline')}</h1>
      <div>
        <Link to="/users" className="btn btn-secondary">{t('user.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateUser)} noValidate>
      <InputRow useFormResult={useFormResult} object="user" field="id" disabled={true} type="number" />
      <InputRow useFormResult={useFormResult} object="user" field="userName" required={true} />
      <InputRow useFormResult={useFormResult} object="user" field="password" required={true} />
      <input type="submit" value={t('user.edit.headline')} className="btn btn-primary mt-4" />
    </form>
  </>);
}
