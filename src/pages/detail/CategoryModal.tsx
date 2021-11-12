import React, {useState} from 'react';
import {
  Button,
  Center,
  Modal,
} from 'native-base';
import CategoryList from '@/components/CategoryList';
import {ICategory} from '@/models/transaction';

interface CategoryModalProps {
  categories: ICategory[];
  defaultCategory: ICategory;
  visible: boolean;
  onClose: () => void;
  onSave: (category: ICategory) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = React.memo(
  ({categories, defaultCategory, visible, onClose, onSave}) => {
    const [selectedCategory, setSelectedCategory] =
      useState<ICategory>(defaultCategory);

    const handleConfirm = () => {
      onSave(selectedCategory);
      onClose();
    };

    return (
      <Modal isOpen={visible} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Center>
              <CategoryList
                categories={categories}
                selectedCategory={selectedCategory.id}
                showTypeRadio={true}
                onSelect={(category: ICategory) =>
                  setSelectedCategory(category)
                }
              />
            </Center>
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

export default CategoryModal