import { Equals, IsEmail, IsNotEmpty, Length, Matches } from "class-validator";

export class UserRegisterRequestDto{
    @IsNotEmpty()
    username: string;

    @IsNotEmpty() 
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @Length(8,24)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,24}$/,
        {message: 'Password must contain at least 1 lower, upper case character along with a number and a special character'}
    )
    password: string;

    @IsNotEmpty()
    @Length(8,24)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,24}$/,
        {message: 'Confirm Password must contain at least 1 lower, upper case character along with a number and a special character'}
    )
     confirmPassword:string;
}