'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import axiosInstance from '@/assets/lib/axios/axiosInstance';
import { ClientDisciplineEndpoints } from '@/entities/discipline/api';
import { IDiscipline, TDisciplineType } from '@/entities/discipline/model';
import { Button, Input, Modal, Select } from '@/shared';

import { IDisciplineEditFormProps } from './DisciplineEditForm.types';

const TYPE_OPTIONS: { value: TDisciplineType; label: string }[] = [
  { value: 'discipline', label: 'Дисциплина' },
  { value: 'module', label: 'Модуль' },
];

export function DisciplineEditForm({
  discipline,
  isOpen,
  setIsOpen,
  refetchDisciplines,
}: IDisciplineEditFormProps) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
    reset,
  } = useForm<IDiscipline>({
    defaultValues: discipline,
  });

  const onSubmit: SubmitHandler<IDiscipline> = async (data) => {
    try {
      await axiosInstance.patch(ClientDisciplineEndpoints.editDiscipline(), {
        ...discipline,
        name: data.name,
        short_name: data.short_name,
        type: data.type,
      });
      await refetchDisciplines();
      setIsOpen(false);
      reset();
    } catch {
      setError('name', {
        message: 'Ошибка редактирования дисциплины',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Редактирование'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='Полное наименование'
          type='text'
          placeholder='Введите полное наименование'
          {...register('name', {
            required: 'Полное наименование является обязательным полем',
          })}
          error={errors.name?.message}
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
          Сохранить
        </Button>
      </form>
    </Modal>
  );
}
