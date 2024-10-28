import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserPipe } from './user.pipe';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt/guard';

//기본적인 컨트롤러 :id는 키값이 @Param('id') id : string에서 ''내부에 있는 값을 받을때 인 파라미터를 유동적으로 받을때, * 은 와일드카드로 사용된다.

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('regist')
  @UsePipes(new UserPipe()) //생성한 파이프를 통과시킴
  async create(@Body() createUserDto: CreateUserDto) {
    //페이로드 전송시 선언되어있는 DTO에 맞는 body값을 가져옴
    return this.userService.create(createUserDto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.userService.login(loginUserDto);
  }

  @Get()
  //@HttpCode(222) //응답코드 변경 가능
  //@Redirect('/user/22') //이런식으로 redirect해서 받는것도 가능 그다지 안쓸거같다...?
  findAll(@Query('testVal') val: String) {
    //주소에서 ?뒤에 파라미터명으로 문자열 가져오는거 가능 예시는 testVal이라는 키값을 사용함, 매우잘됨
    console.log(val);
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('jwtTest') //PathVariable이라고 생각하면 편함
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
