import asyncComponent from 'modules/common/components/AsyncComponent';
import queryString from 'query-string';
import React from 'react';
import { Route } from 'react-router-dom';

const UserList = asyncComponent(() =>
  import('./containers/UserList')
);


const UserListView = ({ location, history }) => {
  return (
    <UserList
      history={history}
      queryParams={queryString.parse(location.search)}
    />
  );
};


const routes = () => {
  return (
    <>
      <Route
        key="/uselist"
        exact={true}
        path="/userlist"
        component={UserListView}
      />
    </>
  );
};

export default routes;
