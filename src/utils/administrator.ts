const admin = ['panan@myhexin.com', 'tongbin@myhexin.com'];

const isAdministrator = (email: string) => {
  return admin.includes(email);
};

export default isAdministrator;
