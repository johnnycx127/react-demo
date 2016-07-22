import React from 'react';
import {IndexRoute, Route, NonPropertyView} from 'react-router';
import {
    App,
    Home,
    NotFound,
    Forms,
    Auth
  } from 'containers';

export default (store) => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={Home}/>
      {/* Form Demo route */}
      <Route path="forms">
        <IndexRoute component={NonPropertyView} />
        <Route path="inputinline" component={Forms.InputInline} />
        <Route path="simple" component={Forms.Simple} />
        <Route path="control" component={Forms.Control} />
        <Route path="inputgroup" component={Forms.InputGroup} />
        <Route path="otherinput" component={Forms.OtherInput} />
        <Route path="validatetag" component={Forms.ValidateTag} />
        <Route path="searchinput" component={Forms.SearchInput} />
        <Route path="validate" component={Forms.Validate} />
        <Route path="customvalidate" component={Forms.CustomValidate} />
        <Route path="modal" component={Forms.Modal} />
        <Route path="dynamicadd" component={Forms.DynamicAdd} />
      </Route>
      <Route path="auth">
        <IndexRoute component={NonPropertyView} />
        <Route path="signup" component={Auth.Signup} />
        <Route path="login" component={Auth.Login} />
      </Route>
      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
