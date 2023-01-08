/* eslint-disable no-unused-vars */

import Auth from 'layouts/Auth'
import AuthAPI from 'services/api/auth.api'
import UserAPI from 'services/api/user.api'
import apiClient from 'services/axios'
import store from 'store'

export async function login(username, password) {
  const payload = {
    identifier: username,
    password,
  }

  return AuthAPI.login(payload)
    .then((response) => {
      if (response) {
        const { jwt } = response.data
        if (jwt) {
          store.set('accessToken', jwt)
        }
        return response.data
      }
      return false
    })
    .catch((error) => console.log(error))
}

export async function register(payload) {
  return AuthAPI.register(payload)
    .then((response) => {
      if (response) {
        return true
      }
      return false
    })
    .catch((error) => console.log(error))
}

export async function currentAccount() {
  return UserAPI.getCurrentUserInfo()
    .then((response) => {
      if (response) {
        return response.data
      }
      return false
    })
    .catch((error) => console.log(error))
}

export async function logout() {
  try {
    store.remove('accessToken')
    return true
  } catch (error) {
    return (err) => console.log(err)
  }
}
