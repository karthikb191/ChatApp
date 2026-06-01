

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
        <h1> This is Login page </h1>
        </>
    )
}

export default LoginPage