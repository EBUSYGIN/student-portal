import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Button, Icon, Input, Modal } from '@/shared';
import { unitHandlers } from '@/entities/unit/handlers';
import { IStructuralUnitCreation } from '@/entities/unit/model';

import { IUnitCreationFormProps } from './UnitCreationForm.types';
import styles from './UnitCreationForm.module.css';

export function UnitCreationForm({
  organizationId,
  refetchUnits,
}: IUnitCreationFormProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IStructuralUnitCreation>();

  const onSubmit: SubmitHandler<IStructuralUnitCreation> = async (data) => {
    try {
      await unitHandlers.createStructuralUnit({
        name: data.name,
        organization: organizationId,
      });
      await refetchUnits();
      reset();
      setIsOpen(false);
    } catch {
      setError('name', {
        message:
          'Не удалось создать структурное подразделение, попробуйте позже',
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
        title='Добавление нового подразделения'
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Input
            label='Название подразделения'
            type='text'
            placeholder='Введите название подразделения'
            error={errors.name?.message}
            {...register('name', {
              required: 'Название подразделения является обязательным полем',
            })}
          />
          <Button type='submit' size={'l'} disabled={isSubmitting}>
            {isSubmitting ? 'Сохранение...' : 'Подтвердить'}
          </Button>
          <div className={styles.infoWrapper}>
            <Icon.InfoWarning className={styles.infoIcon} />
            <span className={styles.infoText}>
              Статус нового подразделения по умолчанию будет определен как
              &ldquo;Активное&rdquo;
            </span>
          </div>
        </form>
      </Modal>
    </>
  );
}
