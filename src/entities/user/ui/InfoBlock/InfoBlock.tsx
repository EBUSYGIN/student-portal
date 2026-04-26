'use client';

import { useAnyInfo } from '@/assets/lib/hooks/useAnyInfo';

import { userRequests } from '../../requests';
import { IUserResponse } from '../../types';
import { Card, Title, InfoItem, Loader } from '@/shared';

import styles from './InfoBlock.module.css';

export function InfoBlock() {
  const {
    data: user,
    isLoading,
    error,
  } = useAnyInfo<IUserResponse>('user', userRequests.getUserData);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Ошибка загрузки данных</div>;
  }

  if (!user) {
    return <div>Данные не найдены</div>;
  }

  return (
    <>
      <div className={styles.infoBlock}>
        <Card className={styles.infoContainer}>
          <Title type={'h2'} size={'s'} className={styles.title}>
            Личная информация
          </Title>
          <InfoItem
            label='ФИО'
            value={`${user.last_name} ${user.first_name} ${user.middle_name}`}
          />
          <InfoItem label='Дата рождения' value={user.birthday_date} />
          <InfoItem label='СНИЛС' value={user.snils} />
          <InfoItem label='Почта' value={user.email} />
        </Card>
        <Card className={styles.infoContainer}>
          <Title type={'h2'} size={'s'} className={styles.title}>
            Учебная информация
          </Title>
          <InfoItem label='Учебное заведение' value={user.organization.name} />
          <InfoItem
            label='Специальность'
            value={user.organization.speciality}
          />
          <InfoItem label='Курс' value={`${user.organization.course}`} />
          <InfoItem label='Группа' value={user.organization.group} />
          <InfoItem
            label='Куратор'
            value={user.parents?.[0]?.parent_name || 'Не указан'}
          />
        </Card>
      </div>
      <Card>
        <Title type={'h2'} size={'s'} className={styles.parentsTitle}>
          Родители
        </Title>
        <div className={styles.parentsContainer}>
          {user.parents?.map((parent, index) => (
            <InfoItem
              key={index}
              label={`${index + 1} ${parent.parent_name} `}
              value={parent.email}
            />
          ))}
        </div>
      </Card>
    </>
  );
}
