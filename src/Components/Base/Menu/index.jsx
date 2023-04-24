import { FiLogOut } from 'react-icons/fi';
import { TiUserDelete } from 'react-icons/ti';
import { useUser } from '../../../context/UserContext/UserContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { deleteUserAPI } from '../../../API/UserApi/UserApi';
import { toastMessageSuccess, toastMessageError } from '../../../utils/toaster';

export default function Menu() {
  const { logoutUser, deleteUser, user } = useUser()
  const { name } = user;

  const handleDeleteUser = async () => {
    const response = await deleteUserAPI(user);
    if (response.ok) {
      toastMessageSuccess("Your user has being successfuly deleted.");
      setTimeout(() => {
        deleteUser()
      }, 2500);
    } else {
      toastMessageError(response.msg)
    }
  }

  return (
    <>
      <div className="w-[15%] bg-[url('../../../../src/assets/images/LandBgImage.png')] flex flex-col items-start justify-between pl-[2vw]">
        <section className='mt-8'>
          <p className='font-dancing text-4xl text-white'>Hi!</p>
          <p className='font-dancing text-2xl text-white'>{name}</p>
        </section>
        <section>
          <div onClick={handleDeleteUser} className="mb-[2rem] cursor-pointer flex rounded-full hover:bg-[#E5FFDB] transition duration-500 w-[12vw] py-2">
            <TiUserDelete className='text-3xl w-[4vw]' />
            <p className='text-md mt-1'>Delete user</p>
          </div>
          <div onClick={logoutUser} className="mb-[2rem] cursor-pointer flex rounded-full hover:bg-[#E5FFDB] transition duration-500 w-[12vw] pt-2 pb-1">
            <FiLogOut className='text-2xl w-[4vw]' />
            <p className='text-md mb-1'>Log out</p>
          </div>
        </section>
      </div>
      <ToastContainer />
    </>
  )
}
