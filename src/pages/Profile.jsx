import React from 'react';
import { Box, Typography, Divider, Container, styled } from '@mui/material';
import ProfileForm from './../components/ProfileForm';
import api from '../utils/api';

const CustomTypography = styled(Typography)(({ theme }) => ({
  lineHeight: '28px',
  fontSize: '19px',
  marginBottom: '1rem',
}));

function App() {
  return (
    <Container>
      <Box
        sx={{
          width: '100%',
          padding: '10px 20px',
          mb: 0,

          backgroundColor: '#F8F8FC',
          borderRadius: 7,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" gutterBottom>
          ویرایش اطلاعات پروفایل
        </Typography>
      </Box>
      {/* Box with Lorem Text */}
      <Box
        my={4}
        p={4}
        bgcolor="#E0F7FA"
        borderRadius={7}
        boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      >
        <Typography variant="h4" mb="1.5rem" color="#00796B" fontWeight="bold">
          توجه مهم:
        </Typography>
        <CustomTypography variant="body1" color="#004D40">
          1.رزرو آنلاین خدمات از ۳ ساعت قبل از پرواز به صورت آنلاین امکان پذیر
          است. رزرو به صورت آفلاین برای پروازهای ورودی تا ۲ ساعت قبل از پرواز و
          برای پروازهای ورودی با تشخیص پشتیبان امکان پذیر است.
        </CustomTypography>
        <CustomTypography variant="body1" color="#004D40">
          2.هزینه کنسلی در یک سال اخیر چندین مرتبه تغییر پیدا کرده است لذا ابتدا
          قوانین را از صفحه تشریفات فرودگاه cip هاشمی نژآد مطالعه کنید. برای
          تغییر مشخصات پرواز نیز کاربر از طریق تماس با پشتیبانی می تواند تغییرات
          را اعمال کند.
        </CustomTypography>
        <CustomTypography variant="body1" color="#004D40">
          3.مدت زمان لازم برای استرداد هزینه به حساب کاربری کاربر در ساعتهای
          اداری دو الی سه ساعت و در ساعتهای غیراداری ۲۴ ساعت است. (در صورت تایید
          عودت وجه)
        </CustomTypography>
      </Box>

      {/* Empty Box */}
      <Box my={4}>
        <ProfileForm />
      </Box>
    </Container>
  );
}

export default App;
