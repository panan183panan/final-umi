import React, { useEffect } from 'react';
import isAdministrator from '@/utils/administrator';
export default function IndexPage() {
  return (
    <div>
      <span>欢迎您:</span>
      {isAdministrator(sessionStorage.getItem('email') || '')
        ? '管理员'
        : '普通用户'}
    </div>
  );
}
