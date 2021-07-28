import React, { useState } from 'react';
import {Center, Box, FlatList} from 'native-base';
import {connect, ConnectedProps} from 'react-redux';
import {RootState} from '@/models/index';
import useMount from '@/utils/use-mount';
import {ITemplate} from '@/models/template';
import {ListRenderItemInfo} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import TemplateItem from './templateItem';
import useMessage from '@/utils/use-message';
import { RootStackNavigation } from '@/navigator/index';

const connector = connect(({template}: RootState) => ({
  templates: template.templates,
}));

type ModelState = ConnectedProps<typeof connector>;

interface TemplatesProps extends ModelState {
  navigation: RootStackNavigation;
}

const namespace = 'template';

const Templates: React.FC<TemplatesProps> = ({templates, dispatch, navigation}) => {

  const [refresh, setRefresh] = useState(false)

  useMount(() => {
    dispatch({type: `${namespace}/fetchTemplates`});
  });

  const {success} = useMessage()

  const onRefresh = () => {
    if (refresh) {
      return
    }
    setRefresh(true)
    dispatch({type: `${namespace}/fetchTemplates`, cb: () => {setRefresh(false)}})
  }

  const edit = (template: ITemplate) => {
    navigation.navigate("Detail", {detail: template, type: 'template'})
  };

  const transfer = (template: ITemplate) => {
    dispatch({
      type: `${namespace}/transfer`,
      payload: template,
      success: () => {success("交易生成成功！")},
    });
  };

  const deleteItem = (template: ITemplate) => {
    dispatch({
      type: `${namespace}/deleteTemplate`,
      payload: template,
      success: () => {success("删除模板成功！")},
    });
  }

  const keyExtractor = (item: ITemplate) => item.id as string;

  const renderItem = ({item}: ListRenderItemInfo<ITemplate>) => (
    <TemplateItem
      handlerEdit={edit}
      handlerTransfer={transfer}
      handlerDelete={deleteItem}
      template={item}
    />
  );

  return (
    <Box flex={1}>
      <FlatList
        marginTop={getStatusBarHeight() + 10}
        data={templates}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        refreshing={refresh}
        onRefresh={onRefresh}
      />
    </Box>
  );
};

export default connector(Templates);
