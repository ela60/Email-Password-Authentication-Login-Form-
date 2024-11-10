import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../Firebase.init";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [success, setSuccess] = useState(false);
  const [error, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
      const password = e.target.password.value;
      const terms = e.target.terms.checked;
      const name = e.target.name.value;
      const photoURL = e.target.photo.value;
    console.log(email, password);

    //   reset error and status
      setErrorMessage("");
      setSuccess(false);

      if (!terms) {
          setErrorMessage('please accept our terms and conditions');
          return;
      }  


    if (password.length < 6) {
      setErrorMessage("Password should be at least 6 characters or longer");
      return;
    }

    const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "At least one uppercase,one lowercase,one number,one special character"
      );
      return;
    }

    //   create user email with password
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
          setSuccess(true);
          
          //   send verification email address
          sendEmailVerification(auth.currentUser)
              .then(() => {
                  console.log('verification email send');
              });
          //   update profile name and photo url
          const profile = {
              displayName: name,
              photoURL: photo
          }
          updateProfile(auth.currentUser, profile)
              .then(() => {
                  console.log('user profile updated');
              })
              .catch(error => console.log('user profile updated'));
      })
      .catch((error) => {
        console.log("ERROR", error.message);
        setErrorMessage(error.message);
        setSuccess(false);
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <h1 className="text-4xl font-bold mx-auto my-4">Sign up now!</h1>
      <form onSubmit={handleSignUp} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="input input-bordered"
            required
                  />
                  </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input
            type="text"
            name="photo"
            placeholder="photo URL"
            className="input input-bordered"
            required
                  />
                  </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="email"
            className="input input-bordered"
            required
          />
        </div>
        <div className="form-control relative">
          <label className="label">
            <span className="label-text">Password</span>
          </label>

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="password"
            className="input input-bordered"
            required
          />
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="btn btn-xs absolute right-4 top-12"
          >
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </button>
          <label className="label">
            <a href="#" className="label-text-alt link link-hover">
              Forgot password?
            </a>
          </label>
          <div className="form-control">
            <label className="cursor-pointer justify-start label">
              <input
                type="checkbox"name="terms"
                className="checkbox checkbox-warning"
              />
              <span className="label-text ml-2">Accept our terms and condition</span>
            </label>
          </div>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary">Sign Up</button>
        </div>
      </form>
      {error && <p className="text-3xl text-red-800">{error}</p>}
          {success && <p className="text-green-500">Sign up successful</p>}
          <p className='m-2'>Already have an account? Please <Link
                    >Login</Link></p>
      </div>
      
  );
};

export default SignUp;
