import React from 'react'
import { Center, Box } from 'native-base'

const Filter: React.FC = () => {
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
          This is The Filter Page
        </Box>
      </Center>
    </>
  )
}

export default Filter