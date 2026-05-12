'use client';

import { Profession } from '@/entities/profession';
import { IProfession } from '@/entities/profession/model';

import styles from './ProfessionList.module.css';

export interface IProfessionListProps {
  professions: IProfession[];
}

export function ProfessionList({ professions }: IProfessionListProps) {
  return (
    <ul className={styles.list}>
      <div className={styles.listHead}>
        <span>Код</span>
        <span>Наименование</span>
        <span>Тип</span>
        <span>Семестры</span>
        <span>Статус</span>
        <span>Действия</span>
      </div>
      {professions.map((profession) => (
        <Profession
          key={profession.id}
          profession={profession}
          onEdit={() => {}}
          refetchProfessions={async () => {}}
        />
      ))}
    </ul>
  );
}
