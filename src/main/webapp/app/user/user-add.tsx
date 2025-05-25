import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
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

export default function UserAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('user.add.headline'));

  const navigate = useNavigate();

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const getMessage = (key: string) => {
    const messages: Record<string, string> = {
      USER_USER_NAME_UNIQUE: t('exists.user.userName')
    };
    return messages[key];
  };

  const createUser = async (data: UserDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/users', data);
      navigate('/users', {
            state: {
              msgSuccess: t('user.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t, getMessage);
    }
  };

  return (<>
    <div className="d-flex flex-wrap mb-4">
      <h1 className="flex-grow-1">{t('user.add.headline')}</h1>
      <div>
        <Link to="/users" className="btn btn-secondary">{t('user.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createUser)} noValidate>
      <InputRow useFormResult={useFormResult} object="user" field="userName" required={true} />
      <InputRow useFormResult={useFormResult} object="user" field="password" required={true} />
      <input type="submit" value={t('user.add.headline')} className="btn btn-primary mt-4" />
    </form>
  </>);
}
