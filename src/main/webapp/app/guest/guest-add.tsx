import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError, setYupDefaults } from 'app/common/utils';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { GuestDTO } from 'app/guest/guest-model';
import axios from 'axios';
import InputRow from 'app/common/input-row/input-row';
import useDocumentTitle from 'app/common/use-document-title';
import * as yup from 'yup';


function getSchema() {
  setYupDefaults();
  return yup.object({
    guestName: yup.string().emptyToNull().max(30)
  });
}

export default function GuestAdd() {
  const { t } = useTranslation();
  useDocumentTitle(t('guest.add.headline'));

  const navigate = useNavigate();

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const createGuest = async (data: GuestDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.post('/api/guests', data);
      navigate('/guests', {
            state: {
              msgSuccess: t('guest.create.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="d-flex flex-wrap mb-4">
      <h1 className="flex-grow-1">{t('guest.add.headline')}</h1>
      <div>
        <Link to="/guests" className="btn btn-secondary">{t('guest.add.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(createGuest)} noValidate>
      <InputRow useFormResult={useFormResult} object="guest" field="guestName" />
      <input type="submit" value={t('guest.add.headline')} className="btn btn-primary mt-4" />
    </form>
  </>);
}
