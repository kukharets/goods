import { Switch, Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Goods from './Goods';
import Good from './Good';
import GoodEditCreate from './GoodEditCreate';

const GoodsRoute = ({ match }) => (
    <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/list`} />
        <Route path={`${match.url}/list`} component={Goods} />
        <Route
            path={`${match.url}/create`}
            render={props => <GoodEditCreate {...props} type="create" />}
        />
        <Route
            path={`${match.url}/:id/edit`}
            render={props => <GoodEditCreate {...props} type="edit" />}
        />
        <Route path={`${match.url}/:id`} component={Good} />
    </Switch>
);

GoodsRoute.propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({
            id: PropTypes.node,
        }).isRequired,
    }).isRequired,
};


export default GoodsRoute;
