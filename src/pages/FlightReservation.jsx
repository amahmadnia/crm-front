import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, {
  stepConnectorClasses,
} from '@mui/material/StepConnector';
import useStore from './../store';
import AgeSelector from '../components/PassengerSelector';
import { Box, Button, Typography } from '@mui/material';
import PassengerManager from '../components/PassengersForms/PassengersManager';
import PassengersForm2 from '../components/PassengersForm2';
import PassengerInfoTable from '../components/PassengersInfo/PassengersInfoTable';
import PaymentBox from '../components/PassengersInfo/PaymentBox';
import PeopleIcon from '@mui/icons-material/People';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import DoneAllIcon from '@mui/icons-material/DoneAll';

const CustomButton = styled(Button)(({ theme }) => ({
  background: '#BAC0E5',
  color: '#0E1228',
  padding: '14px 16px',
  fontSize: 16,
  borderRadius: '48px',
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <PeopleIcon />,
    2: <FormatListNumberedRtlIcon />,
    3: <DoneAllIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = ['تعداد مسافرین', 'ثبت اطلاعات مسافرین', 'تایید اطلاعات'];

export default function CustomizedSteppers() {
  const store = useStore();

  const [activeStep, setActiveStep] = React.useState(0);
  const [hasSubmitted, setHasSubmitted] = React.useState(false);

  const validatePassengers = () => {
    // Helper function to check if all properties of an object are non-empty
    const allPropsFilled = (person) => {
      return Object.values(person).every((value) => value !== '');
    };

    // Check adults array
    for (const adult of store.passengers.adults) {
      if (!allPropsFilled(adult)) {
        return false;
      }
    }

    // Check babies array
    for (const baby of store.passengers.babies) {
      if (!allPropsFilled(baby)) {
        return false;
      }
    }

    return true;
  };

  const handleNext = () => {
    if (activeStep === 1) {
      setHasSubmitted(true);

      //check empty fields
      if (validatePassengers()) {
        setActiveStep(2);
      }
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep === 2) setHasSubmitted(false);

    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return <AgeSelector />;
      case 1:
        return (
          <>
            <Box>
              <p>{hasSubmitted}</p>
            </Box>
            {/* <button onClick={() => setHasSubmitted(true)}>
              {String(hasSubmitted)}
            </button> */}
            {/* <PassengersForm2 /> */}
            <PassengerManager hasSubmitted={hasSubmitted} />
          </>
        );
      case 2:
        return (
          <Box width={'90%'}>
            <PassengerInfoTable />
            <PaymentBox />
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Stack sx={{ width: '100%' }} spacing={4}>
        <Box
          sx={{
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
            پرواز هواپیمایی {store.currentFlightInfo.airlineName} در تاریخ{' '}
            {store.currentFlightInfo.date}
          </Typography>
        </Box>
        <Stepper
          alternativeLabel
          activeStep={activeStep}
          connector={<ColorlibConnector />}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* <button
          onClick={() => {
            console.log(store);
          }}
        >
          bussy
        </button> */}
        <Box
          style={{ padding: '20px', display: 'flex', justifyContent: 'center' }}
        >
          {renderStepContent(activeStep)}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            pt: 0,
            px: 12,
          }}
        >
          <CustomButton
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
          >
            بازگشت
          </CustomButton>
          <Box sx={{ flex: '1 1 auto' }} />
          <CustomButton onClick={handleNext} disabled={activeStep === 2}>
            بعدی
          </CustomButton>
        </Box>
      </Stack>
    </>
  );
}
