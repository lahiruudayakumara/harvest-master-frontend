import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles'; // Import styled from @mui/material
import AdminLoginForm from '../admin-login-form';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { userRoleBaseRidirect } from '../roles';
import { selectAuth } from 'src/stores/slices/authSlice';
import LoadingScreen from 'src/components/loading-screen/loading-screen';
import { useNavigate } from 'react-router-dom';

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
    const { isAuthenticated, userRole } = useSelector(selectAuth);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            userRoleBaseRidirect(userRole).then((role) => {
                console.log(role);
                if (role === 'unknown') {
                    navigate('/login');
                }
                window.location.href = `/${role}`;
            });
        } else {
            setLoading(false); // Set loading to false when authentication check is complete
        }
    }, [isAuthenticated, userRole]);


    if (loading) {
        return <LoadingScreen />;
    } else {
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
}

export default AdminLoginView