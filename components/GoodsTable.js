import PropTypes from 'prop-types';
import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import CardBox from '@/components/CardBox';
import { Redirect } from 'react-router-dom';
import GoodsTableRow from './GoodsTableRow';
import Permission from '@/common/util/Permission';

class GoodsTable extends React.PureComponent {
    static propTypes = {
        handleDeleteGood: PropTypes.func.isRequired,
        goodsList: PropTypes.arrayOf(PropTypes.object).isRequired,
    };

    state = {
        redirect: false,
        id: NaN,
    };

    handleOpenGood = id => (e) => {
        e.preventDefault();
        this.setState({ redirect: true, id });
    };

    render() {
        const { goodsList, handleDeleteGood } = this.props;
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect push to={`/app/goods/${this.state.id}`} />;
        }

        return (
            <div className="row">
                <CardBox styleName="col-12" cardStyle="p-0">
                    <div className="table-responsive-material">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="dense">Title</TableCell>
                                    <TableCell padding="dense">Part number</TableCell>
                                    <TableCell style={{ textAlign: 'center' }} padding="dense">Basic price</TableCell>
                                    <TableCell style={{ textAlign: 'center' }} padding="dense">Status</TableCell>
                                    <TableCell style={{ textAlign: 'center' }} padding="dense">New price</TableCell>
                                    <Permission whoCant={['customer']}>
                                        <TableCell style={{ textAlign: 'center' }} padding="dense">Action</TableCell>
                                    </Permission>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {goodsList.map(good => (
                                    <GoodsTableRow
                                        key={good.id}
                                        data={good}
                                        handleDeleteGood={handleDeleteGood}
                                        handleOpenGood={this.handleOpenGood(good.id)}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardBox>
            </div>
        );
    }
}

export default GoodsTable;
