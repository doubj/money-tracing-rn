import storage, { load } from "@/config/storage";
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
    login: Effect,
    checkLogin: Effect
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
      console.log(payload)
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
      storage.save({key: "user", data: payload})
      navigate("ButtonTabs")
    },
    *checkLogin(_, {call, put}) {
      const user = yield call(load, {key: 'user'});
      if(user) {
        yield put({
          type: 'login',
          payload: user
        })
      }
    }
  }
}

export default userModel