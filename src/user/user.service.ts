import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await this.changeHashString(
      //비밀번호 암호화는 필수임
      createUserDto.password.toString(),
    );
    await this.prisma.user.create({ data: createUserDto });
  }

  async login(loginUserDto: LoginUserDto) {
    const dbInfo = await this.prisma.user.findUnique({
      where: { userId: loginUserDto.userId },
    });
    if (dbInfo == null) {
      return await '유저없음';
    }
    if (!(await bcrypt.compare(loginUserDto.password, dbInfo.password))) {
      return await '비밀번호 오류';
    }

    const payloadData = { userId: dbInfo.userId, issued: true };
    return await this.jwtService.sign(payloadData); //생성한 jwtService에 조회된 db정보를 전달
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(val: any) {
    return '통과';
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private changeHashString = async (str) => {
    const saltRound = 10; //솔트키 라운드 수
    const salt = await bcrypt.genSalt(saltRound); //솔트생성
    const changeStr = await bcrypt.hash(str, salt); //받은 문자열과 솔트를 합쳐서 해쉬값을 만들어냄
    return changeStr;
  };
}
