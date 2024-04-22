import PropTypes from 'prop-types';
import { Box, Button, Typography } from "@mui/material"
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const DeliverItem = ({ item, deliverDate, inventory, btn }) => {
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

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
                <Typography>Product Name: {inventory.product_Name}</Typography>
                <Typography>Product Type: {inventory.product_type}</Typography>
                <Typography>Product Description: {inventory.description}</Typography>
            </Box>
            {btn && (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: isDesktop ? 'flex-end' : 'flex-start',
                        alignItems: 'center' // Center align button vertically
                    }}
                >
                    <Button variant="contained" sx={{ backgroundColor: '#2CA019', '&:hover': { backgroundColor: '#2CA019' } }} >Cancel</Button>
                </Box>
            )}
        </Box>
    )
}

export default DeliverItem

DeliverItem.propTypes = {
    item: PropTypes.string.isRequired,
    deliverDate: PropTypes.string.isRequired,
    inventory: PropTypes.object.isRequired,
    btn: PropTypes.bool
};
