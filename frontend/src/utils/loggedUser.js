//* Get Logged User info from localStorage

export function getLoggedUserId() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.userId) {
    return user.userId;
  } else {
    // alert('로그인 필요');
    // alert('로그인 안된 사용자. 이 페이지에 접근불가');
  }
}

export function getLoggedUserInfo() {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  return user;
}
