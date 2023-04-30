import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register(props) {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    password: '',
    profile_pic_url: null,
  });
  const [previewImageUrl, setPreviewImageUrl] = useState('');

  const onHandleChange = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    if (
      (signUpData.firstName ||
        signUpData.lastName ||
        signUpData.mobile ||
        signUpData.password ||
        signUpData.profile_pic_url) === '' ||
      null
    ) {
      showErrorMessage('All fields are required.');
    } else if (signUpData.mobile.length !== 10) {
      showErrorMessage('Mobile number must be 10 digits.');
    } else if (signUpData.password.length < 6) {
      showErrorMessage('Password must be at least 6 characters.');
    } else if (signUpData.profile_pic_url === null) {
      showErrorMessage('Please select a profile picture.');
    } else if (
      signUpData.profile_pic_url.type !== 'image/jpeg' &&
      signUpData.profile_pic_url.type !== 'image/png'
    ) {
      showErrorMessage('Profile picture must be in JPG or PNG format.');
    } else if (signUpData.confirm_password !== signUpData.password) {
      showErrorMessage('Password and confirm password must be same.');
    } else {
      const formData = new FormData();
      formData.append('firstName', signUpData.firstName);
      formData.append('lastName', signUpData.lastName);
      formData.append('mobile', signUpData.mobile);
      formData.append('password', signUpData.password);
      formData.append('profile_pic_url', signUpData.profile_pic_url);

      axios
        .post('http://localhost:3300/api/auth/register', formData)
        .then(function (response) {
          if (response.status === 201) {
            navigate('/');
          }
        })
        .catch(function (error) {});
    }
    e.preventDefault();
  };

  const showErrorMessage = (message) => {
    Swal.fire({
      position: 'top-end',
      icon: 'error',
      text: message,
      toast: true,
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file);
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        // Set the image preview URL to display in the UI
        setPreviewImageUrl(imageUrl);
        // Store the selected file in the signUpData state
        setSignUpData({
          ...signUpData,
          profile_pic_url: file,
        });
      };

      reader.readAsDataURL(file);
    }
  };
  return (
    <section>
      <div className="bg-top relative flex items-start pt-12 pb-56 m-4 overflow-hidden bg-cover rounded-xl bg-[url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg')]">
        <span className="absolute top-0 left-0 w-full h-full bg-center bg-cover bg-gradient-to-tl from-zinc-800 to-zinc-700 opacity-60"></span>
        <div className="container z-10">
          <div className="flex flex-wrap justify-center -mx-3">
            <div className="w-full max-w-full px-3 mx-auto mt-0 text-center lg:flex-0 shrink-0 lg:w-5/12">
              <h1 className="mt-12 mb-2 text-white">&nbsp;</h1>
              <p className="text-white">&nbsp;</p>
              <p className="text-white">&nbsp;</p>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="flex flex-wrap -mt-48 md:-mt-56 lg:-mt-48">
          <div className="w-full max-w-full px-3 mx-auto mt-0 md:flex-0 shrink-0 md:w-7/12 lg:w-5/12 xl:w-4/12">
            <div className="relative z-0 flex flex-col min-w-0 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border">
              <div className="p-6 mb-0 text-center bg-white border-b-0 rounded-t-2xl">
                <h5>Register with</h5>
              </div>
              <div className="flex-auto p-6">
                <form role="form text-left">
                  <div className="mb-4">
                    <input
                      type="text"
                      className="placeholder:text-gray-500 text-sm focus:shadow-blue-500-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      placeholder="First Name"
                      aria-label="firstname"
                      name="firstName"
                      aria-describedby="firstName-addon"
                      onChange={(e) => onHandleChange(e)}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      className="placeholder:text-gray-500 text-sm focus:shadow-blue-500-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      placeholder="Last Name"
                      aria-label="lastname"
                      name="lastName"
                      aria-describedby="lastName-addon"
                      onChange={(e) => onHandleChange(e)}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="tel"
                      className="placeholder:text-gray-500 text-sm focus:shadow-blue-500-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      name="mobile"
                      placeholder="Mobile Number(10 digits)"
                      aria-label="Mobile Number"
                      maxLength={10}
                      aria-describedby="mobile-addon"
                      onChange={(e) => onHandleChange(e)}
                    />
                  </div>

                  <div className="mb-4">
                    <input
                      type="password"
                      className="placeholder:text-gray-500 text-sm focus:shadow-blue-500-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      name="password"
                      placeholder="Password"
                      aria-label="Password"
                      aria-describedby="password-addon"
                      onChange={(e) => onHandleChange(e)}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="confpassword"
                      className="placeholder:text-gray-500 text-sm focus:shadow-blue-500-outline leading-5.6 ease block w-full appearance-none rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 px-3 font-normal text-gray-700 transition-all focus:border-blue-500 focus:bg-white focus:text-gray-700 focus:outline-none focus:transition-shadow"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      aria-label="confirm_password"
                      aria-describedby="password-addon"
                      onChange={(e) => onHandleChange(e)}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="file"
                      className="hidden"
                      id="profilePic"
                      name="profilePic"
                      accept="image/*"
                      onChange={(e) => handleProfilePicChange(e)}
                    />
                    <label
                      htmlFor="profilePic"
                      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-300"
                    >
                      Upload Profile Picture
                    </label>
                  </div>
                  {previewImageUrl && (
                    <div className="mb-4">
                      <img src={previewImageUrl} alt="profilePic" />
                    </div>
                  )}
                  <div className="text-center">
                    <button
                      type="button"
                      className="inline-block w-full px-5 py-2.5 mt-6 mb-2 font-bold text-center text-white align-middle transition-all bg-transparent border-0 rounded-lg cursor-pointer active:opacity-85 hover:-translate-y-px hover:shadow-xs leading-normal text-sm ease-in tracking-tight-rem shadow-md bg-150 bg-x-25 bg-gradient-to-tl from-zinc-800 to-zinc-700 hover:border-slate-700 hover:bg-slate-700 hover:text-white"
                      onClick={(e) => handleSubmit(e)}
                    >
                      Sign up
                    </button>
                  </div>
                  <p className="mt-4 mb-0 leading-normal text-sm">
                    Already have an account?{' '}
                    <span
                      className="font-bold text-slate-700 cursor-pointer"
                      onClick={() => navigate('/')}
                    >
                      Sign in
                    </span>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
