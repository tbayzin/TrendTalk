import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { handleServerError } from 'app/common/utils';
import { GuestDTO } from 'app/guest/guest-model';
import axios from 'axios';
import useDocumentTitle from 'app/common/use-document-title';


export default function GuestList() {
  const { t } = useTranslation();
  useDocumentTitle(t('guest.list.headline'));

  const [guests, setGuests] = useState<GuestDTO[]>([]);
  const navigate = useNavigate();

  const getAllGuests = async () => {
    try {
      const response = await axios.get('/api/guests');
      setGuests(response.data);
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  const confirmDelete = async (id: number) => {
    if (!confirm(t('delete.confirm'))) {
      return;
    }
    try {
      await axios.delete('/api/guests/' + id);
      navigate('/guests', {
            state: {
              msgInfo: t('guest.delete.success')
            }
          });
      getAllGuests();
    } catch (error: any) {
      handleServerError(error, navigate);
    }
  };

  useEffect(() => {
    getAllGuests();
  }, []);

  return (<>
    <div className="d-flex flex-wrap mb-4">
      <h1 className="flex-grow-1">{t('guest.list.headline')}</h1>
      <div>
        <Link to="/guests/add" className="btn btn-primary ms-2">{t('guest.list.createNew')}</Link>
      </div>
    </div>
    {!guests || guests.length === 0 ? (
    <div>{t('guest.list.empty')}</div>
    ) : (
    <div className="table-responsive">
      <table className="table table-striped table-hover align-middle">
        <thead>
          <tr>
            <th scope="col">{t('guest.id.label')}</th>
            <th scope="col">{t('guest.guestName.label')}</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {guests.map((guest) => (
          <tr key={guest.id}>
            <td>{guest.id}</td>
            <td>{guest.guestName}</td>
            <td>
              <div className="float-end text-nowrap">
                <Link to={'/guests/edit/' + guest.id} className="btn btn-sm btn-secondary">{t('guest.list.edit')}</Link>
                <span> </span>
                <button type="button" onClick={() => confirmDelete(guest.id!)} className="btn btn-sm btn-secondary">{t('guest.list.delete')}</button>
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
