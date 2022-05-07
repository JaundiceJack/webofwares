// Import basics
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// Import dispatch actions
import { getUsers } from '../../actions/userActions.js';
// Import components
import InfoPanel from '../multipurpose/infoPanel.js';
import ErrorMessage from '../multipurpose/errorMessage.js';
import Spinner from '../multipurpose/spinner.js';
import Header from '../multipurpose/header.js';
import EditUser from './editUser.js';
import DeleteUser from './deleteUser.js';
// Import icons
import { FaRegTrashAlt, FaEdit } from 'react-icons/fa';

const Users = ({ history }) => {
  // Store the clicked user to pass to the modals
  const [selectedUser, setSelectedUser] = useState(null);
  // Set modal view states
  const [deleteModal, setDeleteModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  // Get the redux variables
  const { users, loading, error }
    = useSelector(state => state.userList);

  return (
    <InfoPanel title="Users" extraClasses="h-full" contentClasses="h-full "
      contents={
        loading ? <Spinner /> :
        error ? <ErrorMessage error={error} /> :
        users.length === 0 ? <p>No users to view.</p> :
        <div>
          <div className={`h-10 w-full grid grid-cols-4
            items-center mb-2`}>
            <p className="text-gray-100 font-semibold border-b-2 border-yellow-700 ">User Name</p>
            <p className="text-gray-100 font-semibold border-b-2 border-yellow-600 ">Email</p>
            <p className="text-gray-100 font-semibold border-b-2 border-yellow-500 ">Status</p>
            <p className="text-gray-100 font-semibold border-b-2 border-yellow-400 ">Options</p>
          </div>
          {
            users.map((user, index) => {
              return (
                <div key={index} className={`grid grid-cols-4 items-center
                  px-2 py-1 mx-1 my-1 gap-2 rounded-lg hover:bg-gray-500 `}>
                  <p className="text-gray-100">{user.name}</p>
                  <a href={`mailto:${user.email}`} className="text-gray-100">{user.email}</a>
                  <p className="text-gray-100">{user.isAdmin ? "Admin" : "User"}</p>
                  <div className="flex flex-row items-center">
                    <button  onClick={() => { setSelectedUser(user); setEditModal(true); } }
                      title="Edit User's Information"
                      className={`h-8 w-8 mr-2 flex items-center justify-center
                        rounded-full bg-gray-700 hover:bg-gray-600`}>
                      <FaEdit className="" color="#ec3" />
                    </button>
                    <button onClick={() => { setSelectedUser(user); setDeleteModal(true); } }
                      title="Remove User Account"
                      className={`h-8 w-8 flex items-center justify-center
                        rounded-full bg-gray-700 hover:bg-gray-600`}>
                      <FaRegTrashAlt className="" color="#f55" />
                    </button>
                  </div>
                </div>
              )
            })
          }

          <DeleteUser opened={deleteModal}
            setOpened={setDeleteModal} selectedUser={selectedUser} />
          <EditUser opened={editModal}
            setOpened={setEditModal} selectedUser={selectedUser} />
        </div>
      }
    />
  )
}

export default Users;
