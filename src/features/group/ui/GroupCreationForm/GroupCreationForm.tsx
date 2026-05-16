'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';

import { groupHandlers } from '@/entities/group/handlers';
import { IGroupCreation } from '@/entities/group/model';
import { Button, Icon, Input, Modal, Select } from '@/shared';

import { IGroupCreationFormProps } from './GroupCreationForm.types';
import styles from './GroupCreationForm.module.css';

type GroupCreationFormValues = Omit<IGroupCreation, 'organization' | 'course'>;

export function GroupCreationForm({
  organizationId,
  structuralUnits,
  specialities,
  refreshGroupsCache,
}: IGroupCreationFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GroupCreationFormValues>({
    defaultValues: {
      name: '',
      speciality: '',
      structural_unit: '',
      semesters_number: 1,
    },
  });

  const onSubmit: SubmitHandler<GroupCreationFormValues> = async (data) => {
    try {
      await groupHandlers.createGroup({
        name: data.name.trim(),
        speciality: data.speciality,
        structural_unit: data.structural_unit,
        semesters_number: data.semesters_number,
        course: 1,
        organization: organizationId,
      });
      await refreshGroupsCache();
      reset();
      setIsOpen(false);
    } catch (error) {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;

      setError('name', {
        message: message || 'Не удалось создать учебную группу, попробуйте позже',
      });
    }
  };

  return (
    <>
      <Button
        appearance='default'
        size='s'
        onClick={() => setIsOpen(true)}
        icon='Plus'
      >
        Добавить
      </Button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Добавление учебной группы'
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label='Наименование'
            type='text'
            placeholder='Введите наименование'
            error={errors.name?.message}
            {...register('name', {
              required: 'Наименование является обязательным полем',
            })}
          />
          <Select
            label='Специальность'
            error={errors.speciality?.message}
            {...register('speciality', {
              required: 'Специальность является обязательным полем',
            })}
          >
            <option value=''>Выберите специальность</option>
            {specialities.map((speciality) => (
              <option key={speciality.id} value={speciality.id}>
                {speciality.name}
              </option>
            ))}
          </Select>
          <Select
            label='Структурное подразделение'
            error={errors.structural_unit?.message}
            {...register('structural_unit', {
              required: 'Структурное подразделение является обязательным полем',
            })}
          >
            <option value=''>Выберите подразделение</option>
            {structuralUnits.map((unit) => (
              <option key={unit.id} value={unit.id}>
                {unit.name}
              </option>
            ))}
          </Select>
          <Input
            label='Количество семестров'
            type='number'
            placeholder='Введите количество семестров'
            error={errors.semesters_number?.message}
            {...register('semesters_number', {
              required: 'Количество семестров является обязательным полем',
              valueAsNumber: true,
              min: {
                value: 1,
                message: 'Количество семестров должно быть больше 0',
              },
            })}
          />
          <Button type='submit' size='l' disabled={isSubmitting}>
            {isSubmitting ? 'Сохранение...' : 'Подтвердить'}
          </Button>
          <div className={styles.infoWrapper}>
            <Icon.InfoWarning className={styles.infoIcon} />
            <span className={styles.infoText}>
              Статус новой учебной группы по умолчанию будет определен как
              &ldquo;Активное&rdquo;
            </span>
          </div>
        </form>
      </Modal>
    </>
  );
}
