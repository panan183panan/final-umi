import React, { useEffect } from 'react';
import isAdministrator from '@/utils/administrator';
export default function IndexPage() {
  return (
    <div>
      欢迎您，
      {isAdministrator(sessionStorage.getItem('email') || '')
        ? '管理员'
        : '普通用户'}
    </div>
  );
}
