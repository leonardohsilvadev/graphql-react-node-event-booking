import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { useLazyQuery, useMutation } from '@apollo/client'
import { LOGIN, CREATE_USER } from '../../querys'
import AuthContext from '../../context/authContext'
import { required } from '../../validators/validators'

import "./styles.css"

export default function Auth() {
  // * DECLARATIONS
  const [isLogin, setIsLogin] = useState(true)
  const context = useContext(AuthContext)
  const [login, user] = useLazyQuery(LOGIN)
  const [signup, newUser] = useMutation(CREATE_USER)
  const { register, handleSubmit, formState: { errors } } = useForm()

  user.data?.login && context.login(user.data?.login?.token, user.data?.login?.userId)

  // * FUNCTIONS
  const onSignup = ({ email, password }) => signup({ variables: { email, password } })
  const onLogin = ({ email, password }) => login({ variables: { email, password } })
  const onChangeMode = () => setIsLogin(!isLogin)

  return (
    <form className="auth-form" onSubmit={handleSubmit(isLogin ? onLogin : onSignup)}>
      <label>{isLogin ? 'Login' : 'Signup'}</label>

      <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input type="email" {...register('email', { required })} />
        {errors.email && errors.email.message && <label class="error-label">{errors.email.message}</label>}
      </div>

      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" {...register('password', { required })} />
        {errors.password && errors.password.message && <label class="error-label">{errors.password.message}</label>}
      </div>

      <div className="form-actions">
        <button className="btn" type="submit">Login</button>
        <button className="btn" type="button" onClick={onChangeMode}>Switch to {isLogin ? 'Signup' : 'Login'}</button>
      </div>
    </form>
  );
}
