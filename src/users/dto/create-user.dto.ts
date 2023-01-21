import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsMobilePhone,
  IsNotEmpty,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @Length(1, 255)
  @Expose({ name: 'first_name' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Length(1, 255)
  @Expose({ name: 'last_name' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Length(1, 255)
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @MaxLength(20)
  @IsNotEmpty()
  @IsString()
  @IsMobilePhone('en-US', {}, { message: 'Invalid phone number' })
  phone: string;
}
