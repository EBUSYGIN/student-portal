'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

import axiosInstance from '@/assets/lib/axios/axiosInstance';
import { ClientProfessionEndpoints } from '@/entities/profession/api';
import { IProfession, TProfessionType } from '@/entities/profession/model';
import { Button, Input, Modal, Select } from '@/shared';

import { IProfessionEditFormProps } from './ProfessionEditForm.types';

const TYPE_OPTIONS: { value: TProfessionType; label: string }[] = [
  { value: 'specialty', label: 'Специальность' },
  { value: 'profession', label: 'Профессия' },
];

export function ProfessionEditForm({
  profession,
  isOpen,
  setIsOpen,
  refetchProfessions,
}: IProfessionEditFormProps) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
    reset,
  } = useForm<IProfession>({
    defaultValues: profession,
  });

  const onSubmit: SubmitHandler<IProfession> = async (data) => {
    try {
      await axiosInstance.patch(ClientProfessionEndpoints.editProfession(), {
        ...profession,
        code: data.code,
        name: data.name,
        type: data.type,
        semesters_number: data.semesters_number,
      });
      await refetchProfessions();
      setIsOpen(false);
      reset();
    } catch {
      setError('name', {
        message: 'Ошибка редактирования специальности',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Редактирование'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='Код'
          type='text'
          placeholder='Введите код'
          {...register('code')}
        />
        <Input
          label='Наименование'
          type='text'
          placeholder='Введите наименование'
          {...register('name', {
            required: 'Наименование является обязательным полем',
          })}
          error={errors.name?.message}
        />
        <Select label='Тип' {...register('type')}>
          {TYPE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <Input
          label='Семестры'
          type='number'
          placeholder='Введите количество семестров'
          {...register('semesters_number', { valueAsNumber: true })}
        />
        <Button type='submit' size={'l'} disabled={isSubmitting}>
          Сохранить
        </Button>
      </form>
    </Modal>
  );
}
