import fetch from '../../helpers/fetch';

function clientMiddleware() {
  return ({dispatch, getState}) => {
    return next => action => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const { query, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!query) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      return fetch('/graphql', {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: query,
          }),
          credentials: 'include',
        }).then(resp => {
          if (resp.status !== 200) {
            throw new Error(resp.statusText);
          }
          return resp.json();
        }).then(({ data }) => {
          if (data.errors) {
            throw new Error(data.errors[0].message);
          } else {
            next({...rest, data: { ...data }, type: SUCCESS});
          }
        }).catch(err => {
          next({...rest, err, type: FAILURE});
        });
    };
  };
}

export default clientMiddleware();
