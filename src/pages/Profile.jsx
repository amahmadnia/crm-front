import React from 'react';
import { Box, Typography, Divider, Container, styled } from '@mui/material';
import ProfileForm from './../components/ProfileForm';
import api from '../utils/api';

const CustomTypography = styled(Typography)(({ theme }) => ({
  lineHeight: '28px',
  fontSize: '18px',
}));

function App() {
  return (
    <Container>
      {/* Welcome Note */}
      <Typography variant="h4" component="h1" gutterBottom>
        خوش آمدید
      </Typography>

      {/* Section Divider */}
      <Divider />

      {/* Box with Lorem Text */}
      <Box my={4} p={2} bgcolor="#ACE7ED">
        <Typography variant="h4" mb="1rem">
          توجه مهم:
        </Typography>
        <CustomTypography variant="body1">
          1.رزرو آنلاین خدمات از ۳ ساعت قبل از پرواز به صورت آنلاین امکان پذیر
          است. رزرو به صورت آفلاین برای پروازهای ورودی تا ۲ ساعت قبل از پرواز و
          برای پروازهای ورودی با تشخیص پشتیبان امکان پذیر است.
        </CustomTypography>
        <CustomTypography variant="body1">
          2.هزینه کنسلی در یک سال اخیر چندین مرتبه تغییر پیدا کرده است لذا ابتدا
          قوانین را از صفحه تشریفات فرودگاه cip هاشمی نژآد مطالعه کنید. برای
          تغییر مشخصات پرواز نیز کاربر از طریق تماس با پشتیبانی می تواند تغییرات
          را اعمال کند.
        </CustomTypography>
        <CustomTypography variant="body1">
          3.مدت زمان لازم برای استرداد هزینه به حساب کاربری کاربر در ساعتهای
          اداری دو الی سه ساعت و در ساعتهای غیراداری ۲۴ ساعت است. (در صورت تایید
          عودت وجه)
        </CustomTypography>
      </Box>

      {/* Another Divider */}
      <Divider />

      {/* Empty Box */}
      <Box my={4} p={2} bgcolor="grey.100">
        <ProfileForm />
      </Box>
    </Container>
  );
}

export default App;
