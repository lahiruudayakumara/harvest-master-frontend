import { Helmet } from 'react-helmet'
import { OrderOverView } from 'src/section/cart/view'


const OrderView = () => {
    return (
        <>
            <Helmet>
                <title>Cart : Order View</title>
            </Helmet>
            <OrderOverView />
        </>
    )
}

export default OrderView