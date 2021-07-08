import React from 'react'
import { Button, Text, View } from 'react-native'
import { RootStackNavigation, RootStackParamList } from '@/navigator/index'
import { RouteProp } from '@react-navigation/native'

interface DetailProps {
  navigation: RootStackNavigation,
  route: RouteProp<RootStackParamList, 'Detail'>
}

const Detail: React.FC<DetailProps> = ({route, navigation}) => {
  return (
    <>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>This is The Detail Page, Navigator Param id is {route.params.id}</Text>
        <Button
          title="跳转至详情页"
          onPress={() => navigation.navigate('Home')}
        />
        <Button
          title="返回上一页"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="更新标题"
          onPress={() => navigation.setOptions({headerTitle: `Detail id ${route.params.id}`})}
        />
      </View>
    </>
  )
}

export default Detail