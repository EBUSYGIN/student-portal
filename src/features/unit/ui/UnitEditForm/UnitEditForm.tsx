import { SubmitHandler, useForm } from 'react-hook-form';

import axiosInstance from '@/assets/lib/axios/axiosInstance';
import { IUnitEditFormProps } from './UnitEditForm.types';
import { IStructuralUnit } from '@/entities/unit/model';
import { UnitClientEndpoints } from '@/entities/unit/api';

import { Button, Input, Modal } from '@/shared';

export function UnitEditForm({
  unit,
  isOpen,
  setIsOpen,
  refetchUnits,
}: IUnitEditFormProps) {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
    reset,
  } = useForm<IStructuralUnit>();

  const onSubmit: SubmitHandler<IStructuralUnit> = async (data) => {
    try {
      await axiosInstance.patch(UnitClientEndpoints.editStructuralUnit(), {
        ...unit,
        name: data.name,
      });
      void refetchUnits();
      setIsOpen(false);
      reset();
    } catch (e) {
      if (e instanceof Error) {
        setError('name', {
          message: e.message,
        });
      }
      setError('name', {
        message: 'Ошибка редактирования подразделения',
      });
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title='Редактирование'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='Название подразделения'
          type='text'
          placeholder='Введите название подразделения'
          defaultValue={unit.name}
          {...register('name', {
            required: 'Название подразделения является обязательным полем',
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
