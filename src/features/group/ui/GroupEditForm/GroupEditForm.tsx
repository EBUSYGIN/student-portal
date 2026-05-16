'use client';

import { useEffect, useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { isAxiosError } from 'axios';

import { resolveOptionId } from '@/entities/group/lib/normalizeGroup';
import { groupHandlers } from '@/entities/group/handlers';
import { IGroup } from '@/entities/group/model';
import { Button, Input, Modal, Select } from '@/shared';

import { IGroupEditFormProps } from './GroupEditForm.types';
import styles from './GroupEditForm.module.css';

export function GroupEditForm({
  group,
  organizationId,
  selectedSpecialityId,
  selectedUnitId,
  structuralUnits,
  specialities,
  isOpen,
  setIsOpen,
  refreshGroupsCache,
}: IGroupEditFormProps) {
  const formValues = useMemo<IGroup>(
    () => ({
      ...group,
      speciality: resolveOptionId(
        group.speciality,
        specialities,
        selectedSpecialityId,
      ),
      structural_unit: resolveOptionId(
        group.structural_unit,
        structuralUnits,
        selectedUnitId,
      ),
    }),
    [group, selectedSpecialityId, selectedUnitId, specialities, structuralUnits],
  );

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IGroup>();

  useEffect(() => {
    if (isOpen) {
      reset(formValues);
    }
  }, [formValues, isOpen, reset]);

  const onSubmit: SubmitHandler<IGroup> = async (data) => {
    const specialityId = resolveOptionId(
      data.speciality,
      specialities,
      selectedSpecialityId,
    );
    const structuralUnitId = resolveOptionId(
      data.structural_unit,
      structuralUnits,
      selectedUnitId,
    );

    try {
      await groupHandlers.editGroup({
        id: group.id,
        organization: organizationId,
        sourceSpecialityId: selectedSpecialityId,
        name: data.name.trim(),
        speciality: specialityId,
        structural_unit: structuralUnitId,
        semesters_number: data.semesters_number,
        course: data.course ?? group.course ?? 1,
      });
      await refreshGroupsCache();
      reset();
      setIsOpen(false);
    } catch (error) {
      const message = isAxiosError<{ message?: string }>(error)
        ? error.response?.data?.message
        : undefined;

      setError('name', {
        message: message || 'Ошибка редактирования учебной группы',
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title='Редактирование учебной группы'
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
          {isSubmitting ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </form>
    </Modal>
  );
}
