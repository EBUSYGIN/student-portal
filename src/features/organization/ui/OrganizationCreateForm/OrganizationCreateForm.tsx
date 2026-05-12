import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Icon, Input, Modal } from '@/shared';
import { organizationHandlers } from '@/entities/organization/handlers';
import { IOrganizationCreation } from '@/entities/organization/model';
import { IOrganizationCreationFormProps } from './OrganizationCreateForm.types';
import styles from './OrganizationCreateForm.module.css';

export function OrganizationCreateForm({
  refetchOrganizations,
}: IOrganizationCreationFormProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IOrganizationCreation>();

  const onSubmit: SubmitHandler<IOrganizationCreation> = async (data) => {
    try {
      await organizationHandlers.createOrganization({
        name: data.name,
        inn: data.inn,
      });
      await refetchOrganizations();
      reset();
      setIsOpen(false);
    } catch {
      setError('name', {
        message: 'Не удалось создать организацию, попробуйте позже',
      });
    }
  };

  return (
    <>
      <Button
        appearance={'default'}
        size={'s'}
        onClick={() => setIsOpen(true)}
        icon='Plus'
      >
        Добавить
      </Button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Добавление организации'
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label='Название организации'
            type='text'
            placeholder='Введите название организации'
            error={errors.name?.message}
            {...register('name', {
              required: 'Название организации является обязательным полем',
            })}
          />
          <Input
            label='ИНН'
            type='text'
            placeholder='Введите ИНН'
            error={errors.inn?.message}
            {...register('inn', {
              required: 'ИНН является обязательным полем',
            })}
          />
          <Button type='submit' size={'l'} disabled={isSubmitting}>
            {isSubmitting ? 'Сохранение...' : 'Подтвердить'}
          </Button>
          <div className={styles.infoWrapper}>
            <Icon.InfoWarning className={styles.infoIcon} />
            <span className={styles.infoText}>
              Статус новой организации по умолчанию будет определен как
              &ldquo;Активное&rdquo;
            </span>
          </div>
        </form>
      </Modal>
    </>
  );
}
