import React , {Fragment ,useState , useEffect} from 'react'

import {Link} from 'react-router-dom' ;
import {MDBDataTable} from 'mdbreact'

import { MetaData } from '../layout/MetaData';
import Loader from '../layout/loader';

import { useAlert } from 'react-alert';
import { useDispatch , useSelector } from 'react-redux';
import { myOrders , cleanErrors } from '../../actions/orderAction';

const ListOrders = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, orders } = useSelector(state => state.myOrders);

    //const [title , setTitle] = useState(0) ;

    useEffect(() => {
         //dispatch(myOrders());
       // console.log(title) ;
        console.log('This are orders') ;
        console.log(orders) ;
        if (error) {
            alert.error(error);
            dispatch(cleanErrors())
        }
    }, [dispatch , orders , myOrders ])

    const setOrders = () => {
        const data = {
            columns: [
                {
                    label: 'Order ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Num of Items',
                    field: 'numOfItems',
                    sort: 'asc'
                },
                {
                    label: 'Amount',
                    field: 'amount',
                    sort: 'asc'
                },
                {
                    label: 'Status',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        orders.orders.forEach(order => {
            data.rows.push({
                id: order._id,
                numOfItems: order.orderItems.length,
                amount: `$${order.totalPrice}`,
                status: order.orderStatus && String(order.orderStatus).includes('Delivered')
                    ? <p style={{ color: 'green' }}>{order.orderStatus}</p>
                    : <p style={{ color: 'red' }}>{order.orderStatus}</p>,
                actions:
                    <Link to={`/order/${order._id}`} className="btn btn-primary">
                        <i className="fa fa-eye"></i>
                    </Link>
            })
        })

        return data;
    }

    return (
      
        <Fragment>

            <MetaData title={'My Orders'} />

            <h1 className="my-5">My Orders</h1>
            {/* <button onClick = {setTitle(1)} >click me</button> */}
            {loading ? <Loader /> : (
                <MDBDataTable
                    data={setOrders()}
                    className="px-3"
                    bordered
                    striped
                    hover
                />
            )}

        </Fragment>
    )

}

export default ListOrders
