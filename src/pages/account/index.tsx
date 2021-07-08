import React from 'react'
import { Center, Box } from 'native-base'

const Account: React.FC = () => {
  return (
    <>
      <Center flex={1}>
        <Box
          bg="primary.400"
          p={4}
          _text={{
            fontSize: 'md',
            fontWeight: 'bold',
            color: 'white',
          }}>
          This is The Account Page
        </Box>
      </Center>
    </>
  )
}

export default Account