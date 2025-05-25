import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router';
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

export default function GuestEdit() {
  const { t } = useTranslation();
  useDocumentTitle(t('guest.edit.headline'));

  const navigate = useNavigate();
  const params = useParams();
  const currentId = +params.id!;

  const useFormResult = useForm({
    resolver: yupResolver(getSchema()),
  });

  const prepareForm = async () => {
    try {
      const data = (await axios.get('/api/guests/' + currentId)).data;
      useFormResult.reset(data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    prepareForm();
  }, []);

  const updateGuest = async (data: GuestDTO) => {
    window.scrollTo(0, 0);
    try {
      await axios.put('/api/guests/' + currentId, data);
      navigate('/guests', {
            state: {
              msgSuccess: t('guest.update.success')
            }
          });
    } catch (error: any) {
      handleServerError(error, navigate, useFormResult.setError, t);
    }
  };

  return (<>
    <div className="d-flex flex-wrap mb-4">
      <h1 className="flex-grow-1">{t('guest.edit.headline')}</h1>
      <div>
        <Link to="/guests" className="btn btn-secondary">{t('guest.edit.back')}</Link>
      </div>
    </div>
    <form onSubmit={useFormResult.handleSubmit(updateGuest)} noValidate>
      <InputRow useFormResult={useFormResult} object="guest" field="id" disabled={true} type="number" />
      <InputRow useFormResult={useFormResult} object="guest" field="guestName" />
      <input type="submit" value={t('guest.edit.headline')} className="btn btn-primary mt-4" />
    </form>
  </>);
}
