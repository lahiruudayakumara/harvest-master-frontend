import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles'; // Import styled from @mui/material
import AdminLoginForm from '../admin-login-form';

const RootContainer = styled('div')({
    display: 'flex',
    minHeight: '100vh',
});

const ImageContainer = styled('div')({
    flex: '1',
    background: 'url("path_to_your_image")',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    backgroundColor: "#2CA019"
});

const AdminLoginView = () => {
    return (
        <RootContainer>
            <ImageContainer>
                <Typography component="h1" variant="h2">
                    Harvest Master
                </Typography>
            </ImageContainer>
            <AdminLoginForm />
        </RootContainer>
    )
}

export default AdminLoginView