import { INavigationItem } from './navigation.types';

export const UserNavigationConfig: INavigationItem[] = [
  {
    name: 'Профиль',
    href: '/',
  },
  {
    name: 'История заявлений и справок',
    href: '/history',
  },
];

export const AdminNavigationConfig: INavigationItem[] = [
  { name: 'Заявки', href: '/admin' },
  { name: 'Структурные подразделения', href: '/admin/structure' },
  { name: 'Специальности', href: '/admin/professions' },
  { name: 'Учебные группы', href: '/admin/groups' },
  { name: 'Дисциплины и модули', href: '/admin/courses' },
];
