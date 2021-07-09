import {AlertDialog, Button, Text} from 'native-base';
import React from 'react';

interface DialogProps {
  title?: string;
  content: string;
  isOpen: boolean;
  cancelLabel?: string;
  confirmLabel?: string;
  onCancel: () => void;
  onConfirm: () => void;
}

const Dialog: React.FC<DialogProps> = props => {
  const {
    title,
    content,
    isOpen,
    onCancel,
    onConfirm,
    cancelLabel,
    confirmLabel,
  } = props;
  const cancelRef = React.useRef();
  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onCancel}>
      <AlertDialog.Content>
        {title && (
          <AlertDialog.Header>
            <Text fontSize="lg" fontWeight="bold">
              {title}
            </Text>
          </AlertDialog.Header>
        )}
        <AlertDialog.Body>{content}</AlertDialog.Body>
        <AlertDialog.Footer>
          <Button
            py={2}
            px={6}
            borderRadius={30}
            ref={cancelRef}
            onPress={onCancel}>
            {cancelLabel || '取消'}
          </Button>
          <Button
            py={2}
            px={6}
            borderRadius={30}
            colorScheme="danger"
            _text={{color: 'white'}}
            onPress={onConfirm}
            ml={3}>
            {confirmLabel || '删除'}
          </Button>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default Dialog;
