import PropTypes from 'prop-types';
import { Box, Button, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useBoolean } from 'src/hooks/use-boolean';
import RefundRequestForm from './refund-request-form';

const DeliverItem = ({ item, deliverDate, orderInfo, btn }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
    const quickEdit = useBoolean();

    return (
        <Box
            sx={{
                display: 'grid',
                gridTemplateColumns: isDesktop ? '1fr' : '1fr', // 4 columns on desktop, 1 column on mobile
                gridGap: (theme) => theme.spacing(2),
                border: 1,
                borderColor: 'divider',
                borderRadius: 1,
                p: 3,
                m: 1
            }}
        >
            <Box>
                <Typography>Product Name: {orderInfo.delivery_id}</Typography>
                <Typography>Product Type: {orderInfo.order_date}</Typography>
                <Typography>Product Description: {orderInfo.delivery_address}</Typography>
                <Typography>Amount: {orderInfo.total_amount}</Typography>
            </Box>
            {btn && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: isDesktop ? 'flex-end' : 'flex-start',
                        alignItems: 'center' // Center align button vertically
                    }}
                >
                    <Button 
                        variant="contained" 
                        sx={{ backgroundColor: '#2CA019', '&:hover': { backgroundColor: '#2CA019' } }}
                        onClick={quickEdit.onTrue}
                    >
                        Cancle Deliver
                    </Button>
                </Box>
            )}
            <RefundRequestForm open={quickEdit.value} onClose={quickEdit.onFalse} orderInfo={orderInfo}  />
        </Box>
    )
}

export default DeliverItem

DeliverItem.propTypes = {
    item: PropTypes.string.isRequired,
    deliverDate: PropTypes.string.isRequired,
    inventory: PropTypes.shape({
        productName: PropTypes.string.isRequired,
        productType: PropTypes.string.isRequired,
        productDescription: PropTypes.string.isRequired
    }).isRequired,
    btn: PropTypes.bool
};
