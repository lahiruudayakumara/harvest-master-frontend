import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import InquiriesTable from "../../inquiries/inquiries-table";

const AccountView = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
      <InquiriesTable />
      </Box>
    </>
  );
};

export default AccountView;
