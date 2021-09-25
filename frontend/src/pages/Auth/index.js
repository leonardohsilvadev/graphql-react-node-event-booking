import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLazyQuery, useMutation } from '@apollo/client'
import { LOGIN, CREATE_USER } from '../../querys'
import "./styles.css"

export default function Auth() {
  const [isLogin, setIsLogin] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [login, { loading, error, data }] = useLazyQuery(LOGIN)
  const [signup, user] = useMutation(CREATE_USER)

  console.log('data: ', data)
  console.log('error: ', error)

  console.log('data user: ', user.data)
  console.log('error user: ', user.error)

  const onSignup = ({ email, password }) => {
    signup({ variables: { email, password } })

    // const body = {
    //   query: `
    //     mutation {
    //       createUser(userInput: { email: "${email}", password: "${password}" }) {
    //         _id
    //         email
    //       }
    //     }
    //   `
    // }

    // fetch('http://localhost:4000/graphql', {
    //   method: 'POST',
    //   body: JSON.stringify(body),
    //   headers : {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(res => res.status === 200 && res.json())
    // .then(data => console.log('data: ', data))
    // .catch(err => console.log('err:', err))
  }

  const onLogin = ({ email, password }) => {
    login({ variables: { email, password } })

    // const body = {
    //   query: `
    //     query {
    //       login(email: "${email}", password: "${password}") {
    //         userId
    //         token
    //         tokenExpiration
    //       }
    //     }
    //   `
    // }

    // fetch('http://localhost:4000/graphql', {
    //   method: 'POST',
    //   body: JSON.stringify(body),
    //   headers : {
    //     'Content-Type': 'application/json'
    //   }
    // })
    // .then(res => res.status === 200 && res.json())
    // .then(data => console.log('data: ', data))
    // .catch(err => console.log('err:', err))
  }

  const onChangeMode = () => setIsLogin(!isLogin)

  return (
    <form className="auth-form" onSubmit={handleSubmit(isLogin ? onLogin : onSignup)}>
      <label>{isLogin ? 'Login' : 'Signup'}</label>

      <div className="form-control">
        <label htmlFor="email">E-mail</label>
        <input type="email" {...register('email', { required: { value: true, message: 'This field is required' } })} />
        {errors.email && errors.email.message && <label style={{ color: 'red' }}>{errors.email.message}</label>}
      </div>

      <div className="form-control">
        <label htmlFor="password">Password</label>
        <input type="password" {...register('password', { required: { value: true, message: 'This field is required' } })} />
        {errors.password && errors.password.message && <label style={{ color: 'red' }}>{errors.password.message}</label>}
      </div>

      <div className="form-actions">
        <button type="submit">Login</button>
        <button type="button" onClick={onChangeMode}>Switch to {isLogin ? 'Signup' : 'Login'}</button>
      </div>
    </form>
  );
}
