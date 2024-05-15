import { useEffect, useState } from "react";
import { Box, Grid, Tab, Tabs, Typography } from "@mui/material"
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
        "payment_status": "APPROVED"
    }

    const deliveredData = {
        "order_Status": "APPROVED",
        "payment_status": "APPROVED"
    }

    useEffect(() => {
        getOrderItems(pendinData).then((data) => {
            dispatch(addPendingDeliver(data));
            console.log(data)
        });

        getOrderItems(deliveredData).then((data) => {
            dispatch(adddeliveredItem(data));
            console.log(data);
        });
    }, [dispatch]);

    const dataDeliver = useSelector(getPendingDeliver);
    const dataDelivered = useSelector(getDeliveredItem);

    return (
      <Box sx={{ padding: 3, marginTop: 10 }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            "& .MuiTabs-indicator": {
              backgroundColor: "#2CA019",
            },
            color: "#2CA019",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            indicatorColor="#2CA019"
          >
            <Tab
              label="Pending Deliver"
              {...a11yProps(0)}
              sx={{
                color: value === 0 ? "#2CA019" : "inherit",
                "&.Mui-selected": {
                  color: "#2CA019",
                },
              }}
            />
            <Tab
              label="Delivered"
              {...a11yProps(1)}
              sx={{
                color: value === 0 ? "#2CA019" : "inherit",
                "&.Mui-selected": {
                  color: "#2CA019",
                },
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {dataDeliver == null ? (
            <Box sx={{ height: "50vh", display: "flex" }}>
              <Typography style={{ margin: "auto" }}>
                No Pending Delivery Products
              </Typography>
            </Box>
          ) : (
            <Grid
            sx={{
                display: 'grid',
                gridTemplateColumns: ['1fr', '1fr 1fr 1fr 1fr'], 
                gridGap: (theme) => theme.spacing(2),
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                p: 3,
                m: 1
            }}
        >
            {dataDeliver.map((item, index) => (
              <DeliverItem
                key={index}
                item={item.order_id}
                deliverDate={item.order_data}
                orderInfo={item}
                btn={true}
              />
            ))}
            </Grid>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {dataDelivered ? (
            <Box sx={{ height: "50vh", display: "flex" }}>
              <Typography style={{ margin: "auto" }}>
                No Delivered Products
              </Typography>
            </Box>
          ) : (
            dataDelivered.map((item, index) => (
              <DeliverItem
                key={index}
                item={item.order_id}
                deliverDate={item.delivery_date}
                orderInfo={item}
              />
            ))
          )}
        </CustomTabPanel>
      </Box>
    );
}

export default OrderOverview
