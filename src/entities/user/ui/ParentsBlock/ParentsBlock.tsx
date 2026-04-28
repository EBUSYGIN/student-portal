import { Card, InfoItem, Title } from '@/shared';

import { IParentsBlockProps } from './ParentsBlock.types';
import styles from './ParentsBlock.module.css';

export function ParentsBlock({
  parents,
  className,
  actionSlot,
}: IParentsBlockProps) {
  if (!parents) {
    return null;
  }

  return (
    <Card className={className}>
      <Title type={'h2'} size={'s'} className={styles.title}>
        Родители
      </Title>
      <div className={styles.parentsList}>
        {parents.map((parent, index) => (
          <InfoItem
            key={index}
            label={`${index + 1}. ${parent.parent_name}`}
            value={parent.email}
          />
        ))}
      </div>
      {actionSlot && <div className={styles.action}>{actionSlot}</div>}
    </Card>
  );
}
