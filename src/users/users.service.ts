import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}

  create = async (
    createUserDto: CreateUserDto,
    entityManager?: EntityManager,
  ): Promise<User> => {
    const transactionManager = entityManager || this.dataSource.manager;

    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new BadRequestException(
        `A user already exists with email: ${createUserDto.email}`,
      );
    }

    const repository = transactionManager.getRepository(User);

    return await repository.save(
      new User({
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email.toLowerCase(),
        phone: createUserDto.phone,
      }),
    );
  };
}
