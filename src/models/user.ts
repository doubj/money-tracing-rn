import storage, { load } from "@/config/storage";
import axios from "axios";
import { Effect, Model } from "dva-core-ts";
import { Reducer } from 'redux';
import { navigate } from "../utils";

export interface IProfile {
  nickName: string,
  avatar: string
}

export interface UserState {
  profile: IProfile
}

interface UserModel extends Model {
  namespace: 'user';
  state: UserState;
  reducers: {
    setState: Reducer<UserState>
  },
  effects: {
    login: Effect,
    logout: Effect,
    checkLogin: Effect
  }
}

const initialState: UserState = {
  profile: {
    nickName: '',
    avatar: ''
  }
}

const userModel: UserModel = {
  namespace: 'user',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  },
  effects: {
    *login({payload}, {call, put}) {
      const result = yield call(axios.post, "/user/login", payload)
      axios.interceptors.request.use(
        config => {
          config.headers.Authorization = `Bearer ${result.token}`
          return config
        },
        error => {
          return Promise.reject(error)
        }
      )
      yield put({
        type: "setState",
        payload: {
          profile: result.profile
        }
      })
      storage.save({key: "user", data: payload})
      navigate("ButtonTabs")
    },
    *logout(_, {put}) {
      storage.save({key: "user", data: null})
      yield put({
        type: "setState",
        payload: {
          profile: {nickName: '', avatar: ''}
        }
      })
      navigate("Login")
    },
    *checkLogin(_, {call, put}) {
      try {
        const user = yield call(load, {key: 'user'});
        if(user) {
          yield put({
            type: 'login',
            payload: user
          })
        }
      } catch(e) {
        console.log('no key user')
      }
    }
  }
}

export default userModel