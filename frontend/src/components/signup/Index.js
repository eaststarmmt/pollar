import React, { useState } from 'react';

import SignupForm from './SignupForm';
import InterestForm from './InterestForm';

// 얘가 가장 상위 컴포넌트
function Index() {
  const [next, setNext] = useState(false);
  // component 상속을 통해 setNext를 사용할 수 있고,
  // setNext를 통해 하위에 있는 SignupForm에서 setNext를 사용하여 next데이터를 변경
  const [user, setUser] = useState({
    userId: '',
    password: '',
    userNickkname: '',
    userEmail: '',
    userBirthday: '',
    userSex: true,
    categories: [],
    userProfilePhoto:'',
  });

  return (
    <>
      {next ? (
        <InterestForm setNext={setNext} setUser={setUser} user={user}/>
      ) : (
        <SignupForm setNext={setNext} setUser={setUser} user={user} />
      )}
    </>
  );
}

export default Index;
