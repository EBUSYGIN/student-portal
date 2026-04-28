import { Card, Title, InfoItem } from '@/shared';

import { IPersonalInfoBlockProps } from './PersonalInfoBlock.types';
import styles from './PersonalInfoBlock.module.css';

export function PersonalInfoBlock({ user }: IPersonalInfoBlockProps) {
  if (!user) {
    return null;
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
    </>
  );
}
