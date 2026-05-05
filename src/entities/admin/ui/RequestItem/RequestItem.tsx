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
      <DisclosurePanel className={styles.disclosurePanel}>
        лдфоиылофилвофилылоиффиыловилофыивлоиыфлоивлофивлоыифловилфивлофивлифлвилфивлофыи
      </DisclosurePanel>
    </Disclosure>
  );
}
