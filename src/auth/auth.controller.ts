import {BadRequestException, Body, Controller, HttpCode, Post, UsePipes, ValidationPipe} from '@nestjs/common';
import {AuthDto} from "./dto/auth.dto";
import {AuthService} from "./auth.service";
import {ALREADY_EXIST_USER_MESSAGE} from "./auth.constant";
import {UserModel} from "./user.model";
import {JwtService} from "@nestjs/jwt";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService
    ) {}

    @UsePipes(new ValidationPipe())
    @Post("register")
    public async register(@Body() dto: AuthDto){

        const existUser = await this.authService.findUser(dto.login);

        if(existUser) {
            throw new BadRequestException(ALREADY_EXIST_USER_MESSAGE);
        }

        return this.authService.createUser(dto);
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post("login")
    public async login(@Body() dto: AuthDto) {
        const { email } = await this.authService.validateUser(dto.login, dto.password);

        return this.authService.login(email);

    }

}
