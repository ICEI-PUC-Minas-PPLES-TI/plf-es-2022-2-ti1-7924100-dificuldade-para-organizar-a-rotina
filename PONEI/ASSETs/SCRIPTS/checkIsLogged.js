const loginLi = document.getElementById('li-login');

const checkIsLogged = () => {
  const currentUser = sessionStorage.getItem('usuarioCorrente');

  console.log(currentUser);

  if (currentUser) {
    console.log('entrei');
    loginLi.textContent = 'LOGOUT';
    return loginLi.addEventListener('click', () => sessionStorage.removeItem('usuarioCorrente'));
  };

  return loginLi.textConten = 'LOGIN';
};

document.body.onload = () => {
  checkIsLogged();
};