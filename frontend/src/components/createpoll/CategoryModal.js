import SelectInterests from '../signup/SelectInterests';
import { Button } from '@mui/material';

import React from 'react';

function CategoryModal() {
  return(
    <>
      <SelectInterests/>
      <Button>선택하기</Button>
    </>
  );
}

export default CategoryModal;

