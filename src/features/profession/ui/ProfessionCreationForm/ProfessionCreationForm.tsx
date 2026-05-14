'use client';

import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { professionHandlers } from '@/entities/profession/handlers';
import {
  IProfessionCreation,
  TProfessionType,
} from '@/entities/profession/model';
import { Button, Icon, Input, Modal, Select } from '@/shared';

import { IProfessionCreationFormProps } from './ProfessionCreationForm.types';
import styles from './ProfessionCreationForm.module.css';

const TYPE_OPTIONS: { value: TProfessionType; label: string }[] = [
  { value: 'specialty', label: 'Специальность' },
  { value: 'profession', label: 'Профессия' },
];

type ProfessionCreationFormValues = Omit<IProfessionCreation, 'organization'>;

export function ProfessionCreationForm({
  organizationId,
  refetchProfessions,
}: IProfessionCreationFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfessionCreationFormValues>({
    defaultValues: {
      code: '',
      name: '',
      type: 'specialty',
      semesters_number: 0,
    },
  });

  const onSubmit: SubmitHandler<ProfessionCreationFormValues> = async (
    data,
  ) => {
    try {
      await professionHandlers.createProfession({
        code: data.code,
        name: data.name,
        type: data.type,
        semesters_number: data.semesters_number,
        organization: organizationId,
      });
      await refetchProfessions();
      reset();
      setIsOpen(false);
    } catch {
      setError('name', {
        message: 'Не удалось создать специальность, попробуйте позже',
      });
    }
  };

  return (
    <>
      <Button
        appearance={'default'}
        size={'s'}
        onClick={() => {
          setIsOpen(true);
        }}
        icon='Plus'
      >
        Добавить
      </Button>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Добавление профессии'
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
            error={errors.name?.message}
            {...register('name')}
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
            {isSubmitting ? 'Сохранение...' : 'Подтвердить'}
          </Button>
          <div className={styles.infoWrapper}>
            <Icon.InfoWarning className={styles.infoIcon} />
            <span className={styles.infoText}>
              Статус новой профессии по умолчанию будет определен как
              &ldquo;Активное&rdquo;
            </span>
          </div>
        </form>
      </Modal>
    </>
  );
}
