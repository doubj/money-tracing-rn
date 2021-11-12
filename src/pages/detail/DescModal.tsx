import React, {useState} from 'react';
import {
  Button,
  Input,
  Modal,
} from 'native-base';

interface DescModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (desc: string) => void;
}

const DescModal: React.FC<DescModalProps> = React.memo(
  ({visible, onClose, onSave}) => {
    const [desc, setDesc] = useState('');

    const handleConfirm = () => {
      onSave(desc);
      setDesc('');
      onClose();
    };

    return (
      <Modal isOpen={visible} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Input
              mt={10}
              placeholder="请输入描述"
              value={desc}
              onChange={({nativeEvent: {text}}) => setDesc(text)}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group mb={2} space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                取消
              </Button>
              <Button onPress={handleConfirm}>确定</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    );
  },
);

export default DescModal