import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return intial state when the action is unknown', () => {
        expect(reducer(undefined, {})).toEqual({
            idToken: null,
            userId: null,
            error: null,
            loading: false
        });
    });

    it('should store token upon login', () => {
        expect(reducer({
            idToken: null,
            userId: null,
            error: null,
            loading: false
        }, {
            type: actionTypes.AUTH_SUCCESS,
            idToken: 'some-token',
            userId: 'some-user-id'
        } )).toEqual({
            idToken: 'some-token',
            userId: 'some-user-id',
            error: null,
            loading: false
        });
    });
});