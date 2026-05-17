'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { disciplineHandlers } from '@/entities/discipline/handlers';
import {
  IDisciplineCreation,
  TDisciplineType,
} from '@/entities/discipline/model';
import { Button, Input, Modal, Select } from '@/shared';

import { IDisciplineCreationFormProps } from './DisciplineCreationForm.types';
import styles from './DisciplineCreationForm.module.css';

const TYPE_OPTIONS: { value: TDisciplineType; label: string }[] = [
  { value: 'discipline', label: 'Дисциплина' },
  { value: 'module', label: 'Модуль' },
];

type DisciplineCreationFormValues = Omit<IDisciplineCreation, 'organization'>;

export function DisciplineCreationForm({
  organizationId,
  refetchDisciplines,
}: IDisciplineCreationFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DisciplineCreationFormValues>({
    defaultValues: {
      name: '',
      short_name: '',
      type: 'discipline',
    },
  });

  const onSubmit: SubmitHandler<DisciplineCreationFormValues> = async (data) => {
    try {
      await disciplineHandlers.createDiscipline({
        name: data.name,
        short_name: data.short_name,
        type: data.type,
        organization: organizationId,
      });
      await refetchDisciplines();
      reset();
      setIsOpen(false);
    } catch {
      setError('name', {
        message: 'Не удалось создать дисциплину, попробуйте позже',
      });
    }
  };

  return (
    <>
      <Button
        appearance='default'
        size='s'
        onClick={() => {
          setIsOpen(true);
        }}
        icon='Plus'
      >
        Добавить
      </Button>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Добавление дисциплины'>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label='Полное наименование'
            type='text'
            placeholder='Введите полное наименование'
            error={errors.name?.message}
            {...register('name', {
              required: 'Полное наименование является обязательным полем',
            })}
          />
          <Input
            label='Сокращенное наименование'
            type='text'
            placeholder='Введите сокращенное наименование'
            {...register('short_name')}
          />
          <Select label='Вид' {...register('type')}>
            {TYPE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <Button type='submit' size='l' disabled={isSubmitting}>
            {isSubmitting ? 'Сохранение...' : 'Подтвердить'}
          </Button>
        </form>
      </Modal>
    </>
  );
}
