
const loader = (loading: boolean) => {
  // 此处可以获取子应用是否加载成功,可以用来触发全局的loading
  console.log('loading', loading);
  return loading
};

export const Microconfig = [
  // {
  //   name: 'umi',
  //   entry: 'http://localhost:8001',
  //   container: '#subContainer',
  //   activeRule: '/',
  //   loader,
  // },
  {
    name: 'vue3',
    entry: 'http://localhost:8002',
    container: '#subContainer',
    activeRule: '/vue3',
    loader,
  },
  // {
  //   name: 'react',
  //   entry: 'http://localhost:8003',
  //   container: '#subContainer',
  //   activeRule: '/react',
  //   loader,
  // },
  // {
  //   name: 'umi',
  //   entry: 'http://localhost:8004',
  //   container: '#subContainer',
  //   activeRule: '/umi',
  //   loader,
  // },
  // {
  //   name: 'purehtml',
  //   entry: 'http://127.0.0.1:8005',
  //   container: '#subContainer',
  //   activeRule: '/purehtml',
  //   loader,
  // },
  // //angular
  // {
  //   name: 'angular',
  //   entry: 'http://127.0.0.1:8006',
  //   container: '#subContainer',
  //   activeRule: '/angular',
  //   loader,
  // },
];

// 请问在umi+qiankun的项目中，我再这定义了子应用，并且传入了loader函数，请问我想在主应用中加载子应用之前，显示为loading状态，请问我想实现，在加载子应用之前，显示为loading状态，请问我在主应用中如何获取loading状态并显示在页面中
