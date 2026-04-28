'use client';

import { useAnyInfo } from '@/assets/lib/hooks/useAnyInfo';

import { IUserResponse } from '@/entities/user/model';
import { userRequests } from '@/entities/user/requests';
import { PersonalInfoBlock, ParentsBlock } from '@/entities/user/ui';
import { AddParentForm } from '@/features/User';
import { Loader } from '@/shared';

export function UserInfo() {
  const { data: user, isLoading } = useAnyInfo<IUserResponse>(
    'user',
    userRequests.getUserData,
  );

  if (isLoading) {
    return <Loader />;
  }

  if (!user) {
    return <div>Данные не найдены</div>;
  }

  return (
    <div>
      <PersonalInfoBlock user={user} />
      <ParentsBlock parents={user?.parents} actionSlot={<AddParentForm />} />
    </div>
  );
}
