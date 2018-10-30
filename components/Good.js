import React from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { connect } from 'react-redux';
import CardBox from '@/components/CardBox';
import AlertCard from '@/components/AlertCard';
import ContainerHeader from '@/components/ContainerHeader';

import { calculatePrice } from "@/common/util/PriceCalculator";
import Permission from '@/common/util/Permission';
import {
    fetchGood,
    deleteGood,
} from '../actions';
import NumsDotsNullsRemover from "@/common/util/NumsDotsNullsRemover";

class Good extends React.Component {
    static propTypes = {
        storeItemGood: PropTypes.shape({
            data: PropTypes.object.isRequired,
            fetch: PropTypes.bool.isRequired,
            fetchError: PropTypes.bool.isRequired,
            fetchErrorMessage: PropTypes.string.isRequired,
        }).isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.node,
            }).isRequired,
        }).isRequired,
        fetchGood: PropTypes.func.isRequired,
        deleteGood: PropTypes.func.isRequired,
    };

    componentWillMount() {
        const { match } = this.props;
        const { id } = match.params;
        this.props.fetchGood(id);
    }

    getNormalDiscount() {
        const { data } = this.props.storeItemGood;
        const { status, discount } = data;
        switch (status) {
        case 'sale': {
            return parseFloat(discount, 10).toFixed(2);
        }
        case 'discount': {
            return `${(parseFloat(discount) * 100).toFixed(2)} %`;
        }
        default: {
            return '-';
        }
        }
    }

    handleDeleteGood = () => {
        const { storeItemGood } = this.props;
        const { data } = storeItemGood;
        this.props.deleteGood(data.id, true);
    };

    render() {
        const { match, storeItemGood, authUser } = this.props;
        const {
            fetch, data, fetchError, fetchErrorMessage,
        } = storeItemGood;
        const { id } = match.params;

        const showError = fetchError;
        const showGood = !fetchError && !fetch && (storeItemGood.data.id === parseInt(id, 10));
        const showSpinner = !fetchError && fetch;

        const { status } = data;
        const statusTitle = {
            sale: 'Sale',
            discount: 'Discount',
            default: '-',
        }[status];

        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={`GOOD ID#${id}`} />
                <div className="animated slideInUpTiny animation-duration-3">
                    {showError &&
                        <div className="row">
                            <AlertCard message={fetchErrorMessage} />
                        </div>
                    }
                    {showGood &&
                        <div className="row">
                            <CardBox styleName="col-12" cardStyle="p-0">
                                <div>
                                    <div className="table-responsive-material">
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell>Good ID</TableCell>
                                                    <TableCell>{data.id}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Title</TableCell>
                                                    <TableCell>{data.title}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Part number</TableCell>
                                                    <TableCell>{data.part_number}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>SKU</TableCell>
                                                    <TableCell>{data.sku}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Type title</TableCell>
                                                    <TableCell>
                                                        {data.type.title}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Type note</TableCell>
                                                    <TableCell>
                                                        {data.type.note}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Category title</TableCell>
                                                    <TableCell>
                                                        {data.category.title}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Category note</TableCell>
                                                    <TableCell>
                                                        {data.category.note}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Status</TableCell>
                                                    <TableCell>{statusTitle}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Price</TableCell>
                                                    <TableCell>{NumsDotsNullsRemover(data.price)} $</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Discount</TableCell>
                                                    <TableCell>
                                                        {NumsDotsNullsRemover(this.getNormalDiscount())}
                                                        {(data.status && data.status == 'sale') &&
                                                            <span> $</span>
                                                        }
                                                        {(data.status && data.status == 'discount') &&
                                                        <span> %</span>
                                                        }
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>New price</TableCell>
                                                    <TableCell>{NumsDotsNullsRemover(calculatePrice(data))} $</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </div>
                                    <Permission whoCant={['customer']}>
                                        {!authUser.is_moderator &&
                                        <div style={{ marginTop: '20px', marginLeft: '20px' }}>
                                            <div className="jr-btn-group d-flex align-items-center flex-wrap">
                                                <Link to={`/app/goods/${data.id}/edit`}>
                                                    <Button variant="raised" color="primary" className="jr-btn">
                                                        Edit
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="raised"
                                                    className="jr-btn bg-red text-white"
                                                    onClick={this.handleDeleteGood}
                                                >
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                        }
                                    </Permission>
                                </div>
                            </CardBox>
                        </div>
                    }
                    {showSpinner &&
                        <div className="col-12 justify-content-center d-flex">
                            <CircularProgress color="secondary" size={50} />
                        </div>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ goods, auth }) => {
    const { storeItemGood } = goods;
    const { authUser } = auth;
    return { storeItemGood, authUser };
};


export default connect(mapStateToProps, {
    fetchGood,
    deleteGood,
})(Good);
