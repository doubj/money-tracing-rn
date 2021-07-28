import axios from 'axios';
import {Effect, Model} from 'dva-core-ts';
import {Reducer} from 'redux';
import {ITransaction} from './transaction';
import dayjs from 'dayjs';
import {RootState} from '.';

export interface ITemplate extends ITransaction {
  remark?: string;
}

export interface TemplateState {
  templates: ITemplate[];
}

interface TemplateModel extends Model {
  namespace: 'template';
  state: TemplateState;
  reducers: {
    setState: Reducer<TemplateState>;
  };
  effects: {
    fetchTemplates: Effect;
    transfer: Effect;
    deleteTemplate: Effect;
    createTemplate: Effect;
    updateTemplate: Effect;
  };
}

const initialState: TemplateState = {
  templates: [],
};

const TEMPLATE_URL = '/template';

const templateModel: TemplateModel = {
  namespace: 'template',
  state: initialState,
  reducers: {
    setState(state = initialState, {payload}) {
      return {
        ...state,
        ...payload,
      };
    },
  },
  effects: {
    *fetchTemplates({cb}, {call, put}) {
      const result = yield call(axios.get, TEMPLATE_URL);
      yield put({
        type: 'setState',
        payload: {
          templates: result.list,
        },
      });
      if (cb && typeof cb === 'function') {
        cb();
      }
    },
    *transfer({payload, success}, {call, select}) {
      if (payload) {
        const timestamp = new Date().getTime();
        const date = dayjs().format('YYYY-MM-DD');
        const record = {...payload, timestamp, date, id: undefined};
        delete record.remark;
        const result = yield call(axios.post, '/record', record);
        const {transactions} = yield select((state: RootState) => state.transaction);
        if (transactions && transactions.length > 0) {
          transactions.unshift(result)
        }
        if (success && typeof success === 'function') {
          success();
        }
      }
    },
    *deleteTemplate({payload, success}, {call, select}) {
      if (payload && payload.id) {
        yield call(axios.delete, `${TEMPLATE_URL}/${payload.id}`);
        const {templates} = yield select((state: RootState) => state.template);
        if (templates && templates.length > 0) {
          const idx = templates.findIndex((item: ITemplate) => item.id === payload.id)
          templates.splice(idx, 1)
        }
        if (success && typeof success === 'function') {
          success();
        }
      }
    },
    *createTemplate({payload, success, fail}, {call, select}) {
      const result = yield call(axios.post, TEMPLATE_URL, payload);
      if (result) {
        const {templates} = yield select((state: RootState) => state.template);
        if (templates && templates.length > 0) {
          templates.unshift(result)
        }
        success();
      } else {
        fail();
      }
    },
    *updateTemplate({payload, success}, {call, select}) {
      yield call(axios.put, `${TEMPLATE_URL}/${payload.id}`, payload);
      const {templates} = yield select((state: RootState) => state.template);
      if (templates && templates.length > 0) {
        const idx = templates.findIndex((item: ITemplate) => item.id === payload.id)
        templates[idx] = {...templates[idx], ...payload}
      }
      success();
    },
  },
};

export default templateModel;
