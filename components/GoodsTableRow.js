import PropTypes from 'prop-types';
import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Permission from '@/common/util/Permission';
import { calculatePrice } from "@/common/util/PriceCalculator";
import {dotsLimiter, afterDotsParser} from "../../../common/util/PriceCalculator";
import NumsDotsNullsRemover from "@/common/util/NumsDotsNullsRemover";
import ModalDialogButton from "@/components/DialogModal";

class GoodsTableRow extends React.PureComponent {
    static propTypes = {
        data: PropTypes.shape({

        }).isRequired,
        handleDeleteGood: PropTypes.func.isRequired,
        handleOpenGood: PropTypes.func.isRequired,
    };

    render() {
        const { data, handleDeleteGood, handleOpenGood } = this.props;
        const { status, discount } = data;
        const statusTitle = {
            sale: 'Sale',
            discount: 'Discount',
            default: '-',
        }[status];

        const colorText = {
            sale: '#B03A2E',
            discount: '#B03A2E',
            default: '#17202A',
        }[status];

        const statusValue = {
            sale: afterDotsParser(discount, 2) + " $",
            discount: afterDotsParser((discount*100), 2) + " % ",
            default: '#17202A',
        }[status];

        return (
            <TableRow
                hover
            >
                <TableCell style={{ cursor: 'pointer' }} onClick={handleOpenGood} padding="dense">{data.title}</TableCell>
                <TableCell padding="dense">{data.part_number}</TableCell>
                <TableCell style={{ textAlign: 'center', minWidth: '100px' }} padding="dense">{NumsDotsNullsRemover(data.price)} $</TableCell>
                <TableCell
                    style={{ color: colorText, maxWidth: '100px', textAlign: 'center' }}
                    padding="dense"
                >
                    {statusTitle}
                    {status != "default" && (
                        <span><hr style={{ margin: '0' }}/>{statusValue}</span>
                    )
                    }
                </TableCell>
                <TableCell
                    style={{ color: colorText, textAlign: 'center', minWidth: '100px' }}
                    padding="dense"
                >
                    {NumsDotsNullsRemover(calculatePrice(data))} $
                </TableCell>
                <Permission whoCant={['customer']}>
                    <TableCell style={{ color: colorText, textAlign: 'center', minWidth: '150px' }} padding="dense">
                        <div>
                            <Link to={`/app/goods/${data.id}/edit`}>
                                <IconButton aria-label="Edit" color="primary">
                                    <i className="zmdi zmdi-edit" />
                                </IconButton>
                            </Link>
                            <ModalDialogButton
                                iconButton
                                onClick={handleDeleteGood(data.id)}
                                aria-label="Delete"
                                color="secondary"
                            >
                                <i className="zmdi zmdi-delete" />
                            </ModalDialogButton>
                        </div>
                    </TableCell>
                </Permission>
            </TableRow>
        );
    }
}

export default GoodsTableRow;
