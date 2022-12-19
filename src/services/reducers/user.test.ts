import {
    getUserInfoReducer as reducer,
    initialState as state
} from './user';
import { getUserSuccess, patchUserSuccess } from '../actions/user';
import { payload, payload2, user } from '../../utils/test-constants';

describe('profile reducer test', () => {

    it('should handle get user info', () => {
        expect(reducer(state, getUserSuccess(payload)))
            .toEqual({
                success: true,
                user: payload.user
            })
    })

    it('should handle update user info', () => {
        expect(reducer({ ...state, user: user }, patchUserSuccess(payload2)))
            .toEqual({
                ...state,
                success: true,
                user: payload2.user
            })
    })
})
