import { NotificationContainer } from 'react-notifications';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import ContainerHeader from '@/components/ContainerHeader';
import CardBox from '@/components/CardBox';
import AlertCard from '@/components/AlertCard';
import handleErrorObject from '@/common/util/handleErrorObject';
import Type from './Type';
import Category from './Category';
import SelectUsers from './SelectUsers';

import {
    fetchGood,
    editGood,
    fetchCategories,
    fetchTypes,
    createGood,
    hideErrorMessageEditCreateDelete,
} from '../actions';

import { fetchUsers } from '../../Users/actions';
import {afterDotsParser, calculatePrice, dotsLimiter} from "@/common/util/PriceCalculator";
import NumsDotsNullsRemover from "@/common/util/NumsDotsNullsRemover";

class Form extends React.Component {
    static propTypes = {
        localStore: PropTypes.shape({
            title: PropTypes.string,
            type: PropTypes.shape({
                id: PropTypes.number,
            }),
            part_number: PropTypes.string,
            sku: PropTypes.string,
            price: PropTypes.string,
            category: PropTypes.shape({
                id: PropTypes.number,
            }),
            status: PropTypes.string,
        }).isRequired,
        listTypes: PropTypes.arrayOf(PropTypes.object).isRequired,
        listCategories: PropTypes.arrayOf(PropTypes.object).isRequired,
        buttonName: PropTypes.oneOf(['Create', 'Save']).isRequired,
        actionHandle: PropTypes.func.isRequired,
    };


    constructor(props) {
        super(props);
        const { localStore } = props;
        const { type, category } = localStore;
        this.state = {
            title: localStore.title || '',
            type: {
                id: (type && type.id) || '',
            },
            part_number: localStore.part_number || '',
            sku: localStore.sku || '',
            price: NumsDotsNullsRemover(localStore.price) || '',
            category: {
                id: (category && category.id) || '',
            },
            status: localStore.status || 'default',
            discount: NumsDotsNullsRemover(localStore.discount) || null,
            users: localStore.users || [],
        };
    }

    handleChangeById = name => (event) => {
        this.setState({
            [name]: { id: event.target.value },
        });
    };

    handleChange = name => (event) => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleChangeStatus = (event) => {
        this.setState({
            status: event.target.value,
            discount: null,
        });
    };

    handleChangeDiscount = (e) => {
        const { data } = this.props;
        if (e.target.value === '') {
            this.setState({
                discount: 0,
            });
            return;
        }
        const newValue = e.target.value;
        const newStatus = this.state.status;
        const stringedDiscount = newValue.toString();
        const digitsAfterDotsLength = stringedDiscount.indexOf('.') > 0 && stringedDiscount.split('.') && stringedDiscount.split('.').length > 1 && stringedDiscount.split('.')[1] && stringedDiscount.split('.')[1].length
        if (digitsAfterDotsLength > 2) {
            e.target.value = e.target.value.slice(0, -1)
            return
        }
        if (newStatus === 'discount') {
            if (e.target.value == 0) {
                this.setState({
                    discount: dotsLimiter('0', 2),
                });
                return;
            }
            let parsedDiscount = (newValue/100).toFixed(4).toString();
            const afterDotNums = parsedDiscount.indexOf('.') > 0 && parsedDiscount.split('.') && parsedDiscount.split('.').length > 1 && parsedDiscount.split('.')[1] && parsedDiscount.split('.')[1].length;
            console.warn(afterDotNums, parsedDiscount)
            if (afterDotNums > 4) {
                parsedDiscount = parsedDiscount.slice(0, -(afterDotNums - 4));
            }
            this.setState({
                discount: afterDotsParser(parsedDiscount, 4),
            });
        } else if (newStatus === 'sale') {
            this.setState({
                discount: dotsLimiter(newValue, 2),
            });
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.actionHandle(this.state);
    };

    handleUsersChange = type => (list) => {
        this.setState({ [type]: list });
    };

    render() {
        console.log(this.state)
        const { buttonName, listTypes, listCategories, usersList } = this.props;
        const htmlListTypes = listTypes.map(type => (
            <MenuItem key={type.id} value={type.id}>
                {type.title}
            </MenuItem>
        ));

        const htmlListCategories = listCategories.map(category => (
            <MenuItem key={category.id} value={category.id}>
                {category.title}
            </MenuItem>
        ));

        const ITEM_HEIGHT = 48;
        const ITEM_PADDING_TOP = 8;
        const MenuProps = {
            PaperProps: {
                style: {
                    maxHeight: (ITEM_HEIGHT * 5) + ITEM_PADDING_TOP,
                    width: 250,
                },
            },
        };

        const showSaleField = this.state.status === 'sale';
        const showDiscountField = this.state.status === 'discount';
        return (
            <form className="row" noValidate autoComplete="off">
                <div className="col-md-6 col-12">
                    <TextField
                        required
                        label="Title"
                        value={this.state.title}
                        onChange={this.handleChange('title')}
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div className="col-md-6 col-12">
                    <TextField
                        required
                        label="Part Number"
                        value={this.state.part_number}
                        onChange={this.handleChange('part_number')}
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div className="col-md-6 col-12">
                    <TextField
                        label="SKU"
                        value={this.state.sku}
                        onChange={this.handleChange('sku')}
                        margin="normal"
                        fullWidth
                    />
                </div>
                <div className="col-md-6 col-12">
                    <SelectUsers dataList={usersList.list} selectedList={this.state.users} handleChange={this.handleUsersChange('users')} />
                </div>
                <div className="col-md-6 col-12">
                    <FormControl
                        className="w-100 mb-2"
                        margin="normal"
                        required
                    >
                        <InputLabel htmlFor="category-field">Category</InputLabel>
                        <Select
                            value={this.state.category.id}
                            onChange={this.handleChangeById('category')}
                            input={<Input id="category-field" />}
                            MenuProps={MenuProps}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {htmlListCategories}
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-6 col-12">
                    <FormControl
                        className="w-100 mb-2"
                        margin="normal"
                        required
                    >
                        <InputLabel htmlFor="type-field">Type</InputLabel>
                        <Select
                            value={this.state.type.id}
                            onChange={this.handleChangeById('type')}
                            input={<Input id="type-field" />}
                            MenuProps={MenuProps}
                        >
                            <MenuItem value=""><em>None</em></MenuItem>
                            {htmlListTypes}
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-6 col-12">
                    <FormControl
                        className="w-100 mb-2"
                        margin="normal"
                    >
                        <InputLabel htmlFor="age-simple">Status</InputLabel>
                        <Select
                            value={this.state.status === 'default' ? '' : this.state.status}
                            onChange={this.handleChangeStatus}
                            input={<Input />}
                            MenuProps={MenuProps}
                        >
                            <MenuItem value="default"><em>None</em></MenuItem>
                            <MenuItem value="discount"><em>Discount</em></MenuItem>
                            <MenuItem value="sale"><em>Sale</em></MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="col-md-6 col-12">
                    <TextField
                        required
                        label="Price"
                        value={this.state.price}
                        onChange={this.handleChange('price')}
                        margin="normal"
                        type="number"
                        fullWidth
                    />
                </div>
                {showSaleField &&
                    <div className="col-md-6 col-12">
                        <TextField
                            required
                            label="Sale"
                            value={this.state.discount || ''}
                            onChange={this.handleChange('discount')}
                            margin="normal"
                            type="number"
                            fullWidth
                        />
                    </div>
                }
                {showDiscountField &&
                    <div className="col-md-6 col-12">
                        <TextField
                            required
                            label="Discount - %"
                            value={this.state.discount ? afterDotsParser((this.state.discount * 100), 2) : ''}
                            onChange={this.handleChangeDiscount}
                            margin="normal"
                            fullWidth
                            inputProps={{ maxLength: 2 }}
                            onInput = {(e) =>{
                                const re = /^[0-9\b]+$/;
                                if (e.target.value == '' || re.test(e.target.value)) {
                                    e.target.value = parseInt(e.target.value);
                                } else {
                                    e.target.value = afterDotsParser((this.state.discount * 100), 2);
                                }
                            }}
                        />
                    </div>
                }
                {!!this.state.discount &&
                <div className="col-md-6 col-12">
                    <TextField
                        disabled
                        label="Price with discount"
                        value={NumsDotsNullsRemover(calculatePrice(this.state)) || ''}
                        onChange={this.handleChangeDiscount}
                        margin="normal"
                        type="number"
                        fullWidth
                    />
                </div>
                }
                <div className="col-12">
                    <div className="jr-btn-group d-flex align-items-center flex-wrap" style={{ marginTop: '5px' }}>
                        <Button variant="raised" className="jr-btn bg-green text-white" onClick={this.handleSubmit}>
                            {buttonName}
                        </Button>
                        <Type />
                        <Category />
                    </div>
                </div>
            </form>
        );
    }
}

class GoodEditCreate extends React.PureComponent {
    static propTypes = {
        showErrorMessage: PropTypes.bool.isRequired,
        type: PropTypes.oneOf(['edit', 'create']).isRequired,
        fetchCategories: PropTypes.func.isRequired,
        fetchTypes: PropTypes.func.isRequired,
        createGood: PropTypes.func.isRequired,
        fetchGood: PropTypes.func.isRequired,
        editGood: PropTypes.func.isRequired,
        hideErrorMessageEditCreateDelete: PropTypes.func.isRequired,
        storeItemGood: PropTypes.shape({
            fetch: PropTypes.bool.isRequired,
            data: PropTypes.object.isRequired,
            fetchError: PropTypes.bool.isRequired,
            fetchErrorMessage: PropTypes.string.isRequired,
        }).isRequired,
        storeListTypes: PropTypes.shape({
            fetch: PropTypes.bool.isRequired,
            list: PropTypes.arrayOf(PropTypes.object).isRequired,
            fetchError: PropTypes.bool.isRequired,
            fetchErrorMessage: PropTypes.string.isRequired,
        }).isRequired,
        storeListCategories: PropTypes.shape({
            fetch: PropTypes.bool.isRequired,
            list: PropTypes.arrayOf(PropTypes.object).isRequired,
            fetchError: PropTypes.bool.isRequired,
            fetchErrorMessage: PropTypes.string.isRequired,
        }).isRequired,
        match: PropTypes.shape({
            params: PropTypes.shape({
                id: PropTypes.node,
            }).isRequired,
        }).isRequired,
        errorObject: PropTypes.shape({
            response: PropTypes.object,
        }),
    };

    static defaultProps = {
        errorObject: null,
    };

    componentWillMount() {
        const {
            type, match, storeListTypes, storeListCategories,
        } = this.props;
        const { id } = match.params;
        const currentTime = new Date().getTime();
        const deltaCategoryTime = currentTime - storeListCategories.fetchTime;
        const deltaTypeTime = currentTime - storeListTypes.fetchTime;

        if (storeListCategories.fetchError || deltaCategoryTime > 90000) {
            this.props.fetchCategories();
        }

        if (storeListTypes.fetchError || deltaTypeTime > 90000) {
            this.props.fetchTypes();
        }

        if (type === 'edit') {
            this.props.fetchGood(id);
        }

        this.props.fetchUsers();
    }

    componentDidUpdate() {
        if (this.props.showErrorMessage) {
            setTimeout(() => {
                this.props.hideErrorMessageEditCreateDelete();
            }, 50);
        }
    }

    handleCreateGood = (good) => {
        this.props.createGood(good);
    };

    handleEditGood = (good) => {
        const { id } = this.props.match.params;
        this.props.editGood(id, good);
    };

    render() {
        const {
            storeListTypes,
            storeListCategories,
            match,
            showErrorMessage,
            errorObject,
            type,
            storeItemGood,
            usersList,
        } = this.props;
        const { id } = match.params;

        const fetchAll = (
            !storeListTypes.fetch &&
            !storeListCategories.fetch &&
            !storeItemGood.fetch
        );

        const error = (
            ((type === 'edit') && storeItemGood.fetchError)
            || storeListCategories.fetchError
            || storeListTypes.fetchError
        );

        const errorMessageAll = [];
        if ((type === 'edit') && storeItemGood.fetchError) {
            errorMessageAll.push(`~Error good - ${storeItemGood.fetchErrorMessage}~`);
        }

        if (storeListCategories.fetchError) {
            errorMessageAll.push(`~Error category - ${storeListCategories.fetchErrorMessage}~`);
        }

        if (storeListTypes.fetchError) {
            errorMessageAll.push(`~Error type - ${storeListTypes.fetchErrorMessage}~`);
        }

        const showError = error;
        const showForm = !error && fetchAll &&
            (((type === 'edit') && (storeItemGood.data.id === parseInt(id, 10))) ||
                (type === 'create'));
        const showSpinner = !error && !fetchAll;

        const buttonName = type === 'edit' ? 'Save' : 'Create';
        const actionHandle = type === 'edit' ? this.handleEditGood : this.handleCreateGood;
        const containerHeaderTitle = type === 'edit' ? 'Good EDIT' : 'Good CREATE';
        const localStore = type === 'edit' ? storeItemGood.data : {};

        return (
            <div className="app-wrapper">
                <ContainerHeader match={match} title={containerHeaderTitle} />
                {showError &&
                    <div className="row">
                        <AlertCard message={errorMessageAll.join(' ')} />
                    </div>
                }
                {showForm &&
                    <div className="row">
                        <CardBox styleName="col-12">
                            <Form
                                buttonName={buttonName}
                                actionHandle={actionHandle}
                                listTypes={storeListTypes.list}
                                listCategories={storeListCategories.list}
                                localStore={localStore}
                                usersList={usersList}
                            />
                        </CardBox>
                    </div>
                }
                {showSpinner &&
                    <div className="col-12 justify-content-center d-flex">
                        <CircularProgress color="secondary" size={50} />
                    </div>
                }
                {showErrorMessage && handleErrorObject(errorObject)}
                <NotificationContainer />
            </div>
        );
    }
}

const mapStateToProps = ({ goods, users }) => {
    const {
        storeItemGood, storeListTypes, storeListCategories, showErrorMessage, errorObject,
    } = goods;
    const { usersList } = users;
    return {
        storeItemGood, storeListTypes, storeListCategories, showErrorMessage, errorObject, usersList,
    };
};


export default connect(mapStateToProps, {
    fetchGood,
    editGood,
    fetchCategories,
    fetchTypes,
    createGood,
    hideErrorMessageEditCreateDelete,
    fetchUsers,
})(GoodEditCreate);
