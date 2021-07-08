import React, { useState } from 'react'
import { Button, Text, View, Modal } from 'react-native'
import { RootStackNavigation } from '@/navigator/index'

interface HomeProps {
  navigation: RootStackNavigation
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [visible, setVisible] = useState(false)
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is The Home Page</Text>
        <Button
          title="跳转至详情页"
          onPress={() => navigation.navigate('Detail', {id: '1111'})}
        />
        <Button
          title="打开时间选择器"
          onPress={() => setVisible(true)}
        />
        <Modal
          visible={visible}
          animationType={'slide'}
        >
          <View style={{width:200, height: 80}}>
            <Button
              title="关闭"
              onPress={() => setVisible(false)}
            />
          </View>
        </Modal>
      </View>
    </>
  )
}

export default Home