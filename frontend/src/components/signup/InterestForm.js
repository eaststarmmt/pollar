import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { signup } from '../../services/api/AuthApi'
// import { user } from './Index'
import { Navigate, useNavigate } from 'react-router-dom';
function InterestForm(props) {


  const { setNext, user, setUser } = props
  const[message, setMessage] = useState('')
  const navigate = useNavigate()
  
  
  const handleSignup = async (e) => {
    e.preventDefault();
    
    try{
      const result = await signup(user);
      console.log(result.message)
      if(result.message=="success") {
        navigate('/login')
      } else {
        setMessage('회원가입 실패 ')
      }
    } catch (error) {
      setMessage('회원가입 성공')
    }
  }


  return (
    <div>
      interestForm
      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={() => setNext(false)}
      >
        이전
      </Button>
      <Button
        fullWidth
        size="large"
        variant="contained"
        onClick={handleSignup}
      >
        회원가입
      </Button>
      {message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {message}
                </div>
              </div>

  )}
  </div>
  )
}

export default InterestForm;
