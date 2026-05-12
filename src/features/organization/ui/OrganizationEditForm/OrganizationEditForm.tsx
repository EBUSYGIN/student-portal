import { SubmitHandler, useForm } from 'react-hook-form';

import axiosInstance from '@/assets/lib/axios/axiosInstance';
import { ClientOrganizationEndpoints } from '@/entities/organization/api';
import { IOrganization } from '@/entities/organization/model';
import { Button, Input, Modal } from '@/shared';

import { IOrganizationEditFormProps } from './OrganizationEditForm.types';
import styles from './OrganizationEditForm.module.css';

export function OrganizationEditForm({
  organization,
  isOpen,
  setIsOpen,
  refetchOrganizations,
}: IOrganizationEditFormProps) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
    reset,
  } = useForm<IOrganization>();

  const onSubmit: SubmitHandler<IOrganization> = async (data) => {
    try {
      await axiosInstance.patch(ClientOrganizationEndpoints.editOrganization(), {
        ...organization,
        name: data.name,
      });
      void refetchOrganizations();
      setIsOpen(false);
      reset();
    } catch (e) {
      if (e instanceof Error) {
        setError('name', {
          message: e.message,
        });
      }
      setError('name', {
        message: 'Ошибка редактирования организации',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Редактирование'>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='Название организации'
          type='text'
          placeholder='Введите название организации'
          defaultValue={organization.name}
          {...register('name', {
            required: 'Название организации является обязательным полем',
          })}
          error={errors.name?.message}
        />
        <Button type='submit' size={'l'} disabled={isSubmitting}>
          Сохранить
        </Button>
      </form>
    </Modal>
  );
}
