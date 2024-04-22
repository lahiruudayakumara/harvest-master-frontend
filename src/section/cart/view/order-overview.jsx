import { useEffect, useState } from "react";
import { Box, Tab, Tabs } from "@mui/material"
import { CustomTabPanel } from "../custome-panel"
import DeliverItem from "../deliver-item";
import { getOrderItems, getPendingOrders } from "src/api/logisticHandlerApi";
import { addPendingDeliver, adddeliveredItem, getDeliveredItem, getPendingDeliver } from "src/stores/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { Fullscreen } from "@mui/icons-material";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const OrderOverview = () => {
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const pendinData = {
        "order_Status": "PENDING",
        "payment_status": "PENDING"
    }

    const deliveredData = {
        "order_Status": "APPROVED",
        "payment_status": "APPROVED"
    }

    useEffect(() => {
        getOrderItems(pendinData).then((data) => {
            dispatch(addPendingDeliver(data));
        });

        getOrderItems(deliveredData).then((data) => {
            dispatch(adddeliveredItem(data));
            console.log(data);
        });
    }, [dispatch]);

    const dataDeliver = useSelector(getPendingDeliver);
    const dataDelivered = useSelector(getDeliveredItem);

    return (
        <Box sx={{  padding: 3 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Pending Deliver" {...a11yProps(0)} />
                    <Tab label="Delivered" {...a11yProps(1)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                {dataDeliver.map((item, index) => (
                    <DeliverItem key={index} item={item.order_id} deliverDate={item.delivery_date} inventory={item.inventory} btn={true} />
                ))}
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                {dataDelivered.map((item, index) => (
                    <DeliverItem key={index} item={item.order_id} deliverDate={item.delivery_date} inventory={item.inventory} />
                ))}
            </CustomTabPanel>
        </Box>
    )
}

export default OrderOverview
