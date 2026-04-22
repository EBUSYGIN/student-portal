import { Button, Input, StatusTag } from '@/shared';

export default function Home() {
  return (
    <>
      <Button appearance='default' size='s'>
        Кнопка
      </Button>
      <div>
        <Input label='Поле ввода' placeholder='Поле ввода' error='Ошибка' />
      </div>

      <div>
        <StatusTag status='success'>Успешно</StatusTag>
        <StatusTag status='warning'>Предупреждение</StatusTag>
        <StatusTag status='error'>Ошибка</StatusTag>
      </div>
    </>
  );
}
