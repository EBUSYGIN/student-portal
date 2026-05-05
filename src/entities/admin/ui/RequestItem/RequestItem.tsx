import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/react';

import { StatusTag } from '@/shared';

import styles from './RequestItem.module.css';

export function RequestItem() {
  return (
    <Disclosure as='div' className={styles.requestItem}>
      <DisclosureButton>Иванов Иван Иванович</DisclosureButton>
      <span>gmai@mail.ru</span>
      <span>161-***-***-22</span>
      <span>{'ГБПОУ "Название организации"'}</span>
      <span>30.04.2026</span>
      <StatusTag status='success'>Одобрено</StatusTag>
      <DisclosurePanel transition className={styles.disclosurePanel}>
        <div className={styles.disclosureContent}>
          <div className={styles.detailColumn}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Специальность:</span>
              <span className={styles.detailValue}>
                09.02.07 &quot;Информационные системы и программирование&quot;
              </span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Куратор:</span>
              <span className={styles.detailValue}>Петров Петр Петрович</span>
            </div>
          </div>
          <div className={styles.detailColumn}>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Курс:</span>
              <span className={styles.detailValue}>3</span>
            </div>
            <div className={styles.detailRow}>
              <span className={styles.detailLabel}>Группа:</span>
              <span className={styles.detailValue}>ИС-31</span>
            </div>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
