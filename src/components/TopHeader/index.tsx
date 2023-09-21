import React, { FC, useEffect } from 'react';
import { Button, Avatar, Dropdown } from 'antd';
import type { MenuProps } from 'antd';
import { history } from 'umi';
import { request } from 'umi';

type isTopHeader = Record<string, any>;

const TopHeader: FC<isTopHeader> = (props) => {
  const loginData = {
    url: '/apilogin/passport/index.php',
    appid: '6TkC2zS1Q238aXfTLEYy',
    secret: 'wklgM9HtPAzRy8Wza66B4WJT3lhsvJKoXNxL53t8Hj09ii8f64JKYjkT4Qxh',
  };

  useEffect(() => {
    const isLogin = JSON.parse(sessionStorage.getItem('isLogin') || 'false');
    const urlParams = new URLSearchParams(window.location.search);
    const loginPlatformState = localStorage.getItem('loginPlatformState');
    const loginPlatformStateparams = urlParams.get('state');
    const code = urlParams.get('code');
    if (isLogin) {
      return;
    }
    if (loginPlatformState !== loginPlatformStateparams) {
      history.push('/login');
      sessionStorage.setItem('isLogin', JSON.stringify(false));
      return;
    }
    request(
      `${loginData.url}?code=${code}&appid=${loginData.appid}&state=${loginPlatformState}`,
    )
      .then((res) => {
        const { email, state, token } = res;
        if (state !== loginPlatformState) {
          history.push('/login');
          sessionStorage.setItem('isLogin', JSON.stringify(false));
          return;
        }
        sessionStorage.setItem('isLogin', JSON.stringify(true));
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('token', token);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const Logout = () => {
    sessionStorage.setItem('isLogin', JSON.stringify(false));
    // 注销登录（接入一键登录的注销）
    // window.location.href = 'http://172.19.80.76:5090/passport/index.php?m=home&c=index&a=logout'
    history.push('/login');
  };

  const items: MenuProps['items'] = [
    {
      key: 1,
      label: (
        <Button type="link" onClick={Logout}>
          退出登录
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Dropdown menu={{ items }}>
        {sessionStorage.getItem('email') && (
          <Avatar
            style={{
              backgroundColor: 'blue',
              alignItems: 'center',
              lineHeight: '26px',
              fontSize: '20px',
            }}
            // icon={(sessionStorage.getItem('email') || '').substr(0, 1)}
            size="default"
          >
            <span>{(sessionStorage.getItem('email') || '').substr(0, 1)}</span>
          </Avatar>
        )}
      </Dropdown>
    </div>
  );
};

export default TopHeader;
