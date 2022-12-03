import React, { useEffect, useState } from 'react'
import { MainLayout } from 'shared'
import './Support.scss'

const Support = () => {
    const [email, setEmail] = useState()
    const [emailDirty, setEmailDirty] = useState(false)
    const [emailError, setEmailError] = useState('Email не может быть пустым')
    const [name, setName] = useState()
    const [nameDirty, setNameDirty] = useState(false)
    const [nameError, setNameError] = useState('Имя не может быть пустым')
    const [comment, setComment] = useState()
    const [gender, setGender] = useState()
    const [agreement, setAgreement] = useState()
    const [formValid, setFormValid] = useState(false)

    const formData = {
        email,
        name,
        comment,
        gender,
        agreement,
    }

    const emailHandler = (event) => {
        setEmail(event.target.value)
        const re =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!re.test(String(event.target.value).toLowerCase())) {
            setEmailError('Неккоректный Email')
        } else {
            setEmailError('')
        }
    }

    const nameHandler = (event) => {
        setName(event.target.value)
        let regex = /[0-9]/g
        if (regex.test(String(event.target.value).toLowerCase())) {
            setNameError('Имя не должно содержать цифры')
        } else {
            setNameError('')
        }
    }

    const blurHandler = (event) => {
        switch (event.target.name) {
            case 'email':
                setEmailDirty(true)
                break
            case 'name':
                setNameDirty(true)
                break
        }
    }

    const genderId = (event) => {
        setGender(event.target.id)
    }

    const commentValue = (event) => {
        setComment(event.target.value)
    }

    const agreementId = (event) => {
        setAgreement(event.target.id)
    }

    useEffect(() => {
        if (emailError || nameError) {
            setFormValid(false)
        } else {
            console.log(formData)
        }
    })

    return (
        <MainLayout>
            <div className='registration-card'>
                <form action='#' className='registration-card__form-registration'>
                    {emailDirty && emailError && (
                        <div className='registration-card__email-error' id='email-error'>
                            {emailError}
                        </div>
                    )}
                    <input
                        onChange={(event) => emailHandler(event)}
                        onBlur={(event) => blurHandler(event)}
                        className='registration-card__input-email'
                        id='email'
                        name='email'
                        placeholder='Введите Email'
                        autoComplete='off'
                        value={email}
                    />
                    {nameDirty && nameError && (
                        <div className='registration-card__name-error' id='name-error'>
                            {nameError}
                        </div>
                    )}
                    <input
                        onChange={(event) => nameHandler(event)}
                        onBlur={(event) => blurHandler(event)}
                        className='registration-card__input-name'
                        id='name'
                        name='name'
                        placeholder='Ваше имя'
                        value={name}
                    />
                    <div className='registration-card__radio'>
                        <span className='radio__span'>Пол</span>
                        <div className='radio__man'>
                            <input
                                className='radio__input-man'
                                type='radio'
                                name='gender'
                                id='man'
                                value={gender}
                                onChange={(event) => genderId(event)}
                            />
                            <label className='radio__label-man' htmlFor='man'>
                                Мужчина
                            </label>
                        </div>
                        <div className='radio__woman'>
                            <input
                                className='radio__input-woman'
                                type='radio'
                                name='gender'
                                id='woman'
                                value={gender}
                                onChange={(event) => genderId(event)}
                            />
                            <label className='radio__label-woman' htmlFor='woman'>
                                Женщина
                            </label>
                        </div>
                    </div>
                    <div className='registration-card__textarea-comment'>
                        <textarea
                            className='textarea-comment__textarea'
                            type='text'
                            name='comment'
                            id='comment'
                            placeholder='Напишите нам...'
                            value={comment}
                            onChange={(event) => commentValue(event)}
                        ></textarea>
                    </div>
                    <div className='registration-card__checkbox'>
                        <input
                            className='checkbox__input-checkbox'
                            type='checkbox'
                            id='checkbox'
                            name='checkbox'
                            value={agreement}
                            onChange={(event) => agreementId(event)}
                        />
                        <label className='checkbox__label-checkbox' htmlFor='checkbox'>
                            Я согласен получать обновления на почту
                        </label>
                    </div>
                    <button
                        disabled={!formValid}
                        className='registration-card__button'
                        type='submit'
                    >
                        Отправить
                    </button>
                </form>
            </div>
        </MainLayout>
    )
}

export default Support
