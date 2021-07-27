import axios from "axios";
import { Effect, Model } from "dva-core-ts";
import { Reducer } from 'redux';
import { navigate } from "../utils";

export interface IUser {
  userName: string,
  password: string
}

export interface UserState {
  user: IUser
}

interface UserModel extends Model {
  namespace: 'user';
  state: UserState;
  reducers: {
    setState: Reducer<UserState>
  },
  effects: {
    login: Effect
  }
}

const initialState: UserState = {
  user: {
    userName: '',
    password: ''
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
      navigate("ButtonTabs")
    }
  }
}

export default userModel