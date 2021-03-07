import { mockStore } from '../../test/utils/mockStore';
import { USER_LOADED, USER_LOADING } from '../types/authTypes';
import { loadUser } from './authActions';
import axios from 'axios';
jest.mock('../../utils/tokenConfig');
jest.mock('axios');

describe('loadUser', () => {
  it('should get user with promise resolved', async () => {
    const store = mockStore();
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: {} })); // mock resolve success
    await store.dispatch(loadUser());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: USER_LOADING });
    expect(actions[1]).toEqual({ type: USER_LOADED, payload: {} });
  });

  fit('should receive failure notice when promise is rejected', async () => {
    const store = mockStore();
    axios.get.mockImplementationOnce(() => Promise.reject('Error')); // mock error
    await store.dispatch(loadUser());
    const actions = store.getActions();
    expect(actions[0]).toEqual({ type: USER_LOADING });
  });
});
