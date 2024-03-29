// Import basics
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Import dispatch actions
import { deleteUser } from '../../actions/userActions.js';
// Import components
import Spinner from '../multipurpose/spinner.js';
import ErrorMessage from '../multipurpose/errorMessage.js';
import { Button, Modal } from '@mantine/core';

const DeleteUser = ({ opened, setOpened, selectedUser }) => {
  // Get loading/error status
  const { error, loading }
    = useSelector(state => state.userDelete);
  // Request deletion from the server
  const dispatch = useDispatch();
  const deleteHandler = async () => {
    const success = await dispatch(deleteUser(selectedUser._id));
    if (success) setOpened(false);
  }

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={`Are you sure you want to remove
        ${selectedUser && selectedUser.name}?`} >
      {
        loading ? <Spinner extraClasses="mx-auto my-2" /> :
        <div className="flex justify-evenly">
          <Button color="red" onClick={() => deleteHandler()}>
            Yes
          </Button>
          <Button onClick={() => setOpened(false)}>
            No
          </Button>
        </div>
      }
      {error && <ErrorMessage error={error} />}
    </Modal>
  )
}

export default DeleteUser;
