import { Expose } from 'class-transformer';
import {
  IsEmail,
  IsMobilePhone,
  IsOptional,
  Length,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
  @Length(1, 255)
  @Expose({ name: 'first_name' })
  @IsOptional()
  firstName?: string;

  @Length(1, 255)
  @Expose({ name: 'last_name' })
  @IsOptional()
  lastName?: string;

  @Length(1, 255)
  @IsEmail()
  @IsOptional()
  email?: string;

  @MaxLength(20)
  @IsMobilePhone('en-US', {}, { message: 'Invalid phone number' })
  @IsOptional()
  phone?: string;

  @IsOptional()
  password?: string;

  @Expose({ name: 'refresh_token' })
  @IsOptional()
  refreshToken?: string | null;
}
