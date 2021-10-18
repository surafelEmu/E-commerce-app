import React, { Fragment, useState, useEffect } from 'react'

import {MetaData} from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { register, cleanErrors } from '../../actions/userAction'

const Register = () => {

    const alert = useAlert()  ;
    
    const [user , setUser] = useState({
        name: '' ,
        email: '' ,
        password: ''
    }) ;

    const {name , email , password} = user ;

    const [avatar , setAvatar] = useState('') ;
    const [avatarPreview , setAvatarPreview] = useState('/images/default_avatar.jpg') ;


    const disptach = useDispatch() ;

    const {isAuthenticated , error , loading} = useSelector(state => state.register) ;

    useEffect( () => {
        if(isAuthenticated) {
            console.log('authenticated successfully') ;
        }

        if(error) {
            console.log(error) ;
            alert.error(error.message) ;
            cleanErrors()
        }


    } , [isAuthenticated , error ])

    const submitHandler = (e) => {
        e.preventDefault() ;
        //console.log('firing and wiring........')
        const formData = new FormData() ;
        formData.set('name' , name) ;
        formData.set('email', email) ;
        formData.set('password' , password) ;
        formData.set('avatar' , avatar) ;

        disptach(register(
           formData
        ))
    }

    const onChange = (e) => {
        e.preventDefault() ;

        if(e.target.name == 'avatar') {

            const reader = new FileReader() ;

            reader.onload = () => {
                if(reader.readyState === 2) {
                    console.log('image is being set')
                    setAvatarPreview(reader.result)
                    setAvatar(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }else{
            setUser({...user , [e.target.name]: e.target.value}) ;

        }

    }

   
    return (
        <Fragment>

            <MetaData title={'Register User'} />

            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="email_field">Name</label>
                            <input
                                type="name"
                                id="name_field"
                                className="form-control"
                                name='name'
                                value={name}
                                onChange={onChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input
                                type="email"
                                id="email_field"
                                className="form-control"
                                name='email'
                                value={email}
                                onChange={onChange }
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input
                                type="password"
                                id="password_field"
                                className="form-control"
                                name='password'
                                value={password}
                                onChange={onChange}
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img
                                            src={avatarPreview}
                                            className='rounded-circle'
                                            alt='Avatar Preview'
                                        />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input
                                        type='file'
                                        name='avatar'
                                        className='custom-file-input'
                                        id='customFile'
                                        accept="iamges/*"
                                        onChange={onChange}
                                    />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button
                            id="register_button"
                            type="submit"
                            className="btn btn-block py-3"
                            disabled={loading ? true : false}
                        >
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Register
