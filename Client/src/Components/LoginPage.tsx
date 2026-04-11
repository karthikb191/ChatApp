import React from 'react'

type TextEntryProps =
{
    label: string
};

function TextEntryBoxComponent(props: TextEntryProps)
{
 return (
    <>
        <div className='TextEntry'>
            <p>{props.label} : </p>
            <input type='text'></input>
        </div>
    </>
 )
}

function LoginPage()
{
    return (
        <>
            <div className="Auth">
                <TextEntryBoxComponent label={"user name"}></TextEntryBoxComponent>
                <TextEntryBoxComponent label={"password"}></TextEntryBoxComponent>
            </div>
        </>
    )
}

export default LoginPage