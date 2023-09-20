import React from 'react';

function AuthForm({ name, title, children, isLoading, buttonLabel, ariaLabel, onSubmit }) {
  return (
    <div className={`auth auth_type_${name}`}>
      <div className="auth__container">
        <h3 className="auth__title">{title}</h3>
        <form className={`auth__form-element auth__form-element_type_${name}`} name={`${name}-form`} onSubmit={onSubmit} >
          {children}
          <button
            className='auth__submit'
            type="submit"
            aria-label={ariaLabel}
          >
            {isLoading ? `${buttonLabel}...` : buttonLabel}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AuthForm;