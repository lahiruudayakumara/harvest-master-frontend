import React from "react";
import { Helmet } from "react-helmet";
import { PendingOrderView } from "../../section/logistic-handler/pending-order/view";

const LogisticHandlerPendingOrders = () => {
    return (
        <>
            <Helmet>
                <title>Pending Orders : Logisic Handler</title>
            </Helmet>
            <PendingOrderView />
        </>
    )
}

export default LogisticHandlerPendingOrders