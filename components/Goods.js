import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ContainerHeader from '@/components/ContainerHeader';
import AlertCard from '@/components/AlertCard';
import CardBox from '@/components/CardBox';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import GoodsTable from './GoodsTable';
import Permission from '@/common/util/Permission';

import {
    fetchGoods,
    deleteGood,
} from '../actions';


class Goods extends React.Component {
    static propTypes = {
        fetchTime: PropTypes.number.isRequired,
        fetchError: PropTypes.bool.isRequired,
        fetchErrorMessage: PropTypes.string.isRequired,
        fetch: PropTypes.bool.isRequired,
        list: PropTypes.arrayOf(PropTypes.object).isRequired,
        emptyMessage: PropTypes.string.isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.node,
            }).isRequired,
        }).isRequired,
        fetchGoods: PropTypes.func.isRequired,
        deleteGood: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            limit: 20,
        };
    }
    componentWillMount() {
        this.props.fetchGoods(20);
    }
    componentWillUpdate(nextProps, nextState) {
        const { limit } = this.state;
        if (limit != nextState.limit) {
            this.props.fetchGoods(nextState.limit);
        }
    }
    updatePagination() {
        const { limit } = this.state;
        this.setState({
            limit: limit + 20,
        });
    }
    showAll() {
        this.props.fetchGoods();
    }
    handleDeleteGood = id => (e) => {
        e.stopPropagation();
        this.props.deleteGood(id);
    };
    render() {
        const {
            match, fetch, list, emptyMessage, fetchError, fetchErrorMessage, count,
        } = this.props;

        console.log('props', this.props);

        const body = list.length === 0 ? (
            <div className="row">
                <CardBox styleName="col-12">
                    <div className="col-12 justify-content-center d-flex">{emptyMessage}</div>
                </CardBox>
            </div>
        ) :
            <GoodsTable goodsList={list} handleDeleteGood={this.handleDeleteGood} />;

        const spinner = (
            <div className="col-12 justify-content-center d-flex">
                <CircularProgress color="secondary" size={50} />
            </div>);

        const showError = fetchError;
        const showBody = !fetchError;
        const showSpinner = (!list || list.length < 1) && fetch;

        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title="Goods" />
                <div className="animated slideInUpTiny animation-duration-3">
                    <Permission whoCant={['customer']}>
                        <Link to="/app/goods/create" style={{ textDecoration: 'none' }}>
                            <div className="row">
                                <div className="col-12 justify-content-center d-flex">
                                    <Button className="btn-block jr-btn" variant="raised" color="primary" aria-label="add">
                                        <i className="zmdi zmdi-account-add zmdi-hc-fw" />
                                        <span>Register new good</span>
                                    </Button>
                                </div>
                            </div>
                        </Link><br />
                    </Permission>
                    {showError &&
                        <div className="row">
                            <AlertCard message={fetchErrorMessage} />
                        </div>
                    }
                    {showBody && body}
                    {(list && list.length > 0 && (!count || (count != list.length))) &&
                        <span>
                            <Button onClick={this.updatePagination.bind(this)} className="btn-block jr-btn" variant="raised" color="primary" aria-label="add">
                                {
                                    fetch && <CircularProgress color="white" size={20} />
                                }
                                {
                                    !fetch && <span>Show next 20 goods</span>
                                }
                            </Button>
                            <Button onClick={this.showAll.bind(this)} className="btn-block jr-btn" variant="raised" color="primary" aria-label="add">
                                <span>Show all <span style={{ color: 'yellow' }}>{count}</span> goods</span>
                            </Button>
                        </span>
                    }

                    {showSpinner && spinner}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ goods }) => {
    const { storeListGoods, errorMessage } = goods;
    const {
        fetchTime, fetch, list, emptyMessage, fetchError, fetchErrorMessage, count,
    } = storeListGoods;
    return {
        errorMessage, fetchTime, fetch, list, emptyMessage, fetchError, fetchErrorMessage, count,
    };
};


export default connect(mapStateToProps, {
    fetchGoods,
    deleteGood,
})(Goods);
