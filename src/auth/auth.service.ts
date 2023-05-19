import {BadRequestException, Injectable} from '@nestjs/common';
import {AuthDto} from "./dto/auth.dto";
import {ModelType} from "@typegoose/typegoose/lib/types";
import {UserModel} from "./user.model";
import {InjectModel} from "nestjs-typegoose";
import {compare, genSalt, genSaltSync, hash, hashSync} from "bcrypt";
import {INCORRECT_PASSWORD, USER_NOT_FOUND} from "./auth.constant";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {

    constructor(
        @InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
        private readonly jwtService: JwtService
        ) {
    }

    public async createUser(dto: AuthDto) {
        const salt = genSaltSync(10);
        const newUser = new this.userModel({
            email: dto.login,
            passwordHash: hashSync(dto.password, salt)
        });
        return newUser.save();
    }

    public async findUser(email: string) {
        return this.userModel.findOne({email}).exec();
    }

    public async validateUser(email: string, password: string) {
        const user = await this.findUser(email);
        if(!user) {
            throw new BadRequestException(USER_NOT_FOUND);
        }
        const isCorrectPassword = await compare(password, user.passwordHash)

        if(!isCorrectPassword) {
            throw new BadRequestException(INCORRECT_PASSWORD);
        }
        return {email: user.email}
    }

    public async login(email: string){
        const payload = { email };
        return {
            access_token: await this.jwtService.signAsync(payload)
        }
    }

}
